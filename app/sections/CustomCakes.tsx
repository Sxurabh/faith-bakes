'use client';

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/app/lib/gsap';
import { products } from '@/app/data/products';
import AnimatedCard from '@/app/components/AnimatedCard';

export default function CustomCakes() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        Array.from(cards).forEach((card, index) => {
          const direction = index % 2 === 0 ? -50 : 50;
          const rotation = index % 2 === 0 ? -3 : 3;
          gsap.fromTo(
            card,
            { x: direction, opacity: 0, rotation },
            {
              x: 0,
              opacity: 1,
              rotation: 0,
              duration: 0.8,
              ease: 'elastic.out(1, 0.5)',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="custom-cakes" className="py-20 px-6 bg-soft-pink/10">
      <h2
        ref={headingRef}
        className="font-playfair text-4xl md:text-5xl text-center text-chocolate mb-4"
      >
        Custom Cakes
      </h2>
      <p className="text-center text-chocolate/70 mb-12 max-w-2xl mx-auto">
        Design your dream cake with our custom cake builder
      </p>
      <div
        ref={cardsRef}
        className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 max-w-6xl mx-auto"
      >
        {products.cakes.map((cake, index) => (
          <div
            key={cake.id}
            className={`break-inside-avoid ${index === 0 ? 'lg:col-span-2' : ''}`}
          >
            <AnimatedCard
              image={cake.image}
              name={cake.name}
              description={cake.description}
              price={cake.basePrice}
            />
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <button className="px-8 py-4 bg-gold text-chocolate rounded-full font-semibold text-lg hover:scale-105 hover:shadow-lg transition-all duration-300">
          Customize Yours
        </button>
      </div>
    </section>
  );
}