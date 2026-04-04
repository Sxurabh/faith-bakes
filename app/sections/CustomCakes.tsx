'use client';

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/app/lib/gsap';
import { products } from '@/app/data/products';
import FlipCard from '@/app/components/FlipCard';
import MagneticButton from '@/app/components/MagneticButton';
import { Sparkles } from 'lucide-react';

export default function CustomCakes() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' }
        }
      );

      // Staggered cards with smooth entrance
      const cards = gsap.utils.toArray<HTMLElement>('.cake-card');
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
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
    <section ref={sectionRef} id="custom-cakes" className="py-24 px-6 bg-warm-beige/20 relative overflow-hidden">
      {/* Decorative Elements - Subtle */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-sage/12 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-rose-gold/8 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={headingRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur rounded-full shadow-premium mb-4">
            <Sparkles className="w-4 h-4 text-rose-gold" />
            <span className="text-sm font-semibold text-dark-brown/60">Made to Order</span>
          </div>
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-dark-brown mb-4">
            Custom <span className="text-gradient">Cakes</span>
          </h2>
          <p className="text-dark-brown/60 text-lg max-w-xl mx-auto text-pretty">
            Your vision, our craftsmanship. Create memories with cakes as unique as your celebration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.cakes.map((cake, index) => (
            <div key={cake.id} className={`cake-card ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
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
          <MagneticButton
            variant="gold"
            onClick={() => document.getElementById('customizer')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>Start Designing</span>
            <span>🎨</span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
