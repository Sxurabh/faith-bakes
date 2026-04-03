import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Contact from './Contact';

describe('Contact', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Form Rendering', () => {
    it('renders form heading', () => {
      render(<Contact />);
      expect(screen.getByText('Get In Touch')).toBeInTheDocument();
    });

    it('renders name input', () => {
      render(<Contact />);
      expect(screen.getByLabelText('Your Name')).toBeInTheDocument();
    });

    it('renders email input', () => {
      render(<Contact />);
      expect(screen.getByLabelText('Your Email')).toBeInTheDocument();
    });

    it('renders message textarea', () => {
      render(<Contact />);
      expect(screen.getByLabelText('Your Message')).toBeInTheDocument();
    });

    it('renders submit button', () => {
      render(<Contact />);
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    });
  });

  describe('Form State', () => {
    it('updates name field', () => {
      render(<Contact />);
      
      const nameInput = screen.getByLabelText('Your Name');
      fireEvent.change(nameInput, { target: { value: 'John' } });
      
      expect(nameInput).toHaveValue('John');
    });

    it('updates email field', () => {
      render(<Contact />);
      
      const emailInput = screen.getByLabelText('Your Email');
      fireEvent.change(emailInput, { target: { value: 'john@test.com' } });
      
      expect(emailInput).toHaveValue('john@test.com');
    });

    it('updates message field', () => {
      render(<Contact />);
      
      const messageInput = screen.getByLabelText('Your Message');
      fireEvent.change(messageInput, { target: { value: 'Hello!' } });
      
      expect(messageInput).toHaveValue('Hello!');
    });
  });

  describe('Form Submission', () => {
    it('shows loading state on submit', () => {
      render(<Contact />);
      
      fireEvent.change(screen.getByLabelText('Your Name'), { target: { value: 'John' } });
      fireEvent.change(screen.getByLabelText('Your Email'), { target: { value: 'john@test.com' } });
      fireEvent.change(screen.getByLabelText('Your Message'), { target: { value: 'Hello!' } });
      
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
      
      expect(screen.getByText(/sending/i)).toBeInTheDocument();
    });

    it('disables button while submitting', () => {
      render(<Contact />);
      
      fireEvent.change(screen.getByLabelText('Your Name'), { target: { value: 'John' } });
      fireEvent.change(screen.getByLabelText('Your Email'), { target: { value: 'john@test.com' } });
      fireEvent.change(screen.getByLabelText('Your Message'), { target: { value: 'Hello!' } });
      
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));
      
      expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled();
    });
  });

  describe('Form Validation', () => {
    it('has required fields', () => {
      render(<Contact />);
      
      const nameInput = screen.getByLabelText('Your Name');
      const emailInput = screen.getByLabelText('Your Email');
      const messageInput = screen.getByLabelText('Your Message');
      
      expect(nameInput).toBeRequired();
      expect(emailInput).toBeRequired();
      expect(messageInput).toBeRequired();
    });
  });
});
