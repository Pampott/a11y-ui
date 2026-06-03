import { useId, useRef, useState, useMemo, useCallback, type KeyboardEvent } from 'react';
import { cn } from '../lib/cn';

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps {
  /** Visible label — always rendered and linked to the input (WCAG 1.3.1, 4.1.2). */
  label: string;
  options: ComboboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  /** Placeholder shown in the input. Never used as a replacement for the label. */
  placeholder?: string;
  /** Optional hint text announced via aria-describedby. */
  hint?: string;
  className?: string;
}

/**
 * Accessible autocomplete / combobox.
 *
 * This is the hardest common component to make accessible, so it follows the
 * WAI-ARIA Authoring Practices "combobox with list autocomplete" pattern closely:
 *
 * - The input has role="combobox", aria-expanded, aria-controls, and
 *   aria-autocomplete="list".
 * - The popup is a role="listbox" with role="option" children.
 * - Active option is tracked with aria-activedescendant (focus stays on the input,
 *   so typing keeps working while arrowing through options).
 * - Full keyboard support: Down/Up to move, Enter to select, Escape to close,
 *   Home/End to jump, typing to filter.
 * - Selection state is announced via aria-selected on each option.
 *
 * Why aria-activedescendant instead of moving DOM focus:
 * it lets the user keep typing in the input while navigating the list, which is
 * the behaviour screen-reader users expect from an autocomplete.
 */
export function Combobox({
  label,
  options,
  value,
  onChange,
  placeholder,
  hint,
  className,
}: ComboboxProps) {
  const inputId = useId();
  const listboxId = useId();
  const hintId = useId();

  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    if (!query) return options;
    const q = query.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  const selectedLabel = useMemo(
    () => options.find((o) => o.value === value)?.label ?? '',
    [options, value]
  );

  const commit = useCallback(
    (option: ComboboxOption) => {
      onChange?.(option.value);
      setQuery('');
      setOpen(false);
      setActiveIndex(-1);
      inputRef.current?.focus();
    },
    [onChange]
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!open) {
          setOpen(true);
          setActiveIndex(0);
        } else {
          setActiveIndex((i) => (i + 1) % filtered.length);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!open) {
          setOpen(true);
          setActiveIndex(filtered.length - 1);
        } else {
          setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);
        }
        break;
      case 'Home':
        if (open) {
          e.preventDefault();
          setActiveIndex(0);
        }
        break;
      case 'End':
        if (open) {
          e.preventDefault();
          setActiveIndex(filtered.length - 1);
        }
        break;
      case 'Enter':
        if (open && activeIndex >= 0 && filtered[activeIndex]) {
          e.preventDefault();
          commit(filtered[activeIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setOpen(false);
        setActiveIndex(-1);
        break;
      default:
        break;
    }
  };

  const activeOptionId =
    open && activeIndex >= 0 && filtered[activeIndex]
      ? `${listboxId}-opt-${activeIndex}`
      : undefined;

  return (
    <div className={cn('relative flex flex-col gap-1', className)}>
      <label htmlFor={inputId} className="text-sm font-medium text-gray-900">
        {label}
      </label>

      <input
        ref={inputRef}
        id={inputId}
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-autocomplete="list"
        aria-activedescendant={activeOptionId}
        aria-describedby={hint ? hintId : undefined}
        autoComplete="off"
        className={cn(
          'h-10 rounded-token border border-gray-400 px-3 text-base',
          'focus-visible:outline-none focus-visible:ring-focus focus-visible:ring-brand'
        )}
        placeholder={placeholder}
        value={open ? query : selectedLabel}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setActiveIndex(0);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          // Delay so a click on an option still registers before closing.
          window.setTimeout(() => setOpen(false), 120);
        }}
      />

      {hint && (
        <p id={hintId} className="text-sm text-gray-600">
          {hint}
        </p>
      )}

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label={label}
          className={cn(
            'absolute top-full z-10 mt-1 max-h-60 w-full overflow-auto',
            'rounded-token border border-gray-300 bg-white py-1 shadow-lg'
          )}
        >
          {filtered.length === 0 && (
            <li className="px-3 py-2 text-sm text-gray-600" role="option" aria-disabled="true">
              No results
            </li>
          )}
          {filtered.map((option, index) => {
            const isActive = index === activeIndex;
            const isSelected = option.value === value;
            return (
              <li
                key={option.value}
                id={`${listboxId}-opt-${index}`}
                role="option"
                aria-selected={isSelected}
                className={cn(
                  'cursor-pointer px-3 py-2 text-base',
                  isActive && 'bg-brand-subtle',
                  isSelected && 'font-medium'
                )}
                // onMouseDown (not onClick) so it fires before the input blur.
                onMouseDown={(e) => {
                  e.preventDefault();
                  commit(option);
                }}
                onMouseEnter={() => setActiveIndex(index)}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

Combobox.displayName = 'Combobox';
