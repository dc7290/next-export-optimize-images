import uniqWith from 'lodash.uniqwith'

import type { Manifest } from '../'

const uniqueItems = (items: Manifest) => uniqWith(items, (a, b) => a.output === b.output)

export default uniqueItems
