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

### Home materials section

- Give section 01 a wider editorial grid (94vw, capped at 1560px) and balanced
  68px vertical spacing on desktop. Center the introduction alongside taller
  330–380px image cards; use 290px cards in the intermediate two-column layout.
- Keep all four families and show their descriptions without requiring hover.
  Enlarge the introduction copy and maintain a 48px catalogue button.
- Below 960px, retain the shared page margins and native horizontal card rail;
  do not widen the document or change the hero's sticky behavior.

### Home equipment section
- Use `src/assets/images/excavator-isolated.png`, a background-cleaned derivative
  of the existing illustration, not documentary fleet photography. Keep the original.
- The generated file has a white background, not an alpha channel. CSS multiply
  blending integrates it into the warm section background without a rectangular
  photo frame; do not use a box/drop shadow around the image. A soft ground shadow
  anchors the machine. Keep the descriptive illustration alt text.
- Keep the section background plain: no grid, truck drawings or animated backdrop.

## Components

Keep a small set: Header, Footer, Button, SectionIntro, MediaCard, MaterialCard, EquipmentCard, Metric/Fact only when factual.
Cards are content containers, not the default layout for every section.

### LAMACO directional marks

- `public/brand/terminal.svg` extracts the lower zigzag terminal from the supplied
  `Logo/SVG/inversé.svg`; the original logo files and wordmark remain unchanged.
- Navigation/action arrows use `public/brand/arrow.svg`: a logo-inspired zigzag
  with a distinct arrowhead on the rising front. Inherit the existing color and
  preserve original SVG boxes (18px for Button, 20px for material-card actions).
  Non-directional material-card marks retain the exact terminal.
- `BrandArrow.astro` and `lib/brand-arrow.ts` share markup for static and dynamic
  controls. A hidden original glyph retains its exact font metrics; the decorative
  SVG overlays that space. Preserve text grouping inside flex links and buttons.
- Decorative rules use shallow inverted terminals, including navigation indicators,
  section-number accents, page eyebrows, hero rails and highlighted callouts.
  Keep original lengths, layout boxes and spacing; allow 4–7px of decorative ink
  around formerly 1px rules. These marks are static and non-interactive.
- Keep structural card/form borders, progress tracks, functional zoom/FAQ plus-minus
  symbols, the open menu's close symbol and business icons recognizable.

### Interior-page hero

- Equipment, contact, quote and advice pages use `PageHero.astro`, matching the Materials
  catalogue banner: full-width image fading into the dark background, breadcrumb,
  amber eyebrow and oversized white H1 with an amber full stop.
- Reuse existing quarry/sand illustrations, optimized with Astro Picture. No new
  animation or image dependency. Maintain one H1 per page; content headings are H2.
- The banner owns navigation clearance; forms/map follow beneath it without a
  second top offset. On mobile, keep text readable over the subdued full-width image.

### Equipment catalogue

- Match the Materials page's cinematic banner, dark catalogue, amber accents and
  brand-terminal arrows. Two generous cards reflect the actual size of the fleet.
- Use native anchor shortcuts and expandable details, not a filter for just two
  machines. Show usage tags, technical information status and a prefilled quote CTA.
- Reuse the existing excavator illustration on a warm multiply-blended surface
  and the quarry truck illustration. Label imagery as illustrative, never actual
  fleet photography. One-column cards on mobile; no added animation or dependency.

### Projects page

- `/realisations/` reprend le bandeau des pages intérieures et les marques du logo,
  avec une alternance de surfaces sombres et sable clair, de grands visuels lumineux
  et des reportages alternant image et récit. Aucun carrousel automatique.
- Chaque reportage propose une lecture courte puis des détails natifs : besoin,
  intervention, résultat et photos complémentaires. Les numéros servent uniquement
  de repères de lecture, jamais de statistiques de réalisations.
- Les scénarios fictifs autorisés sont signalés au-dessus de la galerie, sur chaque
  couverture et dans les légendes. Ne pas ajouter de faux avis ou de logos clients.
- Orienter vers les matériaux, les engins, le conseil et le devis avec des liens
  explicites. Mobile : une colonne, tous les contenus accessibles sans animation.

### Request pages

- Dark editorial introduction + warm paper-coloured « fiche chantier ». Preserve
  the industrial typography, amber accent, sharp corners and generous touch targets.
- Distinct content for quote vs advice, visual radio choices, three-step progress,
  a readable recap and an explicit « ready to share, not sent » state.
- The small angled label and material illustration add character without a new
  decorative animation. Mobile uses a single column; reduced motion removes transitions.
- Process icons are distinct: clipboard (need), dialogue (advice), material packages
  (preparation), excavator (loading), truck (delivery). Step numbers use opaque white.

### Contact page

- Follow the supplied three-column reference: contact details, dark message fields,
  then a tall location/visit panel. Amber line icons, white headings, restrained rules.
- The location panel follows the reference with a dark real street map, amber pin
  and LAMACO label. Only OpenStreetMap raster tiles receive the dark warm filter;
  attribution and controls stay unfiltered and readable. No invented street address.
- Include zoom/recenter controls and a prominent Google Maps directions link.
- Below 1100px the map panel spans the page; below 640px all columns stack and
  the map is 420px high (490px on larger screens), with reserved space to avoid shifts.

## Responsive

- The native page scrollbar is thin, with an amber `--c-accent` thumb on `--c-bg`.
  Use standard scrollbar properties and an 8px WebKit fallback, not a custom overlay.
  OS/browser settings can control final thickness/visibility; forced-colors mode
  restores system colors and sizing.

Design mobile intentionally:
- simplified composition
- readable type
- touch targets >= 44px
- no hover-only information
- 3D/motion may downgrade per `PERFORMANCE.md`
