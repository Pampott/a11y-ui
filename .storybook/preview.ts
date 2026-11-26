import type { Preview } from '@storybook/react';
// @ts-ignore: side-effect import of CSS without type declarations
import '../src/styles/globals.css';
// @ts-ignore: plain JS module with a .d.ts next to it
import { themeNames } from '../themes.js';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { config: { rules: [] } },
    options: {
      storySort: { order: ['Introduction', 'Patterns', 'Remediation', 'Components'] },
    },
  },
  // Theme switcher in the toolbar: sets data-theme on <html>, as an app would.
  globalTypes: {
    theme: {
      description: 'Theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: themeNames,
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'default' },
  decorators: [
    (Story, context) => {
      document.documentElement.dataset.theme = context.globals.theme ?? 'default';
      return Story();
    },
  ],
};
export default preview;
