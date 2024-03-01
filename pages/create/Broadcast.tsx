//React functional component that takes the users camera and microphone places it in a canvas element then streams it to a livepeer stream
// This is the main page for the broadcast feature


import React, { useEffect, useState } from "react";
import { Page, Nav } from "../../components";
import { useCreateStream } from "@livepeer/react";
import { Button } from "../../components/shared";
import 'webrtc';



export default function Broadcast() {
// populate the canvas element with the users webcam
    useEffect(() => {
        const video = document.createElement("video");
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        const context = canvas.getContext("2d");
        if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then(function (stream) {
            video.srcObject = stream;
            video.play();
            })
            .catch(function (err) {
            console.log("An error occurred: " + err);
            });
        }
        video.addEventListener("play", function () {
        setInterval(function () {
            context?.drawImage(video, 0, 0, 640, 480);
        }, 16);
        });
    }, []);

    // function to start livestream to rtmp://rtmp.livepeer.com/live/4f79-ii4v-fcmf-pqyj

    const startStream = async () => {
    // streams canvas to rtmp://rtmp.livepeer.com/live/4f79-ii4v-fcmf-pqyj
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const stream = canvas.captureStream(30);
    const mediaRecorder = new MediaRecorder(stream);

const redirectUrl = `https://lax-prod-catalyst-2.lp-playback.studio/webrtc/7450335d-bffa-4b38-82b9-ce0139ff4ff1`;
// we use the host from the redirect URL in the ICE server configuration
const host = new URL(redirectUrl).host;

const iceServers = [
  {
    urls: `stun:${host}`,
  },
  {
    urls: `turn:${host}`,
    username: "livepeer",
    credential: "livepeer",
  },
];

// get user media from the browser (which are camera/audio sources)
const mediaStream = stream
const peerConnection = new RTCPeerConnection({ iceServers });



const newVideoTrack = mediaStream?.getVideoTracks?.()?.[0] ?? null;
const newAudioTrack = mediaStream?.getAudioTracks?.()?.[0] ?? null;


/**
 * https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createOffer
 * We create an SDP offer here which will be shared with the server
 */
const offer = await peerConnection.createOffer();
/** https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/setLocalDescription */
await peerConnection.setLocalDescription(offer);
console.log("establishing connection", offer);
let ofr;
/** Wait for ICE gathering to complete */
ofr = await new Promise((resolve) => {
  /** Wait at most five seconds for ICE gathering. */
  setTimeout(() => {
    resolve(peerConnection.localDescription);
  }, 5000);
  peerConnection.onicegatheringstatechange = (_ev) => {
    if (peerConnection.iceGatheringState === "complete") {
      resolve(peerConnection.localDescription);
    }
  };
});
if (!ofr) {
  throw Error("failed to gather ICE candidates for offer");
}
/**
 * This response contains the server's SDP offer.
 * This specifies how the client should communicate,
 * and what kind of media client and server have negotiated to exchange.
 */


const sdpResponse = await fetch(redirectUrl, {
    method: "POST",
    mode: "cors",
    headers: {
        "content-type": "application/sdp",
    },
    //ignore ts error
    // eslint-disable-next-line 
    body: (ofr as { sdp: string }).sdp,
});
console.log("sdp",sdpResponse);
if (sdpResponse.ok) {
    const answerSDP = await sdpResponse.text();
    await peerConnection.setRemoteDescription(
        new RTCSessionDescription({ type: "answer", sdp: answerSDP })
    );
}

};


  //returning the page component
  return (
    <Page>
      <Nav />
      <div>
        {/* html canvas element that is populated by users webcam */}
        <canvas id="canvas" width="640" height="480"></canvas>
        {/* button to start the live stream */}
        <Button
                    className={`bg-primary border-primary text-background px-4 py-2.5`}
                    text="text-sm"
                    onClick={() => startStream()}
                  >
                    Start Stream
     </Button>
      </div>
    </Page>
  );
}