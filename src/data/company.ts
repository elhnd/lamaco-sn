export const company = {
  name: 'LAMACO',
  legalName: 'LAMACO SARL',
  website: 'https://v2.lamaco-sn.com',
  // Confirmed directly by LAMACO in the SEO brief, 10 September 2026.
  address: { street: 'Route de Mbour', city: 'Thiès', countryCode: 'SN' },
  market: 'Sénégal',
  description: 'LAMACO SARL, entreprise BTP basée à Thiès, route de Mbour, propose des matériaux de construction, la location d’engins, la livraison et le conseil pour les chantiers au Sénégal.',
  homeTitle: 'LAMACO | Matériaux, engins et solutions BTP au Sénégal',
  homeDescription: 'Matériaux de construction, location d’engins et livraison au Sénégal. LAMACO SARL, basée à Thiès, accompagne vos besoins de chantier, notamment à Dakar.',
  about: 'Basée à Thiès, LAMACO s’adresse aux particuliers, professionnels et à la diaspora pour leurs projets BTP au Sénégal, notamment à Dakar.',
  diasporaContact: 'Vous préparez un chantier au Sénégal depuis l’étranger ? Indiquez sa localisation et vos besoins pour préparer notre échange.',
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
