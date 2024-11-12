import buildOutputInfo from '../../../src/utils/buildOutputInfo'
import type { Config } from '../../../src/utils/getConfig'

describe('buildOutputInfo', () => {
  test('Default image parser functions properly', () => {
    const input = {
      src: '/_next/static/media/test.png',
      width: 300,
      config: {},
    }

    const output = buildOutputInfo(input)

    expect(output).toEqual([
      {
        output: '/_next/static/chunks/images/_next/static/media/test_300.webp',
        src: '/_next/static/media/test.png',
        extension: 'webp',
        originalExtension: 'png',
      },
      {
        output: '/_next/static/chunks/images/_next/static/media/test_300.png',
        src: '/_next/static/media/test.png',
        extension: 'png',
        originalExtension: 'png',
      },
    ])
  })

  test('Default image parser functions properly (remote images)', () => {
    const input = {
      src: 'https://example.com/images/test.png',
      width: 300,
      config: {},
    }

    const output = buildOutputInfo(input)

    expect(output).toEqual([
      {
        output: '/_next/static/chunks/images/images/test_300.webp',
        src: 'https://example.com/images/test.png',
        extension: 'webp',
        originalExtension: 'png',
      },
      {
        output: '/_next/static/chunks/images/images/test_300.png',
        src: 'https://example.com/images/test.png',
        extension: 'png',
        originalExtension: 'png',
      },
    ])
  })

  test('config.basePath is applied', () => {
    const input = {
      src: '/_next/static/media/test.png',
      width: 300,
      config: {
        basePath: '/base-path',
      },
    }

    const output = buildOutputInfo(input)

    expect(output).toEqual([
      {
        output: '/_next/static/chunks/images/_next/static/media/test_300.webp',
        src: '/_next/static/media/test.png',
        extension: 'webp',
        originalExtension: 'png',
      },
      {
        output: '/_next/static/chunks/images/_next/static/media/test_300.png',
        src: '/_next/static/media/test.png',
        extension: 'png',
        originalExtension: 'png',
      },
    ])
  })

  test('config.convertFormat is applied', () => {
    const input = {
      src: '/_next/static/media/test.png',
      width: 300,
      config: {
        convertFormat: [['png', 'webp']],
      } as Config,
    }

    const output = buildOutputInfo(input)

    expect(output).toEqual([
      {
        output: '/_next/static/chunks/images/_next/static/media/test_300.webp',
        src: '/_next/static/media/test.png',
        extension: 'webp',
        originalExtension: 'png',
      },
    ])
  })

  test('config.generateFormats is applied', () => {
    const input = {
      src: '/_next/static/media/test.png',
      width: 300,
      config: {
        generateFormats: ['avif', 'webp'],
      } as Config,
    }

    const output = buildOutputInfo(input)

    expect(output).toEqual([
      {
        output: '/_next/static/chunks/images/_next/static/media/test_300.avif',
        src: '/_next/static/media/test.png',
        extension: 'avif',
        originalExtension: 'png',
      },
      {
        output: '/_next/static/chunks/images/_next/static/media/test_300.webp',
        src: '/_next/static/media/test.png',
        extension: 'webp',
        originalExtension: 'png',
      },
      {
        output: '/_next/static/chunks/images/_next/static/media/test_300.png',
        src: '/_next/static/media/test.png',
        extension: 'png',
        originalExtension: 'png',
      },
    ])
  })

  test('config.generateFormats ignores duplicate extensions', () => {
    const input = {
      src: '/_next/static/media/test.png',
      width: 300,
      config: {
        generateFormats: ['avif', 'webp', 'avif'],
      } as Config,
    }

    const output = buildOutputInfo(input)

    expect(output).toEqual([
      {
        output: '/_next/static/chunks/images/_next/static/media/test_300.avif',
        src: '/_next/static/media/test.png',
        extension: 'avif',
        originalExtension: 'png',
      },
      {
        output: '/_next/static/chunks/images/_next/static/media/test_300.webp',
        src: '/_next/static/media/test.png',
        extension: 'webp',
        originalExtension: 'png',
      },
      {
        output: '/_next/static/chunks/images/_next/static/media/test_300.png',
        src: '/_next/static/media/test.png',
        extension: 'png',
        originalExtension: 'png',
      },
    ])
  })

  test('config.filenameGenerator is applied', () => {
    const input = {
      src: '/_next/static/media/test.png',
      width: 300,
      config: {
        filenameGenerator: ({ path, name, width, extension }) => `${path}/${name}-${width}.${extension}`,
      } as Config,
    }

    const output = buildOutputInfo(input)

    expect(output).toEqual([
      {
        output: '/_next/static/chunks/images/_next/static/media/test-300.webp',
        src: '/_next/static/media/test.png',
        extension: 'webp',
        originalExtension: 'png',
      },
      {
        output: '/_next/static/chunks/images/_next/static/media/test-300.png',
        src: '/_next/static/media/test.png',
        extension: 'png',
        originalExtension: 'png',
      },
    ])
  })

  test('config.imageDir and config.externalImageDir is applied', () => {
    const input = {
      src: '/_next/static/media/test.png',
      width: 300,
      config: {
        imageDir: '/custom/images',
      } as Config,
    }

    const output = buildOutputInfo(input)

    expect(output).toEqual([
      {
        output: '/custom/images/_next/static/media/test_300.webp',
        src: '/_next/static/media/test.png',
        extension: 'webp',
        originalExtension: 'png',
      },
      {
        output: '/custom/images/_next/static/media/test_300.png',
        src: '/_next/static/media/test.png',
        extension: 'png',
        originalExtension: 'png',
      },
    ])
  })

  test('Unauthorized format in config.convertFormat throws an error', () => {
    const input = {
      src: '/_next/static/media/test.png',
      width: 300,
      config: {
        convertFormat: [['png', 'invalid_format']],
      } as unknown as Config,
    }

    expect(() => buildOutputInfo(input)).toThrowError(
      new Error('Unauthorized format specified in `configFormat`. afterConvert: invalid_format')
    )
  })

  test('Unauthorized extension in config.generateFormats throws an error', () => {
    const input = {
      src: '/_next/static/media/test.png',
      width: 300,
      config: {
        generateFormats: ['invalid_format'],
      } as unknown as Config,
    }

    expect(() => buildOutputInfo(input)).toThrow(
      new Error('Unauthorized extension specified in `generateFormats`: invalid_format')
    )
  })

  test('Source image parser in config.sourceImageParser is used', () => {
    const customParser = jest.fn(() => ({
      pathWithoutName: 'custom',
      name: 'test',
      extension: 'png',
    }))

    const input = {
      src: '/_next/static/media/test.png',
      width: 300,
      config: {
        sourceImageParser: customParser,
      },
    }

    const output = buildOutputInfo(input)

    expect(customParser).toHaveBeenCalledWith({
      src: input.src,
      defaultParser: expect.any(Function),
    })

    expect(output).toEqual([
      {
        output: '/_next/static/chunks/images/custom/test_300.webp',
        src: '/_next/static/media/test.png',
        extension: 'webp',
        originalExtension: 'png',
      },
      {
        output: '/_next/static/chunks/images/custom/test_300.png',
        src: '/_next/static/media/test.png',
        extension: 'png',
        originalExtension: 'png',
      },
    ])
  })
})
