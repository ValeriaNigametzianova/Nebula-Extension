import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'
import { fileURLToPath } from 'url'
import eslintPlugin from 'vite-plugin-eslint'

export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
    eslintPlugin({
      cache: false,
      include: ['./src/**/*.js', './src/**/*.jsx'],
      exclude: [],
    }),
  ],
  server: {
    port: 5713,
  },
  build: {
    rollupOptions: {
      input: {
        popup: fileURLToPath(new URL('./src/html/popup.html', import.meta.url)),
        page: fileURLToPath(new URL('./src/html/page.html', import.meta.url)),
        helpPage: fileURLToPath(
          new URL('./src/html/helpPage.html', import.meta.url)
        ),
      },
    },
  },
})
