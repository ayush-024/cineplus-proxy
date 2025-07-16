import { createProxyMiddleware } from 'http-proxy-middleware';
import https from 'https';
import { URL } from 'url';

export default async (req, res) => {
  // Extract URL from query params
  const targetUrl = decodeURIComponent(req.query.url || 
    "https://frostywinds73.pro/file2/pD9taokvuIgTd6~C7VzlVOfmywsz3JD2TMMYlZjabbp7iMjzk5on5G5forTdSM1t3VH74FjTqX09Sk~i5G2ye1BNPbrAy+8wBP0lvZX~~KZDlz~liznV60nIhtcVt+GvSkhVMCOsqAib45Gc1WWdLw64xZOoJOA6npybp30zUZA=/cGxheWxpc3QubTN1OA==.m3u8");

  if (!targetUrl) {
    res.status(400).json({ error: "No URL parameter provided" });
    return;
  }

  // Set headers
  const headers = {
    'Referer': 'https://videostr.net/',
    'Origin': 'https://videostr.net'
  };

  // Helper function to modify URLs in the response
  const modifyUrl = (url) => `2.php?url=${encodeURIComponent(url)}`;

  try {
    // Fetch the target URL
    const response = await fetch(targetUrl, { headers });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    let data = await response.text();

    // Modify all URLs in the response
    data = data.replace(/https?:\/\/[^\s]+/g, modifyUrl);

    // Set response headers
    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    res.setHeader('X-Accel-Buffering', 'no');
    res.setHeader('X-Content-Duration', '0');

    // Send the modified response
    res.status(200).send(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};
