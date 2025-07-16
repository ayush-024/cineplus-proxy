import axios from 'axios';
import { URL } from 'url';
import querystring from 'querystring';

export default async (req, res) => {
  try {
    // Get the target URL from query parameter or use default
    const url1 = req.query.url;
    
    if (!url1) {
      res.setHeader('Content-Type', 'application/json');
      res.status(400).json({ error: "No url Parameter" });
      return;
    }

    const url = decodeURIComponent(url1);

    // Set headers
    const headers = {
      'Referer': 'https://videostr.net/',
      'Origin': 'https://videostr.net'
    };

    // Make the request
    const response = await axios.get(url, {
      headers,
      responseType: 'text',
      maxRedirects: 10,
      httpsAgent: new (require('https').Agent)({ 
        rejectUnauthorized: false 
      })
    });

    // Set response headers
    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    res.setHeader('X-Accel-Buffering', 'no');
    res.setHeader('X-Content-Duration', '0');

    res.send(response);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).send(`Proxy error: ${error.message}`);
  }
};
