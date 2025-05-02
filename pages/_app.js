import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import { createGlobalStyle } from 'styled-components';
import { ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react";
import { BinanceTestnet } from "@thirdweb-dev/chains";

const inter = Inter({ subsets: ['latin'] });

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    font-family: ${inter.style.fontFamily};
    background-color: #f8fafc;
    color: #1e293b;
    line-height: 1.5;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }
`;

function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      clientId={"620a348eb66b1f63621e507c69f00129"}
      activeChain={BinanceTestnet}
      supportedWallets={[metamaskWallet()]}
    >
      <GlobalStyle />
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default App;