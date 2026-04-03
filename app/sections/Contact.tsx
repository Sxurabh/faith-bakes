'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/app/lib/gsap';
import { Send, CheckCircle, Loader2, Sparkles, Heart, Star } from 'lucide-react';
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
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.contact-title', start: 'top 85%' }
        }
      );

      gsap.fromTo('.form-field',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 80%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const createConfetti = () => {
    const colors = ['#FFB6C1', '#98D8C8', '#FFD700', '#FFF8E7', '#5D4037'];
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
      confetti.style.animationDelay = Math.random() * 2 + 's';
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 5000);
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
    }, 5000);
  };

  return (
    <section ref={sectionRef} id="contact" className="py-24 px-6 bg-chocolate text-cream relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl rotate-12">🧁</div>
        <div className="absolute top-40 right-20 text-6xl -rotate-12">🍰</div>
        <div className="absolute bottom-20 left-1/4 text-6xl rotate-45">🍪</div>
        <div className="absolute bottom-40 right-10 text-6xl -rotate-45">🎂</div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cream/10 rounded-full mb-4">
            <Heart className="w-4 h-4 text-soft-pink" />
            <span className="text-sm font-semibold text-cream/70">We&apos;d love to hear from you</span>
          </div>
          <h2 className="contact-title font-playfair text-5xl md:text-6xl font-bold mb-4">
            Get In Touch
          </h2>
          <p className="text-cream/60 text-lg">Ready to order? Have questions? Let&apos;s chat!</p>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="form-field relative group">
            <input
              type="text"
              id="name"
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              className="w-full px-4 pt-6 pb-2 bg-cream/10 border-2 border-cream/30 rounded-xl focus:border-gold focus:outline-none peer placeholder-transparent transition-all duration-300"
              placeholder="Your Name"
              required
            />
            <label
              htmlFor="name"
              className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'name' || formState.name
                ? 'top-2 text-xs text-gold font-bold'
                : 'top-4 text-cream/70'
                }`}
            >
              <span className="flex items-center gap-2">
                <Star className="w-3 h-3" />
                Your Name
              </span>
            </label>
            <div className="absolute bottom-0 left-0 h-0.5 bg-gold transition-all duration-300 w-0 peer-focus:w-full" />
          </div>

          <div className="form-field relative group">
            <input
              type="email"
              id="email"
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              className="w-full px-4 pt-6 pb-2 bg-cream/10 border-2 border-cream/30 rounded-xl focus:border-gold focus:outline-none peer placeholder-transparent transition-all duration-300"
              placeholder="Your Email"
              required
            />
            <label
              htmlFor="email"
              className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'email' || formState.email
                ? 'top-2 text-xs text-gold font-bold'
                : 'top-4 text-cream/70'
                }`}
            >
              <span className="flex items-center gap-2">
                <Star className="w-3 h-3" />
                Your Email
              </span>
            </label>
            <div className="absolute bottom-0 left-0 h-0.5 bg-gold transition-all duration-300 w-0 peer-focus:w-full" />
          </div>

          <div className="form-field relative group">
            <textarea
              id="message"
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              className="w-full px-4 pt-6 pb-2 bg-cream/10 border-2 border-cream/30 rounded-xl focus:border-gold focus:outline-none peer placeholder-transparent transition-all duration-300 min-h-32 resize-none"
              placeholder="Your Message"
              required
            />
            <label
              htmlFor="message"
              className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'message' || formState.message
                ? 'top-2 text-xs text-gold font-bold'
                : 'top-4 text-cream/70'
                }`}
            >
              <span className="flex items-center gap-2">
                <Star className="w-3 h-3" />
                Your Message
              </span>
            </label>
            <div className="absolute bottom-0 left-0 h-0.5 bg-gold transition-all duration-300 w-0 peer-focus:w-full" />
          </div>

          <div className="form-field">
            {status === 'success' ? (
              <div className="w-full py-4 bg-mint text-chocolate rounded-xl font-bold text-lg flex items-center justify-center gap-2 animate-bounce">
                <CheckCircle className="w-6 h-6" />
                <span>Message Sent! We&apos;ll be in touch soon 🎉</span>
              </div>
            ) : (
              <MagneticButton
                variant="gold"
                className="w-full"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </MagneticButton>
            )}
          </div>
        </form>

        {/* Success Celebration */}
        {status === 'success' && (
          <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
            <div className="text-center animate-bounce">
              <div className="text-8xl mb-4">🎉</div>
              <div className="text-2xl font-bold text-chocolate bg-white/90 px-6 py-3 rounded-full shadow-2xl">
                Thank you! ✨
              </div>
            </div>
          </div>
        )}

        {/* Additional Contact Info */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="p-4 bg-cream/10 rounded-2xl hover:bg-cream/20 transition-colors">
            <div className="text-3xl mb-2">📧</div>
            <div className="font-bold text-sm">hello@faithbakes.com</div>
          </div>
          <div className="p-4 bg-cream/10 rounded-2xl hover:bg-cream/20 transition-colors">
            <div className="text-3xl mb-2">📱</div>
            <div className="font-bold text-sm">+1 (555) 123-4567</div>
          </div>
          <div className="p-4 bg-cream/10 rounded-2xl hover:bg-cream/20 transition-colors">
            <div className="text-3xl mb-2">📍</div>
            <div className="font-bold text-sm">Baker&apos;s Street, NY</div>
          </div>
        </div>
      </div>

      {/* Confetti Animation Styles */}
      <style jsx>{`
        @keyframes confetti-fall {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .confetti {
          position: fixed;
          width: 12px;
          height: 12px;
          animation: confetti-fall 3s ease-out forwards;
          z-index: 9999;
        }
      `}</style>
    </section>
  );
}