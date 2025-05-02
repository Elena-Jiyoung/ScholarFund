import {useScholarFundThirdWeb} from "../hooks/useScholarFundThirdWeb"; // Adjust the import path as necessary
import { useAddress, useMetamask, useDisconnect } from "@thirdweb-dev/react";
export default function ConnectWalletButton() {
    const address = useAddress();
    const connectWithMetamask = useMetamask();
    const disconnectWallet = useDisconnect();
    const { isAdmin, isValidator, isScholar } = useScholarFundThirdWeb(); // Adjust the import path as necessary
    const connectWallet = async () => {
        try {
            await connectWithMetamask();
        } catch (error) {
            console.error("Error connecting wallet:", error);
        }
    };
    const disconnectWalletHandler = () => {
        disconnectWallet();
    };
    return (
        <div className="wallet-connect">
            {!address ? (
                <button onClick={connectWallet}>Connect Wallet</button>
            ) : (
                <div>
                    <span>{address}</span>
                    <button onClick={disconnectWalletHandler}>Disconnect</button>
                </div>
            )}
            {isAdmin && <span>Role: Admin</span>}
            {isValidator && <span>Role: Validator</span>}
            {isScholar && <span>Role: Scholar</span>}
        </div>
    );
  }