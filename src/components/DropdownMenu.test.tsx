import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { DropdownMenu, type DropdownMenuItem } from './DropdownMenu';
import { Button } from './Button';

function renderMenu(onSelect = vi.fn()) {
  const items: DropdownMenuItem[] = [
    { id: 'edit', label: 'Edit', onSelect },
    { id: 'duplicate', label: 'Duplicate' },
    { id: 'delete', label: 'Delete', tone: 'danger', separatorBefore: true },
  ];
  render(<DropdownMenu trigger={<Button>Actions</Button>} items={items} />);
  return { onSelect };
}

describe('DropdownMenu', () => {
  it('exposes a menu trigger (aria-haspopup, collapsed by default)', () => {
    renderMenu();
    const trigger = screen.getByRole('button', { name: 'Actions' });
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens the menu and renders the items on click', async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.click(screen.getByRole('button', { name: 'Actions' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toBeInTheDocument();
  });

  it('calls onSelect when an item is chosen', async () => {
    const user = userEvent.setup();
    const { onSelect } = renderMenu();
    await user.click(screen.getByRole('button', { name: 'Actions' }));
    await user.click(screen.getByRole('menuitem', { name: 'Edit' }));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('has no axe violations when open', async () => {
    const user = userEvent.setup();
    const { baseElement } = render(
      <DropdownMenu
        trigger={<Button>Actions</Button>}
        items={[
          { id: 'edit', label: 'Edit' },
          { id: 'delete', label: 'Delete', tone: 'danger' },
        ]}
      />
    );
    await user.click(screen.getByRole('button', { name: 'Actions' }));
    // `region` is a page-structure best practice (all content inside a landmark).
    // Radix portals the menu to <body>, so in an isolated component test there is
    // no surrounding landmark by definition — irrelevant to this component's a11y.
    expect(
      await axe(baseElement, { rules: { region: { enabled: false } } })
    ).toHaveNoViolations();
  });
});
