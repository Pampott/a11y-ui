import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: {
    label: 'Describe the problem',
    hint: 'Say what happens and what you expected. 2,000 characters maximum.',
    maxLength: 2000,
  },
};
export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};
export const Required: Story = { args: { required: true } };
export const WithError: Story = {
  args: { required: true, error: 'Describe the problem in at least 20 characters.' },
};
