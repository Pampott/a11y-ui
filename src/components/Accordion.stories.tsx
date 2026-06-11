import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Accessible accordion following the WAI-ARIA APG pattern. Triggers are real buttons inside headings, aria-expanded/aria-controls link to a labelled region, and Up/Down/Home/End move focus between headers. The expand animation uses grid-template-rows 0fr→1fr and is automatically disabled under prefers-reduced-motion.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Accordion>;

const faq: { id: string; title: string; content: string }[] = [
  {
    id: 'shipping',
    title: 'How long does shipping take?',
    content:
      'Orders ship within 2 business days. Delivery then takes 3–5 days in mainland France and 5–10 days elsewhere in the EU.',
  },
  {
    id: 'returns',
    title: 'What is your return policy?',
    content:
      'You can return any unused item within 30 days for a full refund. Return shipping is free for orders over €50.',
  },
  {
    id: 'support',
    title: 'How do I contact support?',
    content:
      'Email support@example.com or use the live chat in the bottom-right corner — we reply within one business day.',
  },
];

export const Default: Story = {
  args: {
    items: faq,
    type: 'single',
    defaultOpen: ['shipping'],
  },
};

export const MultipleOpen: Story = {
  args: {
    items: faq,
    type: 'multiple',
    defaultOpen: ['shipping', 'returns'],
  },
};
