/**
 * @type {import('../../../../src').Config}
 */
const config = {
  basePath: "/base-path",
  imageDir: "_custom-optimize",
  sourceImageParser: ({ src, defaultParser }) => {
    const regExpMatches = src.match(/^.*(\/.*)\/([^\/.]*)&ext=(\w\w*)$/);

    // if the src has &ext in the route then it is identified
    // as an image w/ the alternate format
    if (!regExpMatches) {
      return defaultParser(src);
    }

    return {
      pathWithoutName: regExpMatches[1] || "",
      name: regExpMatches[2] || "",
      extension: regExpMatches[3] || "",
    };
  },
  filenameGenerator: ({ path, name, width, quality, extension }) =>
    `${path}-${name}.${width}.${quality}.${extension}`,
  convertFormat: [["png", "webp"]],
};

module.exports = config;
