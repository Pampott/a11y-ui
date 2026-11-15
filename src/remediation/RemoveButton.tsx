import { Button } from '../components/Button';

export interface RemoveButtonProps {
  /** Name of the cart item this button removes. */
  itemName: string;
  onRemove?: () => void;
}

function TrashIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M6 6l1 14h10l1-14" />
    </svg>
  );
}

function CartLine({ itemName, children }: { itemName: string; children: React.ReactNode }) {
  return (
    <div className="flex w-full items-center justify-between gap-4 border-b border-gray-300 py-2">
      <span className="text-base">
        {itemName}, <span className="text-gray-700">€49</span>
      </span>
      {children}
    </div>
  );
}

/**
 * BEFORE: deliberately inaccessible. Do not copy.
 *
 * An icon-only "remove from cart" button with no accessible name: a screen
 * reader announces "button" and nothing else. The target is also 16 px wide.
 */
export function RemoveButtonBefore({ itemName, onRemove }: RemoveButtonProps) {
  return (
    <CartLine itemName={itemName}>
      <button type="button" onClick={onRemove} className="text-gray-700">
        <TrashIcon size={16} />
      </button>
    </CartLine>
  );
}

/**
 * AFTER: remediated with the library's `Button`.
 *
 * The label names the action and the item, so a list of identical icons stays
 * distinguishable. The icon is decorative and hidden from assistive technology.
 */
export function RemoveButtonAfter({ itemName, onRemove }: RemoveButtonProps) {
  return (
    <CartLine itemName={itemName}>
      <Button variant="ghost" iconOnlyLabel={`Remove ${itemName} from cart`} onClick={onRemove}>
        <TrashIcon size={20} />
      </Button>
    </CartLine>
  );
}
