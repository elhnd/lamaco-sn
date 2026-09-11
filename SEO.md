# SEO — LAMACO

## Implémentation et conventions

Version du 11 septembre 2026 : branche `v2`, publication publique sur le sous-domaine.
La page `/a-propos/` est incluse ; les données d'équipe proviennent des derniers
contenus validés. Le domaine principal existant n'est pas redirigé par cet export.

- Astro statique : contenu principal dans le HTML, routes existantes conservées.
- Origine : `https://v2.lamaco-sn.com`, chemins de pages avec `/` final. Filtres
  `?famille=` et préremplissages de demandes pointent vers la canonical sans paramètres.
- `src/layouts/BaseLayout.astro` : title et description propres à chaque page,
  canonical, robots, Open Graph, Twitter Card, image JPEG 1200×630 générée depuis
  le visuel existant. Aucune image sociale chargée par le navigateur de la page.
- Props : `title`, `description`, `noindex`, `image`, `imageAlt`, `breadcrumbs`,
  `pageType`, `structuredData`. Pas de bibliothèque SEO ni de JS SEO côté client.
- Le catalogue réserve la place des filtres avant leur activation JS pour éviter
  de déplacer les cartes. Sans JS, les contrôles restent invisibles et les 12 fiches lisibles.
- `src/lib/seo.ts` : un graphe JSON-LD échappé, identifiants stables pour
  Organization/LocalBusiness, WebSite, WebPage (ou CollectionPage/ContactPage),
  BreadcrumbList conforme au fil visible. Deux Service sur `/engins/`.
- L'entité utilise `src/data/company.ts` : Thiès est la base ; `areaServed` est le
  Sénégal. Aucun prix, avis, horaires, stock ou coordonnées GPS déduits des images.
  Pas de Product enrichi sans données commerciales suffisantes ; pas de FAQPage
  destinée à revendiquer un affichage enrichi. Aucun projet fictif balisé comme réel.

## Crawl, sitemap et hébergement

- `public/robots.txt` autorise les robots génériques et OAI-SearchBot et référence
  `/sitemap.xml`. Aucun blocage Googlebot/Bingbot dans le dépôt ; vérifier aussi LWS.
- Le build ajoute une CSP correspondant aux scripts générés et des protections
  Apache (voir `SECURITY.md`). Déployer le `.htaccess` de **dist**, pas celui de public.
- `scripts/sitemap.mjs`, hook `astro:build:done`, inspecte le HTML produit : seules
  les pages existantes, auto-canoniques, sans `noindex` ni redirection entrent dans
  le sitemap. Pas de dates `lastmod` artificielles ni de liste de routes à maintenir.
- `/realisations/` reste `noindex, follow` tant que `publishedProjects` est vide.
  L'ajout d'un projet approuvé rétablit automatiquement son inclusion au build.
  `noindex` n'est pas un contrôle d'accès : ne jamais publier de contenu privé.
- `public/.htaccess` : HTTP/www vers HTTPS non-www, `/index.html` vers `/`, anciennes
  catégories gravier/béton vers `/materiaux/` en HTTP 301. Les URL du précédent site
  `/services/` rejoint `/#materiaux` ; supprimer cette redirection si une vraie page
  reprend ce chemin. `/a-propos/` dispose de sa propre page, sans redirection.
  Apache normalise les
  répertoires sans slash. Les redirections HTML Astro restent le repli statique.
- Télécharger **tout** `dist/`, y compris `.htaccess`, dans `public_html`. Vérifier
  `mod_rewrite`, les éventuelles règles existantes et l'absence de boucle HTTPS
  si un proxy termine TLS. Le serveur de preview Astro ne teste pas `.htaccess`.
- Après déploiement : contrôler HTTP/www/index.html/anciens slugs, paramètres,
  absence de 404 dans le sitemap, vraie réponse 404 sur une URL inconnue, robots et
  accès aux images OG. Tester les agents Googlebot, Bingbot et OAI-SearchBot.

## Langues

Français uniquement : `lang="fr"`, JSON-LD `inLanguage: fr`, Open Graph `fr_SN`.
Pas de routes anglaises ni de traductions existantes ; aucun `hreflang` déclaré.
Lors de vraies traductions : canonical propre à chaque langue et alternates
réciproques vers des pages traduites équivalentes. Ne pas dupliquer le français en EN.

## Google Search Console / Bing — action manuelle

1. Ajouter le domaine `lamaco-sn.com` dans Search Console (couvre ses sous-domaines)
   et le vérifier par DNS, ou ajouter la propriété URL `https://v2.lamaco-sn.com/`.
   Pour une propriété **préfixe d'URL**, la balise HTML est une alternative :
   renseigner `GOOGLE_SITE_VERIFICATION` au build (voir `.env.example`).
2. Soumettre `https://v2.lamaco-sn.com/sitemap.xml` après déploiement.
3. Inspecter l'accueil et quelques fiches, puis demander leur indexation.
4. Suivre Pages / Indexation et Core Web Vitals ; aucune garantie de délai d'indexation.
5. Ajouter le site dans Bing Webmaster Tools : importer la propriété Google ou
   vérifier par DNS / `BING_SITE_VERIFICATION` (balise `msvalidate.01`). Rebuilder
   et déployer si une variable change ; aucune balise émise pour une valeur vide.
6. Soumettre le même sitemap, inspecter les URL et surveiller l'exploration Bing.

## IndexNow — procédure après déploiement

Le dépôt prévoit un transfert manuel sur LWS, sans workflow automatisé ni historique
de publication. Pas de notification automatique au build : elle annoncerait des
pages non encore publiées. Aucun backend, dépendance ou clé fictive ajouté.

1. Générer et conserver une clé IndexNow (8–128 caractères autorisés par le protocole).
2. Publier `/<clé>.txt`, UTF-8, dont le contenu est la clé ; vérifier sa réponse 200.
3. Comparer les exports **réellement déployés** ; retenir uniquement les URL publiques
   créées, modifiées ou supprimées, sans paramètres, aliases ou démonstrations.
4. Après mise en ligne, POST JSON à `https://api.indexnow.org/indexnow` avec
   `host: "v2.lamaco-sn.com"`, `key`, `keyLocation: "https://v2.lamaco-sn.com/<clé>.txt"`
   et `urlList` (maximum 10 000 URL par lot). Les suppressions doivent déjà répondre
   404/410 ou avoir leur redirection définitive. Ne pas notifier tout le sitemap
   à chaque build ; ne pas demander à Google une intégration IndexNow.
5. Journaliser réponse et lot ; résoudre 400/403/422, temporiser après 429.
   Un 200/202 n'est pas une garantie d'indexation.

## Checklist nouvelle page

- [ ] Contenu confirmé dans `src/data`, HTML lisible sans JS, langue correcte.
- [ ] Title/description uniques, un H1 descriptif, H2/H3 cohérents, main et liens natifs.
- [ ] BaseLayout, canonical, image/alt OG pertinents, fil visible et JSON-LD cohérents.
- [ ] Images responsives avec dimensions ; eager/high uniquement pour l'image LCP.
- [ ] Liens internes entrants/sortants et absence d'URL privée ou technique indexable.
- [ ] `npm run build` et `npm test` ; inspecter HTML, JSON-LD, sitemap et robots.
- [ ] Vérifier mobile/desktop, sans JS, réduction des animations, erreurs navigateur.
- [ ] Contrôler après publication les réponses HTTP, Search Console et Bing.

Références : [sitemaps Google](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap),
[API d'intégration Astro](https://docs.astro.build/en/reference/integrations-reference/),
[vérification Google](https://support.google.com/webmasters/answer/9008080),
[vérification Bing](https://www2.bing.com/webmasters/help/add-and-verify-site-12184f8b),
[IndexNow](https://www.indexnow.org/documentation).
