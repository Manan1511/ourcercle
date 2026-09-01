import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

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
})
