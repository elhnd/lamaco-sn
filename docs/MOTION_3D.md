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
