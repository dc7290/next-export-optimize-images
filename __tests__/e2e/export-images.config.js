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
  generateFormats: ['jpg'],
  remoteImages: async () => ['https://next-export-optimize-images.vercel.app/og.png'],
  basePath: '/base',
}

module.exports = config
