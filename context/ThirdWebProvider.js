import { ThirdwebProvider as ThirdwebSdkProvider } from '@thirdweb-dev/react';
import { Mumbai } from '@thirdweb-dev/chains';

/**
 * ThirdwebProvider component to wrap your application
 * This provides the ThirdWeb context to your components
 */
export function ThirdwebProvider({ children }) {
  // You can add more chains as needed
  const supportedChains = [Mumbai];
  
  // Your Thirdweb client ID (from dashboard.thirdweb.com)
  const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

  return (
    <ThirdwebSdkProvider
      activeChain={Mumbai}
      supportedChains={supportedChains}
      clientId={clientId}
    >
      {children}
    </ThirdwebSdkProvider>
  );
}