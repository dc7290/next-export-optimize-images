/**
 * @jest-environment jsdom
 */
process.env['TEST_JSON_PATH'] = '__tests__/components/image/manifest.json'

import fs from 'fs'
import path from 'path'

import { render } from '@testing-library/react'
import React from 'react'

import uniqueItems from '../../../src/cli/utils/uniqueItems'
import CustomImage from '../../../src/image'
import processManifest from '../../../src/utils/processManifest'

const manifestPath = path.resolve(__dirname, 'manifest.json')

beforeAll(() => {
  if (fs.existsSync(manifestPath)) {
    fs.rmSync(manifestPath)
  }
})

describe('Create JSON', () => {
  test('Common', () => {
    render(
      <>
        <CustomImage src="/img.png" width={1920} height={1280} priority />
      </>
    )

    const manifest = uniqueItems(processManifest(fs.readFileSync(manifestPath, 'utf-8')))
    expect(manifest).toMatchSnapshot()
  })
})
