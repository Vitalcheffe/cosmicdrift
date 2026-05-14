import { Metadata } from 'next';
import QuoteReceivedClient from './QuoteReceivedClient';

export const metadata: Metadata = {
  title: 'Demande de Devis Recue | Harch Corp',
  description:
    'Votre demande de devis a ete recue. Notre equipe vous contactera dans les 24 heures via un canal securise. Harch Corp — Infrastructure Souveraine Africaine.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://www.harchcorp.com/quote/received',
  },
};

export default function QuoteReceivedPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.harchcorp.com' },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://www.harchcorp.com/contact' },
      { '@type': 'ListItem', position: 3, name: 'Demande Recue', item: 'https://www.harchcorp.com/quote/received' },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <QuoteReceivedClient />
    </>
  );
}
