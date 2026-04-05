'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from '@/app/lib/gsap';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', updateWindowSize);
    updateWindowSize();
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateWindowSize);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = logoRef.current?.querySelectorAll('.logo-letter');
      if (letters) {
        gsap.fromTo(letters,
          { y: 100, opacity: 0, rotateX: -90, scale: 0.5 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.06,
            ease: 'elastic.out(1, 0.5)',
            delay: 0.3
          }
        );
      }

      if (subtitleRef.current) {
        gsap.fromTo(subtitleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, delay: 1.2, ease: 'power2.out' }
        );
      }

      gsap.utils.toArray<HTMLElement>('.floating-icon').forEach((icon, i) => {
        gsap.to(icon, {
          y: 'random(-20, 20)',
          x: 'random(-15, 15)',
          rotation: 'random(-10, 10)',
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
  const parallaxOffset = (factor: number) => ({
    transform: `translate(${(mousePos.x - windowSize.width / 2) * factor}px, ${(mousePos.y - windowSize.height / 2) * factor}px)`
  });

  const scrollTo = (id: string) => {
    if (typeof document !== 'undefined') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden gradient-mesh"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-64 h-64 sm:w-80 md:w-96 lg:w-[28rem] bg-soft-pink/30 rounded-full blur-3xl morph-blob"
          style={{ top: '10%', left: '-15%', ...parallaxOffset(0.02) }}
        />
        <div
          className="absolute w-56 h-56 sm:w-72 md:w-80 lg:w-96 bg-mint/30 rounded-full blur-3xl morph-blob"
          style={{ bottom: '20%', right: '-10%', ...parallaxOffset(0.03) }}
        />
        <div
          className="absolute w-48 h-48 sm:w-56 md:w-64 lg:w-80 bg-gold/20 rounded-full blur-3xl morph-blob"
          style={{ top: '40%', right: '20%', ...parallaxOffset(0.025) }}
        />
      </div>

      <div className="absolute hidden md:block">
        <div className="floating-icon absolute" style={{ top: '20%', left: '10%' }}>
          <div className="text-[#FFB6C1]" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2C13.5 4 15 5 18 5C20 5 21 6.5 21 9C21 12 18 14 18 16L18 22H6L6 16C6 14 3 12 3 9C3 6.5 4 5 6 5C9 5 10.5 4 12 2Z" />
            </svg>
          </div>
        </div>
        <div className="floating-icon absolute" style={{ top: '15%', right: '15%' }}>
          <div className="text-[#98D8C8]" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12C8 9.5 10 8 12 8C14 8 16 9.5 16 12C16 14.5 14 16 12 16" />
            </svg>
          </div>
        </div>
        <div className="floating-icon absolute" style={{ bottom: '30%', right: '25%' }}>
          <div className="text-[#FFD700]" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 19L6 13L12 15L18 13L20 19H4Z" />
              <path d="M12 15L6 5L12 3L18 5L12 15Z" />
            </svg>
          </div>
        </div>
        <div className="floating-icon absolute" style={{ bottom: '25%', left: '15%' }}>
          <div className="text-[#FFB6C1]" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polygon points="12,2 15,8.5 22,9.3 17,14 18.2,21 12,17.8 5.8,21 7,14 2,9.3 9,8.5" />
            </svg>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center px-5 sm:px-6 py-16 sm:py-20 max-w-5xl mx-auto">
        <div className="mb-4 sm:mb-6 inline-block">
          <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/80 backdrop-blur-sm rounded-full text-xs sm:text-sm font-semibold text-chocolate/70 shadow-lg border border-soft-pink/20">
            Handcrafted with Love in Every Bite
          </span>
        </div>

        <h1
          ref={logoRef}
          className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-chocolate mb-4 sm:mb-6 perspective-1000 leading-tight"
          style={{ perspective: '1000px' }}
        >
          {logoText.split('').map((letter, index) => (
            <span
              key={index}
              className="logo-letter inline-block hover:text-soft-pink transition-colors duration-300 cursor-default"
              style={{
                textShadow: '4px 4px 0px rgba(255,182,193,0.3)',
                transformStyle: 'preserve-3d'
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </h1>

        <p
          ref={subtitleRef}
          className="font-nunito text-base sm:text-lg md:text-xl lg:text-2xl text-chocolate/70 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-2"
        >
          Where every cupcake tells a story, every cake celebrates a moment,
          and every bite brings pure joy
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <button
            onClick={() => scrollTo('cupcakes')}
            className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-soft-pink text-chocolate rounded-full font-bold text-sm sm:text-lg shadow-lg hover:bg-mint hover:shadow-xl transition-all duration-300 active:scale-95 touch-manipulation"
          >
            Explore Our Treats
          </button>

          <button
            onClick={() => scrollTo('customizer')}
            className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-gold text-chocolate rounded-full font-bold text-sm sm:text-lg shadow-lg hover:bg-soft-pink hover:shadow-xl transition-all duration-300 active:scale-95 touch-manipulation"
          >
            Design Your Own
          </button>
        </div>
      </div>

      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-chocolate/50 animate-bounce">
        <span className="text-xs sm:text-sm font-semibold">Scroll for sweetness</span>
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-chocolate/30 rounded-full flex justify-center pt-1.5 sm:pt-2">
          <div className="w-1.5 h-2.5 sm:w-1.5 sm:h-3 bg-soft-pink rounded-full animate-pulse" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#FFF8E7"
          />
        </svg>
      </div>
    </section>
  );
}
