---
description: This page introduces how to change the behavior of the plugins.
---

# Plugin Configuration

These are items that can be set by plugins used in `next.config.js`.

```js title="next.config.js"
const withExportImages = require('next-export-optimize-images')

module.exports = withExportImages(
  {
    // write your next.js configuration values.
  },
  {
    // Describe here.
  }
)
```

## Optional fields

### `configPath`

- Type: string
- Default: 'export-images.config.js'

You can specify the path to the configuration file.

e.g.

```js title="next.config.js"
const withExportImages = require('next-export-optimize-images')

module.exports = withExportImages(
  {
    // write your next.js configuration values.
  },
  {
    configPath: 'config/optimize.config.js',
  }
)
```
