const withExportImages = require('../../dist')

/**
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
  },
  output: 'export',
  basePath: '/base',
}

module.exports = withExportImages(config, { __test: true })
