import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Customizer from './Customizer';

describe('Customizer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Step Navigation', () => {
    it('renders first step as Base', () => {
      render(<Customizer />);
      expect(screen.getByText('Base')).toBeInTheDocument();
    });

    it('renders all step indicators', () => {
      render(<Customizer />);
      expect(screen.getByText('Base')).toBeInTheDocument();
      expect(screen.getByText('Flavor')).toBeInTheDocument();
      expect(screen.getByText('Frosting')).toBeInTheDocument();
      expect(screen.getByText('Toppings')).toBeInTheDocument();
      expect(screen.getByText('Preview')).toBeInTheDocument();
    });

    it('renders base options', () => {
      render(<Customizer />);
      expect(screen.getByText('Cupcake')).toBeInTheDocument();
      expect(screen.getByText('6" Cake')).toBeInTheDocument();
      expect(screen.getByText('8" Cake')).toBeInTheDocument();
      expect(screen.getByText('Cookie Box (12)')).toBeInTheDocument();
    });

    it('navigates to next step when option selected', () => {
      render(<Customizer />);
      
      fireEvent.click(screen.getByText('Cupcake'));
      act(() => {
        vi.advanceTimersByTime(400);
      });
      
      expect(screen.getByText('Flavor')).toBeInTheDocument();
    });
  });

  describe('Toppings Multi-select', () => {
    it('allows multiple toppings selection', () => {
      render(<Customizer />);
      
      fireEvent.click(screen.getByText('Cupcake'));
      act(() => {
        vi.advanceTimersByTime(400);
      });
      fireEvent.click(screen.getByText('Vanilla'));
      act(() => {
        vi.advanceTimersByTime(400);
      });
      fireEvent.click(screen.getByText('Buttercream'));
      act(() => {
        vi.advanceTimersByTime(400);
      });
      fireEvent.click(screen.getByText('Toppings'));
      act(() => {
        vi.advanceTimersByTime(400);
      });
      
      fireEvent.click(screen.getByText('Sprinkles'));
      fireEvent.click(screen.getByText('Chocolate Chips'));
      
      expect(screen.getByText('Sprinkles')).toBeInTheDocument();
    });
  });

  describe('Price Calculation', () => {
    it('displays initial price', () => {
      render(<Customizer />);
      expect(screen.getByText(/\$0\.00/)).toBeInTheDocument();
    });

    it('updates price when base selected', () => {
      render(<Customizer />);
      
      fireEvent.click(screen.getByText('Cupcake'));
      act(() => {
        vi.advanceTimersByTime(400);
      });
      
      expect(screen.getByText(/\$4\.50/)).toBeInTheDocument();
    });
  });

  describe('Navigation Buttons', () => {
    it('disables back button on first step', () => {
      render(<Customizer />);
      
      const backButton = screen.getByRole('button', { name: /back/i });
      expect(backButton).toBeDisabled();
    });

    it('enables back button after moving forward', () => {
      render(<Customizer />);
      
      fireEvent.click(screen.getByText('Cupcake'));
      act(() => {
        vi.advanceTimersByTime(400);
      });
      
      const backButton = screen.getByRole('button', { name: /back/i });
      expect(backButton).not.toBeDisabled();
    });

    it('navigates back correctly', () => {
      render(<Customizer />);
      
      fireEvent.click(screen.getByText('Cupcake'));
      act(() => {
        vi.advanceTimersByTime(400);
      });
      fireEvent.click(screen.getByRole('button', { name: /back/i }));
      act(() => {
        vi.advanceTimersByTime(400);
      });
      
      expect(screen.getByText('Base')).toBeInTheDocument();
    });

    it('renders next button', () => {
      render(<Customizer />);
      
      const nextButton = screen.getByRole('button', { name: /next/i });
      expect(nextButton).toBeInTheDocument();
    });
  });

  describe('Preview Step', () => {
    it('shows preview of selections', () => {
      render(<Customizer />);
      
      fireEvent.click(screen.getByText('Cupcake'));
      act(() => {
        vi.advanceTimersByTime(400);
      });
      fireEvent.click(screen.getByText('Vanilla'));
      act(() => {
        vi.advanceTimersByTime(400);
      });
      fireEvent.click(screen.getByText('Buttercream'));
      act(() => {
        vi.advanceTimersByTime(400);
      });
      fireEvent.click(screen.getByText('Toppings'));
      act(() => {
        vi.advanceTimersByTime(400);
      });
      fireEvent.click(screen.getByText('Sprinkles'));
      act(() => {
        vi.advanceTimersByTime(400);
      });
      fireEvent.click(screen.getByRole('button', { name: /next/i }));
      act(() => {
        vi.advanceTimersByTime(400);
      });
      
      expect(screen.getByText('Your Custom Creation')).toBeInTheDocument();
    });

    it('renders contact to order button in preview', () => {
      render(<Customizer />);
      
      fireEvent.click(screen.getByText('Cupcake'));
      act(() => {
        vi.advanceTimersByTime(400);
      });
      fireEvent.click(screen.getByText('Vanilla'));
      act(() => {
        vi.advanceTimersByTime(400);
      });
      fireEvent.click(screen.getByText('Buttercream'));
      act(() => {
        vi.advanceTimersByTime(400);
      });
      fireEvent.click(screen.getByText('Toppings'));
      act(() => {
        vi.advanceTimersByTime(400);
      });
      fireEvent.click(screen.getByText('Sprinkles'));
      act(() => {
        vi.advanceTimersByTime(400);
      });
      fireEvent.click(screen.getByRole('button', { name: /next/i }));
      act(() => {
        vi.advanceTimersByTime(400);
      });
      
      expect(screen.getByText(/contact to order/i)).toBeInTheDocument();
    });
  });
});
