const express = require("express");
const cors = require("cors");
const { extractMedia } = require("./metascraper");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🌐 Media Scraper API is running!");
});

app.get("/api/media", async (req, res) => {
  const { url, ...rest } = req.query;

  if (!url) {
    return res
      .status(400)
      .json({ error: "Missing required query parameter: 'url'" });
  }

  try {
    const media = await extractMedia({ url: decodeURIComponent(url), ...rest });
    res.status(200).json(media);
  } catch (error) {
    console.error(`Error extracting media from ${url}:`, error);
    res.status(500).json({ error: "Failed to extract media." });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
