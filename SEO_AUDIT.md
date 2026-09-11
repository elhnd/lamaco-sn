# Audit SEO/GEO — 10 septembre 2026

> Rapport historique du premier audit. Pour la livraison actuelle sur
> `https://v2.lamaco-sn.com`, consulter `V2_RELEASE.md` et `SEO.md` : la page
> À propos est désormais présente, soit 24 pages de contenu et 23 URL indexables.

## Audit initial

| Impact | État initial | Traitement |
| --- | --- | --- |
| CRITICAL | Aucun blocage global d'indexation identifié dans le dépôt. | HTML statique conservé. |
| HIGH | ❌ Canonical et sitemap absents ; paramètres de filtres/devis non consolidés. | Canonical de production sans paramètres, sitemap dérivé du HTML. |
| HIGH | ❌ Galerie de réalisations fictives indexable. | noindex et exclusion automatique tant qu'aucun projet approuvé n'existe. |
| HIGH | ⚠️ Anciennes catégories redirigées uniquement en HTML ; liens du précédent site vers À propos/Services absents du dépôt. | Redirections HTTP 301 Apache et repli HTML Astro. |
| MEDIUM | ❌ robots.txt, Open Graph et JSON-LD absents. | Ajout dans l'existant, sans dépendance. |
| MEDIUM | ⚠️ H1 d'accueil limité au nom accessible du logo ; cartes associées au même niveau que leur section. | Texte H1 descriptif accessible ; cartes associées en H3, style conservé. |
| MEDIUM | ⚠️ Adresse absente ; contexte diaspora et base géographique peu explicites. | Données confirmées dans le brief, accueil/contact ajustés. |
| MEDIUM | ⚠️ Apparition des filtres déplaçant le catalogue au chargement. | Espace réservé dès le HTML ; filtres toujours facultatifs. |
| LOW | ⚠️ Vérifications Google/Bing et procédure IndexNow absentes. | Variables facultatives et documentation. |
| — | ✅ Astro statique, titres distincts, langue FR, main/header/nav/footer, liens HTML, filtres facultatifs. | Conservés. |
| — | ✅ Images AVIF/WebP responsives, dimensions, alt, chargement différé hors hero, polices locales. | Conservés ; images de partage JPEG générées au build. |
| — | ✅ Animations facultatives ; contenu indépendant du GPU. | Conservé et retesté. |

Périmètre : 23 pages de contenu, dont 16 pages matériaux (12 références et
4 familles). Services et À propos existent comme contenu d'accueil, pas comme
pages dédiées dans le dépôt. Français uniquement, aucun faux hreflang anglais.

Le site public consulté présente une version différente : [accueil public](https://lamaco-sn.com/),
[ancienne page À propos](https://lamaco-sn.com/a-propos/). Les liens de navigation
publics exposent aussi `/services/` (contenu non récupéré). Aucun chiffre, avis ou
historique de cette ancienne version n'a été importé dans les données validées.
Les en-têtes et protections de LWS ne sont pas vérifiables par cette consultation.

## DONE — corrections et technique

- Layout enrichi sans restructurer les pages : metadata unique, canonical, robots,
  OG/Twitter, images sociales pertinentes, langue FR et tokens Google/Bing facultatifs.
- Graphe JSON-LD : Organization/LocalBusiness, WebSite, WebPage ou ses sous-types,
  BreadcrumbList et deux Service liés au parc confirmé. Pas d'avis, prix, horaires,
  stock, coordonnées GPS ou Product enrichi incomplet. Aucun projet fictif attesté.
- Sitemap généré après le build : 22 URL auto-canoniques existantes, aucun alias,
  paramètre, doublon ni noindex. robots.txt autorise notamment les trois crawlers demandés.
- Thiès/route de Mbour = base ; Sénégal = marché, Dakar et diaspora mentionnés
  naturellement. Pas de promesse de suivi digital ni de future offre présentée comme active.
- Maillage existant vérifié ; lien du hero désormais nommé « Découvrir nos matériaux ».
- Espace des filtres réservé avant activation : correction d'un décalage de mise
  en page reproduit sur le build initial, sans toucher à leur comportement final.
- Redirections de domaine, slash, index.html et quatre anciens chemins vérifiées
  sur Apache local. Aucun backend, bibliothèque SEO ou nouvelle landing page.

## Contrôle de chaque page

« OK » couvre : title/description uniques, canonical/robots, H1 unique et hiérarchie,
main/HTML principal sans JS, liens/ancres existants, dimensions/alt d'images,
Open Graph avec image réelle dans le build, JSON-LD analysable et langue FR.
Toutes les pages ont été ouvertes sans JavaScript à 390 px sans débordement horizontal.
Le contrôle visuel avec JavaScript couvre 8 pages représentatives à 390 et 1440 px ;
les scénarios de formulaires ajoutent petit mobile, tablette et mode réduit.

| Page | Indexation | Contrôles |
| --- | --- | --- |
| `/` | index | OK |
| `/contact/` | index | OK |
| `/demande-de-conseil/` | index | OK |
| `/demande-de-devis/` | index | OK |
| `/engins/` | index | OK |
| `/materiaux/` | index | OK |
| `/materiaux/basalte-0-3/` | index | OK |
| `/materiaux/basalte-3-8/` | index | OK |
| `/materiaux/basalte-8-16/` | index | OK |
| `/materiaux/basalte/` | index | OK |
| `/materiaux/calcaire-0-3/` | index | OK |
| `/materiaux/calcaire-15-25/` | index | OK |
| `/materiaux/calcaire-3-8/` | index | OK |
| `/materiaux/calcaire-5-15/` | index | OK |
| `/materiaux/calcaire/` | index | OK |
| `/materiaux/sable-dakar/` | index | OK |
| `/materiaux/sable-tasseb/` | index | OK |
| `/materiaux/sable/` | index | OK |
| `/materiaux/silex-0-3/` | index | OK |
| `/materiaux/silex-3-8/` | index | OK |
| `/materiaux/silex-8-16/` | index | OK |
| `/materiaux/silex/` | index | OK |
| `/realisations/` | noindex : démonstration | OK |

## Validation

- `npm run build` : 0 erreur, 0 avertissement, 0 remarque ; 23 pages de contenu,
  4 sorties de redirection, 22 entrées de sitemap. `git diff --check` : OK.
- `npm test` : suite de régression du générateur de sitemap réussie (exclusions,
  paramètres, doublons, alias, ajout/suppression de pages).
- Aucun script lint ni suite de tests versionnée préexistants. Astro check est
  exécuté par le build ; aucune nouvelle dépendance de lint ajoutée.
- Chrome/Playwright : 23 pages sans JS, **968 liens/ancres internes vérifiés**,
  16 rendus représentatifs, images visibles décodées, pas d'erreur JavaScript.
- Après correction des filtres : positions de grille identiques avec/sans JS à
  320/390/820/1440 px ; filtrage, retour historique et canonical sans paramètres : OK.
- Scénarios existants de contact/devis/conseil : validation, récapitulatif, édition,
  copie/repli, liens SMS, préremplissage, responsive, sans JS, sans POST ni stockage : OK.
- Sable GPU : chargement après pointeur, rendu réel, arrêt au repos, retour après
  défilement, réduction du mouvement dynamique, onglet masqué, redimensionnement,
  perte de contexte, mobile, save-data et sans JS : OK. Three.js est installé mais
  aucun module source ne l'importe ; l'effet actuel utilise WebGL natif.
- Apache local : 9 redirections, pages/sitemap/robots en 200, URL inconnue en 404,
  Googlebot/Bingbot/OAI-SearchBot en 200. Les mêmes vérifications restent à faire sur LWS.
- Repli carte testé avec tuiles externes volontairement bloquées ; ce test ne
  valide pas la disponibilité du fournisseur ni l'exactitude du repère géographique.

## Performance

- Bundles JS **identiques** au build initial : ensemble des chunks à 54,9 Ko gzip,
  dont 2,6 Ko pour le sable chargé à la demande. Aucun JS SEO ajouté.
- CSS de l'ensemble du site : 20,8 Ko gzip, différence +67 octets.
- HTML d'accueil : environ +0,7 Ko gzip pour metadata, JSON-LD et précisions de contenu.
- Visuels LCP d'accueil identiques : AVIF 640 px à 15 Ko ; 1920 px à 98,9 Ko,
  sous l'objectif de 250 Ko. Aucun asset de partage chargé dans les pages.
- Pas de réécriture des animations ou de changement des ressources visuelles :
  le gain porte sur l'indexabilité et la compréhension, sans gonfler le JS initial.
- Catalogue, mesure locale sans défilement : CLS ordinateur passé d'environ 0,328
  à 0,013 ; mobile 390 px de 0,057 à 0,010. Réservation de l'espace des filtres et
  activation progressive conservées. Ces valeurs sont des observations de laboratoire,
  pas une garantie terrain. L'enrichissement existant retire l'état `inert` une fois prêt.
- Lighthouse n'est pas installé. Les mesures exploratoires Chrome locales ne
  constituent pas des Core Web Vitals terrain ; INP et performances réseau mobile
  restent à valider sur la version publiée, puis dans Search Console.
- La comparaison sans défilement confirme aussi un CLS mobile du Contact voisin
  de 0,11 avant comme après : point de performance préexistant à suivre lors des
  mesures en conditions réelles, sans le présenter comme un objectif atteint.

## Fichiers concernés

- Infrastructure : `astro.config.mjs`, `public/robots.txt`, `public/.htaccess`,
  `scripts/sitemap.mjs`, `scripts/sitemap.test.mjs`, `package.json`.
- Metadata : `src/layouts/BaseLayout.astro`, `src/lib/seo.ts`, `src/env.d.ts`,
  `.env.example`, `.gitignore`.
- Contenu confirmé : `src/data/company.ts`, `src/data/contact.ts`, `src/data/materials.ts`.
- Pages : `src/pages/index.astro`, `contact.astro`, `engins.astro`, `realisations.astro`,
  `src/pages/materiaux/index.astro`, `src/pages/materiaux/[slug].astro`.
- Composants : `src/sections/Hero.astro`, `src/sections/RequestExperience.astro`,
  `src/components/CatalogueCard.astro`, `src/styles/materials.css`.
- Documentation : `SEO.md`, `SEO_OPPORTUNITIES.md`, ce rapport,
  `docs/ARCHITECTURE.md`, `docs/PRODUCT.md`.

## MANUAL ACTION REQUIRED

- Déployer `dist/` avec `.htaccess`, vérifier les règles LWS existantes, TLS/proxy,
  réponses HTTP, anciens chemins, robots, sitemap et éventuels blocages côté hébergeur.
- Confirmer le repère cartographique historique par rapport à l'adresse fournie ;
  aucune position géographique n'a été déduite ou ajoutée au JSON-LD.
- Vérifier les propriétés Google/Bing avec les vrais tokens ou DNS, soumettre le
  sitemap, demander l'indexation et surveiller les rapports. Procédure : `SEO.md`.
- IndexNow : clé et notifications ciblées seulement après publication réelle,
  procédure manuelle tant qu'aucun workflow de déploiement automatisé n'existe.
- Remplacer les projets fictifs par des références réelles approuvées ; ne pas
  retirer noindex simplement pour obtenir une page indexable supplémentaire.

## FUTURE OPPORTUNITY

Voir `SEO_OPPORTUNITIES.md` : diaspora, contenu détaillé sur les services/livraisons,
traduction anglaise complète. Aucune page créée automatiquement pour ces opportunités.
