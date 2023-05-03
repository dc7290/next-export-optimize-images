import Link from '@docusaurus/Link'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import React from 'react'

const Introduction = () => {
  return (
    <div className="py-28 text-center">
      <Link
        to="/docs/intro"
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 hover:text-white hover:no-underline focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Introduction
        <ChevronRightIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
      </Link>
    </div>
  )
}

export default Introduction
