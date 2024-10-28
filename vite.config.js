import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.29.225:4009',
        changeOrigin: true
      },
    },
  },
  plugins: [react()],
})
