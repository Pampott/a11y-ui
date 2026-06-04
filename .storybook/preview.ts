import type { Preview } from '@storybook/react';
// @ts-ignore: side-effect import of CSS without type declarations
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { config: { rules: [] } },
  },
};
export default preview;
