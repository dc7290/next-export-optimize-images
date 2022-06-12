---
description: This page introduces the handling of external images.
---

# External images

This feature automatically downloads images locally if an external image URL is specified in src.  
This, like the other features, works at build time and does not affect development speed.

## Usage

```jsx
<Image src="https://next-export-optimize-images.vercel.app/og.png" width="1280" height="640" alt="" />
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
