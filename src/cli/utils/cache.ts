import fs from 'fs'
import path from 'path'

export const defaultCacheDir = path.resolve(process.cwd(), 'node_modules/.cache/next-export-optimize-images')
export const defaultCacheFilePath = path.join(defaultCacheDir, 'cached-images.json')

export const createCacheDir = (cacheDir = defaultCacheDir) => {
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true })
  }
}

export type CacheImages = {
  output: string
  hash: string
}[]

export const readCacheManifest = (filePath = defaultCacheFilePath): CacheImages => {
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  } else {
    return []
  }
}

export const writeCacheManifest = (cacheImages: CacheImages, filePath = defaultCacheFilePath) => {
  fs.writeFileSync(filePath, JSON.stringify(cacheImages), 'utf-8')
}
