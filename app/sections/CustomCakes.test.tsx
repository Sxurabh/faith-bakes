import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CustomCakes from './CustomCakes';

describe('CustomCakes', () => {
  it('renders section heading', () => {
    render(<CustomCakes />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('renders section element', () => {
    render(<CustomCakes />);
    expect(document.querySelector('section')).toBeInTheDocument();
  });

  it('renders products heading', () => {
    render(<CustomCakes />);
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('renders section id', () => {
    render(<CustomCakes />);
    const section = document.querySelector('section');
    expect(section?.id).toBe('custom-cakes');
  });

  it('renders product cards', () => {
    render(<CustomCakes />);
    const cards = document.querySelectorAll('[class*="rounded-2xl"]');
    expect(cards.length).toBeGreaterThan(0);
  });
});
