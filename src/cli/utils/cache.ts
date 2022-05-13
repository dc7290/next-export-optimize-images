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
): CacheImages | null => {
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  } else {
    return null
  }
}

export const writeCacheManifest = (
  filePath = path.resolve(process.cwd(), 'node_modules/.cache/next-export-optimize-images/cached-images.json', 'utf-8'),
  cacheImages: CacheImages
) => {
  fs.writeFileSync(filePath, JSON.stringify(cacheImages))
}
