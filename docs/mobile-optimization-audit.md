# Mobile Optimization Audit - Faith Bakes

**Date:** April 5, 2026  
**Project:** faith-bakes (Next.js bakery website)  
**Status:** ALL FIXES IMPLEMENTED ✅

---

## 1. Already Implemented Well

### Touch Optimization
- [x] Touch device detection (`ontouchstart`, `navigator.maxTouchPoints`)
- [x] GSAP animations gracefully disabled on touch devices
- [x] `touch-action: manipulation` CSS class
- [x] `-webkit-tap-highlight-color: transparent`
- [x] `active:scale-95` on buttons for tactile feedback
- [x] Particle count reduced on mobile (2-3 vs 5)
- [x] Confetti count reduced on mobile (25 vs 50)

### Responsive Design
- [x] Tailwind responsive breakpoints (sm:, md:, lg:) throughout
- [x] Custom cursor hidden on touch devices
- [x] Mobile scrollbar styling (thinner, 4px vs 10px)
- [x] Safe area insets for notched devices
- [x] Proper `overflow-x: hidden` preventing horizontal scroll

### Performance on Mobile
- [x] Gradient mesh animation disabled on mobile (`max-width: 639px`)
- [x] Morph blob animation disabled on mobile
- [x] `prefers-reduced-motion` respected

### Accessibility
- [x] Keyboard navigation in ProductModal
- [x] Focus trapping in modal
- [x] ARIA labels on interactive elements
- [x] `scroll-behavior: smooth`

### Images
- [x] Uses `next/image` component
- [x] Proper `sizes` attribute: `"(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"`

---

## 2. Issues Found - Prioritized

### P0 - Critical (Must Fix for PWA)

#### 1. Missing Web App Manifest
**Impact:** Cannot add site to home screen, no install prompt  
**Files:** Nonexistent  
**Fix:** Create `public/manifest.json`

#### 2. Missing Theme Color Meta Tag
**Impact:** Browser chrome won't match brand colors on mobile  
**Files:** `app/layout.tsx`  
**Fix:** Add viewport meta tags with `theme-color` and `viewport-fit=cover`

#### 3. Missing iOS Meta Tags
**Impact:** iOS won't show proper icon/name when added to home screen  
**Files:** `app/layout.tsx`  
**Fix:** Add Apple touch icon and mobile web app meta tags

---

### P1 - Important (Should Fix)

#### 4. No Service Worker
**Impact:** No offline support, slower repeat visits  
**Files:** Nonexistent  
**Fix:** Add Next.js PWA package or custom service worker

#### 5. Missing PWA Icons
**Impact:** Cannot generate proper home screen icons  
**Files:** `public/`  
**Fix:** Add 192x192 and 512x512 PNG icons

#### 6. Image Optimization Config
**Impact:** Suboptimal image formats, no lazy loading hints  
**Files:** `next.config.js`  
**Fix:** Configure image formats and device sizes

#### 7. Font Loading Strategy
**Impact:** Potential FOIT (Flash of Invisible Text)  
**Files:** `app/globals.css`, `app/layout.tsx`  
**Fix:** Use `next/font` or add `font-display: swap`

---

### P2 - Nice to Have

#### 8. GSAP ScrollTrigger on Mobile
**Observation:** Scroll animations still use ScrollTrigger on desktop scroll. Well-handled for touch.  
**Current State:** Already graceful - disabled on touch devices

#### 9. Missing Loading Skeletons
**Impact:** No loading state for images  
**Files:** Components using images  
**Fix:** Add skeleton placeholders during image load

#### 10. Viewport Units in Hero
**Observation:** `min-h-screen` works well, but some fixed sizes like `h-80` on cards could use responsive values  
**Current State:** Generally well-handled

---

## 3. Quick Wins (Easy Fixes, High Impact)

| Priority | Fix | Effort | Impact |
|----------|-----|--------|--------|
| 1 | Add viewport meta tags | 5 min | High |
| 2 | Add manifest.json | 10 min | High |
| 3 | Configure next/image formats | 5 min | Medium |
| 4 | Add Apple touch icons meta | 5 min | Medium |
| 5 | Switch to next/font | 15 min | Medium |

---

## 4. Detailed Recommendations

### 4.1 Viewport Meta Tags (layout.tsx)

Add to `app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  // ... existing
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#FFB6C1',
};
```

And add iOS meta tags in `<head>`:
```tsx
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<meta name="apple-mobile-web-app-title" content="Faith Bakes" />
<link rel="apple-touch-icon" href="/icons/icon-192.png" />
```

### 4.2 Web App Manifest (public/manifest.json)

```json
{
  "name": "Faith Bakes | Handcrafted Joy",
  "short_name": "Faith Bakes",
  "description": "Discover delicious handcrafted cupcakes, custom cakes, cookies, and brownies",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FFF8E7",
  "theme_color": "#FFB6C1",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

### 4.3 Next.js Image Config

```js
const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};
```

### 4.4 Font Optimization

Replace `@import` in `globals.css` with `next/font`:

```tsx
// app/layout.tsx
import { Playfair_Display, Nunito } from 'next/font/google';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
});

const nunito = Nunito({ 
  subsets: ['latin'],
  display: 'swap',
});
```

### 4.5 PWA Icons

Generate these icon sizes:
- `public/icons/icon-192.png` (192x192)
- `public/icons/icon-512.png` (512x512)
- Also create maskable versions

---

## 5. Verification Plan

After implementing fixes, verify:

1. **Lighthouse PWA Score** - Should reach 100
2. **Chrome DevTools** - Audit tab → PWA section
3. **Real device testing** - iOS Safari, Android Chrome
4. **Offline testing** - Enable airplane mode, verify cached content loads
5. **Add to Home Screen** - Test on iOS and Android

### Key Metrics to Monitor:
- **LCP** (Largest Contentful Paint) - Target: < 2.5s
- **FID** (First Input Delay) - Target: < 100ms  
- **CLS** (Cumulative Layout Shift) - Target: < 0.1

---

## 6. Implementation Order

1. **Phase 1:** Add viewport meta tags (5 min) ✅
2. **Phase 2:** Create manifest.json + icons (15 min) ✅
3. **Phase 3:** Configure next/image (5 min) ✅
4. **Phase 4:** Optimize fonts with next/font (15 min) ✅
5. **Phase 5:** Add service worker for offline (30 min) ✅

---

## 7. Implementation Summary (April 5, 2026)

All P0 and P1 fixes have been implemented:

| Fix | Status | Files Changed |
|-----|--------|---------------|
| Viewport meta tags | ✅ | `app/layout.tsx` |
| iOS meta tags | ✅ | `app/layout.tsx` |
| PWA manifest | ✅ | `public/manifest.json` |
| PWA icons (SVG) | ✅ | `public/icons/` |
| Image optimization | ✅ | `next.config.js` |
| Font optimization | ✅ | `app/layout.tsx`, `app/globals.css`, `tailwind.config.ts` |
| Service worker | ✅ | `public/sw.js`, `app/components/ServiceWorkerRegistration.tsx` |

---

## 8. Files to Modify

| File | Changes |
|------|---------|
| `app/layout.tsx` | Add viewport export, iOS meta tags |
| `next.config.js` | Add image formats config |
| `public/manifest.json` | **CREATE** - PWA manifest |
| `public/icons/` | **CREATE** - Icon files |
| `app/globals.css` | Remove @import, rely on next/font |

---

## 9. Not Applicable / Already Handled

- **Lazy loading images**: Already handled by `next/image`
- **Responsive images**: Already configured with `sizes` attribute
- **Touch gestures**: Already have touch detection
- **Mobile navigation**: N/A - single page site
- **Form UX**: Already optimized for mobile (large inputs, clear labels)
- **Performance budgets**: Recommend adding after initial audit fixes
