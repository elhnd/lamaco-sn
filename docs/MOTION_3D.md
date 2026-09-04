# Motion & 3D

## Rule
Motion must explain, transition or reinforce the industrial/material story. If removing an effect changes nothing, remove it.

## Tools
- CSS: hover/simple state transitions
- GSAP + ScrollTrigger: timelines, pinning, scrub, coordinated reveals
- Three.js: machines, GPU particles, real 3D only
Do not add another motion library.

## Hero sand
Signature effect: sand falls from above and participates in the scroll transition.
Implementation:
- GPU particles (`Points`/buffer geometry + shader or equivalent), not DOM particles.
- Hero text/content exists as HTML immediately.
- Start 3D after critical content; scroll progress may control emission/camera.
- Do not make LCP depend on the scene.
- Provide static/fewer-particle fallback.

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
