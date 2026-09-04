export const company = {
  name: 'LAMACO',
  website: 'https://lamaco-sn.com',
  phones: [
    { label: '+221 77 276 06 21', href: 'tel:+221772760621' },
    { label: '+221 77 639 27 96', href: 'tel:+221776392796' },
  ],
  tagline: 'Construire. Livrer. Équiper.',
  promise:
    'Matériaux de construction, location d’engins et services pour vos chantiers au Sénégal.',
} as const;

export const homeFacts = [
  { value: 'Matériaux', label: 'Sable & granulats' },
  { value: '2 engins', label: '1 camion-benne · 1 pelle' },
  { value: 'Livraison', label: 'Directement sur chantier' },
  { value: 'Sénégal', label: 'Service local' },
] as const;
