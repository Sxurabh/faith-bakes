'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from '@/app/lib/gsap';

interface AnimatedCardProps {
  image: string;
  name: string;
  description: string;
  price: number;
  onQuickView?: () => void;
}

export default function AnimatedCard({ image, name, description, price, onQuickView }: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
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
    if (!cardRef.current) return;
    
    gsap.to(cardRef.current, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="relative overflow-hidden rounded-3xl bg-cream shadow-premium transition-shadow duration-300 group-hover:shadow-premium-lg">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-5">
          <h3 className="font-playfair text-xl font-semibold text-dark-brown mb-2">
            {name}
          </h3>
          <p className="text-dark-brown/70 text-sm mb-3 line-clamp-2">
            {description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="font-nunito font-bold text-rose-gold text-lg">
              ${(price / 100).toFixed(2)}
            </span>
            {onQuickView && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickView();
                }}
                className="px-4 py-2 bg-rose-gold text-cream rounded-full text-sm font-semibold hover:bg-terracotta transition-colors"
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
