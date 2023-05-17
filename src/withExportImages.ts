import path from 'path'

import colors from 'ansi-colors'
import fs from 'fs-extra'
import type { NextConfig } from 'next'

const withExportImages = (nextConfig: NextConfig = {}, options: { __test?: boolean } = {}): NextConfig => {
  if (nextConfig.images?.unoptimized) {
    throw Error(
      'The `images.unoptimized` is not supported. If you use this option, consider not using `next-export-optimize-images`.'
    )
  }

  const resolvedConfigPath = path.join(process.cwd(), 'export-images.config.js')
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
      config.resolve.alias['next/image'] = options.__test
        ? '../../../dist/image'
        : 'next-export-optimize-images/dist/image'
      config.resolve.alias['next/legacy/image'] = options.__test
        ? '../../../dist/legacy-image'
        : 'next-export-optimize-images/dist/legacy-image'
      delete config.resolve.alias['next']

      config.resolve.fallback = { ...config.resolve.fallback, fs: false }

      const nextImageLoader = config.module.rules.find(
        ({ loader }: { loader?: string }) => loader === 'next-image-loader'
      )

      config.module.rules = [
        ...config.module.rules.filter(({ loader }: { loader?: string }) => loader !== 'next-image-loader'),
        {
          ...nextImageLoader,
          loader: undefined,
          options: undefined,
          use: [
            {
              loader: 'next-export-optimize-images-loader',
              options: {
                dir: path.join(process.cwd(), '__tests__/e2e'),
                isServer: option.isServer,
                isDev: option.dev,
              },
            },
            { loader: nextImageLoader.loader, options: nextImageLoader.options },
          ],
        },
      ]

      config.resolveLoader.alias['next-export-optimize-images-loader'] = path.join(__dirname, 'loader')

      return nextConfig.webpack ? nextConfig.webpack(config, option) : config
    },
    experimental: {
      ...nextConfig.experimental,
      swcPlugins: [
        ...(nextConfig.experimental?.swcPlugins ?? []),
        ...(process.env.NODE_ENV === 'development'
          ? []
          : [['plugin-next-export-optimize-images', {}] as [string, Record<string, unknown>]]),
      ],
    },
  }

  return Object.assign({}, nextConfig, customConfig)
}

export type WithExportImages = typeof withExportImages

export default withExportImages
