import type { AppProps } from "next/app";
// ignore ts error
// // eslint-disable-next-line
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




const LivepeerClient = createReactClient({
  provider: studioProvider({ apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY }),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LivepeerConfig client={LivepeerClient}>

        <Component {...pageProps} />
        <Toaster />

    </LivepeerConfig>
  );
}
export default MyApp;
