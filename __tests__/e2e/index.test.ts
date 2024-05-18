import path from 'path'

import fs from 'fs-extra'
import { imageConfigDefault } from 'next/dist/shared/lib/image-config'

const exist = (filename: string) => fs.existsSync(path.resolve(__dirname, 'out/_next/static/chunks/images', filename))

const files = [
  // avif

  // next/image
  '_next/static/media/img.8a5ad2fe_[width].avif',
  '_next/static/media/get-props.8a5ad2fe_[width].avif',
  '_next/static/media/get-props-mobile.7d5f5264_[width].avif',
  'images/img_[width].avif',
  'id/237/200/300_[width].avif',
  'id/238/200/300_[width].avif',
  'id/500/200/400_[width].avif',
  'images/animated_[width].avif',
  '_next/static/media/client-only.8a5ad2fe_[width].avif',
  // next/legacy/image
  '_next/static/media/legacy-img.8a5ad2fe_[width].avif',
  'images/legacy-img_[width].avif',

  // webp

  // next/image
  '_next/static/media/img.8a5ad2fe_[width].webp',
  '_next/static/media/get-props.8a5ad2fe_[width].webp',
  '_next/static/media/get-props-mobile.7d5f5264_[width].webp',
  'images/img_[width].webp',
  'id/237/200/300_[width].webp',
  'id/238/200/300_[width].webp',
  'id/500/200/400_[width].webp',
  'images/animated_[width].webp',
  '_next/static/media/client-only.8a5ad2fe_[width].webp',
  // next/legacy/image
  '_next/static/media/legacy-img.8a5ad2fe_[width].webp',
  'images/legacy-img_[width].webp',

  // png or jpg

  // next/image
  '_next/static/media/img.8a5ad2fe_[width].png',
  '_next/static/media/get-props.8a5ad2fe_[width].png',
  '_next/static/media/get-props-mobile.7d5f5264_[width].png',
  'images/img_[width].png',
  'id/237/200/300_[width].jpg',
  'id/238/200/300_[width].jpg',
  'id/300/200/400_[width].jpg',
  'id/400/200/400_[width].jpg',
  'id/500/200/400_[width].jpg',
  '_next/static/media/client-only.8a5ad2fe_[width].png',
  // next/legacy/image
  '_next/static/media/legacy-img.8a5ad2fe_[width].png',
  'images/legacy-img_[width].png',
]

describe('`next build && next export && next-export-optimize-images` is executed correctly', () => {
  test('Images are being generated.', async () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const customConfig = require('./next.config.js')
    const configImages = { ...imageConfigDefault, ...customConfig.images }
    const allSizes = [...configImages.imageSizes, ...configImages.deviceSizes]
    allSizes.forEach((size) => {
      files.forEach((file) => {
        const isExist = exist(file.replace('[width]', size.toString()))
        if (!isExist) {
          console.log(file.replace('[width]', size.toString()))
        }
        expect(isExist).toBeTruthy()
      })
    })
  })
})
