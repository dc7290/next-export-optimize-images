/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
import Image, { ImageLoader, ImageProps, StaticImageData } from 'next/dist/client/image'
import React from 'react'

import type { Manifest } from './cli/types'

const loader: ImageLoader = ({ src, width, quality }) => {
  if (process.env.NODE_ENV === 'development') {
    // This doesn't bother optimizing in the dev environment. Next complains if the
    // returned URL doesn't have a width in it, so adding it as a throwaway
    return `${src}?width=${width}`
  }

  // Generate a reasonably unique base folder. Doesn't have to be perfectly unique
  const [path, extension] = src.split(/\.([^.]*$)/)
  if (!path || !extension) {
    throw new Error(`Invalid path or no file extension: ${src}`)
  }

  const output = `/_optimized${path}_${width}_${quality ?? 75}.${extension}`

  console.log('loader')
  if (typeof window === 'undefined') {
    const json: Manifest[number] = { output, src, width, quality: quality ?? 75, extension }
    const fs = require('fs')
    const path = require('path')
    console.log(path.join(process.env['DIRNAME'], '.next/custom-optimized-images.nd.json'))
    fs.appendFileSync(
      path.join(process.env['DIRNAME'], '.next/custom-optimized-images.nd.json'),
      JSON.stringify(json) + '\n'
    )
  }

  return output
}

interface StaticRequire {
  default: StaticImageData
}

const isStaticRequire = (src: StaticRequire | StaticImageData): src is StaticRequire => {
  return (src as StaticRequire).default !== undefined
}

const CustomImage = (props: ImageProps) => {
  const src =
    typeof props.src === 'string' ? props.src : isStaticRequire(props.src) ? props.src.default.src : props.src.src

  return <Image {...props} loader={loader} blurDataURL={loader({ src, width: 10 })} />
}

export * from 'next/dist/client/image'
export default CustomImage
