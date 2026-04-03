import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ScrollReveal from './ScrollReveal';

describe('ScrollReveal', () => {
  it('renders children', () => {
    render(<ScrollReveal><span>Content</span></ScrollReveal>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders with default props', () => {
    render(<ScrollReveal><span>Content</span></ScrollReveal>);
    const container = document.querySelector('div');
    expect(container).toBeInTheDocument();
  });
});
