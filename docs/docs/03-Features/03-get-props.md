---
description: This page introduces the `getOptimizedImageProps` function, which is used to get the props of a component.
---

# Get Optimized Image Props

`getOptimizedImageProps` is a function that extracts the internal processing of the `Image` component provided by this library.

For example, if you use the `<img>` element directly without using the `Image` component, you can use `getOptimizedImageProps` to get the properties to pass to the `<img>` element.
This allows for more advanced use cases such as art direction using the `<picture>` element or displaying images using the CSS `background-image` property.

## Usage

### Background image

```tsx
'use client'

import { getOptimizedImageProps } from 'next-export-optimize-images/image'

import src from '../images/sample.png'

export default function BackgroundImage() {
  const props = getOptimizedImageProps({ src, alt: '' }).props

  return (
    <div
      style={{
        backgroundImage: `url(${props.src})`,
        width: props.width,
        height: props.height,
      }}
    ></div>
  )
}

export default WithPropsComponent
```

### Art direction

```tsx
'use client'

import { getOptimizedImageProps } from 'next-export-optimize-images/image'

import srcDesktop from '../images/sample-desktop.png'
import srcMobile from '../images/sample-mobile.png'

export default function BackgroundImage() {
  const propsDesktop = getOptimizedImageProps({ src: srcDesktop, alt: '' }).props
  const propsMobile = getOptimizedImageProps({ src: srcMobile, alt: '' }).props

  return (
    <picture>
      <source
        srcSet={propsMobile.srcSet}
        width={propsMobile.width}
        height={propsMobile.height}
        media="(max-width: 768px)"
      />
      <img {...propsDesktop} />
    </picture>
  )
}

export default WithPropsComponent
```
