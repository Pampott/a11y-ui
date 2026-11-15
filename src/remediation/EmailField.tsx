import { useRef, useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

const EMAIL = /^\S+@\S+\.\S+$/;

/**
 * BEFORE — deliberately inaccessible. Do not copy.
 *
 * A checkout email field as it is often found in the wild:
 * - the placeholder is the only label, and it vanishes on typing;
 * - the error is a red sentence that nothing links to the field;
 * - the message does not say how to fix the value;
 * - the focus outline is removed.
 */
export function EmailFieldBefore() {
  const [value, setValue] = useState('');
  const [hasError, setHasError] = useState(false);

  return (
    <form
      noValidate
      className="flex w-full flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        setHasError(!EMAIL.test(value));
      }}
    >
      <input
        type="text"
        placeholder="Email *"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`h-10 rounded-token border px-3 text-base outline-none ${
          hasError ? 'border-danger' : 'border-gray-400'
        }`}
      />
      {hasError && <span className="text-sm text-danger">Invalid email</span>}
      <Button type="submit">Continue</Button>
    </form>
  );
}

/**
 * AFTER — the same field, remediated with the library's `Input`.
 *
 * - visible label linked to the field, required state exposed;
 * - error linked with aria-describedby, flagged with aria-invalid, announced
 *   through role="alert", and focus is moved back to the field;
 * - the message explains the expected format;
 * - type="email" and autocomplete="email" let browsers and password managers
 *   fill the field.
 */
export function EmailFieldAfter() {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      noValidate
      className="flex w-full flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (EMAIL.test(value)) {
          setError(undefined);
          return;
        }
        setError('Enter an email address in the format name@example.com.');
        inputRef.current?.focus();
      }}
    >
      <Input
        ref={inputRef}
        label="Email address"
        type="email"
        name="email"
        autoComplete="email"
        required
        hint="We send your order confirmation to this address."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        error={error}
      />
      <Button type="submit">Continue</Button>
    </form>
  );
}
