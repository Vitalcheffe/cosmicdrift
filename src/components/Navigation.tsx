'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HarchLogo } from './HarchLogo';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const subsidiaries = [
  { name: 'Harch Intelligence', href: '/subsidiaries/intelligence' },
  { name: 'Harch Ciment', href: '/subsidiaries/cement' },
  { name: 'Harch Energy', href: '/subsidiaries/energy' },
  { name: 'Harch Technology', href: '/subsidiaries/technology' },
  { name: 'Harch Mining', href: '/subsidiaries/mining' },
  { name: 'Harch Agri', href: '/subsidiaries/agriculture' },
  { name: 'Harch Water', href: '/subsidiaries/water' },
];

const navLinks = [
  { name: 'About', href: '/about' },
  { name: 'Subsidiaries', href: '#', submenu: subsidiaries },
  { name: 'Strategy', href: '/strategy' },
  { name: 'Investors', href: '/investors' },
  { name: 'ESG', href: '/esg' },
  { name: 'Careers', href: '/careers' },
  { name: 'Newsroom', href: '/newsroom' },
  { name: 'Contact', href: '/contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'frosted-glass border-b border-harch-border' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <HarchLogo />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) =>
              link.submenu ? (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setIsSubmenuOpen(true)}
                  onMouseLeave={() => setIsSubmenuOpen(false)}
                >
                  <button className="flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-harch-muted hover:text-harch-text transition-colors duration-200 py-2">
                    {link.name}
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isSubmenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isSubmenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-0 w-64 frosted-glass border border-harch-border rounded-lg overflow-hidden"
                      >
                        {link.submenu.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="block px-4 py-3 text-sm text-harch-muted hover:text-harch-text hover:bg-white/5 transition-colors duration-150"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs uppercase tracking-[0.2em] text-harch-muted hover:text-harch-text transition-colors duration-200"
                >
                  {link.name}
                </Link>
              )
            )}

            {/* Language Toggle */}
            <div className="flex items-center gap-1 ml-4 pl-4 border-l border-harch-border">
              <Globe className="w-3.5 h-3.5 text-harch-muted" />
              <Link href="/" className="text-xs uppercase tracking-wider text-harch-gold font-medium">
                EN
              </Link>
              <span className="text-harch-muted text-xs">/</span>
              <Link href="/fr/" className="text-xs uppercase tracking-wider text-harch-muted hover:text-harch-text transition-colors">
                FR
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-harch-muted hover:text-harch-text transition-colors p-2"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden frosted-glass border-t border-harch-border overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link) =>
                link.submenu ? (
                  <div key={link.name}>
                    <button
                      onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                      className="flex items-center justify-between w-full text-xs uppercase tracking-[0.2em] text-harch-muted hover:text-harch-text transition-colors py-3"
                    >
                      {link.name}
                      <ChevronDown className={`w-3 h-3 transition-transform ${isSubmenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isSubmenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-4 space-y-1 overflow-hidden"
                        >
                          {link.submenu.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              onClick={() => setIsMobileOpen(false)}
                              className="block py-2 text-sm text-harch-muted hover:text-harch-text transition-colors"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="block text-xs uppercase tracking-[0.2em] text-harch-muted hover:text-harch-text transition-colors py-3"
                  >
                    {link.name}
                  </Link>
                )
              )}
              <div className="flex items-center gap-2 pt-4 border-t border-harch-border">
                <Globe className="w-3.5 h-3.5 text-harch-muted" />
                <Link href="/" className="text-xs uppercase tracking-wider text-harch-gold font-medium">
                  EN
                </Link>
                <span className="text-harch-muted text-xs">/</span>
                <Link href="/fr/" className="text-xs uppercase tracking-wider text-harch-muted">
                  FR
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
