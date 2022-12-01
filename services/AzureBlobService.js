const { DefaultAzureCredential } = require('@azure/identity');
const { BlobServiceClient } = require('@azure/storage-blob');

let accountName, blobServiceClient, containerName, containerClient;

init = () => {
    accountName = 'toolapistorage';
    blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, new DefaultAzureCredential());
    containerName = 'images';
    containerClient = blobServiceClient.getContainerClient(containerName);
};

generateName = (filename) => {
    return Date.now() + '-' + filename;
}

upload = async (file) => {
    try {
        const name = generateName(file.originalname);
        const blockBlobClient = containerClient.getBlockBlobClient(name);
        const data = file.buffer;
        const options = { blobHTTPHeaders: { blobContentType: file.mimetype }};
        await blockBlobClient.upload(data, data.length, options);

        return name;
    }
    catch (error) {
        throw new Error(error);
    }
};

destroy = async (name) => {
    try {
        const options = { deleteSnapshots: 'include' };
        const blockBlobClient = containerClient.getBlockBlobClient(name);
        await blockBlobClient.deleteIfExists(options);

        return true;
    }
    catch (error) {
        throw new Error(error);
    }
};

module.exports = { init, upload, destroy }