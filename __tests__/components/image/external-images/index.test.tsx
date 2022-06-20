/**
 * @jest-environment jsdom
 */
process.env['TEST_CONFIG_PATH'] = '__tests__/components/image/external-images/config.js'
process.env['TEST_JSON_PATH'] = '__tests__/components/image/external-images/manifest.json'

import path from 'path'

import { render, screen } from '@testing-library/react'
import fs from 'fs-extra'
import React from 'react'

import uniqueItems from '../../../../src/cli/utils/uniqueItems'
import CustomImage from '../../../../src/image'
import processManifest from '../../../../src/utils/processManifest'

const manifestPath = path.resolve(__dirname, 'manifest.json')

beforeAll(async () => {
  await fs.remove(manifestPath)
})
describe('External images', () => {
  test('Manifest.json is output correctly', () => {
    render(
      <CustomImage
        src="https://next-export-optimize-images.vercel.app/sub-path/og.png"
        width={1920}
        height={1280}
        priority
      />
    )

    const manifest = uniqueItems(processManifest(fs.readFileSync(manifestPath, 'utf-8')))
    expect(manifest).toEqual([
      {
        extension: 'webp',
        externalUrl: 'https://next-export-optimize-images.vercel.app/sub-path/og.png',
        output: '/_next/static/chunks/images/sub-path/og_1920_75.webp',
        quality: 75,
        src: '/_next/static/media/sub-path/og.png',
        width: 1920,
      },
      {
        extension: 'webp',
        externalUrl: 'https://next-export-optimize-images.vercel.app/sub-path/og.png',
        output: '/_next/static/chunks/images/sub-path/og_3840_75.webp',
        quality: 75,
        src: '/_next/static/media/sub-path/og.png',
        width: 3840,
      },
    ])
  })

  test('URLs of external images are set correctly', () => {
    render(
      <CustomImage
        src="https://next-export-optimize-images.vercel.app/sub-path/og.png"
        width={1920}
        height={1280}
        priority
      />
    )

    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      '/base-path/_next/static/chunks/images/sub-path/og_3840_75.webp'
    )
    expect(screen.getByRole('img')).toHaveAttribute(
      'srcset',
      '/base-path/_next/static/chunks/images/sub-path/og_1920_75.webp 1x, /base-path/_next/static/chunks/images/sub-path/og_3840_75.webp 2x'
    )
  })
})
