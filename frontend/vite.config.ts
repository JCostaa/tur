import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/public': {
        target: 'https://www.skoobtur.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
