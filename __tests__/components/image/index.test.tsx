/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import React from 'react'

import CustomImage from '../../../src/image'

const blurDataURL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAIAAAD38zoCAAAAc0lEQVR42mNQkJSxtrAzNLfVNbSTVTPg4RfkFxIDIgYJCVkzKzdFZTUlJR1xGRVeAWGohLiEjL6ls5ahhYKchqCwBL+wGJ+gKEhCWkpeU89Ux9hKWVVHVkFLQFQSKiEvo25t66uqb8bNK8DNLwQR5RMUBQDM5g6Wk9WE3AAAAABJRU5ErkJggg=='

const staticImageData = {
  src: '/_next/static/media/image.819f8209.png',
  width: 1920,
  height: 1280,
  blurDataURL,
}

const staticRequireSrc = {
  default: staticImageData,
}

describe('CustomImage', () => {
  describe('String src', () => {
    test('Src and srcset are set correctly', () => {
      render(<CustomImage src="/img.png" width={1920} height={1280} priority />)

      expect(screen.getByRole('img')).toHaveAttribute('src', '/_next/static/chunks/images/img_3840_75.png')
      expect(screen.getByRole('img')).toHaveAttribute(
        'srcset',
        '/_next/static/chunks/images/img_1920_75.png 1x, /_next/static/chunks/images/img_3840_75.png 2x'
      )
    })

    test('BlurDataURL is set correctly', () => {
      render(<CustomImage src="/img.png" width={1920} height={1280} placeholder="blur" />)

      expect(screen.getByRole('img')).toHaveStyle({ backgroundImage: 'url(/_next/static/chunks/images/img_8_10.png)' })
    })
  })

  describe('StaticRequire src', () => {
    test('Src and srcset are set correctly', () => {
      render(<CustomImage src={staticRequireSrc} priority />)

      expect(screen.getByRole('img')).toHaveAttribute(
        'src',
        '/_next/static/chunks/images/_next/static/media/image.819f8209_3840_75.png'
      )
      expect(screen.getByRole('img')).toHaveAttribute(
        'srcset',
        '/_next/static/chunks/images/_next/static/media/image.819f8209_1920_75.png 1x, /_next/static/chunks/images/_next/static/media/image.819f8209_3840_75.png 2x'
      )
    })

    test('BlurDataURL is set correctly', () => {
      render(<CustomImage src={staticRequireSrc} placeholder="blur" />)

      expect(screen.getByRole('img')).toHaveStyle({ backgroundImage: `url(${blurDataURL})` })
    })
  })

  describe('StaticImageData src', () => {
    test('Src and srcset are set correctly', () => {
      render(<CustomImage src={staticImageData} priority />)

      expect(screen.getByRole('img')).toHaveAttribute(
        'src',
        '/_next/static/chunks/images/_next/static/media/image.819f8209_3840_75.png'
      )
      expect(screen.getByRole('img')).toHaveAttribute(
        'srcset',
        '/_next/static/chunks/images/_next/static/media/image.819f8209_1920_75.png 1x, /_next/static/chunks/images/_next/static/media/image.819f8209_3840_75.png 2x'
      )
    })

    test('BlurDataURL is set correctly', () => {
      render(<CustomImage src={staticImageData} placeholder="blur" />)

      expect(screen.getByRole('img')).toHaveStyle({ backgroundImage: `url(${blurDataURL})` })
    })
  })

  describe('Override props.', () => {
    test('Loader is set correctly', () => {
      render(
        <CustomImage
          src={staticRequireSrc}
          loader={({ src, width, quality }) => `${src}?w=${width}&q=${quality || 75}`}
          priority
        />
      )

      expect(screen.getByRole('img')).toHaveAttribute('src', '/_next/static/media/image.819f8209.png?w=3840&q=75')
    })

    test('BlurDataURL is set correctly', () => {
      render(<CustomImage src={staticRequireSrc} blurDataURL="customBlurDataURL" placeholder="blur" />)

      expect(screen.getByRole('img')).toHaveStyle({ backgroundImage: 'url(customBlurDataURL)' })
    })
  })
})
