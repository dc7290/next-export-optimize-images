import { createHash } from 'crypto'
import fs from 'fs'
import path from 'path'

import sharp from 'sharp'

import getConfig, { Config } from '../utils/getConfig'
import processManifest from '../utils/processManifest'

import type { Manifest } from './types'
import { CacheImages, createCacheDir, defaultCacheDir, readCacheManifest, writeCacheManifest } from './utils/cache'
import { cliProgressBarIncrement, cliProgressBarStart } from './utils/cliProgressBar'
import formatValidate from './utils/formatValidate'
import uniqueItems from './utils/uniqueItems'

type GetOptimizeResultProps = {
  destDir: string
  noCache: boolean
  cacheImages: CacheImages
  cacheDir: string
  cacheMeasurement: () => void
  nonCacheMeasurement: () => void
  cliProgressBarIncrement: () => void
  originalFilePath: string
  sharpOptions?: Config['sharpOptions']
} & Omit<Manifest[number], 'src'>
type GetOptimizeResult = (getOptimizeResultProps: GetOptimizeResultProps) => Promise<void>

export const getOptimizeResult: GetOptimizeResult = async ({
  destDir,
  noCache,
  cacheImages,
  cacheDir,
  cacheMeasurement,
  nonCacheMeasurement,
  cliProgressBarIncrement,
  originalFilePath,
  output,
  width,
  quality,
  extension,
  sharpOptions,
}) => {
  if (formatValidate(extension)) {
    const filePath = path.join(destDir, output)
    const fileDir = filePath.split('/').slice(0, -1).join('/')
    fs.mkdirSync(fileDir, { recursive: true })

    const outputPath = path.join(cacheDir, output)
    const outputDir = outputPath.split('/').slice(0, -1).join('/')
    fs.mkdirSync(outputDir, { recursive: true })

    const imageBuffer = fs.readFileSync(originalFilePath)

    // Cache process
    if (!noCache) {
      const cacheImagesFindIndex = cacheImages.findIndex((cacheImage) => cacheImage.output === output)
      const hash = createHash('sha256').update(imageBuffer).digest('hex')

      if (cacheImagesFindIndex === -1) {
        cacheImages.push({ output, hash })
      } else {
        const currentCacheImage = cacheImages[cacheImagesFindIndex]
        if (currentCacheImage?.hash === hash) {
          fs.copyFileSync(outputPath, filePath)
          cacheMeasurement()
          cliProgressBarIncrement()
          return
        } else {
          if (currentCacheImage !== undefined) currentCacheImage.hash = hash
        }
      }
    }

    const image = sharp(imageBuffer, { sequentialRead: true })

    image.rotate().resize({ width, withoutEnlargement: true })

    switch (extension) {
      case 'jpeg':
        await image.jpeg({ quality, ...sharpOptions?.jpg }).toFile(outputPath)
        break
      case 'jpg':
        await image.jpeg({ quality, ...sharpOptions?.jpg }).toFile(outputPath)
        break
      case 'png':
        await image.png({ quality, ...sharpOptions?.png }).toFile(outputPath)
        break
      case 'webp':
        await image.webp({ quality, ...sharpOptions?.webp }).toFile(outputPath)
        break
      case 'avif':
        await image.avif({ quality, ...sharpOptions?.avif }).toFile(outputPath)
        break
    }

    fs.copyFileSync(outputPath, filePath)

    nonCacheMeasurement()
    cliProgressBarIncrement()
  } else {
    throw Error(
      `Not an allowed format.\`${extension}\`\nGive \`unoptimize\`prop to /next/image to disable optimization.`
    )
  }
}

const cwd = process.cwd()

type OptimizeImagesProps = {
  manifestJsonPath: string
  noCache: boolean
  config: Config
  terse?: boolean
}

export const optimizeImages = async ({ manifestJsonPath, noCache, config, terse = false }: OptimizeImagesProps) => {
  const destDir = path.resolve(cwd, config.outDir ?? 'out')

  let manifest: Manifest
  try {
    manifest = uniqueItems(processManifest(fs.readFileSync(manifestJsonPath, 'utf-8')))
  } catch (error) {
    throw Error(typeof error === 'string' ? error : 'Unexpected error.')
  }

  if (!terse) {
    cliProgressBarStart(manifest.length)
  }

  let cacheImages: CacheImages = []

  if (!noCache) {
    createCacheDir()
    cacheImages = readCacheManifest()
  }

  const promises: Promise<void>[] = []

  let measuredCache = 0
  let measuredNonCache = 0

  for (const item of manifest) {
    const originalFilePath = path.join(destDir, item.src)

    promises.push(
      getOptimizeResult({
        destDir,
        noCache,
        cacheImages,
        cacheDir: defaultCacheDir,
        cacheMeasurement: () => (measuredCache += 1),
        nonCacheMeasurement: () => (measuredNonCache += 1),
        cliProgressBarIncrement: terse ? () => undefined : cliProgressBarIncrement,
        originalFilePath,
        sharpOptions: config.sharpOptions ?? {},
        ...item,
      })
    )
  }

  try {
    await Promise.all(promises)

    if (!noCache) {
      writeCacheManifest(cacheImages)
    }

    if (!terse) {
      // eslint-disable-next-line no-console
      console.log(
        `Cache assets: ${measuredCache}, NonCache assets: ${measuredNonCache}\n`,
        '\x1b[35m\nSuccessful optimization!',
        '\x1b[39m'
      )
    }
  } catch (error) {
    console.error('Error processing files', error)
  }
}

export const run = () => {
  // eslint-disable-next-line no-console
  console.log('\x1b[35m\nnext-export-optimize-images: Optimize images.', '\x1b[39m')

  const config = getConfig()
  const manifestJsonPath = path.resolve(cwd, '.next/custom-optimized-images.nd.json')

  optimizeImages({ manifestJsonPath, noCache: false, config })
}
