import { create } from '@web3-storage/w3up-client';

let client = null;

export const initStorageClient = async (email) => {
  try {
    // Create a new client if we don't have one
    if (!client) {
      client = await create();
      console.log('[IPFS] Client created');
    }

    // Login with email if not already logged in
    if (!client.agent().did()) {
      const account = await client.login(email);
      await account.plan.wait();
      console.log('[IPFS] Logged in with account:', account.did());
    }

    // Try to get existing spaces or create a new one
    const spaceName = 'ScholarFund';
    
    // Get all spaces the account has access to
    const spaces = await client.spaces();
    console.log('[IPFS] Available spaces:', spaces.length);
    
    let space = spaces.find((s) => s.name() === spaceName);
    
    // Create a new space if none exists
    if (!space) {
      console.log('[IPFS] Creating new space:', spaceName);
      space = await client.createSpace(spaceName);
      
      // You need to provision the space with your account
      const account = await client.acting();
      await space.provision(account);
      await space.save();
      console.log('[IPFS] New space created and provisioned');
    }
    
    // Set the space as current
    try {
      await client.setCurrentSpace(space.did());
      console.log('[IPFS] Current space set to:', space.did());
    } catch (spaceError) {
      console.error('[IPFS] Failed to set current space:', spaceError);
      throw spaceError;
    }
    
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
    // Double-check the current space before uploading
    if (!client.currentSpace()) {
      throw new Error('Client has no current space set. Please initialize the client properly.');
    }

    console.log('[IPFS] Uploading:', file.name);
    
    // For large files, you may want to show progress
    const cid = await client.uploadFile(file);
    console.log('[IPFS] Uploaded CID:', cid.toString());

    return cid.toString();
  } catch (error) {
    console.error('❌ IPFS upload error:', error);
    throw error;
  }
};

export const getIPFSUrl = (cid) => `https://${cid}.ipfs.w3s.link`;