import path from 'path'

import fs from 'fs-extra'
import { imageConfigDefault } from 'next/dist/shared/lib/image-config'

const exist = (filename: string) => fs.existsSync(path.resolve(__dirname, 'out/_next/static/chunks/images', filename))

const files = [
  // next/image
  '_next/static/media/img.8a5ad2fe_[width].webp',
  'images/img_[width].webp',
  'og_[width].webp',
  'images/animated_[width].webp',
  '_next/static/media/client-only.8a5ad2fe_[width].webp',
  // next/legacy/image
  '_next/static/media/legacy-img.8a5ad2fe_[width].webp',
  'images/legacy-img_[width].webp',

  // generateFormats: ['jpg'],

  // next/image
  '_next/static/media/img.8a5ad2fe_[width].jpg',
  'images/img_[width].jpg',
  'og_[width].jpg',
  'images/animated_[width].jpg',
  '_next/static/media/client-only.8a5ad2fe_[width].jpg',
  // next/legacyjpgge
  '_next/static/media/legacy-img.8a5ad2fe_[width].jpg',
  'images/legacy-img_[width].jpg',
]

describe('`next build && next export && next-export-optimize-images` is executed correctly', () => {
  test('Images are being generated.', async () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const customConfig = require('./next.config.js')
    const configImages = { ...imageConfigDefault, ...customConfig.images }
    const allSizes = [...configImages.imageSizes, ...configImages.deviceSizes]
    allSizes.forEach((size) => {
      files.forEach((file) => {
        expect(exist(file.replace('[width]', size.toString()))).toBeTruthy()
      })
    })
  })
})
