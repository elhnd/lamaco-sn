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

### Catalogue des matériaux

- `src/data/materials.ts` contient les quatre familles, les douze références, les
  contenus des fiches et les liens vers leurs sources techniques.
- `materials` alimente les cartes de l’accueil et les filtres par famille.
- `materialCatalogue` contient uniquement les références commercialisées ;
  `materialDetails` y ajoute les présentations de famille pour conserver leurs URL.
- `src/pages/materiaux/index.astro` affiche les références. Le filtre utilise
  `?famille=basalte|calcaire|silex|sable`, conserve l’historique et reste facultatif :
  sans JavaScript, toutes les fiches sont accessibles.
- `src/pages/materiaux/[slug].astro` génère statiquement les fiches et pages de
  famille. Les calibres ont des slugs comme `silex-8-16` ; les deux sables utilisent
  `sable-dakar` et `sable-tasseb`.
- Les anciens chemins `/materiaux/beton` et `/materiaux/gravier` redirigent vers
  le catalogue via la configuration Astro. En hébergement statique, ces pages
  utilisent la redirection HTML générée par Astro, pas une règle serveur HTTP 301.
- Les sources éditoriales sont décrites dans `docs/PRODUCT.md` et
  `docs/MATERIALS_RESEARCH.md` ; l’UI rend les données sans dupliquer les fiches.

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

### Images absentes en développement local

Si les requêtes `/_image` renvoient une erreur 500 `MissingSharp`, vérifier d’abord
`npm ls sharp` et le chargement du module avec
`node --input-type=module -e 'await import("sharp")'`.
Si ces contrôles réussissent, redémarrer le serveur avec `npm run dev -- stop`,
puis `npm run dev -- --host 127.0.0.1`. Un serveur local peut conserver un état de
chargement invalide alors que Sharp est bien installé ; ce cas a été reproduit
et corrigé par redémarrage. Recharger ensuite la page dans le navigateur.

Pour valider, vérifier les réponses HTTP **et** `naturalWidth > 0` des images,
y compris après défilement jusqu’aux cartes associées. Une compilation réussie
ou une page HTML répondant 200 ne suffit pas à vérifier le service d’images local.

## Future compatibility
Backend/API/CMS may replace static `src/data` later. Keep rendering components independent from data origin so this migration does not require a UI rewrite.
