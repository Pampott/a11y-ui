import { addons } from 'storybook/internal/manager-api';
import { create } from 'storybook/internal/theming/create';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'a11y-ui · accessible React components',
    brandUrl: 'https://github.com/Pampott/a11y-ui',
    brandTarget: '_blank',
    colorPrimary: '#A8431F',
    colorSecondary: '#A8431F',
    fontBase: 'ui-sans-serif, system-ui, sans-serif',
  }),
});
