#!/usr/bin/env python3
"""
Fix fr.json — translate all identical EN/FR values to proper French.
This handles the 751 untranslated values found.
"""
import json
import re

with open('/home/z/my-project/harch-corp/messages/en.json', 'r') as f:
    en = json.load(f)
with open('/home/z/my-project/harch-corp/messages/fr.json', 'r') as f:
    fr = json.load(f)

# ============================================================
# Build a comprehensive English -> French translation map
# ============================================================
# This covers ALL the identical values found in the audit

translations = {
    # === about section ===
    "Excellence": "Excellence",  # same in French
    "Blog Harch": "Blog Harch",
    "Newsletter": "Newsletter",
    "Blog": "Blog",
    "Impact": "Impact",
    "Agri": "Agri",
    "Intelligence": "Intelligence",
    "Phase": "Phase",
    "Solution": "Solution",
    "Copyright": "Copyright",
    "Dimension": "Dimension",
    "Documentation": "Documentation",
    "Maximum": "Maximum",
    "Menu": "Menu",
    "Minimum": "Minimum",
    "Notifications": "Notifications",
    "Page": "Page",
    "Performance": "Performance",
    "Support": "Support",
    "Total": "Total",
    "Version": "Version",
    "Volume": "Volume",
    "Champions": "Champions",
    "Initiatives": "Initiatives",
    "Harch": "Harch",
    "Ventures": "Ventures",
    "Thesis": "Thèse",
    "Certifications": "Certifications",
    "Terminal": "Terminal",
    "Architecture": "Architecture",
    "Pipeline": "Pipeline",
    "Irrigation": "Irrigation",
    "Filtration": "Filtration",
    "Production": "Production",
    "Distribution": "Distribution",
    "Extraction": "Extraction",
    "Transport": "Transport",
    "Code": "Code",
    "Test": "Test",
    "Cobalt": "Cobalt",
    "Millet": "Millet",
    "Normal": "Normal",
    "Zone": "Zone",
    "Staging": "Staging",
    "Optimal": "Optimal",
    "Foundry": "Fonderie",
    "Apollo": "Apollo",
    "Streaming": "Streaming",
    "Burst": "Rafale",
    "Zero Trust": "Zero Trust",
    "Design Patterns": "Patrons de conception",
    "Framework": "Framework",
    "Comparison": "Comparaison",
    "Copied!": "Copié !",
    "Copy": "Copier",
    "Installation": "Installation",
    "Package": "Package",
    "Stable": "Stable",
    "Packages": "Packages",
    "Python": "Python",
    "TypeScript": "TypeScript",
    "gRPC": "gRPC",
    "WebSocket": "WebSocket",
    "GPU Cloud": "Cloud GPU",
    "On-Demand": "À la demande",
    "/hour": "/heure",
    "/month": "/mois",
    "Reserved": "Réservé",
    "Spot": "Spot",
    "Carbon Intensity": "Intensité carbone",
    "Encryption": "Chiffrement",
    "Hubs": "Hubs",
    "Latency": "Latence",
    "Renewable Share": "Part renouvelable",
    "Total GPUs": "GPUs totaux",
    "Uptime": "Disponibilité",
    "AI Startups": "Startups IA",
    "Use Cases": "Cas d'usage",
    "Edge Computing": "Informatique en périphérie",
    "Cutting-Edge GPU Clusters": "Clusters GPU de pointe",
    "African Low Latency": "Faible latence africaine",
    "Carbon Advantage": "Avantage carbone",
    "Geographic Position": "Position géographique",
    "Serviceable Addressable Market": "Marché adressable accessible",
    "Serviceable Obtainable Market": "Marché obtainable accessible",
    "Total Addressable Market": "Marché total adressable",
    "Food Insecurity": "Insécurité alimentaire",
    "Materials Leakage": "Fuite de matériaux",
    "Financial Architecture": "Architecture financière",
    "Integrated Materials": "Matériaux intégrés",
    "Predictive Maintenance": "Maintenance prédictive",
    "Resource Optimization": "Optimisation des ressources",
    "Integrations": "Intégrations",
    "Authentication": "Authentification",
    "API Documentation": "Documentation API",
    "Endpoints": "Points de terminaison",
    "Rate Limits": "Limites de débit",
    "Webhooks": "Webhooks",
    "HarchOS API": "API HarchOS",
    "Partner Ecosystem": "Écosystème partenaires",
    "Verdict": "Verdict",
    "Sponsor": "Sponsor",
    "Become an Investor": "Devenir investisseur",
    "ESG Report": "Rapport ESG",
    "Fact Sheet": "Fiche synthétique",
    "Financial Statements": "États financiers",
    "Investor Documents": "Documents investisseurs",
    "Audit Committee": "Comité d'audit",
    "Board Independence": "Indépendance du conseil",
    "Compensation Committee": "Comité de rémunération",
    "Governance Committee": "Comité de gouvernance",
    "Governance": "Gouvernance",
    "Key Figures": "Chiffres clés",
    "Employment Target": "Objectif d'emploi",
    "Renewable Share": "Part renouvelable",
    "Target Markets": "Marchés cibles",
    "VRAM": "VRAM",
    "Data Collection": "Collecte de données",
    "Data Collection Text": "Nous collectons les données personnelles que vous fournissez directement, telles que votre nom, adresse e-mail, organisation et détails de projet lors d'une demande de devis ou de nous contacter. Nous collectons également automatiquement les données d'utilisation, les informations sur l'appareil et les cookies lors de votre visite sur notre site.",
    "Data Sharing": "Partage de données",
    "Data Sharing Text": "Nous partageons vos données uniquement avec des prestataires de confiance qui contribuent à la fourniture de nos services, et uniquement sous des obligations contractuelles strictes. Nous ne vendons jamais vos données. Les transferts transfrontaliers sont protégés par des garanties appropriées.",
    "Data Use": "Utilisation des données",
    "Data Use Text": "Nous utilisons vos données personnelles pour traiter vos demandes, fournir nos services, communiquer avec vous sur vos projets et améliorer notre plateforme. Nous ne vendons pas vos données personnelles à des tiers.",
    "International Transfers": "Transferts internationaux",
    "International Transfers Text": "Lorsque des transferts de données hors du Maroc sont nécessaires, nous assurons une protection adéquate par le biais de Clauses Contractuelles Types, de décisions d'adéquation ou d'autres mécanismes conformes à la Loi 09-08 et au RGPD.",
    "Contact": "Contact",
    "Home": "Accueil",
    "Company": "Entreprise",
    "Infrastructure": "Infrastructure",
    "Partnerships": "Partenariats",
    "Pricing": "Tarification",
    "Contact Support": "Contacter le support",
    "Frequently Asked Questions": "Questions fréquentes",
    "Which countries do you operate in?": "Dans quels pays opérez-vous ?",
    "How do I become a partner?": "Comment devenir partenaire ?",
    "HARCH CORP": "HARCH CORP",
    "Sovereign AI": "IA Souveraine",
    "Harch Intelligence": "Harch Intelligence",
    "Harch Agri": "Harch Agri",
    "Harch Ventures": "Harch Ventures",
    "Deployments": "Déploiements",
    "Competitive Comparison": "Comparaison concurrentielle",
    "Hubs": "Hubs",
    "Terminal": "Terminal",
    "GPUs": "GPUs",
    "Infrastructure": "Infrastructure",
    "Auto": "Auto",
    "Incidents": "Incidents",
    "Potassium": "Potassium",
    "Export": "Exportation",
    "SDKs": "SDKs",
    "Transactions": "Transactions",
    "Coupon": "Coupon",
    "Term Sheet": "Term Sheet",
    "Briefing": "Briefing",
    "Nav": "Nav",
    "Intelligence": "Intelligence",
    "Carbon-aware": "Carbone-intelligent",
    "Sovereign": "Souverain",
    "Scalability": "Scalabilité",
    "Reliability": "Fiabilité",
    "Interoperability": "Interopérabilité",
    "Sustainability": "Durabilité",
    "Compliance": "Conformité",
    "Efficiency": "Efficacité",
    "Capacity": "Capacité",
    "Power": "Puissance",
    "Energy": "Énergie",
    "Mining": "Mines",
    "MARKET": "MARCHÉ",
    "TECHNOLOGY": "TECHNOLOGIE",
    "OPERATIONS": "OPÉRATIONS",
    "REGULATION": "RÉGLEMENTATION",
    "FINANCE": "FINANCE",
    "MARKET": "MARCHÉ",
    "TECHNOLOGY": "TECHNOLOGIE",
    "OPERATIONS": "OPÉRATIONS",
    "Dispatch Not Found": "Dispatch introuvable",
    "Executive Bios": "Bios des dirigeants",
    "Media Contact": "Contact média",
    "Press": "Presse",
    "Read Full Dispatch": "Lire le dispatch complet",
    "Harch Summit 2026": "Harch Summit 2026",
    "NVIDIA A100": "NVIDIA A100",
    "Python v1.0": "Python v1.0",
    "30 min": "30 min",
    "15 min": "15 min",
    "20 min": "20 min",
    "45 min": "45 min",
    "25 min": "25 min",
    "35 min": "35 min",
    "IDE Support": "Support IDE",
    "Unit Testing": "Tests unitaires",
    "Production Ready": "Prêt pour la production",
    "Language": "Langage",
    "Streaming": "Streaming",
    "Competitive Advantage": "Avantage concurrentiel",
    "Market Opportunity": "Opportunité de marché",
    "Operational Status": "Statut opérationnel",
    "System Status": "Statut du système",
    "Service Status": "Statut des services",
    "Incidents (YTD)": "Incidents (YTD)",
    "Incidents (24h)": "Incidents (24h)",
    "Impact": "Impact",
    "Type": "Type",
    "Pipeline Builder": "Constructeur de pipeline",
    "Workflows": "Workflows",
    "Perception": "Perception",
    "SENSE": "SENSE",
    "THINK": "THINK",
    "Total GPUs": "GPUs totaux",
    "CoreWeave": "CoreWeave",
    "Google Cloud (Hamina)": "Google Cloud (Hamina)",
    "QScale": "QScale",
    "Canada": "Canada",
    "Lambda Labs": "Lambda Labs",
    "Oracle Cloud Infrastructure": "Oracle Cloud Infrastructure",
    "Equinix": "Equinix",
    "Documents": "Documents",
    "YOUTUBE": "YOUTUBE",
    "LINKEDIN": "LINKEDIN",
    "GITHUB": "GITHUB",
    "MA  EU  AF": "MA  EU  AF",
    "IoT / API / Satellite": "IoT / API / Satellite",
    "RL + Transformer + GNN": "RL + Transformer + GNN",
    "2:34 min": "2:34 min",
    "1:58 min": "1:58 min",
    "Harch Ouarzazate": "Harch Ouarzazate",
    "South Africa": "Afrique du Sud",
    "African Presence": "Présence africaine",
    "Consultation Type": "Type de consultation",
    "Full Name": "Nom complet",
    "Event Name": "Nom de l'événement",
    "Employment Target": "Objectif d'emploi",
    "Cookie Name": "Nom du cookie",
    "Spot Price": "Prix spot",
    "First Name": "Prénom",
    "Last Name": "Nom de famille",
    "Job Title": "Fonction",
    "Deployment Country": "Pays de déploiement",
    "Project Type": "Type de projet",
    "Global Presence": "Présence mondiale",
    "Jobs Target": "Objectif d'emploi",
    "Strategic Advantage": "Avantage stratégique",
    "Security Model": "Modèle de sécurité",
    "Harch Corp S.A.": "Harch Corp S.A.",
    "MASEN": "MASEN",
    "OCP Group": "Groupe OCP",
    "Kingdom of Morocco": "Royaume du Maroc",
    "Republic of Gambia": "République de Gambie",
    "Africa Infrastructure Partners": "Africa Infrastructure Partners",
    "Strategic Investment Partners": "Partenaires d'investissement stratégiques",
    "European Investment Bank": "Banque Européenne d'Investissement",
    "African Development Bank": "Banque Africaine de Développement",
    "Government": "Gouvernement",
    "Private Equity": "Capital-investissement",
    "Investment": "Investissement",
    "Development Finance": "Finance du développement",
    "Multilateral": "Multilatéral",
    "Standard": "Norme",
    "Vertical": "Vertical",
    "Credit Value": "Valeur du crédit",
    "Growth Target": "Objectif de croissance",
    "Market Size": "Taille du marché",
    "Spread Advantage": "Avantage de spread",
    "Facility Size": "Taille de l'installation",
    "IRR Target": "Objectif TRI",
    "DSCR Target": "Objectif DSCR",
    "Competitive Analysis Africa": "Présence africaine",
    "Competitive Analysis Africa Presence": "Présence active dans plus de 5 pays africains",
    "Competitive Analysis Africa Presence Value": "5+ pays",
    "Competitive Analysis Differentiator": "Différenciateur clé",
    "Competitive Analysis Differentiator Note": "Stack entièrement intégrée de l'IoT au marché",
    "Competitive Analysis Differentiator Value": "Intégration verticale",
    "Competitive Analysis Farmers": "Agriculteurs desservis",
    "Competitive Analysis Funding": "Financement levé",
    "Competitive Analysis Harch Advantage": "Avantage Harch Corp",
    "Competitive Analysis Harch Agri Tagline": "Agriculture souveraine pour l'Afrique",
    "Competitive Analysis Key Weakness": "Faiblesse clé",
    "Competitive Analysis Model": "Modèle économique",
    "Competitive Analysis Model Value": "Agriculture de précision intégrée",
    "Competitive Analysis Revenue": "Chiffre d'affaires annuel",
    "Competitive Analysis Target2031": "Objectif 2031",
    "Competitive Analysis Target2031 Value": "CA de 500M$+",
    "Agriculture Competitive Advantage Label": "Avantage concurrentiel",
    "Agriculture Competitive Advantage Title": "Notre avantage concurrentiel",
    "Agriculture Competitive Analysis Label": "Analyse concurrentielle",
    "Agriculture Competitive Analysis Subtitle": "Comment HarchAgri se compare aux concurrents mondiaux de l'agritech.",
    "Agriculture Competitive Analysis Title": "Position sur le marché",
    "Agriculture Hero Badge": "Harch Agri",
    "Agriculture Hero Subtitle": "Agriculture de précision alimentée par l'IA, les capteurs IoT et la technologie drone pour optimiser les rendements sur les terres agricoles africaines.",
    "Agriculture Iot Sensor Subtitle": "Surveillance en temps réel des sols et des cultures dans toutes les zones de déploiement.",
    "Agriculture Iot Sensor Title": "Réseau de capteurs IoT",
    "Agriculture Live Monitoring Label": "Surveillance en direct",
    "Market Analysis Africa Maturity": "Croissance précoce",
    "Market Analysis Cagr": "TCAC de 12,4 %",
    "Market Analysis Footnote": "Tailles de marché basées sur les estimations de 2024. TCAC projeté jusqu'en 2030.",
    "Market Analysis Market Size": "Marché adressable de plus de 45 Md$",
    "Market Analysis Opportunity": "Élevée — sous-exploitée avec des fondamentaux solides",
    "Market Analysis Segment": "Marché AgriTech africain",
    "Market Analysis Title": "Analyse de marché agricole",
    "Agriculture Market Analysis Subtitle": "Analyse de marché",
    "Agriculture Market Analysis": "Analyse de marché",
    "Agriculture Overview": "HarchAgri fournit une agriculture de précision grâce à une pile intégrée de capteurs IoT, de surveillance par drone et de technologie d'agriculture verticale — conçue pour les terres agricoles africaines.",
    "Agriculture Partnerships Subtitle": "Des partenariats stratégiques au service de la souveraineté agricole africaine.",
    "Agriculture Pricing Subtitle": "Tarification transparente pour chaque échelle d'opération.",
    "Metrics Food Imports": "L'Afrique importe plus de 35 Md$ de nourriture par an",
    "Metrics Post Harvest Losses": "30 à 40 % des récoltes africaines sont perdues après récolte",
    "Metrics Smallholder Farmers": "80 % des exploitations africaines sont des petites exploitations",
    "Metrics Uncultivated Arable Land": "60 % des terres arables non cultivées du monde se trouvent en Afrique",
    "Pricing Price": "Tarification",
    "Pricing Product": "Produit",
    "Pricing Roi": "ROI",
    "Pricing Target": "Client cible",
    "Pricing Unit": "Unité",
    "Carbon Price": "Nous contacter pour les tarifs",
    "Carbon Product": "Vérification de crédits carbone",
    "Carbon Roi": "3 à 5x sur 5 ans",
    "Carbon Target": "Entreprises soucieuses du carbone",
    "Carbon Unit": "Par tonne de crédit",
    "Carbon Tagline": "Monétisez la séquestration carbone de votre ferme",
    "Drone Price": "À partir de 2 500 $/saison",
    "Drone Product": "Package de surveillance par drone",
    "Drone Roi": "Amélioration du rendement de 5 à 8x",
    "Drone Target": "Exploitations à grande échelle",
    "Drone Unit": "Par hectare",
    "Drone Tagline": "Intelligence aérienne pour chaque hectare",
    "Iot Price": "À partir de 500 $/mois",
    "Iot Product": "Suite de capteurs IoT",
    "Iot Roi": "Économies de coûts de 4 à 6x",
    "Iot Target": "Exploitations de taille moyenne aux entreprises",
    "Iot Unit": "Par nœud de capteur",
    "Iot Tagline": "Surveillance de précision du sol au cloud",
    "Vertical Price": "Tarification sur mesure",
    "Vertical Product": "Module de ferme verticale",
    "Vertical Roi": "CA de 8 à 12x vs. traditionnel",
    "Vertical Target": "Opérateurs d'agriculture urbaine",
    "Vertical Unit": "Par module",
    "Vertical Tagline": "Production toute l'année dans tous les climats",
    "Agadir City": "Agadir",
    "Agadir Crops": "Tomates, Agrumes, Baies",
    "Agadir Region": "Souss-Massa",
    "Casablanca City": "Casablanca",
    "Casablanca Crops": "Légumes, Herbes, Légumes-feuilles",
    "Casablanca Region": "Casablanca-Settat",
    "Marrakech City": "Marrakech",
    "Marrakech Crops": "Olives, Grenades, Safran",
    "Marrakech Region": "Marrakech-Safi",
    "Rabat City": "Rabat",
    "Rabat Crops": "Fraises, Carottes, Céréales",
    "Rabat Region": "Rabat-Salé-Kénitra",
    "Tangier City": "Tanger",
    "Tangier Crops": "Cannabis (légal), Figues, Raisins",
    "Tangier Region": "Tanger-Tetouan-Al Hoceima",
    "Aerofarms Advantage": "Technologie de ferme verticale de pointe avec ROI éprouvé",
    "Aerofarms Africa": "Aucune présence africaine — concentré sur les marchés américains et asiatiques",
    "Aerofarms Country": "États-Unis",
    "Aerofarms Farmers": "Non applicable — exploite ses propres installations",
    "Aerofarms Funding": "Plus de 238 M$ levés",
    "Aerofarms Maturity": "Phase avancée (opérationnel depuis 2015)",
    "Aerofarms Model": "Fermes verticales en propriété-exploitation",
    "Aerofarms Revenue": "~30 M$ (estimé)",
    "Aerofarms Weakness": "Aucune opération africaine ; coûts opérationnels élevés ; variété de cultures limitée",
    "Apollo Advantage": "Plateforme de prêt numérique solide pour les petits exploitants",
    "Apollo Africa": "Actif au Kenya et en expansion en Afrique de l'Est",
    "Apollo Country": "Kenya",
    "Apollo Farmers": "Plus de 100 000 agriculteurs",
    "Apollo Funding": "Plus de 60 M$ levés",
    "Apollo Maturity": "Phase de croissance (fondé en 2016)",
    "Apollo Model": "Prêt numérique + intrants agricoles",
    "Apollo Revenue": "~15 M$ (estimé)",
    "Apollo Weakness": "Limité à l'Afrique de l'Est ; pas d'intégration verticale ; exposition au risque de crédit",
    "Climate Corp Advantage": "Modélisation avancée des risques climatiques soutenue par Bayer",
    "Climate Corp Africa": "Minime — principalement concentré sur les marchés développés",
    "Climate Corp Country": "États-Unis",
    "Climate Corp Farmers": "Plus de 300M d'acres assurés (mondial)",
    "Climate Corp Funding": "Acquis par Bayer pour 630 M$",
    "Climate Corp Maturity": "Mature (acquis)",
    "Climate Corp Model": "Assurance + analytique de données agricoles",
    "Climate Corp Revenue": "Intégré dans Bayer Digital Farming",
    "Climate Corp Weakness": "Pas de focus africain ; modèle basé sur l'assurance limite la portée ; pas d'intégration matérielle",
    "Ocp Advantage": "Producteur de phosphate dominant avec soutien gouvernemental",
    "Ocp Africa": "Basé au Maroc — forte présence continentale",
    "Ocp Country": "Maroc",
    "Ocp Farmers": "Partenariat avec plus de 50 000 agriculteurs via OCP Agri",
    "Ocp Funding": "Coté en bourse — capitalisation de plus de 40 Md$",
    "Ocp Maturity": "Mature (fondé en 1920)",
    "Ocp Model": "Production d'engrais + services agricoles",
    "Ocp Revenue": "Plus de 9 Md$ (chiffre d'affaires groupe)",
    "Ocp Weakness": "Focus uniquement sur les engrais ; pas de technologie de précision ; lente transformation numérique",
    "Twiga Advantage": "Plus grande plateforme B2B de distribution alimentaire en Afrique de l'Est",
    "Twiga Africa": "Actif au Kenya — expansion vers l'Ouganda et la Tanzanie",
    "Twiga Country": "Kenya",
    "Twiga Farmers": "Plus de 140 000 agriculteurs sur la plateforme",
    "Twiga Funding": "Plus de 110 M$ levés",
    "Twiga Maturity": "Phase de croissance (fondé en 2014)",
    "Twiga Model": "Marketplace + logistique pour produits agricoles",
    "Twiga Revenue": "~50 M$ (estimé)",
    "Twiga Weakness": "Modèle marketplace uniquement ; pas de technologie de production ; limité à l'Afrique de l'Est",
    "Fao Country": "International (siège à Rome)",
    "Fao Priority": "Élevée",
    "Fao Status": "Actif",
    "Fao Type": "Institutionnel",
    "Isra Country": "Maroc",
    "Isra Priority": "Moyenne",
    "Isra Status": "Actif",
    "Isra Type": "Recherche",
    "Ocp Country": "Maroc",
    "Ocp Priority": "Élevée",
    "Ocp Status": "Actif",
    "Ocp Type": "Stratégique",
    "Marketplace Cagr": "22,3 %",
    "Marketplace Maturity": "Croissance",
    "Marketplace Opportunity": "Très élevée",
    "Marketplace Segment": "Plateformes marketplace agricoles",
    "Marketplace Size": "2,1 Md$",
    "Carbon Credits Cagr": "28,5 %",
    "Carbon Credits Maturity": "Émergent",
    "Carbon Credits Opportunity": "Très élevée",
    "Carbon Credits Segment": "Crédits carbone agricoles",
    "Carbon Credits Size": "400 M$",
    "Drones Segment": "Drones agricoles",
    "Drones Cagr": "18,2 %",
    "Drones Maturity": "Émergent",
    "Drones Opportunity": "Très élevée",
    "Drones Size": "1,2 Md$",
    "Vertical Farming Cagr": "24,1 %",
    "Vertical Farming Maturity": "Émergent",
    "Vertical Farming Opportunity": "Élevée",
    "Vertical Farming Segment": "Systèmes de ferme verticale",
    "Vertical Farming Size": "900 M$",
    "Green Plan Status": "Actif",
    "Green Plan Type": "Gouvernemental",
    "Sahel Region": "Région du Sahel",
    "Finance Cross Vertical Desc": "Harch Finance fournit des services financiers intégrés à travers toutes les filiales de Harch Corp — du financement de projets et des obligations vertes au commerce et à la monétisation de crédits carbone.",
    "Agriculture — $145M": "Agriculture — 145 M$",
    "Finance — $95M": "Finance — 95 M$",
    "Intelligence — $320M": "Intelligence — 320 M$",
    "Subtitle": "Intégration verticale, souveraineté industrielle, exécution continentale",
    "Operational Status": "Statut opérationnel",
    "Avg Revenue": "CA moyen",
    "HarchAgri Drone": "HarchAgri Drone",
    "HarchAgri IoT": "HarchAgri IoT",
    "HarchAgri Vertical": "HarchAgri Vertical",
    "Hectares": "Hectares",
    "IoT + Drones": "IoT + Drones",
    "IoT + Vertical": "IoT + Vertical",
    "Casablanca": "Casablanca",
    "Dakhla": "Dakhla",
    "Banjul": "Banjul",
    "Nouakchott": "Nouakchott",
    "Dakar": "Dakar",
    "Bamako": "Bamako",
    "Mali": "Mali",
    "Kenya": "Kenya",
    "Ghana": "Ghana",
    "France": "France",
    "Burkina Faso": "Burkina Faso",
    "Expansion": "Expansion",
    "Purification": "Purification",
    "Murabaha": "Murabaha",
    "LinkedIn Profile": "Profil LinkedIn",
    "African Low Latency": "Faible latence africaine",
    "Carbon Intensity": "Intensité carbone",
    "Carbon-aware": "Carbone-intelligent",
    "gCO₂/kWh": "gCO₂/kWh",
    "Competitive Advantage": "Avantage concurrentiel",
    "Agriculture": "Agriculture",
    "Finance": "Finance",
    "Intelligence": "Intelligence",
    "AgriTech": "AgriTech",
    "FinTech": "FinTech",
    "Seed": "Amorçage",
    "Series A": "Série A",
    "Pre-Seed": "Pré-amorçage",
}

# ============================================================
# Function to recursively translate fr.json values
# ============================================================
def translate_value(key_path, en_val, fr_val):
    """If FR value equals EN value, translate it."""
    if isinstance(fr_val, dict) or isinstance(en_val, dict):
        return None  # skip, handled recursively
    
    if isinstance(fr_val, list) or isinstance(en_val, list):
        return None  # skip, handled separately
    
    if fr_val == en_val:
        # Check our translation map
        if en_val in translations:
            return translations[en_val]
        # Check for partial matches (e.g., competitive metric values)
    
    return None

# ============================================================
# Apply translations to fr.json
# ============================================================
def deep_translate(en_obj, fr_obj, prefix=''):
    changes = 0
    for key in fr_obj:
        full_key = f'{prefix}.{key}' if prefix else key
        if key not in en_obj:
            continue
            
        fr_val = fr_obj[key]
        en_val = en_obj[key]
        
        if isinstance(fr_val, dict) and isinstance(en_val, dict):
            changes += deep_translate(en_val, fr_val, full_key)
        elif isinstance(fr_val, str) and isinstance(en_val, str):
            if fr_val == en_val:
                new_val = translate_value(full_key, en_val, fr_val)
                if new_val is not None:
                    fr_obj[key] = new_val
                    changes += 1
    return changes

changes = deep_translate(en, fr)
print(f'Direct translations applied: {changes}')

# ============================================================
# Now fix remaining untranslated values with contextual translations
# ============================================================

# about
fr['about']['metaLabel'] = 'À PROPOS'
fr['about']['dashboardTitle'] = 'HARCH CORP // STATUT'
fr['about']['globalPresence']['headline'] = 'Présence en Afrique'

# blog
fr['blog']['heroTitle'] = 'Blog Harch'
fr['blog']['title'] = 'Blog'

# careers
fr['careers']['phase'] = 'Phase'

# caseStudies
fr['caseStudies']['solution'] = 'Solution'

# common
fr['common']['copyright'] = 'Copyright'
fr['common']['dimension'] = 'Dimension'
fr['common']['documentation'] = 'Documentation'
fr['common']['maximum'] = 'Maximum'
fr['common']['menu'] = 'Menu'
fr['common']['minimum'] = 'Minimum'
fr['common']['notifications'] = 'Notifications'
fr['common']['page'] = 'Page'
fr['common']['performance'] = 'Performance'
fr['common']['support'] = 'Support'
fr['common']['total'] = 'Total'
fr['common']['version'] = 'Version'
fr['common']['volume'] = 'Volume'
fr['common']['errorTitle'] = 'ERREUR SYSTÈME'
fr['common']['errorMessage'] = 'Une défaillance système critique a été détectée. L\'opération n\'a pas pu être achevée.'
fr['common']['errorDigest'] = 'Digest :'
fr['common']['errorRetry'] = 'Réessayer'
fr['common']['notFoundTitle'] = 'Cette page n\'existe pas dans notre infrastructure.'
fr['common']['notFoundDescription'] = 'La ressource que vous avez demandée est introuvable. Retournez au centre des opérations.'
fr['common']['notFoundRequestBriefing'] = 'Demander un briefing'

# community
fr['community']['champions']['label'] = 'Champions'

# company
fr['company']['dei']['heroTitle2'] = 'Avantage stratégique'
fr['company']['dei']['initiativesLabel'] = 'Initiatives'
fr['company']['ventures']['heroTitle1'] = 'Harch'
fr['company']['ventures']['heroTitle2'] = 'Ventures'
fr['company']['ventures']['label'] = 'Ventures'
fr['company']['ventures']['thesisLabel'] = 'Thèse'
fr['company']['leadership']['heroTitle1'] = 'Notre'
fr['company']['leadership']['heroTitle2'] = 'Direction'
fr['company']['leadership']['linkedin'] = 'Profil LinkedIn'

# contact
fr['contact']['compliance']['certifications'] = 'Certifications'
fr['contact']['compliance']['iso'] = 'ISO 27001'
fr['contact']['compliance']['soc2'] = 'SOC 2 Type II'
fr['contact']['consultationTypes']['talent']['label'] = 'Talent'
fr['contact']['form']['clearanceSecret'] = 'Secret'
fr['contact']['form']['message'] = 'Message'
fr['contact']['onboarding']['step3']['title'] = 'Briefing'

# cookieConsent
fr['cookieConsent']['marketing'] = 'Marketing'

# customers
fr['customers']['advisoryBoard']['cadenceLabel'] = 'Cadence'
fr['customers']['advisoryBoard']['titleLabel'] = 'Conseil consultatif'
fr['customers']['heroLabel'] = 'Clients'
fr['customers']['heroTitle'] = 'Nos Clients'
fr['customers']['title'] = 'Clients'

# developers
fr['developers']['community'][0]['members'] = '2 400+'
fr['developers']['community'][1]['members'] = '1 200+'
fr['developers']['community'][2]['members'] = '5 000+'
fr['developers']['terminalLabel'] = 'Terminal'
fr['developers']['architecture'] = 'Architecture'
fr['developers']['changelog'] = 'Journal des modifications'
fr['developers']['codeExamples'] = 'Exemples de code'
fr['developers']['documentation'] = 'Documentation'
fr['developers']['features']['sdkTitle'] = 'SDK natifs'
fr['developers']['heroTitle'] = 'Plateforme'

# docs
fr['docs']['api']['rateLimits']['table']['burst'] = 'Rafale'
fr['docs']['api']['websocket']['label'] = 'WebSocket'
fr['docs']['api']['sections']['authentication'] = 'Authentification'
fr['docs']['api']['sections']['errors'] = 'Gestion des erreurs'
fr['docs']['api']['sections']['streaming'] = 'Streaming'
fr['docs']['api']['sections']['webhooks'] = 'Webhooks'
fr['docs']['architecture']['designPatterns'][3]['name'] = 'Zero Trust'
fr['docs']['architecture']['designPatterns']['title'] = 'Patrons de conception'
fr['docs']['architecture']['framework']['label'] = 'Framework'
fr['docs']['architecture']['hero']['label'] = 'Architecture'
fr['docs']['architecture']['title'] = 'Architecture'
fr['docs']['architecture']['topics']['gpuCluster'] = 'Cluster GPU'
fr['docs']['guides']['hero']['label'] = 'Guides'
fr['docs']['guides']['title'] = 'Guides'
fr['docs']['guides']['topics']['monitoring'] = 'Surveillance'
fr['docs']['guides']['topics']['optimization'] = 'Optimisation'
fr['docs']['hero']['label'] = 'Documentation'
fr['docs']['heroLabel'] = 'Documentation'
fr['docs']['heroTitle'] = 'Documentation'
fr['docs']['version'] = 'Version'
fr['docs']['searchPlaceholder'] = 'Rechercher dans la documentation...'
fr['docs']['sdks']['comparison']['label'] = 'Comparaison'
fr['docs']['sdks']['comparison']['table']['feature'] = 'Langage'
fr['docs']['sdks']['comparison']['title'] = 'Comparaison des SDK'
fr['docs']['sdks']['copied'] = 'Copié !'
fr['docs']['sdks']['copy'] = 'Copier'
fr['docs']['sdks']['hero']['label'] = 'SDKs'
fr['docs']['sdks']['installation'] = 'Installation'
fr['docs']['sdks']['install'] = 'Installer'
fr['docs']['sdks']['package'] = 'Package'
fr['docs']['sdks']['packages'] = 'Packages'
fr['docs']['sdks']['stable'] = 'Stable'

# engineeringBlog
fr['engineeringBlog']['copyFeedUrl'] = 'Copier l\'URL du flux'
fr['engineeringBlog']['featuredTechnicalDeepDive'] = 'Analyse technique en vedette'
fr['engineeringBlog']['level'] = 'Niveau'
fr['engineeringBlog']['openSourceRepos']['harchosScheduler']['desc'] = 'HarchOS Scheduler — Moteur d\'ordonnancement GPU carbone-intelligent'
fr['engineeringBlog']['posts']['insideHarchos']['title'] = 'Inside HarchOS : Plongée dans l\'architecture'
fr['engineeringBlog']['readTechnicalDeepDive'] = 'Lire l\'analyse technique'
fr['engineeringBlog']['relatedTopics'] = 'Sujets connexes'
fr['engineeringBlog']['allArticles'] = 'Tous les articles'
fr['engineeringBlog']['backToBlog'] = 'Retour au blog technique'
fr['engineeringBlog']['categories'] = 'Catégories'
fr['engineeringBlog']['deepDives'] = 'Analyses approfondies'
fr['engineeringBlog']['latestPosts'] = 'Derniers articles'
fr['engineeringBlog']['readArticle'] = 'Lire l\'article'
fr['engineeringBlog']['research'] = 'Recherche'
fr['engineeringBlog']['tutorials'] = 'Tutoriels'

# esg
fr['esg']['governance']['tableHeaders']['standard'] = 'Norme'
fr['esg']['governance']['tableHeaders']['vertical'] = 'Vertical'
fr['esg']['social']['label'] = 'Social'
fr['esg']['carbonIntensity']['value'] = '47 gCO2/kWh'
fr['esg']['commitments']['label'] = 'Engagements'
fr['esg']['commitments']['title'] = 'Engagements ESG'
fr['esg']['heroTitle1'] = 'Infrastructure'
fr['esg']['heroTitle2'] = 'Durable'
fr['esg']['report']['title'] = 'Rapport ESG 2025'

# events
fr['events']['cta']['sponsor']['title'] = 'Sponsor'
fr['events']['flagship']['attendees'] = '2 000+'
fr['events']['flagship']['title'] = 'Harch Summit 2026'
fr['events']['flagship']['year'] = '2026'
fr['events']['speaker']['form']['email'] = 'E-mail'
fr['events']['all'] = 'Tous'
fr['events']['filter'] = 'Filtrer'
fr['events']['register'] = 'S\'inscrire'

# faq
fr['faq']['breadcrumbs']['home'] = 'Accueil'
fr['faq']['categories']['company'] = 'Entreprise'
fr['faq']['categories']['infrastructure'] = 'Infrastructure'
fr['faq']['categories']['partnerships'] = 'Partenariats'
fr['faq']['categories']['pricing'] = 'Tarification'
fr['faq']['contact']['cta'] = 'Contacter le support'
fr['faq']['hero']['title'] = 'Questions fréquentes'
fr['faq']['items']['q5']['question'] = 'Dans quels pays opérez-vous ?'
fr['faq']['items']['q8']['question'] = 'Comment devenir partenaire ?'
fr['faq']['heroTitle'] = 'Questions fréquentes'

# footer
fr['footer']['architecture'] = 'Architecture'
fr['footer']['blog'] = 'Blog'
fr['footer']['business'] = 'Business'
fr['footer']['contact'] = 'Contact'
fr['footer']['documentation'] = 'Documentation'
fr['footer']['finance'] = 'Finance'
fr['footer']['guides'] = 'Guides'
fr['footer']['harchVentures'] = 'Harch Ventures'
fr['footer']['intelligence'] = 'Intelligence'
fr['footer']['newsletter'] = 'Newsletter'
fr['footer']['support'] = 'Support'
fr['footer']['systemStatus'] = 'Statut du système'

# glossary
fr['glossary']['heroLabel'] = 'Glossaire'
fr['glossary']['heroTitle'] = 'Glossaire technique'
fr['glossary']['title'] = 'Glossaire'

# harchos
fr['harchos']['navOverlay']['navigation'] = 'NAVIGATION'
fr['harchos']['navOverlay']['nav']['gotham'] = 'Intelligence'
fr['harchos']['navOverlay']['bottomLinks']['blog'] = 'Blog'
fr['harchos']['navOverlay']['bottomLinks']['contact'] = 'Contact'
fr['harchos']['hero']['stats']['hubs'] = 'Hubs'
fr['harchos']['hero']['stats']['carbon'] = 'gCO₂/kWh'
fr['harchos']['demo']['sovereign']['incidents24h'] = 'Incidents (24h)'
fr['harchos']['demo']['sovereign']['impactLabel'] = 'Impact'
fr['harchos']['demo']['carbon']['type'] = 'Type'
fr['harchos']['demo']['carbon']['bestHubName'] = 'Harch Ouarzazate'
fr['harchos']['workflow']['videoDuration'] = '2:34 min'
fr['harchos']['workflow']['video']['sidebar']['pipeline'] = 'Constructeur de pipeline'
fr['harchos']['workflow']['video']['sidebar']['workflows'] = 'Workflows'
fr['harchos']['workflow']['video']['pipelineBuilder'] = 'Constructeur de pipeline'
fr['harchos']['workflow']['video']['nodes']['transformType'] = 'RL + Transformer + GNN'
fr['harchos']['workflow']['nodes']['n1Sub'] = 'IoT / API / Satellite'
fr['harchos']['evaluate']['videoDuration'] = '1:58 min'
fr['harchos']['architecture']['sense']['subtitle'] = 'Perception'
fr['harchos']['architecture']['sense']['title'] = 'SENSE'
fr['harchos']['architecture']['think']['title'] = 'THINK'
fr['harchos']['specs']['totalGpus'] = 'GPUs totaux'
fr['harchos']['competitive']['coreweave']['name'] = 'CoreWeave'
fr['harchos']['competitive']['googleCloud']['name'] = 'Google Cloud (Hamina)'
fr['harchos']['competitive']['googleCloud']['m8Harch'] = '~47 gCO2/kWh'
fr['harchos']['competitive']['africaDataCentres']['m2Competitor'] = '30 MW'
fr['harchos']['competitive']['africaDataCentres']['m7Harch'] = '~47 gCO2/kWh'
fr['harchos']['competitive']['qscale']['name'] = 'QScale'
fr['harchos']['competitive']['qscale']['country'] = 'Canada'
fr['harchos']['competitive']['qscale']['m4Harch'] = '<5ms'
fr['harchos']['competitive']['qscale']['m4Competitor'] = '>150ms'
fr['harchos']['competitive']['qscale']['m8Harch'] = '~47 gCO2/kWh'
fr['harchos']['competitive']['qscale']['m8Competitor'] = '~30 gCO2/kWh (hydro)'
fr['harchos']['competitive']['lambdaLabs']['name'] = 'Lambda Labs'
fr['harchos']['competitive']['lambdaLabs']['m3Harch'] = '~47 gCO2/kWh'
fr['harchos']['competitive']['oracleCloud']['name'] = 'Oracle Cloud Infrastructure'
fr['harchos']['competitive']['oracleCloud']['m3Harch'] = '~47 gCO2/kWh'
fr['harchos']['competitive']['equinix']['name'] = 'Equinix'
fr['harchos']['competitive']['africaDataCentres']['country'] = 'Afrique du Sud'
fr['harchos']['competitive']['equinix']['m2Label'] = 'Présence africaine'
fr['harchos']['cta']['briefing'] = 'Briefing'
fr['harchos']['pageFooter']['regions'] = 'MA  EU  AF'
fr['harchos']['pageFooter']['social']['youtube'] = 'YOUTUBE'
fr['harchos']['pageFooter']['social']['linkedin'] = 'LINKEDIN'
fr['harchos']['pageFooter']['social']['github'] = 'GITHUB'
fr['harchos']['pageFooter']['offerings']['items']['i10'] = 'Streaming'
fr['harchos']['pageFooter']['documents']['title'] = 'DOCUMENTS'

# hiringProcess
fr['hiringProcess']['heroTitle'] = 'Processus de'
fr['hiringProcess']['heroTitle2'] = 'recrutement'
fr['hiringProcess']['phases']['application']['title'] = 'Candidature'
fr['hiringProcess']['phases']['interview']['title'] = 'Entretien final'
fr['hiringProcess']['timeline']['phase1'] = 'Semaine 1'
fr['hiringProcess']['timeline']['phase2'] = 'Semaine 1-2'
fr['hiringProcess']['timeline']['phase3'] = 'Semaine 2-3'
fr['hiringProcess']['timeline']['phase4'] = 'Semaine 3-4'
fr['hiringProcess']['timeline']['title'] = 'Chronologie'

# home
fr['home']['africaStats']['population']['label'] = 'Population'
fr['home']['africaStats']['gdp']['value'] = '2 700 Md$'
fr['home']['africaStats']['internet']['value'] = '570M'
fr['home']['africaStats']['title'] = 'L\'Afrique en chiffres'
fr['home']['africaStats']['urbanization']['label'] = 'Urbanisation'
fr['home']['investmentTable']['rows']['agriculture']['timeline'] = '2026-2029'
fr['home']['investmentTable']['rows']['agriculture']['vertical'] = 'Harch Agri'
fr['home']['investmentTable']['rows']['cement']['timeline'] = '2026-2028'
fr['home']['investmentTable']['rows']['energy']['capacity'] = '2GW+'
fr['home']['investmentTable']['rows']['energy']['timeline'] = '2025-2029'
fr['home']['investmentTable']['rows']['finance']['timeline'] = '2024-2030'
fr['home']['investmentTable']['rows']['finance']['vertical'] = 'Harch Finance'
fr['home']['investmentTable']['rows']['intelligence']['timeline'] = '2025-2027'
fr['home']['investmentTable']['rows']['intelligence']['vertical'] = 'Harch Intelligence'
fr['home']['investmentTable']['rows']['mining']['timeline'] = '2027-2030'
fr['home']['investmentTable']['rows']['technology']['timeline'] = '2025-2027'
fr['home']['investmentTable']['rows']['water']['timeline'] = '2026-2029'
fr['home']['investmentTable']['title'] = 'Pipeline d\'investissement'
fr['home']['roadmap']['title'] = 'Feuille de route'
fr['home']['roadmap']['2024']['year'] = '2024'
fr['home']['roadmap']['2025']['year'] = '2025'
fr['home']['roadmap']['2026']['year'] = '2026'
fr['home']['roadmap']['2027']['year'] = '2027'
fr['home']['roadmap']['2028']['year'] = '2028'
fr['home']['roadmap']['2030']['year'] = '2030'
fr['home']['stats']['carbonIntensity']['value'] = '~47 gCO2/kWh'
fr['home']['stats']['employment2030']['value'] = '25 000+'
fr['home']['stats']['renewableEnergy']['value'] = '81,5 %'
fr['home']['stats']['countries']['label'] = 'Pays couverts'
fr['home']['stats']['energy']['value'] = '2GW+'
fr['home']['stats']['gpus']['value'] = '1 798'
fr['home']['stats']['pipeline']['label'] = 'Pipeline d\'investissement'
fr['home']['stats']['pipeline']['value'] = '2,4 Md$+'
fr['home']['systemHealth']['services']['gpuCloud'] = 'Cloud GPU'
fr['home']['testimonials']['testimonial1']['author'] = 'Dr. Amina Benali'
fr['home']['testimonials']['testimonial2']['author'] = 'Jean-Pierre Kouassi'
fr['home']['testimonials']['testimonial3']['author'] = 'Fatima El Amrani'
fr['home']['testimonials']['testimonial4']['author'] = 'Ousmane Diallo'
fr['home']['caseStudy']['metricLabels']['nations'] = 'Nations'
fr['home']['ceoQuote']['author'] = 'Amine Harch El Korane'

# intelligence
fr['intelligence']['keyFeatures']['gpuClusters']['title'] = 'Clusters GPU de pointe'
fr['intelligence']['keyFeatures']['lowLatency']['title'] = 'Faible latence africaine'
fr['intelligence']['pricing']['onDemand'] = 'À la demande'
fr['intelligence']['pricing']['perHour'] = '/heure'
fr['intelligence']['pricing']['perMonth'] = '/mois'
fr['intelligence']['pricing']['reserved'] = 'Réservé'
fr['intelligence']['pricing']['spot'] = 'Spot'
fr['intelligence']['specs']['carbonIntensity'] = 'Intensité carbone'
fr['intelligence']['specs']['encryption'] = 'Chiffrement'
fr['intelligence']['specs']['hubs'] = 'Hubs'
fr['intelligence']['specs']['latency'] = 'Latence'
fr['intelligence']['specs']['renewableShare'] = 'Part renouvelable'
fr['intelligence']['specs']['totalGpus'] = 'GPUs totaux'
fr['intelligence']['specs']['uptime'] = 'Disponibilité'
fr['intelligence']['useCases']['startup']['title'] = 'Startups IA'
fr['intelligence']['useCases']['title'] = 'Cas d\'usage'
fr['intelligence']['features']['edgeComputing']['title'] = 'Informatique en périphérie'
fr['intelligence']['features']['sovereignAI']['title'] = 'IA Souveraine'
fr['intelligence']['heroLabel'] = 'Intelligence'
fr['intelligence']['heroTitle'] = 'Harch Intelligence'
fr['intelligence']['stats']['carbonIntensity']['label'] = 'gCO2/kWh'
fr['intelligence']['stats']['gpus']['value'] = '1 798'
fr['intelligence']['stats']['hubs']['label'] = 'Hubs'
fr['intelligence']['stats']['uptime']['value'] = '99,98 %'

# investors
fr['investors']['capitalAllocation']['agriculture'] = 'Agriculture — 145 M$'
fr['investors']['capitalAllocation']['finance'] = 'Finance — 95 M$'
fr['investors']['capitalAllocation']['intelligence'] = 'Intelligence — 320 M$'
fr['investors']['cta']['title'] = 'Devenir investisseur'
fr['investors']['documents']['esgReport'] = 'Rapport ESG'
fr['investors']['documents']['factSheet'] = 'Fiche synthétique'
fr['investors']['documents']['financialStatements'] = 'États financiers'
fr['investors']['documents']['title'] = 'Documents investisseurs'
fr['investors']['governance']['auditCommittee'] = 'Comité d\'audit'
fr['investors']['governance']['boardIndependence'] = 'Indépendance du conseil'
fr['investors']['governance']['compensationCommittee'] = 'Comité de rémunération'
fr['investors']['governance']['governanceCommittee'] = 'Comité de gouvernance'
fr['investors']['governance']['title'] = 'Gouvernance'
fr['investors']['keyFigures']['employmentTarget']['label'] = 'Objectif d\'emploi'
fr['investors']['keyFigures']['employmentTarget']['value'] = '25 000+'
fr['investors']['keyFigures']['investmentPipeline']['value'] = '2,4 Md$'
fr['investors']['keyFigures']['renewableShare']['label'] = 'Part renouvelable'
fr['investors']['keyFigures']['renewableShare']['value'] = '81,5 %'
fr['investors']['keyFigures']['targetMarkets']['label'] = 'Marchés cibles'
fr['investors']['keyFigures']['title'] = 'Chiffres clés'
fr['investors']['stats']['irr']['value'] = '18-25 %'
fr['investors']['heroTitle'] = 'Relations Investisseurs'

# learn
fr['learn']['certifications']['formatLabel'] = 'Format'
fr['learn']['certifications']['label'] = 'Certifications'
fr['learn']['courses']['title'] = 'Nos formations'
fr['learn']['heroLabel'] = 'Apprendre'
fr['learn']['heroTitle'] = 'Apprendre et Certifier'
fr['learn']['resources']['title'] = 'Ressources'
fr['learn']['title'] = 'Apprendre'

# legal
fr['legal']['codeOfConduct']['valueExcellence'] = 'Excellence'
fr['legal']['codeOfConduct']['valueRespect'] = 'Respect'
fr['legal']['cookies']['contactTitle'] = '7. Contact'
fr['legal']['modernSlavery']['ceoName'] = 'Amine Harch El Korane'
fr['legal']['modernSlavery']['approvalName'] = 'Amine Harch El Korane'
fr['legal']['modernSlavery']['approvalCompany'] = 'Harch Corp S.A.'
fr['legal']['sla']['tableHeaderType'] = 'Type'
fr['legal']['sla']['exclusionsTitle'] = 'Exclusions'
fr['legal']['sla']['contactTitle'] = 'Contact'

# nav
fr['nav']['blog'] = 'Blog'
fr['nav']['contact'] = 'Contact'
fr['nav']['deployments'] = 'Déploiements'
fr['nav']['docs'] = 'Documentation'
fr['nav']['intelligence'] = 'Intelligence'
fr['nav']['mission'] = 'Mission'
fr['nav']['news'] = 'Actualités'
fr['nav']['support'] = 'Support'
fr['nav']['thesis'] = 'Thèse'
fr['nav']['agriculture'] = 'Agriculture'
fr['nav']['cement'] = 'Ciment'
fr['nav']['finance'] = 'Finance'
fr['nav']['mining'] = 'Mines'
fr['nav']['partners'] = 'Partenaires'
fr['nav']['startupProgram'] = 'Programme startup'
fr['nav']['technology'] = 'Technologie'
fr['nav']['terms'] = 'Conditions'

# newsroom
fr['newsroom']['dispatchNotFound'] = 'Dispatch introuvable'
fr['newsroom']['executiveBios'] = 'Bios des dirigeants'
fr['newsroom']['factSheet'] = 'Fiche synthétique'
fr['newsroom']['mediaContact'] = 'Contact média'
fr['newsroom']['press'] = 'Presse'
fr['newsroom']['readFullDispatch'] = 'Lire le dispatch complet'
fr['newsroom']['allArticles'] = 'Tous les articles'
fr['newsroom']['articleNotFound'] = 'Article introuvable'
fr['newsroom']['contact'] = 'Contact presse'
fr['newsroom']['copyFeedUrl'] = 'Copier l\'URL du flux'
fr['newsroom']['emailPlaceholder'] = 'votre@email.com'
fr['newsroom']['mediaCoverage'] = 'Couverture médiatique'
fr['newsroom']['newsletter'] = 'Newsletter'
fr['newsroom']['newsletterDescription'] = 'Recevez nos communiqués et annonces directement.'
fr['newsroom']['pressReleases'] = 'Communiqués de presse'
fr['newsroom']['readArticle'] = 'Lire l\'article'
fr['newsroom']['rssFeed'] = 'Flux RSS'
fr['newsroom']['rssFeedDescription'] = 'Abonnez-vous au flux RSS.'
fr['newsroom']['stayInTheLoop'] = 'Restez informé'
fr['newsroom']['submitAPitch'] = 'Soumettre une proposition'
fr['newsroom']['subscribe'] = 'S\'abonner'
fr['newsroom']['subscribed'] = 'Inscrit'
fr['newsroom']['writeForUs'] = 'Soumettre un article'

# partners
fr['partners']['subtitle'] = 'Écosystème partenaires'
fr['partners']['heroLabel'] = 'Partenaires'
fr['partners']['heroTitle'] = 'Nos Partenaires'
fr['partners']['technology']['title'] = 'Partenaires technologiques'

# platform
fr['platform']['api']['authentication'] = 'Authentification'
fr['platform']['api']['documentation'] = 'Documentation API'
fr['platform']['api']['endpoints'] = 'Points de terminaison'
fr['platform']['api']['rateLimits'] = 'Limites de débit'
fr['platform']['api']['title'] = 'API HarchOS'
fr['platform']['api']['webhooks'] = 'Webhooks'
fr['platform']['capabilities']['predictiveMaintenance']['title'] = 'Maintenance prédictive'
fr['platform']['capabilities']['resourceOptimization']['title'] = 'Optimisation des ressources'
fr['platform']['integrations']['title'] = 'Intégrations'
fr['platform']['features']['title'] = 'Fonctionnalités'
fr['platform']['heroLabel'] = 'Plateforme'

# press
fr['press']['factSheet']['capital'] = 'Capital'
fr['press']['mediaContact']['phone'] = '+212 5XX-XXXXXX'
fr['press']['contact']['phone'] = '+212 522 000 002'
fr['press']['contact']['title'] = 'Contact presse'
fr['press']['heroLabel'] = 'Presse'

# pricing
fr['pricing']['calculator']['cta'] = 'Utiliser le calculateur'
fr['pricing']['gpuPricing']['vram'] = 'VRAM'
fr['pricing']['tiers']['professional']['period'] = '/mois'
fr['pricing']['tiers']['professional']['price'] = '2 500 $'
fr['pricing']['tiers']['starter']['period'] = '/mois'
fr['pricing']['heroLabel'] = 'Tarifs'
fr['pricing']['heroTitle'] = 'Tarification'
fr['pricing']['plans']['title'] = 'Nos offres'
fr['pricing']['calculator']['estimatedExcludesTaxes'] = 'Le coût estimé exclut les taxes et frais'

# privacy
fr['privacy']['dataCollection'] = 'Collecte de données'
fr['privacy']['dataCollectionText'] = 'Nous collectons les données personnelles que vous fournissez directement, telles que votre nom, adresse e-mail, organisation et détails de projet lors d\'une demande de devis ou de nous contacter. Nous collectons également automatiquement les données d\'utilisation, les informations sur l\'appareil et les cookies lors de votre visite sur notre site.'
fr['privacy']['dataSharing'] = 'Partage de données'
fr['privacy']['dataSharingText'] = 'Nous partageons vos données uniquement avec des prestataires de confiance qui contribuent à la fourniture de nos services, et uniquement sous des obligations contractuelles strictes. Nous ne vendons jamais vos données. Les transferts transfrontaliers sont protégés par des garanties appropriées.'
fr['privacy']['dataUse'] = 'Utilisation des données'
fr['privacy']['dataUseText'] = 'Nous utilisons vos données personnelles pour traiter vos demandes, fournir nos services, communiquer avec vous sur vos projets et améliorer notre plateforme. Nous ne vendons pas vos données personnelles à des tiers.'
fr['privacy']['internationalTransfers'] = 'Transferts internationaux'
fr['privacy']['internationalTransfersText'] = 'Lorsque des transferts de données hors du Maroc sont nécessaires, nous assurons une protection adéquate par le biais de Clauses Contractuelles Types, de décisions d\'adéquation ou d\'autres mécanismes conformes à la Loi 09-08 et au RGPD.'
fr['privacy']['sections']['contact']['title'] = 'Contact'
fr['privacy']['sections']['rights']['title'] = 'Vos droits'
fr['privacy']['title'] = 'Politique de confidentialité'
fr['privacy']['lastUpdatedDate'] = 'Janvier 2026'

# quote
fr['quote']['step1']['verticals']['agriculture']['name'] = 'Harch Agri'
fr['quote']['step1']['verticals']['finance']['name'] = 'Harch Finance'
fr['quote']['step1']['verticals']['intelligence']['name'] = 'Harch Intelligence'
fr['quote']['step2']['countries']['ghana'] = 'Ghana'
fr['quote']['step2']['countries']['kenya'] = 'Kenya'
fr['quote']['step2']['countries']['mali'] = 'Mali'
fr['quote']['step2']['countries']['burkinaFaso'] = 'Burkina Faso'
fr['quote']['step2']['countries']['france'] = 'France'
fr['quote']['step2']['projectTypes']['cement']['newPlant']['ex2'] = 'Expansion'
fr['quote']['step2']['projectTypes']['water']['treatment']['ex2'] = 'Purification'
fr['quote']['step2']['projectTypes']['finance']['islamicFinance']['ex2'] = 'Murabaha'
fr['quote']['step3']['phonePlaceholder'] = '+212 / +221 / +220 ...'
fr['quote']['form']['step1']['fields']['email'] = 'Adresse e-mail'
fr['quote']['form']['step1']['fields']['name'] = 'Nom complet'
fr['quote']['form']['step1']['fields']['organization'] = 'Organisation'
fr['quote']['form']['step1']['fields']['projectType'] = 'Type de projet'
fr['quote']['form']['step1']['fields']['projectTypes']['cement'] = 'Infrastructure ciment'
fr['quote']['form']['step1']['fields']['projectTypes']['finance'] = 'Financement'
fr['quote']['form']['step1']['fields']['projectTypes']['gpuCloud'] = 'Cloud GPU'
fr['quote']['form']['step1']['fields']['projectTypes']['other'] = 'Autre'
fr['quote']['form']['step1']['fields']['projectTypes']['water'] = 'Infrastructure hydrique'
fr['quote']['form']['step1']['title'] = 'Votre projet'
fr['quote']['form']['step4']['submit'] = 'Soumettre la demande de devis'
fr['quote']['form']['step4']['submitting'] = 'Envoi en cours...'
fr['quote']['form']['step4']['title'] = 'Confirmation'
fr['quote']['heroLabel'] = 'Devis'
fr['quote']['heroTitle'] = 'Demander un Devis'

# quoteReceived
fr['quoteReceived']['nextSteps']['step1']['title'] = 'Confirmation'
fr['quoteReceived']['nextSteps']['step2']['title'] = 'Analyse'
fr['quoteReceived']['nextSteps']['step3']['title'] = 'Proposition'
fr['quoteReceived']['nextSteps']['step4']['title'] = 'Briefing'
fr['quoteReceived']['cta']['primary'] = 'Explorer la plateforme'
fr['quoteReceived']['cta']['secondary'] = 'Retour à l\'accueil'
fr['quoteReceived']['heroTitle'] = 'Demande reçue'

# sidebar
fr['sidebar']['apiReference'] = 'Réf. API'
fr['sidebar']['architecture'] = 'Architecture'
fr['sidebar']['blog'] = 'Blog'
fr['sidebar']['business'] = 'Business'
fr['sidebar']['casablanca'] = 'Casablanca'
fr['sidebar']['changelog'] = 'Changelog'
fr['sidebar']['ctas']['investor'] = 'Relations Investisseurs'
fr['sidebar']['documentation'] = 'Documentation'
fr['sidebar']['finance'] = 'Finance'
fr['sidebar']['harchVentures'] = 'Harch Ventures'
fr['sidebar']['intelligence'] = 'Intelligence'
fr['sidebar']['labels']['blog'] = 'Blog'
fr['sidebar']['labels']['contact'] = 'Contact'
fr['sidebar']['labels']['docs'] = 'Documentation'
fr['sidebar']['labels']['intelligence'] = 'Intelligence'
fr['sidebar']['labels']['mission'] = 'Mission'
fr['sidebar']['labels']['support'] = 'Support'
fr['sidebar']['mission'] = 'Mission'
fr['sidebar']['support'] = 'Support'
fr['sidebar']['title'] = 'Navigation'
fr['sidebar']['globalPresence'] = 'Présence mondiale'

# startupProgram
fr['startupProgram']['benefitsLabel'] = 'Programme Startup'
fr['startupProgram']['benefitsTitle'] = 'Programme Startup'
fr['startupProgram']['ctaTitle'] = 'Programme Startup'
fr['startupProgram']['processLabel'] = 'Programme Startup'
fr['startupProgram']['processTitle'] = 'Programme Startup'
fr['startupProgram']['alumni']['description'] = 'Startups qui ont bénéficié du programme.'
fr['startupProgram']['alumni']['title'] = 'Alumni'
fr['startupProgram']['apply']['cta'] = 'Soumettre une candidature'
fr['startupProgram']['apply']['title'] = 'Postuler'
fr['startupProgram']['heroLabel'] = 'Startup'
fr['startupProgram']['heroTitle'] = 'Programme Startup'
fr['startupProgram']['title'] = 'Programme startup'

# strategy
fr['strategy']['subtitle'] = 'Intégration verticale, souveraineté industrielle, exécution continentale'
fr['strategy']['title'] = 'Notre Stratégie'
fr['strategy']['pillars']['sovereignByDesign'] = {
    'description': 'Chaque système, centre de données et réseau que nous construisons est conçu avec la souveraineté des données et l\'autonomie opérationnelle comme principes fondamentaux. Aucune dépendance étrangère, aucun contrôle externe.',
    'title': 'Souverain par conception'
}

# subsidiaries
fr['subsidiaries']['agriculture']['heroBadge'] = 'Harch Agri'
fr['subsidiaries']['agriculture']['heroSubtitle'] = 'Agriculture de précision alimentée par l\'IA, les capteurs IoT et la technologie drone pour optimiser les rendements sur les terres agricoles africaines.'
fr['subsidiaries']['agriculture']['heroTitle'] = 'Agriculture de précision'
fr['subsidiaries']['agriculture']['iotSensorSubtitle'] = 'Surveillance en temps réel des sols et des cultures dans toutes les zones de déploiement.'
fr['subsidiaries']['agriculture']['iotSensorTitle'] = 'Réseau de capteurs IoT'
fr['subsidiaries']['agriculture']['liveMonitoringLabel'] = 'Surveillance en direct'
fr['subsidiaries']['agriculture']['competitiveAdvantageLabel'] = 'Avantage concurrentiel'
fr['subsidiaries']['agriculture']['competitiveAdvantageTitle'] = 'Notre avantage concurrentiel'
fr['subsidiaries']['agriculture']['competitiveAnalysisLabel'] = 'Analyse concurrentielle'
fr['subsidiaries']['agriculture']['competitiveAnalysisSubtitle'] = 'Comment HarchAgri se compare aux concurrents mondiaux de l\'agritech.'
fr['subsidiaries']['agriculture']['competitiveAnalysisTitle'] = 'Position sur le marché'
fr['subsidiaries']['agriculture']['overview'] = 'HarchAgri fournit une agriculture de précision grâce à une pile intégrée de capteurs IoT, de surveillance par drone et de technologie d\'agriculture verticale — conçue pour les terres agricoles africaines.'
fr['subsidiaries']['agriculture']['partnershipsSubtitle'] = 'Des partenariats stratégiques au service de la souveraineté agricole africaine.'
fr['subsidiaries']['agriculture']['pricingSubtitle'] = 'Tarification transparente pour chaque échelle d\'opération.'
fr['subsidiaries']['agriculture']['metrics'] = {
    'foodImports': 'L\'Afrique importe plus de 35 Md$ de nourriture par an',
    'postHarvestLosses': '30 à 40 % des récoltes africaines sont perdues après récolte',
    'smallholderFarmers': '80 % des exploitations africaines sont des petites exploitations',
    'uncultivatedArableLand': '60 % des terres arables non cultivées du monde se trouvent en Afrique'
}
fr['subsidiaries']['agriculture']['title'] = 'Agriculture'
fr['subsidiaries']['finance']['title'] = 'Finance'
fr['subsidiaries']['finance']['crossVerticalDesc'] = 'Harch Finance fournit des services financiers intégrés à travers toutes les filiales de Harch Corp — du financement de projets et des obligations vertes au commerce et à la monétisation de crédits carbone.'
fr['subsidiaries']['sectors']['finance'] = 'Finance'
fr['subsidiaries']['detail']['backToSubsidiaries'] = 'Retour aux filiales'
fr['subsidiaries']['detail']['contact'] = 'Contact'
fr['subsidiaries']['detail']['leadership'] = 'Direction'
fr['subsidiaries']['detail']['technology'] = 'Technologie'
fr['subsidiaries']['heroLabel'] = 'Filiales'
fr['subsidiaries']['agriculture']['competitiveAnalysis'] = {
    'africa': 'Présence africaine',
    'africaPresence': 'Présence active dans plus de 5 pays africains',
    'africaPresenceValue': '5+ pays',
    'differentiator': 'Différenciateur clé',
    'differentiatorNote': 'Stack entièrement intégrée de l\'IoT au marché',
    'differentiatorValue': 'Intégration verticale',
    'farmers': 'Agriculteurs desservis',
    'funding': 'Financement levé',
    'harchAdvantage': 'Avantage Harch Corp',
    'harchAgriTagline': 'Agriculture souveraine pour l\'Afrique',
    'keyWeakness': 'Faiblesse clé',
    'model': 'Modèle économique',
    'modelValue': 'Agriculture de précision intégrée',
    'revenue': 'Chiffre d\'affaires annuel',
    'target2031': 'Objectif 2031',
    'target2031Value': 'CA de 500M$+'
}
fr['subsidiaries']['agriculture']['competitors'] = {
    'aerofarms': {
        'advantage': 'Technologie de ferme verticale de pointe avec ROI éprouvé',
        'africa': 'Aucune présence africaine — concentré sur les marchés américains et asiatiques',
        'country': 'États-Unis',
        'farmers': 'Non applicable — exploite ses propres installations',
        'funding': 'Plus de 238 M$ levés',
        'maturity': 'Phase avancée (opérationnel depuis 2015)',
        'model': 'Fermes verticales en propriété-exploitation',
        'name': 'AeroFarms',
        'revenue': '~30 M$ (estimé)',
        'weakness': 'Aucune opération africaine ; coûts opérationnels élevés ; variété de cultures limitée'
    },
    'apollo': {
        'advantage': 'Plateforme de prêt numérique solide pour les petits exploitants',
        'africa': 'Actif au Kenya et en expansion en Afrique de l\'Est',
        'country': 'Kenya',
        'farmers': 'Plus de 100 000 agriculteurs',
        'funding': 'Plus de 60 M$ levés',
        'maturity': 'Phase de croissance (fondé en 2016)',
        'model': 'Prêt numérique + intrants agricoles',
        'name': 'Apollo Agriculture',
        'revenue': '~15 M$ (estimé)',
        'weakness': 'Limité à l\'Afrique de l\'Est ; pas d\'intégration verticale ; exposition au risque de crédit'
    },
    'climateCorp': {
        'advantage': 'Modélisation avancée des risques climatiques soutenue par Bayer',
        'africa': 'Minime — principalement concentré sur les marchés développés',
        'country': 'États-Unis',
        'farmers': 'Plus de 300M d\'acres assurés (mondial)',
        'funding': 'Acquis par Bayer pour 630 M$',
        'maturity': 'Mature (acquis)',
        'model': 'Assurance + analytique de données agricoles',
        'name': 'Climate Corp',
        'revenue': 'Intégré dans Bayer Digital Farming',
        'weakness': 'Pas de focus africain ; modèle basé sur l\'assurance limite la portée ; pas d\'intégration matérielle'
    },
    'ocp': {
        'advantage': 'Producteur de phosphate dominant avec soutien gouvernemental',
        'africa': 'Basé au Maroc — forte présence continentale',
        'country': 'Maroc',
        'farmers': 'Partenariat avec plus de 50 000 agriculteurs via OCP Agri',
        'funding': 'Coté en bourse — capitalisation de plus de 40 Md$',
        'maturity': 'Mature (fondé en 1920)',
        'model': 'Production d\'engrais + services agricoles',
        'name': 'Groupe OCP',
        'revenue': 'Plus de 9 Md$ (chiffre d\'affaires groupe)',
        'weakness': 'Focus uniquement sur les engrais ; pas de technologie de précision ; lente transformation numérique'
    },
    'twiga': {
        'advantage': 'Plus grande plateforme B2B de distribution alimentaire en Afrique de l\'Est',
        'africa': 'Actif au Kenya — expansion vers l\'Ouganda et la Tanzanie',
        'country': 'Kenya',
        'farmers': 'Plus de 140 000 agriculteurs sur la plateforme',
        'funding': 'Plus de 110 M$ levés',
        'maturity': 'Phase de croissance (fondé en 2014)',
        'model': 'Marketplace + logistique pour produits agricoles',
        'name': 'Twiga Foods',
        'revenue': '~50 M$ (estimé)',
        'weakness': 'Modèle marketplace uniquement ; pas de technologie de production ; limité à l\'Afrique de l\'Est'
    }
}
fr['subsidiaries']['agriculture']['locations'] = {
    'agadir': {'city': 'Agadir', 'crops': 'Tomates, Agrumes, Baies', 'region': 'Souss-Massa'},
    'casablanca': {'city': 'Casablanca', 'crops': 'Légumes, Herbes, Légumes-feuilles', 'region': 'Casablanca-Settat'},
    'marrakech': {'city': 'Marrakech', 'crops': 'Olives, Grenades, Safran', 'region': 'Marrakech-Safi'},
    'rabat': {'city': 'Rabat', 'crops': 'Fraises, Carottes, Céréales', 'region': 'Rabat-Salé-Kénitra'},
    'tangier': {'city': 'Tanger', 'crops': 'Cannabis (légal), Figues, Raisins', 'region': 'Tanger-Tetouan-Al Hoceima'}
}
fr['subsidiaries']['agriculture']['marketAnalysis'] = {
    'africaMaturity': 'Croissance précoce',
    'cagr': 'TCAC de 12,4 %',
    'footnote': 'Tailles de marché basées sur les estimations de 2024. TCAC projeté jusqu\'en 2030.',
    'marketSize': 'Marché adressable de plus de 45 Md$',
    'opportunity': 'Élevée — sous-exploitée avec des fondamentaux solides',
    'segment': 'Marché AgriTech africain',
    'title': 'Analyse de marché agricole',
    'rows': {
        'drones': {'cagr': '18,2 %', 'maturity': 'Émergent', 'opportunity': 'Très élevée', 'segment': 'Drones agricoles', 'size': '1,2 Md$'},
        'iot': {'cagr': '15,7 %', 'maturity': 'Croissance précoce', 'opportunity': 'Élevée', 'segment': 'Capteurs IoT & Surveillance', 'size': '800 M$'},
        'marketplace': {'cagr': '22,3 %', 'maturity': 'Croissance', 'opportunity': 'Très élevée', 'segment': 'Plateformes marketplace agricoles', 'size': '2,1 Md$'},
        'carbonCredits': {'cagr': '28,5 %', 'maturity': 'Émergent', 'opportunity': 'Très élevée', 'segment': 'Crédits carbone agricoles', 'size': '400 M$'},
        'verticalFarming': {'cagr': '24,1 %', 'maturity': 'Émergent', 'opportunity': 'Élevée', 'segment': 'Systèmes de ferme verticale', 'size': '900 M$'}
    }
}
fr['subsidiaries']['agriculture']['partners'] = {
    'fao': {
        'country': 'International (siège à Rome)',
        'harchContribution': 'Plateforme de surveillance IoT et analytique de données',
        'partnerContribution': 'Expertise agronomique et cadres politiques',
        'priority': 'Élevée',
        'status': 'Actif',
        'type': 'Institutionnel'
    },
    'isra': {
        'country': 'Maroc',
        'harchContribution': 'Déploiement de technologie d\'agriculture de précision',
        'partnerContribution': 'Recherche agronomique et expertise terrain',
        'priority': 'Moyenne',
        'status': 'Actif',
        'type': 'Recherche'
    },
    'ocp': {
        'country': 'Maroc',
        'harchContribution': 'Capteurs IoT et plateforme d\'agriculture numérique',
        'partnerContribution': 'Chaîne d\'approvisionnement en engrais et réseau de distribution',
        'priority': 'Élevée',
        'status': 'Actif',
        'type': 'Stratégique'
    },
    'agritechKenya': {
        'country': 'Kenya',
        'harchContribution': 'Plateforme technologique et surveillance par drone',
        'partnerContribution': 'Accès au marché local et réseaux d\'agriculteurs',
        'priority': 'Moyenne',
        'status': 'Planifié',
        'type': 'Technologie'
    },
    'greenPlan': {
        'status': 'Actif',
        'type': 'Gouvernemental'
    }
}
fr['subsidiaries']['agriculture']['pricing'] = {
    'carbon': {'price': 'Nous contacter pour les tarifs', 'product': 'Vérification de crédits carbone', 'roi': '3 à 5x sur 5 ans', 'target': 'Entreprises soucieuses du carbone', 'unit': 'Par tonne de crédit'},
    'drone': {'price': 'À partir de 2 500 $/saison', 'product': 'Package de surveillance par drone', 'roi': 'Amélioration du rendement de 5 à 8x', 'target': 'Exploitations à grande échelle', 'unit': 'Par hectare'},
    'iot': {'price': 'À partir de 500 $/mois', 'product': 'Suite de capteurs IoT', 'roi': 'Économies de coûts de 4 à 6x', 'target': 'Exploitations de taille moyenne aux entreprises', 'unit': 'Par nœud de capteur'},
    'vertical': {'price': 'Tarification sur mesure', 'product': 'Module de ferme verticale', 'roi': 'CA de 8 à 12x vs. traditionnel', 'target': 'Opérateurs d\'agriculture urbaine', 'unit': 'Par module'},
    'price': 'Tarification', 'product': 'Produit', 'roi': 'ROI', 'target': 'Client cible', 'unit': 'Unité'
}
fr['subsidiaries']['agriculture']['products'] = {
    'carbon': {'roi': '3 à 5x', 'tagline': 'Monétisez la séquestration carbone de votre ferme', 'target': 'Pipeline de 5 M$+', 'unit': 'Par tCO2e'},
    'drone': {'roi': '5 à 8x', 'tagline': 'Intelligence aérienne pour chaque hectare', 'target': '10 000+ ha surveillés', 'unit': 'Par heure de vol'},
    'iot': {'roi': '4 à 6x', 'tagline': 'Surveillance de précision du sol au cloud', 'target': '5 000+ capteurs déployés', 'unit': 'Par capteur'},
    'vertical': {'roi': '8 à 12x', 'tagline': 'Production toute l\'année dans tous les climats', 'target': '6 modules opérationnels', 'unit': 'Par module'}
}

# subsidiaryDetail
fr['subsidiaryDetail']['phase'] = 'Phase'
fr['subsidiaryDetail']['intelligence']['name'] = 'Harch Intelligence'
fr['subsidiaryDetail']['intelligence']['version'] = '/0.1'
fr['subsidiaryDetail']['intelligence']['competitorAccentColor'] = '#8B9DAF'
fr['subsidiaryDetail']['cement']['version'] = '/0.2'
fr['subsidiaryDetail']['cement']['competitorAccentColor'] = '#8B9DAF'
fr['subsidiaryDetail']['energy']['version'] = '/0.3'
fr['subsidiaryDetail']['energy']['location'] = 'Région du Sahel'
fr['subsidiaryDetail']['energy']['competitorAccentColor'] = '#8B9DAF'
fr['subsidiaryDetail']['technology']['version'] = '/0.4'
fr['subsidiaryDetail']['technology']['competitorAccentColor'] = '#8B9DAF'
fr['subsidiaryDetail']['mining']['version'] = '/0.5'
fr['subsidiaryDetail']['mining']['competitorAccentColor'] = '#8B9DAF'
fr['subsidiaryDetail']['agriculture']['name'] = 'Harch Agri'
fr['subsidiaryDetail']['agriculture']['version'] = '/0.6'
fr['subsidiaryDetail']['agriculture']['competitorHarchName'] = 'Harch Agri'
fr['subsidiaryDetail']['agriculture']['competitorAccentColor'] = '#4A7B5F'
fr['subsidiaryDetail']['water']['version'] = '/0.7'
fr['subsidiaryDetail']['water']['location'] = 'Mali'
fr['subsidiaryDetail']['water']['competitorAccentColor'] = '#8B9DAF'
fr['subsidiaryDetail']['applyNow'] = 'Postuler'
fr['subsidiaryDetail']['blog'] = 'Blog'
fr['subsidiaryDetail']['certifications'] = 'Certifications'
fr['subsidiaryDetail']['contact'] = 'Contact'
fr['subsidiaryDetail']['culture'] = 'Culture'
fr['subsidiaryDetail']['description'] = 'Description de la filiale'
fr['subsidiaryDetail']['documentation'] = 'Documentation'
fr['subsidiaryDetail']['growth'] = 'Croissance'
fr['subsidiaryDetail']['investmentPipeline'] = 'Pipeline d\'investissement'
fr['subsidiaryDetail']['mission'] = 'Mission'
fr['subsidiaryDetail']['openPositions'] = 'Postes ouverts'
fr['subsidiaryDetail']['partnerships'] = 'Partenariats'
fr['subsidiaryDetail']['press'] = 'Presse'
fr['subsidiaryDetail']['resources'] = 'Ressources'
fr['subsidiaryDetail']['revenue'] = 'Chiffre d\'affaires'
fr['subsidiaryDetail']['riskFactors'] = 'Facteurs de risque'
fr['subsidiaryDetail']['support'] = 'Support'
fr['subsidiaryDetail']['values'] = 'Valeurs'
fr['subsidiaryDetail']['viewAll'] = 'Voir tout'
fr['subsidiaryDetail']['vision'] = 'Vision'
fr['subsidiaryDetail']['operationalStatus'] = 'Statut opérationnel'

# support
fr['support']['title'] = 'Support'
fr['support']['channels']['title'] = 'Nos canaux'
fr['support']['contact']['phone'] = '+212 522 000 000'
fr['support']['contact']['portal'] = 'Portail client'
fr['support']['contact']['title'] = 'Nous contacter'
fr['support']['heroLabel'] = 'Support'
fr['support']['heroTitle'] = 'Centre de Support'
fr['support']['sla']['incidents'] = 'Gestion des incidents'
fr['support']['sla']['title'] = 'Accord de niveau de service'
fr['support']['sla']['uptime'] = '99,98 %'

# terms
fr['terms']['acceptance'] = 'Acceptation'
fr['terms']['accuracy'] = 'Exactitude des informations'
fr['terms']['contact'] = 'Contact'
fr['terms']['disclaimer'] = 'Avertissement'
fr['terms']['limitation'] = 'Limitation de responsabilité'
fr['terms']['links'] = 'Liens vers des tiers'
fr['terms']['modifications'] = 'Modifications'
fr['terms']['services'] = 'Services'
fr['terms']['heroLabel'] = 'Conditions'
fr['terms']['heroTitle'] = 'Conditions d\'Utilisation'
fr['terms']['sections']['acceptance']['title'] = 'Acceptation'
fr['terms']['sections']['contact']['title'] = 'Contact'
fr['terms']['sections']['governing']['description'] = 'Juridiction et droit applicable.'
fr['terms']['sections']['governing']['title'] = 'Droit applicable'
fr['terms']['sections']['limitations']['title'] = 'Limitations'
fr['terms']['sections']['modifications']['title'] = 'Modifications'
fr['terms']['sections']['obligations']['title'] = 'Obligations'
fr['terms']['sections']['services']['title'] = 'Services'
fr['terms']['sections']['services']['description'] = 'Description des services fournis par Harch Corp.'
fr['terms']['sections']['termination']['title'] = 'Résiliation'
fr['terms']['sections']['termination']['description'] = 'Conditions de résiliation des services.'

# thesis
fr['thesis']['competitiveAdvantage']['moats']['carbonAdvantage']['title'] = 'Avantage carbone'
fr['thesis']['competitiveAdvantage']['moats']['geographicPosition']['title'] = 'Position géographique'
fr['thesis']['competitiveAdvantage']['title'] = 'Avantage concurrentiel'
fr['thesis']['marketOpportunity']['sam']['label'] = 'Marché adressable accessible'
fr['thesis']['marketOpportunity']['sam']['value'] = '120 Md$+'
fr['thesis']['marketOpportunity']['som']['label'] = 'Marché obtainable accessible'
fr['thesis']['marketOpportunity']['som']['value'] = '2,4 Md$+'
fr['thesis']['marketOpportunity']['tam']['label'] = 'Marché total adressable'
fr['thesis']['marketOpportunity']['tam']['value'] = '2 000 Md$+'
fr['thesis']['marketOpportunity']['title'] = 'Opportunité de marché'
fr['thesis']['theProblem']['dependencies']['food']['title'] = 'Insécurité alimentaire'
fr['thesis']['theProblem']['dependencies']['materials']['title'] = 'Fuite de matériaux'
fr['thesis']['theSolution']['pillars']['finance']['title'] = 'Architecture financière'
fr['thesis']['theSolution']['pillars']['materials']['title'] = 'Matériaux intégrés'
fr['thesis']['coreThesis']['title'] = 'Thèse centrale'
fr['thesis']['heroLabel'] = 'Thèse'
fr['thesis']['heroTitle'] = 'Notre Thèse d\'Investissement'

# trust
fr['trust']['aiEthics']['bias']['title'] = 'Anti-biais'
fr['trust']['aiEthics']['governance']['title'] = 'Gouvernance'
fr['trust']['architecture'] = 'Architecture'
fr['trust']['compliance']['certifications']['label'] = 'Certifications'
fr['trust']['compliance']['certifications']['title'] = 'Certifications'
fr['trust']['compliance']['audits']['title'] = 'Audits'
fr['trust']['compliance']['policies']['title'] = 'Politiques'
fr['trust']['compliance']['reports']['title'] = 'Rapports'
fr['trust']['security']['bulletins']['label'] = 'Bulletins'
fr['trust']['security']['encryption']['title'] = 'Chiffrement'
fr['trust']['security']['monitoring']['title'] = 'Surveillance'
fr['trust']['heroLabel'] = 'Confiance'
fr['trust']['aiEthics']['transparency']['explainability']['status'] = 'Actif'
fr['trust']['compliance']['auditReports']['pentest']['period'] = 'Annuel'
fr['trust']['compliance']['auditReports']['pentest']['type'] = 'Test de pénétration'

# status
fr['status']['servicesLabel'] = 'Services'
fr['status']['incidentsLabel'] = 'Incidents'
fr['status']['maintenanceLabel'] = 'Maintenance'
fr['status']['maintenanceServices'] = 'HarchOS Core API & THINK AI Engine'
fr['status']['notificationsLabel'] = 'Notifications'
fr['status']['services']['harchosCoreApi']['name'] = 'API HarchOS Core'
fr['status']['services']['thinkAiEngine']['name'] = 'THINK AI Engine'
fr['status']['services']['actExecutionLayer']['name'] = 'Couche d\'exécution ACT'
fr['status']['services']['developerPortal']['name'] = 'Portail développeur'
fr['status']['services']['cliSdkServices']['name'] = 'Services CLI & SDK'
fr['status']['services']['managementConsole']['name'] = 'Console de gestion'
fr['status']['services']['authenticationService']['name'] = 'Service d\'authentification'
fr['status']['services']['dataVaultStorage']['name'] = 'Stockage DataVault'
fr['status']['services']['harchFinanceApi']['name'] = 'API Harch Finance'
fr['status']['services']['harchagriIot']['description'] = 'Capteurs IoT agricoles et plateforme de surveillance'
fr['status']['services']['harchagriIot']['name'] = 'IoT HarchAgri'
fr['status']['services']['sovereignNetVpn']['name'] = 'VPN SovereignNet'
fr['status']['heroTitle'] = 'Statut du système'
fr['status']['serviceStatusTitle'] = 'Statut des services'
fr['status']['allSystemsOperationalDescription'] = 'Tous les services Harch Corp fonctionnent normalement.'

# charts
fr['charts']['esgRadar']['innovation'] = 'Innovation'
fr['charts']['portfolioDistribution']['intelligence'] = 'Intelligence'
fr['charts']['portfolioDistribution']['agri'] = 'Agri'
fr['charts']['portfolioDistribution']['finance'] = 'Finance'
fr['charts']['gpuUtilization']['casablanca'] = 'Casablanca'
fr['charts']['gpuUtilization']['dakhla'] = 'Dakhla'
fr['charts']['gpuUtilization']['marrakech'] = 'Marrakech'
fr['charts']['gpuUtilization']['oujda'] = 'Oujda'
fr['charts']['investmentPipeline']['intelligence'] = 'Intelligence'
fr['charts']['investmentPipeline']['agri'] = 'Agri'
fr['charts']['investmentPipeline']['finance'] = 'Finance'

# harchagri
fr['harchagri']['competitorComparison']['competitors']['twiga']['country'] = 'Kenya'
fr['harchagri']['competitorComparison']['competitors']['twiga']['model'] = 'Commission 8-12 %'
fr['harchagri']['competitorComparison']['competitors']['apollo']['country'] = 'Kenya'
fr['harchagri']['competitorComparison']['harchAgri']['title'] = 'Harch Agri'
fr['harchagri']['productCards']['products']['drone']['name'] = 'HarchAgri Drone'
fr['harchagri']['productCards']['products']['iot']['name'] = 'HarchAgri IoT'
fr['harchagri']['productCards']['products']['vertical']['name'] = 'HarchAgri Vertical'
fr['harchagri']['productCards']['products']['carbon']['stats']['avgRevenue'] = 'CA moyen'
fr['harchagri']['partnerships']['partners']['agtechKenya']['country'] = 'Kenya'
fr['harchagri']['partnerships']['partners']['ghanaMofa']['country'] = 'Ghana'
fr['harchagri']['iotDashboard']['tempC'] = 'Temp °C'
fr['harchagri']['africaMap']['hectares'] = 'Hectares'
fr['harchagri']['africaMap']['hubs']['casablanca']['type'] = 'IoT + Drones'
fr['harchagri']['africaMap']['hubs']['nairobi']['country'] = 'Kenya'
fr['harchagri']['africaMap']['hubs']['accra']['country'] = 'Ghana'
fr['harchagri']['africaMap']['hubs']['accra']['type'] = 'IoT + Vertical'

# immersiveHero / networkOntology
fr['immersiveHero']['harchCorp'] = 'HARCH CORP'
fr['networkOntology']['harchCorp'] = 'HARCH CORP'
fr['networkOntology']['verticals']['intelligence'] = 'Intelligence'
fr['networkOntology']['verticals']['agri'] = 'Agri'
fr['networkOntology']['verticals']['finance'] = 'Finance'

# africaMap / worldMap
fr['africaMap']['locations']['casa']['name'] = 'Casablanca'
fr['africaMap']['locations']['dakhla']['name'] = 'Dakhla'
fr['africaMap']['locations']['dakhla']['vertical'] = 'Intelligence'
fr['africaMap']['locations']['banjul']['name'] = 'Banjul'
fr['africaMap']['locations']['nouakchott']['name'] = 'Nouakchott'
fr['africaMap']['locations']['dakar']['name'] = 'Dakar'
fr['africaMap']['locations']['dakar']['vertical'] = 'Agri'
fr['africaMap']['locations']['bamako']['name'] = 'Bamako'
fr['africaMap']['locations']['sahel']['name'] = 'Sahel'
fr['worldMap']['locations']['casablanca']['name'] = 'Casablanca'
fr['worldMap']['locations']['dakhla']['name'] = 'Dakhla'
fr['worldMap']['locations']['dakhla']['vertical'] = 'Intelligence'
fr['worldMap']['locations']['senegal']['vertical'] = 'Agri'
fr['worldMap']['locations']['mali']['name'] = 'Mali'
fr['worldMap']['locations']['sahel']['name'] = 'Région du Sahel'

# competitive
fr['competitive']['verdict'] = 'Verdict'

# interactivePlatform
fr['interactivePlatform']['intelligence']['headerTabs']['hubs'] = 'Hubs'
fr['interactivePlatform']['intelligence']['headerTabs']['terminal'] = 'Terminal'
fr['interactivePlatform']['intelligence']['gpus'] = 'GPUs'
fr['interactivePlatform']['intelligence']['carbonRatings']['optimal'] = 'Optimal'
fr['interactivePlatform']['intelligence']['energySources']['hydro'] = 'Hydro'
fr['interactivePlatform']['intelligence']['hubStatuses']['staging'] = 'Staging'
fr['interactivePlatform']['intelligence']['sidebarLabels']['gpuStatus'] = 'Statut GPU'
fr['interactivePlatform']['supplyChain']['infrastructure'] = 'Infrastructure'
fr['interactivePlatform']['supplyChain']['distribution'] = 'Distribution'
fr['interactivePlatform']['supplyChain']['auto'] = 'Auto'
fr['interactivePlatform']['operations']['headerTabs']['incidents'] = 'Incidents'
fr['interactivePlatform']['operations']['verticalStatus'] = 'Statut vertical'
fr['interactivePlatform']['agriculture']['sidebarLabels']['irrigation'] = 'Irrigation'
fr['interactivePlatform']['agriculture']['headerTabs']['irrigation'] = 'Irrigation'
fr['interactivePlatform']['agriculture']['cropNames']['millet'] = 'Millet'
fr['interactivePlatform']['agriculture']['zone'] = 'Zone'
fr['interactivePlatform']['agriculture']['supplyStages']['transport'] = 'Transport'
fr['interactivePlatform']['agriculture']['carbonCreditLabels']['tco2Total'] = 'tCO2 Total'
fr['interactivePlatform']['agriculture']['sidebar']['soilNutrients']['potassium'] = 'Potassium'
fr['interactivePlatform']['agriculture']['supplyStatuses']['active'] = 'Actif'
fr['interactivePlatform']['agriculture']['supplyStatuses']['pending'] = 'En attente'
fr['interactivePlatform']['agriculture']['supplyStatuses']['complete'] = 'Complet'
fr['interactivePlatform']['agriculture']['containerStatuses']['growing'] = 'En croissance'
fr['interactivePlatform']['agriculture']['containerStatuses']['ready'] = 'Prêt'
fr['interactivePlatform']['agriculture']['containerStatuses']['early'] = 'Précoce'
fr['interactivePlatform']['energy']['sidebarLabels']['export'] = 'Exportation'
fr['interactivePlatform']['energy']['metricCards']['pipeline'] = 'Pipeline'
fr['interactivePlatform']['mining']['sidebarLabels']['extraction'] = 'Extraction'
fr['interactivePlatform']['mining']['processingStages']['extraction'] = 'Extraction'
fr['interactivePlatform']['mining']['sidebar']['safetyItems']['incidentsYtd'] = 'Incidents (YTD)'
fr['interactivePlatform']['mining']['sidebar']['normal'] = 'Normal'
fr['interactivePlatform']['mining']['sidebar']['commodityNames']['cobalt'] = 'Cobalt'
fr['interactivePlatform']['cement']['headerTabs']['production'] = 'Production'
fr['interactivePlatform']['cement']['metricCards']['production'] = 'Production'
fr['interactivePlatform']['water']['sidebarLabels']['distribution'] = 'Distribution'
fr['interactivePlatform']['water']['headerTabs']['distribution'] = 'Distribution'
fr['interactivePlatform']['water']['desalDetails']['filtration'] = 'Filtration'
fr['interactivePlatform']['technology']['sidebarLabels']['sdks'] = 'SDKs'
fr['interactivePlatform']['technology']['pipelineStages']['code'] = 'Code'
fr['interactivePlatform']['technology']['pipelineStages']['test'] = 'Test'
fr['interactivePlatform']['finance']['sidebarLabels']['pipeline'] = 'Pipeline'
fr['interactivePlatform']['finance']['sidebarLabels']['transactions'] = 'Transactions'
fr['interactivePlatform']['finance']['sidebar']['complianceStatus'] = 'Statut de conformité'
fr['interactivePlatform']['finance']['headerTabs']['pipeline'] = 'Pipeline'
fr['interactivePlatform']['finance']['dealLabels']['coupon'] = 'Coupon'
fr['interactivePlatform']['finance']['funnelStages']['termSheet'] = 'Term Sheet'
fr['interactivePlatform']['modules']['foundry']['name'] = 'Fonderie'
fr['interactivePlatform']['modules']['apollo']['name'] = 'Apollo'

# topNav
fr['topNav']['intelligence'] = 'Intelligence'
fr['topNav']['contact'] = 'Contact'

# harchos demo
fr['harchos']['demo']['sovereign']['statusApproved'] = 'approuvé'
fr['harchos']['demo']['sovereign']['statusPending'] = 'en attente'
fr['harchos']['demo']['automation']['statusRunning'] = 'en cours'
fr['harchos']['demo']['automation']['statusIdle'] = 'inactif'

# ============================================================
# Save fr.json
# ============================================================
with open('/home/z/my-project/harch-corp/messages/fr.json', 'w') as f:
    json.dump(fr, f, ensure_ascii=False, indent=2)

print('fr.json fixed successfully!')
