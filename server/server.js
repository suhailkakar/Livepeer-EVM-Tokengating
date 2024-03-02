const express = require('express');
const { spawn } = require('child_process');
const app = express();
const port = 5009;

app.use(express.raw({ type: 'application/octet-stream', limit: '200mb' }));

app.post('/stream', (req, res) => {
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
    'rtmp://rtmp.livepeer.com/live'
  ]);

  req.pipe(ffmpeg.stdin);

  ffmpeg.stderr.on('data', (data) => {
    console.log(`FFmpeg stderr: ${data}`);
  });
console.log('Stream started');
  ffmpeg.on('close', (code) => {
    console.log(`FFmpeg exited with code ${code}`);
    res.send('Stream ended');
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
