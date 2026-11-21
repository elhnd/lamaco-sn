import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemapIntegration from './scripts/sitemap.mjs';
import securityIntegration from './scripts/security.mjs';

export default defineConfig({
  output: 'static',
  site: 'https://v2.lamaco-sn.com',
  trailingSlash: 'always',
  integrations: [sitemapIntegration(), securityIntegration()],
  redirects: {
    '/services': '/#materiaux',
    '/materiaux/gravier': '/materiaux/',
    '/materiaux/beton': '/materiaux/',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
