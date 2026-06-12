import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './Switch';

describe('Switch', () => {
  it('exposes role="switch" with an accessible name and off state by default', () => {
    render(<Switch label="Email notifications" />);
    const sw = screen.getByRole('switch', { name: 'Email notifications' });
    expect(sw).toHaveAttribute('aria-checked', 'false');
  });

  it('toggles aria-checked on click when uncontrolled', async () => {
    const user = userEvent.setup();
    render(<Switch label="Dark mode" />);
    const sw = screen.getByRole('switch');
    await user.click(sw);
    expect(sw).toHaveAttribute('aria-checked', 'true');
    await user.click(sw);
    expect(sw).toHaveAttribute('aria-checked', 'false');
  });

  it('toggles with the Space and Enter keys', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Switch label="Wifi" onChange={onChange} />);
    const sw = screen.getByRole('switch');
    sw.focus();
    await user.keyboard(' ');
    expect(onChange).toHaveBeenNthCalledWith(1, true);
    await user.keyboard('{Enter}');
    expect(onChange).toHaveBeenNthCalledWith(2, false);
  });

  it('respects the controlled checked prop and does not self-update', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Switch label="Sync" checked={false} onChange={onChange} />);
    const sw = screen.getByRole('switch');
    await user.click(sw);
    // Still false because the parent owns the state.
    expect(sw).toHaveAttribute('aria-checked', 'false');
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('does not toggle or fire onChange when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Switch label="Beta" disabled onChange={onChange} />);
    const sw = screen.getByRole('switch');
    await user.click(sw);
    expect(onChange).not.toHaveBeenCalled();
    expect(sw).toHaveAttribute('aria-checked', 'false');
  });
});
