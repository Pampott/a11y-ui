import { useId, useRef, useState, useCallback } from 'react';
import { cn } from '../lib/cn';

export interface AccordionItem {
  /** Stable identifier, used to track open state. */
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  /**
   * 'single' — only one panel open at a time (default).
   * 'multiple' — any number of panels can be open at once.
   */
  type?: 'single' | 'multiple';
  /** Ids of the panels open on first render. */
  defaultOpen?: string[];
  /**
   * Heading level the trigger sits inside (2–6). Pick the level that fits the
   * surrounding document outline so the page heading structure stays valid
   * (WCAG 1.3.1).
   */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  className?: string;
}

/**
 * Accessible accordion following the WAI-ARIA APG Accordion pattern.
 *
 * Accessibility notes:
 * - Each trigger is a real <button> wrapped in a heading of a configurable
 *   level, so the accordion participates in the page outline (WCAG 1.3.1).
 * - aria-expanded reflects open state; aria-controls links trigger to panel and
 *   the panel is a labelled role="region" (aria-labelledby points back).
 * - Keyboard: Up/Down move between triggers, Home/End jump to first/last, and
 *   Enter/Space toggle (native button behaviour).
 * - The expand/collapse animation uses grid-template-rows 0fr→1fr so the real
 *   height is animated with no JS measurement and no arbitrary max-height. It is
 *   neutralised by the global prefers-reduced-motion guard (WCAG 2.3.3).
 */
export function Accordion({
  items,
  type = 'single',
  defaultOpen = [],
  headingLevel = 3,
  className,
}: AccordionProps) {
  const baseId = useId();
  const [open, setOpen] = useState<string[]>(defaultOpen);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const Heading = `h${headingLevel}` as const;

  const toggle = useCallback(
    (id: string) => {
      setOpen((prev) => {
        const isOpen = prev.includes(id);
        if (type === 'single') return isOpen ? [] : [id];
        return isOpen ? prev.filter((x) => x !== id) : [...prev, id];
      });
    },
    [type]
  );

  const onTriggerKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      const last = items.length - 1;
      let next: number | null = null;

      switch (e.key) {
        case 'ArrowDown':
          next = index === last ? 0 : index + 1;
          break;
        case 'ArrowUp':
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
      triggerRefs.current[next]?.focus();
    },
    [items.length]
  );

  return (
    <div className={cn('divide-y divide-gray-200 rounded-token border border-gray-200', className)}>
      {items.map((item, index) => {
        const isOpen = open.includes(item.id);
        const triggerId = `${baseId}-trigger-${item.id}`;
        const panelId = `${baseId}-panel-${item.id}`;

        return (
          <div key={item.id}>
            <Heading className="m-0">
              <button
                ref={(el) => {
                  triggerRefs.current[index] = el;
                }}
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                onKeyDown={(e) => onTriggerKeyDown(e, index)}
                className={cn(
                  'flex w-full items-center justify-between gap-3 px-4 py-3 text-left',
                  'text-base font-medium text-gray-900',
                  'hover:bg-brand-subtle/60',
                  'focus-visible:outline-none focus-visible:ring-focus focus-visible:ring-brand focus-visible:ring-inset'
                )}
              >
                <span>{item.title}</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  className={cn(
                    'h-5 w-5 shrink-0 text-gray-500 transition-transform duration-base ease-standard',
                    isOpen && 'rotate-180'
                  )}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 7.5 10 12.5 15 7.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </Heading>

            {/* grid 0fr→1fr animates the panel's real height without measuring the DOM */}
            <div
              className={cn(
                'grid transition-[grid-template-rows] duration-base ease-standard',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              )}
            >
              <div className="overflow-hidden">
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  // `inert` (not `hidden`) keeps collapsed content out of the tab
                  // order and the a11y tree while leaving it in layout so the
                  // height animation can still run. React 18's types don't yet
                  // include `inert`, hence the cast.
                  {...(isOpen
                    ? undefined
                    : ({ inert: '' } as unknown as React.HTMLAttributes<HTMLDivElement>))}
                  className="px-4 pb-4 pt-1 text-gray-700"
                >
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
