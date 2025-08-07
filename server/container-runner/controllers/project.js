const { docker } = require('../utils/docker');
const path = require('path');
const fs = require('fs');
const redisClient = require('../utils/redis-client');
const { createNewContainer } = require('../utils/container');
const { copyBaseCodeFolder,
    syncS3FolderToContainer,
} = require('../utils/s3-utils');

function initializeNewProject(req, res) {
    const { projectId, environment } = req.body;

    if (!projectId || !environment) {
        return res.status(400).json({ error: 'Project ID and environment are required' });
    }

    const userId = req.user.id;

    // create folder in aws
    //copy base code from another folder at s3 to this folder
    const bucketName = process.env.S3_bucket;
    const sourcePrefix = 'base-code/' + environment + '/';
    const targetPrefix = 'users/' + userId + '/projects/' + projectId + '/';

    try {
        copyBaseCodeFolder({
            bucketName,
            sourcePrefix,
            targetPrefix,
        })
        return res.status(200).json({ message: 'Project initialized successfully' });
    }
    catch (error) {
        console.error('Error copying base code folder:', error);
        return res.status(500).json({ message: 'Failed to initialize project' });
    }

}

function getFileTree(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  const result = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      const children = getFileTree(fullPath);
      result.push([entry.name, children]);
    } else {
      result.push(entry.name);
    }
  }

  return result;
}

async function openExistingProject(req, res) {
    const projectId = req.params.projectId;
    const userId = req.user.id;
    if (!projectId) {
        return res.status(400).json({ error: 'Project ID is required' });
    }

    // check if container already running for this project
    const containerObject = await redisClient.hGetAll(projectId);
    const containerId = containerObject ? containerObject.containerId : null;

    if (containerId) {
        const container = docker.getContainer(containerId);
        const fileTree = containerObject.fileTree ? JSON.parse(containerObject.fileTree) : null;
        // send file tree to frontend
        return res.status(200).json({ message: 'Container already running', fileTree: fileTree, });
    }
    else {
        // if not running, create a new container
        const container = await createNewContainer(projectId);
        // set container id on redis
        const time = new Date();
        await redisClient.hSet(projectId, { containerId: container.id, lastAccessed: time.toISOString() });

        // pull project directory from s3 to container
        const bucketName = process.env.S3_bucket;
        const s3Prefix = `users/${userId}/projects/${projectId}/`;

        try {
            const keys = await syncS3FolderToContainer(container.id, s3Prefix);
            
            // get file tree from container
            // let files = keys.map(obj => obj.replace(s3Prefix + 'app/', ''));
            // files = files.filter(file => file !== s3Prefix + 'metadata.json'); 
            // console.log('after replace', files)

            const projectDir = path.resolve(__dirname, '../user-files/' + projectId);
            // const tree = getFileTreeArrayFormat(projectDir);
            const fileTree = await getFileTree(projectDir);
            // console.log(fileTree)
            // console.log(fileTree)
            // await redisClient.hSet(projectId, { fileTree: JSON.stringify(fileTree) });

            // send file tree to frontend
            return res.status(200).json({ message: 'Project opened successfully', fileTree: fileTree, });

        } catch (error) {
            console.error('Error syncing S3 folder to container:', error);
            return res.status(500).json({ message: 'Failed to open project' });
        }
    }
}

async function getProjectFileTree(req, res) {
    const projectId = req.params.projectId;
    if (!projectId) {
        return res.status(400).json({ error: 'Project ID is required' });
    }
    const projectDir = path.resolve(__dirname, '../user-files', projectId);
    const fileTree = await getFileTree(projectDir);
    return res.status(200).json({ fileTree: fileTree });
}

async function getFilecontent(req, res){
    const { projectId } = req.params;
    const filePath = req.body.filePath
    if (!projectId || !filePath) {
        return res.status(400).json({ error: 'Project ID and file path are required' });
    }
    const relPath = '../user-files/' + projectId + '/' + filePath;
    const absPath = path.resolve(__dirname, relPath);
    try {
        const content = fs.readFile(absPath, 'utf-8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return res.status(500).json({ message: 'Failed to read file' });
            }
            return res.status(200).json({ content: data });
        });
    } catch (error) {
        console.error('Error reading file:', error);
        return res.status(500).json({ message: 'Failed to read file' });
    }
}

module.exports = {
    openExistingProject,
    initializeNewProject,
    getProjectFileTree,
    getFilecontent,
}