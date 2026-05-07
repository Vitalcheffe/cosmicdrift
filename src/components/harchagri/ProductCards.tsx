'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

interface Product {
  id: string
  icon: string
  name: string
  tagline: string
  price: string
  unit: string
  description: string
  features: string[]
  color: string
  gradient: string
  stats: { label: string; value: string }[]
}

const products: Product[] = [
  {
    id: 'drone',
    icon: '🛸',
    name: 'HarchAgri Drone',
    tagline: 'Surveillance Aérienne Intelligente',
    price: '$15,000',
    unit: '/unité',
    description: 'Drones autonomes équipés de capteurs multispectraux, caméras thermiques et IA embarquée pour la détection précoce de maladies, l\'analyse de vigueur des cultures et la cartographie de précision à haute résolution.',
    features: [
      'Capteurs multispectraux 5 bandes (RGB + NIR + Red Edge)',
      'Autonomie 45 min — couverture 200 ha/vol',
      'IA embarquée: détection maladies en temps réel',
      'Cartographie NDVI haute résolution (2cm/pixel)',
      'Intégration HarchOS pour orchestration GPU',
    ],
    color: '#22c55e',
    gradient: 'from-green-500/20 via-green-900/10 to-transparent',
    stats: [
      { label: 'Précision', value: '97.3%' },
      { label: 'Couverture/jour', value: '800 ha' },
      { label: 'ROI', value: '3.2x' },
    ],
  },
  {
    id: 'iot',
    icon: '📡',
    name: 'HarchAgri IoT',
    tagline: 'Réseau de Capteurs Intelligent',
    price: '$500',
    unit: '/hectare/an',
    description: 'Réseau maillé de capteurs IoT déployés sur l\'ensemble du territoire agricole. Mesure continue du sol, de l\'humidité, de la température, du pH et des nutriments avec transmission LoRaWAN et analyse en temps réel via notre plateforme cloud.',
    features: [
      'Capteurs sol: humidité, température, pH, NPK',
      'Réseau LoRaWAN — portée 15 km',
      'Batterie solaire — autonomie 5 ans',
      'Alertes intelligentes par seuils adaptatifs',
      'API ouverte + SDK Python/Node.js',
    ],
    color: '#06b6d4',
    gradient: 'from-cyan-500/20 via-cyan-900/10 to-transparent',
    stats: [
      { label: 'Capteurs', value: '11,800+' },
      { label: 'Précision sol', value: '±2%' },
      { label: 'Économie eau', value: '35%' },
    ],
  },
  {
    id: 'vertical',
    icon: '🏢',
    name: 'HarchAgri Vertical',
    tagline: 'Fermes Verticales Automatisées',
    price: '$50,000',
    unit: '/module',
    description: 'Modules de culture verticale clé-en-main avec automation complète: éclairage LED spectralement optimisé, irrigation par nutriments en circuit fermé, contrôle climatique IA et monitoring 24/7. Production 365 jours/an, 95% moins d\'eau.',
    features: [
      'LED spectralement optimisée — 40% moins d\'énergie',
      'Hydroponie en circuit fermé — 95% moins d\'eau',
      'Contrôle climatique IA — température ±0.5°C',
      'Production 10x supérieure au sol/m2',
      'Monitoring vidéo + capteurs 24/7',
    ],
    color: '#10b981',
    gradient: 'from-emerald-500/20 via-emerald-900/10 to-transparent',
    stats: [
      { label: 'Rendement/m2', value: '10x' },
      { label: 'Économie eau', value: '95%' },
      { label: 'Jours/an', value: '365' },
    ],
  },
  {
    id: 'carbon',
    icon: '🌱',
    name: 'HarchAgri Carbon',
    tagline: 'Crédits Carbone Agricoles',
    price: '2%',
    unit: 'du revenu carbone',
    description: 'Plateforme de tokenisation et monétisation des crédits carbone agricoles. Mesure, vérification et trading automatisé des crédits de séquestration carbone grâce à notre blockchain propriétaire et nos capteurs IoT certifiés.',
    features: [
      'Mesure carbone par capteurs IoT certifiés',
      'Tokenisation blockchain — traçabilité complète',
      'Marketplace intégré — vente directe acheteurs',
      'Vérification tiers par auditeires certifiés',
      'Rapports automatiques conformes ISO 14064',
    ],
    color: '#f59e0b',
    gradient: 'from-amber-500/20 via-amber-900/10 to-transparent',
    stats: [
      { label: 'Crédits/an', value: '2,350 tCO2' },
      { label: 'Revenu moyen', value: '$47/ha' },
      { label: 'Vérification', value: 'ISO 14064' },
    ],
  },
]

function ProductCard({ product, index }: { product: Product; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const controls = useAnimation()
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const variants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <div
        className={`relative overflow-hidden rounded-2xl border transition-all duration-500 ${
          isHovered ? 'border-opacity-100 shadow-2xl' : 'border-opacity-30'
        }`}
        style={{
          borderColor: isHovered ? product.color : 'rgba(255,255,255,0.1)',
          boxShadow: isHovered ? `0 0 40px ${product.color}15, 0 25px 50px rgba(0,0,0,0.3)` : 'none',
        }}
      >
        {/* Background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
        />

        <div className="relative p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: isHovered ? 360 : 0, scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.5 }}
                className="text-3xl"
              >
                {product.icon}
              </motion.div>
              <div>
                <h3 className="font-bold text-lg" style={{ color: product.color }}>
                  {product.name}
                </h3>
                <p className="text-xs text-muted-foreground">{product.tagline}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold" style={{ color: product.color }}>
                {product.price}
              </p>
              <p className="text-[10px] text-muted-foreground">{product.unit}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {product.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {product.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.5 + index * 0.15 + i * 0.1 }}
                className="text-center p-2 rounded-lg bg-muted/30"
              >
                <p className="text-lg font-bold" style={{ color: product.color }}>
                  {stat.value}
                </p>
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Features */}
          <div className="space-y-2">
            {product.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.7 + index * 0.15 + i * 0.08 }}
                className="flex items-start gap-2"
              >
                <div className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: product.color }} />
                <span className="text-xs text-muted-foreground">{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-5 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
            style={{
              backgroundColor: isHovered ? product.color : 'transparent',
              color: isHovered ? '#0a0f0d' : product.color,
              border: `1px solid ${product.color}`,
            }}
          >
            Demander une Démo →
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProductCards() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  )
}
