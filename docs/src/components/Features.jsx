import { CheckCircleIcon, CubeIcon, LightningBoltIcon } from '@heroicons/react/outline'
import React from 'react'

const features = [
  {
    name: 'Optimize images at build time',
    description:
      'Normally, to use `next/image` with `next export`, you need to use a cloud provider for image optimization. With this solution, however, you can optimize images at build time, eliminating the need for a cloud provider.',
    icon: CubeIcon,
  },
  {
    name: 'All options for `next/image` available',
    description:
      'There is no need to use any special components. Use `next/image` as usual, all its options are available.',
    icon: CheckCircleIcon,
  },
  {
    name: "Using `sharp`, so it's fast.",
    description:
      'It is fast because it uses `sharp` for image optimization. This is also the approach used in Next.js, which is much faster than other image processing libraries.',
    icon: LightningBoltIcon,
  },
  {
    name: 'Cache prevents repeating the same optimization',
    description: 'It has an internal cache mechanism so that the same images are not optimized repeatedly.',
    icon: CubeIcon,
  },
]

const Features = () => {
  return (
    <div className="overflow-hidden bg-gray-50 py-10 dark:bg-gray-800">
      <div className="relative mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
        <svg
          className="absolute top-0 left-full -translate-x-1/2 -translate-y-3/4 transform lg:left-auto lg:right-full lg:translate-x-2/3 lg:translate-y-1/4"
          width={404}
          height={784}
          fill="none"
          viewBox="0 0 404 784"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="8b1b5f72-e944-4457-af67-0c6d15a99f38"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect x={0} y={0} width={4} height={4} className="text-gray-200 dark:text-gray-600" fill="currentColor" />
            </pattern>
          </defs>
          <rect width={404} height={784} fill="url(#8b1b5f72-e944-4457-af67-0c6d15a99f38)" />
        </svg>

        <div className="relative lg:grid lg:grid-cols-3 lg:gap-x-8">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Evolve Next.js into a complete static site generator.
            </h2>
          </div>
          <dl className="mt-10 space-y-10 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 sm:space-y-0 lg:col-span-2 lg:mt-0">
            {features.map((feature) => (
              <div key={feature.name}>
                <dt>
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white dark:bg-indigo-700">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="mt-5 text-lg font-medium leading-6">{feature.name}</p>
                </dt>
                <dd className="mt-2 text-base text-gray-500 dark:text-gray-400">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

export default Features
