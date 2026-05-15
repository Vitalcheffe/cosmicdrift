#!/usr/bin/env python3
"""
fix-missing-keys.py
Scans .tsx files for useTranslations() + t() calls, finds missing translation
keys in en.json and fr.json, and adds them with auto-generated placeholder
values (English Title Case for en, French translations for fr).

Strategy:
  1. Read both en.json and fr.json
  2. Scan all .tsx files under src/app/[locale]/ and src/components/ for
     useTranslations('namespace') declarations and t('...') / t("...") calls
  3. Map each t() call to its namespace based on the variable name
  4. For each namespace.key combination, check if the key path exists in the JSON
  5. Add missing keys with appropriate placeholder text
  6. Write both JSON files with proper formatting
"""

import json
import os
import re
import sys
from collections import defaultdict
from pathlib import Path

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

PROJECT_ROOT = Path(__file__).resolve().parent.parent
MESSAGES_DIR = PROJECT_ROOT / "messages"
EN_PATH = MESSAGES_DIR / "en.json"
FR_PATH = MESSAGES_DIR / "fr.json"

SCAN_DIRS = [
    PROJECT_ROOT / "src" / "app" / "[locale]",
    PROJECT_ROOT / "src" / "components",
]

# ---------------------------------------------------------------------------
# French translation helpers
# ---------------------------------------------------------------------------

# Common English → French word mappings for generating reasonable French text
FR_WORD_MAP = {
    # Common labels
    "title": "Titre",
    "subtitle": "Sous-titre",
    "description": "Description",
    "label": "Libellé",
    "name": "Nom",
    "value": "Valeur",
    "type": "Type",
    "status": "Statut",
    "location": "Emplacement",
    "department": "Département",
    "level": "Niveau",
    "date": "Date",
    "category": "Catégorie",
    "author": "Auteur",
    "quote": "Citation",
    "organization": "Organisation",
    "step": "Étape",
    "phase": "Phase",
    "icon": "Icône",
    "badge": "Badge",
    "banner": "Bannière",
    "text": "Texte",
    "placeholder": "Espace réservé",
    "heading": "En-tête",
    "content": "Contenu",
    "summary": "Résumé",
    "overview": "Aperçu",
    "detail": "Détail",
    "details": "Détails",
    "excerpt": "Extrait",
    "intro": "Introduction",
    "introduction": "Introduction",
    "conclusion": "Conclusion",
    "note": "Note",
    "tip": "Conseil",
    "warning": "Avertissement",
    "error": "Erreur",
    "success": "Succès",
    "info": "Information",
    "message": "Message",
    "action": "Action",
    "link": "Lien",
    "button": "Bouton",
    "cta": "Appel à l'action",
    "tag": "Étiquette",
    "tags": "Étiquettes",
    "item": "Élément",
    "items": "Éléments",
    "list": "Liste",
    "count": "Nombre",
    "number": "Numéro",
    "order": "Ordre",
    "sort": "Tri",
    "filter": "Filtre",
    "search": "Recherche",
    "key": "Clé",
    "code": "Code",
    "version": "Version",
    "edition": "Édition",
    "tier": "Niveau",
    "plan": "Plan",
    "package": "Forfait",
    "feature": "Fonctionnalité",
    "features": "Fonctionnalités",
    "benefit": "Avantage",
    "benefits": "Avantages",
    "advantage": "Avantage",
    "moat": "Fossé",
    "pillar": "Pilier",
    "principle": "Principe",
    "metric": "Métrique",
    "stat": "Statistique",
    "stats": "Statistiques",
    "data": "Données",
    "chart": "Graphique",
    "table": "Tableau",
    "card": "Carte",
    "section": "Section",
    "grid": "Grille",
    "row": "Ligne",
    "column": "Colonne",
    "cell": "Cellule",
    "header": "En-tête",
    "footer": "Pied de page",
    "nav": "Navigation",
    "sidebar": "Barre latérale",
    "menu": "Menu",
    "tab": "Onglet",
    "tabs": "Onglets",
    "page": "Page",
    "dialog": "Dialogue",
    "modal": "Modal",
    "panel": "Panneau",
    "tooltip": "Info-bulle",
    "popover": "Pop-over",
    "dropdown": "Menu déroulant",
    "select": "Sélection",
    "input": "Entrée",
    "field": "Champ",
    "form": "Formulaire",
    "question": "Question",
    "answer": "Réponse",
    "faq": "FAQ",
    # Action words
    "apply": "Postuler",
    "submit": "Soumettre",
    "save": "Enregistrer",
    "cancel": "Annuler",
    "close": "Fermer",
    "open": "Ouvrir",
    "edit": "Modifier",
    "delete": "Supprimer",
    "add": "Ajouter",
    "remove": "Retirer",
    "create": "Créer",
    "update": "Mettre à jour",
    "view": "Voir",
    "show": "Afficher",
    "hide": "Masquer",
    "expand": "Développer",
    "collapse": "Réduire",
    "toggle": "Basculer",
    "enable": "Activer",
    "disable": "Désactiver",
    "accept": "Accepter",
    "reject": "Refuser",
    "approve": "Approuver",
    "deny": "Refuser",
    "confirm": "Confirmer",
    "skip": "Passer",
    "next": "Suivant",
    "previous": "Précédent",
    "back": "Retour",
    "continue": "Continuer",
    "finish": "Terminer",
    "start": "Commencer",
    "stop": "Arrêter",
    "play": "Lire",
    "pause": "Pause",
    "reset": "Réinitialiser",
    "refresh": "Actualiser",
    "retry": "Réessayer",
    "download": "Télécharger",
    "upload": "Téléverser",
    "export": "Exporter",
    "import": "Importer",
    "share": "Partager",
    "copy": "Copier",
    "paste": "Coller",
    "print": "Imprimer",
    "search": "Rechercher",
    "filter": "Filtrer",
    "sort": "Trier",
    "subscribe": "S'abonner",
    "register": "S'inscrire",
    "login": "Connexion",
    "logout": "Déconnexion",
    "signup": "Inscription",
    # Industries / verticals
    "intelligence": "Intelligence",
    "cement": "Ciment",
    "energy": "Énergie",
    "technology": "Technologie",
    "mining": "Mines",
    "agriculture": "Agriculture",
    "agri": "Agri",
    "water": "Eau",
    "finance": "Finance",
    "corporate": "Entreprise",
    "construction": "Construction",
    "engineering": "Ingénierie",
    "operations": "Opérations",
    "cybersecurity": "Cybersécurité",
    "cybersec": "Cybersécurité",
    "renewable": "Renouvelable",
    "solar": "Solaire",
    "wind": "Éolien",
    "hydrogen": "Hydrogène",
    "desalination": "Dessalement",
    "desal": "Dessalement",
    "satellite": "Satellite",
    "satcom": "Satcom",
    "gpu": "GPU",
    "cloud": "Cloud",
    "ai": "IA",
    "ml": "ML",
    "iot": "IoT",
    "esg": "ESG",
    "gdpr": "RGPD",
    "ccpa": "CCPA",
    "sla": "SLA",
    "sdk": "SDK",
    "api": "API",
    # Adjectives / qualifiers
    "sovereign": "Souverain",
    "sovereignty": "Souveraineté",
    "carbon": "Carbone",
    "carbonAware": "Conscient du carbone",
    "green": "Vert",
    "renewable": "Renouvelable",
    "sustainable": "Durable",
    "sustainability": "Durabilité",
    "industrial": "Industriel",
    "industrialSovereignty": "Souveraineté industrielle",
    "strategic": "Stratégique",
    "operational": "Opérationnel",
    "active": "Actif",
    "planned": "Planifié",
    "engineering": "Ingénierie",
    "prospecting": "Prospection",
    "permitting": "Permis en cours",
    "inDevelopment": "En développement",
    "vertical": "Verticale",
    "integrated": "Intégré",
    "integration": "Intégration",
    "precision": "Précision",
    "smart": "Intelligent",
    "automated": "Automatisé",
    "automation": "Automatisation",
    "realTime": "Temps réel",
    "predictive": "Prédictif",
    "compliant": "Conforme",
    "compliance": "Conformité",
    "secure": "Sécurisé",
    "security": "Sécurité",
    "encrypted": "Chiffré",
    "open": "Ouvert",
    "closed": "Fermé",
    "required": "Requis",
    "optional": "Optionnel",
    "clearance": "Habilitation",
    "classified": "Classifié",
    "military": "Militaire",
    "defense": "Défense",
    "weapons": "Armes",
    "infrastructure": "Infrastructure",
    "platform": "Plateforme",
    "system": "Système",
    "network": "Réseau",
    "facility": "Installation",
    "dataCenter": "Centre de données",
    "pipeline": "Pipeline",
    "deployment": "Déploiement",
    "deployments": "Déploiements",
    "mission": "Mission",
    "vision": "Vision",
    "goal": "Objectif",
    "goals": "Objectifs",
    "objective": "Objectif",
    "objectives": "Objectifs",
    "target": "Cible",
    "targets": "Cibles",
    "roadmap": "Feuille de route",
    "timeline": "Chronologie",
    "milestone": "Jalon",
    "milestones": "Jalons",
    "capacity": "Capacité",
    "investment": "Investissement",
    "budget": "Budget",
    "revenue": "Revenu",
    "profit": "Profit",
    "cost": "Coût",
    "price": "Prix",
    "pricing": "Tarification",
    "rate": "Taux",
    "ratio": "Ratio",
    "percentage": "Pourcentage",
    "growth": "Croissance",
    "impact": "Impact",
    "outcome": "Résultat",
    "outcomes": "Résultats",
    "result": "Résultat",
    "results": "Résultats",
    "challenge": "Défi",
    "solution": "Solution",
    "approach": "Approche",
    "method": "Méthode",
    "process": "Processus",
    "workflow": "Flux de travail",
    "framework": "Cadre",
    "architecture": "Architecture",
    "design": "Conception",
    "structure": "Structure",
    "model": "Modèle",
    "pattern": "Motif",
    "strategy": "Stratégie",
    "program": "Programme",
    "project": "Projet",
    "product": "Produit",
    "service": "Service",
    "offering": "Offre",
    "portfolio": "Portefeuille",
    "market": "Marché",
    "industry": "Industrie",
    "sector": "Secteur",
    "vertical": "Verticale",
    "horizontal": "Horizontale",
    "regional": "Régional",
    "national": "National",
    "continental": "Continental",
    "global": "Mondial",
    "local": "Local",
    "company": "Entreprise",
    "team": "Équipe",
    "group": "Groupe",
    "division": "Division",
    "unit": "Unité",
    "subsidiary": "Filiale",
    "subsidiaries": "Filiales",
    "venture": "Entreprise",
    "ventures": "Entreprises",
    "partner": "Partenaire",
    "partners": "Partenaires",
    "partnership": "Partenariat",
    "collaboration": "Collaboration",
    "alliance": "Alliance",
    "coalition": "Coalition",
    "community": "Communauté",
    "ecosystem": "Écosystème",
    "stakeholder": "Partie prenante",
    "customer": "Client",
    "customers": "Clients",
    "client": "Client",
    "clients": "Clients",
    "user": "Utilisateur",
    "users": "Utilisateurs",
    "member": "Membre",
    "members": "Membres",
    "contributor": "Contributeur",
    "contributors": "Contributeurs",
    "leader": "Leader",
    "leadership": "Direction",
    "director": "Directeur",
    "manager": "Responsable",
    "officer": "Officier",
    "engineer": "Ingénieur",
    "architect": "Architecte",
    "analyst": "Analyste",
    "specialist": "Spécialiste",
    "scientist": "Scientifique",
    "researcher": "Chercheur",
    "advisor": "Conseiller",
    "consultant": "Consultant",
    "executive": "Cadre",
    "founder": "Fondateur",
    "ceo": "PDG",
    "cto": "Directeur technique",
    "cfo": "Directeur financier",
    "coo": "Directeur des opérations",
    "vp": "Vice-président",
    "position": "Poste",
    "positions": "Postes",
    "role": "Rôle",
    "roles": "Rôles",
    "job": "Emploi",
    "jobs": "Emplois",
    "career": "Carrière",
    "careers": "Carrières",
    "employment": "Emploi",
    "talent": "Talent",
    "recruitment": "Recrutement",
    "hiring": "Recrutement",
    "benefit": "Avantage",
    "benefits": "Avantages",
    "perk": "Avantage",
    "perks": "Avantages",
    "compensation": "Rémunération",
    "salary": "Salaire",
    "bonus": "Prime",
    "equity": "Actions",
    "stock": "Action",
    "health": "Santé",
    "medical": "Médical",
    "insurance": "Assurance",
    "retirement": "Retraite",
    "vacation": "Vacances",
    "leave": "Congé",
    "remote": "À distance",
    "onsite": "Sur site",
    "hybrid": "Hybride",
    "fullTime": "Temps plein",
    "partTime": "Temps partiel",
    "contract": "Contrat",
    "internship": "Stage",
    # Specific to this project
    "harchCorp": "Harch Corp",
    "harchIntelligence": "Harch Intelligence",
    "harchCement": "Harch Cement",
    "harchEnergy": "Harch Energy",
    "harchTechnology": "Harch Technology",
    "harchMining": "Harch Mining",
    "harchAgri": "Harch Agri",
    "harchWater": "Harch Water",
    "harchFinance": "Harch Finance",
    "harchVentures": "Harch Ventures",
    "harchos": "HarchOS",
    "morocco": "Maroc",
    "casablanca": "Casablanca",
    "dakhla": "Dakhla",
    "gambia": "Gambie",
    "senegal": "Sénégal",
    "mauritania": "Mauritanie",
    "africa": "Afrique",
    "african": "Africain",
    "sahara": "Sahara",
    "sahel": "Sahel",
    "westAfrica": "Afrique de l'Ouest",
    "northAfrica": "Afrique du Nord",
}

# Known context-specific translations (key pattern → French)
FR_CONTEXT_MAP = {
    # Careers
    "careers.heroLabel": "Carrières",
    "careers.heroTitleLine1": "Construisez l'Avenir de",
    "careers.heroTitleLine2": "l'Infrastructure Africaine",
    "careers.heroDescription": "Rejoignez l'équipe qui construit l'infrastructure souveraine de l'Afrique. Nous recrutons des opérateurs d'élite pour nos déploiements sur le continent.",
    "careers.clearanceBadge": "Habilitation Requise",
    "careers.clearanceRequired": "Habilitation requise",
    "careers.missionLabel": "La Mission",
    "careers.missionTitleLine1": "L'Échelle du",
    "careers.missionTitleLine2": "Continent",
    "careers.missionStats.positions.value": "12",
    "careers.missionStats.positions.label": "Postes Ouverts",
    "careers.missionStats.positions.desc": "Postes actifs dans 8 filiales",
    "careers.missionStats.verticals.value": "8",
    "careers.missionStats.verticals.label": "Filiales",
    "careers.missionStats.verticals.desc": "Intelligence, Énergie, Ciment, Mines, Agri, Eau, Finance, Technologie",
    "careers.missionStats.countries.value": "5+",
    "careers.missionStats.countries.label": "Pays",
    "careers.missionStats.countries.desc": "Maroc, Gambie, Sénégal, Mauritanie et au-delà",
    "careers.deploymentsLabel": "Déploiements Actifs",
    "careers.openPositions": "Postes Ouverts",
    "careers.openPositionsDescription": "Sélectionnez un département pour filtrer les postes disponibles.",
    "careers.departments.all": "Tous",
    "careers.departments.technology": "Technologie",
    "careers.departments.intelligence": "Intelligence",
    "careers.departments.energy": "Énergie",
    "careers.departments.cement": "Ciment",
    "careers.departments.mining": "Mines",
    "careers.departments.agri": "Agri",
    "careers.departments.water": "Eau",
    "careers.departments.corporate": "Entreprise",
    "careers.selectionLabel": "Processus de Sélection",
    "careers.selectionTitle": "Quatre Phases. Zéro Place pour le Hasard.",
    "careers.selectionDescription": "Notre processus de sélection est conçu pour identifier les opérateurs capables d'exécuter à l'échelle continentale.",
    "careers.selection.application.title": "Candidature",
    "careers.selection.application.desc": "Soumettez votre candidature avec vos habilitations et expérience opérationnelle.",
    "careers.selection.technical.title": "Évaluation Technique",
    "careers.selection.technical.desc": "Démontrez vos compétences techniques dans un scénario de terrain réaliste.",
    "careers.selection.alignment.title": "Alignement Stratégique",
    "careers.selection.alignment.desc": "Évaluez l'alignement avec notre mission de souveraineté industrielle africaine.",
    "careers.selection.interview.title": "Entretien Final",
    "careers.selection.interview.desc": "Entretien avec la direction pour évaluer l'adéquation culturelle et l'engagement.",
    "careers.phase": "Phase",
    "careers.standardLabel": "La Norme",
    "careers.standardTitle": "La Culture de l'Opérateur",
    "careers.culture.missionOverComfort.title": "Mission Avant le Confort",
    "careers.culture.missionOverComfort.desc": "La mission passe avant le confort personnel. Nous opérons là où l'infrastructure est le plus nécessaire.",
    "careers.culture.sovereignMindset.title": "État d'Esprit Souverain",
    "careers.culture.sovereignMindset.desc": "Chaque décision est prise avec la souveraineté africaine comme principe directeur.",
    "careers.culture.crossDomain.title": "Expertise Transversale",
    "careers.culture.crossDomain.desc": "Nos opérateurs traversent les frontières disciplinaires — de l'IA aux mines en passant par l'énergie.",
    "careers.culture.meritNoCompromise.title": "Mérite Sans Compromis",
    "careers.culture.meritNoCompromise.desc": "L'excellence est la seule norme. Pas de favoritisme, pas de raccourcis.",
    "careers.benefitsLabel": "Ce Que Vous Obtenez",
    "careers.benefitsTitle": "Avantages Opérationnels",
    "careers.benefits.compensation.title": "Rémunération",
    "careers.benefits.compensation.desc": "Salaire compétitif indexé sur les standards internationaux, avec primes de déploiement.",
    "careers.benefits.health.title": "Santé",
    "careers.benefits.health.desc": "Couverture médicale complète incluant les soins sur le terrain et l'évacuation d'urgence.",
    "careers.benefits.development.title": "Développement",
    "careers.benefits.development.desc": "Formation continue et certifications professionnelles financées à 100%.",
    "careers.benefits.deployment.title": "Déploiement",
    "careers.benefits.deployment.desc": "Expérience de déploiement sur le terrain à travers l'Afrique et au-delà.",
    "careers.benefits.impact.title": "Impact",
    "careers.benefits.impact.desc": "Travaillez sur des projets qui transforment les infrastructures du continent.",
    "careers.benefits.bureaucracy.title": "Zéro Bureaucratie",
    "careers.benefits.bureaucracy.desc": "Des processus agiles, pas de lenteur administrative. Exécution rapide.",
    "careers.ctaTitle": "Prêt à Déployer ?",
    "careers.ctaDescription": "Rejoignez l'opération et construisez l'avenir de l'infrastructure africaine.",
    "careers.generalApplications": "Candidatures générales :",
    "careers.applyForDeployment": "Postuler pour un Déploiement",
    "careers.aboutHarchCorp": "À Propos de Harch Corp",
    # Positions
    "careers.positions.sovereignInfraEngineer.title": "Ingénieur Infrastructure Souveraine",
    "careers.positions.sovereignInfraEngineer.department": "Technologie",
    "careers.positions.sovereignInfraEngineer.location": "Casablanca, Maroc",
    "careers.positions.sovereignInfraEngineer.type": "Temps plein",
    "careers.positions.sovereignInfraEngineer.level": "Sénior",
    "careers.positions.aiMlWeaponsLead.title": "Responsable IA/ML Armement",
    "careers.positions.aiMlWeaponsLead.department": "Intelligence",
    "careers.positions.aiMlWeaponsLead.location": "Dakhla, Maroc",
    "careers.positions.aiMlWeaponsLead.type": "Temps plein",
    "careers.positions.aiMlWeaponsLead.level": "Lead",
    "careers.positions.renewableEnergyOps.title": "Opérations Énergie Renouvelable",
    "careers.positions.renewableEnergyOps.department": "Énergie",
    "careers.positions.renewableEnergyOps.location": "Casablanca, Maroc",
    "careers.positions.renewableEnergyOps.type": "Temps plein",
    "careers.positions.renewableEnergyOps.level": "Sénior",
    "careers.positions.cementPlantDir.title": "Directeur Cimenterie",
    "careers.positions.cementPlantDir.department": "Ciment",
    "careers.positions.cementPlantDir.location": "Banjul, Gambie",
    "careers.positions.cementPlantDir.type": "Temps plein",
    "careers.positions.cementPlantDir.level": "Directeur",
    "careers.positions.miningGeologist.title": "Géologue Minier",
    "careers.positions.miningGeologist.department": "Mines",
    "careers.positions.miningGeologist.location": "Nouakchott, Mauritanie",
    "careers.positions.miningGeologist.type": "Temps plein",
    "careers.positions.miningGeologist.level": "Sénior",
    "careers.positions.precisionAgriSpec.title": "Spécialiste Agriculture de Précision",
    "careers.positions.precisionAgriSpec.department": "Agri",
    "careers.positions.precisionAgriSpec.location": "Dakar, Sénégal",
    "careers.positions.precisionAgriSpec.type": "Temps plein",
    "careers.positions.precisionAgriSpec.level": "Intermédiaire",
    "careers.positions.waterDesalEngineer.title": "Ingénieur Dessalement",
    "careers.positions.waterDesalEngineer.department": "Eau",
    "careers.positions.waterDesalEngineer.location": "Casablanca, Maroc",
    "careers.positions.waterDesalEngineer.type": "Temps plein",
    "careers.positions.waterDesalEngineer.level": "Sénior",
    "careers.positions.cybersecArchitect.title": "Architecte Cybersécurité",
    "careers.positions.cybersecArchitect.department": "Technologie",
    "careers.positions.cybersecArchitect.location": "Casablanca, Maroc",
    "careers.positions.cybersecArchitect.type": "Temps plein",
    "careers.positions.cybersecArchitect.level": "Lead",
    "careers.positions.corpFinanceAnalyst.title": "Analyste Finance Corporate",
    "careers.positions.corpFinanceAnalyst.department": "Corporate",
    "careers.positions.corpFinanceAnalyst.location": "Casablanca, Maroc",
    "careers.positions.corpFinanceAnalyst.type": "Temps plein",
    "careers.positions.corpFinanceAnalyst.level": "Intermédiaire",
    "careers.positions.esgComplianceMgr.title": "Responsable Conformité ESG",
    "careers.positions.esgComplianceMgr.department": "Corporate",
    "careers.positions.esgComplianceMgr.location": "Casablanca, Maroc",
    "careers.positions.esgComplianceMgr.type": "Temps plein",
    "careers.positions.esgComplianceMgr.level": "Sénior",
    "careers.positions.constructionCmdr.title": "Commandant Construction",
    "careers.positions.constructionCmdr.department": "Ciment",
    "careers.positions.constructionCmdr.location": "Banjul, Gambie",
    "careers.positions.constructionCmdr.type": "Temps plein",
    "careers.positions.constructionCmdr.level": "Directeur",
    "careers.positions.satcomEngineer.title": "Ingénieur Satcom",
    "careers.positions.satcomEngineer.department": "Technologie",
    "careers.positions.satcomEngineer.location": "Casablanca, Maroc",
    "careers.positions.satcomEngineer.type": "Temps plein",
    "careers.positions.satcomEngineer.level": "Sénior",
}


# ---------------------------------------------------------------------------
# camelCase / PascalCase → Title Case
# ---------------------------------------------------------------------------

def camel_to_title(s: str) -> str:
    """Convert camelCase or PascalCase string to Title Case with spaces."""
    if not s:
        return s
    # Insert space before uppercase letters that follow lowercase
    result = re.sub(r'([a-z0-9])([A-Z])', r'\1 \2', s)
    # Insert space between consecutive uppercase followed by lowercase (e.g., XMLParser -> XML Parser)
    result = re.sub(r'([A-Z]+)([A-Z][a-z])', r'\1 \2', result)
    # Title-case each word
    return result.strip().title()


# ---------------------------------------------------------------------------
# Generate placeholder text for en.json
# ---------------------------------------------------------------------------

def generate_en_placeholder(full_key: str, namespace: str) -> str:
    """Generate a reasonable English placeholder for a missing key.
    
    full_key is the dot-notation key path within the namespace (e.g., "benefits.compensation.title")
    namespace is the top-level namespace (e.g., "careers")
    """
    # Check context map first
    context_key = f"{namespace}.{full_key}"
    if context_key in FR_CONTEXT_MAP:
        # We have a known French translation; derive English from it
        # Just use the camelCase → Title Case conversion
        pass

    parts = full_key.split(".")
    last_part = parts[-1]
    
    # Common label mappings for last part of key
    label_map = {
        "title": "Title",
        "subtitle": "Subtitle",
        "description": "Description",
        "label": "Label",
        "name": "Name",
        "value": "Value",
        "desc": "Description",
        "text": "Text",
        "placeholder": "Placeholder",
        "heading": "Heading",
        "badge": "Badge",
        "banner": "Banner",
        "tagline": "Tagline",
        "stat": "Stat",
        "excerpt": "Excerpt",
        "quote": "Quote",
        "author": "Author",
        "organization": "Organization",
        "date": "Date",
        "category": "Category",
        "step": "Step",
        "icon": "Icon",
    }
    
    if last_part in label_map and len(parts) > 1:
        # Use parent context + label type
        parent = parts[-2]
        parent_title = camel_to_title(parent)
        return f"{parent_title} {label_map[last_part]}"
    
    # For short simple keys (single part), just convert to title case
    if len(parts) == 1:
        return camel_to_title(last_part)
    
    # For multi-part keys, convert the last part to title case
    # But try to include some context from the parent parts
    if len(parts) >= 2:
        parent = parts[-2]
        parent_title = camel_to_title(parent)
        last_title = camel_to_title(last_part)
        
        # Avoid redundancy
        if last_title.lower() in parent_title.lower():
            return parent_title
        return f"{parent_title} {last_title}"
    
    return camel_to_title(last_part)


# ---------------------------------------------------------------------------
# Generate placeholder text for fr.json
# ---------------------------------------------------------------------------

def generate_fr_placeholder(full_key: str, namespace: str) -> str:
    """Generate a reasonable French placeholder for a missing key."""
    context_key = f"{namespace}.{full_key}"
    
    # Check explicit context map first
    if context_key in FR_CONTEXT_MAP:
        return FR_CONTEXT_MAP[context_key]
    
    parts = full_key.split(".")
    last_part = parts[-1]
    
    # Try direct word mapping for last part
    if last_part in FR_WORD_MAP:
        fr_last = FR_WORD_MAP[last_part]
    else:
        fr_last = None
    
    # For single-part keys
    if len(parts) == 1:
        if fr_last:
            return fr_last
        # Try to translate the camelCase title
        return _translate_en_to_fr(camel_to_title(last_part))
    
    # For multi-part keys, try to translate contextually
    parent = parts[-2]
    fr_parent = FR_WORD_MAP.get(parent, camel_to_title(parent))
    
    # Common label translations
    fr_label_map = {
        "title": "Titre",
        "subtitle": "Sous-titre",
        "description": "Description",
        "label": "Libellé",
        "name": "Nom",
        "value": "Valeur",
        "desc": "Description",
        "text": "Texte",
        "placeholder": "Espace réservé",
        "heading": "En-tête",
        "badge": "Badge",
        "banner": "Bannière",
        "tagline": "Slogan",
        "stat": "Statistique",
        "excerpt": "Extrait",
        "quote": "Citation",
        "author": "Auteur",
        "organization": "Organisation",
        "date": "Date",
        "category": "Catégorie",
        "step": "Étape",
        "icon": "Icône",
    }
    
    if last_part in fr_label_map and len(parts) > 1:
        fr_label = fr_label_map[last_part]
        return f"{fr_parent} — {fr_label}"
    
    # Try to translate the last part
    if fr_last:
        return f"{fr_parent} {fr_last}"
    
    # Fallback: translate the full title-case version
    en_title = camel_to_title(last_part)
    return f"{fr_parent} — {_translate_en_to_fr(en_title)}"


def _translate_en_to_fr(text: str) -> str:
    """Simple word-by-word translation for common English words to French."""
    words = text.split()
    translated = []
    for word in words:
        lower = word.lower()
        # Check direct mapping
        for key, val in FR_WORD_MAP.items():
            if key.lower() == lower:
                # Preserve capitalization
                if word[0].isupper():
                    if word.isupper():
                        translated.append(val.upper())
                    else:
                        translated.append(val[0].upper() + val[1:])
                else:
                    translated.append(val.lower())
                break
        else:
            translated.append(word)
    return " ".join(translated)


# ---------------------------------------------------------------------------
# JSON key path utilities
# ---------------------------------------------------------------------------

def key_exists(obj: dict, key_path: str) -> bool:
    """Check if a dot-notation key path exists in a nested dict/array.
    
    Handles both dict keys and array indices (e.g., 'items.0' to access
    the first element of an array stored under 'items').
    """
    parts = key_path.split(".")
    current = obj
    for part in parts:
        if isinstance(current, list):
            # Part should be a numeric index
            try:
                idx = int(part)
            except ValueError:
                return False
            if 0 <= idx < len(current):
                current = current[idx]
            else:
                return False
        elif isinstance(current, dict):
            if part not in current:
                return False
            current = current[part]
        else:
            return False
    return True


def set_nested_key(obj: dict, key_path: str, value) -> bool:
    """Set a value at a dot-notation key path in a nested dict/array, creating
    intermediate dicts as needed and extending arrays when index >= length.
    
    Returns True if the key was set, False if blocked by a non-dict/non-list value.
    """
    parts = key_path.split(".")
    current = obj
    
    for i, part in enumerate(parts[:-1]):
        next_part = parts[i + 1] if i + 1 < len(parts) else None
        next_is_index = next_part is not None and next_part.isdigit()
        
        if isinstance(current, list):
            try:
                idx = int(part)
            except ValueError:
                return False
            # Extend array if needed
            while len(current) <= idx:
                current.append(None)
            if current[idx] is None:
                # Determine what type to create based on next part
                current[idx] = [] if next_is_index else {}
            current = current[idx]
        elif isinstance(current, dict):
            if part not in current:
                # Determine what type to create based on next part
                current[part] = [] if next_is_index else {}
            elif not isinstance(current[part], (dict, list)):
                return False
            current = current[part]
        else:
            return False
    
    last = parts[-1]
    if isinstance(current, list):
        try:
            idx = int(last)
        except ValueError:
            return False
        # Extend array if needed
        while len(current) <= idx:
            current.append(None)
        current[idx] = value
        return True
    elif isinstance(current, dict):
        if last not in current:
            current[last] = value
            return True
        elif current[last] is None:
            current[last] = value
            return True
        return False  # Key already exists
    return False


# ---------------------------------------------------------------------------
# File scanning: find useTranslations() and t() calls
# ---------------------------------------------------------------------------

# Regex to find useTranslations('namespace') declarations
RE_USE_TRANSLATIONS = re.compile(
    r'(?:const|let|var)\s+(\w+)\s*=\s*useTranslations\s*\(\s*[\'"](\w+)[\'"]\s*\)'
)

# Regex to find t('...') and t("...") calls (including dot-notation keys)
RE_T_CALL = re.compile(
    r'(\w+)\s*\(\s*[\'"]([\w.]+)[\'"]\s*\)'
)


def scan_file(filepath: Path) -> dict:
    """Scan a .tsx file for useTranslations() declarations and t() calls.
    
    Returns a dict mapping namespace -> set of key paths used in t() calls.
    """
    try:
        content = filepath.read_text(encoding="utf-8", errors="replace")
    except Exception:
        return {}
    
    # Find all useTranslations() declarations: var_name -> namespace
    var_to_ns = {}
    for m in RE_USE_TRANSLATIONS.finditer(content):
        var_name = m.group(1)
        namespace = m.group(2)
        var_to_ns[var_name] = namespace
    
    if not var_to_ns:
        return {}
    
    # Find all t() calls and map them to namespaces
    # We need to be more careful: only match calls where the function name
    # is one of our translation variables
    ns_keys = defaultdict(set)
    
    for m in RE_T_CALL.finditer(content):
        func_name = m.group(1)
        key_path = m.group(2)
        
        if func_name in var_to_ns:
            namespace = var_to_ns[func_name]
            ns_keys[namespace].add(key_path)
    
    return dict(ns_keys)


def scan_all_files() -> dict:
    """Scan all .tsx files in the configured directories.
    
    Returns a dict mapping namespace -> set of key paths.
    """
    all_ns_keys = defaultdict(set)
    
    for scan_dir in SCAN_DIRS:
        if not scan_dir.exists():
            print(f"  ⚠ Directory not found: {scan_dir}")
            continue
        
        for tsx_file in scan_dir.rglob("*.tsx"):
            # Skip UI component files (they don't typically use translations)
            if "ui/" in str(tsx_file) or "ui\\" in str(tsx_file):
                continue
            
            file_keys = scan_file(tsx_file)
            for ns, keys in file_keys.items():
                all_ns_keys[ns].update(keys)
    
    return dict(all_ns_keys)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    print("=" * 70)
    print("fix-missing-keys.py — Auto-fix missing translation keys")
    print("=" * 70)
    print()
    
    # 1. Read existing JSON files
    print("📂 Reading translation files...")
    with open(EN_PATH, "r", encoding="utf-8") as f:
        en_data = json.load(f)
    with open(FR_PATH, "r", encoding="utf-8") as f:
        fr_data = json.load(f)
    
    print(f"  en.json: {len(en_data)} top-level keys")
    print(f"  fr.json: {len(fr_data)} top-level keys")
    print()
    
    # 2. Scan all .tsx files
    print("🔍 Scanning .tsx files for useTranslations() and t() calls...")
    ns_keys = scan_all_files()
    total_keys_found = sum(len(keys) for keys in ns_keys.values())
    print(f"  Found {len(ns_keys)} namespaces with {total_keys_found} total key references")
    print()
    
    # 3. Find missing keys
    print("🔎 Checking for missing keys...")
    missing_en = defaultdict(list)  # namespace -> [key_paths]
    missing_fr = defaultdict(list)
    en_missing_count = 0
    fr_missing_count = 0
    en_conflict_count = 0  # keys blocked by non-dict values
    
    for namespace, key_paths in sorted(ns_keys.items()):
        if namespace not in en_data:
            # Entire namespace missing from en.json
            for kp in sorted(key_paths):
                missing_en[namespace].append(kp)
                en_missing_count += 1
        else:
            for kp in sorted(key_paths):
                if not key_exists(en_data[namespace], kp):
                    missing_en[namespace].append(kp)
                    en_missing_count += 1
        
        if namespace not in fr_data:
            for kp in sorted(key_paths):
                missing_fr[namespace].append(kp)
                fr_missing_count += 1
        else:
            for kp in sorted(key_paths):
                if not key_exists(fr_data[namespace], kp):
                    missing_fr[namespace].append(kp)
                    fr_missing_count += 1
    
    print(f"  Missing in en.json: {en_missing_count} keys across {len(missing_en)} namespaces")
    print(f"  Missing in fr.json: {fr_missing_count} keys across {len(missing_fr)} namespaces")
    print()
    
    if en_missing_count == 0 and fr_missing_count == 0:
        print("✅ No missing keys found! All translations are complete.")
        return
    
    # Print summary of missing keys by namespace
    print("📋 Missing keys by namespace:")
    all_namespaces = sorted(set(list(missing_en.keys()) + list(missing_fr.keys())))
    for ns in all_namespaces:
        en_count = len(missing_en.get(ns, []))
        fr_count = len(missing_fr.get(ns, []))
        print(f"  {ns}: {en_count} missing (en), {fr_count} missing (fr)")
    print()
    
    # 4. Add missing keys
    print("✏️  Adding missing keys...")
    
    # Add to en.json
    en_added = 0
    en_skipped = 0
    for namespace, key_paths in missing_en.items():
        if namespace not in en_data:
            en_data[namespace] = {}
        
        for kp in key_paths:
            # Generate placeholder
            placeholder = generate_en_placeholder(kp, namespace)
            result = set_nested_key(en_data[namespace], kp, placeholder)
            if result:
                en_added += 1
            else:
                en_skipped += 1
    
    # Add to fr.json
    fr_added = 0
    fr_skipped = 0
    for namespace, key_paths in missing_fr.items():
        if namespace not in fr_data:
            fr_data[namespace] = {}
        
        for kp in key_paths:
            # Generate French placeholder
            placeholder = generate_fr_placeholder(kp, namespace)
            result = set_nested_key(fr_data[namespace], kp, placeholder)
            if result:
                fr_added += 1
            else:
                fr_skipped += 1
    
    print(f"  en.json: Added {en_added} keys, skipped {en_skipped} (blocked/existing)")
    print(f"  fr.json: Added {fr_added} keys, skipped {fr_skipped} (blocked/existing)")
    print()
    
    # 5. Write back JSON files
    print("💾 Writing updated translation files...")
    
    # Sort keys recursively for cleaner diffs
    def sort_dict(d):
        if isinstance(d, dict):
            return {k: sort_dict(v) for k, v in sorted(d.items())}
        if isinstance(d, list):
            return [sort_dict(item) for item in d]
        return d
    
    en_data = sort_dict(en_data)
    fr_data = sort_dict(fr_data)
    
    with open(EN_PATH, "w", encoding="utf-8") as f:
        json.dump(en_data, f, ensure_ascii=False, indent=2)
        f.write("\n")
    
    with open(FR_PATH, "w", encoding="utf-8") as f:
        json.dump(fr_data, f, ensure_ascii=False, indent=2)
        f.write("\n")
    
    print(f"  ✅ {EN_PATH}")
    print(f"  ✅ {FR_PATH}")
    print()
    
    # 6. Verify the files parse correctly
    print("🧪 Verifying JSON files parse correctly...")
    try:
        with open(EN_PATH, "r", encoding="utf-8") as f:
            test_en = json.load(f)
        with open(FR_PATH, "r", encoding="utf-8") as f:
            test_fr = json.load(f)
        print(f"  ✅ en.json: {len(test_en)} top-level keys, parses OK")
        print(f"  ✅ fr.json: {len(test_fr)} top-level keys, parses OK")
    except json.JSONDecodeError as e:
        print(f"  ❌ JSON parse error: {e}")
        sys.exit(1)
    
    # 7. Re-scan to count remaining missing keys
    print()
    print("📊 Post-fix verification — re-scanning for remaining missing keys...")
    remaining_en = 0
    remaining_fr = 0
    
    for namespace, key_paths in ns_keys.items():
        for kp in key_paths:
            if namespace not in test_en or not key_exists(test_en[namespace], kp):
                remaining_en += 1
            if namespace not in test_fr or not key_exists(test_fr[namespace], kp):
                remaining_fr += 1
    
    print(f"  Remaining missing in en.json: {remaining_en}")
    print(f"  Remaining missing in fr.json: {remaining_fr}")
    
    if remaining_en > 0 or remaining_fr > 0:
        print()
        print("  ⚠️  Some keys could not be added (blocked by existing values):")
        shown = 0
        for namespace, key_paths in ns_keys.items():
            for kp in sorted(key_paths):
                if namespace not in test_en or not key_exists(test_en[namespace], kp):
                    if shown < 30:
                        print(f"    en.{namespace}.{kp}")
                    shown += 1
                if namespace not in test_fr or not key_exists(test_fr[namespace], kp):
                    pass  # Same keys as en
        if shown > 30:
            print(f"    ... and {shown - 30} more")
    
    print()
    reduction_en = en_missing_count - remaining_en
    reduction_fr = fr_missing_count - remaining_fr
    print(f"📈 Summary:")
    print(f"  en.json: {en_missing_count} → {remaining_en} missing ({reduction_en} fixed, {reduction_en/max(en_missing_count,1)*100:.0f}% reduction)")
    print(f"  fr.json: {fr_missing_count} → {remaining_fr} missing ({reduction_fr} fixed, {reduction_fr/max(fr_missing_count,1)*100:.0f}% reduction)")
    print()
    print("✅ Done!")


if __name__ == "__main__":
    main()
