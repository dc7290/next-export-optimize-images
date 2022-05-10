# :warning:Attention

This repository is under development.
Breaking changes may be made without notice.

---

# :rocket:next-export-optimize-images

Using this repository, you can get the full benefits of `next/image` even when using `next export` by doing image optimization at build time.

This makes it possible to build a high performance website with this solution, whether you want to build a simple website or a completely static output.

## Feature

- Use `next/image` to optimize images at build time.
- All options for `next/image` available
- Support TypeScript

## Installation

```bash
yarn add -D next-export-optimize-images
```

## Usage

1. Write withExportImages in `next.config.js.`

```js
// next.config.js
const withExportImages = require('next-export-optimize-images')

module.exports = withExportImages(
  {
    // write your next.js configuration values.
  },
  {
    // write your withExportImages configuration values.
  }
)
```

If you are using `next-compose-plugins`

```js
// next.config.js
const withPlugins = require('next-compose-plugins')
const withExportImages = require('next-export-optimize-images')

module.exports = withPlugins(
  [
    [
      withExportImages,
      {
        // write your withExportImages configuration values.
      },
    ],
    // your other plugins here
  ],
  {
    // write your next.js configuration values.
  }
)
```

2. Change the description of the `scripts` that do the `next export` in `package.json`

```
{
-  "export": "next build && next export",
+  "export": "next build && next export && next-export-optimize-images",
}
```
