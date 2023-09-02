---
description: This page introduces how to change the behavior of this library.
---

# Basic Configuration

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

### `externalImageDir`

- Type: string
- Default: '\_next/static/media'

You can customize the directory to output downloaded external images.
The default is `'_next/static/media'`.

### `quality`

- Type: number
- Default: 75

  You can customize the quality of the optimized image.

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

### `sourceImageParser`

- Type: function
- Argument: Object
- Return value: ParsedImageInfo

The argument for this function will be an object with the following shape:

```typescript
{
  src: string // The source images 'src' attribute
  defaultParser: (src: string) => ParsedImageInfo // A function which evaluates the image name, path name (without image name appended and starting w/ '/'), and extension
}
```

The return value for this function will be an object with the following shape (ParsedImageInfo type):

```typescript
{
  pathWithoutName: string // The image path (not including the image name)
  name: string // The image name
  extension: string // The image extension
}
```

This might be useful if any of your images have URLs that do not follow the standard `https://somehost.com/imagename.extension` pattern.

For example: Maybe your source image's src attribute is more like `https://somedigitalassetmangementhost.com?fileId=1234-xyze&extension=jpg`, so you might add the following to your config:

**NOTE**
This gets run before filenameGenerator, so the arguments passed into filenameGenerator would be affected by sourceImageParser configuration. (path, name, and extension)

```typescript
// export-images.config.js
/**
 * @type {import('next-export-optimize-images').Config}
 */
const config = {
  sourceImageParser: ({ src, defaultParser }) => {
    const regExpMatches = src.match(/^.*\?fileId=(.*)&extension=(\w*).*$/)
    if (!regExpMatches) {
      return defaultParser(src)
    }

    // if the src has fileId and extension in its route then it
    // must be a non-standard image, so parse it differently for all intents
    // and purposes
    return {
      pathWithoutName: '', // maybe there is no path, or you can supply an arbitrary one for filename processing
      name: regExpMatches[1] || '',
      extension: regExpMatches[2] || '',
    }
  },
}
```

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

### `convertFormat`

- Type: Array<Array<Format, Format>>  
  Format → "jpeg" | "jpg" | "png" | "webp" | "avif"

It allows you to convert images from any extension to another extension.

e.g.

```js
const config = {
  convertFormat: [
    ['png', 'webp'],
    ['jpg', 'avif'],
  ],
}
```

```jsx
<Image src="/img.png" width={1280} height={640} alt="" />
<Image src="/img.jpg" width={1280} height={640} alt="" />
```

The original image will be kept, `img.png` will be converted to webp format and `img.jpg` will be converted to avif format and output to the directory.

### `generateFormats`

- Type: Array\<Format>  
  Format → "jpeg" | "jpg" | "png" | "webp" | "avif"

It allows you to generate extra images in extensions specified.

e.g. 

```js
const config = {
  generateFormats: ['jpg'],
}
```

```jsx
<Image src="/img.webp" width={1280} height={640} alt="" />
<Image src="/img.jpg" width={1280} height={640} alt="" />
```


The original image is `img.webp`. New image `img.jpg` is generated and output to the directory.
Generated images can be served in two ways:
- A picture tag
- A server that rewrites url based on HTTP request Accept header

### `remoteImages`

- Type: Array<string\> | (() => Array<string\> | Promise<Array<string\>\>)

You can directly specify the URL of an external image.  
This is useful in cases where it is not known what images will be used for the build using variables, for example.

https://next-export-optimize-images.vercel.app/docs/Features/external-images#when-specifying-an-external-image-url-with-a-variable
