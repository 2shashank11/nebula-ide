const { docker } = require('../utils/docker');
const { PassThrough } = require('stream');
const path = require('path');

async function createNewContainer(projectId) {
    try {
        await docker.pull('2shashank11/nebula-sandbox-env', (err, stream) => {
            if (err) {
                console.log(err)
                throw err};
            docker.modem.followProgress(stream, () => {
                console.log('Ubuntu image ready');
            });
        });

        // Create a new container
        const relPath = '../user-files/' + projectId;
        const absPath = path.resolve(__dirname, relPath);
        const container = await docker.createContainer({
            Image: '2shashank11/nebula-sandbox-env',
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