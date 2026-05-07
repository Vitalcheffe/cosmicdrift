'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Competitor {
  name: string
  country: string
  revenue: string
  funding: string
  product: string
  model: string
  harchAdvantage: string
  color: string
}

const competitors: Competitor[] = [
  {
    name: 'Twiga Foods',
    country: 'Kenya',
    revenue: '$120M',
    funding: '$110M',
    product: 'Marketplace B2B',
    model: 'Commission 8-12%',
    harchAdvantage: 'Nous connectons directement via IoT, pas seulement marketplace',
    color: '#f59e0b',
  },
  {
    name: 'Apollo Agriculture',
    country: 'Kenya',
    revenue: '$50M',
    funding: '$40M',
    product: 'Crédit agricole',
    model: 'Intérêt 12-18%',
    harchAdvantage: 'Notre stack IoT réduit le risque de défaut de 40%',
    color: '#06b6d4',
  },
  {
    name: 'Aerofarms',
    country: 'USA',
    revenue: '$30M',
    funding: '$250M',
    product: 'Fermes verticales',
    model: 'Vente directe',
    harchAdvantage: 'Coût 60% inférieur grâce à l\'énergie solaire africaine',
    color: '#10b981',
  },
  {
    name: 'Climate Corp',
    country: 'USA',
    revenue: '$500M',
    funding: 'Acheté $1.1B',
    product: 'Assurance récolte',
    model: 'SaaS + primes',
    harchAdvantage: 'Nos données IoT propriétaires offrent une précision supérieure',
    color: '#8b5cf6',
  },
  {
    name: 'OCP Group',
    country: 'Maroc',
    revenue: '$7.2B',
    funding: 'State-owned',
    product: 'Engrais + Fermes pilotes',
    model: 'Vente engrais + services',
    harchAdvantage: 'Partenariat complémentaire — nous digitalisons leurs fermes',
    color: '#22c55e',
  },
]

export default function CompetitorComparison() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref} className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px flex-1 bg-gradient-to-r from-green-500/50 to-transparent" />
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
          Positionnement Concurrentiel
        </h3>
        <div className="h-px flex-1 bg-gradient-to-l from-green-500/50 to-transparent" />
      </div>

      {/* Comparison cards */}
      <div className="space-y-3">
        {competitors.map((comp, index) => (
          <motion.div
            key={comp.name}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-border transition-all duration-300"
          >
            {/* Color accent bar */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 group-hover:w-1.5"
              style={{ backgroundColor: comp.color }}
            />

            <div className="p-4 pl-5">
              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                {/* Company name + country */}
                <div className="md:w-48 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm" style={{ color: comp.color }}>
                      {comp.name}
                    </h4>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                      {comp.country}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{comp.product}</p>
                </div>

                {/* Metrics */}
                <div className="flex gap-6 flex-1">
                  <div>
                    <p className="text-[10px] text-muted-foreground">Revenus</p>
                    <p className="text-sm font-semibold">{comp.revenue}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Funding</p>
                    <p className="text-sm font-semibold">{comp.funding}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Modèle</p>
                    <p className="text-sm font-semibold">{comp.model}</p>
                  </div>
                </div>

                {/* HarchAgri advantage */}
                <div className="md:w-64 flex-shrink-0">
                  <div className="flex items-start gap-2">
                    <div className="mt-1 w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1 4L3 6L7 2" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <p className="text-xs text-green-400 leading-relaxed">{comp.harchAdvantage}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* HarchAgri row */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="relative overflow-hidden rounded-xl border-2 border-green-500/50 bg-gradient-to-r from-green-500/10 via-transparent to-cyan-500/10 p-5 glow-green"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="md:w-48 flex-shrink-0">
            <h4 className="font-bold text-lg text-gradient-green">HarchAgri</h4>
            <p className="text-xs text-muted-foreground">5 pays, 11,800+ capteurs</p>
          </div>
          <div className="flex gap-6 flex-1">
            <div>
              <p className="text-[10px] text-muted-foreground">Revenus Cibles A2</p>
              <p className="text-sm font-bold text-green-400">$8.5M</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">Investissement</p>
              <p className="text-sm font-bold text-green-400">$2.1M</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">Modèle</p>
              <p className="text-sm font-bold text-green-400">SaaS + Hardware + Carbon</p>
            </div>
          </div>
          <div className="md:w-64 flex-shrink-0">
            <p className="text-xs text-green-400 font-semibold">
              Seule plateforme intégrée: IoT + Drones + Vertical + Carbon sur le continent africain
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
