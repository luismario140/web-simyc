import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

// Tailwind debe ejecutarse también en desarrollo para resolver sus imports CSS.
// Si instalas dependencias con Vite abierto, reinicia con Ctrl+C y npm run dev.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    // Dominio exacto del túnel de desarrollo compartido para esta revisión.
    allowedHosts: ['bvxlqn7f-5173.use2.devtunnels.ms'],
  },
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
})
