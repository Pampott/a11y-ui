/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Design tokens — semantic naming
        brand: {
          DEFAULT: '#1f4e5f',
          hover: '#163a47',
          subtle: '#e6eef0',
        },
        danger: {
          DEFAULT: '#b3261e',
          subtle: '#fce8e6',
        },
        success: {
          DEFAULT: '#1e6b43',
          subtle: '#e6f2eb',
        },
        warning: {
          DEFAULT: '#8a5a00',
          subtle: '#fdf0d5',
        },
      },
      borderRadius: {
        token: '0.5rem',
      },
      ringWidth: {
        focus: '3px',
      },
    },
  },
  plugins: [],
}
