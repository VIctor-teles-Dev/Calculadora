import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa' 


export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
    
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'src/assets/*.png'],
      manifest: {
        name: 'Calculadora LISP',
        short_name: 'CalcLISP',
        description: 'Calculadora científica com números complexos e notação LISP',
        theme_color: '#7c3aed',        
        background_color: '#111827',    
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'calc_icon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'calc_icon_512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'calc_icon_512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            
            urlPattern: /^https:\/\/cdn\.esm\.sh\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'cdn-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
})