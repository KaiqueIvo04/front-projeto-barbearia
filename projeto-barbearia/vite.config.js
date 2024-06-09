import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@svg': fileURLToPath(new URL('./src/svg', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@router': fileURLToPath(new URL('./src/router', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@css': fileURLToPath(new URL('./src/css', import.meta.url))
    }
  },
  css: { 
    loaderOptions: { 
      sass: { 
        implementation:  require("node-sass")
       } 
    } 
  } 
})
