'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/app/lib/gsap';

interface FlipCardProps {
    image: string;
    name: string;
    description: string;
    price: number;
    details?: string[];
    onQuickView?: () => void;
}

export default function FlipCard({
    image,
    name,
    description,
    price,
    details = [],
    onQuickView
}: FlipCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const shineRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current || isFlipped) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        gsap.to(cardRef.current, {
            rotateX: -rotateX,
            rotateY: -rotateY,
            transformPerspective: 1000,
            duration: 0.3,
            ease: 'power2.out'
        });

        // Move shine effect
        if (shineRef.current) {
            shineRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.3) 0%, transparent 60%)`;
        }
    };

    const handleMouseLeave = () => {
        if (!cardRef.current || isFlipped) return;
        gsap.to(cardRef.current, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
        });
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div
            className="flip-card w-full h-96 cursor-pointer group"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div
                ref={cardRef}
                className={`flip-card-inner relative w-full h-full transition-all duration-700 ${isFlipped ? 'flipped' : ''}`}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* FRONT */}
                <div className="flip-card-front bg-cream rounded-3xl shadow-xl overflow-hidden border-2 border-soft-pink/20">
                    <div className="relative h-48 overflow-hidden">
                        <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div
                            ref={shineRef}
                            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                        <div className="absolute top-3 right-3 bg-gold/90 text-chocolate text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                            ${(price / 100).toFixed(2)}
                        </div>
                    </div>
                    <div className="p-5 relative">
                        <h3 className="font-playfair text-2xl font-bold text-chocolate mb-2">{name}</h3>
                        <p className="text-sm text-chocolate/70 mb-4 line-clamp-2">{description}</p>
                        <div className="flex gap-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); handleFlip(); }}
                                className="flex-1 py-2 bg-soft-pink text-chocolate rounded-full text-sm font-semibold hover:bg-mint transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                                Flip for Details ✨
                            </button>
                            {onQuickView && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); onQuickView(); }}
                                    className="px-4 py-2 border-2 border-chocolate/20 rounded-full text-chocolate/70 hover:border-soft-pink hover:text-soft-pink transition-colors"
                                >
                                    👁
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* BACK */}
                <div className="flip-card-back p-6 flex flex-col justify-between text-chocolate">
                    <div>
                        <h3 className="font-playfair text-2xl font-bold mb-4">{name}</h3>
                        <div className="space-y-2 mb-4">
                            {details.length > 0 ? details.map((detail, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm">
                                    <span className="w-2 h-2 bg-cream rounded-full" />
                                    <span>{detail}</span>
                                </div>
                            )) : (
                                <>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="w-2 h-2 bg-cream rounded-full" />
                                        <span>Freshly baked daily</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="w-2 h-2 bg-cream rounded-full" />
                                        <span>Premium ingredients</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="w-2 h-2 bg-cream rounded-full" />
                                        <span>Perfect for sharing</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="text-3xl font-bold text-cream">${(price / 100).toFixed(2)}</div>
                        <button
                            onClick={(e) => { e.stopPropagation(); handleFlip(); }}
                            className="w-full py-3 bg-cream text-chocolate rounded-full font-bold hover:bg-gold transition-colors duration-300 shadow-lg"
                        >
                            Back to Front ↺
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}