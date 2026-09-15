import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type UserConfig } from 'vite'
import type { ViteReactSSGOptions } from 'vite-react-ssg'
import { events } from './src/content/generated/cercle-events.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Honour the port the environment assigns (preview tooling, containers);
    // fall back to Vite's default locally.
    port: Number(process.env.PORT) || 5173,
  },
  build: {
    // Fail the build rather than silently shipping an oversized bundle.
    chunkSizeWarningLimit: 600,
  },
  ssgOptions: {
    // /cercles/:slug is the one dynamic route in the app. Every slug is
    // known at build time from the committed content, so each event gets
    // its own real prerendered page rather than being excluded like a
    // genuinely dynamic route would be by default.
    includedRoutes(paths: string[]) {
      return [
        ...paths,
        ...events.map((event: { slug: string }) => `/cercles/${event.slug}`),
      ]
    },
  },
} satisfies UserConfig & { ssgOptions: Partial<ViteReactSSGOptions> })
