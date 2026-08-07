import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const isProduction = process.env.NODE_ENV === 'production'

// https://vite.dev/config/
export default defineConfig({
  base: isProduction ? '/Portfolio2/' : '/',
  build: {
    outDir: 'docs'
  },
  plugins: [vue()],
})
