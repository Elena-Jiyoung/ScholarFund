const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("Deploying ScholarFund smart contract...");

  // Get the ContractFactory
  const ScholarFund = await hre.ethers.getContractFactory("ScholarFund");
  
  // Deploy the contract
  const scholarFund = await ScholarFund.deploy();
  
  // Wait for deployment to finish
  await scholarFund.deployed();
  
  console.log("ScholarFund deployed to:", scholarFund.address);

  // Get the contract ABI
  const artifact = artifacts.readArtifactSync("ScholarFund");

  // Create the ABI file
  const abiDir = path.join(__dirname, "../src");
  if (!fs.existsSync(abiDir)) {
    fs.mkdirSync(abiDir, { recursive: true });
  }
  
  // Save ABI to file
  fs.writeFileSync(
    path.join(abiDir, "ScholarFundABI.json"),
    JSON.stringify(artifact.abi, null, 2)
  );
  
  console.log("Contract ABI written to:", path.join(abiDir, "ScholarFundABI.json"));

  // Save contract address for frontend
  const configData = {
    CONTRACT_ADDRESS: scholarFund.address,
    CHAIN_ID: hre.network.config.chainId
  };
  
  fs.writeFileSync(
    path.join(abiDir, "contract-config.json"),
    JSON.stringify(configData, null, 2)
  );
  
  console.log("Contract config written to:", path.join(abiDir, "contract-config.json"));
  
  console.log("Deployment complete!");
}

// Execute the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });