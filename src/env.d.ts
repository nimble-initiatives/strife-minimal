/// <reference types="astro/client" />

// Typed surface for the `strife:store` virtual module the integration injects.
// (Ambient types are not yet bundled with @strifeapp/astro — declare it here.)
declare module 'strife:store' {
  import type { DocumentStore } from 'ravendb';
  export const store: DocumentStore;
}

// The Strife live-preview client SDK (@strifeapp/strife) ships as untyped JS.
// Declare the one function we use: `subscribe` registers a callback that fires
// with the live document state on every Strife Studio edit, and returns an
// unsubscribe function. Used client-side in src/components/HomeContent.svelte.
declare module '@strifeapp/strife' {
  export function subscribe(callback: (data: unknown) => void): () => void;
}

// Set per request by the Strife edit-mode middleware (auto-registered by @strifeapp/astro)
// when a valid `?token=` preview is present.
declare namespace App {
  interface Locals {
    editMode?: boolean;
  }
}
