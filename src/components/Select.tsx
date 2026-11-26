import { forwardRef, useId } from 'react';
import { cn } from '../lib/cn';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Visible label, linked to the select. Required. */
  label: string;
  options: SelectOption[];
  /** Text of an empty first option, e.g. "Choose a country". */
  placeholder?: string;
  /** Optional helper text shown below the label. */
  hint?: string;
  /** Error message. When present, the select is marked invalid and announced. */
  error?: string;
}

/**
 * Accessible select, built on the native <select>.
 *
 * Accessibility notes:
 * - The native element is kept on purpose: it brings keyboard support,
 *   type-ahead, and the platform picker on mobile. A custom listbox is only
 *   worth its cost when options need filtering (see Combobox).
 * - Label linked with for / id (WCAG 1.3.1, 4.1.2).
 * - Hint and error linked with aria-describedby; errors set aria-invalid and
 *   use role="alert" (3.3.1).
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, placeholder, hint, error, id, required, className, ...props }, ref) => {
    const generatedId = useId();
    const selectId = id ?? generatedId;
    const hintId = `${selectId}-hint`;
    const errorId = `${selectId}-error`;
    const describedBy =
      [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={selectId} className="text-sm font-medium text-ink">
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

        <select
          ref={ref}
          id={selectId}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            'h-10 rounded-token border bg-surface px-3 text-base',
            'focus-visible:outline-none focus-visible:ring-focus focus-visible:ring-offset-1 focus-visible:ring-brand',
            error ? 'border-danger' : 'border-line-strong',
            className
          )}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {error && (
          <p id={errorId} role="alert" className="text-sm text-danger">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
