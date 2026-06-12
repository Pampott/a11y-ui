import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, useToast } from './Toast';
import { Button } from './Button';

const meta: Meta<typeof ToastProvider> = {
  title: 'Components/Toast',
  component: ToastProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Accessible toast notifications. Each toast is a live region — role="status" (polite) for info/success, role="alert" (assertive) for danger — so it is announced without stealing focus. The auto-dismiss timer pauses on hover and keyboard focus (WCAG 2.2.1), and the slide+fade enter/exit is disabled under prefers-reduced-motion. Wrap your app in <ToastProvider> and call useToast().',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ToastProvider>;

function Demo() {
  const { toast } = useToast();
  return (
    <div className="flex gap-2">
      <Button onClick={() => toast({ title: 'Changes saved', description: 'Your profile is up to date.', tone: 'success' })}>
        Success
      </Button>
      <Button variant="secondary" onClick={() => toast({ title: 'New message', description: 'You have 1 unread message.' })}>
        Info
      </Button>
      <Button variant="danger" onClick={() => toast({ title: 'Upload failed', description: 'Check your connection and retry.', tone: 'danger' })}>
        Error
      </Button>
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  ),
};
