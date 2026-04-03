import '@testing-library/jest-dom';

vi.mock('gsap', () => ({
  gsap: {
    fromTo: vi.fn(),
    context: vi.fn(() => ({
      revert: vi.fn(),
    })),
    registerPlugin: vi.fn(),
  },
  ScrollTrigger: {
    create: vi.fn(),
  },
}));

Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});
