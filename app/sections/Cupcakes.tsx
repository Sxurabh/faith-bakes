'use client';

import { useRef, useState, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/app/lib/gsap';
import { products } from '@/app/data/products';
import FlipCard from '@/app/components/FlipCard';
import ProductModal from '@/app/components/ProductModal';

export default function Cupcakes() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<typeof products.cupcakes[0] | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading animation - elegant fade in
      if (headingRef.current) {
        gsap.fromTo(headingRef.current,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
            }
          }
        );
      }

      // Cards stagger animation - smooth elegant entrance
      if (cardsRef.current) {
        gsap.fromTo(cardsRef.current.children,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
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
    <section ref={sectionRef} id="cupcakes" className="py-24 px-6 bg-cream relative overflow-hidden">
      {/* Background Decoration - Subtle */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-rose-gold/8 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-rose-gold/15 rounded-full text-sm font-semibold text-dark-brown/60 mb-4">
            Our Bestsellers
          </span>
          <h2
            ref={headingRef}
            className="font-playfair text-5xl md:text-6xl font-bold text-dark-brown mb-4"
          >
            Delightful <span className="text-gradient">Cupcakes</span>
          </h2>
          <p className="text-dark-brown/60 text-lg max-w-xl mx-auto text-pretty">
            Fluffy clouds of happiness topped with the finest ingredients. Discover what makes each one special.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000"
        >
          {products.cupcakes.map((cupcake) => (
            <FlipCard
              key={cupcake.id}
              image={cupcake.image}
              name={cupcake.name}
              description={cupcake.description}
              price={cupcake.basePrice}
              details={cupcake.flavors?.map(f => `${f} flavor available`)}
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
