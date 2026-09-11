import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // SSG: react-helmet-async é CJS — precisa ser bundlado no build de servidor.
  ssr: {
    noExternal: ['react-helmet-async']
  },
  build: {
    rollupOptions: {
      output: {
        // Separa vendors grandes em chunks próprios: melhora cache entre deploys
        // e permite download paralelo do JS crítico.
        manualChunks: (id) => {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('swiper') || id.includes('ssr-window') || id.includes('dom7'))
            return 'swiper'
          if (id.includes('@supabase')) return 'supabase'
          if (id.includes('react-router') || id.includes('react-dom') || id.includes('/react/'))
            return 'react'
          return undefined
        }
      }
    }
  },
  server: {
    host: true,
    port: 8080
  }
})

