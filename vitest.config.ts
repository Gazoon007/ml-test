import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
  },
})
