import type { AppProps } from "next/app";
import { providers } from "ethers";
import { WagmiConfig, createClient, configureChains, chain } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import "../styles/globals.css";
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { Toaster } from "react-hot-toast";

const { provider, chains } = configureChains(
  [
    chain.mainnet,
    chain.polygon,
    chain.arbitrum,
    chain.optimism,
    chain.polygonMumbai,
    chain.arbitrumGoerli,
    chain.optimismGoerli,
    chain.goerli,
  ],
  [publicProvider()]
);
const client = createClient({
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
  provider,
});

const LivepeerClient = createReactClient({
  provider: studioProvider({ apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY }),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LivepeerConfig client={LivepeerClient}>
      <WagmiConfig client={client}>
        <Component {...pageProps} />
        <Toaster />
      </WagmiConfig>
    </LivepeerConfig>
  );
}
export default MyApp;
