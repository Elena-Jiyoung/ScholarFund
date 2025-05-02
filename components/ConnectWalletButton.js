import { useScholarFundThirdWeb } from "@/hooks/useScholarFundThirdWeb";
function ConnectWalletButton() {
    const { connectWithMetamask, address, disconnectWallet } = useScholarFundThirdWeb();
    
    return (
        <button onClick={address ? disconnectWallet : connectWithMetamask}>
        {address ? "Disconnect Wallet" : "Connect Wallet"} 
        </button>

    );
}
export default ConnectWalletButton;