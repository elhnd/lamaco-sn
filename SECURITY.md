# Sécurité du déploiement statique

- Le ZIP contient uniquement les fichiers de `dist/`. Aucun `.env`, dépôt Git,
  source TypeScript, dépendance Node, journal ou clé privée n'est nécessaire sur LWS.
- `public/.htaccess` désactive l'index des répertoires et MultiViews, refuse les
  chemins cachés (sauf `.well-known/` pour les certificats) et les sources/sauvegardes.
- En-têtes : `nosniff`, anti-iframe `DENY`, politique de référent compatible avec
  OpenStreetMap et désactivation caméra/microphone/géolocalisation/paiement.
- HSTS pendant un an **uniquement sur HTTPS**, sans `includeSubDomains` ni preload.
  Les redirections restent limitées au domaine V2 et à son alias www.
- `scripts/security.mjs` génère la CSP dans **`dist/.htaccess`** après le rendu :
  scripts locaux et empreintes SHA-256 des scripts intégrés, aucun `unsafe-eval`
  ni `unsafe-inline` JavaScript ; événements HTML, objets, iframes et soumissions
  de formulaires interdits. Les parcours existants préparent un message, sans POST.
- Les styles intégrés restent autorisés pour GSAP, la carte et les styles Astro.
  Les images viennent du site ou de `tile.openstreetmap.org`, avec `data:` pour
  les images intégrées ; polices et connexions réseau limitées au site.
- L'import JSON-LD est échappé. Les informations saisies sont traitées en texte,
  restent dans la page et ne sont ni stockées ni automatiquement transmises.
- Ne pas éditer les scripts dans le ZIP : leurs empreintes ne correspondraient plus.
  Refaire le build et déployer **ensemble** HTML, assets et `.htaccess` généré.
- Prérequis LWS : Apache 2.4, `mod_rewrite`, `mod_headers`, autorisation des règles
  FileInfo/AuthConfig/Options et certificat TLS du sous-domaine. Le preview Astro
  n'applique pas ces protections. Vérifier les en-têtes après mise en ligne ; si
  `mod_headers` est absent, les autres règles restent actives, mais pas les en-têtes.
- Contrôles : `npm audit`, `npm run build`, `npm test`, `npm run check:release` ;
  tester sous Apache les pages, formulaires, GPU, CSP, 403/404 et redirections.

La V2 est publique et indexable, sauf Réalisations sans projet réel approuvé.
Ces règles ne constituent ni une authentification ni une protection d'un espace privé.

Références : [CSP pour les sites statiques](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP),
[en-têtes Apache](https://httpd.apache.org/docs/2.4/mod/mod_headers.html).
