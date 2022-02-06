/**
 * @type {import('next/dist/server/config-shared').NextConfig}
 */
const config = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    loader: 'custom',
  },
}

module.exports = config
