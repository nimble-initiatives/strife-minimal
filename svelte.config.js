import { vitePreprocess } from '@astrojs/svelte';

// Lets Svelte components use TypeScript (lang="ts"), PostCSS, etc. via Vite.
export default {
  preprocess: vitePreprocess(),
};
