import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FloatingElement from './FloatingElement';

describe('FloatingElement', () => {
  it('renders children', () => {
    render(<FloatingElement><span>Test</span></FloatingElement>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('renders with default props', () => {
    render(<FloatingElement><span>Test</span></FloatingElement>);
    const container = document.querySelector('div');
    expect(container).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<FloatingElement size="sm"><span>Small</span></FloatingElement>);
    expect(document.querySelector('div')).toBeInTheDocument();

    rerender(<FloatingElement size="lg"><span>Large</span></FloatingElement>);
    expect(document.querySelector('div')).toBeInTheDocument();
  });
});
