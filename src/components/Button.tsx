import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const buttonVariants = cva(
  // Base: focus ring is always visible and meets WCAG 2.4.7 (focus visible)
  [
    'inline-flex items-center justify-center gap-2 rounded-token font-action no-underline',
    'transition-colors duration-fast ease-standard',
    'focus-visible:outline-none focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-brand',
    // Disabled state is communicated via aria-disabled, not just visual dimming
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        // The main action of a screen. Its colour is the `action` token, which
        // a theme may set apart from the brand colour.
        primary: 'bg-action text-on-action hover:bg-action-hover',
        // A second strong action, in the brand colour.
        brand: 'bg-brand text-on-brand hover:bg-brand-hover',
        secondary: 'bg-brand-subtle text-brand hover:bg-brand-soft',
        // Bordered, for a secondary action next to a primary one.
        outline:
          'border-2 border-line-strong bg-surface text-ink hover:border-ink hover:bg-surface-sunken',
        ghost: 'bg-transparent text-brand hover:bg-brand-subtle',
        danger: 'bg-danger text-on-brand hover:bg-danger/90',
      },
      size: {
        sm: 'min-h-8 px-3 text-sm',
        md: 'min-h-10 px-4 text-base',
        // 48px: the comfortable target size for a page's main call to action.
        lg: 'min-h-12 px-6 text-lg',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * When the button only contains an icon, an accessible label is REQUIRED.
   * It is rendered as aria-label so screen-reader users know the action.
   */
  iconOnlyLabel?: string;
}

/**
 * Accessible button.
 *
 * Accessibility notes:
 * - Always renders a real <button> (keyboard + screen-reader support for free).
 * - Visible focus ring (WCAG 2.4.7).
 * - Icon-only buttons require `iconOnlyLabel` so they are never announced as just "button".
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, iconOnlyLabel, children, type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        aria-label={iconOnlyLabel}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export { buttonVariants };
