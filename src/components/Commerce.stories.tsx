import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from './Carousel';
import { QuantityStepper } from './QuantityStepper';
import { Steps } from './Steps';

const meta: Meta = {
  title: 'Components/Commerce',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Patterns found on almost every shop: `QuantityStepper` for the cart, `Steps` for the checkout progress, and `Carousel` for product highlights.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Quantity: Story = {
  name: 'QuantityStepper',
  render: () => <QuantityStepper itemName="Linen shirt" defaultValue={2} max={5} />,
};

const checkoutSteps = [
  { id: 'cart', label: 'Cart', href: '#cart' },
  { id: 'delivery', label: 'Delivery', href: '#delivery' },
  { id: 'payment', label: 'Payment', href: '#payment' },
  { id: 'confirmation', label: 'Confirmation' },
];

export const CheckoutSteps: Story = {
  name: 'Steps',
  render: () => <Steps label="Checkout progress" steps={checkoutSteps} current="payment" />,
};

function ProductCard({ name, price }: { name: string; price: string }) {
  return (
    <div className="flex h-40 flex-col items-center justify-center gap-1 rounded-token border border-gray-400 bg-brand-subtle">
      <p className="text-lg font-semibold text-gray-900">{name}</p>
      <p className="text-base text-gray-700">{price}</p>
    </div>
  );
}

const slides = [
  { id: 'shirt', label: 'Linen shirt', content: <ProductCard name="Linen shirt" price="€49" /> },
  { id: 'scarf', label: 'Wool scarf', content: <ProductCard name="Wool scarf" price="€35" /> },
  { id: 'bag', label: 'Canvas bag', content: <ProductCard name="Canvas bag" price="€22" /> },
];

export const ManualCarousel: Story = {
  name: 'Carousel',
  render: () => (
    <div className="mx-auto max-w-md">
      <Carousel label="Featured products" slides={slides} />
    </div>
  ),
};

export const RotatingCarousel: Story = {
  name: 'Carousel with rotation',
  parameters: {
    docs: {
      description: {
        story:
          'Rotation pauses while the pointer or keyboard focus is inside the carousel, stops for good after Previous or Next, and never starts when the system asks for reduced motion.',
      },
    },
  },
  render: () => (
    <div className="mx-auto max-w-md">
      <Carousel label="Featured products" slides={slides} autoPlayInterval={4000} />
    </div>
  ),
};
