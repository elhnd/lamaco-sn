# Architecture

## Principle
Static-first. Astro renders the site; JavaScript is added only where interaction requires it. LWS serves the generated files, not a long-running Node app.

## Suggested structure
```text
src/
  pages/
  layouts/
  components/        # reusable UI primitives
  sections/          # page-level sections
  data/              # business/content data
  lib/
    motion/          # GSAP helpers
    three/           # Three.js scenes/loaders
  styles/
public/
  images/
  models/
  textures/
```

## Data
Keep business facts in typed modules, e.g.:
`src/data/company.ts`, `materials.ts`, `equipment.ts`, `services.ts`, `projects.ts`.
UI components must not become business-data stores.

## Rendering
- Default: Astro/static HTML.
- Vanilla TypeScript for small interactions.
- Three.js only inside isolated scene modules.
- GSAP timelines live near the section they control or in `lib/motion`.
- No React in V1 unless state/interaction complexity clearly justifies it.

## Boundaries
- Astro components: structure/content.
- Tailwind/scoped CSS: layout + visual states.
- GSAP: coordinated/scroll motion.
- Three.js: actual 3D/GPU particles.
Do not use Three.js for effects CSS/GSAP can do cheaper.

## Deployment
- Build locally/CI with the repo package manager.
- Output must be static and uploadable to LWS `public_html`.
- No runtime Node dependency on LWS.
- Keep paths deployment-safe; assets use public/root URLs consistently.

## Future compatibility
Backend/API/CMS may replace static `src/data` later. Keep rendering components independent from data origin so this migration does not require a UI rewrite.
