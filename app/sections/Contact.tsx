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
    <section ref={sectionRef} id="contact" className="py-20 px-6 bg-chocolate text-cream">
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
            className="w-full px-4 pt-6 pb-2 bg-cream/10 border-2 border-cream/30 rounded-xl focus:border-gold focus:outline-none peer placeholder-transparent transition-colors"
            placeholder="Your Name"
            required
          />
          <label
            htmlFor="name"
            className={`absolute left-4 transition-all duration-200 pointer-events-none ${
              focusedField === 'name' || formState.name
                ? 'top-2 text-xs text-gold'
                : 'top-4 text-cream/70'
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
            className="w-full px-4 pt-6 pb-2 bg-cream/10 border-2 border-cream/30 rounded-xl focus:border-gold focus:outline-none peer placeholder-transparent transition-colors"
            placeholder="Your Email"
            required
          />
          <label
            htmlFor="email"
            className={`absolute left-4 transition-all duration-200 pointer-events-none ${
              focusedField === 'email' || formState.email
                ? 'top-2 text-xs text-gold'
                : 'top-4 text-cream/70'
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
            className="w-full px-4 pt-6 pb-2 bg-cream/10 border-2 border-cream/30 rounded-xl focus:border-gold focus:outline-none peer placeholder-transparent transition-colors min-h-32 resize-none"
            placeholder="Your Message"
            required
          />
          <label
            htmlFor="message"
            className={`absolute left-4 transition-all duration-200 pointer-events-none ${
              focusedField === 'message' || formState.message
                ? 'top-2 text-xs text-gold'
                : 'top-4 text-cream/70'
            }`}
          >
            Your Message
          </label>
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-4 bg-soft-pink text-chocolate rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:bg-gold transition-colors disabled:opacity-50 relative overflow-hidden"
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
          <div className="confetti-piece bg-gold w-3 h-3 rounded-full animate-confetti" style={{ '--delay': '0s', '--x': '-100px' } as React.CSSProperties} />
          <div className="confetti-piece bg-soft-pink w-3 h-3 rounded-full animate-confetti" style={{ '--delay': '0.1s', '--x': '100px' } as React.CSSProperties} />
          <div className="confetti-piece bg-mint w-3 h-3 rounded-full animate-confetti" style={{ '--delay': '0.2s', '--x': '-50px' } as React.CSSProperties} />
          <div className="confetti-piece bg-cream w-3 h-3 rounded-full animate-confetti" style={{ '--delay': '0.3s', '--x': '50px' } as React.CSSProperties} />
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
