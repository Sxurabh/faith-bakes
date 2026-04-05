'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { gsap } from '@/app/lib/gsap';

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'gold';
}

const variantConfig = {
    primary: {
        glow: 'rgba(255, 182, 193, 0.6)',
        particle: '#FFB6C1',
    },
    secondary: {
        glow: 'rgba(93, 64, 55, 0.5)',
        particle: '#5D4037',
    },
    gold: {
        glow: 'rgba(255, 215, 0, 0.6)',
        particle: '#FFD700',
    },
};

export default function MagneticButton({
    children,
    className = '',
    onClick,
    variant = 'primary'
}: MagneticButtonProps) {
    const btnRef = useRef<HTMLButtonElement>(null);
    const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);
    const [particleCount, setParticleCount] = useState(0);
    const [isTouch, setIsTouch] = useState(false);
    const particleIdRef = useRef(0);
    const config = variantConfig[variant];

    useEffect(() => {
        const checkTouch = () => {
            setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
        };
        checkTouch();
        window.addEventListener('resize', checkTouch);
        return () => window.removeEventListener('resize', checkTouch);
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!btnRef.current || isTouch) return;
        const rect = btnRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btnRef.current, {
            x: x * 0.4,
            y: y * 0.4,
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    }, [isTouch]);

    const handleMouseEnter = useCallback(() => {
        if (!btnRef.current || isTouch) return;
        gsap.to(btnRef.current, { scale: 1.02, duration: 0.2 });
    }, [isTouch]);

    const handleMouseLeave = useCallback(() => {
        if (!btnRef.current) return;
        gsap.to(btnRef.current, {
            x: 0,
            y: 0,
            scale: 1,
            duration: isTouch ? 0.2 : 0.5,
            ease: isTouch ? 'power2.out' : 'elastic.out(1, 0.3)'
        });
    }, [isTouch]);

    const handleClick = useCallback((e: React.MouseEvent) => {
        if (!btnRef.current) return;
        const rect = btnRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setRipple({ x, y });

        const newParticleCount = 8;
        const startId = particleIdRef.current;
        particleIdRef.current += newParticleCount;
        setParticleCount(prev => prev + newParticleCount);

        setTimeout(() => {
            for (let i = 0; i < newParticleCount; i++) {
                const angle = (360 / newParticleCount) * i;
                const el = document.createElement('span');
                el.style.cssText = `
                    position: absolute;
                    left: ${x}px;
                    top: ${y}px;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: ${config.particle};
                    pointer-events: none;
                    z-index: 100;
                `;
                btnRef.current?.appendChild(el);
                
                const rad = (angle * Math.PI) / 180;
                const distance = 40 + Math.random() * 20;
                gsap.to(el, {
                    x: Math.cos(rad) * distance,
                    y: Math.sin(rad) * distance,
                    scale: 0,
                    opacity: 0,
                    duration: 0.4 + Math.random() * 0.2,
                    ease: 'power2.out',
                    onComplete: () => {
                        el.remove();
                        setParticleCount(prev => Math.max(0, prev - 1));
                    }
                });
            }
        }, 0);

        gsap.timeline()
            .to(btnRef.current, {
                scale: 0.92,
                duration: 0.08,
                ease: 'power2.in'
            })
            .to(btnRef.current, {
                scale: 1.05,
                duration: 0.15,
                ease: 'elastic.out(1, 0.5)'
            })
            .to(btnRef.current, {
                scale: 1,
                duration: 0.2,
                ease: 'elastic.out(1, 0.3)'
            });

        setTimeout(() => setRipple(null), 500);

        onClick?.();
    }, [onClick, config.particle]);

    useEffect(() => {
        return () => {
            if (btnRef.current) {
                const particles = btnRef.current.querySelectorAll('span');
                particles.forEach(p => p.remove());
            }
        };
    }, []);

    const variantClasses = {
        primary: 'bg-soft-pink text-chocolate hover:shadow-[0_0_25px_rgba(255,182,193,0.6)]',
        secondary: 'bg-chocolate text-cream hover:shadow-[0_0_25px_rgba(93,64,55,0.5)]',
        gold: 'bg-gold text-chocolate hover:shadow-[0_0_25px_rgba(255,215,0,0.6)]'
    };

    return (
        <button
            ref={btnRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            className={`magnetic-btn relative overflow-visible px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg ${variantClasses[variant]} ${className}`}
        >
            <div className="shine-layer" />
            
            <span className="btn-content relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>

            {ripple && (
                <span
                    className="btn-ripple absolute rounded-full pointer-events-none"
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                        background: `radial-gradient(circle, ${config.glow} 0%, transparent 70%)`
                    }}
                />
            )}
        </button>
    );
}
