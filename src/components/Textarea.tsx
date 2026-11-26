import { forwardRef, useId } from 'react';
import { cn } from '../lib/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Visible label: required for accessibility. Never use placeholder as a label. */
  label: string;
  /** Optional helper text shown below the label. */
  hint?: string;
  /** Error message. When present, the field is marked invalid and announced. */
  error?: string;
}

/**
 * Accessible multi-line text field. Same contract as `Input`.
 *
 * Accessibility notes:
 * - Label always rendered and linked via htmlFor / id (WCAG 1.3.1, 4.1.2).
 * - Hint and error linked with aria-describedby so they are announced.
 * - Errors set aria-invalid and use role="alert" (3.3.1).
 * - Resizable vertically only, so a user can enlarge it without breaking the
 *   layout horizontally (1.4.10 Reflow).
 * - When `maxLength` is set, the browser stops input at the limit; say the
 *   limit in the hint so it is not discovered by surprise (3.3.2).
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, id, required, rows = 5, className, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;
    const hintId = `${textareaId}-hint`;
    const errorId = `${textareaId}-error`;
    const describedBy =
      [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={textareaId} className="text-sm font-medium text-ink">
          {label}
          {required && (
            <span className="text-danger" aria-hidden="true">
              {' '}*
            </span>
          )}
        </label>

        {hint && (
          <p id={hintId} className="text-sm text-muted">
            {hint}
          </p>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          required={required}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            'resize-y rounded-token border bg-surface px-3 py-2 text-base',
            'focus-visible:outline-none focus-visible:ring-focus focus-visible:ring-offset-1 focus-visible:ring-brand',
            error ? 'border-danger' : 'border-line-strong',
            className
          )}
          {...props}
        />

        {error && (
          <p id={errorId} role="alert" className="text-sm text-danger">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
