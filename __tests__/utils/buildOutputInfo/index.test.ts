import buildOutputInfo from '../../../src/utils/buildOutputInfo'
import getConfig from '../../../src/utils/getConfig'

jest.mock('../../../src/utils/getConfig')

describe('buildOutputInfo', () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ;(getConfig as jest.MockedFunction<typeof getConfig>).mockReturnValue({
      outDir: undefined,
      imageDir: undefined,
      basePath: undefined,
      externalImageDir: undefined,
      quality: undefined,
      filenameGenerator: undefined,
      sharpOptions: undefined,
      convertFormat: undefined,
      sourceImageParser: undefined,
    })
  })

  test('Default image parser functions properly', () => {
    const input = {
      src: '/_next/static/media/test.png',
      width: 300,
    }

    const output = buildOutputInfo(input)

    expect(output).toEqual({
      output: '/_next/static/chunks/images/_next/static/media/test_300.png',
      extension: 'png',
      originalExtension: 'png',
      externalOutputDir: '_next/static/media',
    })
  })

  test('Default image parser functions properly (remote images)', () => {
    const input = {
      src: 'https://example.com/images/test.png',
      width: 300,
    }

    const output = buildOutputInfo(input)

    expect(output).toEqual({
      output: '/_next/static/chunks/images/images/test_300.png',
      extension: 'png',
      originalExtension: 'png',
      externalOutputDir: '_next/static/media',
    })
  })

  test('config.basePath is applied', () => {
    const input = {
      src: '/_next/static/media/test.png',
      width: 300,
    }

    ;(getConfig as jest.MockedFunction<typeof getConfig>).mockReturnValue({
      basePath: '/base-path',
    })

    const output = buildOutputInfo(input)

    expect(output).toEqual({
      output: '/_next/static/chunks/images/_next/static/media/test_300.png',
      extension: 'png',
      originalExtension: 'png',
      externalOutputDir: '_next/static/media',
    })
  })

  test('config.convertFormat is applied', () => {
    const input = {
      src: '/_next/static/media/test.png',
      width: 300,
    }

    ;(getConfig as jest.MockedFunction<typeof getConfig>).mockReturnValue({
      convertFormat: [['png', 'webp']],
    })

    const output = buildOutputInfo(input)

    expect(output).toEqual({
      output: '/_next/static/chunks/images/_next/static/media/test_300.webp',
      extension: 'webp',
      originalExtension: 'png',
      externalOutputDir: '_next/static/media',
    })
  })

  test('config.filenameGenerator is applied', () => {
    const input = {
      src: '/_next/static/media/test.png',
      width: 300,
    }

    ;(getConfig as jest.MockedFunction<typeof getConfig>).mockReturnValue({
      filenameGenerator: ({ path, name, width, extension }) => `${path}/${name}-${width}.${extension}`,
    })

    const output = buildOutputInfo(input)

    expect(output).toEqual({
      output: '/_next/static/chunks/images/_next/static/media/test-300.png',
      extension: 'png',
      originalExtension: 'png',
      externalOutputDir: '_next/static/media',
    })
  })

  test('config.imageDir and config.externalImageDir is applied', () => {
    const input = {
      src: '/_next/static/media/test.png',
      width: 300,
    }

    ;(getConfig as jest.MockedFunction<typeof getConfig>).mockReturnValue({
      imageDir: '/custom/images',
      externalImageDir: '/custom/external',
    })

    const output = buildOutputInfo(input)

    expect(output).toEqual({
      output: '/custom/images/_next/static/media/test_300.png',
      extension: 'png',
      originalExtension: 'png',
      externalOutputDir: 'custom/external',
    })
  })

  test('Unauthorized format in config.convertFormat throws an error', () => {
    const input = {
      src: '/_next/static/media/test.png',
      width: 300,
    }

    ;(getConfig as jest.MockedFunction<typeof getConfig>).mockReturnValue({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      convertFormat: [['png', 'invalid_format']],
    })

    expect(() => buildOutputInfo(input)).toThrowError(
      new Error(`Unauthorized format specified in \`configFormat\`. afterConvert: invalid_format`)
    )
  })

  test('Source image parser in config.sourceImageParser is used', () => {
    const input = {
      src: '/_next/static/media/test.png',
      width: 300,
    }

    const customParser = jest.fn(() => ({
      pathWithoutName: 'custom',
      name: 'test',
      extension: 'png',
    }))

    ;(getConfig as jest.MockedFunction<typeof getConfig>).mockReturnValue({
      sourceImageParser: customParser,
    })

    const output = buildOutputInfo(input)

    expect(customParser).toHaveBeenCalledWith({
      src: input.src,
      defaultParser: expect.any(Function),
    })

    expect(output).toEqual({
      output: '/_next/static/chunks/images/custom/test_300.png',
      extension: 'png',
      originalExtension: 'png',
      externalOutputDir: '_next/static/media',
    })
  })
})
