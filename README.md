# a11y-ui

An accessible React component library — built to **WCAG 2.2** standards, documented in **Storybook**, and tested with **axe-core**.

Most component libraries look accessible. This one proves it: every component ships with automated accessibility tests that **fail the build** if an ARIA attribute, label, or focus behaviour regresses.

---

## Why this exists

Accessibility is usually treated as an afterthought — a checklist run once before launch. This library takes the opposite approach: accessibility is part of the component contract, verified on every commit.

- **Built from scratch** following the [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) — not wrappers around a black box.
- **Keyboard-first** — every interactive component works without a mouse.
- **Screen-reader tested** — VoiceOver and NVDA, plus automated axe-core scans.
- **TypeScript** throughout, with full prop typing.

---

## Components

| Component | Pattern | Key accessibility features |
|-----------|---------|----------------------------|
| `Button` | Native button | Visible focus ring (2.4.7), required `iconOnlyLabel` for icon buttons |
| `Input` | Labelled field | Linked label, `aria-describedby` hints, `aria-invalid` + `role="alert"` errors |
| `Modal` | WAI-ARIA Dialog | Focus trap, Escape to close, focus restoration, `aria-modal` |
| `Tooltip` | WAI-ARIA Tooltip | Shows on hover **and** focus (1.4.13), Escape to dismiss |
| `Badge` | Status indicator | Contrast-checked tones (1.4.3), colour never the only signal |
| `SkipLink` | Bypass blocks (2.4.1) | Visually hidden until focused, jumps to main content |
| `Combobox` | WAI-ARIA Combobox | `aria-activedescendant`, full keyboard nav, `aria-selected` |

---

## Quick start

```bash
npm install
npm run storybook     # explore components with the a11y addon
npm run test          # run axe-core accessibility tests
```

## Tech stack

React 18 · TypeScript · Tailwind CSS · class-variance-authority · Storybook 8 · Vitest · jest-axe / axe-core

---

## Accessibility testing

Every component has an automated test that renders it and scans it with axe-core:

```bash
npm run test
```

```
✓ Button (primary)
✓ Button (icon-only with label)
✓ Input with label
✓ Input with error
✓ Badge (all tones)
✓ SkipLink
✓ Combobox
✓ Tooltip trigger
```

The Storybook `@storybook/addon-a11y` panel also runs axe live on every story, so you can see the accessibility tree and any violations while developing.

See [ACCESSIBILITY.md](./ACCESSIBILITY.md) for the design decisions behind each component.

---

## License

MIT
