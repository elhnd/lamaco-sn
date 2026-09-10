import excavatorImage from '../assets/images/excavator-isolated.png';
import truckImage from '../assets/images/process-quarry.png';

export const equipment = [
  {
    slug: 'pelle-hydraulique',
    name: 'Pelle hydraulique',
    description: 'Pour vos travaux de terrassement et de nettoyage de terrain.',
    category: 'Préparer le terrain',
    image: excavatorImage,
    imageAlt: 'Illustration d’une pelle hydraulique jaune sur chenilles, sans marquage',
    icon: 'loader',
    uses: ['Terrassement', 'Nettoyage de terrain'],
    detail: 'Un terrain à préparer ou à nettoyer ? Présentez-nous la nature des travaux et les conditions d’accès pour étudier l’intervention de la pelle hydraulique.',
    preparation: ['La localisation et l’accès au terrain', 'La nature des travaux et les dimensions connues', 'La période souhaitée et les contraintes du chantier'],
    operation: 'Une pelle hydraulique permet de creuser et de déplacer des matériaux avec son ensemble flèche, bras et godet. Les usages possibles dépendent du modèle et de l’accessoire monté.',
    technical: ['Marque et modèle', 'Poids en ordre de marche', 'Puissance moteur', 'Capacité du godet', 'Profondeur et portée de travail', 'Dimensions de transport'],
    source: { label: 'Caterpillar — fonctionnement et critères techniques', href: 'https://www.cat.com/fr_FR/products/new/equipment/excavators/large-excavators/127105.html' },
  },
  {
    slug: 'camion-benne',
    name: 'Camion-benne',
    description: 'Pour le transport et la livraison de matériaux sur chantier.',
    category: 'Acheminer les matériaux',
    image: truckImage,
    imageAlt: 'Illustration d’un camion-benne transportant des granulats dans une carrière',
    icon: 'delivery',
    uses: ['Transport de matériaux', 'Livraison sur chantier'],
    detail: 'Du sable ou des granulats à acheminer ? Indiquez-nous le matériau, la quantité envisagée et la destination pour préparer votre demande de transport.',
    preparation: ['Le matériau et la quantité, même estimée', 'La destination et les conditions d’accès du camion', 'La période souhaitée et l’emplacement de déchargement'],
    operation: 'Le camion-benne assure l’acheminement de matériaux de construction. La configuration du véhicule, sa charge utile et son gabarit doivent être adaptés au transport et aux accès du chantier.',
    technical: ['Marque et modèle', 'Charge utile', 'Volume de la benne', 'Configuration des essieux', 'Dimensions du véhicule', 'Modalités de déchargement'],
    source: { label: 'Volvo Trucks — camions de construction', href: 'https://www.volvotrucks.fr/fr-fr/transport-solutions/building-construction.html' },
  },
] as const;

export const equipmentPage = {
  title: 'Nos engins',
  description: 'Pelle hydraulique et camion-benne : découvrez les engins LAMACO pour le terrassement, le nettoyage de terrain et la livraison de matériaux au Sénégal.',
  eyebrow: 'La force du terrain, en action',
  intro: 'Préparer le terrain. Acheminer les matériaux. Deux engins pour accompagner les étapes concrètes de votre chantier.',
  availability: 'Le parc comprend une pelle hydraulique et un camion-benne. Disponibilité, tarifs et modalités d’intervention à confirmer avec LAMACO.',
  imageNote: 'Visuels d’illustration, non contractuels : ils ne représentent pas les modèles exacts du parc LAMACO.',
  technicalNote: 'Les caractéristiques exactes du parc ne sont pas encore renseignées. Elles sont à confirmer avec LAMACO avant toute intervention ; aucun chiffre d’un modèle constructeur n’est attribué à nos engins.',
  sourceNote: 'Repères généraux uniquement : cette source ne décrit pas l’engin LAMACO et ne confirme ni sa marque ni son équipement.',
  planningTitle: 'Un chantier bien préparé, ça commence ici.',
  planning: [
    { title: 'Votre besoin', description: 'Expliquez les travaux à réaliser ou les matériaux à transporter.', icon: 'clipboard' },
    { title: 'Votre terrain', description: 'Précisez la localisation, les accès et les contraintes connues.', icon: 'advice' },
    { title: 'Notre échange', description: 'Nous précisons ensemble l’engin, la disponibilité et les modalités.', icon: 'loader' },
  ],
  adviceTitle: 'Quel engin pour votre chantier ?',
  adviceDescription: 'Vous hésitez entre une demande de transport et des travaux de terrain ? Décrivez votre projet : partons de votre besoin.',
} as const;
