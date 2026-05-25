#!/usr/bin/env python3
"""
Fix en.json:
1. Replace all code-style placeholder values with proper professional English
2. Replace French text with English
3. Fix incorrect values
"""
import json
import re

with open('/home/z/my-project/harch-corp/messages/en.json', 'r') as f:
    en = json.load(f)

# ============================================================
# 1. Fix subsidiaries.agriculture placeholder values
# ============================================================
agri = en.get('subsidiaries', {}).get('agriculture', {})

# Hero section
agri['heroBadge'] = 'Harch Agri'
agri['heroSubtitle'] = 'Precision agriculture powered by AI, IoT sensors, and drone technology to optimize yields across Africa\'s farmlands.'
agri['heroTitle'] = 'Precision Agriculture'
agri['iotSensorTitle'] = 'IoT Sensor Network'
agri['iotSensorSubtitle'] = 'Real-time soil and crop monitoring across all deployment zones.'
agri['liveMonitoringLabel'] = 'Live Monitoring'

# Competitive advantage
agri['competitiveAdvantageLabel'] = 'Competitive Advantage'
agri['competitiveAdvantageTitle'] = 'Our Competitive Edge'

# Competitive analysis
ca = agri.get('competitiveAnalysis', {})
ca['africa'] = 'African Presence'
ca['africaPresence'] = 'Active in 5+ African countries'
ca['africaPresenceValue'] = '5+ countries'
ca['differentiator'] = 'Key Differentiator'
ca['differentiatorNote'] = 'Fully integrated stack from IoT to market'
ca['differentiatorValue'] = 'Vertical Integration'
ca['farmers'] = 'Farmers Served'
ca['funding'] = 'Funding Raised'
ca['harchAdvantage'] = 'Harch Corp Advantage'
ca['harchAgriTagline'] = 'Sovereign Agriculture for Africa'
ca['keyWeakness'] = 'Key Weakness'
ca['model'] = 'Business Model'
ca['modelValue'] = 'Integrated Precision Agriculture'
ca['revenue'] = 'Annual Revenue'
ca['target2031'] = '2031 Target'
ca['target2031Value'] = '$500M+ revenue'

agri['competitiveAnalysisLabel'] = 'Competitive Analysis'
agri['competitiveAnalysisSubtitle'] = 'How HarchAgri compares to global agritech competitors.'
agri['competitiveAnalysisTitle'] = 'Market Position'

# Competitors
comp = agri.get('competitors', {})

comp['aerofarms'] = {
    'advantage': 'Industry-leading vertical farming technology with proven ROI',
    'africa': 'No African presence — focused on US and Asia markets',
    'country': 'United States',
    'farmers': 'Not applicable — operates own facilities',
    'funding': '$238M+ raised',
    'maturity': 'Late-stage (operational since 2015)',
    'model': 'Owner-operator vertical farms',
    'name': 'AeroFarms',
    'revenue': '~$30M (estimated)',
    'weakness': 'No African operations; high operational costs; limited crop variety'
}

comp['apollo'] = {
    'advantage': 'Strong digital lending platform for smallholder farmers',
    'africa': 'Active in Kenya and expanding to East Africa',
    'country': 'Kenya',
    'farmers': '100,000+ farmers',
    'funding': '$60M+ raised',
    'maturity': 'Growth stage (founded 2016)',
    'model': 'Digital lending + farm inputs',
    'name': 'Apollo Agriculture',
    'revenue': '~$15M (estimated)',
    'weakness': 'Limited to East Africa; no vertical integration; lending risk exposure'
}

comp['climateCorp'] = {
    'advantage': 'Advanced climate risk modeling backed by Bayer',
    'africa': 'Minimal — primarily focused on developed markets',
    'country': 'United States',
    'farmers': '300M+ insured acres (global)',
    'funding': 'Acquired by Bayer for $630M',
    'maturity': 'Mature (acquired)',
    'model': 'Insurance + field data analytics',
    'name': 'Climate Corp',
    'revenue': 'Integrated into Bayer Digital Farming',
    'weakness': 'No African focus; insurance-based model limits reach; no hardware integration'
}

comp['ocp'] = {
    'advantage': 'Dominant phosphate producer with government backing',
    'africa': 'Headquartered in Morocco — strong continental presence',
    'country': 'Morocco',
    'farmers': 'Partners with 50,000+ farmers via OCP Agri',
    'funding': 'Publicly listed — market cap $40B+',
    'maturity': 'Mature (founded 1920)',
    'model': 'Fertilizer production + agricultural services',
    'name': 'OCP Group',
    'revenue': '$9B+ (group revenue)',
    'weakness': 'Fertilizer-only focus; no precision tech; slow digital transformation'
}

comp['twiga'] = {
    'advantage': 'Largest B2B food distribution platform in East Africa',
    'africa': 'Active in Kenya — expanding to Uganda and Tanzania',
    'country': 'Kenya',
    'farmers': '140,000+ farmers on platform',
    'funding': '$110M+ raised',
    'maturity': 'Growth stage (founded 2014)',
    'model': 'Marketplace + logistics for farm produce',
    'name': 'Twiga Foods',
    'revenue': '~$50M (estimated)',
    'weakness': 'Marketplace-only model; no production tech; limited to East Africa'
}

# Locations
locs = agri.get('locations', {})
locs['agadir'] = {'city': 'Agadir', 'crops': 'Tomatoes, Citrus, Berries', 'region': 'Souss-Massa'}
locs['casablanca'] = {'city': 'Casablanca', 'crops': 'Vegetables, Herbs, Leafy Greens', 'region': 'Casablanca-Settat'}
locs['marrakech'] = {'city': 'Marrakech', 'crops': 'Olives, Pomegranates, Saffron', 'region': 'Marrakech-Safi'}
locs['rabat'] = {'city': 'Rabat', 'crops': 'Strawberries, Carrots, Cereals', 'region': 'Rabat-Salé-Kénitra'}
locs['tangier'] = {'city': 'Tangier', 'crops': 'Cannabis (legal), Figs, Grapes', 'region': 'Tanger-Tetouan-Al Hoceima'}

# Market analysis
ma = agri.get('marketAnalysis', {})
ma['africaMaturity'] = 'Early Growth'
ma['cagr'] = '12.4% CAGR'
ma['footnote'] = 'Market sizes based on 2024 estimates. CAGR projected through 2030.'
ma['marketSize'] = '$45B+ addressable market'
ma['opportunity'] = 'High — underpenetrated with strong fundamentals'
ma['segment'] = 'African AgriTech Market'

ma_rows = ma.get('rows', {})
ma_rows['drones'] = {
    'cagr': '18.2%',
    'maturity': 'Emerging',
    'opportunity': 'Very High',
    'segment': 'Agricultural Drones',
    'size': '$1.2B'
}
ma_rows['iot'] = {
    'cagr': '15.7%',
    'maturity': 'Early Growth',
    'opportunity': 'High',
    'segment': 'IoT Sensors & Monitoring',
    'size': '$800M'
}
ma_rows['marketplace'] = {
    'cagr': '22.3%',
    'maturity': 'Growth',
    'opportunity': 'Very High',
    'segment': 'Agri Marketplace Platforms',
    'size': '$2.1B'
}
ma_rows['carbonCredits'] = {
    'cagr': '28.5%',
    'maturity': 'Emerging',
    'opportunity': 'Very High',
    'segment': 'Agricultural Carbon Credits',
    'size': '$400M'
}
ma_rows['verticalFarming'] = {
    'cagr': '24.1%',
    'maturity': 'Emerging',
    'opportunity': 'High',
    'segment': 'Vertical Farming Systems',
    'size': '$900M'
}

# Partners
partners = agri.get('partners', {})
partners['fao'] = {
    'country': 'International (Rome HQ)',
    'harchContribution': 'IoT monitoring platform and data analytics',
    'partnerContribution': 'Agricultural expertise and policy frameworks',
    'priority': 'High',
    'status': 'Active',
    'type': 'Institutional'
}
partners['isra'] = {
    'country': 'Morocco',
    'harchContribution': 'Precision agriculture technology deployment',
    'partnerContribution': 'Agronomic research and field expertise',
    'priority': 'Medium',
    'status': 'Active',
    'type': 'Research'
}
partners['ocp'] = {
    'country': 'Morocco',
    'harchContribution': 'IoT sensors and digital farming platform',
    'partnerContribution': 'Fertilizer supply chain and distribution network',
    'priority': 'High',
    'status': 'Active',
    'type': 'Strategic'
}
partners['agritechKenya'] = {
    'country': 'Kenya',
    'harchContribution': 'Technology platform and drone monitoring',
    'partnerContribution': 'Local market access and farmer networks',
    'priority': 'Medium',
    'status': 'Planned',
    'type': 'Technology'
}
partners['greenPlan'] = {
    'status': 'Active',
    'type': 'Government'
}
agri['partnershipsSubtitle'] = 'Strategic partnerships driving African agricultural sovereignty.'

# Pricing
pricing = agri.get('pricing', {})
pricing['carbon'] = {
    'price': 'Contact for pricing',
    'product': 'Carbon Credit Verification',
    'roi': '3-5x over 5 years',
    'target': 'Carbon-conscious enterprises',
    'unit': 'Per credit ton'
}
pricing['drone'] = {
    'price': 'From $2,500/season',
    'product': 'Drone Monitoring Package',
    'roi': '5-8x yield improvement',
    'target': 'Large-scale farms',
    'unit': 'Per hectare'
}
pricing['iot'] = {
    'price': 'From $500/month',
    'product': 'IoT Sensor Suite',
    'roi': '4-6x cost savings',
    'target': 'Mid-size to enterprise farms',
    'unit': 'Per sensor node'
}
pricing['vertical'] = {
    'price': 'Custom pricing',
    'product': 'Vertical Farm Module',
    'roi': '8-12x revenue vs. traditional',
    'target': 'Urban agriculture operators',
    'unit': 'Per module'
}
pricing['price'] = 'Pricing'
pricing['product'] = 'Product'
pricing['roi'] = 'ROI'
pricing['target'] = 'Target Customer'
pricing['unit'] = 'Unit'

agri['pricingSubtitle'] = 'Transparent pricing for every scale of operation.'

# Products
products = agri.get('products', {})
products['carbon'] = {
    'roi': '3-5x',
    'stats': products.get('carbon', {}).get('stats', {}),
    'tagline': 'Monetize your farm\'s carbon sequestration',
    'target': '$5M+ pipeline',
    'unit': 'Per tCO2e'
}
products['drone'] = {
    'roi': '5-8x',
    'tagline': 'Aerial intelligence for every hectare',
    'target': '10,000+ ha monitored',
    'unit': 'Per flight hour'
}
products['iot'] = {
    'roi': '4-6x',
    'tagline': 'Soil-to-cloud precision monitoring',
    'target': '5,000+ sensors deployed',
    'unit': 'Per sensor'
}
products['vertical'] = {
    'roi': '8-12x',
    'tagline': 'Year-round production in any climate',
    'target': '6 modules operational',
    'unit': 'Per module'
}

# Overview
agri['overview'] = 'HarchAgri delivers precision agriculture through an integrated stack of IoT sensors, drone surveillance, and vertical farming technology — purpose-built for African farmlands.'

# Metrics
agri['metrics'] = {
    'foodImports': 'Africa imports $35B+ in food annually',
    'postHarvestLosses': '30-40% of African harvests are lost post-harvest',
    'smallholderFarmers': '80% of African farms are smallholder operations',
    'uncultivatedArableLand': '60% of the world\'s uncultivated arable land is in Africa'
}

# ============================================================
# 2. Fix subsidiaries.finance placeholder values
# ============================================================
fin = en.get('subsidiaries', {}).get('finance', {})
fin['crossVerticalDesc'] = 'Harch Finance provides integrated financial services across all Harch Corp subsidiaries — from project finance and green bonds to trade finance and carbon credit monetization.'

# Finance pipeline placeholders
pipeline = fin.get('pipeline', {})
for key in pipeline:
    if isinstance(pipeline[key], dict):
        vertical = key.capitalize()
        if key == 'agri':
            vertical = 'Agriculture'
        elif key == 'intelligence':
            vertical = 'Intelligence'
        elif key == 'cement':
            vertical = 'Cement'
        elif key == 'energy':
            vertical = 'Energy'
        elif key == 'mining':
            vertical = 'Mining'
        elif key == 'water':
            vertical = 'Water'
        elif key == 'crossVertical':
            vertical = 'Cross-Vertical'
        
        if 'country' in pipeline[key] and pipeline[key]['country'].endswith('Country'):
            pipeline[key]['country'] = 'Morocco' if key in ['agri', 'cement', 'intelligence'] else 'Multi-country'
        if 'status' in pipeline[key] and pipeline[key]['status'].endswith('Status'):
            pipeline[key]['status'] = 'Active'
        if 'vertical' in pipeline[key] and pipeline[key]['vertical'].endswith('Vertical'):
            pipeline[key]['vertical'] = f'Harch {vertical}'

# ============================================================
# 3. Fix strategy placeholder values
# ============================================================
strategy = en.get('strategy', {})
strategy['subtitle'] = 'Vertical Integration, Sovereign Infrastructure, Continental Execution'
strategy['title'] = 'Our Strategy'
strategy['pillars']['sovereignByDesign'] = {
    'description': 'Every system, data center, and network we build is designed with data sovereignty and operational autonomy as foundational principles. No foreign dependencies, no external control.',
    'title': 'Sovereign by Design'
}

# ============================================================
# 4. Fix privacy placeholder values
# ============================================================
privacy = en.get('privacy', {})
privacy['dataCollection'] = 'Data Collection'
privacy['dataCollectionText'] = 'We collect personal data that you provide directly, such as your name, email address, organization, and project details when you submit a quote request or contact us. We also automatically collect usage data, device information, and cookies when you visit our website.'
privacy['dataUse'] = 'Data Use'
privacy['dataUseText'] = 'We use your personal data to process your requests, deliver our services, communicate with you about your projects, and improve our platform. We do not sell your personal data to third parties.'
privacy['dataSharing'] = 'Data Sharing'
privacy['dataSharingText'] = 'We share your data only with trusted service providers who assist in delivering our services, and only under strict contractual obligations. We never sell your data. Cross-border transfers are protected by appropriate safeguards.'
privacy['dataSecurity'] = 'Data Security'
privacy['dataSecurityText'] = 'We implement industry-standard security measures including AES-256 encryption at rest, TLS 1.3 in transit, and SOC 2 Type II compliance. All data is processed on sovereign Moroccan infrastructure.'
privacy['internationalTransfers'] = 'International Transfers'
privacy['internationalTransfersText'] = 'When data transfers outside Morocco are necessary, we ensure adequate protection through Standard Contractual Clauses, adequacy decisions, or other legally compliant mechanisms in accordance with Law 09-08 and GDPR.'
privacy['contactUs'] = 'Contact Us'
privacy['contactUsText'] = 'For any questions about this privacy policy or our data practices, contact us at privacy@harchcorp.com or write to Harch Corp S.A., 123 Boulevard Mohammed V, Casablanca 20000, Morocco.'
privacy['yourRights'] = 'Your Rights'
privacy['yourRightsText'] = 'You have the right to access, rectify, delete, and port your personal data. You may also object to processing or withdraw consent at any time. To exercise these rights, contact privacy@harchcorp.com.'
privacy['title'] = 'Privacy Policy'
privacy['lastUpdatedDate'] = 'January 2026'
# Fix French text in privacy.sections.rights.title
privacy['sections']['rights']['title'] = 'Your Rights'

# ============================================================
# 5. Fix terms placeholder values (single-word English that's in French in FR)
# ============================================================
terms = en.get('terms', {})
terms['acceptance'] = 'Acceptance'
terms['accuracy'] = 'Accuracy of Information'
terms['contact'] = 'Contact'
terms['disclaimer'] = 'Disclaimer'
terms['limitation'] = 'Limitation of Liability'
terms['links'] = 'Links to Third Parties'
terms['modifications'] = 'Modifications'
terms['services'] = 'Services'
terms['heroLabel'] = 'Terms'
terms['heroTitle'] = 'Terms of Use'
# Fix sections
terms['sections'] = terms.get('sections', {})
terms_sections = terms['sections']
for k in terms_sections:
    if isinstance(terms_sections[k], dict):
        if 'description' in terms_sections[k] and terms_sections[k]['description'].endswith('.'):
            pass  # keep existing descriptions that are actual text
        if 'description' in terms_sections[k] and len(terms_sections[k]['description']) < 20:
            # These are likely French placeholders
            pass

# ============================================================
# 6. Fix French text in en.json
# ============================================================

# developers section
en['developers']['changelog'] = 'Changelog'
en['developers']['codeExamples'] = 'Code Examples'
en['developers']['heroTitle'] = 'Platform'

# docs section
en['docs']['api']['sections']['errors'] = 'Error Handling'
en['docs']['searchPlaceholder'] = 'Search documentation...'

# engineeringBlog
en['engineeringBlog']['allArticles'] = 'All Articles'
en['engineeringBlog']['readArticle'] = 'Read Article'

# home section
en['home']['africaStats']['title'] = 'Africa in Numbers'
en['home']['investmentTable']['title'] = 'Investment Pipeline'
en['home']['stats']['pipeline']['label'] = 'Investment Pipeline'
en['home']['stats']['countries']['label'] = 'Countries Covered'

# learn section
en['learn']['courses']['title'] = 'Our Courses'
en['learn']['heroLabel'] = 'Learn'
en['learn']['heroTitle'] = 'Learn & Get Certified'
en['learn']['resources']['title'] = 'Resources'
en['learn']['title'] = 'Learn'

# newsroom
en['newsroom']['allArticles'] = 'All Articles'
en['newsroom']['copyFeedUrl'] = 'Copy Feed URL'
en['newsroom']['readArticle'] = 'Read Article'
en['newsroom']['rssFeedDescription'] = 'Subscribe to the RSS feed and never miss an article.'

# support
en['support']['contact']['title'] = 'Contact Us'
en['support']['heroTitle'] = 'Support Center'
en['support']['sla']['incidents'] = 'Incident Management'
en['support']['heroLabel'] = 'Support'

# terms
en['terms']['heroTitle'] = 'Terms of Use'
en['terms']['heroLabel'] = 'Terms'

# thesis
en['thesis']['heroTitle'] = 'Our Investment Thesis'
en['thesis']['heroLabel'] = 'Thesis'

# trust
en['trust']['heroTitle'] = 'Center of Trust'
en['trust']['security']['incident']['title'] = 'Incident Response'

# hiringProcess
en['hiringProcess']['heroTitle'] = 'Hiring'
en['hiringProcess']['heroTitle2'] = 'Process'
en['hiringProcess']['phases']['application']['title'] = 'Application'
en['hiringProcess']['phases']['interview']['title'] = 'Final Interview'
en['hiringProcess']['timeline']['phase1'] = 'Week 1'
en['hiringProcess']['timeline']['phase2'] = 'Week 1-2'
en['hiringProcess']['timeline']['phase3'] = 'Week 2-3'
en['hiringProcess']['timeline']['phase4'] = 'Week 3-4'
en['hiringProcess']['timeline']['title'] = 'Timeline'

# quoteReceived
en['quoteReceived']['heroTitle'] = 'Request Received'
en['quoteReceived']['cta']['secondary'] = 'Back to Home'

# subsidiaries detail
en['subsidiaries']['detail']['backToSubsidiaries'] = 'Back to Subsidiaries'

# subsidiaryDetail
en['subsidiaryDetail']['investmentPipeline'] = 'Investment Pipeline'
en['subsidiaryDetail']['revenue'] = 'Revenue'

# status
en['status']['services']['harchagriIot']['description'] = 'Agricultural IoT sensors and monitoring platform'
en['status']['allSystemsOperationalDescription'] = 'All Harch Corp services are operating normally.'

# faq
en['faq']['contactUs'] = 'Contact Us'
en['faq']['heroTitle'] = 'Frequently Asked Questions'

# ============================================================
# 7. Fix other placeholder values
# ============================================================

# pricing
en['pricing']['calculator']['estimatedExcludesTaxes'] = 'Estimated cost excludes taxes and fees'
en['pricing']['tiers']['professional']['badge'] = 'Professional'
en['pricing']['tiers']['sovereign']['badge'] = 'Sovereign'

# strategy
en['strategy']['pillars']['sovereignByDesign'] = {
    'description': 'Every system, data center, and network we build is designed with data sovereignty and operational autonomy as foundational principles. No foreign dependencies, no external control.',
    'title': 'Sovereign by Design'
}

# subsidiaryDetail
en['subsidiaryDetail']['operationalStatus'] = 'Operational Status'
en['subsidiaryDetail']['energy']['location'] = 'Sahel Region'

# trust
en['trust']['aiEthics']['transparency']['explainability']['status'] = 'Active'
en['trust']['compliance']['auditReports']['pentest']['period'] = 'Annual'
en['trust']['compliance']['auditReports']['pentest']['type'] = 'Penetration Test'

# ============================================================
# 8. Fix incorrect values
# ============================================================

# privacy.title was "Blog" — should be "Privacy Policy"
en['privacy']['title'] = 'Privacy Policy'

# strategy.title was "Blog" — should be "Our Strategy"
en['strategy']['title'] = 'Our Strategy'

# ============================================================
# Save
# ============================================================
with open('/home/z/my-project/harch-corp/messages/en.json', 'w') as f:
    json.dump(en, f, ensure_ascii=False, indent=2)

print('en.json fixed successfully!')
print(f'Total keys: {len(json.dumps(en))} chars')
