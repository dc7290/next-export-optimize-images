/**
 * @jest-environment jsdom
 */
process.env['TEST_JSON_PATH'] = '__tests__/components/image/manifest/manifest.json'

import path from 'path'

import { render } from '@testing-library/react'
import fs from 'fs-extra'
import React from 'react'

import uniqueItems from '../../../../src/cli/utils/uniqueItems'
import CustomImage from '../../../../src/image'
import processManifest from '../../../../src/utils/processManifest'

const manifestPath = path.resolve(__dirname, 'manifest.json')

beforeAll(async () => {
  await fs.remove(manifestPath)
})

describe('Create JSON', () => {
  test('Common', () => {
    render(
      <>
        <CustomImage src="/img.png" width={1920} height={1280} priority alt="" />
      </>
    )

    const manifest = uniqueItems(processManifest(fs.readFileSync(manifestPath, 'utf-8')))
    expect(manifest).toMatchSnapshot()
  })
})
