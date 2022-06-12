import path from 'path'

import fs from 'fs-extra'
import got from 'got'

import type { Manifest } from '../types'

type ExternalImagesDownloaderArgs = {
  terse?: boolean
  manifest: Manifest
  destDir: string
}

const externalImagesDownloader = async ({ terse = false, manifest, destDir }: ExternalImagesDownloaderArgs) => {
  if (!terse) {
    // eslint-disable-next-line no-console
    console.log('Download external images.')
  }

  const promises: Promise<void>[] = []
  const downloadedImages: string[] = []

  for (const { src, externalUrl } of manifest) {
    if (externalUrl === undefined) continue

    if (downloadedImages.some((image) => image === externalUrl)) continue

    promises.push(
      (async () => {
        downloadedImages.push(externalUrl)

        const outputPath = path.join(destDir, src)
        await fs.ensureFile(outputPath)

        await new Promise((resolve, reject) => {
          try {
            const readStream = got.stream(externalUrl)
            const writeStream = fs.createWriteStream(outputPath)

            readStream.pipe(writeStream)

            writeStream.on('finish', () => {
              if (!terse) {
                // eslint-disable-next-line no-console
                console.log(`\`${externalUrl}\` has been downloaded.`)
              }
              resolve(undefined)
            })
          } catch (e) {
            reject(e)
          }
        })
      })()
    )
  }

  await Promise.all(promises)
}

export default externalImagesDownloader
