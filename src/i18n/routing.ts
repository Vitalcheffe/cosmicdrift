import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  pathnames: {
    '/': {
      en: '/',
      fr: '/fr',
    },
    '/about': {
      en: '/about',
      fr: '/fr/a-propos',
    },
    '/subsidiaries': {
      en: '/subsidiaries',
      fr: '/fr/filiales',
    },
    '/quote': {
      en: '/quote',
      fr: '/fr/devis',
    },
    '/quote/received': {
      en: '/quote/received',
      fr: '/fr/devis/recu',
    },
    '/contact': {
      en: '/contact',
      fr: '/fr/contact',
    },
    '/thesis': {
      en: '/thesis',
      fr: '/fr/these',
    },
    '/platform': {
      en: '/platform',
      fr: '/fr/plateforme',
    },
    '/investors': {
      en: '/investors',
      fr: '/fr/investisseurs',
    },
    '/careers': {
      en: '/careers',
      fr: '/fr/carrieres',
    },
    '/careers/hiring-process': {
      en: '/careers/hiring-process',
      fr: '/fr/carrieres/processus-de-recrutement',
    },
    '/pricing': {
      en: '/pricing',
      fr: '/fr/tarifs',
    },
    '/pricing/calculator': {
      en: '/pricing/calculator',
      fr: '/fr/tarifs/calculateur',
    },
    '/intelligence': {
      en: '/intelligence',
      fr: '/fr/intelligence',
    },
    '/intelligence/harchos': {
      en: '/intelligence/harchos',
      fr: '/fr/intelligence/harchos',
    },
    '/press': {
      en: '/press',
      fr: '/fr/presse',
    },
    '/partners': {
      en: '/partners',
      fr: '/fr/partenaires',
    },
    '/support': {
      en: '/support',
      fr: '/fr/support',
    },
    '/faq': {
      en: '/faq',
      fr: '/fr/faq',
    },
    '/strategy': {
      en: '/strategy',
      fr: '/fr/strategie',
    },
    '/esg': {
      en: '/esg',
      fr: '/fr/esg',
    },
    '/community': {
      en: '/community',
      fr: '/fr/communaute',
    },
    '/newsroom': {
      en: '/newsroom',
      fr: '/fr/actualites',
    },
    '/blog': {
      en: '/blog',
      fr: '/fr/blog',
    },
    '/docs': {
      en: '/docs',
      fr: '/fr/docs',
    },
    '/trust': {
      en: '/trust',
      fr: '/fr/confiance',
    },
    '/trust/security': {
      en: '/trust/security',
      fr: '/fr/confiance/securite',
    },
    '/trust/compliance': {
      en: '/trust/compliance',
      fr: '/fr/confiance/conformite',
    },
    '/privacy': {
      en: '/privacy',
      fr: '/fr/confidentialite',
    },
    '/terms': {
      en: '/terms',
      fr: '/fr/conditions',
    },
    '/status': {
      en: '/status',
      fr: '/fr/statut',
    },
    '/company/leadership': {
      en: '/company/leadership',
      fr: '/fr/entreprise/direction',
    },
    '/company/dei': {
      en: '/company/dei',
      fr: '/fr/entreprise/diversite',
    },
    '/company/ventures': {
      en: '/company/ventures',
      fr: '/fr/entreprise/ventures',
    },
    '/customers': {
      en: '/customers',
      fr: '/fr/clients',
    },
    '/startup-program': {
      en: '/startup-program',
      fr: '/fr/programme-startup',
    },
    '/developers': {
      en: '/developers',
      fr: '/fr/developpeurs',
    },
    '/developers/open-source': {
      en: '/developers/open-source',
      fr: '/fr/developpeurs/open-source',
    },
    '/developers/playground': {
      en: '/developers/playground',
      fr: '/fr/developpeurs/playground',
    },
    '/legal/hub': {
      en: '/legal/hub',
      fr: '/fr/juridique/centre',
    },
    '/legal/cookies': {
      en: '/legal/cookies',
      fr: '/fr/juridique/cookies',
    },
    '/legal/gdpr': {
      en: '/legal/gdpr',
      fr: '/fr/juridique/rgpd',
    },
    '/legal/sla': {
      en: '/legal/sla',
      fr: '/fr/juridique/sla',
    },
    '/case-studies': {
      en: '/case-studies',
      fr: '/fr/etudes-de-cas',
    },
    '/glossary': {
      en: '/glossary',
      fr: '/fr/glossaire',
    },
    '/events': {
      en: '/events',
      fr: '/fr/evenements',
    },
    '/learn': {
      en: '/learn',
      fr: '/fr/apprendre',
    },
  },
});

export type Locale = (typeof routing.locales)[number];
