const withExportImages = require('../../../../dist')

/**
 * @type {import('next').NextConfig}
 */
const config = {
  output: 'export',
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: true },
  images: {
    deviceSizes: [320, 480, 768, 1024, 1440, 1920],
  },
}

module.exports = withExportImages(config, { unstable_nextImageAlias: true })
