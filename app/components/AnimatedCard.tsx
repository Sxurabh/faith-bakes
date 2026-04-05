'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from '@/app/lib/gsap';
import { cn } from '@/app/lib/utils';

interface AnimatedCardProps {
  image: string;
  name: string;
  description: string;
  price: number;
  onQuickView?: () => void;
}

export default function AnimatedCard({ image, name, description, price, onQuickView }: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isTouch) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    gsap.to(cardRef.current, {
      rotationX: rotateX,
      rotationY: rotateY,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || isTouch) return;
    
    gsap.to(cardRef.current, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
    setIsHovered(false);
  };

  const handleClick = () => {
    if (isTouch && onQuickView) {
      onQuickView();
    }
  };

  return (
    <div
      ref={cardRef}
      className="relative group cursor-pointer perspective-1000"
      onMouseEnter={() => !isTouch && setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="relative overflow-hidden rounded-3xl bg-white/60 backdrop-blur-md border border-white/30 shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.02]">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-amber-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-5">
          <h3 className="font-playfair text-xl font-semibold text-chocolate mb-2">
            {name}
          </h3>
          <p className="text-chocolate/70 text-sm mb-3 line-clamp-2">
            {description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="font-inter font-bold text-amber-700 text-lg">
              ${(price / 100).toFixed(2)}
            </span>
            {onQuickView && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickView();
                }}
                className="px-4 py-2 bg-amber-100 text-chocolate rounded-full text-sm font-semibold hover:bg-amber-200 transition-colors cursor-pointer touch-manipulation"
              >
                Quick View
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
