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
      // Smooth fade and scale entrance
      gsap.utils.toArray<HTMLElement>('.bounce-item').forEach((item, i) => {
        gsap.fromTo(item,
          {
            y: 60,
            opacity: 0,
            scale: 0.95
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            },
            delay: i * 0.08
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
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-dark-brown mb-4">
            Cookies & <span className="text-rose-gold">Brownies</span>
          </h2>
          <p className="text-dark-brown/60 text-lg">Bite-sized happiness, baked to perfection</p>
        </div>

        {/* Cookies Section */}
        <div className="mb-20">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Cookie className="w-8 h-8 text-rose-gold" />
            <h3 className="font-playfair text-3xl font-bold text-dark-brown">Cookies</h3>
            <Cookie className="w-8 h-8 text-rose-gold" />
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
            <CakeSlice className="w-8 h-8 text-sage" />
            <h3 className="font-playfair text-3xl font-bold text-dark-brown">Brownies</h3>
            <CakeSlice className="w-8 h-8 text-sage" />
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
