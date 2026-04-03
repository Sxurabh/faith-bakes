'use client';

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/app/lib/gsap';
import { products } from '@/app/data/products';
import FlipCard from '@/app/components/FlipCard';
import { Cookie, CakeSlice } from 'lucide-react';

export default function CookiesBrownies() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Bounce in from edges
      gsap.utils.toArray<HTMLElement>('.bounce-item').forEach((item, i) => {
        const isLeft = i % 2 === 0;
        gsap.fromTo(item,
          {
            x: isLeft ? -200 : 200,
            opacity: 0,
            scale: 0.5,
            rotation: isLeft ? -20 : 20
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="cookies-brownies" className="py-24 px-6 bg-cream relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-chocolate mb-4">
            Cookies & <span className="text-mint">Brownies</span>
          </h2>
          <p className="text-chocolate/60 text-lg">Bite-sized happiness, baked to perfection</p>
        </div>

        {/* Cookies Section */}
        <div className="mb-20">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Cookie className="w-8 h-8 text-soft-pink" />
            <h3 className="font-playfair text-3xl font-bold text-chocolate">Cookies</h3>
            <Cookie className="w-8 h-8 text-soft-pink" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.cookies.map((cookie) => (
              <div key={cookie.id} className="bounce-item">
                <FlipCard
                  image={cookie.image}
                  name={cookie.name}
                  description={cookie.description}
                  price={cookie.basePrice}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Brownies Section */}
        <div>
          <div className="flex items-center justify-center gap-3 mb-8">
            <CakeSlice className="w-8 h-8 text-mint" />
            <h3 className="font-playfair text-3xl font-bold text-chocolate">Brownies</h3>
            <CakeSlice className="w-8 h-8 text-mint" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.brownies.map((brownie) => (
              <div key={brownie.id} className="bounce-item">
                <FlipCard
                  image={brownie.image}
                  name={brownie.name}
                  description={brownie.description}
                  price={brownie.basePrice}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}