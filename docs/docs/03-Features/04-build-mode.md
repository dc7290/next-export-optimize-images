---
description: This page introduces the build mode. How to build with next build && next start without using output 'export'.
---

# Build Mode

Build mode allows you to pre-optimize images even if you are using `next build` and `next start`. This allows you to run your application on the Next.js server while pre-optimizing only the images.

## Usage

To use build mode, you need to set the `mode` option to `'build'` in the `export-images.config.js` file.

```js title="export-images.config.js"
/**
 * @type {import('next-export-optimize-images').Config}
 */
const config = {
  mode: 'build',
}

module.exports = config
```

Then execute the normal build commands.

```sh
next build && next-export-optimize-images
```
