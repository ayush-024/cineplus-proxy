import axios from 'axios';

export default async (req, res) => {
  const DEFAULT_URL = "https://frostywinds73.pro/file2/pD9taokvuIgTd6~C7VzlVOfmywsz3JD2TMMYlZjabbp7iMjzk5on5G5forTdSM1t3VH74FjTqX09Sk~i5G2ye1BNPbrAy+8wBP0lvZX~~KZDlz~liznV60nIhtcVt+GvSkhVMCOsqAib45Gc1WWdLw64xZOoJOA6npybp30zUZA=/cGxheWxpc3QubTN1OA==.m3u8"; // Shortened for brevity
  const targetUrl = req.query.url ? decodeURIComponent(req.query.url) : DEFAULT_URL;

  if (!targetUrl) {
    return res.status(400).json({ error: "No URL provided" });
  }

  const headers = {
    Referer: 'https://videostr.net/',
    Origin: 'https://videostr.net',
  };

  try {
    const response = await axios.get(targetUrl, { headers });
    let data = response.data;

    // Modify all URLs in the response
    data = data.replace(/https?:\/\/[^\s]+/g, (url) => `/2?url=${encodeURIComponent(url)}`);

    // Set correct headers
    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    res.setHeader('Cache-Control', 'no-cache');
    res.status(200).send(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};
