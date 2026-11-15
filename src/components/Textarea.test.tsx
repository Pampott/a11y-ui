import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('is named by its label and described by its hint', async () => {
    const { container } = render(
      <Textarea label="Describe the problem" hint="At least 20 characters." required />
    );
    const field = screen.getByRole('textbox', { name: /Describe the problem/ });
    expect(field).toHaveAccessibleDescription('At least 20 characters.');
    expect(field).toBeRequired();
    expect(await axe(container)).toHaveNoViolations();
  });

  it('marks the field invalid and announces the error', async () => {
    const { container } = render(
      <Textarea label="Describe the problem" hint="At least 20 characters." error="Too short." />
    );
    const field = screen.getByRole('textbox', { name: 'Describe the problem' });
    expect(field).toBeInvalid();
    expect(field).toHaveAccessibleDescription('At least 20 characters. Too short.');
    expect(screen.getByRole('alert')).toHaveTextContent('Too short.');
    expect(await axe(container)).toHaveNoViolations();
  });

  it('accepts multi-line input and forwards its ref', async () => {
    const user = userEvent.setup();
    const ref = { current: null as HTMLTextAreaElement | null };
    render(<Textarea label="Code" ref={ref} />);
    await user.type(screen.getByRole('textbox', { name: 'Code' }), 'line 1{Enter}line 2');
    expect(ref.current?.value).toBe('line 1\nline 2');
  });
});
