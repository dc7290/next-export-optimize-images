import uniqueItems from '../../../src/cli/utils/uniqueItems'

const items = [
  {
    output: '/_next/static/chunks/images/default_1920_75.png',
    src: '/default.png',
    width: 1920,
    quality: 75,
    extension: 'png',
  },
  {
    output: '/_next/static/chunks/images/default_1920_75.png',
    src: '/default.png',
    width: 1920,
    quality: 75,
    extension: 'png',
  },
  {
    output: '/_next/static/chunks/images/default_1920_75.png',
    src: '/default.png',
    width: 1920,
    quality: 75,
    extension: 'png',
  },
  {
    output: '/_next/static/chunks/images/default_1920_75.png',
    src: '/default.png',
    width: 1920,
    quality: 75,
    extension: 'png',
  },
  {
    output: '/_next/static/chunks/images/default_3840_75.png',
    src: '/default.png',
    width: 3840,
    quality: 75,
    extension: 'png',
  },
]

describe('uniqby', () => {
  test('Duplicate items are eliminated.', () => {
    expect(uniqueItems(items)).toEqual([
      {
        extension: 'png',
        output: '/_next/static/chunks/images/default_1920_75.png',
        quality: 75,
        src: '/default.png',
        width: 1920,
      },
      {
        output: '/_next/static/chunks/images/default_3840_75.png',
        src: '/default.png',
        width: 3840,
        quality: 75,
        extension: 'png',
      },
    ])
  })
})
