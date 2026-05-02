'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Search, ArrowRight, ChevronDown } from 'lucide-react';

const verticalItems = [
  { name: 'Harch Intelligence', version: '/0.1', desc: 'AI Data Centers & GPU Clusters', href: '/subsidiaries/intelligence' },
  { name: 'Harch Ciment', version: '/0.2', desc: 'Industrial Cement Production', href: '/subsidiaries/cement' },
  { name: 'Harch Energy', version: '/0.3', desc: 'Renewable Energy & Green Hydrogen', href: '/subsidiaries/energy' },
  { name: 'Harch Technology', version: '/0.4', desc: 'AI Platforms, Cyber & Satellite', href: '/subsidiaries/technology' },
  { name: 'Harch Mining', version: '/0.5', desc: 'Phosphates, Cobalt & Rare Earths', href: '/subsidiaries/mining' },
  { name: 'Harch Agri', version: '/0.6', desc: 'Precision Agriculture & Vertical Farms', href: '/subsidiaries/agriculture' },
  { name: 'Harch Water', version: '/0.7', desc: 'Desalination & Smart Water Networks', href: '/subsidiaries/water' },
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (window.scrollY > 100) setAnnouncementVisible(false);
    };
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

  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setSearchQuery('');
    setDropdownOpen(false);
  }, []);

  return (
    <>
      {/* ═══ ANNOUNCEMENT BAR ═══ */}
      <div
        className={`announcement-bar fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          announcementVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <Link href="/strategy" onClick={closeAll} className="block w-full text-center text-white hover:text-white/90 transition-colors">
          Building Africa&apos;s Industrial Sovereignty &rarr;
        </Link>
      </div>

      {/* ═══ HEADER ═══ */}
      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-500 ${
          announcementVisible ? 'top-[33px]' : 'top-0'
        } ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-[rgba(0,0,0,0.04)]'
            : 'bg-white/50 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-[64px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" onClick={closeAll} className="flex items-center gap-3 group">
            <Image src="/logo.svg" alt="Harch Corp" width={140} height={28} className="h-[22px] w-auto" priority />
          </Link>

          {/* Desktop Navigation Links - Palantir style */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Verticals dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                className="flex items-center gap-1 px-3 py-2 text-[12px] font-medium tracking-[0.04em] text-[#6B7280] hover:text-[#0A0F1A] transition-colors"
              >
                Verticals <ChevronDown size={12} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-[rgba(0,0,0,0.06)] rounded-xl shadow-xl shadow-black/5 p-2">
                  {verticalItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeAll}
                      className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-[rgba(0,0,0,0.02)] transition-colors group"
                    >
                      <div>
                        <span className="text-[13px] font-semibold text-[#0A0F1A] group-hover:text-[#000000]">{item.name}</span>
                        <p className="text-[11px] text-[#9CA3AF] mt-0.5">{item.desc}</p>
                      </div>
                      <span className="version-tag">{item.version}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/about" onClick={closeAll} className="px-3 py-2 text-[12px] font-medium tracking-[0.04em] text-[#6B7280] hover:text-[#0A0F1A] transition-colors">About</Link>
            <Link href="/strategy" onClick={closeAll} className="px-3 py-2 text-[12px] font-medium tracking-[0.04em] text-[#6B7280] hover:text-[#0A0F1A] transition-colors">Strategy</Link>
            <Link href="/investors" onClick={closeAll} className="px-3 py-2 text-[12px] font-medium tracking-[0.04em] text-[#6B7280] hover:text-[#0A0F1A] transition-colors">Investors</Link>
            <Link href="/esg" onClick={closeAll} className="px-3 py-2 text-[12px] font-medium tracking-[0.04em] text-[#6B7280] hover:text-[#0A0F1A] transition-colors">ESG</Link>
            <Link href="/careers" onClick={closeAll} className="px-3 py-2 text-[12px] font-medium tracking-[0.04em] text-[#6B7280] hover:text-[#0A0F1A] transition-colors">Careers</Link>
          </nav>

          {/* Right side: Get Started + Search + Menu */}
          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              onClick={closeAll}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2 bg-white text-[#0A0F1A] text-[11px] font-semibold tracking-[0.08em] uppercase rounded-md border border-[rgba(0,0,0,0.15)] hover:border-[#0A0F1A] hover:bg-[#0A0F1A] hover:text-white transition-all duration-300"
            >
              Get Started
            </Link>
            <button
              onClick={() => { setMenuOpen(false); setSearchOpen(!searchOpen); }}
              className="p-2 text-[#6B7280] hover:text-[#0A0F1A] transition-colors"
              aria-label="Search"
            >
              <Search size={16} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => { setSearchOpen(false); setMenuOpen(!menuOpen); }}
              className="p-2 text-[#6B7280] hover:text-[#0A0F1A] transition-colors lg:hidden"
              aria-label="Menu"
            >
              {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* ═══ FULL-SCREEN WHITE MENU ═══ */}
      <div
        className={`fixed inset-0 z-30 bg-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="h-full flex flex-col pt-20 pb-8 px-6 md:px-12 lg:px-20 overflow-y-auto">
          <div className="flex-1 max-w-[900px]">
            {/* Verticals */}
            <p className="section-label mb-6">Verticals</p>
            <nav className="space-y-1 mb-12">
              {verticalItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeAll}
                  className="group flex items-center justify-between py-3 border-b border-[rgba(0,0,0,0.04)] hover:border-[rgba(0,0,0,0.08)] transition-colors"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-2xl md:text-3xl font-bold text-[#0A0F1A] group-hover:text-[#000000] transition-colors">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="version-tag">{item.version}</span>
                    <ArrowRight size={14} className="text-[rgba(0,0,0,0.15)] group-hover:text-[#000000] group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </nav>

            {/* Company */}
            <p className="section-label mb-6">Company</p>
            <nav className="space-y-1 mb-12">
              {companyItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeAll}
                  className="block py-2.5 text-lg font-medium text-[#6B7280] hover:text-[#0A0F1A] transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Investor & Careers */}
            <p className="section-label mb-6">Investors & Careers</p>
            <nav className="space-y-1">
              {investorItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeAll}
                  className="block py-2.5 text-lg font-medium text-[#6B7280] hover:text-[#0A0F1A] transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* ═══ SEARCH OVERLAY ═══ */}
      <div
        className={`fixed inset-0 z-30 bg-white/98 backdrop-blur-xl transition-all duration-400 ${
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
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-4 py-2 border border-[rgba(0,0,0,0.06)] rounded-lg text-[12px] text-[#6B7280] hover:text-[#0A0F1A] hover:border-[rgba(0,0,0,0.15)] transition-colors font-medium"
                  >
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
