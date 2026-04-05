'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/app/lib/gsap';
import { Send, CheckCircle, Loader2, Heart, Star } from 'lucide-react';
import MagneticButton from '@/app/components/MagneticButton';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-title',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.contact-title', start: 'top 85%' }
        }
      );

      gsap.fromTo('.form-field',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 80%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const createConfetti = () => {
    if (typeof window === 'undefined') return;
    const colors = ['#FFB6C1', '#98D8C8', '#FFD700', '#FFF8E7', '#5D4037'];
    const isMobile = window.innerWidth < 640;
    const count = isMobile ? 25 : 50;
    
    for (let i = 0; i < count; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
      confetti.style.animationDelay = Math.random() * 1 + 's';
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      confetti.style.width = isMobile ? '8px' : '12px';
      confetti.style.height = isMobile ? '8px' : '12px';
      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 4000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    await new Promise(resolve => setTimeout(resolve, 1500));

    setStatus('success');
    createConfetti();

    setTimeout(() => {
      setFormState({ name: '', email: '', message: '' });
      setStatus('idle');
    }, 4000);
  };

  return (
    <section ref={sectionRef} id="contact" className="py-16 sm:py-24 px-4 sm:px-6 bg-chocolate text-cream relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-6 left-6 sm:top-10 sm:left-10 text-4xl sm:text-6xl rotate-12">🧁</div>
        <div className="absolute top-32 right-10 sm:top-40 sm:right-20 text-4xl sm:text-6xl -rotate-12">🍰</div>
        <div className="absolute bottom-16 left-1/4 text-4xl sm:bottom-20 sm:text-6xl rotate-45">🍪</div>
        <div className="absolute bottom-32 right-6 sm:bottom-40 sm:right-10 text-4xl sm:text-6xl -rotate-45">🎂</div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-cream/10 rounded-full mb-3 sm:mb-4">
            <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-rose" />
            <span className="text-xs sm:text-sm font-semibold text-cream/70">We&apos;d love to hear from you</span>
          </div>
          <h2 className="contact-title font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
            Get In Touch
          </h2>
          <p className="text-cream/60 text-base sm:text-lg">Ready to order? Have questions? Let&apos;s chat!</p>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-5 sm:space-y-6"
        >
          <div className="form-field relative group">
            <input
              type="text"
              id="name"
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              className="w-full px-4 pt-6 pb-2 bg-cream/10 border-2 border-cream/30 rounded-xl focus:border-amber focus:outline-none peer placeholder-transparent transition-all duration-300 text-base"
              placeholder="Your Name"
              required
            />
            <label
              htmlFor="name"
              className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'name' || formState.name
                ? 'top-2 text-xs text-amber font-bold'
                : 'top-4 text-cream/70'
                }`}
            >
              <span className="flex items-center gap-2 text-sm sm:text-base">
                <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                Your Name
              </span>
            </label>
            <div className="absolute bottom-0 left-0 h-0.5 bg-amber transition-all duration-300 w-0 peer-focus:w-full" />
          </div>

          <div className="form-field relative group">
            <input
              type="email"
              id="email"
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              className="w-full px-4 pt-6 pb-2 bg-cream/10 border-2 border-cream/30 rounded-xl focus:border-amber focus:outline-none peer placeholder-transparent transition-all duration-300 text-base"
              placeholder="Your Email"
              required
            />
            <label
              htmlFor="email"
              className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'email' || formState.email
                ? 'top-2 text-xs text-amber font-bold'
                : 'top-4 text-cream/70'
                }`}
            >
              <span className="flex items-center gap-2 text-sm sm:text-base">
                <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                Your Email
              </span>
            </label>
            <div className="absolute bottom-0 left-0 h-0.5 bg-amber transition-all duration-300 w-0 peer-focus:w-full" />
          </div>

          <div className="form-field relative group">
            <textarea
              id="message"
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              className="w-full px-4 pt-6 pb-2 bg-cream/10 border-2 border-cream/30 rounded-xl focus:border-amber focus:outline-none peer placeholder-transparent transition-all duration-300 min-h-24 sm:min-h-32 resize-none text-base"
              placeholder="Your Message"
              required
            />
            <label
              htmlFor="message"
              className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'message' || formState.message
                ? 'top-2 text-xs text-amber font-bold'
                : 'top-4 text-cream/70'
                }`}
            >
              <span className="flex items-center gap-2 text-sm sm:text-base">
                <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                Your Message
              </span>
            </label>
            <div className="absolute bottom-0 left-0 h-0.5 bg-amber transition-all duration-300 w-0 peer-focus:w-full" />
          </div>

          <div className="form-field pt-2">
            {status === 'success' ? (
              <div className="w-full py-3 sm:py-4 bg-amber-500 text-chocolate rounded-xl font-bold flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-sm sm:text-base">Message Sent! We&apos;ll be in touch soon</span>
              </div>
            ) : (
              <MagneticButton
                variant="primary"
                className="w-full"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    <span className="text-sm sm:text-base">Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base">Send Message</span>
                  </>
                )}
              </MagneticButton>
            )}
          </div>
        </form>

        {status === 'success' && (
          <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50 p-4">
            <div className="text-center">
              <div className="text-6xl sm:text-8xl mb-4">🎉</div>
              <div className="text-xl sm:text-2xl font-bold text-chocolate bg-white/90 px-5 py-3 sm:px-6 sm:py-3 rounded-full shadow-2xl">
                Thank you!
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
          <div className="p-3 sm:p-4 bg-cream/10 rounded-xl sm:rounded-2xl hover:bg-cream/20 transition-colors">
            <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">📧</div>
            <div className="font-bold text-xs sm:text-sm break-all">hello@faithbakes.com</div>
          </div>
          <div className="p-3 sm:p-4 bg-cream/10 rounded-xl sm:rounded-2xl hover:bg-cream/20 transition-colors">
            <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">📱</div>
            <div className="font-bold text-xs sm:text-sm">+1 (555) 123-4567</div>
          </div>
          <div className="p-3 sm:p-4 bg-cream/10 rounded-xl sm:rounded-2xl hover:bg-cream/20 transition-colors">
            <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">📍</div>
            <div className="font-bold text-xs sm:text-sm">Baker&apos;s Street, NY</div>
          </div>
        </div>
      </div>
    </section>
  );
}
