import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Checkbox } from './Checkbox';
import { ErrorSummary } from './ErrorSummary';
import { Fieldset } from './Fieldset';
import { Input } from './Input';
import { RadioGroup } from './RadioGroup';
import { Select } from './Select';

const delivery = [
  { value: 'standard', label: 'Standard', hint: '3 to 5 working days' },
  { value: 'express', label: 'Express', hint: 'Next working day' },
];

describe('Fieldset', () => {
  it('names the group with its legend and links hint and error', () => {
    render(
      <Fieldset legend="Contact me by" hint="Select all that apply." error="Choose one." required>
        <Checkbox label="Email" />
      </Fieldset>
    );
    const group = screen.getByRole('group', { name: /Contact me by/ });
    expect(group).toHaveAccessibleName(/required/);
    expect(group).toHaveAccessibleDescription('Select all that apply. Choose one.');
    expect(screen.getByRole('alert')).toHaveTextContent('Choose one.');
  });
});

describe('Required label', () => {
  it('can be localised on a group and on a checkbox', () => {
    render(
      <>
        <Fieldset legend="Choisissez" required requiredLabel=" (obligatoire)">
          <Checkbox label="Option" />
        </Fieldset>
        <Checkbox label="J'accepte" required requiredLabel=" (obligatoire)" />
      </>
    );
    expect(screen.getByRole('group', { name: 'Choisissez (obligatoire)' })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: "J'accepte (obligatoire)" })).toBeInTheDocument();
    expect(screen.queryByText(/required/)).not.toBeInTheDocument();
  });
});

describe('RadioGroup', () => {
  it('exposes each option with its label and hint inside the named group', async () => {
    const { container } = render(
      <RadioGroup legend="Delivery method" name="delivery" options={delivery} />
    );
    expect(screen.getByRole('group', { name: 'Delivery method' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Express' })).toHaveAccessibleDescription(
      'Next working day'
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('selects with the mouse and moves with the arrow keys', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <RadioGroup legend="Delivery method" name="delivery" options={delivery} onChange={onChange} />
    );
    await user.click(screen.getByRole('radio', { name: 'Standard' }));
    expect(screen.getByRole('radio', { name: 'Standard' })).toBeChecked();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('radio', { name: 'Express' })).toBeChecked();
    expect(onChange).toHaveBeenLastCalledWith('express');
  });

  it('respects the controlled value', async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup legend="Delivery method" name="delivery" options={delivery} value="standard" />
    );
    await user.click(screen.getByRole('radio', { name: 'Express' }));
    expect(screen.getByRole('radio', { name: 'Standard' })).toBeChecked();
  });

  it('gives the first radio the id passed to the group', () => {
    render(<RadioGroup id="delivery" legend="Delivery method" name="delivery" options={delivery} />);
    expect(screen.getByRole('radio', { name: 'Standard' })).toHaveAttribute('id', 'delivery');
  });
});

describe('Checkbox', () => {
  it('toggles with the Space key and exposes its state', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Send me the newsletter" />);
    const box = screen.getByRole('checkbox', { name: 'Send me the newsletter' });
    box.focus();
    await user.keyboard(' ');
    expect(box).toBeChecked();
  });

  it('marks an error as invalid, linked and announced, with no axe violation', async () => {
    const { container } = render(
      <Checkbox label="I accept the terms of sale" required error="Accept the terms to continue." />
    );
    const box = screen.getByRole('checkbox', { name: /I accept the terms of sale/ });
    expect(box).toBeRequired();
    expect(box).toBeInvalid();
    expect(box).toHaveAccessibleDescription('Accept the terms to continue.');
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe('Select', () => {
  const countries = [
    { value: 'fr', label: 'France' },
    { value: 'be', label: 'Belgium' },
  ];

  it('is labelled, selectable, and has no axe violation', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Select label="Country" options={countries} placeholder="Choose a country" />
    );
    const select = screen.getByRole('combobox', { name: 'Country' });
    await user.selectOptions(select, 'be');
    expect(select).toHaveValue('be');
    expect(await axe(container)).toHaveNoViolations();
  });

  it('links hint and error and marks the field invalid', () => {
    render(
      <Select label="Country" options={countries} hint="Where we deliver." error="Choose a country." />
    );
    const select = screen.getByRole('combobox', { name: 'Country' });
    expect(select).toBeInvalid();
    expect(select).toHaveAccessibleDescription('Where we deliver. Choose a country.');
  });
});

describe('ErrorSummary', () => {
  it('renders nothing without errors', () => {
    const { container } = render(<ErrorSummary errors={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('takes focus when errors appear and announces them', async () => {
    const { container, rerender } = render(<ErrorSummary errors={[]} />);
    rerender(
      <ErrorSummary errors={[{ fieldId: 'email', message: 'Enter an email address.' }]} />
    );
    const alert = screen.getByRole('alert', { name: 'There is a problem' });
    expect(alert.parentElement).toHaveFocus();
    expect(alert).toHaveTextContent('Enter an email address.');
    expect(await axe(container)).toHaveNoViolations();
  });

  it('moves focus to the field when its error link is followed', async () => {
    const user = userEvent.setup();
    render(
      <>
        <ErrorSummary errors={[{ fieldId: 'email', message: 'Enter an email address.' }]} />
        <Input id="email" label="Email address" />
      </>
    );
    await user.click(screen.getByRole('link', { name: 'Enter an email address.' }));
    expect(screen.getByRole('textbox', { name: 'Email address' })).toHaveFocus();
  });
});
