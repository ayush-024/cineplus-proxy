import axios from 'axios';

export default async (req, res) => {
  try {
    const url1 = req.query.url || encodeURIComponent("https://frostywinds73.pro/file2/pD9taokvuIgTd6~C7VzlVOfmywsz3JD2TMMYlZjabbp7iMjzk5on5G5forTdSM1t3VH74FjTqX09Sk~i5G2ye1BNPbrAy+8wBP0lvZX~~KZDlz~liznV60nIhtcVt+GvSkhVMCOsqAib45Gc1WWdLw64xZOoJOA6npybp30zUZA=/cGxheWxpc3QubTN1OA==.m3u8");
    
    if (!url1) {
      res.setHeader('Content-Type', 'application/json');
      res.status(400).json({ error: "No url Parameter" });
      return;
    }

    const url = decodeURIComponent(url1);

    // Enhanced headers to mimic a browser
    const headers = {
      'Referer': 'https://videostr.net/',
      'Origin': 'https://videostr.net'
    };

    const response = await axios.get(url, {
      headers,
      responseType: 'text',
      maxRedirects: 10,
      httpsAgent: new (require('https').Agent)({ 
        rejectUnauthorized: false 
      }),
      timeout: 10000
    });

    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    res.setHeader('X-Accel-Buffering', 'no');
    res.setHeader('X-Content-Duration', '0');

    const modifiedResponse = response.data.replace(
      /https?:\/\/[^\s]+/g,
      match => `/2?url=${encodeURIComponent(match)}`
    );

    res.send(modifiedResponse);
  } catch (error) {
    console.error('Proxy error:', error);
    if (error.response) {
      // Forward the status code from the target server
      res.status(error.response.status);
      error.response.headers && Object.entries(error.response.headers)
        .forEach(([key, value]) => res.setHeader(key, value));
      res.send(error.response.data);
    } else {
      res.status(500).send(`Proxy error: ${error.message}`);
    }
  }
};
