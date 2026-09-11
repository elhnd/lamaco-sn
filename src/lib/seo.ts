import { company } from '../data/company';

export interface Breadcrumb { name: string; path: string }
export type StructuredData = Record<string, unknown>;

/** Production origin only; filters and request prefills never become canonical URLs. */
export function canonicalUrl(pathname: string) {
  const path = new URL(pathname, company.website).pathname;
  return new URL(path === '/' ? '/' : `${path.replace(/\/+$/, '')}/`, company.website).href;
}

export function pageGraph(options: {
  title: string;
  description: string;
  canonical: string;
  image: string;
  breadcrumbs: Breadcrumb[];
  pageType: 'WebPage' | 'CollectionPage' | 'ContactPage';
  structuredData: StructuredData[];
}) {
  const { title, description, canonical, image, breadcrumbs, pageType, structuredData } = options;
  const businessId = `${company.website}/#organization`;
  const websiteId = `${company.website}/#website`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'LocalBusiness'], '@id': businessId,
        name: company.name, legalName: company.legalName, url: `${company.website}/`,
        description: company.description,
        logo: `${company.website}/brand/logo-primary.svg`,
        telephone: company.phones[0].href.replace('tel:', ''),
        address: {
          '@type': 'PostalAddress', streetAddress: company.address.street,
          addressLocality: company.address.city, addressCountry: company.address.countryCode,
        },
        areaServed: { '@type': 'Country', name: company.market },
        contactPoint: company.phones.map(phone => ({
          '@type': 'ContactPoint', telephone: phone.href.replace('tel:', ''),
          contactType: 'Renseignements et devis', availableLanguage: 'fr',
        })),
      },
      {
        '@type': 'WebSite', '@id': websiteId, url: `${company.website}/`,
        name: company.name, inLanguage: 'fr', publisher: { '@id': businessId },
      },
      {
        '@type': pageType, '@id': `${canonical}#webpage`, url: canonical,
        name: title, description, inLanguage: 'fr',
        isPartOf: { '@id': websiteId }, about: { '@id': businessId },
        primaryImageOfPage: { '@type': 'ImageObject', url: image },
        ...(breadcrumbs.length ? { breadcrumb: { '@id': `${canonical}#breadcrumb` } } : {}),
      },
      ...(breadcrumbs.length ? [{
        '@type': 'BreadcrumbList', '@id': `${canonical}#breadcrumb`,
        itemListElement: breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem', position: index + 1, name: crumb.name, item: canonicalUrl(crumb.path),
        })),
      }] : []),
      ...structuredData,
    ],
  };
}

/** Prevent content from closing an inline JSON-LD script. */
export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
