import path from 'path'

import type { NextConfig } from 'next'

import copyConfig from './utils/copyConfig'

const withExportImages = (nextConfig: NextConfig = {}): NextConfig => {
  copyConfig(path.resolve(process.cwd(), 'export-images.config.js'))

  const customConfig: NextConfig = {
    images: {
      ...nextConfig.images,
      loader: 'custom',
    },
    webpack(config, option) {
      if (option.webpack.version[0] === 5) {
        const nextAlias = config.resolve.alias['next']
        config.resolve.alias['next'] = [
          'next-export-optimize-images/dist',
          ...(Array.isArray(nextAlias) ? nextAlias : [nextAlias]),
        ]
      } else {
        config.resolve.alias['next/image'] = 'next-export-optimize-images/dist/image'
        delete config.resolve.alias['next']
      }

      config.resolve.fallback = { ...config.resolve.fallback, fs: false }

      return nextConfig.webpack ? nextConfig.webpack(config, option) : config
    },
  }

  return Object.assign({}, nextConfig, customConfig)
}

export type WithExportImages = typeof withExportImages

export default withExportImages
