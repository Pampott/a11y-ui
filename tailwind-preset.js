import plugin from 'tailwindcss/plugin';
import { colorThemes, themeNames, themeVariables } from './themes.js';

/**
 * Tailwind preset of the design system: the design tokens (colour, type,
 * radius, shadow, focus ring, motion), the themes and the global
 * reduced-motion guard.
 *
 * Every token is a CSS variable. The preset writes the default theme on
 * `:root` and every other theme on `[data-theme='<name>']` (see themes.js),
 * so an application changes the whole look with one attribute and redefines
 * nothing:
 *
 *   import a11yUi from 'a11y-ui/tailwind-preset';
 *
 *   export default {
 *     presets: [a11yUi],
 *     content: ['./src/**\/*.{ts,tsx}', './node_modules/a11y-ui/dist/**\/*.js'],
 *   };
 *
 *   <html lang="fr" data-theme="clairoki">
 *
 * @type {import('tailwindcss').Config}
 */

const color = (token) => `rgb(var(--a11y-${token}) / <alpha-value>)`;

// Tokens named `<group>-<shade>` become nested Tailwind colours
// (`brand-hover` -> `bg-brand-hover`), the others stay flat (`text-ink`).
const nested = ['brand', 'action', 'surface', 'line', 'gray', 'danger', 'success', 'warning'];
const colors = {};
for (const token of Object.keys(colorThemes.default)) {
  const [group, ...rest] = token.split('-');
  if (nested.includes(group)) {
    colors[group] ??= {};
    colors[group][rest.length ? rest.join('-') : 'DEFAULT'] = color(token);
  } else {
    colors[token] = color(token);
  }
}

const themeSelectors = Object.fromEntries(
  themeNames.map((name) => [
    name === 'default' ? ":root, [data-theme='default']" : `[data-theme='${name}']`,
    themeVariables(name),
  ])
);

export default {
  theme: {
    extend: {
      colors,
      fontFamily: {
        sans: 'var(--a11y-font-sans)',
        display: 'var(--a11y-font-display)',
      },
      fontWeight: {
        action: 'var(--a11y-weight-action)',
        heading: 'var(--a11y-weight-heading)',
      },
      // Fluid sizes for headings; the body scale stays Tailwind's.
      fontSize: {
        display: ['clamp(2.65rem, 5vw, 4.65rem)', { lineHeight: '1.04', letterSpacing: '-0.02em' }],
        title: ['clamp(2.1rem, 3.9vw, 3.65rem)', { lineHeight: '1.08', letterSpacing: '-0.015em' }],
        section: ['clamp(1.75rem, 3vw, 2.75rem)', { lineHeight: '1.12', letterSpacing: '-0.01em' }],
      },
      borderRadius: {
        token: 'var(--a11y-radius-control)',
        card: 'var(--a11y-radius-card)',
      },
      boxShadow: {
        card: 'var(--a11y-shadow-card)',
        raised: 'var(--a11y-shadow-raised)',
      },
      maxWidth: {
        prose: '62rem',
        page: '74rem',
        wide: '84rem',
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
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'rise-in': {
          from: { opacity: '0', transform: 'translateY(0.75rem)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'pop-in': {
          from: { opacity: '0', transform: 'scale(0.6)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-0.4rem)' },
        },
        sweep: {
          from: { transform: 'translateY(-100%)' },
          to: { transform: 'translateY(400%)' },
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
        'rise-in': 'rise-in 320ms cubic-bezier(0.2, 0, 0, 1) both',
        'pop-in': 'pop-in 200ms cubic-bezier(0.3, 0, 0.2, 1) both',
        bob: 'bob 3.2s ease-in-out infinite',
        sweep: 'sweep 1.8s cubic-bezier(0.3, 0, 0.2, 1) infinite',
        'toast-in': 'toast-in 200ms cubic-bezier(0.2, 0, 0, 1)',
        'toast-out': 'toast-out 180ms cubic-bezier(0.3, 0, 0.2, 1) forwards',
        'menu-in': 'menu-in 120ms cubic-bezier(0.2, 0, 0, 1)',
        'menu-out': 'menu-out 100ms cubic-bezier(0.3, 0, 0.2, 1) forwards',
      },
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      // The themes, and a page that follows the theme without extra classes.
      addBase(themeSelectors);
      addBase({
        body: {
          backgroundColor: 'rgb(var(--a11y-canvas))',
          color: 'rgb(var(--a11y-ink))',
          fontFamily: 'var(--a11y-font-sans)',
        },
      });
      /*
       * Global reduced-motion guard.
       *
       * Honours the operating-system "reduce motion" setting for everyone, so
       * individual components can animate freely without each re-checking the
       * preference. It collapses durations to a near-zero value so state still
       * changes instantly, stops infinite loops after one run, and disables
       * smooth scrolling. (WCAG 2.3.3 Animation from Interactions.)
       */
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
