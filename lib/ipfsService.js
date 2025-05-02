// lib/ipfsService.js
import { create } from '@web3-storage/w3up-client';

let client = null;

export const initStorageClient = async (email) => {
  try {
    if (!client) {
      client = await create();
      console.log('[IPFS] Client created');
    }

    // Login with the provided email
    const account = await client.login(email);
    await account.plan.wait();
    console.log('[IPFS] Logged in with account:', account.did());

    const spaceName = 'ScholarFund';
    const spaces = await client.spaces();
    console.log('[IPFS] Available spaces:', spaces.length);

    let space = spaces[0]; // Use the first available space

    if (!space) {
      console.log('[IPFS] Creating new space:', spaceName);
      space = await client.createSpace(spaceName);
      const account = await client.acting();
      await space.provision(account);
      await space.save();
      console.log('[IPFS] New space created and provisioned');
    }

    await client.setCurrentSpace(space.did());
    console.log('[IPFS] Current space set to:', space.did());

    return client;
  } catch (err) {
    console.error('❌ Failed to initialize storage client:', err);
    throw err;
  }
};

export const uploadToIPFS = async (file) => {
  if (!client) {
    throw new Error('Storage client not initialized. Call initStorageClient first.');
  }

  try {
    if (!client.currentSpace()) {
      throw new Error('Client has no current space set. Please initialize the client properly.');
    }

    console.log('[IPFS] Uploading:', file.name);
    const cid = await client.uploadFile(file);
    console.log('[IPFS] Uploaded CID:', cid.toString());

    return cid.toString();
  } catch (error) {
    console.error('❌ IPFS upload error:', error);
    throw error;
  }
};

export const getIPFSUrl = (cid) => `https://${cid}.ipfs.w3s.link`;
