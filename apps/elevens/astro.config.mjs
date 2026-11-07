import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';

// Pages are built as static HTML. The adapter is only needed so the
// /keystatic editor (used by the webmaster) can run on Netlify.
export default defineConfig({
  site: 'https://elevensimports.com',
  integrations: [react(), keystatic(), sitemap()],
  // devFeatures off: skip Netlify's local edge-function emulator during
  // `astro dev`. This site uses none, and the emulator needs Deno.
  adapter: netlify({ devFeatures: false }),
  vite: {
    ssr: { noExternal: ['@keith/shared'] },
  },
});
