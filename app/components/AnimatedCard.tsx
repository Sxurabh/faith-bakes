'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

interface AnimatedCardProps {
  image: string;
  name: string;
  description: string;
  price: number;
  onQuickView?: () => void;
}

export default function AnimatedCard({ image, name, description, price, onQuickView }: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0) rotateY(0) scale(1)');
  };

  return (
    <div
      ref={cardRef}
      className="group relative bg-cream rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 ease-out cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform }}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-chocolate/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-4">
        <h3 className="font-playfair text-xl font-semibold text-chocolate mb-1">{name}</h3>
        <p className="text-sm text-chocolate/70 mb-2 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <span className="font-nunito font-bold text-mint">${(price / 100).toFixed(2)}</span>
          {onQuickView && (
            <button 
              onClick={(e) => { e.stopPropagation(); onQuickView(); }}
              className="text-sm text-soft-pink hover:text-mint transition-colors font-medium"
            >
              Quick View
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
