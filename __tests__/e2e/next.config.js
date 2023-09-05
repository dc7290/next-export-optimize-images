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
}

module.exports = withExportImages(config, { __test: true })
