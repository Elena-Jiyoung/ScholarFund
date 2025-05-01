import { Web3Storage } from 'web3.storage';

/**
 * Service class for interacting with IPFS using web3.storage
 */
export class IPFSService {
  constructor(apiToken) {
    this.client = new Web3Storage({ token: apiToken });
  }

  /**
   * Upload a file to IPFS
   * @param {File} file File object to upload
   * @returns {string} IPFS CID (Content Identifier)
   */
  async uploadFile(file) {
    try {
      // Create a file object array for web3.storage
      const files = [
        new File([file], file.name, { type: file.type })
      ];
      
      // Upload to IPFS
      const cid = await this.client.put(files, {
        wrapWithDirectory: false
      });
      
      console.log('File uploaded to IPFS with CID:', cid);
      return cid;
    } catch (error) {
      console.error('Error uploading file to IPFS:', error);
      throw error;
    }
  }

  /**
   * Upload multiple files to IPFS in a directory
   * @param {File[]} files Array of File objects
   * @param {string} dirName Directory name
   * @returns {string} IPFS CID of the directory
   */
  async uploadFiles(files, dirName = 'documents') {
    try {
      // Create a file object array for web3.storage
      const fileObjects = files.map(file => 
        new File([file], file.name, { type: file.type })
      );
      
      // Upload to IPFS
      const cid = await this.client.put(fileObjects, {
        wrapWithDirectory: true,
        name: dirName
      });
      
      console.log('Files uploaded to IPFS with directory CID:', cid);
      return cid;
    } catch (error) {
      console.error('Error uploading files to IPFS:', error);
      throw error;
    }
  }

  /**
   * Upload JSON data to IPFS
   * @param {Object} jsonData JSON data to upload
   * @param {string} fileName File name
   * @returns {string} IPFS CID
   */
  async uploadJSON(jsonData, fileName = 'data.json') {
    try {
      // Convert JSON to Blob
      const blob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });
      
      // Create a file object
      const files = [
        new File([blob], fileName, { type: 'application/json' })
      ];
      
      // Upload to IPFS
      const cid = await this.client.put(files, {
        wrapWithDirectory: false
      });
      
      console.log('JSON uploaded to IPFS with CID:', cid);
      return cid;
    } catch (error) {
      console.error('Error uploading JSON to IPFS:', error);
      throw error;
    }
  }

  /**
   * Get the gateway URL for an IPFS CID
   * @param {string} cid IPFS CID
   * @returns {string} Gateway URL
   */
  getGatewayURL(cid) {
    return `https://${cid}.ipfs.dweb.link`;
  }

  /**
   * Retrieve data from IPFS
   * @param {string} cid IPFS CID
   * @returns {Promise<any>} Retrieved data
   */
  async retrieveData(cid) {
    try {
      // Retrieve the data from IPFS
      const res = await this.client.get(cid);
      
      if (!res.ok) {
        throw new Error(`Failed to retrieve data: ${res.status} ${res.statusText}`);
      }
      
      // Get all files from the response
      const files = await res.files();
      return files;
    } catch (error) {
      console.error('Error retrieving data from IPFS:', error);
      throw error;
    }
  }

  /**
   * Retrieve JSON data from IPFS
   * @param {string} cid IPFS CID
   * @returns {Promise<Object>} JSON data
   */
  async retrieveJSON(cid) {
    try {
      const files = await this.retrieveData(cid);
      
      if (files.length === 0) {
        throw new Error('No files found in the IPFS response');
      }
      
      // Read the first file as JSON
      const content = await files[0].text();
      return JSON.parse(content);
    } catch (error) {
      console.error('Error retrieving JSON from IPFS:', error);
      throw error;
    }
  }
}