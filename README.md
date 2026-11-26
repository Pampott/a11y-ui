# a11y-ui

[![CI](https://github.com/Pampott/a11y-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/Pampott/a11y-ui/actions/workflows/ci.yml)

An accessible React component library, built to **WCAG 2.2** standards, documented in **Storybook**, and tested with **axe-core**.

Most component libraries look accessible. This one proves it: every component ships with automated accessibility tests that **fail the build** if an ARIA attribute, label, or focus behaviour regresses.

---

## Why this exists

Accessibility is usually treated as an afterthought, a checklist run once before launch. This library takes the opposite approach: accessibility is part of the component contract, verified on every commit.

- **Hand-built** following the [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/): the patterns are implemented, not hidden behind a black box (see [Build philosophy](#build-philosophy) for the one deliberate exception).
- **Keyboard-first**: every interactive component works without a mouse.
- **Motion that respects the user**: animations are token-driven and globally disabled under `prefers-reduced-motion` (WCAG 2.3.3).
- **Tested on every commit**: axe-core scans and interaction tests with Testing Library. Screen-reader announcements are designed from the ARIA specification and have not yet been verified by hand with VoiceOver or NVDA.
- **Themeable without CSS**: every token is a CSS variable, and every theme's colour pairs are contrast-checked in the test suite.
- **TypeScript** throughout, with full prop typing.

---

## Components

| Component | Pattern | Key accessibility features |
|-----------|---------|----------------------------|
| `Button` | Native button | Visible focus ring (2.4.7), required `iconOnlyLabel` for icon buttons |
| `Input` | Labelled field | Linked label, `aria-describedby` hints, `aria-invalid` + `role="alert"` errors |
| `Textarea` | Labelled multi-line field | Same contract as `Input`, vertical resize only (1.4.10) |
| `Modal` | WAI-ARIA Dialog | Focus trap, Escape to close, focus restoration, `aria-modal` |
| `Tooltip` | WAI-ARIA Tooltip | Shows on hover **and** focus (1.4.13), Escape to dismiss |
| `Badge` | Status indicator | Contrast-checked tones (1.4.3), colour never the only signal |
| `SkipLink` | Bypass blocks (2.4.1) | Visually hidden until focused, jumps to main content |
| `Combobox` | WAI-ARIA Combobox | `aria-activedescendant`, full keyboard nav, `aria-selected` |
| `Accordion` | WAI-ARIA Accordion | Heading-wrapped triggers, `aria-expanded`/`aria-controls`, arrow-key nav, `inert` collapsed panels |
| `Tabs` | WAI-ARIA Tabs | Roving tabindex, arrow/Home/End nav, sliding indicator, single reused panel |
| `Toast` | Live region | `role="status"`/`"alert"`, auto-dismiss **pauses on hover & focus** (2.2.1) |
| `Switch` | WAI-ARIA Switch | `role="switch"` + `aria-checked`, controlled/uncontrolled, Space/Enter toggle |
| `DropdownMenu` | WAI-ARIA Menu *(on Radix)* | Roving focus, type-ahead, collision-aware positioning, focus return (see below) |
| `Fieldset` | Native group | `<fieldset>` + `<legend>`, group-level hint and error linked with `aria-describedby` |
| `RadioGroup` | Native radio group | One tab stop, arrow-key navigation, per-option hints, "required" written out |
| `Checkbox` | Native checkbox | Linked label as click target, `aria-invalid` + `role="alert"` errors |
| `Select` | Native select | Linked label, hint and error; native picker and type-ahead kept on purpose |
| `ErrorSummary` | Error summary | Takes focus after a failed submit, lists each error as a link to its field (3.3.1, 3.3.3) |
| `QuantityStepper` | Stepper | Buttons named after the action and the item, live announcement (4.1.3), focus kept at a bound |
| `Steps` | Progress indicator | `<nav>` + ordered list, `aria-current="step"`, state never by colour alone (1.4.1) |
| `Carousel` | WAI-ARIA Carousel | Named controls first, slide position announced, rotation can be paused and respects reduced motion (2.2.2) |

### Page building blocks

Enough to build a whole marketing or product page without writing CSS. See *Patterns/Example page* in the Storybook.

| Group | Components | Key accessibility features |
|-------|------------|----------------------------|
| Layout | `Container`, `Section`, `Stack`, `Cluster`, `Grid`, `Split` | Collapse to one column on small screens (1.4.10); `Section` renders a `<section>` to name with `aria-labelledby` |
| Typography | `Heading`, `Text`, `Eyebrow`, `Highlight`, `Prose` | `Heading` takes a required `level` separate from its `size`, so the look never decides the outline (1.3.1) |
| Links | `ButtonLink`, `TextLink` | Stay real links; text links always underlined (1.4.1); decorative arrow hidden |
| Surfaces | `Card`, `Callout` | Polymorphic `as`; callout nature written in its title, not shown by colour alone |
| Lists and data | `List`, `StatList`, `DefinitionList`, `StepList`, `DataTable`, `CodeBlock`, `Disclosure`, `Price`, `ProgressRing` | `<dl>` and `<ol>` semantics; table with caption and row headers in a focusable scroll region (2.1.1); score ring with a text alternative |
| Progress | `Spinner`, `ProgressList`, `CheckFeed`, `CodeSkeleton` | `aria-current="step"`, finished state in hidden text, status written out next to each icon |
| Site chrome | `SiteHeader`, `SiteFooter`, `Showcase`, `WindowFrame` | Named `<nav>`, `aria-current="page"`; showcase notes are a list in reading order whatever their placement |

---

## Remediation examples

Building accessible components is half the job; the other half is fixing the ones that already exist. `src/remediation/` holds five patterns as they are commonly found on e-commerce sites, each next to its corrected version (Storybook: **Remediation → Before and after**).

| Example | Faults in the "before" version | Caught by axe-core? |
|---------|--------------------------------|---------------------|
| Form field with error | Placeholder as label, error not linked or announced, no fix suggested, no `autocomplete`, focus outline removed | No |
| Icon-only button | No accessible name, 16 px target | Yes (`button-name`) |
| Modal dialog | No dialog role or name, focus left behind, mouse-only close, no Escape | No |
| Radio group | Options without labels, question not linked to its options, only the circle is clickable | Partly (`label` only) |
| Quantity stepper | Minus and plus are `<span>`s, unlabelled field, silent value change | Partly (`label` only) |

An automated scan misses most of these faults. That is the point: each pair is tested from both sides in `remediation.test.tsx`. The "before" version must exhibit the fault and the "after" version must not, with keyboard and accessible-name assertions where axe is blind.

---

## Build philosophy

Two kinds of component live in this library, on purpose:

- **Hand-built (the majority)**: implemented directly against the WAI-ARIA Authoring Practices. The point is to *demonstrate* the patterns: roving tabindex, live regions, focus management, `inert`, timing controls. If you want to see how an accessible component actually works under the hood, read the source.
- **Composed on a headless primitive (`DropdownMenu`, on [Radix UI](https://www.radix-ui.com/))**: some patterns are genuinely hard to get right by hand: a menu needs roving focus, type-ahead, collision-aware positioning, focus return and outside-press dismissal. Reimplementing all of that is how subtle accessibility bugs get shipped. The professional choice is to compose on a battle-tested primitive and own the *design-system layer* on top: tokens, styling, motion and axe coverage.

Knowing **which** approach a given problem calls for is the actual skill. Building everything from scratch is naïve; reaching for a styled library for everything hides whether you understand accessibility at all. This library shows both: and the judgement to tell them apart.

---

## Quick start

```bash
npm install
npm run storybook     # explore components with the a11y addon
npm run test          # run axe-core accessibility tests
npm run build         # build the library into dist/
```

---

## Using it in an application

The library is not published on npm yet. Install it from GitHub, pinned to a tag so an application never picks up an unreleased change:

```bash
npm install github:Pampott/a11y-ui#v0.3.0
```

npm builds the library on install (the `prepare` script), so there is no build output committed to the repository.

The components ship as JavaScript that carries Tailwind class names, with no stylesheet: the application generates the CSS with its own Tailwind 3. Two lines of configuration make that work.

```js
// tailwind.config.js of the application
import a11yUi from 'a11y-ui/tailwind-preset';

export default {
  // 1. The design tokens (colours, type, radius, shadows, focus ring, motion),
  //    the themes and the global prefers-reduced-motion guard.
  presets: [a11yUi],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    // 2. Lets Tailwind see the class names used inside the components.
    './node_modules/a11y-ui/dist/**/*.js',
  ],
};
```

```tsx
import { Button, Input } from 'a11y-ui';
```

### Themes

Every token is a CSS variable. The preset writes the default theme on `:root` and the others on `[data-theme='<name>']`, and sets the page background, text colour and font from the theme. An application picks a theme with one attribute and redefines nothing:

```html
<html lang="fr" data-theme="clairoki">
```

Themes live in `themes.js` (exported as `a11y-ui/themes`). Adding one means adding an entry there; the test suite then checks all its text pairs against 4.5:1 and its control borders against 3:1 (WCAG 1.4.3, 1.4.11). Fonts are not bundled: a theme names a font family, and the application loads it.

Without the preset the components render unstyled, and without the `content` entry Tailwind purges their classes. React 18 or later and Tailwind CSS 3.4 are peer dependencies.

## Tech stack

React 18 · TypeScript · Tailwind CSS · class-variance-authority · Radix UI (headless primitives) · Storybook 8 · Vitest · jest-axe / axe-core

---

## Accessibility testing

Every component has an automated test that renders it and scans it with axe-core:

```bash
npm run test
```

```
✓ Button, Input, Badge, SkipLink, Combobox, Tooltip   (axe scans)
✓ Accordion: toggle, aria wiring, arrow/Home/End focus nav
✓ Tabs: roving tabindex, automatic activation, panel labelling
✓ Toast: role status/alert, auto-dismiss, pause on hover
✓ Switch: controlled/uncontrolled, Space/Enter, disabled
✓ DropdownMenu (Radix): open, select, axe when open
✓ Form: Fieldset, RadioGroup, Checkbox, Select, ErrorSummary focus and links
✓ Commerce: QuantityStepper bounds and announcements, Steps, Carousel rotation and pause
✓ Remediation: each "before" exhibits its fault, each "after" does not
```

> 77 tests across 10 files: every interactive component is covered for both
> axe violations **and** keyboard behaviour.

The Storybook `@storybook/addon-a11y` panel also runs axe live on every story, so you can see the accessibility tree and any violations while developing.

See [ACCESSIBILITY.md](./ACCESSIBILITY.md) for the design decisions behind each component.

---

## License

MIT
