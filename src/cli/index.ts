import { createHash } from 'crypto'
import path from 'path'

import fs from 'fs-extra'
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
  errorMeasurement: () => void
  cliProgressBarIncrement: () => void
  originalFilePath: string
  sharpOptions?: Config['sharpOptions']
} & Manifest[number]
type GetOptimizeResult = (getOptimizeResultProps: GetOptimizeResultProps) => Promise<void>

export const getOptimizeResult: GetOptimizeResult = async ({
  destDir,
  noCache,
  cacheImages,
  cacheDir,
  cacheMeasurement,
  nonCacheMeasurement,
  errorMeasurement,
  cliProgressBarIncrement,
  originalFilePath,
  src,
  output,
  width,
  quality,
  extension,
  sharpOptions,
}) => {
  if (formatValidate(extension)) {
    try {
      // eslint-disable-next-line no-empty
      if (src.startsWith('http')) {
      }

      const filePath = path.join(destDir, output)
      const fileDir = filePath.split(path.sep).slice(0, -1).join(path.sep)
      await fs.mkdirp(fileDir)

      const outputPath = path.join(cacheDir, output)
      const outputDir = outputPath.split(path.sep).slice(0, -1).join(path.sep)
      await fs.mkdirp(outputDir)

      const imageBuffer = await fs.readFile(originalFilePath)

      // Cache process
      if (!noCache) {
        const cacheImagesFindIndex = cacheImages.findIndex((cacheImage) => cacheImage.output === output)
        const hash = createHash('sha256').update(imageBuffer).digest('hex')

        if (cacheImagesFindIndex === -1) {
          cacheImages.push({ output, hash })
        } else {
          const currentCacheImage = cacheImages[cacheImagesFindIndex]
          if (currentCacheImage?.hash === hash) {
            await fs.copy(outputPath, filePath)
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

      await fs.copy(outputPath, filePath)

      nonCacheMeasurement()
      cliProgressBarIncrement()
    } catch (error) {
      console.warn(error)
      errorMeasurement()
    }
  } else {
    console.warn(
      `${originalFilePath}: Not an allowed format.\`${extension}\`\nGive \`unoptimize\`prop to /next/image to disable optimization.`
    )
    errorMeasurement()
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
    manifest = uniqueItems(processManifest(await fs.readFile(manifestJsonPath, 'utf-8')))
  } catch (error) {
    throw Error(typeof error === 'string' ? error : 'Unexpected error.')
  }

  if (!terse) {
    cliProgressBarStart(manifest.length)
  }

  let cacheImages: CacheImages = []

  if (!noCache) {
    await createCacheDir()
    cacheImages = readCacheManifest()
  }

  const promises: Promise<void>[] = []

  let measuredCache = 0
  let measuredNonCache = 0
  let measuredError = 0

  const cacheMeasurement = () => (measuredCache += 1)
  const nonCacheMeasurement = () => (measuredNonCache += 1)
  const errorMeasurement = () => (measuredError += 1)

  for (const item of manifest) {
    const originalFilePath = path.join(destDir, item.src)

    promises.push(
      getOptimizeResult({
        destDir,
        noCache,
        cacheImages,
        cacheDir: defaultCacheDir,
        cacheMeasurement,
        nonCacheMeasurement,
        errorMeasurement,
        cliProgressBarIncrement: terse ? () => undefined : cliProgressBarIncrement,
        originalFilePath,
        sharpOptions: config.sharpOptions ?? {},
        ...item,
      })
    )
  }

  await Promise.all(promises)

  if (!noCache) {
    writeCacheManifest(cacheImages)
  }

  if (!terse) {
    // eslint-disable-next-line no-console
    console.log(
      `Cache assets: ${measuredCache}, NonCache assets: ${measuredNonCache}, Error assets: ${measuredError}\n`,
      '\x1b[35m\nSuccessful optimization!',
      '\x1b[39m'
    )
  }
}

type Run = (args: { customManifestJsonPath?: string; noCache?: boolean }) => void

export const run: Run = ({ customManifestJsonPath, noCache = false }) => {
  // eslint-disable-next-line no-console
  console.log('\x1b[35m\nnext-export-optimize-images: Optimize images.', '\x1b[39m')

  const config = getConfig()
  const manifestJsonPath = path.resolve(cwd, customManifestJsonPath ?? '.next/custom-optimized-images.nd.json')

  optimizeImages({ manifestJsonPath, noCache, config })
}
