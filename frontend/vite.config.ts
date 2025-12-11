import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy para API Skoobtur
      '/api/skoobtur': {
        target: 'https://www.skoobtur.com/api/public',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api\/skoobtur/, ''),
        configure: (proxy: { on: Function }) => {
          proxy.on('error', (err: Error) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (_: unknown, req: { method: string; url: string }) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes: { statusCode: number }, req: { url: string }) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      }
    }
  }
})
