import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Accessible on/off switch following the WAI-ARIA Switch pattern: role="switch" with aria-checked, a real button so Space/Enter toggle it, and the label as part of the click target. The sliding thumb is disabled under prefers-reduced-motion.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: () => {
    const [on, setOn] = useState(true);
    return <Switch label="Email notifications" checked={on} onChange={setOn} />;
  },
};

export const Uncontrolled: Story = {
  args: {
    label: 'Dark mode',
    defaultChecked: false,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Beta features (unavailable)',
    disabled: true,
  },
};
