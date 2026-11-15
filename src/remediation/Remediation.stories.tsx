import type { Meta, StoryObj } from '@storybook/react';
import { BeforeAfter } from './BeforeAfter';
import { EmailFieldBefore, EmailFieldAfter } from './EmailField';
import { RemoveButtonBefore, RemoveButtonAfter } from './RemoveButton';
import { CartDialogBefore, CartDialogAfter } from './CartDialog';
import { DeliveryChoiceBefore, DeliveryChoiceAfter } from './DeliveryChoice';
import { CartQuantityBefore, CartQuantityAfter } from './CartQuantity';

const meta: Meta<typeof BeforeAfter> = {
  title: 'Remediation/Before and after',
  component: BeforeAfter,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Five patterns as they are commonly found on e-commerce sites, next to their remediated version. The "before" panels are deliberately inaccessible: the Accessibility tab is expected to report them when a fault is machine-detectable. Several faults are not, which is why each example also ships with keyboard and accessible-name assertions in `remediation.test.tsx`.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof BeforeAfter>;

export const FormField: Story = {
  name: 'Form field with error',
  render: () => (
    <BeforeAfter
      title="Form field with error"
      context="Checkout email field. Submit it empty in both versions to compare."
      before={<EmailFieldBefore />}
      after={<EmailFieldAfter />}
      announcedBefore={
        'On submit: nothing. Back on the field: "Email star, edit text", with no mention of the error.'
      }
      announcedAfter={
        'On submit: "Enter an email address in the format name@example.com." Focus returns to the field: "Email address, required, invalid data, edit text", then the hint and the error.'
      }
      axeVerdict="0 violations on the “before” version. axe accepts a placeholder as an accessible name and cannot tell that the error is not linked to the field. A manual review is what finds it."
      findings={[
        {
          criterion: '3.3.2 Labels or Instructions',
          problem: 'The placeholder is the only label and disappears as soon as the user types.',
          fix: 'Visible <label> linked to the field with for / id.',
        },
        {
          criterion: '3.3.1 Error Identification',
          problem: 'The error is a red sentence that nothing links to the field, and it is not announced.',
          fix: 'aria-invalid, aria-describedby, role="alert", and focus moved back to the field.',
        },
        {
          criterion: '3.3.3 Error Suggestion',
          problem: '“Invalid email” does not say what a valid value looks like.',
          fix: 'The message gives the expected format.',
        },
        {
          criterion: '1.3.5 Identify Input Purpose',
          problem: 'type="text" with no autocomplete: browsers cannot fill the field.',
          fix: 'type="email" and autocomplete="email".',
        },
        {
          criterion: '2.4.7 Focus Visible',
          problem: 'The focus outline is removed with outline: none.',
          fix: '3 px focus ring from the design tokens.',
        },
      ]}
    />
  ),
};

export const IconButton: Story = {
  name: 'Icon-only button',
  render: () => (
    <BeforeAfter
      title="Icon-only button"
      context="“Remove from cart” button on a cart line."
      before={<RemoveButtonBefore itemName="Linen shirt" />}
      after={<RemoveButtonAfter itemName="Linen shirt" />}
      announcedBefore={'"Button." Nothing says what it does or which item it acts on.'}
      announcedAfter={'"Remove Linen shirt from cart, button."'}
      axeVerdict="1 violation on the “before” version (button-name, critical). This one is machine-detectable: a scan finds it, but only a person can write a label that names the right item."
      findings={[
        {
          criterion: '4.1.2 Name, Role, Value',
          problem: 'The button contains only an SVG: it has no accessible name.',
          fix: 'aria-label that names the action and the item, so repeated icons stay distinguishable.',
        },
        {
          criterion: '1.1.1 Non-text Content',
          problem: 'The icon carries the meaning but has no text alternative.',
          fix: 'The label carries the meaning; the icon is decorative (aria-hidden).',
        },
        {
          criterion: '2.5.8 Target Size (Minimum)',
          problem: 'The clickable area is 16 × 16 px, under the 24 px minimum.',
          fix: '40 px high button from the design system.',
        },
      ]}
    />
  ),
};

export const ModalDialog: Story = {
  name: 'Modal dialog',
  render: () => (
    <BeforeAfter
      title="Modal dialog"
      context="“Added to your cart” confirmation. Open each one and try Tab, then Escape. The “before” version can only be closed with a mouse."
      before={<CartDialogBefore />}
      after={<CartDialogAfter />}
      announcedBefore={
        'On open: nothing. Focus stays on “Add to cart”, behind the overlay; Tab walks through the page underneath.'
      }
      announcedAfter={
        '"Added to your cart, dialog." Focus lands on “Continue shopping”; Tab stays inside; Escape closes and returns to “Add to cart”.'
      }
      axeVerdict="0 violations on the “before” version. Focus management and keyboard operability are not machine-detectable; they are covered here by interaction tests."
      findings={[
        {
          criterion: '4.1.2 Name, Role, Value',
          problem: 'The overlay is a plain <div>: no dialog role, no name.',
          fix: 'role="dialog", aria-modal="true", aria-labelledby on the title.',
        },
        {
          criterion: '2.4.3 Focus Order',
          problem: 'Focus stays behind the overlay and is never returned.',
          fix: 'Focus moves into the dialog, is trapped while open, and returns to the trigger on close.',
        },
        {
          criterion: '2.1.1 Keyboard',
          problem: 'The close control is a <span> with a click handler, and Escape does nothing.',
          fix: 'Real buttons, plus Escape to close.',
        },
        {
          criterion: '1.3.1 Info and Relationships',
          problem: 'The title is a styled <div>, not a heading.',
          fix: 'Title exposed as an <h2>.',
        },
      ]}
    />
  ),
};

export const RadioChoice: Story = {
  name: 'Radio group',
  render: () => (
    <BeforeAfter
      title="Radio group"
      context="Delivery method in a checkout. Click the text of an option in each version."
      before={<DeliveryChoiceBefore />}
      after={<DeliveryChoiceAfter />}
      announcedBefore={
        '"Radio button, not checked, 1 of 2." No option name, and nothing says what the question is.'
      }
      announcedAfter={
        '"Delivery method, group. Standard, radio button, 1 of 2, 3 to 5 working days, free."'
      }
      axeVerdict="1 violation on the “before” version (label, critical): the radios have no name. axe does not report that the question is not linked to its options."
      findings={[
        {
          criterion: '1.3.1 Info and Relationships',
          problem: 'The question is a paragraph with no link to the options, and the option text is not a label.',
          fix: '<fieldset> with a <legend>, and a <label> for each radio.',
        },
        {
          criterion: '4.1.2 Name, Role, Value',
          problem: 'Each radio is announced without a name.',
          fix: 'The label names the radio; the delay and price are linked as its description.',
        },
        {
          criterion: '2.5.8 Target Size (Minimum)',
          problem: 'Only the 20 px circle is clickable: clicking the option text does nothing.',
          fix: 'The label text is part of the click target.',
        },
      ]}
    />
  ),
};

export const QuantityControl: Story = {
  name: 'Quantity stepper',
  render: () => (
    <BeforeAfter
      title="Quantity stepper"
      context="Quantity control on a cart line. Try to change the quantity with the keyboard only."
      before={<CartQuantityBefore />}
      after={<CartQuantityAfter />}
      announcedBefore={
        '"Edit text, 1." The minus and plus signs are skipped by the Tab key and announced as plain text.'
      }
      announcedAfter={
        '"Increase quantity of Linen shirt, button." After pressing it: "Quantity of Linen shirt: 2."'
      }
      axeVerdict="1 violation on the “before” version (label, critical): the field has no name. axe cannot see that the minus and plus signs are not buttons."
      findings={[
        {
          criterion: '2.1.1 Keyboard',
          problem: 'Minus and plus are <span>s with a click handler: the keyboard cannot reach them.',
          fix: 'Real <button>s.',
        },
        {
          criterion: '4.1.2 Name, Role, Value',
          problem: 'The controls have no role and no name; the field has no label.',
          fix: 'Buttons named after the action and the item; a visible label on the field.',
        },
        {
          criterion: '4.1.3 Status Messages',
          problem: 'The value changes silently when a button is pressed.',
          fix: 'A polite live region announces the new quantity and when a bound is reached.',
        },
        {
          criterion: '2.5.8 Target Size (Minimum)',
          problem: 'The targets are 24 px, the bare minimum, and the field loses its focus outline.',
          fix: '40 px buttons and a visible focus ring.',
        },
      ]}
    />
  ),
};
