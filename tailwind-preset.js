import plugin from 'tailwindcss/plugin';

/**
 * Tailwind preset of the design system: the design tokens (colour, radius,
 * focus ring, motion) and the global reduced-motion guard.
 *
 * It is the single source of truth for the tokens. This repository's own
 * tailwind.config.js uses it, and so does any application that consumes the
 * library, so the two can never drift apart:
 *
 *   import a11yUi from 'a11y-ui/tailwind-preset';
 *
 *   export default {
 *     presets: [a11yUi],
 *     content: ['./src/**\/*.{ts,tsx}', './node_modules/a11y-ui/dist/**\/*.js'],
 *   };
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#A8431F',
          hover: '#8A3618',
          subtle: '#F8E7DF',
        },
        danger: {
          DEFAULT: '#B3261E',
          subtle: '#F7DAD4',
        },
        success: {
          DEFAULT: '#2C6347',
          subtle: '#D9EBE0',
        },
        warning: {
          DEFAULT: '#8A5A00',
          subtle: '#F8E6CA',
        },
      },
      borderRadius: {
        token: '0.5rem',
      },
      ringWidth: {
        focus: '3px',
      },
      // Motion tokens: shared vocabulary so every component animates with the
      // same rhythm. Mirrored in src/styles/motion.ts for use from JS.
      transitionDuration: {
        fast: '120ms',
        base: '200ms',
        slow: '320ms',
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(0.2, 0, 0, 1)',
        emphasized: 'cubic-bezier(0.3, 0, 0.2, 1)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'toast-in': {
          from: { opacity: '0', transform: 'translateX(1rem)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'toast-out': {
          from: { opacity: '1', transform: 'translateX(0)' },
          to: { opacity: '0', transform: 'translateX(1rem)' },
        },
        'menu-in': {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'menu-out': {
          from: { opacity: '1', transform: 'scale(1)' },
          to: { opacity: '0', transform: 'scale(0.96)' },
        },
      },
      animation: {
        // All neutralised by the reduced-motion guard below.
        'fade-in': 'fade-in 200ms cubic-bezier(0.2, 0, 0, 1)',
        'toast-in': 'toast-in 200ms cubic-bezier(0.2, 0, 0, 1)',
        'toast-out': 'toast-out 180ms cubic-bezier(0.3, 0, 0.2, 1) forwards',
        'menu-in': 'menu-in 120ms cubic-bezier(0.2, 0, 0, 1)',
        'menu-out': 'menu-out 100ms cubic-bezier(0.3, 0, 0.2, 1) forwards',
      },
    },
  },
  plugins: [
    /*
     * Global reduced-motion guard.
     *
     * Honours the operating-system "reduce motion" setting for everyone, so
     * individual components can animate freely without each re-checking the
     * preference. It does not remove motion entirely: it collapses durations
     * to a near-zero value so state still changes instantly without a
     * distracting transition, and disables smooth scrolling. (WCAG 2.3.3
     * Animation from Interactions.)
     *
     * It lives in the preset, not in a stylesheet, so an application that
     * consumes the library gets it without having to remember to import it.
     */
    plugin(({ addBase }) => {
      addBase({
        '@media (prefers-reduced-motion: reduce)': {
          '*, *::before, *::after': {
            'animation-duration': '0.01ms !important',
            'animation-iteration-count': '1 !important',
            'transition-duration': '0.01ms !important',
            'scroll-behavior': 'auto !important',
          },
        },
      });
    }),
  ],
};
