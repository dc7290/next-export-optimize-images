/**
 * @type {import('../../src').Config}
 */
const config = {
  sharpOptions: {
    webp: {
      effort: 0,
    },
  },
  generateFormats: ['avif', 'webp'],
  remoteImages: async () => ['https://picsum.photos/id/237/200/300.jpg', 'https://picsum.photos/id/238/200/300.jpg'],
  cacheDir: '.next/cache/next-export-optimize-images',
}

module.exports = config
