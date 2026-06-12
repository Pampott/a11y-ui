import { Fragment } from 'react';
import * as RadixMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '../lib/cn';

export interface DropdownMenuItem {
  id: string;
  label: React.ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  tone?: 'default' | 'danger';
  /** Render a separator above this item. */
  separatorBefore?: boolean;
}

export interface DropdownMenuProps {
  /**
   * The trigger element (e.g. a <Button>). It must forward its ref, so Radix
   * can manage focus — passed through with `asChild`.
   */
  trigger: React.ReactElement;
  items: DropdownMenuItem[];
  align?: 'start' | 'center' | 'end';
}

/**
 * Dropdown menu built on Radix UI primitives.
 *
 * Why Radix here and not hand-rolled like the rest of the library: a menu is one
 * of the hardest patterns to get right — roving focus, type-ahead, collision-
 * aware positioning, focus return, and outside-press/Escape dismissal. Radix
 * ships all of that, correct and battle-tested, so the professional choice is to
 * compose on top of it rather than reimplement it. This component's job is the
 * design-system layer: tokens, styling, animation and the project's a11y
 * conventions.
 *
 * Accessibility (provided by Radix, verified with axe):
 * - Trigger exposes aria-haspopup="menu" and aria-expanded.
 * - Content is role="menu" with role="menuitem" children; arrow keys + type-ahead
 *   navigate, Enter/Space select, Escape closes and focus returns to the trigger.
 * The open/close scale-fade is neutralised by the global reduced-motion guard.
 */
export function DropdownMenu({ trigger, items, align = 'start' }: DropdownMenuProps) {
  return (
    <RadixMenu.Root>
      <RadixMenu.Trigger asChild>{trigger}</RadixMenu.Trigger>
      <RadixMenu.Portal>
        <RadixMenu.Content
          align={align}
          sideOffset={6}
          className={cn(
            'z-50 min-w-44 rounded-token border border-gray-200 bg-white p-1 shadow-lg',
            'origin-[var(--radix-dropdown-menu-content-transform-origin)]',
            'data-[state=open]:animate-menu-in data-[state=closed]:animate-menu-out',
            'focus-visible:outline-none'
          )}
        >
          {items.map((item, index) => (
            <Fragment key={item.id}>
              {item.separatorBefore && index > 0 && (
                <RadixMenu.Separator className="my-1 h-px bg-gray-200" />
              )}
              <RadixMenu.Item
                disabled={item.disabled}
                onSelect={item.onSelect}
                className={cn(
                  'flex cursor-pointer select-none items-center rounded px-2 py-1.5 text-sm text-gray-900 outline-none',
                  'data-[highlighted]:bg-brand-subtle data-[highlighted]:text-brand',
                  'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                  item.tone === 'danger' &&
                    'text-danger data-[highlighted]:bg-danger-subtle data-[highlighted]:text-danger'
                )}
              >
                {item.label}
              </RadixMenu.Item>
            </Fragment>
          ))}
        </RadixMenu.Content>
      </RadixMenu.Portal>
    </RadixMenu.Root>
  );
}
