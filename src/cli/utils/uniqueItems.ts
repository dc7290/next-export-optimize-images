import uniqWith from 'lodash.uniqwith'

import type { Manifest } from '../'

const uniqueItems = (items: Manifest) =>
  uniqWith(items, (a, b) => a.output === b.output && a.width === b.width && a.extension === b.extension)

export default uniqueItems
