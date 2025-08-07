const {S3Client} = require('@aws-sdk/client-s3')

const s3Client = new S3Client({
    region: process.env.S3_region,
    credentials: {
        accessKeyId: process.env.S3_accessKeyId,
        secretAccessKey: process.env.S3_secretAccessKey
    }
})

module.exports = s3Client;