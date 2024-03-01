import React, { useRef, useEffect, useState } from 'react';

const CanvasStreamer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  let ws: WebSocket | null = null;
  let animationFrameId: number;

  useEffect(() => {
    // Request access to the webcam
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => {
        console.error("Error accessing the webcam:", err);
      });

    // Cleanup function to handle component unmount
    return () => {
      if (ws) {
        console.log('Closing WebSocket connection');
        ws.close();
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const startStreaming = () => {
    if (!canvasRef.current || !videoRef.current) {
      console.error('Canvas or video reference is null');
      return;
    }
    const context = canvasRef.current.getContext('2d');
    if (!context) {
      console.error('Failed to get canvas context');
      return;
    }

    videoRef.current.play().catch(err => console.error("Error playing the video:", err));
    drawVideoToCanvas(context, videoRef.current);

    try {
      ws = new WebSocket('ws://localhost:5009/stream');
      ws.onopen = () => {
        console.log('WebSocket connection established');
        setIsStreaming(true);
      };
      ws.onerror = (error) => {
        console.error('WebSocket Error:', error);
      };
      ws.onclose = () => {
        console.log('WebSocket connection closed');
        setIsStreaming(false);
      };

      const canvasStream = canvasRef.current.captureStream(25); // 25 FPS
      setupMediaRecorder(canvasStream);
    } catch (error) {
      console.error('Streaming initialization failed:', error);
    }
  };

  const drawVideoToCanvas = (context: CanvasRenderingContext2D, video: HTMLVideoElement) => {
    const draw = () => {
      if (canvasRef.current) {
        context.drawImage(video, 0, 0, canvasRef.current.width, canvasRef.current.height);
      }
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();
  };

  const setupMediaRecorder = (stream: MediaStream) => {
    if (!ws) {
        console.error('WebSocket is not initialized');
        return;
      }
      try {
        const mediaRecorder = new MediaRecorder(stream);
  
        mediaRecorder.ondataavailable = (event: BlobEvent) => {
          if (event.data.size > 0 && ws && ws.readyState === WebSocket.OPEN) {
            ws.send(event.data);
          }
        };
  
        mediaRecorder.onstop = () => {
          console.log('MediaRecorder stopped');
        };
  
        mediaRecorder.onerror = (event) => {
          console.error('MediaRecorder error:', event);
        };
  
        mediaRecorder.start(100); // Capture 100ms chunks of data
      } catch (error) {
        console.error('MediaRecorder setup failed:', error);
      }
  };

  return (
    <div>
      <video ref={videoRef} style={{ display: 'none' }}></video>
      <canvas ref={canvasRef} width="640" height="480"></canvas>
      {!isStreaming && (
        <button onClick={startStreaming}>Start Streaming</button>
      )}
    </div>
  );
};

export default CanvasStreamer;
