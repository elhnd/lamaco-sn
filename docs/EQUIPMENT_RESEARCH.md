# Engins : vérification éditoriale

Vérifié le 9 septembre 2026. Ces références servent aux explications générales,
pas à identifier ou certifier les engins LAMACO.

## Sources primaires

- [Caterpillar — pelle hydraulique 336](https://www.cat.com/fr_FR/products/new/equipment/excavators/large-excavators/127105.html) :
  excavation, déplacement/chargement des matériaux et influence des accessoires.
  La fiche distingue puissance, poids en ordre de marche, godet, profondeur,
  portée et dimensions. Elle concerne une configuration CAT précise, **pas**
  la pelle LAMACO. Aucune de ses valeurs numériques n’est reprise.
- [Volvo Trucks — bâtiment et construction](https://www.volvotrucks.fr/fr-fr/transport-solutions/building-construction.html) :
  transport de matériaux et diversité des configurations selon les applications.
  Charge utile, dimensions et accès sont des critères de choix, pas des garanties
  applicables à tout camion.
- [Volvo FM — caractéristiques techniques](https://www.volvotrucks.fr/fr-fr/trucks/models/volvo-fm/specifications.html) :
  plusieurs configurations de châssis et d’essieux. Une fiche d’un modèle Volvo
  ne permet pas de renseigner le camion LAMACO, dont la marque n’est pas confirmée.

## Informations à obtenir de LAMACO

- Pelle : marque, modèle, configuration, notice/plaque constructeur, poids,
  puissance, godet installé, profondeurs/portées et dimensions de transport.
- Camion : marque, modèle, documents du véhicule et du carrossier, charge utile,
  volume de benne, essieux, dimensions et configuration de déchargement.
- Conditions commerciales : disponibilité, durée, conducteur, transport de
  l’engin, carburant et prix. Ne rien présenter comme inclus sans confirmation.

## Application au site

`src/data/equipment.ts` sépare usages LAMACO confirmés, fonctionnement générique,
questions de préparation et intitulés des caractéristiques non renseignées.
La page affiche « À confirmer » au lieu de chiffres estimés. Les liens sources
sont accompagnés d’une réserve explicite. Les images restent des illustrations.
