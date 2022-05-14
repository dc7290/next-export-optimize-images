/* eslint-disable @typescript-eslint/no-var-requires */
import Image, { ImageLoader, ImageProps } from 'next/dist/client/image'
import React from 'react'

import type { Manifest } from './cli/types'
import { getConfig } from './utils/config'

const config = getConfig()

const exportableLoader: ImageLoader = ({ src, width, quality }) => {
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

  const pathWithoutName = path.split('/').slice(0, -1).join('/')
  const name = path.split('/').slice(-1).toString()

  const outputDir = `/${config.imageDir?.replace(/^\//, '').replace(/\/$/, '') ?? '_next/static/chunks/images'}`
  const filename =
    config.filenameGenerator !== undefined
      ? config.filenameGenerator({ path: pathWithoutName, name, width, quality: quality || 75, extension })
      : `${pathWithoutName}/${name}_${width}_${quality || 75}.${extension}`
  const output = `${outputDir}${filename}`

  if (typeof window === 'undefined' || process.env['TEST_JSON_PATH'] !== undefined) {
    const json: Manifest[number] = { output, src, width, quality: quality || 75, extension }
    const fs = require('fs')
    const path = require('path')
    fs.appendFileSync(
      path.join(process.cwd(), process.env['TEST_JSON_PATH'] ?? '.next/custom-optimized-images.nd.json'),
      JSON.stringify(json) + '\n'
    )
  }

  return output
}

const CustomImage = (props: ImageProps) => {
  return (
    <Image
      {...props}
      loader={props.loader || exportableLoader}
      blurDataURL={
        props.blurDataURL ||
        (typeof props.src === 'string' ? exportableLoader({ src: props.src, width: 8, quality: 10 }) : '')
      }
    />
  )
}

export * from 'next/dist/client/image'
export default CustomImage
