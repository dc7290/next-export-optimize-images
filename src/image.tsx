/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
import Image, { ImageLoader, ImageProps } from 'next/dist/client/image'
import React from 'react'

const loader: ImageLoader = ({ src, width }) => {
  const name = src.split('.').slice(0, -1).join('.')
  const extension = src.split('.').pop()

  return `${name}-${width}.${extension}`
}

const CustomImage = (props: ImageProps) => {
  const src = typeof props.src === 'string' ? props.src : props.src.src

  if (typeof window === 'undefined') {
    require('./createManifest')({
      src,
      sizes: props.sizes,
      quality: typeof props.quality !== undefined ? Number(props.quality) : undefined,
      layout: props.layout,
      placeholder: props.placeholder,
      unoptimized: props.unoptimized,
    })
  }

  return <Image {...props} loader={loader} blurDataURL={`${loader({ src, width: 10 })}`} />
}

export * from 'next/dist/client/image'
export default CustomImage
