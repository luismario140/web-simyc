import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

// Tailwind debe ejecutarse también en desarrollo para resolver sus imports CSS.
// Si instalas dependencias con Vite abierto, reinicia con Ctrl+C y npm run dev.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
})
