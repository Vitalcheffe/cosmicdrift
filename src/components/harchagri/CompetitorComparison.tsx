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
}

const competitors: Competitor[] = [
  {
    name: 'Twiga Foods',
    country: 'Kenya',
    revenue: '$120M',
    funding: '$110M',
    product: 'B2B Marketplace',
    model: 'Commission 8-12%',
    harchAdvantage: 'Direct IoT connectivity, not just marketplace',
  },
  {
    name: 'Apollo Agriculture',
    country: 'Kenya',
    revenue: '$50M',
    funding: '$40M',
    product: 'Agricultural Credit',
    model: 'Interest 12-18%',
    harchAdvantage: 'IoT stack reduces default risk by 40%',
  },
  {
    name: 'Aerofarms',
    country: 'USA',
    revenue: '$30M',
    funding: '$250M',
    product: 'Vertical Farms',
    model: 'Direct Sales',
    harchAdvantage: '60% lower cost via African solar energy',
  },
  {
    name: 'Climate Corp',
    country: 'USA',
    revenue: '$500M',
    funding: 'Acquired $1.1B',
    product: 'Crop Insurance',
    model: 'SaaS + Premiums',
    harchAdvantage: 'Proprietary IoT data provides superior accuracy',
  },
  {
    name: 'OCP Group',
    country: 'Morocco',
    revenue: '$7.2B',
    funding: 'State-owned',
    product: 'Fertilizer + Pilot Farms',
    model: 'Fertilizer + Services',
    harchAdvantage: 'Complementary partnership — we digitalize their farms',
  },
]

export default function CompetitorComparison() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref}>
      {/* Main data table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="bg-[#1E1E1E] rounded-2xl border border-[rgba(255,255,255,0.06)] overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Country</th>
                <th>Revenue</th>
                <th>Funding</th>
                <th>Product</th>
                <th>Model</th>
                <th>Harch Agri Advantage</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((comp, index) => (
                <motion.tr
                  key={comp.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                >
                  <td className="font-semibold text-white">{comp.name}</td>
                  <td className="text-[#999999]">{comp.country}</td>
                  <td className="text-white">{comp.revenue}</td>
                  <td className="text-[#999999]">{comp.funding}</td>
                  <td className="text-[#999999]">{comp.product}</td>
                  <td className="text-[#999999]">{comp.model}</td>
                  <td>
                    <div className="flex items-start gap-2">
                      <div className="mt-1.5 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                      <span className="text-[12px] text-[#999999]">{comp.harchAdvantage}</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.01)]">
          <p className="text-[11px] text-[#666666]">Competitive analysis based on public data as of Q1 2026.</p>
        </div>
      </motion.div>

      {/* HarchAgri highlight row */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-6 card p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,0.06)] flex items-center justify-center">
            <span className="text-[10px] font-bold tracking-[0.15em] text-white font-[family-name:var(--font-space-mono)]">/0.6</span>
          </div>
          <div>
            <h4 className="font-bold text-white text-lg">Harch Agri</h4>
            <p className="text-[11px] text-[#666666]">5 countries, 11,800+ sensors, 25,000+ hectares</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <p className="text-[10px] text-[#666666] uppercase tracking-wider">Year 2 Target Revenue</p>
            <p className="text-lg font-bold text-white stat-mono">$8.5M</p>
          </div>
          <div>
            <p className="text-[10px] text-[#666666] uppercase tracking-wider">Investment</p>
            <p className="text-lg font-bold text-white stat-mono">$2.1M</p>
          </div>
          <div>
            <p className="text-[10px] text-[#666666] uppercase tracking-wider">Model</p>
            <p className="text-lg font-bold text-white">SaaS + Hardware + Carbon</p>
          </div>
          <div>
            <p className="text-[10px] text-[#666666] uppercase tracking-wider">Differentiator</p>
            <p className="text-[13px] text-white leading-snug">Only integrated platform: IoT + Drones + Vertical + Carbon on the African continent</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
