import { defineConfig } from 'tsup'

const cfg = {
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: false,
  dts: true,
  format: ['esm', 'cjs'],
}

export default defineConfig([
  {
    ...cfg,
    entry: {
      index: 'src/index.ts',
      cli: 'src/cli/index.ts',
      loader: 'src/loader/index.ts',
    },
    outDir: 'dist',
  },
  {
    ...cfg,
    entry: {
      image: 'src/components/image.tsx',
      'legacy-image': 'src/components/legacy-image.tsx',
    },
    external: ['react'],
    outDir: 'dist/components',
    esbuildOptions: (options) => {
      // Append "use client" to the top of the react entry point
      options.banner = {
        js: '"use client";',
      }
    },
  },
])
