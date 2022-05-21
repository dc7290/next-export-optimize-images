---
sidebar_position: 3
description: This page introduces how to change the behavior of this library.
---

# Configuration

Default behavior can be changed as needed.  
Create `export-images.config.js` in the root.

```js title="export-images.config.js"
/**
 * @type {import('next-export-optimize-images').Config}
 */
const config = {
  // your configuration values.
}

module.exports = config
```

## Optional fields

### `outDir`

- Type: string
- Default: 'out'

Specify if you are customizing the default output directory, such as `next export -o outDir`.

### `imageDir`

- Type: string
- Default: '\_next/static/chunks/images'

You can customize the directory to output optimized images.  
The default is `'_next/static/chunks/images'`.

e.g. If `'_optimized'` is set.

```diff
- out/_next/static/chunks/images/filename.png
+ out/_optimized/filename.png
```

### `basePath`

- Type: string
- Default: ''

Required if you have set `basePath` in `next.config.js`.  
Please set the same value.

### `filenameGenerator`

- Type: function
- Argument: Object
- Return value: string

| Key       | Type   | Description                                                           | e.g. '/images/sample.png' | e.g. require('./sample.png') |
| --------- | ------ | --------------------------------------------------------------------- | ------------------------- | ---------------------------- |
| path      | string | The path portion.                                                     | /images                   | /\_next/static/media         |
| name      | string | The file name part.                                                   | sample                    | sample.{hash}                |
| width     | number | That image is the resized width.                                      | 1920                      | 1920                         |
| quality   | number | The `quality` specified in the `next/image` component. Default is 75. | 75                        | 75                           |
| extension | string | The extension of that image.                                          | png                       | png                          |

You can customize the generation of file names.

e.g. '/images/sample.png'

```js
const config = {
  filenameGenerator: ({ path, name, width, quality, extension }) =>
    `${path.replace(/^\//, '').replace(/\//g, '-')}-${name}.${width}.${quality}.${extension}`,
}
```

```diff
- '/images/sample_1920_75.png'
+ 'images-sample.1920.75.png'
```

#### ❗️Attention

When making this setting, make sure that the file names (including the path part) of different images do not cover each other.  
Specifically, include the name, width, quality, and extension in the return value. If path is not included, all src's should be specified with `import` or `require` so that they can be distinguished by their hash value even if they have the same filename.

### `sharpOptions`

- Type: Object

| Key  | Description                                     |
| ---- | ----------------------------------------------- |
| png  | https://sharp.pixelplumbing.com/api-output#png  |
| jpg  | https://sharp.pixelplumbing.com/api-output#jpeg |
| webp | https://sharp.pixelplumbing.com/api-output#webp |
| avif | https://sharp.pixelplumbing.com/api-output#avif |

You can set optimization options for each extension.  
Please refer to the official sharp documentation for more information.
