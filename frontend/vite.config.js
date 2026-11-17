import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    // Polyfill для sockjs-client в браузерной среде
    global: 'window',
    'process.env': {},
    process: { env: {} },
  },
})