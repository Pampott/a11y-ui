import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Carousel } from './Carousel';
import { QuantityStepper } from './QuantityStepper';
import { Steps } from './Steps';

describe('QuantityStepper', () => {
  it('names the field and both buttons after the item, with no axe violation', async () => {
    const { container } = render(<QuantityStepper itemName="Linen shirt" />);
    expect(screen.getByRole('textbox', { name: 'Quantity of Linen shirt' })).toHaveValue('1');
    expect(screen.getByRole('button', { name: 'Decrease quantity of Linen shirt' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Increase quantity of Linen shirt' })).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it('increases, announces the new value, and reports it', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<QuantityStepper itemName="Linen shirt" onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: /Increase/ }));
    expect(screen.getByRole('textbox')).toHaveValue('2');
    expect(screen.getByRole('status')).toHaveTextContent('Quantity of Linen shirt: 2.');
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('keeps focus on a button that reaches its bound and says so', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<QuantityStepper defaultValue={2} onChange={onChange} />);
    const decrease = screen.getByRole('button', { name: 'Decrease quantity' });
    await user.click(decrease);
    expect(decrease).toHaveAttribute('aria-disabled', 'true');
    expect(decrease).toHaveFocus();
    expect(screen.getByRole('status')).toHaveTextContent('Quantity: 1. Minimum reached.');
    await user.click(decrease);
    expect(screen.getByRole('textbox')).toHaveValue('1');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('accepts a typed value and clamps it on blur', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<QuantityStepper max={5} onChange={onChange} />);
    const field = screen.getByRole('textbox', { name: 'Quantity' });
    await user.clear(field);
    await user.type(field, '12abc');
    await user.tab();
    expect(field).toHaveValue('5');
    expect(onChange).toHaveBeenLastCalledWith(5);
  });
});

describe('Steps', () => {
  const steps = [
    { id: 'cart', label: 'Cart', href: '#cart' },
    { id: 'delivery', label: 'Delivery', href: '#delivery' },
    { id: 'payment', label: 'Payment', href: '#payment' },
  ];

  it('exposes a named navigation with an ordered list and the current step', async () => {
    const { container } = render(<Steps label="Checkout progress" steps={steps} current="delivery" />);
    expect(screen.getByRole('navigation', { name: 'Checkout progress' })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByText('Delivery')).toHaveAttribute('aria-current', 'step');
    expect(await axe(container)).toHaveNoViolations();
  });

  it('links only completed steps and says they are completed', () => {
    render(<Steps label="Checkout progress" steps={steps} current="delivery" />);
    expect(screen.getByRole('link', { name: 'Completed: Cart' })).toHaveAttribute('href', '#cart');
    expect(screen.getAllByRole('link')).toHaveLength(1);
  });
});

describe('Carousel', () => {
  const slides = [
    { id: 'a', label: 'Linen shirt', content: <p>Linen shirt, €49</p> },
    { id: 'b', label: 'Wool scarf', content: <p>Wool scarf, €35</p> },
    { id: 'c', label: 'Canvas bag', content: <p>Canvas bag, €22</p> },
  ];

  afterEach(() => {
    vi.useRealTimers();
  });

  it('exposes a named carousel showing one slide with its position', async () => {
    const { container } = render(<Carousel label="Featured products" slides={slides} />);
    expect(screen.getByRole('region', { name: 'Featured products' })).toHaveAttribute(
      'aria-roledescription',
      'carousel'
    );
    expect(screen.getAllByRole('group')).toHaveLength(1);
    expect(screen.getByRole('group', { name: '1 of 3: Linen shirt' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /rotation/ })).toBeNull();
    expect(await axe(container)).toHaveNoViolations();
  });

  it('moves with Previous and Next, wraps around, and announces politely', async () => {
    const user = userEvent.setup();
    render(<Carousel label="Featured products" slides={slides} />);
    await user.click(screen.getByRole('button', { name: 'Next slide' }));
    const current = screen.getByRole('group', { name: '2 of 3: Wool scarf' });
    expect(current.parentElement).toHaveAttribute('aria-live', 'polite');
    await user.click(screen.getByRole('button', { name: 'Previous slide' }));
    await user.click(screen.getByRole('button', { name: 'Previous slide' }));
    expect(screen.getByRole('group', { name: '3 of 3: Canvas bag' })).toBeInTheDocument();
  });

  it('rotates on its own, silently, and can be paused', () => {
    vi.useFakeTimers();
    render(<Carousel label="Featured products" slides={slides} autoPlayInterval={1000} />);
    expect(screen.getByRole('group').parentElement).toHaveAttribute('aria-live', 'off');
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByRole('group', { name: '2 of 3: Wool scarf' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Pause rotation' }));
    expect(screen.getByRole('button', { name: 'Start rotation' })).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.getByRole('group', { name: '2 of 3: Wool scarf' })).toBeInTheDocument();
  });

  it('pauses while keyboard focus is inside', () => {
    vi.useFakeTimers();
    render(<Carousel label="Featured products" slides={slides} autoPlayInterval={1000} />);
    fireEvent.focus(screen.getByRole('button', { name: 'Next slide' }));
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.getByRole('group', { name: '1 of 3: Linen shirt' })).toBeInTheDocument();
  });

  it('stops rotating for good once the user changes slide', () => {
    vi.useFakeTimers();
    render(<Carousel label="Featured products" slides={slides} autoPlayInterval={1000} />);
    fireEvent.click(screen.getByRole('button', { name: 'Next slide' }));
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.getByRole('group', { name: '2 of 3: Wool scarf' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Start rotation' })).toBeInTheDocument();
  });

  it('does not start rotating when the user prefers reduced motion', () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockReturnValue({ matches: true })
    );
    render(<Carousel label="Featured products" slides={slides} autoPlayInterval={1000} />);
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.getByRole('group', { name: '1 of 3: Linen shirt' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Start rotation' })).toBeInTheDocument();
    vi.unstubAllGlobals();
  });
});
