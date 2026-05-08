'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { Plane, Radio, Building2, Leaf } from 'lucide-react'

interface Product {
  id: string
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>
  name: string
  tagline: string
  price: string
  unit: string
  description: string
  features: string[]
  stats: { label: string; value: string }[]
}

const products: Product[] = [
  {
    id: 'drone',
    icon: Plane,
    name: 'HarchAgri Drone',
    tagline: 'Autonomous Aerial Surveillance',
    price: '$15,000',
    unit: '/unit',
    description: 'Autonomous drones equipped with multispectral sensors, thermal cameras, and onboard AI for early disease detection, crop vigor analysis, and high-resolution precision mapping.',
    features: [
      '5-band multispectral sensors (RGB + NIR + Red Edge)',
      '45 min flight time — 200 ha/flight coverage',
      'Onboard AI: real-time disease detection',
      'High-resolution NDVI mapping (2cm/pixel)',
      'HarchOS integration for GPU orchestration',
    ],
    stats: [
      { label: 'Accuracy', value: '97.3%' },
      { label: 'Coverage/day', value: '800 ha' },
      { label: 'ROI', value: '3.2x' },
    ],
  },
  {
    id: 'iot',
    icon: Radio,
    name: 'HarchAgri IoT',
    tagline: 'Intelligent Sensor Network',
    price: '$500',
    unit: '/hectare/year',
    description: 'Mesh network of IoT sensors deployed across agricultural territory. Continuous soil, moisture, temperature, pH, and nutrient measurement with LoRaWAN transmission and real-time cloud analytics.',
    features: [
      'Soil sensors: moisture, temperature, pH, NPK',
      'LoRaWAN network — 15 km range',
      'Solar battery — 5-year autonomy',
      'Intelligent alerts with adaptive thresholds',
      'Open API + Python/Node.js SDK',
    ],
    stats: [
      { label: 'Sensors', value: '11,800+' },
      { label: 'Soil Accuracy', value: '±2%' },
      { label: 'Water Savings', value: '35%' },
    ],
  },
  {
    id: 'vertical',
    icon: Building2,
    name: 'HarchAgri Vertical',
    tagline: 'Automated Vertical Farms',
    price: '$50,000',
    unit: '/module',
    description: 'Turnkey vertical farming modules with full automation: spectrally optimized LED lighting, closed-loop hydroponic irrigation, AI climate control, and 24/7 monitoring. 365 days/year production, 95% less water.',
    features: [
      'Spectrally optimized LED — 40% less energy',
      'Closed-loop hydroponics — 95% less water',
      'AI climate control — temperature ±0.5°C',
      '10x yield per m² vs. field farming',
      'Video monitoring + sensors 24/7',
    ],
    stats: [
      { label: 'Yield/m²', value: '10x' },
      { label: 'Water Savings', value: '95%' },
      { label: 'Days/year', value: '365' },
    ],
  },
  {
    id: 'carbon',
    icon: Leaf,
    name: 'HarchAgri Carbon',
    tagline: 'Agricultural Carbon Credits',
    price: '2%',
    unit: 'of carbon revenue',
    description: 'Tokenization and monetization platform for agricultural carbon credits. Measurement, verification, and automated trading of carbon sequestration credits via proprietary blockchain and certified IoT sensors.',
    features: [
      'Carbon measurement via certified IoT sensors',
      'Blockchain tokenization — full traceability',
      'Integrated marketplace — direct buyer sales',
      'Third-party verification by certified auditors',
      'Automated ISO 14064 compliant reports',
    ],
    stats: [
      { label: 'Credits/year', value: '2,350 tCO₂' },
      { label: 'Avg Revenue', value: '$47/ha' },
      { label: 'Verification', value: 'ISO 14064' },
    ],
  },
]

function ProductCard({ product, index }: { product: Product; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const controls = useAnimation()
  const [isHovered, setIsHovered] = useState(false)
  const Icon = product.icon

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
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
      className="group"
    >
      <motion.div
        className="card p-6 h-full relative overflow-hidden"
        animate={{
          borderColor: isHovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Subtle top line on hover */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'rgba(255,255,255,0.3)' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,0.06)] flex items-center justify-center">
              <Icon size={18} className="text-white" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-bold text-[14px] text-white">{product.name}</h3>
              <p className="text-[11px] text-[#666666]">{product.tagline}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-white stat-mono">{product.price}</p>
            <p className="text-[10px] text-[#666666]">{product.unit}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-[12px] text-[#999999] leading-relaxed mb-4">
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
              className="text-center p-2 rounded-lg bg-[rgba(255,255,255,0.03)]"
            >
              <p className="text-sm font-bold text-white stat-mono">{stat.value}</p>
              <p className="text-[9px] text-[#666666] uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <div className="space-y-2">
          {product.features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ delay: 0.7 + index * 0.15 + i * 0.06 }}
              className="flex items-start gap-2"
            >
              <div className="mt-1.5 w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
              <span className="text-[11px] text-[#999999]">{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="mt-5 w-full py-2.5 rounded-lg text-[12px] font-semibold transition-all duration-300 border border-[rgba(255,255,255,0.12)] text-white hover:bg-white hover:text-black"
        >
          Request Demo
        </motion.button>
      </motion.div>
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
