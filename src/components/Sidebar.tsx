'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { HarchLogo } from '@/components/HarchLogo';

const platformItems = [
  { name: 'HarchOS', version: '/0.1', href: '/intelligence/harchos' },
  { name: 'Intelligence', version: '/0.2', href: '/subsidiaries/intelligence' },
  { name: 'Cement', version: '/0.3', href: '/subsidiaries/cement' },
  { name: 'Energy', version: '/0.4', href: '/subsidiaries/energy' },
  { name: 'Technology', version: '/0.5', href: '/subsidiaries/technology' },
  { name: 'Mining', version: '/0.6', href: '/subsidiaries/mining' },
  { name: 'Agri', version: '/0.7', href: '/subsidiaries/agriculture' },
  { name: 'Water', version: '/0.8', href: '/subsidiaries/water' },
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
  { name: 'Careers', href: '/careers' },
  { name: 'Partners', href: '/partners' },
  { name: 'Newsroom', href: '/newsroom' },
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [platformsOpen, setPlatformsOpen] = useState(true);
  const [developersOpen, setDevelopersOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [businessOpen, setBusinessOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.includes('#')) return false;
    return pathname.startsWith(href);
  };

  const closeMobile = () => setMobileOpen(false);

  const sectionLabel = "text-[9px] font-bold tracking-[0.2em] uppercase text-[#666666] mb-3 px-1 font-[family-name:var(--font-space-mono)] flex items-center gap-2";

  const navLink = (href: string, label: string, extra?: React.ReactNode) => (
    <Link
      key={href}
      href={href}
      onClick={closeMobile}
      className={`holo-link flex items-center justify-between text-[12px] font-medium pl-4 py-[7px] border-l-2 border-transparent rounded-r-md transition-all duration-300 ${
        isActive(href)
          ? 'text-white bg-[rgba(199,146,62,0.04)] border-[rgba(199,146,62,0.3)]'
          : 'text-[#999999] hover:text-white hover:bg-[rgba(199,146,62,0.02)]'
      }`}
    >
      <span className="holo-text">{label}</span>
      {extra}
    </Link>
  );

  const collapsibleSection = (
    label: string,
    ledClass: string,
    items: typeof platformItems,
    isOpen: boolean,
    setIsOpen: (v: boolean) => void,
  ) => (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full ${sectionLabel}`}
      >
        <span className="flex items-center gap-2">
          <span className={`led-indicator ${ledClass}`} style={{ width: 4, height: 4 }} />
          {label}
        </span>
        <ChevronDown
          size={10}
          className={`transition-transform text-[#666666] ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="space-y-0.5 mt-1">
          {items.map((item) => navLink(item.href, item.name))}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* ═══ HAMBURGER BUTTON — Mobile only ═══ */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden w-10 h-10 flex items-center justify-center bg-[#121212] border border-[rgba(255,255,255,0.06)] rounded-lg shadow-sm"
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={18} strokeWidth={1.5} className="text-white" /> : <Menu size={18} strokeWidth={1.5} className="text-white" />}
      </button>

      {/* ═══ MOBILE OVERLAY ═══ */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={closeMobile}
        />
      )}

      {/* ═══ SIDEBAR — Control Panel Dark ═══ */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 w-[250px] bg-[#121212] border-r border-[rgba(255,255,255,0.06)] overflow-y-auto transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full px-4 py-6">
          {/* ═══ Logo ═══ */}
          <div className="mb-8 px-2 pt-1">
            <HarchLogo />
          </div>

          {/* ═══ Navigation ═══ */}
          <nav className="flex-1 space-y-5 overflow-y-auto">

            {/* ── PLATFORMS ── */}
            {collapsibleSection('Platforms', 'led-green', platformItems, platformsOpen, setPlatformsOpen)}

            {/* ── MISSION ── */}
            <div>
              <p className={sectionLabel}>
                <span className="led-indicator" style={{ width: 4, height: 4 }} />
                Mission
              </p>
              <div className="space-y-0.5 mt-1">
                {missionItems.map((item) => navLink(item.href, item.name))}
              </div>
            </div>

            {/* ── DEPLOYMENTS ── */}
            <div>
              <p className={sectionLabel}>
                <span className="led-indicator led-delay-1" style={{ width: 4, height: 4 }} />
                Deployments
              </p>
              <div className="space-y-0.5 mt-1">
                {deploymentItems.map((item) => navLink(item.href, item.name))}
              </div>
            </div>

            {/* ── DEVELOPERS ── */}
            {collapsibleSection('Developers', 'led-delay-1', developerItems, developersOpen, setDevelopersOpen)}

            {/* ── TRUST ── */}
            <div>
              <p className={sectionLabel}>
                <span className="led-indicator led-delay-2" style={{ width: 4, height: 4 }} />
                Trust
              </p>
              <div className="space-y-0.5 mt-1">
                {trustItems.map((item) => navLink(item.href, item.name))}
              </div>
            </div>

            {/* ── RESOURCES ── */}
            {collapsibleSection('Resources', 'led-delay-2', resourceItems, resourcesOpen, setResourcesOpen)}

            {/* ── BUSINESS ── */}
            {collapsibleSection('Business', 'led-delay-3', businessItems, businessOpen, setBusinessOpen)}

            {/* ── COMPANY ── */}
            {collapsibleSection('Company', 'led-delay-3', companyItems, companyOpen, setCompanyOpen)}

            {/* ── INVESTORS ── */}
            <div>
              <p className={sectionLabel}>
                <span className="led-indicator led-delay-3" style={{ width: 4, height: 4 }} />
                Investors
              </p>
              <div className="space-y-0.5 mt-1">
                {investorItems.map((item) => navLink(item.href, item.name))}
              </div>
            </div>
          </nav>

          {/* ═══ Bottom: CTAs ═══ */}
          <div className="mt-4 pt-5 border-t border-[rgba(199,146,62,0.08)] space-y-2">
            <Link
              href="/contact"
              onClick={closeMobile}
              className="block w-full text-center border border-[rgba(199,146,62,0.35)] bg-[rgba(199,146,62,0.06)] text-[rgba(199,146,62,0.9)] text-[10px] tracking-[0.1em] uppercase px-4 py-2.5 rounded-md font-semibold hover:bg-[rgba(199,146,62,0.12)] hover:border-[rgba(199,146,62,0.5)] hover:text-[#C7923E] transition-colors font-[family-name:var(--font-space-mono)]"
            >
              Partner With Us
            </Link>
            <Link
              href="/careers"
              onClick={closeMobile}
              className="block w-full text-center border border-[rgba(255,255,255,0.1)] bg-transparent text-[rgba(255,255,255,0.5)] text-[9px] tracking-[0.1em] uppercase px-4 py-2 rounded-md font-semibold hover:border-[rgba(255,255,255,0.2)] hover:text-white transition-colors font-[family-name:var(--font-space-mono)]"
            >
              Join the Team
            </Link>
            <div className="flex items-center justify-center gap-2 pt-1">
              <span className="led-indicator led-green" style={{ width: 3, height: 3 }} />
              <p className="text-[9px] cmd-amber-dim font-[family-name:var(--font-space-mono)]">
                v0.2.0 — Casablanca
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
