import { cn } from '../lib/cn';

export interface SkipLinkProps {
  /** The id of the main content target, e.g. "main-content". */
  targetId: string;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Skip link — lets keyboard and screen-reader users jump past repeated
 * navigation straight to the main content (WCAG 2.4.1 — bypass blocks).
 *
 * Accessibility notes:
 * - Visually hidden until focused, then appears at the top of the page.
 * - Must be the very first focusable element in the DOM.
 * - The target element should have tabIndex={-1} so focus lands cleanly:
 *     <main id="main-content" tabIndex={-1}>…</main>
 */
export function SkipLink({ targetId, children = 'Skip to main content', className }: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className={cn(
        // Hidden off-screen by default…
        'sr-only',
        // …but fully visible and focusable when tabbed to
        'focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]',
        'focus:rounded-token focus:bg-brand focus:px-4 focus:py-2 focus:text-white',
        'focus:outline-none focus:ring-focus focus:ring-offset-2 focus:ring-brand',
        className
      )}
    >
      {children}
    </a>
  );
}
