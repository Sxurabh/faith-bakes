import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-brown': '#2C2420',
        charcoal: '#3A3A3A',
        'rose-gold': '#D4A574',
        terracotta: '#C85A3A',
        sage: '#A8B8A8',
        'warm-beige': '#E8DCC4',
        cream: '#FAF8F3',
        /* Legacy colors for backward compatibility */
        'soft-pink': '#E8C4D4',
        mint: '#B8D4CC',
        chocolate: '#2C2420',
        gold: '#D4A574',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out 2s infinite',
        'float-slow': 'float 10s ease-in-out 1s infinite',
        pulse: 'pulse 3s ease-in-out infinite',
        'bounce-in': 'elegant-in 0.6s cubic-bezier(0, 0.3, 0.3, 1)',
        wobble: 'subtle-tilt 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        shimmer: 'shimmer 2s infinite',
        morph: 'morph 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(3deg)' },
        },
        'elegant-in': {
          '0%': { transform: 'scale(0.95) translateY(10px)', opacity: '0' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
        },
        'subtle-tilt': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-1.5deg)' },
          '75%': { transform: 'rotate(1.5deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
      },
      boxShadow: {
        'premium': '0 4px 20px rgba(44, 36, 32, 0.08)',
        'premium-lg': '0 8px 32px rgba(44, 36, 32, 0.12)',
      },
    },
  },
  plugins: [],
};

export default config;
