import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Accessible tabs following the WAI-ARIA APG pattern with automatic activation. Roving tabindex keeps a single tab in the page tab order, Left/Right/Home/End move and activate, and the active-tab indicator slides while the panel fades in — both disabled under prefers-reduced-motion.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Tabs>;

const tabs = [
  {
    id: 'overview',
    label: 'Overview',
    content: 'A high-level summary of the project, its goals and current status.',
  },
  {
    id: 'specs',
    label: 'Specifications',
    content: 'Technical details: dimensions, materials, and compatibility notes.',
  },
  {
    id: 'reviews',
    label: 'Reviews',
    content: 'What customers think — ratings, highlights and common feedback.',
  },
];

export const Default: Story = {
  args: {
    label: 'Product information',
    tabs,
  },
};

export const SecondTabSelected: Story = {
  args: {
    label: 'Product information',
    tabs,
    defaultSelected: 'specs',
  },
};
