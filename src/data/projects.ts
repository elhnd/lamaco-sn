import type { ImageMetadata } from 'astro';

export interface ProjectPhoto {
  image: ImageMetadata;
  alt: string;
  caption?: string;
}

/** Documentary content only. Approval includes permission to publish the photos. */
export interface Project {
  slug: string;
  title: string;
  location?: string;
  category: string;
  summary: string;
  need: string;
  intervention: string;
  result: string;
  photos: [ProjectPhoto, ...ProjectPhoto[]];
  approved: boolean;
}

// No documented projects or authorized project photographs supplied yet.
// Add approved, factual reports here; never use generated images as evidence.
export const projects: Project[] = [];
export const publishedProjects = projects.filter(project => project.approved);

export const projectsPage = {
  title: 'Nos réalisations',
  description: 'Les réalisations LAMACO : un espace consacré aux chantiers, aux matériaux livrés et aux interventions sur le terrain. Parlons de votre projet au Sénégal.',
  eyebrow: 'Les projets prennent vie sur le terrain',
  intro: 'Derrière un chantier, il y a une idée, des envies et des personnes. C’est de là que tout commence.',
  journalTitle: 'Le terrain a des histoires à raconter.',
  journalIntro: 'Le besoin de départ, notre intervention, le résultat : découvrez les projets à travers ce qui compte vraiment.',
  emptyLabel: 'Les reportages à venir',
  emptyTitle: 'Bientôt, nos chantiers en images.',
  emptyDescription: 'Cet espace accueillera les photos et les récits de nos interventions. Les premiers reportages ne sont pas encore publiés. En attendant, parlons de ce que vous souhaitez construire.',
  approachEyebrow: 'Et si on parlait de votre projet ?',
  approachTitle: 'Une idée en tête. Du concret entre les mains.',
  approachDescription: 'Une maison à construire, un terrain à préparer, des matériaux à faire livrer… Dites-nous où vous en êtes. Nous préciserons ensemble ce que LAMACO peut apporter à votre chantier.',
  illustrationCaption: 'La matière au départ du projet · illustration de sable',
  paths: [
    { title: 'Trouver vos matériaux', description: 'Sables, basalte, calcaire et silex : explorez les références et leurs usages.', href: '/materiaux/', label: 'Voir les matériaux', icon: 'materials' },
    { title: 'Préparer votre terrain', description: 'Pelle hydraulique, camion-benne : découvrez les engins et les besoins auxquels ils répondent.', href: '/engins/', label: 'Découvrir les engins', icon: 'loader' },
  ],
  ctaEyebrow: 'Le prochain chapitre commence avec vous',
  ctaTitle: 'Votre projet mérite qu’on en parle.',
  ctaDescription: 'Quelques mots suffisent pour commencer. Parlez-nous de votre besoin, de votre chantier et de vos questions.',
} as const;
