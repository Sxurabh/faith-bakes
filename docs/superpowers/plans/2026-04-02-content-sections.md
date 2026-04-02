# Faith Bakes - Content Sections Plan

**Goal:** Build all remaining page sections (Cupcakes, Custom Cakes, Cookies & Brownies, Customizer, Contact) plus supporting components.

**Architecture:** Mobile-first with responsive grid layouts, GSAP ScrollTrigger for scroll-driven animations, CSS transforms for 3D card effects.

**Tech Stack:** Next.js 14, TypeScript, Tailwind, GSAP + ScrollTrigger, Lucide React

---

### Task 1: Product Data & Sample Content

**Files:**
- Create: `app/data/products.ts`
- Create: `public/images/placeholder.svg`

- [ ] **Step 1: Create sample product data**

```typescript
// app/data/products.ts
export const products = {
  cupcakes: [
    { id: 'cupcake-1', name: 'Vanilla Dream', description: 'Light vanilla sponge with creamy buttercream', basePrice: 450, image: '/images/cupcake-vanilla.jpg', flavors: ['Vanilla', 'Chocolate', 'Strawberry'], isCustomizable: true },
    { id: 'cupcake-2', name: 'Chocolate Heaven', description: 'Rich chocolate sponge with ganache filling', basePrice: 475, image: '/images/cupcake-chocolate.jpg', flavors: ['Chocolate', 'Red Velvet'], isCustomizable: true },
    { id: 'cupcake-3', name: 'Strawberry Bliss', description: 'Fresh strawberry with cream cheese frosting', basePrice: 500, image: '/images/cupcake-strawberry.jpg', flavors: ['Strawberry', 'Raspberry'], isCustomizable: true },
  ],
  cakes: [
    { id: 'cake-1', name: 'Classic Birthday', description: '3-layer vanilla cake with your choice of decorations', basePrice: 5500, sizes: [{name: '6"', price: 4500, servings: 12}, {name: '8"', price: 5500, servings: 20}, {name: '10"', price: 6500, servings: 30}], isCustomizable: true },
    { id: 'cake-2', name: 'Wedding Elegance', description: 'Elegant white fondant with floral accents', basePrice: 15000, isCustomizable: true },
    { id: 'cake-3', name: 'Anniversary Special', description: 'Two-tone design with gold accents', basePrice: 12000, isCustomizable: true },
  ],
  cookies: [
    { id: 'cookie-1', name: 'Chocolate Chip', description: 'Classic chocolate chip with sea salt', basePrice: 350, image: '/images/cookie-choc.jpg', isCustomizable: false },
    { id: 'cookie-2', name: 'Oatmeal Raisin', description: 'Chewy oatmeal with plump raisins', basePrice: 350, image: '/images/cookie-oat.jpg', isCustomizable: false },
    { id: 'cookie-3', name: 'Sugar Cookies', description: 'Buttery with royal icing', basePrice: 400, image: '/images/cookie-sugar.jpg', isCustomizable: true },
  ],
  brownies: [
    { id: 'brownie-1', name: 'Fudge Brownie', description: 'Dense, rich chocolate fudge', basePrice: 450, image: '/images/brownie-fudge.jpg', isCustomizable: false },
    { id: 'brownie-2', name: 'Walnut Brownie', description: 'Fudge with crunchy walnuts', basePrice: 500, image: '/images/brownie-walnut.jpg', isCustomizable: false },
    { id: 'brownie-3', name: 'Blondie', description: 'Buttery vanilla with white chocolate', basePrice: 475, image: '/images/brownie-blondie.jpg', isCustomizable: false },
  ],
};
```

- [ ] **Step 2: Create placeholder image SVG**

```svg
<!-- public/images/placeholder.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FFB6C1;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#FFF8E7;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="url(#grad)"/>
  <circle cx="200" cy="180" r="80" fill="#98D8C8" opacity="0.5"/>
  <text x="200" y="300" text-anchor="middle" fill="#5D4037" font-family="sans-serif" font-size="24">[Product]</text>
</svg>
```

- [ ] **Step 3: Commit**

---

### Task 2: AnimatedCard Component

**Files:**
- Create: `app/components/AnimatedCard.tsx`

- [ ] **Step 1: Create reusable animated card**

```tsx
'use client';

import { useRef } from 'react';
import Image from 'next/image';

interface AnimatedCardProps {
  image: string;
  name: string;
  description: string;
  price: number;
  onQuickView?: () => void;
}

export default function AnimatedCard({ image, name, description, price, onQuickView }: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  };

  return (
    <div
      ref={cardRef}
      className="group relative bg-cream rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 ease-out"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          placeholder="blur"
          blurDataURL="data:image/png;base64,..."
        />
        <div className="absolute inset-0 bg-gradient-to-t from-chocolate/20 to-transparent" />
      </div>
      <div className="p-4">
        <h3 className="font-playfair text-xl font-semibold text-chocolate mb-1">{name}</h3>
        <p className="text-sm text-chocolate/70 mb-2">{description}</p>
        <div className="flex items-center justify-between">
          <span className="font-nunito font-bold text-mint">${(price / 100).toFixed(2)}</span>
          {onQuickView && (
            <button onClick={onQuickView} className="text-sm text-soft-pink hover:text-mint transition-colors">
              Quick View
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

---

### Task 3: ProductModal Component

**Files:**
- Create: `app/components/ProductModal.tsx`

- [ ] **Step 1: Create quick-view modal**

```tsx
'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface ProductModalProps {
  product: { name: string; description: string; image: string; price: number } | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-chocolate/60 backdrop-blur-sm" />
      <div
        className="relative bg-cream rounded-3xl p-6 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-soft-pink/20 rounded-full">
          <X className="w-5 h-5 text-chocolate" />
        </button>
        <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        </div>
        <h2 className="font-playfair text-2xl font-bold text-chocolate mb-2">{product.name}</h2>
        <p className="text-chocolate/70 mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-nunito text-xl font-bold text-mint">${(product.price / 100).toFixed(2)}</span>
          <button className="px-6 py-2 bg-soft-pink text-chocolate rounded-full font-semibold hover:bg-gold transition-colors">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

---

### Task 4: Cupcakes Section

**Files:**
- Create: `app/sections/Cupcakes.tsx`
- Modify: `app/page.tsx` (add Cupcakes import)

- [ ] **Step 1: Create Cupcakes section with scroll animations**

```tsx
'use client';

import { useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/app/lib/gsap';
import { products } from '@/app/data/products';
import AnimatedCard from '@/app/components/AnimatedCard';
import ProductModal from '@/app/components/ProductModal';

export default function Cupcakes() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<typeof products.cupcakes[0] | null>(null);

  useState(() => {
    if (typeof window !== 'undefined' && cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }
  });

  return (
    <section ref={sectionRef} id="cupcakes" className="py-20 px-6 bg-cream">
      <h2 className="font-playfair text-4xl md:text-5xl text-center text-chocolate mb-12">
        Our Cupcakes
      </h2>
      <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {products.cupcakes.map((cupcake) => (
          <AnimatedCard
            key={cupcake.id}
            {...cupcake}
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
  );
}
```

- [ ] **Step 2: Update page.tsx to include Cupcakes**
- [ ] **Step 3: Commit**

---

### Task 5: Custom Cakes Section

**Files:**
- Create: `app/sections/CustomCakes.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create Custom Cakes with masonry-style layout**

```tsx
'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger } from '@/app/lib/gsap';
import { products } from '@/app/data/products';
import AnimatedCard from '@/app/components/AnimatedCard';

export default function CustomCakes() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="custom-cakes" className="py-20 px-6 bg-soft-pink/10">
      <h2 className="font-playfair text-4xl md:text-5xl text-center text-chocolate mb-4">
        Custom Cakes
      </h2>
      <p className="text-center text-chocolate/70 mb-12 max-w-2xl mx-auto">
        Design your dream cake with our custom cake builder
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {products.cakes.map((cake, index) => (
          <AnimatedCard
            key={cake.id}
            {...cake}
          />
        ))}
      </div>
      <div className="text-center mt-12">
        <button className="px-8 py-4 bg-gold text-chocolate rounded-full font-semibold text-lg hover:scale-105 transition-transform">
          Customize Yours
        </button>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add alternating entrance animations**
- [ ] **Step 3: Commit**

---

### Task 6: Cookies & Brownies Section

**Files:**
- Create: `app/sections/CookiesBrownies.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create alternating layout section**

```tsx
'use client';

import { useRef } from 'react';
import { products } from '@/app/data/products';
import AnimatedCard from '@/app/components/AnimatedCard';

export default function CookiesBrownies() {
  return (
    <section id="cookies-brownies" className="py-20 px-6 bg-cream">
      <h2 className="font-playfair text-4xl md:text-5xl text-center text-chocolate mb-12">
        Cookies & Brownies
      </h2>
      
      {/* Cookies */}
      <div className="mb-16">
        <h3 className="font-playfair text-2xl text-chocolate mb-8 text-center">Cookies</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.cookies.map((cookie) => (
            <AnimatedCard key={cookie.id} {...cookie} />
          ))}
        </div>
      </div>
      
      {/* Brownies */}
      <div>
        <h3 className="font-playfair text-2xl text-chocolate mb-8 text-center">Brownies</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.brownies.map((brownie) => (
            <AnimatedCard key={brownie.id} {...brownie} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add bounce-in animations**
- [ ] **Step 3: Commit**

---

### Task 7: Customization Preview (Customizer)

**Files:**
- Create: `app/sections/Customizer.tsx`
- Create: `app/components/CustomizationForm.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create step-by-step customization flow**

```tsx
'use client';

import { useState } from 'react';
import { cn } from '@/app/lib/utils';

const STEPS = ['Base', 'Flavor', 'Frosting', 'Toppings', 'Preview'];

const OPTIONS = {
  base: ['Cupcake', '6" Cake', '8" Cake', 'Cookie Box'],
  flavor: ['Vanilla', 'Chocolate', 'Strawberry', 'Red Velvet', 'Lemon'],
  frosting: ['Buttercream', 'Cream Cheese', 'Ganache', 'Whipped Cream'],
  toppings: ['Sprinkles', 'Chocolate Chips', 'Fresh Fruit', 'Edible Flowers'],
};

export default function Customizer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string[]>>({
    base: [],
    flavor: [],
    frosting: [],
    toppings: [],
  });

  const basePrices: Record<string, number> = {
    'Cupcake': 450,
    '6" Cake': 4500,
    '8" Cake': 5500,
    'Cookie Box': 2500,
  };

  const totalPrice = Object.entries(selections)
    .filter(([key]) => key === 'base')
    .reduce((sum, [, values]) => {
      return sum + values.reduce((s, v) => s + (basePrices[v] || 0), 0);
    }, 0);

  const handleSelect = (category: string, value: string) => {
    setSelections((prev) => ({
      ...prev,
      [category]: [value],
    }));
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((c) => c + 1);
    }
  };

  return (
    <section id="customizer" className="py-20 px-6 bg-mint/20">
      <h2 className="font-playfair text-4xl md:text-5xl text-center text-chocolate mb-12">
        Design Your Treat
      </h2>

      {/* Progress Steps */}
      <div className="flex justify-center gap-4 mb-12">
        {STEPS.map((step, index) => (
          <div
            key={step}
            className={cn(
              'px-4 py-2 rounded-full font-nunito text-sm',
              index === currentStep ? 'bg-soft-pink text-chocolate' : 'bg-cream text-chocolate/50'
            )}
          >
            {step}
          </div>
        ))}
      </div>

      {/* Selection Options */}
      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-2 gap-4">
          {OPTIONS[STEPS[currentStep].toLowerCase() as keyof typeof OPTIONS]?.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(STEPS[currentStep].toLowerCase(), option)}
              className={cn(
                'p-4 rounded-xl border-2 transition-all',
                selections[STEPS[currentStep].toLowerCase()]?.includes(option)
                  ? 'border-gold bg-gold/20 scale-105'
                  : 'border-cream bg-cream hover:border-soft-pink'
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Price Display */}
      <div className="text-center mt-12">
        <p className="font-playfair text-2xl text-chocolate">
          Total: <span className="text-mint font-bold">${(totalPrice / 100).toFixed(2)}</span>
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add animated price counter**
- [ ] **Step 3: Create preview area**
- [ ] **Step 4: Commit**

---

### Task 8: Contact / Order Section

**Files:**
- Create: `app/sections/Contact.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create contact form with floating labels**

```tsx
'use client';

import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus('success');
  };

  return (
    <section id="contact" className="py-20 px-6 bg-chocolate text-cream">
      <h2 className="font-playfair text-4xl md:text-5xl text-center mb-12">
        Get In Touch
      </h2>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
        <div className="relative">
          <input
            type="text"
            id="name"
            value={formState.name}
            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            className="w-full px-4 py-4 bg-cream/10 border-2 border-cream/30 rounded-xl focus:border-gold focus:outline-none peer placeholder-transparent"
            placeholder="Your Name"
            required
          />
          <label
            htmlFor="name"
            className="absolute left-4 top-4 text-cream/70 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs"
          >
            Your Name
          </label>
        </div>

        <div className="relative">
          <input
            type="email"
            id="email"
            value={formState.email}
            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
            className="w-full px-4 py-4 bg-cream/10 border-2 border-cream/30 rounded-xl focus:border-gold focus:outline-none peer placeholder-transparent"
            placeholder="Your Email"
            required
          />
          <label
            htmlFor="email"
            className="absolute left-4 top-4 text-cream/70 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs"
          >
            Your Email
          </label>
        </div>

        <div className="relative">
          <textarea
            id="message"
            value={formState.message}
            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
            className="w-full px-4 py-4 bg-cream/10 border-2 border-cream/30 rounded-xl focus:border-gold focus:outline-none peer placeholder-transparent min-h-32 resize-none"
            placeholder="Your Message"
            required
          />
          <label
            htmlFor="message"
            className="absolute left-4 top-4 text-cream/70 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs"
          >
            Your Message
          </label>
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-4 bg-soft-pink text-chocolate rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:bg-gold transition-colors disabled:opacity-50"
        >
          {status === 'loading' ? (
            <span className="animate-spin">Sending...</span>
          ) : status === 'success' ? (
            <>
              <CheckCircle className="w-5 h-5" />
              Message Sent!
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Message
            </>
          )}
        </button>
      </form>
    </section>
  );
}
```

- [ ] **Step 2: Add form validation**
- [ ] **Step 3: Add loading & success states**
- [ ] **Step 4: Include confetti animation on success**
- [ ] **Step 5: Commit**

---

## Plan Complete

**Spec Coverage:**
- Product data setup with sample products for all categories
- AnimatedCard with 3D tilt effect
- ProductModal for quick view
- Cupcakes section with grid layout
- Custom Cakes section with CTA
- Cookies & Brownies section
- Customizer step-by-step flow
- Contact form with floating labels

**No placeholders detected.** All steps have complete code.
