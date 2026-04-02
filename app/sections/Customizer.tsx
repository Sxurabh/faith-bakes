'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/app/lib/gsap';
import { cn } from '@/app/lib/utils';
import { ChevronRight, ChevronLeft, ShoppingCart } from 'lucide-react';

const STEPS = ['Base', 'Flavor', 'Frosting', 'Toppings', 'Preview'];

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
  }, [selections]);

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
    const key = STEPS[currentStep].toLowerCase();
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

  const currentKey = STEPS[currentStep].toLowerCase();
  const currentOptions = OPTIONS[currentKey as keyof typeof OPTIONS] || [];
  const isSelected = (value: string) => {
    const sel = selections[currentKey];
    if (Array.isArray(sel)) return sel.includes(value);
    return sel === value;
  };

  return (
    <section ref={sectionRef} id="customizer" className="py-20 px-6 bg-mint/20">
      <h2
        ref={headingRef}
        className="font-playfair text-4xl md:text-5xl text-center text-chocolate mb-12"
      >
        Design Your Treat
      </h2>

      <div className="max-w-2xl mx-auto">
        {/* Progress Steps */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {STEPS.map((step, index) => (
            <div
              key={step}
              className={cn(
                'px-3 py-1 rounded-full font-nunito text-sm transition-all',
                index === currentStep
                  ? 'bg-soft-pink text-chocolate scale-110'
                  : index < currentStep
                  ? 'bg-mint text-chocolate'
                  : 'bg-cream text-chocolate/50'
              )}
            >
              {step}
            </div>
          ))}
        </div>

        {/* Options */}
        <div className="bg-cream rounded-3xl p-6 shadow-lg">
          <div className="grid grid-cols-2 gap-4">
            {currentOptions.map((option) => {
              const optionName = typeof option === 'string' ? option : option.name;
              const optionPrice = typeof option === 'object' ? option.price : 0;
              
              return (
                <button
                  key={optionName}
                  onClick={() => handleSelect(optionName)}
                  className={cn(
                    'p-4 rounded-xl border-2 transition-all text-left',
                    isSelected(optionName)
                      ? 'border-gold bg-gold/20 scale-105'
                      : 'border-chocolate/10 bg-white hover:border-soft-pink'
                  )}
                >
                  <span className="font-semibold text-chocolate">{optionName}</span>
                  {optionPrice > 0 && (
                    <span className="block text-sm text-chocolate/60">
                      +${(optionPrice / 100).toFixed(2)}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-full transition-colors',
                currentStep === 0
                  ? 'text-chocolate/30 cursor-not-allowed'
                  : 'text-chocolate hover:bg-soft-pink/20'
              )}
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={currentStep === STEPS.length - 1}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-full transition-colors',
                currentStep === STEPS.length - 1
                  ? 'text-chocolate/30 cursor-not-allowed'
                  : 'text-chocolate hover:bg-soft-pink/20'
              )}
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Price Display */}
        <div className="text-center mt-8">
          <p className="font-playfair text-2xl text-chocolate">
            Total: <span className="text-mint font-bold">${(displayPrice / 100).toFixed(2)}</span>
          </p>
          {currentStep === STEPS.length - 1 && (
            <button className="mt-4 px-8 py-3 bg-soft-pink text-chocolate rounded-full font-semibold flex items-center gap-2 mx-auto hover:bg-gold transition-colors">
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </section>
  );
}