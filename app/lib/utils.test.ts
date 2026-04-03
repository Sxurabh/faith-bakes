import { describe, it, expect } from 'vitest';
import { cn, formatPrice } from './utils';

describe('cn()', () => {
  it('joins truthy class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('filters out falsy values', () => {
    expect(cn('foo', undefined, null, false, 'bar')).toBe('foo bar');
  });

  it('handles empty input', () => {
    expect(cn()).toBe('');
  });

  it('handles single class', () => {
    expect(cn('foo')).toBe('foo');
  });

  it('handles mixed truthy and falsy', () => {
    expect(cn('active', undefined, 'text-lg', null, 'p-4')).toBe('active text-lg p-4');
  });
});

describe('formatPrice()', () => {
  it('formats cents to dollars with 2 decimals', () => {
    expect(formatPrice(450)).toBe('$4.50');
  });

  it('formats large amounts correctly', () => {
    expect(formatPrice(5500)).toBe('$55.00');
  });

  it('handles zero', () => {
    expect(formatPrice(0)).toBe('$0.00');
  });

  it('rounds down sub-cent values', () => {
    expect(formatPrice(101)).toBe('$1.01');
  });

  it('formats whole dollars', () => {
    expect(formatPrice(1000)).toBe('$10.00');
  });
});
