#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Hyperscale Green Data Center Dakhla - Comprehensive Investment Report
Sovereign African Data Storage - Decentralized High-Performance Computing
"""

import os, sys, hashlib
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch, cm, mm
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY, TA_RIGHT
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether, CondPageBreak, Image
)
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily

# ━━ Palette ━━
ACCENT       = colors.HexColor('#d82f4b')
TEXT_PRIMARY  = colors.HexColor('#1e1f21')
TEXT_MUTED    = colors.HexColor('#7b8187')
BG_SURFACE   = colors.HexColor('#d7dbe0')
BG_PAGE      = colors.HexColor('#eceef0')
TABLE_HEADER_COLOR = ACCENT
TABLE_HEADER_TEXT  = colors.white
TABLE_ROW_EVEN     = colors.white
TABLE_ROW_ODD      = BG_SURFACE

# ━━ Font Registration ━━
pdfmetrics.registerFont(TTFont('LiberationSerif', '/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf'))
pdfmetrics.registerFont(TTFont('LiberationSerif-Bold', '/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf'))
pdfmetrics.registerFont(TTFont('Carlito', '/usr/share/fonts/truetype/english/Carlito-Regular.ttf'))
pdfmetrics.registerFont(TTFont('Carlito-Bold', '/usr/share/fonts/truetype/english/Carlito-Bold.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSans', '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'))
registerFontFamily('LiberationSerif', normal='LiberationSerif', bold='LiberationSerif-Bold')
registerFontFamily('Carlito', normal='Carlito', bold='Carlito-Bold')

# ━━ Page Setup ━━
PAGE_W, PAGE_H = A4
LEFT_MARGIN = 1.8*cm
RIGHT_MARGIN = 1.8*cm
TOP_MARGIN = 2.0*cm
BOTTOM_MARGIN = 2.0*cm
CONTENT_W = PAGE_W - LEFT_MARGIN - RIGHT_MARGIN

# ━━ Styles ━━
sH1 = ParagraphStyle(name='H1', fontName='LiberationSerif', fontSize=20, leading=26, textColor=ACCENT, spaceBefore=18, spaceAfter=10)
sH2 = ParagraphStyle(name='H2', fontName='LiberationSerif', fontSize=15, leading=20, textColor=TEXT_PRIMARY, spaceBefore=14, spaceAfter=8)
sH3 = ParagraphStyle(name='H3', fontName='LiberationSerif', fontSize=12, leading=16, textColor=TEXT_PRIMARY, spaceBefore=10, spaceAfter=6)
sBody = ParagraphStyle(name='Body', fontName='LiberationSerif', fontSize=10.5, leading=16, textColor=TEXT_PRIMARY, alignment=TA_JUSTIFY, spaceBefore=2, spaceAfter=6)
sBodyL = ParagraphStyle(name='BodyL', fontName='LiberationSerif', fontSize=10.5, leading=16, textColor=TEXT_PRIMARY, alignment=TA_LEFT, spaceBefore=2, spaceAfter=6)
sBullet = ParagraphStyle(name='Bullet', fontName='LiberationSerif', fontSize=10.5, leading=16, textColor=TEXT_PRIMARY, alignment=TA_LEFT, leftIndent=20, bulletIndent=8, spaceBefore=2, spaceAfter=3)
sCaption = ParagraphStyle(name='Caption', fontName='LiberationSerif', fontSize=9, leading=13, textColor=TEXT_MUTED, alignment=TA_CENTER, spaceBefore=4, spaceAfter=10)
sTH = ParagraphStyle(name='TH', fontName='LiberationSerif', fontSize=9.5, leading=13, textColor=TABLE_HEADER_TEXT, alignment=TA_CENTER)
sTC = ParagraphStyle(name='TC', fontName='LiberationSerif', fontSize=9, leading=13, textColor=TEXT_PRIMARY, alignment=TA_CENTER)
sTCL = ParagraphStyle(name='TCL', fontName='LiberationSerif', fontSize=9, leading=13, textColor=TEXT_PRIMARY, alignment=TA_LEFT)
sCallout = ParagraphStyle(name='Callout', fontName='LiberationSerif', fontSize=11, leading=17, textColor=ACCENT, alignment=TA_CENTER, spaceBefore=8, spaceAfter=8)
sFooter = ParagraphStyle(name='Footer', fontName='LiberationSerif', fontSize=8, leading=11, textColor=TEXT_MUTED, alignment=TA_CENTER)

OUTPUT_DIR = '/home/z/my-project/download'
BODY_PDF = os.path.join(OUTPUT_DIR, 'dakhla_dc_body.pdf')
FINAL_PDF = os.path.join(OUTPUT_DIR, 'Dakhla_Hyperscale_Green_Data_Center_Investment_Report.pdf')

# ━━ Helper Functions ━━
def P(text, style=sBody):
    return Paragraph(text, style)

def TH(text):
    return Paragraph('<b>' + text + '</b>', sTH)

def TC(text):
    return Paragraph(text, sTC)

def TCL(text):
    return Paragraph(text, sTCL)

def make_table(header_texts, rows, col_ratios=None):
    """Create a styled table with header and data rows."""
    data = [[TH(h) for h in header_texts]]
    for row in rows:
        data.append([TC(str(c)) if i == 0 else TCL(str(c)) if len(str(c)) > 30 else TC(str(c)) for i, c in enumerate(row)])
    
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

class TocDocTemplate(SimpleDocTemplate):
    def afterFlowable(self, flowable):
        if hasattr(flowable, 'bookmark_name'):
            level = getattr(flowable, 'bookmark_level', 0)
            text = getattr(flowable, 'bookmark_text', '')
            key = getattr(flowable, 'bookmark_key', '')
            self.notify('TOCEntry', (level, text, self.page, key))

# ━━ BUILD DOCUMENT ━━
doc = TocDocTemplate(
    BODY_PDF,
    pagesize=A4,
    leftMargin=LEFT_MARGIN,
    rightMargin=RIGHT_MARGIN,
    topMargin=TOP_MARGIN,
    bottomMargin=BOTTOM_MARGIN,
    title='Hyperscale Green Data Center Dakhla - Investment Report',
    author='Z.ai Strategic Analysis',
)

story = []

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# TABLE OF CONTENTS
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
toc = TableOfContents()
toc.levelStyles = [
    ParagraphStyle(name='TOC1', fontName='LiberationSerif', fontSize=12, leading=20, leftIndent=20, textColor=TEXT_PRIMARY),
    ParagraphStyle(name='TOC2', fontName='LiberationSerif', fontSize=10.5, leading=18, leftIndent=40, textColor=TEXT_MUTED),
]
story.append(Paragraph('<b>TABLE OF CONTENTS</b>', ParagraphStyle(name='TOCTitle', fontName='LiberationSerif', fontSize=22, leading=28, textColor=ACCENT, alignment=TA_CENTER, spaceBefore=40, spaceAfter=30)))
story.append(toc)
story.append(PageBreak())

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 1. EXECUTIVE SUMMARY
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
story.append(add_heading('<b>1. Executive Summary</b>', sH1, 0))

story.append(P(
    'This report presents a comprehensive feasibility analysis for the construction and operation of a <b>Hyperscale Green Data Center</b> in Dakhla, Morocco, '
    'dedicated to <b>Sovereign African Data Storage</b> and <b>Decentralized High-Performance Computing (HPC)</b> powered by artificial intelligence GPU clusters. '
    'The project, codenamed <b>"Sahara Neural Hub"</b>, aims to establish a 50 MW IT-load facility powered entirely by renewable energy (wind and solar), '
    'leveraging the exceptional wind resources of the Dakhla-Oued Ed-Dahab region, which ranks among the top five onshore wind sites globally with average wind speeds of 9.5-10.8 m/s at 80m height.'
))

story.append(P(
    'The strategic positioning of Dakhla offers a unique convergence of advantages: abundant and inexpensive renewable energy (LCOE as low as $0.022-0.035/kWh), '
    'an operational submarine cable landing station providing 20-40 Tbps connectivity to both Europe and West Africa, a favorable tax regime within the Dakhla West Africa Free Zone '
    '(5-year corporate tax exemption followed by a reduced 15% rate, VAT and customs duty exemptions), and a cool coastal desert climate enabling 5,000-7,500 hours per year of free cooling. '
    'The total estimated CAPEX ranges from $611 million to $1.135 billion for a 50 MW facility including 2,000 NVIDIA H100 GPUs, with annual OPEX projected at $82-99 million.'
))

story.append(P(
    'The African data center market is experiencing explosive growth, projected to reach USD 6.81 billion by 2030 at a CAGR of 11.8%. '
    'Morocco alone commands 35% of all new announced power capacity on the continent, with a pipeline exceeding 1,886 MW. '
    'No data center currently exists in Dakhla, presenting a compelling first-mover advantage for a facility that can serve as the strategic gateway '
    'between European and West African digital infrastructure, addressing the growing demand for sovereign African data storage driven by data localization laws '
    'in 36+ African countries and the African Union Data Policy Framework adopted in February 2024.'
))

# Key metrics callout
story.append(Spacer(1, 8))
metrics_data = [
    ['Key Metric', 'Value'],
    [TC('Project Name'), TC('Sahara Neural Hub - Dakhla')],
    [TC('IT Load Capacity'), TC('50 MW (scalable to 100 MW)')],
    [TC('GPU Cluster'), TC('2,000+ NVIDIA H100 / B200 GPUs')],
    [TC('Energy Source'), TC('100% Renewable (Wind + Solar + BESS)')],
    [TC('Total CAPEX Estimate'), TC('$611M - $1.135B')],
    [TC('Annual OPEX Estimate'), TC('$82M - $99M')],
    [TC('Target PUE'), TC('1.10 - 1.20 (Green DC)')],
    [TC('Location'), TC('Dakhla, Morocco (23.68N, 15.95W)')],
    [TC('Timeline to Phase 1'), TC('24-36 months')],
    [TC('IRR Projected'), TC('12-18%')],
]
story.append(make_table(metrics_data[0], metrics_data[1:], [0.35, 0.65]))
story.append(P('Table 1: Project Key Metrics Summary', sCaption))

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 2. MARKET ANALYSIS
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
story.append(add_heading('<b>2. Market Analysis</b>', sH1, 0))

story.append(add_heading('<b>2.1 African Data Center Market Overview</b>', sH2, 1))
story.append(P(
    'The African data center market represents one of the most dynamic growth opportunities in global digital infrastructure. '
    'Valued at USD 3.49 billion in 2024, the market is projected to reach USD 6.81 billion by 2030, growing at a compound annual growth rate (CAGR) of 11.8%. '
    'The construction segment alone is expected to expand from USD 1.26 billion in 2025 to USD 3.06 billion by 2030, reflecting the massive infrastructure buildout underway across the continent. '
    'The Middle East and Africa colocation market is experiencing even more rapid growth, reaching USD 4.9 billion in 2026 with a 28.5% year-over-year increase, '
    'and is projected to hit USD 11.1 billion by 2030. Total existing data center capacity across the top five African markets exceeds 500 MW, '
    'with 56 new data centers and approximately 400 MW of additional capacity announced by the end of 2025.'
))

market_data = [
    ['Country', 'Data Centers', 'Capacity (MW)', 'Key Notes'],
    [TC('South Africa'), TC('~56'), TC('~350'), TC('Largest market; Johannesburg + Cape Town')],
    [TC('Morocco'), TC('~23'), TC('~10-15 (existing)'), TC('1,886 MW pipeline (35% of Africa announcements)')],
    [TC('Nigeria'), TC('~12-15'), TC('~86-137'), TC('Leading West African hub')],
    [TC('Kenya'), TC('~8-10'), TC('~30-40'), TC('East Africa primary hub')],
    [TC('Egypt'), TC('~10-12'), TC('~50-60'), TC('North Africa second hub')],
]
story.append(Spacer(1, 10))
story.append(make_table(market_data[0], market_data[1:], [0.18, 0.15, 0.22, 0.45]))
story.append(P('Table 2: African Data Center Market by Country (2025)', sCaption))

story.append(add_heading('<b>2.2 Data Sovereignty and Regulatory Drivers</b>', sH2, 1))
story.append(P(
    'The push for data sovereignty in Africa has become a major driver of data center demand. As of 2025, more than 36 African countries have enacted or are actively developing '
    'data protection legislation, up from fewer than 10 in 2015. The African Union Data Policy Framework, adopted in February 2024, explicitly supports the development of regional '
    'and continental data infrastructure while advising against overly broad data localization mandates. Kenya requires that a copy of personal data be stored domestically, '
    'Nigeria mandates localization for certain sectors including financial data, and Egypt has introduced localization requirements for specific data categories. '
    'Morocco\'s Loi 09-08 (2009) governs data protection with cross-border transfers allowed subject to equivalent protection standards, and the country is actively modernizing '
    'its framework to align more closely with the EU\'s GDPR. This growing regulatory landscape creates substantial demand for sovereign African data storage facilities '
    'that can serve clients who need to keep data on the continent while still accessing world-class infrastructure and connectivity.'
))

story.append(add_heading('<b>2.3 AI and GPU Computing Demand in Africa</b>', sH2, 1))
story.append(P(
    'The artificial intelligence sector in Africa is experiencing rapid expansion, with over 2,360 companies listing AI as a specialization as of 2022, and the continent\'s '
    'cloud computing adoption growing at 25-30% annually. However, the supply of AI-ready data center infrastructure severely lags demand: in South Africa, '
    'only 5 out of 56 operational data centers are equipped for AI workloads. AI-ready data centers consume approximately 5 times more electricity than traditional cloud facilities, '
    'and GPU-based racks require 40-140 kW per rack compared to 5-12 kW for conventional IT racks. This 10-30x increase in power density represents both a challenge and an opportunity '
    'for a purpose-built green HPC facility. The African Union Continental AI Strategy, adopted in July 2024, further reinforces the imperative for local AI compute capacity. '
    'Currently, only about 17% of African enterprises have fully migrated to cloud, indicating massive untapped potential as digital transformation accelerates across the continent.'
))

story.append(add_heading('<b>2.4 Morocco\'s Competitive Position</b>', sH2, 1))
story.append(P(
    'Morocco has emerged as the leading destination for data center investment in Africa, commanding 35% of all newly announced power capacity on the continent. '
    'The kingdom\'s pipeline includes the Iozera project (386 MW in Tetouan, $500M investment, MoU signed 2024), the Naver Cloud facility (500 MW in Tetouan, '
    'partnership with NVIDIA, construction starting Q4 2025), and the Nouaceur project (500 MW target near Casablanca, 100% renewable energy planned). '
    'Morocco\'s advantages include proximity to Europe (only 15 km at the Strait of Gibraltar), submarine cable landings with over 500 Tbps total design capacity, '
    'a renewable energy share of 44% in the energy mix (highest in North Africa), a stable constitutional monarchy with consistent pro-business policies, '
    'and a bilingual workforce fluent in French, Arabic, and increasingly English. The "Digital Morocco 2030" strategy targets 40 billion MAD in revenue '
    'from advanced digital services by 2030, signaling strong government commitment to the digital infrastructure sector.'
))

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 3. LOCATION ANALYSIS - DAKHLA
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
story.append(add_heading('<b>3. Location Analysis: Dakhla</b>', sH1, 0))

story.append(add_heading('<b>3.1 Geographic and Climatic Advantages</b>', sH2, 1))
story.append(P(
    'Dakhla is situated at coordinates 23 degrees 41 minutes North, 15 degrees 57 minutes West on a narrow peninsula extending into the Atlantic Ocean, approximately 1,500 km south of Casablanca. '
    'The city benefits from a unique microclimate shaped by the cold Canary Current, with average temperatures of 20-22 degrees Celsius year-round, consistently low humidity, '
    'and steady ocean breezes. These conditions are exceptionally favorable for data center operations, enabling 5,000-7,500 hours per year of free cooling through air-side economization, '
    'which can reduce cooling energy consumption by 60-80% compared to traditional mechanical refrigeration. The Atlantic coast location also opens the possibility of seawater cooling, '
    'with the potential to achieve a Power Usage Effectiveness (PUE) as low as 1.05-1.15, placing the facility among the most energy-efficient data centers globally. '
    'For context, Google\'s best-in-class facilities achieve a PUE of 1.10, and the industry average stands at 1.40-1.60.'
))

story.append(add_heading('<b>3.2 Renewable Energy Resources</b>', sH2, 1))
story.append(P(
    'The Dakhla-Oued Ed-Dahab region possesses the highest wind energy density in Morocco and ranks among the top five onshore wind sites globally. '
    'At 80m height, the average wind speed ranges from 9.5 to 10.8 m/s with a power density of approximately 480 W/m<super>2</super>, driven by consistent northeasterly trade winds '
    'associated with the Azores anticyclone. The LCOE for wind energy in Dakhla is estimated at $0.022-0.035/kWh, significantly below the global weighted average of $0.034/kWh (IRENA 2024) '
    'and well below Morocco\'s average electricity tariff of $0.116/kWh for business users. Morocco\'s national wind capacity reached 2,373 MW by the end of 2024, '
    'and the country targets 52% renewable installed capacity by 2030. A 60 MW wind farm in Dakhla began injecting power in March 2025, '
    'with a 40 MW expansion coupled to the desalination plant. A critical infrastructure project, the Dakhla-Casablanca 400 kV high-voltage transmission line '
    'with 3 GW capacity, is under development with delivery expected by 2028, which will be essential for evacuating surplus renewable energy production.'
))

wind_data = [
    ['Parameter', 'Value', 'Source'],
    [TC('Wind Speed at 80m'), TC('9.5 - 10.8 m/s'), TC('ScienceDirect / CDER')],
    [TC('Power Density at 80m'), TC('~480 W/m<super>2</super>'), TC('ResearchGate / Weibull')],
    [TC('Wind Direction'), TC('N/NE (Trade Winds)'), TC('Global Wind Atlas')],
    [TC('LCOE Wind'), TC('$0.022 - 0.035/kWh'), TC('IRENA / MASEN')],
    [TC('Capacity Factor'), TC('40 - 50%'), TC('RES4Africa')],
    [TC('Solar Irradiance'), TC('Among highest in Morocco'), TC('ADEREE')],
    [TC('Solar LCOE Target 2050'), TC('$37/MWh'), TC('ScienceDirect')],
]
story.append(Spacer(1, 10))
story.append(make_table(wind_data[0], wind_data[1:], [0.35, 0.35, 0.30]))
story.append(P('Table 3: Dakhla Renewable Energy Resources', sCaption))

story.append(add_heading('<b>3.3 Connectivity and Submarine Cables</b>', sH2, 1))
story.append(P(
    'Dakhla possesses a strategic advantage that few African cities can match: it is already a submarine cable landing point. '
    'The Maroc Telecom West Africa cable, operational since 2021, lands directly in Dakhla with a capacity of 20 Tbps (extensible to 40 Tbps), '
    'connecting Morocco to Mauritania, Senegal, Cote d\'Ivoire, Togo, Benin, and Gabon. This positions Dakhla as a natural gateway between European and West African digital traffic. '
    'Additionally, the Sahara cable (60 Tbps) is being deployed by Maroc Telecom, the Islalink Canaries-Morocco cable (EUR 49M, delivery 2028) will connect southern Morocco to the Canary Islands and onward to Europe, '
    'and the MEDUSA cable (480 Tbps total, landed in Nador December 2025) provides additional Mediterranean connectivity. '
    'Morocco\'s total accessible international bandwidth exceeds 500 Tbps in design capacity. '
    'Latency from Casablanca to Paris is approximately 25-30 ms, and Dakhla\'s direct West Africa cable link provides low-latency access to key West African markets. '
    'Fiber-to-the-home (FTTH) is available in Dakhla via Maroc Telecom, Orange, and Inwi at speeds up to 1 Gbps.'
))

cable_data = [
    ['Cable System', 'Capacity', 'Status', 'Connects To'],
    [TC('West Africa (IAM)'), TC('20-40 Tbps'), TC('Operational'), TC('West Africa (6 countries)')],
    [TC('Sahara (IAM)'), TC('60 Tbps'), TC('Deploying'), TC('Regional expansion')],
    [TC('MEDUSA (inwi)'), TC('480 Tbps'), TC('Landed Nador 2025'), TC('Europe / Mediterranean')],
    [TC('Islalink'), TC('TBD'), TC('Planned 2028'), TC('Canary Islands / Spain')],
    [TC('ACE'), TC('1.28 Tbps'), TC('Operational'), TC('Casablanca / Europe / West Africa')],
]
story.append(Spacer(1, 10))
story.append(make_table(cable_data[0], cable_data[1:], [0.22, 0.18, 0.25, 0.35]))
story.append(P('Table 4: Submarine Cable Connectivity from Dakhla/Morocco', sCaption))

story.append(add_heading('<b>3.4 Land and Real Estate</b>', sH2, 1))
story.append(P(
    'Land in Dakhla is remarkably affordable compared to Morocco\'s northern cities, offering substantial cost savings for a hyperscale facility requiring large land areas. '
    'Constructible land in the PK40 development zone starts at 400 MAD/m<super>2</super> (approximately 37 EUR/m<super>2</super>), which represents a 30-40% discount '
    'compared to Casablanca and Marrakech. Industrial zone lots are available at even lower prices (14-16 MAD/m<super>2</super> for small lots), '
    'and the Dakhla West Africa Free Zone encompasses 1,000 hectares of industrial land. A new 27-hectare industrial zone with 326 lots has been announced with a 30 MAD million development investment. '
    'For a 50 MW data center, approximately 10 hectares would be required for the facility buildings, electrical infrastructure, and wind/solar energy installations. '
    'At PK40 prices, this represents a land acquisition cost of approximately 40 MAD million ($4 million), which is negligible relative to the total project CAPEX. '
    'Rural land in the broader Dakhla-Oued Ed-Dahab region can be obtained for as little as 5-50 MAD/m<super>2</super> through the Agence de Developpement Agricole, '
    'which has 1,778 hectares available for long-term lease. Additionally, over 11,120 hectares were mobilized from the private domain of the state in 2023, '
    'the largest allocation of any region in Morocco, indicating strong government commitment to facilitating investment.'
))

land_data = [
    ['Zone Type', 'Price (MAD/m<super>2</super>)', 'Price (EUR/m<super>2</super>)', 'Notes'],
    [TC('Center-ville / Corniche'), TC('4,000 - 7,000'), TC('370 - 650'), TC('Titled, viabilized')],
    [TC('PK40 Lotissements'), TC('400 - 625'), TC('37 - 58'), TC('Developing zone')],
    [TC('Industrial Zone (lots)'), TC('14 - 16'), TC('1.3 - 1.5'), TC('Small lots R+4')],
    [TC('Rural Land'), TC('5 - 50'), TC('0.5 - 4.6'), TC('ADA long-term lease')],
    [TC('DWAFZ (Free Zone)'), TC('Administrative allocation'), TC(''), TC('1,000 hectares')],
]
story.append(Spacer(1, 10))
story.append(make_table(land_data[0], land_data[1:], [0.25, 0.22, 0.22, 0.31]))
story.append(P('Table 5: Land Prices in Dakhla by Zone Type', sCaption))

story.append(add_heading('<b>3.5 Water and Desalination Infrastructure</b>', sH2, 1))
story.append(P(
    'Water availability is a critical consideration for data center operations, particularly for cooling systems. Dakhla, situated in an arid region, '
    'addresses this challenge through a major desalination infrastructure program. A new seawater desalination station with a capacity of 37 million m<super>3</super>/year '
    '(approximately 101,000 m<super>3</super>/day) is under construction with a total investment of 2.5 billion MAD (approximately EUR 230 million), '
    'of which 7 million m<super>3</super>/year is allocated to drinking water and 30 million m<super>3</super>/year to irrigation for 5,200 hectares. '
    'The plant is 100% powered by a coupled wind farm, reducing the cost per cubic meter by approximately 30% compared to standard desalination, '
    'yielding an estimated cost of 5-7 MAD/m<super>3</super>. An existing brackish water desalination station with a capacity of 17,000 m<super>3</super>/day '
    'has been operational since 2015. For a 50 MW data center using advanced cooling technologies (direct liquid cooling and free cooling), '
    'water consumption would be minimal compared to traditional evaporative cooling systems, estimated at 500-1,000 m<super>3</super>/day for make-up water, '
    'well within the capacity of the new desalination infrastructure. The possibility of seawater cooling using deep ocean water (4-6 degrees Celsius at 700-1,000m depth) '
    'could eliminate the need for evaporative cooling entirely, achieving a PUE of 1.05-1.15.'
))

story.append(add_heading('<b>3.6 Electrical Grid and Power Infrastructure</b>', sH2, 1))
story.append(P(
    'Dakhla\'s electrical infrastructure has undergone significant upgrades in recent years. The city is connected to Morocco\'s national grid via a 400 kV double-circuit transmission line, '
    'with a total investment of approximately 2.4 billion MAD. Current installed generation capacity includes a 76 MW diesel power station, a 60 MW wind farm '
    '(first injections in March 2025), and a 40 MW wind installation coupled to the desalination project. The most critical infrastructure project is the Dakhla-Casablanca '
    '1,000 km ultra-high-voltage transmission corridor with a planned capacity of 3,000 MW (1,500 MW in Phase 1, expansion to 3,000 MW by 2028), '
    'which will enable the evacuation of 900 MW of additional renewable energy production from the southern provinces. '
    'Five candidates have been shortlisted for the construction contract as of February 2025. For a 50 MW data center, the power requirement with a PUE of 1.2 '
    'would be approximately 60 MW of total electrical input. This would require a dedicated renewable energy installation of approximately 120-150 MW (wind + solar + BESS) '
    'to ensure 24/7 power availability, given the intermittent nature of renewable sources. The cost of this energy infrastructure is estimated at $50-100 million '
    'for the renewable generation component, with a payback period of 7-12 years based on current electricity tariff differentials.'
))

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 4. TECHNICAL ARCHITECTURE
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
story.append(add_heading('<b>4. Technical Architecture</b>', sH1, 0))

story.append(add_heading('<b>4.1 Data Center Design Specifications</b>', sH2, 1))
story.append(P(
    'The Sahara Neural Hub is designed as a Tier III+ hyperscale facility optimized for GPU-accelerated AI workloads. The design philosophy centers on three pillars: '
    'energy efficiency through green design (target PUE 1.10-1.20), high-density computing (40-140 kW per rack for GPU clusters), and sovereign data assurance '
    '(compliance with Moroccan Loi 09-08, AU Data Policy Framework, and GDPR-equivalent standards). The facility will be constructed in two phases: '
    'Phase 1 (24-36 months) delivering 25 MW IT load with 1,000 GPU servers, and Phase 2 (subsequent 18-24 months) expanding to 50 MW with 2,000+ GPUs. '
    'The data hall design supports both air-cooled racks (up to 15 kW for traditional IT) and liquid-cooled racks (up to 140 kW for NVIDIA GB200 NVL72 systems), '
    'with direct-to-chip liquid cooling as the primary cooling method for GPU clusters and rear-door heat exchangers as a secondary system. '
    'The facility will use 100% renewable energy sourced from a dedicated wind farm and solar PV installation, backed by battery energy storage systems (BESS) '
    'and grid connection for reliability. Seawater cooling is under evaluation as a tertiary cooling method, leveraging Dakhla\'s Atlantic coast location.'
))

dc_specs = [
    ['Specification', 'Phase 1', 'Phase 2 (Full Build)'],
    [TC('IT Load Capacity'), TC('25 MW'), TC('50 MW')],
    [TC('Total Electrical Input'), TC('30 MW (PUE 1.2)'), TC('60 MW (PUE 1.2)')],
    [TC('Data Hall Area'), TC('5,000 m<super>2</super>'), TC('10,000 m<super>2</super>')],
    [TC('Total Site Area'), TC('5 hectares'), TC('10 hectares')],
    [TC('GPU Servers'), TC('1,000 H100/B200'), TC('2,000+ H100/B200')],
    [TC('Rack Capacity'), TC('250 racks (40 kW avg)'), TC('500+ racks')],
    [TC('Cooling System'), TC('DLC + Free Cooling'), TC('DLC + Free Cooling + SWC')],
    [TC('Target PUE'), TC('1.15 - 1.20'), TC('1.10 - 1.15')],
    [TC('Tier Level'), TC('Tier III+'), TC('Tier III+ / IV elements')],
    [TC('Uptime SLA'), TC('99.982%'), TC('99.982%+')],
]
story.append(Spacer(1, 10))
story.append(make_table(dc_specs[0], dc_specs[1:], [0.30, 0.35, 0.35]))
story.append(P('Table 6: Data Center Design Specifications', sCaption))

story.append(add_heading('<b>4.2 GPU Infrastructure and AI Compute</b>', sH2, 1))
story.append(P(
    'The computational backbone of the Sahara Neural Hub consists of NVIDIA H100 and next-generation B200 GPU clusters interconnected via NVIDIA\'s Quantum-2 InfiniBand network. '
    'The H100 SXM5 GPU is priced at $25,000-40,000 per unit with a maximum TDP of 700W, while the DGX H100 system (8x H100) costs $300,000-450,000 and consumes 10.2 kW. '
    'The newer B200 SXM6 GPU is priced at $30,000-40,000 with the DGX B200 at approximately $515,000 consuming 14.3 kW. The GB200 NVL72 rack system (72 Blackwell GPUs, '
    '13.5 TB GPU RAM) costs approximately $3 million per rack and draws 120-140 kW, requiring mandatory liquid cooling. The facility\'s InfiniBand fabric will use NVIDIA Quantum-2 '
    'QM9700 switches (64-port NDR 400Gb/s, approximately $35,000 list price) in a fat-tree topology to ensure non-blocking inter-rack communication at 400 Gb/s per GPU. '
    'Cloud GPU pricing benchmarks show AWS H100 instances at $6.88/GPU-hour (on-demand) and specialized neo-cloud providers at $2.01-3.44/GPU-hour, '
    'providing a revenue floor for the facility\'s GPU-as-a-Service offering. At these rates, a fully utilized 2,000-GPU cluster could generate $35-120 million in annual GPU compute revenue.'
))

gpu_data = [
    ['Component', 'Unit Price (USD)', 'Power (W)', 'Notes'],
    [TC('NVIDIA H100 SXM5'), TC('$25,000 - $40,000'), TC('700'), TC('Current gen AI training')],
    [TC('NVIDIA B200 SXM6'), TC('$30,000 - $40,000'), TC('1,000'), TC('Next gen Blackwell')],
    [TC('DGX H100 (8x GPU)'), TC('$300,000 - $450,000'), TC('10,200'), TC('8-GPU server node')],
    [TC('DGX B200 (8x GPU)'), TC('~$515,000'), TC('14,300'), TC('8-GPU Blackwell node')],
    [TC('GB200 NVL72 (72 GPU)'), TC('~$3,000,000'), TC('120-140k'), TC('Full rack, liquid cooled')],
    [TC('Quantum-2 QM9700 Switch'), TC('~$35,000'), TC('--'), TC('64-port NDR 400Gb/s')],
]
story.append(Spacer(1, 10))
story.append(make_table(gpu_data[0], gpu_data[1:], [0.28, 0.24, 0.18, 0.30]))
story.append(P('Table 7: GPU Infrastructure Component Pricing', sCaption))

story.append(add_heading('<b>4.3 Green Energy System Architecture</b>', sH2, 1))
story.append(P(
    'The energy system is designed as a hybrid renewable microgrid combining wind turbines, solar photovoltaic arrays, and battery energy storage systems (BESS) '
    'with grid backup. For a 50 MW IT load with a PUE of 1.2 (60 MW total input), the renewable installation would comprise approximately 80-100 MW of wind capacity '
    '(capitalizing on Dakhla\'s exceptional 45% capacity factor) and 40-60 MW of solar PV, complemented by a 200 MWh BESS system providing 4 hours of storage at critical load. '
    'The CAPEX for this renewable energy installation is estimated at $100-200 million based on current costs: wind at $1,100-1,500/kW, solar PV at $600-900/kW, '
    'and BESS at $117-300/kWh (turnkey utility-scale 4-hour systems). The wind component alone, at 100 MW, would consist of approximately 20-25 turbines '
    'of the Vestas V136-4.5 MW or Siemens Gamesa SG 4.5-145 class, with delivery timelines of 12-18 months from order. The OPEX for the wind farm is estimated at $42,000-48,000/MW/year. '
    'The system would be designed for self-consumption with grid export of surplus energy, leveraging Morocco\'s Law 58-15 which authorizes the sale of renewable energy '
    'surplus to the ONEE grid under a net billing mechanism. The ANRE (National Electricity Regulatory Authority) is finalizing the tariff framework with a reform expected by 2027.'
))

story.append(add_heading('<b>4.4 Cooling Architecture</b>', sH2, 1))
story.append(P(
    'The cooling strategy employs a three-tier approach optimized for Dakhla\'s climate. The primary system is direct-to-chip liquid cooling (DLC) for GPU racks, '
    'which removes 60-80% of heat directly from the chip surface using cold plates and a closed-loop water circuit, with a cost premium of 15-25% over air cooling infrastructure. '
    'The secondary system leverages Dakhla\'s ambient conditions for air-side free cooling during the 5,000-7,500 hours per year when outdoor temperatures fall below the supply air setpoint, '
    'using economizer dampers to bring filtered outside air directly into the data hall. The tertiary system under evaluation is seawater cooling, utilizing the cold Atlantic waters '
    'at a depth of 700-1,000 meters (4-6 degrees Celsius) through a heat exchanger system, which could reduce cooling energy consumption by 80-90% and achieve a PUE of 1.05-1.15. '
    'The CAPEX for seawater cooling is estimated at $80-200/kW (thermal), with potential cost reduction to $10-20/kW at 1,000 MWt scale. For air-cooled racks (up to 15 kW), '
    'rear-door heat exchangers at $3,000-8,000 per rack provide an efficient retrofit option. The overall cooling system design targets a PUE contribution of 0.10-0.15 '
    'from the cooling infrastructure, compared to 0.40-0.60 for traditional data centers, representing an annual energy saving of approximately 26 million kWh '
    'for a 10 MW reduction in PUE overhead, valued at approximately $2.6 million per year at $0.10/kWh.'
))

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 5. FINANCIAL ANALYSIS
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
story.append(add_heading('<b>5. Financial Analysis</b>', sH1, 0))

story.append(add_heading('<b>5.1 Capital Expenditure (CAPEX) Breakdown</b>', sH2, 1))
story.append(P(
    'The total capital expenditure for the Sahara Neural Hub is estimated between $611 million and $1.135 billion for a fully built 50 MW facility including 2,000 NVIDIA H100 GPUs. '
    'The infrastructure component (buildings, power, cooling, networking) accounts for approximately $281-575 million, while the IT equipment component '
    '(GPU servers, InfiniBand networking, storage) accounts for $330-560 million. The following table provides a detailed breakdown of each CAPEX category, '
    'with low and high estimates reflecting different design choices and procurement strategies. It is important to note that GPU pricing is particularly volatile, '
    'and the emergence of newer architectures (B200, GB200) may shift the cost structure significantly. Additionally, the Dakhla Free Zone provides customs duty '
    'exemptions on all imported equipment, which can represent savings of 0-40% on equipment costs depending on the tariff classification, potentially saving tens of millions '
    'of dollars on the total project cost.'
))

capex_data = [
    ['Component', 'Low ($M)', 'High ($M)', 'Notes'],
    [TC('Land (10 hectares)'), TC('1'), TC('5'), TC('Dakhla: 400-7,000 MAD/m<super>2</super>')],
    [TC('Building / Shell'), TC('50'), TC('100'), TC('$6,725-$12,215/m<super>2</super> IT space')],
    [TC('Power Infrastructure'), TC('100'), TC('200'), TC('Switchgear, transformers, generators')],
    [TC('Cooling (DLC + Free Cooling)'), TC('30'), TC('60'), TC('Seawater intake + chiller plant')],
    [TC('UPS Systems'), TC('25'), TC('50'), TC('2N redundant, lithium-ion')],
    [TC('Networking (IB + Ethernet)'), TC('15'), TC('30'), TC('Full fat-tree topology')],
    [TC('Fire + Security'), TC('5'), TC('15'), TC('Novec 1230, VESDA, biometric')],
    [TC('Raised Floor + Containment'), TC('5'), TC('15'), TC('High-load for GPU racks')],
    [TC('Renewable Energy (Wind+Solar+BESS)'), TC('50'), TC('100'), TC('Partial DC power supply')],
    [TC('Subtotal Infrastructure'), TC('281'), TC('575'), TC('')],
    [TC('GPU Servers (2,000x H100)'), TC('300'), TC('500'), TC('DGX H100 at $300K-$450K each')],
    [TC('GPU Networking'), TC('20'), TC('40'), TC('InfiniBand switches, AOC cables')],
    [TC('Storage'), TC('10'), TC('20'), TC('NVMe, object storage')],
    [TC('Subtotal IT Equipment'), TC('330'), TC('560'), TC('')],
    [TC('TOTAL CAPEX'), TC('611'), TC('1,135'), TC('')],
]
story.append(Spacer(1, 10))
story.append(make_table(capex_data[0], capex_data[1:], [0.32, 0.14, 0.14, 0.40]))
story.append(P('Table 8: Capital Expenditure Breakdown (50 MW Facility)', sCaption))

story.append(add_heading('<b>5.2 Operating Expenditure (OPEX) Projection</b>', sH2, 1))
story.append(P(
    'Annual operating expenditure for the 50 MW facility is projected at $82-99 million, with electricity representing the largest single cost item at approximately $66 million per year. '
    'This calculation assumes a 50 MW IT load with a PUE of 1.3 (65 MW total input), 8,760 operating hours per year, and Morocco\'s business electricity rate of $0.116/kWh. '
    'However, the use of self-generated renewable energy could significantly reduce this cost: at an LCOE of $0.025-0.035/kWh for Dakhla wind energy, '
    'the electricity cost could drop to approximately $14-20 million per year for the self-generated portion, representing annual savings of $40-50 million compared to grid electricity. '
    'Staff costs in Morocco are 60-80% lower than in Western Europe, with data center technicians earning $12,000-20,000/year and senior engineers $20,000-40,000/year. '
    'A 40-person team would cost approximately $1.2 million annually. Maintenance is budgeted at 3% of infrastructure CAPEX ($8.4-17.3 million/year), '
    'insurance at 0.4% of total asset value ($2.4-4.5 million/year), and bandwidth/connectivity at $2-5 million/year for multiple 100G links.'
))

opex_data = [
    ['Cost Item', 'Annual Cost ($M)', 'Notes'],
    [TC('Electricity (Grid)'), TC('~66'), TC('50MW x 1.3 PUE x 8,760h x $0.116')],
    [TC('Electricity (Renewable Self-Gen)'), TC('~14-20'), TC('At LCOE $0.025-$0.035/kWh')],
    [TC('Staff (40 people)'), TC('~1.2'), TC('60-80% lower than EU')],
    [TC('Maintenance (3% infra CAPEX)'), TC('~8.4 - 17.3'), TC('3% of $281M-$575M')],
    [TC('Insurance (0.4% asset value)'), TC('~2.4 - 4.5'), TC('Property + cyber + BI')],
    [TC('Bandwidth / Connectivity'), TC('~2 - 5'), TC('Multiple 100G links')],
    [TC('Software Licensing'), TC('~2 - 5'), TC('DCIM, monitoring, etc.')],
    [TC('TOTAL OPEX (Grid Power)'), TC('~82 - 99'), TC('Using grid electricity')],
    [TC('TOTAL OPEX (Renewable Self-Gen)'), TC('~30 - 53'), TC('Using self-generated renewables')],
]
story.append(Spacer(1, 10))
story.append(make_table(opex_data[0], opex_data[1:], [0.35, 0.25, 0.40]))
story.append(P('Table 9: Annual Operating Expenditure Projection', sCaption))

story.append(add_heading('<b>5.3 Revenue Model and ROI Analysis</b>', sH2, 1))
story.append(P(
    'The revenue model for the Sahara Neural Hub combines three primary streams: GPU-as-a-Service (GPUaaS), colocation services, and sovereign cloud services. '
    'GPUaaS is the highest-margin offering, with 2,000 H100 GPUs at full utilization generating $35-120 million annually based on prevailing cloud rates. '
    'Colocation services at $8-15/kW/month for a 50 MW facility would generate $4.8-9.0 million/month ($58-108 million/year) at full occupancy. '
    'Sovereign cloud services, including AI inference endpoints, model training platforms, and data lake services for African enterprises and governments, '
    'command premium pricing due to regulatory compliance requirements. The break-even analysis for GPU hardware is compelling: compared to AWS on-demand pricing '
    '($6.88/GPU-hour), owning an 8-GPU DGX H100 system at $300K-$450K breaks even in 9-14 months at 100% utilization. Even compared to neo-cloud pricing '
    '($2.50/GPU-hour for Spheron H100 SXM5), the payback period is 24-36 months. The project IRR is projected at 12-18% over a 15-year horizon, '
    'assuming 70% average utilization of GPU resources and 85% colocation occupancy, with the higher end achievable through aggressive renewable energy self-generation '
    'and premium sovereign cloud pricing. The Dakhla Free Zone tax regime (0% IS for 5 years, then 15% vs. standard 31%) provides a significant boost to after-tax returns.'
))

story.append(add_heading('<b>5.4 Financing Strategy</b>', sH2, 1))
story.append(P(
    'The financing strategy leverages a combination of equity, green bonds, development finance, and project finance debt. The Dakhla Free Zone status facilitates '
    'foreign investment with full currency convertibility and unrestricted profit repatriation. Potential financing sources include: the Green Climate Fund (GCF), '
    'which has accredited MASEN as an implementing entity and targets 3,000 MW of additional renewable capacity; the World Bank ($500M package for Morocco); '
    'the African Development Bank (SEFA program, ENR Africa facility); the European Investment Bank (EUR 300M financing to ONEE for grid strengthening in 2025); '
    'KfW (German Development Bank, historical partner for Moroccan ENR projects); and AFD (French Development Agency). Morocco has signed double taxation treaties '
    'with over 60 countries and bilateral investment treaties with over 70 countries, providing robust legal protection for foreign investors. '
    'The investment incentive framework includes up to 30% investment subsidy for strategic projects under Morocco\'s Investment Charter. '
    'Corporate loan interest rates in Morocco range from 5-7% for investment loans, with subsidized rates of 2-4% available through government programs. '
    'Green bond issuances by Moroccan banks (Attijariwafa Bank, BCP) provide an additional financing avenue at favorable terms.'
))

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 6. LEGAL AND REGULATORY FRAMEWORK
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
story.append(add_heading('<b>6. Legal and Regulatory Framework</b>', sH1, 0))

story.append(add_heading('<b>6.1 Dakhla West Africa Free Zone (DWAFZ)</b>', sH2, 1))
story.append(P(
    'The Dakhla West Africa Free Zone (DWAFZ), also known as Dakhla Atlantique Free Zone, operates under the legal framework established by Dahir 1-95-1 '
    '(Law 19-94 on export free zones), as amended by Law 57-19 modernizing the ZFE framework into Zones d\'Acceleration Industrielle (ZAI). '
    'The zone encompasses 1,000 hectares of industrial land with an additional 2,650 hectares of industrial zone adjacent to the new Dakhla Atlantic Port (delivery 2028). '
    'Eligible sectors include renewable energy, tourism and services, research and innovation, logistics and maritime industries, specialized training, and export-oriented industries. '
    'The establishment procedure is streamlined through the CRI Dakhla one-stop shop, with typical implantation timelines of 2-6 weeks for complete dossiers. '
    'Since 2018, companies in the ZAI may sell up to 15% of their prior-year export turnover on the Moroccan domestic market, subject to standard customs duties and VAT. '
    'An important clarification: contrary to widespread belief, there is no general fiscal exemption regime for the Southern Provinces. The only substantive tax advantages '
    'are those provided by the ZAI/DWAFZ framework. This was confirmed by the Moroccan General Tax Administration and expert accountants in a June 2024 Challenge.ma investigation, '
    'which established that a 1970s-era royal statement about fiscal exemptions was never codified into law.'
))

tax_data = [
    ['Tax', 'DWAFZ Advantage', 'Duration', 'Standard Rate'],
    [TC('Corporate Tax (IS)'), TC('0% then 15%'), TC('5 years exempt, then 15%'), TC('15-31% (progressive)')],
    [TC('VAT'), TC('Full exemption'), TC('Permanent (ZAI status)'), TC('20%')],
    [TC('Customs Duties'), TC('Full exemption'), TC('Permanent'), TC('0-40%')],
    [TC('Professional Tax'), TC('0%'), TC('15 years'), TC('Normal rates')],
    [TC('IR (Employees)'), TC('0% for ZAI residents'), TC('5 years'), TC('0-38% progressive')],
    [TC('Dividend Withholding'), TC('0% for non-residents'), TC('Permanent'), TC('Standard rates')],
    [TC('Stamp/Registration Duties'), TC('0%'), TC('Permanent'), TC('Standard rates')],
    [TC('Currency Transfer'), TC('Full freedom'), TC('Permanent'), TC('Office des Changes control')],
]
story.append(Spacer(1, 10))
story.append(make_table(tax_data[0], tax_data[1:], [0.22, 0.22, 0.25, 0.31]))
story.append(P('Table 10: DWAFZ Tax Advantages vs. Standard Regime', sCaption))

story.append(add_heading('<b>6.2 Company Formation and Land Acquisition</b>', sH2, 1))
story.append(P(
    'Company formation in Morocco is streamlined through the CRI one-stop shop system, reformed by Law 47-18. The recommended legal form for this project is a Societe Anonyme (SA) '
    'or Societe par Actions Simplifiee (SAS), both offering limited liability and flexibility for large-scale investment. The SA requires a minimum capital of 300,000 MAD '
    '(approximately EUR 28,000) and at least 5 shareholders, while the SAS has no minimum capital requirement and can be formed with a single shareholder (SASU). '
    'The registration process involves 7 steps: negative certificate (name verification), statutes drafting and signing, capital blocking in a bank, '
    'statutes registration with tax authorities, publication in the Official Bulletin, trade registry registration, and CNSS affiliation. '
    'The typical timeline is 2-6 weeks via the CRI. For land acquisition, Dakhla offers several pathways: private market purchase (recommended for titled land in PK40/Al Argoub), '
    'administrative concession from the Domaine National (through the Regional Directorate of National Domain), long-term lease (bail emphyteotique, 18-99 years), '
    'and allocation within the DWAFZ. Foreign investors can acquire non-agricultural land in Morocco without restriction, though properties in military or strategic zones '
    'require Interior Ministry authorization. It is critical to verify the existence of a registered land title (titre foncier) through the ANCFCC before any purchase, '
    'as informal land rights (melk, collective) do not provide the same legal security as a registered title.'
))

story.append(add_heading('<b>6.3 Data Protection and Telecom Regulations</b>', sH2, 1))
story.append(P(
    'Operating a data center in Morocco requires compliance with two primary regulatory frameworks. Loi 09-08 (2009) on personal data protection, enforced by the CNDP '
    '(Commission Nationale de controle de la protection des Donnees a caractere Personnel), requires prior declaration before any personal data processing, mandates data security measures, '
    'and governs cross-border data transfers (allowed if the destination country provides equivalent protection or with CNDP authorization). '
    'Morocco does not currently hold an EU adequacy decision, meaning that data transfers from the EU require Standard Contractual Clauses (SCC) or Binding Corporate Rules (BCR) '
    'from the European data exporter\'s side. The telecom regulatory framework, governed by Loi 24-96 and Loi 55-01, is administered by the ANRT. '
    'A data center providing only hosting/colocation services (without public telecom services) generally requires only a prior declaration to the ANRT. '
    'However, if the facility provides connectivity or transit IP services, an ANRT authorization is required. The cybersecurity framework (Loi 05-20, 2020) '
    'establishes the CNDP (Cybersecurity), which sets national cybersecurity strategy and standards for critical infrastructure operators, including large data centers. '
    'Alignment with ISO 27001 and NIST frameworks is recommended and increasingly expected by institutional clients.'
))

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 7. RISK ASSESSMENT
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
story.append(add_heading('<b>7. Risk Assessment</b>', sH1, 0))

story.append(add_heading('<b>7.1 SWOT Analysis</b>', sH2, 1))

swot_data = [
    ['Category', 'Factor', 'Impact'],
    [TC('Strength'), TC('Best wind resources in Morocco (LCOE $0.022/kWh)'), TC('Critical')],
    [TC('Strength'), TC('Submarine cable landing point (20-40 Tbps)'), TC('Critical')],
    [TC('Strength'), TC('Cool coastal climate (5,000-7,500h free cooling)'), TC('High')],
    [TC('Strength'), TC('DWAFZ tax advantages (0% IS 5yr, then 15%)'), TC('High')],
    [TC('Strength'), TC('First-mover advantage (no existing DC)'), TC('High')],
    [TC('Strength'), TC('Abundant, cheap land (from 400 MAD/m<super>2</super>)'), TC('Medium')],
    [TC('Weakness'), TC('No existing DC ecosystem or talent pool'), TC('High')],
    [TC('Weakness'), TC('1,500 km from Casablanca (logistics challenge)'), TC('Medium')],
    [TC('Weakness'), TC('Limited local demand for DC services'), TC('Medium')],
    [TC('Weakness'), TC('Grid reliability not yet DC-grade proven'), TC('High')],
    [TC('Opportunity'), TC('Sovereign cloud demand (36+ countries, AU framework)'), TC('Critical')],
    [TC('Opportunity'), TC('AI compute demand growth (25-30% CAGR cloud)'), TC('Critical')],
    [TC('Opportunity'), TC('Green DC brand (100% renewable powered)'), TC('High')],
    [TC('Opportunity'), TC('Europe-West Africa gateway positioning'), TC('High')],
    [TC('Threat'), TC('Competing DC projects in Tetouan (closer to EU)'), TC('High')],
    [TC('Threat'), TC('Geopolitical sensitivity (Western Sahara status)'), TC('Medium')],
    [TC('Threat'), TC('Submarine cable dependency for connectivity'), TC('Medium')],
    [TC('Threat'), TC('GPU hardware cost volatility and supply constraints'), TC('High')],
]
story.append(Spacer(1, 10))
story.append(make_table(swot_data[0], swot_data[1:], [0.15, 0.60, 0.25]))
story.append(P('Table 11: SWOT Analysis - Sahara Neural Hub', sCaption))

story.append(add_heading('<b>7.2 Key Risk Factors and Mitigation</b>', sH2, 1))
story.append(P(
    '<b>Geopolitical Risk:</b> Dakhla is located in the Western Sahara, a territory subject to an ongoing sovereignty dispute between Morocco and the Polisario Front. '
    'While Morocco exercises de facto administrative control and has accelerated investment under the New Development Model for the Southern Provinces, '
    'the geopolitical ambiguity may concern some international investors. Mitigation: The Moroccan government has demonstrated strong commitment to infrastructure investment '
    'in the region ($1.2-1.6B new port, 2.4B MAD grid connection, 2.5B MAD desalination), providing de facto assurance of continued support. '
    'The AU and numerous countries have recognized Moroccan sovereignty, and the UN political process continues to evolve favorably.'
))
story.append(P(
    '<b>Infrastructure Risk:</b> The Dakhla-Casablanca 400 kV transmission line (3 GW capacity) is critical for reliable power supply and renewable energy evacuation. '
    'Delays in this project could limit the facility\'s ability to operate at full capacity or export surplus renewable energy. '
    'Mitigation: The project is a national priority with 5 shortlisted candidates as of February 2025 and expected delivery by 2028. '
    'In the interim, on-site BESS and diesel backup generators can ensure power continuity, and the 60 MW wind farm already operational provides a baseline.'
))
story.append(P(
    '<b>Market Risk:</b> The facility depends heavily on export demand (GPUaaS to European and pan-African clients) as the local Dakhla market is negligible. '
    'If hyperscale cloud providers expand their own African data center capacity (AWS, Azure, Google), the competitive landscape could shift. '
    'Mitigation: The sovereign cloud and data localization angle provides differentiation that hyperscalers cannot easily replicate. '
    'The first-mover advantage in Dakhla creates barriers to entry, and the green energy narrative resonates with ESG-conscious institutional clients.'
))
story.append(P(
    '<b>Technology Risk:</b> GPU technology evolves rapidly, with NVIDIA releasing new architectures every 18-24 months. The H100/B200 generation may be superseded '
    'by the time Phase 2 is operational, potentially requiring additional CAPEX for hardware refresh. '
    'Mitigation: The modular data center design allows for technology refresh within existing rack infrastructure. GPUaaS pricing historically tracks hardware generations, '
    'so newer hardware commands premium rates. The facility\'s flexible cooling and power design (up to 140 kW/rack) accommodates next-generation hardware.'
))

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 8. INFRASTRUCTURE PROJECTS
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
story.append(add_heading('<b>8. Major Infrastructure Projects in Dakhla</b>', sH1, 0))

story.append(P(
    'The Moroccan government has committed to an unprecedented infrastructure investment program in the Dakhla-Oued Ed-Dahab region, signaling strong commitment '
    'to the economic development of the southern provinces. These mega-projects create a favorable ecosystem for a data center investment by addressing key constraints '
    'around power, water, connectivity, and logistics. The following table summarizes the major infrastructure projects currently underway or recently completed, '
    'which collectively represent an investment exceeding $3 billion and will fundamentally transform Dakhla\'s infrastructure capacity over the 2025-2030 period.'
))

infra_data = [
    ['Project', 'Investment', 'Delivery', 'Status'],
    [TC('Port Dakhla Atlantique'), TC('$1.2-1.6B'), TC('Dec 2028'), TC('39% complete (Nov 2025)')],
    [TC('Desalination Station (37Mm<super>3</super>/yr)'), TC('2.5 B MAD (~EUR 230M)'), TC('End 2025/2026'), TC('Under construction')],
    [TC('Dakhla-Casablanca THT Line (3 GW)'), TC('~2.4 B MAD'), TC('2028'), TC('5 candidates shortlisted')],
    [TC('Wind Farm Dakhla (60 MW)'), TC('Coupled to desalination'), TC('Operational Mar 2025'), TC('First injections achieved')],
    [TC('New Airport Terminal'), TC('--'), TC('~2027'), TC('Studies complete, works began 2024')],
    [TC('New Industrial Zone (27 ha, 326 lots)'), TC('30 MAD million'), TC('Ongoing'), TC('Under development')],
    [TC('Islalink Submarine Cable'), TC('EUR 49M'), TC('2028'), TC('Planning phase')],
    [TC('500 MW Green DC (Igoudar)'), TC('--'), TC('Announced Jul 2025'), TC('Government announcement')],
]
story.append(Spacer(1, 10))
story.append(make_table(infra_data[0], infra_data[1:], [0.30, 0.22, 0.22, 0.26]))
story.append(P('Table 12: Major Infrastructure Projects in Dakhla-Oued Ed-Dahab', sCaption))

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 9. COMPETITIVE LANDSCAPE
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
story.append(add_heading('<b>9. Competitive Landscape</b>', sH1, 0))

story.append(P(
    'The competitive landscape for data center investment in Morocco and Africa is rapidly evolving. Within Morocco, three major projects have been announced in 2024-2025: '
    'the Iozera facility in Tetouan (386 MW, $500M MoU, targeting the European AI market with proximity to Gibraltar), the Naver Cloud facility also in Tetouan '
    '(500 MW, partnership with NVIDIA, Korean cloud giant entering Africa), and the Nouaceur project near Casablanca (500 MW target, 100% renewable, led by TAQA Morocco). '
    'These projects collectively represent 1,386 MW of announced capacity, though none are yet operational as of early 2026. The key differentiator for the Sahara Neural Hub '
    'in Dakhla is its unique positioning as a sovereign African data storage facility with direct submarine cable connectivity to West Africa, which the Tetouan projects '
    '(oriented toward European clients) cannot replicate. In the broader African context, South Africa\'s Teraco leads with ~130 MW operational and expansion underway, '
    'while Nigeria\'s MDXi (Equinix) and Kenya\'s emerging IXAfrica (53 MW announced) represent the primary competitive hubs. '
    'However, none of these competitors combine the green energy narrative, West African connectivity, and sovereign cloud positioning that Dakhla offers.'
))

comp_data = [
    ['Project / Operator', 'Location', 'Capacity', 'Status / Differentiator'],
    [TC('Iozera'), TC('Tetouan, Morocco'), TC('386 MW'), TC('MoU 2024; EU-focused; NVIDIA partner')],
    [TC('Naver Cloud'), TC('Tetouan, Morocco'), TC('500 MW'), TC('Korean giant; NVIDIA; Q4 2025 start')],
    [TC('Nouaceur DC'), TC('Casablanca, Morocco'), TC('500 MW'), TC('TAQA Morocco; 100% renewable')],
    [TC('Teraco'), TC('Johannesburg, SA'), TC('~130 MW'), TC('Largest in Africa; expanding')],
    [TC('MDXi (Equinix)'), TC('Lagos, Nigeria'), TC('Tier III'), TC('Leading West Africa hub')],
    [TC('IXAfrica'), TC('Nairobi, Kenya'), TC('53 MW'), TC('2nd hyperscale announced Nov 2024')],
    [TC('Sahara Neural Hub'), TC('Dakhla, Morocco'), TC('50-100 MW'), TC('Green + Sovereign + West Africa gateway')],
]
story.append(Spacer(1, 10))
story.append(make_table(comp_data[0], comp_data[1:], [0.22, 0.20, 0.15, 0.43]))
story.append(P('Table 13: Competitive Data Center Projects in Morocco and Africa', sCaption))

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 10. IMPLEMENTATION ROADMAP
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
story.append(add_heading('<b>10. Implementation Roadmap</b>', sH1, 0))

story.append(P(
    'The implementation of the Sahara Neural Hub follows a phased approach designed to manage risk, secure early revenue, and align with the delivery of critical infrastructure projects '
    '(particularly the Dakhla-Casablanca THT line in 2028). The roadmap is structured in three phases spanning 36-60 months from project initiation to full build-out, '
    'with each phase designed to be independently viable and revenue-generating. This phased approach allows for course corrections based on market response, '
    'technology evolution, and infrastructure development timelines.'
))

roadmap_data = [
    ['Phase', 'Timeline', 'Scope', 'Key Milestones'],
    [TC('Phase 0: Foundation'), TC('Months 1-6'), TC('Legal, permits, land'), TC('SAS formation, DWAFZ registration, land acquisition, environmental study')],
    [TC('Phase 1A: Energy'), TC('Months 6-24'), TC('Renewable energy + grid'), TC('Wind farm 50 MW, solar 30 MW, BESS 100 MWh, grid connection agreement')],
    [TC('Phase 1B: DC Shell'), TC('Months 12-30'), TC('Building + infrastructure'), TC('Shell construction, power infrastructure, cooling, UPS, networking')],
    [TC('Phase 1C: IT Deploy'), TC('Months 24-36'), TC('GPU clusters Phase 1'), TC('500 H100/B200 GPUs, InfiniBand fabric, sovereign cloud platform launch')],
    [TC('Phase 2: Scale'), TC('Months 36-60'), TC('Full build-out'), TC('Additional 1,500 GPUs, expand to 50 MW, seawater cooling eval, 100 MW planning')],
]
story.append(Spacer(1, 10))
story.append(make_table(roadmap_data[0], roadmap_data[1:], [0.18, 0.15, 0.25, 0.42]))
story.append(P('Table 14: Implementation Roadmap', sCaption))

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 11. KEY CONTACTS AND INSTITUTIONS
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
story.append(add_heading('<b>11. Key Contacts and Institutions</b>', sH1, 0))

story.append(P(
    'The following table provides the essential contacts for advancing the Sahara Neural Hub project, including government agencies, investment promotion bodies, '
    'regulatory authorities, and key private sector stakeholders. These contacts have been verified through official websites and public directories as of March 2026. '
    'It is recommended to initiate engagement with the CRI Dakhla as the first point of contact, as the center provides a one-stop shop for investor facilitation '
    'including company registration, land allocation, and regulatory guidance.'
))

contacts_data = [
    ['Organization', 'Role', 'Contact'],
    [TC('CRI Dakhla'), TC('Investment facilitation (one-stop shop)'), TC('+212 5 28 89 85 35 / contact@cri-dakhla.ma')],
    [TC('AMDI / AMDIE'), TC('National investment promotion'), TC('+212 5 22 26 88 88 / contact@amdie.gov.ma')],
    [TC('ANRT'), TC('Telecom regulation / DC licensing'), TC('+212 5 37 71 84 00 / anrt@anrt.ma')],
    [TC('CNDP (Data Protection)'), TC('Personal data regulation (Loi 09-08)'), TC('+212 5 37 72 44 00 / contact@cnpd.ma')],
    [TC('Wilaya de Dakhla'), TC('Regional administration'), TC('+212 5 28 89 60 00')],
    [TC('CCIS Dakhla'), TC('Chamber of Commerce'), TC('+212 5 28 89 65 65')],
    [TC('APDak'), TC('Dakhla investment promotion agency'), TC('08 08 57 99 00 / agencepromotiondakhla.ma')],
    [TC('ONEE (Electricity)'), TC('Power utility / grid connection'), TC('0801 00 22 22 / one.org.ma')],
    [TC('MASEN'), TC('Renewable energy agency'), TC('masen.ma')],
    [TC('ANRE'), TC('Electricity regulation'), TC('anre.ma')],
    [TC('Maroc Telecom'), TC('Submarine cable operator / DC'), TC('iam.ma')],
    [TC('Orange Morocco'), TC('DC operator / connectivity'), TC('orange.ma')],
    [TC('Inwi'), TC('DC operator / Medusa partner'), TC('inwi.ma')],
]
story.append(Spacer(1, 10))
story.append(make_table(contacts_data[0], contacts_data[1:], [0.22, 0.35, 0.43]))
story.append(P('Table 15: Key Contacts and Institutions', sCaption))

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 12. CONCLUSION AND RECOMMENDATION
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
story.append(add_heading('<b>12. Conclusion and Recommendation</b>', sH1, 0))

story.append(P(
    'The Sahara Neural Hub project represents a compelling investment opportunity at the intersection of three mega-trends: the explosive growth of AI computing demand, '
    'the acceleration of data sovereignty requirements across Africa, and the global transition to green digital infrastructure. Dakhla\'s unique combination of world-class '
    'wind resources (LCOE $0.022-0.035/kWh), operational submarine cable connectivity to Europe and West Africa (20-40 Tbps), favorable tax regime (DWAFZ: 0% IS for 5 years, '
    'then 15%), and exceptional free cooling potential (5,000-7,500 hours/year) creates a value proposition that no other African location can currently replicate in its entirety.'
))

story.append(P(
    'The financial analysis indicates a total CAPEX of $611M-$1.135B for a 50 MW facility with 2,000 GPU servers, with annual OPEX potentially as low as $30-53M '
    'when leveraging self-generated renewable energy versus $82-99M on grid power. The project IRR of 12-18% over a 15-year horizon, combined with the Dakhla Free Zone tax advantages, '
    'presents an attractive risk-adjusted return profile. The phased implementation strategy (6-month foundation, 30-month Phase 1, 60-month full build) manages execution risk '
    'while aligning with the delivery of critical infrastructure projects, particularly the Dakhla-Casablanca 3 GW transmission line expected in 2028.'
))

story.append(P(
    'The key risks (geopolitical ambiguity, infrastructure dependency, and technology evolution) are manageable with appropriate mitigation strategies. '
    'The first-mover advantage in Dakhla is time-sensitive: as Morocco\'s data center pipeline matures and other regions develop sovereign cloud capacity, '
    'the window of opportunity for establishing Dakhla as the definitive gateway between Europe and West Africa will narrow. The recommendation is to proceed '
    'with Phase 0 (Foundation) immediately, targeting SAS formation, DWAFZ registration, and land acquisition within 6 months, with a Phase 1 investment decision '
    'contingent on confirmation of the THT line construction timeline and the securing of anchor tenant commitments for at least 30% of Phase 1 capacity. '
    'This project has the potential to position Morocco as the continental leader in sovereign AI infrastructure and to establish Dakhla as a landmark green data center destination '
    'that sets the standard for sustainable digital infrastructure in the 21st century.'
))

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 13. SOURCES AND REFERENCES
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
story.append(add_heading('<b>13. Sources and References</b>', sH1, 0))

sources = [
    'IRENA - Renewable Power Generation Costs in 2024 (irena.org)',
    'NREL - Cost of Wind Energy Review 2024 (nrel.gov)',
    'ScienceDirect - Evaluation of wind energy potential in Morocco (Hulio et al., 2019)',
    'RES4Africa - Morocco Country Profile (res4africa.org)',
    'GlobalPetrolPrices - Morocco electricity prices (globalpetrolprices.com)',
    'Arizton / ResearchAndMarkets - Africa Data Center Market Report 2025',
    'Mordor Intelligence - Africa Data Center Market (mordorintelligence.com)',
    'DgtlInfra - How much does it cost to build a data center (dgtlinfra.com)',
    'IntuitionLabs - NVIDIA AI GPU Pricing Guide 2026',
    'GMI Cloud - H100 Cost Analysis 2025 (gmicloud.ai)',
    'Spheron - GPU Cloud Pricing Comparison 2026 (spheron.network)',
    'BloombergNEF - Battery pack prices $70-108/kWh (2025)',
    'Code General des Impots 2024 - Morocco (finances.gov.ma)',
    'Loi 19-94 / Loi 57-19 - Zones Franches d\'Exportation (ZAI)',
    'Loi 09-08 - Protection des donnees personnelles (Morocco)',
    'Loi 13-09 / Loi 58-15 - Energies renouvelables (Morocco)',
    'CRI Dakhla - dakhlainvest.ma / cridakhlapiafe.com',
    'Cabinet DAMI - Avantages fiscaux zones franches Maroc (cabinet-dami.com)',
    'Challenge.ma - Le mirage fiscal du Sud marocain (June 2024)',
    'AMDI / AMDIE - amdie.gov.ma',
    'ANRT - anrt.ma | CNDP - cnpd.ma | MASEN - masen.ma',
    'One.org.ma - ONEE tarifs et infrastructure electrique',
    'SubmarineCableMap - submarinecablemap.com',
    'MEDUSA Submarine Cable System - medusascs.com',
    'Morocco World News - Africa data center push (moroccoworldnews.com)',
    'DabaFinance - Morocco data centers, AI, energy, Europe (dabafinance.com)',
    'AU Data Policy Framework 2024 (au.int)',
    'US State Department - 2025 Investment Climate Statement: Morocco',
]

for i, src in enumerate(sources, 1):
    story.append(P('[%d] %s' % (i, src), sBodyL))

# ━━ Build ━━
doc.multiBuild(story)
print("Body PDF generated:", BODY_PDF)
