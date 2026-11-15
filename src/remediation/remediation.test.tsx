import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { EmailFieldBefore, EmailFieldAfter } from './EmailField';
import { RemoveButtonBefore, RemoveButtonAfter } from './RemoveButton';
import { CartDialogBefore, CartDialogAfter } from './CartDialog';
import { DeliveryChoiceBefore, DeliveryChoiceAfter } from './DeliveryChoice';
import { CartQuantityBefore, CartQuantityAfter } from './CartQuantity';

/**
 * Remediation examples.
 *
 * Each pair is tested from both sides: the "before" version must exhibit the
 * fault (so the example stays honest), and the "after" version must not.
 * Where axe-core cannot see the fault, the assertion is about behaviour.
 */

async function violationIds(container: Element) {
  const results = await axe(container);
  return results.violations.map((violation) => violation.id);
}

describe('Form field with error', () => {
  it('before: axe reports nothing, yet the error is not linked to the field', async () => {
    const user = userEvent.setup();
    const { container } = render(<EmailFieldBefore />);

    await user.click(screen.getByRole('button', { name: 'Continue' }));

    expect(screen.getByText('Invalid email')).toBeInTheDocument();
    expect(await violationIds(container)).toEqual([]);

    const field = screen.getByRole('textbox');
    expect(container.querySelector('label')).toBeNull();
    expect(field).not.toHaveAttribute('aria-invalid');
    expect(field).not.toHaveAccessibleDescription();
    expect(screen.queryByRole('alert')).toBeNull();
    expect(field).not.toHaveFocus();
  });

  it('after: labelled, error announced and linked, focus returned to the field', async () => {
    const user = userEvent.setup();
    const { container } = render(<EmailFieldAfter />);

    await user.click(screen.getByRole('button', { name: 'Continue' }));

    const field = screen.getByRole('textbox', { name: /Email address/ });
    expect(field).toBeRequired();
    expect(field).toBeInvalid();
    expect(field).toHaveAccessibleDescription(/name@example\.com/);
    expect(screen.getByRole('alert')).toHaveTextContent('name@example.com');
    expect(field).toHaveFocus();
    expect(field).toHaveAttribute('autocomplete', 'email');
    expect(await violationIds(container)).toEqual([]);
  });

  it('after: the error clears once the value is valid', async () => {
    const user = userEvent.setup();
    render(<EmailFieldAfter />);

    await user.click(screen.getByRole('button', { name: 'Continue' }));
    await user.type(screen.getByRole('textbox'), 'name@example.com');
    await user.click(screen.getByRole('button', { name: 'Continue' }));

    expect(screen.queryByRole('alert')).toBeNull();
    expect(screen.getByRole('textbox')).not.toBeInvalid();
  });
});

describe('Icon-only button', () => {
  it('before: the button has no accessible name, and axe catches it', async () => {
    const { container } = render(<RemoveButtonBefore itemName="Linen shirt" />);

    expect(screen.getByRole('button')).not.toHaveAccessibleName();
    expect(await violationIds(container)).toEqual(['button-name']);
  });

  it('after: the name states the action and the item', async () => {
    const { container } = render(<RemoveButtonAfter itemName="Linen shirt" />);

    expect(screen.getByRole('button', { name: 'Remove Linen shirt from cart' })).toBeInTheDocument();
    expect(await violationIds(container)).toEqual([]);
  });
});

describe('Modal dialog', () => {
  it('before: axe reports nothing, yet there is no dialog and the keyboard cannot close it', async () => {
    const user = userEvent.setup();
    // The overlay renders inline, so scanning the container covers it.
    const { container } = render(<CartDialogBefore />);
    const trigger = screen.getByRole('button', { name: 'Add to cart' });

    await user.click(trigger);

    expect(screen.getByText('Added to your cart')).toBeInTheDocument();
    expect(await violationIds(container)).toEqual([]);
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.queryByRole('heading')).toBeNull();
    expect(trigger).toHaveFocus();

    await user.keyboard('{Escape}');
    expect(screen.getByText('Added to your cart')).toBeInTheDocument();
  });

  it('after: named dialog, focus moved in and trapped, Escape closes and restores focus', async () => {
    const user = userEvent.setup();
    const { baseElement } = render(<CartDialogAfter />);
    const trigger = screen.getByRole('button', { name: 'Add to cart' });

    await user.click(trigger);

    const dialog = screen.getByRole('dialog', { name: 'Added to your cart' });
    expect(screen.getByRole('heading', { name: 'Added to your cart' })).toBeInTheDocument();
    expect(await violationIds(baseElement)).toEqual([]);

    const keepShopping = screen.getByRole('button', { name: 'Continue shopping' });
    const checkout = screen.getByRole('link', { name: 'Go to checkout' });
    expect(keepShopping).toHaveFocus();

    await user.tab();
    expect(checkout).toHaveFocus();
    await user.tab();
    expect(keepShopping).toHaveFocus();
    expect(dialog).toContainElement(document.activeElement as HTMLElement);

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(trigger).toHaveFocus();
  });
});

describe('Radio group', () => {
  it('before: unnamed radios and no group', async () => {
    const { container } = render(<DeliveryChoiceBefore />);

    expect(await violationIds(container)).toEqual(['label']);
    expect(screen.queryByRole('group')).toBeNull();
    for (const radio of screen.getAllByRole('radio')) {
      expect(radio).not.toHaveAccessibleName();
      expect(radio).not.toHaveAccessibleDescription();
    }
  });

  it('after: named group, labelled options with their hint, label is a click target', async () => {
    const user = userEvent.setup();
    const { container } = render(<DeliveryChoiceAfter />);

    expect(screen.getByRole('group', { name: 'Delivery method' })).toBeInTheDocument();
    const standard = screen.getByRole('radio', { name: 'Standard' });
    expect(standard).toHaveAccessibleDescription('3 to 5 working days, free');

    await user.click(screen.getByText('Express'));
    expect(screen.getByRole('radio', { name: 'Express' })).toBeChecked();
    expect(await violationIds(container)).toEqual([]);
  });
});

describe('Quantity stepper', () => {
  it('before: no buttons, an unnamed field, and the keyboard cannot change the value', async () => {
    const user = userEvent.setup();
    const { container } = render(<CartQuantityBefore />);

    expect(await violationIds(container)).toEqual(['label']);
    expect(screen.queryAllByRole('button')).toHaveLength(0);
    expect(screen.queryByRole('status')).toBeNull();

    await user.tab();
    expect(screen.getByRole('textbox')).toHaveFocus();
    await user.tab();
    expect(document.body).toHaveFocus();
  });

  it('after: named buttons reachable with the keyboard, value announced', async () => {
    const user = userEvent.setup();
    const { container } = render(<CartQuantityAfter />);

    await user.tab();
    expect(screen.getByRole('button', { name: 'Decrease quantity of Linen shirt' })).toHaveFocus();
    await user.tab();
    await user.tab();
    const increase = screen.getByRole('button', { name: 'Increase quantity of Linen shirt' });
    expect(increase).toHaveFocus();

    await user.keyboard('{Enter}');
    expect(screen.getByRole('textbox', { name: 'Quantity of Linen shirt' })).toHaveValue('2');
    expect(screen.getByRole('status')).toHaveTextContent('Quantity of Linen shirt: 2.');
    expect(await violationIds(container)).toEqual([]);
  });
});
