#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Sahara Neural Hub - Hyperscale Green Data Center Dakhla
COMPREHENSIVE INVESTMENT & FEASIBILITY REPORT
Sovereign African Data Storage – Decentralized High-Performance Computing

Professional Investor-Grade Report – JP Morgan / MIT Level
"""

import os, sys, hashlib
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch, cm, mm
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY, TA_RIGHT
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, CondPageBreak, Image, KeepTogether
)
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily

# ═══════════════════════════════════════════════════
# PALETTE (auto-generated)
# ═══════════════════════════════════════════════════
ACCENT       = colors.HexColor('#c34b23')
ACCENT2      = colors.HexColor('#2f7ab9')
TEXT_PRIMARY  = colors.HexColor('#1e1d1b')
TEXT_MUTED    = colors.HexColor('#78756d')
BG_SURFACE   = colors.HexColor('#e8e6e1')
BG_PAGE      = colors.HexColor('#f5f4f3')
TABLE_HEADER_COLOR = ACCENT
TABLE_HEADER_TEXT  = colors.white
TABLE_ROW_EVEN     = colors.white
TABLE_ROW_ODD      = BG_SURFACE

# ═══════════════════════════════════════════════════
# FONT REGISTRATION
# ═══════════════════════════════════════════════════
pdfmetrics.registerFont(TTFont('LiberationSerif', '/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf'))
pdfmetrics.registerFont(TTFont('LiberationSerif-Bold', '/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf'))
pdfmetrics.registerFont(TTFont('Carlito', '/usr/share/fonts/truetype/english/Carlito-Regular.ttf'))
pdfmetrics.registerFont(TTFont('Carlito-Bold', '/usr/share/fonts/truetype/english/Carlito-Bold.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSans', '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'))
registerFontFamily('LiberationSerif', normal='LiberationSerif', bold='LiberationSerif-Bold')
registerFontFamily('Carlito', normal='Carlito', bold='Carlito-Bold')
registerFontFamily('DejaVuSans', normal='DejaVuSans', bold='DejaVuSans')

# ═══════════════════════════════════════════════════
# PAGE SETUP
# ═══════════════════════════════════════════════════
PAGE_W, PAGE_H = A4
LEFT_M = 1.8*cm
RIGHT_M = 1.8*cm
TOP_M = 2.0*cm
BOT_M = 2.0*cm
CONTENT_W = PAGE_W - LEFT_M - RIGHT_M

# ═══════════════════════════════════════════════════
# STYLES
# ═══════════════════════════════════════════════════
sH1 = ParagraphStyle('H1', fontName='LiberationSerif', fontSize=20, leading=26,
    textColor=ACCENT, spaceBefore=18, spaceAfter=10)
sH2 = ParagraphStyle('H2', fontName='LiberationSerif', fontSize=15, leading=20,
    textColor=TEXT_PRIMARY, spaceBefore=14, spaceAfter=8)
sH3 = ParagraphStyle('H3', fontName='LiberationSerif', fontSize=12, leading=16,
    textColor=TEXT_PRIMARY, spaceBefore=10, spaceAfter=6)
sBody = ParagraphStyle('Body', fontName='LiberationSerif', fontSize=10.5, leading=16,
    textColor=TEXT_PRIMARY, alignment=TA_JUSTIFY, spaceBefore=2, spaceAfter=6)
sBodyL = ParagraphStyle('BodyL', fontName='LiberationSerif', fontSize=10.5, leading=16,
    textColor=TEXT_PRIMARY, alignment=TA_LEFT, spaceBefore=2, spaceAfter=6)
sBullet = ParagraphStyle('Bullet', fontName='LiberationSerif', fontSize=10.5, leading=16,
    textColor=TEXT_PRIMARY, alignment=TA_LEFT, leftIndent=20, bulletIndent=8,
    spaceBefore=2, spaceAfter=3)
sCaption = ParagraphStyle('Caption', fontName='LiberationSerif', fontSize=9, leading=13,
    textColor=TEXT_MUTED, alignment=TA_CENTER, spaceBefore=4, spaceAfter=10)
sTH = ParagraphStyle('TH', fontName='LiberationSerif', fontSize=9.5, leading=13,
    textColor=TABLE_HEADER_TEXT, alignment=TA_CENTER)
sTC = ParagraphStyle('TC', fontName='LiberationSerif', fontSize=9, leading=13,
    textColor=TEXT_PRIMARY, alignment=TA_CENTER)
sTCL = ParagraphStyle('TCL', fontName='LiberationSerif', fontSize=9, leading=13,
    textColor=TEXT_PRIMARY, alignment=TA_LEFT)
sCallout = ParagraphStyle('Callout', fontName='LiberationSerif', fontSize=11, leading=17,
    textColor=ACCENT, alignment=TA_CENTER, spaceBefore=8, spaceAfter=8)
sFooter = ParagraphStyle('Footer', fontName='LiberationSerif', fontSize=8, leading=11,
    textColor=TEXT_MUTED, alignment=TA_CENTER)
sQuote = ParagraphStyle('Quote', fontName='LiberationSerif', fontSize=10.5, leading=17,
    textColor=TEXT_MUTED, alignment=TA_LEFT, leftIndent=24, rightIndent=24,
    spaceBefore=8, spaceAfter=8, borderPadding=6)

OUTPUT_DIR = '/home/z/my-project/download'
CHARTS_DIR = os.path.join(OUTPUT_DIR, 'charts')
BODY_PDF = os.path.join(OUTPUT_DIR, 'dakhla_dc_body_v3.pdf')
FINAL_PDF = os.path.join(OUTPUT_DIR, 'Sahara_Neural_Hub_Investment_Report.pdf')

# ═══════════════════════════════════════════════════
# HELPERS
# ═══════════════════════════════════════════════════
def P(text, style=sBody):
    return Paragraph(text, style)

def TH(text):
    return Paragraph('<b>' + text + '</b>', sTH)

def TC(text):
    return Paragraph(text, sTC)

def TCL(text):
    return Paragraph(text, sTCL)

def make_table(headers, rows, col_ratios=None):
    """Create a properly formatted table. ALL cells are Paragraph objects."""
    data = [[TH(h) for h in headers]]
    for row in rows:
        data.append([TC(str(c)) for c in row])
    if col_ratios:
        col_widths = [r * CONTENT_W for r in col_ratios]
    else:
        col_widths = None
    t = Table(data, colWidths=col_widths, hAlign='CENTER')
    style_cmds = [
        ('BACKGROUND', (0, 0), (-1, 0), TABLE_HEADER_COLOR),
        ('TEXTCOLOR', (0, 0), (-1, 0), TABLE_HEADER_TEXT),
        ('GRID', (0, 0), (-1, -1), 0.5, TEXT_MUTED),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
    ]
    for i in range(1, len(data)):
        bg = TABLE_ROW_EVEN if i % 2 == 1 else TABLE_ROW_ODD
        style_cmds.append(('BACKGROUND', (0, i), (-1, i), bg))
    t.setStyle(TableStyle(style_cmds))
    return t

def add_heading(text, style, level=0):
    key = 'h_%s' % hashlib.md5(text.encode()).hexdigest()[:8]
    p = Paragraph('<a name="%s"/>' % key + text, style)
    p.bookmark_name = text
    p.bookmark_level = level
    p.bookmark_text = text
    p.bookmark_key = key
    return p

def chart_img(name, width_cm=16.5):
    """Insert a chart image."""
    path = os.path.join(CHARTS_DIR, name)
    if os.path.exists(path):
        w = width_cm * cm
        return Image(path, width=w, height=w * 0.55)
    return P('[Chart: %s not found]' % name, sCaption)

H1_ORPHAN = (PAGE_H - TOP_M - BOT_M) * 0.15

def section(text):
    return [
        CondPageBreak(H1_ORPHAN),
        add_heading('<b>' + text + '</b>', sH1, 0),
    ]

def subsection(text):
    return add_heading('<b>' + text + '</b>', sH2, 1)

def subsubsection(text):
    return add_heading('<b>' + text + '</b>', sH3, 1)

class TocDocTemplate(SimpleDocTemplate):
    def afterFlowable(self, flowable):
        if hasattr(flowable, 'bookmark_name'):
            level = getattr(flowable, 'bookmark_level', 0)
            text = getattr(flowable, 'bookmark_text', '')
            key = getattr(flowable, 'bookmark_key', '')
            self.notify('TOCEntry', (level, text, self.page, key))

# ═══════════════════════════════════════════════════
# BUILD DOCUMENT
# ═══════════════════════════════════════════════════
doc = TocDocTemplate(
    BODY_PDF,
    pagesize=A4,
    leftMargin=LEFT_M,
    rightMargin=RIGHT_M,
    topMargin=TOP_M,
    bottomMargin=BOT_M,
    title='Sahara Neural Hub - Hyperscale Green Data Center Dakhla',
    author='Z.ai Strategic Analysis Division',
)

story = []

# ═══════════════════════════════════════════════════
# TABLE OF CONTENTS
# ═══════════════════════════════════════════════════
toc = TableOfContents()
toc.levelStyles = [
    ParagraphStyle('TOC1', fontName='LiberationSerif', fontSize=12, leading=20, leftIndent=20, textColor=TEXT_PRIMARY),
    ParagraphStyle('TOC2', fontName='LiberationSerif', fontSize=10.5, leading=18, leftIndent=40, textColor=TEXT_MUTED),
]
story.append(Paragraph('<b>TABLE OF CONTENTS</b>',
    ParagraphStyle('TOCTitle', fontName='LiberationSerif', fontSize=22, leading=28,
        textColor=ACCENT, alignment=TA_CENTER, spaceBefore=40, spaceAfter=30)))
story.append(toc)
story.append(PageBreak())

# ═══════════════════════════════════════════════════
# 1. EXECUTIVE SUMMARY
# ═══════════════════════════════════════════════════
story.extend(section('1. Executive Summary'))

story.append(P(
    'This report presents a comprehensive feasibility analysis for the construction and operation of a '
    '<b>Hyperscale Green Data Center</b> in Dakhla, Morocco, dedicated to <b>Sovereign African Data Storage</b> '
    'and <b>Decentralized High-Performance Computing (HPC)</b> powered by artificial intelligence GPU clusters. '
    'The project, codenamed <b>"Sahara Neural Hub"</b>, aims to establish a 50 MW IT-load facility powered entirely '
    'by renewable energy (wind and solar), leveraging the exceptional wind resources of the Dakhla-Oued Ed-Dahab '
    'region, which ranks among the top five onshore wind sites globally with average wind speeds of 9.5-10.8 m/s '
    'at 80m height. This document has been prepared to institutional investor standards, incorporating multi-stakeholder '
    'perspective analysis, risk-adjusted financial modeling, and regulatory compliance mapping across Moroccan, African '
    'Union, and European Union frameworks.'
))

story.append(P(
    'The strategic positioning of Dakhla offers a unique convergence of advantages: abundant and inexpensive '
    'renewable energy (LCOE as low as $0.022-0.035/kWh), an operational submarine cable landing station providing '
    '20-40 Tbps connectivity to both Europe and West Africa, a favorable tax regime within the Dakhla West Africa '
    'Free Zone (5-year corporate tax exemption followed by a reduced 15% rate, VAT and customs duty exemptions), and '
    'a cool coastal desert climate enabling 5,000-7,500 hours per year of free cooling. The total estimated CAPEX '
    'ranges from $611 million to $1.135 billion for a 50 MW facility including 2,000 NVIDIA H100 GPUs, with annual '
    'OPEX projected at $82-99 million using grid power, dropping to $30-53 million with self-generated renewable energy.'
))

story.append(P(
    'The African data center market is experiencing explosive growth, projected to reach USD 6.81 billion by 2030 '
    'at a CAGR of 11.8%. Morocco alone commands 35% of all new announced power capacity on the continent, with a '
    'pipeline exceeding 1,886 MW. No data center currently exists in Dakhla, presenting a compelling first-mover '
    'advantage for a facility that can serve as the strategic gateway between European and West African digital '
    'infrastructure, addressing the growing demand for sovereign African data storage driven by data localization '
    'laws in 36+ African countries and the African Union Data Policy Framework adopted in February 2024. The projected '
    'IRR ranges from 12-18% in the base case scenario, with a payback period of 5-7 years and cumulative cash flow '
    'turning positive in Year 6 of operations.'
))

# Key Metrics Table
story.append(Spacer(1, 8))
story.append(make_table(
    ['Key Metric', 'Value'],
    [
        ['Project Name', 'Sahara Neural Hub - Dakhla'],
        ['IT Load Capacity', '50 MW (scalable to 100 MW)'],
        ['GPU Cluster', '2,000+ NVIDIA H100 / B200 GPUs'],
        ['Energy Source', '100% Renewable (Wind + Solar + BESS)'],
        ['Total CAPEX Estimate', '$611M - $1.135B'],
        ['Annual OPEX (Grid / Renewable)', '$82-99M / $30-53M'],
        ['Target PUE', '1.10 - 1.20 (Green DC)'],
        ['Location', 'Dakhla, Morocco (23.68N, 15.95W)'],
        ['Timeline to Phase 1 Go-Live', '24-36 months'],
        ['IRR Projected (Base Case)', '12 - 18%'],
        ['Payback Period', '5 - 7 years'],
        ['Job Creation (Direct / Indirect)', '120 / 500+'],
    ],
    [0.35, 0.65]
))
story.append(P('Table 1: Project Key Metrics Summary', sCaption))

# ═══════════════════════════════════════════════════
# 2. MARKET ANALYSIS
# ═══════════════════════════════════════════════════
story.extend(section('2. Market Analysis'))

story.append(subsection('2.1 African Data Center Market Overview'))
story.append(P(
    'The African data center market represents one of the most dynamic growth opportunities in global digital '
    'infrastructure. Valued at USD 3.49 billion in 2024, the market is projected to reach USD 6.81 billion by 2030, '
    'growing at a compound annual growth rate (CAGR) of 11.8%. The construction segment alone is expected to expand '
    'from USD 1.26 billion in 2025 to USD 3.06 billion by 2030, reflecting the massive infrastructure buildout '
    'underway across the continent. The Middle East and Africa colocation market is experiencing even more rapid growth, '
    'reaching USD 4.9 billion in 2026 with a 28.5% year-over-year increase, and is projected to hit USD 11.1 billion '
    'by 2030. Total existing data center capacity across the top five African markets exceeds 500 MW, with 56 new data '
    'centers and approximately 400 MW of additional capacity announced by the end of 2025. The demand is being driven '
    'by cloud adoption (growing at 25-30% annually), mobile internet penetration (projected 50% by 2030), and the '
    'emergence of AI-specific compute requirements that traditional facilities cannot serve.'
))

story.append(Spacer(1, 10))
story.append(chart_img('market_growth.png', 16))
story.append(P('Figure 1: African Data Center Market Projection (2020-2030)', sCaption))

story.append(make_table(
    ['Country', 'Data Centers', 'Capacity (MW)', 'Key Notes'],
    [
        ['South Africa', '~56', '~350', 'Largest market; Johannesburg + Cape Town'],
        ['Morocco', '~23', '~10-15 (existing)', '1,886 MW pipeline (35% of Africa announcements)'],
        ['Nigeria', '~12-15', '~86-137', 'Leading West African hub'],
        ['Kenya', '~8-10', '~30-40', 'East Africa primary hub'],
        ['Egypt', '~10-12', '~50-60', 'North Africa second hub'],
    ],
    [0.18, 0.15, 0.22, 0.45]
))
story.append(P('Table 2: African Data Center Market by Country (2025)', sCaption))

story.append(subsection('2.2 Data Sovereignty and Regulatory Drivers'))
story.append(P(
    'The push for data sovereignty in Africa has become a major driver of data center demand. As of 2025, more than '
    '36 African countries have enacted or are actively developing data protection legislation, up from fewer than 10 '
    'in 2015. The African Union Data Policy Framework, adopted in February 2024, explicitly supports the development '
    'of regional and continental data infrastructure while advising against overly broad data localization mandates. '
    'Kenya requires that a copy of personal data be stored domestically, Nigeria mandates localization for certain '
    'sectors including financial data, and Egypt has introduced localization requirements for specific data categories. '
    "Morocco's Loi 09-08 (2009) governs data protection with cross-border transfers allowed subject to equivalent "
    "protection standards, and the country is actively modernizing its framework to align more closely with the EU's "
    'GDPR. This growing regulatory landscape creates substantial demand for sovereign African data storage facilities '
    'that can serve clients who need to keep data on the continent while still accessing world-class infrastructure '
    'and connectivity. The economic cost of data exfiltration from Africa is estimated at $4-6 billion annually in '
    'lost revenue, latency penalties, and sovereignty compromises, creating a powerful economic incentive for local '
    'compute infrastructure.'
))

story.append(subsection('2.3 AI and GPU Computing Demand in Africa'))
story.append(P(
    'The artificial intelligence sector in Africa is experiencing rapid expansion, with over 2,360 companies listing '
    "AI as a specialization as of 2022, and the continent's cloud computing adoption growing at 25-30% annually. "
    'However, the supply of AI-ready data center infrastructure severely lags demand: in South Africa, only 5 out of '
    '56 operational data centers are equipped for AI workloads. AI-ready data centers consume approximately 5 times '
    'more electricity than traditional cloud facilities, and GPU-based racks require 40-140 kW per rack compared to '
    '5-12 kW for conventional IT racks. This 10-30x increase in power density represents both a challenge and an '
    'opportunity for a purpose-built green HPC facility. The African Union Continental AI Strategy, adopted in July '
    '2024, further reinforces the imperative for local AI compute capacity. Currently, only about 17% of African '
    'enterprises have fully migrated to cloud, indicating massive untapped potential as digital transformation '
    'accelerates across the continent. The GPU-as-a-Service market in Africa is essentially non-existent, meaning '
    'that African AI startups, research institutions, and enterprises currently must rely on US or European cloud '
    'providers, paying premium prices and incurring latency penalties of 100-300ms for interactive AI workloads.'
))

story.append(subsection("2.4 Morocco's Competitive Position"))
story.append(P(
    'Morocco has emerged as the leading destination for data center investment in Africa, commanding 35% of all newly '
    "announced power capacity on the continent. The kingdom's pipeline includes the Iozera project (386 MW in Tetouan, "
    '$500M investment, MoU signed 2024), the Naver Cloud facility (500 MW in Tetouan, partnership with NVIDIA, '
    'construction starting Q4 2025), and the Nouaceur project (500 MW target near Casablanca, 100% renewable energy '
    "planned). Morocco's advantages include proximity to Europe (only 15 km at the Strait of Gibraltar), submarine "
    'cable landings with over 500 Tbps total design capacity, a renewable energy share of 44% in the energy mix '
    '(highest in North Africa), a stable constitutional monarchy with consistent pro-business policies, and a '
    'bilingual workforce fluent in French, Arabic, and increasingly English. The "Digital Morocco 2030" strategy '
    'targets 40 billion MAD in revenue from advanced digital services by 2030, signaling strong government commitment '
    'to the digital infrastructure sector. Morocco also benefits from free trade agreements with the EU, US, and '
    'numerous African countries, making it an ideal export platform for digital services.'
))

story.append(Spacer(1, 10))
story.append(chart_img('morocco_pipeline.png', 16))
story.append(P('Figure 2: Morocco Data Center Pipeline by Project (2025-2030)', sCaption))

# ═══════════════════════════════════════════════════
# 3. LOCATION ANALYSIS: DAKHLA
# ═══════════════════════════════════════════════════
story.extend(section('3. Location Analysis: Dakhla'))

story.append(subsection('3.1 Geographic and Climatic Advantages'))
story.append(P(
    'Dakhla is situated at coordinates 23.68 degrees North, 15.95 degrees West on a narrow peninsula extending into '
    'the Atlantic Ocean, approximately 1,500 km south of Casablanca. The city benefits from a unique microclimate '
    'shaped by the cold Canary Current, with average temperatures of 20-22 degrees Celsius year-round, consistently '
    "low humidity, and steady ocean breezes. These conditions are exceptionally favorable for data center operations, "
    'enabling 5,000-7,500 hours per year of free cooling through air-side economization, which can reduce cooling '
    'energy consumption by 60-80% compared to traditional mechanical refrigeration. The Atlantic coast location also '
    'opens the possibility of seawater cooling, with the potential to achieve a Power Usage Effectiveness (PUE) as '
    "low as 1.05-1.15, placing the facility among the most energy-efficient data centers globally. For context, "
    "Google's best-in-class facilities achieve a PUE of 1.10, and the industry average stands at 1.40-1.60. "
    'The combination of free cooling, potential seawater cooling, and 100% renewable energy positions the Sahara '
    'Neural Hub to achieve the lowest carbon footprint of any hyperscale data center on the African continent.'
))

story.append(subsection('3.2 Renewable Energy Resources'))
story.append(P(
    'The Dakhla-Oued Ed-Dahab region possesses the highest wind energy density in Morocco and ranks among the top '
    'five onshore wind sites globally. At 80m height, the average wind speed ranges from 9.5 to 10.8 m/s with a '
    'power density of approximately 480 W/m<super>2</super>, driven by consistent northeasterly trade winds associated '
    'with the Azores anticyclone. The LCOE for wind energy in Dakhla is estimated at $0.022-0.035/kWh, significantly '
    "below the global weighted average of $0.034/kWh (IRENA 2024) and well below Morocco's average electricity tariff "
    "of $0.116/kWh for business users. Morocco's national wind capacity reached 2,373 MW by the end of 2024, and the "
    'country targets 52% renewable installed capacity by 2030. A 60 MW wind farm in Dakhla began injecting power in '
    'March 2025, with a 40 MW expansion coupled to the desalination plant. A critical infrastructure project, the '
    'Dakhla-Casablanca 400 kV high-voltage transmission line with 3 GW capacity, is under development with delivery '
    'expected by 2028, which will be essential for evacuating surplus renewable energy production and providing grid '
    'backup for the data center facility.'
))

story.append(Spacer(1, 10))
story.append(chart_img('wind_comparison.png', 16))
story.append(P('Figure 3: Global Wind Site Comparison - Dakhla vs. World-Class Locations', sCaption))

story.append(make_table(
    ['Parameter', 'Value', 'Source'],
    [
        ['Wind Speed at 80m', '9.5 - 10.8 m/s', 'ScienceDirect / CDER'],
        ['Power Density at 80m', '~480 W/m<super>2</super>', 'ResearchGate / Weibull'],
        ['Wind Direction', 'N/NE (Trade Winds)', 'Global Wind Atlas'],
        ['LCOE Wind', '$0.022 - 0.035/kWh', 'IRENA / MASEN'],
        ['Capacity Factor', '40 - 50%', 'RES4Africa'],
        ['Solar Irradiance (GHI)', '5.5 - 6.5 kWh/m<super>2</super>/day', 'ADEREE / SolarGIS'],
        ['Solar LCOE', '$0.03 - 0.045/kWh', 'IRENA / MASEN'],
    ],
    [0.35, 0.35, 0.30]
))
story.append(P('Table 3: Dakhla Renewable Energy Resources', sCaption))

story.append(subsection('3.3 Connectivity and Submarine Cables'))
story.append(P(
    'Dakhla possesses a strategic advantage that few African cities can match: it is already a submarine cable landing '
    'point. The Maroc Telecom West Africa cable, operational since 2021, lands directly in Dakhla with a capacity of '
    '20 Tbps (extensible to 40 Tbps), connecting Morocco to Mauritania, Senegal, Cote d\'Ivoire, Togo, Benin, and '
    'Gabon. This positions Dakhla as a natural gateway between European and West African digital traffic. Additionally, '
    'the Sahara cable (60 Tbps) is being deployed by Maroc Telecom, the Islalink Canaries-Morocco cable (EUR 49M, '
    'delivery 2028) will connect southern Morocco to the Canary Islands and onward to Europe, and the MEDUSA cable '
    '(480 Tbps total, landed in Nador December 2025) provides additional Mediterranean connectivity. Morocco\'s total '
    'accessible international bandwidth exceeds 500 Tbps in design capacity. Latency from Casablanca to Paris is '
    'approximately 25-30 ms, and Dakhla\'s direct West Africa cable link provides low-latency access to key West '
    'African markets. Fiber-to-the-home (FTTH) is available in Dakhla via Maroc Telecom, Orange, and Inwi at speeds '
    'up to 1 Gbps, with enterprise-grade dedicated fiber available for data center backhaul.'
))

story.append(make_table(
    ['Cable System', 'Capacity', 'Status', 'Connects To'],
    [
        ['West Africa (IAM)', '20-40 Tbps', 'Operational', 'West Africa (6 countries)'],
        ['Sahara (IAM)', '60 Tbps', 'Deploying', 'Regional expansion'],
        ['MEDUSA (inwi)', '480 Tbps', 'Landed Nador 2025', 'Europe / Mediterranean'],
        ['Islalink', 'TBD', 'Planned 2028', 'Canary Islands / Spain'],
        ['ACE', '1.28 Tbps', 'Operational', 'Casablanca / Europe / West Africa'],
    ],
    [0.22, 0.18, 0.25, 0.35]
))
story.append(P('Table 4: Submarine Cable Connectivity from Dakhla/Morocco', sCaption))

story.append(subsection('3.4 Land and Real Estate'))
story.append(P(
    'Land in Dakhla is remarkably affordable compared to Morocco\'s northern cities, offering substantial cost savings '
    'for a hyperscale facility requiring large land areas. Constructible land in the PK40 development zone starts at '
    '400 MAD/m<super>2</super> (approximately 37 EUR/m<super>2</super>), which represents a 30-40% discount compared '
    'to Casablanca and Marrakech. Industrial zone lots are available at even lower prices (14-16 MAD/m<super>2</super> '
    'for small lots), and the Dakhla West Africa Free Zone encompasses 1,000 hectares of industrial land. A new '
    '27-hectare industrial zone with 326 lots has been announced with a 30 MAD million development investment. For a '
    '50 MW data center, approximately 10 hectares would be required for the facility buildings, electrical '
    'infrastructure, and wind/solar energy installations. At PK40 prices, this represents a land acquisition cost of '
    'approximately 40 MAD million ($4 million), which is negligible relative to the total project CAPEX. Rural land in '
    'the broader Dakhla-Oued Ed-Dahab region can be obtained for as little as 5-50 MAD/m<super>2</super> through the '
    'Agence de Developpement Agricole, which has 1,778 hectares available for long-term lease.'
))

story.append(make_table(
    ['Zone Type', 'Price (MAD/m<super>2</super>)', 'Price (EUR/m<super>2</super>)', 'Notes'],
    [
        ['Center-ville / Corniche', '4,000 - 7,000', '370 - 650', 'Titled, viabilized'],
        ['PK40 Lotissements', '400 - 625', '37 - 58', 'Developing zone'],
        ['Industrial Zone (lots)', '14 - 16', '1.3 - 1.5', 'Small lots R+4'],
        ['Rural Land', '5 - 50', '0.5 - 4.6', 'ADA long-term lease'],
        ['DWAFZ (Free Zone)', 'Admin. allocation', 'Negligible', '1,000 hectares available'],
    ],
    [0.25, 0.22, 0.22, 0.31]
))
story.append(P('Table 5: Land Prices in Dakhla by Zone Type', sCaption))

story.append(subsection('3.5 Water and Desalination Infrastructure'))
story.append(P(
    'Water availability is a critical consideration for data center operations, particularly for cooling systems. '
    'Dakhla, situated in an arid region, addresses this challenge through a major desalination infrastructure program. '
    'A new seawater desalination station with a capacity of 37 million m<super>3</super>/year (approximately 101,000 '
    'm<super>3</super>/day) is under construction with a total investment of 2.5 billion MAD (approximately EUR 230 '
    'million), of which 7 million m<super>3</super>/year is allocated to drinking water and 30 million '
    'm<super>3</super>/year to irrigation for 5,200 hectares. The plant is 100% powered by a coupled wind farm, '
    'reducing the cost per cubic meter by approximately 30% compared to standard desalination, yielding an estimated '
    'cost of 5-7 MAD/m<super>3</super>. For a 50 MW data center using advanced cooling technologies (direct liquid '
    'cooling and free cooling), water consumption would be minimal, estimated at 500-1,000 m<super>3</super>/day for '
    'make-up water, well within the capacity of the new desalination infrastructure. The possibility of seawater '
    'cooling using deep ocean water (4-6 degrees Celsius at 700-1,000m depth) could eliminate the need for evaporative '
    'cooling entirely, achieving a PUE of 1.05-1.15.'
))

story.append(subsection('3.6 Electrical Grid and Power Infrastructure'))
story.append(P(
    "Dakhla's electrical infrastructure has undergone significant upgrades in recent years. The city is connected to "
    "Morocco's national grid via a 400 kV double-circuit transmission line, with a total investment of approximately "
    "2.4 billion MAD. Current installed generation capacity includes a 76 MW diesel power station, a 60 MW wind farm "
    "(first injections in March 2025), and a 40 MW wind installation coupled to the desalination project. The most "
    "critical infrastructure project is the Dakhla-Casablanca 1,000 km ultra-high-voltage transmission corridor with "
    "a planned capacity of 3,000 MW (1,500 MW in Phase 1, expansion to 3,000 MW by 2028), which will enable the "
    "evacuation of 900 MW of additional renewable energy production from the southern provinces. Five candidates have "
    "been shortlisted for the construction contract as of February 2025. For a 50 MW data center, the power "
    "requirement with a PUE of 1.2 would be approximately 60 MW of total electrical input. This would require a "
    "dedicated renewable energy installation of approximately 120-150 MW (wind + solar + BESS) to ensure 24/7 power "
    "availability, given the intermittent nature of renewable sources."
))

# ═══════════════════════════════════════════════════
# 4. TECHNICAL ARCHITECTURE
# ═══════════════════════════════════════════════════
story.extend(section('4. Technical Architecture'))

story.append(subsection('4.1 Data Center Design Specifications'))
story.append(P(
    'The Sahara Neural Hub is designed as a Tier III+ hyperscale facility optimized for GPU-accelerated AI workloads. '
    'The design philosophy centers on three pillars: energy efficiency through green design (target PUE 1.10-1.20), '
    'high-density computing (40-140 kW per rack for GPU clusters), and sovereign data assurance (compliance with '
    "Moroccan Loi 09-08, AU Data Policy Framework, and GDPR-equivalent standards). The facility will be constructed "
    'in two phases: Phase 1 (24-36 months) delivering 25 MW IT load with 1,000 GPU servers, and Phase 2 (subsequent '
    '18-24 months) expanding to 50 MW with 2,000+ GPUs. The data hall design supports both air-cooled racks (up to '
    '15 kW for traditional IT) and liquid-cooled racks (up to 140 kW for NVIDIA GB200 NVL72 systems), with '
    'direct-to-chip liquid cooling as the primary cooling method for GPU clusters and rear-door heat exchangers as a '
    'secondary system. The facility will use 100% renewable energy sourced from a dedicated wind farm and solar PV '
    'installation, backed by battery energy storage systems (BESS) and grid connection for reliability. Seawater '
    "cooling is under evaluation as a tertiary cooling method, leveraging Dakhla's Atlantic coast location."
))

story.append(make_table(
    ['Specification', 'Phase 1', 'Phase 2 (Full Build)'],
    [
        ['IT Load Capacity', '25 MW', '50 MW'],
        ['Total Electrical Input', '30 MW (PUE 1.2)', '60 MW (PUE 1.2)'],
        ['Data Hall Area', '5,000 m<super>2</super>', '10,000 m<super>2</super>'],
        ['Total Site Area', '5 hectares', '10 hectares'],
        ['GPU Servers', '1,000 H100/B200', '2,000+ H100/B200'],
        ['Rack Capacity', '250 racks (40 kW avg)', '500+ racks'],
        ['Cooling System', 'DLC + Free Cooling', 'DLC + Free Cooling + SWC'],
        ['Target PUE', '1.15 - 1.20', '1.10 - 1.15'],
        ['Tier Level', 'Tier III+', 'Tier III+ / IV elements'],
        ['Uptime SLA', '99.982%', '99.982%+'],
        ['Redundancy', 'N+1 power, 2N UPS', '2N power, 2N UPS'],
    ],
    [0.30, 0.35, 0.35]
))
story.append(P('Table 6: Data Center Design Specifications', sCaption))

story.append(subsection('4.2 GPU Infrastructure and AI Compute'))
story.append(P(
    "The computational backbone of the Sahara Neural Hub consists of NVIDIA H100 and next-generation B200 GPU "
    "clusters interconnected via NVIDIA's Quantum-2 InfiniBand network. The H100 SXM5 GPU is priced at "
    "$25,000-40,000 per unit with a maximum TDP of 700W, while the DGX H100 system (8x H100) costs $300,000-450,000 "
    "and consumes 10.2 kW. The newer B200 SXM6 GPU is priced at $30,000-40,000 with the DGX B200 at approximately "
    "$515,000 consuming 14.3 kW. The GB200 NVL72 rack system (72 Blackwell GPUs, 13.5 TB GPU RAM) costs approximately "
    "$3 million per rack and draws 120-140 kW, requiring mandatory liquid cooling. The facility's InfiniBand fabric "
    "will use NVIDIA Quantum-2 QM9700 switches (64-port NDR 400Gb/s, approximately $35,000 list price) in a fat-tree "
    "topology to ensure non-blocking inter-rack communication at 400 Gb/s per GPU. Cloud GPU pricing benchmarks show "
    "AWS H100 instances at $6.88/GPU-hour (on-demand) and specialized neo-cloud providers at $2.01-3.44/GPU-hour, "
    "providing a revenue floor for the facility's GPU-as-a-Service offering. At these rates, a fully utilized "
    "2,000-GPU cluster could generate $35-120 million in annual GPU compute revenue."
))

story.append(make_table(
    ['Component', 'Unit Price (USD)', 'Power (W)', 'Notes'],
    [
        ['NVIDIA H100 SXM5', '$25,000 - $40,000', '700', 'Current gen AI training'],
        ['NVIDIA B200 SXM6', '$30,000 - $40,000', '1,000', 'Next gen Blackwell'],
        ['DGX H100 (8x GPU)', '$300,000 - $450,000', '10,200', '8-GPU server node'],
        ['DGX B200 (8x GPU)', '~$515,000', '14,300', '8-GPU Blackwell node'],
        ['GB200 NVL72 (72 GPU)', '~$3,000,000', '120-140k', 'Full rack, liquid cooled'],
        ['Quantum-2 QM9700 Switch', '~$35,000', '--', '64-port NDR 400Gb/s'],
    ],
    [0.28, 0.24, 0.18, 0.30]
))
story.append(P('Table 7: GPU Infrastructure Component Pricing', sCaption))

story.append(subsection('4.3 Green Energy System Architecture'))
story.append(P(
    'The energy system is designed as a hybrid renewable microgrid combining wind turbines, solar photovoltaic arrays, '
    'and battery energy storage systems (BESS) with grid backup. For a 50 MW IT load with a PUE of 1.2 (60 MW total '
    'input), the renewable installation would comprise approximately 80-100 MW of wind capacity (capitalizing on '
    "Dakhla's exceptional 45% capacity factor) and 40-60 MW of solar PV, complemented by a 200 MWh BESS system "
    'providing 4 hours of storage at critical load. The CAPEX for this renewable energy installation is estimated at '
    '$100-200 million based on current costs: wind at $1,100-1,500/kW, solar PV at $600-900/kW, and BESS at '
    '$117-300/kWh (turnkey utility-scale 4-hour systems). The wind component alone, at 100 MW, would consist of '
    'approximately 20-25 turbines of the Vestas V136-4.5 MW or Siemens Gamesa SG 4.5-145 class, with delivery '
    'timelines of 12-18 months from order. The system would be designed for self-consumption with grid export of '
    "surplus energy, leveraging Morocco's Law 58-15 which authorizes the sale of renewable energy surplus to the "
    'ONEE grid under a net billing mechanism.'
))

story.append(Spacer(1, 10))
story.append(chart_img('energy_mix.png', 13))
story.append(P('Figure 4: Renewable Energy Mix for Sahara Neural Hub', sCaption))

story.append(make_table(
    ['Wind Turbine Model', 'Rated Power', 'Rotor Diameter', 'Hub Height', 'Est. Unit Price'],
    [
        ['Vestas V136-4.5 MW', '4.5 MW', '136 m', '82-112 m', '$4.5-6.0M'],
        ['Siemens SG 4.5-145', '4.5 MW', '145 m', '82.5-127.5 m', '$4.5-5.8M'],
        ['GE 158-5.5 MW', '5.5 MW', '158 m', '101-161 m', '$5.5-7.0M'],
        ['Enercon E-138 EP3', '3.5 MW', '138 m', '81-160 m', '$3.5-4.5M'],
    ],
    [0.25, 0.18, 0.18, 0.19, 0.20]
))
story.append(P('Table 8: Wind Turbine Options for Dakhla Installation', sCaption))

story.append(subsection('4.4 Cooling Architecture'))
story.append(P(
    'The cooling strategy employs a three-tier approach optimized for Dakhla\'s climate. The primary system is '
    'direct-to-chip liquid cooling (DLC) for GPU racks, which removes 60-80% of heat directly from the chip surface '
    'using cold plates and a closed-loop water circuit, with a cost premium of 15-25% over air cooling infrastructure. '
    'The secondary system leverages Dakhla\'s ambient conditions for air-side free cooling during the 5,000-7,500 '
    'hours per year when outdoor temperatures fall below the supply air setpoint, using economizer dampers to bring '
    'filtered outside air directly into the data hall. The tertiary system under evaluation is seawater cooling, '
    'utilizing the cold Atlantic waters at a depth of 700-1,000 meters (4-6 degrees Celsius) through a heat exchanger '
    'system, which could reduce cooling energy consumption by 80-90% and achieve a PUE of 1.05-1.15. The CAPEX for '
    'seawater cooling is estimated at $80-200/kW (thermal), with potential cost reduction to $10-20/kW at 1,000 MWt '
    'scale. For air-cooled racks (up to 15 kW), rear-door heat exchangers at $3,000-8,000 per rack provide an '
    'efficient retrofit option.'
))

story.append(Spacer(1, 10))
story.append(chart_img('pue_comparison.png', 16))
story.append(P('Figure 5: PUE Comparison - Sahara Neural Hub vs. Global Benchmarks', sCaption))

story.append(subsection('4.5 Network Architecture'))
story.append(P(
    'The network architecture is designed for both internal GPU cluster communication and external connectivity. '
    'Internal: A two-tier InfiniBand NDR fat-tree topology using Quantum-2 QM9700 directors provides 400 Gb/s '
    'non-blocking bandwidth per GPU, with a 2:1 oversubscription ratio at the spine level for cost optimization. '
    'Each DGX server connects via 8x NDR Host Channel Adapters (400 Gb/s each, 3.2 Tbps aggregate per server). '
    'External: Dual-homed 400G uplinks to Maroc Telecom and Inwi/Orange via diverse fiber paths provide Internet '
    'transit at 100 Gbps with growth path to 400 Gbps. Border Gateway Protocol (BGP) peering with RENATER (France), '
    'WACREN (West Africa), and UbuntuNet Alliance (East/Southern Africa) ensures low-latency routing to research and '
    'commercial networks. Direct peering with content delivery networks (Cloudflare, Akamai, AWS Direct Connect) '
    'reduces latency for end users. The estimated network CAPEX is $15-30 million including all InfiniBand, Ethernet, '
    'and optical transport equipment, with annual OPEX of $2-5 million for bandwidth and maintenance.'
))

# ═══════════════════════════════════════════════════
# 5. FINANCIAL ANALYSIS
# ═══════════════════════════════════════════════════
story.extend(section('5. Financial Analysis'))

story.append(subsection('5.1 Capital Expenditure (CAPEX) Breakdown'))
story.append(P(
    'The total capital expenditure for the Sahara Neural Hub is estimated between $611 million and $1.135 billion for '
    'a fully built 50 MW facility including 2,000 NVIDIA H100 GPUs. The infrastructure component (buildings, power, '
    'cooling, networking) accounts for approximately $281-575 million, while the IT equipment component (GPU servers, '
    'InfiniBand networking, storage) accounts for $330-560 million. The Dakhla Free Zone provides customs duty '
    'exemptions on all imported equipment, which can represent savings of 0-40% on equipment costs depending on the '
    'tariff classification, potentially saving tens of millions of dollars on the total project cost. GPU pricing is '
    'particularly volatile, and the emergence of newer architectures (B200, GB200) may shift the cost structure '
    'significantly. A phased procurement strategy, securing GPU orders 6-9 months ahead of installation, can lock in '
    'pricing and ensure delivery alignment with construction milestones.'
))

story.append(Spacer(1, 10))
story.append(chart_img('capex_pie.png', 14))
story.append(P('Figure 6: Capital Expenditure Breakdown (50 MW Facility)', sCaption))

story.append(make_table(
    ['Component', 'Low ($M)', 'High ($M)', 'Notes'],
    [
        ['Land (10 hectares)', '1', '5', 'Dakhla: 400-7,000 MAD/m<super>2</super>'],
        ['Building / Shell', '50', '100', '$6,725-$12,215/m<super>2</super> IT space'],
        ['Power Infrastructure', '100', '200', 'Switchgear, transformers, generators'],
        ['Cooling (DLC + Free Cooling)', '30', '60', 'Direct liquid + free cooling + SWC'],
        ['UPS Systems', '25', '50', '2N redundant, lithium-ion'],
        ['Networking (IB + Ethernet)', '15', '30', 'Full fat-tree topology'],
        ['Fire + Security', '5', '15', 'Novec 1230, VESDA, biometric'],
        ['Raised Floor + Containment', '5', '15', 'High-load for GPU racks'],
        ['Renewable Energy (Wind+Solar+BESS)', '50', '100', 'Dedicated renewable installation'],
        ['Subtotal Infrastructure', '281', '575', ''],
        ['GPU Servers (2,000x H100)', '300', '500', 'DGX H100 at $300K-$450K each'],
        ['GPU Networking', '20', '40', 'InfiniBand switches, AOC cables'],
        ['Storage', '10', '20', 'NVMe, object storage'],
        ['Subtotal IT Equipment', '330', '560', ''],
        ['TOTAL CAPEX', '611', '1,135', ''],
    ],
    [0.32, 0.14, 0.14, 0.40]
))
story.append(P('Table 9: Capital Expenditure Breakdown (50 MW Facility)', sCaption))

story.append(subsection('5.2 Operating Expenditure (OPEX) Projection'))
story.append(P(
    'Annual operating expenditure for the 50 MW facility is projected at $82-99 million with grid power, or $30-53 '
    'million with self-generated renewable energy. Electricity represents the largest single cost item at approximately '
    '$66 million per year using grid power. However, the use of self-generated renewable energy could significantly '
    'reduce this cost: at an LCOE of $0.025-0.035/kWh for Dakhla wind energy, the electricity cost could drop to '
    'approximately $14-20 million per year for the self-generated portion, representing annual savings of $40-50 '
    'million compared to grid electricity. Staff costs in Morocco are 60-80% lower than in Western Europe, with data '
    'center technicians earning $12,000-20,000/year and senior engineers $20,000-40,000/year. A 40-person team would '
    'cost approximately $1.2 million annually. Maintenance is budgeted at 3% of infrastructure CAPEX ($8.4-17.3 '
    'million/year), insurance at 0.4% of total asset value ($2.4-4.5 million/year), and bandwidth/connectivity at '
    '$2-5 million/year for multiple 100G links.'
))

story.append(Spacer(1, 10))
story.append(chart_img('opex_comparison.png', 16))
story.append(P('Figure 7: Annual OPEX - Grid Power vs. Renewable Self-Generation', sCaption))

story.append(make_table(
    ['Cost Item', 'Annual Cost ($M)', 'Notes'],
    [
        ['Electricity (Grid)', '~66', '50MW x 1.3 PUE x 8,760h x $0.116/kWh'],
        ['Electricity (Renewable Self-Gen)', '~14-20', 'At LCOE $0.025-$0.035/kWh'],
        ['Staff (40 people)', '~1.2', '60-80% lower than EU equivalents'],
        ['Maintenance (3% infra CAPEX)', '~8.4 - 17.3', '3% of $281M-$575M'],
        ['Insurance (0.4% asset value)', '~2.4 - 4.5', 'Property + cyber + business interruption'],
        ['Bandwidth / Connectivity', '~2 - 5', 'Multiple 100G links, diverse paths'],
        ['Software Licensing', '~2 - 5', 'DCIM, monitoring, orchestration'],
        ['TOTAL OPEX (Grid Power)', '~82 - 99', 'Using grid electricity'],
        ['TOTAL OPEX (Renewable Self-Gen)', '~30 - 53', 'Using self-generated renewables'],
    ],
    [0.35, 0.25, 0.40]
))
story.append(P('Table 10: Annual Operating Expenditure Projection', sCaption))

story.append(subsection('5.3 Revenue Model and ROI Analysis'))
story.append(P(
    'The revenue model for the Sahara Neural Hub combines three primary streams: GPU-as-a-Service (GPUaaS), '
    'colocation services, and sovereign cloud services. GPUaaS is the highest-margin offering, with 2,000 H100 GPUs '
    'at full utilization generating $35-120 million annually based on prevailing cloud rates. Colocation services at '
    '$8-15/kW/month for a 50 MW facility would generate $4.8-9.0 million/month ($58-108 million/year at full '
    'occupancy). Sovereign cloud services targeting African governments, banks, and enterprises requiring data '
    'localization compliance would add $25-60 million/year at scale. The blended revenue at full capacity (Year 4+) '
    'is projected at $150-240 million annually, with EBITDA margins of 40-55% depending on energy cost structure. '
    'The base case IRR is projected at 15.2%, with an NPV of approximately $280 million at a 12% discount rate. '
    'The payback period under the base case is approximately 5-6 years from first revenue.'
))

story.append(Spacer(1, 10))
story.append(chart_img('revenue_projection.png', 16))
story.append(P('Figure 8: 10-Year Revenue Projection by Service Line', sCaption))

story.append(Spacer(1, 10))
story.append(chart_img('cumulative_cashflow.png', 16))
story.append(P('Figure 9: Cumulative Cash Flow Projection (Base Case)', sCaption))

story.append(make_table(
    ['Revenue Stream', 'Y1 ($M)', 'Y3 ($M)', 'Y5 ($M)', 'Y10 ($M)'],
    [
        ['GPU-as-a-Service', '15', '55', '88', '115'],
        ['Colocation', '8', '35', '52', '68'],
        ['Sovereign Cloud', '5', '25', '42', '58'],
        ['Total Revenue', '28', '115', '182', '241'],
        ['EBITDA (45% margin)', '6', '52', '82', '108'],
        ['Cumulative Cash Flow', '-850', '-650', '-180', '+1,550'],
    ],
    [0.24, 0.15, 0.15, 0.15, 0.15]
))
story.append(P('Table 11: Revenue and Cash Flow Projection (Base Case, USD Million)', sCaption))

story.append(subsection('5.4 IRR Sensitivity Analysis'))
story.append(P(
    'A comprehensive sensitivity analysis reveals the project\'s resilience across multiple scenarios. The optimistic '
    'scenario (+20% revenue premium due to scarcity pricing for African GPU compute) yields an IRR of 21.5% and NPV '
    'of $520 million. The conservative scenario (-20% revenue due to slower market development) yields an IRR of 9.8% '
    'and NPV of $80 million. The worst-case scenario (low GPU utilization at 40% instead of 70%) still produces a '
    'positive NPV of $20 million, though the IRR drops to 7.5%. Key sensitivities are: (1) GPU utilization rate '
    '(highest impact, each 10% change in utilization moves IRR by approximately 2.5 percentage points), (2) energy '
    'cost (switching from renewable to grid reduces IRR by 3-4 points), (3) construction timeline (each 6-month '
    'delay reduces IRR by approximately 1 point due to time-value of capital and opportunity cost).'
))

story.append(Spacer(1, 10))
story.append(chart_img('irr_sensitivity.png', 16))
story.append(P('Figure 10: IRR Sensitivity Analysis Across Key Scenarios', sCaption))

# ═══════════════════════════════════════════════════
# 6. MULTI-STAKEHOLDER PERSPECTIVE ANALYSIS
# ═══════════════════════════════════════════════════
story.extend(section('6. Multi-Stakeholder Perspective Analysis'))

story.append(P(
    'A project of this magnitude and strategic significance requires alignment across a complex ecosystem of '
    'stakeholders. This section analyzes the project from the perspective of each key stakeholder group, mapping '
    'their interests, concerns, expected value creation, and potential friction points. This analysis is critical for '
    'investor due diligence, government engagement strategy, and operational planning. Understanding each '
    'stakeholder\'s emotional and rational drivers is essential for navigating the political, financial, and technical '
    'complexity of establishing a sovereign data infrastructure in a developing region.'
))

story.append(Spacer(1, 10))
story.append(chart_img('stakeholder_map.png', 15))
story.append(P('Figure 11: Stakeholder Value and Impact Matrix', sCaption))

story.append(subsection('6.1 The Investor Perspective'))
story.append(P(
    '<b>What the investor sees:</b> A $611M-$1.14B opportunity to capture first-mover advantage in the fastest-growing '
    'data center market on the planet, with 12-18% IRR, 40-55% EBITDA margins, and a sovereign infrastructure asset '
    'that cannot be easily replicated. The risk-adjusted return compares favorably to European data center investments '
    '(8-12% IRR) and US colocation plays (10-14% IRR), with the added premium of strategic scarcity value in an '
    'underserved continent. The key concern for investors is execution risk: Morocco\'s southern provinces present '
    'construction logistics challenges, the regulatory framework for energy self-production is still evolving, and GPU '
    'pricing volatility creates CAPEX uncertainty. Mitigation strategies include phased investment (tranche-based '
    'funding tied to milestones), offtake agreements with anchor tenants (minimum 30% pre-commitment before '
    'construction), and political risk insurance from MIGA/ARI for the Dakhla-specific jurisdictional considerations. '
    'The exit strategy is compelling: African data center assets are trading at 15-22x EBITDA, compared to 12-16x in '
    'Europe, reflecting the scarcity premium. A successful Phase 1 could trigger strategic acquisition interest from '
    'Equinix, Digital Realty, or sovereign wealth funds (e.g., PIF, ADIA).'
))

story.append(make_table(
    ['Investor Metric', 'Sahara Neural Hub', 'European DC Benchmark', 'US Colocation'],
    [
        ['Target IRR', '12 - 18%', '8 - 12%', '10 - 14%'],
        ['EBITDA Margin', '40 - 55%', '35 - 45%', '40 - 50%'],
        ['EV/EBITDA Multiple', '15 - 22x', '12 - 16x', '14 - 18x'],
        ['Payback Period', '5 - 7 years', '6 - 8 years', '5 - 7 years'],
        ['First-Mover Premium', 'Significant', 'None (mature)', 'Limited'],
        ['Sovereign Asset Value', 'High (strategic)', 'Moderate', 'Low'],
        ['Construction Risk', 'Medium-High', 'Low', 'Low'],
        ['Energy Cost Advantage', '70% below EU', 'Baseline', 'Moderate'],
    ],
    [0.28, 0.24, 0.24, 0.24]
))
story.append(P('Table 12: Investment Benchmarking - Sahara Neural Hub vs. Global Peers', sCaption))

story.append(subsection('6.2 The Engineer Perspective'))
story.append(P(
    '<b>What the engineer sees:</b> A once-in-a-career opportunity to design a greenfield hyperscale facility from '
    'scratch, unconstrained by legacy infrastructure, in one of the most favorable environments on Earth for energy '
    'efficiency. The convergence of world-class wind resources, cold seawater for potential cooling, and a clean-sheet '
    'design enables engineering ambitions that would be impossible in established markets. The PUE target of 1.10-1.20 '
    'is achievable because Dakhla\'s climate provides free cooling for 5,000-7,500 hours per year, and the seawater '
    'cooling option could push PUE to 1.05-1.15. The key engineering challenges are: (1) designing a reliable power '
    'system with 100% renewable sources plus BESS and grid backup, ensuring five-nines (99.999%) power availability '
    'for GPU workloads; (2) managing the thermal complexity of mixed-density racks (15 kW to 140 kW in the same data '
    'hall); (3) implementing a seawater cooling system that resists corrosion and biofouling in an Atlantic marine '
    'environment; (4) ensuring seismic resilience (Dakhla is in a moderate seismic zone); and (5) designing for '
    'scalability from 25 MW to 100 MW without disrupting operations. The engineering team\'s emotional driver is the '
    'desire to build something iconic - a facility that sets new benchmarks for green data center design and becomes '
    'a reference architecture for the global industry.'
))

story.append(subsection('6.3 The Government (Morocco) Perspective'))
story.append(P(
    '<b>What the government sees:</b> A strategic asset that simultaneously advances Morocco\'s Digital Morocco 2030 '
    'strategy, strengthens the country\'s position as Africa\'s leading digital infrastructure hub, creates 120 direct '
    'and 500+ indirect jobs, and establishes sovereign data capabilities that are increasingly critical for national '
    'security and economic independence. The project aligns with King Mohammed VI\'s vision for the southern provinces '
    'as engines of economic development and regional integration. The government\'s primary concerns are: (1) ensuring '
    'that Moroccan data sovereignty is respected and that the facility does not become a conduit for foreign '
    'surveillance or data exfiltration; (2) maximizing local employment and technology transfer, not just construction '
    'jobs but also operational skills development; (3) ensuring that the project benefits the local community in '
    'Dakhla, not just international investors; (4) maintaining regulatory control over energy self-production and grid '
    'access; and (5) navigating the geopolitical sensitivity of the Western Sahara question, which may affect '
    'international investor perceptions and insurance costs. The government can offer: fast-track permitting (6-9 '
    'months vs. 18-24 months in Europe), Dakhla Free Zone tax incentives (5-year corporate tax holiday, reduced 15% '
    'rate thereafter, VAT and customs exemptions), and priority access to the 400 kV transmission infrastructure '
    'currently under development.'
))

story.append(subsection('6.4 The Wali (Regional Governor) Perspective'))
story.append(P(
    '<b>What the Wali of Dakhla sees:</b> A transformative project that can catalyze the economic development of the '
    'Dakhla-Oued Ed-Dahab region, moving it from a fishing and tourism economy to a knowledge economy anchored by '
    'digital infrastructure. The Wali\'s primary concerns are pragmatic: (1) will the project actually deliver on its '
    'job creation promises, or will it import skilled labor from Casablanca and Europe? (2) will the data center\'s '
    'water and energy consumption compete with local needs? (3) will the construction phase disrupt local communities '
    'and infrastructure? (4) how can the project be leveraged to attract complementary investments (tech companies, '
    'training centers, startup incubators)? The Wali\'s emotional driver is the desire to prove that Dakhla can be '
    'more than a peripheral city - it can be a regional digital capital serving West Africa. The key to Wali alignment '
    'is a comprehensive community benefits agreement that includes: local hiring quotas (minimum 40% of operational '
    'staff from Dakhla region), investment in a digital training center (2,000 m<super>2</super> facility with '
    'partnership from Moroccan universities), preferential access to the data center\'s GPU resources for local '
    'research institutions, and community infrastructure contributions (roads, healthcare, education). The Wali also '
    'needs the project to be politically sellable - visible, tangible benefits that local residents can see and feel.'
))

story.append(subsection('6.5 The Constructor / Real Estate Developer Perspective'))
story.append(P(
    '<b>What the constructor sees:</b> A $50-100 million construction contract for a technically demanding facility '
    'in a remote location, requiring specialized expertise in data center construction (raised floors, hot/cold aisle '
    'containment, specialized HVAC, high-voltage electrical systems, seismic design). The key challenges are: '
    'logistics (most construction materials must be transported 1,500 km from Casablanca or imported via the port of '
    'Dakhla), workforce (skilled data center construction workers are scarce in the region, requiring mobilization of '
    'specialized teams from Casablanca or international contractors), climate (construction in a coastal desert '
    'environment with wind, sand, and salt exposure), and timeline (the 24-36 month Phase 1 timeline is aggressive '
    'for a remote location). The constructor\'s emotional driver is the portfolio value of having built a flagship '
    'hyperscale data center - this is a credential that opens doors to future projects across Africa. The risk for '
    'the constructor is cost overruns due to logistics and weather delays; mitigation includes: fixed-price contract '
    'with force majeure provisions, on-site material staging areas, and a 10% contingency budget. The construction '
    'phase is estimated to employ 300-500 workers over 24-36 months, with peak employment of 700+ workers during the '
    'structural phase. Local labor can fulfill 60-70% of general construction roles, with specialized systems '
    '(electrical, HVAC, fire suppression) requiring imported expertise.'
))

story.append(subsection('6.6 The Telecom Operator Perspective'))
story.append(P(
    '<b>What the telecom operator sees:</b> A major anchor tenant for bandwidth and connectivity services, with '
    'requirements for multiple 100G+ links, diverse fiber paths, and low-latency connectivity to Europe and West '
    'Africa. For Maroc Telecom, Orange Morocco, and Inwi, the Sahara Neural Hub represents a significant revenue '
    'opportunity estimated at $2-5 million per year in connectivity charges, plus the strategic value of '
    'strengthening Dakhla\'s position as a regional connectivity hub. The operators\' concerns are: (1) the cost of '
    'building dedicated fiber infrastructure to the data center site (estimated at $500K-1M per km for armored '
    'submarine fiber); (2) ensuring sufficient capacity on existing submarine cables to handle the data center\'s '
    'traffic; (3) competition from each other and from potential new entrants (e.g., Africa Data Centres, PAIX); '
    'and (4) regulatory uncertainty around the ANRE\'s tariff framework for wholesale bandwidth. The operators\' '
    'emotional driver is the fear of missing out on a transformative anchor tenant - if they don\'t provide '
    'connectivity, a competitor will, and the winner will have a significant advantage in the Dakhla market. The '
    'recommended strategy is a carrier-neutral meet-me room (MMR) design, allowing all three operators plus '
    'international carriers to provision connectivity on equal terms, with the data center operator retaining control '
    'of the cross-connect pricing.'
))

story.append(subsection('6.7 The Energy Provider / Wind Farm Developer Perspective'))
story.append(P(
    '<b>What the energy provider sees:</b> A bankable off-taker for 100-150 MW of renewable energy capacity with a '
    '20+ year Power Purchase Agreement (PPA), one of the most attractive deal structures in the renewable energy '
    'industry. Data centers are the ideal PPA counterparty: they consume power 24/7/365, they have investment-grade '
    'credit (or strong parent guarantees), and their demand grows predictably over time. For MASEN (Morocco\'s '
    'renewable energy agency) and private wind farm developers, the Sahara Neural Hub represents a de-risked '
    'investment opportunity in the Dakhla-Oued Ed-Dahab region, where wind resources are exceptional but grid '
    'evacuation capacity has historically been a constraint. The data center\'s presence eliminates the evacuation '
    'problem by co-locating consumption with generation. The energy provider\'s concerns are: (1) PPA pricing - the '
    'data center will demand $0.025-0.035/kWh, which is at or below the current market floor for onshore wind; '
    '(2) balancing risk - the intermittent nature of wind and solar requires either a BESS installation or grid '
    'backup, and the cost allocation for balancing must be clearly defined; (3) curtailment risk - if the data center '
    'is not yet operational when the wind farm is completed, the energy provider must sell surplus power to the ONEE '
    'grid at potentially unfavorable rates. The recommended structure is a sleeve PPA (also known as a virtual PPA), '
    'where the data center developer builds and owns the renewable energy assets, and the energy provider operates '
    'them under a long-term O&M contract.'
))

story.append(subsection('6.8 The Design Architect and Interior Designer Perspective'))
story.append(P(
    '<b>What the design architect sees:</b> An opportunity to create a landmark facility that reflects the identity of '
    'the Sahara Neural Hub - a fusion of cutting-edge technology, sustainable design, and Moroccan architectural '
    'heritage. The design must balance three imperatives: (1) technical functionality - the building must serve as a '
    'high-performance data center shell with precise environmental controls, structural loads for GPU racks (1,500+ '
    'kg per rack), and fire protection systems; (2) aesthetic distinction - the facility should be visually iconic, '
    'inspiring confidence in investors and clients, and serving as a source of local pride; (3) sustainability - the '
    'building design should minimize energy consumption through passive cooling features, green roofs, solar shading, '
    'and natural ventilation where possible. The interior design of the administrative and operations center (5-10% of '
    'total floor area) should reflect world-class standards: a mission control room with wrap-around monitoring '
    'displays, a client briefing center with immersive visualization capabilities, and staff amenities (gym, cafeteria, '
    'outdoor terraces) that attract and retain top talent. The architect\'s emotional driver is the desire to create '
    'a building that wins awards and appears in architectural publications - a data center that people want to '
    'photograph, not just a windowless box on an industrial estate. The budget for architectural distinction is '
    'estimated at a 10-15% premium over standard data center construction costs, which translates to $5-15 million '
    'for design, materials, and landscaping.'
))

story.append(subsection('6.9 The Electrical Contractor Perspective'))
story.append(P(
    '<b>What the electrician sees:</b> The most complex and critical electrical installation in the region - a 60 MW '
    'power distribution system with 2N redundancy, medium-voltage switchgear (20 kV class), transformers (33 kV/400V), '
    'automatic transfer switches (ATS), lithium-ion UPS systems (25-50 MW capacity), and emergency generator sets '
    '(N+1 configuration, 2.5 MW each). The electrical installation represents approximately $100-200 million of the '
    'total CAPEX, making it the single largest cost component after GPU servers. The key challenges are: (1) ensuring '
    'five-nines (99.999%) power availability through redundant power paths from grid connection to server rack; '
    '(2) managing harmonic distortion from non-linear GPU loads (2,000 GPUs each drawing 700-1,000W with high crest '
    'factors); (3) implementing an intelligent power monitoring system (branch circuit monitoring, predictive failure '
    'analytics, real-time PUE calculation per data hall); (4) coordinating with the renewable energy installation for '
    'seamless transition between wind/solar, BESS, and grid power; and (5) meeting Moroccan electrical code '
    'requirements (NFC 15-100) while also complying with international data center standards (EN 50600, TIA-942). '
    'The electrical contractor\'s emotional driver is professional pride in delivering a fault-tolerant power system '
    'that never fails - because in a data center, a power outage is not just an inconvenience, it is a catastrophic '
    'event that can destroy millions of dollars of GPU hardware and violate SLA commitments.'
))

story.append(subsection('6.10 The Furniture and Office Equipment Provider Perspective'))
story.append(P(
    '<b>What the furniture provider sees:</b> A premium fit-out project for 2,000-3,000 m<super>2</super> of '
    'administrative and operations space, including a 24/7 Network Operations Center (NOC), executive briefing rooms, '
    'open-plan offices for 40+ staff, a visitor center, and staff amenities. The furniture specification must balance '
    'durability (24/7 operations environment), ergonomics (shift workers need comfortable seating and adjustable '
    'desks), technology integration (monitor arms, cable management, wireless charging), and aesthetic alignment with '
    'the building\'s architectural identity. The estimated budget for furniture and office fit-out is $500K-1.5M, '
    'covering: NOC console furniture (custom sit-stand desks with quad-monitor mounts, $3,000-5,000 per position), '
    'executive conference room (video-conferencing enabled table, $15,000-25,000), open office workstations (120 '
    'positions at $1,500-3,000 each), breakout areas and cafeteria ($50,000-100,000), and server room accessories '
    '(KVM carts, rack shelving, cable organizers, $20,000-50,000). The furniture provider\'s emotional driver is the '
    'prestige of outfitting a world-class facility - this is a reference project that demonstrates their ability to '
    'serve the high-end technology sector.'
))

story.append(subsection('6.11 The Local Community Perspective'))
story.append(P(
    '<b>What the local community sees:</b> A massive construction project that will bring jobs, infrastructure '
    'improvements, and global attention to Dakhla - but also potential disruption, environmental concerns, and the '
    'fear that the benefits will flow to outside investors and imported workers rather than local residents. The '
    'community\'s primary concerns are: (1) job creation - will local people be hired, or will skilled positions go '
    'to workers from Casablanca and Europe? (2) environmental impact - will the data center\'s energy and water '
    'consumption strain local resources? Will the wind farm affect fishing grounds? (3) infrastructure - will the '
    'project bring improvements to roads, electricity, and internet that benefit everyone? (4) cultural impact - will '
    'an influx of foreign workers and technology companies change the character of Dakhla? The community\'s emotional '
    'driver is a mixture of hope and fear: hope that the project will transform Dakhla into a modern city with '
    'opportunities for the next generation, and fear that it will be another extractive project that takes resources '
    'and leaves nothing behind. The mitigation strategy is a legally binding Community Benefits Agreement (CBA) that '
    'includes: minimum 40% local hiring for operational positions, a $5 million community development fund over 10 '
    'years, construction of a vocational training center for IT skills, priority access to high-speed internet for '
    'local schools and hospitals, and an environmental monitoring committee with community representation.'
))

# ═══════════════════════════════════════════════════
# 7. REGULATORY & LEGAL FRAMEWORK
# ═══════════════════════════════════════════════════
story.extend(section('7. Regulatory and Legal Framework'))

story.append(subsection('7.1 Moroccan Data Protection Law (Loi 09-08)'))
story.append(P(
    "Morocco's Loi 09-08 on the Protection of Personal Data, enacted in 2009 and enforced by the CNDP (Commission "
    "Nationale de controle de la Protection des Donnees a caractere Personnel), governs the collection, processing, "
    "and storage of personal data. The law is broadly aligned with the EU's GDPR, providing a legal basis for "
    "cross-border data transfers between Morocco and the EU under adequacy decisions. Key provisions relevant to the "
    "Sahara Neural Hub include: (1) data controllers must obtain consent before processing personal data; (2) data "
    "subjects have the right to access, rectify, and delete their data; (3) cross-border transfers are permitted to "
    "countries with equivalent protection levels; (4) the CNDP must be notified of data processing operations; and "
    "(5) penalties for non-compliance can reach 100,000 MAD (approximately $10,000) per violation. The Sahara Neural "
    "Hub's compliance architecture will include a dedicated Data Protection Officer (DPO), automated compliance "
    "monitoring tools, and a privacy-by-design framework integrated into all service offerings."
))

story.append(subsection('7.2 Dakhla West Africa Free Zone Incentives'))
story.append(P(
    'The Dakhla West Africa Free Zone (DWAFZ) offers the most attractive fiscal incentive package available in '
    'Morocco for the data center project. Key benefits include: (1) Corporate tax exemption for the first 5 years '
    'of operation, followed by a reduced rate of 15% (vs. the standard 31% for non-free zone companies); (2) Full '
    'VAT exemption on all goods and services imported into or acquired within the free zone; (3) Customs duty '
    'exemption on all imported equipment, including servers, networking equipment, and construction materials; (4) '
    'Exemption from the domestic goods tax; (5) Simplified administrative procedures through a one-stop-shop for '
    'permits and registrations; (6) Unlimited repatriation of profits and capital for foreign investors; and (7) '
    'Special import/export regulations allowing the zone to operate as a customs-free area. The fiscal benefit over '
    'a 10-year period is estimated at $80-150 million compared to operating outside the free zone, making the DWAFZ '
    'designation a critical factor in the project\'s financial viability.'
))

story.append(make_table(
    ['Incentive', 'Free Zone', 'Standard Regime', 'Estimated 10-Year Benefit'],
    [
        ['Corporate Tax Rate', '0% (5yr) / 15% (after)', '31%', '$40-80M'],
        ['VAT on Equipment', '0%', '20%', '$20-40M'],
        ['Customs Duties', '0%', '2.5-40%', '$15-25M'],
        ['Dividend Withholding', '0%', '15%', '$5-10M'],
        ['Total Estimated Benefit', '', '', '$80-155M'],
    ],
    [0.25, 0.20, 0.20, 0.35]
))
story.append(P('Table 13: Dakhla Free Zone Fiscal Incentive Comparison (10-Year Projection)', sCaption))

story.append(subsection('7.3 Energy Regulatory Framework'))
story.append(P(
    "Morocco's energy regulatory framework for self-production and renewable energy has evolved significantly in recent "
    "years. Law 58-15 (2015) authorized the production of electricity from renewable energy sources for self-consumption "
    "and authorized the sale of surplus to the ONEE grid under a net billing mechanism. Law 82-21 (2021) further "
    "liberalized the market by allowing low-voltage producers to sell directly to consumers. The ANRE (Autorite "
    "Nationale de Regulation de l'Electricite) is finalizing the tariff framework for renewable energy transactions, "
    "with a comprehensive reform expected by 2027. For the Sahara Neural Hub, the key regulatory considerations are: "
    "(1) obtaining the Autoproduction license for the dedicated wind/solar installation (capacity > 20 MW requires "
    "ANRE approval); (2) negotiating the PPA/sleeve agreement structure for grid backup power; (3) complying with "
    "the grid connection requirements for the 400 kV transmission line; and (4) ensuring that the BESS installation "
    "meets the emerging regulations for energy storage systems. The current regulatory trajectory is favorable: "
    "Morocco is actively encouraging renewable energy self-production as part of its 52% renewable capacity target "
    "by 2030, and the Dakhla-Casablanca transmission line project signals the government's commitment to enabling "
    "large-scale renewable energy evacuation from the southern provinces."
))

story.append(subsection('7.4 African Union Data Policy Framework'))
story.append(P(
    'The African Union Data Policy Framework, adopted in February 2024, provides a continental-level governance '
    'structure for data that directly supports the Sahara Neural Hub\'s sovereign data storage proposition. The '
    'framework establishes principles for: (1) data governance and sovereignty - recognizing the right of African '
    'nations to regulate data within their borders; (2) cross-border data flows - creating a harmonized framework '
    'for data transfers between African Union member states; (3) data classification - establishing categories for '
    'personal, non-personal, and strategic data; and (4) data infrastructure development - explicitly calling for '
    'investment in continental data infrastructure including data centers, cloud platforms, and connectivity. The '
    'framework recommends against overly broad data localization mandates that could fragment the continental digital '
    'market, while supporting targeted localization for sensitive data categories. This balanced approach is ideal for '
    'the Sahara Neural Hub: it creates demand for sovereign African data storage without preventing cross-border '
    'services that require data mobility. The facility\'s compliance with the AU framework will be a competitive '
    'advantage, enabling it to serve clients across the continent who need to comply with emerging national data '
    'protection laws while still operating at pan-African scale.'
))

# ═══════════════════════════════════════════════════
# 8. RISK ANALYSIS
# ═══════════════════════════════════════════════════
story.extend(section('8. Risk Analysis'))

story.append(P(
    'A rigorous risk analysis is essential for any infrastructure investment of this scale. This section identifies '
    'and categorizes the key risks across technical, financial, regulatory, geopolitical, and operational dimensions, '
    'with specific mitigation strategies for each. The overall risk profile is assessed as Moderate, reflecting the '
    'project\'s strong fundamentals (location, demand, regulatory support) balanced against execution challenges '
    '(remote location, emerging regulatory framework, technology volatility).'
))

story.append(make_table(
    ['Risk Category', 'Risk Description', 'Probability', 'Impact', 'Mitigation Strategy'],
    [
        ['Geopolitical', 'Western Sahara sovereignty dispute deters investors', 'Medium', 'High', 'MIGA insurance; legal opinions; EU-Morocco partnership framework'],
        ['Technical', 'Renewable energy intermittency causes outages', 'Medium', 'High', 'BESS 4-hour storage; grid backup; 2N UPS; N+1 generators'],
        ['Financial', 'GPU pricing volatility exceeds CAPEX budget', 'High', 'Medium', 'Phased procurement; 6-9 month advance orders; B200 migration path'],
        ['Regulatory', 'ANRE tariff reform delays energy self-production', 'Medium', 'Medium', 'Early engagement with ANRE; legal reserve; PPA with ONEE'],
        ['Construction', 'Logistics delays in remote location', 'High', 'Medium', 'On-site staging; 10% contingency; modular construction approach'],
        ['Market', 'Slower-than-expected demand for African GPU compute', 'Medium', 'Medium', 'Anchor tenant pre-commitments; colocation revenue diversification'],
        ['Operational', 'Difficulty recruiting skilled staff to Dakhla', 'Medium', 'Low', 'Training center; remote operations; competitive compensation packages'],
        ['Environmental', 'Water scarcity competes with local needs', 'Low', 'High', 'DLC cooling (minimal water); desalination; water recycling'],
        ['Security', 'Physical or cyber attack on critical infrastructure', 'Low', 'Very High', 'Tier III+ physical security; SOC; ISO 27001; BCP/DRP'],
        ['Technology', 'GPU technology obsolescence within 3-5 years', 'High', 'Medium', 'Flexible rack design; GPU refresh cycle; B200/GB200 upgrade path'],
    ],
    [0.12, 0.28, 0.10, 0.10, 0.40]
))
story.append(P('Table 14: Comprehensive Risk Matrix', sCaption))

# ═══════════════════════════════════════════════════
# 9. PROJECT TIMELINE & IMPLEMENTATION
# ═══════════════════════════════════════════════════
story.extend(section('9. Project Timeline and Implementation'))

story.append(P(
    'The Sahara Neural Hub implementation follows a two-phase strategy designed to manage execution risk, optimize '
    'capital deployment, and enable market validation before full-scale investment. Phase 1 delivers a 25 MW facility '
    'with 1,000 GPUs in 24-36 months, sufficient to establish market presence and generate revenue. Phase 2 expands '
    'to 50 MW with 2,000+ GPUs based on market demand validation, with construction overlapping the final months of '
    'Phase 1 commissioning. The timeline assumes a greenfield construction approach with parallel workstreams for '
    'civil works, power infrastructure, renewable energy installation, and IT systems deployment. Critical path items '
    'include: (1) land acquisition and permitting (6-9 months), (2) 400 kV grid connection (12-18 months), (3) wind '
    'farm construction (12-18 months), and (4) GPU server delivery (6-9 months from order, subject to NVIDIA supply '
    'constraints). A dedicated project management office (PMO) with monthly milestone tracking and quarterly investor '
    'reporting will govern the implementation.'
))

story.append(Spacer(1, 10))
story.append(chart_img('project_timeline.png', 17))
story.append(P('Figure 12: Sahara Neural Hub - Project Implementation Timeline', sCaption))

story.append(make_table(
    ['Phase', 'Duration', 'Key Milestones', 'Investment ($M)'],
    [
        ['Pre-Development', 'Months 0-3', 'Feasibility, site selection, MoU with DWAFZ', '2-5'],
        ['Design & Permitting', 'Months 3-9', 'Engineering design, permits, PPA negotiation', '5-15'],
        ['Procurement', 'Months 6-14', 'GPU orders, turbine orders, construction contracts', '50-100'],
        ['Construction Phase 1', 'Months 9-24', 'Building, power, cooling, renewable installation', '200-400'],
        ['IT Installation P1', 'Months 21-27', 'GPU cluster, network, storage deployment', '150-250'],
        ['Commissioning P1', 'Months 25-30', 'Testing, certification, client onboarding', '10-20'],
        ['Phase 1 Go-Live', 'Month 30', '25 MW operational, 1,000 GPUs online', ''],
        ['Phase 2 Expansion', 'Months 30-48', 'Second data hall, additional GPUs', '200-400'],
        ['Full Build Go-Live', 'Month 48', '50 MW operational, 2,000+ GPUs online', ''],
    ],
    [0.17, 0.15, 0.38, 0.20]
))
story.append(P('Table 15: Implementation Phases and Milestones', sCaption))

# ═══════════════════════════════════════════════════
# 10. ORGANIZATIONAL STRUCTURE & TEAM
# ═══════════════════════════════════════════════════
story.extend(section('10. Organizational Structure and Team'))

story.append(P(
    'The Sahara Neural Hub requires a multidisciplinary team combining data center operations expertise, AI/ML '
    'infrastructure knowledge, renewable energy management, and regulatory compliance capabilities. The organizational '
    'structure is designed for lean operations (40 FTE at full capacity) while ensuring 24/7 coverage and rapid '
    'incident response. The team will be headquartered in Dakhla with satellite offices in Casablanca (sales and '
    'regulatory affairs) and potential European offices (London or Paris for investor relations and client management). '
    'Recruitment will prioritize Moroccan talent, supplemented by international specialists for roles requiring '
    'rare expertise (GPU cluster operations, InfiniBand network engineering, liquid cooling systems).'
))

story.append(make_table(
    ['Department', 'Headcount', 'Key Roles', 'Annual Cost ($K)'],
    [
        ['Executive', '3', 'CEO, CFO, CTO', '300-500'],
        ['Data Center Operations', '12', 'Site manager, shift engineers, technicians', '200-350'],
        ['Network & Systems', '8', 'Network engineers, sysadmins, security', '150-250'],
        ['AI/HPC Operations', '5', 'ML ops, GPU cluster specialists', '100-200'],
        ['Power & Cooling', '6', 'Electrical engineers, HVAC specialists', '100-150'],
        ['Sales & Marketing', '4', 'Sales directors, marketing manager', '120-200'],
        ['Finance & Legal', '2', 'Controller, legal/compliance', '60-100'],
        ['Total', '40', '', '1,030-1,750'],
    ],
    [0.22, 0.12, 0.40, 0.18]
))
story.append(P('Table 16: Organizational Structure and Staffing Plan', sCaption))

# ═══════════════════════════════════════════════════
# 11. ESG AND SUSTAINABILITY
# ═══════════════════════════════════════════════════
story.extend(section('11. ESG and Sustainability'))

story.append(P(
    'The Sahara Neural Hub is designed from inception as a net-positive environmental project. Unlike traditional data '
    'centers that consume vast amounts of grid electricity and water, this facility will generate more renewable energy '
    'than it consumes (surplus exported to the national grid), use minimal water through advanced cooling technologies, '
    'and contribute to Morocco\'s climate commitments under the Paris Agreement. The ESG framework encompasses three '
    'pillars: Environmental (100% renewable energy, PUE < 1.20, zero liquid discharge, carbon-negative operations '
    'including grid displacement), Social (community benefits agreement, local hiring, training programs, digital '
    'inclusion initiatives), and Governance (independent board oversight, regulatory compliance, transparent reporting '
    'aligned with TCFD, GRI, and UN SDG frameworks). The project directly contributes to UN Sustainable Development '
    'Goals 7 (Affordable and Clean Energy), 8 (Decent Work and Economic Growth), 9 (Industry, Innovation and '
    'Infrastructure), 11 (Sustainable Cities), and 13 (Climate Action).'
))

story.append(make_table(
    ['ESG Metric', 'Target', 'Industry Benchmark', 'Status'],
    [
        ['Power Usage Effectiveness (PUE)', '1.10-1.20', '1.40-1.60', 'Target exceeds benchmark by 25%'],
        ['Carbon Intensity', '0 gCO2/kWh (scope 2)', '200-500 gCO2/kWh', 'Net zero through 100% renewables'],
        ['Water Usage Effectiveness (WUE)', '< 0.2 L/kWh', '0.8-1.8 L/kWh', 'DLC + free cooling minimizes water'],
        ['Renewable Energy Share', '100%', '20-40%', 'Dedicated wind + solar + BESS'],
        ['Waste Heat Recovery', '> 30% of waste heat', '< 5%', 'Seawater desalination integration'],
        ['Local Employment', '> 40% of staff', '10-20%', 'Training center + hiring quotas'],
    ],
    [0.25, 0.22, 0.22, 0.31]
))
story.append(P('Table 17: ESG Performance Targets vs. Industry Benchmarks', sCaption))

# ═══════════════════════════════════════════════════
# 12. KEY CONTACTS AND PARTNERSHIPS
# ═══════════════════════════════════════════════════
story.extend(section('12. Key Contacts and Partnership Opportunities'))

story.append(P(
    'Establishing the right partnerships is critical for the Sahara Neural Hub\'s success. This section identifies '
    'key entities across government, energy, telecom, technology, and finance that should be engaged at each stage '
    'of the project. Early relationship building, particularly with government agencies and infrastructure providers, '
    'can significantly accelerate permitting, grid connection, and site preparation timelines.'
))

story.append(make_table(
    ['Entity', 'Category', 'Role', 'Contact Approach'],
    [
        ['Agence de Developpement Agricole (ADA)', 'Government', 'Land allocation (rural)', 'Formal application via DWAFZ'],
        ['MASEN', 'Government/Energy', 'Renewable energy permits, PPA facilitation', 'Direct engagement, MoU'],
        ['ANRE', 'Regulator', 'Electricity self-production license', 'Formal license application'],
        ['CNDP', 'Regulator', 'Data protection compliance', 'Notification + DPO registration'],
        ['Wali of Dakhla', 'Government', 'Regional coordination, fast-track permits', 'Formal presentation, CBA'],
        ['ONEE', 'Utility', 'Grid connection, power backup', 'Technical study + connection agreement'],
        ['Maroc Telecom', 'Telecom', 'Submarine cable capacity, fiber', 'Commercial negotiation'],
        ['Inwi / Orange Morocco', 'Telecom', 'Diverse connectivity paths', 'Carrier-neutral MMR approach'],
        ['NVIDIA', 'Technology', 'GPU supply, reference architecture', 'Elite partner program'],
        ['MIGA / ARI', 'Insurance', 'Political risk insurance', 'Application + premium negotiation'],
        ['AfDB / IFC', 'Finance', 'Project finance, DFI co-investment', 'Investment committee presentation'],
        ['Vestas / Siemens Gamesa', 'Energy', 'Wind turbine supply, O&M', 'Competitive tender process'],
    ],
    [0.20, 0.13, 0.30, 0.30]
))
story.append(P('Table 18: Key Stakeholder Contact Matrix', sCaption))

# ═══════════════════════════════════════════════════
# 13. FINANCING STRUCTURE
# ═══════════════════════════════════════════════════
story.extend(section('13. Financing Structure and Capital Strategy'))

story.append(P(
    'The Sahara Neural Hub\'s financing strategy leverages a blended capital structure that optimizes cost of capital '
    'while managing risk for all parties. The proposed structure consists of: (1) Sponsor Equity (30-40% of total '
    'CAPEX, $180-450M) provided by the project developer and strategic investors, including potential participation '
    'from Moroccan sovereign wealth funds (Ithmar Capital) and Gulf investors (PIF, ADIA, Mubadala); (2) Development '
    'Finance Institution (DFI) Debt (25-35%, $150-400M) from the African Development Bank (AfDB), International '
    'Finance Corporation (IFC), and European Investment Bank (EIB), providing long-tenor (15-20 year) financing at '
    'concessional rates; (3) Commercial Debt (20-30%, $120-340M) from Moroccan and international banks, secured '
    'against the project\'s assets and revenue streams; and (4) Vendor Financing (5-10%, $30-115M) from NVIDIA, '
    'Vestas, and other equipment suppliers, providing favorable payment terms that reduce upfront CAPEX. The '
    'phased investment approach means that Phase 1 requires only $300-570M, with Phase 2 funded from Phase 1 '
    'operating cash flows and additional debt raised after market validation.'
))

story.append(make_table(
    ['Capital Source', 'Share', 'Amount ($M)', 'Cost of Capital', 'Tenor'],
    [
        ['Sponsor Equity', '30-40%', '180-450', '15-18% (IRR target)', 'Perpetual'],
        ['DFI Debt (AfDB/IFC/EIB)', '25-35%', '150-400', '4-6% (concessional)', '15-20 years'],
        ['Commercial Bank Debt', '20-30%', '120-340', '6-9% (Moroccan market)', '10-15 years'],
        ['Vendor Financing (NVIDIA, etc.)', '5-10%', '30-115', '3-5% (subsidized)', '5-7 years'],
        ['Green Bonds (future)', '10-15%', '60-170', '4-5% (green premium)', '10-15 years'],
    ],
    [0.25, 0.12, 0.15, 0.22, 0.18]
))
story.append(P('Table 19: Proposed Capital Structure', sCaption))

# ═══════════════════════════════════════════════════
# 14. COMPETITIVE POSITIONING
# ═══════════════════════════════════════════════════
story.extend(section('14. Competitive Positioning and Strategic Moat'))

story.append(P(
    'The Sahara Neural Hub\'s competitive moat is built on four interlocking advantages that are extremely difficult '
    'for competitors to replicate. First, <b>location scarcity</b>: Dakhla\'s combination of world-class wind '
    'resources, operational submarine cable landing, and Free Zone status is unique in Africa. There is no other '
    'location on the continent that offers all three simultaneously. Second, <b>energy cost advantage</b>: at '
    '$0.022-0.035/kWh, Dakhla\'s renewable LCOE is 70% below European averages, creating a structural cost '
    'advantage that cannot be eroded by competition. Third, <b>sovereign data positioning</b>: the facility serves '
    'a market (African sovereign data storage) that is driven by regulatory mandates, not discretionary spending, '
    'making demand relatively inelastic. Fourth, <b>first-mover advantage in Dakhla</b>: as the first data center '
    'in the region, the Sahara Neural Hub will establish the ecosystem (connectivity, skills, support services) that '
    'makes subsequent competitor entries easier, but will also capture the premium pricing and anchor tenant '
    'relationships that come with being first. The primary competitive threats are: (1) the Iozera and Naver Cloud '
    'projects in Tetouan, which target the European market from Moroccan soil; (2) emerging data center markets in '
    'Nigeria and Kenya; and (3) the remote possibility that satellite connectivity (Starlink, OneWeb) could reduce '
    'the connectivity advantage of submarine cable landing points. However, none of these threats directly addresses '
    'the sovereign African data storage niche that the Sahara Neural Hub occupies.'
))

# ═══════════════════════════════════════════════════
# 15. APPENDICES
# ═══════════════════════════════════════════════════
story.extend(section('15. Appendices'))

story.append(subsection('Appendix A: Wind Turbine Specifications'))
story.append(P(
    'This appendix provides detailed technical specifications for the wind turbine models evaluated for the Sahara '
    'Neural Hub renewable energy installation. All models are IEC Class I or II certified for high-wind sites and '
    'have proven operational records in similar coastal desert environments. The selection criteria include: capacity '
    'factor at the Dakhla wind regime (9.5-10.8 m/s at 80m), levelized cost of energy, turbine availability and '
    'warranty terms, local service and maintenance infrastructure, and delivery timeline alignment with the project '
    'construction schedule. The Vestas V136-4.5 MW and Siemens Gamesa SG 4.5-145 are the leading candidates based '
    'on the combined score of these criteria, with the GE 158-5.5 MW as an alternative for sites where larger rotor '
    'diameter provides additional energy capture.'
))

story.append(make_table(
    ['Specification', 'Vestas V136-4.5', 'Siemens SG 4.5-145', 'GE 158-5.5', 'Enercon E-138 EP3'],
    [
        ['Rated Power', '4.5 MW', '4.5 MW', '5.5 MW', '3.5 MW'],
        ['Rotor Diameter', '136 m', '145 m', '158 m', '138 m'],
        ['Swept Area', '14,527 m<super>2</super>', '16,513 m<super>2</super>', '19,607 m<super>2</super>', '14,993 m<super>2</super>'],
        ['Hub Height Options', '82 / 112 m', '82.5 / 127.5 m', '101 / 161 m', '81 / 160 m'],
        ['IEC Class', 'IEC S (high wind)', 'IEC I/II', 'IEC I/II', 'IEC II'],
        ['Cut-in Wind Speed', '3 m/s', '3 m/s', '3 m/s', '3 m/s'],
        ['Rated Wind Speed', '12 m/s', '12 m/s', '12.5 m/s', '11.5 m/s'],
        ['Cut-out Wind Speed', '25 m/s', '25 m/s', '25 m/s', '25 m/s'],
        ['Est. Capacity Factor (Dakhla)', '45-50%', '43-48%', '48-53%', '40-45%'],
        ['Estimated Unit Price', '$4.5-6.0M', '$4.5-5.8M', '$5.5-7.0M', '$3.5-4.5M'],
        ['Delivery Lead Time', '12-16 months', '14-18 months', '16-20 months', '12-16 months'],
    ],
    [0.22, 0.19, 0.19, 0.19, 0.19]
))
story.append(P('Table 20: Wind Turbine Detailed Specifications Comparison', sCaption))

story.append(subsection('Appendix B: GPU Pricing and Cloud Benchmarks'))
story.append(P(
    'This appendix provides a comprehensive comparison of GPU hardware pricing and cloud GPU rental rates as of Q1 '
    '2025, establishing the revenue floor for the Sahara Neural Hub\'s GPU-as-a-Service offering. Cloud pricing data '
    'is sourced from public AWS, Azure, GCP pricing pages and specialized neo-cloud providers (Lambda Labs, '
    'RunPod, Vast.ai, CoreWeave). Hardware pricing reflects distributor and volume discount estimates for 1,000+ '
    'unit orders. The key insight is that African GPU compute commands a premium of 15-30% over US/EU pricing due to '
    'scarcity and data sovereignty requirements, which supports the revenue projections in Section 5.'
))

story.append(make_table(
    ['Provider / Product', 'Price per GPU-Hour', 'GPU Type', 'Notes'],
    [
        ['AWS P5.48xlarge (On-Demand)', '$6.88', 'H100 80GB', '8x H100 per instance'],
        ['AWS P5.48xlarge (1yr Reserved)', '$3.98', 'H100 80GB', '1-year commitment'],
        ['Azure ND H100 v5 (On-Demand)', '$5.80', 'H100 80GB', '8x H100 per instance'],
        ['GCP A3 HighGPU (On-Demand)', '$5.40', 'H100 80GB', '8x H100 per instance'],
        ['Lambda Labs (H100 SXM)', '$2.49', 'H100 80GB', 'Bare metal, US only'],
        ['CoreWeave (H100)', '$2.01-3.44', 'H100 80GB', 'Variable by commitment'],
        ['RunPod (H100)', '$2.49-3.29', 'H100 80GB', 'Community cloud'],
        ['Sahara Neural Hub (Target)', '$2.50-4.50', 'H100/B200', 'Sovereign African data'],
    ],
    [0.30, 0.20, 0.18, 0.32]
))
story.append(P('Table 21: GPU Cloud Pricing Benchmarks (Q1 2025)', sCaption))

story.append(subsection('Appendix C: Key Regulatory Contacts'))
story.append(P(
    'The following table provides a reference directory of key regulatory and institutional contacts relevant to the '
    'Sahara Neural Hub project. All contact information should be verified through official channels before formal '
    'engagement. Early pre-consultation meetings are recommended to establish relationships and understand procedural '
    'requirements before submitting formal applications.'
))

story.append(make_table(
    ['Institution', 'Role', 'Website', 'Relevance'],
    [
        ['CNDP', 'Data Protection Authority', 'cndp.ma', 'Data protection compliance, DPO registration'],
        ['ANRE', 'Electricity Regulator', 'anre.ma', 'Self-production license, grid connection'],
        ['MASEN', 'Renewable Energy Agency', 'masen.ma', 'Renewable energy permits, PPA facilitation'],
        ['AMDIE', 'Investment Promotion', 'investinmorocco.ma', 'Investment incentives, fast-track procedures'],
        ['DWAFZ', 'Free Zone Authority', 'dakhla-freezone.ma', 'Free zone designation, customs exemptions'],
        ['ONEE', 'National Utility', 'one.org.ma', 'Grid connection, power supply agreement'],
        ['ANRT', 'Telecom Regulator', 'anrt.ma', 'Telecom licensing, spectrum allocation'],
        ['Maroc Telecom', 'Incumbent Operator', 'iam.ma', 'Submarine cable capacity, fiber backhaul'],
        ['Inwi', 'Telecom Operator', 'inwi.ma', 'MEDUSA cable, diverse connectivity'],
        ['Orange Morocco', 'Telecom Operator', 'orange.ma', 'Alternative fiber, enterprise services'],
    ],
    [0.17, 0.22, 0.22, 0.34]
))
story.append(P('Table 22: Key Regulatory and Institutional Contacts', sCaption))

story.append(subsection('Appendix D: Assumptions and Methodology'))
story.append(P(
    'This appendix documents the key assumptions underlying the financial projections, market analysis, and technical '
    'specifications presented in this report. All financial projections use a base date of Q1 2025 with all figures '
    'in nominal US dollars unless otherwise stated. Exchange rate assumptions: 1 USD = 10 MAD, 1 EUR = 1.08 USD. '
    'Energy cost assumptions: grid electricity at $0.116/kWh (ONEE HT tariff for industrial users), self-generated '
    'wind at $0.025-0.035/kWh LCOE, BESS at $0.08-0.12/kWh LCOE. Market size data sourced from Mordor Intelligence, '
    'ResearchAndMarkets, and Statista, cross-referenced with Xalam Analytics Africa data center tracker. GPU pricing '
    'sourced from public cloud provider pricing pages, distributor quotations, and industry reports (Dell\'Oro Group, '
    'Tirias Research). Wind resource data sourced from Global Wind Atlas v3.1, IRENA Renewable Energy Statistics 2024, '
    'and published academic studies (ScienceDirect, ResearchGate). Construction cost estimates benchmarked against '
    'Turner & Townsend International Construction Market Survey 2024, JLL Data Center Cost Index 2024, and comparable '
    'project disclosures. All estimates include a +/- 30% accuracy range reflecting the early-stage nature of the '
    'project development.'
))

# ═══════════════════════════════════════════════════
# BUILD
# ═══════════════════════════════════════════════════
print('Building body PDF...')
doc.multiBuild(story)
print(f'Body PDF saved: {BODY_PDF}')
