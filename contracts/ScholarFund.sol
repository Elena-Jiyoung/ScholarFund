// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title ScholarFund (Milestone Scholarship System)
 * @notice Admins or donors can create scholarship offers with milestone conditions. Students apply and unlock funds upon milestone verification.
 * @dev A decentralized scholarship platform using Proof of Authority for milestone verification
 */
contract ScholarFund {
    // State variables
    address public admin;
    uint256 public applicationCount;
    uint256 public scholarCount;

    // Enums
    enum ApplicationStatus { Pending, Approved, Rejected }
    enum MilestoneStatus { Pending, Submitted, Approved, Rejected }

    // Structs
    struct Application {
        uint256 id;
        address applicant;
        string name;
        string university;
        string major;
        uint256 fundingRequested;
        string ipfsDocHash;
        ApplicationStatus status;
        uint256 timestamp;
    }

    struct Scholar {
        uint256 id;
        address payable walletAddress;
        string name;
        uint256 totalFunding;
        uint256 raisedAmount;
        uint256 releasedAmount;
        uint256 milestoneCount;
        bool isActive;
    }

    struct Milestone {
        uint256 id;
        uint256 scholarId;
        string title;
        string description;
        uint256 fundAmount;
        string ipfsProofHash;
        MilestoneStatus status;
        uint256 timestamp;
    }

    struct Donation {
        uint256 id;
        address donor;
        uint256 scholarId;
        uint256 amount;
        uint256 timestamp;
    }

    // Mappings
    mapping(uint256 => Application) public applications;
    mapping(uint256 => Scholar) public scholars;
    mapping(address => bool) public isScholar;
    mapping(uint256 => mapping(uint256 => Milestone)) public scholarMilestones;
    mapping(uint256 => uint256) public scholarMilestoneCount;
    mapping(uint256 => Donation) public donations;
    uint256 public donationCount;

    // Authority validators (for PoA)
    mapping(address => bool) public validators;
    uint256 public validatorCount;

    // Events
    event ApplicationSubmitted(uint256 indexed applicationId, address applicant, uint256 timestamp);
    event ApplicationStatusChanged(uint256 indexed applicationId, ApplicationStatus status);
    event ScholarAdded(uint256 indexed scholarId, address walletAddress, string name);
    event MilestoneCreated(uint256 indexed scholarId, uint256 milestoneId, string title);
    event MilestoneSubmitted(uint256 indexed scholarId, uint256 milestoneId, string ipfsProofHash);
    event MilestoneStatusChanged(uint256 indexed scholarId, uint256 milestoneId, MilestoneStatus status);
    event DonationReceived(uint256 indexed scholarId, address donor, uint256 amount);
    event FundsReleased(uint256 indexed scholarId, uint256 milestoneId, uint256 amount);
    event ValidatorAdded(address validator);
    event ValidatorRemoved(address validator);

    // Modifiers
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    modifier onlyValidator() {
        require(validators[msg.sender], "Only validators can call this function");
        _;
    }

    modifier onlyScholar(uint256 _scholarId) {
        require(msg.sender == scholars[_scholarId].walletAddress, "Only the scholar can call this function");
        _;
    }

    modifier scholarExists(uint256 _scholarId) {
        require(_scholarId > 0 && _scholarId <= scholarCount, "Invalid scholar ID");
        require(scholars[_scholarId].isActive, "Scholar is not active");
        _;
    }
    // Constructor
    constructor() {
        admin = msg.sender;
        validators[msg.sender] = true; // Admin is the first validator
        validatorCount = 1;
    }

    /**
     * @dev Add a new validator (PoA)
     * @param _validator Address of the new validator
     */
    function addValidator(address _validator) external onlyAdmin {
        require(_validator != address(0), "Invalid validator address");
        require(!validators[_validator], "Address is already a validator");
        
        validators[_validator] = true;
        validatorCount++;
        
        emit ValidatorAdded(_validator);
    }

    /**
     * @dev Remove a validator (PoA)
     * @param _validator Address of the validator to remove
     */
    function removeValidator(address _validator) external onlyAdmin {
        require(validators[_validator], "Address is not a validator");
        require(_validator != admin, "Cannot remove admin as validator");
        require(validatorCount > 1, "Cannot remove the last validator");
        
        validators[_validator] = false;
        validatorCount--;
        
        emit ValidatorRemoved(_validator);
    }

    /**
     * @dev Submit a scholarship application
     * @param _name Applicant's name
     * @param _university University name
     * @param _major Field of study
     * @param _fundingRequested Amount of funding requested (in wei)
     * @param _ipfsDocHash IPFS hash of supporting documents
     */
    function submitApplication(
        string memory _name,
        string memory _university,
        string memory _major,
        uint256 _fundingRequested,
        string memory _ipfsDocHash
    ) external {
        require(_fundingRequested > 0, "Funding requested must be greater than 0");
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_university).length > 0, "University cannot be empty");
        
        applicationCount++;
        
        applications[applicationCount] = Application({
            id: applicationCount,
            applicant: msg.sender,
            name: _name,
            university: _university,
            major: _major,
            fundingRequested: _fundingRequested,
            ipfsDocHash: _ipfsDocHash,
            status: ApplicationStatus.Pending,
            timestamp: block.timestamp
        });
        
        emit ApplicationSubmitted(applicationCount, msg.sender, block.timestamp);
    }
    
    /**
     * @dev Review and update application status
     * @param _applicationId Application ID
     * @param _status New status (1 = Approved, 2 = Rejected)
     */
    function reviewApplication(uint256 _applicationId, ApplicationStatus _status) external onlyValidator {
        require(_applicationId > 0 && _applicationId <= applicationCount, "Invalid application ID");
        require(_status != ApplicationStatus.Pending, "Cannot set status to Pending");
        require(applications[_applicationId].status == ApplicationStatus.Pending, "Application is not pending");
        
        applications[_applicationId].status = _status;
        
        // If application is approved, create a new scholar
        if (_status == ApplicationStatus.Approved) {
            Application memory app = applications[_applicationId];
            
            scholarCount++;
            
            scholars[scholarCount] = Scholar({
                id: scholarCount,
                walletAddress: payable(app.applicant),
                name: app.name,
                totalFunding: app.fundingRequested,
                raisedAmount: 0,
                releasedAmount: 0,
                milestoneCount: 0,
                isActive: true
            });
            
            isScholar[app.applicant] = true;
            
            emit ScholarAdded(scholarCount, app.applicant, app.name);
        }
        
        emit ApplicationStatusChanged(_applicationId, _status);
    }

    /**
     * @dev Create a milestone for a scholar
     * @param _scholarId Scholar ID
     * @param _title Milestone title
     * @param _description Milestone description
     * @param _fundAmount Amount of funds to release upon completion
     */
    function createMilestone(
        uint256 _scholarId,
        string memory _title,
        string memory _description,
        uint256 _fundAmount
    ) external onlyValidator scholarExists(_scholarId) {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(_fundAmount > 0, "Fund amount must be greater than 0");
        
        Scholar storage scholar = scholars[_scholarId];
        require(scholar.releasedAmount + _fundAmount <= scholar.totalFunding, "Exceeds total funding");
        
        uint256 milestoneId = scholarMilestoneCount[_scholarId] + 1;
        scholarMilestoneCount[_scholarId] = milestoneId;
        
        scholarMilestones[_scholarId][milestoneId] = Milestone({
            id: milestoneId,
            scholarId: _scholarId,
            title: _title,
            description: _description,
            fundAmount: _fundAmount,
            ipfsProofHash: "",
            status: MilestoneStatus.Pending,
            timestamp: block.timestamp
        });
        
        scholar.milestoneCount++;
        
        emit MilestoneCreated(_scholarId, milestoneId, _title);
    }

    /**
     * @dev Submit proof for a milestone
     * @param _scholarId Scholar ID
     * @param _milestoneId Milestone ID
     * @param _ipfsProofHash IPFS hash of proof documentation
     */
    function submitMilestoneProof(
        uint256 _scholarId,
        uint256 _milestoneId,
        string memory _ipfsProofHash
    ) external onlyScholar(_scholarId) scholarExists(_scholarId) {
        require(_milestoneId > 0 && _milestoneId <= scholarMilestoneCount[_scholarId], "Invalid milestone ID");
        require(bytes(_ipfsProofHash).length > 0, "IPFS hash cannot be empty");
        
        Milestone storage milestone = scholarMilestones[_scholarId][_milestoneId];
        require(milestone.status == MilestoneStatus.Pending, "Milestone is not in pending state");
        
        milestone.ipfsProofHash = _ipfsProofHash;
        milestone.status = MilestoneStatus.Submitted;
        milestone.timestamp = block.timestamp;
        
        emit MilestoneSubmitted(_scholarId, _milestoneId, _ipfsProofHash);
    }

    /**
     * @dev Review a milestone submission (PoA consensus)
     * @param _scholarId Scholar ID
     * @param _milestoneId Milestone ID
     * @param _approved Whether to approve or reject
     */
    function reviewMilestone(
        uint256 _scholarId,
        uint256 _milestoneId,
        bool _approved
    ) external onlyValidator scholarExists(_scholarId) {
        require(_milestoneId > 0 && _milestoneId <= scholarMilestoneCount[_scholarId], "Invalid milestone ID");
        
        Milestone storage milestone = scholarMilestones[_scholarId][_milestoneId];
        require(milestone.status == MilestoneStatus.Submitted, "Milestone is not submitted");
        
        if (_approved) {
            milestone.status = MilestoneStatus.Approved;
            
            // Check if there are enough funds to release
            Scholar storage scholar = scholars[_scholarId];
            require(scholar.raisedAmount >= scholar.releasedAmount + milestone.fundAmount, "Insufficient funds raised");
            
            // Update the released amount
            scholar.releasedAmount += milestone.fundAmount;
            
            // Transfer the funds to the scholar
            (bool success, ) = scholar.walletAddress.call{value: milestone.fundAmount}("");
            require(success, "Fund transfer failed");
            
            emit FundsReleased(_scholarId, _milestoneId, milestone.fundAmount);
        } else {
            milestone.status = MilestoneStatus.Rejected;
        }
        
        emit MilestoneStatusChanged(_scholarId, _milestoneId, milestone.status);
    }

    /**
     * @dev Donate funds to a specific scholar
     * @param _scholarId Scholar ID
     */
    function donate(uint256 _scholarId) external payable scholarExists(_scholarId) {
        require(msg.value > 0, "Donation amount must be greater than 0");
        
        Scholar storage scholar = scholars[_scholarId];
        
        // Update the raised amount
        scholar.raisedAmount += msg.value;
        
        // Record the donation
        donationCount++;
        donations[donationCount] = Donation({
            id: donationCount,
            donor: msg.sender,
            scholarId: _scholarId,
            amount: msg.value,
            timestamp: block.timestamp
        });
        
        emit DonationReceived(_scholarId, msg.sender, msg.value);
    }

    /**
     * @dev Get scholar details
     * @param _scholarId Scholar ID
     * @return scholar Scholar details
     */
    function getScholar(uint256 _scholarId) external view scholarExists(_scholarId) returns (Scholar memory) {
        return scholars[_scholarId];
    }

    /**
     * @dev Get milestone details
     * @param _scholarId Scholar ID
     * @param _milestoneId Milestone ID
     * @return milestone Milestone details
     */
    function getMilestone(uint256 _scholarId, uint256 _milestoneId) external view scholarExists(_scholarId) returns (Milestone memory) {
        require(_milestoneId > 0 && _milestoneId <= scholarMilestoneCount[_scholarId], "Invalid milestone ID");
        return scholarMilestones[_scholarId][_milestoneId];
    }

    /**
     * @dev Get all milestones for a scholar
     * @param _scholarId Scholar ID
     * @return Array of milestones
     */
    function getScholarMilestones(uint256 _scholarId) external view scholarExists(_scholarId) returns (Milestone[] memory) {
        uint256 count = scholarMilestoneCount[_scholarId];
        Milestone[] memory milestones = new Milestone[](count);
        
        for (uint256 i = 1; i <= count; i++) {
            milestones[i-1] = scholarMilestones[_scholarId][i];
        }
        
        return milestones;
    }

    /**
     * @dev Get application details
     * @param _applicationId Application ID
     * @return application Application details
     */
    function getApplication(uint256 _applicationId) external view returns (Application memory) {
        require(_applicationId > 0 && _applicationId <= applicationCount, "Invalid application ID");
        return applications[_applicationId];
    }

    /**
     * @dev Check if an address is a validator
     * @param _address Address to check
     * @return Boolean indicating if address is a validator
     */
    function isValidator(address _address) external view returns (bool) {
        return validators[_address];
    }

    /**
     * @dev Get all pending applications
     * @return Array of pending applications
     */
    function getPendingApplications() external view returns (Application[] memory) {
        uint256 pendingCount = 0;
        
        // Count pending applications
        for (uint256 i = 1; i <= applicationCount; i++) {
            if (applications[i].status == ApplicationStatus.Pending) {
                pendingCount++;
            }
        }
        
        // Create array of pending applications
        Application[] memory pendingApps = new Application[](pendingCount);
        uint256 currentIndex = 0;
        
        for (uint256 i = 1; i <= applicationCount; i++) {
            if (applications[i].status == ApplicationStatus.Pending) {
                pendingApps[currentIndex] = applications[i];
                currentIndex++;
            }
        }
        
        return pendingApps;
    }

    /**
     * @dev Get all pending milestone submissions
     * @return scholarIds Scholar IDs
     * @return milestoneIds Milestone IDs
     */
    function getPendingMilestoneSubmissions() external view returns (uint256[] memory, uint256[] memory) {
        uint256 pendingCount = 0;
        
        // Count pending milestone submissions
        for (uint256 i = 1; i <= scholarCount; i++) {
            if (scholars[i].isActive) {
                for (uint256 j = 1; j <= scholarMilestoneCount[i]; j++) {
                    if (scholarMilestones[i][j].status == MilestoneStatus.Submitted) {
                        pendingCount++;
                    }
                }
            }
        }
        
        // Create arrays of pending milestone submissions
        uint256[] memory scholarIds = new uint256[](pendingCount);
        uint256[] memory milestoneIds = new uint256[](pendingCount);
        uint256 currentIndex = 0;
        
        for (uint256 i = 1; i <= scholarCount; i++) {
            if (scholars[i].isActive) {
                for (uint256 j = 1; j <= scholarMilestoneCount[i]; j++) {
                    if (scholarMilestones[i][j].status == MilestoneStatus.Submitted) {
                        scholarIds[currentIndex] = i;
                        milestoneIds[currentIndex] = j;
                        currentIndex++;
                    }
                }
            }
        }
        
        return (scholarIds, milestoneIds);
    }

}
