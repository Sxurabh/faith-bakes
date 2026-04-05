'use client';

import { useState, useRef, useEffect } from 'react';
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
    const [isTouch, setIsTouch] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const shineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkTouch = () => {
            setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
        };
        checkTouch();
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current || isFlipped || isTouch) return;
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

        if (shineRef.current) {
            shineRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.3) 0%, transparent 60%)`;
        }
    };

    const handleMouseLeave = () => {
        if (!cardRef.current || isFlipped || isTouch) return;
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
            className={`flip-card w-full h-80 sm:h-96 cursor-pointer group ${isFlipped ? 'flipped' : ''}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div
                ref={cardRef}
                className="flip-card-inner relative w-full h-full transition-all duration-700"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* FRONT */}
                <div className="flip-card-front bg-cream rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden border-2 border-soft-pink/20">
                    <div className="relative h-36 sm:h-48 overflow-hidden">
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
                        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-gold/90 text-chocolate text-xs font-bold px-2 py-1 sm:px-3 sm:py-1 rounded-full shadow-lg">
                            ${(price / 100).toFixed(2)}
                        </div>
                    </div>
                    <div className="p-3 sm:p-5 relative">
                        <h3 className="font-playfair text-lg sm:text-2xl font-bold text-chocolate mb-1 sm:mb-2">{name}</h3>
                        <p className="text-xs sm:text-sm text-chocolate/70 mb-3 sm:mb-4 line-clamp-2">{description}</p>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <button
                                onClick={handleFlip}
                                className="w-full py-2 sm:py-2.5 bg-soft-pink text-chocolate rounded-full text-xs sm:text-sm font-semibold hover:bg-mint transition-colors duration-300 shadow-md hover:shadow-lg active:scale-95 touch-manipulation"
                            >
                                Flip for Details
                            </button>
                            {onQuickView && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); onQuickView(); }}
                                    className="px-3 py-2 sm:px-4 sm:py-2 border-2 border-chocolate/20 rounded-full text-chocolate/70 hover:border-soft-pink hover:text-soft-pink transition-colors text-sm touch-manipulation"
                                >
                                    View
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* BACK */}
                <div className="flip-card-back p-4 sm:p-6 flex flex-col justify-between text-chocolate">
                    <div>
                        <h3 className="font-playfair text-lg sm:text-2xl font-bold mb-2 sm:mb-4">{name}</h3>
                        <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                            {details.length > 0 ? details.map((detail, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs sm:text-sm">
                                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cream rounded-full flex-shrink-0" />
                                    <span className="truncate">{detail}</span>
                                </div>
                            )) : (
                                <>
                                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cream rounded-full flex-shrink-0" />
                                        <span>Freshly baked daily</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cream rounded-full flex-shrink-0" />
                                        <span>Premium ingredients</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cream rounded-full flex-shrink-0" />
                                        <span>Perfect for sharing</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                        <div className="text-2xl sm:text-3xl font-bold text-cream">${(price / 100).toFixed(2)}</div>
                        <button
                            onClick={handleFlip}
                            className="w-full py-2 sm:py-3 bg-cream text-chocolate rounded-full font-bold hover:bg-gold transition-colors duration-300 shadow-lg active:scale-95 touch-manipulation"
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
