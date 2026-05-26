import { Metadata } from 'next';
import HarchFinancePage from './HarchFinancePage';

export const metadata: Metadata = {
  title: "Harch Finance — Financing Africa's Industrial Transformation | Harch Corp",
  description:
    "Harch Finance structures capital flows for sovereign infrastructure — green bonds, project finance, trade finance, Islamic finance, and impact investment across 7 verticals and 5 countries.",
  keywords: [
    'Harch Finance', 'green bonds', 'project finance', 'trade finance',
    'Islamic finance', 'sukuk', 'impact investment', 'carbon credits',
    'Africa infrastructure', 'blended finance', 'sovereign wealth fund',
    'development finance', 'Morocco', 'Senegal', 'Kenya', 'Ghana', 'Gambia',
    'ECA financing', 'MIGA', 'OHI compliance',
  ],
  alternates: {
    canonical: 'https://www.harchcorp.com/subsidiaries/finance',
    languages: {
      en: 'https://www.harchcorp.com/subsidiaries/finance',
      fr: 'https://www.harchcorp.com/fr/filiales/finance',
      'x-default': 'https://www.harchcorp.com/subsidiaries/finance',
    },
  },
  openGraph: {
    title: "Harch Finance — Financing Africa's Industrial Transformation",
    description:
      'Structuring capital flows for sovereign infrastructure — from green bonds to project finance across 7 verticals.',
    url: 'https://www.harchcorp.com/subsidiaries/finance',
    type: 'website',
  },
};

export default function FinancePage() {
  return <HarchFinancePage />;
}
