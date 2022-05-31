---
description: This page is to introduce examples of use.
---

# Examples

## Set the `deviceSizes`

```js title="next.config.js"
module.exports = withExportImages({
  images: {
    deviceSizes: [640, 960, 1280, 1600, 1920],
  },
})
```

## Set the `placeholder`

```jsx
<Image src="/img.png" width={1280} height={640} alt="" placeholder="blur" />
```

## Use next/image separately from image components to be optimized at build time

```tsx title="CMSImage.tsx"
import Image, { ImageLoaderProps, ImageProps } from 'next/image'
import { FC } from 'react'

type Props = ImageProps

const CMSLoader = ({ src, width, quality }: ImageLoaderProps) => {
  const url = new URL(normalizeSrc(src))
  const params = url.searchParams

  params.set('auto', params.get('auto') || 'format')
  params.set('fit', params.get('fit') || 'max')
  params.set('w', params.get('w') || width.toString())

  if (quality) {
    params.set('q', quality.toString())
  }

  return url.href
}

const CMSImage: FC<Props> = (props) => {
  return <Image loader={CMSLoader} {...props} />
}

export default CMSImage
```
