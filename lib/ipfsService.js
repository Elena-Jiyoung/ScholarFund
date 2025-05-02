// lib/ipfsService.js
import { create } from '@web3-storage/w3up-client';

let client = null;

export const initStorachaClient = async (email) => {
  try {
    client = await create();
    const account = await client.login(email);
    await account.plan.wait();

    const space = await client.createSpace('scholarfund-space', { account });
    await client.setCurrentSpace(space.did());
    return client;
  } catch (error) {
    console.error('Failed to initialize Storacha client:', error);
    throw error;
  }
};

export const uploadToIPFS = async (file) => {
  if (!client) throw new Error('Storacha client not initialized');

  try {
    const cid = await client.uploadFile(file);
    return cid.toString();
  } catch (error) {
    console.error('IPFS upload error:', error);
    throw error;
  }
};

export const getIPFSUrl = (cid) => `https://${cid}.ipfs.w3s.link`;
