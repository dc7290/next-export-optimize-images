const processManifest = (manifestJson: string) =>
  manifestJson
    .trim()
    .split(/\n/g)
    .map((line) => JSON.parse(line))

export default processManifest
