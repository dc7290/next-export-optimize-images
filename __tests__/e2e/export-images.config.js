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
  remoteImages: async () => ['https://next-export-optimize-images.vercel.app/og.png'],
}

module.exports = config
