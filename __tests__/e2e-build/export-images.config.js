/**
 * @type {import('../../src').Config}
 */
const config = {
  sharpOptions: {
    webp: {
      effort: 0,
    },
  },
  remoteImages: async () => ['https://picsum.photos/id/237/200/300.jpg', 'https://picsum.photos/id/238/200/300.jpg'],
  mode: 'build',
}

module.exports = config
