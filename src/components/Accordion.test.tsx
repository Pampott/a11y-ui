import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion, type AccordionItem } from './Accordion';

const items: AccordionItem[] = [
  { id: 'a', title: 'Section A', content: 'Body A' },
  { id: 'b', title: 'Section B', content: 'Body B' },
  { id: 'c', title: 'Section C', content: 'Body C' },
];

describe('Accordion', () => {
  it('renders each trigger inside the requested heading level', () => {
    render(<Accordion items={items} headingLevel={2} />);
    const headings = screen.getAllByRole('heading', { level: 2 });
    expect(headings).toHaveLength(3);
    expect(screen.getByRole('button', { name: 'Section A' })).toBeInTheDocument();
  });

  it('toggles a panel and reflects state via aria-expanded', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    const trigger = screen.getByRole('button', { name: 'Section A' });

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('links each trigger to its panel via aria-controls / aria-labelledby', () => {
    render(<Accordion items={items} defaultOpen={['a']} />);
    const trigger = screen.getByRole('button', { name: 'Section A' });
    const region = screen.getByRole('region', { name: 'Section A' });
    expect(trigger.getAttribute('aria-controls')).toBe(region.id);
    expect(region.getAttribute('aria-labelledby')).toBe(trigger.id);
  });

  it('keeps only one panel open in single mode', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} type="single" defaultOpen={['a']} />);
    await user.click(screen.getByRole('button', { name: 'Section B' }));
    expect(screen.getByRole('button', { name: 'Section A' })).toHaveAttribute(
      'aria-expanded',
      'false'
    );
    expect(screen.getByRole('button', { name: 'Section B' })).toHaveAttribute(
      'aria-expanded',
      'true'
    );
  });

  it('allows several panels open in multiple mode', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} type="multiple" defaultOpen={['a']} />);
    await user.click(screen.getByRole('button', { name: 'Section B' }));
    expect(screen.getByRole('button', { name: 'Section A' })).toHaveAttribute(
      'aria-expanded',
      'true'
    );
    expect(screen.getByRole('button', { name: 'Section B' })).toHaveAttribute(
      'aria-expanded',
      'true'
    );
  });

  it('moves focus between triggers with Arrow / Home / End keys', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    const [a, b, c] = items.map((i) =>
      screen.getByRole('button', { name: i.title as string })
    );

    a.focus();
    await user.keyboard('{ArrowDown}');
    expect(b).toHaveFocus();
    await user.keyboard('{End}');
    expect(c).toHaveFocus();
    await user.keyboard('{ArrowDown}'); // wraps to first
    expect(a).toHaveFocus();
    await user.keyboard('{ArrowUp}'); // wraps to last
    expect(c).toHaveFocus();
    await user.keyboard('{Home}');
    expect(a).toHaveFocus();
  });
});
