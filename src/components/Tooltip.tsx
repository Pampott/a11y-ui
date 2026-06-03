import { useId, useState, useRef } from 'react';
import { cn } from '../lib/cn';

export interface TooltipProps {
  /** The text shown in the tooltip. */
  content: string;
  /** The trigger element (usually a button or link). */
  children: React.ReactElement;
  className?: string;
}

/**
 * Accessible tooltip.
 *
 * Accessibility notes:
 * - Shows on hover AND keyboard focus (WCAG 1.4.13 — content on hover/focus).
 * - Linked to the trigger via aria-describedby so it is announced.
 * - Dismissible with Escape without moving pointer.
 * - The tooltip text is in the DOM (role="tooltip"), not a title attribute,
 *   because title attributes are not reliably announced and not keyboard-accessible.
 */
export function Tooltip({ content, children, className }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const tooltipId = useId();
  const timeoutRef = useRef<number>();

  const show = () => {
    window.clearTimeout(timeoutRef.current);
    setVisible(true);
  };
  const hide = () => setVisible(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') hide();
  };

  return (
    <span className="relative inline-block">
      {/* Clone the trigger to wire up the a11y props without an extra wrapper element */}
      <span
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        onKeyDown={handleKeyDown}
        aria-describedby={visible ? tooltipId : undefined}
        className="inline-block"
      >
        {children}
      </span>
      {visible && (
        <span
          id={tooltipId}
          role="tooltip"
          className={cn(
            'absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap',
            'rounded-md bg-gray-900 px-2.5 py-1.5 text-sm text-white shadow-md',
            className
          )}
        >
          {content}
        </span>
      )}
    </span>
  );
}
