# Hyperscale Green Data Center & GPU Infrastructure — Comprehensive Cost Research Report

**Date**: March 2026 | **Currency**: USD unless noted | **Sources**: Web research with URLs

---

## 1. HYPERSCALE DATA CENTER COSTS (CAPEX)

### 1.1 Cost per MW of IT Capacity

| Category | Cost Range | Source |
|----------|-----------|--------|
| **General hyperscale (Tier III)** | $7M–$12M per MW IT load | [DgtlInfra](https://dgtlinfra.com/how-much-does-it-cost-to-build-a-data-center/) |
| **Tier II** | $12,500/kW = $12.5M/MW | [Kio Data Centers](https://kiodatacenters.com/en/blog-data-center/costs-of-a-data-center) |
| **Tier III** | $23,000/kW = $23M/MW | [Kio Data Centers](https://kiodatacenters.com/en/blog-data-center/costs-of-a-data-center) |
| **Tier IV** | $25,000/kW = $25M/MW | [Kio Data Centers](https://kiodatacenters.com/en/blog-data-center/costs-of-a-data-center) |
| **AI/GPU-optimized DC (high density)** | $10M–$15M per MW | Industry estimates |

### 1.2 Cost per m² for Construction

| Category | Cost | Source |
|----------|------|--------|
| **Powered shell only** | $250–$400/ft² ($2,690–$4,300/m²) | [DgtlInfra](https://dgtlinfra.com/how-much-does-it-cost-to-build-a-data-center/) |
| **Data center improvements (mechanical/electrical)** | $375–$735/ft² ($4,035–$7,910/m²) | [DgtlInfra](https://dgtlinfra.com/how-much-does-it-cost-to-build-a-data-center/) |
| **Total (shell + improvements)** | $625–$1,135/ft² ($6,725–$12,215/m²) | [DgtlInfra](https://dgtlinfra.com/how-much-does-it-cost-to-build-a-data-center/) |
| **Computer rooms add** | $300/ft² ($3,230/m²) | [Kio Data Centers](https://kiodatacenters.com/en/blog-data-center/costs-of-a-data-center) |
| **DC construction cost (France)** | >€10,000/m² | [CBRE France](https://www.cbre.fr/insights/articles/le-datacenter-l-actif-immobilier-ou-on-ne-parle-presque-plus-de-metres-carre) |
| **Morocco commercial construction** | MAD 5,000–9,000/m² ($500–$900/m²) | [GenieCivil.ma](https://geniecivil.ma/apercu-des-couts-actuels-de-construction-au-maroc-en-2025) |

### 1.3 PUE Targets for Green Data Centers

| PUE Level | Description | Source |
|-----------|-------------|--------|
| **1.05–1.10** | Best-in-class (Google, hyperscalers with free cooling) | [Google Data Centers](https://datacenters.google/operating-sustainably) |
| **1.10–1.20** | Green DC target with liquid cooling + free cooling | [NEXTDC](https://www.nextdc.com/blog/data-centre-pue-energy-efficiency-cost-risk) |
| **1.20–1.30** | Green DC target with economizers | [HostDime](https://www.hostdime.com/blog/sustainable-data-centers/) |
| **1.40–1.60** | Industry average | Various |
| **1.60–2.00** | Older/less efficient facilities | Various |

**Key insight**: Dropping PUE from 1.6 to 1.3 in a 10MW DC cuts total energy use by 3MW, saving ~26 million kWh/year (~$2.6M/year at $0.10/kWh) — [Data Centre Magazine](https://datacentremagazine.com/news/what-is-pue-and-how-does-it-define-data-centre-progress)

### 1.4 Typical Total Cost by Scale

| DC Size | Tier III CAPEX | Tier IV CAPEX | Notes |
|---------|---------------|---------------|-------|
| **10 MW** | $70M–$120M | $200M–$250M | Based on $7-12M/MW (Tier III), $20-25M/MW (Tier IV) |
| **50 MW** | $350M–$600M | $1.0B–$1.25B | Hyperscale class |
| **100 MW** | $700M–$1.2B | $2.0B–$2.5B | Mega-scale (Meta, Microsoft, Google class) |

### 1.5 Tier III vs Tier IV Construction Costs

| Feature | Tier III | Tier IV |
|---------|----------|---------|
| **Uptime** | 99.982% (~1.6 hrs/yr downtime) | 99.995% (~26 min/yr downtime) |
| **Redundancy** | N+1 (concurrently maintainable) | 2N+1 (fault tolerant) |
| **Cost per kW** | $23,000 | $25,000 |
| **Typical build cost (mid-size)** | $50M–$250M | $200M–$500M+ |
| **Build time** | 12–18 months | 18–24 months |
| **Best for** | Enterprise, SaaS, financial | Defense, stock exchanges, AI training |

Source: [Kio DC](https://kiodatacenters.com/en/blog-data-center/costs-of-a-data-center), [Ingenious.Build](https://www.ingenious.build/blog-posts/data-center-tiers-explained)

---

## 2. GPU SERVERS & AI HARDWARE

### 2.1 GPU Pricing per Unit (2024–2026)

| GPU Model | Form Factor | Price per Unit (USD) | Source |
|-----------|------------|---------------------|--------|
| **NVIDIA A100 80GB** | SXM4 | $10,000–$15,000 | Industry pricing (declining since H100 launch) |
| **NVIDIA A100 80GB** | PCIe | $8,000–$12,000 | Market pricing |
| **NVIDIA H100 80GB** | SXM5 | $25,000–$40,000 | [IntuitionLabs](https://intuitionlabs.ai/articles/nvidia-ai-gpu-pricing-guide), [GMI Cloud](https://www.gmicloud.ai/blog/how-much-does-the-nvidia-h100-gpu-cost-in-2025-buy-vs-rent-analysis) |
| **NVIDIA H100 80GB** | PCIe | $20,000–$30,000 | Market pricing |
| **NVIDIA H200 141GB** | SXM | ~$35,000–$40,000 per GPU (8-GPU server ~$315K) | [IntuitionLabs](https://intuitionlabs.ai/articles/nvidia-ai-gpu-pricing-guide) |
| **NVIDIA B200 192GB** | SXM6 | $30,000–$40,000 | [Tech-Insider](https://tech-insider.org/nvidia-blackwell-gpu-pricing), [Modal](https://modal.com/blog/nvidia-b200-pricing) |
| **NVIDIA B300 (Blackwell Ultra) 288GB** | SXM6 | $37,500–$43,750 | [Tech-Insider](https://tech-insider.org/nvidia-blackwell-gpu-pricing) |
| **Grace-Blackwell GB200 Superchip** | (1x Grace CPU + 2x B200) | $60,000–$70,000 | [Modal](https://modal.com/blog/nvidia-b200-pricing) |

### 2.2 Server/System Pricing

| System | Configuration | Price (USD) | Source |
|--------|--------------|-------------|--------|
| **DGX H100** | 8x H100 SXM5, 640GB GPU RAM | $300,000–$450,000 | [GMI Cloud](https://www.gmicloud.ai/blog/how-much-does-the-nvidia-h100-gpu-cost-in-2025-buy-vs-rent-analysis), [Clarifai](https://www.clarifai.com/blog/nvidia-h100) |
| **HGX H100 server (OEM)** | 8x H100 SXM5 | $200,000–$400,000 | [GMI Cloud](https://www.gmicloud.ai/blog/how-much-does-the-nvidia-h100-gpu-cost-in-2025-buy-vs-rent-analysis) |
| **DGX B200** | 8x B200, 1.44TB GPU RAM | ~$515,000 | [Modal](https://modal.com/blog/nvidia-b200-pricing) |
| **DGX B300** | 8x B300 | $300,000–$350,000 | [IntuitionLabs](https://intuitionlabs.ai/articles/nvidia-ai-gpu-pricing-guide) |
| **GB200 NVL72** | 72 Blackwell GPUs, 13.5TB GPU RAM | ~$3,000,000 per rack | [Tech-Insider](https://tech-insider.org/nvidia-blackwell-gpu-pricing) |

### 2.3 Power Consumption

| Component | Power Draw | Source |
|-----------|-----------|--------|
| **H100 GPU (SXM5, max TDP)** | 700W per GPU | [Tom's Hardware](https://www.tomshardware.com/tech-industry/nvidias-h100-gpus-will-consume-more-power-than-some-countries-each-gpu-consumes-700w-of-power-35-million-are-expected-to-be-sold-in-the-coming-year) |
| **H100 GPU (typical AI training)** | 500–700W | [Reddit HPC](https://www.reddit.com/r/HPC/comments/15o4ypu/nvidia_hgx_h100_system_power_consumption) |
| **DGX H100 system (8x GPU)** | 10.2kW total | [Introl](https://introl.com/blog/building-100kw-gpu-racks-power-cooling-architecture), [NVIDIA Docs](https://docs.nvidia.com/dgx/dgxh100-user-guide/introduction-to-dgxh100.html) |
| **DGX B200 system (8x GPU)** | 14.3kW total | [Introl](https://introl.com/blog/building-100kw-gpu-racks-power-cooling-architecture) |
| **GB200 NVL72 (72 GPUs)** | 120–140kW per rack | [IntuitionLabs](https://intuitionlabs.ai/articles/nvidia-hgx-data-center-requirements) |
| **4x DGX H100 per rack** | >40kW per rack | [IntuitionLabs](https://intuitionlabs.ai/articles/nvidia-hgx-data-center-requirements) |
| **Vera Rubin NVL144 (future)** | ~600kW per rack | [Introl](https://introl.com/blog/building-100kw-gpu-racks-power-cooling-architecture) |

### 2.4 Cooling Requirements

| Cooling Method |适用场景 | Cost Premium | Notes |
|----------------|----------|--------------|-------|
| **Air cooling** | ≤10–15kW/rack | Baseline | Traditional, inadequate for GPU racks |
| **Rear-door heat exchangers** | 15–40kW/rack | +$3,000–$8,000/rack | Good for retrofit |
| **Direct-to-chip liquid cooling** | 40–100kW/rack | +15–25% infrastructure | 47% market share among liquid cooling (2025) |
| **Immersion cooling** | 100–250kW/rack | +20–40% infrastructure | Single-phase or two-phase |
| **Mandatory liquid (GB200 NVL72)** | 120–140kW/rack | Required | No air-cooling option for Blackwell racks |

**Key insight**: Traditional DCs support 5–12kW/rack; AI GPU racks need 40–140kW/rack — a 10–30x increase. — [Introl](https://introl.com/blog/building-100kw-gpu-racks-power-cooling-architecture)

---

## 3. DATA CENTER INFRASTRUCTURE COSTS

### 3.1 UPS Systems

| UPS Type | Cost per kVA | Typical Size | Source |
|----------|-------------|--------------|--------|
| **Modular UPS (100–300kVA)** | $150–$300/kVA | 100–300kVA blocks | Industry estimates |
| **Large rotary/static UPS (1MW+)** | $100–$200/kVA | 1–5MW | Industry estimates |
| **Lithium-ion battery backup** | $200–$400/kWh storage | Varies by runtime | [Legrand TCO](https://www.legrand.com/datacenter/sites/g/files/ocwmcr716/files/2024-11/LDCS_UPS_TCO_Article_02-10-2024.pdf) |
| **Lead-acid battery strings** | $100–$200/kWh storage | 10–15 min runtime | Industry estimates |

### 3.2 Cooling Systems

| Cooling System | Cost per kW of Cooling | Notes |
|---------------|----------------------|-------|
| **Air-cooled chiller** | $150–$300/kW (thermal) | Standard for Tier III |
| **Water-cooled chiller** | $120–$250/kW (thermal) | More efficient |
| **Free cooling / economizer** | $50–$150/kW (thermal) | Depends on climate |
| **Seawater cooling** | $80–$200/kW (thermal) | Coastal locations |
| **Direct liquid cooling (DLC)** | $200–$500/kW (IT) | GPU-optimized |
| **Immersion cooling** | $300–$600/kW (IT) | Highest density |
| **Cooling tower** | $40–$80/kW (thermal) | Water-dependent |

### 3.3 PDUs & Switchgear

| Component | Cost | Source |
|-----------|------|--------|
| **Intelligent rack PDU** | $1,500–$5,000 per unit | Industry pricing |
| **High-density PDU (100kW+)** | $5,000–$15,000 per unit (e.g., Raritan PX4) | [Introl](https://introl.com/blog/building-100kw-gpu-racks-power-cooling-architecture) |
| **Facility switchgear (per MW)** | $500,000–$1,000,000 | [Introl](https://introl.com/blog/building-100kw-gpu-racks-power-cooling-architecture) |
| **Auto-transfer switch (ATS)** | $50,000–$150,000 | Industry pricing |

### 3.4 Raised Floor

| Type | Cost per m² | Source |
|------|------------|--------|
| **Standard raised floor (600mm)** | $200–$400/m² ($20–$40/ft²) | [DataCenterFloorTiles](https://datacenterfloortiles.com/how-much-does-a-raised-floor-system-cost-per-square-foot/) |
| **High-load raised floor (GPU racks)** | $400–$700/m² | Industry estimates |
| **Morocco construction cost reference** | MAD 3,700–5,000/m² (general) | [CNOA](https://cnoa.ma/s/a/library/2024-04-13/fa6fce39-f819-444b-8dc8-4355068d06c5.pdf) |

### 3.5 Fire Suppression Systems

| System | Cost | Source |
|--------|------|--------|
| **FM-200 clean agent** | $1–$4/ft² ($11–$43/m²) | [FireTron](https://firetron.com/fire-suppression-systems/best-fire-suppression-systems-data-centers-server-rooms) |
| **Novec 1230 clean agent** | $1.50–$5/ft² ($16–$54/m²) | Industry pricing |
| **FM-200 agent refill** | ~$25/kg | [Wrindu](https://www.hvtesters.com/data-center-fire-suppression-system-ultimate-guide-2026) |
| **Novec 1230 agent refill** | ~$35/kg | [Wrindu](https://www.hvtesters.com/data-center-fire-suppression-system-ultimate-guide-2026) |
| **Complete system (500m² DC)** | $25,000–$100,000+ | Estimated |
| **VESDA early warning detection** | $5,000–$15,000 per zone | Industry pricing |

### 3.6 Physical Security Systems

| System | Cost | Source |
|--------|------|--------|
| **Access control per door** | $1,500–$10,000+ | [GenX Security](https://www.genxsecurity.com/single-post/typical-costs-of-commercial-security-fire-and-access-control-systems) |
| **Video surveillance (CCTV)** | $2,000–$5,000 per camera (enterprise) | Industry pricing |
| **Mantrap / security vestibule** | $20,000–$50,000 | Industry pricing |
| **Perimeter intrusion detection** | $50–$150/meter | Industry pricing |
| **Biometric access (fingerprint/iris)** | $3,000–$8,000 per reader | Industry pricing |

---

## 4. NETWORKING

### 4.1 InfiniBand Switches

| Product | Price | Source |
|---------|-------|--------|
| **NVIDIA Quantum-2 QM9700 (64-port NDR 400Gb/s)** | ~$35,217 list price | [Router-Switch](https://www.router-switch.com/nvidia-quantum-2-qm9700-series.html) |
| **NVIDIA Quantum-2 QM9790 (liquid-cooled variant)** | Contact for pricing | [NVIDIA](https://www.nvidia.com/en-us/networking/quantum2) |
| **NVIDIA Quantum X800 (800Gb/s, newer)** | ~$50,000–$80,000+ | Industry estimates |

### 4.2 Ethernet Switches

| Product | Price | Source |
|---------|-------|--------|
| **Arista 7280QR-C36 (36-port 40GbE)** | ~$3,995 | [WhaleyComm](https://www.whaleycomm.com/collections/arista-switches) |
| **Arista 7388X5 (400GbE modular)** | $30,000–$80,000 | Industry estimates |
| **400GbE Arista switches (typical)** | $20,000–$60,000 | [Arista](https://www.arista.com/en/products/platforms) |
| **800GbE switches (NVIDIA Spectrum-X)** | $50,000–$120,000+ | Industry estimates |

### 4.3 Fiber Optic Cabling

| Component | Cost | Source |
|-----------|------|--------|
| **Single-mode fiber (bulk)** | $0.09–$1.52/ft wholesale | [TheNetworkInstallers](https://thenetworkinstallers.com/blog/cost-of-fiber-optic-cable) |
| **Single-mode fiber (retail)** | $1–$6/ft | [TheNetworkInstallers](https://thenetworkinstallers.com/blog/cost-of-fiber-optic-cable) |
| **400GbE OSFP AOC (20m)** | ~$13,995 | [ITPrice/Arista](https://itprice.com/arista-price-list/400g.html) |
| **QSFP28 100GbE AOC (10m)** | $300–$600 | Industry pricing |
| **OSFP transceivers (400G)** | $1,000–$3,000 each | Industry pricing |

### 4.4 Undersea Cable Connectivity

| Parameter | Cost | Source |
|-----------|------|--------|
| **Submarine cable deployment** | $30,000–$50,000 per km | [CSIS](https://www.csis.org/analysis/safeguarding-subsea-cables-protecting-cyber-infrastructure-amid-great-power-competition), [WU Vienna](https://www.wu.ac.at/fileadmin/wu/d/ri/regulation/WPs_und_GAs/Economic_Impacts_of_Subsea_Cable_Deployment_V7.pdf) |
| **2Africa cable (45,000 km, Meta)** | ~$1B+ total | [Meta Engineering](https://www.facebook.com/Engineering/posts/today-were-announcing-the-completion-of-the-core-2africa-system-the-worlds-longe/1260208689474943) |
| **Africa cable investment (2022–2024)** | ~$10B in new cables | [LexAfrica](https://lexafrica.com/2022/11/the-progress-of-internet-connectivity-in-africa) |
| **Dakhla connectivity** | Connected via 225kV/400kV lines; new port under construction | [ONEE](https://www.one.org.ma/fr/pdf/Depliant_Francais_2021_31082022.pdf) |

---

## 5. GREEN DATA CENTER DESIGN

### 5.1 Free Cooling Potential — Coastal Desert Climates

| Location Type | Free Cooling Hours/Year | Notes |
|--------------|------------------------|-------|
| **Coastal desert (e.g., Dakhla, Morocco)** | 5,000–7,500 hrs/yr | Low humidity + ocean breeze; ideal for air-side economizers |
| **Nordic countries** | 7,000–8,760 hrs/yr | Gold standard for free cooling |
| **Mediterranean coast** | 3,000–5,000 hrs/yr | Seasonal advantage |
| **Inland desert (hot)** | 1,000–3,000 hrs/yr | Night-only free cooling possible |

**Dakhla specifics**: Average temperatures 18–25°C, low humidity, consistent ocean winds — excellent for air-side economization 8–10 months/year.

### 5.2 Seawater Cooling Systems

| Parameter | Value | Source |
|-----------|-------|--------|
| **CAPEX for seawater cooling** | $80–$200/kW (thermal) | [ResearchGate](https://www.researchgate.net/publication/328524638_Technical_potential_and_cost_estimates_for_seawater_air_conditioning) |
| **OPEX vs traditional cooling** | 80–90% lower energy for cooling | [Facebook/Vaibhav](https://www.facebook.com/vaibhavsisintyofficial/posts/1140151321462323) |
| **PUE achievable** | 1.05–1.15 | [Data Centre Magazine](https://datacentremagazine.com/top10/top-10-sustainable-data-centres-februrary-2026) |
| **Intake depth** | 700–1000m for 4–6°C water | Deep-sea cooling |
| **Cost can reduce 10x at 1000 MWt scale** | $10–$20/kW at scale | [ResearchGate](https://www.researchgate.net/publication/328524638_Technical_potential_and_cost_estimates_for_seawater_air_conditioning) |

### 5.3 Solar + Wind Hybrid Power

| Parameter | Value | Source |
|-----------|-------|--------|
| **Morocco solar LCOE target (2050)** | $37/MWh | [ScienceDirect](https://www.sciencedirect.com/science/article/pii/S2590174525000996) |
| **Morocco wind LCOE target (2050)** | $41/MWh | [ScienceDirect](https://www.sciencedirect.com/science/article/pii/S2590174525000996) |
| **Morocco hydro LCOE target** | $26/MWh | [ScienceDirect](https://www.sciencedirect.com/science/article/pii/S2590174525000996) |
| **Morocco renewables share** | ~42% of installed capacity (2024) | [Climatescope](https://www.global-climatescope.org/markets/morocco) |
| **Morocco 500MW green DC planned** | Igoudar Dakhla, 500MW AI data center | [Morocco World News](https://www.moroccoworldnews.com/2026/01/275244/africas-data-center-push-faces-power-and-connectivity-bottlenecks-despite-6-8b-market-growth) |
| **Solar PV cost (utility-scale)** | $600–$900/kW installed | Industry estimates |
| **Wind onshore cost** | $1,000–$1,500/kW installed | Industry estimates |
| **Battery storage (4hr Li-ion)** | $250–$400/kWh | Industry estimates |

### 5.4 Carbon-Neutral Data Center Case Studies

| Company | Location | Key Features | Source |
|---------|----------|-------------|--------|
| **Google** | Multiple (Finland, Belgium, etc.) | PUE 1.10 average; 100% renewable matching; seawater cooling (Hamina, Finland) | [Google](https://datacenters.google/operating-sustainably) |
| **Microsoft** | Multiple | Underwater DC experiment; zero-water cooling target; 100% renewable by 2025 | [Microsoft](https://news.microsoft.com/source/features/sustainability/microsoft-quantifies-environmental-impacts-of-datacenter-cooling-from-cradle-to-grave-in-new-nature-study/) |
| **China Underwater DC** | Hainan | 40% energy savings; seawater cooling; 97% wind energy; $223M facility | [AKCP](https://www.akcp.com/index.php/2025/04/21/diving-into-the-future-chinas-first-underwater-ai-data-center-and-the-rise-of-subsea-computing) |
| **Igoudar Dakhla** | Dakhla, Morocco | 500MW green AI data center; renewable powered | [DabaFinance](https://dabafinance.com/en/news/morocco-data-centers-ai-energy-europe) |

### 5.5 LEED Certification Costs

| Parameter | Value | Notes |
|-----------|-------|-------|
| **LEED certification adder** | +2–5% of total construction cost | Industry estimates |
| **LEED registration + certification fees** | $2,250–$27,500 (depending on size) | USGBC fee schedule |
| **LEED consulting fees** | $50,000–$200,000 | Depending on project complexity |
| **LEED BD+C: Data Centers** | Specific category since v4 | [ResearchGate](https://www.researchgate.net/publication/324263235_Greening_Data_Centers_Beyond_LEED_Version_4) |

---

## 6. OPERATING COSTS — MOROCCO / AFRICA

### 6.1 Electricity Cost per kWh

| Category | Price | Source |
|----------|-------|--------|
| **Morocco business electricity** | MAD 1.072/kWh = **$0.116/kWh** | [GlobalPetrolPrices](https://www.globalpetrolprices.com/Morocco/electricity_prices) |
| **Morocco residential electricity** | MAD 1.172/kWh = $0.127/kWh | [GlobalPetrolPrices](https://www.globalpetrolprices.com/Morocco/electricity_prices) |
| **Morocco average electricity price** | ~$111/MWh = $0.111/kWh (2024) | [Climatescope](https://www.global-climatescope.org/markets/morocco) |
| **MV distribution network tariff** | MAD 0.0592/kWh = $0.006/kWh (tariff period to 2027) | [Africa Energy](https://www.africa-energy.com/news-centre/article/morocco-tariff-set-medium-voltage-distribution-networks) |
| **Net metering export (Morocco HV)** | MAD 0.21/kWh peak = $0.023/kWh | [PV Magazine](https://www.pv-magazine.com/2026/02/23/morocco-sets-netmetering-tariffs-for-high-and-medium-voltage-systems) |

**Key insight**: Morocco's industrial electricity at $0.116/kWh is competitive — cheaper than many EU countries ($0.15–$0.35/kWh) but more expensive than Middle East ($0.04–$0.08/kWh).

### 6.2 Staff Costs in Morocco

| Role | Annual Salary (MAD) | Annual Salary (USD) | Notes |
|------|-------------------|--------------------|-------|
| **Data Center Technician** | 120,000–200,000 | $12,000–$20,000 | Entry-mid level |
| **Data Center Engineer** | 200,000–400,000 | $20,000–$40,000 | Mid-senior level |
| **Senior Network/Systems Engineer** | 350,000–600,000 | $35,000–$60,000 | Experienced |
| **DC Facility Manager** | 400,000–800,000 | $40,000–$80,000 | Management |
| **Security Guard** | 48,000–84,000 | $4,800–$8,400 | 24/7 coverage needs 4-5 FTE |
| **Electrician/Maintenance Tech** | 84,000–150,000 | $8,400–$15,000 | Certified |

*Note: Morocco IT salaries are 60–80% lower than Western Europe equivalents.*

### 6.3 Insurance Costs

| Type | Annual Cost | Notes |
|------|-----------|-------|
| **Property/Equipment insurance** | 0.3–0.5% of replacement value | For a $100M DC: $300K–$500K/yr |
| **Business interruption** | 0.2–0.4% of projected revenue | Varies by risk profile |
| **Cyber insurance** | $50,000–$200,000/yr | For DC operators |
| **General liability** | $25,000–$100,000/yr | Standard |

### 6.4 Maintenance as % of CAPEX

| Category | Annual % of CAPEX | Notes |
|----------|-------------------|-------|
| **Mechanical/cooling systems** | 3–5% of mechanical CAPEX | Chillers, CRACs, pumps |
| **Electrical systems** | 2–4% of electrical CAPEX | UPS, generators, switchgear |
| **IT equipment** | 5–10% of IT CAPEX | Servers, storage, networking |
| **Overall facility** | 2–4% of total CAPEX | Industry standard |
| **GPU server maintenance** | $3,000–$7,000/month per 8-GPU server | [GMI Cloud](https://www.gmicloud.ai/blog/how-much-does-the-nvidia-h100-gpu-cost-in-2025-buy-vs-rent-analysis) |

### 6.5 Bandwidth Costs in Morocco/Africa

| Service | Price | Source |
|---------|-------|--------|
| **Morocco internet cost** | ~$1.16/Mbps | [Facebook/Emmanuel Motelin](https://www.facebook.com/EmmanuelMotelin/posts/1370248425110860) |
| **Kenya internet cost** | ~$1.54/Mbps | Same source |
| **Ghana internet cost** | ~$2.58/Mbps | Same source |
| **Morocco FTTH (residential)** | MAD 400–1,000/month (100Mbps–1Gbps) | [Maroc Telecom](https://www.maroctelecom.ma) |
| **IP Transit (Africa)** | $2–$10/Mbps/month | Industry estimates |
| **IP Transit (Europe, benchmark)** | $0.50–$2/Mbps/month | Industry estimates |
| **Dedicated wavelength (10G, Africa)** | $5,000–$15,000/month | Industry estimates |

---

## 7. GPU CLOUD PROVIDER PRICING

### 7.1 Hyperscaler H100 Pricing (On-Demand, per GPU-hour)

| Provider | Instance | H100 Price/GPU/hr | 8-GPU Node/hr | Source |
|----------|----------|-------------------|---------------|--------|
| **AWS** | p5.48xlarge | $6.88 | $55.04 | [Spheron](https://www.spheron.network/blog/gpu-cloud-pricing-comparison-2026), [Scouts/Yutori](https://scouts.yutori.com/6ca313ec-5167-4371-876a-f19937ac0aea) |
| **AWS (spot)** | p5.48xlarge | ~$3.83 | ~$30.64 | [Spheron](https://www.spheron.network/blog/gpu-cloud-pricing-comparison-2026) |
| **Google Cloud** | A3 High | ~$10.98 | ~$87.84 | [Spheron](https://www.spheron.network/blog/gpu-cloud-pricing-comparison-2026) |
| **Google Cloud (spot)** | A3 | ~$3.69 | — | [Spheron](https://www.spheron.network/blog/gpu-cloud-pricing-comparison-2026) |
| **Azure** | ND H100 v5 | ~$12.29 | $98.32 | [Spheron](https://www.spheron.network/blog/gpu-cloud-pricing-comparison-2026) |
| **Oracle OCI** | — | $2.39 | — | [GPU Leaderboard](https://gpuleaderboard.marktechpost.com/dashboard) |

### 7.2 Neo-Cloud / Specialized GPU Providers

| Provider | GPU | On-Demand $/GPU-hr | Spot $/GPU-hr | Source |
|----------|-----|---------------------|---------------|--------|
| **Spheron** | H100 PCIe | $2.01 | — | [Spheron](https://www.spheron.network/blog/gpu-cloud-pricing-comparison-2026) |
| **Spheron** | H100 SXM5 | $2.50 | $1.03 | [Spheron](https://www.spheron.network/blog/gpu-cloud-pricing-comparison-2026) |
| **GMI Cloud** | H100 SXM | $2.10 | — | [GMI Cloud](https://www.gmicloud.ai/en/blog/gpu-cloud-pricing-a100-h100-h200) |
| **GMI Cloud** | H200 SXM | $2.60 | — | [GMI Cloud](https://www.gmicloud.ai/en/blog/gpu-cloud-pricing-a100-h100-h200) |
| **Lambda Labs** | H100 SXM | $2.49–$3.44 | — | [Spheron](https://www.spheron.network/blog/gpu-cloud-pricing-comparison-2026) |
| **CoreWeave** | H100 HGX SXM | ~$6.16 | — | [Spheron](https://www.spheron.network/blog/gpu-cloud-pricing-comparison-2026) |
| **RunPod** | H100 PCIe | $2.69 | Available | [Spheron](https://www.spheron.network/blog/gpu-cloud-pricing-comparison-2026) |
| **Vast.ai** | H100 | ~$1.53–$2.27 | Available | [Spheron](https://www.spheron.network/blog/gpu-cloud-pricing-comparison-2026) |
| **Nebius** | H100 | $2.95 | — | [Spheron](https://www.spheron.network/blog/gpu-cloud-pricing-comparison-2026) |
| **FluidStack** | H100 | $2.10 | — | [Spheron](https://www.spheron.network/blog/gpu-cloud-pricing-comparison-2026) |

### 7.3 B200 / Blackwell Cloud Pricing

| Provider | GPU | On-Demand $/GPU-hr | Spot $/GPU-hr | Source |
|----------|-----|---------------------|---------------|--------|
| **Spheron** | B200 SXM6 | $6.02 | $2.12 | [Spheron](https://www.spheron.network/blog/gpu-cloud-pricing-comparison-2026) |
| **Lambda Labs** | B200 | $4.99–$5.29 | — | [Spheron](https://www.spheron.network/blog/gpu-cloud-pricing-comparison-2026) |
| **RunPod** | B200 | $4.99 | — | [Spheron](https://www.spheron.network/blog/gpu-cloud-pricing-comparison-2026) |
| **Nebius** | B200 | $5.50 | — | [Spheron](https://www.spheron.network/blog/gpu-cloud-pricing-comparison-2026) |
| **AWS** | B200 (p6-b200) | ~$14.24 | ~$3.24 | [Spheron](https://www.spheron.network/blog/gpu-cloud-pricing-comparison-2026) |
| **GB200 NVL72** | (72 GPUs) | $10.50–$27.00 | — | [Spheron](https://www.spheron.network/blog/gpu-cloud-pricing-comparison-2026) |

---

## 8. KEY FINANCIAL MODELS & ESTIMATES

### 8.1 Sample: 50MW Green GPU Data Center in Dakhla, Morocco

| Cost Component | Low Estimate | High Estimate | Notes |
|----------------|-------------|---------------|-------|
| **Land (10 hectares)** | $1M | $5M | Dakhla: MAD 4,000–7,000/m² for industrial |
| **Building/shell (50MW)** | $50M | $100M | $6,725–$12,215/m² for IT space |
| **Power infrastructure** | $100M | $200M | Switchgear, transformers, generators |
| **Cooling (seawater + free cooling)** | $30M | $60M | Seawater intake + chiller plant |
| **UPS systems** | $25M | $50M | 2N redundant, lithium-ion |
| **Networking (InfiniBand + Ethernet)** | $15M | $30M | Full fat-tree topology |
| **Fire suppression + security** | $5M | $15M | Novec 1230, VESDA, biometric |
| **Raised floor + containment** | $5M | $15M | High-load for GPU racks |
| **Renewable energy (solar + wind)** | $50M | $100M | Partial DC power supply |
| **Subtotal (Infrastructure)** | **$281M** | **$575M** | |
| **GPU servers (2,000x H100)** | $300M | $500M | DGX H100 at $300K–$450K each (250 servers) |
| **Networking equipment (GPU)** | $20M | $40M | InfiniBand switches, AOC cables |
| **Storage** | $10M | $20M | NVMe, object storage |
| **Subtotal (IT Equipment)** | **$330M** | **$560M** | |
| **TOTAL CAPEX** | **$611M** | **$1,135M** | |

### 8.2 Annual OPEX Estimate (50MW DC)

| Cost Item | Annual Cost | Notes |
|-----------|-----------|-------|
| **Electricity (50MW @ $0.116/kWh, PUE 1.3)** | ~$66M/yr | 50,000kW × 1.3 × 8,760hr × $0.116 |
| **Staff (40 people)** | ~$1.2M/yr | Mix of techs, engineers, security |
| **Maintenance (3% of infra CAPEX)** | ~$8.4M–$17.3M/yr | 3% of $281M–$575M |
| **Insurance (0.4% of total value)** | ~$2.4M–$4.5M/yr | |
| **Bandwidth/connectivity** | ~$2M–$5M/yr | Multiple 100G links |
| **Software licensing** | ~$2M–$5M/yr | DCIM, monitoring, etc. |
| **TOTAL OPEX** | **~$82M–$99M/yr** | |

### 8.3 Break-Even Analysis: Own vs. Cloud

| Metric | Value | Notes |
|--------|-------|-------|
| **Cloud H100 cost (8-GPU, 24/7)** | ~$481K/yr (at $6.88/GPU-hr, AWS) | $55.04 × 8,760 hours |
| **Cloud H100 cost (neo-cloud, 24/7)** | ~$175K/yr (at $2.50/GPU-hr, Spheron) | $20.00 × 8,760 hours |
| **Own H100 DGX (8-GPU)** | $300K–$450K purchase + $36K–$84K/yr power | At $0.116/kWh |
| **Break-even vs AWS** | ~9–14 months at 100% utilization | Buy wins if high utilization |
| **Break-even vs neo-cloud** | ~24–36 months at 100% utilization | Neo-cloud is competitive |

---

## 9. MOROCCO-SPECIFIC ADVANTAGES

| Advantage | Details |
|-----------|---------|
| **Low electricity cost** | $0.116/kWh for business (vs $0.25+ in EU) |
| **Renewable energy potential** | 42%+ renewables share; excellent solar/wind resources |
| **Free cooling** | 5,000–7,500 hrs/yr in coastal desert |
| **Seawater cooling** | Atlantic coast (Dakhla) ideal for deep-sea cooling |
| **Low labor costs** | 60–80% lower than EU for IT/facility staff |
| **Tax incentives** | Dakhla is a free zone (zone franche) — tax benefits for investors |
| **Strategic location** | Gateway between Europe and Africa; submarine cable landings |
| **500MW green DC planned** | Igoudar Dakhla project signals government commitment |
| **New port infrastructure** | $1.2–1.6B Dakhla Atlantic Port (completion 2028) |
| **National grid connection** | 225kV/400kV lines connecting Dakhla to national grid (2.4B MAD investment) |

---

## 10. SOURCE INDEX

| # | Source | URL |
|---|--------|-----|
| 1 | DgtlInfra — DC Construction Costs | https://dgtlinfra.com/how-much-does-it-cost-to-build-a-data-center/ |
| 2 | Kio Data Centers — DC Costs | https://kiodatacenters.com/en/blog-data-center/costs-of-a-data-center |
| 3 | Mastt — DC Construction Guide | https://www.mastt.com/guide/data-center-construction |
| 4 | Ingenious.Build — DC Tiers | https://www.ingenious.build/blog-posts/data-center-tiers-explained |
| 5 | IntuitionLabs — NVIDIA GPU Pricing | https://intuitionlabs.ai/articles/nvidia-ai-gpu-pricing-guide |
| 6 | IntuitionLabs — HGX DC Requirements | https://intuitionlabs.ai/articles/nvidia-hgx-data-center-requirements |
| 7 | GMI Cloud — H100 Cost Analysis | https://www.gmicloud.ai/blog/how-much-does-the-nvidia-h100-gpu-cost-in-2025-buy-vs-rent-analysis |
| 8 | Spheron — GPU Cloud Pricing Comparison | https://www.spheron.network/blog/gpu-cloud-pricing-comparison-2026 |
| 9 | Tech-Insider — Blackwell GPU Pricing | https://tech-insider.org/nvidia-blackwell-gpu-pricing |
| 10 | Modal — B200 Pricing | https://modal.com/blog/nvidia-b200-pricing |
| 11 | Introl — 100kW GPU Racks | https://introl.com/blog/building-100kw-gpu-racks-power-cooling-architecture |
| 12 | Tom's Hardware — H100 Power | https://www.tomshardware.com/tech-industry/nvidias-h100-gpus-will-consume-more-power-than-some-countries |
| 13 | Router-Switch — Quantum-2 Pricing | https://www.router-switch.com/nvidia-quantum-2-qm9700-series.html |
| 14 | CSIS — Subsea Cable Costs | https://www.csis.org/analysis/safeguarding-subsea-cables |
| 15 | WU Vienna — Subsea Cable Economics | https://www.wu.ac.at/fileadmin/wu/d/ri/regulation/WPs_und_GAs/Economic_Impacts_of_Subsea_Cable_Deployment_V7.pdf |
| 16 | GlobalPetrolPrices — Morocco Electricity | https://www.globalpetrolprices.com/Morocco/electricity_prices |
| 17 | Climatescope — Morocco Energy | https://www.global-climatescope.org/markets/morocco |
| 18 | Google — Green DC Best Practices | https://sustainability.google/reports/dc-best-practices-google |
| 19 | Google — DC Sustainability | https://datacenters.google/operating-sustainably |
| 20 | ResearchGate — Seawater Cooling Costs | https://www.researchgate.net/publication/328524638 |
| 21 | Data Centre Magazine — Top Sustainable DCs | https://datacentremagazine.com/top10/top-10-sustainable-data-centres-februrary-2026 |
| 22 | DabaFinance — Morocco DC Investments | https://dabafinance.com/en/news/morocco-data-centers-ai-energy-europe |
| 23 | FireTron — Fire Suppression Costs | https://firetron.com/fire-suppression-systems/best-fire-suppression-systems-data-centers-server-rooms |
| 24 | TheNetworkInstallers — Fiber Optic Cost | https://thenetworkinstallers.com/blog/cost-of-fiber-optic-cable |
| 25 | GenX Security — Physical Security Costs | https://www.genxsecurity.com/single-post/typical-costs-of-commercial-security-fire-and-access-control-systems |
| 26 | CBRE France — DC Real Estate | https://www.cbre.fr/insights/articles/le-datacenter-l-actif-immobilier-ou-on-ne-parle-presque-plus-de-metres-carre |
| 27 | NVIDIA — DGX H100 User Guide | https://docs.nvidia.com/dgx/dgxh100-user-guide/introduction-to-dgxh100.html |
| 28 | Data Centre Magazine — PUE | https://datacentremagazine.com/news/what-is-pue-and-how-does-it-define-data-centre-progress |
| 29 | CNOA — Morocco Construction Costs | https://cnoa.ma/s/a/library/2024-04-13/fa6fce39-f819-444b-8dc8-4355068d06c5.pdf |
| 30 | ScienceDirect — Morocco Renewables | https://www.sciencedirect.com/science/article/pii/S2590174525000996 |

---

*Report compiled from 30+ web searches and 8 deep page reads. All prices are approximate and subject to market fluctuation. GPU pricing is particularly volatile. Morocco-specific data draws from government sources (ONEE, CRI Dakhla) and international databases (GlobalPetrolPrices, CEIC, Climatescope).*
