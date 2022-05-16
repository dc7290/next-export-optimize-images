/**
 * @jest-environment jsdom
 */
process.env['TEST_CONFIG_PATH'] = '__tests__/components/image/config.js'

import { render, screen } from '@testing-library/react'
import React from 'react'

import CustomImage from '../../../src/image'

describe('Apply config', () => {
  test('Set `imageDir` and `filenameGenerator`', () => {
    render(<CustomImage src="/images/img.png" width={1920} height={1280} priority />)

    expect(screen.getByRole('img').getAttribute('src')).toBe('/_custom-optimize/images-img.3840.75.png')
  })
})
