import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  site: 'https://lamaco-sn.com',
  redirects: {
    '/materiaux/gravier': '/materiaux/',
    '/materiaux/beton': '/materiaux/',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
