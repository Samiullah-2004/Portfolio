import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import seoPages from './scripts/seo-pages.js'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    seoPages(), // per-route HTML (title, description, canonical, Open Graph) + sitemap.xml
  ],
})
