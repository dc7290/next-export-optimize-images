import path from 'path'

import fs from 'fs-extra'

const exist = (filename: string) => fs.existsSync(path.resolve(__dirname, 'out/_next/static/chunks/images', filename))

const files = [
  '_next/static/media/img.8a5ad2fe_1920_75.webp',
  '_next/static/media/img.8a5ad2fe_3840_75.webp',
  'images/img_640_75.webp',
  'images/img_750_75.webp',
  'images/img_828_75.webp',
  'images/img_1080_75.webp',
  'images/img_1200_75.webp',
  'images/img_1920_75.webp',
  'images/img_2048_75.webp',
  'images/img_3840_75.webp',
  'og_1920_75.webp',
  'og_3840_75.webp',
]

describe('`next build && next export && next-export-optimize-images` is executed correctly', () => {
  test('Images are being generated.', () => {
    expect(files.every((file) => exist(file))).toBeTruthy()
  })
})
