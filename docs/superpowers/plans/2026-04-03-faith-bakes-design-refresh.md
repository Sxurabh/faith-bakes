# Faith Bakes Design Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh Faith Bakes website with whimsical premium aesthetic - richer colors, mobile-first design, engaging animations while maintaining playful fun.

**Architecture:** Update color palette in Tailwind config, refine each section with new styling, improve animations for premium feel, add category navigation pills.

**Tech Stack:** Next.js, Tailwind CSS, GSAP, Lucide React

---

## File Structure

```
app/
├── globals.css                    # Update colors, add paper grain texture
├── tailwind.config.ts             # Update color palette & theme
├── layout.tsx                     # Update metadata
├── sections/
│   ├── Hero.tsx                  # Refine colors, improve CTA animation
│   ├── Cupcakes.tsx              # Update styling, add category nav
│   ├── CustomCakes.tsx           # Update styling, improve card animations
│   ├── CookiesBrownies.tsx       # Update styling
│   ├── Customizer.tsx             # Improve touch targets, add icons
│   └── Contact.tsx                # Refine form styling, add micro-interactions
├── components/
│   ├── AnimatedCard.tsx           # Update colors, improve hover effects
│   ├── FloatingElement.tsx        # Update floating animations
│   └── ProductModal.tsx          # Update styling
├── data/
│   └── products.ts                # Review product data
```

---

## Task 1: Update Color Palette

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Update tailwind.config.ts with new colors**

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        raspberry: '#D6336C',
        'warm-ivory': '#FFF9F0',
        'honey-gold': '#E5A84B',
        'soft-sage': '#A8D5BA',
        'deep-chocolate': '#3D2314',
        'soft-cream': '#FDF6E3',
        cream: '#FDF6E3',
        chocolate: '#3D2314',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'float-slow': 'float 8s ease-in-out 1s infinite',
        pulse: 'pulse 2s ease-in-out infinite',
        'bounce-in': 'bounceIn 0.6s ease-out',
        'squish': 'squish 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        squish: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Update globals.css with new base colors**

```css
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&family=Playfair+Display:wght@400;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-raspberry: #D6336C;
  --color-warm-ivory: #FFF9F0;
  --color-honey-gold: #E5A84B;
  --color-soft-sage: #A8D5BA;
  --color-deep-chocolate: #3D2314;
  --color-soft-cream: #FDF6E3;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
  font-family: 'Nunito', sans-serif;
  background-color: var(--color-warm-ivory);
  color: var(--color-deep-chocolate);
}

body {
  font-size: 14px;
}

@media (min-width: 640px) {
  body {
    font-size: 16px;
  }
}

@media (min-width: 1024px) {
  body {
    font-size: 18px;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}

.paper-grain {
  position: relative;
}

.paper-grain::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.03;
  pointer-events: none;
  z-index: 1;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 3: Commit changes**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "feat: update color palette for whimsical premium aesthetic"
```

---

## Task 2: Hero Section Redesign

**Files:**
- Modify: `app/sections/Hero.tsx`

- [ ] **Step 1: Update Hero with new colors and improved CTA animation**

```tsx
'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/app/lib/gsap';
import FloatingElement from '@/app/components/FloatingElement';
import BlobShape from '@/app/components/BlobShape';
import { useParallax } from '@/app/hooks/useParallax';

const FLOATING_CIRCLE = (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="40" fill="#D6336C" />
    <circle cx="50" cy="45" r="30" fill="#FDF6E3" />
  </svg>
);

const FLOATING_RECT = (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="20" y="30" width="60" height="50" rx="8" fill="#A8D5BA" />
  </svg>
);

const FLOATING_TRIANGLE = (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <polygon points="50,10 90,90 10,90" fill="#E5A84B" />
  </svg>
);

export default function Hero() {
  const logoRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const parallax1 = useParallax(1);
  const parallax2 = useParallax(0.7);
  const parallax3 = useParallax(1.3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = logoRef.current?.querySelectorAll('.logo-letter');
      
      if (letters && letters.length > 0) {
        gsap.fromTo(
          letters,
          { y: 100, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: 'back.out(1.7)',
            delay: 0.3,
          }
        );
      }

      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: 1.2, ease: 'power2.out' }
        );
      }

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { y: 30, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, delay: 1.6, ease: 'back.out(1.7)' }
        );
      }

      if (scrollIndicatorRef.current) {
        gsap.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.6, delay: 2.2, ease: 'power2.out' }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const logoText = 'Faith Bakes';

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-warm-ivory to-raspberry/10">
      <BlobShape
        color="raspberry"
        className="absolute top-10 -left-20 w-96 h-96 opacity-10"
      />
      <BlobShape
        color="sage"
        className="absolute bottom-20 -right-20 w-80 h-80 opacity-15"
      />
      <BlobShape
        color="gold"
        className="absolute top-1/3 right-10 w-48 h-48 opacity-10"
      />

      <FloatingElement delay="small" size="lg" className="absolute top-20 left-[10%]" parallaxOffset={parallax1}>
        {FLOATING_CIRCLE}
      </FloatingElement>

      <FloatingElement delay="medium" size="md" className="absolute top-40 right-[15%]" parallaxOffset={parallax2}>
        {FLOATING_RECT}
      </FloatingElement>

      <FloatingElement delay="large" size="md" className="absolute bottom-32 left-[20%]" parallaxOffset={parallax3}>
        {FLOATING_TRIANGLE}
      </FloatingElement>

      <div className="relative z-10 text-center px-6 py-20">
        <h1
          ref={logoRef}
          className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-deep-chocolate mb-4 perspective-1000"
          style={{ perspective: '1000px' }}
        >
          {logoText.split('').map((letter, index) => (
            <span key={index} className="logo-letter inline-block">
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </h1>

        <p
          ref={subtitleRef}
          className="font-nunito text-lg md:text-xl text-deep-chocolate/70 mb-12 max-w-md mx-auto"
        >
          Handcrafted cupcakes, cakes, cookies & brownies made with love
        </p>

        <button
          ref={ctaRef}
          className="font-nunito font-semibold text-lg px-8 py-4 bg-raspberry text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 animate-squish"
          onClick={() => {
            document.getElementById('cupcakes')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Explore Our Treats
        </button>
      </div>

      <div ref={scrollIndicatorRef} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-deep-chocolate/50">
          <span className="text-sm font-nunito">Scroll</span>
          <svg
            className="w-6 h-6 animate-pulse"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit changes**

```bash
git add app/sections/Hero.tsx
git commit -m "feat: update Hero with new colors and squish CTA animation"
```

---

## Task 3: AnimatedCard Component Update

**Files:**
- Modify: `app/components/AnimatedCard.tsx`

- [ ] **Step 1: Update AnimatedCard with new styling and hover effects**

```tsx
'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from '@/app/lib/gsap';

interface AnimatedCardProps {
  image: string;
  name: string;
  description: string;
  price: number;
  onQuickView?: () => void;
}

export default function AnimatedCard({ image, name, description, price, onQuickView }: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    gsap.to(cardRef.current, {
      rotationX: rotateX,
      rotationY: rotateY,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    
    gsap.to(cardRef.current, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="relative overflow-hidden rounded-3xl bg-soft-cream shadow-lg transition-shadow duration-300 group-hover:shadow-xl">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-chocolate/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-5">
          <h3 className="font-playfair text-xl font-semibold text-deep-chocolate mb-2">
            {name}
          </h3>
          <p className="text-deep-chocolate/70 text-sm mb-3 line-clamp-2">
            {description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="font-nunito font-bold text-raspberry text-lg">
              ${(price / 100).toFixed(2)}
            </span>
            {onQuickView && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickView();
                }}
                className="px-4 py-2 bg-honey-gold text-deep-chocolate rounded-full text-sm font-semibold hover:bg-raspberry hover:text-white transition-colors"
              >
                Quick View
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit changes**

```bash
git add app/components/AnimatedCard.tsx
git commit -m "feat: update AnimatedCard with new styling and 3D tilt effect"
```

---

## Task 4: Cupcakes Section with Category Navigation

**Files:**
- Modify: `app/sections/Cupcakes.tsx`

- [ ] **Step 1: Create CategoryNav component**

Create `app/components/CategoryNav.tsx`:

```tsx
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
```

- [ ] **Step 2: Update Cupcakes section**

```tsx
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
```

- [ ] **Step 3: Commit changes**

```bash
git add app/components/CategoryNav.tsx app/sections/Cupcakes.tsx
git commit -m "feat: add category navigation and update Cupcakes section"
```

---

## Task 5: CustomCakes Section Update

**Files:**
- Modify: `app/sections/CustomCakes.tsx`

- [ ] **Step 1: Update CustomCakes section with new styling**

```tsx
'use client';

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/app/lib/gsap';
import { products } from '@/app/data/products';
import AnimatedCard from '@/app/components/AnimatedCard';

export default function CustomCakes() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        Array.from(cards).forEach((card, index) => {
          const direction = index % 2 === 0 ? -50 : 50;
          const rotation = index % 2 === 0 ? -3 : 3;
          gsap.fromTo(
            card,
            { x: direction, opacity: 0, rotation },
            {
              x: 0,
              opacity: 1,
              rotation: 0,
              duration: 0.8,
              ease: 'elastic.out(1, 0.5)',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="cakes" className="py-20 px-6 bg-soft-cream">
      <h2
        ref={headingRef}
        className="font-playfair text-4xl md:text-5xl text-center text-deep-chocolate mb-4"
      >
        Custom Cakes
      </h2>
      <p className="text-center text-deep-chocolate/70 mb-12 max-w-2xl mx-auto">
        Design your dream cake with our custom cake builder
      </p>
      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
      >
        {products.cakes.map((cake, index) => (
          <div
            key={cake.id}
            className={index === 0 ? 'md:col-span-2 lg:col-span-2' : ''}
          >
            <AnimatedCard
              image={cake.image}
              name={cake.name}
              description={cake.description}
              price={cake.basePrice}
            />
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <button className="px-8 py-4 bg-honey-gold text-deep-chocolate rounded-full font-semibold text-lg hover:bg-raspberry hover:text-white hover:shadow-lg transition-all duration-300">
          Customize Yours
        </button>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit changes**

```bash
git add app/sections/CustomCakes.tsx
git commit -m "feat: update CustomCakes with new styling"
```

---

## Task 6: CookiesBrownies Section Update

**Files:**
- Modify: `app/sections/CookiesBrownies.tsx`

- [ ] **Step 1: Read current CookiesBrownies and update**

```tsx
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
    <section ref={sectionRef} id="cookies" className="py-20 px-6 bg-warm-ivory">
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
```

- [ ] **Step 2: Commit changes**

```bash
git add app/sections/CookiesBrownies.tsx
git commit -m "feat: update CookiesBrownies section with new styling"
```

---

## Task 7: Customizer Section Improvement

**Files:**
- Modify: `app/sections/Customizer.tsx`

- [ ] **Step 1: Update Customizer with larger touch targets and icons**

```tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/app/lib/gsap';
import { cn } from '@/app/lib/utils';
import { ChevronRight, ChevronLeft, ShoppingCart, Cake, IceCream, Cookie, Sparkles } from 'lucide-react';

const STEPS = [
  { name: 'Base', icon: Cake },
  { name: 'Flavor', icon: IceCream },
  { name: 'Frosting', icon: Sparkles },
  { name: 'Toppings', icon: Cookie },
  { name: 'Preview', icon: Cake },
];

const OPTIONS = {
  base: [
    { name: 'Cupcake', price: 450 },
    { name: '6" Cake', price: 4500 },
    { name: '8" Cake', price: 5500 },
    { name: 'Cookie Box (12)', price: 2500 },
  ],
  flavor: ['Vanilla', 'Chocolate', 'Strawberry', 'Red Velvet', 'Lemon'],
  frosting: ['Buttercream', 'Cream Cheese', 'Ganache', 'Whipped Cream'],
  toppings: ['Sprinkles', 'Chocolate Chips', 'Fresh Fruit', 'Edible Flowers'],
};

const TOPPING_PRICES: Record<string, number> = {
  'Sprinkles': 50,
  'Chocolate Chips': 75,
  'Fresh Fruit': 100,
  'Edible Flowers': 150,
};

export default function Customizer() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string | string[]>>({
    base: '',
    flavor: '',
    frosting: '',
    toppings: [],
  });
  const [displayPrice, setDisplayPrice] = useState(0);

  const getPrice = () => {
    const baseOption = OPTIONS.base.find(o => o.name === selections.base);
    const basePrice = baseOption?.price || 0;
    const toppingsPrice = (selections.toppings as string[]).reduce(
      (sum, t) => sum + (TOPPING_PRICES[t] || 0),
      0
    );
    return basePrice + toppingsPrice;
  };

  useEffect(() => {
    const targetPrice = getPrice();
    const startPrice = displayPrice;
    const diff = targetPrice - startPrice;
    
    if (diff === 0) return;
    
    const duration = 300;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setDisplayPrice(Math.round(startPrice + diff * progress));
      if (progress < 1) requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
  }, [getPrice]);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSelect = (value: string) => {
    const key = STEPS[currentStep].name.toLowerCase();
    if (key === 'toppings') {
      const current = selections.toppings as string[];
      if (current.includes(value)) {
        setSelections({ ...selections, toppings: current.filter(t => t !== value) });
      } else {
        setSelections({ ...selections, toppings: [...current, value] });
      }
    } else {
      setSelections({ ...selections, [key]: value });
      if (currentStep < STEPS.length - 1) {
        setTimeout(() => setCurrentStep(c => c + 1), 300);
      }
    }
  };

  const handleNext = () => setCurrentStep(c => Math.min(c + 1, STEPS.length - 1));
  const handlePrev = () => setCurrentStep(c => Math.max(c - 1, 0));

  const currentKey = STEPS[currentStep].name.toLowerCase();
  const currentOptions = OPTIONS[currentKey as keyof typeof OPTIONS] || [];
  const isSelected = (value: string) => {
    const sel = selections[currentKey];
    if (Array.isArray(sel)) return sel.includes(value);
    return sel === value;
  };

  return (
    <section ref={sectionRef} id="customizer" className="py-20 px-6 bg-soft-sage/30">
      <h2
        ref={headingRef}
        className="font-playfair text-4xl md:text-5xl text-center text-deep-chocolate mb-12"
      >
        Design Your Treat
      </h2>

      <div className="max-w-2xl mx-auto">
        <div className="flex justify-center gap-2 md:gap-4 mb-8 flex-wrap">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.name}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-full font-nunito text-sm transition-all',
                  index === currentStep
                    ? 'bg-raspberry text-white scale-110'
                    : index < currentStep
                    ? 'bg-honey-gold text-deep-chocolate'
                    : 'bg-soft-cream text-deep-chocolate/50'
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline">{step.name}</span>
              </div>
            );
          })}
        </div>

        <div className="bg-soft-cream rounded-3xl p-6 shadow-lg">
          {currentStep === 4 ? (
            <div className="space-y-4">
              <h3 className="font-playfair text-xl text-deep-chocolate mb-4">Your Custom Creation</h3>
              
              {selections.base && (
                <div className="flex justify-between py-2 border-b border-deep-chocolate/10">
                  <span className="text-deep-chocolate/70">Base</span>
                  <span className="font-semibold text-deep-chocolate">{selections.base}</span>
                </div>
              )}
              {selections.flavor && (
                <div className="flex justify-between py-2 border-b border-deep-chocolate/10">
                  <span className="text-deep-chocolate/70">Flavor</span>
                  <span className="font-semibold text-deep-chocolate">{selections.flavor}</span>
                </div>
              )}
              {selections.frosting && (
                <div className="flex justify-between py-2 border-b border-deep-chocolate/10">
                  <span className="text-deep-chocolate/70">Frosting</span>
                  <span className="font-semibold text-deep-chocolate">{selections.frosting}</span>
                </div>
              )}
              {(selections.toppings as string[]).length > 0 && (
                <div className="flex justify-between py-2 border-b border-deep-chocolate/10">
                  <span className="text-deep-chocolate/70">Toppings</span>
                  <span className="font-semibold text-deep-chocolate">{(selections.toppings as string[]).join(', ')}</span>
                </div>
              )}
              
              <div className="flex justify-between py-2 mt-4">
                <span className="font-playfair text-lg text-deep-chocolate">Total</span>
                <span className="font-bold text-raspberry text-xl">${(getPrice() / 100).toFixed(2)}</span>
              </div>
              
              <button 
                onClick={() => window.location.href = '#contact'}
                className="w-full mt-4 px-6 py-4 bg-raspberry text-white rounded-full font-semibold hover:bg-honey-gold transition-colors"
              >
                Contact to Order
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {currentOptions.map((option) => {
              const optionName = typeof option === 'string' ? option : option.name;
              const optionPrice = typeof option === 'object' ? option.price : 0;
              
              return (
                <button
                  key={optionName}
                  onClick={() => handleSelect(optionName)}
                  className={cn(
                    'p-4 rounded-xl border-2 transition-all text-left min-h-[56px] flex flex-col justify-center',
                    isSelected(optionName)
                      ? 'border-raspberry bg-raspberry/10 scale-105'
                      : 'border-deep-chocolate/10 bg-white hover:border-raspberry hover:bg-raspberry/5'
                  )}
                >
                  <span className="font-semibold text-deep-chocolate">{optionName}</span>
                  {optionPrice > 0 && (
                    <span className="text-sm text-deep-chocolate/60">
                      +${(optionPrice / 100).toFixed(2)}
                    </span>
                  )}
                </button>
              );
            })}
            </div>
          )}

          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={cn(
                'flex items-center gap-2 px-4 py-3 rounded-full transition-colors',
                currentStep === 0
                  ? 'text-deep-chocolate/30 cursor-not-allowed'
                  : 'text-deep-chocolate hover:bg-raspberry/20'
              )}
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={currentStep === STEPS.length - 1}
              className={cn(
                'flex items-center gap-2 px-4 py-3 rounded-full transition-colors',
                currentStep === STEPS.length - 1
                  ? 'text-deep-chocolate/30 cursor-not-allowed'
                  : 'text-deep-chocolate hover:bg-raspberry/20'
              )}
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="font-playfair text-2xl text-deep-chocolate">
            Total: <span className="text-raspberry font-bold">${(displayPrice / 100).toFixed(2)}</span>
          </p>
          {currentStep === STEPS.length - 1 && (
            <button className="mt-4 px-8 py-4 bg-raspberry text-white rounded-full font-semibold flex items-center gap-2 mx-auto hover:bg-honey-gold transition-colors">
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit changes**

```bash
git add app/sections/Customizer.tsx
git commit -m "feat: improve Customizer with icons and larger touch targets"
```

---

## Task 8: Contact Section with Micro-interactions

**Files:**
- Modify: `app/sections/Contact.tsx`

- [ ] **Step 1: Update Contact section with new styling**

```tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/app/lib/gsap';
import { Send, CheckCircle, Loader2 } from 'lucide-react';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

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

      if (formRef.current) {
        const fields = formRef.current.querySelectorAll('.form-field');
        gsap.fromTo(
          fields,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setStatus('success');
    
    setTimeout(() => {
      setFormState({ name: '', email: '', message: '' });
      setStatus('idle');
    }, 3000);
  };

  return (
    <section ref={sectionRef} id="contact" className="py-20 px-6 bg-deep-chocolate text-warm-ivory">
      <h2
        ref={headingRef}
        className="font-playfair text-4xl md:text-5xl text-center mb-12"
      >
        Get In Touch
      </h2>

      <form 
        ref={formRef}
        onSubmit={handleSubmit} 
        className="max-w-xl mx-auto space-y-6"
      >
        <div className="form-field relative">
          <input
            type="text"
            id="name"
            value={formState.name}
            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            className="w-full px-4 pt-6 pb-2 bg-white/10 border-2 border-white/30 rounded-xl focus:border-honey-gold focus:outline-none peer placeholder-transparent transition-colors"
            placeholder="Your Name"
            required
          />
          <label
            htmlFor="name"
            className={`absolute left-4 transition-all duration-200 pointer-events-none ${
              focusedField === 'name' || formState.name
                ? 'top-2 text-xs text-honey-gold'
                : 'top-4 text-white/70'
            }`}
          >
            Your Name
          </label>
        </div>

        <div className="form-field relative">
          <input
            type="email"
            id="email"
            value={formState.email}
            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            className="w-full px-4 pt-6 pb-2 bg-white/10 border-2 border-white/30 rounded-xl focus:border-honey-gold focus:outline-none peer placeholder-transparent transition-colors"
            placeholder="Your Email"
            required
          />
          <label
            htmlFor="email"
            className={`absolute left-4 transition-all duration-200 pointer-events-none ${
              focusedField === 'email' || formState.email
                ? 'top-2 text-xs text-honey-gold'
                : 'top-4 text-white/70'
            }`}
          >
            Your Email
          </label>
        </div>

        <div className="form-field relative">
          <textarea
            id="message"
            value={formState.message}
            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
            onFocus={() => setFocusedField('message')}
            onBlur={() => setFocusedField(null)}
            className="w-full px-4 pt-6 pb-2 bg-white/10 border-2 border-white/30 rounded-xl focus:border-honey-gold focus:outline-none peer placeholder-transparent transition-colors min-h-32 resize-none"
            placeholder="Your Message"
            required
          />
          <label
            htmlFor="message"
            className={`absolute left-4 transition-all duration-200 pointer-events-none ${
              focusedField === 'message' || formState.message
                ? 'top-2 text-xs text-honey-gold'
                : 'top-4 text-white/70'
            }`}
          >
            Your Message
          </label>
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-4 bg-raspberry text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:bg-honey-gold transition-colors disabled:opacity-50 relative overflow-hidden"
        >
          {status === 'loading' && (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          )}
          {status === 'success' && (
            <>
              <CheckCircle className="w-5 h-5" />
              Message Sent!
            </>
          )}
          {status === 'idle' && (
            <>
              <Send className="w-5 h-5" />
              Send Message
            </>
          )}
        </button>
      </form>

      {status === 'success' && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
          <div className="confetti-piece bg-honey-gold w-3 h-3 rounded-full animate-confetti" style={{ '--delay': '0s', '--x': '-100px' } as React.CSSProperties} />
          <div className="confetti-piece bg-raspberry w-3 h-3 rounded-full animate-confetti" style={{ '--delay': '0.1s', '--x': '100px' } as React.CSSProperties} />
          <div className="confetti-piece bg-soft-sage w-3 h-3 rounded-full animate-confetti" style={{ '--delay': '0.2s', '--x': '-50px' } as React.CSSProperties} />
          <div className="confetti-piece bg-warm-ivory w-3 h-3 rounded-full animate-confetti" style={{ '--delay': '0.3s', '--x': '50px' } as React.CSSProperties} />
        </div>
      )}
      
      <style jsx>{`
        @keyframes confetti {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti {
          animation: confetti 2s ease-out forwards;
          animation-delay: var(--delay, 0s);
        }
      `}</style>
    </section>
  );
}
```

- [ ] **Step 2: Commit changes**

```bash
git add app/sections/Contact.tsx
git commit -m "feat: update Contact section with new styling"
```

---

## Task 9: Update Layout with Paper Grain Effect

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update layout with metadata and paper grain wrapper**

```tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Faith Bakes | Handcrafted Cupcakes, Cakes, Cookies & Brownies',
  description: 'Handcrafted cupcakes, cakes, cookies & brownies made with love. Custom designs for birthdays, weddings, and special occasions.',
  keywords: ['cupcakes', 'cakes', 'cookies', 'brownies', 'baking', 'custom cakes', 'birthday cakes'],
  openGraph: {
    title: 'Faith Bakes | Handcrafted Treats',
    description: 'Handcrafted cupcakes, cakes, cookies & brownies made with love',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="paper-grain min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Commit changes**

```bash
git add app/layout.tsx
git commit -m "feat: update layout with metadata and paper grain effect"
```

---

## Task 10: Final Polish and Verification

- [ ] **Step 1: Run build to check for errors**

```bash
npm run build
```

- [ ] **Step 2: Run lint to check for issues**

```bash
npm run lint
```

- [ ] **Step 3: Commit final changes**

```bash
git add .
git commit -m "feat: complete design refresh for Faith Bakes"
```

---

## Implementation Complete

**Plan saved to:** `docs/superpowers/plans/2026-04-03-faith-bakes-design-refresh.md`

**Two execution options:**

1. **Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

2. **Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?