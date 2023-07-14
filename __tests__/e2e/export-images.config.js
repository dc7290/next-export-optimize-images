/**
 * @type {import('../../src').Config}
 */
const config = {
  sharpOptions: {
    webp: {
      effort: 0,
    },
  },
  convertFormat: [['png', 'webp']],
  remoteImages: async () => ['https://next-export-optimize-images.vercel.app/og.png'],
}

module.exports = config
