import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';

function Tick({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 20 20" className={className}>
      <path d="M5 10.5 8.5 14 15 6.5" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  /** Spoken label. Leave empty when the progress is announced elsewhere. */
  label?: string;
  size?: 'sm' | 'md';
}

/** A turning ring. Stops after one turn when motion is reduced, by the preset's guard. */
export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(({ label, size = 'md', className, ...props }, ref) => (
  <span
    ref={ref}
    role={label ? 'status' : undefined}
    aria-hidden={label ? undefined : true}
    className={cn('inline-flex', className)}
    {...props}
  >
    <span
      className={cn(
        'inline-block animate-spin rounded-full border-[3px] border-brand-soft border-t-brand',
        size === 'sm' ? 'h-5 w-5' : 'h-7 w-7'
      )}
    />
    {label && <span className="sr-only">{label}</span>}
  </span>
));
Spinner.displayName = 'Spinner';

export type ProgressState = 'done' | 'active' | 'todo';

export interface ProgressItem {
  id: string;
  title: ReactNode;
  detail?: ReactNode;
  state: ProgressState;
}

export interface ProgressListProps extends HTMLAttributes<HTMLOListElement> {
  items: ProgressItem[];
  /** Hidden text added after a finished item ("terminé"), so the state is not shown by the icon alone. */
  doneLabel: string;
  /** `stack`: one under the other with details ; `inline`: a row of numbered steps. */
  layout?: 'stack' | 'inline';
}

/**
 * The stages of a running task. An ordered list; the active item carries
 * aria-current="step" and finished items say so in hidden text (WCAG 1.3.1,
 * 1.4.1). It does not announce changes: pair it with a live region.
 */
export const ProgressList = forwardRef<HTMLOListElement, ProgressListProps>(
  ({ items, doneLabel, layout = 'stack', className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn(layout === 'inline' ? 'flex flex-wrap items-center gap-x-6 gap-y-3' : 'flex flex-col gap-3', className)}
      {...props}
    >
      {items.map((item, index) => (
        <li
          key={item.id}
          aria-current={item.state === 'active' ? 'step' : undefined}
          className={cn('flex gap-3', layout === 'inline' ? 'items-center' : 'items-start', item.state === 'todo' && 'text-muted')}
        >
          <span
            aria-hidden="true"
            className={cn(
              'inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-heading',
              item.state === 'done' && 'bg-success text-on-brand',
              item.state === 'active' && (layout === 'inline' ? 'bg-brand text-on-brand' : ''),
              item.state === 'todo' && 'border-2 border-line-strong'
            )}
          >
            {item.state === 'done' ? (
              <Tick className="h-4 w-4" />
            ) : item.state === 'active' && layout === 'stack' ? (
              <Spinner />
            ) : layout === 'inline' ? (
              index + 1
            ) : null}
          </span>
          <span className="min-w-0">
            <span className={cn('block', item.state !== 'todo' && 'font-bold text-ink')}>
              {item.title}
              {item.state === 'done' && <span className="sr-only"> {doneLabel}</span>}
            </span>
            {item.detail && <span className="block text-muted">{item.detail}</span>}
          </span>
        </li>
      ))}
    </ol>
  )
);
ProgressList.displayName = 'ProgressList';

export type CheckStatus = 'pass' | 'fail' | 'neutral';

export interface CheckItem {
  id: string;
  label: ReactNode;
  status: CheckStatus;
  /** The status in words ("conforme", "à corriger"): always shown, never colour alone. */
  statusLabel: ReactNode;
}

export interface CheckFeedProps extends HTMLAttributes<HTMLUListElement> {
  items: CheckItem[];
  /** Animate each new line in. */
  animate?: boolean;
}

/** Results of checks, one per line, with an icon and the status written out. */
export const CheckFeed = forwardRef<HTMLUListElement, CheckFeedProps>(({ items, animate = true, className, ...props }, ref) => (
  <ul ref={ref} className={cn('divide-y-2 divide-line rounded-card border-2 border-line bg-surface', className)} {...props}>
    {items.map((item) => (
      <li key={item.id} className={cn('flex items-center gap-3 px-4 py-2.5', animate && 'animate-rise-in')}>
        <span
          aria-hidden="true"
          className={cn(
            'inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
            animate && 'animate-pop-in',
            { pass: 'bg-success-subtle text-success', fail: 'bg-danger-subtle text-danger', neutral: 'bg-surface-sunken text-muted' }[item.status]
          )}
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" focusable="false">
            <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              {item.status === 'pass' ? <path d="M5 10.5 8.5 14 15 6.5" /> : item.status === 'fail' ? <path d="M6 6l8 8M14 6l-8 8" /> : <path d="M6 10h8" />}
            </g>
          </svg>
        </span>
        <span className="min-w-0 flex-1 text-ink">{item.label}</span>
        <span
          className={cn(
            'shrink-0 text-sm font-bold',
            { pass: 'text-success', fail: 'text-danger', neutral: 'text-muted' }[item.status]
          )}
        >
          {item.statusLabel}
        </span>
      </li>
    ))}
  </ul>
));
CheckFeed.displayName = 'CheckFeed';

export interface CodeSkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Width of each line, in percent. */
  lines?: number[];
  /** A light beam moving down, to show work in progress. */
  scanning?: boolean;
}

/** Decorative lines of "code", hidden from assistive technologies. */
export const CodeSkeleton = forwardRef<HTMLDivElement, CodeSkeletonProps>(
  ({ lines = [72, 48, 86, 60, 78, 40], scanning = true, className, ...props }, ref) => (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn('relative flex flex-col gap-2.5 overflow-hidden rounded-token border-2 border-line bg-surface-sunken p-4', className)}
      {...props}
    >
      {lines.map((width, i) => (
        <span key={i} className="block h-2.5 rounded-full bg-brand-soft" style={{ width: `${width}%` }} />
      ))}
      {scanning && (
        <span className="pointer-events-none absolute inset-x-0 top-0 h-1/4 animate-sweep bg-gradient-to-b from-transparent via-brand/15 to-transparent" />
      )}
    </div>
  )
);
CodeSkeleton.displayName = 'CodeSkeleton';
