const { docker } = require('../utils/docker');
const { PassThrough } = require('stream');
const path = require('path');

async function createNewContainer(projectId) {
    try {
        await docker.pull('ubuntu:latest', (err, stream) => {
            if (err) throw err;
            docker.modem.followProgress(stream, () => {
                console.log('Ubuntu image ready');
            });
        });

        // Create a new container
        const relPath = '../user-files/' + projectId;
        const absPath = path.resolve(__dirname, relPath);
        const container = await docker.createContainer({
            Image: 'ubuntu:latest',
            Cmd: ['/bin/bash'],
            WorkingDir: '/app',
            Tty: true,
            OpenStdin: true,
            StdinOnce: false,
            HostConfig: {
                Binds: [`${absPath}:/app`],
            },
        });

        // Start the container
        await container.start();

        console.log('Container started:', container.id);

        return container;
    }
    catch (error) {
        console.error('Error creating container:', error);
        throw error;
    }
}

module.exports = {
    createNewContainer,
}