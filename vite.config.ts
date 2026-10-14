import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // GitHub Pages serves the site from /portfolio-/; Vercel and local dev use /.
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
});
