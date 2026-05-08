import { Metadata } from 'next';
import HarchAgriPage from './HarchAgriPage';

export const metadata: Metadata = {
  title: 'HarchAgri — Agriculture de précision pour l\'Afrique | Harch Corp',
  description:
    'Drones, IoT, fermes verticales et crédits carbone agricoles — la seule plateforme AgTech intégrée du continent africain. Conçue pour les réalités agricoles africaines.',
  keywords: [
    'HarchAgri', 'agriculture de précision', 'Afrique', 'IoT agriculture',
    'drone agriculture', 'fermes verticales', 'crédits carbone', 'drones agricoles',
    'Maroc', 'Sénégal', 'Kenya', 'Ghana', 'AgTech', 'DaaS',
    'irrigation précision', 'agriculture durable', 'ESG agriculture',
  ],
  openGraph: {
    title: 'HarchAgri — Agriculture de précision pour l\'Afrique',
    description: 'Drones, IoT, fermes verticales et crédits carbone — la seule plateforme AgTech intégrée en Afrique.',
    type: 'website',
  },
};

export default function AgriculturePage() {
  return <HarchAgriPage />;
}
