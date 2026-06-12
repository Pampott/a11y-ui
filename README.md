# a11y-ui

[![CI](https://github.com/Pampott/a11y-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/Pampott/a11y-ui/actions/workflows/ci.yml)

An accessible React component library — built to **WCAG 2.2** standards, documented in **Storybook**, and tested with **axe-core**.

Most component libraries look accessible. This one proves it: every component ships with automated accessibility tests that **fail the build** if an ARIA attribute, label, or focus behaviour regresses.

---

## Why this exists

Accessibility is usually treated as an afterthought — a checklist run once before launch. This library takes the opposite approach: accessibility is part of the component contract, verified on every commit.

- **Hand-built** following the [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) — the patterns are implemented, not hidden behind a black box (see [Build philosophy](#build-philosophy) for the one deliberate exception).
- **Keyboard-first** — every interactive component works without a mouse.
- **Motion that respects the user** — animations are token-driven and globally disabled under `prefers-reduced-motion` (WCAG 2.3.3).
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
| `Accordion` | WAI-ARIA Accordion | Heading-wrapped triggers, `aria-expanded`/`aria-controls`, arrow-key nav, `inert` collapsed panels |
| `Tabs` | WAI-ARIA Tabs | Roving tabindex, arrow/Home/End nav, sliding indicator, single reused panel |
| `Toast` | Live region | `role="status"`/`"alert"`, auto-dismiss **pauses on hover & focus** (2.2.1) |
| `Switch` | WAI-ARIA Switch | `role="switch"` + `aria-checked`, controlled/uncontrolled, Space/Enter toggle |
| `DropdownMenu` | WAI-ARIA Menu *(on Radix)* | Roving focus, type-ahead, collision-aware positioning, focus return — see below |

---

## Build philosophy

Two kinds of component live in this library, on purpose:

- **Hand-built (the majority)** — implemented directly against the WAI-ARIA Authoring Practices. The point is to *demonstrate* the patterns: roving tabindex, live regions, focus management, `inert`, timing controls. If you want to see how an accessible component actually works under the hood, read the source.
- **Composed on a headless primitive (`DropdownMenu`, on [Radix UI](https://www.radix-ui.com/))** — some patterns are genuinely hard to get right by hand: a menu needs roving focus, type-ahead, collision-aware positioning, focus return and outside-press dismissal. Reimplementing all of that is how subtle accessibility bugs get shipped. The professional choice is to compose on a battle-tested primitive and own the *design-system layer* on top: tokens, styling, motion and axe coverage.

Knowing **which** approach a given problem calls for is the actual skill. Building everything from scratch is naïve; reaching for a styled library for everything hides whether you understand accessibility at all. This library shows both — and the judgement to tell them apart.

---

## Quick start

```bash
npm install
npm run storybook     # explore components with the a11y addon
npm run test          # run axe-core accessibility tests
```

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
✓ Accordion   — toggle, aria wiring, arrow/Home/End focus nav
✓ Tabs        — roving tabindex, automatic activation, panel labelling
✓ Toast       — role status/alert, auto-dismiss, pause on hover
✓ Switch      — controlled/uncontrolled, Space/Enter, disabled
✓ DropdownMenu (Radix) — open, select, axe when open
```

> 38 tests across 6 files — every interactive component is covered for both
> axe violations **and** keyboard behaviour.

The Storybook `@storybook/addon-a11y` panel also runs axe live on every story, so you can see the accessibility tree and any violations while developing.

See [ACCESSIBILITY.md](./ACCESSIBILITY.md) for the design decisions behind each component.

---

## License

MIT
