import Image, { ImageLoader, ImageProps } from 'next/dist/client/image'
import React from 'react'

const loader: ImageLoader = ({ src, width }) => {
  const name = src.split('.').slice(0, -1).join('.')
  const extension = src.split('.').pop()

  return `${name}.${width}.${extension}`
}

const CustomImage = (props: ImageProps) => {
  const src = typeof props.src === 'string' ? props.src : props.src.src

  if (typeof window === 'undefined') {
    const { sizes, layout, placeholder, unoptimized } = props
    const quality = typeof props.quality !== undefined ? Number(props.quality) : undefined
    import('./createManifest').then((func) => {
      func.default({ src, sizes, quality, layout, placeholder, unoptimized })
    })
  }

  return <Image {...props} loader={loader} blurDataURL={`${loader({ src, width: 10 })}`} />
}

export * from 'next/dist/client/image'
export default CustomImage
