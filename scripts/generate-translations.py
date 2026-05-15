#!/usr/bin/env python3
"""
generate-translations.py
Generates comprehensive en.json and fr.json translation files for the
Harch Corp S.A. Next.js website (next-intl).

Strategy:
  1. Read existing en.json and fr.json
  2. Replace sidebar, footer, cookieConsent entirely
  3. Merge new sub-keys into subsidiaries (agriculture, finance)
  4. Add new top-level keys for pages missing translations
  5. Preserve all other existing keys
  6. Write back and report totals
"""

import json
import os
import sys

MESSAGES_DIR = os.path.join(os.path.dirname(__file__), "..", "messages")
EN_PATH = os.path.join(MESSAGES_DIR, "en.json")
FR_PATH = os.path.join(MESSAGES_DIR, "fr.json")


# ---------------------------------------------------------------------------
# English updates
# ---------------------------------------------------------------------------

EN_SIDEBAR = {
    "platforms": "Platforms",
    "platformDemo": "Platform Demo",
    "harchos": "HarchOS",
    "intelligence": "Intelligence",
    "cement": "Cement",
    "energy": "Energy",
    "technology": "Technology",
    "mining": "Mining",
    "agri": "Agri",
    "water": "Water",
    "finance": "Finance",
    "mission": "Mission",
    "home": "Home",
    "thesis": "The Thesis",
    "about": "About",
    "strategy": "Strategy",
    "esg": "ESG",
    "deployments": "Deployments",
    "globalPresence": "Global Presence",
    "caseStudies": "Case Studies",
    "careers": "Careers",
    "partners": "Partners",
    "newsroom": "Newsroom",
    "pressMedia": "Press & Media",
    "developers": "Developers",
    "developerCenter": "Developer Center",
    "apiPlayground": "API Playground",
    "openSource": "Open Source",
    "documentation": "Documentation",
    "apiReference": "API Reference",
    "sdks": "SDKs",
    "architecture": "Architecture",
    "changelog": "Changelog",
    "trust": "Trust",
    "trustCenter": "Trust Center",
    "security": "Security",
    "compliance": "Compliance",
    "aiEthics": "AI Ethics",
    "vulnerabilityDisclosure": "Vulnerability Disclosure",
    "resources": "Resources",
    "blog": "Blog",
    "engineeringBlog": "Engineering Blog",
    "community": "Community",
    "events": "Events",
    "learnCertify": "Learn & Certify",
    "glossary": "Glossary",
    "faq": "FAQ",
    "status": "Status",
    "business": "Business",
    "pricing": "Pricing",
    "calculator": "Calculator",
    "customers": "Customers",
    "support": "Support",
    "startupProgram": "Startup Program",
    "company": "Company",
    "leadership": "Leadership",
    "dei": "DEI",
    "harchVentures": "Harch Ventures",
    "hiringProcess": "Hiring Process",
    "legalHub": "Legal Hub",
    "investors": "Investors",
    "investorRelations": "Investor Relations",
    "requestBriefing": "Request Briefing",
    "openNav": "Open navigation",
    "closeNav": "Close navigation",
    "casablanca": "Casablanca",
    "joinTeam": "Join the Team",
    "ctas": {
        "quote": "Request a Quote",
        "briefing": "Schedule a Briefing",
    },
}

EN_FOOTER = {
    "company": "Company",
    "verticals": "Verticals",
    "developers": "Developers",
    "resources": "Resources",
    "trust": "Trust",
    "business": "Business",
    "legal": "Legal",
    "intelligence": "Intelligence",
    "cement": "Cement",
    "energy": "Energy",
    "technology": "Technology",
    "mining": "Mining",
    "agri": "Agri",
    "water": "Water",
    "finance": "Finance",
    "about": "About",
    "leadership": "Leadership",
    "strategy": "Strategy",
    "esg": "ESG",
    "dei": "DEI",
    "harchVentures": "Harch Ventures",
    "careers": "Careers",
    "partners": "Partners",
    "pressMedia": "Press & Media",
    "requestQuote": "Request a Quote",
    "requestBriefing": "Request Briefing",
    "documentation": "Documentation",
    "apiReference": "API Reference",
    "sdks": "SDKs",
    "developerCenter": "Developer Center",
    "apiPlayground": "API Playground",
    "openSource": "Open Source",
    "architecture": "Architecture",
    "changelog": "Changelog",
    "blog": "Blog",
    "engineeringBlog": "Engineering Blog",
    "community": "Community",
    "events": "Events",
    "learnCertify": "Learn & Certify",
    "glossary": "Glossary",
    "status": "Status",
    "support": "Support",
    "faq": "FAQ",
    "trustCenter": "Trust Center",
    "security": "Security",
    "compliance": "Compliance",
    "aiEthics": "AI Ethics",
    "vulnerabilityDisclosure": "Vulnerability Disclosure",
    "privacyPolicy": "Privacy Policy",
    "systemStatus": "System Status",
    "pricing": "Pricing",
    "calculator": "Calculator",
    "customers": "Customers",
    "startupProgram": "Startup Program",
    "investorRelations": "Investor Relations",
    "legalHub": "Legal Hub",
    "termsOfService": "Terms of Service",
    "cookiePolicy": "Cookie Policy",
    "gdpr": "GDPR",
    "sla": "SLA",
    "latestNews": "Latest News",
    "allSystemsOperational": "All Systems Operational",
    "uptime": "Uptime",
    "allRightsReserved": "All rights reserved.",
    "location": "Casablanca, Morocco",
    "capital": "Capital: 100M MAD",
    "news": {
        "item1Title": "Harch Intelligence: 500MW Dakhla Data Center Enters Engineering Phase",
        "item1Date": "Mar 2026",
        "item2Title": "Harch Cement Secures Gambia Permits \u2014 500kT/yr Facility Greenlit",
        "item2Date": "Feb 2026",
        "item3Title": "Harch Corp Announces $2.4B Investment Pipeline Across 7 Verticals",
        "item3Date": "Jan 2026",
    },
}

EN_COOKIE_CONSENT = {
    "description": "We use cookies to improve your experience and analyze site traffic. By continuing, you agree to our",
    "privacyPolicy": "Privacy Policy",
    "accept": "Accept",
    "reject": "Decline",
}

EN_SUBSIDIARIES_MERGE = {
    "agriculture": {
        "title": "Harch Agri",
        "subtitle": "Precision Agriculture & Vertical Farms",
        "description": "Deploying IoT, drone monitoring, and vertical farming across 60% of the world's uncultivated arable land.",
        "stat": "$35B Market",
        "features": {
            "iot": "Precision IoT Farming",
            "drones": "Drone Crop Monitoring",
            "verticalFarms": "Vertical Farm Networks",
            "supplyChain": "Farm-to-Table Supply Chain",
        },
    },
    "finance": {
        "title": "Harch Finance",
        "subtitle": "Green Bonds & Project Finance",
        "description": "Structuring capital flows for sovereign infrastructure through green bonds, Islamic finance, and carbon credits.",
        "stat": "$2.4B+",
        "features": {
            "greenBonds": "Green Bonds & Sukuk",
            "projectFinance": "Project Finance Structuring",
            "carbonCredits": "Carbon Credit Monetization",
            "islamicFinance": "Islamic Finance Instruments",
        },
    },
}

EN_NEW_KEYS = {
    "blog": {
        "title": "Blog",
        "subtitle": "Insights from the infrastructure frontier",
        "description": "Analysis, engineering deep dives, and market intelligence from the Harch Corp team.",
        "readMore": "Read more",
        "backToBlog": "Back to Blog",
        "latestArticles": "Latest Articles",
        "allArticles": "All Articles",
        "categories": "Categories",
        "searchPlaceholder": "Search articles...",
        "noResults": "No articles found.",
        "publishedOn": "Published on",
        "by": "by",
        "minRead": "min read",
    },
    "engineeringBlog": {
        "title": "Engineering Blog",
        "subtitle": "Technical deep dives from our engineering team",
        "description": "Architecture decisions, performance optimizations, and infrastructure engineering from the Harch Corp team.",
        "readMore": "Read more",
        "latestArticles": "Latest Articles",
        "publishedOn": "Published on",
    },
    "newsroom": {
        "title": "Newsroom",
        "subtitle": "Official announcements and press releases",
        "description": "The latest news from Harch Corp S.A.",
        "readMore": "Read more",
        "allArticles": "All Announcements",
        "pressKit": "Press Kit",
        "mediaContact": "Media Contact",
        "publishedOn": "Published on",
    },
    "community": {
        "title": "Community",
        "subtitle": "Build with us",
        "description": "Join the community of developers, engineers, and operators building Africa's sovereign infrastructure.",
        "joinCommunity": "Join the Community",
        "discord": "Discord",
        "github": "GitHub",
        "forums": "Forums",
        "contributors": "Contributors",
        "openProjects": "Open Projects",
        "events": "Events",
        "meetups": "Meetups",
    },
    "events": {
        "title": "Events",
        "subtitle": "Where we meet",
        "description": "Conferences, summits, and meetups where the Harch Corp team is present.",
        "upcoming": "Upcoming",
        "past": "Past Events",
        "register": "Register",
        "learnMore": "Learn More",
        "noUpcoming": "No upcoming events at this time.",
    },
    "esg": {
        "title": "ESG",
        "subtitle": "Environmental, Social, and Governance",
        "description": "Our commitment to sustainability, social responsibility, and transparent governance.",
        "environmental": {
            "title": "Environmental",
            "description": "Carbon-aware operations with ~47 gCO2/kWh average intensity. 81.5% renewable energy across all facilities.",
        },
        "social": {
            "title": "Social",
            "description": "25,000+ jobs by 2030. Community development programs across all operating regions.",
        },
        "governance": {
            "title": "Governance",
            "description": "ISO 27001, SOC 2 Type II certified. Independent board oversight and transparent reporting.",
        },
        "report": {
            "title": "ESG Report 2025",
            "description": "Download our latest sustainability report.",
        },
    },
    "learn": {
        "title": "Learn & Certify",
        "subtitle": "Master sovereign infrastructure",
        "description": "Courses, certifications, and learning paths for Harch Corp technologies.",
        "courses": "Courses",
        "certifications": "Certifications",
        "paths": "Learning Paths",
        "startLearning": "Start Learning",
        "beginner": "Beginner",
        "intermediate": "Intermediate",
        "advanced": "Advanced",
    },
    "glossary": {
        "title": "Glossary",
        "subtitle": "Infrastructure terminology",
        "description": "Key terms and concepts in sovereign infrastructure.",
        "searchPlaceholder": "Search terms...",
        "noResults": "No terms found.",
    },
    "caseStudies": {
        "title": "Case Studies",
        "subtitle": "Real-world deployments",
        "description": "Detailed analysis of Harch Corp infrastructure projects across Africa.",
        "readMore": "Read the case study",
        "allStudies": "All Case Studies",
        "results": "Results",
        "challenge": "Challenge",
        "solution": "Solution",
        "impact": "Impact",
    },
    "company": {
        "title": "Company",
        "leadership": {
            "title": "Leadership",
            "subtitle": "The team building Africa's industrial backbone",
        },
        "ventures": {
            "title": "Harch Ventures",
            "subtitle": "Investing in Africa's infrastructure future",
            "description": "Harch Ventures identifies, incubates, and scales infrastructure startups across the continent.",
        },
        "dei": {
            "title": "Diversity, Equity & Inclusion",
            "subtitle": "Building an inclusive future",
            "description": "Our commitment to building a diverse, equitable, and inclusive organization.",
        },
    },
    "customers": {
        "title": "Customers",
        "subtitle": "Trusted by governments and enterprises",
        "description": "Organizations that rely on Harch Corp for sovereign infrastructure.",
        "advisoryBoard": {
            "title": "Advisory Board",
            "subtitle": "Strategic guidance from industry leaders",
        },
        "testimonial": "Testimonial",
        "caseStudy": "Case Study",
        "viewAll": "View All",
    },
    "developers": {
        "title": "Developer Center",
        "subtitle": "Build on sovereign infrastructure",
        "description": "APIs, SDKs, and tools for building on Harch Corp infrastructure.",
        "openSource": {
            "title": "Open Source",
            "subtitle": "Our open source projects",
            "description": "Contributing to the global developer community.",
            "viewOnGithub": "View on GitHub",
            "stars": "stars",
            "forks": "forks",
        },
        "playground": {
            "title": "API Playground",
            "subtitle": "Try our APIs interactively",
            "description": "Explore Harch Corp APIs with live examples.",
            "runQuery": "Run Query",
            "response": "Response",
            "endpoint": "Endpoint",
        },
    },
    "docs": {
        "title": "Documentation",
        "subtitle": "Technical documentation",
        "description": "Comprehensive guides, API references, and architecture documentation.",
        "search": "Search documentation...",
        "api": {
            "title": "API Reference",
            "subtitle": "RESTful API documentation",
            "description": "Complete API reference for all Harch Corp services.",
            "endpoint": "Endpoint",
            "method": "Method",
            "parameters": "Parameters",
            "response": "Response",
            "tryIt": "Try it",
        },
        "architecture": {
            "title": "Architecture",
            "subtitle": "System architecture overview",
            "description": "Technical architecture and design decisions for Harch Corp infrastructure.",
        },
        "changelog": {
            "title": "Changelog",
            "subtitle": "Release notes and updates",
            "description": "Track changes, new features, and improvements across all products.",
        },
        "guides": {
            "title": "Guides",
            "subtitle": "Step-by-step tutorials",
            "description": "Detailed guides for implementing Harch Corp solutions.",
        },
        "quickstarts": {
            "title": "Quickstarts",
            "subtitle": "Get started in minutes",
            "description": "Quick start guides for common use cases.",
        },
        "sdks": {
            "title": "SDKs",
            "subtitle": "Software Development Kits",
            "description": "Official SDKs for Python, JavaScript, Go, and Rust.",
        },
    },
    "startupProgram": {
        "title": "Startup Program",
        "subtitle": "For Africa's next infrastructure innovators",
        "description": "Discounted infrastructure, mentorship, and go-to-market support for African startups.",
        "apply": "Apply Now",
        "benefits": {
            "title": "Benefits",
            "credits": "Infrastructure Credits",
            "creditsDesc": "Up to $100K in infrastructure credits for qualified startups.",
            "mentorship": "Mentorship",
            "mentorshipDesc": "Direct access to Harch Corp engineering and business leadership.",
            "gtm": "Go-to-Market Support",
            "gtmDesc": "Access to our partner network and customer base across Africa.",
        },
        "eligibility": {
            "title": "Eligibility",
            "criteria": "African-registered startups with less than $5M in funding.",
        },
    },
    "strategy": {
        "title": "Strategy",
        "subtitle": "Our strategic framework",
        "description": "How Harch Corp plans to build Africa's industrial sovereignty.",
        "pillars": {
            "title": "Strategic Pillars",
            "verticalIntegration": {
                "title": "Vertical Integration",
                "description": "Controlling the entire value chain from raw materials to finished products.",
            },
            "sovereignByDesign": {
                "title": "Sovereign by Design",
                "description": "Every system built with data sovereignty and operational autonomy as foundational principles.",
            },
            "continentalScale": {
                "title": "Continental Scale",
                "description": "Operations across 5+ countries with 25,000+ jobs by 2030.",
            },
        },
        "markets": {
            "title": "Target Markets",
            "description": "Morocco, Gambia, Senegal, Mauritania, and expanding across the Sahel.",
        },
        "timeline": {
            "title": "Strategic Timeline",
            "description": "From foundation to continental scale by 2030.",
        },
    },
    "legal": {
        "title": "Legal",
        "subtitle": "Legal documents and policies",
        "hub": {
            "title": "Legal Hub",
            "subtitle": "All legal documents in one place",
        },
        "accessibility": {
            "title": "Accessibility Statement",
            "subtitle": "Our commitment to accessibility",
        },
        "ccpa": {
            "title": "CCPA Notice",
            "subtitle": "California Consumer Privacy Act",
        },
        "codeOfConduct": {
            "title": "Code of Conduct",
            "subtitle": "Our ethical standards",
        },
        "cookies": {
            "title": "Cookie Policy",
            "subtitle": "How we use cookies",
        },
        "dpa": {
            "title": "Data Processing Agreement",
            "subtitle": "DPA for our services",
        },
        "gdpr": {
            "title": "GDPR Compliance",
            "subtitle": "Our GDPR commitments",
        },
        "modernSlavery": {
            "title": "Modern Slavery Statement",
            "subtitle": "Our commitment to human rights",
        },
        "sla": {
            "title": "Service Level Agreement",
            "subtitle": "Our uptime and performance guarantees",
        },
        "trademark": {
            "title": "Trademark Policy",
            "subtitle": "Guidelines for using our trademarks",
        },
    },
    "trust": {
        "title": "Trust Center",
        "subtitle": "Security, compliance, and transparency",
        "description": "How we protect your data, maintain compliance, and earn your trust.",
        "aiEthics": {
            "title": "AI Ethics",
            "subtitle": "Responsible AI principles",
            "description": "Our commitment to developing and deploying AI systems responsibly.",
        },
        "compliance": {
            "title": "Compliance",
            "subtitle": "Certifications and standards",
            "description": "ISO 27001, SOC 2 Type II, GDPR, and industry-specific compliance.",
        },
        "security": {
            "title": "Security",
            "subtitle": "How we protect your data",
            "description": "End-to-end encryption, 24/7 monitoring, and sovereign data residency.",
        },
        "vulnerability": {
            "title": "Vulnerability Disclosure",
            "subtitle": "Report security vulnerabilities",
            "description": "Responsible disclosure program for security researchers.",
        },
    },
    "privacy": {
        "title": "Privacy Policy",
        "subtitle": "How we handle your data",
        "lastUpdated": "Last updated",
        "dataCollection": "Data Collection",
        "dataUse": "How We Use Your Data",
        "dataSharing": "Data Sharing",
        "dataSecurity": "Data Security",
        "yourRights": "Your Rights",
        "contactUs": "Contact Us",
    },
    "terms": {
        "title": "Terms of Service",
        "subtitle": "Terms and conditions",
        "lastUpdated": "Last updated",
        "acceptance": "Acceptance of Terms",
        "services": "Services",
        "obligations": "Your Obligations",
        "limitation": "Limitation of Liability",
        "governingLaw": "Governing Law",
        "changes": "Changes to Terms",
    },
}


# ---------------------------------------------------------------------------
# French updates
# ---------------------------------------------------------------------------

FR_SIDEBAR = {
    "platforms": "Plateformes",
    "platformDemo": "D\u00e9mo Plateforme",
    "harchos": "HarchOS",
    "intelligence": "Intelligence",
    "cement": "Ciment",
    "energy": "\u00c9nergie",
    "technology": "Technologie",
    "mining": "Mines",
    "agri": "Agri",
    "water": "Eau",
    "finance": "Finance",
    "mission": "Mission",
    "home": "Accueil",
    "thesis": "La Th\u00e8se",
    "about": "\u00c0 propos",
    "strategy": "Strat\u00e9gie",
    "esg": "ESG",
    "deployments": "D\u00e9ploiements",
    "globalPresence": "Pr\u00e9sence Mondiale",
    "caseStudies": "\u00c9tudes de Cas",
    "careers": "Carri\u00e8res",
    "partners": "Partenaires",
    "newsroom": "R\u00e9daction",
    "pressMedia": "Presse & M\u00e9dias",
    "developers": "D\u00e9veloppeurs",
    "developerCenter": "Centre D\u00e9veloppeurs",
    "apiPlayground": "API Playground",
    "openSource": "Open Source",
    "documentation": "Documentation",
    "apiReference": "R\u00e9f\u00e9rence API",
    "sdks": "SDK",
    "architecture": "Architecture",
    "changelog": "Journal des modifications",
    "trust": "Confiance",
    "trustCenter": "Centre de Confiance",
    "security": "S\u00e9curit\u00e9",
    "compliance": "Conformit\u00e9",
    "aiEthics": "\u00c9thique de l'IA",
    "vulnerabilityDisclosure": "Divulgation de Vuln\u00e9rabilit\u00e9s",
    "resources": "Ressources",
    "blog": "Blog",
    "engineeringBlog": "Blog Ing\u00e9nierie",
    "community": "Communaut\u00e9",
    "events": "\u00c9v\u00e9nements",
    "learnCertify": "Apprendre & Certifier",
    "glossary": "Glossaire",
    "faq": "FAQ",
    "status": "Statut",
    "business": "Entreprise",
    "pricing": "Tarifs",
    "calculator": "Calculateur",
    "customers": "Clients",
    "support": "Support",
    "startupProgram": "Programme Startup",
    "company": "Entreprise",
    "leadership": "Direction",
    "dei": "DEI",
    "harchVentures": "Harch Ventures",
    "hiringProcess": "Processus de Recrutement",
    "legalHub": "Espace Juridique",
    "investors": "Investisseurs",
    "investorRelations": "Relations Investisseurs",
    "requestBriefing": "Demander un Briefing",
    "openNav": "Ouvrir la navigation",
    "closeNav": "Fermer la navigation",
    "casablanca": "Casablanca",
    "joinTeam": "Rejoindre l'\u00c9quipe",
    "ctas": {
        "quote": "Demander un Devis",
        "briefing": "Planifier un Briefing",
    },
}

FR_FOOTER = {
    "company": "Entreprise",
    "verticals": "Filiales",
    "developers": "D\u00e9veloppeurs",
    "resources": "Ressources",
    "trust": "Confiance",
    "business": "Entreprise",
    "legal": "Juridique",
    "intelligence": "Intelligence",
    "cement": "Ciment",
    "energy": "\u00c9nergie",
    "technology": "Technologie",
    "mining": "Mines",
    "agri": "Agri",
    "water": "Eau",
    "finance": "Finance",
    "about": "\u00c0 propos",
    "leadership": "Direction",
    "strategy": "Strat\u00e9gie",
    "esg": "ESG",
    "dei": "DEI",
    "harchVentures": "Harch Ventures",
    "careers": "Carri\u00e8res",
    "partners": "Partenaires",
    "pressMedia": "Presse & M\u00e9dias",
    "requestQuote": "Demander un Devis",
    "requestBriefing": "Demander un Briefing",
    "documentation": "Documentation",
    "apiReference": "R\u00e9f\u00e9rence API",
    "sdks": "SDK",
    "developerCenter": "Centre D\u00e9veloppeurs",
    "apiPlayground": "API Playground",
    "openSource": "Open Source",
    "architecture": "Architecture",
    "changelog": "Journal des modifications",
    "blog": "Blog",
    "engineeringBlog": "Blog Ing\u00e9nierie",
    "community": "Communaut\u00e9",
    "events": "\u00c9v\u00e9nements",
    "learnCertify": "Apprendre & Certifier",
    "glossary": "Glossaire",
    "status": "Statut",
    "support": "Support",
    "faq": "FAQ",
    "trustCenter": "Centre de Confiance",
    "security": "S\u00e9curit\u00e9",
    "compliance": "Conformit\u00e9",
    "aiEthics": "\u00c9thique de l'IA",
    "vulnerabilityDisclosure": "Divulgation de Vuln\u00e9rabilit\u00e9s",
    "privacyPolicy": "Politique de Confidentialit\u00e9",
    "systemStatus": "Statut du Syst\u00e8me",
    "pricing": "Tarifs",
    "calculator": "Calculateur",
    "customers": "Clients",
    "startupProgram": "Programme Startup",
    "investorRelations": "Relations Investisseurs",
    "legalHub": "Espace Juridique",
    "termsOfService": "Conditions d'Utilisation",
    "cookiePolicy": "Politique des Cookies",
    "gdpr": "RGPD",
    "sla": "SLA",
    "latestNews": "Derni\u00e8res Actualit\u00e9s",
    "allSystemsOperational": "Tous les Syst\u00e8mes Op\u00e9rationnels",
    "uptime": "Disponibilit\u00e9",
    "allRightsReserved": "Tous droits r\u00e9serv\u00e9s.",
    "location": "Casablanca, Maroc",
    "capital": "Capital : 100 M MAD",
    "news": {
        "item1Title": "Harch Intelligence : Le Centre de Donn\u00e9es de 500 MW \u00e0 Dakhla entre en Phase d'Ing\u00e9nierie",
        "item1Date": "Mars 2026",
        "item2Title": "Harch Cement obtient les Permits en Gambie \u2014 Installation de 500kT/an Autoris\u00e9e",
        "item2Date": "F\u00e9v 2026",
        "item3Title": "Harch Corp annonce un Pipeline d'Investissement de 2,4 Md$ sur 7 Filiales",
        "item3Date": "Jan 2026",
    },
}

FR_COOKIE_CONSENT = {
    "description": "Nous utilisons des cookies pour am\u00e9liorer votre exp\u00e9rience et analyser le trafic du site. En continuant, vous acceptez notre",
    "privacyPolicy": "Politique de Confidentialit\u00e9",
    "accept": "Accepter",
    "reject": "Refuser",
}

FR_SUBSIDIARIES_MERGE = {
    "agriculture": {
        "title": "Harch Agri",
        "subtitle": "Agriculture de Pr\u00e9cision et Fermes Verticales",
        "description": "D\u00e9ploiement de l'IoT, de la surveillance par drones et de l'agriculture verticale sur 60% des terres arables non cultiv\u00e9es du monde.",
        "stat": "March\u00e9 de 35 Md$",
        "features": {
            "iot": "Agriculture IoT de Pr\u00e9cision",
            "drones": "Surveillance des Cultures par Drones",
            "verticalFarms": "R\u00e9seau de Fermes Verticales",
            "supplyChain": "Cha\u00eene d'Approvisionnement de la Ferme \u00e0 la Table",
        },
    },
    "finance": {
        "title": "Harch Finance",
        "subtitle": "Obligations Vertes et Financement de Projets",
        "description": "Structuration des flux de capitaux pour les infrastructures souveraines par les obligations vertes, la finance islamique et les cr\u00e9dits carbone.",
        "stat": "2,4 Md$+",
        "features": {
            "greenBonds": "Obligations Vertes et Sukuk",
            "projectFinance": "Structuration de Financement de Projets",
            "carbonCredits": "Mon\u00e9tisation des Cr\u00e9dits Carbone",
            "islamicFinance": "Instruments de Finance Islamique",
        },
    },
}

FR_NEW_KEYS = {
    "blog": {
        "title": "Blog",
        "subtitle": "Perspectives depuis la fronti\u00e8re de l'infrastructure",
        "description": "Analyses, plong\u00e9es techniques et intelligence de march\u00e9 de l'\u00e9quipe Harch Corp.",
        "readMore": "Lire la suite",
        "backToBlog": "Retour au Blog",
        "latestArticles": "Derniers Articles",
        "allArticles": "Tous les Articles",
        "categories": "Cat\u00e9gories",
        "searchPlaceholder": "Rechercher des articles...",
        "noResults": "Aucun article trouv\u00e9.",
        "publishedOn": "Publi\u00e9 le",
        "by": "par",
        "minRead": "min de lecture",
    },
    "engineeringBlog": {
        "title": "Blog Ing\u00e9nierie",
        "subtitle": "Plong\u00e9es techniques de notre \u00e9quipe d'ing\u00e9nierie",
        "description": "D\u00e9cisions d'architecture, optimisations de performance et ing\u00e9nierie d'infrastructure de l'\u00e9quipe Harch Corp.",
        "readMore": "Lire la suite",
        "latestArticles": "Derniers Articles",
        "publishedOn": "Publi\u00e9 le",
    },
    "newsroom": {
        "title": "R\u00e9daction",
        "subtitle": "Annonces officielles et communiqu\u00e9s de presse",
        "description": "Les derni\u00e8res actualit\u00e9s de Harch Corp S.A.",
        "readMore": "Lire la suite",
        "allArticles": "Toutes les Annonces",
        "pressKit": "Dossier de Presse",
        "mediaContact": "Contact M\u00e9dias",
        "publishedOn": "Publi\u00e9 le",
    },
    "community": {
        "title": "Communaut\u00e9",
        "subtitle": "Construisez avec nous",
        "description": "Rejoignez la communaut\u00e9 de d\u00e9veloppeurs, d'ing\u00e9nieurs et d'op\u00e9rateurs construisant l'infrastructure souveraine de l'Afrique.",
        "joinCommunity": "Rejoindre la Communaut\u00e9",
        "discord": "Discord",
        "github": "GitHub",
        "forums": "Forums",
        "contributors": "Contributeurs",
        "openProjects": "Projets Ouverts",
        "events": "\u00c9v\u00e9nements",
        "meetups": "Meetups",
    },
    "events": {
        "title": "\u00c9v\u00e9nements",
        "subtitle": "O\u00f9 nous rencontrons",
        "description": "Conf\u00e9rences, sommets et meetups o\u00f9 l'\u00e9quipe Harch Corp est pr\u00e9sente.",
        "upcoming": "\u00c0 venir",
        "past": "\u00c9v\u00e9nements pass\u00e9s",
        "register": "S'inscrire",
        "learnMore": "En savoir plus",
        "noUpcoming": "Aucun \u00e9v\u00e9nement \u00e0 venir pour le moment.",
    },
    "esg": {
        "title": "ESG",
        "subtitle": "Environnemental, Social et Gouvernance",
        "description": "Notre engagement envers la durabilit\u00e9, la responsabilit\u00e9 sociale et la gouvernance transparente.",
        "environmental": {
            "title": "Environnemental",
            "description": "Op\u00e9rations conscientes du carbone avec une intensit\u00e9 moyenne de ~47 gCO2/kWh. 81,5% d'\u00e9nergie renouvelable dans toutes les installations.",
        },
        "social": {
            "title": "Social",
            "description": "25 000+ emplois d'ici 2030. Programmes de d\u00e9veloppement communautaire dans toutes les r\u00e9gions d'exploitation.",
        },
        "governance": {
            "title": "Gouvernance",
            "description": "Certifi\u00e9 ISO 27001, SOC 2 Type II. Surveillance ind\u00e9pendante du conseil et reporting transparent.",
        },
        "report": {
            "title": "Rapport ESG 2025",
            "description": "T\u00e9l\u00e9chargez notre dernier rapport de durabilit\u00e9.",
        },
    },
    "learn": {
        "title": "Apprendre & Certifier",
        "subtitle": "Ma\u00eetrisez l'infrastructure souveraine",
        "description": "Cours, certifications et parcours d'apprentissage pour les technologies Harch Corp.",
        "courses": "Cours",
        "certifications": "Certifications",
        "paths": "Parcours d'Apprentissage",
        "startLearning": "Commencer l'Apprentissage",
        "beginner": "D\u00e9butant",
        "intermediate": "Interm\u00e9diaire",
        "advanced": "Avanc\u00e9",
    },
    "glossary": {
        "title": "Glossaire",
        "subtitle": "Terminologie de l'infrastructure",
        "description": "Termes et concepts cl\u00e9s de l'infrastructure souveraine.",
        "searchPlaceholder": "Rechercher des termes...",
        "noResults": "Aucun terme trouv\u00e9.",
    },
    "caseStudies": {
        "title": "\u00c9tudes de Cas",
        "subtitle": "D\u00e9ploiements concrets",
        "description": "Analyse d\u00e9taill\u00e9e des projets d'infrastructure Harch Corp \u00e0 travers l'Afrique.",
        "readMore": "Lire l'\u00e9tude de cas",
        "allStudies": "Toutes les \u00c9tudes de Cas",
        "results": "R\u00e9sultats",
        "challenge": "D\u00e9fi",
        "solution": "Solution",
        "impact": "Impact",
    },
    "company": {
        "title": "Entreprise",
        "leadership": {
            "title": "Direction",
            "subtitle": "L'\u00e9quipe qui construit l'\u00e9pine dorsale industrielle de l'Afrique",
        },
        "ventures": {
            "title": "Harch Ventures",
            "subtitle": "Investir dans l'avenir infrastructurel de l'Afrique",
            "description": "Harch Ventures identifie, incub\u00e9 et met \u00e0 l'\u00e9chelle des startups d'infrastructure \u00e0 travers le continent.",
        },
        "dei": {
            "title": "Diversit\u00e9, \u00c9quit\u00e9 et Inclusion",
            "subtitle": "Construire un avenir inclusif",
            "description": "Notre engagement \u00e0 construire une organisation diversifi\u00e9e, \u00e9quitable et inclusive.",
        },
    },
    "customers": {
        "title": "Clients",
        "subtitle": "La confiance des gouvernements et des entreprises",
        "description": "Les organisations qui s'appuient sur Harch Corp pour une infrastructure souveraine.",
        "advisoryBoard": {
            "title": "Comit\u00e9 Consultatif",
            "subtitle": "Orientation strat\u00e9gique par des leaders de l'industrie",
        },
        "testimonial": "T\u00e9moignage",
        "caseStudy": "\u00c9tude de Cas",
        "viewAll": "Voir Tout",
    },
    "developers": {
        "title": "Centre D\u00e9veloppeurs",
        "subtitle": "Construisez sur l'infrastructure souveraine",
        "description": "API, SDK et outils pour construire sur l'infrastructure Harch Corp.",
        "openSource": {
            "title": "Open Source",
            "subtitle": "Nos projets open source",
            "description": "Contribuer \u00e0 la communaut\u00e9 mondiale des d\u00e9veloppeurs.",
            "viewOnGithub": "Voir sur GitHub",
            "stars": "\u00e9toiles",
            "forks": "forks",
        },
        "playground": {
            "title": "API Playground",
            "subtitle": "Essayez nos API de mani\u00e8re interactive",
            "description": "Explorez les API Harch Corp avec des exemples en direct.",
            "runQuery": "Ex\u00e9cuter la Requ\u00eate",
            "response": "R\u00e9ponse",
            "endpoint": "Point d'acc\u00e8s",
        },
    },
    "docs": {
        "title": "Documentation",
        "subtitle": "Documentation technique",
        "description": "Guides complets, r\u00e9f\u00e9rences API et documentation d'architecture.",
        "search": "Rechercher dans la documentation...",
        "api": {
            "title": "R\u00e9f\u00e9rence API",
            "subtitle": "Documentation API RESTful",
            "description": "R\u00e9f\u00e9rence API compl\u00e8te pour tous les services Harch Corp.",
            "endpoint": "Point d'acc\u00e8s",
            "method": "M\u00e9thode",
            "parameters": "Param\u00e8tres",
            "response": "R\u00e9ponse",
            "tryIt": "Essayer",
        },
        "architecture": {
            "title": "Architecture",
            "subtitle": "Aper\u00e7u de l'architecture syst\u00e8me",
            "description": "Architecture technique et d\u00e9cisions de conception pour l'infrastructure Harch Corp.",
        },
        "changelog": {
            "title": "Journal des modifications",
            "subtitle": "Notes de version et mises \u00e0 jour",
            "description": "Suivi des changements, nouvelles fonctionnalit\u00e9s et am\u00e9liorations sur tous les produits.",
        },
        "guides": {
            "title": "Guides",
            "subtitle": "Tutoriels \u00e9tape par \u00e9tape",
            "description": "Guides d\u00e9taill\u00e9s pour impl\u00e9menter les solutions Harch Corp.",
        },
        "quickstarts": {
            "title": "D\u00e9marrages Rapides",
            "subtitle": "Commencez en quelques minutes",
            "description": "Guides de d\u00e9marrage rapide pour les cas d'utilisation courants.",
        },
        "sdks": {
            "title": "SDK",
            "subtitle": "Kits de D\u00e9veloppement Logiciel",
            "description": "SDK officiels pour Python, JavaScript, Go et Rust.",
        },
    },
    "startupProgram": {
        "title": "Programme Startup",
        "subtitle": "Pour les prochains innovateurs en infrastructure de l'Afrique",
        "description": "Infrastructure \u00e0 tarif r\u00e9duit, mentorat et soutien commercial pour les startups africaines.",
        "apply": "Postuler Maintenant",
        "benefits": {
            "title": "Avantages",
            "credits": "Cr\u00e9dits d'Infrastructure",
            "creditsDesc": "Jusqu'\u00e0 100 K$ en cr\u00e9dits d'infrastructure pour les startups \u00e9ligibles.",
            "mentorship": "Mentorat",
            "mentorshipDesc": "Acc\u00e8s direct \u00e0 la direction ing\u00e9nierie et commerciale de Harch Corp.",
            "gtm": "Soutien Go-to-Market",
            "gtmDesc": "Acc\u00e8s \u00e0 notre r\u00e9seau de partenaires et base de clients \u00e0 travers l'Afrique.",
        },
        "eligibility": {
            "title": "\u00c9ligibilit\u00e9",
            "criteria": "Startups enregistr\u00e9es en Afrique avec moins de 5 M$ de financement.",
        },
    },
    "strategy": {
        "title": "Strat\u00e9gie",
        "subtitle": "Notre cadre strat\u00e9gique",
        "description": "Comment Harch Corp pr\u00e9voit de construire la souverainet\u00e9 industrielle de l'Afrique.",
        "pillars": {
            "title": "Piliers Strat\u00e9giques",
            "verticalIntegration": {
                "title": "Int\u00e9gration Verticale",
                "description": "Contr\u00f4le de l'ensemble de la cha\u00eene de valeur, des mati\u00e8res premi\u00e8res aux produits finis.",
            },
            "sovereignByDesign": {
                "title": "Souverain par Conception",
                "description": "Chaque syst\u00e8me con\u00e7u avec la souverainet\u00e9 des donn\u00e9es et l'autonomie op\u00e9rationnelle comme principes fondamentaux.",
            },
            "continentalScale": {
                "title": "\u00c9chelle Continentale",
                "description": "Op\u00e9rations dans 5+ pays avec 25 000+ emplois d'ici 2030.",
            },
        },
        "markets": {
            "title": "March\u00e9s Cibles",
            "description": "Maroc, Gambie, S\u00e9n\u00e9gal, Mauritanie et expansion \u00e0 travers le Sahel.",
        },
        "timeline": {
            "title": "Chronologie Strat\u00e9gique",
            "description": "De la fondation \u00e0 l'\u00e9chelle continentale d'ici 2030.",
        },
    },
    "legal": {
        "title": "Juridique",
        "subtitle": "Documents et politiques juridiques",
        "hub": {
            "title": "Espace Juridique",
            "subtitle": "Tous les documents juridiques en un seul endroit",
        },
        "accessibility": {
            "title": "D\u00e9claration d'Accessibilit\u00e9",
            "subtitle": "Notre engagement envers l'accessibilit\u00e9",
        },
        "ccpa": {
            "title": "Avis CCPA",
            "subtitle": "California Consumer Privacy Act",
        },
        "codeOfConduct": {
            "title": "Code de Conduite",
            "subtitle": "Nos normes \u00e9thiques",
        },
        "cookies": {
            "title": "Politique des Cookies",
            "subtitle": "Comment nous utilisons les cookies",
        },
        "dpa": {
            "title": "Accord de Traitement des Donn\u00e9es",
            "subtitle": "ATD pour nos services",
        },
        "gdpr": {
            "title": "Conformit\u00e9 RGPD",
            "subtitle": "Nos engagements RGPD",
        },
        "modernSlavery": {
            "title": "D\u00e9claration sur l'Esclavage Moderne",
            "subtitle": "Notre engagement envers les droits humains",
        },
        "sla": {
            "title": "Accord de Niveau de Service",
            "subtitle": "Nos garanties de disponibilit\u00e9 et de performance",
        },
        "trademark": {
            "title": "Politique de Marque",
            "subtitle": "Directives d'utilisation de nos marques",
        },
    },
    "trust": {
        "title": "Centre de Confiance",
        "subtitle": "S\u00e9curit\u00e9, conformit\u00e9 et transparence",
        "description": "Comment nous prot\u00e9geons vos donn\u00e9es, maintenons la conformit\u00e9 et gagnons votre confiance.",
        "aiEthics": {
            "title": "\u00c9thique de l'IA",
            "subtitle": "Principes d'IA responsable",
            "description": "Notre engagement \u00e0 d\u00e9velopper et d\u00e9ployer des syst\u00e8mes d'IA de mani\u00e8re responsable.",
        },
        "compliance": {
            "title": "Conformit\u00e9",
            "subtitle": "Certifications et normes",
            "description": "ISO 27001, SOC 2 Type II, RGPD et conformit\u00e9 sp\u00e9cifique au secteur.",
        },
        "security": {
            "title": "S\u00e9curit\u00e9",
            "subtitle": "Comment nous prot\u00e9geons vos donn\u00e9es",
            "description": "Chiffrement de bout en bout, surveillance 24/7 et r\u00e9sidence souveraine des donn\u00e9es.",
        },
        "vulnerability": {
            "title": "Divulgation de Vuln\u00e9rabilit\u00e9s",
            "subtitle": "Signaler les vuln\u00e9rabilit\u00e9s de s\u00e9curit\u00e9",
            "description": "Programme de divulgation responsable pour les chercheurs en s\u00e9curit\u00e9.",
        },
    },
    "privacy": {
        "title": "Politique de Confidentialit\u00e9",
        "subtitle": "Comment nous traitons vos donn\u00e9es",
        "lastUpdated": "Derni\u00e8re mise \u00e0 jour",
        "dataCollection": "Collecte de Donn\u00e9es",
        "dataUse": "Utilisation de vos Donn\u00e9es",
        "dataSharing": "Partage de Donn\u00e9es",
        "dataSecurity": "S\u00e9curit\u00e9 des Donn\u00e9es",
        "yourRights": "Vos Droits",
        "contactUs": "Nous Contacter",
    },
    "terms": {
        "title": "Conditions d'Utilisation",
        "subtitle": "Conditions g\u00e9n\u00e9rales",
        "lastUpdated": "Derni\u00e8re mise \u00e0 jour",
        "acceptance": "Acceptation des Conditions",
        "services": "Services",
        "obligations": "Vos Obligations",
        "limitation": "Limitation de Responsabilit\u00e9",
        "governingLaw": "Droit Applicable",
        "changes": "Modifications des Conditions",
    },
}


# ---------------------------------------------------------------------------
# Helper: deep merge dicts (new_data wins on conflicts)
# ---------------------------------------------------------------------------

def deep_merge(base: dict, override: dict) -> dict:
    """Merge override into base recursively. Override wins on conflicts."""
    result = base.copy()
    for key, value in override.items():
        if key in result and isinstance(result[key], dict) and isinstance(value, dict):
            result[key] = deep_merge(result[key], value)
        else:
            result[key] = value
    return result


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    # 1. Read existing files
    print("Reading existing translation files...")
    with open(EN_PATH, "r", encoding="utf-8") as f:
        en = json.load(f)
    with open(FR_PATH, "r", encoding="utf-8") as f:
        fr = json.load(f)

    en_keys_before = sorted(en.keys())
    fr_keys_before = sorted(fr.keys())
    print(f"  EN keys before: {len(en_keys_before)} — {en_keys_before}")
    print(f"  FR keys before: {len(fr_keys_before)} — {fr_keys_before}")

    # 2. Replace sidebar, footer, cookieConsent
    en["sidebar"] = EN_SIDEBAR
    en["footer"] = EN_FOOTER
    en["cookieConsent"] = EN_COOKIE_CONSENT

    fr["sidebar"] = FR_SIDEBAR
    fr["footer"] = FR_FOOTER
    fr["cookieConsent"] = FR_COOKIE_CONSENT

    # 3. Merge into subsidiaries (add agriculture & finance sub-keys)
    en["subsidiaries"] = deep_merge(en.get("subsidiaries", {}), EN_SUBSIDIARIES_MERGE)
    fr["subsidiaries"] = deep_merge(fr.get("subsidiaries", {}), FR_SUBSIDIARIES_MERGE)

    # 4. Add new top-level keys
    for key, value in EN_NEW_KEYS.items():
        en[key] = value
    for key, value in FR_NEW_KEYS.items():
        fr[key] = value

    # 5. Write back (remove old root-owned files first if needed)
    print("\nWriting updated translation files...")
    for path in (EN_PATH, FR_PATH):
        if not os.access(path, os.W_OK):
            os.remove(path)  # directory is writable, so unlink works
    with open(EN_PATH, "w", encoding="utf-8") as f:
        json.dump(en, f, ensure_ascii=False, indent=2)
        f.write("\n")  # trailing newline
    with open(FR_PATH, "w", encoding="utf-8") as f:
        json.dump(fr, f, ensure_ascii=False, indent=2)
        f.write("\n")  # trailing newline

    # 6. Report
    en_keys_after = sorted(en.keys())
    fr_keys_after = sorted(fr.keys())
    print(f"\n  EN keys after: {len(en_keys_after)} — {en_keys_after}")
    print(f"  FR keys after: {len(fr_keys_after)} — {fr_keys_after}")

    new_en = sorted(set(en_keys_after) - set(en_keys_before))
    new_fr = sorted(set(fr_keys_after) - set(fr_keys_before))
    print(f"\n  New EN top-level keys ({len(new_en)}): {new_en}")
    print(f"  New FR top-level keys ({len(new_fr)}): {new_fr}")

    print(f"\n  Replaced keys: sidebar, footer, cookieConsent")
    print(f"  Merged into subsidiaries: agriculture, finance")

    # 7. Verify by re-parsing
    print("\nVerifying JSON validity...")
    with open(EN_PATH, "r", encoding="utf-8") as f:
        en_check = json.load(f)
    with open(FR_PATH, "r", encoding="utf-8") as f:
        fr_check = json.load(f)
    print(f"  en.json: VALID — {len(en_check)} top-level keys")
    print(f"  fr.json: VALID — {len(fr_check)} top-level keys")

    # 8. Check key parity
    en_only = sorted(set(en_check.keys()) - set(fr_check.keys()))
    fr_only = sorted(set(fr_check.keys()) - set(en_check.keys()))
    if en_only or fr_only:
        print(f"\n  WARNING — Key parity mismatch!")
        if en_only:
            print(f"    Keys only in EN: {en_only}")
        if fr_only:
            print(f"    Keys only in FR: {fr_only}")
    else:
        print("\n  Key parity: OK — both files have identical top-level keys")

    print("\nDone!")


if __name__ == "__main__":
    main()
