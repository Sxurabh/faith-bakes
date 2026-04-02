'use client';

import { useRef, useState, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/app/lib/gsap';
import { products } from '@/app/data/products';
import AnimatedCard from '@/app/components/AnimatedCard';
import ProductModal from '@/app/components/ProductModal';

export default function Cupcakes() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<typeof products.cupcakes[0] | null>(null);

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

      if (cardsContainerRef.current) {
        gsap.fromTo(
          cardsContainerRef.current.children,
          { y: 50, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="cupcakes" className="py-20 px-6 bg-cream">
      <h2 
        ref={headingRef}
        className="font-playfair text-4xl md:text-5xl text-center text-chocolate mb-12"
      >
        Our Cupcakes
      </h2>
      <div 
        ref={cardsContainerRef}
        className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 overflow-x-auto snap-x snap-mandatory pb-4 sm:pb-0 -mx-6 px-6 sm:mx-0 sm:px-0"
      >
        {products.cupcakes.map((cupcake, index) => (
          <div key={cupcake.id} className="flex-shrink-0 w-[280px] sm:w-auto snap-center">
            <AnimatedCard
              image={cupcake.image}
              name={cupcake.name}
              description={cupcake.description}
              price={cupcake.basePrice}
              onQuickView={() => setSelectedProduct(cupcake)}
            />
          </div>
        ))}
      </div>
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
