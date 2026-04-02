'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from '@/app/lib/gsap';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
}

export default function ScrollReveal({
  children,
  className = '',
  y = 50,
  delay = 0,
  duration = 0.8,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, ref);
    
    return () => ctx.revert();
  }, [y, delay, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
