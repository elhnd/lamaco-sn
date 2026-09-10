import type { Project } from './projects';
import houseImage from '../assets/images/project-demo-house.png';
import earthworksImage from '../assets/images/hero-quarry-v2.png';
import deliveryImage from '../assets/images/process-quarry.png';
import basaltImage from '../assets/images/material-basalt.png';

/** Explicitly requested fictional examples. Never include in publishedProjects. */
export const projectDemos: Project[] = [
  {
    slug: 'demo-maison', title: 'Les premiers pas d’une maison.', category: 'Matériaux de construction',
    summary: 'Une maison commence bien avant ses murs. Ce scénario imagine l’approvisionnement d’un chantier familial, des premiers besoins jusqu’à l’arrivée des matériaux.',
    need: 'Prévoir le sable et les granulats pour les étapes d’un chantier résidentiel, avec une zone de stockage adaptée.',
    intervention: 'Dans cet exemple fictif, les matériaux sont choisis avec le responsable des travaux, puis leur livraison est organisée selon l’accès au chantier.',
    result: 'Les matériaux sont regroupés près de la zone de travail. L’équipe du chantier peut organiser la suite des travaux avec les références prévues.',
    photos: [{ image: houseImage, alt: 'Illustration générée d’une maison en construction pour un projet fictif', caption: 'Projet de démonstration · image générée, aucun chantier réel représenté' }, { image: basaltImage, alt: 'Illustration de basalte associée au scénario fictif', caption: 'Exemple de matière · illustration, pas une photo de livraison' }],
    approved: false,
  },
  {
    slug: 'demo-terrain', title: 'Un terrain, de nouvelles possibilités.', category: 'Terrassement & nettoyage',
    summary: 'Avant de construire, il faut préparer le terrain. Cet exemple met en scène l’échange autour des accès, de la nature des travaux et de l’intervention d’une pelle.',
    need: 'Nettoyer une parcelle et préparer une zone de travail avant les prochaines étapes du projet.',
    intervention: 'Le scénario prévoit un échange sur les contraintes du site, puis une intervention de terrassement adaptée au besoin identifié.',
    result: 'Une zone de travail dégagée et un projet mieux préparé. L’exemple illustre le rôle de l’engin, sans constituer une étude technique ou une réalisation LAMACO.',
    photos: [{ image: earthworksImage, alt: 'Illustration de machines dans une carrière utilisée pour un scénario de terrassement fictif', caption: 'Projet de démonstration · scène illustrative générée' }],
    approved: false,
  },
  {
    slug: 'demo-livraison', title: 'La bonne matière, au bon endroit.', category: 'Livraison de matériaux',
    summary: 'L’approvisionnement fait partie de la vie du chantier. Ce récit fictif suit une demande de granulats, de sa préparation jusqu’à l’organisation du déchargement.',
    need: 'Acheminer des granulats vers un chantier en précisant la quantité, le point d’arrivée et les conditions d’accès.',
    intervention: 'Dans cette démonstration, le besoin est précisé en amont et la livraison par camion-benne est préparée avec le responsable du chantier.',
    result: 'Les matériaux rejoignent la zone prévue pour leur stockage. Le récit montre les étapes d’une livraison, sans promettre un délai ou une capacité de transport.',
    photos: [{ image: deliveryImage, alt: 'Illustration d’un camion-benne dans une carrière pour un récit de livraison fictif', caption: 'Projet de démonstration · scène illustrative générée' }],
    approved: false,
  },
];
