'use client';

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/app/lib/gsap';
import { products } from '@/app/data/products';
import AnimatedCard from '@/app/components/AnimatedCard';

export default function CookiesBrownies() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cookiesRef = useRef<HTMLDivElement>(null);
  const browniesRef = useRef<HTMLDivElement>(null);

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

      if (cookiesRef.current) {
        gsap.fromTo(
          cookiesRef.current.children,
          { x: -100, opacity: 0, scale: 0.8 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: cookiesRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      if (browniesRef.current) {
        gsap.fromTo(
          browniesRef.current.children,
          { x: 100, opacity: 0, scale: 0.8 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: browniesRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="cookies-brownies" className="py-20 px-6 bg-cream">
      <h2
        ref={headingRef}
        className="font-playfair text-4xl md:text-5xl text-center text-chocolate mb-12"
      >
        Cookies & Brownies
      </h2>

      <div className="mb-16">
        <h3 className="font-playfair text-2xl text-chocolate mb-8 text-center">Cookies</h3>
        <div
          ref={cookiesRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {products.cookies.map((cookie) => (
            <AnimatedCard
              key={cookie.id}
              image={cookie.image}
              name={cookie.name}
              description={cookie.description}
              price={cookie.basePrice}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-playfair text-2xl text-chocolate mb-8 text-center">Brownies</h3>
        <div
          ref={browniesRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {products.brownies.map((brownie) => (
            <AnimatedCard
              key={brownie.id}
              image={brownie.image}
              name={brownie.name}
              description={brownie.description}
              price={brownie.basePrice}
            />
          ))}
        </div>
      </div>
    </section>
  );
}