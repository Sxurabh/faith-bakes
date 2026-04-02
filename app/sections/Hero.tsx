'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/app/lib/gsap';
import FloatingElement from '@/app/components/FloatingElement';
import BlobShape from '@/app/components/BlobShape';
import { useParallax } from '@/app/hooks/useParallax';

const FLOATING_CIRCLE = (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="40" fill="#FFB6C1" />
    <circle cx="50" cy="45" r="30" fill="#FFF8E7" />
  </svg>
);

const FLOATING_RECT = (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="20" y="30" width="60" height="50" rx="8" fill="#98D8C8" />
  </svg>
);

const FLOATING_TRIANGLE = (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <polygon points="50,10 90,90 10,90" fill="#FFD700" />
  </svg>
);

export default function Hero() {
  const logoRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const parallax1 = useParallax(1);
  const parallax2 = useParallax(0.7);
  const parallax3 = useParallax(1.3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = logoRef.current?.querySelectorAll('.logo-letter');
      
      if (letters && letters.length > 0) {
        gsap.fromTo(
          letters,
          { y: 100, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: 'back.out(1.7)',
            delay: 0.3,
          }
        );
      }

      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: 1.2, ease: 'power2.out' }
        );
      }

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { y: 30, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, delay: 1.6, ease: 'back.out(1.7)' }
        );
      }

      if (scrollIndicatorRef.current) {
        gsap.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.6, delay: 2.2, ease: 'power2.out' }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const logoText = 'Faith Bakes';

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-cream to-soft-pink/20">
      <BlobShape
        color="pink"
        className="absolute top-10 -left-20 w-96 h-96 opacity-20"
      />
      <BlobShape
        color="mint"
        className="absolute bottom-20 -right-20 w-80 h-80 opacity-15"
      />
      <BlobShape
        color="gold"
        className="absolute top-1/3 right-10 w-48 h-48 opacity-10"
      />

      <FloatingElement delay="small" size="lg" className="absolute top-20 left-[10%]" parallaxOffset={parallax1}>
        {FLOATING_CIRCLE}
      </FloatingElement>

      <FloatingElement delay="medium" size="md" className="absolute top-40 right-[15%]" parallaxOffset={parallax2}>
        {FLOATING_RECT}
      </FloatingElement>

      <FloatingElement delay="large" size="md" className="absolute bottom-32 left-[20%]" parallaxOffset={parallax3}>
        {FLOATING_TRIANGLE}
      </FloatingElement>

      <div className="relative z-10 text-center px-6 py-20">
        <h1
          ref={logoRef}
          className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-chocolate mb-4 perspective-1000"
          style={{ perspective: '1000px' }}
        >
          {logoText.split('').map((letter, index) => (
            <span key={index} className="logo-letter inline-block">
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </h1>

        <p
          ref={subtitleRef}
          className="font-nunito text-lg md:text-xl text-chocolate/70 mb-12 max-w-md mx-auto"
        >
          Handcrafted cupcakes, cakes, cookies & brownies made with love
        </p>

        <button
          ref={ctaRef}
          className="font-nunito font-semibold text-lg px-8 py-4 bg-soft-pink text-chocolate rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-bounce-subtle"
          style={{ animationDuration: '2s' }}
          onClick={() => {
            document.getElementById('cupcakes')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Explore Our Treats
        </button>
      </div>

      <div ref={scrollIndicatorRef} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-chocolate/50">
          <span className="text-sm font-nunito">Scroll</span>
          <svg
            className="w-6 h-6 animate-pulse"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
