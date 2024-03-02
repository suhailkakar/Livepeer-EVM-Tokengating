import React, { useEffect, useState } from "react";
import { Nav, Page } from "../../components";
import { Player } from "@livepeer/react";
import { useRouter } from "next/router";
import axios from "axios";
import { Stream, StreamRequirements } from "../../types/index";
import ReactLoading from "react-loading";



export default function Create() {

  const [stream, setStream] = useState<Stream>();
  const [canWatch, setCanWatch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [jwt, setJwt] = useState("");
  const router = useRouter();

  const { id } = router.query;

  const createJwt = async () => {
    const body = {
      playbackId: id,
      secret: '0x123',
    };
    console.log(body);
    const { data } = await axios.post("/api/jwt/create", body);
    console.log(data);
    setJwt(data.token);
    play(true);
  };

  const getStream = async () => {
    const { data } = await axios.get<Stream>(`/api/stream/get?id=${id}`);
    if (data) {
      setStream(data);

    } else {
      alert("Stream not found");
    }
  };



  const play = (canPlay: boolean) => {
    if (canPlay) {
      setCanWatch(true);
      setIsLoading(false);
    } else {
      setCanWatch(false);
      setIsLoading(false);
    }
  };


  const TokenFromChainId = (chainId: number) => {
    switch (chainId) {
      case 1:
        return "ETH";
      case 5:
        return "Goerli ETH";
      case 137:
        return "MATIC";
      case 80001:
        return "Mumbai MATIC";
      case 42161:
        return "Arb ETH";
      case 421611:
        return "Arb TEST ETH";
      case 10:
        return "Optimism ETH";
      default:
        return;
    }
  };

  return (
    <Page>
      <Nav />
        <>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center mt-60">
              <ReactLoading type="spinningBubbles" color="#FAB14F" width={80} />
              <p className="mt-12 text-zinc-400">
                Authenticating, please wait.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center mt-40">
              {canWatch ? (
                <div className="w-1/2">
                  <Player
                    title={stream?.streamName}
                    showPipButton
                    jwt={jwt}
                    playbackId={stream?.playbackId}
                  />
                </div>
              ) : (
                <>
                  <p className="text-zinc-400 max-w-[70%] text-center">
                    Oops, you need to have
                    <span className="text-primary">
                      {stream?.requirements.isToken &&
                        " minimum " +
                          stream?.requirements.TokenAmount +
                          ` ${TokenFromChainId(
                            Number(stream?.requirements.chain)
                          )} `}
                      {stream?.requirements?.isToken &&
                        stream?.requirements?.isAssetAddress &&
                        "and"}{" "}
                      {stream?.requirements.isAssetAddress &&
                        stream?.requirements.assetAddress + " Asset "}
                    </span>
                    to watch this stream.
                  </p>
                </>
              )}
            </div>
          )}
        </>
    </Page>
  );
}
