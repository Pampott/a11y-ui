import { forwardRef, type ElementType, type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const cardVariants = cva('rounded-card text-ink', {
  variants: {
    variant: {
      default: 'border-2 border-line bg-surface shadow-card',
      featured: 'border-2 border-brand-line bg-surface shadow-[inset_0.35rem_0_0_rgb(var(--a11y-brand-soft)),var(--a11y-shadow-card)]',
      outline: 'border-2 border-line bg-transparent',
      sunken: 'bg-surface-sunken',
      brand: 'border-2 border-brand-line bg-brand-subtle',
      inverse: 'bg-ink text-canvas',
    },
    padding: {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-6 sm:p-8',
    },
  },
  defaultVariants: { variant: 'default', padding: 'md' },
});

export interface CardProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof cardVariants> {
  as?: ElementType;
}

/** A framed block of content. A <div> by default; pass `as="article"` or `as="li"` as needed. */
export const Card = forwardRef<HTMLElement, CardProps>(
  ({ as: Tag = 'div', variant, padding, className, ...props }, ref) => (
    <Tag ref={ref} className={cn(cardVariants({ variant, padding }), className)} {...props} />
  )
);
Card.displayName = 'Card';

const calloutVariants = cva('rounded-card p-4 sm:p-5 text-ink', {
  variants: {
    tone: {
      brand: 'border-l-4 border-brand bg-brand-subtle',
      neutral: 'border-l-4 border-line-strong bg-surface-sunken',
      success: 'border-l-4 border-success bg-success-subtle',
      warning: 'border-l-4 border-warning bg-warning-subtle',
      danger: 'border-l-4 border-danger bg-danger-subtle',
    },
  },
  defaultVariants: { tone: 'brand' },
});

export interface CalloutProps
  extends Omit<HTMLAttributes<HTMLElement>, 'title'>,
    VariantProps<typeof calloutVariants> {
  as?: ElementType;
  /** Bold first line. */
  title?: ReactNode;
}

/**
 * A note set apart from the text. The colour is decorative: write the nature of
 * the note in the title ("Attention", "Bon à savoir") so it is not conveyed by
 * colour alone (WCAG 1.4.1).
 */
export const Callout = forwardRef<HTMLElement, CalloutProps>(
  ({ as: Tag = 'div', tone, title, className, children, ...props }, ref) => (
    <Tag ref={ref} className={cn(calloutVariants({ tone }), className)} {...props}>
      {title && <p className="font-heading">{title}</p>}
      {title ? <div className="mt-1">{children}</div> : children}
    </Tag>
  )
);
Callout.displayName = 'Callout';
