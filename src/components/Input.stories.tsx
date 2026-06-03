import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Accessible text input. The label is always rendered and linked via htmlFor/id (WCAG 1.3.1, 4.1.2). Hints and errors are linked with aria-describedby; errors set aria-invalid and are announced via role="alert".',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = { args: { label: 'Email address', type: 'email', placeholder: 'you@example.com' } };
export const WithHint: Story = { args: { label: 'Password', type: 'password', hint: 'At least 12 characters.' } };
export const WithError: Story = {
  args: { label: 'Email address', type: 'email', error: 'Please enter a valid email address.', defaultValue: 'not-an-email' },
};
export const Required: Story = { args: { label: 'Full name', required: true } };
