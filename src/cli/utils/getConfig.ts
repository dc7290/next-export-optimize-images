import { NextConfig } from 'next'
import { ImageConfigComplete } from 'next/dist/server/image-config'

const getConfig = async () => {
  const cwd = process.cwd()

  let config: NextConfig & { images: ImageConfigComplete }

  try {
    // >= v11.1.0
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    config = await require('next/dist/server/config').default(
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('next/constants').PHASE_PRODUCTION_BUILD,
      cwd
    )
  } catch (e) {
    // < v11.1.0
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    config = await require('next/dist/next-server/server/config').default(
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('next/constants').PHASE_PRODUCTION_BUILD,
      cwd
    )
  }

  return config
}

export default getConfig
