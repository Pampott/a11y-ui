import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Combobox } from './Combobox';

const meta: Meta<typeof Combobox> = {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Accessible autocomplete following the WAI-ARIA combobox pattern. Full keyboard support (arrows, Enter, Escape, Home/End), aria-activedescendant so typing keeps working while navigating, and aria-selected on options.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Combobox>;

const countries = [
  { value: 'fr', label: 'France' },
  { value: 'be', label: 'Belgique' },
  { value: 'ch', label: 'Suisse' },
  { value: 'ca', label: 'Canada' },
  { value: 'lu', label: 'Luxembourg' },
  { value: 'sn', label: 'Sénégal' },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ minHeight: 320 }}>
        <Combobox
          label="Country"
          options={countries}
          value={value}
          onChange={setValue}
          placeholder="Start typing…"
          hint="Use the arrow keys to navigate, Enter to select."
        />
      </div>
    );
  },
};
