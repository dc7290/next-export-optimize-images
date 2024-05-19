---
description: This page introduces the RemoteImage component for remote images.
---

# RemoteImage component

If you want to use remote images (external images) in this library, you need to manually write the external image URL in the configuration file or use the `RemoteImage` component.  
In other words, using the `RemoteImage` component eliminates the need to manually write the image URL in the configuration file.

## Usage

```tsx
import RemoteImage from 'next-export-optimize-images/remote-image'

function Component() {
  return (
    <>
      <RemoteImage src="https://example.com/image01.jpg" alt="" />
      {/* 
        Or use dynamic values with variables
        const id = 'image01'
        <RemoteImage src={`https://example.com/${id}.jpg`} alt="" />
      */}
    </>
  )
}
```

or Picture tag.
(webp support is added by default)

```tsx
import RemotePicture from 'next-export-optimize-images/remote-picture'

function Component() {
  return (
    <>
      <RemotePicture src="https://example.com/image01.jpg" alt="" />
      {/* 
        Or use dynamic values with variables
        const id = 'image01'
        <RemotePicture src={`https://example.com/${id}.jpg`} alt="" />
      */}
    </>
  )
}
```

## Definition

- props: `Omit<ImageProps, 'src'> & { src: string }`
- return: `JSX.Element`

※ ImageProps is the same as the props of the Image component provided by next/image.

## Tips

### Use with `remoteImages`.

```js title="export-images.config.js"
/**
 * @type {import('next-export-optimize-images').Config}
 */
const config = {
  remoteImages: ['https://example.com/image01.jpg', 'https://example.com/image02.jpg'],
}

module.exports = config
```

```tsx
import Image from 'next-export-optimize-images/image'
import RemoteImage from 'next-export-optimize-images/remote-image'

function Component() {
  return (
    <>
      <Image src="https://example.com/image01.jpg" alt="" />
      <Image src="https://example.com/image02.jpg" alt="" />
      <RemoteImage src="https://example.com/image03.jpg" alt="" />
    </>
  )
}
```

'image01.jpg', 'image02.jpg' and 'image03.jpg' are downloaded locally and optimized.
