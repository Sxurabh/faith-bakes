import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useParallax } from './useParallax';

describe('useParallax', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('returns 0 before mount (SSR safety)', () => {
    const { result } = renderHook(() => useParallax());
    expect(result.current).toBe(0);
  });

  it('accepts custom speed parameter', () => {
    const { result } = renderHook(() => useParallax(2));
    expect(result.current).toBe(0);
  });

  it('cleans up event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useParallax());
    
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});
