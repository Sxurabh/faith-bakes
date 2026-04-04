import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export const defaultScrollTriggerConfig = {
  start: 'top 80%',
  end: 'bottom 20%',
  toggleActions: 'play none none reverse' as const,
};

// Premium animation easing functions
export const springEase = 'elastic.out(1, 0.5)';
export const smoothEase = 'power2.out';
export const elegantEase = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
export const premiumEase = 'power2.inOut';
export const subtleEase = 'cubic-bezier(0.4, 0, 0.2, 1)';
