const metascraper = require("metascraper")([
  require("metascraper-author")(),
  require("metascraper-description")(),
  require("metascraper-image")(),
  require("metascraper-title")(),
  require("./metascraper-safe-iframe")(),
]);

const cheerio = require("cheerio");
const { URL } = require("url");
const crypto = require("crypto");

async function extractMedia({ url, ...rest }) {
  let html;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const response = await fetch(url, { signal: controller.signal });

    clearTimeout(timeout);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    html = await response.text();
  } catch (err) {
    console.error("Failed to fetch HTML:", err);
    return { error: "Failed to fetch or parse the content." };
  }

  const result = await metascraper({
    url,
    html,
    iframe: { ...rest },
    isSupportedDomain: true,
  });

  const { iframe, ...other } = result;
  const iframeResult = iframe || {};
  const key = crypto.randomBytes(4).toString("hex");

  const media = {
    mediaId: key,
    title: iframeResult.title ?? other.title,
    description: other.description,
    authorName: iframeResult.author_name ?? other.author,
    href: url,
  };

  try {
    media.domain = new URL(media.href).hostname;
  } catch {}

  media.iframeWidth = Number(iframeResult.width) || undefined;
  media.iframeHeight = Number(iframeResult.height) || undefined;
  media.thumbnailUrl = iframeResult.thumbnail_url ?? other.image;

  if (media.thumbnailUrl) {
    media.thumbnailWidth = Number(iframeResult.thumbnail_width) || undefined;
    media.thumbnailHeight = Number(iframeResult.thumbnail_height) || undefined;
    media.thumbnailImageId = "";
  }

  if (iframeResult.html) {
    const $ = cheerio.load(iframeResult.html);
    const iframe = $("iframe").first();

    if (iframe.length) {
      media.iframeSrc = iframe.attr("src");

      const attrs = Object.fromEntries(
        Object.entries(iframe.attr() || {}).filter(
          ([key]) => !["src", "width", "height"].includes(key)
        )
      );

      media.iframeAttr = attrs;
    }
  }

  return media;
}

module.exports = { extractMedia };
