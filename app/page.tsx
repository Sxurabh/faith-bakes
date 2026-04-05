'use client';

import { useEffect, useState } from 'react';
import Hero from './sections/Hero';
import Cupcakes from './sections/Cupcakes';
import CustomCakes from './sections/CustomCakes';
import CookiesBrownies from './sections/CookiesBrownies';
import Customizer from './sections/Customizer';
import Contact from './sections/Contact';

export default function Home() {
  const [isTouch, setIsTouch] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
      setIsMobile(window.innerWidth < 640);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const cursor = document.getElementById('cursor');
    if (!cursor) return;

    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX - 10 + 'px';
      cursor.style.top = e.clientY - 10 + 'px';
    };

    const handleMouseEnter = () => cursor.classList.add('hovering');
    const handleMouseLeave = () => cursor.classList.remove('hovering');

    document.addEventListener('mousemove', moveCursor);
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [isTouch]);

  useEffect(() => {
    const container = document.getElementById('particles-container');
    if (!container) return;

    const colors = ['#FFB6C1', '#98D8C8', '#FFD700', '#FFF8E7'];
    
    const particleCount = isMobile ? 2 : (isTouch ? 3 : 5);
    const maxSize = isMobile ? 10 : 15;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const size = Math.random() * maxSize + 5;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 15 + 's';
      particle.style.animationDuration = 15 + Math.random() * 10 + 's';
      particle.style.opacity = isMobile ? '0.2' : '0.3';
      container.appendChild(particle);
    }

    return () => {
      container.innerHTML = '';
    };
  }, [isTouch, isMobile]);

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
