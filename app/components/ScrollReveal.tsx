'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from '@/app/lib/gsap';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  scale?: number;
  rotate?: number;
  stagger?: number;
}

export default function ScrollReveal({
  children,
  className = '',
  y = 50,
  delay = 0,
  duration = 0.8,
  scale = 1,
  rotate = 0,
  stagger = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { y, opacity: 0, scale, rotate },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration,
          delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [y, delay, duration, scale, rotate]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
