/* eslint-disable @typescript-eslint/no-var-requires */
import Image, { ImageLoader, ImageProps } from 'next/dist/client/image'
import React from 'react'

import type { Manifest } from './cli/types'
import formatValidate from './cli/utils/formatValidate'
import getConfig from './utils/getConfig'

const config = getConfig()

const exportableLoader: ImageLoader = ({ src: _src, width, quality }) => {
  if (process.env.NODE_ENV === 'development') {
    // This doesn't bother optimizing in the dev environment. Next complains if the
    // returned URL doesn't have a width in it, so adding it as a throwaway
    return `${_src}?width=${width}`
  }

  let src = _src

  if (config.basePath !== undefined) {
    src = _src.replace(config.basePath, '')
  }

  const path = src.split(/\.([^.]*$)/)[0]
  let extension = src.split(/\.([^.]*$)/)[1]
  if (!path || !extension) {
    throw new Error(`Invalid path or no file extension: ${src}`)
  }

  if (config.convertFormat !== undefined) {
    const convertArray = config.convertFormat.find(([beforeConvert]) => beforeConvert === extension)
    if (convertArray !== undefined) {
      if (!formatValidate(convertArray[0]))
        throw Error(`Unauthorized format specified in \`configFormat\`. beforeConvert: ${convertArray[0]}`)
      if (!formatValidate(convertArray[1]))
        throw Error(`Unauthorized format specified in \`configFormat\`. afterConvert: ${convertArray[1]}`)

      extension = convertArray[1]
    }
  }

  let pathWithoutName = path.split('/').slice(0, -1).join('/')
  const name = path.split('/').slice(-1).toString()

  if (src.startsWith('http')) {
    pathWithoutName = pathWithoutName
      .replace(/^https?:\/\//, '')
      .split('/')
      .slice(1)
      .join('/')
  }

  const outputDir = `/${
    config.imageDir ? config.imageDir.replace(/^\//, '').replace(/\/$/, '') : '_next/static/chunks/images'
  }`
  const filename =
    config.filenameGenerator !== undefined
      ? config.filenameGenerator({ path: pathWithoutName, name, width, quality: quality || 75, extension })
      : `${pathWithoutName}/${name}_${width}_${quality || 75}.${extension}`
  const output = `${outputDir}/${filename.replace(/^\//, '')}`

  if (typeof window === 'undefined' || process.env['TEST_JSON_PATH'] !== undefined) {
    const json: Manifest[number] = { output, src, width, quality: quality || 75, extension }
    const fs = require('fs-extra') as typeof import('fs-extra')
    const path = require('path') as typeof import('path')

    fs.appendFileSync(
      path.join(process.cwd(), process.env['TEST_JSON_PATH'] ?? '.next/custom-optimized-images.nd.json'),
      JSON.stringify(json) + '\n'
    )
  }

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

export * from 'next/dist/client/image'
export default CustomImage
