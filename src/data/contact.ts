// Complete only from confirmed LAMACO information, not the reference mockup.
// Coordinates extracted from the Street View link supplied by LAMACO.
export const contactLocation = {
  latitude: 14.3943798445042,
  longitude: -16.95476360033701,
  tileUrl: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
} as const;
const coordinates = `${contactLocation.latitude},${contactLocation.longitude}`;

export const contactDetails: {
  address: string | null;
  mapHref: string;
  directionsHref: string;
  email: string | null;
  hours: string | null;
} = {
  address: null,
  mapHref: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(coordinates)}`,
  directionsHref: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(coordinates)}`,
  email: null,
  hours: null,
};

export const contactPage = {
  title: 'Contactez-nous',
  eyebrow: 'Un projet commence par un échange',
  informationTitle: 'Parlons de votre chantier',
  description: 'Contactez LAMACO pour vos matériaux, vos engins et vos chantiers au Sénégal. Préparez votre message ou échangeons par téléphone.',
  intro: 'Une question, un besoin précis ou un chantier à préparer ? Parlons-en simplement.',
  visitNote: 'Retrouvez notre localisation sur Google Maps et appelez-nous pour préparer votre visite.',
  hoursNote: 'Convenons ensemble du moment de votre venue.',
  subjects: ['Demande de devis', 'Demande de conseil', 'Matériaux et livraison', 'Engins et travaux', 'Préparer une visite', 'Autre question'],
} as const;
