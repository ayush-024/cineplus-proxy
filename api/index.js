import axios from 'axios';
import https from 'https';

export default async (req, res) => {
  try {
    // Get URL or use default (NO encoding on default)
    const url1 = req.query.url || "https://frostywinds73.pro/file2/pD9taokvuIgTd6~C7VzlVOfmywsz3JD2TMMYlZjabbp7iMjzk5on5G5forTdSM1t3VH74FjTqX09Sk~i5G2ye1BNPbrAy+8wBP0lvZX~~KZDlz~liznV60nIhtcVt+GvSkhVMCOsqAib45Gc1WWdLw64xZOoJOA6npybp30zUZA=/cGxheWxpc3QubTN1OA==.m3u8";
    
    if (!url1) {
      return res.status(400).json({ error: "No url Parameter" });
    }

    // Use the URL directly (PHP version doesn't decode the default)
    const url = req.query.url ? decodeURIComponent(url1) : url1;

    const headers = {
      'Referer': 'https://videostr.net/',
      'Origin': 'https://videostr.net'
    };

    const response = await axios.get(url, {
      headers,
      responseType: 'text',
      maxRedirects: 10,
      httpsAgent: new https.Agent({ 
        rejectUnauthorized: false 
      }),
      timeout: 10000
    });

    // Set proper headers (remove application/json)
    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    res.setHeader('X-Accel-Buffering', 'no');
    res.setHeader('X-Content-Duration', '0');

    // Modify URLs to match PHP's pattern exactly
    const modifiedResponse = response.data.replace(
      /https?:\/\/[^\s]+/g,
      match => `/2?url=${encodeURIComponent(match)}`
    );

    return res.send(modifiedResponse);
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).send(`Proxy error: ${error.message}`);
  }
};
