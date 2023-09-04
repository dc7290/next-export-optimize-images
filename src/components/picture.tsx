import Image, { ImageProps, unstable_getImgProps as getImgProps } from 'next/dist/shared/lib/image-external'
import React, { forwardRef } from 'react'

import getConfig from '../utils/getConfig'

import getStringSrc from './utils/getStringSrc'
import imageLoader from './utils/imageLoader'

const config = getConfig()

const Picture = (props: ImageProps, forwardedRef: React.ForwardedRef<HTMLImageElement>) => {
  const srcStr = getStringSrc(props.src)

  if (srcStr.endsWith('.svg')) {
    return <Image {...props} ref={forwardedRef} loader={props.loader || imageLoader()} unoptimized />
  }

  const additionalFormats = [...new Set(config.generateFormats ?? ['webp'])]
  const sources = additionalFormats.map((format, i) => ({
    srcSet: getImgProps({
      ...props,
      loader: imageLoader(i),
    }).props.srcSet,
    type: `image/${format}`,
  }))

  return (
    <picture>
      {sources.map((source) => (
        <source key={source.type} {...source} />
      ))}
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
      />
    </picture>
  )
}

const _Picture = forwardRef(Picture)

export default _Picture
