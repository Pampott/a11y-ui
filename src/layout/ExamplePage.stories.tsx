import type { Meta, StoryObj } from '@storybook/react';
import { Page } from './ExamplePage';

const meta: Meta<typeof Page> = {
  title: 'Patterns/Example page',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A whole page composed only of design-system components, with no CSS of its own. Switch the theme in the toolbar: nothing in the page changes but the `data-theme` attribute.',
      },
    },
  },
};
export default meta;

export const Default: StoryObj<typeof Page> = {};
