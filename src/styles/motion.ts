/**
 * Motion design tokens.
 *
 * The single source of truth for animation timing across the design system.
 * These mirror the `transitionDuration` / `transitionTimingFunction` keys in
 * tailwind.config.js so the same values are available whether you animate via
 * Tailwind classes (`duration-base ease-standard`) or inline styles / JS.
 *
 * The global reduced-motion guard in styles/globals.css neutralises these for
 * users who request reduced motion — components do not need to re-check.
 */
export const duration = {
  fast: 120,
  base: 200,
  slow: 320,
} as const;

export const easing = {
  /** Default entrance/exit — decelerates into place. */
  standard: 'cubic-bezier(0.2, 0, 0, 1)',
  /** For larger, more expressive moves. */
  emphasized: 'cubic-bezier(0.3, 0, 0.2, 1)',
} as const;

export type DurationToken = keyof typeof duration;
export type EasingToken = keyof typeof easing;
