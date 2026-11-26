import { forwardRef, useId } from 'react';
import { cn } from '../lib/cn';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Visible label, linked to the checkbox. Required. */
  label: string;
  /** Optional helper text shown under the label. */
  hint?: string;
  /** Error message. When present, the checkbox is marked invalid and announced. */
  error?: string;
  /**
   * Text read by screen readers after the label of a required checkbox.
   * Override it to match the page language, e.g. " (obligatoire)".
   */
  requiredLabel?: string;
}

/**
 * Accessible checkbox.
 *
 * Accessibility notes:
 * - A native <input type="checkbox">: Space toggles it and its state is
 *   announced without any ARIA (WCAG 4.1.2).
 * - The label is linked with for / id and is part of the click target (2.5.8).
 * - Hint and error are linked with aria-describedby; errors set aria-invalid
 *   and use role="alert" (3.3.1).
 * - To group several checkboxes under one question, wrap them in a Fieldset.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { label, hint, error, id, required, requiredLabel = ' (required)', className, ...props },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const hintId = `${inputId}-hint`;
    const errorId = `${inputId}-error`;
    const describedBy =
      [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined;

    return (
      <div className={cn('flex flex-col gap-1.5', className)}>
        <div className="flex items-start gap-3">
          <input
            ref={ref}
            type="checkbox"
            id={inputId}
            required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className="mt-0.5 h-5 w-5 shrink-0 accent-brand focus-visible:outline-none focus-visible:ring-focus focus-visible:ring-brand focus-visible:ring-offset-2"
            {...props}
          />
          <div className="flex flex-col">
            <label htmlFor={inputId} className="text-base text-ink">
              {label}
              {required && (
                <>
                  <span className="text-danger" aria-hidden="true">
                    {' '}*
                  </span>
                  <span className="sr-only">{requiredLabel}</span>
                </>
              )}
            </label>
            {hint && (
              <span id={hintId} className="text-sm text-muted">
                {hint}
              </span>
            )}
          </div>
        </div>
        {error && (
          <p id={errorId} role="alert" className="text-sm text-danger">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
