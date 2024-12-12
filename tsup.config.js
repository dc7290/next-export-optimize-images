import { defineConfig } from 'tsup'

const cfg = {
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: false,
  dts: true,
  format: ['cjs'],
}

export default defineConfig([
  // Main
  {
    ...cfg,
    entry: {
      index: 'src/index.ts',
      cli: 'src/cli/index.ts',
      loader: 'src/loader/index.ts',
    },
    external: ['next-export-optimize-images'],
    outDir: 'dist',
  },

  // Server Components
  {
    ...cfg,
    entry: {
      'remote-image': 'src/components/server/remote-image.tsx',
      'remote-picture': 'src/components/server/remote-picture.tsx',
    },
    external: ['next-export-optimize-images', '../client/image', '../client/picture'],
    outDir: 'dist/components/server',
  },

  // Client Components
  {
    ...cfg,
    entry: {
      image: 'src/components/client/image.tsx',
      'legacy/image': 'src/components/client/legacy/image.tsx',
      picture: 'src/components/client/picture.tsx',
    },
    external: ['next-export-optimize-images'],
    outDir: 'dist/components/client',
    esbuildOptions: (options) => {
      // Append "use client" to the top of the react entry point
      options.banner = {
        js: '"use client";',
      }
    },
  },
])
