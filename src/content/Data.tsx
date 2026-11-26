import { forwardRef, useId, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface DataTableColumn<Row> {
  key: string;
  header: ReactNode;
  cell: (row: Row) => ReactNode;
  /** The column that names each row: rendered as a row header (<th scope="row">). */
  rowHeader?: boolean;
  align?: 'start' | 'end';
}

export interface DataTableProps<Row> {
  caption: ReactNode;
  /** Show the caption, or keep it for assistive technologies only. */
  captionVisible?: boolean;
  columns: DataTableColumn<Row>[];
  rows: Row[];
  rowKey: (row: Row, index: number) => string;
  className?: string;
}

/**
 * A data table with a caption and real header cells. On a narrow screen it
 * scrolls sideways inside a focusable, named region, so a keyboard user can
 * scroll it too (WCAG 1.4.10, 2.1.1).
 */
export function DataTable<Row>({
  caption,
  captionVisible = true,
  columns,
  rows,
  rowKey,
  className,
}: DataTableProps<Row>) {
  const captionId = useId();
  return (
    <div
      role="region"
      aria-labelledby={captionId}
      tabIndex={0}
      className={cn(
        'overflow-x-auto rounded-card border-2 border-line bg-surface',
        'focus-visible:outline-none focus-visible:ring-focus focus-visible:ring-brand',
        className
      )}
    >
      <table className="w-full border-collapse text-left text-sm">
        <caption
          id={captionId}
          className={cn(captionVisible ? 'px-4 pb-2 pt-4 text-left font-heading text-ink' : 'sr-only')}
        >
          {caption}
        </caption>
        <thead className="bg-surface-sunken">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={cn('px-4 py-3 font-bold text-ink', col.align === 'end' && 'text-right')}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y-2 divide-line">
          {rows.map((row, i) => (
            <tr key={rowKey(row, i)}>
              {columns.map((col) => {
                const Cell = col.rowHeader ? 'th' : 'td';
                return (
                  <Cell
                    key={col.key}
                    scope={col.rowHeader ? 'row' : undefined}
                    className={cn(
                      'px-4 py-3 align-top',
                      col.rowHeader ? 'font-bold text-ink' : 'text-muted',
                      col.align === 'end' && 'text-right'
                    )}
                  >
                    {col.cell(row)}
                  </Cell>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export interface CodeBlockProps extends HTMLAttributes<HTMLElement> {
  code: string;
  /** Names the block for screen readers ("Code avant correction"). */
  label: string;
  tone?: 'neutral' | 'danger' | 'success';
}

/** Preformatted code in a focusable region that scrolls sideways when needed. */
export const CodeBlock = forwardRef<HTMLElement, CodeBlockProps>(
  ({ code, label, tone = 'neutral', className, ...props }, ref) => (
    <figure ref={ref} className={cn('min-w-0', className)} {...props}>
      <figcaption className="mb-2 text-sm font-bold text-ink">{label}</figcaption>
      <pre
        tabIndex={0}
        className={cn(
          'overflow-x-auto rounded-token border-2 p-4 font-mono text-sm leading-relaxed',
          'focus-visible:outline-none focus-visible:ring-focus focus-visible:ring-brand',
          {
            neutral: 'border-line bg-surface-sunken text-ink',
            danger: 'border-danger/40 bg-danger-subtle text-ink',
            success: 'border-success/40 bg-success-subtle text-ink',
          }[tone]
        )}
      >
        <code>{code}</code>
      </pre>
    </figure>
  )
);
CodeBlock.displayName = 'CodeBlock';

export interface DisclosureProps extends Omit<HTMLAttributes<HTMLDetailsElement>, 'title'> {
  summary: ReactNode;
  defaultOpen?: boolean;
}

/**
 * Show-and-hide built on <details> and <summary>: keyboard and screen-reader
 * support come from the browser, and it works before JavaScript loads.
 */
export const Disclosure = forwardRef<HTMLDetailsElement, DisclosureProps>(
  ({ summary, defaultOpen, className, children, ...props }, ref) => (
    <details
      ref={ref}
      open={defaultOpen}
      className={cn('group rounded-card border-2 border-line bg-surface', className)}
      {...props}
    >
      <summary
        className={cn(
          'flex cursor-pointer list-none items-center justify-between gap-4 rounded-card px-4 py-3 font-bold text-ink',
          '[&::-webkit-details-marker]:hidden',
          'focus-visible:outline-none focus-visible:ring-focus focus-visible:ring-brand'
        )}
      >
        {summary}
        <span
          aria-hidden="true"
          className="text-brand transition-transform duration-base ease-standard group-open:rotate-180"
        >
          ▾
        </span>
      </summary>
      <div className="border-t-2 border-line px-4 py-4">{children}</div>
    </details>
  )
);
Disclosure.displayName = 'Disclosure';

export interface PriceProps extends Omit<HTMLAttributes<HTMLParagraphElement>, 'prefix'> {
  amount: ReactNode;
  /** Text before the amount ("à partir de"). */
  prefix?: ReactNode;
  /** Text after the amount ("HT", "par mois"). */
  suffix?: ReactNode;
  size?: 'md' | 'lg';
}

/** A price on one line, the amount set large. */
export const Price = forwardRef<HTMLParagraphElement, PriceProps>(
  ({ amount, prefix, suffix, size = 'lg', className, ...props }, ref) => (
    <p ref={ref} className={cn('flex flex-wrap items-baseline gap-x-2 text-muted', className)} {...props}>
      {prefix && <span className="text-sm">{prefix}</span>}
      <span
        className={cn(
          'font-display font-heading text-ink',
          size === 'lg' ? 'text-4xl sm:text-5xl' : 'text-2xl'
        )}
      >
        {amount}
      </span>
      {suffix && <span className="text-sm">{suffix}</span>}
    </p>
  )
);
Price.displayName = 'Price';

export interface ProgressRingProps extends HTMLAttributes<HTMLDivElement> {
  /** 0 to 100. */
  value: number;
  /** Text shown in the centre (defaults to the value). */
  display?: ReactNode;
  /** What the value measures, read by screen readers with the value. */
  label: string;
  tone?: 'brand' | 'success' | 'warning' | 'danger';
  size?: 'md' | 'lg';
}

/**
 * A score drawn as a ring. The ring is decorative; the value and its label are
 * written out for screen readers, as an image with a text alternative.
 */
export const ProgressRing = forwardRef<HTMLDivElement, ProgressRingProps>(
  ({ value, display, label, tone = 'brand', size = 'md', className, ...props }, ref) => {
    const clamped = Math.max(0, Math.min(100, value));
    const radius = 42;
    const circumference = 2 * Math.PI * radius;
    return (
      <div
        ref={ref}
        role="img"
        aria-label={`${label} : ${display ?? clamped}`}
        className={cn('relative inline-flex shrink-0', size === 'lg' ? 'h-32 w-32' : 'h-24 w-24', className)}
        {...props}
      >
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
          <circle cx="50" cy="50" r={radius} fill="none" strokeWidth="9" className="stroke-brand-soft" />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - clamped / 100)}
            className={cn(
              'transition-[stroke-dashoffset] duration-slow ease-emphasized',
              { brand: 'stroke-brand', success: 'stroke-success', warning: 'stroke-warning', danger: 'stroke-danger' }[tone]
            )}
          />
        </svg>
        <span
          aria-hidden="true"
          className={cn(
            'absolute inset-0 flex items-center justify-center font-display font-heading text-ink',
            size === 'lg' ? 'text-3xl' : 'text-2xl'
          )}
        >
          {display ?? clamped}
        </span>
      </div>
    );
  }
);
ProgressRing.displayName = 'ProgressRing';
