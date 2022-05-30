/**
 * @jest-environment jsdom
 */
process.env['TEST_CONFIG_PATH'] = '__tests__/components/image/external-images/config.js'
process.env['TEST_JSON_PATH'] = '__tests__/components/image/external-images/manifest.json'

import fs from 'fs'
import path from 'path'

import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'

import uniqueItems from '../../../../src/cli/utils/uniqueItems'
import CustomImage from '../../../../src/image'
import processManifest from '../../../../src/utils/processManifest'

const manifestPath = path.resolve(__dirname, 'manifest.json')
const imagePath = path.resolve(__dirname, 'og.png')

describe('External images', () => {
  beforeAll(() => {
    if (fs.existsSync(manifestPath)) {
      fs.rmSync(manifestPath)
    }

    if (fs.existsSync(imagePath)) {
      fs.rmSync(imagePath)
    }
  })

  beforeEach(() => {
    cleanup()
    render(
      <CustomImage src="https://next-export-optimize-images.vercel.app/og.png" width={1920} height={1280} priority />
    )
  })

  test.skip('Images are downloaded.', () => {
    expect(fs.existsSync(imagePath)).toBeTruthy()
  })

  test('Manifest.json is output correctly', () => {
    const manifest = uniqueItems(processManifest(fs.readFileSync(manifestPath, 'utf-8')))
    expect(manifest).toMatchSnapshot()
  })

  test('URLs of external images are set correctly', () => {
    expect(screen.getByRole('img').getAttribute('src')).toBe('/_next/static/chunks/images/og_3840_75.png')
    expect(screen.getByRole('img').getAttribute('srcset')).toBe(
      '/_next/static/chunks/images/og_1920_75.png 1x, /_next/static/chunks/images/og_3840_75.png 2x'
    )
  })
})
