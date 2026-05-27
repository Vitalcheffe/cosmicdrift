#!/usr/bin/env python3
"""
Phase 2: Comprehensive FR translation fix for remaining 2,092 untranslated keys.
Handles V5 raw key-as-value entries, short labels, and all remaining text.
"""

import json
import re

# ============================================================
# EXPANDED COMPREHENSIVE TRANSLATION MAP
# ============================================================

# Values that should stay in English (brand names, tech terms, proper nouns)
KEEP_EN_VALUES = {
    'harchos', 'harch agri', 'harch cement', 'harch energy', 'harch intelligence',
    'harchcorp', 'harch corp', 'harch', 'coreweave', 'google cloud', 'google cloud (hamina)',
    'lambda labs', 'equinix', 'oracle cloud infrastructure', 'qscale',
    'africa data centres (cassava)', 'naver', 'nexus core systems', 'nvidia',
    'harchos scheduler', 'harchagri drone', 'harchagri iot', 'harchagri vertical',
    'harch summit 2026', 'harch ventures',
    'gpUs', 'gpus', 'gpu', 'api', 'iso', 'iso 27001', 'soc 2 type ii',
    'pue', 'rgpd', 'gdpr', 'grpc', 'oauth', 'jwt', 'sso', 'saml',
    'aes-256', 'aes-256 encryption', 'aes', 'sha-256',
    'gco2/kwh', 'gco₂/kwh', 'mw', 'gw', 'kw', 'kwh', 'co2',
    'casablanca', 'dakhla', 'oujda', 'marrakech', 'ouarzazate',
    'banjul', 'nouakchott', 'dakar', 'bamako', 'gambia',
    'morocco', 'kenya', 'senegal', 'mali', 'ghana', 'canada',
    'terminal', 'hubs', 'hub', 'staging',
    'roi', 'pue', 'w', 'l', 'v', 'p',
    'on-demand', 'spot', 'reserved',
    'blog', 'rss', 'json', 'xml', 'yaml', 'csv',
    'live', 'healthy', 'optimal',
}

# Key paths that should stay in English regardless
KEEP_EN_KEY_PATTERNS = [
    'competitive.',  # competitive comparison brand names
    'competitorComparison.competitors.',  # competitor data
    'locations.',  # location names
    'capitalAllocation.',  # financial figures
]

# Comprehensive per-key translations for ALL remaining untranslated keys
# Format: "section.key.subkey" -> "French translation"
TRANSLATION_MAP = {
    # === interactivePlatform ===
    "interactivePlatform.intelligence.headerTabs.hubs": "Hubs",
    "interactivePlatform.intelligence.headerTabs.terminal": "Terminal",
    "interactivePlatform.intelligence.hubSuffix": "Hub",
    "interactivePlatform.intelligence.gpus": "GPU",
    "interactivePlatform.intelligence.gpuUnit": "GPU",
    "interactivePlatform.intelligence.carbonRatings.optimal": "Optimal",
    "interactivePlatform.intelligence.carbonRatings.good": "Bon",
    "interactivePlatform.intelligence.carbonRatings.moderate": "Modéré",
    "interactivePlatform.intelligence.carbonRatings.high": "Élevé",
    "interactivePlatform.intelligence.energySources.hydro": "Hydro",
    "interactivePlatform.intelligence.energySources.solar": "Solaire",
    "interactivePlatform.intelligence.energySources.wind": "Éolien",
    "interactivePlatform.intelligence.energySources.naturalGas": "Gaz naturel",
    "interactivePlatform.intelligence.energySources.grid": "Réseau",
    "interactivePlatform.intelligence.hubStatuses.staging": "Mise en service",
    "interactivePlatform.intelligence.hubStatuses.active": "Actif",
    "interactivePlatform.intelligence.hubStatuses.planned": "Planifié",
    "interactivePlatform.intelligence.hubStatuses.maintenance": "Maintenance",
    "interactivePlatform.supplyChain.infrastructure": "Infrastructure",
    "interactivePlatform.supplyChain.distribution": "Distribution",
    "interactivePlatform.supplyChain.auto": "Auto",
    "interactivePlatform.operations.headerTabs.incidents": "Incidents",
    "interactivePlatform.agriculture.sidebarLabels.irrigation": "Irrigation",
    "interactivePlatform.agriculture.headerTabs.irrigation": "Irrigation",
    "interactivePlatform.agriculture.cropNames.millet": "Millet",
    
    # === subsidiaries - handle V5 raw key-as-value patterns ===
    "subsidiaries.agriculture.partners.ghanaMofa.country": "Ghana",
    "subsidiaries.agriculture.partners.ghanaMofa.harchContribution": "Contribution Harch",
    "subsidiaries.agriculture.partners.ghanaMofa.partnerContribution": "Contribution partenaire",
    "subsidiaries.agriculture.partners.ghanaMofa.priority": "Priorité",
    "subsidiaries.agriculture.partners.ghanaMofa.status": "Statut",
    "subsidiaries.agriculture.partners.ghanaMofa.type": "Type",
    "subsidiaries.agriculture.pricing.starterKit.product": "Kit de démarrage",
    "subsidiaries.agriculture.pricing.starterKit.roi": "ROI Kit de démarrage",
    "subsidiaries.agriculture.pricing.starterKit.target": "Cible Kit de démarrage",
    "subsidiaries.agriculture.pricing.starterKit.unit": "Unité Kit de démarrage",
    "subsidiaries.agriculture.products.drone.stats.roi.label": "ROI",
    "subsidiaries.agriculture.products.vertical.stats.roi.label": "ROI",
    "subsidiaries.agriculture.roadmap.phase1.funding": "Financement Phase 1",
    "subsidiaries.agriculture.roadmap.phase2.funding": "Financement Phase 2",
    "subsidiaries.agriculture.roadmap.phase3.funding": "Financement Phase 3",
    
    # === legal ===
    "legal.accessibility.commitmentDescription": "Harch Corp S.A. s'engage à garantir l'accessibilité numérique pour les personnes en situation de handicap. Nous continuons à améliorer l'expérience utilisateur pour tous.",
    "legal.accessibility.standardsDescription": "Notre site web est conçu et développé pour être conforme aux <span class=\"text-white font-medium\">Directives pour l'accessibilité du contenu Web (WCAG) 2.1</span>, niveau AA.",
    "legal.accessibility.featuresIntro": "Nous avons mis en œuvre les fonctionnalités d'accessibilité suivantes sur notre site web :",
    "legal.accessibility.limitationsTitle": "Limitations connues",
    "legal.accessibility.limitationsIntro": "Malgré nos meilleurs efforts, certaines limitations d'accessibilité peuvent exister sur notre site web. Nous travaillons activement à les résoudre.",
    "legal.accessibility.feedbackTitle": "Commentaires et contact",
    "legal.accessibility.feedbackDescription": "Nous accueillons vos commentaires sur l'accessibilité de notre site web. Si vous rencontrez des barrières d'accessibilité, veuillez nous contacter.",
    "legal.accessibility.contactTeam": "Équipe Accessibilité",
    "legal.accessibility.contactEmailLabel": "E-mail :",
    "legal.accessibility.contactPhone": "Contactez-nous pour le support téléphonique",
    "legal.accessibility.contactAddress": "Adresse : Harch Corp S.A., 123 Boulevard Mohammed V, Casablanca 20000, Maroc",
    
    # === common ===
    "common.cookies": "Cookies",
    "common.copyright": "Copyright",
    "common.dimension": "Dimension",
    "common.documentation": "Documentation",
    "common.maximum": "Maximum",
    "common.menu": "Menu",
    "common.minimum": "Minimum",
    "common.notifications": "Notifications",
    "common.privacyPolicy": "Politique de confidentialité",
    "common.termsOfService": "Conditions d'utilisation",
    "common.cookiePolicy": "Politique de cookies",
    "common.investorRelations": "Relations investisseurs",
    "common.press": "Presse",
    "common.careers": "Carrières",
    "common.brand": "Marque",
    "common.status": "Statut",
    "common.security": "Sécurité",
    "common.compliance": "Conformité",
    "common.sustainability": "Durabilité",
    "common.governance": "Gouvernance",
    "common.discipline": "Discipline",
    "common.modality": "Modalité",
    "common.mode": "Mode",
    "common.toggle": "Basculer",
    "common.expand": "Développer",
    "common.collapse": "Réduire",
    "common.learnMore": "En savoir plus",
    "common.viewAll": "Voir tout",
    "common.showMore": "Afficher plus",
    "common.showLess": "Afficher moins",
    "common.loading": "Chargement",
    "common.error": "Erreur",
    "common.success": "Succès",
    "common.warning": "Avertissement",
    "common.info": "Info",
    "common.back": "Retour",
    "common.next": "Suivant",
    "common.previous": "Précédent",
    "common.close": "Fermer",
    "common.open": "Ouvrir",
    "common.save": "Enregistrer",
    "common.cancel": "Annuler",
    "common.delete": "Supprimer",
    "common.edit": "Modifier",
    "common.add": "Ajouter",
    "common.remove": "Retirer",
    "common.search": "Rechercher",
    "common.filter": "Filtrer",
    "common.sort": "Trier",
    "common.export": "Exporter",
    "common.import": "Importer",
    "common.refresh": "Actualiser",
    "common.reset": "Réinitialiser",
    "common.submit": "Soumettre",
    "common.confirm": "Confirmer",
    "common.reject": "Rejeter",
    "common.approve": "Approuver",
    "common.pending": "En attente",
    "common.active": "Actif",
    "common.inactive": "Inactif",
    "common.archived": "Archivé",
    "common.draft": "Brouillon",
    "common.published": "Publié",
    "common.unpublished": "Non publié",
    "common.required": "Requis",
    "common.optional": "Facultatif",
    "common.enabled": "Activé",
    "common.disabled": "Désactivé",
    "common.on": "Activé",
    "common.off": "Désactivé",
    "common.yes": "Oui",
    "common.no": "Non",
    "common.all": "Tous",
    "common.none": "Aucun",
    "common.other": "Autre",
    "common.custom": "Personnalisé",
    "common.default": "Par défaut",
    "common.new": "Nouveau",
    "common.existing": "Existant",
    "common.total": "Total",
    "common.average": "Moyenne",
    "common.median": "Médiane",
    "common.range": "Plage",
    "common.change": "Changement",
    "common.difference": "Différence",
    "common.improvement": "Amélioration",
    "common.decrease": "Diminution",
    "common.increase": "Augmentation",
    "common.impact": "Impact",
    "common.contribution": "Contribution",
    "common.allocation": "Allocation",
    "common.distribution": "Distribution",
    "common.breakdown": "Répartition",
    "common.overview": "Aperçu",
    "common.summary": "Résumé",
    "common.details": "Détails",
    "common.description": "Description",
    "common.notes": "Notes",
    "common.remarks": "Remarques",
    "common.references": "Références",
    "common.sources": "Sources",
    "common.methodology": "Méthodologie",
    "common.assumptions": "Hypothèses",
    "common.limitations": "Limitations",
    "common.disclaimer": "Avertissement",
    "common.footnotes": "Notes de bas de page",
    "common.appendix": "Annexe",
    "common.glossary": "Glossaire",
    "common.index": "Index",
    "common.tableOfContents": "Table des matières",
    "common.changelog": "Journal des modifications",
    "common.version": "Version",
    "common.revision": "Révision",
    "common.update": "Mise à jour",
    "common.updates": "Mises à jour",
    "common.latest": "Dernier",
    "common.previous": "Précédent",
    "common.historical": "Historique",
    "common.comparison": "Comparaison",
    "common.benchmark": "Référence",
    "common.target": "Cible",
    "common.actual": "Réel",
    "common.forecast": "Prévision",
    "common.projection": "Projection",
    "common.scenario": "Scénario",
    "common.estimate": "Estimation",
    "common.calculated": "Calculé",
    "common.measured": "Mesuré",
    "common.reported": "Rapporté",
    "common.verified": "Vérifié",
    "common.certified": "Certifié",
    "common.accredited": "Accrédité",
    "common.registered": "Enregistré",
    "common.licensed": "Licencié",
    "common.authorized": "Autorisé",
    "common.approved": "Approuvé",
    "common.compliant": "Conforme",
    "common.validated": "Validé",
    "common.tested": "Testé",
    "common.inspected": "Inspecté",
    "common.audited": "Audité",
    "common.reviewed": "Révisé",
    "common.evaluated": "Évalué",
    "common.assessed": "Évalué",
    "common.analyzed": "Analysé",
    "common.optimized": "Optimisé",
    "common.enhanced": "Amélioré",
    "common.upgraded": "Mis à niveau",
    "common.migrated": "Migré",
    "common.deployed": "Déployé",
    "common.integrated": "Intégré",
    "common.configured": "Configuré",
    "common.customized": "Personnalisé",
    "common.standardized": "Standardisé",
    "common.automated": "Automatisé",
    "common.digitalized": "Numérisé",
    "common.monitoring": "Surveillance",
    "common.reporting": "Rapport",
    "common.analytics": "Analytique",
    "common.insights": "Perspectives",
    "common.trends": "Tendances",
    "common.patterns": "Modèles",
    "common.anomalies": "Anomalies",
    "common.alerts": "Alertes",
    "common.incidents": "Incidents",
    "common.events": "Événements",
    "common.logs": "Journaux",
    "common.records": "Enregistrements",
    "common.history": "Historique",
    "common.timeline": "Chronologie",
    "common.milestone": "Jalon",
    "common.milestones": "Jalons",
    "common.deadline": "Date limite",
    "common.schedule": "Calendrier",
    "common.calendar": "Calendrier",
    "common.frequency": "Fréquence",
    "common.period": "Période",
    "common.interval": "Intervalle",
    "common.duration": "Durée",
    "common.lifetime": "Durée de vie",
    "common.warranty": "Garantie",
    "common.contract": "Contrat",
    "common.agreement": "Accord",
    "common.terms": "Conditions",
    "common.conditions": "Conditions",
    "common.obligations": "Obligations",
    "common.rights": "Droits",
    "common.responsibilities": "Responsabilités",
    "common.liabilities": "Responsabilités",
    "common.indemnities": "Indemnités",
    "common.penalties": "Pénalités",
    "common.bonuses": "Bonus",
    "common.incentives": "Incitations",
    "common.benefits": "Avantages",
    "common.perks": "Avantages",
    "common.compensation": "Rémunération",
    "common.reimbursement": "Remboursement",
    "common.allowance": "Indemnité",
    "common.budget": "Budget",
    "common.cost": "Coût",
    "common.expense": "Dépense",
    "common.revenue": "Revenu",
    "common.profit": "Profit",
    "common.loss": "Perte",
    "common.margin": "Marge",
    "common.return": "Retour",
    "common.yield": "Rendement",
    "common.rate": "Taux",
    "common.ratio": "Ratio",
    "common.multiplier": "Multiplicateur",
    "common.factor": "Facteur",
    "common.coefficient": "Coefficient",
    "common.weight": "Poids",
    "common.score": "Score",
    "common.rating": "Note",
    "common.rank": "Rang",
    "common.tier": "Niveau",
    "common.level": "Niveau",
    "common.grade": "Grade",
    "common.class": "Classe",
    "common.category": "Catégorie",
    "common.type": "Type",
    "common.kind": "Genre",
    "common.variant": "Variante",
    "common.model": "Modèle",
    "common.version": "Version",
    "common.edition": "Édition",
    "common.release": "Version",
    "common.build": "Build",
    "common.patch": "Correctif",
    "common.hotfix": "Correctif urgent",
    "common.feature": "Fonctionnalité",
    "common.enhancement": "Amélioration",
    "common.improvement": "Amélioration",
    "common.fix": "Correction",
    "common.bug": "Bug",
    "common.issue": "Problème",
    "common.defect": "Défaut",
    "common.vulnerability": "Vulnérabilité",
    "common.threat": "Menace",
    "common.risk": "Risque",
    "common.weakness": "Faiblesse",
    "common.strength": "Force",
    "common.opportunity": "Opportunité",
    "common.challenge": "Défi",
    "common.obstacle": "Obstacle",
    "common.barrier": "Barrière",
    "common.constraint": "Contrainte",
    "common.limitation": "Limitation",
    "common.restriction": "Restriction",
    "common.requirement": "Exigence",
    "common.prerequisite": "Prérequis",
    "common.dependency": "Dépendance",
    "common.interdependency": "Interdépendance",
    "common.relationship": "Relation",
    "common.connection": "Connexion",
    "common.link": "Lien",
    "common.reference": "Référence",
    "common.association": "Association",
    "common.mapping": "Cartographie",
    "common.alignment": "Alignement",
    "common.integration": "Intégration",
    "common.interoperability": "Interopérabilité",
    "common.compatibility": "Compatibilité",
    "common.portability": "Portabilité",
    "common.scalability": "Évolutivité",
    "common.elasticity": "Élasticité",
    "common.resilience": "Résilience",
    "common.redundancy": "Redondance",
    "common.availability": "Disponibilité",
    "common.reliability": "Fiabilité",
    "common.durability": "Durabilité",
    "common.longevity": "Longévité",
    "common.maintainability": "Maintenabilité",
    "common.serviceability": "Maintenabilité",
    "common.repairability": "Réparabilité",
    "common.upgradability": "Évolutivité",
    "common.extensibility": "Extensibilité",
    "common.flexibility": "Flexibilité",
    "common.adaptability": "Adaptabilité",
    "common.customizability": "Personnalisabilité",
    "common.configurability": "Configurabilité",
    "common.modularity": "Modularité",
    "common.composability": "Composabilité",
    "common.reusability": "Réutilisabilité",
    "common.replaceability": "Remplaçabilité",
    "common.substitutability": "Substituabilité",
    "common.interchangeability": "Interchangeabilité",
    
    # === Intelligence (remaining 7) ===
    "intelligence.pricing.spot": "Spot",
    "intelligence.specs.hubs": "Hubs",
    "intelligence.heroLabel": "Intelligence",
    "intelligence.heroTitle": "Harch Intelligence",
    "intelligence.stats.carbonIntensity.label": "gCO2/kWh",
    "intelligence.stats.gpus.label": "GPU",
    "intelligence.stats.hubs.label": "Hubs",
    "intelligence.liveMetricsTitle": "HARCH OS // MÉTRIQUES EN DIRECT",
    
    # === HarchOS ===
    "harchos.navOverlay.navigation": "NAVIGATION",
    "harchos.navOverlay.nav.aip": "HarchOS",
    "harchos.navOverlay.nav.foundry": "Fonderie",
    "harchos.navOverlay.nav.gotham": "Intelligence",
    "harchos.navOverlay.bottomLinks.blog": "Blog",
    "harchos.navOverlay.bottomLinks.contact": "Contact",
    "harchos.title": "HarchOS",
    "harchos.hero.stats.gpus": "GPU",
    "harchos.hero.stats.hubs": "Hubs",
    "harchos.hero.stats.carbon": "gCO₂/kWh",
    "harchos.demo.sovereign.incidents24h": "Incidents (24h)",
    "harchos.demo.sovereign.impactLabel": "Impact",
    "harchos.demo.carbon.gpus": "GPU",
    "harchos.demo.carbon.type": "Type",
    "harchos.demo.carbon.bestHubName": "Harch Ouarzazate",
    "harchos.workflow.videoDuration": "2:34 min",
    "harchos.workflow.video.sidebar.pipeline": "Constructeur de Pipeline",
    "harchos.workflow.video.sidebar.workflows": "Flux de travail",
    "harchos.workflow.video.pipelineBuilder": "Constructeur de Pipeline",
    "harchos.workflow.video.nodes.transformType": "RL + Transformer + GNN",
    "harchos.workflow.nodes.n1Sub": "IoT / API / Satellite",
    "harchos.evaluate.videoDuration": "1:58 min",
    "harchos.architecture.act.title": "ACTION",
    "harchos.architecture.sense.subtitle": "Perception",
    "harchos.architecture.sense.title": "PERCEPTION",
    "harchos.architecture.think.title": "PENSÉE",
    "harchos.specs.compliance": "RGPD, ISO 27001, SOC 2 Type II",
    "harchos.specs.totalGpus": "Total GPU",
    "harchos.competitive.harchName": "HarchOS",
    "harchos.competitive.coreweave.name": "CoreWeave",
    "harchos.competitive.coreweave.m5Label": "PUE",
    "harchos.competitive.googleCloud.name": "Google Cloud (Hamina)",
    "harchos.competitive.googleCloud.m8Harch": "~47 gCO2/kWh",
    "harchos.competitive.africaDataCentres.name": "Africa Data Centres (Cassava)",
    "harchos.competitive.africaDataCentres.m2Competitor": "30MW",
    "harchos.competitive.africaDataCentres.m4Label": "PUE",
    "harchos.competitive.africaDataCentres.m7Harch": "~47 gCO2/kWh",
    "harchos.competitive.qscale.name": "QScale",
    "harchos.competitive.qscale.country": "Canada",
    "harchos.competitive.qscale.m4Harch": "<5ms",
    "harchos.competitive.qscale.m4Competitor": ">150ms",
    "harchos.competitive.qscale.m8Harch": "~47 gCO2/kWh",
    "harchos.competitive.qscale.m8Competitor": "~30 gCO2/kWh (hydro)",
    "harchos.competitive.lambdaLabs.name": "Lambda Labs",
    "harchos.competitive.lambdaLabs.m3Harch": "~47 gCO2/kWh",
    "harchos.competitive.lambdaLabs.m6Label": "PUE",
    "harchos.competitive.oracleCloud.name": "Oracle Cloud Infrastructure",
    "harchos.competitive.oracleCloud.m3Harch": "~47 gCO2/kWh",
    "harchos.competitive.equinix.name": "Equinix",
    "harchos.cta.briefing": "Briefing",
    "harchos.sectors.items.s4": "AGRICULTURE & AGRITECH",
    "harchos.pageFooter.regions": "MA  EU  AF",
    "harchos.pageFooter.social.youtube": "YOUTUBE",
    "harchos.pageFooter.social.x": "X",
    "harchos.pageFooter.social.linkedin": "LINKEDIN",
    "harchos.pageFooter.social.github": "GITHUB",
    "harchos.pageFooter.offerings.items.i10": "Streaming",
    "harchos.pageFooter.documents.title": "DOCUMENTS",
    "harchos.status.live": "EN DIRECT",
    "harchos.status.healthy": "EN BONNE SANTÉ",
    
    # === about ===
    "about.history.milestones.2023.title": "Vision Conçue",
    "about.history.milestones.2023.description": "Amine Harch El Korane identifie l'écart entre la richesse des ressources de l'Afrique et sa capacité industrielle, et conçoit une vision d'infrastructures souveraines.",
    "about.history.milestones.2024._value": "Harch Corp fondée à Casablanca, Maroc",
    "about.history.milestones.2024.title": "Fondation",
    "about.history.milestones.2024.description": "Harch Corp S.A. enregistrée à Casablanca avec un capital de 100M MAD. Équipe fondatrice constituée à travers 4 pays.",
    "about.history.milestones.2025._value": "Lancement de Harch Intelligence et cloud GPU conscient du carbone",
    "about.history.milestones.2025.title": "Phase d'Ingénierie",
    "about.history.milestones.2025.description": "L'ingénierie du centre de données de Dakhla commence. Les permis de la cimenterie en Gambie sont obtenus. Le pipeline d'énergie renouvelable atteint 2GW.",
    
    # === hiringProcess ===
    "hiringProcess.accommodations.item0": "Adaptations du poste de travail selon les besoins",
    "hiringProcess.accommodations.item1": "Formats d'entretien alternatifs disponibles",
    "hiringProcess.accommodations.item2": "Technologies d'assistance fournies",
    "hiringProcess.accommodations.item3": "Communications accessibles garanties",
    "hiringProcess.accommodations.item4": "Accompagnement personnalisé pendant tout le processus",
    
    # === pricing ===
    "pricing.calculator.calculate": "Calculer",
    "pricing.calculator.estimatedCost": "Coût estimé",
    "pricing.calculator.gpuType": "Type de GPU",
    "pricing.calculator.hoursPerMonth": "Heures par mois",
    "pricing.calculator.estimateNote": "Estimation basée sur le tier Professionnel H100. Le tarif réel varie selon le type de GPU et la région.",
    "pricing.costOptimization.titleLine1": "Optimisation",
    "pricing.costOptimization.titleLine2": "des Coûts",
    
    # === contact ===
    "contact.compliance.certifications": "Certifications",
    "contact.compliance.iso": "ISO 27001",
    "contact.compliance.soc2": "SOC 2 Type II",
    "contact.compliance.dataSovereignty": "Souveraineté des données",
    "contact.compliance.soc2TypeII": "SOC 2 Type II",
    "contact.compliance.iso27001": "ISO 27001",
    "contact.compliance.moroccanDpa": "CNDP Maroc",
    "contact.compliance.aes256": "AES-256",
    
    # === investors ===
    "investors.capitalAllocation.agriculture": "Agriculture — 145M$",
    "investors.capitalAllocation.cement": "Ciment — 280M$",
    "investors.capitalAllocation.energy": "Énergie — 890M$",
    "investors.capitalAllocation.finance": "Finance — 95M$",
    "investors.capitalAllocation.intelligence": "Intelligence — 320M$",
    "investors.capitalAllocation.mining": "Mines — 195M$",
    "investors.capitalAllocation.technology": "Technologie — 65M$",
    "investors.capitalAllocation.water": "Eau — 410M$",
    
    # === faq ===
    "faq.breadcrumbs.faq": "FAQ",
    "faq.breadcrumbs.home": "Accueil",
    "faq.categories.all": "Tous",
    "faq.categories.company": "Entreprise",
    "faq.categories.esg": "ESG",
    "faq.categories.infrastructure": "Infrastructure",
    "faq.categories.investment": "Investissement",
    "faq.categories.partnerships": "Partenariats",
    "faq.contact.cta": "Contacter le support",
    "faq.contact.description": "Notre équipe est là pour vous aider.",
    
    # === sidebar ===
    "sidebar.architecture": "Architecture",
    "sidebar.blog": "Blog",
    "sidebar.business": "Entreprise",
    "sidebar.casablanca": "Casablanca",
    "sidebar.changelog": "Journal des modifications",
    "sidebar.ctas.demo": "Demander une démo",
    "sidebar.ctas.investor": "Relations investisseurs",
    "sidebar.documentation": "Documentation",
    "sidebar.finance": "Finance",
    "sidebar.guides": "Guides",
    "sidebar.intelligence": "Intelligence",
    "sidebar.investorRelations": "Relations investisseurs",
    "sidebar.pricing": "Tarification",
    "sidebar.status": "Statut",
    "sidebar.support": "Support",
    "sidebar.team": "Équipe",
    "sidebar.technical": "Technique",
    "sidebar.apiReference": "Réf. API",
    
    # === footer ===
    "footer.architecture": "Architecture",
    "footer.blog": "Blog",
    "footer.business": "Entreprise",
    "footer.contact": "Contact",
    "footer.cookies": "Cookies",
    "footer.documentation": "Documentation",
    "footer.finance": "Finance",
    "footer.guides": "Guides",
    "footer.intelligence": "Intelligence",
    "footer.investor": "Investisseur",
    "footer.investorRelations": "Relations investisseurs",
    "footer.legal": "Juridique",
    "footer.press": "Presse",
    "footer.pricing": "Tarification",
    "footer.privacy": "Confidentialité",
    "footer.status": "Statut",
    "footer.support": "Support",
    "footer.team": "Équipe",
    
    # === status ===
    "status.servicesLabel": "Services",
    "status.incidentsLabel": "Incidents",
    "status.maintenanceLabel": "Maintenance",
    "status.maintenanceServices": "API HarchOS Core & Moteur IA THINK",
    "status.notificationsLabel": "Notifications",
    "status.services.harchosCoreApi.name": "API HarchOS Core",
    "status.services.thinkAiEngine.name": "Moteur IA THINK",
    "status.services.actExecutionLayer.name": "Couche d'Exécution ACT",
    
    # === nav ===
    "nav.blog": "Blog",
    "nav.compliance": "Conformité",
    "nav.contact": "Contact",
    "nav.deployments": "Déploiements",
    "nav.docs": "Documentation",
    "nav.faq": "FAQ",
    "nav.intelligence": "Intelligence",
    "nav.mission": "Mission",
    "nav.platform": "Plateforme",
    "nav.pricing": "Tarification",
    "nav.status": "Statut",
    "nav.support": "Support",
    "nav.team": "Équipe",
    
    # === developers ===
    "developers.community.0.title": "Serveur Discord",
    "developers.community.1.title": "Communauté GitHub",
    "developers.community.2.title": "Groupe LinkedIn",
    "developers.openSource.backToDevelopers": "Open Source - Retour aux développeurs",
    "developers.openSource.label": "Open Source",
    "developers.terminalLabel": "Terminal",
    "developers.apiPlayground": "Playground API",
    "developers.architecture": "Architecture",
    "developers.documentation": "Documentation",
    "developers.guides": "Guides",
    "developers.support": "Support",
    "developers.technical": "Technique",
    
    # === terms ===
    "terms.acceptance": "Acceptation",
    "terms.contact": "Contact",
    "terms.disclaimer": "Avertissement",
    "terms.governingLaw": "Droit applicable",
    "terms.governingLawText": "Le présent accord est régi par les lois du Royaume du Maroc. Tout litige sera soumis à la compétence exclusive des tribunaux de Casablanca.",
    "terms.lastUpdatedDate": "Dernière date de mise à jour",
    "terms.modifications": "Modifications",
    "terms.services": "Services",
    
    # === charts ===
    "charts.esgRadar.innovation": "Innovation",
    "charts.portfolioDistribution.intelligence": "Intelligence",
    "charts.portfolioDistribution.agri": "Agri",
    "charts.portfolioDistribution.finance": "Finance",
    "charts.gpuUtilization.casablanca": "Casablanca",
    "charts.gpuUtilization.dakhla": "Dakhla",
    "charts.gpuUtilization.marrakech": "Marrakech",
    "charts.gpuUtilization.oujda": "Oujda",
    "charts.gpuUtilization.ouarzazate": "Ouarzazate",
    "charts.carbonIntensity.solar": "Solaire",
    "charts.carbonIntensity.wind": "Éolien",
    "charts.carbonIntensity.hydro": "Hydro",
    "charts.carbonIntensity.naturalGas": "Gaz naturel",
    
    # === newsroom ===
    "newsroom.readFullDispatch": "Lire la dépêche complète",
    "newsroom.newsletter": "Newsletter",
    "newsroom.subscribe": "S'abonner",
    
    # === careers ===
    "careers.benefits.impact.title": "Impact",
    "careers.departments.agri": "Agri",
    "careers.departments.intelligence": "Intelligence",
    "careers.phase": "Phase",
    "careers.positions.aiMlWeaponsLead.department": "Intelligence",
    "careers.positions.aiMlWeaponsLead.level": "Responsable",
    "careers.positions.corpFinanceAnalyst.department": "Corporate",
    "careers.positions.cybersecArchitect.level": "Responsable",
    
    # === privacy ===
    "privacy.cookies": "Cookies",
    "privacy.sections.contact.title": "Contact",
    "privacy.sections.cookies.title": "Cookies",
    
    # === africaMap ===
    "africaMap.locations.casa.name": "Casablanca",
    "africaMap.locations.dakhla.name": "Dakhla",
    "africaMap.locations.dakhla.vertical": "Intelligence",
    "africaMap.locations.banjul.name": "Banjul",
    "africaMap.locations.nouakchott.name": "Nouakchott",
    "africaMap.locations.dakar.name": "Dakar",
    "africaMap.locations.dakar.vertical": "Agri",
    "africaMap.locations.bamako.name": "Bamako",
    "africaMap.locations.bamako.vertical": "Mines",
    
    # === quoteReceived ===
    "quoteReceived.nextSteps.step1.title": "Confirmation",
    "quoteReceived.nextSteps.step4.title": "Briefing",
    
    # === startupProgram ===
    "startupProgram.alumni.title": "Alumni",
    "startupProgram.heroLabel": "Startup",
    
    # === topNav ===
    "topNav.intelligence": "Intelligence",
    "topNav.contact": "Contact",
    
    # === caseStudies ===
    "caseStudies.solution": "Solution",
    
    # === community ===
    "community.champions.label": "Champions",
    
    # === cookieConsent ===
    "cookieConsent.marketing": "Marketing",
    
    # === immersiveHero ===
    "immersiveHero.harchCorp": "HARCH CORP",
    
    # === company ===
    "company.dei.ergsLabel": "ERG",
    "company.dei.initiativesLabel": "Initiatives",
    "company.dei.label": "DEI",
    "company.ventures.heroTitle1": "Harch",
    "company.ventures.heroTitle2": "Ventures",
    "company.ventures.thesisLabel": "Thèse",
    
    # === customers ===
    "customers.advisoryBoard.cadenceLabel": "Cadence",
    "customers.advisoryBoard.coCreationLabel": "Co-création",
    "customers.advisoryBoard.title": "Conseil consultatif",
    "customers.heroLabel": "Clients",
    "customers.title": "Clients",
    "customers.readCaseStudy": "Lire l'étude de cas",
    
    # === partners ===
    "partners.becomePartner.benefits.title": "Avantages partenaires",
    "partners.categories.financial.title": "Partenaires financiers",
    "partners.categories.government.title": "Partenaires gouvernementaux",
    "partners.categories.industrial.title": "Partenaires industriels",
    "partners.categories.technology.title": "Partenaires technologiques",
    
    # === competitive ===
    "competitive.verdict": "Verdict",
    "competitive.harchBar": "Harch",
    "competitive.compBar": "Conc.",
    "competitive.win": "V",
    "competitive.loss": "P",
    
    # === languageDetector ===
    "languageDetector.availableIn": "Ce site est également disponible en",
    "languageDetector.nativeTranslation": "Traduction native complète",
    "languageDetector.autoTranslation": "Traduction automatique via Google",
    "languageDetector.viewIn": "Voir en",
    "languageDetector.dismiss": "Anglais",
    
    # === api ===
    "api.errors.nameRequired": "Le nom est requis.",
    "api.errors.emailRequired": "Une adresse e-mail valide est requise.",
    "api.errors.messageRequired": "Le message est requis.",
    "api.errors.consultationTypeRequired": "Le type de consultation est requis.",
    "api.errors.invalidBody": "Corps de requête invalide.",
    
    # === learn ===
    "learn.certifications.formatLabel": "Format",
    "learn.certifications.label": "Certifications",
    "learn.university.label": "Université",
    "learn.university.title": "Université",
    
    # === networkOntology ===
    "networkOntology.harchCorp": "HARCH CORP",
    "networkOntology.verticals.intelligence": "Intelligence",
    "networkOntology.verticals.agri": "Agri",
    "networkOntology.verticals.finance": "Finance",
    
    # === blog ===
    "blog.heroTitle": "Blog Harch",
    "blog.newsletter": "Newsletter",
    "blog.title": "Blog",
    
    # === rss ===
    "rss.blogFeed": "Flux RSS du blog Harch Corp",
    "rss.newsroomFeed": "Flux RSS de la rédaction Harch Corp",
    
    # === worldMap ===
    "worldMap.locations.casablanca.name": "Casablanca",
    "worldMap.locations.dakhla.name": "Dakhla",
    "worldMap.locations.dakhla.vertical": "Intelligence",
    "worldMap.locations.senegal.vertical": "Agri",
    "worldMap.locations.mali.name": "Mali",
    
    # === subsidiaryDetail ===
    "subsidiaryDetail.competitiveEdge": "Avantage Concurrentiel",
    "subsidiaryDetail.keyMilestones": "Jalons Clés",
    "subsidiaryDetail.partnership": "Partenariat",
    "subsidiaryDetail.phase": "Phase",
    "subsidiaryDetail.specSheet": "Fiche Technique",
    "subsidiaryDetail.builtToLast": "Conçu pour Durer",
    "subsidiaryDetail.capabilities": "Capacités",
    "subsidiaryDetail.capacity": "Capacité",
    "subsidiaryDetail.capitalDeployment": "Déploiement de capital",
    
    # === events ===
    "events.cta.sponsor.title": "Sponsor",
    "events.flagship.date": "15-17 Mars",
    "events.flagship.location": "Casablanca, Maroc",
    "events.flagship.month": "Mars",
    "events.flagship.title": "Harch Summit 2026",
    
    # === esg ===
    "esg.cta.title": "Passer à l'Action",
    "esg.environmental.title": "Cloud GPU Conscient du Carbone",
    "esg.governance.tableHeaders.standard": "Norme",
    "esg.governance.tableHeaders.vertical": "Verticale",
    "esg.hero.label": "ESG",
    
    # === press ===
    "press.brandAssets.typography": "Typographie",
    "press.factSheet.attributeHeader": "Attribut",
    "press.factSheet.capital": "Capital",
    "press.factSheet.description": "Informations clés sur Harch Corp en un coup d'œil.",
    "press.factSheet.downloadPdf": "Télécharger PDF",
    
    # === strategy ===
    "strategy.hero.title": "OPÉRATEUR",
    "strategy.hero.metaLabel": "STRATÉGIE",
    "strategy.stats.investmentPipeline": "Pipeline d'investissement",
    "strategy.stats.verticals": "Filiales",
    "strategy.stats.countries": "Pays",
    "strategy.stats.jobsBy2028": "Emplois d'ici 2028",
    "strategy.verticalsDeep.intelligence.name": "Harch Intelligence",
    "strategy.verticalsDeep.intelligence.desc": "Plateforme de centre de données GPU conscient du carbone de 1 798 GPU au Maroc. Clusters GPU de nouvelle génération pour le cloud IA souverain.",
    "strategy.verticalsDeep.cement.desc": "Production de ciment de 500kT/an en Gambie, au service du boom de la construction en Afrique de l'Ouest. Verticalement intégré avec carrières et logistique.",
    "strategy.verticalsDeep.energy.desc": "Pipeline renouvelable de plus de 2GW d'énergie solaire, éolienne et d'hydrogène vert au Maroc et au Sahel. Électricité zéro carbone.",
    "strategy.verticalsDeep.technology.desc": "Pile technologique souveraine : plateformes IA, cybersécurité et communications par satellite. 1 798 GPU optimisés pour le carbone.",
    
    # === support ===
    "support.ticketSystem.priority": "Priorité",
    "support.ticketSystem.statuses.closed": "Fermé",
    "support.ticketSystem.statuses.inProgress": "En cours",
    "support.ticketSystem.statuses.open": "Ouvert",
    "support.ticketSystem.statuses.resolved": "Résolu",
    
    # === platform ===
    "platform.api.documentation": "Documentation API",
    "platform.api.title": "API HarchOS",
    "platform.api.webhooks": "Webhooks",
    "platform.capabilities.carbonAwareScheduling.description": "Optimisation automatique des charges de travail en fonction de l'intensité carbone du réseau, minimisant l'empreinte carbone opérationnelle.",
    "platform.capabilities.carbonAwareScheduling.title": "Ordonnancement Conscient du Carbone",
    
    # === thesis ===
    "thesis.marketOpportunity.sam.value": "120Md$+",
    "thesis.marketOpportunity.som.value": "2,4Md$+",
    "thesis.marketOpportunity.tam.value": "2 000Md$+",
    "thesis.subtitle": "La voie de l'Afrique vers la souveraineté industrielle",
    "thesis.theProblem.dependencies.energy.title": "Insécurité Énergétique",
    
    # === engineeringBlog ===
    "engineeringBlog.openSource": "Open Source",
    "engineeringBlog.openSourceRepos.harchosScheduler.desc": "HarchOS Scheduler — Moteur d'ordonnancement GPU conscient du carbone",
    "engineeringBlog.posts.designingSenseLayer.date": "Janvier 2026",
    "engineeringBlog.posts.gpuScheduling.date": "Décembre 2025",
    "engineeringBlog.posts.gpuScheduling.title": "Ordonnancement GPU Conscient du Carbone à Grande Échelle",
    
    # === harchagri ===
    "harchagri.competitorComparison.competitors.twiga.country": "Kenya",
    "harchagri.competitorComparison.competitors.twiga.model": "Commission 8-12%",
    "harchagri.competitorComparison.competitors.apollo.country": "Kenya",
    "harchagri.competitorComparison.harchAgri.title": "Harch Agri",
    "harchagri.productCards.products.drone.name": "Drone HarchAgri",
    "harchagri.productCards.products.drone.stats.roi.label": "ROI",
    "harchagri.productCards.products.iot.name": "IoT HarchAgri",
    "harchagri.productCards.products.vertical.name": "Vertical HarchAgri",
}

def set_nested_value(d, key_path, value):
    """Set a value in a nested dict using dot-separated key path"""
    keys = key_path.split('.')
    current = d
    for k in keys[:-1]:
        if k not in current or not isinstance(current[k], dict):
            current[k] = {}
        current = current[k]
    current[keys[-1]] = value


def main():
    with open('messages/fr.json', 'r', encoding='utf-8') as f:
        fr = json.load(f)
    with open('messages/en.json', 'r', encoding='utf-8') as f:
        en = json.load(f)
    
    def get_all_leaf_keys(d, prefix=''):
        result = {}
        for k, v in d.items():
            full_key = f'{prefix}.{k}' if prefix else k
            if isinstance(v, dict):
                result.update(get_all_leaf_keys(v, full_key))
            else:
                result[full_key] = v
        return result
    
    total_fixed = 0
    still_remaining = {}
    
    for section in en:
        if not isinstance(en[section], dict):
            continue
        en_leaves = get_all_leaf_keys(en[section])
        fr_section = fr.get(section)
        if not isinstance(fr_section, dict):
            continue
        fr_leaves = get_all_leaf_keys(fr_section)
        
        section_fixed = 0
        section_remaining = []
        
        for k, en_val in en_leaves.items():
            if not isinstance(en_val, str):
                continue
            if k not in fr_leaves:
                continue
            if fr_leaves[k] != en_val:
                continue  # Already translated
            if not en_val or not any(c.isalpha() for c in en_val):
                continue
            
            full_key = f"{section}.{k}"
            
            # Check explicit translation map
            if full_key in TRANSLATION_MAP:
                set_nested_value(fr[section], k, TRANSLATION_MAP[full_key])
                section_fixed += 1
                total_fixed += 1
                continue
            
            section_remaining.append((k, en_val))
        
        if section_remaining:
            still_remaining[section] = section_remaining
    
    # Save updated fr.json
    with open('messages/fr.json', 'w', encoding='utf-8') as f:
        json.dump(fr, f, ensure_ascii=False, indent=2)
    
    print(f"Keys fixed in this pass: {total_fixed}")
    print(f"Still remaining: {sum(len(v) for v in still_remaining.values())}")
    print()
    
    for section, items in sorted(still_remaining.items(), key=lambda x: -len(x[1])):
        print(f"  {section}: {len(items)} remaining")
    
    # Save remaining for LLM pass
    with open('/tmp/still_untranslated_v2.json', 'w', encoding='utf-8') as f:
        json.dump({s: items for s, items in still_remaining.items()}, f, ensure_ascii=False, indent=2)

if __name__ == '__main__':
    main()
