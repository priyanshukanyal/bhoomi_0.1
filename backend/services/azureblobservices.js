import { BlobServiceClient } from '@azure/storage-blob';
import dotenv from 'dotenv';

dotenv.config();

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);

/**
 * Uploads multiple files to Azure Blob Storage.
 * @param {string} containerName - The name of the container to store the files.
 * @param {Array} files - An array of file objects, each containing { originalname, buffer }.
 * @returns {Array} - An array of URLs for the uploaded blobs.
 */
export const uploadMultipleToBlobStorage = async (containerName, files) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.createIfNotExists({ access: 'container' });

    const urls = [];
    for (const file of files) {
      const blobName = `images/${Date.now()}-${file.originalname}`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      await blockBlobClient.uploadData(file.buffer);
      urls.push(blockBlobClient.url);
    }
    return urls;
  } catch (error) {
    console.error('Error uploading to Blob Storage:', error);
    throw new Error('Failed to upload to Blob Storage');
  }
};
