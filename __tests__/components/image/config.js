/**
 * @type {import('../../../src/utils/getConfig').Config}
 */
const config = {
  imageDir: '_custom-optimize',
  filenameGenerator: ({ path, name, width, quality, extension }) => `${path}-${name}.${width}.${quality}.${extension}`,
  convertFormat: [
    ['png', 'webp']
  ]
}

module.exports = config
