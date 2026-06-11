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
    },
  },
  plugins: [],
}
