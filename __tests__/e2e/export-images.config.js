/**
 * @type {import('../../src').Config}
 */
const config = {
  outDir: '__tests__/e2e/out',
  sharpOptions: {
    webp: {
      effort: 0,
    },
  },
  convertFormat: [
    ['png', 'webp']
  ]
}

module.exports = config
