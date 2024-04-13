import path from 'path'

import fs from 'fs-extra'
import { imageConfigDefault } from 'next/dist/shared/lib/image-config'

const exist = (filename: string) => fs.existsSync(path.resolve(__dirname, '.next/static/chunks/images', filename))

const files = [
  // webp

  // next/image
  '_next/static/media/img.8a5ad2fe_[width].webp',
  'id/237/200/300_[width].webp',
  'id/238/200/300_[width].webp',

  // png or jpg

  // next/image
  '_next/static/media/img.8a5ad2fe_[width].png',
  'id/237/200/300_[width].jpg',
  'id/238/200/300_[width].jpg',
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
