import { ethers } from "ethers";
import ScholarFundABI from "./ScholarFundABI.json"; // This will be generated during contract deployment

// Contract address - this will be filled in after deployment
const CONTRACT_ADDRESS = ""; // Replace with your deployed contract address

/**
  * ScholarFundContract class
  * This class provides methods to interact with the ScholarFund smart contract
  * using ethers.js library.
  * It includes methods for initializing the contract, checking user roles,
  * submitting applications, reviewing applications, creating milestones,
  * and getting scholars and milestones data.
  *
 * Helper class to interact with the ScholarFund smart contract
 */
export class ScholarFundContract {
  constructor() {
    this.contract = null;
    this.provider = null;
    this.signer = null;
  }

  /**
   * Initialize the contract connection
   * @returns {boolean} Connection success
   */
  async initialize() {
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error("MetaMask not detected. Please install MetaMask.");
      }

      // Request accounts from MetaMask
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Set up provider and signer
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      this.signer = this.provider.getSigner();
      
      // Create contract instance
      this.contract = new ethers.Contract(CONTRACT_ADDRESS, ScholarFundABI, this.signer);
      
      return true;
    } catch (error) {
      console.error("Failed to initialize contract:", error);
      return false;
    }
  }

  /**
   * Get the connected wallet address
   * @returns {string} Wallet address
   */
  async getWalletAddress() {
    if (!this.signer) {
      throw new Error("Contract not initialized");
    }
    return await this.signer.getAddress();
  }

  /**
   * Check if the current user is an admin
   * @returns {boolean} Is admin
   */
  async isAdmin() {
    if (!this.contract) {
      throw new Error("Contract not initialized");
    }
    
    const admin = await this.contract.admin();
    const currentAddress = await this.getWalletAddress();
    
    return admin.toLowerCase() === currentAddress.toLowerCase();
  }

  /**
   * Check if the current user is a validator
   * @returns {boolean} Is validator
   */
  async isValidator() {
    if (!this.contract) {
      throw new Error("Contract not initialized");
    }
    
    const currentAddress = await this.getWalletAddress();
    return await this.contract.isValidator(currentAddress);
  }

  /**
   * Check if the current user is a scholar
   * @returns {boolean} Is scholar
   */
  async isScholar() {
    if (!this.contract) {
      throw new Error("Contract not initialized");
    }
    
    const currentAddress = await this.getWalletAddress();
    return await this.contract.isScholar(currentAddress);
  }

  /**
   * Submit a scholarship application
   * @param {string} name Applicant's name
   * @param {string} university University name
   * @param {string} major Field of study
   * @param {number} fundingRequested Amount of funding requested (in ETH)
   * @param {string} ipfsDocHash IPFS hash of supporting documents
   * @returns {object} Transaction receipt
   */
  async submitApplication(name, university, major, fundingRequested, ipfsDocHash) {
    if (!this.contract) {
      throw new Error("Contract not initialized");
    }
    
    const fundingInWei = ethers.utils.parseEther(fundingRequested.toString());
    
    const tx = await this.contract.submitApplication(
      name,
      university,
      major,
      fundingInWei,
      ipfsDocHash
    );
    
    return await tx.wait();
  }

  /**
   * Review an application
   * @param {number} applicationId Application ID
   * @param {boolean} approved Whether to approve or reject
   * @returns {object} Transaction receipt
   */
  async reviewApplication(applicationId, approved) {
    if (!this.contract) {
      throw new Error("Contract not initialized");
    }
    
    // ApplicationStatus enum: 1 = Approved, 2 = Rejected
    const status = approved ? 1 : 2;
    
    const tx = await this.contract.reviewApplication(applicationId, status);
    return await tx.wait();
  }

  /**
   * Create a milestone for a scholar
   * @param {number} scholarId Scholar ID
   * @param {string} title Milestone title
   * @param {string} description Milestone description
   * @param {number} fundAmount Amount of funds to release upon completion (in ETH)
   * @returns {object} Transaction receipt
   */
  async createMilestone(scholarId, title, description, fundAmount) {
    if (!this.contract) {
      throw new Error("Contract not initialized");
    }
    
    const fundAmountInWei = ethers.utils.parseEther(fundAmount.toString());
    
    const tx = await this.contract.createMilestone(
      scholarId,
      title,
      description,
      fundAmountInWei
    );
    
    return await tx.wait();
  }

  /**
   * Submit proof for a milestone
   * @param {number} scholarId Scholar ID
   * @param {number} milestoneId Milestone ID
   * @param {string} ipfsProofHash IPFS hash of proof documentation
   * @returns {object} Transaction receipt
   */
  async submitMilestoneProof(scholarId, milestoneId, ipfsProofHash) {
    if (!this.contract) {
      throw new Error("Contract not initialized");
    }
    
    const tx = await this.contract.submitMilestoneProof(
      scholarId,
      milestoneId,
      ipfsProofHash
    );
    
    return await tx.wait();
  }

  /**
   * Review a milestone submission
   * @param {number} scholarId Scholar ID
   * @param {number} milestoneId Milestone ID
   * @param {boolean} approved Whether to approve or reject
   * @returns {object} Transaction receipt
   */
  async reviewMilestone(scholarId, milestoneId, approved) {
    if (!this.contract) {
      throw new Error("Contract not initialized");
    }
    
    const tx = await this.contract.reviewMilestone(scholarId, milestoneId, approved);
    return await tx.wait();
  }

  /**
   * Donate to a scholar
   * @param {number} scholarId Scholar ID
   * @param {number} amount Amount to donate (in ETH)
   * @returns {object} Transaction receipt
   */
  async donate(scholarId, amount) {
    if (!this.contract) {
      throw new Error("Contract not initialized");
    }
    
    const amountInWei = ethers.utils.parseEther(amount.toString());
    
    const tx = await this.contract.donate(scholarId, {
      value: amountInWei
    });
    
    return await tx.wait();
  }

  /**
   * Get all scholars
   * @returns {Array} List of scholars
   */
  async getScholars() {
    if (!this.contract) {
      throw new Error("Contract not initialized");
    }
    
    const scholarCount = await this.contract.scholarCount();
    const scholars = [];
    
    for (let i = 1; i <= scholarCount; i++) {
      try {
        const scholar = await this.contract.getScholar(i);
        
        // Format the response
        scholars.push({
          id: scholar.id.toNumber(),
          walletAddress: scholar.walletAddress,
          name: scholar.name,
          totalFunding: ethers.utils.formatEther(scholar.totalFunding),
          raisedAmount: ethers.utils.formatEther(scholar.raisedAmount),
          releasedAmount: ethers.utils.formatEther(scholar.releasedAmount),
          milestoneCount: scholar.milestoneCount.toNumber(),
          isActive: scholar.isActive
        });
      } catch (error) {
        console.error(`Error fetching scholar ${i}:`, error);
      }
    }
    
    return scholars;
  }

  /**
   * Get all milestones for a scholar
   * @param {number} scholarId Scholar ID
   * @returns {Array} List of milestones
   */
  async getScholarMilestones(scholarId) {
    if (!this.contract) {
      throw new Error("Contract not initialized");
    }
    
    const milestones = await this.contract.getScholarMilestones(scholarId);
    
    // Format the response
    return milestones.map(milestone => ({
      id: milestone.id.toNumber(),
      scholarId: milestone.scholarId.toNumber(),
      title: milestone.title,
      description: milestone.description,
      fundAmount: ethers.utils.formatEther(milestone.fundAmount),
      ipfsProofHash: milestone.ipfsProofHash,
      status: milestone.status,
      timestamp: new Date(milestone.timestamp.toNumber() * 1000)
    }));
  }

  /**
   * Get all pending applications
   * @returns {Array} List of pending applications
   */
  async getPendingApplications() {
    if (!this.contract) {
      throw new Error("Contract not initialized");
    }
    
    const pendingApps = await this.contract.getPendingApplications();
    
    // Format the response
    return pendingApps.map(app => ({
      id: app.id.toNumber(),
      applicant: app.applicant,
      name: app.name,
      university: app.university,
      major: app.major,
      fundingRequested: ethers.utils.formatEther(app.fundingRequested),
      ipfsDocHash: app.ipfsDocHash,
      status: app.status,
      timestamp: new Date(app.timestamp.toNumber() * 1000)
    }));
  }

  /**
   * Get all pending milestone submissions
   * @returns {Array} List of pending milestone submissions
   */
  async getPendingMilestoneSubmissions() {
    if (!this.contract) {
      throw new Error("Contract not initialized");
    }
    
    const [scholarIds, milestoneIds] = await this.contract.getPendingMilestoneSubmissions();
    const pendingSubmissions = [];
    
    for (let i = 0; i < scholarIds.length; i++) {
      const scholarId = scholarIds[i].toNumber();
      const milestoneId = milestoneIds[i].toNumber();
      
      try {
        const scholar = await this.contract.getScholar(scholarId);
        const milestone = await this.contract.getMilestone(scholarId, milestoneId);
        
        pendingSubmissions.push({
          scholarId,
          milestoneId,
          scholarName: scholar.name,
          scholarWallet: scholar.walletAddress,
          milestoneTitle: milestone.title,
          ipfsProofHash: milestone.ipfsProofHash
        });
      } catch (error) {
        console.error(`Error fetching submission details for scholar ${scholarId}, milestone ${milestoneId}:`, error);
      }
    }
    
    return pendingSubmissions;
  }
}