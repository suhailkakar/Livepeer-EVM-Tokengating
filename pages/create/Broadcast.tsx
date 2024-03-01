//React functional component that takes the users camera and microphone places it in a canvas element then streams it to a livepeer stream
// This is the main page for the broadcast feature


import React, { useEffect, useState } from "react";
import { Page, Nav } from "../../components";
import { useCreateStream } from "@livepeer/react";

//react functional component

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

  //returning the page component
  return (
    <Page>
      <Nav />
      <div>
        <h1>Go Live</h1>
        <p>Click the button below to go live</p>
        {/* html canvas element that is populated by users webcam */}
        <canvas id="canvas" width="640" height="480"></canvas>
        {/* button to start the live stream */}
        <button>Go Live</button>
      </div>
    </Page>
  );
}