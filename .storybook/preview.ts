import type { Preview } from '@storybook/react';
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    // The a11y addon runs axe-core on every story automatically.
    a11y: { config: { rules: [] } },
  },
};
export default preview;
