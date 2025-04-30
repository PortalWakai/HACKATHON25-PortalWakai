// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/HACKATHON25-PortalWakai/', // Nome exato do seu repositório
})