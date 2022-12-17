import path from 'path'

import colors from 'ansi-colors'
import fs from 'fs-extra'
import type { NextConfig } from 'next'

import copyConfig from './utils/copyConfig'
type Options = {
  configPath?: string
}

const withExportImages = (nextConfig: NextConfig = {}, options?: Options): NextConfig => {
  if (nextConfig.images?.unoptimized) {
    throw Error(
      'The `images.unoptimized` is not supported. If you use this option, consider not using `next-export-optimize-images`.'
    )
  }

  const resolvedConfigPath = path.join(process.cwd(), options?.configPath ?? 'export-images.config.js')
  copyConfig(resolvedConfigPath)
  // eslint-disable-next-line no-console
  console.log(
    colors.magenta(
      `info - [next-export-optimize-images]: ${
        fs.existsSync(resolvedConfigPath)
          ? `Configuration loaded from \`${resolvedConfigPath}\`.`
          : `Configuration was not loaded. (This is optional.)`
      }`
    )
  )

  const customConfig: NextConfig = {
    images: {
      ...nextConfig.images,
      loader: 'custom',
    },
    webpack(config, option) {
      config.resolve.alias['next/image'] = 'next-export-optimize-images/dist/image'
      config.resolve.alias['next/legacy/image'] = 'next-export-optimize-images/dist/legacy-image'
      delete config.resolve.alias['next']

      config.resolve.fallback = { ...config.resolve.fallback, fs: false }

      return nextConfig.webpack ? nextConfig.webpack(config, option) : config
    },
  }

  return Object.assign({}, nextConfig, customConfig)
}

export type WithExportImages = typeof withExportImages

export default withExportImages
