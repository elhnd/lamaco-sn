# Performance Budget

Performance is a product requirement, not final polish.

## Targets
Field-oriented goals:
- LCP <= 2.5s
- INP <= 200ms
- CLS <= 0.10
Test mobile first on a mid-range device/network profile.

## Initial-load budgets
Targets, not excuses to fill:
- Initial JS excluding lazy 3D: <= 120 KB gzip
- Initial CSS: <= 80 KB gzip
- Above-fold transferred assets: aim <= 900 KB
- LCP image: aim <= 250 KB
- Hero media must have a lightweight mobile variant
- Each machine GLB: target <= 3 MB, hard review above 6 MB

## Loading
- Static HTML/content first.
- Lazy-load below-fold images and all noncritical 3D.
- AVIF/WebP for photos; explicit width/height.
- Responsive `srcset`/sizes.
- Preload only true critical assets.
- No autoplay background video on constrained mobile.
- Fonts: self-host WOFF2, minimal weights/subsets, `font-display: swap`.

## 3D
- Never include Three.js in the initial bundle unless the hero truly requires it.
- Even for the hero, HTML/LCP must render independently.
- Use compressed models/textures and device-aware quality.
- Stop render loops when invisible.

## JavaScript
- Prefer Astro/static HTML over hydration.
- Prefer platform APIs over dependencies.
- New dependency requires a clear user-facing benefit and bundle-cost check.
- No duplicate utility/motion libraries.

## Validation before merge
For meaningful UI/perf changes:
1. production build
2. inspect bundle/asset sizes
3. test desktop + mobile layout
4. test with JS delayed/3D unavailable for core usability
5. check console errors
Do not trade a major budget regression for decorative polish without explicit approval.
