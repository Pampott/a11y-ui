import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Status badge. Every tone pairs text and background to meet WCAG 1.4.3 contrast (>= 4.5:1). Colour is never the only signal — the label always carries the meaning.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const AllTones: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge tone="neutral">Neutral</Badge>
      <Badge tone="brand">Active</Badge>
      <Badge tone="success">Completed</Badge>
      <Badge tone="danger">Failed</Badge>
      <Badge tone="warning">Pending</Badge>
    </div>
  ),
};
