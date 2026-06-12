/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
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
      // Motion tokens — shared vocabulary so every component animates with the
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
        // All neutralised by the global prefers-reduced-motion guard.
        'fade-in': 'fade-in 200ms cubic-bezier(0.2, 0, 0, 1)',
        'toast-in': 'toast-in 200ms cubic-bezier(0.2, 0, 0, 1)',
        'toast-out': 'toast-out 180ms cubic-bezier(0.3, 0, 0.2, 1) forwards',
        'menu-in': 'menu-in 120ms cubic-bezier(0.2, 0, 0, 1)',
        'menu-out': 'menu-out 100ms cubic-bezier(0.3, 0, 0.2, 1) forwards',
      },
    },
  },
  plugins: [],
}
