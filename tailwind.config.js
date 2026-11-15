import preset from './tailwind-preset.js';

/** @type {import('tailwindcss').Config} */
export default {
  // Tokens and the reduced-motion guard live in the preset, which is also what
  // consuming applications import. Nothing is redefined here.
  presets: [preset],
  content: ['./src/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
};
