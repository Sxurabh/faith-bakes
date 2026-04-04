'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from '@/app/lib/gsap';
import { Cake, Cookie, Croissant, Sparkles } from 'lucide-react';
import MagneticButton from '@/app/components/MagneticButton';

const FLOATING_ICONS = [
  { Icon: Cake, color: '#D4A574', delay: 0, x: '10%', y: '20%' },
  { Icon: Cookie, color: '#A8B8A8', delay: 0.5, x: '85%', y: '15%' },
  { Icon: Croissant, color: '#C85A3A', delay: 1, x: '75%', y: '70%' },
  { Icon: Sparkles, color: '#D4A574', delay: 1.5, x: '15%', y: '75%' },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Elegant logo entrance - smooth stagger
      const letters = logoRef.current?.querySelectorAll('.logo-letter');
      if (letters) {
        gsap.fromTo(letters,
          { y: 100, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.06,
            ease: 'power2.out',
            delay: 0.2
          }
        );
      }

      // Subtitle fade up with delay
      if (subtitleRef.current) {
        gsap.fromTo(subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, delay: 1.2, ease: 'power2.out' }
        );
      }

      // Floating icons animation
      gsap.utils.toArray<HTMLElement>('.floating-icon').forEach((icon, i) => {
        gsap.to(icon, {
          y: 'random(-30, 30)',
          x: 'random(-20, 20)',
          rotation: 'random(-15, 15)',
          duration: 'random(3, 5)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const logoText = 'Faith Bakes';
  const parallaxOffset = (factor: number) => {
    if (typeof window === 'undefined') {
      return { transform: 'translate(0, 0)' };
    }
    return {
      transform: `translate(${(mousePos.x - window.innerWidth / 2) * factor}px, ${(mousePos.y - window.innerHeight / 2) * factor}px)`
    };
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden gradient-mesh"
    >
      {/* Animated Background Blobs - Subtle Premium */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-rose-gold/20 rounded-full blur-3xl morph-blob"
          style={{ top: '10%', left: '-10%', ...parallaxOffset(0.02) }}
        />
        <div
          className="absolute w-80 h-80 bg-sage/15 rounded-full blur-3xl morph-blob"
          style={{ bottom: '20%', right: '-5%', ...parallaxOffset(0.03) }}
        />
        <div
          className="absolute w-64 h-64 bg-terracotta/12 rounded-full blur-3xl morph-blob"
          style={{ top: '40%', right: '20%', ...parallaxOffset(0.025) }}
        />
      </div>

      {/* Floating Icons */}
      {FLOATING_ICONS.map(({ Icon, color, delay, x, y }, i) => (
        <div
          key={i}
          className="floating-icon absolute hidden md:block"
          style={{
            left: x,
            top: y,
            color,
            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
            ...parallaxOffset(0.04 * (i + 1))
          }}
        >
          <Icon size={48 + i * 8} strokeWidth={1.5} />
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 py-20 max-w-5xl mx-auto">
        <div className="mb-6 inline-block">
          <span className="px-4 py-2 bg-white/70 backdrop-blur-md rounded-full text-sm font-semibold text-dark-brown/60 shadow-premium border border-rose-gold/20">
            Handcrafted with love in every bite
          </span>
        </div>

        <h1
          ref={logoRef}
          className="font-playfair text-6xl md:text-8xl lg:text-9xl font-black text-dark-brown mb-6 perspective-1000 leading-tight"
          style={{ perspective: '1000px' }}
        >
          {logoText.split('').map((letter, index) => (
            <span
              key={index}
              className="logo-letter inline-block hover:text-rose-gold transition-colors duration-300 cursor-default"
              style={{
                textShadow: '2px 2px 4px rgba(44, 36, 32, 0.1)',
                transformStyle: 'preserve-3d'
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </h1>

        <p
          ref={subtitleRef}
          className="font-nunito text-lg md:text-xl text-dark-brown/60 mb-12 max-w-2xl mx-auto leading-relaxed text-pretty"
        >
          Where every cupcake tells a story, every cake celebrates a moment, and every bite brings pure joy.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <MagneticButton
            variant="primary"
            onClick={() => document.getElementById('cupcakes')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>Explore Our Treats</span>
            <span className="text-xl">🎂</span>
          </MagneticButton>

          <MagneticButton
            variant="gold"
            onClick={() => document.getElementById('customizer')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>Design Your Own</span>
            <span className="text-xl">✨</span>
          </MagneticButton>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-dark-brown/40 animate-bounce">
        <span className="text-sm font-medium">Scroll to explore</span>
        <div className="w-6 h-10 border border-dark-brown/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-rose-gold rounded-full animate-pulse" />
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#FAF8F3"
          />
        </svg>
      </div>
    </section>
  );
}
