const withExportImages = require('../../dist')

/**
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'export',
  images: {
    deviceSizes: [320, 480, 768, 1024, 1440, 1920],
  },
}

module.exports = withExportImages(config, { __test: true })
