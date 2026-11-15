import { useId } from 'react';
import { cn } from '../lib/cn';

export interface FieldsetProps {
  /** The question the group answers. Rendered as a <legend>. */
  legend: string;
  /** Optional helper text shown under the legend. */
  hint?: string;
  /** Error message for the group as a whole. */
  error?: string;
  /** Marks the group as required, visually and for assistive technology. */
  required?: boolean;
  /**
   * Text read by screen readers after the legend of a required group.
   * Override it to match the page language, e.g. " (obligatoire)".
   */
  requiredLabel?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Accessible group of related fields (radios, checkboxes, date parts).
 *
 * Accessibility notes:
 * - A native <fieldset> with a <legend> gives the group its name, so each
 *   option is announced with the question it answers (WCAG 1.3.1, 3.3.2).
 * - Hint and error are linked to the group with aria-describedby.
 * - The error uses role="alert" so it is announced when it appears (3.3.1).
 * - "Required" is written out for screen readers, not left to an asterisk.
 */
export function Fieldset({
  legend,
  hint,
  error,
  required,
  requiredLabel = ' (required)',
  children,
  className,
}: FieldsetProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy =
    [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined;

  return (
    <fieldset aria-describedby={describedBy} className={cn('m-0 min-w-0 border-0 p-0', className)}>
      <legend className="mb-1.5 p-0 text-sm font-medium text-gray-900">
        {legend}
        {required && (
          <>
            <span className="text-danger" aria-hidden="true">
              {' '}*
            </span>
            <span className="sr-only">{requiredLabel}</span>
          </>
        )}
      </legend>

      <div className="flex flex-col gap-2">
        {hint && (
          <p id={hintId} className="text-sm text-gray-600">
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} role="alert" className="text-sm text-danger">
            {error}
          </p>
        )}
        {children}
      </div>
    </fieldset>
  );
}
