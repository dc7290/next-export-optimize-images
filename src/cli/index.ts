import { createHash } from 'crypto'
import fs from 'fs'
import path from 'path'

import sharp from 'sharp'

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
  originalWidth: number
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
  originalWidth,
  output,
  width,
  quality,
  extension,
}) => {
  if (formatValidate(extension)) {
    const filePath = path.join(destDir, output)
    const fileDir = filePath.split('/').slice(0, -1).join('/')
    fs.mkdirSync(fileDir, { recursive: true })

    const outputPath = path.join(cacheDir, output)
    const outputDir = outputPath.split('/').slice(0, -1).join('/')
    fs.mkdirSync(outputDir, { recursive: true })

    // Cache process
    if (!noCache) {
      const cacheImagesFindIndex = cacheImages.findIndex((cacheImage) => cacheImage.output === output)
      const hash = createHash('sha256').update(fs.readFileSync(originalFilePath)).digest('hex')

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

    const imageBuffer = fs.readFileSync(originalFilePath)
    const image = sharp(imageBuffer, { sequentialRead: true })

    const resizeWidth = Math.min(originalWidth, width)

    image.rotate().resize({ width: resizeWidth })

    switch (extension) {
      case 'jpeg':
        await image.jpeg({ quality }).toFile(outputPath)
        break
      case 'jpg':
        await image.jpeg({ quality }).toFile(outputPath)
        break
      case 'png':
        await image.png({ quality }).toFile(outputPath)
        break
      case 'webp':
        await image.webp({ quality }).toFile(outputPath)
        break
      case 'avif':
        await image.avif({ quality }).toFile(outputPath)
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
  srcDir: string
  manifestJsonPath: string
  outputDir?: string
  noCache: boolean
}

export const optimizeImages = async ({ srcDir, manifestJsonPath, outputDir, noCache }: OptimizeImagesProps) => {
  const destDir = outputDir ?? srcDir

  let manifest: Manifest
  try {
    manifest = uniqueItems(
      fs
        .readFileSync(manifestJsonPath, 'utf-8')
        .trim()
        .split(/\n/g)
        .map((line) => JSON.parse(line))
    )
  } catch (error) {
    throw Error(typeof error === 'string' ? error : 'Unexpected error.')
  }

  cliProgressBarStart(manifest.length)

  createCacheDir()
  const cacheImages = readCacheManifest()
  const promises: Promise<void>[] = []

  let measuredCache = 0
  let measuredNonCache = 0

  for (const item of manifest) {
    const originalFilePath = path.join(srcDir, item.src)
    const originalWidth = (await sharp(originalFilePath).metadata()).width ?? 1280

    promises.push(
      getOptimizeResult({
        destDir,
        noCache,
        cacheImages,
        cacheDir: defaultCacheDir,
        cacheMeasurement: () => (measuredCache += 1),
        nonCacheMeasurement: () => (measuredNonCache += 1),
        cliProgressBarIncrement,
        originalFilePath,
        originalWidth,
        ...item,
      })
    )
  }

  try {
    await Promise.all(promises)
    writeCacheManifest(cacheImages)
    // eslint-disable-next-line no-console
    console.log(
      `Cache assets: ${measuredCache}, NonCache assets: ${measuredNonCache}\n`,
      '\x1b[35m\nSuccessful optimization!',
      '\x1b[39m'
    )
  } catch (error) {
    console.error('Error processing files', error)
  }
}

export const run = () => {
  // eslint-disable-next-line no-console
  console.log('\x1b[35m\nnext-export-optimize-images: Optimize images.', '\x1b[39m')

  const srcDir = path.resolve(cwd, 'out')
  const manifestJsonPath = path.resolve(cwd, '.next/custom-optimized-images.nd.json')

  optimizeImages({ srcDir, manifestJsonPath, noCache: false })
}
