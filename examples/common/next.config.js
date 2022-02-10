const { withExportImages } = require('next-export-optimize-images')

/**
 * @type {import('next/dist/server/config-shared').NextConfig}
 */
const config = {
  reactStrictMode: false,
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = withExportImages(config)
