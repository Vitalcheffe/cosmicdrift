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
      fr: '/fr/platforme',
    },
    '/investors': {
      en: '/investors',
      fr: '/fr/investisseurs',
    },
    '/careers': {
      en: '/careers',
      fr: '/fr/carrieres',
    },
    '/pricing': {
      en: '/pricing',
      fr: '/fr/tarifs',
    },
  },
});

export type Locale = (typeof routing.locales)[number];
