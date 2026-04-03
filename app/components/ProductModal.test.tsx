import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductModal from './ProductModal';

const mockProduct = {
  name: 'Chocolate Cake',
  description: 'Delicious chocolate cake',
  image: '/cake.jpg',
  price: 4500,
};

describe('ProductModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns null when not open', () => {
    render(<ProductModal product={mockProduct} isOpen={false} onClose={vi.fn()} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders when open', () => {
    render(<ProductModal product={mockProduct} isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders product name', () => {
    render(<ProductModal product={mockProduct} isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText('Chocolate Cake')).toBeInTheDocument();
  });

  it('renders product description', () => {
    render(<ProductModal product={mockProduct} isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText('Delicious chocolate cake')).toBeInTheDocument();
  });

  it('renders product price', () => {
    render(<ProductModal product={mockProduct} isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText('$45.00')).toBeInTheDocument();
  });

  it('renders close button', () => {
    render(<ProductModal product={mockProduct} isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Close modal' })).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    const onClose = vi.fn();
    render(<ProductModal product={mockProduct} isOpen={true} onClose={onClose} />);
    
    fireEvent.click(screen.getByRole('button', { name: 'Close modal' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop clicked', () => {
    const onClose = vi.fn();
    render(<ProductModal product={mockProduct} isOpen={true} onClose={onClose} />);
    
    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('handles Escape key when open', () => {
    const onClose = vi.fn();
    render(<ProductModal product={mockProduct} isOpen={true} onClose={onClose} />);
    
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not handle Escape when closed', () => {
    const onClose = vi.fn();
    render(<ProductModal product={mockProduct} isOpen={false} onClose={onClose} />);
    
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('renders Order Now button', () => {
    render(<ProductModal product={mockProduct} isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Order Now' })).toBeInTheDocument();
  });
});
