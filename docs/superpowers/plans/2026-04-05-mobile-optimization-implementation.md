# Mobile Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement all PWA and mobile optimization fixes identified in the audit

**Architecture:** Add PWA manifest, viewport meta tags, service worker, optimized fonts, and improved image configuration

**Tech Stack:** Next.js 14, PWA, next/font, manifest.json

---

## File Structure

| File | Action | Purpose |
|------|--------|---------|
| `app/layout.tsx` | Modify | Add viewport export, iOS meta tags |
| `next.config.js` | Modify | Configure image formats |
| `public/manifest.json` | Create | PWA manifest |
| `public/icons/icon-192.png` | Create | PWA icon 192x192 |
| `public/icons/icon-512.png` | Create | PWA icon 512x512 |
| `app/globals.css` | Modify | Remove Google Fonts @import |

---

## Task 1: Add Viewport Meta Tags and iOS Meta Tags

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Read current layout.tsx**

```tsx
// Current content to be updated
```

- [ ] **Step 2: Update layout.tsx with viewport export and iOS meta tags**

```tsx
import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#FFB6C1',
};

export const metadata: Metadata = {
  title: 'Faith Bakes | Handcrafted Joy in Every Bite',
  description: 'Discover our delicious handcrafted cupcakes, custom cakes, cookies, and brownies. Made with love, delivered with joy!',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Faith Bakes',
  },
  icons: {
    icon: '/icons/icon-192.png',
    apple: '/icons/icon-192.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Faith Bakes" />
      </head>
      <body className="paper-grain min-h-screen bg-cream text-chocolate antialiased overflow-x-hidden">
        {/* Custom Cursor */}
        <div className="custom-cursor hidden md:block" id="cursor" />

        {/* Ambient Particles Container */}
        <div id="particles-container" className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />

        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify the file compiles**

Run: `npm run build`
Expected: Build completes without errors

---

## Task 2: Create PWA Manifest

**Files:**
- Create: `public/manifest.json`

- [ ] **Step 1: Create the manifest.json file**

```json
{
  "name": "Faith Bakes | Handcrafted Joy",
  "short_name": "Faith Bakes",
  "description": "Discover delicious handcrafted cupcakes, custom cakes, cookies, and brownies. Made with love, delivered with joy!",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FFF8E7",
  "theme_color": "#FFB6C1",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ],
  "categories": ["food", "shopping"],
  "screenshots": [],
  "prefer_related_applications": false
}
```

---

## Task 3: Create PWA Icon Placeholders

**Files:**
- Create: `public/icons/icon-192.png`
- Create: `public/icons/icon-512.png`

- [ ] **Step 1: Create icons directory**

Run: `mkdir -p public/icons`

- [ ] **Step 2: Create SVG icons**

Create `public/icons/icon-192.svg`:
```svg
<svg width="192" height="192" viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="192" height="192" rx="40" fill="#FFB6C1"/>
  <circle cx="96" cy="85" r="50" fill="#FFF8E7"/>
  <circle cx="96" cy="85" r="35" fill="#FFD700"/>
  <rect x="86" y="120" width="20" height="35" rx="5" fill="#FFF8E7"/>
  <ellipse cx="96" cy="155" rx="40" ry="15" fill="#98D8C8"/>
</svg>
```

Create `public/icons/icon-512.svg`:
```svg
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="100" fill="#FFB6C1"/>
  <circle cx="256" cy="226" r="130" fill="#FFF8E7"/>
  <circle cx="256" cy="226" r="90" fill="#FFD700"/>
  <rect x="226" y="320" width="60" height="90" rx="15" fill="#FFF8E7"/>
  <ellipse cx="256" cy="410" rx="110" ry="40" fill="#98D8C8"/>
</svg>
```

Note: For production, convert SVG to optimized PNG using a tool like `sharp` or online converter.

---

## Task 4: Configure Next.js Image Optimization

**Files:**
- Modify: `next.config.js`

- [ ] **Step 1: Read current next.config.js**

```js
// Current content to be updated
```

- [ ] **Step 2: Update next.config.js with optimized image config**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

module.exports = nextConfig;
```

- [ ] **Step 3: Verify the config is valid**

Run: `npm run build`
Expected: Build completes successfully

---

## Task 5: Remove Google Fonts @import and Use next/font

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update layout.tsx with next/font imports**

```tsx
import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Nunito } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-playfair',
  display: 'swap',
});

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-nunito',
  display: 'swap',
});

// ... rest of layout.tsx
```

- [ ] **Step 2: Update globals.css to use CSS variables**

Replace the @import line (line 1) with:
```css
:root {
  --font-playfair: 'Playfair Display', serif;
  --font-nunito: 'Nunito', sans-serif;
  /* existing variables */
}

html, body {
  max-width: 100vw;
  overflow-x: hidden;
  font-family: var(--font-nunito);
  background-color: var(--color-cream);
  color: var(--color-chocolate);
}
```

- [ ] **Step 3: Update Tailwind config to use CSS variables**

Modify `tailwind.config.ts`:

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['var(--font-playfair)'],
        nunito: ['var(--font-nunito)'],
      },
      // ... existing theme config
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 4: Verify fonts load correctly**

Run: `npm run build && npm run dev`
Expected: Page loads with custom fonts, no FOIT

---

## Task 6: Add Service Worker for Offline Support

**Files:**
- Create: `public/sw.js`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create service worker file**

Create `public/sw.js`:

```js
const CACHE_NAME = 'faith-bakes-v1';
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        
        return response;
      });
    }).catch(() => {
      if (event.request.mode === 'navigate') {
        return caches.match('/');
      }
    })
  );
});
```

- [ ] **Step 2: Register service worker in layout.tsx**

Add inside `RootLayout`:

```tsx
'use client';

import { useEffect } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(
        (registration) => {
          console.log('SW registered:', registration.scope);
        },
        (error) => {
          console.log('SW registration failed:', error);
        }
      );
    }
  }, []);

  // ... rest of layout
}
```

Note: For production Next.js apps, consider using `next-pwa` package for better integration.

---

## Task 7: Final Verification

- [ ] **Step 1: Run Lighthouse PWA audit**

Run: Open Chrome DevTools → Lighthouse → Run PWA audit
Expected: All items pass

- [ ] **Step 2: Test offline mode**

Run: Enable airplane mode → Refresh page
Expected: Cached content loads

- [ ] **Step 3: Test add to home screen**

Run: On mobile, try "Add to Home Screen"
Expected: App icon appears with proper name

- [ ] **Step 4: Verify build passes**

Run: `npm run build`
Expected: Build completes successfully

- [ ] **Step 5: Run existing tests**

Run: `npm test`
Expected: All tests pass

---

## Commit Strategy

After each task completes successfully:

```bash
git add .
git commit -m "feat(mobile): add viewport meta tags and iOS PWA meta"
```

```bash
git add .
git commit -m "feat(pwa): add web app manifest"
```

```bash
git add .
git commit -m "feat(pwa): add PWA icons"
```

```bash
git add .
git commit -m "perf: configure optimized image formats"
```

```bash
git add .
git commit -m "perf: switch to next/font for optimized loading"
```

```bash
git add .
git commit -m "feat(pwa): add service worker for offline support"
```

```bash
git add .
git commit -m "docs: update mobile optimization audit"
```
