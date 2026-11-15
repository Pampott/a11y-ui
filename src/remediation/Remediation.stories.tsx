import type { Meta, StoryObj } from '@storybook/react';
import { BeforeAfter } from './BeforeAfter';
import { EmailFieldBefore, EmailFieldAfter } from './EmailField';
import { RemoveButtonBefore, RemoveButtonAfter } from './RemoveButton';
import { CartDialogBefore, CartDialogAfter } from './CartDialog';

const meta: Meta<typeof BeforeAfter> = {
  title: 'Remediation/Before and after',
  component: BeforeAfter,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Three patterns as they are commonly found on e-commerce sites, next to their remediated version. The "before" panels are deliberately inaccessible: the Accessibility tab is expected to report them when a fault is machine-detectable. Two of the three are not, which is why each example also ships with keyboard and screen-reader assertions in `remediation.test.tsx`.',
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
