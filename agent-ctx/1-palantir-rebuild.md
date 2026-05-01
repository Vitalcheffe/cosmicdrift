# Task: Rebuild Harch Corp Website in Palantir Style

## Summary
Rebuilt the entire Harch Corp website from scratch with the Palantir design language — monochrome, minimalist, dark theme with full-screen overlay navigation.

## Files Modified/Created

### Core
- `src/app/globals.css` — Replaced gold/blue theme with pure monochrome Palantir palette (black #0A0A0A, white, gray)
- `src/app/layout.tsx` — Updated body classes, kept Inter font and SEO metadata
- `src/app/page.tsx` — Complete homepage with 7 Palantir-style sections

### Components
- `src/components/Navigation.tsx` — Full-screen overlay navigation with hamburger menu, search overlay, two-column layout (Offerings + Sectors)
- `src/components/Footer.tsx` — Minimal Palantir-style footer with horizontal links
- `src/components/CookieConsent.tsx` — RGPD compliant cookie banner

### Pages
- `src/app/about/page.tsx` + `AboutPageClient.tsx` — About page with story, mission/vision, values, leadership
- `src/app/subsidiaries/[slug]/page.tsx` + `SubsidiaryPageClient.tsx` — Dynamic subsidiary pages for all 7 verticals
- `src/app/strategy/page.tsx` + `StrategyPageClient.tsx` — Three pillars, 2030 roadmap, competitive advantages
- `src/app/investors/page.tsx` + `InvestorsPageClient.tsx` — Investment thesis, financial highlights, documents, calendar
- `src/app/esg/page.tsx` + `ESGPageClient.tsx` — Environmental, social, governance commitments
- `src/app/careers/page.tsx` + `CareersPageClient.tsx` — Benefits, 8 job listings, general application
- `src/app/newsroom/page.tsx` + `NewsroomPageClient.tsx` — 6 press articles, media contact
- `src/app/contact/page.tsx` + `ContactPageClient.tsx` — Contact form, 3 office locations
- `src/app/legal/page.tsx` + `LegalPageClient.tsx` — Full legal mentions (SA, capital, RCS, DPO, etc.)
- `src/app/privacy/page.tsx` + `PrivacyPageClient.tsx` — Full GDPR privacy policy (10 sections)
- `src/app/terms/page.tsx` + `TermsPageClient.tsx` — Terms of use (9 sections)
- `src/app/partners/page.tsx` + `PartnersPageClient.tsx` — Partner categories (4 types)

## Design Decisions
- **No gold (#C9A84C)** — Replaced with pure white/gray monochrome
- **No Three.js/3D** — Removed entirely, not needed for Palantir aesthetic
- **Full-screen overlay navigation** — Hamburger triggers slide-in menu with Offerings + Sectors columns
- **Search overlay** — Full-screen search with popular search tags
- **Two-column text layout** — Offerings section uses text-only links, no cards or images
- **Impact studies** — Large editorial images with gradient overlays and clean text
- **Monochrome palette** — #0A0A0A background, white headings, #999999 secondary text
- **Inter font** — Clean sans-serif throughout
- **Section labels** — 11px uppercase with 0.15em letter-spacing

## Quality Checks
- ✅ `bun run lint` — passes with no errors
- ✅ All pages return HTTP 200
- ✅ SEO metadata on all pages
- ✅ Schema.org JSON-LD in layout
- ✅ CookieConsent RGPD compliant
- ✅ sitemap.ts includes all pages
- ✅ robots.txt present
