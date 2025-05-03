//hooks/useScholarFundThirdWeb.js
import { useState, useEffect } from 'react';
import { useContract, 
  useContractRead, 
  useContractWrite, 
  useAddress,
  useMetamask,
  useDisconnect,
} from '@thirdweb-dev/react';
import { ethers } from "ethers";
import ABI from "@/contracts/ScholarFundABI.json"; // Adjust the path to your ABI file

/**
 * Custom hook for interacting with the ScholarFund contract using ThirdWeb
 */
export function useScholarFundThirdWeb() {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  // Connect to the contract
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, ABI);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isValidator, setIsValidator] = useState(false);
  const [isScholar, setIsScholar] = useState(false);
  useEffect(() => {
    console.log("[📦] Contract address:", process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
    console.log("[🧾] Contract loaded:", contract);
  }, [contract]);
  
  
  // Check if the current user is an admin
  const { data: adminAddress } = useContractRead(contract, "admin");
  
  // Check if the current user is a validator
  const { data: validatorStatus } = useContractRead(contract, "validators", [address || "0x0000000000000000000000000000000000000000"]);
  // Check if the current user is a scholar
  const { data: scholarStatus } = useContractRead(contract, "isScholar", [address || "0x0000000000000000000000000000000000000000"]);
  
  // Update roles when data changes
  useEffect(() => {
    console.log("[👤] Current address:", address);
    console.log("[👑] Admin address:", adminAddress);
    console.log("[✅] Validator status:", validatorStatus);
    console.log("[🎓] Scholar status:", scholarStatus);

    if (address && adminAddress) {
      const isAdminUser = address.toLowerCase() === adminAddress.toLowerCase();
      console.log("[👑] Is admin:", isAdminUser);
      setIsAdmin(isAdminUser);
    } else {
      setIsAdmin(false);
    }
    
    if (address && validatorStatus !== undefined) {
      console.log("[✅] Is validator:", validatorStatus);
      setIsValidator(validatorStatus);
    } else {
      setIsValidator(false);
    }
    
    if (address && scholarStatus !== undefined) {
      console.log("[🎓] Is scholar:", scholarStatus);
      setIsScholar(scholarStatus);
    } else {
      setIsScholar(false);
    }
  }, [address, adminAddress, validatorStatus, scholarStatus]);
  
  // =============================================
  // Application Functions
  // =============================================
  
  // Submit application
  const { mutateAsync: submitApplication } = useContractWrite(contract, "submitApplication");
  
  const submitScholarshipApplication = async (name, university, major, fundingRequested, ipfsDocHash) => {
    try {
      if (!contract) {
        throw new Error('Contract not initialized');
      }
  
      const fundingInWei = ethers.utils.parseEther(fundingRequested.toString());
  
      const data = await submitApplication({
        args: [name, university, major, fundingInWei, ipfsDocHash],
        overrides: {
          gasLimit: 3000000, // Optional: tweak if needed
        },
      });
  
      return data;
    } catch (err) {
      console.error("Error submitting application:", err);
      throw err;
    }
  };
  
  // Review application
  const { mutateAsync: reviewApplication } = useContractWrite(contract, "reviewApplication");
  
  const reviewScholarshipApplication = async (applicationId, approved) => {
    try {
      // ApplicationStatus enum: 1 = Approved, 2 = Rejected
      const status = approved ? 1 : 2;
      
      const data = await reviewApplication({
        args: [applicationId, status]
      });
      
      return data;
    } catch (err) {
      console.error("Error reviewing application:", err);
      throw err;
    }
  };
  
  // =============================================
  // Milestone Functions
  // =============================================
  
  // Create milestone
  const { mutateAsync: createMilestone } = useContractWrite(contract, "createMilestone");
  
  const createScholarMilestone = async (scholarId, title, description, fundAmount) => {
    try {
      // Convert ETH to Wei
      const fundAmountInWei = ethers.utils.parseEther(fundAmount.toString());
      
      const data = await createMilestone({
        args: [scholarId, title, description, fundAmountInWei]
      });
      
      return data;
    } catch (err) {
      console.error("Error creating milestone:", err);
      throw err;
    }
  };
  
  // Submit milestone proof
  const { mutateAsync: submitMilestoneProof } = useContractWrite(contract, "submitMilestoneProof");
  
  const submitScholarMilestoneProof = async (scholarId, milestoneId, ipfsProofHash) => {
    try {
      const data = await submitMilestoneProof({
        args: [scholarId, milestoneId, ipfsProofHash]
      });
      
      return data;
    } catch (err) {
      console.error("Error submitting milestone proof:", err);
      throw err;
    }
  };
  
  // Review milestone
  const { mutateAsync: reviewMilestone } = useContractWrite(contract, "reviewMilestone");
  
  const reviewScholarMilestone = async (scholarId, milestoneId, approved) => {
    try {
      const data = await reviewMilestone({
        args: [scholarId, milestoneId, approved]
      });
      
      return data;
    } catch (err) {
      console.error("Error reviewing milestone:", err);
      throw err;
    }
  };
  
  // =============================================
  // Donation Functions
  // =============================================
  
  // Donate
  const { mutateAsync: donate } = useContractWrite(contract, "donate");
  
  const donateToScholar = async (scholarId, amount) => {
    try {
      // Convert ETH to Wei
      const amountInWei = ethers.utils.parseEther(amount.toString());
      
      const data = await donate({
        args: [scholarId],
        overrides: {
          value: amountInWei
        }
      });
      
      return data;
    } catch (err) {
      console.error("Error donating:", err);
      throw err;
    }
  };
  
  // =============================================
  // Read Functions
  // =============================================
  
  // Get all scholars
  const { data: scholarCount } = useContractRead(contract, "scholarCount");
  
  const getScholars = async () => {
    if (!contract || !scholarCount) return [];
    
    try {
      const scholars = [];
      
      for (let i = 1; i <= scholarCount.toNumber(); i++) {
        const scholar = await contract.call("getScholar", [i]);
        
        if (scholar.isActive) {
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
        }
      }
      
      return scholars;
    } catch (err) {
      console.error("Error fetching scholars:", err);
      return [];
    }
  };
  
  // Get pending applications
  const getPendingApplications = async () => {
    if (!contract) return [];
    const pendingApps = await contract.call('getPendingApplications');
    return pendingApps.map((app) => ({
      id: app.id.toNumber(),
      name: app.name,
      university: app.university,
      major: app.major,
      fundingRequested: ethers.utils.formatEther(app.fundingRequested),
      ipfsDocHash: app.ipfsDocHash,
      applicant: app.applicant,
      status: app.status,
      timestamp: app.timestamp.toNumber(),
    }));
  };

  return {
    address,
    connectWithMetamask,
    disconnectWallet,
    isAdmin,
    isValidator,
    isScholar,
    contract,
    submitScholarshipApplication,
    reviewScholarshipApplication,
    createScholarMilestone, 
    submitScholarMilestoneProof,
    reviewScholarMilestone,
    donateToScholar,
    getScholars,
    getPendingApplications,
  };
}
