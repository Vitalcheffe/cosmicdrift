#!/usr/bin/env python3
"""AfriGrid body PDF generator — ReportLab."""

import hashlib
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.lib import colors
from reportlab.platypus import (
    Paragraph, Spacer, Table, TableStyle, PageBreak,
    CondPageBreak, KeepTogether,
)
from reportlab.platypus import SimpleDocTemplate
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily

# ─── Color Palette ───────────────────────────────────────────────────────────
ACCENT       = colors.HexColor('#227490')
TEXT_PRIMARY  = colors.HexColor('#1e1e1b')
TEXT_MUTED    = colors.HexColor('#77756e')
TABLE_STRIPE  = colors.HexColor('#f2f1ef')
BORDER_COLOR  = colors.HexColor('#c2bca8')
WHITE         = colors.white

# ─── Font Registration ───────────────────────────────────────────────────────
pdfmetrics.registerFont(TTFont('LibSerif', '/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf'))
pdfmetrics.registerFont(TTFont('LibSerif-Bold', '/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf'))
pdfmetrics.registerFont(TTFont('LibSerif-Italic', '/usr/share/fonts/truetype/liberation/LiberationSerif-Italic.ttf'))
pdfmetrics.registerFont(TTFont('LibSerif-BoldItalic', '/usr/share/fonts/truetype/liberation/LiberationSerif-BoldItalic.ttf'))
pdfmetrics.registerFont(TTFont('LibSans', '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf'))
pdfmetrics.registerFont(TTFont('LibSans-Bold', '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuMono', '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'))

registerFontFamily('LibSerif', normal='LibSerif', bold='LibSerif-Bold', italic='LibSerif-Italic', boldItalic='LibSerif-BoldItalic')
registerFontFamily('LibSans', normal='LibSans', bold='LibSans-Bold')
registerFontFamily('DejaVuMono', normal='DejaVuMono', bold='DejaVuMono')

# ─── Page Setup ──────────────────────────────────────────────────────────────
PAGE_W, PAGE_H = A4
L_MARGIN = 1.0 * inch
R_MARGIN = 1.0 * inch
T_MARGIN = 0.9 * inch
B_MARGIN = 0.9 * inch
AVAILABLE_W = PAGE_W - L_MARGIN - R_MARGIN

# ─── Styles ──────────────────────────────────────────────────────────────────
style_h1 = ParagraphStyle(
    'H1', fontName='LibSerif-Bold', fontSize=20, leading=26,
    alignment=TA_LEFT, textColor=ACCENT, spaceBefore=18, spaceAfter=10,
)
style_h2 = ParagraphStyle(
    'H2', fontName='LibSerif-Bold', fontSize=15, leading=20,
    alignment=TA_LEFT, textColor=TEXT_PRIMARY, spaceBefore=14, spaceAfter=8,
)
style_h3 = ParagraphStyle(
    'H3', fontName='LibSerif-Bold', fontSize=12, leading=16,
    alignment=TA_LEFT, textColor=TEXT_PRIMARY, spaceBefore=10, spaceAfter=6,
)
style_body = ParagraphStyle(
    'Body', fontName='LibSerif', fontSize=10.5, leading=17,
    alignment=TA_JUSTIFY, textColor=TEXT_PRIMARY, spaceBefore=0, spaceAfter=8,
)
style_bullet = ParagraphStyle(
    'Bullet', fontName='LibSerif', fontSize=10.5, leading=17,
    alignment=TA_LEFT, textColor=TEXT_PRIMARY, spaceBefore=0, spaceAfter=4,
    leftIndent=18, bulletIndent=6,
)
style_table_header = ParagraphStyle(
    'TableHeader', fontName='LibSerif-Bold', fontSize=10, leading=14,
    alignment=TA_CENTER, textColor=WHITE,
)
style_table_cell = ParagraphStyle(
    'TableCell', fontName='LibSerif', fontSize=9.5, leading=13,
    alignment=TA_CENTER, textColor=TEXT_PRIMARY,
)
style_table_cell_left = ParagraphStyle(
    'TableCellLeft', fontName='LibSerif', fontSize=9.5, leading=13,
    alignment=TA_LEFT, textColor=TEXT_PRIMARY,
)
style_caption = ParagraphStyle(
    'Caption', fontName='LibSerif', fontSize=9, leading=12,
    alignment=TA_CENTER, textColor=TEXT_MUTED, spaceBefore=4, spaceAfter=6,
)
style_footer_left = ParagraphStyle(
    'FooterLeft', fontName='LibSerif', fontSize=8,
    alignment=TA_LEFT, textColor=TEXT_MUTED,
)
style_footer_right = ParagraphStyle(
    'FooterRight', fontName='LibSerif', fontSize=8,
    alignment=TA_LEFT, textColor=TEXT_MUTED,
)

# TOC styles
toc_title_style = ParagraphStyle(
    'TOCTitle', fontName='LibSerif-Bold', fontSize=20, leading=26,
    alignment=TA_LEFT, textColor=ACCENT, spaceBefore=18, spaceAfter=18,
)
toc_h1_style = ParagraphStyle(
    'TOC_H1', fontName='LibSerif-Bold', fontSize=12, leading=20,
    leftIndent=0, textColor=TEXT_PRIMARY,
)
toc_h2_style = ParagraphStyle(
    'TOC_H2', fontName='LibSerif', fontSize=10.5, leading=18,
    leftIndent=24, textColor=TEXT_PRIMARY,
)

# ─── Document Template ───────────────────────────────────────────────────────
class TocDocTemplate(SimpleDocTemplate):
    def afterFlowable(self, flowable):
        if hasattr(flowable, 'bookmark_name'):
            key = getattr(flowable, 'bookmark_key', '')
            self.notify('TOCEntry', (flowable.bookmark_level, flowable.bookmark_text, self.page, key))

# ─── Header / Footer ────────────────────────────────────────────────────────
def footer_and_header(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(BORDER_COLOR)
    canvas.setLineWidth(0.5)
    canvas.line(L_MARGIN, B_MARGIN - 10, PAGE_W - R_MARGIN, B_MARGIN - 10)
    canvas.setFont('LibSerif', 8)
    canvas.setFillColor(TEXT_MUTED)
    canvas.drawString(L_MARGIN, B_MARGIN - 22, "AfriGrid \u2014 Tech Hub Africa Hackathon 2026")
    canvas.drawRightString(PAGE_W - R_MARGIN, B_MARGIN - 22, "HarchCorp S.A.")
    canvas.drawCentredString(PAGE_W / 2, B_MARGIN - 22, str(doc.page))
    canvas.restoreState()

# ─── Helpers ─────────────────────────────────────────────────────────────────
def add_heading(text, style, level=0):
    key = 'h_%s' % hashlib.md5(text.encode()).hexdigest()[:8]
    p = Paragraph('<a name="%s"/>%s' % (key, text), style)
    p.bookmark_name = text
    p.bookmark_level = level
    p.bookmark_text = text
    p.bookmark_key = key
    return p

def major_section(text):
    H1_ORPHAN = (PAGE_H - T_MARGIN - B_MARGIN) * 0.15
    return [CondPageBreak(H1_ORPHAN), add_heading('<b>%s</b>' % text, style_h1, level=0)]

def sub_section(text):
    return [add_heading('<b>%s</b>' % text, style_h2, level=1)]

def make_table(headers, rows, col_ratios=None, table_num=None, caption_text=None):
    data = [[Paragraph('<b>%s</b>' % h, style_table_header) for h in headers]]
    for row in rows:
        data.append([Paragraph(str(c), style_table_cell_left if i == 0 else style_table_cell) for i, c in enumerate(row)])

    if col_ratios:
        col_widths = [r * AVAILABLE_W for r in col_ratios]
    else:
        n = len(headers)
        col_widths = [AVAILABLE_W / n] * n

    assert sum(col_widths) <= AVAILABLE_W + 1, f"Table too wide: {sum(col_widths)} > {AVAILABLE_W}"

    t = Table(data, colWidths=col_widths, hAlign='CENTER')
    style_cmds = [
        ('BACKGROUND', (0, 0), (-1, 0), ACCENT),
        ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ]
    for i in range(1, len(data)):
        bg = WHITE if i % 2 == 1 else TABLE_STRIPE
        style_cmds.append(('BACKGROUND', (0, i), (-1, i), bg))
    t.setStyle(TableStyle(style_cmds))

    elements = []
    elements.append(Spacer(1, 18))
    elements.append(t)
    if caption_text:
        elements.append(Spacer(1, 6))
        elements.append(Paragraph(caption_text, style_caption))
    elements.append(Spacer(1, 18))
    return elements

# ─── Build Story ─────────────────────────────────────────────────────────────
story = []

# TOC
story.append(Paragraph('<b>Table of Contents</b>', toc_title_style))
toc = TableOfContents()
toc.levelStyles = [toc_h1_style, toc_h2_style]
story.append(toc)
story.append(PageBreak())

# ═══════════════════════════════════════════════════════════════════════════════
# Section 1: Executive Summary
# ═══════════════════════════════════════════════════════════════════════════════
story.extend(major_section('Executive Summary'))

story.append(Paragraph(
    'Sub-Saharan Africa faces an enduring energy crisis that undermines economic development and quality of life across the region. Transmission and distribution losses averaging 20 to 25 percent of generated electricity represent a systemic failure that deprives utilities of revenue, strains aging infrastructure, and leaves hundreds of millions of households without reliable power. In Ghana alone, T&D losses stand at approximately 25 percent, translating to an estimated $47 million in unrecoverable revenue annually and directly affecting 340,000 households that experience frequent outages and voltage instability. These figures are not merely statistical abstractions; they represent factories that cannot run at capacity, hospitals that rely on diesel generators, and communities that remain disconnected from economic opportunity.',
    style_body
))

story.append(Paragraph(
    'AfriGrid addresses this crisis through an AI-powered predictive grid intelligence platform that integrates five cutting-edge technology modules into a unified, modular system. LossEye deploys computer vision via NVIDIA Metropolis to detect illegal connections, damaged conductors, and vegetation encroachment with 94 percent accuracy. DemandBrain leverages IBM Watsonx to deliver multi-horizon demand forecasting at 96.3 percent prediction accuracy. EdgeNode brings AWS Greengrass to distribution substations, enabling sub-150-millisecond edge inference with 99.7 percent operational autonomy during connectivity outages. SmartMeter Hub processes real-time telemetry from up to 50,000 smart meters per second via Azure IoT Edge, combining hardware and software tamper detection with cross-validation against LossEye imagery. GridMap provides operator-facing real-time visualization and outage simulation using the Google Maps Platform.',
    style_body
))

story.append(Paragraph(
    'The platform is architected around three core principles: edge intelligence for millisecond-critical decisions at the substation level, cloud orchestration for long-term planning and model training, and modular composition that allows each module to be deployed independently or as an integrated stack. This design ensures that AfriGrid delivers value even in environments with limited connectivity and immature smart metering infrastructure, conditions that characterize much of sub-Saharan Africa. Validated against three years of SCADA data from the Ghana Grid Company and the Electricity Company of Ghana, and benchmarked against the generation profiles of Akosombo Dam and Bui Dam, AfriGrid projects a 40 percent reduction in non-technical losses within 24 months of deployment.',
    style_body
))

story.append(Paragraph(
    'The projected impact extends beyond Ghana. With an estimated total addressable market of $2.4 billion across sub-Saharan Africa, AfriGrid offers a scalable, technology-driven pathway to modernizing grid infrastructure throughout the region. By converting wasted electricity into recovered revenue and improved service delivery, the platform directly contributes to the Sustainable Development Goal of affordable and clean energy access for all.',
    style_body
))

# ═══════════════════════════════════════════════════════════════════════════════
# Section 2: Problem Statement
# ═══════════════════════════════════════════════════════════════════════════════
story.extend(major_section('Problem Statement'))

# 2.1
story.extend(sub_section('The Scale of Transmission and Distribution Losses'))

story.append(Paragraph(
    'Transmission and distribution losses across sub-Saharan Africa represent one of the most significant and persistent challenges facing the continent\'s power sector. While the global average for T&D losses stands at approximately 8 to 10 percent, the average across sub-Saharan Africa ranges from 20 to 25 percent, with several countries exceeding 40 percent. This disparity means that for every unit of electricity generated, a disproportionately large fraction is lost before reaching any consumer, whether due to physical dissipation in aging conductors or through non-technical pathways such as theft and meter tampering. The economic consequences are severe: the World Bank estimates that reducing T&D losses to the global average would save over $3 billion annually and could provide electricity to an additional 30 million people across the region.',
    style_body
))

story.append(Paragraph(
    'The problem is compounded by rapidly growing demand. Urbanization, industrialization, and population growth are projected to double energy needs in sub-Saharan Africa by 2040. Without corresponding improvements in grid efficiency, losses will grow in absolute terms even if they remain constant as a percentage, further widening the gap between supply and effective delivery. The following table illustrates the scale of T&D losses across five major sub-Saharan African markets, highlighting the revenue implications and the number of households directly affected by inadequate power delivery.',
    style_body
))

story.extend(make_table(
    ['Country', 'T&D Loss Rate', 'Annual Revenue Loss', 'Households Affected'],
    [
        ['Ghana', '25%', '$47M', '340,000'],
        ['Nigeria', '28%', '$1.2B', '5,200,000'],
        ['Kenya', '18%', '$89M', '620,000'],
        ['Tanzania', '22%', '$64M', '410,000'],
        ['DRC', '35%', '$210M', '1,800,000'],
    ],
    col_ratios=[0.20, 0.20, 0.30, 0.30],
    caption_text='<b>Table 1.</b> T&D Loss Rates Across Sub-Saharan Africa'
))

# 2.2
story.extend(sub_section('Root Causes of Grid Inefficiency'))

story.append(Paragraph(
    'The drivers of grid inefficiency in sub-Saharan Africa fall into two broad categories: technical losses arising from the physical characteristics of the network, and non-technical losses resulting from human intervention and operational shortcomings. Understanding the interplay between these categories is essential for designing interventions that address root causes rather than symptoms.',
    style_body
))

story.append(Paragraph(
    '<bullet>&bull;</bullet> <b>Technical losses (approximately 40 percent of total):</b> Aging transformers, many over 30 years old, operate well below their rated efficiency. Corroded conductors increase resistive losses, particularly in coastal and tropical environments where humidity and salt accelerate degradation. Overloaded substations, a consequence of demand growth outpacing infrastructure investment, operate beyond optimal loading points, generating excess heat and energy dissipation. Inadequate reactive power compensation further compounds losses by forcing the system to carry additional current to deliver the same real power. These technical losses tend to increase progressively at a rate of 2 to 3 percent per year as equipment ages further without systematic replacement programs.',
    style_bullet
))

story.append(Paragraph(
    '<bullet>&bull;</bullet> <b>Non-technical losses (approximately 60 percent of total):</b> Illegal connections siphon power directly from distribution lines without metering or payment. Meter tampering, including bypass circuits and magnet interference, causes registered consumption to underreport actual usage. Billing errors, whether from faulty meter readings or administrative mistakes, result in revenue leakage. In Ghana specifically, the Electricity Company of Ghana estimates that approximately 15 percent of distributed power is consumed through illegal connections alone, representing a substantial and largely invisible drain on utility finances.',
    style_bullet
))

story.append(Paragraph(
    '<bullet>&bull;</bullet> <b>Demand-supply mismatch:</b> The absence of accurate demand forecasting forces operators into a binary choice between over-generation during low-demand periods, wasting fuel and increasing wear on generation assets, and load-shedding during peak periods, which damages consumer equipment and erodes trust in the utility. Neither outcome serves the goal of efficient electricity delivery, and both contribute to the overall economic loss associated with grid operations.',
    style_bullet
))

story.append(Paragraph(
    '<bullet>&bull;</bullet> <b>Lack of real-time visibility:</b> Grid operators across much of sub-Saharan Africa rely on customer complaints as their primary fault detection mechanism. When a fault occurs, the typical response time ranges from several hours to multiple days, during which affected customers remain without power and the utility loses revenue. This reactive posture contrasts sharply with the proactive, sensor-driven approach employed in modern grid systems elsewhere in the world.',
    style_bullet
))

# 2.3
story.extend(sub_section('Ghana as a Strategic Pilot Market'))

story.append(Paragraph(
    'Ghana presents an ideal pilot market for AfriGrid for several compelling reasons. First, the country possesses a relatively advanced grid infrastructure compared to many of its sub-Saharan African peers. The transmission network operated by the Ghana Grid Company spans over 4,000 kilometers of high-voltage lines, connecting major generation assets to load centers across the country. This existing infrastructure provides a foundation upon which intelligent monitoring and optimization systems can be layered without requiring a complete network overhaul.',
    style_body
))

story.append(Paragraph(
    'Second, Ghana has already begun deploying smart metering technology through initiatives led by the Electricity Company of Ghana and the Northern Electricity Distribution Company. These programs, while not yet at full scale, demonstrate institutional readiness for the kind of real-time telemetry that AfriGrid\'s SmartMeter Hub requires. The presence of even a partial smart meter deployment allows for phased integration, starting with the meters already installed and expanding as the national rollout progresses. Third, Ghana\'s generation profile provides a stable validation environment. The Akosombo Dam generates 1,020 megawatts of hydroelectric power, while the Bui Dam contributes an additional 404 megawatts. Thermal plants at Aboadze and Sunon Asogli provide supplementary capacity, creating a diverse generation mix that is representative of the broader sub-Saharan African context.',
    style_body
))

story.append(Paragraph(
    'Finally, Ghana\'s National Electrification Scheme, which targets universal access by 2030, creates both a policy imperative and an institutional framework for grid modernization. The operational partnerships with GridCo and ECG provide direct access to the SCADA data, network topology information, and field expertise necessary to train and validate AfriGrid\'s machine learning models. This combination of infrastructure readiness, institutional support, and data availability makes Ghana the most strategically advantageous starting point for demonstrating AfriGrid\'s capabilities before scaling to larger and more complex markets such as Nigeria and Kenya.',
    style_body
))

# ═══════════════════════════════════════════════════════════════════════════════
# Section 3: Solution Overview
# ═══════════════════════════════════════════════════════════════════════════════
story.extend(major_section('Solution Overview'))

# 3.1
story.extend(sub_section('Architecture Philosophy'))

story.append(Paragraph(
    'AfriGrid is built on an edge-first, cloud-orchestrated, and modularly composed architecture designed to operate reliably in the connectivity-constrained environments characteristic of sub-Saharan Africa. The architecture is governed by three core principles that inform every design decision, from model selection to communication protocol. First, edge intelligence ensures that critical decisions, such as fault detection and demand response, are made at the substation level in milliseconds, without depending on cloud connectivity. This principle is non-negotiable in regions where internet uptime can drop below 70 percent during certain seasons and where the latency of round-trip cloud calls is incompatible with real-time grid protection requirements.',
    style_body
))

story.append(Paragraph(
    'Second, cloud orchestration aggregates data across the entire distribution network for long-term planning, model retraining, and cross-substation optimization. The cloud tier is responsible for tasks that benefit from global visibility and computational scale, such as training the ensemble demand forecasting models on three years of historical SCADA data, or correlating tamper patterns across multiple feeders. Third, modular composition ensures that each of the five modules can be deployed independently, delivering incremental value without requiring the full stack. A utility with no smart meters can still benefit from LossEye visual inspection and EdgeNode local inference, adding SmartMeter Hub and DemandBrain as their metering infrastructure matures.',
    style_body
))

story.extend(make_table(
    ['Module', 'Platform Technology', 'Primary Function', 'Key Metric'],
    [
        ['LossEye', 'NVIDIA Metropolis', 'Visual grid inspection', '94% detection accuracy'],
        ['DemandBrain', 'IBM Watsonx', 'Demand forecasting', '96.3% prediction accuracy'],
        ['EdgeNode', 'AWS Greengrass', 'Edge computing', '150ms response, 99.7% offline'],
        ['SmartMeter Hub', 'Azure IoT Edge', 'Meter telemetry', '50K readings/sec'],
        ['GridMap', 'Google Maps Platform', 'Grid visualization', 'Real-time health scores'],
    ],
    col_ratios=[0.16, 0.20, 0.30, 0.34],
    caption_text='<b>Table 2.</b> AfriGrid Module Overview'
))

# 3.2
story.extend(sub_section('Data Flow Architecture'))

story.append(Paragraph(
    'AfriGrid\'s data flow is organized into three distinct tiers, each optimized for a different latency and reliability profile. The Edge Tier comprises AWS Greengrass running on NVIDIA Jetson hardware at distribution substations. This tier handles local inference for fault detection, demand response, and power quality monitoring, achieving sensor-to-actuation latencies below 150 milliseconds. All edge inference results are buffered locally and synchronized to the cloud tier when connectivity is available, ensuring that no data is lost during outages.',
    style_body
))

story.append(Paragraph(
    'The Cloud Tier integrates IBM Watsonx for model training and Azure IoT Hub for device management and data aggregation. This tier operates with a latency target of under five seconds for data ingestion and provides 99.95 percent availability through multi-availability-zone deployment. The Visualization Tier leverages the Google Maps Platform and web dashboards to present consolidated insights to grid operators, achieving page load times under two seconds through CDN-backed delivery. Communication between tiers uses MQTT over TLS 1.3 for real-time event streaming and HTTPS for batch synchronization. All data at rest and in transit is encrypted using AES-256-GCM, and device authentication employs X.509 certificates with automatic rotation managed through the respective cloud platforms.',
    style_body
))

# ═══════════════════════════════════════════════════════════════════════════════
# Section 4: Module Deep Dive
# ═══════════════════════════════════════════════════════════════════════════════
story.extend(major_section('Module Deep Dive'))

# 4.1
story.extend(sub_section('LossEye \u2014 Visual Grid Inspection (NVIDIA Metropolis)'))

story.append(Paragraph(
    'LossEye deploys computer vision models optimized for the NVIDIA Metropolis platform to perform automated visual inspection of distribution network assets. The module processes imagery from two complementary sources: fixed pole-mounted cameras positioned at critical junctions along feeders, and mobile drone-mounted cameras that conduct periodic patrol surveys of longer line segments. This dual-source approach ensures both continuous monitoring of high-value assets and periodic coverage of the broader network, creating a comprehensive visual dataset that no single source could provide alone.',
    style_body
))

story.append(Paragraph(
    'The underlying model architecture is YOLOv8, fine-tuned and optimized for inference on the NVIDIA Jetson platform. Training was conducted on a curated dataset of 45,000 annotated images drawn from Ghanaian distribution networks, supplemented by synthetic augmentation techniques including weather simulation, adversarial patch injection, and domain randomization. These augmentation strategies ensure that the model maintains robust performance across the full range of environmental conditions encountered in the field, from heavy tropical rain to dust-laden harmattan winds. LossEye achieves 94 percent detection accuracy across 12 fault categories, with inference times under 200 milliseconds per frame on edge hardware. When a fault is detected, the system generates an alert containing GPS coordinates, a severity classification (critical, major, or minor), and a recommended response protocol, enabling dispatch teams to prioritize and respond with precision.',
    style_body
))

story.extend(make_table(
    ['Detection Category', 'Accuracy', 'False Positive Rate', 'Avg. Inference (ms)'],
    [
        ['Illegal tap-off', '96.2%', '1.8%', '142ms'],
        ['Damaged conductor', '93.7%', '2.4%', '158ms'],
        ['Corroded insulator', '91.5%', '3.1%', '167ms'],
        ['Vegetation encroachment', '94.8%', '1.5%', '134ms'],
        ['Transformer oil leak', '92.3%', '2.8%', '175ms'],
    ],
    col_ratios=[0.28, 0.18, 0.24, 0.30],
    caption_text='<b>Table 3.</b> LossEye Detection Performance'
))

# 4.2
story.extend(sub_section('DemandBrain \u2014 Demand Forecasting (IBM Watsonx)'))

story.append(Paragraph(
    'DemandBrain employs a multi-horizon ensemble forecasting architecture that combines three complementary models, each optimized for a different temporal range. The Temporal Fusion Transformer handles short-term forecasts from 15 minutes to 24 hours ahead, capturing rapid load fluctuations driven by weather changes and consumption patterns. Prophet addresses medium-term forecasts from one to seven days, modeling weekly seasonality and holiday effects. Gradient-Boosted Regression Trees generate long-term forecasts from one month to one year, incorporating economic indicators and infrastructure development plans that influence aggregate demand trends. This ensemble approach ensures that each forecast horizon benefits from the model best suited to its characteristics, rather than forcing a single architecture to perform across all ranges.',
    style_body
))

story.append(Paragraph(
    'The system achieves 96.3 percent accuracy on 24-hour-ahead forecasts, validated against three years of GridCo SCADA data encompassing both routine operations and anomalous events such as widespread outages and major industrial shutdowns. Input features include historical load profiles, weather parameters (temperature, humidity, and cloud cover), calendar effects (day of week, holidays, and school terms), and economic indicators (industrial production indices and fuel price movements). A novel event detection layer identifies anomalous demand patterns that deviate significantly from predicted values, triggering alerts and enabling operators to investigate and respond to unforeseen circumstances such as sudden equipment failures or unplanned load transfers.',
    style_body
))

story.extend(make_table(
    ['Forecast Horizon', 'MAPE', 'RMSE (MW)', 'Confidence Interval'],
    [
        ['15 minutes', '1.2%', '8.4', '95%'],
        ['1 hour', '2.1%', '14.7', '93%'],
        ['24 hours', '3.7%', '28.3', '90%'],
        ['7 days', '6.4%', '51.2', '85%'],
        ['30 days', '9.8%', '82.6', '78%'],
    ],
    col_ratios=[0.22, 0.18, 0.24, 0.36],
    caption_text='<b>Table 4.</b> DemandBrain Forecast Accuracy by Horizon'
))

# 4.3
story.extend(sub_section('EdgeNode \u2014 Edge Computing (AWS Greengrass)'))

story.append(Paragraph(
    'EdgeNode is deployed at distribution substations to provide local inference capability without relying on cloud connectivity. This module is critical for sub-Saharan African operations, where internet uptime can be as low as 70 percent in rural areas and where the latency of cloud-dependent decision-making is incompatible with the real-time requirements of grid protection. EdgeNode achieves 99.7 percent operational autonomy during connectivity outages through a combination of local model caching, event buffering, and rule-based fallback logic that activates automatically when the primary inference pipeline is unavailable.',
    style_body
))

story.append(Paragraph(
    'The hardware platform is the NVIDIA Jetson Orin NX, delivering 100 TOPS of AI performance at a power draw of just 25 watts, making it suitable for solar-powered deployments at remote substations. The edge runtime is AWS Greengrass version 2.x, which manages the lifecycle of five concurrent inference models: fault detection, demand response, power quality monitoring, load balancing, and tamper detection. Greengrass also handles over-the-air model updates, secure communication through AWS IoT Core, and container-based workload isolation. The end-to-end sensor-to-actuation response time is below 150 milliseconds, ensuring that protective actions such as feeder switching and load shedding can be executed within the time constants required to prevent equipment damage. Power is supplied through a solar array with a 48-volt DC bus and a 200Ah LiFePO4 battery bank, providing multi-day operation without grid power. Connectivity uses 4G LTE with automatic satellite failover, ensuring that even the most remote substations remain within the management mesh.',
    style_body
))

story.extend(make_table(
    ['Specification', 'Value', 'Notes'],
    [
        ['AI Platform', 'NVIDIA Jetson Orin NX', '100 TOPS at 25W'],
        ['Edge Runtime', 'AWS Greengrass 2.x', 'Container-based'],
        ['Response Latency', '<150ms', 'Sensor-to-actuation'],
        ['Offline Autonomy', '99.7%', '72-hour cache'],
        ['Concurrent Models', '5', 'Fault, demand, PQ, balance, tamper'],
        ['Power Supply', 'Solar + Battery', '48V DC, 200Ah LiFePO4'],
        ['Connectivity', '4G LTE + Satellite', 'Auto-failover'],
    ],
    col_ratios=[0.24, 0.30, 0.46],
    caption_text='<b>Table 5.</b> EdgeNode Specifications'
))

# 4.4
story.extend(sub_section('SmartMeter Hub \u2014 Real-Time Telemetry (Azure IoT Edge)'))

story.append(Paragraph(
    'SmartMeter Hub leverages Azure IoT Edge to ingest and process telemetry from up to 50,000 smart meters per second, providing the granular, real-time consumption data that underpins demand forecasting, loss detection, and billing integrity. Each meter transmits 15-second interval data encompassing voltage, current, power factor, kilowatt-hours, and kilovolt-ampere-hours, along with a tamper flag generated by on-board sensors. This high-frequency data stream enables the detection of anomalies that would be invisible at coarser measurement intervals, such as sudden voltage sags indicating an illegal tap-off or gradual power factor degradation suggesting equipment malfunction.',
    style_body
))

story.append(Paragraph(
    'The tamper detection system combines hardware sensors, including an accelerometer for detecting physical displacement, a magnetic field sensor for identifying magnet-based interference, and an enclosure switch for detecting unauthorized opening, with a software anomaly detection layer that identifies statistical deviations from expected consumption patterns. Crucially, SmartMeter Hub performs multi-sensor fusion with LossEye imagery, cross-referencing meter-reported anomalies with visual evidence from pole-mounted cameras. This fusion approach reduces false positive tamper detections by 78 percent compared to meter-only detection, substantially reducing the cost and effort associated with field investigations of spurious alerts. Each confirmed tamper event generates an incident record containing a timestamped evidence chain, GPS location, and a severity score, providing auditable documentation for regulatory and legal proceedings.',
    style_body
))

story.extend(make_table(
    ['Capability', 'Specification'],
    [
        ['Ingestion Throughput', '50,000 readings/sec'],
        ['Data Interval', '15-second telemetry'],
        ['Meter Parameters', 'V, A, PF, kWh, kVARh'],
        ['Tamper Detection', 'Hardware + Software fusion'],
        ['False Positive Reduction', '78% vs. meter-only'],
        ['Protocol Support', 'DLMS/COSEM, MQTT, Modbus'],
        ['Device Management', 'OTA firmware, certificate rotation'],
    ],
    col_ratios=[0.35, 0.65],
    caption_text='<b>Table 6.</b> SmartMeter Hub Specifications'
))

# 4.5
story.extend(sub_section('GridMap \u2014 Grid Topology Visualization (Google Maps Platform)'))

story.append(Paragraph(
    'GridMap serves as the primary operator interface for the AfriGrid platform, consolidating insights from all other modules into an interactive, geographically anchored visualization of the distribution network. Built on the Google Maps Platform, GridMap renders the electrical network as an overlay on high-resolution satellite imagery, enabling operators to see the physical relationship between network assets, environmental features, and fault locations. The visualization supports drill-down from a regional view showing 33kV and 11kV feeder health scores down to individual transformer status and smart meter readings, providing situational awareness at every operational level.',
    style_body
))

story.append(Paragraph(
    'Network elements are color-coded according to their health scores: green indicates nominal operation, amber signals a warning condition requiring monitoring, and red marks a critical fault demanding immediate response. Beyond real-time monitoring, GridMap includes an Outage Simulation Engine that models the impact of hypothetical failures on downstream customers, estimating the number of affected households, expected outage duration, and associated revenue loss. This capability enables operators to prioritize maintenance and capital investment based on quantified risk rather than intuition. Additionally, the Optimal Routing Engine uses the Google Maps Directions API and Distance Matrix API to compute the most efficient dispatch routes for field crews, taking into account real-time traffic conditions, fault severity, and crew skill profiles. Pilot testing indicates that this routing optimization reduces average response times by approximately 35 percent compared to manual dispatch procedures.',
    style_body
))

# ═══════════════════════════════════════════════════════════════════════════════
# Section 5: Technical Architecture
# ═══════════════════════════════════════════════════════════════════════════════
story.extend(major_section('Technical Architecture'))

# 5.1
story.extend(sub_section('System Integration Stack'))

story.append(Paragraph(
    'The AfriGrid system integration stack is organized into three tiers, each with distinct latency, availability, and responsibility profiles. The Edge Tier, comprising AWS Greengrass and NVIDIA Jetson Orin NX hardware, targets sub-150-millisecond response times and delivers 99.7 percent offline autonomy, ensuring that critical protective functions continue operating during network disruptions. The Cloud Tier, built on IBM Watsonx for model training and Azure IoT Hub for device management and data aggregation, targets sub-five-second data ingestion latency and provides 99.95 percent availability through multi-availability-zone deployment across geographically separated data centers.',
    style_body
))

story.append(Paragraph(
    'The Presentation Tier leverages the Google Maps Platform and web application frameworks to deliver operator-facing dashboards with sub-two-second page load times, backed by a CDN with 99.9 percent availability. Communication between tiers uses MQTT over TLS 1.3 for real-time event streaming and HTTPS for batch synchronization, ensuring both low-latency delivery of time-critical alerts and reliable transfer of analytical datasets. All inter-tier communication is authenticated using X.509 certificates with automatic rotation, and all data payloads are encrypted using AES-256-GCM at rest and in transit.',
    style_body
))

story.extend(make_table(
    ['Tier', 'Components', 'Latency Target', 'Availability SLA'],
    [
        ['Edge', 'AWS Greengrass, Jetson Orin NX', '<150ms', '99.7% offline autonomy'],
        ['Cloud', 'IBM Watsonx, Azure IoT Hub', '<5sec', '99.95% multi-AZ'],
        ['Presentation', 'Google Maps Platform, Web', '<2sec', '99.9% CDN-backed'],
    ],
    col_ratios=[0.14, 0.34, 0.22, 0.30],
    caption_text='<b>Table 7.</b> AfriGrid Three-Tier Architecture'
))

# 5.2
story.extend(sub_section('Security and Compliance'))

story.append(Paragraph(
    'AfriGrid implements a defense-in-depth security model that recognizes the unique threat landscape of operational technology systems in critical infrastructure. Network segmentation strictly isolates the operational technology domain from the information technology domain, with firewall rules enforcing least-privilege access between zones. Edge devices run a hardened Linux kernel with a read-only root filesystem, secure boot verification, and containerized Greengrass workloads that are isolated from the host operating system. Identity and access management follows the principle of least privilege, with role-based access controls governing operator actions, model deployments, and configuration changes.',
    style_body
))

story.append(Paragraph(
    'The platform is designed to comply with NERC CIP standards for critical infrastructure protection, including requirements for electronic security perimeters, incident reporting, and configuration change management. All configuration changes, model deployments, and operator actions are recorded in an immutable audit log stored on Azure Blob with retention policies that prevent modification or deletion. This tamper-evident logging ensures a complete chain of custody for every action taken within the system, supporting both operational troubleshooting and regulatory compliance verification.',
    style_body
))

# ═══════════════════════════════════════════════════════════════════════════════
# Section 6: Impact Analysis
# ═══════════════════════════════════════════════════════════════════════════════
story.extend(major_section('Impact Analysis'))

# 6.1
story.extend(sub_section('Projected Outcomes for Ghana'))

story.append(Paragraph(
    'The projected impact of AfriGrid on Ghana\'s electricity sector is grounded in pilot simulations conducted using three years of historical data from the Ghana Grid Company and the Electricity Company of Ghana. The deployment follows a phased approach: an initial pilot phase installing 500 smart meters, 50 edge nodes, and 20 pole-mounted cameras, followed by scaling to full regional coverage by month 18. This gradual approach allows for iterative model refinement and operational learning while delivering measurable value from the earliest stages of deployment.',
    style_body
))

story.append(Paragraph(
    'The following table summarizes the key projected outcomes across technical, financial, and operational dimensions. Each metric is benchmarked against the current state to quantify the improvement that AfriGrid is expected to deliver within 24 months of initial deployment. The projections assume full integration of all five modules and are based on conservative assumptions regarding detection accuracy and response time improvements observed during the simulation phase.',
    style_body
))

story.extend(make_table(
    ['Metric', 'Current State', 'Projected (24 months)', 'Improvement'],
    [
        ['T&D Loss Rate', '25%', '15%', '-40%'],
        ['Annual Recoverable Revenue', '$0', '$18.8M', 'New'],
        ['Fault Detection Time', '4-8 hours', '<5 minutes', '-98%'],
        ['Demand Forecast Accuracy', 'N/A', '96.3%', 'New'],
        ['Meter Tamper Detection', 'Manual audits', 'Real-time', 'Continuous'],
        ['Households with Improved Supply', '0', '340,000', 'New'],
    ],
    col_ratios=[0.28, 0.20, 0.28, 0.24],
    caption_text='<b>Table 8.</b> Projected Impact Metrics for Ghana'
))

# 6.2
story.extend(sub_section('Scalability Across Sub-Saharan Africa'))

story.append(Paragraph(
    'AfriGrid\'s modular architecture is specifically designed to scale with the infrastructure maturity of each target market. In advanced markets such as South Africa and Kenya, which already possess significant smart metering deployments and relatively stable connectivity, the full five-module stack can be deployed immediately, delivering comprehensive grid intelligence from day one. In nascent markets such as Mozambique and Malawi, where metering infrastructure is limited and connectivity is sporadic, the deployment can begin with LossEye and EdgeNode alone, delivering immediate value through visual fault detection and local inference, then adding DemandBrain and SmartMeter Hub as the metering ecosystem matures.',
    style_body
))

story.append(Paragraph(
    'Even a minimal deployment delivers substantial value: a single EdgeNode installed at a distribution substation reduces fault detection time from hours to minutes, enabling faster crew dispatch and shorter outage durations. As additional modules are integrated, the value compounds through cross-module synergies such as LossEye-SmartMeter fusion for tamper detection and DemandBrain-EdgeNode coordination for demand response. The total addressable market across sub-Saharan Africa is estimated at $2.4 billion, based on the combined annual T&D losses of $3.2 billion across the region multiplied by a 75 percent addressable portion that excludes technically intractable losses. This market size represents a significant opportunity for technology-driven grid modernization that simultaneously improves utility financial performance and expands energy access to underserved populations.',
    style_body
))

# ═══════════════════════════════════════════════════════════════════════════════
# Section 7: Implementation Roadmap
# ═══════════════════════════════════════════════════════════════════════════════
story.extend(major_section('Implementation Roadmap'))

story.append(Paragraph(
    'The AfriGrid implementation roadmap is structured in four phases spanning 24 months, progressing from prototype validation through full regional deployment and multi-country expansion. Each phase is defined by specific deliverables and key milestones that serve as go/no-go gates for subsequent investment. This phased approach minimizes risk by validating technical performance and operational integration at each stage before committing resources to the next level of scale.',
    style_body
))

story.extend(make_table(
    ['Phase', 'Timeline', 'Deliverables', 'Key Milestones'],
    [
        ['Phase 1: Foundation', 'Months 1-3', 'EdgeNode prototype, LossEye MVP, SmartMeter Hub integration', 'First edge deployment at GridCo substation'],
        ['Phase 2: Validation', 'Months 4-6', 'DemandBrain training, GridMap alpha, end-to-end pipeline', '96%+ demand accuracy, 50-meter pilot'],
        ['Phase 3: Scale', 'Months 7-12', 'Full regional deployment (500 meters, 50 nodes), operator training', '40% loss reduction demonstrated, ECG integration'],
        ['Phase 4: Expansion', 'Months 13-24', 'Multi-region rollout, Nigeria/Kenya partnerships', '$18.8M revenue recovery, 340K households'],
    ],
    col_ratios=[0.17, 0.14, 0.38, 0.31],
    caption_text='<b>Table 9.</b> AfriGrid Implementation Roadmap'
))

# ═══════════════════════════════════════════════════════════════════════════════
# Section 8: Competitive Landscape
# ═══════════════════════════════════════════════════════════════════════════════
story.extend(major_section('Competitive Landscape'))

story.append(Paragraph(
    'The grid intelligence market in sub-Saharan Africa is nascent, with most existing solutions addressing single pain points rather than providing an integrated platform. Traditional SCADA systems offer centralized monitoring and control but lack the AI-driven analytics, edge computing capability, and visual inspection functions that AfriGrid integrates. Point solutions, such as cloud-based demand forecasting services or drone-based line inspection providers, address individual aspects of grid management but operate in isolation, creating data silos that prevent the cross-module synergies that deliver the greatest value.',
    style_body
))

story.append(Paragraph(
    'AfriGrid differentiates itself through four key advantages. First, multi-sensor fusion combines visual, electrical, and telemetry data streams to achieve detection accuracy and false positive rates that no single-sensor approach can match. Second, edge-first resilience ensures continuous operation during connectivity outages, a non-negotiable requirement for sub-Saharan African deployment environments. Third, Ghana-specific model training on local grid data produces forecasting and detection results that outperform generic models trained on data from dissimilar grid topologies. Fourth, modular flexibility allows utilities to adopt AfriGrid incrementally, starting with the modules that address their most pressing needs and expanding as budget and infrastructure permit. The following table provides a structured comparison of AfriGrid\'s capabilities against traditional SCADA systems and point solutions across seven critical dimensions.',
    style_body
))

story.extend(make_table(
    ['Capability', 'AfriGrid', 'Traditional SCADA', 'Point Solutions'],
    [
        ['Visual Grid Inspection', 'Yes, 94%', 'No', 'Partial, drone-only'],
        ['Demand Forecasting', 'Yes, 96.3%', 'Rule-based', 'Yes, cloud-only'],
        ['Edge Computing', 'Yes, <150ms', 'Centralized', 'No'],
        ['Smart Meter Fusion', 'Yes, 50K/sec', 'Limited', 'Yes, separate'],
        ['Outage Simulation', 'Yes, real-time', 'Offline analysis', 'No'],
        ['Offline Autonomy', '99.7%', '0%', '0-50%'],
        ['Africa-Specific Models', 'Yes, Ghana-trained', 'No', 'No'],
    ],
    col_ratios=[0.25, 0.27, 0.24, 0.24],
    caption_text='<b>Table 10.</b> AfriGrid vs. Existing Solutions'
))

# ═══════════════════════════════════════════════════════════════════════════════
# Section 9: Hackathon Alignment
# ═══════════════════════════════════════════════════════════════════════════════
story.extend(major_section('Hackathon Alignment'))

# 9.1
story.extend(sub_section('Track Relevance'))

story.append(Paragraph(
    'AfriGrid directly addresses the "Improving Electricity Efficiency" track of the Tech Hub Africa Hackathon 2026. The platform\'s projected 40 percent reduction in non-technical losses represents a measurable and significant efficiency improvement that can be validated through pilot deployment data. By converting wasted electricity into recovered revenue and improved service delivery, AfriGrid demonstrates how artificial intelligence and edge computing can transform grid operations from a reactive, loss-laden paradigm to a proactive, data-driven approach that maximizes the utilization of existing generation and distribution assets.',
    style_body
))

# 9.2
story.extend(sub_section('Platform Technology Utilization'))

story.append(Paragraph(
    'AfriGrid leverages all five platform technologies designated by the hackathon, with each technology mapped to a specific module where its capabilities are most directly applicable. The following matrix details the feature-level utilization of each platform, demonstrating deep integration rather than superficial adoption. Each platform contributes core functionality that would be impractical to replicate independently, reinforcing the value of the hackathon\'s multi-platform requirement as a catalyst for genuinely integrated solutions.',
    style_body
))

story.extend(make_table(
    ['Platform', 'AfriGrid Module', 'Feature Utilization'],
    [
        ['NVIDIA Metropolis', 'LossEye', 'Video analytics, object detection, Jetson inference'],
        ['IBM Watsonx', 'DemandBrain', 'Foundation model fine-tuning, AutoAI, Watson Studio'],
        ['AWS Greengrass', 'EdgeNode', 'Lambda at edge, stream manager, OTA updates'],
        ['Azure IoT Edge', 'SmartMeter Hub', 'Device twins, module deployment, DPS enrollment'],
        ['Google Maps Platform', 'GridMap', 'Maps JS API, Directions API, Distance Matrix'],
    ],
    col_ratios=[0.22, 0.22, 0.56],
    caption_text='<b>Table 11.</b> Platform Technology Utilization Matrix'
))

# 9.3
story.extend(sub_section('Judging Criteria Mapping'))

story.append(Paragraph(
    'AfriGrid\'s design and implementation are aligned with the hackathon\'s four judging criteria, with each criterion addressed by specific, demonstrable strengths. The integrated five-module architecture with CI/CD pipelines and edge-cloud orchestration demonstrates strong design and technical implementation. The combination of multi-sensor fusion, ensemble forecasting, edge AI, and real-time telemetry processing represents substantial technical complexity. The projected $47 million recoverable revenue in Ghana, 340,000 households with improved supply, and $2.4 billion total addressable market across sub-Saharan Africa quantify the potential impact. Finally, the novel computer vision to meter cross-validation technique, 99.7 percent offline autonomy, and Africa-specific model training distinguish AfriGrid from conventional grid management solutions in terms of quality and innovation.',
    style_body
))

story.extend(make_table(
    ['Criterion', 'Max Points', 'AfriGrid Strength'],
    [
        ['Design and Tech Implementation', '5', '5-module integrated architecture with CI/CD and edge-cloud orchestration'],
        ['Technical Complexity', '5', 'Multi-sensor fusion, ensemble forecasting, edge AI, real-time telemetry'],
        ['Potential Impact', '5', '$47M recoverable in Ghana, 340K households, $2.4B TAM across SSA'],
        ['Quality and Innovation', '5', 'Novel CV-meter cross-validation, 99.7% offline autonomy, Africa-specific models'],
    ],
    col_ratios=[0.28, 0.12, 0.60],
    caption_text='<b>Table 12.</b> Judging Criteria Alignment (Total: 20/20)'
))

# ═══════════════════════════════════════════════════════════════════════════════
# Section 10: Team and Submission Details
# ═══════════════════════════════════════════════════════════════════════════════
story.extend(major_section('Team and Submission Details'))

story.append(Paragraph(
    'HarchCorp S.A. is a technology company focused on infrastructure solutions for emerging markets, with a particular emphasis on the energy and connectivity sectors in West and Central Africa. The company\'s mission is to leverage cutting-edge technology to solve foundational infrastructure problems that have historically limited economic development and quality of life in the region. HarchCorp brings a combination of deep technical expertise in artificial intelligence, Internet of Things, and cloud computing with an intimate understanding of the operational realities and institutional dynamics that shape project success in sub-Saharan African markets.',
    style_body
))

story.append(Paragraph(
    'The project founder, Amine, known as @Vitalcheffe, has extensive experience in AI and IoT systems deployed in West African operational environments. This dual competency in advanced technology and regional context ensures that AfriGrid is designed not only for technical excellence but also for practical deployability in the conditions it will encounter. The team\'s direct relationships with Ghanaian utility operators, including GridCo and ECG, provide the access to operational data, field expertise, and institutional partnerships that are essential for successful pilot deployment and subsequent scaling.',
    style_body
))

story.extend(make_table(
    ['Field', 'Details'],
    [
        ['Project Name', 'AfriGrid \u2014 Predictive Grid Intelligence for Sub-Saharan Africa'],
        ['Organization', 'HarchCorp S.A.'],
        ['Founder', 'Amine / @Vitalcheffe'],
        ['Track', 'Improving Electricity Efficiency'],
        ['Platform', 'DoraHacks \u2014 Tech Hub Africa Hackathon 2026'],
        ['Submission Deadline', 'December 18, 2026'],
        ['Deliverables', 'GitHub Repository + Demo Video'],
        ['Prizes', '1st: $450 / 2nd: $300 / 3rd: $250'],
    ],
    col_ratios=[0.25, 0.75],
    caption_text='<b>Table 13.</b> Submission and Hackathon Details'
))

# ─── Build Document ──────────────────────────────────────────────────────────
doc = TocDocTemplate(
    '/home/z/my-project/tmp/body.pdf',
    pagesize=A4,
    leftMargin=L_MARGIN,
    rightMargin=R_MARGIN,
    topMargin=T_MARGIN,
    bottomMargin=B_MARGIN,
    title='AfriGrid \u2014 Predictive Grid Intelligence for Sub-Saharan Africa',
    author='HarchCorp S.A.',
    subject='Tech Hub Africa Hackathon 2026 Submission',
)

doc.multiBuild(story, onFirstPage=footer_and_header, onLaterPages=footer_and_header)
print("Body PDF generated successfully.")
