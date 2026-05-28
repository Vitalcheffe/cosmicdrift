'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/* ─── Section Definitions ─── */
const SECTIONS = [
  { id: 'hero', label: 'Hero' },
  { id: 'why', label: 'Why' },
  { id: 'hubs', label: 'Hubs' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'opensource', label: 'Open Source' },
  { id: 'sdk-python', label: 'Python SDK' },
  { id: 'sdk-typescript', label: 'TypeScript SDK' },
  { id: 'cli', label: 'CLI' },
  { id: 'terraform', label: 'Terraform' },
  { id: 'grafana', label: 'Grafana' },
  { id: 'carbon', label: 'Carbon' },
  { id: 'sovereignty', label: 'Sovereignty' },
  { id: 'use-cases', label: 'Use Cases' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'specs', label: 'Specs' },
  { id: 'security', label: 'Security' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'cta', label: 'CTA' },
];

export default function DotNavigation() {
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredDot, setHoveredDot] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleScrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    for (const section of SECTIONS) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-2"
      aria-label="Section navigation"
      role="navigation"
    >
      {SECTIONS.map((section) => {
        const isActive = activeSection === section.id;
        const isHovered = hoveredDot === section.id;

        return (
          <button
            key={section.id}
            onClick={() => handleScrollTo(section.id)}
            onMouseEnter={() => setHoveredDot(section.id)}
            onMouseLeave={() => setHoveredDot(null)}
            onFocus={() => setHoveredDot(section.id)}
            onBlur={() => setHoveredDot(null)}
            className="relative group flex items-center justify-end"
            aria-label={`Navigate to ${section.label} section`}
            aria-current={isActive ? 'true' : undefined}
          >
            {/* Tooltip */}
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{
                opacity: isHovered || isActive ? 1 : 0,
                x: isHovered || isActive ? 0 : 8,
              }}
              transition={{ duration: 0.15 }}
              className="absolute right-6 whitespace-nowrap text-[11px] font-medium px-2.5 py-1 rounded-md bg-[#1A1A1A] border border-white/[0.08] text-white/80 pointer-events-none"
            >
              {section.label}
            </motion.span>

            {/* Dot */}
            <motion.div
              animate={{
                scale: isActive ? 1.4 : 1,
                backgroundColor: isActive ? '#8B9DAF' : 'rgba(255,255,255,0.15)',
              }}
              transition={{ duration: 0.2 }}
              className="w-2 h-2 rounded-full cursor-pointer hover:bg-white/40 transition-colors"
            />
          </button>
        );
      })}
    </nav>
  );
}
