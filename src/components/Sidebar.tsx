'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { HarchLogo } from '@/components/HarchLogo';

const verticalItems = [
  { name: 'Intelligence', version: '/0.1', href: '/subsidiaries/intelligence' },
  { name: 'Ciment', version: '/0.2', href: '/subsidiaries/cement' },
  { name: 'Energy', version: '/0.3', href: '/subsidiaries/energy' },
  { name: 'Technology', version: '/0.4', href: '/subsidiaries/technology' },
  { name: 'Mining', version: '/0.5', href: '/subsidiaries/mining' },
  { name: 'Agri', version: '/0.6', href: '/subsidiaries/agriculture' },
  { name: 'Water', version: '/0.7', href: '/subsidiaries/water' },
];

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Strategy', href: '/strategy' },
  { name: 'Investors', href: '/investors' },
  { name: 'ESG', href: '/esg' },
  { name: 'Careers', href: '/careers' },
  { name: 'Contact', href: '/contact' },
];

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [verticalsOpen, setVerticalsOpen] = useState(true);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* ═══ HAMBURGER BUTTON — Mobile only ═══ */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden w-10 h-10 flex items-center justify-center bg-white/95 backdrop-blur-sm border border-[rgba(0,0,0,0.06)] rounded-lg shadow-sm"
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

      {/* ═══ SIDEBAR ═══ */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 w-[240px] bg-white border-r border-[rgba(0,0,0,0.06)] overflow-y-auto transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full px-5 py-6">
          {/* Logo */}
          <div className="mb-8 px-1">
            <HarchLogo />
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            {/* Home */}
            <Link
              href="/"
              onClick={closeMobile}
              className={`block text-[12px] font-medium pl-2 py-1.5 transition-colors ${
                isActive('/') ? 'text-[#0A0F1A]' : 'text-[#6B7280] hover:text-[#0A0F1A]'
              }`}
            >
              Home
            </Link>

            {/* Verticals section */}
            <div className="mt-6">
              <button
                onClick={() => setVerticalsOpen(!verticalsOpen)}
                className="flex items-center justify-between w-full text-[9px] font-bold tracking-[0.2em] uppercase text-[#9CA3AF] mb-3 px-0"
              >
                Verticals
                <ChevronDown
                  size={10}
                  className={`transition-transform ${verticalsOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {verticalsOpen && (
                <div className="space-y-0.5">
                  {verticalItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobile}
                      className={`flex items-center justify-between text-[12px] font-medium pl-3 py-1.5 transition-colors ${
                        isActive(item.href)
                          ? 'text-[#0A0F1A]'
                          : 'text-[#6B7280] hover:text-[#0A0F1A]'
                      }`}
                    >
                      <span>{item.name}</span>
                      <span className="text-[10px] text-[rgba(0,0,0,0.2)] font-[family-name:var(--font-space-mono)]">{item.version}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Company links */}
            <div className="mt-6">
              <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#9CA3AF] mb-3">Company</p>
              <div className="space-y-0.5">
                {navItems.filter(item => item.name !== 'Home').map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobile}
                    className={`block text-[12px] font-medium pl-2 py-1.5 transition-colors ${
                      isActive(item.href)
                        ? 'text-[#0A0F1A]'
                        : 'text-[#6B7280] hover:text-[#0A0F1A]'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Get Started button */}
          <div className="mt-6 pt-6 border-t border-[rgba(0,0,0,0.04)]">
            <Link
              href="/contact"
              onClick={closeMobile}
              className="block w-full text-center bg-[#000000] text-white text-[10px] tracking-[0.1em] uppercase px-4 py-2.5 rounded font-medium hover:bg-[#0A0F1A] transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
