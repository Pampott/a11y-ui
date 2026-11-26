import { Fragment, forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const listVariants = cva('', {
  variants: {
    variant: {
      bullet: 'list-disc space-y-2 pl-5 marker:text-brand',
      numbered: 'list-decimal space-y-2 pl-6 marker:font-bold marker:text-brand',
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
  /** StatList only: a coloured left edge. Decorative, so say the meaning in the term. */
  tone?: 'brand' | 'success' | 'danger' | 'neutral';
}

export interface StatListProps extends HTMLAttributes<HTMLDListElement> {
  items: DescriptionItem[];
  columns?: 2 | 3 | 4;
  /** `card`: framed tiles ; `compact`: smaller tiles on a sunken background. */
  variant?: 'card' | 'compact';
}

/**
 * Key figures: a big value and its label. Built on <dl>, the value in <dd>
 * after its label in <dt>, so the pair is read in a meaningful order.
 */
export const StatList = forwardRef<HTMLDListElement, StatListProps>(
  ({ items, columns = 3, variant = 'card', className, ...props }, ref) => (
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
        <div
          key={i}
          className={cn(
            'flex flex-col-reverse gap-1',
            variant === 'card' ? 'rounded-card border-2 border-line bg-surface p-5' : 'rounded-token bg-surface-sunken p-3',
            item.tone && 'border-l-4',
            item.tone &&
              { brand: 'border-l-brand', success: 'border-l-success', danger: 'border-l-danger', neutral: 'border-l-line-strong' }[item.tone]
          )}
        >
          <dt className={cn(variant === 'card' ? 'text-sm text-muted' : 'text-base text-ink')}>{item.term}</dt>
          <dd className={cn('font-display font-heading leading-none text-ink', variant === 'card' ? 'text-3xl' : 'text-2xl')}>
            {item.description}
          </dd>
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

export interface Fact {
  figure: ReactNode;
  text: ReactNode;
  source?: ReactNode;
}

export interface FactListProps extends HTMLAttributes<HTMLUListElement> {
  items: Fact[];
}

/** Figures with what they mean and where they come from, one per row, separated by rules. */
export const FactList = forwardRef<HTMLUListElement, FactListProps>(({ items, className, ...props }, ref) => (
  <ul ref={ref} className={cn('divide-y-2 divide-line border-y-2 border-line', className)} {...props}>
    {items.map((item, i) => (
      <li key={i} className="grid gap-x-8 gap-y-1 py-5 sm:grid-cols-[11rem_minmax(0,1fr)]">
        <strong className="font-display text-3xl font-heading leading-tight text-brand sm:text-4xl">{item.figure}</strong>
        <p className="text-lg text-ink">
          {item.text}
          {item.source && <span className="block pt-1 text-sm text-muted">{item.source}</span>}
        </p>
      </li>
    ))}
  </ul>
));
FactList.displayName = 'FactList';

export interface AlternativesProps extends HTMLAttributes<HTMLDivElement> {
  items: Fact[];
  /** The word between two options ("ou"). It is real text, read between them. */
  separator: string;
}

/** Options of which one is enough, set side by side with the separator word between them. */
export const Alternatives = forwardRef<HTMLDivElement, AlternativesProps>(({ items, separator, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('grid items-center gap-3 md:grid-flow-col md:auto-cols-[minmax(0,1fr)_auto]', className)}
    {...props}
  >
    {items.map((item, i) => (
      <Fragment key={i}>
        {i > 0 && (
          <p className="justify-self-center rounded-full bg-brand px-4 py-1 font-display text-lg font-heading text-on-brand">{separator}</p>
        )}
        <p className="h-full rounded-card border-2 border-line bg-surface p-6 text-lg text-ink">
          <strong className="block font-display text-4xl font-heading leading-tight text-brand">{item.figure}</strong> {item.text}
        </p>
      </Fragment>
    ))}
  </div>
));
Alternatives.displayName = 'Alternatives';
