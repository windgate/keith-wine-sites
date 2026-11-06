import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';

// Pages are built as static HTML. The adapter is only needed so the
// /keystatic editor (used by the webmaster) can run on Netlify.
export default defineConfig({
  site: 'https://daqopa.com',
  integrations: [react(), keystatic(), sitemap()],
  adapter: netlify(),
  vite: {
    ssr: { noExternal: ['@keith/shared'] },
  },
});
