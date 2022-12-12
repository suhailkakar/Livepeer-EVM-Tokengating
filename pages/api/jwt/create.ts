import { signAccessJwt } from "livepeer/crypto";
import { NextApiRequest, NextApiResponse } from "next";
import { Stream } from "../../../types";

const accessControl = {
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { playbackId, secret } = req.body;

  if (!accessControl.privateKey || !accessControl.publicKey) {
    return res
      .status(500)
      .json({ message: "Access control keys are not configured" });
  }
  if (!playbackId || !secret) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const token = await signAccessJwt({
    privateKey: accessControl.privateKey,
    publicKey: accessControl.publicKey,
    issuer: "Aptos",
    playbackId,
    expiration: "1hr",
  });
  return res.status(200).json({ token });
}
