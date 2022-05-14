/**
 * @type {import('../../../src/utils/config').Config}
 */
const config = {
  imageDir: '_custom-optimize',
  filenameGenerator: ({ path, name, width, quality, extension }) => `${path}-${name}.${width}.${quality}.${extension}`,
}

module.exports = config
