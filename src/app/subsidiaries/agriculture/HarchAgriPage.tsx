'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const HeroScene = dynamic(() => import('@/components/harchagri/HeroScene'), { ssr: false })
const ParticleField = dynamic(() => import('@/components/harchagri/ParticleField'), { ssr: false })
const AfricaMap = dynamic(() => import('@/components/harchagri/AfricaMap'), { ssr: false })
const IoTDashboard = dynamic(() => import('@/components/harchagri/IoTDashboard'), { ssr: false })
const ProductCards = dynamic(() => import('@/components/harchagri/ProductCards'), { ssr: false })
const CompetitorComparison = dynamic(() => import('@/components/harchagri/CompetitorComparison'), { ssr: false })
const PartnershipsSection = dynamic(() => import('@/components/harchagri/PartnershipsSection'), { ssr: false })

// Counter animation hook
function useCounter(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(!startOnView)
  const observerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!startOnView) return
    const el = observerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [startOnView])

  useEffect(() => {
    if (!started) return
    let startTime: number
    let rafId: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) rafId = requestAnimationFrame(step)
    }
    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [started, end, duration])

  return { count, observerRef }
}

// Section wrapper with scroll animations
function AnimatedSection({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode
  className?: string
  id?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useRef(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView.current) {
          isInView.current = true
          setVisible(true)
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0 }}
      animate={visible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

// Individual Stat Card
function StatCard({ value, suffix, label, icon, index }: {
  value: number; suffix: string; label: string; icon: string; index: number
}) {
  const { count, observerRef } = useCounter(value, 2500)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="text-center p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-green-500/30 transition-all duration-300 group"
    >
      <div ref={observerRef} />
      <span className="text-3xl mb-2 block group-hover:scale-110 transition-transform duration-300">
        {icon}
      </span>
      <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-xs text-gray-400 mt-2">{label}</p>
    </motion.div>
  )
}

// Hero Section
function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -50])

  return (
    <motion.div
      ref={heroRef}
      style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden -ml-0 lg:-ml-[250px] -mt-0"
    >
      {/* Three.js Background */}
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/30 via-transparent to-[#1A1A1A] z-[1]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <Link href="/" className="text-xs text-gray-500 hover:text-white transition-colors">Harch Corp</Link>
          <span className="text-gray-600">/</span>
          <Link href="/subsidiaries/agriculture" className="text-xs text-green-400">Agriculture</Link>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/5 mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-green-400 font-medium">
            Harch Corp — Filiale Agriculture de Précision
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight"
        >
          <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Agriculture</span>
          <br />
          <span className="text-white">de Précision pour</span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">l&apos;Afrique</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-6 text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed"
        >
          IoT. Drones. Fermes verticales. Crédits carbone.
          La première plateforme intégrée d&apos;agriculture de précision
          conçue pour les défis africains. 5 pays, 11,800+ capteurs, 25,000+ hectares.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <motion.a
            href="#platform"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-black font-bold text-sm hover:shadow-xl hover:shadow-green-500/20 transition-all"
          >
            Explorer la Plateforme →
          </motion.a>
          <motion.a
            href="#products"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-xl border border-white/20 text-white text-sm hover:border-green-500/50 hover:bg-green-500/5 transition-all"
          >
            Voir les Produits
          </motion.a>
        </motion.div>

        {/* Tech stack badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {['Three.js', 'D3.js', 'GSAP', 'Framer Motion', 'Recharts', 'LoRaWAN'].map((tech) => (
            <span
              key={tech}
              className="text-[10px] px-2.5 py-1 rounded-md bg-white/5 text-gray-400 border border-white/10"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-gray-400">Scroll</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
            <path d="M8 4V20M8 20L2 14M8 20L14 14" stroke="rgba(34,197,94,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// Stats Section
function StatsSection() {
  const stats = [
    { value: 25000, suffix: '+', label: 'Hectares Monitorés', icon: '🌾' },
    { value: 11800, suffix: '+', label: 'Capteurs IoT Actifs', icon: '📡' },
    { value: 5, suffix: '', label: 'Pays Africains', icon: '🌍' },
    { value: 2350, suffix: '', label: 'tCO2 Séquestrées/an', icon: '🌱' },
  ]

  return (
    <AnimatedSection className="py-20 relative">
      <ParticleField />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} index={i} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

// Platform Section (Map + Overview)
function PlatformSection() {
  return (
    <AnimatedSection className="py-20 relative" id="platform">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 mb-4"
          >
            <span className="text-[10px] text-cyan-400 font-medium">CARTE INTERACTIVE</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-bold">
            <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">5 Hubs</span>{' '}
            <span className="text-white">à travers l&apos;Afrique</span>
          </h2>
          <p className="mt-3 text-sm text-gray-400 max-w-xl mx-auto">
            Notre réseau de hubs couvre les principaux corridors agricoles africains.
            Survolez chaque hub pour découvrir ses capacités.
          </p>
        </div>

        {/* Map container */}
        <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden" style={{ height: '500px' }}>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-500/40 to-transparent animate-pulse" />
          </div>
          <AfricaMap />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] text-green-400 font-mono">LIVE</span>
          </div>
          <div className="absolute top-3 right-3 text-[10px] text-gray-500 font-mono">
            D3.js + Temps Réel
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

// Products Section
function ProductsSection() {
  return (
    <AnimatedSection className="py-20 relative" id="products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/5 mb-4"
          >
            <span className="text-[10px] text-green-400 font-medium">PRODUITS</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-bold">
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">4 Solutions</span>{' '}
            <span className="text-white">Intégrées</span>
          </h2>
          <p className="mt-3 text-sm text-gray-400 max-w-xl mx-auto">
            Du drone à la ferme verticale, en passant par l&apos;IoT et les crédits carbone.
            Chaque produit fonctionne seul ou en synergie complète.
          </p>
        </div>
        <ProductCards />
      </div>
    </AnimatedSection>
  )
}

// IoT Dashboard Section
function IoTDashboardSection() {
  return (
    <AnimatedSection className="py-20 relative" id="iot">
      <ParticleField />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/5 mb-4"
          >
            <span className="text-[10px] text-amber-400 font-medium">DONNÉES EN TEMPS RÉEL</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-bold">
            <span className="text-white">Monitoring</span>{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">IoT Live</span>
          </h2>
          <p className="mt-3 text-sm text-gray-400 max-w-xl mx-auto">
            Données capteurs actualisées toutes les 2 secondes.
            Température, humidité du sol, santé des cultures, crédits carbone — tout en un coup d&apos;oeil.
          </p>
        </div>
        <IoTDashboard />
      </div>
    </AnimatedSection>
  )
}

// Competition Section
function CompetitionSection() {
  return (
    <AnimatedSection className="py-20 relative" id="competition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/5 mb-4"
          >
            <span className="text-[10px] text-purple-400 font-medium">ANALYSE CONCURRENTIELLE</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-bold">
            <span className="text-white">HarchAgri vs</span>{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">les Leaders</span>
          </h2>
          <p className="mt-3 text-sm text-gray-400 max-w-xl mx-auto">
            De Twiga Foods à OCP Group — comment HarchAgri se positionne face aux acteurs majeurs de l&apos;AgTech africaine et mondiale.
          </p>
        </div>
        <CompetitorComparison />
      </div>
    </AnimatedSection>
  )
}

// Partners Section
function PartnersSection() {
  return (
    <AnimatedSection className="py-20 relative" id="partners">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/5 mb-4"
          >
            <span className="text-[10px] text-emerald-400 font-medium">ÉCOSYSTÈME</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-bold">
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Partenaires</span>{' '}
            <span className="text-white">Stratégiques</span>
          </h2>
          <p className="mt-3 text-sm text-gray-400 max-w-xl mx-auto">
            Gouvernements, institutions de recherche, écosystèmes AgTech — HarchAgri construit l&apos;infrastructure agricole de l&apos;Afrique avec les meilleurs.
          </p>
        </div>
        <PartnershipsSection />
      </div>
    </AnimatedSection>
  )
}

// CTA Section
function CTASection() {
  return (
    <AnimatedSection className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-green-500/30 bg-gradient-to-br from-green-500/10 via-white/5 to-cyan-500/10 p-8 sm:p-12 text-center"
        >
          <ParticleField />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold">
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Prêt à Transformer</span>
              <br />
              <span className="text-white">votre Agriculture?</span>
            </h2>
            <p className="mt-4 text-sm text-gray-400 max-w-lg mx-auto">
              Rejoignez les 250+ exploitations qui utilisent déjà HarchAgri pour optimiser leurs rendements,
              réduire leurs coûts et monétiser leurs crédits carbone.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-black font-bold text-sm hover:shadow-xl hover:shadow-green-500/20 transition-all"
              >
                Démarrer Gratuitement
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-xl border border-white/20 text-white text-sm hover:border-green-500/50 transition-all"
              >
                Contacter les Ventes
              </motion.button>
            </div>

            <p className="mt-6 text-[10px] text-gray-500">
              Setup en 48h • Sans engagement • Support 24/7
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

// Main Page Component
export default function HarchAgriPage() {
  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      <HeroSection />
      <StatsSection />
      <PlatformSection />
      <ProductsSection />
      <IoTDashboardSection />
      <CompetitionSection />
      <PartnersSection />
      <CTASection />
    </div>
  )
}
