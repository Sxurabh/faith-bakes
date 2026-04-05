'use client';

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/app/lib/gsap';
import { products } from '@/app/data/products';
import AnimatedCard from '@/app/components/AnimatedCard';
import { Cookie, CakeSlice } from 'lucide-react';

export default function CookiesBrownies() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.bounce-item').forEach((item, i) => {
        const isLeft = i % 2 === 0;
        gsap.fromTo(item,
          {
            x: isLeft ? -100 : 100,
            opacity: 0,
            scale: 0.9,
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
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
    <section ref={sectionRef} id="cookies" className="py-16 sm:py-24 px-4 sm:px-6 bg-cream relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <span className="inline-block px-3 py-1 sm:px-4 sm:py-1 bg-amber-100/50 rounded-full text-xs sm:text-sm font-semibold text-chocolate/70 mb-3 sm:mb-4">
            Sweet Treats
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-chocolate mb-3 sm:mb-4">
            Cookies & <span className="text-amber-700">Brownies</span>
          </h2>
          <p className="text-chocolate/60 text-sm sm:text-base md:text-lg">Bite-sized happiness, baked to perfection</p>
        </div>

        <div className="mb-12 sm:mb-20">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <Cookie className="w-6 h-6 sm:w-8 sm:h-8 text-rose-400" />
            <h3 className="font-playfair text-xl sm:text-2xl md:text-3xl font-bold text-chocolate">Cookies</h3>
            <Cookie className="w-6 h-6 sm:w-8 sm:h-8 text-rose-400" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {products.cookies.map((cookie) => (
              <div key={cookie.id} className="bounce-item">
                <AnimatedCard
                  image={cookie.image}
                  name={cookie.name}
                  description={cookie.description}
                  price={cookie.basePrice}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <CakeSlice className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600" />
            <h3 className="font-playfair text-xl sm:text-2xl md:text-3xl font-bold text-chocolate">Brownies</h3>
            <CakeSlice className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {products.brownies.map((brownie) => (
              <div key={brownie.id} className="bounce-item">
                <AnimatedCard
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
