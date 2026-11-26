/**
 * Themes of the design system.
 *
 * A theme is a set of values for the CSS variables the Tailwind preset reads.
 * Colours are written in hex here and turned into space-separated RGB channels
 * so Tailwind's opacity modifiers (`bg-brand/70`) keep working.
 *
 * The preset writes `default` on `:root` and every other theme on
 * `[data-theme='<name>']`. An application picks a theme by setting the
 * attribute on <html>; it never redefines a token itself.
 *
 * Every pair of foreground and background a component uses is checked against
 * WCAG contrast thresholds in src/themes.test.ts, for every theme.
 */

/** @typedef {Record<string, string>} Theme */

/** @type {Theme} */
const base = {
  // Brand: links, focus ring, accents.
  brand: '#A8431F',
  'brand-hover': '#8A3618',
  'brand-subtle': '#F8E7DF',
  'brand-soft': '#F1D3C6',
  'brand-line': '#E0B3A1',
  'on-brand': '#FFFFFF',
  // Action: the main button. Same as brand unless a theme says otherwise.
  action: '#A8431F',
  'action-hover': '#8A3618',
  'on-action': '#FFFFFF',
  // Text and surfaces.
  ink: '#111827',
  muted: '#4B5563',
  canvas: '#FFFFFF',
  surface: '#FFFFFF',
  'surface-sunken': '#F9FAFB',
  line: '#E5E7EB',
  'line-strong': '#6B7280',
  seam: '#D1D5DB',
  // Neutral scale.
  'gray-50': '#F9FAFB',
  'gray-100': '#F3F4F6',
  'gray-200': '#E5E7EB',
  'gray-300': '#D1D5DB',
  'gray-400': '#9CA3AF',
  'gray-500': '#6B7280',
  'gray-600': '#4B5563',
  'gray-700': '#374151',
  'gray-800': '#1F2937',
  'gray-900': '#111827',
  // Status.
  danger: '#B3261E',
  'danger-subtle': '#F7DAD4',
  success: '#2C6347',
  'success-subtle': '#D9EBE0',
  warning: '#8A5A00',
  'warning-subtle': '#F8E6CA',
};

/** @type {Record<string, Theme>} */
export const colorThemes = {
  default: base,
  clairoki: {
    ...base,
    brand: '#2B54A7',
    'brand-hover': '#1D335B',
    'brand-subtle': '#EFF5FC',
    'brand-soft': '#DCE9FB',
    'brand-line': '#B7C9EC',
    action: '#0C1834',
    'action-hover': '#1D335B',
    ink: '#0C1834',
    muted: '#46546D',
    canvas: '#FDFDFE',
    surface: '#FFFFFF',
    'surface-sunken': '#F7F9FC',
    line: '#DDE6F2',
    'line-strong': '#75859F',
    seam: '#AEC2E0',
    'gray-50': '#F7F9FC',
    'gray-100': '#EDF2F9',
    'gray-200': '#DDE6F2',
    'gray-300': '#B8C6DA',
    'gray-400': '#899AB2',
    'gray-500': '#75839C',
    'gray-600': '#505D75',
    'gray-700': '#35435D',
    'gray-800': '#21304B',
    'gray-900': '#0C1834',
  },
};

/** Tokens that are not colours, per theme. */
export const otherThemes = {
  default: {
    'font-sans':
      "ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'",
    'font-display':
      "ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'",
    'weight-action': '500',
    'weight-heading': '700',
    'radius-control': '0.5rem',
    'radius-card': '0.75rem',
    'shadow-card': '0 1px 3px rgb(17 24 39 / 0.08)',
    'shadow-raised': '0 10px 24px rgb(17 24 39 / 0.12)',
  },
  clairoki: {
    'font-sans': "'Nunito Sans Variable', ui-sans-serif, system-ui, sans-serif",
    'font-display': "'Nunito Sans Variable', ui-sans-serif, system-ui, sans-serif",
    'weight-action': '800',
    'weight-heading': '800',
    'radius-control': '0.45rem',
    'radius-card': '0.85rem',
    'shadow-card': '0 8px 26px rgb(38 72 116 / 0.05)',
    'shadow-raised': '0 12px 24px rgb(38 72 116 / 0.11)',
  },
};

/** '#A8431F' -> '168 67 31' */
export function hexToChannels(hex) {
  const value = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16)).join(' ');
}

/** The CSS custom properties of one theme. */
export function themeVariables(name) {
  const vars = {};
  for (const [token, hex] of Object.entries(colorThemes[name])) {
    vars[`--a11y-${token}`] = hexToChannels(hex);
  }
  for (const [token, value] of Object.entries(otherThemes[name])) {
    vars[`--a11y-${token}`] = value;
  }
  return vars;
}

export const themeNames = Object.keys(colorThemes);
