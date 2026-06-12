import { useId, useState, useCallback } from 'react';
import { cn } from '../lib/cn';

export interface SwitchProps {
  /** Visible label — also the accessible name (WCAG 4.1.2). */
  label: string;
  /** Controlled state. Omit to use the component uncontrolled. */
  checked?: boolean;
  /** Initial state when uncontrolled. */
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

/**
 * Accessible on/off switch following the WAI-ARIA Switch pattern.
 *
 * Accessibility notes:
 * - role="switch" with aria-checked exposes on/off state to assistive tech
 *   (distinct from a checkbox, which screen readers announce differently).
 * - It is a real <button>, so Space and Enter toggle it for free and it is in
 *   the tab order with a visible focus ring (WCAG 2.1.1, 2.4.7).
 * - The label sits inside the button, so the control has an accessible name and
 *   the text itself is part of the click target (WCAG 2.5.8 target size).
 * - The sliding thumb is the only animated part and is neutralised by the global
 *   prefers-reduced-motion guard; state never depends on the animation.
 */
export function Switch({
  label,
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  className,
}: SwitchProps) {
  const labelId = useId();
  const [internal, setInternal] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isOn = isControlled ? checked : internal;

  const toggle = useCallback(() => {
    if (disabled) return;
    const next = !isOn;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  }, [disabled, isOn, isControlled, onChange]);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      aria-labelledby={labelId}
      disabled={disabled}
      onClick={toggle}
      className={cn(
        'inline-flex items-center gap-3',
        'focus-visible:outline-none focus-visible:ring-focus focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:rounded',
        disabled && 'cursor-not-allowed opacity-60',
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full px-0.5',
          'transition-colors duration-base ease-standard',
          isOn ? 'bg-brand' : 'bg-gray-300'
        )}
      >
        <span
          className={cn(
            'inline-block h-5 w-5 rounded-full bg-white shadow',
            'transition-transform duration-base ease-standard',
            isOn ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </span>
      <span id={labelId} className="text-base text-gray-900">
        {label}
      </span>
    </button>
  );
}
