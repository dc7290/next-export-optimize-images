import path from 'path'

import fs from 'fs-extra'

export const defaultCacheDir = path.resolve(process.cwd(), 'node_modules/.cache/next-export-optimize-images')
export const defaultCacheFilePath = path.join(defaultCacheDir, 'cached-images.json')

export const createCacheDir = async (cacheDir = defaultCacheDir) => {
  await fs.mkdirp(cacheDir)
}

export type CacheImages = {
  output: string
  hash: string
}[]

export const readCacheManifest = (filePath = defaultCacheFilePath): CacheImages => {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  } catch (_) {
    return []
  }
}

export const writeCacheManifest = (cacheImages: CacheImages, filePath = defaultCacheFilePath) => {
  fs.writeFileSync(filePath, JSON.stringify(cacheImages), 'utf-8')
}
