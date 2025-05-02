import { useAddress, useDisconnect } from "@thirdweb-dev/react";
import { WalletContainer, WalletAddress, DisconnectButton } from './Styles/NavbarStyles';

export default function ConnectWalletButton() {
  const address = useAddress();
  const disconnect = useDisconnect();

  if (address) {
    return (
      <WalletContainer>
        <WalletAddress>
          {address.slice(0, 6)}...{address.slice(-4)}
        </WalletAddress>
        <DisconnectButton onClick={disconnect}>
          Disconnect
        </DisconnectButton>
      </WalletContainer>
    );
  }

  return (
    <DisconnectButton onClick={() => window.ethereum?.request({ method: 'eth_requestAccounts' })}>
      Connect Wallet
    </DisconnectButton>
  );
}