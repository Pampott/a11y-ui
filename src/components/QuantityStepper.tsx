import { useId, useState } from 'react';
import { cn } from '../lib/cn';

export interface QuantityStepperProps {
  /** Visible label of the field. */
  label?: string;
  /**
   * Name of the item the quantity applies to. Added to the accessible names so
   * several steppers on one page stay distinguishable.
   */
  itemName?: string;
  /** Controlled value. Omit to use the component uncontrolled. */
  value?: number;
  /** Initial value when uncontrolled. */
  defaultValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  className?: string;
}

const buttonClass = cn(
  'inline-flex h-10 w-10 items-center justify-center border border-line-strong text-xl text-ink',
  'focus-visible:outline-none focus-visible:ring-focus focus-visible:ring-brand focus-visible:ring-offset-1',
  'aria-disabled:cursor-not-allowed aria-disabled:opacity-50'
);

/**
 * Accessible quantity stepper (minus button, field, plus button).
 *
 * Accessibility notes:
 * - Both buttons are real <button>s whose names state the action and the item
 *   (WCAG 4.1.2); the minus and plus signs are decorative.
 * - The field is a text input with inputmode="numeric" rather than
 *   type="number": it can be typed into, gets the numeric keypad on mobile,
 *   and avoids accidental changes on scroll.
 * - At a bound, the button is aria-disabled instead of disabled, so it keeps
 *   keyboard focus instead of dropping it to the top of the page (2.4.3).
 * - A polite live region announces the new quantity after a button press,
 *   which a silent value change would not do (4.1.3).
 * - Buttons are 40 px targets (2.5.8).
 */
export function QuantityStepper({
  label = 'Quantity',
  itemName,
  value,
  defaultValue = 1,
  min = 1,
  max = 99,
  onChange,
  className,
}: QuantityStepperProps) {
  const inputId = useId();
  const [internal, setInternal] = useState(defaultValue);
  const [draft, setDraft] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState('');
  const isControlled = value !== undefined;
  const quantity = isControlled ? value : internal;
  const suffix = itemName ? ` of ${itemName}` : '';
  const atMin = quantity <= min;
  const atMax = quantity >= max;

  const commit = (next: number, announce: boolean) => {
    const clamped = Math.min(max, Math.max(min, next));
    if (!isControlled) setInternal(clamped);
    if (clamped !== quantity) onChange?.(clamped);
    if (announce) {
      const bound =
        clamped === min ? ' Minimum reached.' : clamped === max ? ' Maximum reached.' : '';
      setAnnouncement(`${label}${suffix}: ${clamped}.${bound}`);
    }
  };

  const commitDraft = () => {
    if (draft === null) return;
    const parsed = Number.parseInt(draft, 10);
    setDraft(null);
    if (!Number.isNaN(parsed)) commit(parsed, false);
  };

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={inputId} className="text-sm font-medium text-ink">
        {label}
        {itemName && <span className="sr-only">{suffix}</span>}
      </label>

      <div className="inline-flex items-center">
        <button
          type="button"
          aria-label={`Decrease quantity${suffix}`}
          aria-disabled={atMin || undefined}
          onClick={() => !atMin && commit(quantity - 1, true)}
          className={cn(buttonClass, 'rounded-l-token')}
        >
          <span aria-hidden="true">−</span>
        </button>
        <input
          id={inputId}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="off"
          value={draft ?? String(quantity)}
          onChange={(event) => setDraft(event.target.value.replace(/\D/g, ''))}
          onBlur={commitDraft}
          onKeyDown={(event) => {
            if (event.key === 'Enter') commitDraft();
          }}
          className="h-10 w-14 border-y border-line-strong text-center text-base focus-visible:outline-none focus-visible:ring-focus focus-visible:ring-brand"
        />
        <button
          type="button"
          aria-label={`Increase quantity${suffix}`}
          aria-disabled={atMax || undefined}
          onClick={() => !atMax && commit(quantity + 1, true)}
          className={cn(buttonClass, 'rounded-r-token')}
        >
          <span aria-hidden="true">+</span>
        </button>
      </div>

      <span role="status" className="sr-only">
        {announcement}
      </span>
    </div>
  );
}
