import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const listVariants = cva('', {
  variants: {
    variant: {
      bullet: 'list-disc space-y-2 pl-5 marker:text-brand',
      check: 'space-y-2',
      boxed: 'grid gap-3',
      divided: 'divide-y-2 divide-line',
      plain: 'space-y-2',
    },
  },
  defaultVariants: { variant: 'bullet' },
});

export interface ListProps
  extends Omit<HTMLAttributes<HTMLUListElement | HTMLOListElement>, 'children'>,
    VariantProps<typeof listVariants> {
  items: ReactNode[];
  ordered?: boolean;
}

/** A list of short items. `check` adds a decorative tick before each one. */
export const List = forwardRef<HTMLUListElement, ListProps>(
  ({ items, ordered, variant, className, ...props }, ref) => {
    const Tag = ordered ? 'ol' : 'ul';
    return (
      <Tag ref={ref as never} className={cn(listVariants({ variant }), className)} {...props}>
        {items.map((item, i) => (
          <li
            key={i}
            className={cn(
              variant === 'check' && 'flex gap-3',
              variant === 'boxed' && 'rounded-card border-2 border-line bg-surface px-4 py-3',
              variant === 'divided' && 'py-3 first:pt-0 last:pb-0'
            )}
          >
            {variant === 'check' && (
              <span
                aria-hidden="true"
                className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success-subtle text-xs font-bold text-success"
              >
                ✓
              </span>
            )}
            {variant === 'check' ? <span>{item}</span> : item}
          </li>
        ))}
      </Tag>
    );
  }
);
List.displayName = 'List';

export interface DescriptionItem {
  term: ReactNode;
  description: ReactNode;
}

export interface StatListProps extends HTMLAttributes<HTMLDListElement> {
  items: DescriptionItem[];
  columns?: 2 | 3 | 4;
}

/**
 * Key figures: a big value and its label. Built on <dl>, the value in <dd>
 * after its label in <dt>, so the pair is read in a meaningful order.
 */
export const StatList = forwardRef<HTMLDListElement, StatListProps>(
  ({ items, columns = 3, className, ...props }, ref) => (
    <dl
      ref={ref}
      className={cn(
        'grid grid-cols-1 gap-4',
        { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[columns],
        className
      )}
      {...props}
    >
      {items.map((item, i) => (
        <div key={i} className="flex flex-col-reverse gap-1 rounded-card border-2 border-line bg-surface p-5">
          <dt className="text-sm text-muted">{item.term}</dt>
          <dd className="font-display text-3xl font-heading text-ink">{item.description}</dd>
        </div>
      ))}
    </dl>
  )
);
StatList.displayName = 'StatList';

export interface DefinitionListProps extends HTMLAttributes<HTMLDListElement> {
  items: DescriptionItem[];
}

/** Label and value pairs, side by side from the `sm` breakpoint up. */
export const DefinitionList = forwardRef<HTMLDListElement, DefinitionListProps>(
  ({ items, className, ...props }, ref) => (
    <dl ref={ref} className={cn('divide-y-2 divide-line', className)} {...props}>
      {items.map((item, i) => (
        <div key={i} className="grid gap-1 py-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:gap-6">
          <dt className="font-bold text-ink">{item.term}</dt>
          <dd className="text-muted">{item.description}</dd>
        </div>
      ))}
    </dl>
  )
);
DefinitionList.displayName = 'DefinitionList';

export interface StepListItem {
  title: ReactNode;
  description?: ReactNode;
  /** Small label above the title (a date, a duration). */
  meta?: ReactNode;
}

export interface StepListProps extends HTMLAttributes<HTMLOListElement> {
  items: StepListItem[];
  /** `numbered`: big numbers in a row ; `timeline`: a vertical line with dots. */
  variant?: 'numbered' | 'timeline';
  /** Heading level of each step's title. */
  titleLevel?: 3 | 4;
}

/**
 * An ordered process. An <ol>, so the order is conveyed to screen readers; the
 * visible numbers are decorative duplicates of the list numbering.
 */
export const StepList = forwardRef<HTMLOListElement, StepListProps>(
  ({ items, variant = 'numbered', titleLevel = 3, className, ...props }, ref) => {
    const Title = `h${titleLevel}` as 'h3';
    if (variant === 'timeline') {
      return (
        <ol ref={ref} className={cn('relative space-y-8 border-l-2 border-seam pl-8', className)} {...props}>
          {items.map((item, i) => (
            <li key={i} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[2.55rem] top-1 h-4 w-4 rounded-full border-4 border-canvas bg-brand"
              />
              {item.meta && <p className="text-sm font-bold text-brand">{item.meta}</p>}
              <Title className="font-display text-lg font-heading text-ink">{item.title}</Title>
              {item.description && <div className="mt-1 text-muted">{item.description}</div>}
            </li>
          ))}
        </ol>
      );
    }
    return (
      <ol
        ref={ref}
        className={cn('grid grid-cols-1 gap-6 md:grid-flow-col md:auto-cols-fr', className)}
        {...props}
      >
        {items.map((item, i) => (
          <li key={i} className="relative">
            <span
              aria-hidden="true"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-subtle font-display text-lg font-heading text-brand"
            >
              {i + 1}
            </span>
            {item.meta && <p className="mt-4 text-sm font-bold text-brand">{item.meta}</p>}
            <Title className={cn('font-display text-lg font-heading text-ink', item.meta ? 'mt-1' : 'mt-4')}>
              {item.title}
            </Title>
            {item.description && <div className="mt-2 text-muted">{item.description}</div>}
          </li>
        ))}
      </ol>
    );
  }
);
StepList.displayName = 'StepList';
