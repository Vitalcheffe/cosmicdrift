#!/usr/bin/env python3
"""
Comprehensive FR translation fix for Harch Corp website.
Fixes all untranslated keys (FR == EN) across all 55 sections.
Uses a built-in translation dictionary + pattern-based translation.
"""

import json
import re
import sys

# ============================================================
# COMPREHENSIVE TRANSLATION DICTIONARY
# ============================================================

# Exact phrase translations (lowercase key -> French value)
PHRASE_DICT = {
    # Common UI terms
    "about": "À propos",
    "accessibility": "Accessibilité",
    "acceptance": "Acceptation",
    "accommodations": "Aménagements",
    "actions": "Actions",
    "active": "Actif",
    "address": "Adresse",
    "agriculture": "Agriculture",
    "agritech": "AgriTech",
    "all": "Tous",
    "analysis": "Analyse",
    "analytics": "Analytique",
    "api": "API",
    "architecture": "Architecture",
    "archive": "Archive",
    "articles": "Articles",
    "assets": "Actifs",
    "audit": "Audit",
    "authentication": "Authentification",
    "automation": "Automatisation",
    "available": "Disponible",
    "back to home": "Retour à l'accueil",
    "back to developers": "Retour aux développeurs",
    "back to engineering blog": "Retour au blog technique",
    "back to dispatches": "Retour aux dépêches",
    "blog": "Blog",
    "blog harch": "Blog Harch",
    "brand assets": "Ressources de marque",
    "brand assets subtitle": "Téléchargez nos ressources de marque officielles",
    "brand guidelines": "Directives de marque",
    "breach": "Violation",
    "briefing": "Briefing",
    "browse articles": "Parcourir les articles",
    "business": "Entreprise",
    "calculator": "Calculateur",
    "calendar": "Calendrier",
    "capabilities": "Capacités",
    "capacity": "Capacité",
    "capital deployment": "Déploiement de capital",
    "carbon aware": "Conscient du carbone",
    "carbon aware gpu": "GPU Conscient du Carbone",
    "carbon aware gpu cloud": "Cloud GPU Conscient du Carbone",
    "carbon aware scheduling": "Ordonnancement Conscient du Carbone",
    "carbon advantage": "Avantage Carbone",
    "carbon intensity": "Intensité Carbone",
    "carbon savings vs. grid average": "Économies carbone vs. moyenne du réseau",
    "careers": "Carrières",
    "categories": "Catégories",
    "cement": "Ciment",
    "certifications": "Certifications",
    "changelog": "Journal des modifications",
    "chapters": "Chapitres",
    "charts": "Graphiques",
    "circular economy": "Économie Circulaire",
    "climate": "Climat",
    "clients": "Clients",
    "close": "Fermer",
    "code examples": "Exemples de code",
    "co-creation": "Co-création",
    "collapse": "Réduire",
    "color palette": "Palette de couleurs",
    "coming soon": "Bientôt disponible",
    "commercial": "Commercial",
    "commitment": "Engagement",
    "community": "Communauté",
    "company": "Entreprise",
    "compliance": "Conformité",
    "compute": "Calcul",
    "conditions": "Conditions",
    "confidentiality": "Confidentialité",
    "confirmation": "Confirmation",
    "connect": "Connecter",
    "contact": "Contact",
    "contact us": "Contactez-nous",
    "content": "Contenu",
    "continuous monitoring": "Surveillance continue",
    "contracts": "Contrats",
    "control": "Contrôle",
    "cookies": "Cookies",
    "cooling": "Refroidissement",
    "copied!": "Copié !",
    "copy": "Copier",
    "copy feed url": "Copier l'URL du flux",
    "corporate": "Entreprise",
    "correction": "Correction",
    "cost optimization": "Optimisation des coûts",
    "create a ticket": "Créer un ticket",
    "current": "Actuel",
    "custom": "Personnalisé",
    "customer support": "Support client",
    "dashboard": "Tableau de bord",
    "data": "Données",
    "data collection": "Collecte de données",
    "data residency": "Résidence des données",
    "data security": "Sécurité des données",
    "data sharing": "Partage de données",
    "data sovereignty": "Souveraineté des données",
    "data use": "Utilisation des données",
    "date": "Date",
    "defense": "Défense",
    "demo": "Démo",
    "description": "Description",
    "design": "Conception",
    "details": "Détails",
    "developer": "Développeur",
    "developers": "Développeurs",
    "disclaimer": "Avertissement",
    "dispatch not found": "Répartition non trouvée",
    "distribution": "Distribution",
    "documentation": "Documentation",
    "documents": "Documents",
    "download": "Télécharger",
    "download all": "Tout télécharger",
    "download summary": "Télécharger le résumé",
    "duration": "Durée",
    "early access": "Accès anticipé",
    "economy": "Économie",
    "edge computing": "Informatique en Bord de Réseau",
    "edge inference": "Inférence en bord de réseau",
    "email": "E-mail",
    "encryption": "Chiffrement",
    "endpoints": "Points d'accès",
    "energy": "Énergie",
    "engineering": "Ingénierie",
    "engineering archive": "Archive technique",
    "engineering rss feed": "Flux RSS technique",
    "enterprise": "Entreprise",
    "environmental": "Environnemental",
    "equipment": "Équipement",
    "error handling": "Gestion des erreurs",
    "errors": "Erreurs",
    "esg": "ESG",
    "evaluate": "Évaluer",
    "events": "Événements",
    "executive bios": "Biographies des dirigeants",
    "expand": "Développer",
    "explore": "Explorer",
    "facilities": "Installations",
    "fact sheet": "Fiche d'information",
    "fairness": "Équité",
    "fairness commitment": "Engagement d'équité",
    "faq": "FAQ",
    "features": "Fonctionnalités",
    "feedback": "Commentaires",
    "finance": "Finance",
    "financial": "Financier",
    "flagship": "Navire amiral",
    "footer": "Pied de page",
    "format": "Format",
    "founder": "Fondateur",
    "frequency": "Fréquence",
    "funding": "Financement",
    "governance": "Gouvernance",
    "governing law": "Droit applicable",
    "governing law text": "Le présent accord est régi par les lois du Royaume du Maroc. Tout litige sera soumis à la compétence exclusive des tribunaux de Casablanca.",
    "government": "Gouvernement",
    "government & defense": "Gouvernement & Défense",
    "government partners": "Partenaires gouvernementaux",
    "grants": "Subventions",
    "guides": "Guides",
    "harch corp": "HARCH CORP",
    "harch help center": "Centre d'aide Harch",
    "health": "Santé",
    "hiring process": "Processus de recrutement",
    "hiring process accommodations": "Aménagements du processus de recrutement",
    "history": "Historique",
    "home": "Accueil",
    "hubs": "Hubs",
    "human oversight": "Supervision humaine",
    "human oversight commitment": "Engagement de supervision humaine",
    "image library": "Bibliothèque d'images",
    "impact": "Impact",
    "implementation": "Mise en œuvre",
    "incidents": "Incidents",
    "incidents (24h)": "Incidents (24h)",
    "index": "Index",
    "indicators": "Indicateurs",
    "industrial": "Industriel",
    "industrial partners": "Partenaires industriels",
    "infrastructure": "Infrastructure",
    "innovation": "Innovation",
    "integration": "Intégration",
    "intelligence": "Intelligence",
    "international transfers": "Transferts internationaux",
    "internet": "Internet",
    "investment": "Investissement",
    "investor relations": "Relations investisseurs",
    "investors": "Investisseurs",
    "irrigation": "Irrigation",
    "journal": "Journal",
    "key features": "Caractéristiques Clés",
    "knowledge base": "Base de connaissances",
    "knowledge base articles": "Articles de la base de connaissances",
    "label": "Étiquette",
    "landscape": "Paysage",
    "last updated: january 2026": "Dernière mise à jour : Janvier 2026",
    "latency": "Latence",
    "launch": "Lancement",
    "law": "Loi",
    "lead": "Responsable",
    "legal": "Juridique",
    "level": "Niveau",
    "liability": "Responsabilité",
    "limitations": "Limitations",
    "logo kit": "Kit logo",
    "loss": "P",
    "maintenance": "Maintenance",
    "manufacturing": "Fabrication",
    "marketing": "Marketing",
    "market": "Marché",
    "media contact": "Contact média",
    "methodology": "Méthodologie",
    "metrics": "Métriques",
    "millet": "Millet",
    "mineral reserves": "Réserves minérales",
    "minimum": "Minimum",
    "mining": "Mines",
    "mission": "Mission",
    "modifications": "Modifications",
    "monitoring": "Surveillance",
    "months": "Mois",
    "name": "Nom",
    "navigation": "Navigation",
    "network": "Réseau",
    "newsletter": "Newsletter",
    "next": "Suivant",
    "notifications": "Notifications",
    "oil & gas": "Pétrole & Gaz",
    "on-demand": "À la Demande",
    "ongoing": "En cours",
    "open source": "Open Source",
    "open source back to developers": "Open Source - Retour aux développeurs",
    "operations": "Opérations",
    "optimization": "Optimisation",
    "optional": "Facultatif",
    "orchestration": "Orchestration",
    "organization": "Organisation",
    "our commitment to accessibility": "Notre engagement envers l'accessibilité",
    "overview": "Aperçu",
    "partners": "Partenaires",
    "partner benefits": "Avantages partenaires",
    "partner ecosystem": "Écosystème de partenaires",
    "partnerships": "Partenariats",
    "password": "Mot de passe",
    "perception": "Perception",
    "performance": "Performance",
    "permissions": "Permissions",
    "phase": "Phase",
    "pipeline": "Pipeline",
    "pipeline builder": "Constructeur de Pipeline",
    "platform": "Plateforme",
    "policies": "Politiques",
    "population": "Population",
    "position": "Poste",
    "positions": "Postes",
    "poverty": "Pauvreté",
    "power": "Énergie",
    "pre deployment": "Pré-déploiement",
    "press": "Presse",
    "pricing": "Tarification",
    "primary navigation": "Navigation principale",
    "privacy": "Confidentialité",
    "privacy commitment": "Engagement de confidentialité",
    "problems": "Problèmes",
    "process": "Processus",
    "production": "Production",
    "products": "Produits",
    "profile": "Profil",
    "project": "Projet",
    "projects": "Projets",
    "proposal": "Proposition",
    "protection": "Protection",
    "provider": "Fournisseur",
    "public": "Public",
    "quality": "Qualité",
    "question": "Question",
    "questions": "Questions",
    "rate limits": "Limites de débit",
    "read case study": "Lire l'étude de cas",
    "real-time": "Temps réel",
    "references": "Références",
    "ref. api": "Réf. API",
    "register": "S'inscrire",
    "register now": "S'inscrire maintenant",
    "regulations": "Réglementations",
    "reliability": "Fiabilité",
    "renewable": "Renouvelable",
    "renewable share": "Part Renouvelable",
    "report": "Rapport",
    "request a demo": "Demander une démo",
    "request access": "Demander l'accès",
    "reserved": "Réservé",
    "residential": "Résidentiel",
    "resources": "Ressources",
    "response": "Réponse",
    "results": "Résultats",
    "revenue": "Revenus",
    "risk": "Risque",
    "roadmap": "Feuille de route",
    "roi": "ROI",
    "safety": "Sécurité",
    "sandbox": "Bac à sable",
    "schedule a briefing": "Planifier un briefing",
    "scope": "Périmètre",
    "scroll to explore": "DÉFILEZ POUR EXPLORER",
    "search": "Recherche",
    "security": "Sécurité",
    "security & privacy": "Sécurité & Confidentialité",
    "select": "Sélectionner",
    "senior": "Senior",
    "sensors": "Capteurs",
    "services": "Services",
    "solution": "Solution",
    "sovereign": "Souverain",
    "sovereign ai": "IA Souveraine",
    "sovereign data": "Données Souveraines",
    "sovereign hosting": "Hébergement Souverain",
    "specifications": "Spécifications",
    "sponsor": "Sponsor",
    "become a sponsor": "Devenir sponsor",
    "spot": "Spot",
    "staging": "Mise en service",
    "standards": "Normes",
    "standards we follow": "Normes que nous suivons",
    "startup program": "Programme Startup",
    "startups": "Startups",
    "ai startups": "Startups IA",
    "status": "Statut",
    "step": "Étape",
    "steps": "Étapes",
    "streaming": "Streaming",
    "structure": "Structure",
    "submit": "Soumettre",
    "subscription": "Abonnement",
    "subsidies": "Subventions",
    "subsidiaries": "Filiales",
    "success": "Succès",
    "summary": "Résumé",
    "suppliers": "Fournisseurs",
    "supply chain": "Chaîne d'approvisionnement",
    "supply chain ai": "IA Chaîne d'Approvisionnement",
    "support": "Support",
    "sustainability": "Durabilité",
    "switch": "Basculer",
    "switch language": "Changer de langue",
    "toggle navigation menu": "Ouvrir/fermer le menu de navigation",
    "team": "Équipe",
    "technical": "Technique",
    "technology": "Technologie",
    "technology partners": "Partenaires technologiques",
    "template": "Modèle",
    "terms": "Conditions",
    "terminal": "Terminal",
    "territory": "Territoire",
    "thesis": "Thèse",
    "third party": "Tiers",
    "ticket system": "Système de tickets",
    "time": "Temps",
    "time: 3 mins": "TEMPS : 3 MIN",
    "title": "Titre",
    "total": "Total",
    "total gpus": "Total GPU",
    "total renewable energy": "Énergie renouvelable totale",
    "tour": "Visite",
    "tracking": "Suivi",
    "training": "Formation",
    "transparency": "Transparence",
    "transparency commitment": "Engagement de transparence",
    "treaties": "Traités",
    "type": "Type",
    "upcoming": "À venir",
    "update": "Mise à jour",
    "updates": "Mises à jour",
    "uptime": "Disponibilité",
    "url": "URL",
    "usage": "Utilisation",
    "use cases": "Cas d'Usage",
    "user": "Utilisateur",
    "users": "Utilisateurs",
    "valid": "Valide",
    "value": "Valeur",
    "verified": "Vérifié",
    "verdict": "Verdict",
    "version": "Version",
    "vertical": "Vertical",
    "verticals": "Filiales",
    "video": "Vidéo",
    "view": "Voir",
    "view api documentation": "Voir la documentation API",
    "view in": "Voir en",
    "visits": "Visites",
    "warranty": "Garantie",
    "water": "Eau",
    "weather": "Météo",
    "webhooks": "Webhooks",
    "website": "Site web",
    "win": "V",
    "workflows": "Flux de travail",
    "workshops": "Ateliers",
    "your rights": "Vos droits",
    "you are now entering": "VOUS ENTREZ MAINTENANT DANS",
    "zero waste": "Zéro Déchet",
    "academic research": "Recherche Académique",
    "arable land": "Terres arables",
    "financial partners": "Partenaires financiers",
    "this site is also available in": "Ce site est également disponible en",
    "complete native translation": "Traduction native complète",
    "automatic translation via google": "Traduction automatique via Google",
    "english": "Anglais",
    "french": "Français",
    "completed": "Terminé",
    "of": "de",
    "all technical posts": "Tous les articles techniques",
    "more technical posts": "Plus d'articles techniques",
    "featured technical deep dive": "Analyse technique approfondie",
    "last updated date": "Dernière date de mise à jour",
    "services label": "Services",
    "incidents label": "Incidents",
    "maintenance label": "Maintenance",
    "notifications label": "Notifications",
    "harch corp blog rss feed": "Flux RSS du blog Harch Corp",
    "harch corp newsroom feed": "Flux RSS de la rédaction Harch Corp",
    "champions label": "Champions",
    "built to last": "Conçu pour Durer",
    "recently updated": "Récemment mis à jour",
    "popular articles": "Articles populaires",
    "browse articles": "Parcourir les articles",
    "pipeline": "Pipeline",
    "investment pipeline": "Pipeline d'investissement",
    "jobs by 2028": "Emplois d'ici 2028",
    "countries": "Pays",
    "harch os": "HarchOS",
    "operator": "OPÉRATEUR",
    "strategy": "STRATÉGIE",
    "impact": "Impact",
    "optimal": "Optimal",
    "hydro": "Hydro",
    "medium": "Moyen",
    "high": "Élevé",
    "low": "Faible",
    "status active": "Statut Actif",
    "level1 examples": "Exemples Niveau 1",
    "level2 examples": "Exemples Niveau 2",
    "level3 examples": "Exemples Niveau 3",
    "social benefit": "Bénéfice social",
    "social benefit commitment": "Engagement de bénéfice social",
    "example applications": "Exemples d'applications",
    "competitive advantage": "Avantage concurrentiel",
    "geographic position": "Position géographique",
    "carbon advantage": "Avantage carbone",
    "sovereign data": "Données souveraines",
    "serviceable addressable market": "Marché adressable service",
    "serviceable obtainable market": "Marché obtenable service",
    "total addressable market": "Marché total adressable",
    "our initial investment pipeline across 8 subsidiaries": "Notre pipeline d'investissement initial à travers 8 filiales",
    "adversarial": "Adversaire",
    "community feedback": "Retour de la communauté",
    "pre deployment": "Pré-déploiement",
    "third party": "Tiers",
    "perception": "Perception",
    "copyright": "Copyright",
    "dimension": "Dimension",
    "maximum": "Maximum",
    "minimum": "Minimum",
    "menu": "Menu",
    "discrimination": "Discrimination",
    "hate speech": "Discours de haine",
    "harassment": "Harcèlement",
    "self-harm": "Auto-agression",
    "sexual content": "Contenu sexuel",
    "violence": "Violence",
    "substances": "Substances",
    "firearms": "Armes à feu",
    "misinformation": "Désinformation",
    "disruption": "Perturbation",
    "confidential info": "Informations confidentielles",
    "government pressure": "Pression gouvernementale",
    "data theft": "Vol de données",
    "surveillance": "Surveillance",
    "minor": "Mineur",
    "moderate": "Modéré",
    "critical": "Critique",
    "severe": "Grave",
    "catastrophic": "Catastrophique",
    "very likely": "Très probable",
    "likely": "Probable",
    "possible": "Possible",
    "unlikely": "Peu probable",
    "very unlikely": "Très improbable",
    "technical post": "Article technique",
    "engineering post": "Article d'ingénierie",
    "security post": "Article de sécurité",
    "infrastructure post": "Article d'infrastructure",
    "ai/ml post": "Article IA/ML",
    "platform post": "Article plateforme",
    "deep dive": "Analyse approfondie",
    "tutorial": "Tutoriel",
    "case study": "Étude de cas",
    "announcement": "Annonce",
    "beginner": "Débutant",
    "intermediate": "Intermédiaire",
    "advanced": "Avancé",
    "expert": "Expert",
    "all dispatches": "Toutes les dépêches",
    "all categories": "Toutes les catégories",
    "all departments": "Tous les départements",
    "all levels": "Tous les niveaux",
    "all locations": "Tous les lieux",
    "all types": "Tous les types",
    "all statuses": "Tous les statuts",
    "apply now": "Postuler",
    "download app": "Télécharger l'application",
    "privacy policy": "Politique de confidentialité",
    "terms of service": "Conditions d'utilisation",
    "cookie policy": "Politique de cookies",
    "investor relations": "Relations investisseurs",
    "press kit": "Kit de presse",
    "media kit": "Kit média",
    "annual report": "Rapport annuel",
    "quarterly report": "Rapport trimestriel",
    "financial report": "Rapport financier",
    "sustainability report": "Rapport de durabilité",
    "esg report": "Rapport ESG",
    "impact report": "Rapport d'impact",
    "technology partners": "Partenaires technologiques",
    "strategic partners": "Partenaires stratégiques",
    "research partners": "Partenaires de recherche",
    "academic partners": "Partenaires académiques",
    "government partners": "Partenaires gouvernementaux",
    "ngo partners": "Partenaires ONG",
    "discord server": "Serveur Discord",
    "github community": "Communauté GitHub",
    "linkedin group": "Groupe LinkedIn",
    "playground api": "Playground API",
    "api playground": "Playground API",
    "ref. api": "Réf. API",
    "casablanca": "Casablanca",
}

# Key-name patterns that should NOT be translated (kept as English)
KEEP_AS_IS = {
    # Brand names
    'harch', 'harchos', 'harchagri', 'harchcorp', 'coreweave', 'google cloud',
    'lambda labs', 'equinix', 'oracle cloud', 'nvidia', 'qscale', 'africa data centres',
    'cassava', 'twiga', 'apollo',
    # Technical acronyms/standards
    'gpu', 'gpus', 'api', 'iso', 'soc', 'pue', 'rgpd', 'gdpr', 'grpc', 'rest',
    'oauth', 'jwt', 'sso', 'saml', 'cors', 'ssl', 'tls', 'aes', 'sha',
    's3', 'rds', 'ec2', 'cdn', 'dns', 'ddos', 'waf',
    # Units/measures that stay as-is
    'gco2/kwh', 'mw', 'gw', 'kw', 'kwh', 'co2', 'pue',
    # Programming terms
    'docker', 'kubernetes', 'terraform', 'ansible', 'jenkins', 'github',
    'gitlab', 'bitbucket', 'jira', 'confluence', 'slack', 'teams',
    # Formats
    'json', 'xml', 'yaml', 'csv', 'html', 'css', 'sql', 'nosql',
}

def should_keep_as_is(text):
    """Check if text should be kept in English (brand names, tech terms, etc.)"""
    lower = text.lower().strip()
    # Single words that are brand/tech terms
    if lower in KEEP_AS_IS:
        return True
    # Pure numbers or very short
    if len(lower) <= 2:
        return True
    # URLs, paths, emails
    if '/' in lower or '@' in lower or 'http' in lower:
        return True
    # Pure technical specifications
    if re.match(r'^[\d.,\-/]+$', lower):
        return True
    return False

def translate_value(key_path, en_value):
    """Translate an English value to French using dictionary + patterns"""
    if not en_value or not isinstance(en_value, str):
        return en_value
    
    # Skip if should keep as-is
    if should_keep_as_is(en_value):
        return en_value
    
    # Try exact phrase match (case-insensitive)
    lower = en_value.lower().strip()
    if lower in PHRASE_DICT:
        # Preserve original casing style
        result = PHRASE_DICT[lower]
        if en_value.isupper():
            return result.upper()
        elif en_value[0].isupper() and not en_value.isupper():
            # Title case - capitalize first letter of result
            return result[0].upper() + result[1:]
        return result
    
    # Try the full value as-is in dictionary
    if en_value in PHRASE_DICT:
        return PHRASE_DICT[en_value]
    
    # Pattern: Key-as-value like "Ghana Mofa Country" -> extract meaningful part
    # These are auto-generated labels from V5
    key_parts = key_path.split('.')
    last_part = key_parts[-1] if key_parts else ''
    
    # Check if the value is essentially a camelCase/PascalCase version of the key
    # e.g., key="country" value="Country" -> translate the key part
    if en_value.lower().replace(' ', '') == last_part.lower().replace(' ', ''):
        # It's a key-as-value, translate the concept
        concept = last_part
        concept_lower = concept.lower()
        if concept_lower in PHRASE_DICT:
            result = PHRASE_DICT[concept_lower]
            if en_value.isupper():
                return result.upper()
            elif en_value[0].isupper():
                return result[0].upper() + result[1:]
            return result
    
    # Compound key-as-value patterns: "Ghana Mofa Country" -> extract "Country"
    # The prefix (Ghana Mofa) is a context identifier, suffix is the translatable part
    words = en_value.split()
    if len(words) >= 2:
        # Try matching the last word(s) which is usually the translatable concept
        for n in range(1, min(len(words), 4)):
            tail = ' '.join(words[n:]).lower()
            if tail in PHRASE_DICT:
                prefix = ' '.join(words[:n])
                translated_tail = PHRASE_DICT[tail]
                if translated_tail[0].isupper():
                    return f"{prefix} {translated_tail}"
                else:
                    return f"{prefix} {translated_tail[0].upper()}{translated_tail[1:]}"
    
    # Try word-by-word translation for multi-word values
    if len(words) > 1:
        translated_words = []
        all_translated = True
        for w in words:
            w_lower = w.lower().strip('.,;:')
            if w_lower in PHRASE_DICT:
                translated_words.append(PHRASE_DICT[w_lower])
            elif should_keep_as_is(w):
                translated_words.append(w)
            else:
                all_translated = False
                translated_words.append(w)
        if all_translated:
            result = ' '.join(translated_words)
            if en_value.isupper():
                return result.upper()
            return result
    
    return None  # Could not translate automatically


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
    # Load files
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
    
    # Find all untranslated keys
    total_fixed = 0
    total_untranslated = 0
    total_skipped = 0
    sections_processed = {}
    still_untranslated = {}
    
    for section in en:
        if not isinstance(en[section], dict):
            continue
        en_leaves = get_all_leaf_keys(en[section])
        fr_section = fr.get(section)
        if not isinstance(fr_section, dict):
            continue
        fr_leaves = get_all_leaf_keys(fr_section)
        
        section_fixed = 0
        section_untranslated = 0
        section_remaining = []
        
        for k, en_val in en_leaves.items():
            if not isinstance(en_val, str):
                continue
            if k not in fr_leaves:
                continue
            if fr_leaves[k] != en_val:
                continue  # Already translated
            if not en_val or not any(c.isalpha() for c in en_val):
                continue  # No text to translate
            
            total_untranslated += 1
            section_untranslated += 1
            
            # Try to translate
            translated = translate_value(k, en_val)
            
            if translated is not None and translated != en_val:
                set_nested_value(fr[section], k, translated)
                section_fixed += 1
                total_fixed += 1
            else:
                section_remaining.append((k, en_val))
                total_skipped += 1
        
        if section_fixed > 0 or section_remaining:
            sections_processed[section] = {
                'fixed': section_fixed,
                'untranslated': section_untranslated,
                'remaining': len(section_remaining)
            }
            if section_remaining:
                still_untranslated[section] = section_remaining
    
    # Save updated fr.json
    with open('messages/fr.json', 'w', encoding='utf-8') as f:
        json.dump(fr, f, ensure_ascii=False, indent=2)
    
    print(f"Total untranslated keys found: {total_untranslated}")
    print(f"Keys fixed: {total_fixed}")
    print(f"Keys remaining (need manual/LLM translation): {total_skipped}")
    print()
    
    for section, info in sorted(sections_processed.items(), key=lambda x: -x[1]['remaining']):
        if info['remaining'] > 0:
            print(f"  {section}: {info['fixed']} fixed, {info['remaining']} remaining")
    
    # Save remaining untranslated for LLM pass
    with open('/tmp/still_untranslated.json', 'w', encoding='utf-8') as f:
        json.dump({s: items for s, items in still_untranslated.items()}, f, ensure_ascii=False, indent=2)
    
    print(f"\nRemaining keys saved to /tmp/still_untranslated.json")

if __name__ == '__main__':
    main()
