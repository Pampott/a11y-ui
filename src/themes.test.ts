import { describe, expect, it } from 'vitest';
// @ts-ignore: plain JS module with a .d.ts next to it
import { colorThemes, themeNames } from '../themes.js';

function luminance(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.replace('#', '').slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// Every text colour a component sets on every background it sits on.
const textPairs: [string, string][] = [
  ['ink', 'canvas'],
  ['ink', 'surface'],
  ['ink', 'surface-sunken'],
  ['ink', 'brand-subtle'],
  ['ink', 'success-subtle'],
  ['ink', 'danger-subtle'],
  ['ink', 'warning-subtle'],
  ['muted', 'canvas'],
  ['muted', 'surface'],
  ['muted', 'surface-sunken'],
  ['brand', 'canvas'],
  ['brand', 'surface'],
  ['brand', 'brand-subtle'],
  ['brand-hover', 'surface'],
  ['on-brand', 'brand'],
  ['on-brand', 'brand-hover'],
  ['on-action', 'action'],
  ['on-action', 'action-hover'],
  ['on-brand', 'danger'],
  ['on-brand', 'success'],
  ['danger', 'surface'],
  ['danger', 'danger-subtle'],
  ['success', 'surface'],
  ['success', 'success-subtle'],
  ['warning', 'warning-subtle'],
  ['canvas', 'ink'],
];

// Borders and icons that identify a control or its state (WCAG 1.4.11).
const uiPairs: [string, string][] = [
  ['line-strong', 'surface'],
  ['line-strong', 'canvas'],
  ['brand', 'canvas'],
  ['brand', 'surface'],
];

describe.each(themeNames as string[])('theme %s', (name) => {
  const theme = (colorThemes as Record<string, Record<string, string>>)[name];

  it.each(textPairs)('text %s on %s reaches 4.5:1', (fg, bg) => {
    expect(contrast(theme[fg], theme[bg])).toBeGreaterThanOrEqual(4.5);
  });

  it.each(uiPairs)('%s on %s reaches 3:1', (fg, bg) => {
    expect(contrast(theme[fg], theme[bg])).toBeGreaterThanOrEqual(3);
  });

  it('defines every token of the default theme', () => {
    expect(Object.keys(theme).sort()).toEqual(Object.keys(colorThemes.default).sort());
  });
});
