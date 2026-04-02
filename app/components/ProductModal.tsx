'use client';

import { useEffect, useRef } from 'react';
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
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements?.[0] as HTMLElement;
    const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;
    
    firstElement?.focus();
    
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };
    
    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  if (!isOpen || !product) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="absolute inset-0 bg-chocolate/60 backdrop-blur-sm" />
      <div
        ref={modalRef}
        className="relative bg-cream rounded-3xl p-6 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 hover:bg-soft-pink/20 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-chocolate" />
        </button>
        <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
          <Image 
            src={product.image} 
            alt={product.name} 
            fill 
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 448px"
          />
        </div>
        <h2 id="modal-title" className="font-playfair text-2xl font-bold text-chocolate mb-2">{product.name}</h2>
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