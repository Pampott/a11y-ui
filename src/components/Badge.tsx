import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-sm font-medium',
  {
    variants: {
      // Every variant pairs text + background to meet WCAG 1.4.3 contrast (>= 4.5:1)
      tone: {
        neutral: 'bg-gray-200 text-gray-900',
        brand: 'bg-brand-subtle text-brand',
        success: 'bg-success-subtle text-success',
        danger: 'bg-danger-subtle text-danger',
        warning: 'bg-warning-subtle text-warning',
      },
    },
    defaultVariants: { tone: 'neutral' },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /**
   * When the badge conveys status by colour alone, pass a textLabel so meaning
   * is not lost for colour-blind users or screen readers (WCAG 1.4.1).
   */
  statusLabel?: string;
}

/**
 * Accessible badge / tag.
 *
 * Accessibility notes:
 * - Colour is never the only signal: the text content carries the meaning.
 * - Each tone is contrast-checked against WCAG 1.4.3 (4.5:1).
 * - `statusLabel` adds visually-hidden context when needed (e.g. "Status: ").
 */
export function Badge({ tone, statusLabel, children, className, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ tone }), className)} {...props}>
      {statusLabel && <span className="sr-only">{statusLabel}</span>}
      {children}
    </span>
  );
}

export { badgeVariants };
