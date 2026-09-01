import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vite'

/**
 * Library build for the design system (`npm run build:ds` -> dist-ds/).
 *
 * Separate from the site build: this emits src/ui as a consumable package
 * with type declarations, which is what the Claude Design sync converts.
 * React is external (the host provides it); react-router-dom is bundled by
 * the sync's own bundler from node_modules.
 */
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      include: ['src/ui/**/*.ts', 'src/ui/**/*.tsx', 'src/lib/**/*.ts'],
      entryRoot: 'src',
      insertTypesEntry: true,
      tsconfigPath: resolve(import.meta.dirname, 'tsconfig.ds.json'),
    }),
  ],
  // The site's public/ assets are not part of the library.
  publicDir: false,
  build: {
    outDir: 'dist-ds',
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: {
      entry: resolve(import.meta.dirname, 'src/ui/lib-entry.ts'),
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: { assetFileNames: 'cercle.css' },
    },
  },
})
