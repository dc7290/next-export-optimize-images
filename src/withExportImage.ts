import { NextConfig } from 'next'

const withExportImages = (nextConfig: NextConfig): NextConfig => {
  const customConfig: NextConfig = {
    webpack(config, option) {
      // if (!option.dev) {
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

      if (!option.isServer) {
        config.plugins.push(new option.webpack.IgnorePlugin({ resourceRegExp: /^\.\/createManifest$/ }))
      }
      // }

      return nextConfig.webpack ? nextConfig.webpack(config, option) : config
    },
  }

  return Object.assign({}, nextConfig, customConfig)
}

export default withExportImages
