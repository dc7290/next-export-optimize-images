import { Manifest } from './cli/types'

const manifest: Manifest = []

const createManifest = async (params: Manifest[number]) => {
  manifest.push(params)

  return manifest
}

export default createManifest
