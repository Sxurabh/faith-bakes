'use client';

import { useEffect } from 'react';
import Hero from './sections/Hero';
import Cupcakes from './sections/Cupcakes';
import CustomCakes from './sections/CustomCakes';
import CookiesBrownies from './sections/CookiesBrownies';
import Customizer from './sections/Customizer';
import Contact from './sections/Contact';

export default function Home() {
  useEffect(() => {
    // Custom cursor logic
    const cursor = document.getElementById('cursor');
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');

    const moveCursor = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
      }
    };

    const handleMouseEnter = () => cursor?.classList.add('hovering');
    const handleMouseLeave = () => cursor?.classList.remove('hovering');

    document.addEventListener('mousemove', moveCursor);
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Create floating particles
    const container = document.getElementById('particles-container');
    const colors = ['#FFB6C1', '#98D8C8', '#FFD700', '#FFF8E7'];

    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.width = Math.random() * 20 + 10 + 'px';
      particle.style.height = particle.style.width;
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 15 + 's';
      particle.style.animationDuration = 15 + Math.random() * 10 + 's';
      particle.style.opacity = '0.3';
      container?.appendChild(particle);
    }

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <main className="relative z-10">
      <Hero />
      <Cupcakes />
      <CustomCakes />
      <CookiesBrownies />
      <Customizer />
      <Contact />
    </main>
  );
}