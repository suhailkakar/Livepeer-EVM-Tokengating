//React functional component that takes the users camera and microphone places it in a canvas element then streams it to a livepeer stream
// This is the main page for the broadcast feature


import React, { useEffect, useState } from "react";
import { Page, Nav } from "../../components";
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

const redirectUrl = `https://mia-prod-catalyst-0.lp-playback.studio:443/webrtc/c84c-6dgz-iij5-mt1u`;
// we use the host from the redirect URL in the ICE server configuration
const host = new URL(redirectUrl).host;
console.log("host",host);
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
let videoTransceiver:any;
let audioTransceiver:any;
if (newVideoTrack) {
    videoTransceiver =
      peerConnection?.addTransceiver(newVideoTrack, {
        direction: "sendonly",
      }) ?? null;
  }
  
  if (newAudioTrack) {
    audioTransceiver =
      peerConnection?.addTransceiver(newAudioTrack, {
        direction: "sendonly",
      }) ?? null;
  }

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createOffer
 * We create an SDP offer here which will be shared with the server
 */
const offer = await peerConnection.createOffer();
/** https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/setLocalDescription */
await peerConnection.setLocalDescription(offer);
console.log("establishing connection", offer);
let ofr:any;
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
    headers: {
        "content-type": "application/sdp"
    },
    //ignore ts error
    // eslint-disable-next-line 
    body: ofr.sdp,
});
console.log("sdp",sdpResponse);
if (sdpResponse.ok) {
    const answerSDP = await sdpResponse.text();
    await peerConnection.setRemoteDescription(
        new RTCSessionDescription({ type: "answer", sdp: answerSDP })
    );
}

};

// fetch("https://livepeer.studio/api/stream/e98a6f94-2e9e-48d5-85f3-b9dc38860f7f", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "en-US,en;q=0.9,es;q=0.8",
//     "authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzZDdlMTg5My1kMTdlLTRmMDctYjFjZS1kZDdmZDBmYTgyOGUiLCJhdWQiOiJodHRwczovL2xpdmVwZWVyLmNvbSIsImlhdCI6MTcwOTI1NTkwNiwiZXhwIjoxNzA5MzQyMzA2LCJqdGkiOiIzNDczMDNhZS00MTEzLTQ3NWEtODU3MC02Y2QwNzUwZTM1NTQifQ.eEWITNzWibTPCs72hZiv8n2t7Xu-JdGHPW1N7HjoMiU",
//     "cache-control": "no-cache",
//     "pragma": "no-cache",
//     "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "cookie": "_ga=GA1.2.1375635969.1709052621; ajs_anonymous_id=88fb7738-edc2-4541-bf5d-fb2b52e59a63; messagesUtk=dc914bb09a0b4ca7aa8060a277a47885; hubspotutk=da6b521287d99f7a329f5edd8dd7b028; __stripe_mid=bc746fa9-c9ec-48c3-8cd6-a5794e3b4f12fa8275; _hjSessionUser_2525106=eyJpZCI6ImVkNzg5ODc5LWYyZTUtNWVkYy04MGYwLTVhNTlmYTA2NzRjZCIsImNyZWF0ZWQiOjE3MDkwNTI2MjIwMDMsImV4aXN0aW5nIjp0cnVlfQ==; ajs_user_id=3d7e1893-d17e-4f07-b1ce-dd7fd0fa828e; amplitude_idundefinedlivepeer.studio=eyJvcHRPdXQiOmZhbHNlLCJzZXNzaW9uSWQiOm51bGwsImxhc3RFdmVudFRpbWUiOm51bGwsImV2ZW50SWQiOjAsImlkZW50aWZ5SWQiOjAsInNlcXVlbmNlTnVtYmVyIjowfQ==; _gid=GA1.2.241080112.1709255906; __hssrc=1; __hstc=218114822.da6b521287d99f7a329f5edd8dd7b028.1709052622865.1709263235543.1709271293647.7; _hjSession_2525106=eyJpZCI6ImUxMTJjN2E5LTRkYWUtNGY2OS1hNDcxLTk2YTA4OTRjY2E5MyIsImMiOjE3MDkyNzk3NDY3NDksInMiOjEsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowfQ==; __stripe_sid=8043af22-82c7-4cd8-bece-054cb5a7dc7a8e562b; muxData=mux_viewer_id=ea240e14-6441-4305-ad33-50afb5c5972e&msn=0.45992382886957417&sid=f2973bd9-ed30-44c1-9695-08c06db27f9a&sst=1709279018486&sex=1709280518862; _gat=1; amplitude_id_c10fdf95ae7cd6f8923b56eaab188f1clivepeer.studio=eyJkZXZpY2VJZCI6IjE5MmVjNjk1LTI2ZjgtNDI2ZC04NmVhLWY1N2Y3MWQ5MDQxNVIiLCJ1c2VySWQiOiIzZDdlMTg5My1kMTdlLTRmMDctYjFjZS1kZDdmZDBmYTgyOGUiLCJvcHRPdXQiOmZhbHNlLCJzZXNzaW9uSWQiOjE3MDkyNzk3NDY4NjksImxhc3RFdmVudFRpbWUiOjE3MDkyODI3OTIwNTksImV2ZW50SWQiOjE5MCwiaWRlbnRpZnlJZCI6OTMsInNlcXVlbmNlTnVtYmVyIjoyODN9; _ga_9597YH7JWX=GS1.2.1709279746.11.1.1709282792.0.0.0",
//     "Referer": "https://livepeer.studio/dashboard/streams/e98a6f94-2e9e-48d5-85f3-b9dc38860f7f",
//     "Referrer-Policy": "strict-origin-when-cross-origin"
//   },
//   "body": null,
//   "method": "GET"
// });

// fetch("https://mia-prod-catalyst-0.lp-playback.studio/webrtc/e98a-w9qr-9b8p-1w7a", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "en-US,en;q=0.9,es;q=0.8",
//     "cache-control": "no-cache",
//     "content-type": "application/sdp",
//     "pragma": "no-cache",
//     "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "cross-site",
//     "Referer": "https://livepeer.studio/",
//     "Referrer-Policy": "strict-origin-when-cross-origin"
//   },
//   "body": "v=0\r\no=- 4152449853526492258 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0 1\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\nm=video 65104 UDP/TLS/RTP/SAVPF 96 97 102 103 104 105 106 107 108 109 127 125 39 40 45 46 98 99 100 101 112 113 116 117 118\r\nc=IN IP4 79.127.201.98\r\na=rtcp:9 IN IP4 0.0.0.0\r\na=candidate:257956077 1 udp 2122260223 192.168.0.102 50691 typ host generation 0 network-id 1 network-cost 10\r\na=candidate:3714882914 1 udp 1686052607 97.118.228.78 50691 typ srflx raddr 192.168.0.102 rport 50691 generation 0 network-id 1 network-cost 10\r\na=candidate:4056599673 1 tcp 1518280447 192.168.0.102 9 typ host tcptype active generation 0 network-id 1 network-cost 10\r\na=candidate:1393104251 1 udp 41885695 79.127.201.98 65104 typ relay raddr 97.118.228.78 rport 50691 generation 0 network-id 1 network-cost 10\r\na=ice-ufrag:5Cyy\r\na=ice-pwd:e38z1NnuArU4ho7fVJB0XNQ/\r\na=ice-options:trickle\r\na=fingerprint:sha-256 E7:A8:D9:AA:2B:ED:39:BB:7C:08:C8:14:FA:4A:6B:44:E3:D7:90:29:F5:02:56:91:8C:A0:8C:6C:B7:BA:72:0B\r\na=setup:actpass\r\na=mid:0\r\na=extmap:1 urn:ietf:params:rtp-hdrext:toffset\r\na=extmap:2 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\na=extmap:3 urn:3gpp:video-orientation\r\na=extmap:4 http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01\r\na=extmap:5 http://www.webrtc.org/experiments/rtp-hdrext/playout-delay\r\na=extmap:6 http://www.webrtc.org/experiments/rtp-hdrext/video-content-type\r\na=extmap:7 http://www.webrtc.org/experiments/rtp-hdrext/video-timing\r\na=extmap:8 http://www.webrtc.org/experiments/rtp-hdrext/color-space\r\na=extmap:9 urn:ietf:params:rtp-hdrext:sdes:mid\r\na=extmap:10 urn:ietf:params:rtp-hdrext:sdes:rtp-stream-id\r\na=extmap:11 urn:ietf:params:rtp-hdrext:sdes:repaired-rtp-stream-id\r\na=sendonly\r\na=msid:- 865090b6-e0e1-4f53-95a0-98586d114cac\r\na=rtcp-mux\r\na=rtcp-rsize\r\na=rtpmap:96 VP8/90000\r\na=rtcp-fb:96 goog-remb\r\na=rtcp-fb:96 transport-cc\r\na=rtcp-fb:96 ccm fir\r\na=rtcp-fb:96 nack\r\na=rtcp-fb:96 nack pli\r\na=rtpmap:97 rtx/90000\r\na=fmtp:97 apt=96\r\na=rtpmap:102 H264/90000\r\na=rtcp-fb:102 goog-remb\r\na=rtcp-fb:102 transport-cc\r\na=rtcp-fb:102 ccm fir\r\na=rtcp-fb:102 nack\r\na=rtcp-fb:102 nack pli\r\na=fmtp:102 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42001f\r\na=rtpmap:103 rtx/90000\r\na=fmtp:103 apt=102\r\na=rtpmap:104 H264/90000\r\na=rtcp-fb:104 goog-remb\r\na=rtcp-fb:104 transport-cc\r\na=rtcp-fb:104 ccm fir\r\na=rtcp-fb:104 nack\r\na=rtcp-fb:104 nack pli\r\na=fmtp:104 level-asymmetry-allowed=1;packetization-mode=0;profile-level-id=42001f\r\na=rtpmap:105 rtx/90000\r\na=fmtp:105 apt=104\r\na=rtpmap:106 H264/90000\r\na=rtcp-fb:106 goog-remb\r\na=rtcp-fb:106 transport-cc\r\na=rtcp-fb:106 ccm fir\r\na=rtcp-fb:106 nack\r\na=rtcp-fb:106 nack pli\r\na=fmtp:106 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f\r\na=rtpmap:107 rtx/90000\r\na=fmtp:107 apt=106\r\na=rtpmap:108 H264/90000\r\na=rtcp-fb:108 goog-remb\r\na=rtcp-fb:108 transport-cc\r\na=rtcp-fb:108 ccm fir\r\na=rtcp-fb:108 nack\r\na=rtcp-fb:108 nack pli\r\na=fmtp:108 level-asymmetry-allowed=1;packetization-mode=0;profile-level-id=42e01f\r\na=rtpmap:109 rtx/90000\r\na=fmtp:109 apt=108\r\na=rtpmap:127 H264/90000\r\na=rtcp-fb:127 goog-remb\r\na=rtcp-fb:127 transport-cc\r\na=rtcp-fb:127 ccm fir\r\na=rtcp-fb:127 nack\r\na=rtcp-fb:127 nack pli\r\na=fmtp:127 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=4d001f\r\na=rtpmap:125 rtx/90000\r\na=fmtp:125 apt=127\r\na=rtpmap:39 H264/90000\r\na=rtcp-fb:39 goog-remb\r\na=rtcp-fb:39 transport-cc\r\na=rtcp-fb:39 ccm fir\r\na=rtcp-fb:39 nack\r\na=rtcp-fb:39 nack pli\r\na=fmtp:39 level-asymmetry-allowed=1;packetization-mode=0;profile-level-id=4d001f\r\na=rtpmap:40 rtx/90000\r\na=fmtp:40 apt=39\r\na=rtpmap:45 AV1/90000\r\na=rtcp-fb:45 goog-remb\r\na=rtcp-fb:45 transport-cc\r\na=rtcp-fb:45 ccm fir\r\na=rtcp-fb:45 nack\r\na=rtcp-fb:45 nack pli\r\na=rtpmap:46 rtx/90000\r\na=fmtp:46 apt=45\r\na=rtpmap:98 VP9/90000\r\na=rtcp-fb:98 goog-remb\r\na=rtcp-fb:98 transport-cc\r\na=rtcp-fb:98 ccm fir\r\na=rtcp-fb:98 nack\r\na=rtcp-fb:98 nack pli\r\na=fmtp:98 profile-id=0\r\na=rtpmap:99 rtx/90000\r\na=fmtp:99 apt=98\r\na=rtpmap:100 VP9/90000\r\na=rtcp-fb:100 goog-remb\r\na=rtcp-fb:100 transport-cc\r\na=rtcp-fb:100 ccm fir\r\na=rtcp-fb:100 nack\r\na=rtcp-fb:100 nack pli\r\na=fmtp:100 profile-id=2\r\na=rtpmap:101 rtx/90000\r\na=fmtp:101 apt=100\r\na=rtpmap:112 H264/90000\r\na=rtcp-fb:112 goog-remb\r\na=rtcp-fb:112 transport-cc\r\na=rtcp-fb:112 ccm fir\r\na=rtcp-fb:112 nack\r\na=rtcp-fb:112 nack pli\r\na=fmtp:112 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=64001f\r\na=rtpmap:113 rtx/90000\r\na=fmtp:113 apt=112\r\na=rtpmap:116 red/90000\r\na=rtpmap:117 rtx/90000\r\na=fmtp:117 apt=116\r\na=rtpmap:118 ulpfec/90000\r\na=ssrc-group:FID 1808041974 2380392315\r\na=ssrc:1808041974 cname:6eWCtXAKKSGTF7ys\r\na=ssrc:1808041974 msid:- 865090b6-e0e1-4f53-95a0-98586d114cac\r\na=ssrc:2380392315 cname:6eWCtXAKKSGTF7ys\r\na=ssrc:2380392315 msid:- 865090b6-e0e1-4f53-95a0-98586d114cac\r\nm=audio 65410 UDP/TLS/RTP/SAVPF 111 63 9 0 8 13 110 126\r\nc=IN IP4 79.127.201.98\r\na=rtcp:9 IN IP4 0.0.0.0\r\na=candidate:257956077 1 udp 2122260223 192.168.0.102 57302 typ host generation 0 network-id 1 network-cost 10\r\na=candidate:3714882914 1 udp 1686052607 97.118.228.78 57302 typ srflx raddr 192.168.0.102 rport 57302 generation 0 network-id 1 network-cost 10\r\na=candidate:4056599673 1 tcp 1518280447 192.168.0.102 9 typ host tcptype active generation 0 network-id 1 network-cost 10\r\na=candidate:1393104251 1 udp 41885695 79.127.201.98 65410 typ relay raddr 97.118.228.78 rport 57302 generation 0 network-id 1 network-cost 10\r\na=ice-ufrag:5Cyy\r\na=ice-pwd:e38z1NnuArU4ho7fVJB0XNQ/\r\na=ice-options:trickle\r\na=fingerprint:sha-256 E7:A8:D9:AA:2B:ED:39:BB:7C:08:C8:14:FA:4A:6B:44:E3:D7:90:29:F5:02:56:91:8C:A0:8C:6C:B7:BA:72:0B\r\na=setup:actpass\r\na=mid:1\r\na=extmap:14 urn:ietf:params:rtp-hdrext:ssrc-audio-level\r\na=extmap:2 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\na=extmap:4 http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01\r\na=extmap:9 urn:ietf:params:rtp-hdrext:sdes:mid\r\na=sendonly\r\na=msid:- 69f27463-69fe-4234-ba69-d8172495d151\r\na=rtcp-mux\r\na=rtpmap:111 opus/48000/2\r\na=rtcp-fb:111 transport-cc\r\na=fmtp:111 minptime=10;useinbandfec=1\r\na=rtpmap:63 red/48000/2\r\na=fmtp:63 111/111\r\na=rtpmap:9 G722/8000\r\na=rtpmap:0 PCMU/8000\r\na=rtpmap:8 PCMA/8000\r\na=rtpmap:13 CN/8000\r\na=rtpmap:110 telephone-event/48000\r\na=rtpmap:126 telephone-event/8000\r\na=ssrc:570339904 cname:6eWCtXAKKSGTF7ys\r\na=ssrc:570339904 msid:- 69f27463-69fe-4234-ba69-d8172495d151\r\n",
//   "method": "POST"
// });



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
                    Start Stream!
     </Button>
      </div>
    </Page>
  );
}