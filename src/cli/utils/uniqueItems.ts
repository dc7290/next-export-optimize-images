import uniqWith from 'lodash.uniqwith'

import type { Manifest } from '../types'

const uniqueItems = (items: Manifest) =>
  uniqWith(items, (a, b) => a.src === b.src && a.width === b.width && a.quality === b.quality)

export default uniqueItems
