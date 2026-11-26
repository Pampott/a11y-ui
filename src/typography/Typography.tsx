import { forwardRef, type ElementType, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const headingVariants = cva('scroll-mt-24 font-display font-heading text-ink text-balance', {
  variants: {
    size: {
      display: 'text-display',
      title: 'text-title',
      section: 'text-section',
      lg: 'text-2xl leading-tight sm:text-3xl',
      md: 'text-xl leading-snug',
      sm: 'text-lg leading-snug',
      xs: 'text-base leading-snug',
    },
  },
  defaultVariants: { size: 'section' },
});

type Level = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  /**
   * The level in the document outline (h1 to h6). Required, and independent
   * from `size`: the look never decides the structure (WCAG 1.3.1).
   */
  level: Level;
}

/** A heading whose level and size are chosen separately. */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level, size, className, ...props }, ref) => {
    const Tag = `h${level}` as ElementType;
    return <Tag ref={ref} className={cn(headingVariants({ size }), className)} {...props} />;
  }
);
Heading.displayName = 'Heading';

const textVariants = cva('', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl leading-relaxed',
    },
    tone: {
      default: 'text-ink',
      muted: 'text-muted',
      brand: 'text-brand',
      danger: 'text-danger',
      success: 'text-success',
      inherit: '',
    },
    weight: {
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      heavy: 'font-heading',
    },
    align: {
      start: '',
      center: 'text-center',
    },
    measure: {
      none: '',
      narrow: 'max-w-xl',
      normal: 'max-w-2xl',
      wide: 'max-w-3xl',
    },
  },
  defaultVariants: { size: 'md', tone: 'default', weight: 'regular', align: 'start', measure: 'none' },
});

export interface TextProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  as?: ElementType;
}

/** Body text. A <p> by default. */
export const Text = forwardRef<HTMLElement, TextProps>(
  ({ as: Tag = 'p', size, tone, weight, align, measure, className, ...props }, ref) => (
    <Tag ref={ref} className={cn(textVariants({ size, tone, weight, align, measure }), className)} {...props} />
  )
);
Text.displayName = 'Text';

export interface EyebrowProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
}

/** Short label above a heading. Plain text, not a heading. */
export const Eyebrow = forwardRef<HTMLElement, EyebrowProps>(
  ({ as: Tag = 'p', className, ...props }, ref) => (
    <Tag
      ref={ref}
      className={cn('text-sm font-heading uppercase tracking-wider text-brand', className)}
      {...props}
    />
  )
);
Eyebrow.displayName = 'Eyebrow';

/**
 * Highlighted words inside a heading or a sentence. Purely visual: it adds no
 * emphasis for assistive technologies, so it must not carry meaning alone.
 */
export const Highlight = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'box-decoration-clone rounded-sm bg-gradient-to-t from-brand-soft from-40% to-transparent to-40% px-1',
        className
      )}
      {...props}
    />
  )
);
Highlight.displayName = 'Highlight';

/**
 * Long-form content written as plain HTML (legal pages, articles): styles the
 * headings, paragraphs, lists and links it contains.
 */
export const Prose = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'max-w-3xl text-base leading-relaxed text-ink',
        '[&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-heading',
        '[&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-heading',
        '[&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mt-1',
        '[&_a]:font-semibold [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-brand-hover',
        '[&_strong]:font-bold [&_dt]:mt-4 [&_dt]:font-bold',
        className
      )}
      {...props}
    />
  )
);
Prose.displayName = 'Prose';

export interface VisuallyHiddenProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
}

/** Text read by assistive technologies but not shown: a live region, an extra label. */
export const VisuallyHidden = forwardRef<HTMLElement, VisuallyHiddenProps>(({ as: Tag = 'span', className, ...props }, ref) => (
  <Tag ref={ref} className={cn('sr-only', className)} {...props} />
));
VisuallyHidden.displayName = 'VisuallyHidden';
