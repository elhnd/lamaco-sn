# Motion & 3D

## Rule
Motion must explain, transition or reinforce the industrial/material story. If removing an effect changes nothing, remove it.

## Tools
- CSS: hover/simple state transitions
- GSAP + ScrollTrigger: timelines, pinning, scrub, coordinated reveals
- Three.js: machines, GPU particles, real 3D only
Do not add another motion library.

## Hero sand
Current direction (8 September 2026): a sand wake stirred by mouse movement,
inspired by the fluid cursor response at https://www.wintech.sn/. Grains disperse,
drift with inertia and settle; a restrained dust layer accompanies the movement.
There is no automatic falling sand, letter filling or accumulation on the wordmark.

- `src/lib/motion/hero-sand.ts` loads the effect after page load and the first
  mouse interaction, only on desktop with fine pointer, hover, no reduced motion
  and no data-saving preference.
- `src/lib/three/sand-cursor.ts` uses a bounded WebGL point buffer (7,200 slots,
  one draw call). The GPU evaluates drag, eddies, gravity and fading. No dependency
  or raster asset is needed; the shader draws grains and low-opacity dust.
- The transparent, non-interactive canvas stays behind the hero text and links.
  The logo remains unchanged and HTML is immediately available.
- Stop the animation after the last grains fade (at most 2.8 seconds of simulated
  time). Clear and pause offscreen/on hidden tabs; dispose on preference changes
  and page teardown. Cap pixel ratio at 1.5.
- Mobile, reduced motion, save-data and unavailable/lost WebGL use the static hero.

## Home section parallax

- Current direction: only the hero remains sticky behind the content. In `.home-stack`,
  `lib/motion/home.ts` keeps materials, equipment, process and about in normal flow,
  on a shared layer above the hero. They do not stick or overlap each other.
  A soft shadow marks only the leading edge of the materials section.
- Start once the document is ready, without waiting for every image to finish;
  delayed image responses must not prevent the section effect from appearing.
- Keep the native document scroll position, with no artificial spacers, snapping,
  scaled text or custom render loop. GSAP contexts own setup/cleanup; ScrollTrigger
  continues to handle the existing small content reveals only.
- Desktop and touch/mobile use the same composition. The hero's sticky top is capped
  at zero or viewport height minus hero height so tall heroes remain fully readable.
  ResizeObserver recalculates its offset for resizing and text zoom. The fixed
  navigation stays above the stack; the footer follows outside its containment.
- Keyboard focus returns to the hero even when covered; other sections and fragment
  links use native browser scrolling without interception. Card hover,
  the original hero image composition and the independent sand cursor are preserved.
- Reduced motion and save-data use normal document flow, including when toggled live.
  Hidden tabs/page teardown revert contexts; returning recreates them at the current
  position. Without JS or if optional imports fail, all content remains in normal flow.

## Desktop wheel response

- `lib/motion/gentle-scroll.ts`, loaded by BaseLayout, reduces vertical wheel distance
  to 65% and smooths it with a short, frame-rate-independent 90ms response. This is
  explicitly requested; it does not transform the document or replace its scrollbar.
- Fine-pointer/hover devices only. Touch, reduced motion and save-data remain native.
  Preserve horizontal gestures, Ctrl/Meta zoom, Shift-wheel, nested scroll containers,
  form controls and dialogs. Normalize pixel/line/page deltas and clamp at page ends.
- Keyboard, pointer-down, external scroll/anchors, resizing and hidden tabs interrupt
  pending motion. A single requestAnimationFrame loop runs only during wheel settling;
  no permanent ticker, new dependency or second scroll container.

## Réalisations : mouvement éditorial

- `lib/motion/projects.ts` charge GSAP/ScrollTrigger à l’approche du premier
  contenu animé. Le H1 et le bandeau restent statiques pour préserver le LCP.
- Apparitions uniques : translation de 14px sur mobile ou 24px sur ordinateur,
  opacité de 0,85 à 1, 750ms et amortissement progressif. Aucun contenu masqué en CSS.
- Ordinateur avec pointeur fin uniquement : les photos glissent de -2% à +2%
  dans leur cadre, avec un léger agrandissement anti-bord vide et un scrub de 0,7s.
  Aucun pinning, défilement imposé, vidéo automatique ou animation permanente.
- Réduction des animations, économie de données, onglet masqué et fin de page
  révoquent les contextes. Les préférences sont suivies en direct ; le retour
  depuis le cache de navigation est pris en charge. Les détails natifs restent
  utilisables sans JS ; leur ouverture recalcule les positions des effets.

## Equipment 3D
Use 3D only where it adds product understanding:
- slow idle rotation
- drag/orbit when useful
- scroll-driven camera changes sparingly
- optional hotspots only with real specs/content
Do not autoplay complex machinery simulations in V1.

## Assets
- Models: GLB/glTF
- Prefer Meshopt; Draco only when it materially wins
- Textures: KTX2/Basis where practical
- Reuse geometry/materials; avoid excessive draw calls
- No model is accepted unoptimized

## Runtime
- Lazy-load scenes when near viewport.
- Pause rendering when offscreen/hidden.
- Cap pixel ratio (`<= 1.5` default).
- Avoid per-frame allocations.
- Use one animation loop per active scene.
- Dispose textures/geometries/materials on teardown.

## Accessibility / fallback
`prefers-reduced-motion: reduce` disables scroll-scrub spectacle and nonessential particles.
Weak/unsupported devices receive a static image or light CSS motion.
Core navigation/content never depends on WebGL/WebGPU.
