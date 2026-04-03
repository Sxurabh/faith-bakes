# Faith Bakes - Design Refresh Spec

**Project:** Faith Bakes Website Design Refresh
**Date:** 2026-04-03
**Status:** Draft

---

## Overview

Refresh the Faith Bakes website to create a **whimsical premium** aesthetic — playful and fun, but with an elevated, trustworthy feel. Mobile-first with an engaging browsing experience.

### Success Criteria
- Mobile-first responsive design
- Playful yet premium visual identity
- Engaging animations that feel premium, not childish
- Smooth 60fps scrolling experience on mobile

---

## Brand Identity: "Whimsical Premium"

| Aspect | Direction |
|--------|-----------|
| **Feel** | Artisan bakery meets creative fun |
| **Trust** | Premium polish signals quality |
| **Mobile** | Touch-optimized, thumb-friendly |

---

## Color Palette Upgrade

| Name | Hex | Usage |
|------|-----|-------|
| Raspberry | `#D6336C` | Primary accent, CTAs |
| Warm Ivory | `#FFF9F0` | Main background |
| Honey Gold | `#E5A84B` | Highlights, premium touches |
| Soft Sage | `#A8D5BA` | Secondary accents |
| Deep Chocolate | `#3D2314` | Primary text |
| Soft Cream | `#FDF6E3` | Card backgrounds |

**Rationale:** Richer, deeper tones feel more premium than flat pastels while staying playful.

---

## Typography

- **Headings:** Playfair Display (serif) — elegant, premium feel
- **Body:** Nunito (rounded sans-serif) — friendly, readable on mobile
- **Accent:** Nunito Bold for CTAs and prices

**Mobile Typography Scale:**
- H1: 2.5rem (40px)
- H2: 2rem (32px)
- H3: 1.5rem (24px)
- Body: 1rem (16px)
- Small: 0.875rem (14px)

---

## Layout Strategy

### Navigation
- Sticky category pills: **Cupcakes | Cakes | Cookies | Brownies**
- Smooth scroll to section on tap
- Active state indicator (underline + color change)

### Section Flow (Mobile-First)

1. **Hero** — Full viewport, animated logo, parallax floating treats, CTA with "squish" press effect

2. **Product Cards** — 2-column grid (mobile), 3-4 column (desktop)
   - Card: Image + name + price on hover reveal
   - 3D tilt on touch/hover
   - Staggered entrance animation on scroll

3. **Category Navigation** — Sticky pill tabs for quick filtering

4. **Customizer** — Large touch targets (min 48px), icon stepper, smooth transitions

5. **Contact** — Clean form, playful micro-interactions (input focus animation, button ripple)

---

## Animation Specifications

### Entrance Animations
- **Cards:** Stagger reveal, bouncy ease (elastic.out(1, 0.5))
- **Headings:** Fade up with slight scale

### Scroll Animations
- **Parallax:** Floating treats move at different speeds
- **ScrollReveal:** Elements fade in as they enter viewport

### Interaction Animations
- **Button press:** "Squish" effect (scale: 0.95 on press)
- **Card hover:** 3D tilt with perspective, shadow deepens
- **Pill nav:** Smooth underline slide

### Loading/Feedback
- **Form submit:** Ripple effect on button click
- **Success:** Confetti burst + checkmark animation

### Premium Touches
- Subtle paper grain texture overlay (CSS)
- Soft shadows for depth (not flat)
- Consistent 8px spacing grid

---

## Component Updates Needed

### Hero
- Richer gradient background (ivory to soft rose)
- Larger floating treat illustrations
- Animated CTA with squish effect on click

### Product Cards
- New color scheme (cream cards with soft shadow)
- Hover: image slight zoom, price reveal slide-up
- 3D tilt effect preserved and refined

### Category Pills
- New styling: rounded pill shape, sage background when active
- Smooth transition between active states

### Customizer
- Larger touch targets (min 56px height)
- Icon-based stepper (Base → Flavor → Frosting → Toppings → Preview)
- Step transitions: slide + fade

### Contact Form
- Warm ivory background
- Input focus: border color transition + floating label animation
- Submit button: ripple effect + success state

---

## Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| < 640px | Single column, horizontal product cards, reduced animations |
| 640-1024px | 2-column grid, medium animations |
| > 1024px | Full layout, all effects |

---

## Implementation Priority

1. **Colors & Typography** — Update tailwind.config.ts + globals.css
2. **Hero** — Refine colors, add squish effect to CTA
3. **Product Cards** — Update styling, improve hover animations
4. **Category Navigation** — Add sticky pill tabs
5. **Customizer** — Improve touch targets, add icons
6. **Contact** — Refine form styling, add micro-interactions
7. **Polish** — Add paper grain, refine shadows, tune animations

---

## Next Steps

1. Write implementation plan using writing-plans skill
2. Execute changes section by section
3. Test on mobile devices
4. Iterate based on feedback

---

## Design Approval

**Status:** Ready for Implementation Planning
**Date:** 2026-04-03