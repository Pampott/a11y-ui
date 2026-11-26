import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ProgressRing, Heading } from '../index';
import { Page } from './ExamplePage';

describe('page building blocks', () => {
  it('has no axe violations when composed into a page', async () => {
    const { container } = render(<Page />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('keeps the heading level apart from its size', () => {
    render(<Heading level={3} size="display">Titre</Heading>);
    expect(screen.getByRole('heading', { level: 3, name: 'Titre' })).toBeInTheDocument();
  });

  it('marks the current page and finished steps in text', () => {
    render(<Page />);
    expect(screen.getByRole('link', { name: 'Scan' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByText('terminé')).toHaveClass('sr-only');
    expect(screen.getByText('Lecture').closest('li')).toHaveAttribute('aria-current', 'step');
  });

  it('gives the score ring a text alternative', () => {
    render(<ProgressRing value={72} label="Score" />);
    expect(screen.getByRole('img', { name: 'Score : 72' })).toBeInTheDocument();
  });

  it('makes the scrolling table reachable from the keyboard', () => {
    render(<Page />);
    expect(screen.getByRole('region', { name: 'Tarifs' })).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('rowheader', { name: 'Diagnostic' })).toBeInTheDocument();
  });
});
