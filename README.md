# Strife minimal starter

A minimal [Astro](https://astro.build) site backed by [Strife](https://strife.app). One page, rendered live from your content store.

## Quick start

The fastest path is the Strife CLI — it scaffolds this starter, provisions a team + certificate, pushes the schema, and seeds the first page for you:

```bash
strife
```

Then:

```bash
npm run dev
```

Open the printed local URL — your home page renders content straight from Strife. Edit it in your studio (the CLI prints the link) and refresh.

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
| `src/pages/index.astro` | Reads the Home document from `strife:store` and renders it. |
| `astro.config.mjs` | Registers the `@strifeapp/astro` integration. |

## Editing content

Open your Strife studio (the CLI prints the link after setup), edit the Home page, and refresh `npm run dev`. In dev, every request reads live from Strife.

## Deploying

This starter uses Astro's default static output, which works everywhere and snapshots content at build time. For **live content in production** or **edit-mode / live preview**, switch to on-demand rendering:

```js
// astro.config.mjs
export default defineConfig({
  output: 'server',
  // add an adapter for your host, e.g. `npx astro add node`
  integrations: [strife({ collections: [{ name: 'Pages' }] })],
});
```

## Learn more

- [@strifeapp/astro](https://www.npmjs.com/package/@strifeapp/astro)
- [Astro docs](https://docs.astro.build)
