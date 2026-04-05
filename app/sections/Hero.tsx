'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/app/lib/gsap';
import BlobShape from '@/app/components/BlobShape';
import FloatingElement from '@/app/components/FloatingElement';

const FLOATING_CUPCAKE = (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path d="M50 20C55 20 60 25 60 30C60 35 55 40 50 40C45 40 40 35 40 30C40 25 45 20 50 20Z" fill="#F43F5E" />
    <path d="M30 45C30 35 40 30 50 30C60 30 70 35 70 45C70 55 60 65 50 70C40 65 30 55 30 45Z" fill="#FCD34D" />
    <rect x="35" y="70" width="30" height="20" rx="3" fill="#92400E" />
  </svg>
);

const FLOATING_CAKE = (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <ellipse cx="50" cy="70" rx="35" ry="15" fill="#FCD34D" />
    <rect x="20" y="40" width="60" height="30" rx="5" fill="#F59E0B" />
    <rect x="15" y="55" width="70" height="15" rx="3" fill="#FCD34D" />
  </svg>
);

const FLOATING_COOKIE = (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="35" fill="#92400E" />
    <circle cx="35" cy="40" r="5" fill="#78350F" />
    <circle cx="55" cy="35" r="4" fill="#78350F" />
    <circle cx="45" cy="55" r="4" fill="#78350F" />
    <circle cx="65" cy="50" r="3" fill="#78350F" />
    <circle cx="50" cy="65" r="3" fill="#78350F" />
  </svg>
);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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

      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current,
          { y: 30, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, delay: 1.5, ease: 'back.out(1.7)' }
        );
      }

      if (scrollRef.current) {
        gsap.fromTo(scrollRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.6, delay: 2, ease: 'power2.out' }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const logoText = 'Faith Bakes';

  const scrollTo = (id: string) => {
    if (typeof document !== 'undefined') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-warmIvory to-cream"
    >
      <BlobShape color="amber" size="lg" className="absolute top-[5%] left-[-10%] opacity-40" />
      <BlobShape color="rose" size="md" className="absolute bottom-[20%] right-[-5%] opacity-30" />
      <BlobShape color="gold" size="sm" className="absolute top-[40%] right-[15%] opacity-25" />

      <FloatingElement delay="small" speed="slow" className="absolute top-[15%] left-[8%]">
        <div className="w-16 h-16 sm:w-20 sm:h-20">
          {FLOATING_CUPCAKE}
        </div>
      </FloatingElement>

      <FloatingElement delay="medium" speed="medium" className="absolute top-[20%] right-[12%]">
        <div className="w-20 h-20 sm:w-24 sm:h-24">
          {FLOATING_CAKE}
        </div>
      </FloatingElement>

      <FloatingElement delay="large" speed="slow" className="absolute bottom-[30%] left-[15%]">
        <div className="w-16 h-16 sm:w-20 sm:h-20">
          {FLOATING_COOKIE}
        </div>
      </FloatingElement>

      <div className="relative z-10 text-center px-5 sm:px-6 py-16 sm:py-20 max-w-5xl mx-auto">
        <div className="mb-4 sm:mb-6 inline-block">
          <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/70 backdrop-blur-sm rounded-full text-xs sm:text-sm font-semibold text-chocolate/80 shadow-lg border border-amber-100">
            Handcrafted with Love in Every Bite
          </span>
        </div>

        <h1
          ref={logoRef}
          className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-chocolate mb-4 sm:mb-6 perspective-1000"
          style={{ perspective: '1000px' }}
        >
          {logoText.split('').map((letter, index) => (
            <span
              key={index}
              className="logo-letter inline-block hover:text-amber-600 transition-colors duration-300 cursor-default"
              style={{
                textShadow: '3px 3px 0px rgba(245, 158, 11, 0.2)',
                transformStyle: 'preserve-3d'
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </h1>

        <p
          ref={subtitleRef}
          className="font-inter text-base sm:text-lg md:text-xl lg:text-2xl text-chocolate/70 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-2"
        >
          Where every cupcake tells a story, every cake celebrates a moment,
          and every bite brings pure joy
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <button
            ref={ctaRef}
            onClick={() => scrollTo('cupcakes')}
            className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-amber-600 text-white rounded-full font-semibold text-sm sm:text-lg shadow-lg hover:bg-amber-700 hover:shadow-xl transition-all duration-300 active:scale-95 touch-manipulation cursor-pointer"
          >
            Explore Our Treats
          </button>

          <button
            onClick={() => scrollTo('customizer')}
            className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-white/70 backdrop-blur-sm text-chocolate border-2 border-amber-200 rounded-full font-semibold text-sm sm:text-lg shadow-lg hover:bg-amber-50 hover:shadow-xl transition-all duration-300 active:scale-95 touch-manipulation cursor-pointer"
          >
            Design Your Own
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-chocolate/50">
        <span className="text-xs sm:text-sm font-semibold">Scroll for sweetness</span>
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-chocolate/30 rounded-full flex justify-center pt-1.5 sm:pt-2">
          <div className="w-1.5 h-2.5 sm:w-1.5 sm:h-3 bg-amber-500 rounded-full animate-pulse" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#FEF3C7"
          />
        </svg>
      </div>
    </section>
  );
}
