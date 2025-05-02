import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react';
import { useScholarFundThirdWeb } from '@/hooks/useScholarFundThirdWeb'; // Adjust the import path as necessary
import styled from 'styled-components';

const WalletContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const WalletAddress = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #1e3a8a;
  background: #f8fafc;
  padding: 0.5rem 1rem;
  border-radius: 8px;
`;

const ConnectButton = styled.button`
  background-color: #1e3a8a;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #1e40af;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const DisconnectButton = styled(ConnectButton)`
  background-color: #e53e3e;
  
  &:hover {
    background-color: #c53030;
  }
`;

export default function ConnectWalletButton() {
    const address = useAddress();
    const connectWithMetamask = useMetamask();
    const disconnectWallet = useDisconnect();
    const { isAdmin, isValidator, isScholar } = useScholarFundThirdWeb(); // Adjust the import path as necessary
    const connectWalletHandler = async () => {
        try {
            await connectWithMetamask();
            console.log("[🧠] Current address:", address);
            console.log("[🦊] Has MetaMask:", typeof window.ethereum !== "undefined");
        } catch (error) {
            console.error("Error connecting wallet:", error);
        }
    };
    const disconnectWalletHandler = () => {
        disconnectWallet();
    };

  

  return (
    <WalletContainer>
    {!address ? (
        
    <ConnectButton onClick={connectWalletHandler}>
      Connect Wallet
    </ConnectButton> ) :  (
    <>
    <WalletAddress>{address.slice(0, 6)}...{address.slice(-4)}</WalletAddress>
    <DisconnectButton onClick={disconnectWalletHandler}>
      Disconnect
    </DisconnectButton>
    </>)}
    {isAdmin && <span>Role: Admin</span>}
    {isValidator && <span>Role: Validator</span>}
    {isScholar && <span>Role: Scholar</span>}
    </WalletContainer>
  );
}