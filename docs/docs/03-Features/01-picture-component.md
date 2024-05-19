---
description: This page introduces the Picture component for multiple image formats.
---

# Picture component

When pre-generating images, it is usually not possible to support multiple image formats using only the img tag.
By using the `Picture` component provided by this library, multiple image formats can be supported.

## Usage

```tsx
import Picture from 'next-export-optimize-images/picture'

function Component() {
  return (
    <>
      <Picture src="/images/img.png" width={1920} height={1280} alt="" />
      {/* 
        Or import as follows
        import img from './img.png'
        <Picture src={img} alt="" />
      */}
    </>
  )
}
```

At this time, the output is as follows (Some parts are omitted.)

```html
<picture>
  <source
    type="image/webp"
    srcset="/_next/static/chunks/images/img_1920_75.webp 1x, /_next/static/chunks/images/img_3840_75.webp 2x"
  />
  <img
    src="/_next/static/chunks/images/img_3840_75.png"
    srcset="/_next/static/chunks/images/img_1920_75.png 1x, /_next/static/chunks/images/img_3840_75.png 2x"
    width="1920"
    height="1280"
    loading="lazy"
    decoding="async"
    alt=""
  />
</picture>
```

## Definition

- props: `ImageProps`
- return: `JSX.Element`

※ `ImageProps` is the same as the props of the `Image` component provided by `next/image`.

## Advanced usage

By default, two image formats are output: the image format specified in src and webp.  
If a webp image is specified in src, only the webp image will be output.

You can enable AVIF support with the following configuration.

```js title="export-images.config.js"
/**
 * @type {import('next-export-optimize-images').Config}
 */
const config = {
  generateFormats: ['avif', 'webp'],
}

module.exports = config
```
