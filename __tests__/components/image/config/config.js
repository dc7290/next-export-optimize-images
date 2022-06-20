/**
 * @type {import('../../../../src').Config}
 */
const config = {
  basePath: '/base-path',
  imageDir: '_custom-optimize',
  filenameGenerator: ({ path, name, width, quality, extension }) => `${path}-${name}.${width}.${quality}.${extension}`,
  convertFormat: [
    ['png', 'webp']
  ]
}

module.exports = config
