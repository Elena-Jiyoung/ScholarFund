import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import { createGlobalStyle } from 'styled-components';
import { ThirdwebProvider, metamaskWallet, ChainId } from "@thirdweb-dev/react";
import { BinanceTestnet } from '@thirdweb-dev/chains';
import Layout from '@/components/Layout/Layout';
import RoleBasedLayout from '@/components/Layout/RoleBasedLayout';
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

export default function App({ Component, pageProps }) {
  // List of public routes that don't need role-based protection
  const publicRoutes = ['/', '/apply'];
  const isPublicRoute = publicRoutes.includes(Component.route);

  return (
    <ThirdwebProvider
      activeChain={BinanceTestnet}
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
    >
      <GlobalStyle />
      <Layout>
        {isPublicRoute ? (
          <Component {...pageProps} />
        ) : (
          <RoleBasedLayout>
            <Component {...pageProps} />
          </RoleBasedLayout>
        )}
      </Layout>
    </ThirdwebProvider>
  );
}