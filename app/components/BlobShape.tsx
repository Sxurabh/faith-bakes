import { useRef, useEffect } from 'react';
import { gsap } from '@/app/lib/gsap';
import { cn } from '@/app/lib/utils';

interface BlobShapeProps {
  color?: 'amber' | 'rose' | 'gold' | 'cream';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const colorMap: Record<string, string> = {
  amber: '#FCD34D',
  rose: '#F43F5E',
  gold: '#F59E0B',
  cream: '#FEF3C7',
};

export default function BlobShape({ color = 'amber', className = '', size = 'md' }: BlobShapeProps) {
  const blobRef = useRef<HTMLDivElement>(null);
  
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-72 h-72',
  };

  useEffect(() => {
    if (!blobRef.current) return;
    
    gsap.to(blobRef.current, {
      borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
      duration: 4 + Math.random() * 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, []);

  return (
    <div
      ref={blobRef}
      className={cn('absolute rounded-full blur-3xl', sizeClasses[size], className)}
      style={{ 
        backgroundColor: colorMap[color],
        filter: 'blur(40px)',
        opacity: 0.4
      }}
    />
  );
}
