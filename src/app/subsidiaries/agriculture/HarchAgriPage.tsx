'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight, Wheat, Droplets, Plane, Radio, Building2, Leaf,
  MapPin, Clock, AlertTriangle, CheckCircle2, Sprout, Sun, CloudRain, BarChart3
} from 'lucide-react';
import { motion, useInView } from 'framer-motion';

/* ═══════════════════════════════════════════════════
   HARCHAGRI — Design System Unifié HarchCorp
   Palette site — Accent vert (#22C55E) — CSS classes partagées
   ═══════════════════════════════════════════════════ */

/* ─── FadeIn — framer-motion, matches HarchOS ─── */
function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }} transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── AnimatedCounter — matches HarchOS ─── */
function AnimatedCounter({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    const duration = 2500;
    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);
  const format = () => {
    if (target >= 1000) return `${prefix}${Math.round(count).toLocaleString()}${suffix}`;
    if (target < 10) return `${prefix}${count.toFixed(1)}${suffix}`;
    return `${prefix}${Math.round(count)}${suffix}`;
  };
  return <span ref={ref}>{format()}</span>;
}

/* ═══════════════════════════════════════════════════
   DATA — Strictement HarchAgri, ZERO référence GPU/hub
   ═══════════════════════════════════════════════════ */

const data = {
  name: 'HarchAgri',
  version: '/0.6',
  heroTitle: "Agriculture de\nprécision pour\nl'Afrique",
  heroSubtitle: "Drones, IoT, fermes verticales et crédits carbone — la seule plateforme AgTech intégrée du continent africain. Conçue pour les réalités agricoles africaines.",
  heroImage: '/images/sections/agri-aerial-drone.jpg',

  overview: "L'Afrique détient 60% des terres arables non cultivées au monde, pourtant importe 50 milliards de dollars de nourriture chaque année. Les rendements céréaliers africains moyennent 1,5 tonnes par hectare contre 4 tonnes globalement. Seulement 6% des terres cultivées sont irriguées contre 37% au niveau mondial. Les pertes post-récolte dépassent 30%. HarchAgri répond à chacune de ces contraintes avec cinq piliers intégrés — Drone-as-a-Service, irrigation IoT, fermes verticales modulaires, crédits carbone agricoles et kit démarrage smallholder — qui se renforcent mutuellement en un effet réseau qu'aucun concurrent mono-produit ne peut répliquer.",

  strategicContext: "L'Afrique détient 60% des terres arables non cultivées au monde — environ 600 millions d'hectares — pourtant le continent reste importateur net de denrées alimentaires, dépensant 50 milliards de dollars annuellement. Les 30 millions d'agriculteurs smallholders qui produisent 70% de la nourriture localement consommée font face à des barrières systémiques : aucun accès au crédit, données météorologiques limitées, chaînes d'approvisionnement fragmentées. Le Plan Vert Maroc (2008-2020) a prouvé que la stratégie nationale fonctionne — le PIB agricole a doublé, les exportations ont triplé, la production céréalière a augmenté de 67%. Generation Green (2020-2030) poursuit cette dynamique avec la technologie et la durabilité au cœur. HarchAgri apporte des solutions intégrées adaptées à chaque contrainte.",

  marketAnalysis: "Le marché agritech africain est valorisé à 35 milliards de dollars et croît rapidement. Le marché se divise en cinq segments : drones agricoles (8,5 Mds$, TCAM 25%), irrigation IoT (3,2 Mds$, TCAM 18%), agriculture verticale (8,5 Mds$ mondial, TCAM 26,8%), crédits carbone (2 Mds$ Afrique, TCAM 30%+), et places de marché agricoles (15 Mds$ Afrique, TCAM 12% — le segment le plus encombré et le plus troublé, comme l'effondrement de Twiga Foods le démontre). HarchAgri cible les quatre segments à plus forte croissance et moins desservis tout en évitant l'espace marketplace commoditisé.",

  sustainability: "La durabilité n'est pas un add-on — c'est le modèle économique d'HarchAgri. Chaque hectare sous irrigation IoT économise 0,5 à 1,5 tonnes de CO2 par an. Chaque ferme verticale évite 2 à 5 tonnes de CO2 versus l'agriculture conventionnelle. Chaque hectare en agriculture régénérative séquestre 1 à 3 tonnes de CO2 dans le sol. L'API Carbone calcule et certifie ces crédits automatiquement via Verra (VCS) et Gold Standard. Les fermes verticales alimentées par énergie renouvelable produisent des légumes certifiés bas-carbone, obtenant des prix premium des hôtels, restaurants et distributeurs cherchant à réduire leurs émissions Scope 3.",

  investment: '250K$',
  metrics: [
    { value: 600, prefix: '', suffix: 'M ha', label: 'Terres arables non cultivées' },
    { value: 30, prefix: '', suffix: 'M', label: 'Agriculteurs smallholders' },
    { value: 50, prefix: '$', suffix: 'B', label: 'Importations alimentaires/an' },
    { value: 30, prefix: '', suffix: '%', label: 'Pertes post-récolte' },
  ],

  products: [
    {
      icon: Plane,
      name: 'HarchAgri Drone',
      tagline: 'Surveillance Drone-as-a-Service',
      price: '50$',
      unit: '/hectare/mois',
      roi: '6-8 mois',
      target: 'Exploitations >5ha',
      description: "Drones autonomes équipés de capteurs multispectraux pour analyse NDVI, détection précoce de maladies 48 heures avant les symptômes visibles, cartographie d'irrigation de précision et prédiction de rendement à 2 semaines. Contrairement aux solutions occidentales qui exigent l'achat d'un drone (15 000$+), HarchAgri opère un modèle DaaS — l'agriculteur paie un abonnement mensuel et HarchAgri gère les vols, le traitement des données et livre des recommandations directement sur son téléphone.",
      features: [
        'Analyse NDVI — détection de stress 48h avant symptômes visibles',
        'Prédiction de rendement 2 semaines à l\'avance, précision 90%+',
        'Modèle DaaS — aucun achat de drone requis',
        '1 drone couvre 40 ha/jour, ROI 150% année 1',
        'Recommandations actionnables envoyées directement sur mobile',
      ],
      stats: [
        { label: 'Couverture/jour', value: '40 ha' },
        { label: 'ROI Année 1', value: '150%' },
        { label: 'Détection avancée', value: '48h' },
      ],
    },
    {
      icon: Radio,
      name: 'HarchAgri IoT',
      tagline: "Réseau d'irrigation intelligent",
      price: '500$',
      unit: '/hectare/an',
      roi: '12-18 mois',
      target: 'Exploitations >2ha',
      description: "Réseaux de capteurs solaires surveillant l'humidité du sol, la température, le pH et les niveaux de nutriments en continu. Données transmises via LoRaWAN (portée 15km) vers des serveurs où l'IA optimise les calendriers d'irrigation basés sur les prévisions météo, le stade de croissance et les quotas d'eau. Réduit la consommation d'eau de 30-50% tout en augmentant les rendements de 15-25%. Modèle pay-as-you-grow : commencez avec un kit de démarrage à 200$ (3 capteurs + passerelle LoRaWAN).",
      features: [
        'Capteurs solaires : humidité, température, pH, NPK',
        'Réseau LoRaWAN — portée 15 km, alimentation solaire',
        'Irrigation IA-optimisée basée sur météo et stade croissance',
        'Intégration API Carbone automatique — économies CO2 calculées',
        'Pay-as-you-grow : kit démarrage à 200$',
      ],
      stats: [
        { label: 'Économie d\'eau', value: '30-50%' },
        { label: 'Augmentation rendement', value: '15-25%' },
        { label: 'Kit démarrage', value: '200$' },
      ],
    },
    {
      icon: Building2,
      name: 'HarchAgri Vertical',
      tagline: 'Fermes verticales modulaires',
      price: '50 000$',
      unit: '/container (500m\u00B2)',
      roi: '12-18 mois',
      target: 'Hôtels, restaurants, retail',
      description: "Container de 20 pieds transformé en ferme verticale hydroponique équivalente à 500m\u00B2 — éclairage LED, circulation hydroponique, capteurs IoT et connectivité cloud inclus. Produit 2 tonnes de légumes/mois (laitue, basilic, menthe, tomates cerises) générant 4 000-6 000$/mois de revenus. Contrairement au modèle aéroponique d'AeroFarms qui a échoué, HarchAgri utilise l'hydroponie abordable adaptée aux marchés africains, ciblant les acheteurs premium et intégrant les revenus de crédits carbone.",
      features: [
        '500m\u00B2 équivalent dans un container de 20 pieds',
        '2 tonnes/mois — herbes, légumes verts, tomates cerises',
        'Connecté cloud pour optimisation climatique temps réel',
        'Génère des crédits carbone vérifiés par container',
        'Énergie renouvelable — production certifiée bas-carbone',
      ],
      stats: [
        { label: 'Revenus/mois', value: '4-6K$' },
        { label: 'Économie d\'eau', value: '95%' },
        { label: 'ROI', value: '12-18mo' },
      ],
    },
    {
      icon: Leaf,
      name: 'HarchAgri Carbone',
      tagline: 'Crédits carbone agricoles',
      price: '2%',
      unit: 'commission sur crédits',
      roi: 'Immédiat',
      target: 'Tous clients HarchAgri',
      description: "Le produit qu'aucun concurrent n'a. L'API Carbone, déjà opérationnelle, calcule, certifie et monétise automatiquement les crédits carbone agricoles. Chaque hectare sous irrigation IoT économise 0,5-1,5 tCO2/an. Chaque ferme verticale évite 2-5 tCO2. Chaque hectare régénératif séquestre 1-3 tCO2. Certifié via Verra (VCS) et Gold Standard. L'initiative ACMI vise 20x la croissance des crédits carbone africains d'ici 2030 — HarchAgri est positionnée pour capturer cette explosion. Modèle de revenus : 2% de commission sur la valeur des crédits, avec 100 000 ha ciblés d'ici 2030 générant 150K-450K$ par an en commissions seules.",
      features: [
        'API Carbone native — déjà opérationnelle, zéro construction',
        'Certification automatique via Verra VCS + Gold Standard',
        'Calcul CO2 temps réel depuis données capteurs IoT',
        'Intégré dans tous les produits HarchAgri par défaut',
        'Aligné ACMI — 20x croissance marché d\'ici 2030',
      ],
      stats: [
        { label: 'Crédits/ha/an', value: '0,5-3 tCO2' },
        { label: 'Cible 2030', value: '100K ha' },
        { label: 'Commission', value: '2%' },
      ],
    },
  ],

  starterKit: {
    price: '200$',
    contents: '3 capteurs sol + passerelle LoRaWAN',
    roi: '3-6 mois',
    target: 'Agriculteurs smallholders',
  },

  competitors: [
    {
      name: 'OCP Group / Al Moutmir',
      country: 'Maroc',
      revenue: '11,4 Mds$ (2025)',
      funding: 'Étatique',
      farmers: '580K+ (40K directs)',
      model: 'Précision + engrais',
      maturity: 'Avancé',
      africa: 'Maroc + 5 pays',
      advantage: 'Complémentaire — HarchAgri apporte drones + IoT + carbone pour leur écosystème de 580K agriculteurs',
      weakness: 'Innovation lente, culture non-startup',
    },
    {
      name: 'Twiga Foods',
      country: 'Kenya',
      revenue: 'En déclin',
      funding: '145,65M$ (12 tours)',
      farmers: 'Indirects',
      model: 'Marketplace B2B',
      maturity: 'Crise — restructuration',
      africa: 'Kenya uniquement',
      advantage: 'Cas d\'école — nous évitons le modèle marketplace intensif en capital',
      weakness: 'Sur-expansion, non rentable, 300+ licenciements, ops suspendues',
    },
    {
      name: 'Apollo Agriculture',
      country: 'Kenya',
      revenue: 'Non public',
      funding: '50M$+ (Série B)',
      farmers: '350K+',
      model: 'Crédit ML + intrants',
      maturity: 'Croissance',
      africa: 'Kenya + Zambie',
      advantage: 'Modèle intégration crédit — les données IoT HarchAgri réduisent le risque de défaut de 40%',
      weakness: 'Dépendant FX, produit unique (crédit)',
    },
    {
      name: 'AeroFarms',
      country: 'USA',
      revenue: 'Post-faillite',
      funding: '100M$+ (pré-BK)',
      farmers: 'N/A (retail B2C)',
      model: 'Microgreens aéroponiques',
      maturity: 'Pivot post-échec',
      africa: 'Aucune',
      advantage: 'Preuve que l\'agriculture verticale fonctionne uniquement avec un modèle focalisé + retail premium',
      weakness: 'Aéroponie intensive en capital, aucune présence Afrique',
    },
    {
      name: 'Climate Corp / FieldView',
      country: 'USA (Bayer)',
      revenue: '50 Mds$+ (Bayer total)',
      funding: '930M$ acquisition',
      farmers: '250M acres, 23 pays',
      model: 'Assurance + plateforme data',
      maturity: 'Mature',
      africa: 'Indirect uniquement',
      advantage: 'Modèle de data moat — HarchAgri construit un data moat agricole pour l\'Afrique',
      weakness: 'Non présent en Afrique, nécessite des volumes de données massifs',
    },
  ],

  pricing: [
    { product: 'HarchAgri Drone', price: '50$/ha/mois', unit: 'Abonnement DaaS', roi: '6-8 mois', target: 'Exploitations >5ha' },
    { product: 'HarchAgri IoT', price: '500$/ha/an', unit: 'Abonnement annuel', roi: '12-18 mois', target: 'Exploitations >2ha' },
    { product: 'HarchAgri Vertical', price: '50 000$/container', unit: 'Module 500m\u00B2', roi: '12-18 mois', target: 'Hôtels, restaurants, retail' },
    { product: 'HarchAgri Carbone', price: '2% commission', unit: 'Sur crédits carbone', roi: 'Immédiat', target: 'Tous clients HarchAgri' },
    { product: 'Kit Démarrage', price: '200$', unit: '3 capteurs + LoRaWAN', roi: '3-6 mois', target: 'Agriculteurs smallholders' },
  ],

  partners: [
    { name: 'Plan Vert Maroc', type: 'Gouvernement', country: 'Maroc', priority: 'P1 — Critique', harchContribution: 'Tech agriculture', partnerContribution: 'Subventions, labels, cadre réglementaire', status: 'Actif' as const },
    { name: 'OCP / Al Moutmir', type: 'Stratégique', country: 'Maroc', priority: 'P1 — Critique', harchContribution: 'Drones + IoT + API Carbone', partnerContribution: 'Écosystème 580K agriculteurs, agronomie, distribution', status: 'Actif' as const },
    { name: 'FAO Maroc', type: 'Institutionnel', country: 'Maroc', priority: 'P1 — Critique', harchContribution: 'API Carbone + plateforme data', partnerContribution: 'Standards certification, crédibilité internationale', status: 'En négociation' as const },
    { name: 'ISRA Sénégal', type: 'Recherche', country: 'Sénégal', priority: 'P2 — Important', harchContribution: 'Transfert technologique', partnerContribution: 'R&D, adaptation locale, réseaux agriculteurs', status: 'Prospect' as const },
    { name: 'AgriTech Kenya', type: 'Écosystème', country: 'Kenya', priority: 'P2 — Important', harchContribution: 'Plateforme + data', partnerContribution: 'Entrée marché, écosystème mature', status: 'Prospect' as const },
    { name: 'Ghana MoFA', type: 'Gouvernement', country: 'Ghana', priority: 'P3 — Futur', harchContribution: 'Solutions IoT', partnerContribution: 'Programme Planting for Food and Jobs', status: 'Prospect' as const },
  ],

  roadmap: [
    {
      phase: 'Phase 1', period: '2026', title: 'Preuve de concept',
      hectares: 100, farmers: 50, revenue: '0,1M$',
      funding: 'Auto-financé (250K$)',
      actions: [
        'Déployer 2 drones DJI Agras sur 5 sites pilotes',
        'Installer 30 capteurs IoT sur 5 parcelles pilotes',
        'Recruter 3 agronomes pour les opérations terrain',
        'Intégrer l\'API Carbone pour le calcul automatique CO2',
        'Déployer 5 containers fermes verticales (1 par site)',
        'Obtenir la certification Verra pour la méthodologie carbone',
        'Mesurer l\'impact : NPS > 70, ROI > 100%',
      ],
    },
    {
      phase: 'Phase 2', period: '2027-2028', title: 'Scale au Maroc',
      hectares: 5000, farmers: 1000, revenue: '2,5M$ ARR',
      funding: 'Série A (3-5M$)',
      actions: [
        'Passer à 1 000 agriculteurs et 5 000 hectares au Maroc',
        'Exploiter le partenariat OCP/Al Moutmir pour l\'accès 580K agriculteurs',
        'Étendre les fermes verticales de 5 à 25 unités',
        'Lancer HarchAgri Marketplace v1 pour l\'accès marché urbain',
        'Atteindre le break-even opérationnel fin 2028',
        'Sécuriser les subventions gouvernementales via certification Plan Vert',
      ],
    },
    {
      phase: 'Phase 3', period: '2028-2029', title: 'Expansion africaine',
      hectares: 25000, farmers: 5000, revenue: '10M$ ARR',
      funding: 'Série B (15-20M$)',
      actions: [
        'Expansion vers Sénégal (partenariat ISRA), Kenya (écosystème AgriTech), Ghana (MoFA/PFJ)',
        'Même playbook : 5 pilotes par pays, mesurer, puis scaler',
        '4 pays, 5 000 agriculteurs, 25 000 hectares sous gestion',
        'Investisseurs ciblés : CDC, Swedfund, IFC — DFI axés Afrique',
        'Lancer assurance récolte indexée (inspirée Climate Corp, adaptée Afrique)',
      ],
    },
    {
      phase: 'Phase 4', period: '2029-2031', title: 'Leadership continental',
      hectares: 100000, farmers: 50000, revenue: '50M$ ARR',
      funding: 'Pre-IPO / Stratégique',
      actions: [
        '50 000 agriculteurs, 100 000 hectares, 10 pays',
        'Plateforme complète : drones + IoT + vertical + carbone + marketplace + assurance',
        'HarchAgri devient la plateforme de référence agriculture de précision en Afrique',
        'Cycle vertueux : plus de données améliore les modèles IA, plus de crédits carbone attire les investisseurs ESG',
        'Positionnement pour IPO ou acquisition stratégique',
      ],
    },
  ],

  moats: [
    {
      title: 'Modèle DaaS — Zéro investissement initial',
      desc: "Contrairement aux concurrents occidentaux qui exigent l'achat d'un drone à 15 000$+, HarchAgri opère un modèle Drone-as-a-Service. L'agriculteur paie un abonnement mensuel et HarchAgri gère tout. Cette approche élimine la barrière à l'entrée la plus critique pour les agriculteurs africains : le coût initial du matériel.",
      icon: Sprout,
    },
    {
      title: 'Écosystème intégré — Effet réseau',
      desc: "Quatre produits qui se renforcent mutuellement : les drones génèrent des données qui améliorent l'irrigation IoT, qui produit des crédits carbone, qui rendent les fermes verticales plus rentables. Chaque produit ajouté augmente la valeur de l'ensemble. Aucun concurrent mono-produit ne peut répliquer cet effet réseau.",
      icon: Wheat,
    },
    {
      title: 'API Carbone native — Revenu carbone intégré',
      desc: "Déjà opérationnelle. Aucun concurrent agritech africain ne peut calculer, certifier et monétiser les crédits carbone agricoles en temps réel. Cela transforme chaque hectare sous gestion en flux de revenus additionnel, rendant l'offre HarchAgri économiquement irrésistible pour les agriculteurs. L'API Carbone est le tissu conjonctif reliant les quatre produits en écosystème cohérent.",
      icon: Leaf,
    },
  ],

  risks: [
    { risk: 'Sur-expansion (erreur Twiga)', probability: 'Moyen', impact: 'Critique', mitigation: 'Lean startup : valider avant scaler. Seuil de 100 agriculteurs payants avant expansion.' },
    { risk: 'Échec ferme verticale (erreur AeroFarms)', probability: 'Moyen', impact: 'Élevé', mitigation: 'Commencer par DaaS/IoT (faible capex). Fermes verticales uniquement en Phase 2 après preuve de concept.' },
    { risk: 'Baissé financement agritech', probability: 'Élevé', impact: 'Moyen', mitigation: 'Auto-financé dès le jour 1. Break-even en Phase 2. Crédits carbone = revenu récurrent.' },
    { risk: 'Barrière adoption tech agriculteurs', probability: 'Élevé', impact: 'Critique', mitigation: 'UX mobile-first. Partenariat OCP pour la confiance. Kit démarrage 200$ élimine la barrière prix.' },
    { risk: 'Réglementation crédits carbone', probability: 'Faible', impact: 'Moyen', mitigation: 'Certification Verra en Phase 1. Partenariat FAO pour la légitimité.' },
    { risk: 'OCP entre sur le marché drone', probability: 'Faible', impact: 'Élevé', mitigation: 'Partenariat plutôt que compétition. OCP manque de culture startup tech.' },
  ],

  locations: [
    { city: 'Casablanca', region: 'Centre-ouest', crops: 'Maraîchage, céréaliculture' },
    { city: 'Marrakech', region: 'Sud', crops: 'Agrumes, oliviers, maraîchage' },
    { city: 'Tanger', region: 'Nord', crops: 'Céréaliculture, élevage' },
    { city: 'Rabat', region: 'Nord-ouest', crops: 'Maraîchage, arboriculture' },
    { city: 'Agadir', region: 'Sud-ouest', crops: 'Agrumes, tomates, arganier' },
  ],
};

/* ═══════════════════════════════════════════════════
   MAIN PAGE — HarchCorp unified design, green accent
   ═══════════════════════════════════════════════════ */
export default function HarchAgriPage() {
  return (
    <div className="bg-[#1A1A1A] text-white">
      {/* ═══════════════════════════════════════════
          HERO — Full-screen immersive
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <Image
          src={data.heroImage}
          alt="HarchAgri — Agriculture de précision"
          fill
          className="object-cover"
          priority
          style={{ filter: 'brightness(0.35) contrast(1.1) saturate(0.5)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/60 via-transparent to-transparent" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pb-20 md:pb-32 w-full">
          <FadeIn>
            <p className="section-label mb-4 text-[#22C55E]">HarchAgri /0.6</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-[96px] font-extrabold text-white leading-[0.95] tracking-[-0.03em] mb-6 whitespace-pre-line">
              {data.heroTitle}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-[#CCCCCC] max-w-2xl leading-relaxed mb-4">{data.heroSubtitle}</p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-10 flex flex-wrap gap-8 md:gap-12">
              {data.metrics.map((m) => (
                <div key={m.label}>
                  <p className="text-2xl md:text-3xl font-bold text-white stat-mono">
                    <AnimatedCounter target={m.value} prefix={m.prefix} suffix={m.suffix} />
                  </p>
                  <p className="text-[10px] text-[#666666] uppercase tracking-[0.1em] font-bold mt-1 font-[family-name:var(--font-space-mono)]">{m.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          OVERVIEW
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <div>
                <p className="section-label mb-4 text-[#22C55E]">Vue d&apos;ensemble</p>
                <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
                  Le défi agricole africain
                </h2>
                <div className="accent-line mb-6" />
                <p className="text-[15px] text-[#999999] leading-[1.7]">{data.overview}</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                {data.metrics.map((m) => (
                  <div key={m.label} className="card p-6">
                    <p className="text-2xl md:text-3xl font-bold text-[#22C55E] stat-mono">
                      <AnimatedCounter target={m.value} prefix={m.prefix} suffix={m.suffix} />
                    </p>
                    <p className="text-[10px] text-[#666666] uppercase tracking-[0.1em] font-bold mt-2 font-[family-name:var(--font-space-mono)]">{m.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CONTEXTE STRATÉGIQUE — Photo + Texte
          ═══════════════════════════════════════════ */}
      <section className="bg-[#1A1A1A]">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative min-h-[45vh] lg:min-h-0 overflow-hidden">
              <Image
                src="/images/sections/agri-drone-field.jpg"
                alt="Drone agricole HarchAgri"
                fill
                className="object-cover industrial-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1A1A1A]/40 lg:bg-gradient-to-l lg:from-transparent lg:to-[#1A1A1A]" />
            </div>
            <div className="flex items-center px-8 md:px-16 py-20">
              <div className="max-w-lg">
                <FadeIn>
                  <p className="section-label mb-4 text-[#22C55E]">Contexte stratégique</p>
                  <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
                    Pourquoi ça compte
                  </h2>
                  <div className="accent-line mb-6" />
                  <p className="text-[15px] text-[#999999] leading-[1.7]">{data.strategicContext}</p>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ANALYSE MARCHÉ — Tableau
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#22C55E]">Analyse marché</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">Cinq segments, une plateforme</h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-12">Le marché agritech africain se divise en cinq segments. HarchAgri cible les quatre à plus forte croissance et moins desservis — évitant l&apos;espace marketplace commoditisé.</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Segment</th>
                      <th>Taille marché</th>
                      <th>TCAM</th>
                      <th>Maturité Afrique</th>
                      <th>Opportunité</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { segment: 'Drones agricoles', size: '8,5 Mds$', cagr: '25%', maturity: 'Naissant', opportunity: 'Très forte', strong: true },
                      { segment: 'Irrigation IoT', size: '3,2 Mds$', cagr: '18%', maturity: 'Faible', opportunity: 'Forte', strong: true },
                      { segment: 'Agriculture verticale', size: '8,5 Mds$ mondial', cagr: '26,8%', maturity: 'Inexistant', opportunity: 'Moyenne', strong: false },
                      { segment: 'Crédits carbone', size: '2 Mds$ Afrique', cagr: '30%+', maturity: 'Émergent', opportunity: 'Très forte', strong: true },
                      { segment: 'Marketplace', size: '15 Mds$ Afrique', cagr: '12%', maturity: 'Encombré', opportunity: 'Faible (éviter)', strong: false },
                    ].map((row) => (
                      <tr key={row.segment}>
                        <td>{row.segment}</td>
                        <td>{row.size}</td>
                        <td className="font-[family-name:var(--font-space-mono)]">{row.cagr}</td>
                        <td className="!text-[#666666] !font-normal">{row.maturity}</td>
                        <td className={row.strong ? '!text-[#22C55E] !font-semibold' : '!text-[#666666] !font-normal'}>{row.opportunity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-3 border-t border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.01)]">
                <p className="text-[10px] text-[#666666]">Sources : Briter Intelligence 2025, ACMI, Grand View Research. ACMI vise 20x la croissance des crédits carbone africains d&apos;ici 2030.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PRODUITS — Les 5 piliers
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#22C55E]">Produits</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
              Cinq piliers intégrés
            </h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-16">
              Chaque produit fonctionne seul ou en synergie complète. Ensemble, ils créent un effet réseau qu&apos;aucun concurrent mono-produit ne peut répliquer.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {data.products.map((product, i) => {
              const Icon = product.icon;
              return (
                <FadeIn key={product.name} delay={i * 0.08}>
                  <div className="card p-8 h-full">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[rgba(34,197,94,0.08)] flex items-center justify-center">
                          <Icon size={18} className="text-[#22C55E]" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{product.name}</h3>
                          <p className="text-[11px] text-[#666666]">{product.tagline}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-[#22C55E] stat-mono">{product.price}</p>
                        <p className="text-[10px] text-[#666666]">{product.unit}</p>
                      </div>
                    </div>
                    {/* Description */}
                    <p className="text-[14px] text-[#999999] leading-[1.7] mb-6">{product.description}</p>
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {product.stats.map((stat, j) => (
                        <div key={j} className="text-center p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
                          <p className="text-sm font-bold text-white stat-mono">{stat.value}</p>
                          <p className="text-[9px] text-[#666666] uppercase tracking-wider mt-1">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {product.features.map((feature, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <div className="mt-1.5 w-1 h-1 rounded-full bg-[#22C55E]/40 flex-shrink-0" />
                          <span className="text-[12px] text-[#999999]">{feature}</span>
                        </div>
                      ))}
                    </div>
                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-[rgba(255,255,255,0.04)]">
                      <div className="flex items-center gap-1.5">
                        <Clock size={10} className="text-[#666666]" />
                        <span className="text-[10px] text-[#666666]">ROI : {product.roi}</span>
                      </div>
                      <span className="text-[10px] text-[#666666]">{product.target}</span>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* Kit Démarrage */}
          <FadeIn delay={0.4}>
            <div className="mt-6 card p-8 border-dashed" style={{ borderColor: 'rgba(34,197,94,0.25)' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(34,197,94,0.08)] flex items-center justify-center">
                    <Sprout size={18} className="text-[#22C55E]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Kit Démarrage</h3>
                    <p className="text-[12px] text-[#999999]">{data.starterKit.contents}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#22C55E] stat-mono">{data.starterKit.price}</p>
                  <p className="text-[10px] text-[#666666]">ROI : {data.starterKit.roi}</p>
                </div>
              </div>
              <p className="text-[12px] text-[#666666] mt-3">Pour {data.starterKit.target} — élimine la barrière prix à l&apos;adoption technologique.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TARIFICATION
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#22C55E]">Tarification</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">Tarifs transparents</h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-12">Prix simples et transparents, conçus pour les économies agricoles africaines. Pas de frais cachés. Revenus crédits carbone inclus par défaut.</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Produit</th>
                      <th>Prix</th>
                      <th>Unité</th>
                      <th>ROI</th>
                      <th>Cible</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.pricing.map((row) => (
                      <tr key={row.product}>
                        <td>{row.product}</td>
                        <td className="!text-[#22C55E] font-[family-name:var(--font-space-mono)]">{row.price}</td>
                        <td className="!text-[#666666] !font-normal">{row.unit}</td>
                        <td>{row.roi}</td>
                        <td className="!text-[#666666] !font-normal">{row.target}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PHOTO BREAK — Fermes verticales
          ═══════════════════════════════════════════ */}
      <section className="photo-section">
        <Image
          src="/images/sections/agri-vertical-farm.jpg"
          alt="Ferme verticale HarchAgri"
          fill
          className="object-cover"
          style={{ filter: 'brightness(0.35) contrast(1.1) saturate(0.5)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-transparent to-[#1A1A1A]" />
      </section>

      {/* ═══════════════════════════════════════════
          ANALYSE CONCURRENTIELLE
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#22C55E]">Analyse concurrentielle</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
              HarchAgri vs. le terrain
            </h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-16">
              Cinq concurrents, cinq points d&apos;entrée marché. Aucun n&apos;a intégré crédits carbone + irrigation IoT + drones + fermes verticales sur le continent africain.
            </p>
          </FadeIn>
          <div className="space-y-4">
            {data.competitors.map((comp, i) => (
              <FadeIn key={comp.name} delay={i * 0.06}>
                <div className="card p-6">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                    <div className="md:col-span-3">
                      <h3 className="font-bold text-white text-[15px]">{comp.name}</h3>
                      <p className="text-[11px] text-[#666666]">{comp.country} · {comp.maturity}</p>
                      <p className="text-[11px] text-[#999999] mt-1">{comp.model}</p>
                    </div>
                    <div className="md:col-span-3 grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-[9px] text-[#666666] uppercase tracking-wider">Revenus</p>
                        <p className="text-[13px] text-white stat-mono">{comp.revenue}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-[#666666] uppercase tracking-wider">Financement</p>
                        <p className="text-[13px] text-white stat-mono">{comp.funding}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-[#666666] uppercase tracking-wider">Agriculteurs</p>
                        <p className="text-[13px] text-white">{comp.farmers}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-[#666666] uppercase tracking-wider">Afrique</p>
                        <p className="text-[13px] text-white">{comp.africa}</p>
                      </div>
                    </div>
                    <div className="md:col-span-4">
                      <p className="text-[9px] text-[#666666] uppercase tracking-wider mb-1">Avantage HarchAgri</p>
                      <p className="text-[12px] text-[#999999] leading-relaxed">{comp.advantage}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-[9px] text-[#666666] uppercase tracking-wider mb-1">Faiblesse clé</p>
                      <p className="text-[12px] text-[#999999] leading-relaxed">{comp.weakness}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Highlight HarchAgri */}
          <FadeIn delay={0.4}>
            <div className="mt-6 card p-8" style={{ borderColor: 'rgba(34,197,94,0.2)' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[rgba(34,197,94,0.08)] flex items-center justify-center">
                  <span className="text-[10px] font-bold tracking-[0.15em] text-[#22C55E] font-[family-name:var(--font-space-mono)]">/0.6</span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">HarchAgri</h4>
                  <p className="text-[11px] text-[#666666]">La seule plateforme AgTech intégrée avec crédits carbone natifs en Afrique</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-[10px] text-[#666666] uppercase tracking-wider">Modèle</p>
                  <p className="text-[14px] text-white font-semibold">SaaS + Hardware + Carbone</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#666666] uppercase tracking-wider">Différenciateur</p>
                  <p className="text-[14px] text-white font-semibold">Seul AgTech + Carbone intégré</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#666666] uppercase tracking-wider">Présence Afrique</p>
                  <p className="text-[14px] text-white font-semibold">5 sites opérationnels (Maroc)</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#666666] uppercase tracking-wider">Cible 2031</p>
                  <p className="text-[14px] text-[#22C55E] font-semibold stat-mono">50K agriculteurs / 50M$ ARR</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MOAT CONCURRENTIEL
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#22C55E]">Avantage concurrentiel</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
              Trois avantages irréplicables
            </h2>
            <div className="accent-line mb-12" />
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {data.moats.map((moat, i) => {
              const Icon = moat.icon;
              return (
                <FadeIn key={moat.title} delay={i * 0.1}>
                  <div className="card p-8 h-full">
                    <div className="w-10 h-10 rounded-lg bg-[rgba(34,197,94,0.08)] flex items-center justify-center mb-5">
                      <Icon size={18} className="text-[#22C55E]" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{moat.title}</h3>
                    <div className="accent-line mb-4" />
                    <p className="text-[14px] text-[#999999] leading-[1.7]">{moat.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          DURABILITÉ & ESG
          ═══════════════════════════════════════════ */}
      <section className="bg-[#1A1A1A]">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex items-center px-8 md:px-16 py-20 order-2 lg:order-1">
              <div className="max-w-lg">
                <FadeIn>
                  <p className="section-label mb-4 text-[#22C55E]">Durabilité &amp; ESG</p>
                  <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
                    La durabilité est le modèle économique
                  </h2>
                  <div className="accent-line mb-6" />
                  <p className="text-[15px] text-[#999999] leading-[1.7]">{data.sustainability}</p>
                </FadeIn>
              </div>
            </div>
            <div className="relative min-h-[45vh] lg:min-h-0 overflow-hidden order-1 lg:order-2">
              <Image
                src="/images/sections/agri-green-crops-aerial.jpg"
                alt="Agriculture durable HarchAgri"
                fill
                className="object-cover industrial-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#1A1A1A]/40 lg:bg-gradient-to-r lg:from-transparent lg:to-[#1A1A1A]" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PARTENARIATS
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#22C55E]">Partenariats</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">
              Partenaires stratégiques
            </h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-16">
              Partenariats sélectifs et symbiotiques — chaque partenaire apporte une compétence qu&apos;HarchAgri n&apos;a pas ; HarchAgri apporte la technologie et les crédits carbone qu&apos;ils n&apos;ont pas.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.partners.map((partner, i) => (
              <FadeIn key={partner.name} delay={i * 0.08}>
                <div className="card p-6 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-[13px] text-white">{partner.name}</h4>
                      <p className="text-[10px] text-[#666666]">{partner.type} — {partner.country}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-semibold ${
                      partner.status === 'Actif' ? 'bg-[rgba(34,197,94,0.08)] text-[#22C55E]' : 'bg-[rgba(255,255,255,0.04)] text-[#666666]'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${partner.status === 'Actif' ? 'bg-[#22C55E]' : 'bg-[#666666]'}`} />
                      {partner.status}
                    </span>
                  </div>
                  <div className="mb-3">
                    <p className="text-[9px] text-[#666666] uppercase tracking-wider mb-0.5">Nous apportons</p>
                    <p className="text-[11px] text-white">{partner.harchContribution}</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-[9px] text-[#666666] uppercase tracking-wider mb-0.5">Ils apportent</p>
                    <p className="text-[11px] text-[#999999]">{partner.partnerContribution}</p>
                  </div>
                  <div className="pt-3 border-t border-[rgba(255,255,255,0.04)]">
                    <span className="text-[9px] text-[#666666] uppercase tracking-wider font-[family-name:var(--font-space-mono)]">{partner.priority}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ROADMAP
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#22C55E]">Roadmap</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">Quatre phases vers le leadership continental</h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-16">Philosophie lean startup : valider avec un MVP avant de scaler. Éviter l&apos;erreur fatale de Twiga Foods — sur-investir avant de prouver le modèle.</p>
          </FadeIn>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[11px] md:left-[15px] top-0 bottom-0 w-px bg-[rgba(255,255,255,0.06)]" />

            <div className="space-y-10">
              {data.roadmap.map((phase, i) => (
                <FadeIn key={phase.phase} delay={i * 0.1}>
                  <div className="relative pl-10 md:pl-14">
                    {/* Dot */}
                    <div className="absolute left-0 md:left-1 top-1 w-[23px] md:w-[31px] h-[23px] md:h-[31px] rounded-full border-2 border-[rgba(255,255,255,0.06)] bg-[#1E1E1E] flex items-center justify-center">
                      <div className="w-[7px] h-[7px] rounded-full bg-[#22C55E]" />
                    </div>

                    <div className="card p-8">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-3">
                          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#666666] font-[family-name:var(--font-space-mono)]">{phase.phase}</span>
                          <h3 className="text-xl font-bold text-white mt-1">{phase.title}</h3>
                          <p className="text-[12px] text-[#666666] mt-1">{phase.period}</p>
                          <p className="text-[11px] text-[#666666] mt-0.5">{phase.funding}</p>
                        </div>
                        <div className="md:col-span-3 grid grid-cols-3 gap-2">
                          <div className="text-center p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
                            <p className="text-lg font-bold text-[#22C55E] stat-mono">
                              <AnimatedCounter target={phase.hectares} />
                            </p>
                            <p className="text-[9px] text-[#666666] uppercase tracking-wider">Hectares</p>
                          </div>
                          <div className="text-center p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
                            <p className="text-lg font-bold text-[#22C55E] stat-mono">
                              <AnimatedCounter target={phase.farmers} />
                            </p>
                            <p className="text-[9px] text-[#666666] uppercase tracking-wider">Agriculteurs</p>
                          </div>
                          <div className="text-center p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
                            <p className="text-sm font-bold text-white stat-mono">{phase.revenue}</p>
                            <p className="text-[9px] text-[#666666] uppercase tracking-wider">Revenus</p>
                          </div>
                        </div>
                        <div className="md:col-span-6">
                          <div className="space-y-2">
                            {phase.actions.map((action, j) => (
                              <div key={j} className="flex items-start gap-2">
                                <div className="mt-1.5 w-1 h-1 rounded-full bg-[#22C55E]/40 flex-shrink-0" />
                                <span className="text-[12px] text-[#999999] leading-relaxed">{action}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          RISQUES
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#22C55E]">Analyse des risques</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">Risques identifiés &amp; atténuations</h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-12">La prudence n&apos;est pas une option — c&apos;est une nécessité. Les échecs de Twiga Foods, AeroFarms et l&apos;environnement volatil du financement agritech en 2025 nous l&apos;enseignent.</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Risque</th>
                      <th>Probabilité</th>
                      <th>Impact</th>
                      <th>Atténuation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.risks.map((r) => (
                      <tr key={r.risk}>
                        <td>{r.risk}</td>
                        <td>
                          <span className={`inline-flex items-center gap-1.5 text-[11px] ${
                            r.probability === 'Élevé' ? 'text-[#22C55E]' : r.probability === 'Moyen' ? 'text-[#999999]' : 'text-[#666666]'
                          }`}>
                            {r.probability === 'Élevé' && <AlertTriangle size={10} />}
                            {r.probability}
                          </span>
                        </td>
                        <td>
                          <span className={`text-[11px] ${
                            r.impact === 'Critique' ? 'text-white font-semibold' : r.impact === 'Élevé' ? 'text-[#999999]' : 'text-[#666666]'
                          }`}>
                            {r.impact}
                          </span>
                        </td>
                        <td className="!text-[#999999] !font-normal max-w-md text-[12px]">{r.mitigation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          IMPLANTATIONS
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#22C55E]">Implantations</p>
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-4">Cinq sites au Maroc</h2>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[15px] text-[#999999] leading-[1.7] mb-12">
              Chaque site couvre un rayon de 100km pour les opérations drone et IoT. La stratégie Generation Green (2020-2030) du Maroc offre le soutien institutionnel, le programme Al Moutmir d&apos;OCP apporte un écosystème de 580K agriculteurs. Expansion vers le Sénégal, le Kenya et le Ghana en Phase 3.
            </p>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {data.locations.map((loc, i) => (
              <FadeIn key={loc.city} delay={i * 0.06}>
                <div className="card p-5 text-center">
                  <MapPin size={14} className="text-[#22C55E] mx-auto mb-2" />
                  <p className="text-[13px] font-semibold text-white">{loc.city}</p>
                  <p className="text-[10px] text-[#666666] mt-0.5">{loc.region}</p>
                  <p className="text-[9px] text-[#999999] mt-1">{loc.crops}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          INVESTISSEMENT — Photo + CTA
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <Image
          src="/images/sections/agri-iot-sensor.jpg"
          alt="Capteurs IoT HarchAgri"
          fill
          className="object-cover"
          style={{ filter: 'brightness(0.25) contrast(1.1) saturate(0.5)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/80 via-[#1A1A1A]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-20 w-full">
          <FadeIn>
            <p className="section-label mb-4 text-[#22C55E]">Investissement Phase 1</p>
            <h2 className="text-5xl md:text-7xl lg:text-[96px] font-extrabold text-white leading-[0.95] tracking-[-0.03em] mb-4">
              {data.investment}
            </h2>
            <p className="text-[15px] text-[#999999] max-w-lg leading-[1.7]">Auto-financé pour prouver le modèle avant de lever. Break-even opérationnel prévu fin Phase 2.</p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA
          ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 bg-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl lg:text-[48px] font-bold text-white tracking-[-0.01em] mb-6">Construisons ensemble</h2>
            <p className="max-w-xl mx-auto text-[15px] text-[#666666] leading-[1.7] mb-12">Demandes de partenariat, investissement et programmes pilotes. HarchAgri cherche des agriculteurs, gouvernements et investisseurs qui partagent notre vision de la souveraineté agricole africaine.</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2.5 bg-white text-black px-8 py-4 rounded-lg text-sm font-semibold border border-white/15 hover:bg-white/90 transition-all">
                Démarrer <ArrowRight size={14} />
              </Link>
              <Link href="/investors" className="inline-flex items-center gap-2.5 border border-[rgba(255,255,255,0.12)] text-white px-8 py-4 rounded-lg text-sm font-semibold hover:border-white/25 hover:bg-white/[0.03] transition-all">
                Détails investisseurs
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
