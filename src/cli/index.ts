import fs from 'fs'
import path from 'path'

import sharp, { OutputInfo } from 'sharp'

import type { GetOptimizeResult, Manifest } from './types'
import formatValidate from './utils/formatValidate'

const cwd = process.cwd()

type OptimizeImagesProps = {
  srcDir: string
  manifestJsonPath: string
  outputDir?: string
}

export const optimizeImages = async ({ srcDir, manifestJsonPath, outputDir }: OptimizeImagesProps) => {
  const destDir = outputDir ?? srcDir

  let manifest: Manifest
  try {
    manifest = fs
      .readFileSync(manifestJsonPath, 'utf-8')
      .trim()
      .split(/\n/g)
      .map((line) => JSON.parse(line))
  } catch (error) {
    throw Error(typeof error === 'string' ? error : 'Unexpected error.')
  }

  const promises: Promise<OutputInfo>[] = []

  const getOptimizeResult: GetOptimizeResult = ({ image, originalWidth, output, width, quality, extension }) => {
    if (formatValidate(extension)) {
      const filePath = path.join(destDir, output)

      const fileDir = filePath.split('/').slice(0, -1).join('/')
      if (!fs.existsSync(fileDir)) {
        fs.mkdirSync(fileDir)
      }

      const resizeWidth = Math.min(originalWidth, width)

      switch (extension) {
        case 'jpeg':
          return image.resize({ width: resizeWidth }).jpeg({ quality }).toFile(filePath)
        case 'jpg':
          return image.resize({ width: resizeWidth }).jpeg({ quality }).toFile(filePath)
        case 'png':
          return image.resize({ width: resizeWidth }).png({ quality }).toFile(filePath)
        case 'webp':
          return image.resize({ width: resizeWidth }).webp({ quality }).toFile(filePath)
        case 'avif':
          return image.resize({ width: resizeWidth }).avif({ quality }).toFile(filePath)
      }
    } else {
      throw Error(
        `Not an allowed format.\`${extension}\`\nGive \`unoptimize\`prop to /next/image to disable optimization.`
      )
    }
  }

  for (const item of manifest) {
    const originalFilePath = path.join(srcDir, item.src)
    const image = () => sharp(originalFilePath, { sequentialRead: true })

    const originalWidth = (await image().metadata()).width ?? 1280

    promises.push(
      getOptimizeResult({
        image: image(),
        originalWidth,
        ...item,
      })
    )
  }

  try {
    await Promise.all(promises)
  } catch (error) {
    console.error('Error processing files', error)
  }
}

export const run = () => {
  const srcDir = path.resolve(cwd, 'out')
  const manifestJsonPath = path.resolve(cwd, '.next/custom-optimized-images.nd.json')

  optimizeImages({ srcDir, manifestJsonPath })
}
