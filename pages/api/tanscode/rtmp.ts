const express = require('express');
const { spawn } = require('child_process');
const app = express();
const port = 3000;

app.use(express.raw({ type: 'application/octet-stream', limit: '200mb' }));

app.post('/stream', (req:any, res:any) => {
  const ffmpeg = spawn('ffmpeg', [
    '-i', '-',
    '-c:v', 'libx264',
    '-preset', 'veryfast',
    '-maxrate', '3000k',
    '-bufsize', '6000k',
    '-pix_fmt', 'yuv420p',
    '-g', '50',
    '-c:a', 'aac',
    '-b:a', '160k',
    '-ac', '2',
    '-ar', '44100',
    '-f', 'flv',
    'rtmp://rtmp.livepeer.com:2935?streamid=b027-20qx-yap8-7ael'
  ]);

  req.pipe(ffmpeg.stdin);

  ffmpeg.stderr.on('data', (data:any) => {
    console.log(`FFmpeg stderr: ${data}`);
  });

  ffmpeg.on('close', (code:any) => {
    console.log(`FFmpeg exited with code ${code}`);
    res.send('Stream ended');
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
