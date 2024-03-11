import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    eslint(),
    vue(),
  ],
})
