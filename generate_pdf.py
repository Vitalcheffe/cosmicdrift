# -*- coding: utf-8 -*-
"""
CosmicDrift - Ideas and Improvements PDF
Inspired by Mindustry open-source game
"""
import os, hashlib
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch, mm
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    Paragraph, Spacer, Table, TableStyle, PageBreak,
    KeepTogether, CondPageBreak, HRFlowable
)
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.platypus import SimpleDocTemplate
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily

# ─── Font Registration ───
pdfmetrics.registerFont(TTFont('LiberationSerif', '/usr/share/fonts/truetype/chinese/LiberationSerif-Regular.ttf'))
pdfmetrics.registerFont(TTFont('LiberationSerif-Bold', '/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf'))
pdfmetrics.registerFont(TTFont('Carlito', '/usr/share/fonts/truetype/english/Carlito-Regular.ttf'))
pdfmetrics.registerFont(TTFont('Carlito-Bold', '/usr/share/fonts/truetype/english/Carlito-Bold.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSans', '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSans-Bold', '/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf'))
registerFontFamily('LiberationSerif', normal='LiberationSerif', bold='LiberationSerif-Bold')
registerFontFamily('Carlito', normal='Carlito', bold='Carlito-Bold')
registerFontFamily('DejaVuSans', normal='DejaVuSans', bold='DejaVuSans-Bold')

# ─── Palette (from cascade) ───
ACCENT       = colors.HexColor('#957cde')
ACCENT_2     = colors.HexColor('#76c89f')
PAGE_BG      = colors.HexColor('#121110')
SECTION_BG   = colors.HexColor('#1b1a17')
CARD_BG      = colors.HexColor('#1e1c17')
TABLE_STRIPE = colors.HexColor('#1e1d1a')
HEADER_FILL  = colors.HexColor('#585139')
BORDER       = colors.HexColor('#4e4835')
ICON         = colors.HexColor('#c7b684')
TEXT_PRIMARY  = colors.HexColor('#ededeb')
TEXT_MUTED    = colors.HexColor('#95938d')
SEM_SUCCESS  = colors.HexColor('#79b18c')
SEM_WARNING  = colors.HexColor('#c1ad85')
SEM_ERROR    = colors.HexColor('#b2756f')
SEM_INFO     = colors.HexColor('#89a1ba')

# Light mode palette for readability
L_BG         = colors.HexColor('#f8f7f5')
L_SURFACE    = colors.HexColor('#eeece6')
L_ACCENT     = colors.HexColor('#6b5b95')
L_ACCENT2    = colors.HexColor('#4a9e7c')
L_TEXT       = colors.HexColor('#1a1917')
L_MUTED      = colors.HexColor('#6b6860')
L_HEADER_BG  = colors.HexColor('#6b5b95')
L_TABLE_ODD  = colors.HexColor('#f0ede7')
L_TABLE_EVEN = colors.HexColor('#ffffff')
L_BORDER     = colors.HexColor('#d4d0c8')

# ─── Page Setup ───
PAGE_W, PAGE_H = A4
MARGIN = 1.0 * inch
CONTENT_W = PAGE_W - 2 * MARGIN

# ─── Styles ───
styles = {}
styles['h1'] = ParagraphStyle(
    'H1', fontName='LiberationSerif', fontSize=22, leading=28,
    textColor=L_ACCENT, spaceBefore=18, spaceAfter=10, alignment=TA_LEFT
)
styles['h2'] = ParagraphStyle(
    'H2', fontName='LiberationSerif', fontSize=16, leading=22,
    textColor=L_ACCENT, spaceBefore=14, spaceAfter=8, alignment=TA_LEFT
)
styles['h3'] = ParagraphStyle(
    'H3', fontName='LiberationSerif', fontSize=13, leading=18,
    textColor=L_TEXT, spaceBefore=10, spaceAfter=6, alignment=TA_LEFT
)
styles['body'] = ParagraphStyle(
    'Body', fontName='LiberationSerif', fontSize=10.5, leading=17,
    textColor=L_TEXT, spaceBefore=0, spaceAfter=6, alignment=TA_JUSTIFY
)
styles['body_left'] = ParagraphStyle(
    'BodyLeft', fontName='LiberationSerif', fontSize=10.5, leading=17,
    textColor=L_TEXT, spaceBefore=0, spaceAfter=6, alignment=TA_LEFT
)
styles['bullet'] = ParagraphStyle(
    'Bullet', fontName='LiberationSerif', fontSize=10.5, leading=17,
    textColor=L_TEXT, spaceBefore=2, spaceAfter=4, leftIndent=18,
    bulletIndent=6, alignment=TA_LEFT
)
styles['caption'] = ParagraphStyle(
    'Caption', fontName='LiberationSerif', fontSize=9, leading=13,
    textColor=L_MUTED, spaceBefore=3, spaceAfter=6, alignment=TA_CENTER
)
styles['table_header'] = ParagraphStyle(
    'TH', fontName='LiberationSerif', fontSize=10, leading=14,
    textColor=colors.white, alignment=TA_CENTER
)
styles['table_cell'] = ParagraphStyle(
    'TC', fontName='LiberationSerif', fontSize=9.5, leading=14,
    textColor=L_TEXT, alignment=TA_LEFT
)
styles['table_cell_c'] = ParagraphStyle(
    'TCC', fontName='LiberationSerif', fontSize=9.5, leading=14,
    textColor=L_TEXT, alignment=TA_CENTER
)
styles['callout'] = ParagraphStyle(
    'Callout', fontName='LiberationSerif', fontSize=11, leading=17,
    textColor=L_ACCENT, spaceBefore=8, spaceAfter=8, leftIndent=12,
    borderPadding=6, alignment=TA_LEFT
)
styles['toc_h1'] = ParagraphStyle(
    'TOCH1', fontName='LiberationSerif', fontSize=13, leading=20,
    leftIndent=20, textColor=L_TEXT
)
styles['toc_h2'] = ParagraphStyle(
    'TOCH2', fontName='LiberationSerif', fontSize=11, leading=18,
    leftIndent=40, textColor=L_MUTED
)

# ─── TOC DocTemplate ───
class TocDocTemplate(SimpleDocTemplate):
    def afterFlowable(self, flowable):
        if hasattr(flowable, 'bookmark_name'):
            level = getattr(flowable, 'bookmark_level', 0)
            text = getattr(flowable, 'bookmark_text', '')
            key = getattr(flowable, 'bookmark_key', '')
            self.notify('TOCEntry', (level, text, self.page, key))

def add_heading(text, style_key, level=0):
    key = 'h_%s' % hashlib.md5(text.encode()).hexdigest()[:8]
    p = Paragraph('<a name="%s"/><b>%s</b>' % (key, text), styles[style_key])
    p.bookmark_name = text
    p.bookmark_level = level
    p.bookmark_text = text
    p.bookmark_key = key
    return p

def make_table(headers, rows, col_ratios=None):
    n_cols = len(headers)
    if col_ratios is None:
        col_ratios = [1.0/n_cols] * n_cols
    col_widths = [r * CONTENT_W for r in col_ratios]
    
    data = [[Paragraph('<b>%s</b>' % h, styles['table_header']) for h in headers]]
    for row in rows:
        data.append([Paragraph(str(c), styles['table_cell']) if i == 0 
                     else Paragraph(str(c), styles['table_cell_c'])
                     for i, c in enumerate(row)])
    
    t = Table(data, colWidths=col_widths, hAlign='CENTER')
    style_cmds = [
        ('BACKGROUND', (0, 0), (-1, 0), L_HEADER_BG),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('GRID', (0, 0), (-1, -1), 0.5, L_BORDER),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
    ]
    for i in range(1, len(data)):
        bg = L_TABLE_ODD if i % 2 == 0 else L_TABLE_EVEN
        style_cmds.append(('BACKGROUND', (0, i), (-1, i), bg))
    t.setStyle(TableStyle(style_cmds))
    return t

def hr():
    return HRFlowable(width="100%", thickness=0.5, color=L_BORDER, spaceAfter=6, spaceBefore=6)

def bullet(text):
    return Paragraph('<bullet>&bull;</bullet> ' + text, styles['bullet'])

def callout(text):
    return Paragraph('<i>"%s"</i>' % text, styles['callout'])

# ─── Build Document ───
OUTPUT_DIR = '/home/z/my-project/download'
os.makedirs(OUTPUT_DIR, exist_ok=True)
BODY_PDF = os.path.join(OUTPUT_DIR, 'cosmicdrift_ideas_body.pdf')

doc = TocDocTemplate(
    BODY_PDF, pagesize=A4,
    leftMargin=MARGIN, rightMargin=MARGIN,
    topMargin=MARGIN, bottomMargin=MARGIN
)

story = []

# ─── TABLE OF CONTENTS ───
story.append(Paragraph('<b>Table des Matieres</b>', ParagraphStyle(
    'TOCTitle', fontName='LiberationSerif', fontSize=20, leading=26,
    textColor=L_ACCENT, spaceBefore=6, spaceAfter=14, alignment=TA_LEFT
)))
toc = TableOfContents()
toc.levelStyles = [styles['toc_h1'], styles['toc_h2']]
story.append(toc)
story.append(PageBreak())

# ═══════════════════════════════════════════════════════════════
# SECTION 1: Analyse de l'etat actuel
# ═══════════════════════════════════════════════════════════════
story.append(add_heading('1. Analyse de l\'Etat Actuel de CosmicDrift', 'h1', 0))
story.append(Spacer(1, 6))

story.append(Paragraph(
    'CosmicDrift est actuellement un jeu de strategie spatiale au tour par tour construit en JavaScript pur '
    'avec un systeme de carte hexagonale, 6 biomes, 3 factions AI, un arbre technologique en 4 eres, '
    'un systeme d\'oxygene, et des mecaniques de clonage et diplomatie. Le code total represente environ '
    '5800 lignes reparties sur 12 modules JavaScript et un fichier CSS de plus de 1000 lignes. '
    'Bien que la base soit solide, le jeu souffre de plusieurs problemes fondamentaux qui limitent '
    'son attrait et sa rejouabilite a long terme.',
    styles['body']
))

story.append(add_heading('1.1 Forces du jeu actuel', 'h2', 1))
story.append(Paragraph(
    'Le jeu possede plusieurs atouts sur lesquels construire. Le systeme de carte hexagonale avec generation '
    'procedurale par bruit de Perlin est fonctionnel et cree des cartes variées a chaque partie. Le systeme '
    'd\'oxygene comme ressource critique avec depletion progressive ajoute une tension permanente qui force '
    'le joueur a equilibrer expansion et survie. Les 3 factions AI avec des personnalites distinctes '
    '(paisible, neutre, hostile) offrent une dynamique diplomatique interessante. L\'arbre technologique '
    'en 4 eres avec 14 technologies et les 4 conditions de victoire (scientifique, diplomatique, conquete, '
    'survie) donnent au joueur des objectifs clairs et diversifies. Le systeme de clonage avec teleport '
    'tether est une mecanique originale qui merite d\'etre approfondie.',
    styles['body']
))

story.append(add_heading('1.2 Faiblesses critiques', 'h2', 1))
story.append(Paragraph(
    'Malgre ces forces, plusieurs faiblesses empechent le jeu d\'atteindre son potentiel. Le systeme '
    'economique est trop simpliste : 5 ressources collectees automatiquement sans chaines de transformation, '
    'ce qui rend la gestion economique tres superficielle. Le combat est basique avec des echanges de degats '
    'directs sans positionnement tactique ni avantages de terrain significatifs. L\'AI est repetitive et '
    'previsible : les factions suivent des schemas fixes sans strategie adaptive. Il n\'y a pas de mecanique '
    'de defense territoriale active (pas de tours, pas de murs, pas de pieges). Les unites sont limitees '
    'a 6 types dont 3 sont reserves a l\'AI. L\'interface utilisateur est fonctionnelle mais manque '
    'de feedback visuel et de polish. Enfin, il n\'y a pas de systeme de progression entre les parties '
    'ni de meta-jeu qui encourage le joueur a revenir.',
    styles['body']
))

story.append(callout(
    'Mindustry reussit parce qu\'il combine la gestion de chaines de production satisfaisantes '
    'avec une defense en tours intense et une production d\'unites automatisee. CosmicDrift peut '
    's\'inspirer de cette formule tout en gardant son identite de strategie spatiale au tour par tour.'
))

story.append(Spacer(1, 12))

# Tableau comparatif
story.append(make_table(
    ['Aspect', 'CosmicDrift (actuel)', 'Mindustry', 'Ecart'],
    [
        ['Ressources', '5 types, collecte auto', '15+ types, chaines', 'Critique'],
        ['Production', 'Batiments statiques', 'Convoyeurs + usines', 'Majeur'],
        ['Combat', 'Echanges directs', 'Tours + unites + projectiles', 'Critique'],
        ['AI ennemis', '3 factions fixes', 'Vagues progressives', 'Majeur'],
        ['Unites', '6 types', '20+ types + transports', 'Important'],
        ['Energie', 'Consommation basique', 'Grille electrique', 'Majeur'],
        ['Progression', 'Aucune meta', 'Campagne par secteurs', 'Critique'],
        ['Personnalisation', 'Aucune', 'Schemas/blueprints', 'Important'],
    ],
    [0.18, 0.27, 0.27, 0.28]
))
story.append(Paragraph('Tableau 1 : Comparaison CosmicDrift vs Mindustry sur les mecaniques cles', styles['caption']))
story.append(Spacer(1, 18))

# ═══════════════════════════════════════════════════════════════
# SECTION 2: Inspiration Mindustry
# ═══════════════════════════════════════════════════════════════
story.append(add_heading('2. Mindustry : Les Mecaniques Cles a S\'approprier', 'h1', 0))
story.append(Spacer(1, 6))

story.append(Paragraph(
    'Mindustry, developpe par Anuken sous licence GPL, est un jeu de defense en tours et de gestion d\'usine '
    'en temps reel. Sa force reside dans la combinaison elegante de mecaniques de production (chaines '
    'de ressources avec convoyeurs), de defense (tourelles, murs, boucliers) et d\'offensive (production '
    'automatisee d\'unites terrestres et aeriennes). Le jeu propose une campagne avec capture de secteurs, '
    'un systeme energetique avec distribution par reseaux, et un systeme de schemas permettant au joueur '
    'de sauvegarder et reutiliser des configurations de batiments. Ces mecaniques, adaptees au contexte '
    'spatial et au tour par tour de CosmicDrift, pourraient transformer radicalement l\'experience de jeu.',
    styles['body']
))

story.append(add_heading('2.1 Chaines de production et convoyeurs', 'h2', 1))
story.append(Paragraph(
    'Dans Mindustry, les ressources ne sont pas simplement collectees : elles doivent etre transportees '
    'depuis les mines vers les usines de traitement, puis vers les centres de stockage ou les lignes '
    'de production d\'unites. Les convoyeurs forment un reseau logistique que le joueur doit concevoir '
    'et optimiser. Un convoyeur mal place peut provoquer des goulots d\'etranglement qui paralysent '
    'toute la production. Cette mecanique ajoute une dimension puzzle satisfaisante ou chaque decision '
    'de placement a des consequences sur l\'efficacite globale. Adapte a CosmicDrift, ce systeme pourrait '
    'fonctionner au tour par tour : au lieu de convoyeurs en temps reel, le joueur place des "tuyaux '
    'spatiaux" ou "rails magnetiques" entre les batiments, et les ressources circulent a chaque fin de tour '
    'selon les connexions etablies. La planification du reseau devient un mini-jeu strategique en soi.',
    styles['body']
))

story.append(add_heading('2.2 Defense en tours et vagues ennemies', 'h2', 1))
story.append(Paragraph(
    'Le coeur de Mindustry est sa boucle de defense en tours. Des vagues d\'ennemis attaquent le coeur '
    'du joueur a intervalles reguliers, forçant la construction de tourelles, murs et boucliers. Les '
    'tourelles ont differentes portees, types de degats et cadences, creant des synergies tactiques. '
    'Les vagues deviennent progressivement plus difficiles, introduisant de nouveaux types d\'ennemis '
    '(rapides, blindes, volants, boss). Pour CosmicDrift, ce systeme peut etre adapte en vagues '
    'd\'assaut a chaque X tours : des flottes ennemies ou des creatures alien attaquent les positions '
    'du joueur. Des tours de defense spatiales (laser, plasma, missiles) pourraient etre construites '
    'pour proteger les colonies, avec differentes specialisations et portees.',
    styles['body']
))

story.append(add_heading('2.3 Systeme energetique et distribution', 'h2', 1))
story.append(Paragraph(
    'Mindustry utilise un systeme de puissance ou chaque batiment consomme ou produit de l\'energie. '
    'Les generateurs doivent etre relies aux consommateurs via des noeuds de puissance, creant un reseau '
    'electrique que le joueur doit gerer. Une surcharge provoque des pannes en cascade. Ce systeme ajoute '
    'une couche de planification importante : il ne suffit pas de construire des batiments, il faut aussi '
    's\'assurer qu\'ils sont alimentes. Pour CosmicDrift, un systeme similaire avec des "reacteurs" '
    'produisant de l\'energie et des "conduits energetiques" reliant les batiments creerait des decisions '
    'strategiques interessantes : faut-il etendre le reseau vers une nouvelle mine ou securiser l\'alimentation '
    'des defenses existantes ?',
    styles['body']
))

story.append(add_heading('2.4 Production automatisee d\'unites', 'h2', 1))
story.append(Paragraph(
    'Dans Mindustry, les usines produisent automatiquement des unites terrestres, aeriennes et navales '
    'a partir de ressources traitees. Le joueur peut ensuite controler ces unites directement ou les '
    'laisser defendre automatiquement. Chaque type d\'unite a des forces et faiblesses distinctes. '
    'Pour CosmicDrift, des "chantiers navals spatiaux" pourraient produire differents types de vaisseaux '
    'en consommant des ressources raffinees. Le joueur choisirait quels unites produire selon la situation '
    'tactique, creant une armee diversifiee plutot que de simplement recruter des unites individuelles. '
    'L\'automatisation partielle permet au joueur de se concentrer sur la strategie plutot que sur la '
    'micro-gestion de chaque unite.',
    styles['body']
))

# ═══════════════════════════════════════════════════════════════
# SECTION 3: Systeme de production
# ═══════════════════════════════════════════════════════════════
story.append(add_heading('3. Systeme de Production et Chaines de Ressources', 'h1', 0))
story.append(Spacer(1, 6))

story.append(Paragraph(
    'La transformation la plus impactante pour CosmicDrift serait l\'introduction d\'un veritable systeme '
    'de chaines de production. Au lieu de la collecte automatique actuelle, le joueur construirait un '
    'reseau logistique de l\'extraction brute jusqu\'aux produits finis. Ce systeme ajoute de la profondeur '
    'strategique, car chaque maillon de la chaine represente une decision et une vulnerabilite potentielle.',
    styles['body']
))

story.append(add_heading('3.1 Ressources brutes et raffinees', 'h2', 1))
story.append(Paragraph(
    'Le systeme actuel a 5 ressources (mineraux, energie, biomasse, eau, credits) collectees directement. '
    'Le nouveau systeme distinguerait les ressources brutes des ressources raffinees. Les ressources brutes '
    'sont extraites des biomes et doivent etre traitees dans des usines specialisees pour devenir des '
    'materiaux utilisables. Cette distinction cree des goulots d\'etranglement naturels et rend chaque '
    'usine strategiquement precieuse. Par exemple, le titane est necessaire pour les unites avancees mais '
    'requiert une chaine complete : minerai brut -> usine de raffinage -> titane pur. Si l\'usine de '
    'raffinage est detruite, toute la chaine s\'arrete.',
    styles['body']
))

story.append(Spacer(1, 8))
story.append(make_table(
    ['Ressource brute', 'Source', 'Raffinage', 'Produit fini', 'Utilisation'],
    [
        ['Minerai ferreux', 'Iron Peaks', 'Fonderie', 'Alliages', 'Batiments, unites T2'],
        ['Cristaux bruts', 'Crystal Caverns', 'Laboratoire', 'Composants', 'Technologie, tours laser'],
        ['Biomasse brute', 'Verdant Expanse', 'Bioraffinerie', 'Biocarburant', 'Energie, cloning'],
        ['Glace planetaire', 'Frozen Reaches', 'Electrolyse', 'Oxygene + H2', 'Survie, propulsion'],
        ['Sable energetique', 'Dust Wastes', 'Extracteur', 'Plasma', 'Armes, boucliers'],
        ['Minerai de titane', 'Abyssal Shores', 'Four solaire', 'Titane', 'Unites T3, structures'],
    ],
    [0.17, 0.16, 0.16, 0.17, 0.34]
))
story.append(Paragraph('Tableau 2 : Chaines de transformation des ressources brutes', styles['caption']))
story.append(Spacer(1, 12))

story.append(add_heading('3.2 Reseau logistique au tour par tour', 'h2', 1))
story.append(Paragraph(
    'Adapte au tour par tour, le systeme de transport fonctionne differemment de Mindustry. Au lieu de '
    'convoyeurs en temps reel, le joueur place des "conduits" entre les batiments. A chaque fin de tour, '
    'les ressources brutes circulent automatiquement le long des conduits depuis les extracteurs vers les '
    'usines, puis des usines vers les stockages ou les chantiers. Le debit de chaque conduit est limite : '
    'un conduit de base transporte 3 unites de ressource par tour, un conduit avance en transporte 6. '
    'Le joueur doit donc planifier des routes efficaces et eventuellement des jonctions et carrefours '
    'pour distribuer les ressources la ou elles sont necessaires. Un conduit endommage par une attaque '
    'ennemie ou un hazard arrete le flux, creant des penuries en aval.',
    styles['body']
))

story.append(add_heading('3.3 Stockage et capacite', 'h2', 1))
story.append(Paragraph(
    'Chaque ressource a une capacite de stockage maximale qui peut etre augmentee en construisant des '
    'entrepots. Les ressources qui debordent sont perdues, forçant le joueur a equilibrer production et '
    'consommation. Les entrepots specialises offrent des bonus : un entrepot refrigere pour la biomasse '
    'reduit la degradation de 10% par tour. Un silo de plasma augmente la capacite de stockage de plasma '
    'de 50%. Cette gestion du stockage ajoute une dimension strategique : faut-il investir dans plus de '
    'stockage ou dans plus de production ? La reponse depend de la situation tactique et des menaces '
    'imminentes, ce qui rend chaque partie unique.',
    styles['body']
))

# ═══════════════════════════════════════════════════════════════
# SECTION 4: Defense en tours
# ═══════════════════════════════════════════════════════════════
story.append(add_heading('4. Systeme de Defense et Vagues Ennemies', 'h1', 0))
story.append(Spacer(1, 6))

story.append(Paragraph(
    'L\'absence de systeme de defense territoriale active est l\'une des lacunes les plus importantes '
    'de CosmicDrift. Actuellement, la defense se resume a placer des unites sur la carte et a esperer '
    'que l\'AI ne les attaque pas. Un systeme de tours defensives avec des vagues ennemies progressives '
    'transformerait la boucle de jeu en une experience beaucoup plus engageante et tendue.',
    styles['body']
))

story.append(add_heading('4.1 Types de tours defensives', 'h2', 1))
story.append(Paragraph(
    'Les tours defensives seraient construites sur des hexagones appartenant au joueur, chaque type '
    'ayant des caracteristiques uniques en termes de portee, degats, cadence et cout. Les tours '
    'consomment de l\'energie du reseau pour fonctionner, creant un lien direct entre le systeme '
    'energetique et la defense. Une tour sans energie est inoperative, ce qui rend la protection '
    'des generateurs encore plus critique. Les tours peuvent etre ameliorees en depensant des ressources '
    'raffinees, augmentant leurs statistiques et debloquant des capacites speciales.',
    styles['body']
))

story.append(Spacer(1, 8))
story.append(make_table(
    ['Tour', 'Ere', 'Portee', 'Degats/tour', 'Cout energie', 'Special'],
    [
        ['Tourelle laser', '1', '3 hex', '4', '1/tour', 'Precis, faible degats zone'],
        ['Canon plasma', '2', '4 hex', '8', '3/tour', 'Degats de zone (1 hex rayon)'],
        ['Missile EMP', '2', '5 hex', '6', '2/tour', 'Ralenti ennemis 1 tour'],
        ['Faisceau focalise', '3', '6 hex', '15', '5/tour', 'Perce les boucliers'],
        ['Canon orbital', '4', 'Global', '25', '8/tour', 'Frappe n\'importe ou, 2 tour cooldown'],
        ['Bouclier tactique', '2', '2 hex', '0', '4/tour', 'Absorbe 20 degats pour les hex voisins'],
    ],
    [0.18, 0.07, 0.12, 0.14, 0.15, 0.34]
))
story.append(Paragraph('Tableau 3 : Types de tours defensives et leurs caracteristiques', styles['caption']))
story.append(Spacer(1, 12))

story.append(add_heading('4.2 Systeme de vagues', 'h2', 1))
story.append(Paragraph(
    'Les vagues ennemies se declenchent a intervalles reguliers (tous les 5-8 tours selon la difficulte). '
    'Chaque vague est composee d\'un melange d\'unites ennemies avec des statistiques croissantes. Les '
    'premieres vagues sont composees d\'éclaireurs faibles, puis les vagues suivantes introduisent des '
    'unites plus resistantes, des unites volantes qui ignorent le terrain, et finalement des "boss" '
    'avec des capacites speciales. Le joueur est prevenu 2 tours avant chaque vague, lui permettant '
    'de preparer ses defenses, reparer les tours, et positionner ses unites. Ce systeme cree une '
    'alternance naturelle entre phases de construction/economie et phases de defense tendues, exactement '
    'comme dans Mindustry ou les phases calmes permettent de renforcer ses defenses avant l\'assaut suivant.',
    styles['body']
))

story.append(add_heading('4.3 Murs et fortifications', 'h2', 1))
story.append(Paragraph(
    'En plus des tours, le joueur peut construire des murs et fortifications sur les hexagones pour '
    'ralentir et canaliser les ennemis. Les murs de base absorbent un nombre fixe de degats avant d\'etre '
    'detruits. Les murs renforces (ere 2) ont plus de points de vie et peuvent etre reparés. Les portes '
    'permettent aux unites amies de passer tout en bloquant les ennemis. Les champs de mines (ere 3) '
    'infligent des degats aux ennemis qui entrent sur l\'hexagone. Ces fortifications permettent au '
    'joueur de creer des "kill zones" ou les ennemis sont forces de passer devant plusieurs tours, '
    'multipliant l\'efficacite defensive. La planification du layout defensif devient un mini-jeu '
    'en soi, tres satisfaisant quand on voit les vagues ennemies se faire decimer dans un corridor '
    'bien concu.',
    styles['body']
))

# ═══════════════════════════════════════════════════════════════
# SECTION 5: Grille energetique
# ═══════════════════════════════════════════════════════════════
story.append(add_heading('5. Grille Energetique et Distribution de Puissance', 'h1', 0))
story.append(Spacer(1, 6))

story.append(Paragraph(
    'Le systeme energetique actuel de CosmicDrift est une simple ressource "energie" produite par les '
    'tableaux solaires et consommee par les batiments. Un veritable systeme de grille energetique, inspire '
    'de Mindustry, ajouterait une dimension de planification cruciale : chaque batiment doit etre connecte '
    'au reseau pour fonctionner, et la production doit couvrir la consommation.',
    styles['body']
))

story.append(add_heading('5.1 Architecture du reseau', 'h2', 1))
story.append(Paragraph(
    'Le reseau energetique est constitue de trois types de batiments : les generateurs (produisent de '
    'l\'energie), les noeuds (distribuent l\'energie aux batiments voisins), et les batteries (stockent '
    'l\'excedent). Chaque generateur a une capacite de production par tour. Les noeuds ont une portee '
    'de connexion (2-3 hex) et distribuent l\'energie a tous les batiments dans leur rayon. Si un noeud '
    'est detruit, tous les batiments connectes perdent leur alimentation. Les batteries stockent jusqu\'a '
    '50 unites d\'energie et se dechargent automatiquement quand la production est insuffisante, offrant '
    'un tampon precieux pendant les pics de consommation ou les pannes.',
    styles['body']
))

story.append(Spacer(1, 8))
story.append(make_table(
    ['Batiment', 'Cout', 'Production/Stockage', 'Portee', 'Notes'],
    [
        ['Reacteur solaire', 'Mineraux 15', '5 energie/tour', '0 (source)', 'Dust Wastes uniquement, +50% rendement'],
        ['Reacteur a biomasse', 'Biomasse 10', '8 energie/tour', '0 (source)', 'Consomme 2 biomasse/tour'],
        ['Reacteur a fusion', 'Alliages 30, Composants 15', '25 energie/tour', '0 (source)', 'Ere 3, consomme H2'],
        ['Noeud de puissance', 'Alliages 10', '0', '3 hex', 'Distribue aux batiments voisins'],
        ['Batterie', 'Alliages 8', 'Stocke 50', '1 hex', 'Se charge/decharge auto'],
        ['Super-condensateur', 'Composants 20', 'Stocke 200', '2 hex', 'Ere 3, protection contre les pannes'],
    ],
    [0.20, 0.20, 0.20, 0.12, 0.28]
))
story.append(Paragraph('Tableau 4 : Batiments du reseau energetique', styles['caption']))
story.append(Spacer(1, 12))

story.append(add_heading('5.2 Gestion des pannes et cascades', 'h2', 1))
story.append(Paragraph(
    'Quand la consommation depasse la production, le systeme entre en "deficit energetique". Les '
    'batteries se dechargent en premier. Si elles sont vides, les batiments commencent a s\'eteindre '
    'dans l\'ordre de priorite du joueur (definissable dans l\'interface). Les tours defensives ont '
    'generalement la plus haute priorite, suivies des generateurs d\'oxygene, puis des usines. Un '
    'batiment eteint ne produit ni ne consomme, ce qui peut stabiliser le reseau mais arrete la '
    'production. Ce systeme cree des moments de tension intense : si le joueur perd un generateur '
    'cle pendant une vague ennemie, il doit rapidement decider quels batiments sacrifier pour garder '
    'les defenses actives. La cascade de pannes est un mecanisme puissant qui punit l\'imprudence '
    'et recompense la planification redundante.',
    styles['body']
))

# ═══════════════════════════════════════════════════════════════
# SECTION 6: Production d'unites
# ═══════════════════════════════════════════════════════════════
story.append(add_heading('6. Production Automatisee d\'Unites et Chantiers Navals', 'h1', 0))
story.append(Spacer(1, 6))

story.append(Paragraph(
    'Le systeme actuel de recrutement d\'unites est trop simple : le joueur depense des ressources et '
    'une unite apparait. Un systeme de production d\'unites plus profond, inspire des usines de Mindustry, '
    'transformerait la gestion militaire en une veritable chaine logistique ou chaque vaisseau necessite '
    'des composants specifiques et un temps de construction.',
    styles['body']
))

story.append(add_heading('6.1 Types de chantiers navals', 'h2', 1))
story.append(Paragraph(
    'Les chantiers navals remplacent les casernes actuelles. Chaque type de chantier produit une categorie '
    'de vaisseau et consomme des ressources raffinees. Le chantier a une file d\'attente de production '
    'visible, et chaque unite necessite un nombre de tours pour etre construite. Le joueur peut prioriser '
    'la production ou annuler des commandes en cours. Les chantiers peuvent etre ameliorees pour produire '
    'des unites plus avancees ou accelerer la production. Un chantier endommage fonctionne a capacite '
    'reduite, ralentissant la production. La diversite des chantiers (leger, lourd, aerien, specialist) '
    'oblige le joueur a investir dans differentes filiales pour obtenir une armee equilibree.',
    styles['body']
))

story.append(Spacer(1, 8))
story.append(make_table(
    ['Unite', 'Ere', 'Chantier', 'Cout ressources', 'Tours constr.', 'Role'],
    [
        ['Eclaireur', '1', 'Leger', 'Alliages 5', '1', 'Vision, vitesse'],
        ['Chasseur', '1', 'Leger', 'Alliages 10', '2', 'Combat leger'],
        ['Fregate', '2', 'Lourd', 'Alliages 20, Titane 5', '3', 'Attaque polyvalente'],
        ['Corvette furtive', '2', 'Special', 'Composants 15, Plasma 5', '3', 'Infiltration, sabotage'],
        ['Cuirasse', '3', 'Lourd', 'Titane 30, Composants 10', '5', 'Tank, front de ligne'],
        ['Destroyer', '3', 'Lourd', 'Titane 25, Plasma 15', '4', 'Artillerie lourde'],
        ['Porte-unites', '3', 'Special', 'Titane 40, Biocarburant 20', '6', 'Transport 4 unites'],
        ['Dreadnought', '4', 'Mega', 'Titane 80, Composants 40, Plasma 30', '10', 'Boss naval, siege'],
    ],
    [0.14, 0.06, 0.11, 0.25, 0.11, 0.33]
))
story.append(Paragraph('Tableau 5 : Unites et leurs couts de production', styles['caption']))
story.append(Spacer(1, 12))

story.append(add_heading('6.2 Experience et promotions', 'h2', 1))
story.append(Paragraph(
    'Les unites gagnent de l\'experience en combattant et survivant. Chaque niveau d\'experience accorde '
    'des bonus : +1 combat par niveau, +5 HP max, +1 vision au niveau 3. Les unites experimentees '
    'peuvent etre promues au rang de "veteran" (niveau 5) ou "elite" (niveau 10), debloquant des '
    'capacites speciales comme "Tir de suppression" (ralentit un ennemi) ou "Commandement" (boost '
    'les unites adjacentes). Ce systeme de progression donne une valeur emotionnelle aux unites : '
    'perdre un vaisseau elite est un coup dur qui force le joueur a proteger ses veteranes plutot '
    'que de les sacrifier imprudemment. Cela cree des histoires emergentes et des attachements aux '
    'unites individuelles, un aspect que Mindustry exploite mal mais que CosmicDrift pourrait excellemment '
    'integrer grace a son format tour par tour.',
    styles['body']
))

# ═══════════════════════════════════════════════════════════════
# SECTION 7: Campagnes et secteurs
# ═══════════════════════════════════════════════════════════════
story.append(add_heading('7. Systeme de Campagnes et Capture de Secteurs', 'h1', 0))
story.append(Spacer(1, 6))

story.append(Paragraph(
    'Mindustry brille par son systeme de campagne ou le joueur capture progressivement des secteurs '
    'sur une carte globale, chaque secteur etant une mission avec ses propres ressources et ennemis. '
    'Ce meta-jeu donne un sens de progression entre les parties et motive le joueur a continuer. '
    'CosmicDrift pourrait adapter ce systeme en une carte galactique avec des systemes planetaires '
    'a conquerir.',
    styles['body']
))

story.append(add_heading('7.1 Carte galactique', 'h2', 1))
story.append(Paragraph(
    'La carte galactique remplace le menu principal actuel. Elle represente une region de l\'espace '
    'avec 20-30 systemes planetaires connectes par des routes hyperspatiales. Chaque systeme est un '
    'niveau jouable avec ses propres biomes, ressources et difficultes. Le joueur commence avec un '
    'seul systeme (son site de crash) et doit conquerir les systemes voisins en completant des objectifs. '
    'Certains systemes sont controles par les factions AI, d\'autres sont infestes de creatures alien, '
    'et d\'autres sont des zones neutres avec des ressources precieuses mais des hazards environnementaux. '
    'La conquete d\'un systeme debloque ses ressources pour les parties suivantes et ouvre les routes '
    'vers les systemes adjacents. Ce systeme crée une sensation de conquete progressive tres satisfaisante.',
    styles['body']
))

story.append(add_heading('7.2 Progression et debloquages', 'h2', 1))
story.append(Paragraph(
    'Chaque systeme capture accorde des recompenses permanentes : nouvelles technologies, bonus de '
    'production, types d\'unites debloques, ou ressources uniques. Ces bonuses s\'appliquent a toutes '
    'les parties suivantes, creant un veritable sens de progression. Le joueur peut revisiter des '
    'systemes deja captures pour les defendre contre des contre-attaques ou extraire des ressources '
    'supplementaires. Les systemes controles par les factions AI sont plus difficiles a capturer mais '
    'offrent des recompenses plus importantes. Le systeme de campagne resout le probleme de rejouabilite '
    'de CosmicDrift : au lieu de parties isolees, chaque session contribue a la conquete globale, '
    'encourageant le joueur a revenir encore et encore.',
    styles['body']
))

# ═══════════════════════════════════════════════════════════════
# SECTION 8: Chaines de traitement
# ═══════════════════════════════════════════════════════════════
story.append(add_heading('8. Chaines de Traitement Avancees et Synergies', 'h1', 0))
story.append(Spacer(1, 6))

story.append(Paragraph(
    'Les chaines de traitement avancees vont au-dela de la simple transformation brute-rafine. Elles '
    'introduisent des synergies entre les batiments, des bonus de proximite, et des recettes speciales '
    'qui necessitent des combinaisons de ressources. Ce systeme, inspire des usines avancees de Mindustry, '
    'ajoute une couche de complexite optionnelle qui recompense les joueurs qui investissent dans '
    'l\'optimisation de leur colonie.',
    styles['body']
))

story.append(add_heading('8.1 Bonus de proximite et districts', 'h2', 1))
story.append(Paragraph(
    'Les batiments proches les uns des autres beneficient de bonus de proximite. Par exemple, une fonderie '
    'adjacente a une mine de minerai ferreux obtient un bonus de +20% a la vitesse de production. '
    'Un laboratoire adjacent a deux usines differentes debloque des recettes de recherche avancees. '
    'Le systeme de districts actuel peut etre etendu : un "district industriel" (3+ batiments de production '
    'adjacents) accorde +10% a tous les batiments du district. Un "district scientifique" (2+ laboratoires '
    '+ 1 centrale) accorde +15% a la recherche. Ces bonus encouragent une planification territoriale '
    'strategique plutot qu\'une dispersion aleatoire des batiments.',
    styles['body']
))

story.append(add_heading('8.2 Recettes avancees', 'h2', 1))
story.append(Paragraph(
    'Les usines avancees peuvent combiner plusieurs ressources raffinees pour creer des materiaux '
    'specialises necessaires pour les unites et batiments de haut niveau. Par exemple, le "polarium" '
    'est fabrique en combinant du titane pur et du plasma dans un reacteur specialise. Le polarium '
    'est necessaire pour les boucliers avances et les unites de ere 4. Chaque recette avancee '
    'necessite des batiments specifiques et des connexions logistiques adequates, creant des puzzle '
    'de production de plus en plus complexes a mesure que le joueur progresse dans les eres. Ce '
    'systeme assure que les joueurs avances ont toujours de nouveaux objectifs de production a '
    'atteindre, meme apres avoir maitrise les chaines de base.',
    styles['body']
))

# ═══════════════════════════════════════════════════════════════
# SECTION 9: Schemas
# ═══════════════════════════════════════════════════════════════
story.append(add_heading('9. Systeme de Schemas et Blueprints', 'h1', 0))
story.append(Spacer(1, 6))

story.append(Paragraph(
    'L\'une des fonctionnalites les plus appreciees de Mindustry est le systeme de schemas qui permet '
    'de sauvegarder des configurations de batiments et de les repliquer instantanement. Cette fonctionnalite '
    'reduit considerablement la repetition manuelle et permet au joueur de se concentrer sur les '
    'decisions strategiques plutot que sur le placement minutieux de chaque batiment.',
    styles['body']
))

story.append(add_heading('9.1 Creation et utilisation de schemas', 'h2', 1))
story.append(Paragraph(
    'Le joueur peut selectionner un groupe de batiments existants et les sauvegarder comme "schema". '
    'Un schema contient la disposition relative des batiments, leurs types, et les connexions logistiques. '
    'Le joueur peut ensuite placer un schema entier en un seul clic, a condition d\'avoir les ressources '
    'necessaires et que le terrain soit compatible. Les schemas sont sauvegardes entre les parties et '
    'peuvent etre partages via des codes. Pour CosmicDrift, les schemas sont particulierement utiles '
    'pour repliquer des configurations defensives efficaces d\'un secteur a l\'autre dans la campagne, '
    'ou pour reconstruire rapidement apres une attaque devastatrice.',
    styles['body']
))

story.append(add_heading('9.2 Schemas predefinits', 'h2', 1))
story.append(Paragraph(
    'Le jeu inclut plusieurs schemas predefinits pour les debutants : "Perimetre defensif basique" '
    '(4 tours + murs), "Module de production standard" (extracteur + conduit + usine), et "Camp '
    'de démarrage" (oxygene + residentiel + solaire). Ces schemas servent de tutoriel implicite, '
    'montrant aux nouveaux joueurs des configurations efficaces sans forcer une approche unique. '
    'Le joueur peut modifier les schemas predefinits ou en creer de nouveaux a tout moment. Les '
    'schemas avances partages par la communaute pourraient devenir une forme de meta-jeu social, '
    'comme c\'est le cas dans Mindustry ou les meilleurs schemas sont echanges et optimises collectivement.',
    styles['body']
))

# ═══════════════════════════════════════════════════════════════
# SECTION 10: Mecaniques fluides
# ═══════════════════════════════════════════════════════════════
story.append(add_heading('10. Mecaniques de Fluides et Gaz Planetaires', 'h1', 0))
story.append(Spacer(1, 6))

story.append(Paragraph(
    'Mindustry utilise un systeme de fluides pour transporter des liquides entre les batiments via '
    'des tuyaux et des pompes. Cette mecanique, adaptee au contexte spatial, deviendrait un systeme '
    'de gaz et fluides planetaires qui enrichit considerablement la gestion des ressources et '
    'les interactions avec l\'environnement.',
    styles['body']
))

story.append(add_heading('10.1 Types de fluides et gaz', 'h2', 1))
story.append(Paragraph(
    'Les fluides et gaz sont des ressources speciales qui se deplacent differemment des ressources solides. '
    'Ils necessitent des tuyaux ou des conduits pressurises et peuvent fuir si les infrastructures sont '
    'endommagees. L\'eau extraite des Abyssal Shores peut etre purifiee pour la consommation des colons '
    'ou electrolysee pour produire de l\'oxygene et de l\'hydrogene. Le methane des Dust Wastes peut '
    'etre raffine en biocarburant ou brule directement pour l\'energie. Le plasma des Crystal Caverns '
    'est un gaz ionise utilise pour les armes avancees et les boucliers. Chaque fluide a des proprietes '
    'uniques qui influencent la strategie : le plasma est volatile et peut exploser si un tuyau est '
    'detruit, tandis que l\'eau est stable mais necessite un traitement avant utilisation.',
    styles['body']
))

story.append(add_heading('10.2 Tuyaux et pressurisation', 'h2', 1))
story.append(Paragraph(
    'Les conduits de fluides sont differents des conduits de ressources solides. Ils ont une capacite '
    'de debit limitee et une "pression" qui affecte l\'efficacite du transport. Les pompes augmentent '
    'la pression et permettent de transporter les fluides sur de plus longues distances. Les reservoirs '
    'stockent les fluides sous pression. Un tuyau endommage provoque une fuite qui reduit le debit '
    'et peut contaminer les hexagones voisins (toxicite temporaire). Le joueur doit donc surveiller '
    'l\'integrite de son reseau de fluides et le proteger des attaques. Ce systeme ajoute une dimension '
    'de vulnérabilite supplementaire qui enrichit les decisions defensives.',
    styles['body']
))

# ═══════════════════════════════════════════════════════════════
# SECTION 11: Ameliorations de batiments
# ═══════════════════════════════════════════════════════════════
story.append(add_heading('11. Ameliorations de Batiments et Systeme de Tiers', 'h1', 0))
story.append(Spacer(1, 6))

story.append(Paragraph(
    'Actuellement, les batiments de CosmicDrift sont statiques : une fois construits, ils ne changent '
    'plus. Un systeme d\'amelioration par tiers, inspire des upgrades de Mindustry, permettrait au '
    'joueur d\'investir dans l\'amelioration progressive de ses infrastructures plutot que de les '
    'detruire et reconstruire.',
    styles['body']
))

story.append(Spacer(1, 8))
story.append(make_table(
    ['Batiment', 'Tier 1 (base)', 'Tier 2 (amelioré)', 'Tier 3 (avancé)'],
    [
        ['Extracteur O2', '8 O2/tour', '12 O2/tour, -1 eau', '18 O2/tour, auto-reparation'],
        ['Mine', '4 mineraux/tour', '7 mineraux/tour', '12 mineraux, detecte ressources cachees'],
        ['Laboratoire', '4 science/tour', '7 science/tour', '10 science, debloque recettes avancees'],
        ['Tour laser', '4 dmg, portee 3', '7 dmg, portee 4', '12 dmg, tir double'],
        ['Casernes', 'Unites T1', 'Unites T1 + T2', 'Toutes unites, -1 tour construction'],
        ['Bouclier', 'Absorbe 15 dmg', 'Absorbe 30 dmg', 'Absorbe 50, regenere 5/tour'],
    ],
    [0.18, 0.27, 0.27, 0.28]
))
story.append(Paragraph('Tableau 6 : Systeme d\'amelioration par tiers des batiments', styles['caption']))
story.append(Spacer(1, 12))

story.append(Paragraph(
    'Chaque amelioration coute des ressources raffinees et necessite parfois des technologies debloquees. '
    'Le choix d\'ameliorer un batiment existant ou d\'en construire un nouveau cree des decisions '
    'strategiques : ameliorer est plus efficace en termes d\'espace mais coute plus cher en ressources '
    'raffinees. Un batiment ameliore retient son tier meme s\'il est endommage et repara, ce qui '
    'rend l\'investissement durable. Le joueur doit decider quel batiments prioriser pour l\'amelioration '
    'en fonction de sa strategie actuelle : defense, economie, ou recherche.',
    styles['body']
))

# ═══════════════════════════════════════════════════════════════
# SECTION 12: AI avancee
# ═══════════════════════════════════════════════════════════════
story.append(add_heading('12. Intelligence Artificielle Avancee et Comportements Emergents', 'h1', 0))
story.append(Spacer(1, 6))

story.append(Paragraph(
    'L\'AI actuelle de CosmicDrift est basee sur des schemas fixes : chaque faction suit un pattern '
    'previsible (les Sylphari etendent lentement, les Krath attaquent agressivement, les Aethori '
    'echangent). Un systeme d\'AI plus sophistique, inspiré des vagues de Mindustry mais adapte '
    'au tour par tour, creerait des adversaires plus credibles et imprevisibles.',
    styles['body']
))

story.append(add_heading('12.1 Systeme d\'objectifs hierarchises', 'h2', 1))
story.append(Paragraph(
    'L\'AI utilise un systeme d\'objectifs hierarchises qui s\'adapte a la situation. Les objectifs '
    'de haut niveau sont : survivre, se developper, s\'etendre, et gagner. A chaque tour, l\'AI '
    'evalue sa situation et choisit l\'objectif prioritaire. Si ses defenses sont faibles, elle '
    'priorise la construction de tours et de murs. Si elle est forte militairement, elle attaque. '
    'Si ses ressources sont basses, elle expand vers des territoires riches. Ce systeme cree des '
    'comportements emergents : une faction initialement pacifique peut devenir agressive si elle est '
    'aculree, et une faction hostile peut proposer la paix si elle est devastee. L\'imprevisibilite '
    'de l\'AI rend chaque partie unique et force le joueur a s\'adapter plutot qu\'a suivre une '
    'strategie predefinie.',
    styles['body']
))

story.append(add_heading('12.2 Vagues dynamiques', 'h2', 1))
story.append(Paragraph(
    'Les vagues ennemies ne sont pas simplement des escalades lineaires de difficulte. Elles s\'adaptent '
    'aux defenses du joueur. Si le joueur construit beaucoup de tours laser (efficaces contre les '
    'unites legeres), les vagues suivantes envoient des unites blindees resistantes aux lasers. '
    'Si le joueur s\'appuie sur les boucliers, les vagues envoient des unites EMP qui desactivent '
    'temporairement les boucliers. Ce systeme d\'adaptation force le joueur a diversifier ses defenses '
    'plutot qu\'a spam une seule strategie optimale. La composition des vagues est generee proceduralement '
    'en fonction de l\'historique des constructions du joueur, creant une experience unique a chaque partie.',
    styles['body']
))

# ═══════════════════════════════════════════════════════════════
# SECTION 13: Interface et UX
# ═══════════════════════════════════════════════════════════════
story.append(add_heading('13. Interface Utilisateur et Experience de Jeu', 'h1', 0))
story.append(Spacer(1, 6))

story.append(Paragraph(
    'L\'interface actuelle de CosmicDrift est fonctionnelle mais manque de feedback visuel, de polish '
    'et d\'ergonomie. L\'inspiration de Mindustry, qui a une interface claire et efficace malgre la '
    'complexite du jeu, peut guider les ameliorations. Le design system de reference (taste-skill.21) '
    'avec sa palette sombre, ses accents teal/amber, et sa typographie Geist doit etre respecte.',
    styles['body']
))

story.append(add_heading('13.1 Visualisation du reseau logistique', 'h2', 1))
story.append(Paragraph(
    'L\'ajout du systeme de production et des conduits necessite une visualisation claire du reseau '
    'logistique. Les conduits de ressources solides sont affiches comme des lignes pointillees grises, '
    'les conduits de fluides comme des lignes bleues animees, et les cables energetiques comme des '
    'lignes jaunes. Le joueur peut basculer entre differentes "vues de reseau" pour voir l\'etat '
    'de chaque systeme : flux de ressources, distribution energetique, et connexions defensives. '
    'Les goulots d\'etranglement sont mis en evidence en rouge, les routes surchargees en orange, '
    'et les routes optimales en vert. Cette visualisation permet au joueur de diagnostiquer rapidement '
    'les problemes et d\'optimiser son reseau.',
    styles['body']
))

story.append(add_heading('13.2 Notifications et feedback', 'h2', 1))
story.append(Paragraph(
    'Le systeme de notifications actuel est basique. Les ameliorations incluent : des alertes visuelles '
    'pour les vagues entrantes (compte a rebours visible), des indicateurs de statut sur les batiments '
    '(vert = actif, jaune = sous-alimente, rouge = hors service), des animations de combat plus '
    'expressives, et un journal de bord detaille qui enregistre les evenements importants de la partie. '
    'Les tooltips sur les hexagones montrent les informations detaillees : production, consommation, '
    'connexions, et statut defensif. Le feedback sonore complementaire renforce l\'immersion : '
    'sons distincts pour la production, les attaques, les pannes energetiques, et les alertes.',
    styles['body']
))

# ═══════════════════════════════════════════════════════════════
# SECTION 14: Feuille de route
# ═══════════════════════════════════════════════════════════════
story.append(add_heading('14. Feuille de Route d\'Implementation', 'h1', 0))
story.append(Spacer(1, 6))

story.append(Paragraph(
    'Implementer toutes ces ameliorations d\'un coup serait impossible. Une approche incrementale '
    'est necessaire, en priorisant les mecaniques qui ont le plus d\'impact avec le moins d\'effort. '
    'La feuille de route suivante est organisee en 4 phases, chaque phase construisant sur les '
    'fondations de la precedente.',
    styles['body']
))

story.append(Spacer(1, 8))
story.append(make_table(
    ['Phase', 'Duree estimee', 'Mecaniques', 'Impact'],
    [
        ['Phase 1 : Fondations', '2-3 semaines', 'Chaines de ressources, conduits, stockage', 'Transforme l\'economie'],
        ['Phase 2 : Defense', '2-3 semaines', 'Tours defensives, vagues ennemies, murs', 'Ajoute la tension'],
        ['Phase 3 : Energie', '1-2 semaines', 'Grille energetique, generateurs, batteries', 'Lie economie + defense'],
        ['Phase 4 : Profondeur', '3-4 semaines', 'Campagne, schemas, ameliorations, AI avancee', 'Rejouabilite infinie'],
    ],
    [0.16, 0.16, 0.38, 0.30]
))
story.append(Paragraph('Tableau 7 : Feuille de route d\'implementation par phase', styles['caption']))
story.append(Spacer(1, 12))

story.append(add_heading('14.1 Phase 1 - Fondations economiques', 'h2', 1))
story.append(Paragraph(
    'La premiere phase transforme le systeme economique du jeu. Les ressources brutes et raffinees sont '
    'introduites avec les chaines de transformation. Les conduits logistiques sont ajoutes pour le '
    'transport des ressources. Les usines de traitement remplacent la collecte automatique. Cette phase '
    'est la plus critique car elle definit les fondations sur lesquelles toutes les autres mecaniques '
    's\'appuient. Le systeme de stockage avec capacite limitee et les entrepots specialises completent '
    'l\'economie. L\'interface est mise a jour pour visualiser les flux de ressources et les goulots '
    'd\'etranglement. A la fin de cette phase, le joueur a deja une experience beaucoup plus profonde '
    'de gestion economique.',
    styles['body']
))

story.append(add_heading('14.2 Phase 2 - Defense et vagues', 'h2', 1))
story.append(Paragraph(
    'La deuxieme phase ajoute la dimension defensive. Les tours defensives de differents types sont '
    'implementees avec leurs systemes de portee et de ciblage. Le systeme de vagues ennemies avec '
    'escalade de difficulte est programme. Les murs et fortifications permettent la planification '
    'territoriale. Les vagues creent une alternance entre phases calmes et phases tendues qui est '
    'la cle de l\'addiction de Mindustry. Les tours consomment de l\'energie (introduite comme ressource '
    'simple dans cette phase, avant la grille complete de la phase 3). Le joueur doit maintenant '
    'equilibrer investissement economique et investissement defensif, creant des decisions tendues.',
    styles['body']
))

story.append(add_heading('14.3 Phase 3 - Grille energetique', 'h2', 1))
story.append(Paragraph(
    'La troisieme phase connecte l\'economie et la defense via le systeme energetique. Les generateurs, '
    'noeuds de puissance et batteries forment un reseau que le joueur doit planifier et proteger. '
    'Les pannes energetiques et les cascades ajoutent une couche de vulnérabilite qui rend les attaques '
    'ennemies beaucoup plus dangereuses : perdre un generateur cle peut desactiver toute une ligne '
    'de defense. Le systeme de priorite energetique permet au joueur de choisir quels batiments '
    'sacrifier en cas de deficit. Cette phase est relativement courte car elle s\'appuie sur les '
    'fondations des phases precedentes, mais son impact est considerable.',
    styles['body']
))

story.append(add_heading('14.4 Phase 4 - Profondeur et meta-jeu', 'h2', 1))
story.append(Paragraph(
    'La quatrieme et derniere phase ajoute la profondeur et la rejouabilite a long terme. Le systeme '
    'de campagne avec la carte galactique donne un sens de progression entre les parties. Les schemas '
    'et blueprints reduisent la repetition et permettent le partage communautaire. Les ameliorations '
    'de batiments par tiers offrent des objectifs d\'investissement a long terme. L\'AI avancee avec '
    'objectifs hierarchises et adaptation rend les adversaires imprevisibles. Les mecaniques de fluides '
    'et gaz enrichissent les chaines de production. La production d\'unites via les chantiers navals '
    'remplace le recrutement instantane. A la fin de cette phase, CosmicDrift est un jeu complet '
    'avec une profondeur strategique considerable, une boucle de jeu addictive, et un meta-jeu '
    'qui encourage les joueurs a revenir session apres session.',
    styles['body']
))

story.append(Spacer(1, 18))
story.append(hr())
story.append(Spacer(1, 8))
story.append(callout(
    'CosmicDrift a le potentiel de devenir bien plus qu\'un clone de Mindustry dans l\'espace. '
    'En combinant les mecaniques de production et defense de Mindustry avec l\'identite unique '
    'de strategie spatiale au tour par tour, le jeu peut creer une niche qui n\'existe pas encore. '
    'La cle est l\'implementation incrementale : chaque phase doit etre jouable et amusante '
    'independamment, meme si les phases suivantes ne sont jamais developpees.'
))

# ─── Build ───
doc.multiBuild(story)
print(f'Body PDF generated: {BODY_PDF}')
