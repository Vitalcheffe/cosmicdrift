'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

type NavLink = { name: string; version?: string; href: string };

export function Footer() {
  const t = useTranslations('footer');

  const verticalLinks: NavLink[] = [
    { name: t('intelligence'), version: '/0.1', href: '/subsidiaries/intelligence' },
    { name: t('cement'), version: '/0.2', href: '/subsidiaries/cement' },
    { name: t('energy'), version: '/0.3', href: '/subsidiaries/energy' },
    { name: t('technology'), version: '/0.4', href: '/subsidiaries/technology' },
    { name: t('mining'), version: '/0.5', href: '/subsidiaries/mining' },
    { name: t('agri'), version: '/0.6', href: '/subsidiaries/agriculture' },
    { name: t('water'), version: '/0.7', href: '/subsidiaries/water' },
    { name: t('finance'), version: '/0.8', href: '/subsidiaries/finance' },
  ];

  const companyLinks: NavLink[] = [
    { name: t('about'), href: '/about' },
    { name: t('leadership'), href: '/company/leadership' },
    { name: t('strategy'), href: '/strategy' },
    { name: t('esg'), href: '/esg' },
    { name: t('dei'), href: '/company/dei' },
    { name: t('harchVentures'), href: '/company/ventures' },
    { name: t('careers'), href: '/careers' },
    { name: t('partners'), href: '/partners' },
    { name: t('pressMedia'), href: '/press' },
    { name: t('requestQuote'), href: '/quote' },
    { name: t('requestBriefing'), href: '/contact' },
  ];

  const developerLinks: NavLink[] = [
    { name: t('documentation'), href: '/docs' },
    { name: t('apiReference'), href: '/docs/api' },
    { name: t('sdks'), href: '/docs/sdks' },
    { name: t('developerCenter'), href: '/developers' },
    { name: t('apiPlayground'), href: '/developers/playground' },
    { name: t('openSource'), href: '/developers/open-source' },
    { name: t('architecture'), href: '/docs/architecture' },
    { name: t('changelog'), href: '/docs/changelog' },
  ];

  const resourceLinks: NavLink[] = [
    { name: t('blog'), href: '/blog' },
    { name: t('engineeringBlog'), href: '/engineering-blog' },
    { name: t('community'), href: '/community' },
    { name: t('events'), href: '/events' },
    { name: t('learnCertify'), href: '/learn' },
    { name: t('glossary'), href: '/glossary' },
    { name: t('status'), href: '/status' },
    { name: t('support'), href: '/support' },
    { name: t('faq'), href: '/faq' },
  ];

  const trustLinks: NavLink[] = [
    { name: t('trustCenter'), href: '/trust' },
    { name: t('security'), href: '/trust/security' },
    { name: t('compliance'), href: '/trust/compliance' },
    { name: t('aiEthics'), href: '/trust/ai-ethics' },
    { name: t('vulnerabilityDisclosure'), href: '/trust/vulnerability-disclosure' },
    { name: t('privacyPolicy'), href: '/privacy' },
    { name: t('systemStatus'), href: '/status' },
  ];

  const businessLinks: NavLink[] = [
    { name: t('pricing'), href: '/pricing' },
    { name: t('calculator'), href: '/pricing/calculator' },
    { name: t('customers'), href: '/customers' },
    { name: t('startupProgram'), href: '/startup-program' },
    { name: t('investorRelations'), href: '/investors' },
  ];

  const legalLinks: NavLink[] = [
    { name: t('legalHub'), href: '/legal/hub' },
    { name: t('privacyPolicy'), href: '/privacy' },
    { name: t('termsOfService'), href: '/terms' },
    { name: t('cookiePolicy'), href: '/legal/cookies' },
    { name: t('gdpr'), href: '/legal/gdpr' },
    { name: t('sla'), href: '/legal/sla' },
  ];

  const latestNews = [
    { title: t('news.item1Title'), date: t('news.item1Date') },
    { title: t('news.item2Title'), date: t('news.item2Date') },
    { title: t('news.item3Title'), date: t('news.item3Date') },
  ];

  return (
    <footer className="bg-[#0D0D0D] border-t border-[rgba(255,255,255,0.04)]">
      {/* Main footer — Multi column */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-10">
          {/* Column 1: Verticals */}
          <div>
            <p className="text-[9px] font-bold tracking-[0.15em] uppercase text-white/55 mb-4">{t('verticals')}</p>
            <nav className="space-y-2">
              {verticalLinks.map((link) => (
                <Link key={link.href} href={link.href} className="flex items-center justify-between text-[11px] text-white/60 hover:text-white/70 transition-colors group">
                  <span>{link.name}</span>
                  <span className="version-tag text-[9px]">{link.version}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 2: Company */}
          <div>
            <p className="text-[9px] font-bold tracking-[0.15em] uppercase text-white/55 mb-4">{t('company')}</p>
            <nav className="space-y-2">
              {companyLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block text-[11px] text-white/60 hover:text-white/70 transition-colors">
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Developers */}
          <div>
            <p className="text-[9px] font-bold tracking-[0.15em] uppercase text-white/55 mb-4">{t('developers')}</p>
            <nav className="space-y-2">
              {developerLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block text-[11px] text-white/60 hover:text-white/70 transition-colors">
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 4: Resources */}
          <div>
            <p className="text-[9px] font-bold tracking-[0.15em] uppercase text-white/55 mb-4">{t('resources')}</p>
            <nav className="space-y-2">
              {resourceLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block text-[11px] text-white/60 hover:text-white/70 transition-colors">
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 5: Trust & Business */}
          <div>
            <p className="text-[9px] font-bold tracking-[0.15em] uppercase text-white/55 mb-4">{t('trust')}</p>
            <nav className="space-y-2">
              {trustLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block text-[11px] text-white/60 hover:text-white/70 transition-colors">
                  {link.name}
                </Link>
              ))}
            </nav>
            <p className="text-[9px] font-bold tracking-[0.15em] uppercase text-white/55 mb-4 mt-6">{t('business')}</p>
            <nav className="space-y-2">
              {businessLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block text-[11px] text-white/60 hover:text-white/70 transition-colors">
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 6: Latest News + Corporate */}
          <div>
            <p className="text-[9px] font-bold tracking-[0.15em] uppercase text-white/55 mb-4">{t('latestNews')}</p>
            <div className="space-y-4">
              {latestNews.map((item, i) => (
                <Link key={i} href="/newsroom" className="block group">
                  <p className="text-[11px] text-white/40 group-hover:text-white/80 transition-colors leading-snug mb-1">
                    {item.title}
                  </p>
                  <p className="text-[9px] text-white/55 tracking-wide">{item.date}</p>
                </Link>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.04)]">
              <p className="text-[10px] text-white/55 leading-relaxed">
                Harch Corp S.A.<br />
                {t('location')}<br />
                {t('capital')}
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
                  {t('allSystemsOperational')}
                </Link>
              </div>
              <span className="text-[9px] text-white/10">|</span>
              <span className="text-[10px] text-white/20 font-[family-name:var(--font-space-mono)]">99.98% {t('uptime')}</span>
            </div>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <Link href="/trust/security" className="text-[10px] text-white/25 hover:text-white/60 transition-colors flex items-center gap-1.5">
                {t('security')}
              </Link>
              <Link href="/trust/compliance" className="text-[10px] text-white/25 hover:text-white/60 transition-colors flex items-center gap-1.5">
                {t('compliance')}
              </Link>
              <Link href="/privacy" className="text-[10px] text-white/25 hover:text-white/60 transition-colors flex items-center gap-1.5">
                {t('privacyPolicy')}
              </Link>
              <Link href="/status" className="text-[10px] text-white/25 hover:text-white/60 transition-colors flex items-center gap-1.5">
                {t('systemStatus')}
              </Link>
              <Link href="/trust" className="text-[10px] text-white/25 hover:text-white/60 transition-colors flex items-center gap-1.5">
                {t('trustCenter')}
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
            <p className="text-[10px] text-white/55 tracking-wide">
              &copy; 2026 Harch Corp S.A. {t('allRightsReserved')}
            </p>
            <div className="flex items-center gap-4">
              <a href="https://wa.me/212522000000" target="_blank" rel="noopener noreferrer" aria-label="Contact Harch Corp on WhatsApp" className="text-[10px] text-white/55 hover:text-white/70 transition-colors flex items-center gap-1">WhatsApp</a>
              <a href="https://linkedin.com/company/harchcorp" target="_blank" rel="noopener noreferrer" aria-label="Harch Corp LinkedIn" className="text-[10px] text-white/55 hover:text-white/70 transition-colors">LinkedIn</a>
              <a href="https://twitter.com/harchcorp" target="_blank" rel="noopener noreferrer" aria-label="Harch Corp Twitter" className="text-[10px] text-white/55 hover:text-white/70 transition-colors">Twitter</a>
              <a href="https://github.com/HarchCorp" target="_blank" rel="noopener noreferrer" aria-label="Harch Corp GitHub — Open Source" className="text-[10px] text-white/55 hover:text-white/70 transition-colors">GitHub</a>
              <a href="https://www.youtube.com/@harchcorp" target="_blank" rel="noopener noreferrer" aria-label="Harch Corp YouTube" className="text-[10px] text-white/55 hover:text-white/70 transition-colors">YouTube</a>
            </div>
          </div>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-[10px] text-white/55 hover:text-white/70 transition-colors">{link.name}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
