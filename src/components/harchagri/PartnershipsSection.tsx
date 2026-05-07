'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Partner {
  name: string
  type: string
  country: string
  description: string
  icon: string
  color: string
  status: 'Actif' | 'En négociation' | 'Prospect'
}

const partners: Partner[] = [
  {
    name: 'OCP Group',
    type: 'Stratégique',
    country: 'Maroc',
    description: 'Digitalisation des fermes pilotes OCP — intégration HarchAgri IoT dans 12 fermes expérimentales pour optimisation engrais et irrigation.',
    icon: '🏭',
    color: '#22c55e',
    status: 'Actif',
  },
  {
    name: 'Plan Vert Maroc',
    type: 'Gouvernemental',
    country: 'Maroc',
    description: 'Programme national de modernisation agricole — HarchAgri fournit le monitoring IoT pour 50,000 ha de terres agricoles dans 6 régions.',
    icon: '🇲🇦',
    color: '#f59e0b',
    status: 'Actif',
  },
  {
    name: 'FAO Maroc',
    type: 'Institutionnel',
    country: 'Maroc',
    description: 'Programme conjoint de sécurité alimentaire — partage de données satellite et IoT pour la prévision des rendements céréaliers.',
    icon: '🌍',
    color: '#06b6d4',
    status: 'En négociation',
  },
  {
    name: 'ISRA',
    type: 'Recherche',
    country: 'Sénégal',
    description: 'Institut Sénégalais de Recherches Agricoles — co-développement de modèles IA adaptés aux cultures ouest-africaines (arachide, mil, niébé).',
    icon: '🔬',
    color: '#10b981',
    status: 'Actif',
  },
  {
    name: 'AgTech Kenya',
    type: 'Écosystème',
    country: 'Kenya',
    description: 'Hub AgTech Nairobi — accès à 200+ startups agricoles, programmes d\'accélération conjoints et pipeline de fermiers connectés.',
    icon: '🇰🇪',
    color: '#8b5cf6',
    status: 'Actif',
  },
  {
    name: 'Ghana MoFA',
    type: 'Gouvernemental',
    country: 'Ghana',
    description: 'Ministry of Food and Agriculture — programme Planting for Food and Jobs, déploiement IoT sur 15,000 ha de cultures d\'exportation.',
    icon: '🇬🇭',
    color: '#f59e0b',
    status: 'En négociation',
  },
]

export default function PartnershipsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref}>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {partners.map((partner, index) => (
          <motion.div
            key={partner.name}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-border transition-all duration-300"
          >
            {/* Top accent */}
            <div
              className="h-0.5 w-0 group-hover:w-full transition-all duration-700"
              style={{ backgroundColor: partner.color }}
            />

            <div className="p-5">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{partner.icon}</span>
                  <div>
                    <h4 className="font-bold text-sm" style={{ color: partner.color }}>
                      {partner.name}
                    </h4>
                    <p className="text-[10px] text-muted-foreground">{partner.type} — {partner.country}</p>
                  </div>
                </div>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full border"
                  style={{
                    borderColor: partner.status === 'Actif' ? '#22c55e' : '#f59e0b',
                    color: partner.status === 'Actif' ? '#22c55e' : '#f59e0b',
                    backgroundColor: partner.status === 'Actif' ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)',
                  }}
                >
                  {partner.status}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-muted-foreground leading-relaxed">
                {partner.description}
              </p>

              {/* Bottom line */}
              <div className="mt-3 pt-3 border-t border-border/30">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: partner.color }} />
                  <span className="text-[10px] text-muted-foreground">Partenaire Harch Corp</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
