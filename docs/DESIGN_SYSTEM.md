# Design System

## Direction
Premium industrial / quarry aesthetic: strong, cinematic, technical. Dark surfaces + warm LAMACO accent + large editorial typography. Avoid generic SaaS cards, neon tech styling, excessive glassmorphism and decorative gradients.

## Tokens
Use CSS variables as the single source of truth.
```css
--c-bg: #0a0a09;
--c-surface: #121210;
--c-text: #f3f0e8;
--c-muted: #a8a39a;
--c-accent: #e6aa18; /* replace with exact sampled logo color if available */
--c-line: rgba(255,255,255,.14);
--c-light-bg: #eeeae1;
--c-dark-text: #11110f;
```
Do not scatter raw colors through components.

## Typography
- Display/headings: condensed, heavy industrial face; default candidate `Barlow Condensed`.
- Body/UI: `Inter`.
- Self-host only required weights in WOFF2 when assets are finalized.
- Headings may be uppercase; body copy stays highly readable.

## Layout
- Large imagery, strong whitespace, clear grid.
- Desktop can be cinematic; mobile becomes simpler rather than merely squeezed.
- Use section numbers (`01`, `02`, …) sparingly as navigation rhythm.
- Primary CTA is accent-filled; secondary CTA is restrained outline/text.
- Corners mostly sharp/small radius. Avoid pill-everything UI.

## Imagery
Prefer real LAMACO/site/material/equipment photography when available.
Never modify the LAMACO logo geometry. Never generate fake “LAMACO-branded” equipment and present it as documentary photography.

## Components
Keep a small set: Header, Footer, Button, SectionIntro, MediaCard, MaterialCard, EquipmentCard, Metric/Fact only when factual.
Cards are content containers, not the default layout for every section.

## Responsive
Design mobile intentionally:
- simplified composition
- readable type
- touch targets >= 44px
- no hover-only information
- 3D/motion may downgrade per `PERFORMANCE.md`
