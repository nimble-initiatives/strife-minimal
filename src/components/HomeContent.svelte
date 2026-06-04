<script lang="ts">
  import { onMount, untrack } from 'svelte';
  import { subscribe } from '@strifeapp/strife';
  import PoweredByStrife from './PoweredByStrife.svelte';

  // Content can arrive as a plain string or a locale-keyed object ({ en: "…" }) —
  // both from the server (initial props) and from live-preview updates.
  type Localized = string | Record<string, unknown> | null | undefined;
  type CommunityLink = { label: string; href: string };

  interface Props {
    heading?: Localized;
    body?: Localized;
    editMode?: boolean;
    locale?: string;
    docsUrl?: string;
    community?: CommunityLink[];
  }

  let {
    heading: initialHeading = '',
    body: initialBody = '',
    editMode = false,
    locale = 'en',
    docsUrl = 'https://developers.strife.app',
    community = [],
  }: Props = $props();

  // Resolve either shape to a string — mirrors the reader in index.astro so the
  // server-rendered value and the live-preview value behave identically.
  function t(value: Localized): string {
    if (value == null) return '';
    if (typeof value === 'string') return value;
    const v = (value as Record<string, unknown>)[locale] ?? Object.values(value)[0];
    return typeof v === 'string' ? v : '';
  }

  // Seed once from the server-rendered props; from here on `subscribe` owns these.
  // `untrack` makes that one-time read explicit (and silences Svelte's
  // state_referenced_locally hint, which assumes we forgot to stay reactive).
  let heading = $state(untrack(() => t(initialHeading)));
  let body = $state(untrack(() => t(initialBody)));

  onMount(() => {
    // This is the whole point of the live preview: Strife Studio pushes the full
    // document state on every keystroke, and we mirror the fields we render into
    // reactive state — no refresh, no rebuild. `subscribe` returns its own
    // teardown function, so we hand it straight back to onMount as cleanup.
    //
    // Tip: for rich HTML bodies with images/embeds, swap `{@html body}` below for
    // a morphlex-based action so the DOM is diffed instead of replaced. Plain
    // `{@html}` keeps this starter dependency-free.
    return subscribe((data) => {
      if (!data || typeof data !== 'object') return;
      const doc = data as Record<string, Localized>;
      if ('heading' in doc) heading = t(doc.heading);
      if ('body' in doc) body = t(doc.body);
    });
  });
</script>

<article class="home" class:editing={editMode}>
  {#if editMode}
    <p class="edit-pill"><span class="dot" aria-hidden="true"></span>Live preview</p>
  {/if}

  <header class="intro">
    <PoweredByStrife />

    <h1 class="heading reveal" style="--delay: 250ms" data-placeholder="Add a heading in Strife Studio">{heading}</h1>

    <div class="body reveal" style="--delay: 340ms" data-placeholder="Add body content in Strife Studio">
      {@html body}
    </div>
  </header>

  <section class="cards" aria-label="Next steps">
    <a class="card card--docs reveal-fade" style="--delay: 480ms" href={docsUrl} target="_blank" rel="noreferrer">
      <span class="card-label">Documentation</span>
      <span class="card-title">Read the docs</span>
      <span class="card-text">Schemas, live preview, and deploying — everything you need to take this site further.</span>
      <span class="card-cue">
        <span class="card-cue-url">developers.strife.app</span>
        <svg class="arrow arrow--ne" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
    </a>

    <section class="card card--community reveal-fade" style="--delay: 560ms" aria-labelledby="community-title">
      <span class="card-label">Community</span>
      <span class="card-title" id="community-title">Say hello</span>
      <span class="card-text">Questions, feedback, or just want to show us what you built?</span>
      {#if community.length}
        <ul class="links" role="list">
          {#each community as link}
            <li>
              <a href={link.href} target="_blank" rel="noreferrer">
                <span>{link.label}</span>
                <svg class="arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3.5 8h9M9 4.5 12.5 8 9 11.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </a>
            </li>
          {/each}
        </ul>
      {/if}
    </section>
  </section>

  <footer class="foot reveal-fade" style="--delay: 640ms">
    Edit this page in Strife Studio — your changes appear here live.
  </footer>
</article>

<style>
  .home {
    --gutter: clamp(1.5rem, 1rem + 4vw, 4rem);
    position: relative;
    max-inline-size: 64rem;
    margin-inline: auto;
    padding: clamp(3.5rem, 2.5rem + 6vw, 7rem) var(--gutter) clamp(2.5rem, 2rem + 3vw, 4rem);
    min-block-size: 100dvh;
    display: flex;
    flex-direction: column;
    gap: clamp(2.5rem, 2rem + 2vw, 3.75rem);
  }

  /* ---- Edit-mode pill ----------------------------------------------------- */
  .edit-pill {
    position: absolute;
    inset-block-start: clamp(1rem, 0.5rem + 2vw, 2rem);
    inset-inline-end: var(--gutter);
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
    padding: 0.4rem 0.8rem;
    border: 1px solid color-mix(in oklab, var(--accent), transparent 60%);
    border-radius: 999px;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent-bright);
    background: color-mix(in oklab, var(--accent), transparent 88%);
  }
  .edit-pill .dot {
    inline-size: 0.45rem;
    block-size: 0.45rem;
    border-radius: 50%;
    background: var(--accent-bright);
  }

  /* ---- Intro -------------------------------------------------------------- */
  .intro {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: clamp(1.4rem, 1rem + 1.6vw, 2.4rem);
    max-inline-size: 54rem;
  }

  .heading {
    margin: 0;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: clamp(2.4rem, 1.5rem + 3.6vw, 4.25rem);
    line-height: 1.02;
    letter-spacing: -0.03em;
    text-wrap: balance;
    color: var(--ink);
    max-inline-size: 18ch;
  }

  .body {
    font-size: clamp(1.05rem, 1rem + 0.45vw, 1.25rem);
    line-height: 1.65;
    text-wrap: pretty;
    color: var(--ink-muted);
    max-inline-size: 52ch;
  }

  .body :global(p) {
    margin: 0 0 1rem;
  }
  .body :global(p:last-child) {
    margin-bottom: 0;
  }
  .body :global(a) {
    color: var(--accent-bright);
    text-decoration-color: color-mix(in oklab, var(--accent-bright), transparent 55%);
    text-underline-offset: 3px;
  }

  /* ---- Cards (anchored toward the bottom, below the hero) ----------------- */
  .cards {
    margin-block-start: auto;
    display: grid;
    gap: clamp(0.75rem, 0.5rem + 1vw, 1.1rem);
  }

  @media (min-width: 48rem) {
    .cards {
      /* Documentation gets a touch more room than the community card — a small
         asymmetry that reads as designed rather than a pair of identical tiles. */
      grid-template-columns: 1.12fr 0.88fr;
    }
  }

  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    padding: clamp(1.5rem, 1.2rem + 1.4vw, 2.25rem);
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 14px;
    color: var(--ink);
    text-decoration: none;
    isolation: isolate;
  }

  /* The short purple rule pinned to the top edge — the one repeated brand mark,
     echoing the eyebrow tick. */
  .card::before {
    content: '';
    position: absolute;
    inset-block-start: -1px;
    inset-inline-start: clamp(1.5rem, 1.2rem + 1.4vw, 2.25rem);
    inline-size: 1.85rem;
    block-size: 2px;
    background: var(--accent);
    transition: inline-size 0.35s var(--ease-out-expo);
  }

  .card-label {
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--accent-bright);
  }

  .card-title {
    margin-block-start: 0.45rem;
    font-family: var(--font-display);
    font-weight: 600;
    font-size: clamp(1.3rem, 1.1rem + 0.8vw, 1.7rem);
    line-height: 1.1;
    letter-spacing: -0.012em;
  }

  .card-text {
    margin-block-start: 0.35rem;
    font-size: 0.96rem;
    line-height: 1.55;
    color: var(--ink-muted);
    max-inline-size: 34ch;
  }

  /* Docs card — the whole surface is one link. */
  .card--docs {
    transition:
      border-color 0.3s,
      background-color 0.3s,
      transform 0.3s var(--ease-out-expo);
  }
  .card--docs:hover {
    background-color: var(--surface-hover);
    border-color: color-mix(in oklab, var(--accent), transparent 55%);
    transform: translateY(-2px);
  }
  .card--docs:hover::before {
    inline-size: 3.25rem;
  }
  .card--docs:focus-visible {
    outline: 2px solid var(--accent-bright);
    outline-offset: 3px;
  }

  .card-cue {
    margin-block-start: auto;
    padding-block-start: 1.5rem;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.82rem;
    color: var(--ink-faint);
    font-variant-numeric: tabular-nums;
    transition: color 0.3s;
  }
  .card--docs:hover .card-cue {
    color: var(--accent-bright);
  }

  .arrow {
    inline-size: 0.95rem;
    block-size: 0.95rem;
    flex: none;
  }
  .arrow--ne {
    transition: transform 0.3s var(--ease-out-expo);
  }
  .card--docs:hover .arrow--ne {
    transform: translate(3px, -3px);
  }

  /* Community card — a small stack of distinct links, deliberately a different
     internal shape from the docs card. */
  .links {
    margin: auto 0 0;
    padding: 0;
    padding-block-start: 1.25rem;
    list-style: none;
  }
  .links li + li {
    border-block-start: 1px solid var(--line);
  }
  .links a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-block: 0.7rem;
    color: var(--ink);
    text-decoration: none;
    font-size: 0.95rem;
    transition: color 0.25s;
  }
  .links a:hover {
    color: var(--accent-bright);
  }
  .links .arrow {
    color: var(--ink-faint);
    transition:
      transform 0.3s var(--ease-out-expo),
      color 0.25s;
  }
  .links a:hover .arrow {
    transform: translateX(3px);
    color: var(--accent-bright);
  }
  .links a:focus-visible {
    outline: 2px solid var(--accent-bright);
    outline-offset: 3px;
    border-radius: 4px;
  }

  /* ---- Footer ------------------------------------------------------------- */
  .foot {
    padding-block-start: clamp(1.75rem, 1.25rem + 1.5vw, 2.5rem);
    border-block-start: 1px solid var(--line);
    font-size: 0.85rem;
    color: var(--ink-faint);
  }

  /* ---- Edit-mode affordance ---------------------------------------------- */
  /* While editing in Studio, surface a hint in any field left empty so it stays
     clickable instead of collapsing to nothing. */
  .editing [data-placeholder]:empty::before {
    content: attr(data-placeholder);
    color: var(--ink-faint);
    font-weight: 400;
  }

  /* ---- Entrance ----------------------------------------------------------- */
  /* One orchestrated, staggered load. Gated behind `no-preference` so reduced-
     motion users (and non-supporting engines) get the content immediately,
     never a hidden-then-revealed flash. Text rises; cards just fade so their
     hover transform stays unencumbered by the animation's locked end state. */
  @media (prefers-reduced-motion: no-preference) {
    .reveal {
      opacity: 0;
      transform: translateY(12px);
      animation: reveal 0.65s var(--ease-out-expo) var(--delay, 0ms) both;
    }
    .reveal-fade {
      opacity: 0;
      animation: fade 0.65s var(--ease-out-expo) var(--delay, 0ms) both;
    }
    .edit-pill .dot {
      animation: ping 2.4s ease-out infinite;
    }
  }

  @keyframes reveal {
    to {
      opacity: 1;
      transform: none;
    }
  }
  @keyframes fade {
    to {
      opacity: 1;
    }
  }
  @keyframes ping {
    0% {
      box-shadow: 0 0 0 0 color-mix(in oklab, var(--accent-bright), transparent 35%);
    }
    70%,
    100% {
      box-shadow: 0 0 0 7px transparent;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .card--docs,
    .card::before,
    .arrow,
    .links a {
      transition: none;
    }
  }
</style>
