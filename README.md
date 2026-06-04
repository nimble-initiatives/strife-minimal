# Strife minimal starter

A minimal [Astro](https://astro.build) site backed by [Strife](https://strife.app). One page, rendered live from your content store — with a Svelte island that streams Strife Studio edits straight into the page.

## Quick start

The fastest path is the Strife CLI — it scaffolds this starter, provisions a team + certificate, pushes the schema, and seeds the first page for you:

```bash
strife
```

Then:

```bash
npm run dev
```

Open the printed local URL — your home page renders content straight from Strife. Edit it in your studio (the CLI prints the link) and watch it update live.

## Manual setup

If you cloned this template yourself:

```bash
npm install
strife          # provision STRIFE_SECRET into .env + link a team
strife push     # deploy the schema (templates + content index)
npm run dev
```

You need a `STRIFE_SECRET` in `.env` (the CLI writes it). Without it the page renders placeholder copy.

## What's inside

| Path | What |
| --- | --- |
| `schemas/home.ts` | The `home` page type (`defineType`) — heading, body, hero image. |
| `strife.config.ts` | Points `strife push` / `strife typegen` at `./schemas`. |
| `strife.seed.json` | The initial Home content the CLI seeds on setup. |
| `src/pages/index.astro` | Reads the Home document from `strife:store`, then renders it through the live-preview island. |
| `src/components/HomeContent.svelte` | The Svelte island: renders heading + body and `subscribe`s to Strife Studio for live edits. |
| `astro.config.mjs` | Registers the `@astrojs/svelte` and `@strifeapp/astro` integrations. |
| `svelte.config.js` | Enables TypeScript + preprocessing in Svelte components. |

## How live preview works

`src/pages/index.astro` reads the Home document on the server and passes `heading` and `body` to `HomeContent.svelte`, hydrated with `client:load`. On mount the component calls `subscribe()` from [`@strifeapp/strife`](https://www.npmjs.com/package/@strifeapp/strife): Strife Studio pushes the full document state on every edit, and the component mirrors it into reactive state — so the preview updates with no refresh. The `<LivePreview />` component loads the SDK, and only in edit mode.

## Editing content

Open your Strife studio (the CLI prints the link after setup) and edit the Home page. In Studio's live preview the heading and body update **as you type**. Outside live preview, every request still reads the latest published content from Strife (on-demand rendering).

## Deploying

This starter renders on demand (`output: 'server'` in `astro.config.mjs`) — required for live preview and always-fresh content. `astro dev` runs on-demand with no adapter, so local development works as-is. For `astro build` / production, add an adapter for your host:

```bash
npx astro add node      # or vercel / netlify / cloudflare
```

## Learn more

- [Strife docs](https://developers.strife.app)
- [@strifeapp/astro](https://www.npmjs.com/package/@strifeapp/astro)
- [Astro docs](https://docs.astro.build)
