import type { Manifest } from '../cli/types'

const processManifest = (manifestJson: string): Manifest =>
  manifestJson
    .trim()
    .split(/\n/g)
    .map((line) => JSON.parse(line))

export default processManifest
