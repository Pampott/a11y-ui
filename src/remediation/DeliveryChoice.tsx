import { useState } from 'react';
import { RadioGroup } from '../components/RadioGroup';

const options = [
  { value: 'standard', label: 'Standard', hint: '3 to 5 working days, free' },
  { value: 'express', label: 'Express', hint: 'Next working day, €9' },
];

/**
 * BEFORE: deliberately inaccessible. Do not copy.
 *
 * A delivery choice as it is often found in the wild:
 * - the question is a paragraph, not linked to the options;
 * - the option text sits next to each radio without a <label>;
 * - only the small circle is clickable;
 * - the radios have no name attribute, so the choice is not even submitted
 *   with the form.
 */
export function DeliveryChoiceBefore() {
  const [selected, setSelected] = useState<string>();

  return (
    <div className="flex w-full flex-col gap-2">
      <p className="text-sm font-medium text-gray-900">Delivery method</p>
      {options.map((option) => (
        <div key={option.value} className="flex items-start gap-3">
          <input
            type="radio"
            checked={selected === option.value}
            onChange={() => setSelected(option.value)}
            className="mt-0.5 h-5 w-5"
          />
          <div className="flex flex-col">
            <span className="text-base text-gray-900">{option.label}</span>
            <span className="text-sm text-gray-600">{option.hint}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * AFTER: remediated with the library's `RadioGroup`.
 *
 * Fieldset and legend name the group, every radio has its own label and a
 * linked hint, and the label text is part of the click target.
 */
export function DeliveryChoiceAfter() {
  return (
    <div className="w-full">
      <RadioGroup legend="Delivery method" name="delivery-after" options={options} />
    </div>
  );
}
