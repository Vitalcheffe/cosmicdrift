'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ChevronDown, PanelLeftClose } from 'lucide-react';
import { HarchLogo } from '@/components/HarchLogo';
import { motion, AnimatePresence } from 'framer-motion';

const platformItems = [
  { name: 'Platform Demo', version: '/0.0', href: '/platform' },
  { name: 'HarchOS', version: '/0.1', href: '/intelligence/harchos' },
  { name: 'Intelligence', version: '/0.2', href: '/subsidiaries/intelligence' },
  { name: 'Cement', version: '/0.3', href: '/subsidiaries/cement' },
  { name: 'Energy', version: '/0.4', href: '/subsidiaries/energy' },
  { name: 'Technology', version: '/0.5', href: '/subsidiaries/technology' },
  { name: 'Mining', version: '/0.6', href: '/subsidiaries/mining' },
  { name: 'Agri', version: '/0.7', href: '/subsidiaries/agriculture' },
  { name: 'Water', version: '/0.8', href: '/subsidiaries/water' },
  { name: 'Finance', version: '/0.8', href: '/subsidiaries/finance' },
];

const missionItems = [
  { name: 'Home', href: '/' },
  { name: 'The Thesis', href: '/thesis' },
  { name: 'About', href: '/about' },
  { name: 'Strategy', href: '/strategy' },
  { name: 'ESG', href: '/esg' },
];

const deploymentItems = [
  { name: 'Global Presence', href: '/#global-presence' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'Careers', href: '/careers' },
  { name: 'Partners', href: '/partners' },
  { name: 'Newsroom', href: '/newsroom' },
  { name: 'Press & Media', href: '/press' },
];

const developerItems = [
  { name: 'Developer Center', href: '/developers' },
  { name: 'API Playground', href: '/developers/playground' },
  { name: 'Open Source', href: '/developers/open-source' },
  { name: 'Documentation', href: '/docs' },
  { name: 'API Reference', href: '/docs/api' },
  { name: 'SDKs', href: '/docs/sdks' },
  { name: 'Architecture', href: '/docs/architecture' },
  { name: 'Changelog', href: '/docs/changelog' },
];

const trustItems = [
  { name: 'Trust Center', href: '/trust' },
  { name: 'Security', href: '/trust/security' },
  { name: 'Compliance', href: '/trust/compliance' },
  { name: 'AI Ethics', href: '/trust/ai-ethics' },
  { name: 'Vulnerability Disclosure', href: '/trust/vulnerability-disclosure' },
];

const resourceItems = [
  { name: 'Blog', href: '/blog' },
  { name: 'Engineering Blog', href: '/engineering-blog' },
  { name: 'Community', href: '/community' },
  { name: 'Events', href: '/events' },
  { name: 'Learn & Certify', href: '/learn' },
  { name: 'Glossary', href: '/glossary' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Status', href: '/status' },
];

const businessItems = [
  { name: 'Pricing', href: '/pricing' },
  { name: 'Calculator', href: '/pricing/calculator' },
  { name: 'Customers', href: '/customers' },
  { name: 'Support', href: '/support' },
  { name: 'Startup Program', href: '/startup-program' },
];

const companyItems = [
  { name: 'Leadership', href: '/company/leadership' },
  { name: 'DEI', href: '/company/dei' },
  { name: 'Harch Ventures', href: '/company/ventures' },
  { name: 'Hiring Process', href: '/careers/hiring-process' },
  { name: 'Legal Hub', href: '/legal/hub' },
];

const investorItems = [
  { name: 'Investor Relations', href: '/investors' },
  { name: 'Contact', href: '/contact' },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [platformsOpen, setPlatformsOpen] = useState(true);
  const [developersOpen, setDevelopersOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [businessOpen, setBusinessOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const pathname = usePathname();

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isOpen]);

  // Close sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const toggleSidebar = useCallback(() => setIsOpen(prev => !prev), []);
  const closeSidebar = useCallback(() => setIsOpen(false), []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.includes('#')) return false;
    return pathname.startsWith(href);
  };

  const sectionLabel = "text-[9px] font-bold tracking-[0.2em] uppercase text-[rgba(255,255,255,0.25)] mb-3 px-1 font-[family-name:var(--font-space-mono)] flex items-center gap-2";

  const navLink = (href: string, label: string, extra?: React.ReactNode) => (
    <Link
      key={href}
      href={href}
      onClick={closeSidebar}
      className={`flex items-center justify-between text-[12px] font-medium pl-4 py-[7px] border-l-2 border-transparent rounded-r-md transition-all duration-300 ${
        isActive(href)
          ? 'text-white bg-[rgba(139,157,175,0.06)] border-[rgba(139,157,175,0.3)]'
          : 'text-[#999999] hover:text-white hover:bg-[rgba(139,157,175,0.03)]'
      }`}
    >
      <span>{label}</span>
      {extra}
    </Link>
  );

  const collapsibleSection = (
    label: string,
    dotColor: string,
    items: typeof platformItems,
    isSectionOpen: boolean,
    setSectionOpen: (v: boolean) => void,
  ) => (
    <div>
      <button
        onClick={() => setSectionOpen(!isSectionOpen)}
        className={`flex items-center justify-between w-full ${sectionLabel}`}
      >
        <span className="flex items-center gap-2">
          <span className="inline-block w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: dotColor }} />
          {label}
        </span>
        <ChevronDown
          size={10}
          className={`transition-transform duration-200 text-[rgba(255,255,255,0.25)] ${isSectionOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isSectionOpen && (
        <div className="space-y-0.5 mt-1">
          {items.map((item) => navLink(item.href, item.name))}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Toggle button — slides from top-left to sidebar edge when open */}
      <button
        onClick={toggleSidebar}
        style={{ left: isOpen ? 280 : 16 }}
        className="fixed top-5 z-50 w-9 h-9 flex items-center justify-center bg-[#111111]/90 backdrop-blur-md border border-[rgba(255,255,255,0.08)] rounded-lg shadow-lg touch-manipulation transition-all duration-300 ease-out hover:bg-[#111111] hover:border-[rgba(255,255,255,0.15)]"
        aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <PanelLeftClose size={16} strokeWidth={1.5} className="text-[rgba(255,255,255,0.5)]" />
        ) : (
          <Menu size={16} strokeWidth={1.5} className="text-white" />
        )}
      </button>

      {/* Overlay — when sidebar is open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
            onClick={closeSidebar}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Sidebar drawer — slides in from left */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 h-full z-40 w-[280px] max-w-[85vw] bg-[#0A0A0A] border-r border-[rgba(255,255,255,0.06)] overflow-y-auto overscroll-contain"
            aria-label="Navigation"
          >
            <div className="flex flex-col h-full px-4 py-6">
              {/* Logo */}
              <div className="mb-8 px-2 pt-1">
                <HarchLogo />
              </div>

              {/* Navigation */}
              <nav className="flex-1 space-y-5 overflow-y-auto">
                {collapsibleSection('Platforms', '#4A7B5F', platformItems, platformsOpen, setPlatformsOpen)}

                <div>
                  <p className={sectionLabel}>
                    <span className="inline-block w-1 h-1 rounded-full" style={{ backgroundColor: '#8B9DAF' }} />
                    Mission
                  </p>
                  <div className="space-y-0.5 mt-1">
                    {missionItems.map((item) => navLink(item.href, item.name))}
                  </div>
                </div>

                <div>
                  <p className={sectionLabel}>
                    <span className="inline-block w-1 h-1 rounded-full" style={{ backgroundColor: '#8B9DAF' }} />
                    Deployments
                  </p>
                  <div className="space-y-0.5 mt-1">
                    {deploymentItems.map((item) => navLink(item.href, item.name))}
                  </div>
                </div>

                {collapsibleSection('Developers', '#8B9DAF', developerItems, developersOpen, setDevelopersOpen)}

                <div>
                  <p className={sectionLabel}>
                    <span className="inline-block w-1 h-1 rounded-full" style={{ backgroundColor: '#8B9DAF' }} />
                    Trust
                  </p>
                  <div className="space-y-0.5 mt-1">
                    {trustItems.map((item) => navLink(item.href, item.name))}
                  </div>
                </div>

                {collapsibleSection('Resources', '#666666', resourceItems, resourcesOpen, setResourcesOpen)}
                {collapsibleSection('Business', '#666666', businessItems, businessOpen, setBusinessOpen)}
                {collapsibleSection('Company', '#666666', companyItems, companyOpen, setCompanyOpen)}

                <div>
                  <p className={sectionLabel}>
                    <span className="inline-block w-1 h-1 rounded-full" style={{ backgroundColor: '#666666' }} />
                    Investors
                  </p>
                  <div className="space-y-0.5 mt-1">
                    {investorItems.map((item) => navLink(item.href, item.name))}
                  </div>
                </div>
              </nav>

              {/* Bottom: CTAs */}
              <div className="mt-4 pt-5 border-t border-[rgba(139,157,175,0.08)] space-y-2">
                <Link
                  href="/contact"
                  onClick={closeSidebar}
                  className="block w-full text-center border border-[rgba(139,157,175,0.35)] bg-[rgba(139,157,175,0.06)] text-[rgba(139,157,175,0.9)] text-[10px] tracking-[0.1em] uppercase px-4 py-2.5 rounded-md font-semibold hover:bg-[rgba(139,157,175,0.12)] hover:border-[rgba(139,157,175,0.5)] hover:text-[#8B9DAF] transition-colors font-[family-name:var(--font-space-mono)]"
                >
                  Partner With Us
                </Link>
                <Link
                  href="/careers"
                  onClick={closeSidebar}
                  className="block w-full text-center border border-[rgba(255,255,255,0.1)] bg-transparent text-[rgba(255,255,255,0.5)] text-[9px] tracking-[0.1em] uppercase px-4 py-2 rounded-md font-semibold hover:border-[rgba(255,255,255,0.2)] hover:text-white transition-colors font-[family-name:var(--font-space-mono)]"
                >
                  Join the Team
                </Link>
                <div className="flex items-center justify-center gap-2 pt-1">
                  <span className="inline-block w-0.5 h-0.5 rounded-full bg-[#4A7B5F]" />
                  <p className="text-[9px] text-[rgba(255,255,255,0.2)] font-[family-name:var(--font-space-mono)]">
                    v0.2.0 — Casablanca
                  </p>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
