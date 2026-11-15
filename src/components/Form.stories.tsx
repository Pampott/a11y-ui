import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from './Button';
import { Checkbox } from './Checkbox';
import { ErrorSummary, type ErrorSummaryItem } from './ErrorSummary';
import { Fieldset } from './Fieldset';
import { Input } from './Input';
import { RadioGroup } from './RadioGroup';
import { Select } from './Select';

const meta: Meta = {
  title: 'Components/Form',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Form building blocks for a checkout: `Fieldset`, `RadioGroup`, `Checkbox`, `Select` and `ErrorSummary`. All of them are native controls with a linked label; hints and errors are linked with aria-describedby and errors are announced with role="alert".',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const shippingOptions = [
  { value: 'standard', label: 'Standard', hint: '3 to 5 working days, free' },
  { value: 'express', label: 'Express', hint: 'Next working day, €9' },
  { value: 'pickup', label: 'Pick-up point', hint: '2 to 4 working days, €3' },
];

const countries = [
  { value: 'fr', label: 'France' },
  { value: 'be', label: 'Belgium' },
  { value: 'ch', label: 'Switzerland' },
];

export const Radios: Story = {
  name: 'RadioGroup',
  render: () => (
    <RadioGroup legend="Delivery method" name="delivery" options={shippingOptions} defaultValue="standard" />
  ),
};

export const RadiosWithError: Story = {
  name: 'RadioGroup with error',
  render: () => (
    <RadioGroup
      legend="Delivery method"
      name="delivery-error"
      options={shippingOptions}
      required
      error="Choose a delivery method."
    />
  ),
};

export const SingleCheckbox: Story = {
  name: 'Checkbox',
  render: () => (
    <Checkbox label="Send me the newsletter" hint="One email a month. Unsubscribe at any time." />
  ),
};

export const CheckboxGroup: Story = {
  name: 'Checkboxes in a Fieldset',
  render: () => (
    <Fieldset legend="Contact me by" hint="Select all that apply.">
      <Checkbox label="Email" name="contact" value="email" defaultChecked />
      <Checkbox label="Text message" name="contact" value="sms" />
      <Checkbox label="Phone call" name="contact" value="phone" />
    </Fieldset>
  ),
};

export const NativeSelect: Story = {
  name: 'Select',
  render: () => (
    <Select label="Country" options={countries} placeholder="Choose a country" name="country" />
  ),
};

function CheckoutForm() {
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [delivery, setDelivery] = useState<string>();
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<ErrorSummaryItem[]>([]);
  const [done, setDone] = useState(false);

  const messageFor = (fieldId: string) =>
    errors.find((error) => error.fieldId === fieldId)?.message;

  return (
    <form
      noValidate
      className="mx-auto flex max-w-md flex-col gap-5"
      onSubmit={(event) => {
        event.preventDefault();
        const next: ErrorSummaryItem[] = [];
        if (!/^\S+@\S+\.\S+$/.test(email)) {
          next.push({
            fieldId: 'checkout-email',
            message: 'Enter an email address in the format name@example.com.',
          });
        }
        if (!country) next.push({ fieldId: 'checkout-country', message: 'Choose a country.' });
        if (!delivery) {
          next.push({ fieldId: 'checkout-delivery', message: 'Choose a delivery method.' });
        }
        if (!terms) {
          next.push({ fieldId: 'checkout-terms', message: 'Accept the terms of sale to continue.' });
        }
        setErrors(next);
        setDone(next.length === 0);
      }}
    >
      <ErrorSummary errors={errors} />
      <Input
        id="checkout-email"
        label="Email address"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        error={messageFor('checkout-email')}
      />
      <Select
        id="checkout-country"
        label="Country"
        options={countries}
        placeholder="Choose a country"
        autoComplete="country"
        required
        value={country}
        onChange={(event) => setCountry(event.target.value)}
        error={messageFor('checkout-country')}
      />
      <RadioGroup
        id="checkout-delivery"
        legend="Delivery method"
        name="checkout-delivery"
        options={shippingOptions}
        required
        value={delivery}
        onChange={setDelivery}
        error={messageFor('checkout-delivery')}
      />
      <Checkbox
        id="checkout-terms"
        label="I accept the terms of sale"
        required
        checked={terms}
        onChange={(event) => setTerms(event.target.checked)}
        error={messageFor('checkout-terms')}
      />
      <Button type="submit">Continue to payment</Button>
      <p role="status" className="text-base text-gray-900">
        {done ? 'Details saved. You can continue to payment.' : ''}
      </p>
    </form>
  );
}

export const CheckoutWithErrorSummary: Story = {
  name: 'Checkout form with ErrorSummary',
  parameters: {
    docs: {
      description: {
        story:
          'Submit the form empty: focus moves to the summary, which lists every problem as a link to its field. Each field also shows its own message.',
      },
    },
  },
  render: () => <CheckoutForm />,
};
