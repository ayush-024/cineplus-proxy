// pages/api/proxy.js

import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'No url parameter provided' });
  }

  const decodedUrl = decodeURIComponent(url);

  try {
    const response = await fetch(decodedUrl, {
      headers: {
        'Referer': 'https://videostr.net/',
        'Origin': 'https://videostr.net',
      },
    });

    // Forward original content-type from target
    const contentType = response.headers.get('content-type') || 'application/octet-stream';

    res.setHeader('Content-Type', contentType);
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    res.setHeader('X-Accel-Buffering', 'no');
    res.setHeader('X-Content-Duration', '0');

    const body = await response.buffer();
    res.send(body);

  } catch (error) {
    res.status(500).json({ error: 'Fetch failed', details: error.message });
  }
}
