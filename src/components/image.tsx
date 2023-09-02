import Image, { ImageLoader, ImageProps, StaticImageData } from 'next/dist/shared/lib/image-external'
import React, { forwardRef } from 'react'

import buildOutputInfo from '../utils/buildOutputInfo'
import getConfig from '../utils/getConfig'

const config = getConfig()

export const exportableLoader: ImageLoader = ({ src, width }) => {
  if (process.env['NODE_ENV'] === 'development') {
    // This doesn't bother optimizing in the dev environment. Next complains if the
    // returned URL doesn't have a width in it, so adding it as a throwaway
    return `${src}?width=${width}`
  }

  const { output } = buildOutputInfo({ src, width, config })[0] ?? { output: `${src}?width=${width}` }

  return `${config.basePath ?? ''}${output}`
}

interface StaticRequire {
  default: StaticImageData
}

interface CustomImageProps extends ImageProps {
  src: string | StaticImageData | StaticRequire
}

const CustomImage = (props: CustomImageProps, forwardedRef: React.ForwardedRef<HTMLImageElement>) => {
  const srcStr =
    typeof props.src === 'string'
      ? props.src
      : (props.src as StaticRequire).default !== undefined
      ? (props.src as StaticRequire).default.src
      : (props.src as StaticImageData).src
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
      unoptimized={props.unoptimized !== undefined ? props.unoptimized : srcStr.endsWith('.svg')}
    />
  )
}

const _CustomImage = forwardRef(CustomImage)

export * from 'next/dist/shared/lib/image-external'
export default _CustomImage
