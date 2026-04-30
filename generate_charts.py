#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate all charts for the Sahara Neural Hub report."""

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm
import numpy as np

# Font setup
fm.fontManager.addfont('/usr/share/fonts/truetype/chinese/SarasaMonoSC-Regular.ttf')
fm.fontManager.addfont('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf')
plt.rcParams['font.sans-serif'] = ['DejaVu Sans', 'Sarasa Mono SC']
plt.rcParams['axes.unicode_minus'] = False

# Palette
ACCENT = '#c34b23'
ACCENT2 = '#2f7ab9'
ACCENT3 = '#7a5c3e'
TEXT_PRIMARY = '#1e1d1b'
TEXT_MUTED = '#78756d'
BG_SURFACE = '#e8e6e1'
BG_PAGE = '#f5f4f3'
CHART_COLORS = [ACCENT, ACCENT2, ACCENT3, '#4a8c6f', '#9b6b8e', '#c4883a', '#5b7fa5']

OUTPUT = '/home/z/my-project/download/charts'

def save(fig, name, dpi=200):
    fig.savefig(f'{OUTPUT}/{name}', dpi=dpi, bbox_inches='tight', facecolor='white', edgecolor='none')
    plt.close(fig)
    print(f'  Saved {name}')

# ━━ Chart 1: African DC Market Growth ━━
fig, ax = plt.subplots(figsize=(10, 5.5))
years = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]
market_size = [1.8, 2.1, 2.5, 2.9, 3.49, 4.05, 4.72, 5.48, 6.12, 6.48, 6.81]
construction = [0.55, 0.68, 0.82, 1.0, 1.26, 1.52, 1.82, 2.15, 2.52, 2.82, 3.06]

ax.fill_between(years, market_size, alpha=0.15, color=ACCENT)
ax.plot(years, market_size, 'o-', color=ACCENT, linewidth=2.5, markersize=6, label='Total Market (USD Bn)')
ax.fill_between(years, construction, alpha=0.15, color=ACCENT2)
ax.plot(years, construction, 's-', color=ACCENT2, linewidth=2.5, markersize=6, label='Construction Segment (USD Bn)')

ax.set_xlabel('Year', fontsize=11, color=TEXT_PRIMARY)
ax.set_ylabel('Market Size (USD Billion)', fontsize=11, color=TEXT_PRIMARY)
ax.set_title('African Data Center Market Projection (2020-2030)', fontsize=14, fontweight='bold', color=TEXT_PRIMARY, pad=15)
ax.legend(loc='upper left', frameon=False, fontsize=10)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.spines['left'].set_color(TEXT_MUTED)
ax.spines['bottom'].set_color(TEXT_MUTED)
ax.tick_params(colors=TEXT_MUTED)
ax.grid(axis='y', alpha=0.3, linestyle='--')
ax.set_ylim(0, 8)
save(fig, 'market_growth.png')

# ━━ Chart 2: CAPEX Breakdown Pie ━━
fig, ax = plt.subplots(figsize=(9, 7))
labels = ['GPU Servers', 'Power Infra', 'Building/Shell', 'Cooling', 'UPS', 'Renewable Energy', 'Networking', 'Land + Other']
sizes = [38, 17, 11, 6, 5, 10, 5, 8]
colors_pie = [ACCENT, ACCENT2, ACCENT3, '#4a8c6f', '#9b6b8e', '#c4883a', '#5b7fa5', BG_SURFACE]
explode = (0.06, 0, 0, 0, 0, 0, 0, 0)

wedges, texts, autotexts = ax.pie(sizes, labels=labels, autopct='%1.0f%%', startangle=90,
    colors=colors_pie, explode=explode, pctdistance=0.78,
    textprops={'fontsize': 10, 'color': TEXT_PRIMARY})
for at in autotexts:
    at.set_fontsize(9)
    at.set_color('white')
    at.set_fontweight('bold')

centre_circle = plt.Circle((0, 0), 0.55, fc='white')
ax.add_artist(centre_circle)
ax.text(0, 0.05, '$611M-$1.14B', ha='center', va='center', fontsize=13, fontweight='bold', color=ACCENT)
ax.text(0, -0.12, 'Total CAPEX', ha='center', va='center', fontsize=10, color=TEXT_MUTED)
ax.set_title('Capital Expenditure Breakdown (50 MW Facility)', fontsize=14, fontweight='bold', color=TEXT_PRIMARY, pad=15)
save(fig, 'capex_pie.png')

# ━━ Chart 3: OPEX Comparison Grid vs Renewable ━━
fig, ax = plt.subplots(figsize=(10, 6))
categories = ['Electricity', 'Staff', 'Maintenance', 'Insurance', 'Bandwidth', 'Software']
grid_opex = [66, 1.2, 12.8, 3.5, 3.5, 3.5]
renew_opex = [17, 1.2, 12.8, 3.5, 3.5, 3.5]

x = np.arange(len(categories))
width = 0.35

bars1 = ax.bar(x - width/2, grid_opex, width, label='Grid Power OPEX', color=ACCENT, alpha=0.85)
bars2 = ax.bar(x + width/2, renew_opex, width, label='Renewable Self-Gen OPEX', color=ACCENT2, alpha=0.85)

ax.set_ylabel('Annual Cost (USD Million)', fontsize=11, color=TEXT_PRIMARY)
ax.set_title('Annual OPEX: Grid Power vs. Renewable Self-Generation', fontsize=14, fontweight='bold', color=TEXT_PRIMARY, pad=15)
ax.set_xticks(x)
ax.set_xticklabels(categories, fontsize=10)
ax.legend(loc='best', frameon=False, fontsize=10)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.spines['left'].set_color(TEXT_MUTED)
ax.spines['bottom'].set_color(TEXT_MUTED)
ax.tick_params(colors=TEXT_MUTED)
ax.grid(axis='y', alpha=0.3, linestyle='--')

for bar in bars1:
    height = bar.get_height()
    if height > 2:
        ax.annotate(f'${height:.1f}M', xy=(bar.get_x() + bar.get_width() / 2, height),
                    xytext=(0, 3), textcoords="offset points", ha='center', va='bottom', fontsize=8, color=TEXT_PRIMARY)
for bar in bars2:
    height = bar.get_height()
    if height > 2:
        ax.annotate(f'${height:.1f}M', xy=(bar.get_x() + bar.get_width() / 2, height),
                    xytext=(0, 3), textcoords="offset points", ha='center', va='bottom', fontsize=8, color=TEXT_PRIMARY)
save(fig, 'opex_comparison.png')

# ━━ Chart 4: Revenue Projection 10-Year ━━
fig, ax = plt.subplots(figsize=(10, 6))
years_rev = list(range(2026, 2036))
gpu_rev = [0, 15, 35, 55, 72, 88, 95, 102, 108, 115]
colo_rev = [0, 8, 20, 35, 45, 52, 58, 62, 65, 68]
cloud_rev = [0, 5, 12, 25, 35, 42, 48, 52, 55, 58]
total_rev = [a+b+c for a,b,c in zip(gpu_rev, colo_rev, cloud_rev)]

ax.fill_between(years_rev, total_rev, alpha=0.08, color=ACCENT)
ax.plot(years_rev, total_rev, 'o-', color=ACCENT, linewidth=3, markersize=7, label='Total Revenue')
ax.plot(years_rev, gpu_rev, 's--', color=ACCENT2, linewidth=2, markersize=5, label='GPU-as-a-Service')
ax.plot(years_rev, colo_rev, '^--', color=ACCENT3, linewidth=2, markersize=5, label='Colocation')
ax.plot(years_rev, cloud_rev, 'D--', color='#4a8c6f', linewidth=2, markersize=5, label='Sovereign Cloud')

ax.set_xlabel('Year', fontsize=11, color=TEXT_PRIMARY)
ax.set_ylabel('Revenue (USD Million)', fontsize=11, color=TEXT_PRIMARY)
ax.set_title('10-Year Revenue Projection by Service Line', fontsize=14, fontweight='bold', color=TEXT_PRIMARY, pad=15)
ax.legend(loc='upper left', frameon=False, fontsize=10)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.spines['left'].set_color(TEXT_MUTED)
ax.spines['bottom'].set_color(TEXT_MUTED)
ax.tick_params(colors=TEXT_MUTED)
ax.grid(axis='y', alpha=0.3, linestyle='--')
save(fig, 'revenue_projection.png')

# ━━ Chart 5: Wind Speed Comparison ━━
fig, ax = plt.subplots(figsize=(10, 5.5))
sites = ['Dakhla\n(Morocco)', 'Patagonia\n(Argentina)', 'Scottish\nHighlands', 'Galicia\n(Spain)', 'Great Plains\n(USA)', 'North Sea\nCoast']
wind_speeds = [10.2, 10.5, 9.1, 7.8, 8.5, 8.2]
lcoe = [0.028, 0.032, 0.045, 0.055, 0.035, 0.048]
bar_colors = [ACCENT] + [ACCENT2]*5

bars = ax.bar(sites, wind_speeds, color=bar_colors, alpha=0.85, width=0.6)
bars[0].set_edgecolor(ACCENT)
bars[0].set_linewidth(2)

for bar, l in zip(bars, lcoe):
    height = bar.get_height()
    ax.annotate(f'${l:.3f}/kWh', xy=(bar.get_x() + bar.get_width() / 2, height),
                xytext=(0, 5), textcoords="offset points", ha='center', va='bottom',
                fontsize=9, color=TEXT_MUTED)

ax.set_ylabel('Average Wind Speed at 80m (m/s)', fontsize=11, color=TEXT_PRIMARY)
ax.set_title('Global Wind Site Comparison: Dakhla vs. World-Class Locations', fontsize=14, fontweight='bold', color=TEXT_PRIMARY, pad=15)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.spines['left'].set_color(TEXT_MUTED)
ax.spines['bottom'].set_color(TEXT_MUTED)
ax.tick_params(colors=TEXT_MUTED)
ax.grid(axis='y', alpha=0.3, linestyle='--')
ax.set_ylim(0, 13)
save(fig, 'wind_comparison.png')

# ━━ Chart 6: PUE Comparison ━━
fig, ax = plt.subplots(figsize=(10, 5.5))
dc_names = ['Sahara Neural\nHub (Target)', 'Google\nBest-in-Class', 'Meta\nAverage', 'Industry\nAverage', 'Traditional\nDC (No Free Cooling)']
pue_vals = [1.12, 1.10, 1.11, 1.58, 2.0]
bar_colors = [ACCENT, ACCENT2, ACCENT3, TEXT_MUTED, BG_SURFACE]

bars = ax.barh(dc_names, pue_vals, color=bar_colors, alpha=0.85, height=0.55)
for bar, val in zip(bars, pue_vals):
    ax.text(val + 0.03, bar.get_y() + bar.get_height()/2, f'{val:.2f}',
            va='center', fontsize=11, fontweight='bold', color=TEXT_PRIMARY)

ax.set_xlabel('Power Usage Effectiveness (PUE)', fontsize=11, color=TEXT_PRIMARY)
ax.set_title('PUE Comparison: Sahara Neural Hub vs. Global Benchmarks', fontsize=14, fontweight='bold', color=TEXT_PRIMARY, pad=15)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.spines['left'].set_color(TEXT_MUTED)
ax.spines['bottom'].set_color(TEXT_MUTED)
ax.tick_params(colors=TEXT_MUTED)
ax.set_xlim(0, 2.3)
ax.axvline(x=1.0, color=TEXT_MUTED, linestyle=':', alpha=0.5)
ax.grid(axis='x', alpha=0.3, linestyle='--')
save(fig, 'pue_comparison.png')

# ━━ Chart 7: Project Timeline Gantt ━━
fig, ax = plt.subplots(figsize=(12, 7))
tasks = [
    ('Land Acquisition & Permits', 0, 6),
    ('Detailed Engineering Design', 3, 9),
    ('Infrastructure Procurement', 6, 14),
    ('Building Construction Phase 1', 9, 21),
    ('Power Infrastructure Install', 12, 22),
    ('Cooling System Installation', 15, 23),
    ('Renewable Energy Farm Build', 12, 24),
    ('Network & Connectivity Setup', 18, 25),
    ('GPU Cluster Installation P1', 21, 27),
    ('Testing & Commissioning P1', 25, 30),
    ('Phase 1 Go-Live', 30, 30),
    ('Phase 2 Expansion', 30, 48),
    ('Full Build Go-Live', 48, 48),
]

y_pos = len(tasks) - 1
for i, (task, start, end) in enumerate(tasks):
    color = ACCENT if i < 10 else ACCENT2
    if 'Go-Live' in task:
        ax.plot(start, len(tasks)-1-i, 'D', color=ACCENT, markersize=10, zorder=5)
        ax.annotate(task, xy=(start, len(tasks)-1-i), xytext=(start+1, len(tasks)-1-i),
                    fontsize=9, va='center', color=TEXT_PRIMARY, fontweight='bold')
    else:
        ax.barh(len(tasks)-1-i, end-start, left=start, height=0.5, color=color, alpha=0.8)
        ax.text(start + (end-start)/2, len(tasks)-1-i, task, ha='center', va='center',
                fontsize=8, color='white', fontweight='bold')

ax.set_xlabel('Months from Project Start', fontsize=11, color=TEXT_PRIMARY)
ax.set_title('Sahara Neural Hub - Project Timeline', fontsize=14, fontweight='bold', color=TEXT_PRIMARY, pad=15)
ax.set_yticks([])
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.spines['left'].set_visible(False)
ax.spines['bottom'].set_color(TEXT_MUTED)
ax.tick_params(colors=TEXT_MUTED)
ax.set_xlim(-1, 55)
ax.grid(axis='x', alpha=0.3, linestyle='--')
save(fig, 'project_timeline.png')

# ━━ Chart 8: IRR Sensitivity Analysis ━━
fig, ax = plt.subplots(figsize=(10, 6))
scenarios = ['Base Case', 'Optimistic\n(+20% Rev)', 'Conservative\n(-20% Rev)', 'Low GPU\nUtilization', 'High Energy\nCost', 'Fast Build\n(24mo)']
irr_vals = [15.2, 21.5, 9.8, 7.5, 11.3, 17.8]
npv_vals = [280, 520, 80, 20, 150, 350]
bar_colors = [ACCENT, ACCENT2, ACCENT3, '#9b6b8e', '#c4883a', '#4a8c6f']

bars = ax.bar(scenarios, irr_vals, color=bar_colors, alpha=0.85, width=0.55)
for bar, npv in zip(bars, npv_vals):
    height = bar.get_height()
    ax.annotate(f'NPV: ${npv}M', xy=(bar.get_x() + bar.get_width() / 2, height),
                xytext=(0, 5), textcoords="offset points", ha='center', va='bottom',
                fontsize=9, color=TEXT_MUTED)

ax.set_ylabel('Internal Rate of Return (%)', fontsize=11, color=TEXT_PRIMARY)
ax.set_title('IRR Sensitivity Analysis Across Key Scenarios', fontsize=14, fontweight='bold', color=TEXT_PRIMARY, pad=15)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.spines['left'].set_color(TEXT_MUTED)
ax.spines['bottom'].set_color(TEXT_MUTED)
ax.tick_params(colors=TEXT_MUTED)
ax.grid(axis='y', alpha=0.3, linestyle='--')
ax.axhline(y=12, color=TEXT_MUTED, linestyle='--', alpha=0.5, label='Hurdle Rate (12%)')
ax.legend(loc='best', frameon=False, fontsize=10)
save(fig, 'irr_sensitivity.png')

# ━━ Chart 9: Stakeholder Value Map ━━
fig, ax = plt.subplots(figsize=(10, 8))
stakeholders = {
    'Investors': (8, 9),
    'Government\n(Morocco)': (7, 8),
    'Wali of\nDakhla': (6, 7),
    'Engineers': (5, 6),
    'Constructor': (7, 5),
    'Telecom\nOperators': (8, 7),
    'Energy\nProviders': (6, 6),
    'End Users\n(AI Companies)': (9, 8),
    'Local\nCommunity': (4, 5),
    'Design\nArchitects': (5, 4),
}
colors_scatter = CHART_COLORS[:len(stakeholders)]

for (name, (x, y)), color in zip(stakeholders.items(), colors_scatter):
    ax.scatter(x, y, s=300, c=color, alpha=0.8, edgecolors='white', linewidth=2, zorder=5)
    ax.annotate(name, (x, y), textcoords="offset points", xytext=(0, 15),
                ha='center', fontsize=9, color=TEXT_PRIMARY, fontweight='bold')

ax.set_xlabel('Financial Impact (1=Low, 10=High)', fontsize=11, color=TEXT_PRIMARY)
ax.set_ylabel('Strategic Importance (1=Low, 10=High)', fontsize=11, color=TEXT_PRIMARY)
ax.set_title('Stakeholder Value & Impact Matrix', fontsize=14, fontweight='bold', color=TEXT_PRIMARY, pad=15)
ax.set_xlim(2, 11)
ax.set_ylim(2, 11)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.spines['left'].set_color(TEXT_MUTED)
ax.spines['bottom'].set_color(TEXT_MUTED)
ax.tick_params(colors=TEXT_MUTED)
ax.grid(alpha=0.2, linestyle='--')
save(fig, 'stakeholder_map.png')

# ━━ Chart 10: Morocco DC Pipeline ━━
fig, ax = plt.subplots(figsize=(10, 6))
projects = ['Naver Cloud\n(Tetouan)', 'Nouaceur\n(Casablanca)', 'Iozera\n(Tetouan)', 'Sahara Neural\nHub (Dakhla)', 'Other\nAnnounced']
capacity = [500, 500, 386, 50, 450]
colors_bar = [ACCENT2, ACCENT2, ACCENT2, ACCENT, BG_SURFACE]

bars = ax.bar(projects, capacity, color=colors_bar, alpha=0.85, width=0.55)
bars[3].set_edgecolor(ACCENT)
bars[3].set_linewidth(2)

for bar in bars:
    height = bar.get_height()
    ax.annotate(f'{int(height)} MW', xy=(bar.get_x() + bar.get_width() / 2, height),
                xytext=(0, 5), textcoords="offset points", ha='center', va='bottom',
                fontsize=10, fontweight='bold', color=TEXT_PRIMARY)

ax.set_ylabel('IT Load Capacity (MW)', fontsize=11, color=TEXT_PRIMARY)
ax.set_title('Morocco Data Center Pipeline by Project (2025-2030)', fontsize=14, fontweight='bold', color=TEXT_PRIMARY, pad=15)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.spines['left'].set_color(TEXT_MUTED)
ax.spines['bottom'].set_color(TEXT_MUTED)
ax.tick_params(colors=TEXT_MUTED)
ax.grid(axis='y', alpha=0.3, linestyle='--')
save(fig, 'morocco_pipeline.png')

# ━━ Chart 11: Energy Mix ━━
fig, ax = plt.subplots(figsize=(8, 6))
sources = ['Wind\n(100 MW)', 'Solar PV\n(50 MW)', 'BESS\n(200 MWh)', 'Grid\nBackup']
percentages = [55, 28, 12, 5]
colors_donut = [ACCENT, ACCENT2, ACCENT3, BG_SURFACE]

wedges, texts, autotexts = ax.pie(percentages, labels=sources, autopct='%1.0f%%',
    startangle=90, colors=colors_donut, pctdistance=0.78,
    textprops={'fontsize': 10, 'color': TEXT_PRIMARY})
for at in autotexts:
    at.set_fontsize(10)
    at.set_color('white')
    at.set_fontweight('bold')

centre_circle = plt.Circle((0, 0), 0.55, fc='white')
ax.add_artist(centre_circle)
ax.text(0, 0.05, '150 MW', ha='center', va='center', fontsize=14, fontweight='bold', color=ACCENT)
ax.text(0, -0.12, 'Total Capacity', ha='center', va='center', fontsize=10, color=TEXT_MUTED)
ax.set_title('Renewable Energy Mix for Sahara Neural Hub', fontsize=14, fontweight='bold', color=TEXT_PRIMARY, pad=15)
save(fig, 'energy_mix.png')

# ━━ Chart 12: Cumulative Cash Flow ━━
fig, ax = plt.subplots(figsize=(10, 6))
years_cf = list(range(0, 11))
cumulative_cf = [-611, -850, -820, -650, -420, -180, 80, 380, 720, 1100, 1550]

ax.fill_between(years_cf, cumulative_cf, where=[c < 0 for c in cumulative_cf], alpha=0.15, color=ACCENT)
ax.fill_between(years_cf, cumulative_cf, where=[c >= 0 for c in cumulative_cf], alpha=0.15, color=ACCENT2)
ax.plot(years_cf, cumulative_cf, 'o-', color=ACCENT, linewidth=2.5, markersize=7)
ax.axhline(y=0, color=TEXT_MUTED, linestyle='-', alpha=0.5)

# Find breakeven
for i in range(len(cumulative_cf)-1):
    if cumulative_cf[i] < 0 and cumulative_cf[i+1] >= 0:
        ax.annotate('Break-Even\nPoint', xy=(i+0.5, 0), xytext=(i+0.5, 200),
                    arrowprops=dict(arrowstyle='->', color=ACCENT2, lw=1.5),
                    fontsize=10, fontweight='bold', color=ACCENT2, ha='center')

ax.set_xlabel('Year from Project Start', fontsize=11, color=TEXT_PRIMARY)
ax.set_ylabel('Cumulative Cash Flow (USD Million)', fontsize=11, color=TEXT_PRIMARY)
ax.set_title('Cumulative Cash Flow Projection (Base Case)', fontsize=14, fontweight='bold', color=TEXT_PRIMARY, pad=15)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.spines['left'].set_color(TEXT_MUTED)
ax.spines['bottom'].set_color(TEXT_MUTED)
ax.tick_params(colors=TEXT_MUTED)
ax.grid(axis='y', alpha=0.3, linestyle='--')
save(fig, 'cumulative_cashflow.png')

print('\nAll charts generated successfully!')
