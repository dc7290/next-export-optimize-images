import path from 'node:path'
import { Stream } from 'node:stream'
import type { ReadableStream } from 'node:stream/web'
import fs from 'fs-extra'
import type { Manifest } from '../'
import type { Config } from './../../utils/getConfig'

type ExternalImagesDownloaderArgs = {
  terse?: boolean
  manifest: Manifest
  destDir: string
  remoteImagesDownloadsDelay?: Config['remoteImagesDownloadsDelay']
  processingConcurrency?: Config['processingConcurrency']
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const externalImagesDownloader = async ({
  terse = false,
  manifest,
  destDir,
  remoteImagesDownloadsDelay,
  processingConcurrency,
}: ExternalImagesDownloaderArgs) => {
  if (!terse) {
    // eslint-disable-next-line no-console
    console.log('\n- Download external images -')
  }

  const promises: Promise<void>[] = []
  const downloadedImages: string[] = []

  for (const { src, externalUrl } of manifest) {
    if (externalUrl === undefined) continue

    if (downloadedImages.some((image) => image === externalUrl)) continue

    if (remoteImagesDownloadsDelay) {
      await sleep(remoteImagesDownloadsDelay)
    }

    promises.push(
      (async (): Promise<void> => {
        downloadedImages.push(externalUrl)

        const outputPath = path.join(destDir, src)
        await fs.ensureFile(outputPath)

        const body = await fetch(externalUrl)
          .then((response) => response.body)
          .catch((e) => {
            throw new Error(`Failed to download \`${externalUrl}\`: ${e}`)
          })

        if (body === null) {
          throw new Error(`Failed to download \`${externalUrl}\`: reason: body is null`)
        }

        const readableNodeStream = Stream.Readable.fromWeb(body as ReadableStream<Uint8Array>)
        const fileStream = fs.createWriteStream(outputPath)

        return new Promise((resolve, reject) => {
          readableNodeStream.pipe(fileStream)
          readableNodeStream.on('error', reject)
          fileStream.on('finish', () => {
            if (!terse) {
              // eslint-disable-next-line no-console
              console.log(`\`${externalUrl}\` has been downloaded.`)
            }
            resolve()
          })
        })
      })()
    )
  }

  const concurrency = processingConcurrency ?? 10
  for (let i = 0; i < promises.length; i += concurrency) {
    const chunk = promises.slice(i, i + concurrency)
    await Promise.all(chunk)
  }
}

export default externalImagesDownloader
