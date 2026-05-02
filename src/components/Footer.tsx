'use client';

import Link from 'next/link';
import Image from 'next/image';

const verticalLinks = [
  { name: 'Harch Intelligence', href: '/subsidiaries/intelligence' },
  { name: 'Harch Ciment', href: '/subsidiaries/cement' },
  { name: 'Harch Energy', href: '/subsidiaries/energy' },
  { name: 'Harch Technology', href: '/subsidiaries/technology' },
  { name: 'Harch Mining', href: '/subsidiaries/mining' },
  { name: 'Harch Agri', href: '/subsidiaries/agriculture' },
  { name: 'Harch Water', href: '/subsidiaries/water' },
];

const companyLinks = [
  { name: 'About', href: '/about' },
  { name: 'Strategy', href: '/strategy' },
  { name: 'Investors', href: '/investors' },
  { name: 'ESG', href: '/esg' },
  { name: 'Careers', href: '/careers' },
  { name: 'Newsroom', href: '/newsroom' },
  { name: 'Contact', href: '/contact' },
  { name: 'Partners', href: '/partners' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Use', href: '/terms' },
  { name: 'Legal Mentions', href: '/legal' },
];

export function Footer() {
  return (
    <footer className="bg-[#0A0F1A]">
      {/* Main footer */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image src="/logo.svg" alt="Harch Corp" width={120} height={24} className="h-5 w-auto brightness-0 invert" />
            </Link>
            <p className="text-[12px] text-white/30 leading-relaxed mb-6 max-w-[220px]">
              Building Africa&apos;s industrial sovereignty across 7 verticals. From Casablanca to the continent.
            </p>
            <p className="text-[10px] text-white/20 tracking-wide">
              Harch Corp S.A.<br />
              Casablanca, Morocco<br />
              Capital: 100M MAD<br />
              RCS Casablanca
            </p>
          </div>

          {/* Verticals */}
          <div>
            <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/25 mb-5">Verticals</p>
            <nav className="space-y-2.5">
              {verticalLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block text-[12px] text-white/40 hover:text-white/80 transition-colors">
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Company */}
          <div>
            <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/25 mb-5">Company</p>
            <nav className="space-y-2.5">
              {companyLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block text-[12px] text-white/40 hover:text-white/80 transition-colors">
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal */}
          <div>
            <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/25 mb-5">Legal</p>
            <nav className="space-y-2.5">
              {legalLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block text-[12px] text-white/40 hover:text-white/80 transition-colors">
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-white/15 tracking-wide">
            &copy; 2026 Harch Corp S.A. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-[10px] text-white/15 hover:text-white/40 transition-colors">Privacy</Link>
            <Link href="/terms" className="text-[10px] text-white/15 hover:text-white/40 transition-colors">Terms</Link>
            <Link href="/legal" className="text-[10px] text-white/15 hover:text-white/40 transition-colors">Legal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
