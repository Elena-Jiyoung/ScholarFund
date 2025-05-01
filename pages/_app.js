import "@/styles/globals.css";
import { createGlobalStyle } from 'styled-components';
import { ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react";
export const GlobalStyle = createGlobalStyle`

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Roboto", serif;
}
`    
export default function App({ Component, pageProps }) {
  return (
  <>
    <ThirdwebProvider
    activeChain="binance-testnet" 
    clientId="your-client-id-from-thirdweb"
    supportedWallets={[metamaskWallet({ recommended: true })]}
  >
    <Component {...pageProps} />
  </ThirdwebProvider>
  <GlobalStyle />
  </>
  )
}
