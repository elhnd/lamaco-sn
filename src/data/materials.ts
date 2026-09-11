import type { ImageMetadata } from 'astro';
import basaltImage from '../assets/images/material-basalt.png';
import limestoneImage from '../assets/images/material-limestone.png';
import sandImage from '../assets/images/material-sand.png';
import silexImage from '../assets/images/material-silex.png';

export type MaterialGroup = 'silex' | 'basalte' | 'calcaire' | 'sable';
export type TechnicalTopic = 'granulats' | 'granulometrie' | 'mortier' | 'blocs' | 'beton-arme';

export const materialSources: Record<TechnicalTopic, { title: string; href: string }> = {
  granulats: { title: 'Infociments — Granulats pour bétons hydrauliques', href: 'https://www.infociments.fr/betons/granulats-pour-betons-hydrauliques' },
  granulometrie: { title: 'Infociments — Caractéristiques et types de granulats', href: 'https://www.infociments.fr/betons/caracteristiques-et-types-de-granulats' },
  mortier: { title: 'Infociments — Le mortier', href: 'https://www.infociments.fr/glossaire/mortier' },
  blocs: { title: 'CERIB — Blocs en béton de granulats courants', href: 'https://www.cerib.com/certification-nf/blocs-en-beton-de-granulats-courants/?idCertif=1' },
  'beton-arme': { title: 'Infociments — Le béton armé', href: 'https://www.infociments.fr/glossaire/beton-arme' },
};

export interface MaterialFamily {
  slug: MaterialGroup;
  name: string;
  alias: string;
  image: ImageMetadata;
  alt: string;
  description: string;
  introduction: string;
  terminology?: string;
}

export const materials: readonly MaterialFamily[] = [
  {
    slug: 'basalte', name: 'Basalte', alias: 'Béton noir',
    image: basaltImage, alt: 'Illustration de basalte noir ; calibre non représenté à l’échelle',
    description: 'Béton noir : calibres 8/16, 3/8 et 0/3.',
    introduction: 'Le basalte, appelé béton noir dans notre offre, se décline en trois calibres. Les gravillons répondent aux demandes de granulats ; le 0/3 est proposé pour le terrassement et la fabrication de briques de construction.',
    terminology: 'Aussi appelé « béton armé » dans l’appellation commerciale LAMACO. Le produit fourni est un granulat : un béton armé est, techniquement, un béton associé à des armatures en acier.',
  },
  {
    slug: 'calcaire', name: 'Calcaire', alias: 'Béton blanc',
    image: limestoneImage, alt: 'Illustration de calcaire clair ; calibre non représenté à l’échelle',
    description: 'Béton blanc : calibres 5/15, 3/8, 15/25 et 0/3.',
    introduction: 'Notre calcaire, également appelé béton blanc, est proposé en quatre calibres. Choisissez les gravillons selon les besoins de votre chantier ou le 0/3 pour les terrassements après fondation.',
  },
  {
    slug: 'silex', name: 'Silex', alias: 'Béton Mapaté',
    image: silexImage, alt: 'Illustration de silex ; calibre non représenté à l’échelle',
    description: 'Béton Mapaté : calibres 8/16, 3/8 et 0/3.',
    introduction: 'Le silex, aussi appelé béton Mapaté, fait partie de notre offre de granulats. Du 8/16 sans poussière au 0/3 pour le terrassement, chaque référence répond à un besoin distinct.',
  },
  {
    slug: 'sable', name: 'Sable', alias: 'Dakar & Tasseb',
    image: sandImage, alt: 'Illustration de sable ; aspect et provenance non représentatifs d’un lot',
    description: 'Sable de Dakar pour le gros œuvre, sable de Tasseb pour les finitions.',
    introduction: 'Deux sables pour deux besoins : le sable grossier de Dakar pour les fondations et maçonneries lourdes, et le sable fin de Tasseb pour la maçonnerie et les finitions.',
  },
];

export interface CatalogueMaterial {
  slug: string;
  name: string;
  group: MaterialGroup;
  family: string;
  alias: string;
  image: ImageMetadata;
  alt: string;
  grade: string;
  description: string;
  introduction: string;
  quality: string;
  uses: readonly string[];
  guidance: string;
  sourceIds: readonly TechnicalTopic[];
  request: readonly string[];
  terminology?: string;
}

interface Variant {
  group: MaterialGroup;
  slug: string;
  name: string;
  grade: string;
  description: string;
  introduction: string;
  quality: string;
  uses: readonly string[];
  guidance: string;
  sourceIds: readonly TechnicalTopic[];
}

// Product facts confirmed directly by LAMACO; research supports general guidance
// only. See docs/PRODUCT.md and docs/MATERIALS_RESEARCH.md for provenance.
const variants: readonly Variant[] = [
  {
    group: 'basalte', slug: 'basalte-8-16', name: 'Basalte 8/16', grade: '8/16 mm',
    description: 'Béton noir, une référence appréciée pour sa robustesse.',
    introduction: 'Le basalte 8/16 est présenté par LAMACO comme une référence réputée pour sa fiabilité. Ce granulat noir est proposé pour les projets nécessitant ce calibre.',
    quality: 'Une référence de basalte reconnue par LAMACO pour sa robustesse.',
    uses: ['Demandes de gravillons noirs en 8/16.', 'Composition d’un béton lorsque ce calibre est retenu par votre professionnel.'],
    guidance: 'Le choix d’un granulat pour béton dépend de sa propreté et de la formulation du mélange.',
    sourceIds: ['granulats', 'beton-arme'],
  },
  {
    group: 'basalte', slug: 'basalte-3-8', name: 'Basalte 3/8', grade: '3/8 mm',
    description: 'Une sélection de petits grains de béton noir de première qualité.',
    introduction: 'Le basalte 3/8 est la sélection de petits grains mise en avant par LAMACO pour sa qualité. Il complète la gamme béton noir pour les demandes portant sur un calibre plus petit que le 8/16.',
    quality: 'Petits grains de basalte issus de la sélection de première qualité LAMACO.',
    uses: ['Travaux pour lesquels un gravillon 3/8 est demandé.', 'Mélanges granulaires définis par votre artisan ou votre entreprise.'],
    guidance: 'Un petit calibre ne garantit pas à lui seul la résistance du béton : la formulation reste déterminante.',
    sourceIds: ['granulats', 'beton-arme'],
  },
  {
    group: 'basalte', slug: 'basalte-0-3', name: 'Basalte 0/3', grade: '0/3 mm',
    description: 'Pour le terrassement et la fabrication de briques de construction.',
    introduction: 'Cette fraction fine de basalte est proposée par LAMACO pour les travaux de terrassement et comme matière entrant dans la fabrication de briques de construction.',
    quality: 'Une fraction fine de béton noir pour le terrassement et les briques.',
    uses: ['Terrassement et préparation des zones à remblayer.', 'Fabrication de briques de construction, selon le procédé du fabricant.'],
    guidance: 'La qualité d’une brique finie doit être vérifiée sur le produit fabriqué ; le calibre du granulat ne suffit pas à la déterminer.',
    sourceIds: ['blocs', 'granulometrie', 'beton-arme'],
  },
  {
    group: 'calcaire', slug: 'calcaire-5-15', name: 'Calcaire 5/15', grade: '5/15 mm',
    description: 'Des granulats de béton blanc de haute qualité.',
    introduction: 'Le calcaire 5/15 est proposé par LAMACO dans sa gamme béton blanc. Cette référence de haute qualité s’adresse aux chantiers recherchant ce calibre de granulat clair.',
    quality: 'Calcaire 5/15 de haute qualité dans la sélection LAMACO.',
    uses: ['Demandes de granulats calcaires en 5/15.', 'Préparation de béton si ce granulat est retenu dans la formulation.'],
    guidance: 'Le calibre et la propreté du granulat font partie des critères de choix d’un mélange pour béton.',
    sourceIds: ['granulats'],
  },
  {
    group: 'calcaire', slug: 'calcaire-3-8', name: 'Calcaire 3/8', grade: '3/8 mm',
    description: 'Petits grains de béton blanc sélectionnés pour leur qualité.',
    introduction: 'Le calcaire 3/8 constitue la référence à petits grains de notre gamme béton blanc. LAMACO le met en avant pour la qualité de ses grains.',
    quality: 'Grains de béton blanc de première qualité.',
    uses: ['Travaux demandant un petit gravillon calcaire.', 'Mélanges utilisant du 3/8, selon les prescriptions de votre professionnel.'],
    guidance: 'La désignation 3/8 correspond à une classe granulaire, pas à une classe de résistance.',
    sourceIds: ['granulometrie'],
  },
  {
    group: 'calcaire', slug: 'calcaire-15-25', name: 'Calcaire 15/25', grade: '15/25 mm',
    description: 'Le plus gros calibre de la gamme calcaire LAMACO.',
    introduction: 'Le calcaire 15/25 complète l’offre béton blanc avec des grains plus gros que ceux du 5/15 et du 3/8. Cette référence est disponible dans le catalogue LAMACO.',
    quality: 'La référence 15/25 complète nos calibres de béton blanc.',
    uses: ['Demandes de gravillons calcaires de calibre 15/25.', 'Mélanges pour lesquels le professionnel a spécifiquement retenu ce calibre.'],
    guidance: 'Le calibre 15/25 ne se substitue pas automatiquement à un calibre plus petit : respectez la composition prévue pour vos travaux.',
    sourceIds: ['granulometrie'],
  },
  {
    group: 'calcaire', slug: 'calcaire-0-3', name: 'Calcaire 0/3', grade: '0/3 mm',
    description: 'Une fraction fine pour les terrassements après fondation.',
    introduction: 'LAMACO propose le calcaire 0/3 pour les mêmes besoins de terrassement après fondation que le silex 0/3. Il s’agit de la référence fine de la gamme béton blanc.',
    quality: 'Même usage de terrassement après fondation que le silex 0/3, selon LAMACO.',
    uses: ['Terrassements après réalisation des fondations.', 'Préparation et remblaiement des zones prévues au chantier, selon les prescriptions du professionnel.'],
    guidance: 'Le 0/3 est une fraction fine : sa désignation ne constitue pas une garantie de portance du remblai.',
    sourceIds: ['granulometrie'],
  },
  {
    group: 'silex', slug: 'silex-8-16', name: 'Silex 8/16', grade: '8/16 mm',
    description: 'Béton Mapaté de qualité supérieure, sans poussière.',
    introduction: 'Le silex 8/16 est présenté par LAMACO comme un granulat de qualité supérieure, sans poussière. Cette référence appartient à notre gamme également connue sous le nom de béton Mapaté.',
    quality: 'Qualité supérieure et absence de poussière annoncées par LAMACO.',
    uses: ['Chantiers recherchant des gravillons de silex en 8/16.', 'Composition de béton, après choix du granulat par le professionnel.'],
    guidance: 'La propreté des granulats contribue à leur bonne liaison avec la pâte de ciment.',
    sourceIds: ['granulats'],
  },
  {
    group: 'silex', slug: 'silex-3-8', name: 'Silex 3/8', grade: '3/8 mm',
    description: 'Les « grains de riz » de béton Mapaté, en parfait état.',
    introduction: 'Appelé « grains de riz » dans notre offre, le silex 3/8 est proposé en parfait état par LAMACO. C’est le petit calibre de gravillons de la gamme béton Mapaté.',
    quality: 'Grains de riz en parfait état, selon la sélection LAMACO.',
    uses: ['Demandes de grains de riz de silex.', 'Mélanges nécessitant un gravillon 3/8, à définir avec votre artisan.'],
    guidance: '« Grains de riz » est une appellation commerciale ; le calibre de cette référence est 3/8.',
    sourceIds: ['granulometrie'],
  },
  {
    group: 'silex', slug: 'silex-0-3', name: 'Silex 0/3', grade: '0/3 mm',
    description: 'Béton Mapaté en poudre pour les terrassements après fondation.',
    introduction: 'Le silex 0/3 est la fraction fine, décrite comme une poudre par LAMACO. Il est proposé pour les terrassements qui suivent la réalisation des fondations.',
    quality: 'Une matière fine destinée aux terrassements après fondation.',
    uses: ['Terrassements après fondation.', 'Préparation des zones de remblai prévues par votre professionnel.'],
    guidance: 'Le terme « poudre » décrit ici le produit commercial 0/3 ; il ne désigne ni du ciment ni un liant.',
    sourceIds: ['granulometrie'],
  },
  {
    group: 'sable', slug: 'sable-dakar', name: 'Sable de Dakar', grade: 'Sable grossier',
    description: 'Sable grossier et résistant pour fondations et maçonneries lourdes.',
    introduction: 'Provenant de Dakar, ce sable est décrit par LAMACO comme grossier et résistant. Il est proposé pour les besoins de fondations et de maçonneries lourdes.',
    quality: 'Sable grossier de provenance Dakar, sélectionné pour les travaux de gros œuvre.',
    uses: ['Préparation des matériaux pour les travaux de fondation.', 'Maçonneries lourdes, selon le mélange défini par votre professionnel.'],
    guidance: 'Pour le béton, faites vérifier la propreté et la granularité du sable ; sa provenance ne suffit pas à établir son aptitude.',
    sourceIds: ['granulats'],
  },
  {
    group: 'sable', slug: 'sable-tasseb', name: 'Sable de Tasseb', grade: 'Sable fin',
    description: 'Sable fin pour la maçonnerie et les travaux de finition.',
    introduction: 'Le sable de Tasseb est proposé par LAMACO comme un sable fin de maçonnerie. Il accompagne les demandes de finition nécessitant un sable plus fin que celui de Dakar.',
    quality: 'Une texture fine pour vos besoins de maçonnerie et de finition.',
    uses: ['Travaux de maçonnerie avec un sable fin.', 'Mortiers de finition, joints ou enduits si votre artisan valide ce sable pour le travail prévu.'],
    guidance: 'Le sable entre dans la composition des mortiers. Le choix du liant et du mélange dépend de la finition recherchée.',
    sourceIds: ['mortier'],
  },
];

export const materialCatalogue: readonly CatalogueMaterial[] = variants.map((variant) => {
  const family = materials.find((item) => item.slug === variant.group)!;
  return {
    ...variant,
    family: family.name,
    alias: variant.group === 'sable' ? variant.grade : family.alias,
    image: family.image,
    alt: family.alt,
    terminology: family.terminology,
    request: ['Le matériau et le calibre ou type de sable recherchés', 'La nature des travaux et la quantité estimée', 'Le lieu, les accès et la date de livraison souhaitée'],
  };
});

export const materialCategories = materials.map(({ name }) => name);

// Keep family URLs used by the homepage; catalogue cards link to exact products.
export const materialDetails = [
  ...materialCatalogue.map((material) => ({ ...material, overview: false })),
  ...materials.map((family) => {
    const references = materialCatalogue.filter((item) => item.group === family.slug);
    return {
      ...family,
      group: family.slug,
      family: family.name,
      grade: references.map((item) => item.grade).join(' · '),
      quality: family.description,
      uses: references.map((item) => item.name + ' : ' + item.description),
      guidance: 'Choisissez une référence pour consulter ses usages et préparer votre demande.',
      request: references[0]!.request,
      sourceIds: family.slug === 'basalte' ? ['beton-arme'] as const : [],
      overview: true,
    };
  }),
];

export type MaterialDetail = (typeof materialDetails)[number];

export const materialsPage = {
  description: 'Basalte, calcaire, silex et sables de Dakar ou de Tasseb : consultez les matériaux LAMACO pour vos chantiers au Sénégal et préparez votre devis.',
  availability: 'Références proposées par LAMACO. Quantités, tarifs, stock et livraison à confirmer pour votre commande.',
  adviceTitle: 'Besoin d’un matériau spécifique ?',
  adviceDescription: 'Un doute sur le choix ou la quantité ? Parlons de vos travaux et préparons votre demande ensemble.',
  delivery: 'LAMACO propose la livraison de matériaux sur chantier. Le lieu, les conditions d’accès et la date souhaitée sont à préciser avec notre équipe.',
  useNote: 'Les usages présentés vous aident à préparer votre demande. Faites valider le choix du matériau et sa mise en œuvre par le professionnel chargé de vos travaux.',
  sizeNote: 'Les calibres d/D sont exprimés en millimètres : ils indiquent une classe de dimensions des grains, et non une résistance.',
  steps: [
    { title: 'Décrivez votre projet', text: 'Indiquez le matériau, son calibre et le lieu du chantier.' },
    { title: 'Précisons votre besoin', text: 'Nous échangeons sur la quantité, les usages et le stock disponible.' },
    { title: 'Organisons la livraison', text: 'Les modalités et le calendrier sont convenus avec vous avant confirmation.' },
  ],
} as const;
