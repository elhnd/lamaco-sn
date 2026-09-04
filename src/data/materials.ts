import basaltImage from '../assets/images/material-basalt.png';
import limestoneImage from '../assets/images/material-limestone.png';
import silexImage from '../assets/images/material-silex.png';

export const materials = [
  {
    name: 'Basalte',
    image: basaltImage,
    alt: 'Illustration de pierres de basalte noir',
    description: 'Granulat sombre pour vos besoins de construction.',
  },
  {
    name: 'Calcaire',
    image: limestoneImage,
    alt: 'Illustration de granulats calcaires clairs',
    description: 'Pierre calcaire disponible selon vos besoins chantier.',
  },
  {
    name: 'Silex',
    image: silexImage,
    alt: 'Illustration de pierres de silex aux tons naturels',
    description: 'Silex sélectionné pour les travaux de construction.',
  },
] as const;

export const materialCategories = [
  'Sable',
  'Béton',
  'Gravier',
  'Silex',
  'Calcaire',
  'Basalte',
] as const;
