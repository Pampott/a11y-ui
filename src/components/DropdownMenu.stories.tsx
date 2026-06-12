import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu } from './DropdownMenu';
import { Button } from './Button';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Dropdown menu composed on Radix UI primitives. Unlike the rest of this library (hand-built to demonstrate the ARIA patterns), a menu is deliberately delegated to a battle-tested headless primitive — roving focus, type-ahead, collision-aware positioning and focus return are hard to get right by hand. This component adds the design-system layer: tokens, styling, animation and axe coverage.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  render: () => (
    <DropdownMenu
      trigger={<Button variant="secondary">Actions</Button>}
      items={[
        { id: 'edit', label: 'Edit', onSelect: () => {} },
        { id: 'duplicate', label: 'Duplicate', onSelect: () => {} },
        { id: 'archive', label: 'Archive', onSelect: () => {}, disabled: true },
        {
          id: 'delete',
          label: 'Delete',
          tone: 'danger',
          separatorBefore: true,
          onSelect: () => {},
        },
      ]}
    />
  ),
};
