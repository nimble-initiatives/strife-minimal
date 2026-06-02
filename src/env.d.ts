/// <reference types="astro/client" />

// Typed surface for the `strife:store` virtual module the integration injects.
// (Ambient types are not yet bundled with @strifeapp/astro — declare it here.)
declare module 'strife:store' {
  import type { DocumentStore } from 'ravendb';
  export const store: DocumentStore;
}
