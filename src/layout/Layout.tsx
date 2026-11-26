import { forwardRef, type ElementType, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

/*
 * Layout primitives. They carry no colour of their own except Section's tone,
 * so a page is built by composing them, never by writing CSS.
 */

type As = { as?: ElementType };

const containerVariants = cva('mx-auto w-full px-4 sm:px-6', {
  variants: {
    size: {
      narrow: 'max-w-3xl',
      prose: 'max-w-prose',
      page: 'max-w-page',
      wide: 'max-w-wide',
    },
  },
  defaultVariants: { size: 'page' },
});

export interface ContainerProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof containerVariants>,
    As {}

/** Centred column with the page gutters. */
export const Container = forwardRef<HTMLElement, ContainerProps>(
  ({ as: Tag = 'div', size, className, ...props }, ref) => (
    <Tag ref={ref} className={cn(containerVariants({ size }), className)} {...props} />
  )
);
Container.displayName = 'Container';

const sectionVariants = cva('scroll-mt-20', {
  variants: {
    space: {
      none: '',
      sm: 'py-8 sm:py-10',
      md: 'py-12 sm:py-16',
      lg: 'py-16 sm:py-24',
    },
    tone: {
      default: '',
      subtle: 'bg-surface-sunken',
      brand: 'bg-brand-subtle',
      fade: 'bg-gradient-to-b from-brand-subtle to-canvas',
      inverse: 'bg-ink text-canvas',
    },
    divided: { true: 'border-t border-line', false: '' },
  },
  defaultVariants: { space: 'md', tone: 'default', divided: false },
});

export interface SectionProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants>,
    As {}

/**
 * A band of the page. Renders a <section>: give it `aria-labelledby` pointing
 * at its heading so it becomes a named region.
 */
export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ as: Tag = 'section', space, tone, divided, className, ...props }, ref) => (
    <Tag ref={ref} className={cn(sectionVariants({ space, tone, divided }), className)} {...props} />
  )
);
Section.displayName = 'Section';

const gap = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-10',
  '2xl': 'gap-16',
} as const;
type Gap = keyof typeof gap;

export interface StackProps extends HTMLAttributes<HTMLElement>, As {
  gap?: Gap;
  align?: 'start' | 'center' | 'end' | 'stretch';
}

/** Vertical rhythm: children one under the other with a fixed gap. */
export const Stack = forwardRef<HTMLElement, StackProps>(
  ({ as: Tag = 'div', gap: g = 'md', align = 'stretch', className, ...props }, ref) => (
    <Tag
      ref={ref}
      className={cn(
        'flex flex-col',
        gap[g],
        { start: 'items-start', center: 'items-center', end: 'items-end', stretch: '' }[align],
        className
      )}
      {...props}
    />
  )
);
Stack.displayName = 'Stack';

export interface ClusterProps extends HTMLAttributes<HTMLElement>, As {
  gap?: Gap;
  justify?: 'start' | 'center' | 'end' | 'between';
  align?: 'start' | 'center' | 'end' | 'baseline';
}

/** A row that wraps: buttons, badges, links. */
export const Cluster = forwardRef<HTMLElement, ClusterProps>(
  ({ as: Tag = 'div', gap: g = 'md', justify = 'start', align = 'center', className, ...props }, ref) => (
    <Tag
      ref={ref}
      className={cn(
        'flex flex-wrap',
        gap[g],
        { start: 'justify-start', center: 'justify-center', end: 'justify-end', between: 'justify-between' }[justify],
        { start: 'items-start', center: 'items-center', end: 'items-end', baseline: 'items-baseline' }[align],
        className
      )}
      {...props}
    />
  )
);
Cluster.displayName = 'Cluster';

export interface GridProps extends HTMLAttributes<HTMLElement>, As {
  /** Columns from the `md` breakpoint up; one column below. */
  columns?: 2 | 3 | 4;
  gap?: Gap;
}

/** Equal columns that collapse to one on small screens. */
export const Grid = forwardRef<HTMLElement, GridProps>(
  ({ as: Tag = 'div', columns = 3, gap: g = 'lg', className, ...props }, ref) => (
    <Tag
      ref={ref}
      className={cn(
        'grid grid-cols-1',
        { 2: 'md:grid-cols-2', 3: 'md:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[columns],
        gap[g],
        className
      )}
      {...props}
    />
  )
);
Grid.displayName = 'Grid';

export interface SplitProps extends HTMLAttributes<HTMLElement>, As {
  /** Share of the first column from the `lg` breakpoint up. */
  ratio?: 'half' | 'wide-start' | 'wide-end';
  gap?: Gap;
  align?: 'start' | 'center';
}

/** Two columns (text and media, for example) that stack on small screens. */
export const Split = forwardRef<HTMLElement, SplitProps>(
  ({ as: Tag = 'div', ratio = 'half', gap: g = 'xl', align = 'center', className, ...props }, ref) => (
    <Tag
      ref={ref}
      className={cn(
        'grid grid-cols-1',
        {
          half: 'lg:grid-cols-2',
          'wide-start': 'lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]',
          'wide-end': 'lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]',
        }[ratio],
        gap[g],
        align === 'center' ? 'items-center' : 'items-start',
        className
      )}
      {...props}
    />
  )
);
Split.displayName = 'Split';
