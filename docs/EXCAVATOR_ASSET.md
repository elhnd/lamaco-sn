# Equipment illustration edit — 8 September 2026

- Tool: built-in `image_gen` via the `imagegen` skill.
- Edit target: `src/assets/images/excavator.png` (kept unchanged).
- Selected output: `src/assets/images/excavator-isolated.png`.
- Purpose: remove the beige scene, grid and floor from the existing illustration.
- The tool's two transparent-output attempts returned opaque checkerboards and
  were rejected. The selected asset uses a white background with CSS multiply
  blending, not an alpha channel. It visually merges into the section background.
- Astro exports responsive AVIF/WebP derivatives. No generated branding or
  equipment specifications are introduced; this remains an illustrative visual.

## Final prompt

> Use case: background-extraction. Edit target Image 1. Isolate the exact existing
> yellow hydraulic excavator on a perfectly uniform PURE WHITE (#FFFFFF RGB
> 255,255,255) background. Remove the original beige backdrop, grid, floor and
> ground shadow entirely. Everything outside the machine MUST be pure white,
> including open gaps under the boom, between hoses and railings, and between
> tracks. Preserve exact machine identity, pose, three-quarter angle, proportions,
> worn yellow paint and dark tracks, realistic textures and natural cabin glazing.
> Do not change machine design. No text, brand, checkerboard, pattern, gradient,
> floor, vignette, border, or shadow. Keep entire excavator within canvas, modest
> padding. This image will use CSS multiply blending onto a warm neutral website
> section.
