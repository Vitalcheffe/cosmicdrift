'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Search, ArrowRight, ChevronDown } from 'lucide-react';

const verticalItems = [
  { name: 'Harch Intelligence', desc: 'AI Data Centers & GPU Clusters', href: '/subsidiaries/intelligence' },
  { name: 'Harch Ciment', desc: 'Industrial Cement Production', href: '/subsidiaries/cement' },
  { name: 'Harch Energy', desc: 'Renewable Energy & Green Hydrogen', href: '/subsidiaries/energy' },
  { name: 'Harch Technology', desc: 'AI Platforms, Cyber & Satellite', href: '/subsidiaries/technology' },
  { name: 'Harch Mining', desc: 'Phosphates, Cobalt & Rare Earths', href: '/subsidiaries/mining' },
  { name: 'Harch Agri', desc: 'Precision Agriculture & Vertical Farms', href: '/subsidiaries/agriculture' },
  { name: 'Harch Water', desc: 'Desalination & Smart Water Networks', href: '/subsidiaries/water' },
];

const companyItems = [
  { name: 'About', href: '/about' },
  { name: 'Strategy', href: '/strategy' },
  { name: 'ESG & Sustainability', href: '/esg' },
  { name: 'Partners', href: '/partners' },
];

const investorItems = [
  { name: 'Investor Relations', href: '/investors' },
  { name: 'Newsroom', href: '/newsroom' },
  { name: 'Careers', href: '/careers' },
  { name: 'Contact', href: '/contact' },
];

const popularSearches = ['Data Center', 'Renewable Energy', 'Investment', 'Careers', 'Mining', 'ESG'];

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const megaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen || searchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, searchOpen]);

  // Close mega menu on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setActiveMega(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setSearchQuery('');
    setActiveMega(null);
  }, []);

  return (
    <>
      {/* ═══ HEADER ═══ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? 'bg-white/92 backdrop-blur-xl border-b border-[rgba(0,0,0,0.04)] shadow-sm shadow-black/[0.02]'
            : 'bg-white/50 backdrop-blur-md'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-[64px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" onClick={closeAll} className="flex items-center gap-3 group">
            <Image src="/logo.svg" alt="Harch Corp" width={140} height={28} className="h-[22px] w-auto" priority />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" ref={megaRef}>
            {/* Verticals mega trigger */}
            <button
              onClick={() => setActiveMega(activeMega === 'verticals' ? null : 'verticals')}
              className={`px-3 py-2 text-[11px] font-semibold tracking-[0.1em] uppercase rounded-md transition-colors flex items-center gap-1 ${
                activeMega === 'verticals' ? 'text-[#0A0F1A] bg-[#0A0F1A]/[0.04]' : 'text-[#6B7280] hover:text-[#0A0F1A] hover:bg-[#0A0F1A]/[0.03]'
              }`}
            >
              Verticals <ChevronDown size={10} className={`transition-transform ${activeMega === 'verticals' ? 'rotate-180' : ''}`} />
            </button>

            <Link href="/about" className="px-3 py-2 text-[11px] font-semibold tracking-[0.1em] uppercase text-[#6B7280] hover:text-[#0A0F1A] rounded-md hover:bg-[#0A0F1A]/[0.03] transition-colors">About</Link>
            <Link href="/investors" className="px-3 py-2 text-[11px] font-semibold tracking-[0.1em] uppercase text-[#6B7280] hover:text-[#0A0F1A] rounded-md hover:bg-[#0A0F1A]/[0.03] transition-colors">Investors</Link>
            <Link href="/strategy" className="px-3 py-2 text-[11px] font-semibold tracking-[0.1em] uppercase text-[#6B7280] hover:text-[#0A0F1A] rounded-md hover:bg-[#0A0F1A]/[0.03] transition-colors">Strategy</Link>
            <Link href="/esg" className="px-3 py-2 text-[11px] font-semibold tracking-[0.1em] uppercase text-[#6B7280] hover:text-[#0A0F1A] rounded-md hover:bg-[#0A0F1A]/[0.03] transition-colors">ESG</Link>
            <Link href="/careers" className="px-3 py-2 text-[11px] font-semibold tracking-[0.1em] uppercase text-[#6B7280] hover:text-[#0A0F1A] rounded-md hover:bg-[#0A0F1A]/[0.03] transition-colors">Careers</Link>

            {/* Contact CTA */}
            <Link href="/contact" className="ml-2 px-5 py-2 bg-[#0A0F1A] text-white text-[11px] font-semibold tracking-[0.08em] uppercase rounded-md hover:bg-[#1a1f2e] transition-colors">
              Contact
            </Link>

            {/* Search */}
            <button onClick={() => { setActiveMega(null); setSearchOpen(!searchOpen); }} className="p-2 text-[#6B7280] hover:text-[#0A0F1A] transition-colors" aria-label="Search">
              <Search size={16} strokeWidth={1.5} />
            </button>
          </nav>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 text-[#6B7280] hover:text-[#0A0F1A] transition-colors" aria-label="Search">
              <Search size={16} strokeWidth={1.5} />
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-[#6B7280] hover:text-[#0A0F1A] transition-colors" aria-label="Menu">
              {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* ═══ MEGA MENU — Verticals ═══ */}
        {activeMega === 'verticals' && (
          <div className="mega-menu-enter absolute top-full left-0 right-0 bg-white border-b border-[rgba(0,0,0,0.06)] shadow-xl shadow-black/[0.04]">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Verticals list */}
                <div className="md:col-span-2">
                  <p className="section-label mb-4">Industrial Verticals</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                    {verticalItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeAll}
                        className="group flex items-start gap-3 p-3 rounded-lg hover:bg-[#FAFAFA] transition-colors"
                      >
                        <span className="text-[10px] font-bold text-[#C9A84C] mt-0.5">{item.name.replace('Harch ', '').substring(0, 3).toUpperCase()}</span>
                        <div>
                          <p className="text-sm font-semibold text-[#0A0F1A] group-hover:text-[#C9A84C] transition-colors">{item.name}</p>
                          <p className="text-[11px] text-[#9CA3AF]">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                {/* Quick links */}
                <div>
                  <p className="section-label mb-4">Quick Links</p>
                  <div className="space-y-1">
                    {investorItems.map((item) => (
                      <Link key={item.href} href={item.href} onClick={closeAll} className="block p-3 rounded-lg text-sm text-[#6B7280] hover:text-[#0A0F1A] hover:bg-[#FAFAFA] transition-colors">
                        {item.name} →
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ═══ MOBILE MENU ═══ */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col pt-20 pb-8 px-6 overflow-y-auto">
          <div className="flex-1">
            <p className="section-label mb-4">Verticals</p>
            <nav className="space-y-1 mb-8">
              {verticalItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={closeAll} className="block py-2 text-lg font-semibold text-[#0A0F1A] hover:text-[#C9A84C] transition-colors">
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="divider mb-6" />

            <p className="section-label mb-4">Company</p>
            <nav className="space-y-1 mb-8">
              {companyItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={closeAll} className="block py-2 text-lg font-semibold text-[#0A0F1A] hover:text-[#C9A84C] transition-colors">
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="divider mb-6" />

            <nav className="space-y-1">
              {investorItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={closeAll} className="block py-2 text-lg font-semibold text-[#0A0F1A] hover:text-[#C9A84C] transition-colors">
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="pt-6 border-t border-[rgba(0,0,0,0.06)]">
            <Link href="/contact" onClick={closeAll} className="inline-flex items-center gap-2 bg-[#0A0F1A] text-white px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-[#1a1f2e] transition-colors w-full justify-center">
              Get Started <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* ═══ SEARCH OVERLAY ═══ */}
      <div
        className={`fixed inset-0 z-40 bg-white/98 backdrop-blur-xl transition-all duration-400 ${
          searchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="h-full flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-20 pb-12">
          <div className="max-w-[800px] mx-auto w-full">
            <form onSubmit={(e) => { e.preventDefault(); closeAll(); }}>
              <div className="relative">
                <Search size={20} className="absolute left-0 top-1/2 -translate-y-1/2 text-[#9CA3AF]" strokeWidth={1.5} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Harch Corp..."
                  className="w-full bg-transparent border-b border-[rgba(0,0,0,0.08)] pl-10 pr-4 py-4 text-2xl md:text-4xl font-light text-[#0A0F1A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#0A0F1A] transition-colors"
                  autoFocus={searchOpen}
                />
              </div>
            </form>
            <div className="mt-12">
              <p className="section-label mb-4">Popular Searches</p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button key={term} onClick={() => setSearchQuery(term)} className="px-4 py-2 border border-[rgba(0,0,0,0.06)] rounded-lg text-[12px] text-[#6B7280] hover:text-[#0A0F1A] hover:border-[rgba(0,0,0,0.15)] transition-colors font-medium">
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
