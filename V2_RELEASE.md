# Livraison V2 — 11 septembre 2026

## Périmètre

Branche Git `v2`, origine publique **https://v2.lamaco-sn.com**.
Toutes les dernières modifications du dépôt sont reprises, dont la page À propos,
ses données d'équipe et sa navigation. Le design et les parcours existants sont conservés.
La V2 reste indexable, sauf Réalisations tant qu'aucun projet réel n'est approuvé.

- 24 pages de contenu ; 23 URL dans le sitemap ; 3 anciens chemins redirigés.
- Canonical, Open Graph, images de partage, JSON-LD et robots utilisent le sous-domaine.
- `/a-propos/` est une vraie page indexable avec fil d'Ariane ; aucune ancienne
  redirection vers l'accueil. `/services/` redirige encore vers `/#materiaux`.
- Protections détaillées dans `SECURITY.md` ; le `.htaccess` généré contient les
  empreintes CSP correspondant exactement au HTML livré.

## Construire et livrer

```sh
npm ci
npm run build
npm test
npm run check:release
npm run package:dist
```

`package:dist` archive le **build déjà validé**, sans le reconstruire. Il exige
Node, `zip`, `unzip` et `sha256sum` sur la machine de préparation (aucun runtime
Node nécessaire sur LWS). L'archive est remplacée intégralement pour éviter les
fichiers obsolètes et contrôlée par `unzip -tq`.

Livrables non versionnés :

- `artifacts/lamaco-v2-dist.zip`
- `artifacts/lamaco-v2-dist.zip.sha256`

## Installation manuelle LWS

1. Configurer le sous-domaine `v2.lamaco-sn.com` et son certificat TLS, vers son
   propre répertoire web. Ne pas extraire l'archive dans celui du domaine principal.
2. Conserver une sauvegarde des éventuels fichiers du sous-domaine avant remplacement.
3. Extraire **le contenu** du ZIP directement à sa racine : `index.html`, `_astro/`,
   les dossiers de pages, `robots.txt`, `sitemap.xml` et **`.htaccess`**. Il n'y a
   pas de dossier `dist/` intermédiaire. Retirer le ZIP du répertoire public.
4. Vérifier les prérequis Apache décrits dans `SECURITY.md`, les réponses 200,
   les 301 HTTP→HTTPS et les 404 réelles ; contrôler les en-têtes CSP/nosniff/HSTS
   sur HTTPS. Ne pas remplacer le `.htaccess` généré par celui du dossier `public/`.
5. Ouvrir accueil, À propos, catalogue, fiches, contact, devis et conseil sur mobile.
   Vérifier les formulaires, le menu, les images et la carte ; tester la réduction
   des animations. Aucun POST n'est attendu : les messages sont préparés localement.
6. Soumettre **https://v2.lamaco-sn.com/sitemap.xml** dans Google Search Console et
   Bing (propriété URL du sous-domaine ou propriété domaine couvrante). Les vraies
   valeurs de vérification restent à fournir ; procédure dans `SEO.md`.

## Limites connues

- Pas de déploiement effectué par l'agent : le ZIP est fourni pour installation manuelle.
- Confirmer le repère de carte historique par rapport à l'adresse de Thiès.
- Les biographies de présentation d'équipe restent les textes provisoires demandés
  et documentés dans PRODUCT ; aucune qualification supplémentaire n'a été inventée.
- Réalisations contient des démonstrations explicitement signalées, en noindex.
- Les performances terrain et la configuration effective LWS sont à contrôler
  après publication ; l'ancien audit relève un CLS mobile Contact voisin de 0,11.
- Les protections HTTP dépendent d'Apache et des modules autorisés par l'hébergement.

## Validations effectuées avant livraison

- Dernier `main` distant récupéré : aucune modification distante manquante à la base V2.
- Build Astro : 0 erreur, 0 avertissement, 0 remarque ; 23 URL dans le sitemap.
- 13 tests unitaires réussis (sitemap et CSP), contrôle du build et `git diff --check` réussis.
- `npm audit` : 0 vulnérabilité connue signalée au 11 septembre 2026.
- Recherche de motifs de clés privées et de jetons courants : aucun trouvé dans
  les fichiers du projet destinés au commit (contrôle ciblé, pas une certification).
- Chrome/Playwright sous Apache : 24 pages sans JS, 1 006 liens/ancres contrôlés,
  18 rendus sur mobile/ordinateur ; aucune erreur JS ni violation CSP inattendue.
- Contact/devis/conseil : validation, préremplissage, édition, copie/SMS, sans POST,
  sans stockage, responsive, réduction des animations et sans JS : réussis.
- Effet WebGL : rendu, arrêt au repos, reprise, réduction du mouvement dynamique,
  onglet masqué, redimensionnement, perte de contexte, save-data et mobile : réussis.
- CSP : script intégré non autorisé et soumission POST imprévue effectivement bloqués
  dans le navigateur ; les formulaires légitimes restent utilisables.
- Apache : en-têtes, redirections V2, accès aux trois robots demandés, refus des
  fichiers cachés/sources/archives et absence d'index de répertoire vérifiés.
  Les ressources inconnues renvoient 404 ; aucun renvoi d'À propos vers l'accueil.
- ZIP : intégrité contrôlée, `.htaccess` généré inclus, aucun dossier `dist/`
  intermédiaire ; empreinte SHA-256 fournie avec l'archive.
- Les tuiles externes ont été bloquées dans l'audit visuel pour tester le repli
  de la carte ; disponibilité du fournisseur et exactitude du repère à confirmer.
