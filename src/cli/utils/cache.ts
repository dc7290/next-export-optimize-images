import fs from 'fs'
import path from 'path'

export const createCacheDir = (
  cacheDir = path.resolve(process.cwd(), 'node_modules/.cache/next-export-optimize-images')
) => {
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true })
  }
}

export type CacheImages = {
  output: string
  hash: string
}[]

export const readCacheManifest = (
  filePath = path.resolve(process.cwd(), 'node_modules/.cache/next-export-optimize-images/cached-images.json')
) => {
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath)
  } else {
    return null
  }
}

export const writeCacheManifest = (
  filePath = path.resolve(process.cwd(), 'node_modules/.cache/next-export-optimize-images/cached-images.json'),
  cacheImages: CacheImages
) => {
  fs.writeFileSync(filePath, JSON.stringify(cacheImages))
}
