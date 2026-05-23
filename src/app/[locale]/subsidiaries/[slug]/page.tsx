import { Metadata } from 'next';
import SubsidiaryWrapper from './SubsidiaryWrapper';

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

const subsidiaryMetaEn: Record<string, {
  title: string;
  description: string;
  heroImage: string;
  keywords: string[];
}> = {
  intelligence: {
    title: 'Harch Intelligence — Carbon-Aware GPU Cloud & Sovereign AI Infrastructure',
    description: 'Harch Intelligence operates 1,798 carbon-optimized GPUs across 5 hubs in Morocco at ~47 gCO2/kWh — 89% below industry average. Sovereign AI compute with carbon-aware scheduling, 500MW pipeline, and direct submarine cable connectivity to Europe.',
    heroImage: '/images/sections/intelligence-exterior.jpg',
    keywords: ['Harch Intelligence', 'GPU cloud Africa', 'carbon-aware GPU scheduling', 'sovereign AI', 'data center Morocco', 'HarchOS', 'AI infrastructure Africa', 'green GPU cloud'],
  },
  cement: {
    title: 'Harch Cement — 500kT/yr Green Cement Production in Gambia',
    description: "Harch Cement is building West Africa's future with 500kT/yr vertically integrated cement production in Gambia. Green cement formulations, renewable energy powered, import substitution for the construction boom.",
    heroImage: '/images/sections/cement-factory.jpg',
    keywords: ['Harch Cement', 'cement Gambia', 'green cement Africa', 'construction materials West Africa', 'LC3 cement', 'cement manufacturing'],
  },
  energy: {
    title: 'Harch Energy — 2GW+ Renewable Energy Pipeline Across Africa',
    description: "Harch Energy develops 2GW+ renewable energy pipeline — solar, wind, and green hydrogen — powering Africa's industrial sovereignty. $14/MWh solar benchmark in Morocco, strategic hydrogen corridor to Europe.",
    heroImage: '/images/sections/energy-wind-farm.jpg',
    keywords: ['Harch Energy', 'renewable energy Africa', 'solar energy Morocco', 'green hydrogen', 'wind power Africa', 'clean energy infrastructure'],
  },
  technology: {
    title: 'Harch Technology — Sovereign Digital Infrastructure & Cybersecurity',
    description: "Harch Technology builds sovereign digital infrastructure — cybersecurity platforms, satellite communications, and zero-trust networks protecting Africa's critical infrastructure from foreign surveillance and cyber threats.",
    heroImage: '/images/sections/tech-satellite.jpg',
    keywords: ['Harch Technology', 'sovereign technology Africa', 'cybersecurity infrastructure', 'satellite communications', 'zero-trust security', 'digital sovereignty'],
  },
  mining: {
    title: 'Harch Mining — Strategic Mineral Processing & Value Capture in Africa',
    description: 'Harch Mining captures the full mineral value chain — from extraction to refined processing on African soil. Phosphates, cobalt, rare earths, and strategic minerals processed domestically, ending raw ore export.',
    heroImage: '/images/sections/mining-open-pit.jpg',
    keywords: ['Harch Mining', 'mineral processing Africa', 'rare earths mining', 'cobalt processing', 'phosphate mining Morocco', 'strategic minerals'],
  },
  agriculture: {
    title: 'Harch Agri — Precision Agriculture & Vertical Farming Across the Sahel',
    description: 'Harch Agri deploys precision agriculture at scale — IoT monitoring, drone intelligence, vertical farming, and supply chain optimization across 5,000+ hectares in Senegal and the Sahel belt.',
    heroImage: '/images/sections/agri-aerial-drone.jpg',
    keywords: ['Harch Agri', 'precision agriculture Africa', 'vertical farming Sahel', 'IoT agriculture', 'drone farming', 'agritech Africa'],
  },
  water: {
    title: 'Harch Water — AI-Optimized Desalination & Water Infrastructure',
    description: "Harch Water builds 200M m³/yr desalination capacity with AI-optimized distribution, achieving 23% water loss reduction. Solving Africa's water crisis through sovereign infrastructure.",
    heroImage: '/images/sections/water-desal-plant.jpg',
    keywords: ['Harch Water', 'water desalination Africa', 'AI water management', 'water infrastructure', 'desalination plant Morocco', 'water scarcity solutions'],
  },
  finance: {
    title: 'Harch Finance — Green Bonds, Project Finance & Islamic Finance for Africa',
    description: "Harch Finance structures green bonds, project finance, trade finance, and Islamic finance instruments to fund Africa's sovereign infrastructure. $500M green bond program and Sukuk structures for capital mobilization.",
    heroImage: '/images/sections/finance-stock.jpg',
    keywords: ['Harch Finance', 'green bonds Africa', 'Islamic finance infrastructure', 'project finance Africa', 'Sukuk bonds', 'African investment'],
  },
};

const subsidiaryMetaFr: Record<string, {
  title: string;
  description: string;
  heroImage: string;
  keywords: string[];
}> = {
  intelligence: {
    title: 'Harch Intelligence — Cloud GPU Conscient du Carbone & Infrastructure IA Souveraine',
    description: "Harch Intelligence exploite 1 798 GPU optimisés pour le carbone sur 5 hubs au Maroc à ~47 gCO2/kWh — 89 % sous la moyenne du secteur. Calcul IA souverain avec ordonnancement conscient du carbone, pipeline de 500 MW et connectivité directe par câble sous-marin vers l'Europe.",
    heroImage: '/images/sections/intelligence-exterior.jpg',
    keywords: ['Harch Intelligence', 'cloud GPU Afrique', 'ordonnancement GPU conscient du carbone', 'IA souveraine', 'centre de données Maroc', 'HarchOS', 'infrastructure IA Afrique', 'cloud GPU vert'],
  },
  cement: {
    title: 'Harch Cement — 500kT/an de Production de Ciment Vert en Gambie',
    description: "Harch Cement construit l'avenir de l'Afrique de l'Ouest avec 500kT/an de production de ciment verticalement intégrée en Gambie. Formulations de ciment vert, alimenté par l'énergie renouvelable, substitution aux importations pour le boom de la construction.",
    heroImage: '/images/sections/cement-factory.jpg',
    keywords: ['Harch Cement', 'ciment Gambie', 'ciment vert Afrique', 'matériaux de construction Afrique de l\'Ouest', 'ciment LC3', 'fabrication de ciment'],
  },
  energy: {
    title: 'Harch Energy — Pipeline d\'Énergie Renouvelable 2 GW+ à travers l\'Afrique',
    description: "Harch Energy développe un pipeline d'énergie renouvelable de 2 GW+ — solaire, éolien et hydrogène vert — alimentant la souveraineté industrielle de l'Afrique. Référence solaire de 14 $/MWh au Maroc, corridor stratégique d'hydrogène vers l'Europe.",
    heroImage: '/images/sections/energy-wind-farm.jpg',
    keywords: ['Harch Energy', 'énergie renouvelable Afrique', 'énergie solaire Maroc', 'hydrogène vert', 'énergie éolienne Afrique', 'infrastructure énergie propre'],
  },
  technology: {
    title: 'Harch Technology — Infrastructure Numérique Souveraine & Cybersécurité',
    description: "Harch Technology construit une infrastructure numérique souveraine — plateformes de cybersécurité, communications par satellite et réseaux zero-trust protégeant les infrastructures critiques de l'Afrique contre la surveillance étrangère et les cybermenaces.",
    heroImage: '/images/sections/tech-satellite.jpg',
    keywords: ['Harch Technology', 'technologie souveraine Afrique', 'infrastructure cybersécurité', 'communications par satellite', 'sécurité zero-trust', 'souveraineté numérique'],
  },
  mining: {
    title: 'Harch Mining — Traitement Minéral Stratégique & Captation de Valeur en Afrique',
    description: "Harch Mining capture l'ensemble de la chaîne de valeur minérale — de l'extraction au traitement raffiné sur le sol africain. Phosphates, cobalt, terres rares et minéraux stratégiques traités localement, mettant fin à l'exportation de minerai brut.",
    heroImage: '/images/sections/mining-open-pit.jpg',
    keywords: ['Harch Mining', 'traitement minéral Afrique', 'extraction terres rares', 'traitement cobalt', 'extraction phosphate Maroc', 'minéraux stratégiques'],
  },
  agriculture: {
    title: 'Harch Agri — Agriculture de Précision & Agriculture Verticale à travers le Sahel',
    description: "Harch Agri déploie l'agriculture de précision à grande échelle — surveillance IoT, intelligence par drone, agriculture verticale et optimisation de la chaîne d'approvisionnement sur plus de 5 000 hectares au Sénégal et dans la ceinture sahélienne.",
    heroImage: '/images/sections/agri-aerial-drone.jpg',
    keywords: ['Harch Agri', 'agriculture de précision Afrique', 'agriculture verticale Sahel', 'agriculture IoT', 'agriculture par drone', 'agritech Afrique'],
  },
  water: {
    title: 'Harch Water — Dessalement Optimisé par IA & Infrastructure Hydrique',
    description: "Harch Water construit une capacité de dessalement de 200M m³/an avec une distribution optimisée par IA, atteignant une réduction de 23 % des pertes d'eau. Résoudre la crise de l'eau en Afrique grâce à une infrastructure souveraine.",
    heroImage: '/images/sections/water-desal-plant.jpg',
    keywords: ['Harch Water', 'dessalement Afrique', 'gestion de l\'eau par IA', 'infrastructure hydrique', 'usine de dessalement Maroc', 'solutions pénurie d\'eau'],
  },
  finance: {
    title: 'Harch Finance — Obligations Vertes, Financement de Projets & Finance Islamique pour l\'Afrique',
    description: "Harch Finance structure des obligations vertes, du financement de projets, du financement commercial et des instruments de finance islamique pour financer l'infrastructure souveraine de l'Afrique. Programme d'obligations vertes de 500M $ et structures Sukuk pour la mobilisation de capitaux.",
    heroImage: '/images/sections/finance-stock.jpg',
    keywords: ['Harch Finance', 'obligations vertes Afrique', 'finance islamique infrastructure', 'financement de projets Afrique', 'obligations Sukuk', 'investissement africain'],
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const isFr = locale === 'fr';
  const metaMap = isFr ? subsidiaryMetaFr : subsidiaryMetaEn;
  const meta = metaMap[slug];

  if (!meta) {
    return {
      title: isFr ? 'Filiales | Harch Corp' : 'Subsidiaries | Harch Corp',
      description: isFr
        ? "Explorez les 8 verticales industrielles de Harch Corp — centres de données IA, énergie renouvelable, ciment, technologie, mines, agriculture, eau et finance."
        : "Explore Harch Corp's 8 industrial verticals — AI data centers, renewable energy, cement, technology, mining, agriculture, water, and finance.",
    };
  }

  const baseUrl = isFr
    ? `https://www.harchcorp.com/fr/subsidiaries/${slug}`
    : `https://www.harchcorp.com/subsidiaries/${slug}`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'website',
      url: baseUrl,
      siteName: 'Harch Corp',
      locale: isFr ? 'fr_MA' : 'en_US',
      alternateLocale: isFr ? ['en_US'] : ['fr_MA'],
      images: [
        {
          url: meta.heroImage,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [meta.heroImage],
    },
    alternates: {
      canonical: baseUrl,
      languages: {
        en: `https://www.harchcorp.com/subsidiaries/${slug}`,
        fr: `https://www.harchcorp.com/fr/subsidiaries/${slug}`,
        'x-default': `https://www.harchcorp.com/subsidiaries/${slug}`,
      },
    },
  };
}

export function generateStaticParams() {
  return Object.keys(subsidiaryMetaEn).map((slug) => ({ slug }));
}

export default async function SubsidiaryPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const isFr = locale === 'fr';
  const metaMap = isFr ? subsidiaryMetaFr : subsidiaryMetaEn;
  const meta = metaMap[slug];
  const pageTitle = meta?.title || (isFr ? 'Filiales' : 'Subsidiaries');

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isFr ? 'Accueil' : 'Home',
        item: isFr ? 'https://www.harchcorp.com/fr' : 'https://www.harchcorp.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isFr ? 'Filiales' : 'Subsidiaries',
        item: isFr ? 'https://www.harchcorp.com/fr/subsidiaries' : 'https://www.harchcorp.com/subsidiaries',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: pageTitle,
        item: isFr
          ? `https://www.harchcorp.com/fr/subsidiaries/${slug}`
          : `https://www.harchcorp.com/subsidiaries/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <SubsidiaryWrapper />
    </>
  );
}
