import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/').pop()
const base = process.env.GITHUB_ACTIONS && repositoryName
  ? `/${repositoryName}/`
  : '/'

export default defineConfig({
  base,
  plugins: [vue(), tailwindcss()],
})
