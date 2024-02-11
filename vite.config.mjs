import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'
import { fileURLToPath } from 'url'

export default defineConfig({
  plugins: [react(), crx({ manifest })],
  server: {
    port: 5713,
  },
  build: {
    rollupOptions: {
      input: {
        popup: fileURLToPath(new URL('./src/html/popup.html', import.meta.url)),
        page: fileURLToPath(new URL('./src/html/page.html', import.meta.url)),
      },
    },
  },
})
