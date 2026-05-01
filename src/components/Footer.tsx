'use client';

import Link from 'next/link';

const footerLinks = [
  { name: 'About', href: '/about' },
  { name: 'Strategy', href: '/strategy' },
  { name: 'Investors', href: '/investors' },
  { name: 'ESG', href: '/esg' },
  { name: 'Careers', href: '/careers' },
  { name: 'Newsroom', href: '/newsroom' },
  { name: 'Contact', href: '/contact' },
  { name: 'Legal', href: '/legal' },
];

const subsidiaryLinks = [
  { name: 'Intelligence', href: '/subsidiaries/intelligence' },
  { name: 'Ciment', href: '/subsidiaries/cement' },
  { name: 'Energy', href: '/subsidiaries/energy' },
  { name: 'Technology', href: '/subsidiaries/technology' },
  { name: 'Mining', href: '/subsidiaries/mining' },
  { name: 'Agri', href: '/subsidiaries/agriculture' },
  { name: 'Water', href: '/subsidiaries/water' },
];

export function Footer() {
  return (
    <footer className="bg-[#101820]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="text-[15px] font-semibold tracking-[0.2em] text-white"
            >
              HARCH CORP
            </Link>
            <p className="mt-4 text-xs text-white/30 leading-relaxed max-w-[200px]">
              Building Africa&apos;s industrial sovereignty across 7 verticals.
            </p>
          </div>

          {/* Verticals */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white/40 mb-4">
              Verticals
            </p>
            <nav className="space-y-2.5">
              {subsidiaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-xs text-white/50 hover:text-white/90 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Company */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white/40 mb-4">
              Company
            </p>
            <nav className="space-y-2.5">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-xs text-white/50 hover:text-white/90 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white/40 mb-4">
              Headquarters
            </p>
            <div className="space-y-2.5">
              <p className="text-xs text-white/50">Casablanca, Morocco</p>
              <p className="text-xs text-white/50">Harch Corp S.A.</p>
              <p className="text-xs text-white/50">Capital: 100M MAD</p>
              <p className="text-xs text-white/50">RCS Casablanca</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-6 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/25">
            &copy; 2026 Harch Corp S.A. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-[11px] text-white/25 hover:text-white/50 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-[11px] text-white/25 hover:text-white/50 transition-colors">
              Terms
            </Link>
            <Link href="/legal" className="text-[11px] text-white/25 hover:text-white/50 transition-colors">
              Legal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
