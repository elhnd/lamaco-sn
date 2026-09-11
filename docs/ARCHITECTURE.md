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
  le catalogue via la configuration Astro. `public/.htaccess` ajoute les HTTP 301
  sur LWS/Apache ; la redirection HTML Astro reste le repli sur un serveur statique.
- Les sources éditoriales sont décrites dans `docs/PRODUCT.md` et
  `docs/MATERIALS_RESEARCH.md` ; l’UI rend les données sans dupliquer les fiches.

### Equipment catalogue

- `src/pages/engins.astro` réutilise `PageHero`, `Button`, `BrandArrow` et les icônes
  existantes ; `src/styles/equipment.css` reste limité à cette page.
- `src/data/equipment.ts` alimente l’accueil, les fiches du parc et le sélecteur
  du devis. Les informations complémentaires se déplient avec `details/summary`,
  accessibles sans JavaScript. Les raccourcis sont des ancres natives.
- Le préremplissage `?engin=slug` accepte uniquement les slugs exposés par les
  options du sélecteur. Il choisit le besoin « engins » sans modifier les valeurs
  existantes du récapitulatif. Un engin reconnu a priorité sur un matériau si
  les deux paramètres sont présents ; les valeurs inconnues sont ignorées.

## Rendering

### Réalisations

- `src/pages/realisations.astro` compose le bandeau, les reportages, l’approche
  éditoriale et les appels à l’action ; styles dans `src/styles/projects.css`.
- `src/data/projects.ts` contient le modèle typé et les futurs projets réels,
  filtrés par validation et autorisation de publication (`approved`). Les exemples
  fictifs demandés par l’utilisateur vivent séparément dans `project-demos.ts`.
- La galerie choisit les projets approuvés en priorité, sinon les démonstrations
  explicitement étiquetées ; sans les deux, un état « reportages à venir » reste utile.
- `ProjectStory.astro` affiche couverture, récit et galerie complémentaire avec
  `details/summary`. Aucune dépendance JavaScript pour lire les récits ou naviguer.
- `lib/motion/projects.ts` améliore uniquement cette page. Aucun changement du
  comportement sticky de l’accueil ou des autres pages.

### Principes

- Default: Astro/static HTML.
- Vanilla TypeScript for small interactions.
- Three.js only inside isolated scene modules.
- GSAP timelines live near the section they control or in `lib/motion`.
- No React in V1 unless state/interaction complexity clearly justifies it.

### Request preparation pages

- `src/pages/demande-de-devis.astro` and `demande-de-conseil.astro` render the shared
  `src/sections/RequestExperience.astro`; content lives in `src/data/requests.ts`.
- `src/lib/requests.ts` enhances three fieldsets, validates each step (including
  revisited steps), builds a plain-text recap, and exposes clipboard/SMS actions.
- Progressive enhancement: form hidden and gate disabled until handlers are ready;
  without JS, show real telephone links. No form POST endpoint or automatic sending.
- Personal data stays in DOM memory; no URL persistence, localStorage or analytics.
  Query prefill only accepts catalogue options. Use text/value assignments for user
  content, never interpolate it as HTML. SMS recipient comes from `company.ts`.
- Global quote links, material advice links, footer and mobile menu point to these
  pages. Material-detail quote links carry the selected reference.

### Contact

- `src/pages/contact.astro` provides the dark three-column contact page;
  `src/data/contact.ts` holds subjects and pending verified contact information.
- `src/lib/contact.ts` progressively enables a single-screen message form, validates
  fields and builds a readonly copy/SMS preview. No backend, form POST or storage.
- Without JavaScript, the form stays hidden/disabled and confirmed phone links work.
- Shared navigation points to `/contact/`; the footer's existing `#contact` anchor
  remains available for older links.
- `ContactMap.astro` / `lib/contact-map.ts` render a lightweight 2D raster map at
  the coordinates extracted from the supplied Street View link (`contactLocation`).
  Native TS handles Web Mercator positioning, zoom, mouse/pen drag, keyboard pan
  and recentering. Touch keeps normal page scrolling. No SDK, dependency or API key.
- OpenStreetMap tiles load only when visible, only for the current viewport;
  preserve browser caching and origin referrers, with visible OSM attribution.
  Tile service is external/best-effort. Without JS or if tiles fail, Google Maps
  search/directions links remain usable; the message form is independent.
- Provider requirements: https://operations.osmfoundation.org/policies/tiles/.
  Google links use https://developers.google.com/maps/documentation/urls/get-started.

## Boundaries

- Astro components: structure/content.
- Tailwind/scoped CSS: layout + visual states.
- GSAP: coordinated/scroll motion.
- Three.js: actual 3D/GPU particles.
Do not use Three.js for effects CSS/GSAP can do cheaper.

## Deployment
- Branche `v2` : origine `https://v2.lamaco-sn.com`. SEO et protections :
  `SEO.md`, `SECURITY.md`. `V2_RELEASE.md` décrit la livraison sur le sous-domaine.
- `npm run package:dist` valide le build présent et crée le ZIP dans `artifacts/`.
  L'archive contient directement les fichiers à extraire à la racine du sous-domaine.
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
