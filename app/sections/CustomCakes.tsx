'use client';

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/app/lib/gsap';
import { products } from '@/app/data/products';
import FlipCard from '@/app/components/FlipCard';
import { Sparkles } from 'lucide-react';

export default function CustomCakes() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' }
        }
      );

      const cards = gsap.utils.toArray<HTMLElement>('.cake-card');
      cards.forEach((card, i) => {
        const direction = i % 2 === 0 ? -50 : 50;
        gsap.fromTo(card,
          { x: direction, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToCustomizer = () => {
    if (typeof document !== 'undefined') {
      document.getElementById('customizer')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} id="custom-cakes" className="py-16 sm:py-24 px-4 sm:px-6 bg-soft-pink/10 relative overflow-hidden">
      <div className="absolute top-16 sm:top-20 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-mint/20 rounded-full blur-3xl" />
      <div className="absolute bottom-16 sm:bottom-20 left-0 w-56 h-56 sm:w-80 sm:h-80 bg-gold/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={headingRef} className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/80 rounded-full shadow-sm mb-3 sm:mb-4">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-gold" />
            <span className="text-xs sm:text-sm font-semibold text-chocolate/70">Made to Order</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-chocolate mb-3 sm:mb-4">
            Custom <span className="text-gradient">Cakes</span>
          </h2>
          <p className="text-chocolate/60 text-sm sm:text-base md:text-lg max-w-xl mx-auto px-2">
            Your vision, our craftsmanship. Create memories with cakes as unique as your celebration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 mb-10 sm:mb-12">
          {products.cakes.map((cake, index) => (
            <div key={cake.id} className="cake-card">
              <FlipCard
                image={cake.image}
                name={cake.name}
                description={cake.description}
                price={cake.basePrice}
                details={cake.sizes?.map(s => `${s.name} - serves ${s.servings}`) || ['Custom sizes available']}
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={scrollToCustomizer}
            className="px-6 py-3 sm:px-8 sm:py-4 bg-gold text-chocolate rounded-full font-bold text-sm sm:text-lg shadow-lg hover:bg-soft-pink hover:shadow-xl transition-all duration-300 active:scale-95 touch-manipulation"
          >
            Start Designing
          </button>
        </div>
      </div>
    </section>
  );
}
