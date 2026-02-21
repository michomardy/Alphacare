# Performance Optimization Guide

This document outlines the performance optimizations implemented in the AlphaCare Physiotherapy website.

## 1. Image Optimization
- **Critical Images**: The Hero section image is loaded with `fetchPriority="high"` and `loading="eager"` to minimize Largest Contentful Paint (LCP).
- **Lazy Loading**: All below-the-fold images use `loading="lazy"` and `decoding="async"` to reduce initial bundle size and main thread blocking.
- **Dimensions**: Explicit `width` and `height` attributes are added to images to prevent Cumulative Layout Shift (CLS).

## 2. Code Splitting & Bundle Optimization
- **Route-Based Splitting**: `React.lazy` and `Suspense` are used for all non-critical routes (About, Services, Blog, etc.).
- **Critical Path**: The `Home` page is imported directly (eagerly) in `App.jsx` to ensure the landing page renders immediately without a secondary round-trip for JS chunks.
- **Tree Shaking**: Verified use of ES modules (e.g., `lucide-react`) to ensure unused icons are shaken out of the final bundle.

## 3. Component Optimization
- **Memoization**: `Header`, `Footer`, and `HeroImage` components are wrapped in `React.memo` to prevent unnecessary re-renders when parent state changes.
- **Containment**: CSS `contain: content` and `content-visibility: auto` are applied to large sections (Footer, Hero) to inform the browser it can skip rendering work for off-screen content.

## 4. Animation Performance
- **Reduced Motion**: `framer-motion`'s `useReducedMotion` hook is implemented to disable or simplify animations for users who prefer reduced motion (saving battery and respecting accessibility).
- **Will-Change**: The `will-change-transform` class is applied to animated elements to hint the browser to promote them to their own compositor layers.

## 5. Web Vitals & Monitoring
- **Core Web Vitals**: The `web-vitals` library is integrated into `Analytics.jsx`.
- **Logging**: In development, metrics (LCP, CLS, FID) are logged to the console for real-time debugging.

## 6. Resource Hints (index.html)
- **Preconnect**: Added for Image CDNs and Google Analytics.
- **Preload**: Critical CSS and the Hero Image are preloaded.
- **Prefetch**: Likely next pages (Services, About) are prefetched during idle time.

## Recommendations for Future
1. **Server-Side Rendering (SSR)**: If SEO becomes even more critical, consider migrating to Next.js or Remix.
2. **Image CDN**: Ensure the Hostinger CDN is configured to serve WebP/AVIF formats automatically based on the `Accept` header.
3. **Font optimization**: Self-host the Inter font instead of using Google Fonts to reduce DNS lookups, or use `font-display: swap`.