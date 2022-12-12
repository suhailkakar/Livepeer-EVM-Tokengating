import React, { useEffect, useState } from "react";
import { Nav, Page } from "../../components";
import { Player } from "@livepeer/react";
import { useRouter } from "next/router";
import axios from "axios";
import { Stream, StreamRequirements } from "../../types/index";
import ReactLoading from "react-loading";
import ConnectWallet from "../../components/ConnectWallet";
import { useAccount, useBalance, useNetwork, useSwitchNetwork } from "wagmi";
import { ethers } from "ethers";

export default function Create() {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { data: balance } = useBalance({
    address: address,
  });

  const [stream, setStream] = useState<Stream>();
  const [canWatch, setCanWatch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [jwt, setJwt] = useState("");
  const router = useRouter();

  const { id } = router.query;

  const createJwt = async () => {
    const body = {
      playbackId: id,
      secret: address,
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
      const { requirements, playbackId, streamName } = data;
      if (requirements.chain == chain?.id) {
        checkRequirements(requirements);
      } else {
        switchNetwork?.(Number(requirements.chain));
      }
    } else {
      alert("Stream not found");
    }
  };

  const checkRequirements = async (requirements: StreamRequirements) => {
    const { isToken, isAssetAddress, TokenAmount, assetAddress } = requirements;
    if (isToken) {
      if (Number(TokenAmount) > Number(balance?.formatted)) {
        play(false);
      } else {
        createJwt();
      }
    } else if (isAssetAddress) {
      const data = await getNFTs(address, assetAddress);
      if (data.length > 0) {
        createJwt();
      } else {
        play(false);
      }
    } else if (isToken && isAssetAddress) {
      const data = await getNFTs(address, assetAddress);
      if (Number(TokenAmount) > Number(balance?.formatted) && data.length > 0) {
        play(false);
      } else {
        createJwt();
      }
    }

    return;
  };

  const getNFTs = async (
    address: `0x${string}` | undefined,
    assetAddress: string | null
  ) => {
    const { data } = await axios.get(
      `https://api.opensea.io/api/v1/assets?format=json&owner=${address}`
    );
    const NFTs = data?.assets.filter((asset: any) => {
      return asset.asset_contract.address == assetAddress;
    });

    return NFTs;
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

  useEffect(() => {
    setIsLoading(true);
    if (address) {
      getStream();
    }
  }, [address]);

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
      {!address ? (
        <>
          <ConnectWallet />
        </>
      ) : (
        <>
          {isLoading ? (
            <div className="flex flex-col mt-60 justify-center items-center">
              <ReactLoading type="spinningBubbles" color="#FAB14F" width={80} />
              <p className="mt-12 text-zinc-400">
                Authenticating, please wait.
              </p>
            </div>
          ) : (
            <div className="flex flex-col mt-40 justify-center items-center">
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
      )}
    </Page>
  );
}
