import { ethers } from 'ethers';

export function formatWeiToEth(wei) {
  try {
    // Convert to string and remove any decimal points
    const weiString = wei.toString().split('.')[0];
    return ethers.utils.formatEther(weiString);
  } catch (error) {
    console.error('Error formatting Wei to ETH:', error);
    return '0';
  }
}

export function formatEthToWei(eth) {
  try {
    return ethers.utils.parseEther(eth.toString());
  } catch (error) {
    console.error('Error formatting ETH to Wei:', error);
    return '0';
  }
}

export function formatNumber(number, decimals = 2) {
  try {
    return Number(number).toFixed(decimals);
  } catch (error) {
    console.error('Error formatting number:', error);
    return '0';
  }
} 