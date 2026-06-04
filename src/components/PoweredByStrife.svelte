<!--
  Animated "Powered by Strife" wordmark.

  Inspired by Jhey Tompkins' claw reveal (https://codepen.io/jh3y/pen/PwYRWRJ).
  Two claws descend, deposit a white mark, "let go" and retract: one drops a dot
  onto the "i" of Strife, the other a period after the word. The marks stay hidden
  until the moment the claws release them.

  Mark/claw positions are in viewBox units, tuned to the wordmark's default
  (system) font. If you change --font-body, nudge the `--dot-x` / `--period-x`
  values on `.wordmark-svg` below.
-->
<svg
  class="wordmark-svg"
  viewBox="0 0 1000 150"
  fill="none"
  role="img"
  aria-label="Powered by Strife"
  xmlns="http://www.w3.org/2000/svg"
>
  <!-- Dotless "ı" (U+0131): the lowercase i ships without its tittle so the only
       dot over it is the white one the claw drops. aria-label keeps the real word. -->
  <text class="wordmark" x="0" y="112" textLength="900" lengthAdjust="spacingAndGlyphs" font-size="112">Powered by Strıfe</text>

  <!-- Dot over the "i" — dropped from above. -->
  <g class="unit unit--dot">
    <rect class="mark" x="-6" y="-6" width="12" height="12" rx="1.5" />
    <g class="claw claw--v">
      <line class="cable" x1="0" y1="-22" x2="0" y2="-2000" />
      <path class="arm arm--l" d="M0 -18 L-12 -7 L-9 5" />
      <path class="arm arm--r" d="M0 -18 L12 -7 L9 5" />
      <circle class="head" cx="0" cy="-22" r="6.5" />
    </g>
  </g>

  <!-- Period after the word — brought in from the right. -->
  <g class="unit unit--period">
    <rect class="mark" x="-5.5" y="-5.5" width="11" height="11" rx="1.5" />
    <g class="claw claw--h">
      <line class="cable" x1="22" y1="0" x2="2000" y2="0" />
      <path class="arm arm--t" d="M18 0 L7 -12 L-5 -9" />
      <path class="arm arm--b" d="M18 0 L7 12 L-5 9" />
      <circle class="head" cx="22" cy="0" r="6.5" />
    </g>
  </g>
</svg>

<style>
  .wordmark-svg {
    /* Grip points (viewBox units), tuned to the default system font.
       --dot-x is the measured centre of the "i"; --period-x sits just past the
       end of the word (≈ measured word width of 900). */
    --dot-x: 789;
    --dot-y: 44;
    --period-x: 914;
    --period-y: 106;

    display: block;
    inline-size: min(100%, 38rem);
    block-size: auto;
    overflow: visible;
    color: var(--ink);
    --cable: color-mix(in oklab, var(--ink), transparent 55%);
    --claw: var(--ink-muted);
    --head: var(--accent);
  }

  .wordmark {
    fill: currentColor;
    font-family: var(--font-body);
    font-weight: 600;
    letter-spacing: 0.005em;
  }

  /* Position each unit at its grip point; the children are authored around (0,0). */
  .unit--dot {
    transform: translate(calc(var(--dot-x) * 1px), calc(var(--dot-y) * 1px));
  }
  .unit--period {
    transform: translate(calc(var(--period-x) * 1px), calc(var(--period-y) * 1px));
  }

  /* The deposited marks are white and only appear as the claw lets go. */
  .mark {
    fill: var(--ink);
    transform-box: fill-box;
    transform-origin: center;
  }

  .cable {
    stroke: var(--cable);
    stroke-width: 5;
  }
  .arm {
    stroke: var(--claw);
    stroke-width: 5;
    stroke-linecap: round;
    fill: none;
    transform-box: fill-box;
  }
  .head {
    fill: var(--head);
    stroke: var(--head);
    stroke-width: 5;
  }

  /* Arm pivots (a corner of each arm's own box) so "let go" swings them open. */
  .arm--l {
    transform-origin: 100% 0;
  }
  .arm--r {
    transform-origin: 0 0;
  }
  .arm--t {
    transform-origin: 100% 100%;
  }
  .arm--b {
    transform-origin: 100% 0;
  }

  /* ---- Animation ---------------------------------------------------------- */
  @media (prefers-reduced-motion: no-preference) {
    .claw {
      transform-box: fill-box;
      animation: pbs-claw var(--speed) var(--delay) ease-in-out both;
    }
    .mark {
      animation: pbs-deposit var(--speed) var(--delay) ease-out both;
    }
    .arm--l {
      animation: pbs-let-go var(--speed) var(--delay) ease-out both;
      --open: -24deg;
    }
    .arm--r {
      animation: pbs-let-go var(--speed) var(--delay) ease-out both;
      --open: 24deg;
    }
    .arm--t {
      animation: pbs-let-go var(--speed) var(--delay) ease-out both;
      --open: 24deg;
    }
    .arm--b {
      animation: pbs-let-go var(--speed) var(--delay) ease-out both;
      --open: -24deg;
    }

    .unit--dot {
      --delay: 0.55s;
      --speed: 1.9s;
      --y: -150vmax;
    }
    .unit--period {
      --delay: 1.1s;
      --speed: 1.9s;
      --x: 150vmax;
    }
  }

  /* Claw flies in, holds while it deposits, then retracts the way it came. */
  @keyframes pbs-claw {
    0% {
      transform: translate(var(--x, 0), var(--y, 0));
    }
    38%,
    56% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(var(--x, 0), var(--y, 0));
    }
  }
  /* Mark stays invisible until the claw opens, then pops into place. */
  @keyframes pbs-deposit {
    0%,
    52% {
      opacity: 0;
      scale: 0.4;
    }
    64%,
    100% {
      opacity: 1;
      scale: 1;
    }
  }
  /* Arms stay shut through the descent, then spring open as the claw releases. */
  @keyframes pbs-let-go {
    0%,
    50% {
      rotate: 0deg;
    }
    62%,
    100% {
      rotate: var(--open);
    }
  }

  /* Reduced motion: no fly-in. Hide the claws, show the marks already placed. */
  @media (prefers-reduced-motion: reduce) {
    .claw {
      display: none;
    }
  }
</style>
