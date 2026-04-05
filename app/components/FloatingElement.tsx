import { useRef, useEffect } from 'react';
import { gsap } from '@/app/lib/gsap';
import { cn } from '@/app/lib/utils';

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  delay?: 'none' | 'small' | 'medium' | 'large';
  speed?: 'slow' | 'medium' | 'fast';
}

const delayMap = {
  none: 0,
  small: 0.2,
  medium: 0.5,
  large: 1,
};

export default function FloatingElement({ 
  children, 
  className = '',
  delay = 'none',
  speed = 'medium'
}: FloatingElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const speedMap = {
    slow: { y: 30, x: 20, rotation: 15, duration: 6 },
    medium: { y: 20, x: 15, rotation: 10, duration: 4 },
    fast: { y: 15, x: 10, rotation: 8, duration: 3 },
  };

  useEffect(() => {
    if (!ref.current) return;
    
    const { y, x, rotation, duration } = speedMap[speed];
    
    gsap.to(ref.current, {
      y: `random(-${y}, ${y})`,
      x: `random(-${x}, ${x})`,
      rotation: `random(-${rotation}, ${rotation})`,
      duration: duration,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: delayMap[delay],
    });
  }, [speed, delay]);

  return (
    <div ref={ref} className={cn('pointer-events-none', className)}>
      {children}
    </div>
  );
}
