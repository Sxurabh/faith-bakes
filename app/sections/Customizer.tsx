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
          if (contentRef.current) {
            gsap.fromTo(contentRef.current,
              { opacity: 0, x: 50 },
              { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }
            );
          }
        }, 200);
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
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
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
    gsap.to('.completion-celebration', {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: 'back.out(2)'
    });
  };

  const scrollToContact = () => {
    if (typeof document !== 'undefined') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} id="customizer" className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-mint/20 to-cream relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-16 h-16 sm:w-20 sm:h-20 border-4 border-soft-pink/30 rounded-full" />
        <div className="absolute top-40 right-10 sm:right-20 w-24 h-24 sm:w-32 sm:h-32 border-4 border-mint/30 rounded-full" />
        <div className="absolute bottom-20 left-1/4 w-20 h-20 sm:w-24 sm:h-24 border-4 border-gold/30 rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="customizer-title font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-chocolate mb-3 sm:mb-4">
            Design Your <span className="text-mint">Treat</span>
          </h2>
          <p className="text-chocolate/60 text-base sm:text-lg px-4">Step-by-step to your perfect creation</p>
        </div>

        <div className="flex justify-center gap-1.5 sm:gap-2 md:gap-4 mb-8 sm:mb-12 flex-wrap px-2">
          {STEPS.map((step, index) => (
            <div
              key={step}
              onClick={() => index <= currentStep && setCurrentStep(index)}
              className={cn(
                'px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full font-nunito text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer touch-manipulation',
                index === currentStep
                  ? 'bg-soft-pink text-chocolate scale-105 shadow-lg'
                  : index < currentStep
                    ? 'bg-mint text-chocolate cursor-pointer hover:scale-105'
                    : 'bg-cream text-chocolate/40'
              )}
            >
              <span className="hidden sm:inline">{index + 1}. </span>
              <span className="truncate">{step}</span>
            </div>
          ))}
        </div>

        <div
          ref={contentRef}
          className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border-2 border-soft-pink/20"
        >
          {currentStep === 4 || isComplete ? (
            <div className="text-center space-y-4 sm:space-y-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-soft-pink to-mint rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-xl">
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
              </div>
              <h3 className="font-playfair text-xl sm:text-2xl md:text-3xl font-bold text-chocolate">Your Creation is Ready!</h3>

              <div className="bg-cream/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-2 sm:space-y-3 text-left max-w-md mx-auto">
                {selections.base && (
                  <div className="flex justify-between items-center">
                    <span className="text-chocolate/60 text-sm sm:text-base">Base</span>
                    <span className="font-bold text-chocolate flex items-center gap-2 text-sm sm:text-base">
                      {OPTIONS.base.find(b => b.name === selections.base)?.icon}
                      {selections.base}
                    </span>
                  </div>
                )}
                {selections.flavor && (
                  <div className="flex justify-between items-center">
                    <span className="text-chocolate/60 text-sm sm:text-base">Flavor</span>
                    <span className="font-bold text-chocolate flex items-center gap-2 text-sm sm:text-base">
                      {OPTIONS.flavor.find(f => f.name === selections.flavor)?.icon}
                      {selections.flavor}
                    </span>
                  </div>
                )}
                {selections.frosting && (
                  <div className="flex justify-between items-center">
                    <span className="text-chocolate/60 text-sm sm:text-base">Frosting</span>
                    <span className="font-bold text-chocolate flex items-center gap-2 text-sm sm:text-base">
                      {OPTIONS.frosting.find(f => f.name === selections.frosting)?.icon}
                      {selections.frosting}
                    </span>
                  </div>
                )}
                {(selections.toppings as string[]).length > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-chocolate/60 text-sm sm:text-base">Toppings</span>
                    <span className="font-bold text-chocolate text-sm sm:text-base">
                      {(selections.toppings as string[]).map(t =>
                        OPTIONS.toppings.find(top => top.name === t)?.icon
                      ).join(' ')}
                    </span>
                  </div>
                )}
                <div className="border-t-2 border-chocolate/10 pt-2 sm:pt-3 mt-2 sm:mt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-playfair text-base sm:text-lg text-chocolate">Total</span>
                    <span className="font-bold text-mint text-xl sm:text-2xl">${(getPrice() / 100).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center px-2">
                <MagneticButton variant="primary" onClick={scrollToContact}>
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                  Order Now
                </MagneticButton>
                <button
                  onClick={() => { setIsComplete(false); setCurrentStep(0); setSelections({ base: '', flavor: '', frosting: '', toppings: [] }); }}
                  className="px-4 py-3 sm:px-6 sm:py-4 border-2 border-chocolate/20 rounded-full font-bold text-chocolate hover:border-soft-pink hover:text-soft-pink transition-colors touch-manipulation text-sm sm:text-base"
                >
                  Start Over
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="font-playfair text-xl sm:text-2xl text-chocolate mb-4 sm:mb-6 text-center">
                Choose your {STEPS[currentStep]}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {currentOptions.map((option: any) => (
                  <button
                    key={option.name}
                    onClick={() => handleSelect(option.name)}
                    className={cn(
                      'relative p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 text-left hover:scale-[1.02] active:scale-[0.98] touch-manipulation',
                      isSelected(option.name)
                        ? 'border-gold bg-gradient-to-br from-gold/20 to-soft-pink/20 shadow-lg scale-[1.02]'
                        : 'border-chocolate/10 bg-cream/50 hover:border-soft-pink hover:shadow-md'
                    )}
                  >
                    <div className="text-3xl sm:text-4xl mb-2">{option.icon}</div>
                    <div className="font-bold text-chocolate mb-1 text-sm sm:text-base">{option.name}</div>
                    {option.price && (
                      <div className="text-xs sm:text-sm text-chocolate/60">+${(option.price / 100).toFixed(2)}</div>
                    )}
                    {isSelected(option.name) && (
                      <div className="absolute top-2 right-2 w-5 h-5 sm:w-6 sm:h-6 bg-gold rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-chocolate" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!isComplete && currentStep < 4 && (
            <div className="flex justify-between mt-6 sm:mt-8">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className={cn(
                  'flex items-center gap-1.5 sm:gap-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded-full font-semibold transition-all touch-manipulation text-sm sm:text-base',
                  currentStep === 0
                    ? 'text-chocolate/30 cursor-not-allowed'
                    : 'text-chocolate hover:bg-soft-pink/20'
                )}
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={currentStep === STEPS.length - 1}
                className={cn(
                  'flex items-center gap-1.5 sm:gap-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded-full font-semibold transition-all touch-manipulation text-sm sm:text-base',
                  currentStep === STEPS.length - 1
                    ? 'text-chocolate/30 cursor-not-allowed'
                    : 'text-chocolate hover:bg-soft-pink/20'
                )}
              >
                Next
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          )}
        </div>

        <div className="text-center mt-6 sm:mt-8">
          <div className="inline-flex items-center gap-2 sm:gap-4 bg-white/80 backdrop-blur-sm px-4 py-2.5 sm:px-8 sm:py-4 rounded-full shadow-lg border border-soft-pink/20">
            <span className="font-playfair text-base sm:text-xl text-chocolate">Current Total:</span>
            <span className="font-bold text-mint text-xl sm:text-3xl">${(displayPrice / 100).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
