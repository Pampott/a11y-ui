import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Badge } from '../components/Badge';
import { SkipLink } from '../components/SkipLink';
import { Combobox } from '../components/Combobox';
import { Tooltip } from '../components/Tooltip';
import { Accordion } from '../components/Accordion';

/**
 * Automated accessibility tests.
 *
 * Each component is rendered and scanned with axe-core. A test FAILS if any
 * WCAG violation is detected — this is the non-regression safety net: if someone
 * later removes a label or breaks an ARIA attribute, CI catches it.
 */

describe('Accessibility — no axe violations', () => {
  it('Button (primary)', async () => {
    const { container } = render(<Button>Save changes</Button>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('Button (icon-only with label)', async () => {
    const { container } = render(<Button iconOnlyLabel="Close">✕</Button>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('Input with label', async () => {
    const { container } = render(<Input label="Email address" type="email" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('Input with error', async () => {
    const { container } = render(
      <Input label="Email" type="email" error="Invalid email" defaultValue="x" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('Badge (all tones)', async () => {
    const { container } = render(
      <div>
        <Badge tone="neutral">Neutral</Badge>
        <Badge tone="success">Done</Badge>
        <Badge tone="danger">Failed</Badge>
      </div>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('SkipLink', async () => {
    const { container } = render(
      <div>
        <SkipLink targetId="main" />
        <main id="main" tabIndex={-1}>Content</main>
      </div>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('Combobox', async () => {
    const { container } = render(
      <Combobox
        label="Country"
        options={[
          { value: 'fr', label: 'France' },
          { value: 'be', label: 'Belgique' },
        ]}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('Tooltip trigger', async () => {
    const { container } = render(
      <Tooltip content="Helpful hint">
        <button type="button">Help</button>
      </Tooltip>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('Accordion (one panel open)', async () => {
    const { container } = render(
      <Accordion
        defaultOpen={['shipping']}
        items={[
          { id: 'shipping', title: 'Shipping', content: 'Ships in 2 days.' },
          { id: 'returns', title: 'Returns', content: '30-day returns.' },
        ]}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
