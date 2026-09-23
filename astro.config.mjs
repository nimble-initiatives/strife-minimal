import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import strife from '@strifeapp/astro';

// Strife connects your site to its content store through a `strife:store` virtual
// module; all connection config (URLs, database, certificate) resolves at runtime from
// STRIFE_SECRET (written to .env by `strife`). The integration also auto-registers the
// edit-mode middleware that powers Strife Studio's live preview.
//
// `output: 'server'` (on-demand rendering) is REQUIRED for live preview: the `?token=`
// preview token is read per-request by that middleware, and middleware does NOT run on
// prerendered (static) pages. `astro dev` renders on-demand with no adapter, so local
// development works as-is. For `astro build` / production, add an adapter:
// `npx astro add node` (or vercel / netlify / cloudflare).
//
// The dev server is pinned to 4321 to match the preview origin `strife` sets on the team.
export default defineConfig({
  output: 'server',
  server: { port: 4321 },
  // `svelte()` powers the live-preview island (src/components/HomeContent.svelte).
  // It must be registered before `strife()`.
  // `httpCache.maxBytes` bounds the RavenDB client's HTTP response cache behind
  // `strife:store` (8 MiB is the SDK default; set it explicitly so it tracks your
  // server's memory, and budget ~2x in heap). Needs `ravendb` >= 7.2.3 in this site.
  integrations: [svelte(), strife({ httpCache: { maxBytes: 8 * 1024 * 1024 } })],
});
