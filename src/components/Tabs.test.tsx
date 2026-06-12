import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs, type TabItem } from './Tabs';

const tabs: TabItem[] = [
  { id: 'one', label: 'One', content: 'Panel one' },
  { id: 'two', label: 'Two', content: 'Panel two' },
  { id: 'three', label: 'Three', content: 'Panel three' },
];

describe('Tabs', () => {
  it('selects the first tab by default and shows its panel', () => {
    render(<Tabs label="Demo" tabs={tabs} />);
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel one');
  });

  it('honours defaultSelected', () => {
    render(<Tabs label="Demo" tabs={tabs} defaultSelected="two" />);
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel two');
  });

  it('applies a roving tabindex (only the selected tab is tabbable)', () => {
    render(<Tabs label="Demo" tabs={tabs} />);
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute('tabindex', '-1');
  });

  it('activates a tab on click and swaps the panel', async () => {
    const user = userEvent.setup();
    render(<Tabs label="Demo" tabs={tabs} />);
    await user.click(screen.getByRole('tab', { name: 'Three' }));
    expect(screen.getByRole('tab', { name: 'Three' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel three');
  });

  it('moves and activates with arrow / Home / End keys (automatic activation)', async () => {
    const user = userEvent.setup();
    render(<Tabs label="Demo" tabs={tabs} />);
    const one = screen.getByRole('tab', { name: 'One' });
    one.focus();

    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveFocus();
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'Three' })).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{ArrowRight}'); // wraps to first
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{ArrowLeft}'); // wraps to last
    expect(screen.getByRole('tab', { name: 'Three' })).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{Home}');
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-selected', 'true');
  });

  it('links the panel back to the active tab via aria-labelledby', async () => {
    const user = userEvent.setup();
    render(<Tabs label="Demo" tabs={tabs} />);
    const panel = screen.getByRole('tabpanel');
    expect(panel.getAttribute('aria-labelledby')).toBe(
      screen.getByRole('tab', { name: 'One' }).id
    );
    await user.click(screen.getByRole('tab', { name: 'Two' }));
    expect(panel.getAttribute('aria-labelledby')).toBe(
      screen.getByRole('tab', { name: 'Two' }).id
    );
  });
});
