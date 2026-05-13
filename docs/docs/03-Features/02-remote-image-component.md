---
description: This page introduces the RemoteImage component for remote images.
---

# RemoteImage component

If you want to use remote images (external images) in this library, you need to manually write the external image URL in the configuration file or use the `RemoteImage` component.  
In other words, using the `RemoteImage` component eliminates the need to manually write the image URL in the configuration file.

## Usage

```tsx
import RemoteImage from 'next-export-optimize-images/remote-image'

function Component() {
  return (
    <>
      <RemoteImage src="https://example.com/image01.jpg" alt="" />
      {/* 
        Or use dynamic values with variables
        const id = 'image01'
        <RemoteImage src={`https://example.com/${id}.jpg`} alt="" />
      */}
    </>
  )
}
```

or Picture tag.
(webp support is added by default)

```tsx
import RemotePicture from 'next-export-optimize-images/remote-picture'

function Component() {
  return (
    <>
      <RemotePicture src="https://example.com/image01.jpg" alt="" />
      {/* 
        Or use dynamic values with variables
        const id = 'image01'
        <RemotePicture src={`https://example.com/${id}.jpg`} alt="" />
      */}
    </>
  )
}
```

## Definition

- props: `ImageProps`
- return: `JSX.Element`

※ ImageProps is the same as the props of the Image component provided by next/image. `RemoteImage` accepts any `src` shape `<Image>` accepts; remote-URL strings are downloaded at build time, while `StaticImageData` and local paths are rendered as regular local images.

## Tips

### Auto-alias `next/image` to `RemoteImage` (experimental)

You can have `import Image from 'next/image'` resolve to `RemoteImage` everywhere — no need to change imports. Remote URLs are registered for build-time download; `StaticImageData` and local paths still render as local images.

Pass `unstable_nextImageAlias: true` as the second argument to `withExportImages`:

```js title="next.config.js"
const withExportImages = require('next-export-optimize-images')

module.exports = withExportImages(
  {
    output: 'export',
    // your Next.js config
  },
  { unstable_nextImageAlias: true }
)
```

With the option on, normal `next/image` imports work as drop-in `RemoteImage` usage:

```tsx
import Image from 'next/image'
import localPhoto from './photo.png'

// Remote URLs go through RemoteImage — manifest entry is registered automatically
<Image src="https://example.com/photo.jpg" alt="" width={800} height={600} />

// StaticImageData and local paths still work — they bypass the manifest write
<Image src={localPhoto} alt="" />
<Image src="/public-photo.png" alt="" width={800} height={600} />
```

The component dispatches at render time: any `src` that's a string matching `^(https?:)?//` is treated as remote (manifest entry written, downloaded at build time); everything else (`StaticImageData`, `/public/...`, `data:` URIs) is rendered as a regular local image.

The active bundler picks the right path automatically — webpack (Next 14 / 15 / 16) uses an issuer-scoped module-replacement plugin; Turbopack (Next 15 / 16) uses `turbopack.resolveAlias`.

#### Overriding the Next.js dist path

If a future Next.js release moves `next/dist/shared/lib/image-external` to a new location, you can point the Turbopack alias at the new path without waiting for this package to publish a fix:

```js title="next.config.js"
module.exports = withExportImages(
  {
    output: 'export',
  },
  {
    unstable_nextImageAlias: {
      nextImageDistPath: 'next/dist/some/new/path/to/image-external',
    },
  }
)
```

The package adds a `turbopack.resolveAlias` entry that redirects its own internal deep-path import to the configured path. Defaults to `next/dist/shared/lib/image-external` — leave unset unless Next has actually moved it.

#### Caveats

- **The alias is global.** Every `next/image` import is remapped, including imports inside third-party packages. The runtime dispatcher means most third-party usage (passing `StaticImageData` or local paths) keeps working transparently, but any third-party code that depends on `<Image>` being literally the canonical Next component (e.g. inspecting `Image.name` or comparing references) will see a different value.
- **The `unstable_` prefix is real.** The Turbopack path internally targets a Next.js private module path (`next/dist/shared/lib/image-external`). It's been stable across Next 14 / 15 / 16, but Next does not formally guarantee it. If Next moves the file, use `nextImageDistPath` to point at the new location without rebuilding.

### Use with `remoteImages`.

```js title="export-images.config.js"
/**
 * @type {import('next-export-optimize-images').Config}
 */
const config = {
  remoteImages: ['https://example.com/image01.jpg', 'https://example.com/image02.jpg'],
}

module.exports = config
```

```tsx
import Image from 'next-export-optimize-images/image'
import RemoteImage from 'next-export-optimize-images/remote-image'

function Component() {
  return (
    <>
      <Image src="https://example.com/image01.jpg" alt="" />
      <Image src="https://example.com/image02.jpg" alt="" />
      <RemoteImage src="https://example.com/image03.jpg" alt="" />
    </>
  )
}
```

'image01.jpg', 'image02.jpg' and 'image03.jpg' are downloaded locally and optimized.
