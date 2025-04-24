iframe extractor for [Textrix](https://github.com/abdulrahman-mh/textrix)

## API

GET /api/media?url=https://www.youtube.com/watch?v=lePGPRDTjOo

**Response**:

```json
{
  "mediaId": "a9c00400",
  "title": "An Overwhelmingly And Demoralizing Force - AI Forced On Employees",
  "description": "Twitch https://twitch.tv/ThePrimeagenDiscord https://discord.gg/ThePrimeagenBecome Backend Dev: https://boot.dev/prime(plus i make courses for them)This is a…",
  "authorName": "ThePrimeTime",
  "href": "https://www.youtube.com/watch?v=lePGPRDTjOo",
  "domain": "www.youtube.com",
  "iframeWidth": 200,
  "iframeHeight": 113,
  "thumbnailUrl": "https://i.ytimg.com/vi/lePGPRDTjOo/hqdefault.jpg",
  "thumbnailWidth": 480,
  "thumbnailHeight": 360,
  "thumbnailImageId": "",
  "iframeSrc": "https://www.youtube.com/embed/lePGPRDTjOo?feature=oembed",
  "iframeAttr": {
    "frameborder": "0",
    "allow": "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
    "referrerpolicy": "strict-origin-when-cross-origin",
    "allowfullscreen": "",
    "title": "An Overwhelmingly And Demoralizing Force - AI Forced On Employees"
  }
}
```
