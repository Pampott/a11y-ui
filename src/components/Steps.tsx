import { cn } from '../lib/cn';

export interface StepItem {
  id: string;
  label: string;
  /** When set, a completed step is a link back to it. */
  href?: string;
}

export interface StepsProps {
  /** Accessible name of the navigation, e.g. "Checkout progress". */
  label: string;
  steps: StepItem[];
  /** Id of the step the user is on. */
  current: string;
  /** Hidden prefix of a completed step, for screen readers. Defaults to "Completed". */
  completedLabel?: string;
  className?: string;
}

/**
 * Accessible progress indicator for a multi-step flow such as a checkout.
 *
 * Accessibility notes:
 * - A <nav> with a name, containing an ordered list: screen readers announce
 *   the number of steps and the position of each one (WCAG 1.3.1).
 * - The current step carries aria-current="step" (4.1.2).
 * - Completed steps say "Completed" in text for screen readers and show a
 *   check mark; the current step is bold and underlined. State never relies
 *   on colour alone (1.4.1).
 * - Only completed steps are links. Upcoming steps are plain text, so nothing
 *   focusable leads nowhere (2.4.3).
 */
export function Steps({ label, steps, current, completedLabel = 'Completed', className }: StepsProps) {
  const currentIndex = steps.findIndex((step) => step.id === current);

  return (
    <nav aria-label={label} className={className}>
      <ol className="flex flex-wrap items-center gap-x-6 gap-y-2">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          const marker = (
            <span
              aria-hidden="true"
              className={cn(
                'inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold',
                isCompleted && 'border-success bg-success text-on-brand',
                isCurrent && 'border-brand text-brand',
                !isCompleted && !isCurrent && 'border-line-strong text-muted'
              )}
            >
              {isCompleted ? '✓' : index + 1}
            </span>
          );

          return (
            <li key={step.id} className="flex items-center gap-2 text-base">
              {marker}
              {isCompleted && step.href ? (
                <a
                  href={step.href}
                  className="rounded text-ink underline focus-visible:outline-none focus-visible:ring-focus focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  <span className="sr-only">{completedLabel}: </span>
                  {step.label}
                </a>
              ) : (
                <span
                  aria-current={isCurrent ? 'step' : undefined}
                  className={cn(
                    isCurrent && 'border-b-2 border-brand font-semibold text-ink',
                    !isCurrent && 'text-muted'
                  )}
                >
                  {isCompleted && <span className="sr-only">{completedLabel}: </span>}
                  {step.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
