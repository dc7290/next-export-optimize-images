---
description: This page is to introduce examples of use.
---

# Examples

## Use with next/image

In this section, we will introduce how to combine “image optimization during build time using next-export-optimize-images” and “image optimization on demand using next/image”.

```js title="next.config.js"
const withExportImages = require('next-export-optimize-images')

module.exports = withExportImages({
  output: 'export',
  images: {
    loader: 'default',
  },
  // write your next.js configuration values.
})
```

```jsx
import NextImage from 'next/image'
import Image from 'next-export-optimize-images/image'

export default function Home() {
  return (
    <div>
      <NextImage src="https://example.com/img.png" width={1280} height={640} alt="" />
      <Image src="/img.png" width={1280} height={640} alt="" />
    </div>
  )
}
```

## Set the `deviceSizes`

```js title="next.config.js"
module.exports = withExportImages({
  images: {
    deviceSizes: [640, 960, 1280, 1600, 1920],
  },
})
```

## Set the `placeholder`

```jsx
<Image src="/img.png" width={1280} height={640} alt="" placeholder="blur" />
```
