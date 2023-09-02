import Image, { ImageLoader, ImageProps } from 'next/dist/client/legacy/image'
import React from 'react'

import buildOutputInfo from '../utils/buildOutputInfo'
import getConfig from '../utils/getConfig'

const config = getConfig()

const exportableLoader: ImageLoader = ({ src, width }) => {
  if (process.env['NODE_ENV'] === 'development') {
    // This doesn't bother optimizing in the dev environment. Next complains if the
    // returned URL doesn't have a width in it, so adding it as a throwaway
    return `${src}?width=${width}`
  }

  const { output } = buildOutputInfo({ src, width, config })[0] ?? { output: `${src}?width=${width}` }

  return `${config.basePath ?? ''}${output}`
}

const CustomImage = (props: ImageProps) => {
  return (
    <Image
      {...props}
      loader={props.loader || exportableLoader}
      blurDataURL={
        props.blurDataURL ||
        (typeof props.src === 'string' && props.placeholder === 'blur' && props.loader === undefined
          ? exportableLoader({ src: props.src, width: 8, quality: 10 })
          : '')
      }
    />
  )
}

export * from 'next/dist/client/legacy/image'
export default CustomImage
