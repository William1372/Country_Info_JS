import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "unreplied-marg-stenographical.ngrok-free.dev"
    ]
  }
})
