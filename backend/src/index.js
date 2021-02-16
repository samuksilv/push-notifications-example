const express = require('express');
const webpush = require('web-push');
const cors = require("cors");

const PUBLIC_KEY = 'BAns8NPr33I84ZezmmTM9WO7R-XfDRwndsuRcqq4kZJfgAcqvJaEWzdz5q4dnXEAM0Ov2ggvXTJ0eM5_IDmnlxs';
const PRIVATE_KEY = 'kK9OPc191vGOXumW9mj_mAHoA9NiP9a8LgvCrQ6r_aE';
const HASH = 'cf9ee5bcb36b4936dd7064ee9b2f139e';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/subscribe', async (req, res) => {
  const { subscription } = req.body;

  const payload = JSON.stringify({
    title: 'Apenas um título para minha notificação',
    message: 'Naruto é melhor que dragonBall Z',
    urlImage: 'https://p1.hiclipart.com/preview/791/478/349/funny-firefox-naruto.jpg'
  });

  webpush.sendNotification(
    subscription,
    payload,
    {
      TTL: 24 * 60 * 60, // 1 dia
      vapidDetails: {
        privateKey: PRIVATE_KEY,
        publicKey: PUBLIC_KEY,
        subject: 'mailto:samuel.carvalho@yourdomain.com',
      },
      gcmAPIKey: HASH,
    });

  res.status(201).json();
});

app.get("/", (req, res) => {
  res.status(200).json({ ok: true });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`);
});