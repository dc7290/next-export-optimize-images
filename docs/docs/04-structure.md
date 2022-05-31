---
description: This page introduces how this library works.
---

# Structure

This page explains how image optimization works.  
It will provide you with the following benefits.

- What you can do with this library will become clearer.
- It is a guidepost when something goes wrong.

## Processing step

First, let me explain roughly what kind of processing process is involved.

1. When you import next/image, change the webpack configuration to automatically load the custom component that wraps next/image from this library.
2. Receive information on images to be optimized through the loader in next/image and write it to a JSON file.
3. After `next export`, optimize the image based on the JSON file you just exported.

Also, when `next dev`, the loader returns the string almost as is, with the original image, so it does not take any time to build.

From here, I will explain in more depth.

## When you import next/image

```js
import Image from 'next/image'
```

Importing a `next/image` component like this will automatically alias it to `next-export-optimzie-images/dist/image`.  
This uses the `webpack` alias feature. (https://webpack.js.org/configuration/resolve/#resolvealias)

## Customize the `next/image` `loader`

The image component of this library defines an internally customized `loader`.  
This is used for the actual rendering `src` and `srcSet` etc. in `next/image`. Also, at build time, the list of images to be optimized is written to a JSON file.

At this time, a list of images to be optimized is created based on the `layout` attribute, the `sizes` attribute, the `placeholder` attribute, etc.  
Therefore, unused images are not created and build time is not needlessly increased.

For example, suppose you render two image components as follows.

```jsx
<>
  <Image src="/intrinsic.png" width={1280} height={640} alt="" />
  <Image src="/responsive.png" width={1280} height={640} alt="" layout="responsive" />
</>
```

The images created at this time are as follows

```
intrinsic_1280_75.png
intrinsic_2560_75.png
responsive_640_75.png
responsive_750_75.png
responsive_828_75.png
responsive_1080_75.png
responsive_1200_75.png
responsive_1920_75.png
responsive_2048_75.png
responsive_3840_75.png
```
:::info
Only file names are listed.  
Also, if you have set `deviceSizes` etc. in `next.config.js`, it is a little different.
:::

## Image optimization

Run `next-export-optimzie-images` to start optimizing the images.  
This is basically done after `yarn build && yarn export`.

The image is optimized based on the information in the exported JSON file through the loader described earlier.  
At this time, the optimized images are stored once in the `node_modules/.cache` directory, along with cache data (image hash and file path).  
The second and subsequent optimizations will use this information to decide whether to skip the optimization or not.

The mechanism is as follows.

Search for images with the same file path in the JSON file that stores the cached data.

- if there is ... → Compare with the hash of that image, and if different, update the hash and create an optimized image. If they are the same, skip optimization.
- if not ... → The hash and file path of that image is stored in cache data to create an optimized image.
