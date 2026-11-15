import { useState } from 'react';
import { QuantityStepper } from '../components/QuantityStepper';

/**
 * BEFORE: deliberately inaccessible. Do not copy.
 *
 * A cart quantity control as it is often found in the wild:
 * - minus and plus are <span>s with a click handler: no role, no name, not
 *   reachable with the keyboard;
 * - the field has no label;
 * - nothing announces the new quantity.
 */
export function CartQuantityBefore() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="inline-flex items-center">
      <span
        className="inline-flex h-6 w-6 cursor-pointer items-center justify-center border border-gray-400"
        onClick={() => setQuantity((current) => Math.max(1, current - 1))}
      >
        -
      </span>
      <input
        type="text"
        value={quantity}
        onChange={(event) => setQuantity(Number(event.target.value) || 1)}
        className="h-6 w-10 border-y border-gray-400 text-center text-sm outline-none"
      />
      <span
        className="inline-flex h-6 w-6 cursor-pointer items-center justify-center border border-gray-400"
        onClick={() => setQuantity((current) => current + 1)}
      >
        +
      </span>
    </div>
  );
}

/**
 * AFTER: remediated with the library's `QuantityStepper`.
 *
 * Real buttons named after the action and the item, a labelled field, a live
 * announcement of the new value, and focus kept on the button at a bound.
 */
export function CartQuantityAfter() {
  return <QuantityStepper itemName="Linen shirt" max={5} />;
}
