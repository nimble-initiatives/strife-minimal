import { defineConfig } from 'astro/config';
import strife from '@strifeapp/astro';

// Strife connects your site to its content store through a `strife:store` virtual
// module, resolved at runtime from STRIFE_SECRET (written to .env by `strife`).
// No output adapter is configured: `astro dev` and a static `astro build` both
// read live content. To serve live content in production (or to add edit-mode /
// live preview), switch to `output: 'server'` and add an adapter
// (e.g. `npx astro add node`).
export default defineConfig({
  integrations: [
    strife({
      collections: [{ name: 'Pages' }],
    }),
  ],
});
