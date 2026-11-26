import { useEffect, useId, useRef } from 'react';
import { cn } from '../lib/cn';

export interface ErrorSummaryItem {
  /** Id of the field the error belongs to. The link moves focus to it. */
  fieldId: string;
  message: string;
}

export interface ErrorSummaryProps {
  errors: ErrorSummaryItem[];
  /** Heading of the summary. */
  title?: string;
  className?: string;
}

/**
 * Accessible error summary, shown at the top of a form after a failed submit.
 *
 * Accessibility notes:
 * - Focus moves to the summary when errors appear, so keyboard and
 *   screen-reader users learn that the submit failed and how many problems
 *   there are, instead of being left on the submit button (WCAG 3.3.1).
 * - The content sits in a role="alert" region so it is announced.
 * - Each error is a link that moves focus to its field (2.4.3), and the
 *   message says how to fix the value (3.3.3).
 * - Renders nothing when there are no errors.
 */
export function ErrorSummary({
  errors,
  title = 'There is a problem',
  className,
}: ErrorSummaryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const signature = errors.map((error) => `${error.fieldId}:${error.message}`).join('|');

  useEffect(() => {
    if (signature) ref.current?.focus();
  }, [signature]);

  if (errors.length === 0) return null;

  return (
    <div
      ref={ref}
      tabIndex={-1}
      className={cn(
        'rounded-token border-2 border-danger p-4',
        'focus:outline-none focus:ring-focus focus:ring-danger focus:ring-offset-2',
        className
      )}
    >
      <div role="alert" aria-labelledby={titleId}>
        <h2 id={titleId} className="mb-2 text-lg font-semibold text-ink">
          {title}
        </h2>
        <ul className="flex list-disc flex-col gap-1 pl-5">
          {errors.map((error) => (
            <li key={error.fieldId}>
              <a
                href={`#${error.fieldId}`}
                className="rounded text-danger underline focus-visible:outline-none focus-visible:ring-focus focus-visible:ring-brand"
                onClick={(event) => {
                  const field = document.getElementById(error.fieldId);
                  if (!field) return;
                  event.preventDefault();
                  field.focus();
                }}
              >
                {error.message}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
