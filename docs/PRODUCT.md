# Product & Content Source of Truth

## Company
LAMACO is a growing Senegalese company in construction/BTP and related services. The site must present the current business credibly, not pretend LAMACO is already a large industrial group.

## Current offers
- Construction aggregates: silex/flint (béton Mapaté), basalt (béton noir) and limestone (béton blanc), in the confirmed calibres below
- Sable de Dakar and sable de Tasseb
- Delivery of materials to worksites
- Construction equipment rental
- Earthworks and land cleaning
- Advice on material needs

## Catalogue confirmé par LAMACO — 7 septembre 2026

Source prioritaire : liste détaillée fournie directement par LAMACO dans la
conversation. Elle remplace les anciennes catégories génériques « Béton » et
« Gravier » du catalogue V1. L’offre confirmée comprend **12 références**, regroupées
dans les filtres Basalte, Calcaire, Silex et Sable.

| Famille / appellation locale | Référence | Informations transmises par LAMACO |
| --- | --- | --- |
| Silex / béton Mapaté | 8/16 | Qualité supérieure, sans poussière. |
| Silex / béton Mapaté | 3/8 | « Grains de riz » en parfait état. |
| Silex / béton Mapaté | 0/3 | En poudre ; idéal pour les terrassements après fondation. |
| Basalte / béton noir ; aussi appelé « béton armé » commercialement | 8/16 | Très réputé pour son absence de défaillance. |
| Basalte / béton noir | 3/8 | Le meilleur grain disponible. |
| Basalte / béton noir | 0/3 | Terrassement et fabrication de briques pour la construction. |
| Calcaire / béton blanc | 5/15 | Haute qualité. |
| Calcaire / béton blanc | 3/8 | Grains de béton blanc de la meilleure qualité. |
| Calcaire / béton blanc | 15/25 | Également disponible. |
| Calcaire / béton blanc | 0/3 | Mêmes caractéristiques annoncées que le 0/3 du silex ; même usage de terrassement après fondation. |
| Sable | Sable de Dakar | Provenance Dakar ; sable grossier et résistant, proposé pour les fondations et maçonneries lourdes. |
| Sable | Sable de Tasseb | Sable fin pour maçonnerie et finitions solides. |

### Règles éditoriales propres aux matériaux

- Conserver les appellations locales comme alias visibles, avec le nom de la
  matière et le calibre en titre principal.
- « Béton armé » est ici une appellation commerciale du basalte, pas la nature du
  produit livré. Expliquer la différence sur ses fiches. Ne pas déduire de ces
  appellations une offre de béton frais/prêt à l’emploi ou de béton avec armatures.
- Les appréciations de qualité ci-dessus viennent de LAMACO, pas d’essais
  indépendants. Les conserver comme positionnement commercial ; reformuler les
  superlatifs en sélection de qualité et réputation de robustesse, sans promettre
  zéro défaillance, une résistance mesurée ou une supériorité comparative prouvée.
- La mention « sans poussière » concerne le silex 8/16 uniquement. Ne pas l’étendre
  aux autres références ni l’interpréter comme une analyse de laboratoire.
- Ne pas assimiler chimiquement le calcaire 0/3 au silex 0/3 : le besoin de
  terrassement annoncé est commun, les matières restent différentes.
- Les calibres sont affichés en mm. Ne pas inventer de calibre numérique pour les
  sables de Dakar et de Tasseb, ni de carrière précise, lavage, teneur en sels,
  densité, origine marine ou certification. « Tasseb » conserve l’orthographe fournie.
- Le catalogue confirme les références proposées, pas le stock en temps réel.
  Quantités, prix, disponibilité et livraison restent à confirmer à la commande.
- Les usages enrichis sont des repères de choix, à valider par le professionnel
  chargé des travaux ; ne pas ajouter de dosages ou de prescriptions structurelles.
- Les illustrations sont indicatives : ne pas présenter la taille des grains
  photographiés comme une mesure du calibre, ni l’image du sable comme une preuve
  de sa provenance. Les deux sables partagent actuellement un visuel d’illustration.

Les recherches, sources techniques et limites sont documentées dans
[`MATERIALS_RESEARCH.md`](MATERIALS_RESEARCH.md). Les références externes éclairent
les usages généraux ; elles ne certifient pas les produits LAMACO.

## Current resources
- 1 dump truck
- 1 excavator
- 1 outdoor depot/storage/display area
- Team: about 4 people

Do not present future categories (hardware store, marketplace, digital tools, simulator, AI, etc.) as active services unless explicitly requested.

## Audience
Individuals, self-builders, artisans, BTP companies, developers/investors and Senegalese diaspora. The diaspora angle can emphasize visibility, reliable delivery and remote project coordination, without unsupported promises.

## Contact
Website: `https://lamaco-sn.com`
Phones:
- `+221 77 276 06 21`
- `+221 77 639 27 96`

## V1 pages
- `/` — brand, core offers, materials, equipment, process, strong contact CTA
- `/materiaux` — 12 références confirmées, filtrables par famille
- `/materiaux/{famille}` — présentation de Basalte, Calcaire, Silex ou Sable
- `/materiaux/{reference}` — fiche de chaque calibre ou sable, usages et demande de devis
- `/engins` — current equipment only
- `/services` — delivery, rental, earthworks, cleaning, material advice
- `/realisations` — only documented real projects; otherwise use a restrained empty/coming-content state
- `/a-propos` — company story, positioning, operating approach
- `/contact` — phones + static contact information; no fake working form until backend exists

## Content rules
- French is primary.
- Tone: direct, professional, concrete, Senegal-relevant.
- Avoid generic corporate filler.
- No fabricated metrics such as “500+ projects”, “15 years”, “1M tonnes”.
- Store repeated content in `src/data/`; components render it.
- Unknown data stays absent or marked TODO in source, never guessed in UI.
