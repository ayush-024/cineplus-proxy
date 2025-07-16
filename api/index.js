import axios from 'axios';
import https from 'https';

export default async (req, res) => {
  try {
    const defaultUrl = "https://frostywinds73.pro/file2/pD9taokvuIgTd6~C7VzlVOfmywsz3JD2TMMYlZjabbp7iMjzk5on5G5forTdSM1t3VH74FjTqX09Sk~i5G2ye1BNPbrAy+8wBP0lvZX~~KZDlz~liznV60nIhtcVt+GvSkhVMCOsqAib45Gc1WWdLw64xZOoJOA6npybp30zUZA=/cGxheWxpc3QubTN1OA==.m3u8";
    const url1 = req.query.url || defaultUrl;

    const headers = {
      'Referer': 'https://videostr.net/',
      'Origin': 'https://videostr.net',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': '*/*',
    };

    const response = await axios.get(url1, {
      headers,
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      timeout: 10000,
      maxRedirects: 10,
    });

    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    res.send(response.data.replace(
      /https?:\/\/[^\s]+/g, 
      match => `/2?url=${encodeURIComponent(match)}`
    ));

  } catch (error) {
    console.error("Full error:", error.stack);
    res.status(500).send(`Proxy failed: ${error.message}`);
  }
};
