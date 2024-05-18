import { createHash } from 'crypto'
import { join } from 'path'

import { appendFileSync } from 'fs-extra'
import type { ImageConfigComplete } from 'next/dist/shared/lib/image-config'
import type { ImageProps } from 'next/image'
import React, { forwardRef } from 'react'

import type { Manifest } from '../cli'
import buildOutputInfo from '../utils/buildOutputInfo'
import getConfig from '../utils/getConfig'

import Picture from './picture'

type RemotePictureProps = Omit<ImageProps, 'src'> & {
  src: string
}

const config = getConfig()

const RemotePicture = forwardRef<HTMLImageElement, RemotePictureProps>(({ src, ...props }, forwardedRef) => {
  if (process.env['NODE_ENV'] === 'production') {
    const nextImageConfig = process.env['__NEXT_IMAGE_OPTS'] as unknown as ImageConfigComplete

    const allSizes = [...nextImageConfig.imageSizes, ...nextImageConfig.deviceSizes]

    allSizes.forEach((width) => {
      buildOutputInfo({
        src,
        width,
        config,
      }).forEach(({ output, extension, originalExtension }) => {
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

        appendFileSync(
          join(process.cwd(), '.next/next-export-optimize-images-list.nd.json'),
          JSON.stringify(json) + '\n'
        )
      })
    })
  }

  return <Picture {...props} src={src} ref={forwardedRef} />
})
RemotePicture.displayName = 'RemotePicture'

export default RemotePicture
