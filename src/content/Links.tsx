import { forwardRef, type AnchorHTMLAttributes } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { buttonVariants } from '../components/Button';
import { cn } from '../lib/cn';

export interface ButtonLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  href: string;
}

/**
 * A link that looks like a button. It stays an <a>: it navigates, so screen
 * readers announce a link and the browser's link features keep working.
 */
export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ variant, size, fullWidth, className, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        buttonVariants({ variant, size, fullWidth }),
        'focus-visible:ring-offset-canvas',
        className
      )}
      {...props}
    />
  )
);
ButtonLink.displayName = 'ButtonLink';

export interface TextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  /** Adds a decorative arrow after the text, hidden from assistive technologies. */
  arrow?: boolean;
  tone?: 'brand' | 'inherit';
}

/** Inline link, always underlined so it is not identified by colour alone (WCAG 1.4.1). */
export const TextLink = forwardRef<HTMLAnchorElement, TextLinkProps>(
  ({ arrow, tone = 'brand', className, children, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        'group inline-flex items-baseline gap-1 rounded-sm font-bold underline decoration-2 underline-offset-4',
        tone === 'brand' ? 'text-brand hover:text-brand-hover' : 'text-inherit',
        'focus-visible:outline-none focus-visible:ring-focus focus-visible:ring-brand',
        className
      )}
      {...props}
    >
      {children}
      {arrow && (
        <span
          aria-hidden="true"
          className="no-underline transition-transform duration-fast ease-standard group-hover:translate-x-0.5"
        >
          →
        </span>
      )}
    </a>
  )
);
TextLink.displayName = 'TextLink';
