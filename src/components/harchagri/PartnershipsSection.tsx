'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Building2, Globe, FlaskConical, Network } from 'lucide-react'

interface Partner {
  name: string
  type: string
  country: string
  description: string
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>
  status: 'Active' | 'In Negotiation' | 'Prospect'
}

const partners: Partner[] = [
  {
    name: 'OCP Group',
    type: 'Strategic',
    country: 'Morocco',
    description: 'Digitalization of OCP pilot farms — HarchAgri IoT integration across 12 experimental farms for fertilizer and irrigation optimization.',
    icon: Building2,
    status: 'Active',
  },
  {
    name: 'Plan Vert Maroc',
    type: 'Government',
    country: 'Morocco',
    description: 'National agricultural modernization program — HarchAgri provides IoT monitoring for 50,000 ha of agricultural land across 6 regions.',
    icon: Globe,
    status: 'Active',
  },
  {
    name: 'FAO Morocco',
    type: 'Institutional',
    country: 'Morocco',
    description: 'Joint food security program — satellite and IoT data sharing for cereal yield forecasting.',
    icon: Globe,
    status: 'In Negotiation',
  },
  {
    name: 'ISRA',
    type: 'Research',
    country: 'Senegal',
    description: 'Senegalese Agricultural Research Institute — co-development of AI models adapted to West African crops (groundnut, millet, cowpea).',
    icon: FlaskConical,
    status: 'Active',
  },
  {
    name: 'AgTech Kenya',
    type: 'Ecosystem',
    country: 'Kenya',
    description: 'Nairobi AgTech hub — access to 200+ agri startups, joint acceleration programs, and connected farmer pipeline.',
    icon: Network,
    status: 'Active',
  },
  {
    name: 'Ghana MoFA',
    type: 'Government',
    country: 'Ghana',
    description: 'Ministry of Food and Agriculture — Planting for Food and Jobs program, IoT deployment across 15,000 ha of export crops.',
    icon: Globe,
    status: 'In Negotiation',
  },
]

export default function PartnershipsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref}>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {partners.map((partner, index) => {
          const Icon = partner.icon
          return (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="card p-6 h-full group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[rgba(255,255,255,0.06)] flex items-center justify-center">
                    <Icon size={14} className="text-white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[13px] text-white">{partner.name}</h4>
                    <p className="text-[10px] text-[#666666]">{partner.type} — {partner.country}</p>
                  </div>
                </div>
                <span
                  className={`status-badge ${
                    partner.status === 'Active' ? 'status-badge-active' : 'status-badge-engineering'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {partner.status}
                </span>
              </div>

              {/* Description */}
              <p className="text-[11px] text-[#999999] leading-relaxed">
                {partner.description}
              </p>

              {/* Bottom */}
              <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.04)]">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="text-[9px] text-[#666666] uppercase tracking-wider font-[family-name:var(--font-space-mono)]">Harch Corp Partner</span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
