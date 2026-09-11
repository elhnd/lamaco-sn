# LAMACO Web V1 — Agent Rules

## Goal
Build a premium, very fast static website for LAMACO (Senegal construction/BTP). V1 focuses on real content, advanced motion and selective 3D.

## Current stack
- Astro + TypeScript strict
- Tailwind CSS
- GSAP + ScrollTrigger
- Three.js
- Static build deployed to LWS shared hosting
- No React unless a concrete need appears

## V1 scope
Pages: Home, Materials, Equipment, Services, Projects, About, Contact.
Use real LAMACO data only. 3D is limited to high-value scenes (hero/equipment), never decorative everywhere.

## Out of scope
Backend, DB, auth, APIs, transactional email, CMS, analytics stack, simulator, CRAG, advanced SEO/GEO. Keep semantic HTML and accessible markup now so later SEO is easy.

## Source-of-truth map
Read only the docs needed for the task:
- Business/content/pages → `docs/PRODUCT.md`
- Code structure/deployment → `docs/ARCHITECTURE.md`
- Visual/UI decisions → `docs/DESIGN_SYSTEM.md`
- GSAP/Three.js behavior → `docs/MOTION_3D.md`
- Loading/budgets/mobile → `docs/PERFORMANCE.md`
- SEO → `SEO.md`

Do not read every doc by default. Do not duplicate rules between docs.

## Hard rules
- Never invent LAMACO prices, stats, projects, machine specs, addresses or claims.
- Keep business data outside UI components.
- Performance beats visual excess.
- Mobile must remain fully usable without 3D.
- Prefer existing patterns; do not redesign unrelated code.
- Add dependencies only when the current stack cannot solve the task cleanly.
- Keep components focused; avoid premature abstractions.
- No secrets in repo.

## Workflow
1. Inspect relevant code + only relevant doc(s).
2. Implement the smallest complete change.
3. Test responsive behavior and reduced-motion fallback when motion/3D changes.
4. Run available type/check/build commands.
5. Report changed files, validation, and unresolved issues briefly.
