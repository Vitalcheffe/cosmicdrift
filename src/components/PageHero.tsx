'use client';

import { motion } from 'framer-motion';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  version?: string;
  backgroundImage?: string;
}

export function PageHero({ title, subtitle, version, backgroundImage }: PageHeroProps) {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-black">
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20"
      >
        {version && (
          <span className="version-tag mb-4 block">{version}</span>
        )}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-base md:text-lg text-white/40 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        <div className="mt-6 w-16 h-0.5 bg-[#C9A84C] mx-auto" />
      </motion.div>
    </section>
  );
}
