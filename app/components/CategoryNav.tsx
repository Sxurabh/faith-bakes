'use client';

import { useState, useEffect } from 'react';
import { gsap } from '@/app/lib/gsap';

interface Category {
  id: string;
  label: string;
}

const CATEGORIES: Category[] = [
  { id: 'cupcakes', label: 'Cupcakes' },
  { id: 'cakes', label: 'Cakes' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'brownies', label: 'Brownies' },
];

interface CategoryNavProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryNav({ activeCategory, onCategoryChange }: CategoryNavProps) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setIsSticky(window.scrollY > heroHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSticky) {
      gsap.fromTo('.category-pill', 
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'power2.out' }
      );
    }
  }, [isSticky]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isSticky 
        ? 'bg-warm-ivory/95 backdrop-blur-sm shadow-md py-3' 
        : 'bg-transparent py-4'
    }`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-center gap-2 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`category-pill px-5 py-2 rounded-full font-nunito font-semibold text-sm whitespace-nowrap transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-raspberry text-white shadow-md'
                  : 'bg-soft-cream text-deep-chocolate/70 hover:bg-soft-sage hover:text-deep-chocolate'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}