import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 'babel-plugin-inline-import',
    {
      extensions: ['.svg']
    }
  ],
  base: '/HACKATHON25-PortalWakai/',
  build: {
    manifest: true,
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
})