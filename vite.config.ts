import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://cc2.cloud.tianrang-inc.com',
        secure: false,
        changeOrigin: true,
        // rewrite: (path) => `${path.replace(/^\/api/, '')}`,
      },
    },
  },
})
