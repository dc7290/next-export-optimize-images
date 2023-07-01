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

1. Change the description of the `scripts` that do the `next build` in `package.json`

```diff title="package.json"
{
-  "build": "next build",
+  "build": "next build && next-export-optimize-images",
}
```

3. Import and use next/image as usual.

```tsx
<Image src="/images/img.png" width={1920} height={1280} alt="" />
// Or import as follows
import img from './img.png'
<Image src={img} alt="" />
// Or require as follows
<Image src={require('./img.png')} alt="" />
```

Alternatively, you can use `next/legacy/image`.

```tsx
import Image from 'next/legacy/image'
;<Image src="/images/img.png" width={1920} height={1280} alt="" />
```

## Local checks

1. Run `yarn build`.
2. Run `npx http-server out`
