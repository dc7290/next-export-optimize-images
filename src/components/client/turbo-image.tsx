import NextImage, { type ImageProps } from 'next/dist/shared/lib/image-external'
import React, { forwardRef } from 'react'
import getStringSrc from '../utils/getStringSrc'
import imageLoader from '../utils/imageLoader'

const TurboImage = forwardRef<HTMLImageElement, ImageProps>((props, forwardedRef) => {
  const srcStr = getStringSrc(props.src)
  const blurDataURLObj = props.blurDataURL
    ? { blurDataURL: props.blurDataURL }
    : typeof props.src === 'string' && props.placeholder === 'blur' && props.loader === undefined
      ? { blurDataURL: imageLoader()({ src: props.src, width: 8, quality: 10 }) }
      : {}

  return (
    <NextImage
      {...props}
      ref={forwardedRef}
      loader={props.loader || imageLoader()}
      unoptimized={props.unoptimized !== undefined ? props.unoptimized : srcStr.endsWith('.svg')}
      {...blurDataURLObj}
    />
  )
})
TurboImage.displayName = 'TurboImage'

export default TurboImage
