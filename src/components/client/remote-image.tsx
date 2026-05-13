import type { ImageConfigComplete } from 'next/dist/shared/lib/image-config'
import type { ImageProps } from 'next/image'
import React, { forwardRef } from 'react'
import type { Manifest } from '../../cli'
import buildOutputInfo from '../../utils/buildOutputInfo'
import getConfig from '../../utils/getConfig'
import Image from './image'

const REMOTE_URL_RE = /^(https?:)?\/\//i

const config = getConfig()

const RemoteImage = forwardRef<HTMLImageElement, ImageProps>(({ src, ...props }, forwardedRef) => {
  if (
    typeof window === 'undefined' &&
    process.env.NODE_ENV === 'production' &&
    typeof src === 'string' &&
    REMOTE_URL_RE.test(src)
  ) {
    // Lazy-require so the browser bundle never tries to resolve node:* deps.
    // The bundler treats the surrounding branch as dead code for the browser target.
    const { createHash } = require('node:crypto') as typeof import('node:crypto')
    const { appendFileSync } = require('node:fs') as typeof import('node:fs')
    const { join } = require('node:path') as typeof import('node:path')

    const nextImageConfig = process.env.__NEXT_IMAGE_OPTS as unknown as ImageConfigComplete

    const allSizes = [...nextImageConfig.imageSizes, ...nextImageConfig.deviceSizes]

    for (const width of allSizes) {
      const outputInfo = buildOutputInfo({
        src,
        width,
        config,
      }).at(-1)

      if (outputInfo === undefined) {
        throw new Error(`No output info found for ${src}`)
      }

      const { output, extension, originalExtension } = outputInfo

      const externalOutputDir = `${
        config.externalImageDir ? config.externalImageDir.replace(/^\//, '').replace(/\/$/, '') : '_next/static/media'
      }`

      const json: Manifest[number] = {
        output,
        src: `/${config.mode === 'build' ? externalOutputDir.replace(/^_next/, '.next') : externalOutputDir}/${createHash(
          'sha256'
        )
          .update(
            src
              .replace(/^https?:\/\//, '')
              .split('/')
              .slice(1)
              .join('/')
          )
          .digest('hex')}.${originalExtension}`,
        width,
        extension,
        externalUrl: src,
      }

      appendFileSync(join(process.cwd(), '.next/next-export-optimize-images-list.nd.json'), `${JSON.stringify(json)}\n`)
    }
  }

  return <Image {...props} src={src} ref={forwardedRef} />
})
RemoteImage.displayName = 'RemoteImage'

export * from 'next/image'
export default RemoteImage
