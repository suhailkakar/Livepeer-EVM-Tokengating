import React, { useEffect, useState } from "react";
import { Page, Input, Button, Copy, Nav } from "../../components";
import { useCreateStream } from "@livepeer/react";
import { Stream, CreateSignedPlaybackResponse } from "../../types";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import Select from "../../components/shared/Select";
import Broadcast from "../create/Broadcast";
import Banner from "../banner";
import { useAccount } from "wagmi";


const options = [
  { value: "1", label: "Ethereum" },
  { value: "5", label: "Ethereum Goerli" },
  { value: "137", label: "Polygon" },
  { value: "80001", label: "Polygon Mumbai" },
  { value: "42161", label: "Arbitrum" },
  { value: "421611", label: "Arbitrum Testnet" },
  { value: "10", label: "Optimism" },
];

export default function Create() {
  const [streamName, setStreamName] = useState<string>("");
  const [assetAddress, setAssetAddress] = useState<string | null>(null);
  const [TokenAmount, setTokenAmount] = useState<string | null>(null);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [chain, setChain] = useState<string | null>("");

  const {
    mutate: createStream,
    data: stream,
    status,
  } = useCreateStream(
    streamName
      ? {
        name: streamName,
        playbackPolicy: { type: "jwt" },
      }
      : null
  );

  const saveStream = async () => {
    const body: Stream = {
      playbackId: stream?.playbackId,
      streamId: stream?.id,
      streamName: stream?.name,
      createdAt: new Date(),
      author: '0x123',
      requirements: {
        isAssetAddress: assetAddress ? true : false,
        isToken: TokenAmount ? true : false,
        assetAddress,
        TokenAmount,
        chain: chain ? Number(chain) : undefined,
      },
    };
    const { data } = await axios.post<CreateSignedPlaybackResponse>(
      "/api/stream/create",
      body
    );
    if (data) {
      console.log("Stream created successfully!");
      toast("Stream created successfully!", {
        icon: "🎉",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      const shareLink = `${window.location.origin}/watch/${stream?.playbackId}`;
      setShareLink(shareLink);
    }
  };

  const copy = () => {
    if (!shareLink) return;
    navigator.clipboard.writeText(shareLink);
    toast("Copied link to clipboard!", {
      icon: "📋",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  const { address, isConnecting, isDisconnected, isConnected } = useAccount();

  return (
    <>
      <Nav />
      <div className="flex flex-col items-center justify-center mx-12">
        <>
          {
            isConnected ?
              stream ? (
                <div className="w-1/2 mt-20">
                  <div className="flex flex-col mt-2">
                    {/* <div className="flex mt-2">
                  <p className="w-32 font-regular text-zinc-500 ">
                    Display Name:{" "}
                  </p>
                  <p className="ml-2 text-black">{stream?.name}</p>
                </div> */}

                    {/* <div className="flex mt-2">
                  <p className="w-32 font-regular text-zinc-500">
                    Playback Id:{" "}
                  </p>
                  <p className="ml-2 text-black">{stream?.playbackId}</p>
                </div> */}

                    {/* <div className="flex mt-2">
                  <p className="w-32 font-regular text-zinc-500">
                    Stream Key:{" "}
                  </p>
                  <p className="ml-2 text-black">{stream?.streamKey}</p>
                </div> */}

                    {/* <div className="flex mt-2">
                  <p className="w-32 font-regular text-zinc-500">
                    Ingest URL:{" "}
                  </p>
                  <p className="ml-2 text-black hover:text-primary hover:cursor-pointer">
                    {stream?.rtmpIngestUrl}
                  </p>
                </div> */}
                  </div>
                  <Broadcast />
                  <Button
                    className={`bg-zinc-700 text-black px-5 py-3 mt-2 border-none  ml-6 ${!shareLink ? " cursor-not-allowed opacity-20 " : ""
                      }`}
                    text="text-md"
                    onClick={copy}
                  >
                    Copy link
                    <Copy text={shareLink} />
                  </Button>
                </div>
              ) : (
                <>
                  <div className="w-1/3 mt-44">
                    <input
                      // label="Connected account"
                      placeholder={`${address}`}
                      onChange={(e) => setStreamName(e.target.value)}
                      value={address}
                      className="w-full h-12 px-4 border-2 border-primary bg-slate-900 text-white text-sm rounded-md"
                    />
                    <div className="flex justify-end">
                      <Button
                        className={`bg-primary border-primary text-background px-4 py-2.5 ${status === "loading" || !address || !streamName
                          ? "cursor-not-allowed opacity-20"
                          : ""
                          }`}
                        text="text-sm"
                        onClick={() => createStream?.()}
                      >
                        Start Streaming
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <Banner />
              )
          }
        </>

      </div>
    </>
  );
}
