---
description: This page introduces the handling of external images.
---

# External images

This library can also handle external images.
This, like the other features, works at build time and does not affect development speed.

:::tip

In most cases, the use of the RemoteImage or RemotePicture component is recommended.  
[Docs: RemoteImage component](./remote-image-component)

:::

## Usage

```jsx
<Image src="https://next-export-optimize-images.vercel.app/og.png" width="1280" height="640" alt="" />
```

Need to add a setting to `export-images.config.js` as follows.

```js title="export-images.config.js"
module.exports = {
  remoteImages: ['https://next-export-optimize-images.vercel.app/og.png'],
  // remoteImages: async () => {
  //   const imageUrls = await getImageUrls() // get image urls from CMS, etc.
  //   return imageUrls
  // }
}
```

When in production, it will be rendered as follows. (Only important parts are shown.)

```jsx
<img
  srcset="/_next/static/chunks/images/og_1920_75.png 1x, /_next/static/chunks/images/og_3840_75.png 2x"
  src="/_next/static/chunks/images/og_3840_75.png"
/>
```

During development, as with local images, no optimization is performed.
Also, no downloading to local is performed.

```jsx
<img
  srcset="https://next-export-optimize-images.vercel.app/og.png?width=1920 1x, https://next-export-optimize-images.vercel.app/og.png?width=3840 2x"
  src="https://next-export-optimize-images.vercel.app/og.png?width=3840"
/>
```

### `remoteImagesDownloadsDelay`

- Type: number

In case you need to download a large amount of images from an external CDN with a rate limit, this will add delays between downloading images.

effectively this will add `sleep` function between downloads.
