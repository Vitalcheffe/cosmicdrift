'use client';

import Link from 'next/link';
import Image from 'next/image';

const verticalLinks = [
  { name: 'Intelligence', version: '/0.1', href: '/subsidiaries/intelligence' },
  { name: 'Ciment', version: '/0.2', href: '/subsidiaries/cement' },
  { name: 'Energy', version: '/0.3', href: '/subsidiaries/energy' },
  { name: 'Technology', version: '/0.4', href: '/subsidiaries/technology' },
  { name: 'Mining', version: '/0.5', href: '/subsidiaries/mining' },
  { name: 'Agri', version: '/0.6', href: '/subsidiaries/agriculture' },
  { name: 'Water', version: '/0.7', href: '/subsidiaries/water' },
];

const companyLinks = [
  { name: 'About', href: '/about' },
  { name: 'Strategy', href: '/strategy' },
  { name: 'ESG', href: '/esg' },
  { name: 'Careers', href: '/careers' },
  { name: 'Partners', href: '/partners' },
  { name: 'Contact', href: '/contact' },
];

const latestNews = [
  { title: 'Harch Intelligence Secures 500MW Data Center Site in Dakhla', date: 'Mar 2026' },
  { title: 'Harch Energy Reaches 2GW Renewable Pipeline Milestone', date: 'Feb 2026' },
  { title: 'Harch Corp Announces $2.4B Investment Pipeline', date: 'Jan 2026' },
];

const offerings = [
  'AI Data Centers',
  'Renewable Energy',
  'Cement Production',
  'Sovereign Technology',
  'Strategic Mining',
  'Precision Agriculture',
  'Water Infrastructure',
];

export function Footer() {
  return (
    <footer className="bg-black border-t border-[rgba(255,255,255,0.04)]">
      {/* Main footer — Three column Palantir style */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* Column 1: Navigation */}
          <div>
            <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/25 mb-6">Navigation</p>
            <div className="space-y-6">
              <div>
                <p className="text-[9px] font-bold tracking-[0.15em] uppercase text-white/15 mb-3">Verticals</p>
                <nav className="space-y-2">
                  {verticalLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="flex items-center justify-between text-[12px] text-white/30 hover:text-white/70 transition-colors group">
                      <span>{link.name}</span>
                      <span className="version-tag text-[10px]">{link.version}</span>
                    </Link>
                  ))}
                </nav>
              </div>
              <div>
                <p className="text-[9px] font-bold tracking-[0.15em] uppercase text-white/15 mb-3">Company</p>
                <nav className="space-y-2">
                  {companyLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="block text-[12px] text-white/30 hover:text-white/70 transition-colors">
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Column 2: Latest News */}
          <div>
            <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/25 mb-6">Latest News</p>
            <div className="space-y-5">
              {latestNews.map((item, i) => (
                <Link key={i} href="/newsroom" className="block group">
                  <p className="text-[13px] text-white/40 group-hover:text-white/80 transition-colors leading-snug mb-1">
                    {item.title}
                  </p>
                  <p className="text-[10px] text-white/15 tracking-wide">{item.date}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Offerings */}
          <div>
            <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/25 mb-6">Offerings</p>
            <div className="space-y-2">
              {offerings.map((offering) => (
                <p key={offering} className="text-[12px] text-white/30">{offering}</p>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.04)]">
              <p className="text-[10px] text-white/15 leading-relaxed">
                Harch Corp S.A.<br />
                Casablanca, Morocco<br />
                Capital: 100M MAD
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Brand bar at bottom */}
      <div className="border-t border-[rgba(255,255,255,0.04)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Image src="/logo.svg" alt="Harch Corp" width={100} height={20} className="h-4 w-auto" />
            <p className="text-[10px] text-white/15 tracking-wide">
              &copy; 2026 Harch Corp S.A. All rights reserved.
            </p>
          </div>
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
