// utils/ethers-compat.js
import { ethers } from 'ethers';

// Recreate the v5 utils interface that thirdweb expects
export const utils = {
  isAddress: ethers.isAddress,
  getAddress: ethers.getAddress,
  formatUnits: ethers.formatUnits,
  parseUnits: ethers.parseUnits,
  formatEther: ethers.formatEther,
  parseEther: ethers.parseEther,
  // Add any other utility functions needed
};

// Export specific functions directly for imports like: import { isAddress } from 'ethers/lib/utils'
export const isAddress = ethers.isAddress;
export const getAddress = ethers.getAddress;
export const formatUnits = ethers.formatUnits;
export const parseUnits = ethers.parseUnits;
export const formatEther = ethers.formatEther;
export const parseEther = ethers.parseEther;