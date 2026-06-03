import type { Meta, StoryObj } from '@storybook/react';
import { SkipLink } from './SkipLink';

const meta: Meta<typeof SkipLink> = {
  title: 'Components/SkipLink',
  component: SkipLink,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Skip link (WCAG 2.4.1 — bypass blocks). Visually hidden until focused. Press Tab when this story is focused to reveal it. Must be the first focusable element on the page.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof SkipLink>;

export const Default: Story = {
  render: () => (
    <div>
      <SkipLink targetId="main-content" />
      <p className="text-sm text-gray-600">Press Tab to reveal the skip link at the top.</p>
      <main id="main-content" tabIndex={-1} className="mt-4">
        <h1 className="text-xl font-semibold">Main content</h1>
      </main>
    </div>
  ),
};
