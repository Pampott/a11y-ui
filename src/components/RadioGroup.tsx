import { useId, useState } from 'react';
import { Fieldset } from './Fieldset';

export interface RadioOption {
  value: string;
  label: string;
  /** Optional detail shown under the label, e.g. a price or a delay. */
  hint?: string;
}

export interface RadioGroupProps {
  /** The question the group answers. */
  legend: string;
  /** Shared name of the radio inputs, as submitted with the form. */
  name: string;
  options: RadioOption[];
  /** Controlled value. Omit to use the component uncontrolled. */
  value?: string;
  /** Initial value when uncontrolled. */
  defaultValue?: string;
  onChange?: (value: string) => void;
  hint?: string;
  error?: string;
  required?: boolean;
  /**
   * Id given to the first radio. An ErrorSummary link can point to it, so
   * following the link lands on the first option of the group.
   */
  id?: string;
  className?: string;
}

/**
 * Accessible group of radio buttons.
 *
 * Accessibility notes:
 * - Native radio inputs sharing a name: arrow keys move between options and
 *   the group is a single tab stop, with no script involved (WCAG 2.1.1).
 * - Wrapped in a Fieldset, so every option is announced with its question.
 * - Each option has its own <label>; the label is part of the click target,
 *   which keeps the target well above 24 px (2.5.8).
 * - Per-option hints are linked with aria-describedby instead of being merged
 *   into the label.
 */
export function RadioGroup({
  legend,
  name,
  options,
  value,
  defaultValue,
  onChange,
  hint,
  error,
  required,
  id,
  className,
}: RadioGroupProps) {
  const generatedId = useId();
  const baseId = id ?? generatedId;
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = value !== undefined;
  const selected = isControlled ? value : internal;

  return (
    <Fieldset legend={legend} hint={hint} error={error} required={required} className={className}>
      {options.map((option, index) => {
        const optionId = index === 0 ? baseId : `${baseId}-${index}`;
        const optionHintId = `${optionId}-hint`;
        return (
          <div key={option.value} className="flex items-start gap-3">
            <input
              type="radio"
              id={optionId}
              name={name}
              value={option.value}
              checked={selected === option.value}
              required={required}
              aria-describedby={option.hint ? optionHintId : undefined}
              onChange={() => {
                if (!isControlled) setInternal(option.value);
                onChange?.(option.value);
              }}
              className="mt-0.5 h-5 w-5 shrink-0 accent-brand focus-visible:outline-none focus-visible:ring-focus focus-visible:ring-brand focus-visible:ring-offset-2"
            />
            <div className="flex flex-col">
              <label htmlFor={optionId} className="text-base text-gray-900">
                {option.label}
              </label>
              {option.hint && (
                <span id={optionHintId} className="text-sm text-gray-600">
                  {option.hint}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </Fieldset>
  );
}
