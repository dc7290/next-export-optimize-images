import { ManifestJson } from './cli/types'

const manifest: ManifestJson = []

const createManifest = async (params: ManifestJson[number]) => {
  manifest.push(params)

  return manifest
}

export default createManifest
