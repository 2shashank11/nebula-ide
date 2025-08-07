const path = require('path');
const fs = require('fs');
const {docker} = require('../utils/docker');
const { watchProjectDirectory } = require('../utils/monitor-files');
const redisClient = require('../utils/redis-client');

module.exports = async function terminalService(socketNamespace) {
    socketNamespace.on('connection', async (socket) => {
        console.log('A client connected:', socket.id);
        const { projectId } = socket.handshake.query;
        console.log('Socket connected for project:', projectId);

        if(!projectId) {
            console.error('Project ID is required for terminal connection');
            socket.emit('terminal:error', 'Project ID is required');
            socket.disconnect();
            return;
        }
        // Check if a container is already running for this project
        const containerObject = await redisClient.hGetAll(projectId);
        const containerId = containerObject ? containerObject.containerId : null;

        let container;
        try{
            container = await docker.getContainer(containerId);
        } catch (err) {
            socket.disconnect();
            return;
        }

        if (containerId && container) {
            const projectDir = path.resolve(__dirname, '../user-files', projectId);
            watchProjectDirectory(projectDir, socket);
            socket.emit('file:refresh')
        }

        socket.on('file:change', async ({filePath, content}) => {
            if (!filePath || !content) {
                return;
            }
            const relPath = '../user-files/' + projectId + '/' + filePath;
            const absPath = path.resolve(__dirname, relPath);
            await fs.writeFile(absPath, content, (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                } 
            })
        })

        try {
            const exec = await container.exec({
                Cmd: ['/bin/bash'],
                AttachStdin: true,
                AttachStdout: true,
                AttachStderr: true,
                Tty: true            
            });

            const stream = await exec.start({ hijack: true, stdin: true });

            stream.on('data', (chunk) => {
                socket.emit('terminal:data', chunk.toString('utf-8'));
            });

            socket.on('terminal:write', (data) => {
                stream.write(data);
            });

            socket.on('disconnect', async () => {
                console.log(`Client disconnected: ${socket.id}`);
                await redisClient.del(projectId)

                // schedule required instead of instant deletion
                // cron job
                // save project data to aws when cron job ends
                // delete project data from backend storage
            
                try {
                    stream.end();
                    await container.stop();
                    await container.remove();
                    console.log(`Container ${container.id} stopped and removed.`);
                } catch (cleanupErr) {
                    console.error('Error cleaning up container:', cleanupErr);
                }
            });

        } catch (err) {
            // console.error('Error in container setup:', err);
            socket.emit('terminal:error', 'Unable to start terminal session.');
            if (container) {
                try {
                    await container.remove({ force: true });
                } catch (e) {

                }
            }
        }
    });
}