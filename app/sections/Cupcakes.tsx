'use client';

import { useRef, useState, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/app/lib/gsap';
import { products } from '@/app/data/products';
import AnimatedCard from '@/app/components/AnimatedCard';
import ProductModal from '@/app/components/ProductModal';
import CategoryNav from '@/app/components/CategoryNav';

type Category = 'cupcakes' | 'cakes' | 'cookies' | 'brownies';

export default function Cupcakes() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<typeof products.cupcakes[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('cupcakes');

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    const element = document.getElementById(category);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  const currentProducts = products.cupcakes;

  return (
    <>
      <CategoryNav activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
      <section ref={sectionRef} id="cupcakes" className="py-20 px-6 bg-warm-ivory pt-28">
        <h2 
          ref={headingRef}
          className="font-playfair text-4xl md:text-5xl text-center text-deep-chocolate mb-12"
        >
          Our Cupcakes
        </h2>
        <div 
          ref={cardsContainerRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto"
        >
          {currentProducts.map((cupcake, index) => (
            <AnimatedCard
              key={cupcake.id}
              image={cupcake.image}
              name={cupcake.name}
              description={cupcake.description}
              price={cupcake.basePrice}
              onQuickView={() => setSelectedProduct(cupcake)}
            />
          ))}
        </div>
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </section>
    </>
  );
}