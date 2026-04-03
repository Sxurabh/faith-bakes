'use client';

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/app/lib/gsap';
import { products } from '@/app/data/products';
import AnimatedCard from '@/app/components/AnimatedCard';

export default function CookiesBrownies() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { y: 30, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const allProducts = [...products.cookies, ...products.brownies];

  return (
    <section ref={sectionRef} id="brownies" className="py-20 px-6 bg-warm-ivory">
      <h2
        ref={headingRef}
        className="font-playfair text-4xl md:text-5xl text-center text-deep-chocolate mb-12"
      >
        Cookies & Brownies
      </h2>
      <div
        ref={gridRef}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto"
      >
        {allProducts.map((product) => (
          <AnimatedCard
            key={product.id}
            image={product.image}
            name={product.name}
            description={product.description}
            price={product.basePrice}
          />
        ))}
      </div>
    </section>
  );
}
