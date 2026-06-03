import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Accessible button. Always renders a real `<button>`, has a visible focus ring (WCAG 2.4.7), and requires an `iconOnlyLabel` when it contains only an icon so it is never announced as just "button".',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { children: 'Save changes', variant: 'primary' } };
export const Secondary: Story = { args: { children: 'Cancel', variant: 'secondary' } };
export const Ghost: Story = { args: { children: 'Learn more', variant: 'ghost' } };
export const Danger: Story = { args: { children: 'Delete', variant: 'danger' } };
export const Disabled: Story = { args: { children: 'Unavailable', disabled: true } };

export const IconOnly: Story = {
  args: { iconOnlyLabel: 'Close dialog', children: '✕' },
  parameters: {
    docs: {
      description: {
        story:
          'Icon-only buttons MUST pass `iconOnlyLabel`. It becomes the aria-label so screen-reader users hear "Close dialog", not "button".',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
