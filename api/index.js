import axios from 'axios';
import { URL } from 'url';
import querystring from 'querystring';

export default async (req, res) => {
  try {
    const url1 = req.query.url || "https://frostywinds73.pro/file2/pD9taokvuIgTd6~C7VzlVOfmywsz3JD2TMMYlZjabbp7iMjzk5on5G5forTdSM1t3VH74FjTqX09Sk~i5G2ye1BNPbrAy+8wBP0lvZX~~KZDlz~liznV60nIhtcVt+GvSkhVMCOsqAib45Gc1WWdLw64xZOoJOA6npybp30zUZA=/cGxheWxpc3QubTN1OA==.m3u8";
    
    if (!url1) {
      res.setHeader('Content-Type', 'application/json');
      res.status(400).json({ error: "No url Parameter" });
      return;
    }

    const url = decodeURIComponent(url1);

    // Enhanced headers to mimic a browser
    const headers = {
      'Referer': 'https://videostr.net/',
      'Origin': 'https://videostr.net',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': '*/*',
      'Accept-Language': 'en-US,en;q=0.9',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'cross-site'
    };

    // Equivalent to CURLOPT_RETURNTRANSFER and CURLOPT_FOLLOWLOCATION
    const response = await axios.get(url, {
      headers,
      responseType: 'text',          // Equivalent to CURLOPT_RETURNTRANSFER
      maxRedirects: 10,             // Equivalent to CURLOPT_FOLLOWLOCATION
      validateStatus: () => true,   // Don't throw on HTTP errors
      httpsAgent: new (require('https').Agent)({ 
        rejectUnauthorized: false 
      }),
      timeout: 10000,
      // Additional cURL-like options
      decompress: true,             // Automatically decompress responses
      transformResponse: [data => data] // Return raw response data
    });

    // Set response headers
    res.setHeader('Content-Type', response.headers['content-type'] || 'application/vnd.apple.mpegurl');
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    res.setHeader('X-Accel-Buffering', 'no');
    res.setHeader('X-Content-Duration', '0');

    // Modify URLs in the response
    const modifiedResponse = response.data.replace(
      /https?:\/\/[^\s]+/g,
      match => `/2?url=${encodeURIComponent(match)}`
    );

    res.send(modifiedResponse);
  } catch (error) {
    console.error('Proxy error:', error);
    if (error.response) {
      // Forward the status code and headers from the target server
      res.status(error.response.status);
      Object.entries(error.response.headers).forEach(([key, value]) => {
        res.setHeader(key, value);
      });
      res.send(error.response.data);
    } else {
      res.status(500).send(`Proxy error: ${error.message}`);
    }
  }
};
