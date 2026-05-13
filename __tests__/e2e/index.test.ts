import path from 'node:path'

import fs from 'fs-extra'
import { imageConfigDefault } from 'next/dist/shared/lib/image-config'

// Recursively walk the optimized-images output dir once and cache the results
// so the per-pattern match below stays cheap.
const optimizedImagesDir = path.resolve(__dirname, 'out/_next/static/chunks/images')
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

// Patterns may contain `[hash]` (matches any contiguous hash segment Turbopack
// or webpack emits — base36 chars plus `_~.-`) and `[width]` (replaced with the
// specific width being checked).
const HASH_SENTINEL = 'HASH'
const WIDTH_SENTINEL = 'WIDTH'
const exist = (pattern: string) => {
  const tokenized = pattern.replace(/\[hash\]/g, HASH_SENTINEL).replace(/\[width\]/g, WIDTH_SENTINEL)
  const escaped = tokenized.replace(/[.+^${}()|[\]\\]/g, '\\$&')
  const reSrc = escaped.split(HASH_SENTINEL).join('[A-Za-z0-9_~.\\-]+').split(WIDTH_SENTINEL).join('\\d+')
  return allOptimized.some((f) => new RegExp(`^${reSrc}$`).test(f))
}

const files = [
  // avif

  // next/image
  '_next/static/media/img.[hash]_[width].avif',
  '_next/static/media/get-props.[hash]_[width].avif',
  '_next/static/media/get-props-mobile.[hash]_[width].avif',
  'images/img_[width].avif',
  'id/237/200/300_[width].avif',
  'id/238/200/300_[width].avif',
  'id/500/200/400_[width].avif',
  'images/animated_[width].avif',
  '_next/static/media/client-only.[hash]_[width].avif',
  // next/legacy/image
  '_next/static/media/legacy-img.[hash]_[width].avif',
  'images/legacy-img_[width].avif',
  // picture
  '_next/static/media/picture.[hash]_[width].avif',
  'images/picture_[width].avif',

  // webp

  // next/image
  '_next/static/media/img.[hash]_[width].webp',
  '_next/static/media/get-props.[hash]_[width].webp',
  '_next/static/media/get-props-mobile.[hash]_[width].webp',
  'images/img_[width].webp',
  'id/237/200/300_[width].webp',
  'id/238/200/300_[width].webp',
  'id/500/200/400_[width].webp',
  'images/animated_[width].webp',
  '_next/static/media/client-only.[hash]_[width].webp',
  // next/legacy/image
  '_next/static/media/legacy-img.[hash]_[width].webp',
  'images/legacy-img_[width].webp',
  // picture
  '_next/static/media/picture.[hash]_[width].webp',
  'images/picture_[width].webp',

  // png or jpg

  // next/image
  '_next/static/media/img.[hash]_[width].png',
  '_next/static/media/get-props.[hash]_[width].png',
  '_next/static/media/get-props-mobile.[hash]_[width].png',
  'images/img_[width].png',
  'id/237/200/300_[width].jpg',
  'id/238/200/300_[width].jpg',
  'id/300/200/400_[width].jpg',
  'id/400/200/400_[width].jpg',
  'id/500/200/400_[width].jpg',
  '_next/static/media/client-only.[hash]_[width].png',
  // next/legacy/image
  '_next/static/media/legacy-img.[hash]_[width].png',
  'images/legacy-img_[width].png',
  // picture
  '_next/static/media/picture.[hash]_[width].png',
  'images/picture_[width].png',
]

describe('`next build && next export && next-export-optimize-images` is executed correctly', () => {
  test('Images are being generated.', async () => {
    const customConfig = await require('./next.config.js')
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

  test('ignorePaths is working.', async () => {
    const isExist = exist('images/ignore-img.png')
    expect(isExist).toBeFalsy()
  })
})
