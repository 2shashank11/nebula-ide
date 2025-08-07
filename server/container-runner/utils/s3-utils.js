const fs = require('fs');
const path = require('path');
const { docker } = require('./docker');
const s3Client = require('./s3-client');
const tar = require('tar-stream');
const stream = require('stream');
const {
    CopyObjectCommand,
    ListObjectsV2Command,
    GetObjectCommand,
} = require('@aws-sdk/client-s3');

async function copyBaseCodeFolder({
    bucketName,
    sourcePrefix,
    targetPrefix,
    concurrency = 1
}) {

    let continuationToken;

    const copyFile = async (sourceKey) => {
        const targetKey = sourceKey.replace(sourcePrefix, targetPrefix)
        try {
            await s3Client.send(
                new CopyObjectCommand({
                    Bucket: bucketName,
                    CopySource: `${bucketName}/${sourceKey}`,
                    Key: targetKey,
                })
            );
        }
        catch (error) {
            console.error(`Error copying ${sourceKey} to ${targetKey}:`, error);
            throw error;
        }
    };

    const copyFilesRecursive = async (token) => {
        const listCommand = new ListObjectsV2Command({
            Bucket: bucketName,
            Prefix: sourcePrefix,
            ContinuationToken: token
        });

        const listResponse = await s3Client.send(listCommand);

        if (listResponse.Contents && listResponse.Contents.length > 0) {
            const promises = [];
            for (const item of listResponse.Contents) {
                if (item.Key) {
                    promises.push(copyFile(item.Key));
                }
            }
            await Promise.all(promises);
        }

        if (listResponse.NextContinuationToken) {
            await copyFilesRecursive(listResponse.NextContinuationToken);
        }
    };

    await copyFilesRecursive(continuationToken);
    console.log(`Successfully copied files from ${sourcePrefix} to ${targetPrefix} in bucket ${bucketName}`);
}


async function listS3Files(bucket, prefix) {

    const command = new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: prefix
    })
    const response = await s3Client.send(command);
    const files = response.Contents.map(item => item.Key);
    // console.log("ListS3Files: ", files)
    return files;
}

async function streamToBuffer(stream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', chunk => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', reject);
    });
}

async function syncS3FolderToContainer(containerId, s3Prefix, containerPath = '/') {
    const container = docker.getContainer(containerId);
    const s3Keys = await listS3Files(process.env.S3_BUCKET, s3Prefix);

    // Create tar archive stream
    const pack = tar.pack();

    for (const key of s3Keys) {
        const getCmd = new GetObjectCommand({
            Bucket: process.env.S3_BUCKET,
            Key: key,
        });

        const s3Obj = await s3Client.send(getCmd);
        const fileBuffer = await streamToBuffer(s3Obj.Body);

        const relativePath = key.replace(s3Prefix, '');

        pack.entry({ name: relativePath }, fileBuffer);
    }

    pack.finalize();

    // Pipe into container
    await container.putArchive(pack, { path: containerPath });
    // console.log(`Files copied from S3 to container ${containerId}`);
    return s3Keys;
}


module.exports = {
    copyBaseCodeFolder,
    syncS3FolderToContainer,

};