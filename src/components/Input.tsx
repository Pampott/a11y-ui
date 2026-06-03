import { forwardRef, useId } from 'react';
import { cn } from '../lib/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Visible label — required for accessibility. Never use placeholder as a label. */
  label: string;
  /** Optional helper text shown below the field. */
  hint?: string;
  /** Error message. When present, the field is marked invalid and announced. */
  error?: string;
}

/**
 * Accessible text input.
 *
 * Accessibility notes:
 * - Label is always rendered and linked via htmlFor / id (WCAG 1.3.1, 4.1.2).
 * - Hint and error are linked with aria-describedby so they are announced.
 * - Errors set aria-invalid and use role="alert" for live announcement.
 * - Required fields are marked with aria-required, not just a visual asterisk.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, id, required, className, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const hintId = `${inputId}-hint`;
    const errorId = `${inputId}-error`;

    const describedBy = [hint ? hintId : null, error ? errorId : null]
      .filter(Boolean)
      .join(' ') || undefined;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-gray-900">
          {label}
          {required && (
            <span className="text-danger" aria-hidden="true">
              {' '}*
            </span>
          )}
        </label>

        {hint && (
          <p id={hintId} className="text-sm text-gray-600">
            {hint}
          </p>
        )}

        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            'h-10 rounded-token border px-3 text-base',
            'focus-visible:outline-none focus-visible:ring-focus focus-visible:ring-offset-1 focus-visible:ring-brand',
            error ? 'border-danger' : 'border-gray-400',
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

Input.displayName = 'Input';
