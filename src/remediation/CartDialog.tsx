import { useState } from 'react';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';

/**
 * BEFORE — deliberately inaccessible. Do not copy.
 *
 * An "added to cart" overlay built from plain <div>s:
 * - no dialog role and no accessible name;
 * - focus stays on the page behind the overlay;
 * - the close control is a <span>, unreachable with the keyboard;
 * - Escape does nothing;
 * - the title is not a heading.
 */
export function CartDialogBefore() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add to cart</Button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-md rounded-token bg-white p-6 shadow-xl">
            <span
              className="absolute right-3 top-2 cursor-pointer text-2xl text-gray-700"
              onClick={() => setOpen(false)}
            >
              ×
            </span>
            <div className="mb-3 text-lg font-semibold text-gray-900">Added to your cart</div>
            <p className="mb-4 text-base text-gray-700">Linen shirt — €49</p>
            <a href="#checkout" className="text-brand underline">
              Go to checkout
            </a>
          </div>
        </div>
      )}
    </>
  );
}

/**
 * AFTER — remediated with the library's `Modal`.
 *
 * role="dialog" with a name, focus moved in and trapped, Escape to close,
 * focus restored to the trigger, real buttons, title exposed as a heading.
 */
export function CartDialogAfter() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add to cart</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Added to your cart">
        <p className="mb-4 text-base text-gray-700">Linen shirt — €49</p>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Continue shopping
          </Button>
          <a
            href="#checkout"
            className="rounded-token text-brand underline focus-visible:outline-none focus-visible:ring-focus focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            Go to checkout
          </a>
        </div>
      </Modal>
    </>
  );
}
