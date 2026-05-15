'use client';

import Link from 'next/link';
import Image from 'next/image';

const verticalLinks = [
  { name: 'Intelligence', version: '/0.1', href: '/subsidiaries/intelligence' },
  { name: 'Cement', version: '/0.2', href: '/subsidiaries/cement' },
  { name: 'Energy', version: '/0.3', href: '/subsidiaries/energy' },
  { name: 'Technology', version: '/0.4', href: '/subsidiaries/technology' },
  { name: 'Mining', version: '/0.5', href: '/subsidiaries/mining' },
  { name: 'Agri', version: '/0.6', href: '/subsidiaries/agriculture' },
  { name: 'Water', version: '/0.7', href: '/subsidiaries/water' },
  { name: 'Finance', version: '/0.8', href: '/subsidiaries/finance' },
];

const companyLinks = [
  { name: 'About', href: '/about' },
  { name: 'Leadership', href: '/company/leadership' },
  { name: 'Strategy', href: '/strategy' },
  { name: 'ESG', href: '/esg' },
  { name: 'DEI', href: '/company/dei' },
  { name: 'Harch Ventures', href: '/company/ventures' },
  { name: 'Careers', href: '/careers' },
  { name: 'Partners', href: '/partners' },
  { name: 'Press & Media', href: '/press' },
  { name: 'Request a Quote', href: '/quote' },
  { name: 'Request Briefing', href: '/contact' },
];

const developerLinks = [
  { name: 'Documentation', href: '/docs' },
  { name: 'API Reference', href: '/docs/api' },
  { name: 'SDKs', href: '/docs/sdks' },
  { name: 'Developer Center', href: '/developers' },
  { name: 'API Playground', href: '/developers/playground' },
  { name: 'Open Source', href: '/developers/open-source' },
  { name: 'Architecture', href: '/docs/architecture' },
  { name: 'Changelog', href: '/docs/changelog' },
];

const resourceLinks = [
  { name: 'Blog', href: '/blog' },
  { name: 'Engineering Blog', href: '/engineering-blog' },
  { name: 'Community', href: '/community' },
  { name: 'Events', href: '/events' },
  { name: 'Learn & Certify', href: '/learn' },
  { name: 'Glossary', href: '/glossary' },
  { name: 'Status', href: '/status' },
  { name: 'Support', href: '/support' },
  { name: 'FAQ', href: '/faq' },
];

const trustLinks = [
  { name: 'Trust Center', href: '/trust' },
  { name: 'Security', href: '/trust/security' },
  { name: 'Compliance', href: '/trust/compliance' },
  { name: 'AI Ethics', href: '/trust/ai-ethics' },
  { name: 'Vulnerability Disclosure', href: '/trust/vulnerability-disclosure' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'System Status', href: '/status' },
];

const businessLinks = [
  { name: 'Pricing', href: '/pricing' },
  { name: 'Calculator', href: '/pricing/calculator' },
  { name: 'Customers', href: '/customers' },
  { name: 'Startup Program', href: '/startup-program' },
  { name: 'Investor Relations', href: '/investors' },
];

const legalLinks = [
  { name: 'Legal Hub', href: '/legal/hub' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Cookie Policy', href: '/legal/cookies' },
  { name: 'GDPR', href: '/legal/gdpr' },
  { name: 'SLA', href: '/legal/sla' },
];

const latestNews = [
  { title: 'Harch Intelligence: 500MW Dakhla Data Center Enters Engineering Phase', date: 'Mar 2026' },
  { title: 'Harch Cement Secures Gambia Permits — 500kT/yr Facility Greenlit', date: 'Feb 2026' },
  { title: 'Harch Corp Announces $2.4B Investment Pipeline Across 7 Verticals', date: 'Jan 2026' },
];

export function Footer() {
  return (
    <footer className="bg-[#0D0D0D] border-t border-[rgba(255,255,255,0.04)]">
      {/* Main footer — Multi column */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-10">
          {/* Column 1: Verticals */}
          <div>
            <p className="text-[9px] font-bold tracking-[0.15em] uppercase text-white/15 mb-4">Verticals</p>
            <nav className="space-y-2">
              {verticalLinks.map((link) => (
                <Link key={link.href} href={link.href} className="flex items-center justify-between text-[11px] text-white/30 hover:text-white/70 transition-colors group">
                  <span>{link.name}</span>
                  <span className="version-tag text-[9px]">{link.version}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 2: Company */}
          <div>
            <p className="text-[9px] font-bold tracking-[0.15em] uppercase text-white/15 mb-4">Company</p>
            <nav className="space-y-2">
              {companyLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block text-[11px] text-white/30 hover:text-white/70 transition-colors">
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Developers */}
          <div>
            <p className="text-[9px] font-bold tracking-[0.15em] uppercase text-white/15 mb-4">Developers</p>
            <nav className="space-y-2">
              {developerLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block text-[11px] text-white/30 hover:text-white/70 transition-colors">
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 4: Resources */}
          <div>
            <p className="text-[9px] font-bold tracking-[0.15em] uppercase text-white/15 mb-4">Resources</p>
            <nav className="space-y-2">
              {resourceLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block text-[11px] text-white/30 hover:text-white/70 transition-colors">
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 5: Trust & Business */}
          <div>
            <p className="text-[9px] font-bold tracking-[0.15em] uppercase text-white/15 mb-4">Trust</p>
            <nav className="space-y-2">
              {trustLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block text-[11px] text-white/30 hover:text-white/70 transition-colors">
                  {link.name}
                </Link>
              ))}
            </nav>
            <p className="text-[9px] font-bold tracking-[0.15em] uppercase text-white/15 mb-4 mt-6">Business</p>
            <nav className="space-y-2">
              {businessLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block text-[11px] text-white/30 hover:text-white/70 transition-colors">
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 6: Latest News + Corporate */}
          <div>
            <p className="text-[9px] font-bold tracking-[0.15em] uppercase text-white/15 mb-4">Latest News</p>
            <div className="space-y-4">
              {latestNews.map((item, i) => (
                <Link key={i} href="/newsroom" className="block group">
                  <p className="text-[11px] text-white/40 group-hover:text-white/80 transition-colors leading-snug mb-1">
                    {item.title}
                  </p>
                  <p className="text-[9px] text-white/15 tracking-wide">{item.date}</p>
                </Link>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.04)]">
              <p className="text-[10px] text-white/15 leading-relaxed">
                Harch Corp S.A.<br />
                Casablanca, Morocco<br />
                Capital: 100M MAD
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ TRUST CENTER BAR ═══ */}
      <div className="border-t border-[rgba(255,255,255,0.04)] bg-[rgba(74,123,95,0.03)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4A7B5F]" style={{ boxShadow: '0 0 6px rgba(74,123,95,0.5)' }} />
                <Link href="/status" className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#4A7B5F] hover:text-[#5A9B7F] transition-colors">
                  All Systems Operational
                </Link>
              </div>
              <span className="text-[9px] text-white/10">|</span>
              <span className="text-[10px] text-white/20 font-[family-name:var(--font-space-mono)]">99.98% Uptime</span>
            </div>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <Link href="/trust/security" className="text-[10px] text-white/25 hover:text-white/60 transition-colors flex items-center gap-1.5">
                Security
              </Link>
              <Link href="/trust/compliance" className="text-[10px] text-white/25 hover:text-white/60 transition-colors flex items-center gap-1.5">
                Compliance
              </Link>
              <Link href="/privacy" className="text-[10px] text-white/25 hover:text-white/60 transition-colors flex items-center gap-1.5">
                Privacy Policy
              </Link>
              <Link href="/status" className="text-[10px] text-white/25 hover:text-white/60 transition-colors flex items-center gap-1.5">
                System Status
              </Link>
              <Link href="/trust" className="text-[10px] text-white/25 hover:text-white/60 transition-colors flex items-center gap-1.5">
                Trust Center
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Brand bar at bottom */}
      <div className="border-t border-[rgba(255,255,255,0.04)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Image src="/logo.svg" alt="Harch Corp" width={100} height={20} className="h-4 w-auto brightness-0 invert" />
            <p className="text-[10px] text-white/15 tracking-wide">
              &copy; 2026 Harch Corp S.A. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://linkedin.com/company/harchcorp" target="_blank" rel="noopener noreferrer" aria-label="Harch Corp LinkedIn" className="text-[10px] text-white/15 hover:text-white/40 transition-colors">LinkedIn</a>
              <a href="https://twitter.com/harchcorp" target="_blank" rel="noopener noreferrer" aria-label="Harch Corp Twitter" className="text-[10px] text-white/15 hover:text-white/40 transition-colors">Twitter</a>
              <a href="https://github.com/HarchCorp" target="_blank" rel="noopener noreferrer" aria-label="Harch Corp GitHub — Open Source" className="text-[10px] text-white/15 hover:text-white/40 transition-colors">GitHub</a>
              <a href="https://www.youtube.com/@harchcorp" target="_blank" rel="noopener noreferrer" aria-label="Harch Corp YouTube" className="text-[10px] text-white/15 hover:text-white/40 transition-colors">YouTube</a>
            </div>
          </div>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-[10px] text-white/15 hover:text-white/40 transition-colors">{link.name}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
