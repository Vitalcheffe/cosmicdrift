'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { HarchLogo } from '@/components/HarchLogo';

const platformItems = [
  { name: 'Intelligence', version: '/0.1', href: '/subsidiaries/intelligence' },
  { name: 'Ciment', version: '/0.2', href: '/subsidiaries/cement' },
  { name: 'Energy', version: '/0.3', href: '/subsidiaries/energy' },
  { name: 'Technology', version: '/0.4', href: '/subsidiaries/technology' },
  { name: 'Mining', version: '/0.5', href: '/subsidiaries/mining' },
  { name: 'Agri', version: '/0.6', href: '/subsidiaries/agriculture' },
  { name: 'Water', version: '/0.7', href: '/subsidiaries/water' },
];

const missionItems = [
  { name: 'Home', href: '/' },
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

const investorItems = [
  { name: 'Investor Relations', href: '/investors' },
  { name: 'Contact', href: '/contact' },
];

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [platformsOpen, setPlatformsOpen] = useState(true);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.includes('#')) return false;
    return pathname.startsWith(href);
  };

  const closeMobile = () => setMobileOpen(false);

  const sectionLabel = "text-[9px] font-bold tracking-[0.2em] uppercase text-[#9CA3AF] mb-3 px-1 font-[family-name:var(--font-space-mono)]";

  const navLink = (href: string, label: string, extra?: React.ReactNode) => (
    <Link
      href={href}
      onClick={closeMobile}
      className={`flex items-center justify-between text-[12px] font-medium pl-3 py-[7px] rounded-md transition-colors ${
        isActive(href)
          ? 'text-[#0A0F1A] bg-[rgba(0,0,0,0.04)]'
          : 'text-[#6B7280] hover:text-[#0A0F1A] hover:bg-[rgba(0,0,0,0.02)]'
      }`}
    >
      <span>{label}</span>
      {extra}
    </Link>
  );

  return (
    <>
      {/* ═══ HAMBURGER BUTTON — Mobile only ═══ */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden w-10 h-10 flex items-center justify-center bg-[#F5F6F8] border border-[rgba(0,0,0,0.06)] rounded-lg shadow-sm"
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
      </button>

      {/* ═══ MOBILE OVERLAY ═══ */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={closeMobile}
        />
      )}

      {/* ═══ SIDEBAR — Control Panel ═══ */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 w-[250px] bg-[#F5F6F8] border-r border-[rgba(0,0,0,0.06)] overflow-y-auto transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full px-4 py-6">
          {/* ═══ Logo ═══ */}
          <div className="mb-8 px-2 pt-1">
            <HarchLogo />
          </div>

          {/* ═══ Navigation ═══ */}
          <nav className="flex-1 space-y-5">

            {/* ── PLATFORMS ── */}
            <div>
              <button
                onClick={() => setPlatformsOpen(!platformsOpen)}
                className={`flex items-center justify-between w-full ${sectionLabel}`}
              >
                <span>Platforms</span>
                <ChevronDown
                  size={10}
                  className={`transition-transform text-[#9CA3AF] ${platformsOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {platformsOpen && (
                <div className="space-y-0.5 mt-1">
                  {platformItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobile}
                      className={`flex items-center justify-between text-[12px] font-medium pl-3 py-[7px] rounded-md transition-colors ${
                        isActive(item.href)
                          ? 'text-[#0A0F1A] bg-[rgba(0,0,0,0.04)]'
                          : 'text-[#6B7280] hover:text-[#0A0F1A] hover:bg-[rgba(0,0,0,0.02)]'
                      }`}
                    >
                      <span>{item.name}</span>
                      <span className="text-[10px] text-[rgba(0,0,0,0.2)] font-[family-name:var(--font-space-mono)]">{item.version}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* ── MISSION ── */}
            <div>
              <p className={sectionLabel}>Mission</p>
              <div className="space-y-0.5 mt-1">
                {missionItems.map((item) => navLink(item.href, item.name))}
              </div>
            </div>

            {/* ── DEPLOYMENTS ── */}
            <div>
              <p className={sectionLabel}>Deployments</p>
              <div className="space-y-0.5 mt-1">
                {deploymentItems.map((item) => navLink(item.href, item.name))}
              </div>
            </div>

            {/* ── INVESTORS ── */}
            <div>
              <p className={sectionLabel}>Investors</p>
              <div className="space-y-0.5 mt-1">
                {investorItems.map((item) => navLink(item.href, item.name))}
              </div>
            </div>
          </nav>

          {/* ═══ Bottom: Get Started ═══ */}
          <div className="mt-4 pt-5 border-t border-[rgba(0,0,0,0.06)]">
            <Link
              href="/contact"
              onClick={closeMobile}
              className="block w-full text-center bg-[#000000] text-white text-[10px] tracking-[0.1em] uppercase px-4 py-2.5 rounded-md font-semibold hover:bg-[#1a1a1a] transition-colors font-[family-name:var(--font-space-mono)]"
            >
              Get Started
            </Link>
            <p className="text-[9px] text-[#9CA3AF] mt-3 text-center font-[family-name:var(--font-space-mono)]">
              v0.1.0 — Casablanca
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
