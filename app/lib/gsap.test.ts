import { describe, it, expect } from 'vitest';
import { gsap, ScrollTrigger, defaultScrollTriggerConfig, springEase, smoothEase } from './gsap';

describe('GSAP exports', () => {
  it('exports gsap instance', () => {
    expect(gsap).toBeDefined();
  });

  it('exports ScrollTrigger', () => {
    expect(ScrollTrigger).toBeDefined();
  });
});

describe('defaultScrollTriggerConfig', () => {
  it('has correct start value', () => {
    expect(defaultScrollTriggerConfig.start).toBe('top 80%');
  });

  it('has correct end value', () => {
    expect(defaultScrollTriggerConfig.end).toBe('bottom 20%');
  });

  it('has correct toggleActions', () => {
    expect(defaultScrollTriggerConfig.toggleActions).toBe('play none none reverse');
  });
});

describe('Ease constants', () => {
  it('has springEase defined', () => {
    expect(springEase).toBe('elastic.out(1, 0.5)');
  });

  it('has smoothEase defined', () => {
    expect(smoothEase).toBe('power2.out');
  });
});
