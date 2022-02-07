import fs from 'fs'
import path from 'path'

import sharp, { OutputInfo } from 'sharp'

import { GetOptimizeResult, ManifestJsonMock } from './types'
import formatValidate from './utils/formatValidate'
import lib from './utils/lib'

//
;(process.env.NODE_ENV as 'development' | 'production' | 'test') = 'production'

const manifestJsonMock: ManifestJsonMock = [
  {
    src: 'img.8a5ad2fe.png',
    quality: 100,
    layout: 'intrinsic',
  },
  {
    src: 'img.8a5ad2fe.png',
    sizes: '100vw',
    quality: 100,
    layout: 'responsive',
    placeholder: 'blur',
  },
  {
    src: 'img.8a5ad2fe.png',
    quality: 50,
    layout: 'responsive',
  },
  {
    src: 'img.8a5ad2fe.png',
    sizes: '(min-width: 768px) 20vw, 100vw',
    layout: 'responsive',
  },
]

const cwd = process.cwd()

export const optimizeImages = async () => {
  const { getWidths } = await lib()

  const mediaDirectory = path.resolve(cwd, 'out', '_next', 'static', 'media')

  const promises: Promise<OutputInfo>[] = []

  const getOptimizeResult: GetOptimizeResult = ({ image, name, format, width, quality }) => {
    if (formatValidate(format)) {
      const filePath = path.join(mediaDirectory, `${name}-${width}.${format}`)

      switch (format) {
        case 'jpeg':
          return image().resize({ width }).jpeg({ quality }).toFile(filePath)
        case 'jpg':
          return image().resize({ width }).jpeg({ quality }).toFile(filePath)
        case 'png':
          return image().resize({ width }).png({ quality }).toFile(filePath)
        case 'webp':
          return image().resize({ width }).webp({ quality }).toFile(filePath)
        case 'avif':
          return image().resize({ width }).avif({ quality }).toFile(filePath)
      }
    } else {
      throw Error(
        `Not an allowed format.\`${format}\`\nGive \`unoptimize\`prop to /next/image to disable optimization.`
      )
    }
  }

  for (const {
    src,
    sizes,
    quality = 75,
    layout = sizes ? 'responsive' : 'intrinsic',
    placeholder = 'empty',
    unoptimized = false,
  } of manifestJsonMock) {
    const originalFilePath = path.join(mediaDirectory, src)
    const image = () => sharp(originalFilePath, { sequentialRead: true })

    if (unoptimized) {
      continue
    }

    const name = src.split('.').slice(0, -1).join('.')

    const { width, format } = await image().metadata()

    const { widths } = getWidths(width, layout, sizes)
    widths.forEach((width) => promises.push(getOptimizeResult({ image, name, format, width, quality })))

    if (placeholder === 'blur') {
      promises.push(
        image()
          .resize({ width: 10 })
          .toFormat('png')
          .toFile(path.join(mediaDirectory, `${name}-10.${format}`))
      )
    }
  }

  try {
    const res = await Promise.all(promises)
    // eslint-disable-next-line no-console
    console.log('Done!', res)
  } catch (error) {
    console.error("Error processing files, let's clean it up", error)
    try {
      fs.unlinkSync('img.8a5ad2fe.640.png')
    } catch (e) {
      console.warn(e)
    }
  }
}

export const run = optimizeImages
