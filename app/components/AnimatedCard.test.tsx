import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AnimatedCard from './AnimatedCard';

const defaultProps = {
  image: '/cupcake.jpg',
  name: 'Chocolate Cupcake',
  description: 'Rich chocolate delight',
  price: 450,
};

describe('AnimatedCard', () => {
  it('renders product name', () => {
    render(<AnimatedCard {...defaultProps} />);
    expect(screen.getByText('Chocolate Cupcake')).toBeInTheDocument();
  });

  it('renders product description', () => {
    render(<AnimatedCard {...defaultProps} />);
    expect(screen.getByText('Rich chocolate delight')).toBeInTheDocument();
  });

  it('renders formatted price', () => {
    render(<AnimatedCard {...defaultProps} />);
    expect(screen.getByText('$4.50')).toBeInTheDocument();
  });

  it('renders Quick View button when onQuickView provided', () => {
    render(<AnimatedCard {...defaultProps} onQuickView={vi.fn()} />);
    expect(screen.getByText('Quick View')).toBeInTheDocument();
  });

  it('does not render Quick View button when onQuickView not provided', () => {
    render(<AnimatedCard {...defaultProps} />);
    expect(screen.queryByText('Quick View')).not.toBeInTheDocument();
  });

  it('calls onQuickView when Quick View clicked', () => {
    const onQuickView = vi.fn();
    render(<AnimatedCard {...defaultProps} onQuickView={onQuickView} />);
    
    fireEvent.click(screen.getByText('Quick View'));
    expect(onQuickView).toHaveBeenCalledTimes(1);
  });

  it('handles mouse move event', () => {
    const { container } = render(<AnimatedCard {...defaultProps} />);
    const card = container.querySelector('div');
    
    if (card) {
      fireEvent.mouseMove(card, {
        clientX: 100,
        clientY: 100,
      });
    }
    
    expect(screen.getByText('Chocolate Cupcake')).toBeInTheDocument();
  });

  it('handles mouse leave event', () => {
    const { container } = render(<AnimatedCard {...defaultProps} />);
    const card = container.querySelector('div');
    
    if (card) {
      fireEvent.mouseLeave(card);
    }
    
    expect(screen.getByText('Chocolate Cupcake')).toBeInTheDocument();
  });

  it('renders different price correctly', () => {
    render(<AnimatedCard {...defaultProps} price={5500} />);
    expect(screen.getByText('$55.00')).toBeInTheDocument();
  });
});
