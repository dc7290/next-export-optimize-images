import fs from 'fs'
import path from 'path'

import sharp, { OutputInfo } from 'sharp'

import { GetOptimizeResult, Manifest } from './types'
import formatValidate from './utils/formatValidate'
import lib from './utils/lib'

const cwd = process.cwd()

type OptimizeImagesProps = {
  srcDir: string
  manifestJsonPath: string
  outputDir?: string
}

export const optimizeImages = async ({ srcDir, manifestJsonPath, outputDir }: OptimizeImagesProps) => {
  const { getWidths } = await lib()

  let manifest: Manifest
  try {
    manifest = JSON.parse(fs.readFileSync(manifestJsonPath, 'utf-8')) as Manifest
  } catch (error) {
    throw Error(typeof error === 'string' ? error : 'Cannot find manifest json')
  }

  const promises: Promise<OutputInfo>[] = []

  const getOptimizeResult: GetOptimizeResult = ({ image, name, format, originalWidth = 1280, width, quality }) => {
    if (formatValidate(format)) {
      const filePath = path.join(outputDir ?? srcDir, `${name}-${width}.${format}`)

      const resizeWidth = Math.min(originalWidth, width)

      switch (format) {
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
        `Not an allowed format.\`${format}\`\nGive \`unoptimize\`prop to /next/image to disable optimization.`
      )
    }
  }

  for (const {
    src,
    width: originalWidth,
    sizes,
    quality = 75,
    layout = sizes ? 'responsive' : 'intrinsic',
    placeholder = 'empty',
    unoptimized = false,
  } of manifest) {
    if (unoptimized) {
      continue
    }

    const originalFilePath = path.join(srcDir, src)
    const image = () => sharp(originalFilePath, { sequentialRead: true })

    const name = src.split('/').slice(-1).toString().split('.').slice(0, -1).join('.')
    const format = src.split('.').pop()

    const { widths } = getWidths(originalWidth, layout, sizes)
    widths.forEach((width) =>
      promises.push(
        getOptimizeResult({
          image: image(),
          name,
          format,
          originalWidth,
          width,
          quality,
        })
      )
    )

    if (placeholder === 'blur') {
      promises.push(
        image()
          .resize({ width: 10 })
          .toFormat('png')
          .toFile(path.join(outputDir ?? srcDir, `${name}-10.${format}`))
      )
    }
  }

  try {
    await Promise.all(promises)
  } catch (error) {
    console.error('Error processing files', error)
  }
}

export const run = () => {
  const srcDir = path.resolve(cwd, 'out')
  const manifestJsonPath = path.resolve(cwd, '.next', 'export-images-manifest.json')

  optimizeImages({ srcDir, manifestJsonPath })
}
