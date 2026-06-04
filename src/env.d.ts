/// <reference types="astro/client" />

// Typed surface for the `strife:store` virtual module the integration injects.
// (Ambient types are not yet bundled with @strifeapp/astro — declare it here.)
declare module 'strife:store' {
  import type { DocumentStore } from 'ravendb';
  export const store: DocumentStore;
}

// Set per request by the Strife edit-mode middleware (auto-registered by @strifeapp/astro)
// when a valid `?token=` preview is present.
declare namespace App {
  interface Locals {
    editMode?: boolean;
  }
}
