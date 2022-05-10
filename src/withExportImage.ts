import type { NextConfig } from 'next'

type WithExportImagesConfig = {
  outputDir?: string
}

const withExportImages = (nextConfig: NextConfig, withExportImagesConfig: WithExportImagesConfig = {}): NextConfig => {
  const customConfig: NextConfig = {
    env: {
      ...nextConfig.env,
      EXPORT_IMAGES_DIRNAME: process.cwd(),
      EXPORT_IMAGES_OUTPUTDIR: withExportImagesConfig.outputDir ?? '_next/static/chunks/images',
    },
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

export default withExportImages
