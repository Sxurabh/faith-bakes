import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Cupcakes from './Cupcakes';

describe('Cupcakes', () => {
  it('renders section heading', () => {
    render(<Cupcakes />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('renders section element', () => {
    render(<Cupcakes />);
    expect(document.querySelector('section')).toBeInTheDocument();
  });

  it('renders products heading', () => {
    render(<Cupcakes />);
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('renders section id', () => {
    render(<Cupcakes />);
    const section = document.querySelector('section');
    expect(section?.id).toBe('cupcakes');
  });

  it('renders product cards', () => {
    render(<Cupcakes />);
    const cards = document.querySelectorAll('[class*="rounded-2xl"]');
    expect(cards.length).toBeGreaterThan(0);
  });
});
