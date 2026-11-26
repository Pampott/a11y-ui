import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/*
 * tailwind-merge has to know the preset's own tokens, or it would read
 * `text-title` as a colour and drop it next to `text-ink`, or drop
 * `font-action` (a weight) next to `font-display` (a family).
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['display', 'title', 'section'] }],
      'font-weight': [{ font: ['action', 'heading'] }],
      'font-family': [{ font: ['display'] }],
      shadow: [{ shadow: ['card', 'raised'] }],
      rounded: [{ rounded: ['token', 'card'] }],
    },
  },
});

/**
 * Merges Tailwind classes safely, resolving conflicts.
 * Standard utility used across the design system.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
