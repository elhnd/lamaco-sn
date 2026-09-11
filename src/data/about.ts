import { company } from './company';

// Source: docs/PRODUCT.md. No founding date confirmed.
export const aboutPage = {
  title: 'À propos de LAMACO',
  description: 'Découvrez LAMACO, entreprise BTP à Thiès : son équipe, ses matériaux, ses engins et sa façon d’accompagner les chantiers au Sénégal.',
  eyebrow: 'LAMACO · Thiès, Sénégal',
  intro: 'Des matériaux, des engins et une équipe à taille humaine pour accompagner vos projets au Sénégal.',
  storyEyebrow: '01 · L’entreprise',
  storyTitle: 'La force du terrain. Le sens du service.',
  story: [
    company.about,
    'Entreprise sénégalaise en développement, LAMACO réunit la fourniture de matériaux, la location d’engins et les services de terrain. Du choix des granulats à leur livraison, notre activité répond aux besoins concrets du chantier.',
    'Notre point de départ : votre besoin, le lieu des travaux et les conditions d’accès. Ces éléments permettent de préparer ensemble la suite du projet.',
  ],
  imageAlt: 'Illustration d’une carrière avec des matériaux et des engins, et non une photographie du dépôt LAMACO',
  imageCaption: 'Univers des matériaux · visuel d’illustration',
  resources: [
    { value: '01', label: 'Camion-benne', detail: 'Pour le transport des matériaux.' },
    { value: '01', label: 'Pelle hydraulique', detail: 'Pour les travaux de terrain.' },
    { value: '01', label: 'Espace de dépôt', detail: 'Pour le stockage et la présentation des matériaux.' },
  ],
  teamEyebrow: '02 · Les acteurs de LAMACO',
  teamTitle: 'Ceux qui font avancer LAMACO.',
  teamIntro: 'Direction, coordination des projets et gestion quotidienne : trois rôles complémentaires au service d’une même ambition, accompagner vos besoins de chantier.',
  // Names and roles supplied directly by LAMACO on 10 September 2026.
  // Provisional presentation copy explicitly requested by the user; replace with
  // approved biographies later. No invented credentials, tenure or achievements.
  teamMembers: [
    {
      name: 'Idrissa NDIAYE', initials: 'IN', role: 'CEO', focus: 'Donner le cap',
      presentation: 'À la direction de LAMACO, Idrissa porte la vision et le développement de l’entreprise. Son rôle : donner un cap aux activités et faire grandir une offre ancrée dans les besoins de construction au Sénégal.',
    },
    {
      name: 'El Hadji NDIAYE', initials: 'EHN', role: 'Project Manager', focus: 'Faire le lien',
      presentation: 'El Hadji accompagne la coordination des projets, du premier échange à la préparation des interventions. Son rôle : faire le lien entre les besoins du client et l’organisation du travail pour donner à chacun une vision claire des prochaines étapes.',
    },
    {
      name: 'Aly NIANG', initials: 'AN', role: 'Gérant', focus: 'Organiser le quotidien',
      presentation: 'Aly accompagne la gestion quotidienne de LAMACO et l’organisation de ses activités. Son rôle : articuler les demandes, la préparation des matériaux et les besoins du terrain pour faciliter le travail de l’équipe au quotidien.',
    },
  ],
  approachEyebrow: '03 · Notre façon de travailler',
  approachTitle: 'Un besoin clair. Une suite à préparer ensemble.',
  approachIntro: 'Matériaux, accès au chantier, engin ou livraison : chaque échange commence par les informations utiles à votre projet.',
  approach: [
    { title: 'Partir de vos travaux', description: 'Précisez la nature du projet, sa localisation et les matériaux ou travaux envisagés. Si le besoin est encore ouvert, commencez par une demande de conseil.' },
    { title: 'Préciser les modalités', description: 'Quantités, disponibilité, tarifs, accès et date souhaitée sont à confirmer avec LAMACO avant de convenir d’une commande ou d’une intervention.' },
    { title: 'Préparer le terrain', description: 'Indiquez les conditions d’accès, l’espace de déchargement et le contact sur place pour préparer la livraison ou les travaux.' },
  ],
  ctaEyebrow: 'Votre projet commence par un échange',
  ctaTitle: 'Faisons connaissance.',
  ctaDescription: 'Un besoin en matériaux, un terrain à préparer ou une question sur les engins ? Présentez-nous votre chantier.',
} as const;
