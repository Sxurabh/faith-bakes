'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap, ScrollTrigger } from '@/app/lib/gsap';
import { products } from '@/app/data/products';
import FlipCard from '@/app/components/FlipCard';
import AnimatedCard from '@/app/components/AnimatedCard';
import ProductModal from '@/app/components/ProductModal';

export default function Cupcakes() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<typeof products.cupcakes[0] | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(headingRef.current,
          { y: 60, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
            }
          }
        );
      }

      if (cardsRef.current) {
        gsap.fromTo(cardsRef.current.children,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="cupcakes" className="py-16 sm:py-24 px-4 sm:px-6 bg-cream relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-24 sm:h-32 bg-gradient-to-b from-amber-100/30 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <span className="inline-block px-3 py-1 sm:px-4 sm:py-1 bg-amber-100/50 rounded-full text-xs sm:text-sm font-semibold text-chocolate/70 mb-3 sm:mb-4">
            Our Bestsellers
          </span>
          <h2
            ref={headingRef}
            className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-chocolate mb-3 sm:mb-4"
          >
            Magical <span className="text-amber-700">Cupcakes</span>
          </h2>
          <p className="text-chocolate/60 text-sm sm:text-base md:text-lg max-w-xl mx-auto px-2">
            Fluffy clouds of happiness topped with dreams. Tap to discover the magic inside!
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8"
        >
          {products.cupcakes.map((cupcake) => (
            <AnimatedCard
              key={cupcake.id}
              image={cupcake.image}
              name={cupcake.name}
              description={cupcake.description}
              price={cupcake.basePrice}
              onQuickView={() => setSelectedProduct(cupcake)}
            />
          ))}
        </div>
      </div>

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
