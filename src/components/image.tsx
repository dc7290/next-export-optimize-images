import Image, { ImageProps, StaticImageData } from 'next/dist/shared/lib/image-external'
import React, { forwardRef } from 'react'

import getStringSrc from './utils/getStringSrc'
import imageLoader from './utils/imageLoader'

export interface StaticRequire {
  default: StaticImageData
}

interface CustomImageProps extends ImageProps {
  src: string | StaticImageData | StaticRequire
}

const CustomImage = (props: CustomImageProps, forwardedRef: React.ForwardedRef<HTMLImageElement>) => {
  const srcStr = getStringSrc(props.src)

  return (
    <Image
      {...props}
      ref={forwardedRef}
      loader={props.loader || imageLoader()}
      blurDataURL={
        props.blurDataURL ||
        (typeof props.src === 'string' && props.placeholder === 'blur' && props.loader === undefined
          ? imageLoader()({ src: props.src, width: 8, quality: 10 })
          : undefined)
      }
      unoptimized={props.unoptimized !== undefined ? props.unoptimized : srcStr.endsWith('.svg')}
    />
  )
}

const _CustomImage = forwardRef(CustomImage)

export * from 'next/dist/shared/lib/image-external'
export default _CustomImage
