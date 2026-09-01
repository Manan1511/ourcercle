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
    // Library mode inlines CSS-referenced assets by default, which would embed
    // ~110KB of base64 fonts into the stylesheet and duplicate the font files
    // the sync copies separately. Force real files.
    assetsInlineLimit: 0,
    lib: {
      entry: resolve(import.meta.dirname, 'src/ui/lib-entry.ts'),
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        // Only the stylesheet gets the fixed name. Naming every asset
        // 'cercle.css' collides, and Vite falls back to inlining the fonts as
        // base64 -- which bloats the sheet and duplicates the files the sync
        // already copies from src/styles/fonts.css.
        assetFileNames: (info) =>
          info.names?.some((n) => n.endsWith('.css'))
            ? 'cercle.css'
            : 'fonts/[name][extname]',
      },
    },
  },
})
