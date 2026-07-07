import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Serves under https://newmoooon.github.io/personalwebsite/
  base: '/personalwebsite/',
  plugins: [react()],
})
