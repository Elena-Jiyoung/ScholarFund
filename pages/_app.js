import "@/styles/globals.css";
import { createGlobalStyle } from 'styled-components';
import { ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react";
import { BinanceTestnet } from "@thirdweb-dev/chains";
export const GlobalStyle = createGlobalStyle`

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Roboto", serif;
}
`    
function App({ Component, pageProps }) {
  return (
   
      <ThirdwebProvider
        clientId={"620a348eb66b1f63621e507c69f00129"}
        activeChain={BinanceTestnet}
        supportedWallets={[metamaskWallet()]}
      >
        <Component {...pageProps} />
      </ThirdwebProvider>

  
  )
}

export default App;