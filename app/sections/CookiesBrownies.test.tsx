import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CookiesBrownies from './CookiesBrownies';

describe('CookiesBrownies', () => {
  it('renders section heading', () => {
    render(<CookiesBrownies />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('renders section element', () => {
    render(<CookiesBrownies />);
    expect(document.querySelector('section')).toBeInTheDocument();
  });

  it('renders cookies section heading', () => {
    render(<CookiesBrownies />);
    const h3Elements = screen.getAllByRole('heading', { level: 3 });
    expect(h3Elements.some(el => el.textContent === 'Cookies')).toBe(true);
  });

  it('renders brownies section heading', () => {
    render(<CookiesBrownies />);
    const h3Elements = screen.getAllByRole('heading', { level: 3 });
    expect(h3Elements.some(el => el.textContent === 'Brownies')).toBe(true);
  });

  it('renders grid layouts', () => {
    render(<CookiesBrownies />);
    const grids = document.querySelectorAll('.grid');
    expect(grids.length).toBeGreaterThanOrEqual(2);
  });

  it('renders section id', () => {
    render(<CookiesBrownies />);
    const section = document.querySelector('section');
    expect(section?.id).toBe('cookies-brownies');
  });

  it('renders all product cards', () => {
    render(<CookiesBrownies />);
    const cards = document.querySelectorAll('[class*="rounded-2xl"]');
    expect(cards.length).toBeGreaterThan(0);
  });
});
