const withExportImages = require('next-export-optimize-images')

/**
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: true,
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = withExportImages(config)
