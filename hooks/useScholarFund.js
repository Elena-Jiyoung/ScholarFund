import { useState, useEffect, useCallback } from 'react';
import { ScholarFundContract } from './contractIntegration';
import { IPFSService } from './ipfsService';

// Replace with your web3.storage API token
const WEB3_STORAGE_TOKEN = process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN;

/**
 * Custom hook for interacting with the ScholarFund contract
 */
export function useScholarFund() {
  const [contract, setContract] = useState(null);
  const [ipfs, setIpfs] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isValidator, setIsValidator] = useState(false);
  const [isScholar, setIsScholar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize the contract and IPFS service
  const initialize = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Initialize contract
      const scholarFundContract = new ScholarFundContract();
      const success = await scholarFundContract.initialize();
      
      if (!success) {
        throw new Error('Failed to initialize contract');
      }
      
      setContract(scholarFundContract);
      
      // Initialize IPFS service
      if (WEB3_STORAGE_TOKEN) {
        setIpfs(new IPFSService(WEB3_STORAGE_TOKEN));
      } else {
        console.warn('Web3.storage token not found. IPFS functionality will be disabled.');
      }
      
      // Get wallet address
      const address = await scholarFundContract.getWalletAddress();
      setAccount(address);
      setIsConnected(true);
      
      // Check user roles
      const adminStatus = await scholarFundContract.isAdmin();
      const validatorStatus = await scholarFundContract.isValidator();
      const scholarStatus = await scholarFundContract.isScholar();
      
      setIsAdmin(adminStatus);
      setIsValidator(validatorStatus);
      setIsScholar(scholarStatus);
      
      setLoading(false);
    } catch (err) {
      console.error('Failed to initialize ScholarFund:', err);
      setError(err.message);
      setLoading(false);
    }
  }, []);

  // Handle account changes
  const handleAccountsChanged = useCallback(async (accounts) => {
    if (accounts.length === 0) {
      // User disconnected wallet
      setAccount('');
      setIsConnected(false);
      setIsAdmin(false);
      setIsValidator(false);
      setIsScholar(false);
    } else if (accounts[0] !== account) {
      // Account changed
      setAccount(accounts[0]);
      
      // Check user roles with new account
      if (contract) {
        setIsAdmin(await contract.isAdmin());
        setIsValidator(await contract.isValidator());
        setIsScholar(await contract.isScholar());
      }
    }
  }, [account, contract]);

  // Initialize on first render
  useEffect(() => {
    initialize();
    
    // Set up listeners for MetaMask events
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      
      // Handle chain changes by reinitializing
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
    
    // Clean up listeners
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, [initialize, handleAccountsChanged]);

  // =============================================
  // Application functions
  // =============================================
  
  /**
   * Submit a scholarship application
   */
  const submitApplication = async (name, university, major, fundingRequested, documents) => {
    if (!contract || !ipfs) return null;
    
    setLoading(true);
    try {
      // Upload documents to IPFS
      const cid = await ipfs.uploadFiles(documents, 'application-docs');
      
      // Upload application metadata
      const metadata = {
        name,
        university,
        major,
        fundingRequested,
        documents: documents.map(doc => doc.name),
        timestamp: new Date().toISOString()
      };
      
      const metadataCid = await ipfs.uploadJSON(metadata, 'application-metadata.json');
      
      // Submit application to the contract
      const receipt = await contract.submitApplication(
        name,
        university,
        major,
        fundingRequested,
        metadataCid
      );
      
      setLoading(false);
      return {
        receipt,
        documentsCid: cid,
        metadataCid
      };
    } catch (err) {
      console.error('Error submitting application:', err);
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  /**
   * Review an application (for validators)
   */
  const reviewApplication = async (applicationId, approved) => {
    if (!contract) return null;
    
    setLoading(true);
    try {
      const receipt = await contract.reviewApplication(applicationId, approved);
      setLoading(false);
      return receipt;
    } catch (err) {
      console.error('Error reviewing application:', err);
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  // =============================================
  // Milestone functions
  // =============================================
  
  /**
   * Create a milestone for a scholar (for validators)
   */
  const createMilestone = async (scholarId, title, description, fundAmount) => {
    if (!contract) return null;
    
    setLoading(true);
    try {
      const receipt = await contract.createMilestone(scholarId, title, description, fundAmount);
      setLoading(false);
      return receipt;
    } catch (err) {
      console.error('Error creating milestone:', err);
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  /**
   * Submit proof for a milestone (for scholars)
   */
  const submitMilestoneProof = async (scholarId, milestoneId, proofDocuments) => {
    if (!contract || !ipfs) return null;
    
    setLoading(true);
    try {
      // Upload proof documents to IPFS
      const cid = await ipfs.uploadFiles(proofDocuments, 'milestone-proof');
      
      // Upload metadata
      const metadata = {
        scholarId,
        milestoneId,
        documents: proofDocuments.map(doc => doc.name),
        timestamp: new Date().toISOString()
      };
      
      const metadataCid = await ipfs.uploadJSON(metadata, 'milestone-metadata.json');
      
      // Submit to contract
      const receipt = await contract.submitMilestoneProof(scholarId, milestoneId, metadataCid);
      
      setLoading(false);
      return {
        receipt,
        documentsCid: cid,
        metadataCid
      };
    } catch (err) {
      console.error('Error submitting milestone proof:', err);
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  /**
   * Review a milestone submission (for validators)
   */
  const reviewMilestone = async (scholarId, milestoneId, approved) => {
    if (!contract) return null;
    
    setLoading(true);
    try {
      const receipt = await contract.reviewMilestone(scholarId, milestoneId, approved);
      setLoading(false);
      return receipt;
    } catch (err) {
      console.error('Error reviewing milestone:', err);
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  // =============================================
  // Donation functions
  // =============================================
  
  /**
   * Donate to a scholar
   */
  const donate = async (scholarId, amount) => {
    if (!contract) return null;
    
    setLoading(true);
    try {
      const receipt = await contract.donate(scholarId, amount);
      setLoading(false);
      return receipt;
    } catch (err) {
      console.error('Error donating:', err);
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  // =============================================
  // Data fetching functions
  // =============================================
  
  /**
   * Get all scholars
   */
  const getScholars = async () => {
    if (!contract) return [];
    
    try {
      return await contract.getScholars();
    } catch (err) {
      console.error('Error fetching scholars:', err);
      setError(err.message);
      return [];
    }
  };

  /**
   * Get all milestones for a scholar
   */
  const getScholarMilestones = async (scholarId) => {
    if (!contract) return [];
    
    try {
      return await contract.getScholarMilestones(scholarId);
    } catch (err) {
      console.error(`Error fetching milestones for scholar ${scholarId}:`, err);
      setError(err.message);
      return [];
    }
  };

  /**
   * Get all pending applications
   */
  const getPendingApplications = async () => {
    if (!contract) return [];
    
    try {
      return await contract.getPendingApplications();
    } catch (err) {
      console.error('Error fetching pending applications:', err);
      setError(err.message);
      return [];
    }
  };

  /**
   * Get all pending milestone submissions
   */
  const getPendingMilestoneSubmissions = async () => {
    if (!contract) return [];
    
    try {
      return await contract.getPendingMilestoneSubmissions();
    } catch (err) {
      console.error('Error fetching pending milestone submissions:', err);
      setError(err.message);
      return [];
    }
  };

  /**
   * Get IPFS metadata
   */
  const getIPFSMetadata = async (cid) => {
    if (!ipfs) return null;
    
    try {
      return await ipfs.retrieveJSON(cid);
    } catch (err) {
      console.error(`Error fetching IPFS metadata for CID ${cid}:`, err);
      setError(err.message);
      return null;
    }
  };

  /**
   * Get IPFS gateway URL
   */
  const getIPFSUrl = (cid) => {
    if (!ipfs) return '';
    return ipfs.getGatewayURL(cid);
  };

  return {
    // State
    isConnected,
    account,
    isAdmin,
    isValidator,
    isScholar,
    loading,
    error,
    
    // Actions
    initialize,
    submitApplication,
    reviewApplication,
    createMilestone,
    submitMilestoneProof,
    reviewMilestone,
    donate,
    
    // Data fetching
    getScholars,
    getScholarMilestones,
    getPendingApplications,
    getPendingMilestoneSubmissions,
    getIPFSMetadata,
    getIPFSUrl
  };
}