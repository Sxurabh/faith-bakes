'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/app/lib/gsap';
import { cn } from '@/app/lib/utils';
import { ChevronRight, ChevronLeft, Sparkles, Check, ShoppingBag } from 'lucide-react';
import MagneticButton from '@/app/components/MagneticButton';

const STEPS = ['Base', 'Flavor', 'Frosting', 'Toppings', 'Preview'];

const OPTIONS = {
  base: [
    { name: 'Cupcake', price: 450, icon: '🧁' },
    { name: '6" Cake', price: 4500, icon: '🎂' },
    { name: '8" Cake', price: 5500, icon: '🍰' },
    { name: 'Cookie Box (12)', price: 2500, icon: '🍪' },
  ],
  flavor: [
    { name: 'Vanilla', icon: '🤍' },
    { name: 'Chocolate', icon: '🍫' },
    { name: 'Strawberry', icon: '🍓' },
    { name: 'Red Velvet', icon: '❤️' },
    { name: 'Lemon', icon: '🍋' },
  ],
  frosting: [
    { name: 'Buttercream', icon: '🧈' },
    { name: 'Cream Cheese', icon: '🧀' },
    { name: 'Ganache', icon: '🍫' },
    { name: 'Whipped Cream', icon: '🥛' },
  ],
  toppings: [
    { name: 'Sprinkles', price: 50, icon: '🌈' },
    { name: 'Chocolate Chips', price: 75, icon: '🍫' },
    { name: 'Fresh Fruit', price: 100, icon: '🍓' },
    { name: 'Edible Flowers', price: 150, icon: '🌸' },
  ],
};

export default function Customizer() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string | string[]>>({
    base: '',
    flavor: '',
    frosting: '',
    toppings: [],
  });
  const [displayPrice, setDisplayPrice] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const getPrice = () => {
    const baseOption = OPTIONS.base.find(o => o.name === selections.base);
    const basePrice = baseOption?.price || 0;
    const toppingsPrice = (selections.toppings as string[]).reduce(
      (sum, t) => sum + (OPTIONS.toppings.find(top => top.name === t)?.price || 0),
      0
    );
    return basePrice + toppingsPrice;
  };

  useEffect(() => {
    const targetPrice = getPrice();
    const startPrice = displayPrice;
    const diff = targetPrice - startPrice;

    if (diff === 0) return;

    const duration = 600;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayPrice(Math.round(startPrice + diff * easeProgress));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [selections]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.customizer-title',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.customizer-title', start: 'top 85%' }
        }
      );
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
        setTimeout(() => {
          setCurrentStep(c => c + 1);
          // Animate content change
          if (contentRef.current) {
            gsap.fromTo(contentRef.current,
              { opacity: 0, x: 50 },
              { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
            );
          }
        }, 300);
      }
    }
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(c => c + 1);
      animateContent();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(c => c - 1);
      animateContent();
    }
  };

  const animateContent = () => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  };

  const currentKey = STEPS[currentStep].toLowerCase();
  const currentOptions = OPTIONS[currentKey as keyof typeof OPTIONS] || [];
  const isSelected = (value: string) => {
    const sel = selections[currentKey];
    if (Array.isArray(sel)) return sel.includes(value);
    return sel === value;
  };

  const handleComplete = () => {
    setIsComplete(true);
    // Celebration animation
    gsap.to('.completion-celebration', {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: 'back.out(2)'
    });
  };

  return (
    <section ref={sectionRef} id="customizer" className="py-24 px-6 bg-gradient-to-b from-sage/10 to-cream relative overflow-hidden">
      {/* Background Pattern - Subtle */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-rose-gold/20 rounded-full" />
        <div className="absolute top-40 right-20 w-32 h-32 border-2 border-sage/20 rounded-full" />
        <div className="absolute bottom-20 left-1/4 w-24 h-24 border-2 border-terracotta/20 rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="customizer-title font-playfair text-5xl md:text-6xl font-bold text-dark-brown mb-4">
            Design Your <span className="text-rose-gold">Creation</span>
          </h2>
          <p className="text-dark-brown/60 text-lg">Step-by-step to your perfect treat</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center gap-2 md:gap-4 mb-12 flex-wrap">
          {STEPS.map((step, index) => (
            <div
              key={step}
              onClick={() => index <= currentStep && setCurrentStep(index)}
              className={cn(
                'px-4 py-2 rounded-full font-nunito text-sm font-bold transition-all duration-300 cursor-pointer',
                index === currentStep
                  ? 'bg-rose-gold text-cream scale-110 shadow-lg'
                  : index < currentStep
                    ? 'bg-sage text-cream cursor-pointer hover:scale-105'
                    : 'bg-cream text-dark-brown/40'
              )}
            >
              <span className="hidden md:inline">{index + 1}. </span>
              {step}
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div
          ref={contentRef}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-premium-lg border border-warm-beige/50"
        >
          {currentStep === 4 || isComplete ? (
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-gradient-to-br from-rose-gold to-sage rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <h3 className="font-playfair text-3xl font-bold text-dark-brown">Your Creation is Ready!</h3>

              <div className="bg-warm-beige/30 rounded-2xl p-6 space-y-3 text-left max-w-md mx-auto">
                {selections.base && (
                  <div className="flex justify-between items-center">
                    <span className="text-dark-brown/60">Base</span>
                    <span className="font-bold text-dark-brown flex items-center gap-2">
                      {OPTIONS.base.find(b => b.name === selections.base)?.icon}
                      {selections.base}
                    </span>
                  </div>
                )}
                {selections.flavor && (
                  <div className="flex justify-between items-center">
                    <span className="text-dark-brown/60">Flavor</span>
                    <span className="font-bold text-dark-brown flex items-center gap-2">
                      {OPTIONS.flavor.find(f => f.name === selections.flavor)?.icon}
                      {selections.flavor}
                    </span>
                  </div>
                )}
                {selections.frosting && (
                  <div className="flex justify-between items-center">
                    <span className="text-dark-brown/60">Frosting</span>
                    <span className="font-bold text-dark-brown flex items-center gap-2">
                      {OPTIONS.frosting.find(f => f.name === selections.frosting)?.icon}
                      {selections.frosting}
                    </span>
                  </div>
                )}
                {(selections.toppings as string[]).length > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-dark-brown/60">Toppings</span>
                    <span className="font-bold text-dark-brown">
                      {(selections.toppings as string[]).map(t =>
                        OPTIONS.toppings.find(top => top.name === t)?.icon
                      ).join(' ')}
                    </span>
                  </div>
                )}
                <div className="border-t border-dark-brown/10 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-playfair text-lg text-dark-brown">Total</span>
                    <span className="font-bold text-rose-gold text-2xl">${(getPrice() / 100).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <MagneticButton variant="primary" onClick={() => window.location.href = '#contact'}>
                  <ShoppingBag className="w-5 h-5" />
                  Order Now
                </MagneticButton>
                <button
                  onClick={() => { setIsComplete(false); setCurrentStep(0); setSelections({ base: '', flavor: '', frosting: '', toppings: [] }); }}
                  className="px-6 py-4 border border-dark-brown/20 rounded-full font-bold text-dark-brown hover:border-rose-gold hover:text-rose-gold transition-colors"
                >
                  Start Over
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="font-playfair text-2xl text-dark-brown mb-6 text-center">
                Choose your {STEPS[currentStep]}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {currentOptions.map((option: any) => (
                  <button
                    key={option.name}
                    onClick={() => handleSelect(option.name)}
                    className={cn(
                      'p-6 rounded-2xl border transition-all duration-300 text-left hover:scale-105',
                      isSelected(option.name)
                        ? 'border-rose-gold bg-gradient-to-br from-rose-gold/15 to-sage/15 shadow-lg scale-105'
                        : 'border-dark-brown/10 bg-warm-beige/30 hover:border-rose-gold hover:shadow-md'
                    )}
                  >
                    <div className="text-4xl mb-2">{option.icon}</div>
                    <div className="font-bold text-dark-brown mb-1">{option.name}</div>
                    {option.price && (
                      <div className="text-sm text-dark-brown/60">+${(option.price / 100).toFixed(2)}</div>
                    )}
                    {isSelected(option.name) && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-rose-gold rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-cream" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          {!isComplete && currentStep < 4 && (
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className={cn(
                  'flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all',
                  currentStep === 0
                    ? 'text-dark-brown/30 cursor-not-allowed'
                    : 'text-dark-brown hover:bg-rose-gold/10'
                )}
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={currentStep === STEPS.length - 1}
                className={cn(
                  'flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all',
                  currentStep === STEPS.length - 1
                    ? 'text-dark-brown/30 cursor-not-allowed'
                    : 'text-dark-brown hover:bg-rose-gold/10'
                )}
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Price Display */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full shadow-premium border border-warm-beige/50">
            <span className="font-playfair text-xl text-dark-brown">Current Total:</span>
            <span className="font-bold text-rose-gold text-3xl">${(displayPrice / 100).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
