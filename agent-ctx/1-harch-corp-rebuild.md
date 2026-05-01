# Task: Rebuild Harch Corp Website - Frozen Version

## Summary
Successfully rebuilt the Harch Corp website with the exact "Frozen Version" specifications, including:

### Critical Features Implemented
1. **VIDEO HERO** - `<video>` element with `autoPlay muted loop playsInline` attributes, parallax scroll effect, fallback to hero-bg.jpg on video error, dark overlay, "HARCH CORP" with gold gradient on "CORP", two CTAs, animated scroll indicator
2. **3D INTERACTIVE SCENE** (Scene3D.tsx) - Three.js with @react-three/fiber and @react-three/drei, 300 floating particles, central rotating icosahedron (wireframe), gold/blue ambient lighting, mouse-interactive point light, used as background behind stats section
3. **HOVER IMAGE PANELS** for verticals - Palantir-style full-width rows with large image panels (420x300px) appearing on hover from the right side, gold underline animation, number prefixes (01-07), AnimatePresence for smooth transitions
4. **CINEMATIC DESIGN** throughout - Dark navy #05080F background, warm white text #E8E4DC, gold accent #C9A84C, frosted glass nav, custom scrollbar with gold accent

### Pages (20 total, all HTTP 200)
- `/` - Homepage with Video Hero, Hover Image Panels, Stats with 3D, Philosophy, Timeline, CTA
- `/about` - Company story, Mission/Vision, 4 Values, 4 Leadership portraits
- `/subsidiaries/[slug]` - 7 dynamic subsidiary pages with full data
- `/strategy` - Three Pillars, 2030 Roadmap, Competitive Advantages
- `/investors` - Investment thesis, Financial highlights, Documents, Calendar, Contact
- `/esg` - Environmental, Social, Governance, Sustainability targets
- `/careers` - 4 Benefits, 8 Job listings with Apply buttons
- `/newsroom` - 6 Press articles, Media contact
- `/contact` - Contact form, 3 Office locations, Map placeholder
- `/legal` - Full legal mentions (Mentions légales)
- `/privacy` - GDPR/RGPD compliant privacy policy (10 sections)
- `/terms` - Terms of Use (9 sections)
- `/partners` - Strategic, Technology, Financial partners
- `/sitemap.xml` - Dynamic sitemap

### Technical Stack
- Next.js 16 with App Router
- Tailwind CSS 4 with custom design tokens
- framer-motion for animations
- @react-three/fiber + @react-three/drei for 3D
- TypeScript throughout
- Lint passes cleanly
- All routes verified HTTP 200
