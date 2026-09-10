export type RequestMode = 'devis' | 'conseil';

export const requestPages = {
  devis: {
    path: '/demande-de-devis/',
    title: 'Demande de devis',
    description: 'Préparez votre demande de matériaux, de location d’engins ou de travaux avec LAMACO au Sénégal.',
    eyebrow: 'Du projet au concret',
    heading: 'Votre chantier.',
    accent: 'On le prépare ?',
    intro: 'Des matériaux, un engin, du terrassement : dites-nous ce qu’il vous faut. Ensemble, donnons une suite concrète à votre projet.',
    note: 'Pas encore toutes les quantités ? Vous pouvez les préciser pendant notre échange.',
    firstTitle: 'De quoi avez-vous besoin ?',
    firstHint: 'Choisissez le besoin principal. Les demandes complémentaires peuvent être ajoutées dans les précisions.',
    steps: ['Votre besoin', 'Le chantier', 'Vos coordonnées'],
    choices: [
      { value: 'materiaux', label: 'Des matériaux', detail: 'Sables, basalte, calcaire, silex', icon: 'materials' },
      { value: 'engins', label: 'Un engin', detail: 'Pelle hydraulique ou camion-benne', icon: 'loader' },
      { value: 'travaux', label: 'Des travaux', detail: 'Terrassement, nettoyage de terrain', icon: 'clipboard' },
    ],
    alternate: 'Vous hésitez sur le bon choix ?',
    alternateLabel: 'Demander un conseil',
    alternatePath: '/demande-de-conseil/',
  },
  conseil: {
    path: '/demande-de-conseil/',
    title: 'Demande de conseil',
    description: 'Un doute sur un matériau, une quantité, un engin ou la livraison ? Préparez votre question pour LAMACO.',
    eyebrow: 'Parlons terrain, simplement',
    heading: 'Le bon départ,',
    accent: 'c’est le bon conseil.',
    intro: 'Pas besoin de connaître tous les calibres pour nous parler de votre chantier. Partons de vos travaux et de vos questions.',
    note: 'Une idée, un doute, un chantier en cours : racontez-le avec vos mots.',
    firstTitle: 'Qu’est-ce qui vous fait hésiter ?',
    firstHint: 'Choisissez un sujet pour guider notre échange. Aucun diagnostic automatique : on en parle ensemble.',
    steps: ['Votre question', 'Le contexte', 'Vos coordonnées'],
    choices: [
      { value: 'materiau', label: 'Le bon matériau', detail: 'Quelle matière, quel calibre ?', icon: 'materials' },
      { value: 'quantite', label: 'Les quantités', detail: 'Quelles informations préparer ?', icon: 'clipboard' },
      { value: 'livraison', label: 'La livraison', detail: 'Accès et organisation du chantier', icon: 'delivery' },
      { value: 'engin', label: 'Le bon engin', detail: 'Quel équipement pour mes travaux ?', icon: 'loader' },
    ],
    alternate: 'Votre besoin est déjà défini ?',
    alternateLabel: 'Préparer un devis',
    alternatePath: '/demande-de-devis/',
  },
} as const;

export const requestTiming = ['À définir ensemble', 'Dès que possible', 'Dans le mois', 'Plus tard'] as const;
export const requestWork = ['Terrassement', 'Nettoyage de terrain', 'Terrassement et nettoyage'] as const;
export const requestAccess = ['À préciser ensemble', 'Accès possible pour un camion', 'Accès étroit ou difficile', 'Je ne sais pas encore'] as const;
export const requestFaq = [
  { question: 'Dois-je connaître la quantité exacte ?', answer: 'Non. Indiquez ce que vous savez : une quantité estimée, les dimensions ou la nature des travaux. Les besoins restent à préciser avec LAMACO et le professionnel chargé du chantier.' },
  { question: 'Comment ma demande est-elle transmise ?', answer: 'Le site prépare un récapitulatif dans votre navigateur. Vous pouvez le copier ou ouvrir votre application SMS pour l’envoyer au numéro LAMACO affiché. Rien n’est envoyé automatiquement et aucun accusé de réception n’est fourni par le site.' },
  { question: 'Le prix et la livraison sont-ils déjà confirmés ?', answer: 'Non. Le prix, les quantités, la disponibilité des matériaux ou des engins et les modalités de livraison sont à confirmer directement avec LAMACO.' },
] as const;
