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
  {
    ...cfg,
    entry: {
      image: 'src/components/image.tsx',
      'legacy-image': 'src/components/legacy-image.tsx',
      picture: 'src/components/picture.tsx',
    },
    external: ['react', 'next', 'next-export-optimize-images'],
    outDir: 'dist/components',
    esbuildOptions: (options) => {
      // Append "use client" to the top of the react entry point
      options.banner = {
        js: '"use client";',
      }
    },
  },
])
