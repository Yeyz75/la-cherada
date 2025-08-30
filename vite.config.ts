import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  build: {
    target: 'esnext',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core Vue ecosystem
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          
          // Firebase (largest dependency)
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/storage', 'firebase/analytics'],
          
          // Internationalization
          'i18n-vendor': ['vue-i18n'],
          
          // Date utilities  
          'date-vendor': ['dayjs'],
          
          // PrimeVue core
          'primevue-core': ['primevue/config', 'primevue/toastservice', 'primevue/confirmationservice'],
          
          // Essential PrimeVue components
          'primevue-essentials': [
            'primevue/button',
            'primevue/inputtext', 
            'primevue/password',
            'primevue/toast',
            'primevue/confirmdialog',
            'primevue/progressspinner'
          ],
          
          // Extended PrimeVue components (loaded dynamically)
          'primevue-extended': [
            'primevue/dropdown',
            'primevue/calendar',
            'primevue/datatable',
            'primevue/column',
            'primevue/card',
            'primevue/avatar',
            'primevue/badge',
            'primevue/chip',
            'primevue/tag',
            'primevue/dialog',
            'primevue/menu',
            'primevue/menubar',
            'primevue/divider',
            'primevue/image'
          ]
        }
      }
    },
    sourcemap: true,
    minify: 'esbuild',
    cssMinify: true
  },
  server: {
    port: 3000,
    open: true
  }
})
