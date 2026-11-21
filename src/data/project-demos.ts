import type { Project } from './projects';
import houseImage from '../assets/images/project-demo-house.png';
import earthworksImage from '../assets/images/hero-quarry-v2.png';
import deliveryImage from '../assets/images/process-quarry.png';
import basaltImage from '../assets/images/material-basalt.png';

/** Explicitly requested fictional examples. Never include in publishedProjects. */
export const projectDemos: Project[] = [
  {
    slug: 'demo-maison', title: 'Les premiers pas d’une maison.', category: 'Matériaux de construction',
    summary: 'Une maison commence bien avant ses murs. Cet exemple présente l’approvisionnement d’un chantier familial, des premiers besoins jusqu’à l’arrivée des matériaux.',
    need: 'Prévoir le sable et les granulats pour les étapes d’un chantier résidentiel, avec une zone de stockage adaptée.',
    intervention: 'Dans cet exemple, les matériaux sont choisis avec le responsable des travaux, puis leur livraison est organisée selon l’accès au chantier.',
    result: 'Les matériaux sont regroupés près de la zone de travail. L’équipe du chantier peut organiser la suite des travaux avec les références prévues.',
    photos: [{ image: houseImage, alt: 'Visuel éditorial d’une maison en construction pour un exemple de projet', caption: 'Exemple de chantier · visuel de présentation' }, { image: basaltImage, alt: 'Visuel du basalte associé à un exemple de chantier', caption: 'Exemple de matière · visuel de référence' }],
    approved: false,
  },
  {
    slug: 'demo-terrain', title: 'Un terrain, de nouvelles possibilités.', category: 'Terrassement & nettoyage',
    summary: 'Avant de construire, il faut préparer le terrain. Cet exemple présente l’échange autour des accès, de la nature des travaux et de l’intervention d’une pelle.',
    need: 'Nettoyer une parcelle et préparer une zone de travail avant les prochaines étapes du projet.',
    intervention: 'L’exemple prévoit un échange sur les contraintes du site, puis une intervention de terrassement adaptée au besoin identifié.',
    result: 'Une zone de travail dégagée et un projet mieux préparé. L’exemple présente le rôle de l’engin sans constituer une étude technique.',
    photos: [{ image: earthworksImage, alt: 'Visuel éditorial de machines dans une carrière pour un exemple de terrassement', caption: 'Exemple de chantier · visuel de présentation' }],
    approved: false,
  },
  {
    slug: 'demo-livraison', title: 'La bonne matière, au bon endroit.', category: 'Livraison de matériaux',
    summary: 'L’approvisionnement fait partie de la vie du chantier. Cet exemple suit une demande de granulats, de sa préparation jusqu’à l’organisation du déchargement.',
    need: 'Acheminer des granulats vers un chantier en précisant la quantité, le point d’arrivée et les conditions d’accès.',
    intervention: 'Dans cet exemple, le besoin est précisé en amont et la livraison par camion-benne est préparée avec le responsable du chantier.',
    result: 'Les matériaux rejoignent la zone prévue pour leur stockage. Le récit montre les étapes d’une livraison, sans promettre un délai ou une capacité de transport.',
    photos: [{ image: deliveryImage, alt: 'Visuel éditorial d’un camion-benne dans une carrière pour un exemple de livraison', caption: 'Exemple de chantier · visuel de présentation' }],
    approved: false,
  },
];
