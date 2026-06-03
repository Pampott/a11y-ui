import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from './Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Accessible tooltip. Appears on hover AND keyboard focus (WCAG 1.4.13), is linked via aria-describedby, and is dismissible with Escape.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <Tooltip content="Saves your changes immediately">
      <Button>Save</Button>
    </Tooltip>
  ),
};
