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
  // write your next.js configuration values.
})
```

If you are using `next-compose-plugins`

```js title="next.config.js"
const withPlugins = require('next-compose-plugins')
const withExportImages = require('next-export-optimize-images')

module.exports = withPlugins(
  [
    withExportImages,
    // your other plugins here
  ],
  {
    // write your next.js configuration values.
  }
)
```

2. Change the description of the `scripts` that do the `next export` in `package.json`

```diff title="package.json"
{
-  "export": "next build && next export",
+  "export": "next build && next export && next-export-optimize-images",
}
```

3. Import and use next/image as usual.

```jsx
<Image src="/images/img.png" width={1920} height={1280} alt="" />
// Or import as follows
<Image src={require('./img.png')} alt="" />
```

Alternatively, you can use `next/future/image`.

```jsx
import Image from 'next/future/image'
;<Image src="/images/img.png" width={1920} height={1280} alt="" />
```

## Local checks

1. Run `yarn export`.
2. Run `npx http-server out`
