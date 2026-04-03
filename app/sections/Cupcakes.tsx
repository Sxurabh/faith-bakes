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
      // Heading animation
      if (headingRef.current) {
        gsap.fromTo(headingRef.current,
          { y: 80, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
            }
          }
        );
      }

      // Cards stagger animation with bounce
      if (cardsRef.current) {
        gsap.fromTo(cardsRef.current.children,
          { y: 100, opacity: 0, rotateY: -30 },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.8,
            stagger: 0.15,
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
    <section ref={sectionRef} id="cupcakes" className="py-24 px-6 bg-cream relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-soft-pink/10 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-soft-pink/20 rounded-full text-sm font-semibold text-chocolate/70 mb-4">
            Our Bestsellers
          </span>
          <h2
            ref={headingRef}
            className="font-playfair text-5xl md:text-6xl font-bold text-chocolate mb-4"
          >
            Magical <span className="text-gradient">Cupcakes</span>
          </h2>
          <p className="text-chocolate/60 text-lg max-w-xl mx-auto">
            Fluffy clouds of happiness topped with dreams. Flip the cards to discover the magic inside!
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