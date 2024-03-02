import type { AppProps } from "next/app";
// ignore ts error
// // eslint-disable-next-line
import "../styles/globals.css";
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";
import { Toaster } from "react-hot-toast";
import { Web3Provider } from "../utils/Web3Provider";




const LivepeerClient = createReactClient({
  provider: studioProvider({ apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY }),
});

function MyApp({ Component, pageProps }: AppProps) {


  return (

    <LivepeerConfig client={LivepeerClient}>
      <Web3Provider>
        <Component {...pageProps} />
        <Toaster />
      </Web3Provider>
    </LivepeerConfig >

  );
}
export default MyApp;
