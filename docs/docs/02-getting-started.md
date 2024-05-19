---
description: This page introduces how to get started with this library.
---

# Getting Started

Install the package in the project that uses Next.js.

## Installation

```bash
yarn add -D next-export-optimize-images
```

## Usage

1. Write withExportImages in `next.config.js.`

```js title="next.config.js"
const withExportImages = require('next-export-optimize-images')

module.exports = withExportImages({
  output: 'export',
  // write your next.js configuration values.
})
```

Alternatively, if another plugin is used in conjunction, write

```js title="next.config.js"
const withExportImages = require('next-export-optimize-images')
const withAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withExportImages(
  withAnalyzer({
    output: 'export',
    // write your next.js configuration values.
  })
)
// Or
module.exports = async () => {
  const config = await withExportImages({
    output: 'export',
    // write your next.js configuration values.
  })

  return withAnalyzer(config)
}
```

:::note

`withExportImages` is an asynchronous function that returns a Promise, so either write `withExportImages` first or wait for the Promise to resolve before applying other plugins.

:::

2. Change the description of the `scripts` that do the `next build` in `package.json`

```diff title="package.json"
{
-  "build": "next build",
+  "build": "next build && next-export-optimize-images",
}
```

3. Import from `next-export-optimize-images/image` and use it.

```tsx
import Image from 'next-export-optimize-images/image'

<Image src="/images/img.png" width={1920} height={1280} alt="" />
// Or import as follows
import img from './img.png'
<Image src={img} alt="" />
// Or require as follows
<Image src={require('./img.png')} alt="" />
```

Alternatively, you can use `next/legacy/image`.

```tsx
import Image from 'next-export-optimize-images/legacy/image'

<Image src="/images/img.png" width={1920} height={1280} alt="" />
// Or import as follows
import img from './img.png'
<Image src={img} alt="" />
// Or require as follows
<Image src={require('./img.png')} alt="" />
```

## Local checks

1. Run `yarn build`.
2. Run `npx http-server out`
