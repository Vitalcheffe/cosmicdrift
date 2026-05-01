'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Menu, X, Search, ArrowRight } from 'lucide-react';

const offerings = [
  { name: 'Harch Intelligence', href: '/subsidiaries/intelligence' },
  { name: 'Harch Ciment', href: '/subsidiaries/cement' },
  { name: 'Harch Energy', href: '/subsidiaries/energy' },
  { name: 'Harch Technology', href: '/subsidiaries/technology' },
  { name: 'Harch Mining', href: '/subsidiaries/mining' },
  { name: 'Harch Agri', href: '/subsidiaries/agriculture' },
  { name: 'Harch Water', href: '/subsidiaries/water' },
];

const sectors = [
  { name: 'AI & Data Infrastructure', href: '/subsidiaries/intelligence' },
  { name: 'Construction & Materials', href: '/subsidiaries/cement' },
  { name: 'Renewable Energy', href: '/subsidiaries/energy' },
  { name: 'Sovereign Technology', href: '/subsidiaries/technology' },
  { name: 'Mining & Critical Minerals', href: '/subsidiaries/mining' },
  { name: 'Climate-Resilient Agriculture', href: '/subsidiaries/agriculture' },
  { name: 'Water Security', href: '/subsidiaries/water' },
];

const popularSearches = [
  'Data Center',
  'Renewable Energy',
  'Investment',
  'Careers',
  'Mining',
  'ESG',
];

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen, searchOpen]);

  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setSearchQuery('');
  }, []);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    closeAll();
  }, [closeAll]);

  return (
    <>
      {/* Header Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-[rgba(0,0,0,0.06)] shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <Link
            href="/"
            onClick={closeAll}
            className="text-[15px] font-semibold tracking-[0.2em] text-[#101820] hover:opacity-70 transition-opacity"
          >
            HARCH CORP
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/about" className="text-xs tracking-[0.08em] uppercase text-[#6B7280] hover:text-[#101820] transition-colors">
              About
            </Link>
            <Link href="/strategy" className="text-xs tracking-[0.08em] uppercase text-[#6B7280] hover:text-[#101820] transition-colors">
              Strategy
            </Link>
            <Link href="/investors" className="text-xs tracking-[0.08em] uppercase text-[#6B7280] hover:text-[#101820] transition-colors">
              Investors
            </Link>
            <Link href="/careers" className="text-xs tracking-[0.08em] uppercase text-[#6B7280] hover:text-[#101820] transition-colors">
              Careers
            </Link>
            <Link href="/contact" className="text-xs tracking-[0.08em] uppercase text-[#6B7280] hover:text-[#101820] transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setMenuOpen(false);
                setSearchOpen(!searchOpen);
              }}
              className="p-2 text-[#6B7280] hover:text-[#101820] transition-colors"
              aria-label="Search"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => {
                setSearchOpen(false);
                setMenuOpen(!menuOpen);
              }}
              className="p-2 text-[#6B7280] hover:text-[#101820] transition-colors md:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? (
                <X size={20} strokeWidth={1.5} />
              ) : (
                <Menu size={20} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-20 pb-12">
          <div className="max-w-[1400px] mx-auto w-full flex-1 flex flex-col justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
              {/* Left Column - Offerings */}
              <div>
                <p className="section-label mb-8">Offerings</p>
                <nav className="space-y-4">
                  {offerings.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeAll}
                      className="block text-2xl md:text-3xl font-light text-[#9CA3AF] hover:text-[#101820] transition-colors duration-200 group"
                    >
                      <span className="inline-flex items-center gap-3">
                        {item.name}
                        <ArrowRight
                          size={16}
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        />
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Right Column - Sectors */}
              <div>
                <p className="section-label mb-8">Sectors</p>
                <nav className="space-y-4">
                  {sectors.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeAll}
                      className="block text-2xl md:text-3xl font-light text-[#9CA3AF] hover:text-[#101820] transition-colors duration-200 group"
                    >
                      <span className="inline-flex items-center gap-3">
                        {item.name}
                        <ArrowRight
                          size={16}
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        />
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 md:mt-24 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Link
                href="/contact"
                onClick={closeAll}
                className="inline-flex items-center gap-2 bg-[#101820] text-white px-8 py-3 rounded-md text-sm font-medium hover:bg-[#1f2937] transition-colors"
              >
                Get Started
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/investors"
                onClick={closeAll}
                className="text-[#6B7280] hover:text-[#101820] text-sm transition-colors"
              >
                Investor Relations &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Search Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-all duration-500 ${
          searchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="h-full flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-20 pb-12">
          <div className="max-w-[800px] mx-auto w-full">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                  strokeWidth={1.5}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Harch Corp..."
                  className="w-full bg-transparent border-b border-[rgba(0,0,0,0.1)] pl-10 pr-4 py-4 text-2xl md:text-4xl font-light text-[#101820] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#101820] transition-colors"
                  autoFocus={searchOpen}
                />
              </div>
            </form>

            <div className="mt-12">
              <p className="section-label mb-4">Popular Searches</p>
              <div className="flex flex-wrap gap-3">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term);
                    }}
                    className="px-4 py-2 border border-[rgba(0,0,0,0.08)] rounded-md text-sm text-[#6B7280] hover:text-[#101820] hover:border-[rgba(0,0,0,0.2)] transition-colors"
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
