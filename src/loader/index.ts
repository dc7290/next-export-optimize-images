// import appRoot from 'app-root-path'
// import { PHASE_PRODUCTION_BUILD } from 'next/constants'
import loaderUtils from 'next/dist/compiled/loader-utils3'
// import loadConfig from 'next/dist/server/config'
import type { LoaderContext } from 'webpack'

import formatValidate from '../cli/utils/formatValidate'

import type { LoaderOptions } from './types'

export default async function loader(this: LoaderContext<LoaderOptions>, content: Buffer) {
  this.cacheable && this.cacheable()
  const callback = this.async()

  // const { dir = process.cwd() } = this.getOptions()

  const context = this.rootContext
  const opts = { context, content }

  const extension = loaderUtils.interpolateName(this, '[ext]', opts) as string

  if (!formatValidate(extension)) {
    callback(null, content)
    return
  }

  // const config = await loadConfig(PHASE_PRODUCTION_BUILD, dir)
  // console.log(config.images)

  callback(null, context)
  return
}

export const raw = true
