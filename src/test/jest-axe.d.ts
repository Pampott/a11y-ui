declare module 'jest-axe' {
  import type { AxeResults } from 'axe-core';
  export function axe(html: Element | string, options?: unknown): Promise<AxeResults>;
  export const toHaveNoViolations: any;
}
