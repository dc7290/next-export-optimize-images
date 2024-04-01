import Image, { ImageProps } from 'next/image'
import React from 'react'

import imageLoader from './utils/imageLoader'

const CustomImage = (props: ImageProps) => {
  return (
    <Image
      {...props}
      loader={props.loader || imageLoader()}
      blurDataURL={
        props.blurDataURL ||
        (typeof props.src === 'string' && props.placeholder === 'blur' && props.loader === undefined
          ? imageLoader()({ src: props.src, width: 8, quality: 10 })
          : '')
      }
    />
  )
}

export default CustomImage
