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
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          i18n: ['vue-i18n'],
          utils: ['dayjs'],
          'primevue-forms': [
            'primevue/button',
            'primevue/inputtext',
            'primevue/password',
            'primevue/dropdown',
            'primevue/calendar'
          ],
          'primevue-data': [
            'primevue/datatable',
            'primevue/column',
            'primevue/card',
            'primevue/avatar',
            'primevue/badge',
            'primevue/chip',
            'primevue/tag'
          ],
          'primevue-feedback': [
            'primevue/dialog',
            'primevue/toast',
            'primevue/confirmdialog',
            'primevue/progressspinner'
          ],
          'primevue-navigation': [
            'primevue/menu',
            'primevue/menubar'
          ],
          'primevue-layout': [
            'primevue/divider',
            'primevue/image'
          ],
          'primevue-icons': [
            'primeicons/primeicons.css'
          ]
        }
      }
    },
    sourcemap: true,
    minify: 'esbuild'
  },
  server: {
    port: 3000,
    open: true
  }
})
