import path from 'node:path'

import fs from 'fs-extra'
import { imageConfigDefault } from 'next/dist/shared/lib/image-config'

const optimizedImagesDir = path.resolve(__dirname, '.next/static/chunks/images')
const listAll = (root: string): string[] => {
  if (!fs.existsSync(root)) return []
  const out: string[] = []
  const stack: string[] = [root]
  while (stack.length > 0) {
    const cur = stack.pop()
    if (cur === undefined) break
    for (const entry of fs.readdirSync(cur, { withFileTypes: true })) {
      const full = path.join(cur, entry.name)
      if (entry.isDirectory()) stack.push(full)
      else out.push(path.relative(root, full).split(path.sep).join('/'))
    }
  }
  return out
}
const allOptimized = listAll(optimizedImagesDir)

const HASH_SENTINEL = 'HASH'
const WIDTH_SENTINEL = 'WIDTH'
const exist = (pattern: string) => {
  const tokenized = pattern.replace(/\[hash\]/g, HASH_SENTINEL).replace(/\[width\]/g, WIDTH_SENTINEL)
  const escaped = tokenized.replace(/[.+^${}()|[\]\\]/g, '\\$&')
  const reSrc = escaped.split(HASH_SENTINEL).join('[A-Za-z0-9_~.\\-]+').split(WIDTH_SENTINEL).join('\\d+')
  return allOptimized.some((f) => new RegExp(`^${reSrc}$`).test(f))
}

const files = [
  // webp

  // next/image
  '_next/static/media/img.[hash]_[width].webp',
  'id/237/200/300_[width].webp',
  'id/238/200/300_[width].webp',

  // png or jpg

  // next/image
  '_next/static/media/img.[hash]_[width].png',
  'id/237/200/300_[width].jpg',
  'id/238/200/300_[width].jpg',
]

describe('`next build && next export && next-export-optimize-images` is executed correctly', () => {
  test('Images are being generated.', async () => {
    const customConfig = require('./next.config.js')
    const configImages = { ...imageConfigDefault, ...customConfig.images }
    const allSizes = [...configImages.imageSizes, ...configImages.deviceSizes]
    for (const size of allSizes) {
      for (const file of files) {
        const pattern = file.replace('[width]', size.toString())
        const isExist = exist(pattern)
        if (!isExist) {
          console.log(pattern)
        }
        expect(isExist).toBeTruthy()
      }
    }
  })
})
