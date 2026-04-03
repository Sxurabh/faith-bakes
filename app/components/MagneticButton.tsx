'use client';

import { useRef, useState } from 'react';
import { gsap } from '@/app/lib/gsap';

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'gold';
}

export default function MagneticButton({
    children,
    className = '',
    onClick,
    variant = 'primary'
}: MagneticButtonProps) {
    const btnRef = useRef<HTMLButtonElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!btnRef.current) return;
        const rect = btnRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btnRef.current, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: 'power2.out'
        });
    };

    const handleMouseLeave = () => {
        if (!btnRef.current) return;
        gsap.to(btnRef.current, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)'
        });
        setIsHovered(false);
    };

    const variantClasses = {
        primary: 'bg-soft-pink text-chocolate hover:bg-mint',
        secondary: 'bg-chocolate text-cream hover:bg-chocolate/80',
        gold: 'bg-gold text-chocolate hover:bg-soft-pink'
    };

    return (
        <button
            ref={btnRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className={`magnetic-btn px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 ${variantClasses[variant]} ${className} ${isHovered ? 'scale-110 shadow-2xl' : 'shadow-lg'}`}
        >
            <span className="relative z-10 flex items-center gap-2">
                {children}
            </span>
            {isHovered && (
                <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />
            )}
        </button>
    );
}