import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import BlobShape from './BlobShape';

describe('BlobShape', () => {
  it('renders SVG element', () => {
    render(<BlobShape />);
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<BlobShape className="custom-class" />);
    const svg = document.querySelector('svg');
    expect(svg).toHaveClass('custom-class');
  });

  it('renders with pink color by default', () => {
    render(<BlobShape />);
    const path = document.querySelector('path');
    expect(path?.getAttribute('fill')).toBe('#FFB6C1');
  });

  it('renders with mint color', () => {
    render(<BlobShape color="mint" />);
    const path = document.querySelector('path');
    expect(path?.getAttribute('fill')).toBe('#98D8C8');
  });

  it('renders with gold color', () => {
    render(<BlobShape color="gold" />);
    const path = document.querySelector('path');
    expect(path?.getAttribute('fill')).toBe('#FFD700');
  });

  it('applies custom opacity', () => {
    render(<BlobShape opacity={50} />);
    const path = document.querySelector('path');
    expect(path?.getAttribute('opacity')).toBe('0.5');
  });

  it('applies default opacity of 30', () => {
    render(<BlobShape />);
    const path = document.querySelector('path');
    expect(path?.getAttribute('opacity')).toBe('0.3');
  });
});
