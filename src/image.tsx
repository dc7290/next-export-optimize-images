import Image, { ImageLoader, ImageProps } from 'next/dist/client/image'
import React, { forwardRef } from 'react'

import buildOutputInfo from './utils/buildOutputInfo'
import getConfig from './utils/getConfig'

const config = getConfig()

const exportableLoader: ImageLoader = ({ src, width, quality }) => {
  if (process.env.NODE_ENV === 'development') {
    if (typeof quality === 'number') {
      console.warn(`The quality parameter is disabled for images processed by \`next-export-optimize-images\`.
If you want to set it, please specify the quality option in \`export-images.config.js\`. src: ${src}`)
    }

    // This doesn't bother optimizing in the dev environment. Next complains if the
    // returned URL doesn't have a width in it, so adding it as a throwaway
    return `${src}?width=${width}`
  }

  const { output } = buildOutputInfo({ src, width })

  return `${config.basePath ?? ''}${output}`
}

const CustomImage = (props: ImageProps, forwardedRef: React.ForwardedRef<HTMLImageElement>) => {
  return (
    <Image
      {...props}
      ref={forwardedRef}
      loader={props.loader || exportableLoader}
      blurDataURL={
        props.blurDataURL ||
        (typeof props.src === 'string' && props.placeholder === 'blur' && props.loader === undefined
          ? exportableLoader({ src: props.src, width: 8, quality: 10 })
          : undefined)
      }
    />
  )
}

const _CustomImage = forwardRef(CustomImage)

export * from 'next/dist/client/image'
export default _CustomImage
