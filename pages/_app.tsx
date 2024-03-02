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
