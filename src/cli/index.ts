import { createHash } from 'crypto'
import path from 'path'

import colors from 'ansi-colors'
import fs from 'fs-extra'
import { PHASE_PRODUCTION_BUILD } from 'next/constants'
import loadConfig from 'next/dist/server/config'
import { ImageConfigComplete } from 'next/dist/shared/lib/image-config'
import recursiveReadDir from 'recursive-readdir'
import sharp from 'sharp'

import buildOutputInfo from '../utils/buildOutputInfo'
import formatValidate from '../utils/formatValidate'
import getConfig, { Config } from '../utils/getConfig'
import processManifest from '../utils/processManifest'

import externalImagesDownloader from './external-images'
import { CacheImages, createCacheDir, defaultCacheDir, readCacheManifest, writeCacheManifest } from './utils/cache'
import { cliProgressBarIncrement, cliProgressBarStart } from './utils/cliProgressBar'
import uniqueItems from './utils/uniqueItems'

export type Manifest = {
  output: string
  src: string
  width: number
  extension: string
  externalUrl?: string
}[]

type GetOptimizeResultProps = {
  imageBuffer: Buffer
  destDir: string
  noCache: boolean
  cacheImages: CacheImages
  cacheDir: string
  cacheMeasurement: () => void
  nonCacheMeasurement: () => void
  errorMeasurement: () => void
  pushInvalidFormatAssets: (asset: string) => void
  cliProgressBarIncrement: () => void
  originalFilePath: string
  quality: number
  sharpOptions?: Config['sharpOptions']
} & Omit<Manifest[number], 'src'>
type GetOptimizeResult = (getOptimizeResultProps: GetOptimizeResultProps) => Promise<void>

export const getOptimizeResult: GetOptimizeResult = async ({
  imageBuffer,
  destDir,
  noCache,
  cacheImages,
  cacheDir,
  cacheMeasurement,
  nonCacheMeasurement,
  errorMeasurement,
  pushInvalidFormatAssets,
  cliProgressBarIncrement,
  originalFilePath,
  quality,
  sharpOptions,
  output,
  width,
  extension,
}) => {
  if (formatValidate(extension)) {
    try {
      const filePath = path.join(destDir, output)
      await fs.ensureFile(filePath)

      const outputPath = path.join(cacheDir, output)
      await fs.ensureFile(outputPath)

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

      const image = sharp(imageBuffer, { sequentialRead: true, animated: true })

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
    } catch (error) {
      console.warn(error)
      errorMeasurement()
    } finally {
      cliProgressBarIncrement()
    }
  } else {
    try {
      const filePath = path.join(destDir, output)
      await fs.ensureFile(filePath)

      await fs.copy(originalFilePath, filePath)

      extension !== 'svg' && pushInvalidFormatAssets(originalFilePath)
    } catch (error) {
      console.warn(error)
      errorMeasurement()
    } finally {
      cliProgressBarIncrement()
    }
  }
}

const cwd = process.cwd()

type OptimizeImagesProps = {
  manifestJsonPath: string
  noCache: boolean
  config: Config
  nextImageConfig: ImageConfigComplete
  terse?: boolean
}

export const optimizeImages = async ({
  manifestJsonPath,
  noCache,
  config,
  nextImageConfig,
  terse = false,
}: OptimizeImagesProps) => {
  const destDir = config.mode === 'build' ? cwd : path.resolve(cwd, config.outDir ?? 'out')
  const srcDir = config.mode === 'build' ? cwd : destDir

  let manifest: Manifest = []
  try {
    if (fs.existsSync(manifestJsonPath)) {
      manifest = uniqueItems(processManifest(await fs.readFile(manifestJsonPath, 'utf-8')))
    }
  } catch (error) {
    throw Error(typeof error === 'string' ? error : 'Unexpected error.')
  }

  // Next Image allSizes
  const allSizes = [...nextImageConfig.imageSizes, ...nextImageConfig.deviceSizes]

  // External image if present
  const remoteImages =
    config.remoteImages === undefined
      ? []
      : typeof config.remoteImages === 'function'
        ? await config.remoteImages()
        : config.remoteImages
  if (remoteImages.length > 0) {
    const remoteImageList = new Set<string>()

    remoteImages.forEach((url) => {
      remoteImageList.add(url)
    })

    manifest = manifest.concat(
      Array.from(remoteImageList)
        .map((url) =>
          allSizes.map((size) => {
            return buildOutputInfo({
              src: url,
              width: size,
              config,
            }).map(({ output, extension, originalExtension }) => {
              const externalOutputDir = `${
                config.externalImageDir
                  ? config.externalImageDir.replace(/^\//, '').replace(/\/$/, '')
                  : '_next/static/media'
              }`

              const json: Manifest[number] = {
                output,
                src: `/${config.mode === 'build' ? externalOutputDir.replace(/^_next/, '.next') : externalOutputDir}/${createHash(
                  'sha256'
                )
                  .update(
                    url
                      .replace(/^https?:\/\//, '')
                      .split('/')
                      .slice(1)
                      .join('/')
                  )
                  .digest('hex')}.${originalExtension}`,
                width: size,
                extension,
                externalUrl: url,
              }

              return json
            })
          })
        )
        .flat(2)
    )
  }
  if (manifest.some(({ externalUrl }) => externalUrl !== undefined)) {
    await externalImagesDownloader({
      terse,
      manifest,
      destDir,
      remoteImagesDownloadsDelay: config.remoteImagesDownloadsDelay,
    })
  }

  const publicDir = path.resolve(cwd, 'public')
  if (fs.existsSync(publicDir)) {
    if (!terse) {
      // eslint-disable-next-line no-console
      console.log(`\n- Collect images in public directory -`)
    }
    const publicDirFiles = await recursiveReadDir(publicDir)
    const publicDirImages = publicDirFiles.filter((file) => {
      const ext = path.extname(file).toLowerCase()
      return ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.webp' || ext === '.avif' || ext === '.gif'
    })
    manifest = manifest.concat(
      publicDirImages
        .map((file) =>
          allSizes.map((size) => {
            const src = file.replace(publicDir, '')
            return buildOutputInfo({
              src,
              width: size,
              config,
            }).map(({ output, extension }) => {
              const json: Manifest[number] = {
                output,
                src,
                width: size,
                extension,
              }

              return json
            })
          })
        )
        .flat(2)
    )
  }

  if (!terse) {
    // eslint-disable-next-line no-console
    console.log(`\n- Image Optimization -`)
    cliProgressBarStart(manifest.length)
  }

  let cacheImages: CacheImages = []

  if (!noCache) {
    await createCacheDir()
    cacheImages = readCacheManifest()
  }

  let measuredCache = 0
  let measuredNonCache = 0
  let measuredError = 0
  const invalidFormatAssets = new Set<string>([])

  const cacheMeasurement = () => (measuredCache += 1)
  const nonCacheMeasurement = () => (measuredNonCache += 1)
  const errorMeasurement = () => (measuredError += 1)
  const pushInvalidFormatAssets = (asset: string) => invalidFormatAssets.add(asset)

  const srcMap: Record<string, Omit<Manifest[number], 'src'>[]> = {}
  for (const item of manifest) {
    const { src, ...rest } = item
    if (src in srcMap) {
      srcMap[src]?.push(rest)
    } else {
      srcMap[src] = [rest]
    }
  }

  const promises: Promise<void>[] = []

  for (const key in srcMap) {
    const items = srcMap[key]

    if (items === undefined || items.length === 0) continue

    const originalFilePath = path.join(srcDir, config.mode === 'build' ? key.replace(/^\/_next/, '/.next') : key)
    const imageBuffer = await fs.readFile(originalFilePath)

    for (const item of items) {
      item.output = config.mode === 'build' ? item.output.replace(/^\/_next/, '/.next') : item.output

      promises.push(
        getOptimizeResult({
          imageBuffer,
          destDir,
          noCache,
          cacheImages,
          cacheDir: defaultCacheDir,
          cacheMeasurement,
          nonCacheMeasurement,
          errorMeasurement,
          pushInvalidFormatAssets,
          cliProgressBarIncrement: terse ? () => undefined : cliProgressBarIncrement,
          originalFilePath,
          quality: config.quality ?? 75,
          sharpOptions: config.sharpOptions ?? {},
          ...item,
        })
      )
    }
  }

  await Promise.all(promises)

  if (!noCache) {
    writeCacheManifest(cacheImages)
  }

  if (!terse) {
    // eslint-disable-next-line no-console
    console.log(`Cache assets: ${measuredCache}, NonCache assets: ${measuredNonCache}, Error assets: ${measuredError}`)

    if (invalidFormatAssets.size !== 0) {
      // eslint-disable-next-line no-console
      console.log(
        `\nThe following images are in a non-optimized format and a simple copy was applied.\n`,
        Array.from(invalidFormatAssets).join('\n')
      )
    }

    // eslint-disable-next-line no-console
    console.log(colors.bold.magenta('\nSuccessful optimization!'))
  }
}

type Run = (args: { noCache?: boolean }) => void

export const run: Run = async ({ noCache = false }) => {
  // eslint-disable-next-line no-console
  console.log(colors.bold.magenta('\nnext-export-optimize-images: Optimize images.'))

  const config = getConfig()
  const manifestJsonPath = path.resolve(cwd, '.next/next-export-optimize-images-list.nd.json')

  const nextConfig = await loadConfig(PHASE_PRODUCTION_BUILD, cwd)

  await optimizeImages({ manifestJsonPath, noCache, config, nextImageConfig: nextConfig.images })
}
