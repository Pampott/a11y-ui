# Accessibility decisions

This document explains the accessibility reasoning behind each component. It maps features to specific WCAG 2.2 success criteria, so a reviewer (or future maintainer) can understand *why* each choice was made.

---

## Button

- **Always a real `<button>`** — gets keyboard activation (Space/Enter) and screen-reader semantics for free. Never a styled `<div>`.
- **Visible focus ring** — a 3px ring on `:focus-visible`, satisfying **WCAG 2.4.7 (Focus Visible)**. The ring is never removed for aesthetics.
- **Icon-only buttons require a label** — the `iconOnlyLabel` prop becomes `aria-label`, so a close button is announced as "Close dialog", not "button". Addresses **4.1.2 (Name, Role, Value)**.
- **Disabled state** uses the native `disabled` attribute, which removes the button from the tab order and announces it correctly.

## Input

- **Label always rendered and linked** via `htmlFor`/`id` — **1.3.1 (Info and Relationships)** and **4.1.2**. Placeholders are never used as labels (they vanish on input and fail contrast).
- **Hints and errors linked with `aria-describedby`** so screen readers announce them with the field.
- **Errors set `aria-invalid` and use `role="alert"`** so the error is announced immediately when it appears — **3.3.1 (Error Identification)**.
- **Required fields use `aria-required`**, not just a visual asterisk.

## Modal

Follows the [WAI-ARIA Dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/):

- **Focus is trapped** inside the dialog while open — Tab and Shift+Tab cycle within it.
- **Focus moves in on open and returns to the trigger on close** — **2.4.3 (Focus Order)**.
- **Escape closes** the dialog — expected keyboard behaviour.
- **`role="dialog"` + `aria-modal="true"` + `aria-labelledby`** point to the title so the dialog is announced with its name.

## Tooltip

Follows the WAI-ARIA Tooltip pattern and **WCAG 1.4.13 (Content on Hover or Focus)**:

- **Appears on hover AND keyboard focus** — not hover-only, which excludes keyboard users.
- **Linked via `aria-describedby`** so the content is announced.
- **Dismissible with Escape** without moving the pointer.
- Uses a real `role="tooltip"` element in the DOM, not the `title` attribute (which is not keyboard-accessible and inconsistently announced).

## Badge

- **Every tone pairs foreground and background colours** chosen to meet **WCAG 1.4.3 (Contrast Minimum, ≥ 4.5:1)**.
- **Colour is never the only signal** — the text label always carries the meaning, satisfying **1.4.1 (Use of Color)**. A "Failed" badge says "Failed", not just red.

## SkipLink

- Implements **2.4.1 (Bypass Blocks)** — lets keyboard and screen-reader users skip repeated navigation.
- **Visually hidden until focused**, then appears at the top of the viewport.
- Must be the **first focusable element** in the DOM; the target (`<main id="…" tabIndex={-1}>`) receives focus cleanly.

## Combobox

The hardest pattern to get right. Follows the [WAI-ARIA Combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/):

- **`role="combobox"`** on the input, with `aria-expanded`, `aria-controls`, and `aria-autocomplete="list"`.
- **`aria-activedescendant`** tracks the active option while DOM focus stays on the input — so the user can keep typing while arrowing through results. This is the behaviour screen-reader users expect from autocomplete.
- **Full keyboard support**: Down/Up to move, Home/End to jump, Enter to select, Escape to close.
- **`role="option"` + `aria-selected`** on each item so state is announced.
- The popup is a real `role="listbox"` labelled by the field.

---

## Testing approach

1. **Automated** — `jest-axe` scans each component on every test run. Violations fail CI.
2. **In Storybook** — `@storybook/addon-a11y` runs axe live on every story.
3. **Manual** — keyboard-only navigation and screen-reader passes (VoiceOver on macOS, NVDA on Windows) for the interactive components, because automated tools only catch ~30–40% of real issues.
