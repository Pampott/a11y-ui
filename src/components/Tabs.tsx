import {
  useId,
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
  type KeyboardEvent,
} from 'react';
import { cn } from '../lib/cn';

export interface TabItem {
  /** Stable identifier, used to track the selected tab. */
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  /** Id of the tab selected on first render. Defaults to the first tab. */
  defaultSelected?: string;
  /** Accessible name for the tablist (WCAG 4.1.2). */
  label: string;
  className?: string;
}

/**
 * Accessible tabs following the WAI-ARIA APG Tabs pattern (automatic activation).
 *
 * Accessibility notes:
 * - role="tablist" (with an accessible name) wraps role="tab" buttons; each tab
 *   has aria-selected and aria-controls, and the role="tabpanel" points back via
 *   aria-labelledby.
 * - Roving tabindex: only the selected tab is in the tab order (tabindex 0); the
 *   others are -1 and reached with the arrow keys, so Tab moves past the whole
 *   group in one step.
 * - Keyboard: Left/Right move and activate (automatic activation), Home/End jump
 *   to the first/last tab.
 * - The active-tab indicator slides between tabs and the panel fades in. Both are
 *   neutralised by the global prefers-reduced-motion guard (WCAG 2.3.3).
 */
export function Tabs({ tabs, defaultSelected, label, className }: TabsProps) {
  const baseId = useId();
  const [selected, setSelected] = useState(defaultSelected ?? tabs[0]?.id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  const selectedIndex = Math.max(
    0,
    tabs.findIndex((t) => t.id === selected)
  );

  // Measure the active tab so the indicator can slide to it. Runs after layout
  // so offsetLeft/offsetWidth are accurate, and re-runs on selection change.
  useLayoutEffect(() => {
    const el = tabRefs.current[selectedIndex];
    if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
  }, [selectedIndex, tabs.length]);

  const activate = useCallback((id: string, index: number) => {
    setSelected(id);
    tabRefs.current[index]?.focus();
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
      const last = tabs.length - 1;
      let next: number | null = null;

      switch (e.key) {
        case 'ArrowRight':
          next = index === last ? 0 : index + 1;
          break;
        case 'ArrowLeft':
          next = index === 0 ? last : index - 1;
          break;
        case 'Home':
          next = 0;
          break;
        case 'End':
          next = last;
          break;
        default:
          return;
      }

      e.preventDefault();
      activate(tabs[next].id, next);
    },
    [tabs, activate]
  );

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div role="tablist" aria-label={label} className="relative flex border-b border-gray-200">
        {tabs.map((tab, index) => {
          const isSelected = tab.id === selected;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              id={`${baseId}-tab-${tab.id}`}
              role="tab"
              type="button"
              aria-selected={isSelected}
              aria-controls={`${baseId}-panel`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => activate(tab.id, index)}
              onKeyDown={(e) => onKeyDown(e, index)}
              className={cn(
                'px-4 py-2.5 text-base font-medium',
                'focus-visible:outline-none focus-visible:ring-focus focus-visible:ring-brand focus-visible:ring-inset',
                isSelected ? 'text-brand' : 'text-gray-600 hover:text-gray-900'
              )}
            >
              {tab.label}
            </button>
          );
        })}
        {/* Sliding active-tab indicator */}
        <span
          aria-hidden="true"
          className="absolute bottom-0 h-0.5 bg-brand transition-[left,width] duration-base ease-standard"
          style={{ left: indicator.left, width: indicator.width }}
        />
      </div>

      {/* A single reused tabpanel: every tab's aria-controls points here (no
          dangling refs), aria-labelledby names the active tab, and keying the
          inner content by selection replays the fade on each switch. */}
      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${selected}`}
        tabIndex={0}
        className="text-gray-700 focus-visible:outline-none focus-visible:ring-focus focus-visible:ring-brand"
      >
        <div key={selected} className="animate-fade-in">
          {tabs[selectedIndex]?.content}
        </div>
      </div>
    </div>
  );
}
