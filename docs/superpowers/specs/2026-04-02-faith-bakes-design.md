# Faith Bakes - Digital Catalogue Design

**Project:** Digital Cake Catalogue for Faith Bakes
**Date:** 2026-04-02
**Status:** Approved for Implementation

---

## Overview

A mobile-first digital catalogue showcasing Faith Bakes' cupcakes, cakes, cookies, and brownies with custom ordering capabilities. Features heavy yet performant scroll-driven animations and a playful, whimsical aesthetic.

### Success Criteria
- Mobile Lighthouse score 90+
- First Contentful Paint < 1.5s
- 60fps animations on mid-range mobile devices
- Smooth scroll experience with heavy visual impact

---

## Visual Identity

### Color Palette
| Name | Hex | Usage |
|------|-----|-------|
| Soft Pink | `#FFB6C1` | Primary accent, buttons |
| Cream | `#FFF8E7` | Backgrounds, cards |
| Mint | `#98D8C8` | Secondary accent, highlights |
| Chocolate | `#5D4037` | Text, dark accents |
| Gold | `#FFD700` | Luxury touches, CTAs |

### Typography
- **Headings:** Playfair Display (elegant serif)
- **Body:** Nunito (rounded sans-serif, friendly)
- **Sizes:** Responsive scaling from 14px (mobile) to 18px (desktop)

### Aesthetic
Playful & Whimsical with organic shapes, soft shadows, rounded corners, and subtle paper grain texture overlay.

---

## Page Structure (Single Page)

### Section 1: Hero
- Full viewport height (100vh)
- Animated Faith Bakes logo reveal with GSAP
- Floating cake elements with parallax effect
- Primary CTA: "Explore Our Treats" with bounce animation
- Scroll indicator with pulse animation

**Animations:**
- Logo: Scale + opacity reveal with staggered letters
- Floating elements: Continuous gentle float (CSS keyframes)
- Background: Subtle animated gradient or blob shapes

### Section 2: Cupcakes
- Section heading with scroll-triggered reveal
- Horizontal swipeable card layout on mobile
- 2-column grid on desktop

**Card Features:**
- 3D tilt effect on hover/touch (CSS transform3d)
- Scale-up entrance animation on scroll
- Image zoom on hover
- Quick-view button reveals modal

**Animations:**
- ScrollTrigger: Cards stagger in from bottom with 0.1s delay between each
- Transform: translateY(50px) → translateY(0) + opacity 0→1

### Section 3: Custom Cakes
- Masonry-style staggered grid layout
- Larger featured cards for showcase cakes
- "Customize Yours" CTA prominently displayed

**Animations:**
- ScrollTrigger: Alternating left/right entrance
- Cards rotate slightly (-3deg to 3deg) as they enter
- Elastic overshoot on final position

### Section 4: Cookies & Brownies
- Alternating layout (image left/right alternates)
- Horizontal scroll section on mobile (optional)
- Grid layout on desktop

**Animations:**
- Bounce-in effect from edges
- Staggered reveal with spring physics

### Section 5: Customization Preview
- Interactive product configurator
- Selection flow: Base → Flavor → Frosting → Toppings → Preview
- Real-time visual feedback

**Features:**
- Animated selection state changes
- Smooth transitions between options
- Price calculation with animated counter
- CTA to contact/order

**Animations:**
- Step transitions: Slide + fade
- Selection highlights: Scale + color change
- Preview area: Morphing transitions

### Section 6: Contact / Order
- Contact form with floating labels
- Micro-interactions on input focus
- Submit button with loading state
- Success animation on submission

**Animations:**
- Form fields stagger in
- Button: Ripple effect on click
- Success: Confetti or checkmark animation

---

## Animation Specifications

### GSAP ScrollTrigger Setup
```javascript
// Pattern for section reveals
gsap.from('.section-element', {
  scrollTrigger: {
    trigger: '.section',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  },
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.1,
  ease: 'power2.out'
});
```

### Card 3D Tilt (CSS)
```css
.card {
  transform-style: preserve-3d;
  transition: transform 0.3s ease;
}
.card:hover {
  transform: perspective(1000px) rotateX(5deg) rotateY(-5deg) scale(1.02);
}
```

### Floating Elements (CSS)
```css
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}
```

### Performance Rules
- Use `transform` and `opacity` only for animations (GPU-accelerated)
- Apply `will-change: transform` to animated elements
- Use `contain: layout` where appropriate
- Batch ScrollTrigger animations with `batch()` method
- Implement `prefers-reduced-motion` media query fallbacks

---

## Responsive Breakpoints

| Breakpoint | Layout Changes |
|------------|----------------|
| < 640px (Mobile) | Single column, horizontal swipe cards, reduced particles |
| 640-1024px (Tablet) | 2-column grid, medium animations |
| > 1024px (Desktop) | Full layout, all effects, enhanced particles |

---

## Technical Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 3.4+ |
| Animations | GSAP + ScrollTrigger + @gsap/react |
| Icons | Lucide React |
| Fonts | Google Fonts (Playfair Display, Nunito) |
| Images | Next.js Image with placeholder blur |
| Build | Static export for deployment |

---

## File Structure

```
app/
├── sections/
│   ├── Hero.tsx              # Hero with floating elements
│   ├── Cupcakes.tsx          # Cupcake showcase
│   ├── CustomCakes.tsx       # Custom cakes grid
│   ├── CookiesBrownies.tsx   # Cookies & brownies
│   ├── Customizer.tsx        # Customization preview
│   └── Contact.tsx           # Contact form
├── components/
│   ├── AnimatedCard.tsx      # Reusable 3D card
│   ├── FloatingElement.tsx   # Parallax floating item
│   ├── BlobShape.tsx         # SVG blob backgrounds
│   ├── ProductModal.tsx      # Quick view modal
│   ├── CustomizationForm.tsx # Form components
│   └── ScrollReveal.tsx      # GSAP scroll wrapper
├── hooks/
│   ├── useScrollAnimation.ts # GSAP scroll setup
│   └── useParallax.ts        # Parallax effect hook
├── lib/
│   ├── gsap.ts              # GSAP configuration
│   └── utils.ts             # Utility functions
├── types/
│   └── index.ts             # TypeScript types
├── page.tsx                 # Main page
├── layout.tsx               # Root layout
└── globals.css              # Global styles + animations
public/
├── images/                  # Product images (placeholders)
└── fonts/                   # Local font files if needed
```

---

## Data Structure

### Product Type
```typescript
interface Product {
  id: string;
  name: string;
  category: 'cupcake' | 'cake' | 'cookie' | 'brownie';
  description: string;
  basePrice: number;
  image: string;
  sizes?: Size[];
  flavors?: string[];
  isCustomizable: boolean;
}

interface Size {
  name: string;
  price: number;
  servings?: number;
}
```

### Customization Options
```typescript
interface CustomizationOption {
  base: string[];
  flavor: string[];
  frosting: string[];
  toppings: string[];
  colors: string[];
}
```

---

## Performance Optimizations

1. **Images:** WebP format, lazy loading, blur placeholders
2. **Animations:** CSS for simple, GSAP for complex, throttle scroll events
3. **Bundle:** Code splitting by section, tree-shake GSAP plugins
4. **Mobile:** Reduce particle counts, simplify 3D effects
5. **Fonts:** `font-display: swap`, preload critical fonts

---

## Accessibility

- `prefers-reduced-motion`: Disable/replace heavy animations
- Semantic HTML: Proper heading hierarchy, landmarks
- Focus states: Visible focus indicators on all interactive elements
- Color contrast: WCAG AA compliant (4.5:1 for text)
- Alt text: Descriptive for all product images

---

## Placeholder Content

**Brand Name:** Faith Bakes

**Sample Products (for placeholders):**
- Cupcakes: Vanilla Dream, Chocolate Heaven, Strawberry Bliss
- Cakes: Classic Birthday, Wedding Elegance, Anniversary Special
- Cookies: Chocolate Chip, Oatmeal Raisin, Sugar Cookies
- Brownies: Fudge Brownie, Walnut Brownie, Blondie

**Images:** Use gradient placeholders with category icons until real photos available.

---

## Next Steps

1. Create implementation plan with writing-plans skill
2. Set up Next.js project with dependencies
3. Build sections in order: Hero → Cupcakes → Custom Cakes → etc.
4. Add animations progressively
5. Optimize and test on mobile devices

---

## Design Approval

**Approved by:** User
**Date:** 2026-04-02
**Status:** Ready for Implementation Planning
