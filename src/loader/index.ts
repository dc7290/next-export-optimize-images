import path from 'path'

import fs from 'fs-extra'
import { PHASE_PRODUCTION_BUILD } from 'next/constants'
import loadConfig from 'next/dist/server/config'
import type { StaticImageData } from 'next/image'
import getConfig from 'src/utils/getConfig'
import type { LoaderContext } from 'webpack'

import type { Manifest } from '../cli'
import buildOutputInfo from '../utils/buildOutputInfo'

type LoaderOptions = {
  dir: string
  isServer: boolean
  isDev: boolean
}

export default async function loader(this: LoaderContext<LoaderOptions>, content: string) {
  this.cacheable && this.cacheable(false)
  const callback = this.async()

  const { dir, isDev } = this.getOptions()

  if (isDev) {
    callback(null, content)
    return
  }

  const { src } = JSON.parse(content.replace(/^export default /, '').replace(/;$/, '')) as StaticImageData

  const config = getConfig()

  const nextConfig = await loadConfig(PHASE_PRODUCTION_BUILD, dir)
  const allSizes = [...nextConfig.images.deviceSizes, ...nextConfig.images.imageSizes]

  if (!src.endsWith('.svg')) {
    await Promise.all(
      allSizes.map(async (size) => {
        buildOutputInfo({ src, width: size, config }).forEach((outputInfo) => {
          const json: Manifest[number] = {
            output: outputInfo.output,
            src: outputInfo.src,
            width: size,
            extension: outputInfo.extension,
          }

          return fs.appendFile(
            path.join(process.cwd(), '.next/next-export-optimize-images-list.nd.json'),
            JSON.stringify(json) + '\n'
          )
        })
      })
    )
  }

  callback(null, content)
  return
}
