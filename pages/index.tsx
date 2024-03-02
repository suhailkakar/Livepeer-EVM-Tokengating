import Head from "next/head";
import { Hero } from "../components";
import { StickyScrollRevealDemo } from "../components/home/StickyScrollRevealDemo";
import { TracingBeam } from "../components/ui/tracing-beam";
import Section from "../components/home/Section";
import Start from "../components/home/Start";

export default function Home() {
  return (
    <>
      <Head>
        <title>No Bananas: Safe Streaming for Everyone</title>
        <meta name="description" content="No Bananas uses cutting-edge AI to moderate live streams in real-time, ensuring a safe viewing experience free from unwanted surprises. Join us in making live streaming fun and safe for all." />
        <meta name="keywords" content="No Bananas, safe streaming, live stream moderation, AI content moderation, family-friendly streaming" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://www.nobananas.com/" />
        <link rel="icon" type="image/png" href="/favicon.ico" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nobananas.com/" />
        <meta property="og:title" content="No Bananas: Safe Streaming for Everyone" />
        <meta property="og:description" content="No Bananas uses cutting-edge AI to ensure live streams are safe and enjoyable. Experience streaming without the unwanted surprises." />
        <meta property="og:image" content="https://www.nobananas.com/path/to/image.jpg" />


        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@NoBananasApp" />
        <meta name="twitter:title" content="No Bananas: Safe Streaming for Everyone" />
        <meta name="twitter:description" content="Join No Bananas in making live streaming fun and safe again. Our AI moderation technology keeps the surprises out and the fun in." />
        <meta name="twitter:image" content="https://www.nobananas.com/path/to/twitter-image.jpg" />
      </Head>
      <Hero />
      {/* <StickyScrollRevealDemo /> */}
      <div className="pl-4 md:px-0">
        <Section />
      </div>
      <Start />
    </>
  )
}
