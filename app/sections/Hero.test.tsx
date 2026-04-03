import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from './Hero';

describe('Hero', () => {
  it('renders main heading', () => {
    render(<Hero />);
    expect(screen.getByText(/Handcrafted/i)).toBeInTheDocument();
  });

  it('renders CTA button', () => {
    render(<Hero />);
    expect(screen.getByRole('button', { name: /Explore Our Treats/i })).toBeInTheDocument();
  });

  it('renders section element', () => {
    render(<Hero />);
    expect(document.querySelector('section')).toBeInTheDocument();
  });

  it('renders subtitle', () => {
    render(<Hero />);
    expect(screen.getByText(/cupcakes/i)).toBeInTheDocument();
  });

  it('renders scroll indicator', () => {
    render(<Hero />);
    expect(screen.getByText(/Scroll/i)).toBeInTheDocument();
  });

  it('renders SVG elements', () => {
    render(<Hero />);
    const svgElements = document.querySelectorAll('svg');
    expect(svgElements.length).toBeGreaterThan(0);
  });

  it('renders blob shapes', () => {
    render(<Hero />);
    const blobShapes = document.querySelectorAll('svg');
    expect(blobShapes.length).toBeGreaterThanOrEqual(3);
  });

  it('renders floating elements', () => {
    render(<Hero />);
    const floatingElements = document.querySelectorAll('.animate-float, .animate-float-delayed, .animate-float-slow');
    expect(floatingElements.length).toBeGreaterThan(0);
  });
});
