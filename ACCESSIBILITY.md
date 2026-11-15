# Accessibility decisions

This document explains the accessibility reasoning behind each component. It maps features to specific WCAG 2.2 success criteria, so a reviewer (or future maintainer) can understand *why* each choice was made.

---

## Button

- **Always a real `<button>`**: gets keyboard activation (Space/Enter) and screen-reader semantics for free. Never a styled `<div>`.
- **Visible focus ring**: a 3px ring on `:focus-visible`, satisfying **WCAG 2.4.7 (Focus Visible)**. The ring is never removed for aesthetics.
- **Icon-only buttons require a label**: the `iconOnlyLabel` prop becomes `aria-label`, so a close button is announced as "Close dialog", not "button". Addresses **4.1.2 (Name, Role, Value)**.
- **Disabled state** uses the native `disabled` attribute, which removes the button from the tab order and announces it correctly.

## Input

- **Label always rendered and linked** via `htmlFor`/`id`: **1.3.1 (Info and Relationships)** and **4.1.2**. Placeholders are never used as labels (they vanish on input and fail contrast).
- **Hints and errors linked with `aria-describedby`** so screen readers announce them with the field.
- **Errors set `aria-invalid` and use `role="alert"`** so the error is announced immediately when it appears: **3.3.1 (Error Identification)**.
- **Required fields use `aria-required`**, not just a visual asterisk.

## Modal

Follows the [WAI-ARIA Dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/):

- **Focus is trapped** inside the dialog while open: Tab and Shift+Tab cycle within it.
- **Focus moves in on open and returns to the trigger on close**: **2.4.3 (Focus Order)**.
- **Escape closes** the dialog: expected keyboard behaviour.
- **`role="dialog"` + `aria-modal="true"` + `aria-labelledby`** point to the title so the dialog is announced with its name.

## Tooltip

Follows the WAI-ARIA Tooltip pattern and **WCAG 1.4.13 (Content on Hover or Focus)**:

- **Appears on hover AND keyboard focus**: not hover-only, which excludes keyboard users.
- **Linked via `aria-describedby`** so the content is announced.
- **Dismissible with Escape** without moving the pointer.
- Uses a real `role="tooltip"` element in the DOM, not the `title` attribute (which is not keyboard-accessible and inconsistently announced).

## Badge

- **Every tone pairs foreground and background colours** chosen to meet **WCAG 1.4.3 (Contrast Minimum, ≥ 4.5:1)**.
- **Colour is never the only signal**: the text label always carries the meaning, satisfying **1.4.1 (Use of Color)**. A "Failed" badge says "Failed", not just red.

## SkipLink

- Implements **2.4.1 (Bypass Blocks)**: lets keyboard and screen-reader users skip repeated navigation.
- **Visually hidden until focused**, then appears at the top of the viewport.
- Must be the **first focusable element** in the DOM; the target (`<main id="…" tabIndex={-1}>`) receives focus cleanly.

## Combobox

The hardest pattern to get right. Follows the [WAI-ARIA Combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/):

- **`role="combobox"`** on the input, with `aria-expanded`, `aria-controls`, and `aria-autocomplete="list"`.
- **`aria-activedescendant`** tracks the active option while DOM focus stays on the input, so the user can keep typing while arrowing through results. This is the behaviour screen-reader users expect from autocomplete.
- **Full keyboard support**: Down/Up to move, Home/End to jump, Enter to select, Escape to close.
- **`role="option"` + `aria-selected`** on each item so state is announced.
- The popup is a real `role="listbox"` labelled by the field.

## Fieldset, RadioGroup and Checkbox

- **Native controls, no ARIA widget**: radios sharing a `name` are one tab stop with arrow-key navigation, and a checkbox toggles with Space, without a line of script. Addresses **2.1.1 (Keyboard)** and **4.1.2**.
- **`<fieldset>` + `<legend>`** name the group, so each option is announced with the question it answers: **1.3.1** and **3.3.2 (Labels or Instructions)**.
- **Group-level hint and error** are linked to the fieldset with `aria-describedby`; per-option hints are linked to their own radio instead of being merged into the label.
- **"Required" is written out** for screen readers next to the visual asterisk.
- **The label is part of the click target**, which keeps targets above **2.5.8 (Target Size)**.

## Select

- **The native `<select>` is kept on purpose**: keyboard support, type-ahead and the platform picker on mobile come for free. A custom listbox is only worth its cost when options need filtering, which is what `Combobox` is for.
- **Label, hint and error** follow the same contract as `Input`.

## ErrorSummary

- **Focus moves to the summary after a failed submit**, so the user learns that something went wrong and how many problems there are: **3.3.1 (Error Identification)**.
- **Each error is a link that moves focus to its field** (**2.4.3**), and each message says how to fix the value (**3.3.3 Error Suggestion**).
- **Field-level messages stay in place**: the summary does not replace them, it leads to them.

## QuantityStepper

- **Real buttons named after the action and the item** ("Increase quantity of Linen shirt"), so several steppers on one cart page stay distinguishable: **4.1.2**.
- **A text input with `inputmode="numeric"`** rather than `type="number"`: it accepts typing, brings up the numeric keypad, and does not change on scroll.
- **A polite live region announces the new quantity** after a button press, and says when a bound is reached: **4.1.3 (Status Messages)**.
- **At a bound the button is `aria-disabled`, not `disabled`**, so keyboard focus stays on it instead of being dropped: **2.4.3**.

## Steps

- **A named `<nav>` with an ordered list**: the number of steps and the position of each one are announced.
- **`aria-current="step"`** marks the current step.
- **State never relies on colour alone** (**1.4.1**): completed steps show a check mark and say "Completed" to screen readers, the current step is bold and underlined.
- **Only completed steps are links**, so nothing focusable leads nowhere.

## Carousel

Follows the [WAI-ARIA Carousel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/):

- **Previous and Next are named buttons placed before the slides** in the DOM.
- **Each slide is a group announced with its position** ("2 of 4"); hidden slides are removed from the accessibility tree.
- **No rotation by default.** When rotation is enabled, a Pause button comes first, rotation pauses while the pointer or keyboard focus is inside, and it stops for good once the user changes slide: **2.2.2 (Pause, Stop, Hide)**.
- **The slide area is a polite live region only when slides do not rotate**, so automatic changes never interrupt the user.
- **Rotation never starts under `prefers-reduced-motion`**: **2.3.3**.

---

## Testing approach

1. **Automated**: `jest-axe` scans each component on every test run. Violations fail CI.
2. **In Storybook**: `@storybook/addon-a11y` runs axe live on every story.
3. **Manual**: keyboard-only navigation and screen-reader passes (VoiceOver on macOS, NVDA on Windows) for the interactive components, because automated tools only catch ~30–40% of real issues.
