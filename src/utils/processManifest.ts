import type { Manifest } from '../cli'
import parseNdJSON from './parseNdJSON'

const processManifest = (manifestJson: string): Manifest => parseNdJSON(manifestJson)

export default processManifest
