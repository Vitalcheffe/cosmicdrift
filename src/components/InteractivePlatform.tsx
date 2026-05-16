'use client';

import React, { useRef, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Server,
  Shield,
  Globe,
  Activity,
  Factory,
  Flame,
  Leaf,
  Truck,
  Sun,
  Wind,
  Zap,
  Battery,
  Satellite,
  Lock,
  Wifi,
  Radio,
  Mountain,
  Cpu,
  FlaskConical,
  Ship,
  Map,
  Drone,
  BarChart3,
  FileText,
  MessageCircle,
  Droplets,
  TestTube,
  Waves,
  CloudRain,
  Landmark,
  TrendingUp,
  Banknote,
  FileCheck,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   HARCH OS — Subsidiary-Specific Platform Modules

   Each subsidiary gets UNIQUE modules relevant to its business.
   No two pages look alike. Professional dark palette.
   Inspired by Palantir's numbered-module layout.
   No fake data. No game aesthetics. No fluorescent colors.
   ═══════════════════════════════════════════════════════════════ */

interface InteractivePlatformProps {
  slug: string;
  accent?: string;
}

// Professional dark palette — no fluorescent, no game
const DIVIDER = 'rgba(255,255,255,0.06)';
const SUBTLE_BORDER = 'rgba(255,255,255,0.08)';

// ═══════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════
interface Capability {
  title: string;
  description: string;
}

interface ModuleConfig {
  label: string;
  name: string;
  description: string;
  capabilities: Capability[];
  cta: string;
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
}

interface SubsidiaryConfig {
  headerLabel: string;
  headerTitle: string;
  headerDescription: string;
  modules: ModuleConfig[];
}

// ═══════════════════════════════════════════════════════════════
// SUBSIDIARY-SPECIFIC MODULE CONFIGURATIONS
// Each subsidiary has completely different modules, content,
// and capabilities — no two pages are alike.
// ═══════════════════════════════════════════════════════════════

const SUBSIDIARY_CONFIGS: Record<string, SubsidiaryConfig> = {
  // ─────────────────────────────────────────────────────────────
  // INTELLIGENCE — GPU Data Centers / AI Compute Cloud
  // Competitors: CoreWeave, Lambda Labs, Nebius, Crusoe, RunPod
  // Modules focus on: GPU orchestration, carbon-aware scheduling,
  // data sovereignty, submarine connectivity, observability
  // ─────────────────────────────────────────────────────────────
  intelligence: {
    headerLabel: 'Platform Modules',
    headerTitle: 'Harch Intelligence Platform',
    headerDescription:
      'The operating layer for sovereign AI compute — from GPU scheduling to carbon-aware workload routing across five Moroccan hubs. Every module is built for infrastructure that must never leave African jurisdiction.',
    modules: [
      {
        label: 'COMPUTE',
        name: 'Compute Fabric',
        description:
          'Central orchestration layer for GPU clusters across all five hubs. Manages workload placement, queue prioritization, and real-time capacity allocation. Carbon-aware scheduling routes each job to the hub with the lowest grid carbon intensity at that moment — a capability no competitor offers at this granularity.',
        capabilities: [
          {
            title: 'Carbon-Aware Scheduling',
            description:
              'Real-time workload routing based on grid carbon intensity per hub. Jobs are automatically placed at the greenest available location, achieving an average portfolio carbon intensity significantly below industry benchmarks. Scheduling decisions factor in 47 parameters including weather forecasts, grid mix, and job urgency.',
          },
          {
            title: 'Multi-Hub Orchestration',
            description:
              'Unified control plane across five geographically distributed hubs — Ouarzazate, Dakhla, Benguerir, Tanger, and Casablanca. Distributed training jobs can span multiple sites with consistent performance, while failover policies ensure zero-loss job migration during maintenance windows.',
          },
          {
            title: 'GPU Fleet Management',
            description:
              'Full lifecycle management of heterogeneous GPU inventory — H100, A100, and L40S accelerators. Automated health monitoring, thermal throttling alerts, and predictive replacement scheduling minimize downtime. Capacity planning tools project demand against inventory with quarterly granularity.',
          },
          {
            title: 'Queue & Priority Management',
            description:
              'Fair-share and priority-based job queuing with SLA enforcement. Reserved capacity guarantees for enterprise customers, burst capacity for spot workloads, and preemption policies that protect production jobs while maximizing cluster utilization.',
          },
        ],
        cta: 'Explore Compute Fabric',
        icon: Server,
      },
      {
        label: 'SOVEREIGNTY',
        name: 'Sovereign Data',
        description:
          'Ensures all data processed within Harch Intelligence remains under African jurisdiction. Data residency is enforced at the infrastructure level — not merely as a policy — with encryption, access controls, and audit trails that satisfy Moroccan Law 09-08, AU data frameworks, and international compliance standards.',
        capabilities: [
          {
            title: 'Jurisdiction Enforcement',
            description:
              'Infrastructure-level data residency guarantees. All storage, compute, and network traffic remains within Moroccan borders by default. No data traverses foreign jurisdiction unless explicitly authorized by the customer. Physical and logical controls are independently audited quarterly.',
          },
          {
            title: 'Encryption & Key Management',
            description:
              'End-to-end encryption with customer-managed keys (BYOK). Data is encrypted at rest using AES-256, in transit using TLS 1.3, and during computation using confidential computing enclaves where supported. Key management services operate exclusively within African infrastructure.',
          },
          {
            title: 'Access & Identity Control',
            description:
              'Role-based access control with multi-factor authentication, session recording, and privileged access management. All access events are logged in an immutable audit trail with 7-year retention. Integration with enterprise SSO via SAML 2.0 and OIDC.',
          },
          {
            title: 'Compliance Automation',
            description:
              'Continuous compliance monitoring for GDPR, ISO 27001, SOC 2 Type II, and Moroccan Law 09-08. Automated evidence collection, policy-as-code enforcement, and real-time drift detection reduce audit preparation from months to days.',
          },
        ],
        cta: 'Explore Sovereign Data',
        icon: Shield,
      },
      {
        label: 'CONNECTIVITY',
        name: 'Network Gateway',
        description:
          'Manages the submarine cable infrastructure that connects Morocco to Europe, the Americas, and the Middle East. This is the only African GPU cloud with direct landing of four submarine cable systems — providing the lowest-latency paths between African compute and global data sources.',
        capabilities: [
          {
            title: 'Submarine Cable Hub',
            description:
              'Direct integration with four submarine cable systems — ACE, MainOne, Maroc Telecom, and additional capacity via consortium cables. Dual diverse landing stations ensure path redundancy for all international traffic. Total available capacity exceeds 80 Tbps with expansion options.',
          },
          {
            title: 'Latency Optimization',
            description:
              'Sub-8ms round-trip to European financial centers, sub-35ms to the Americas, and sub-20ms to the Middle East. Anycast routing, traffic engineering, and dedicated wavelengths for latency-sensitive workloads like high-frequency trading and real-time inference.',
          },
          {
            title: 'Peering & Interconnection',
            description:
              'Carrier-neutral interconnection with direct on-ramps to major cloud providers, internet exchanges, and content delivery networks. Private cross-connects available for enterprise customers requiring dedicated, non-shared bandwidth.',
          },
          {
            title: 'Network Observability',
            description:
              'Real-time monitoring of all network paths with automated failover detection. Latency heatmap, packet loss tracking, and bandwidth utilization per cable system. Alerts for degradation events with root cause analysis tools.',
          },
        ],
        cta: 'Explore Network Gateway',
        icon: Globe,
      },
      {
        label: 'OBSERVABILITY',
        name: 'Platform Monitor',
        description:
          'Full-stack observability across all five hubs — from GPU die temperature to PUE to carbon intensity per job. Integrates with customer Grafana instances and provides managed dashboards for teams that need visibility without infrastructure overhead.',
        capabilities: [
          {
            title: 'GPU & Infrastructure Metrics',
            description:
              'Real-time telemetry for GPU utilization, VRAM consumption, thermal throttling events, and power draw per accelerator. Infrastructure-level metrics include PUE, cooling efficiency, power distribution, and network throughput per hub.',
          },
          {
            title: 'Carbon Intensity Tracking',
            description:
              'Per-job carbon accounting that measures the actual grid carbon intensity at the hub where each workload ran. Cumulative carbon reports per project, per team, or per organization enable accurate sustainability reporting without estimation.',
          },
          {
            title: 'Cost & Billing Analytics',
            description:
              'Transparent cost breakdowns by GPU type, utilization tier, and job duration. Reserved instance savings calculators, spot pricing history, and budget alerts. Exportable billing data in standard formats for integration with procurement systems.',
          },
          {
            title: 'Alerting & Incident Response',
            description:
              'Configurable alert policies with multi-channel notification — email, webhook, PagerDuty integration. Automated incident timelines, correlated log aggregation, and suggested remediation paths reduce mean time to resolution.',
          },
        ],
        cta: 'Explore Platform Monitor',
        icon: Activity,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CEMENT — Cement Production, West Africa
  // Competitors: Dangote, Holcim, Heidelberg, CIMENCAM, Salam Cement
  // Modules focus on: quarry, kiln, green formulations, distribution
  // ─────────────────────────────────────────────────────────────
  cement: {
    headerLabel: 'Platform Modules',
    headerTitle: 'Harch Cement Platform',
    headerDescription:
      'The digital backbone of vertically integrated cement production — from quarry bench planning to finished product delivery. Each module covers a distinct phase of the value chain, ensuring full traceability from limestone face to construction site.',
    modules: [
      {
        label: 'EXTRACTION',
        name: 'Quarry & Raw Materials',
        description:
          'Manages the full quarry lifecycle from geological survey through bench extraction to raw material quality control. With over 50 years of verified limestone reserves, this module ensures consistent feedstock supply while minimizing extraction waste and environmental impact.',
        capabilities: [
          {
            title: 'Reserve Mapping & Planning',
            description:
              '3D geological models of limestone reserves with chemical composition mapping by bench and layer. Extraction planning tools optimize bench sequencing for consistent raw material quality while minimizing overburden removal. Quarterly reserve updates based on drilling program results.',
          },
          {
            title: 'Blast Design & Execution',
            description:
              'Precision blast design software that calculates charge patterns, timing sequences, and fragmentation targets. Post-blast analysis via drone survey compares actual fragmentation against design, enabling continuous refinement. Vibration monitoring ensures compliance with local environmental standards.',
          },
          {
            title: 'Raw Material Quality Control',
            description:
              'Automated sampling and XRF analysis at the crusher feed with real-time chemical composition dashboards. If limestone chemistry deviates from target ranges, the system recommends blending ratios from alternative quarry faces to maintain consistent kiln feed quality.',
          },
          {
            title: 'Environmental Compliance',
            description:
              'Dust monitoring stations around the quarry perimeter with real-time PM10/PM25 tracking. Blasting schedule optimization to minimize community impact. Progressive rehabilitation plans triggered automatically as benches are depleted, using stockpiled topsoil and overburden.',
          },
        ],
        cta: 'Explore Quarry Operations',
        icon: Mountain,
      },
      {
        label: 'PRODUCTION',
        name: 'Kiln Operations',
        description:
          'Controls the heart of the cement plant — from raw meal preparation through clinker production to finish grinding. The 5-stage preheater with calciner achieves energy consumption significantly below regional averages, while AI-optimized kiln control reduces fuel waste and improves clinker quality.',
        capabilities: [
          {
            title: 'Kiln Process Control',
            description:
              'AI-driven kiln control system that manages flame temperature, rotational speed, feed rate, and airflow in real time. Predictive models trained on historical production data anticipate coating buildup and ring formation, enabling preventive adjustments that reduce unplanned shutdowns.',
          },
          {
            title: 'Waste Heat Recovery',
            description:
              'Captures approximately 30% of exhaust heat from the preheater and clinker cooler for power generation. The recovered energy feeds back into plant operations, reducing grid electricity consumption. Performance monitoring tracks heat recovery efficiency and identifies degradation in heat exchanger performance.',
          },
          {
            title: 'Alternative Fuel Management',
            description:
              'Tracking and optimization of alternative fuel substitution rates — including agricultural waste, tire-derived fuel, and municipal solid waste fractions. The system balances substitution rate against clinker quality requirements and emissions limits, maximizing cost savings without compromising product standards.',
          },
          {
            title: 'Quality Assurance',
            description:
              'ISO 9001-certified quality management with automated sampling at every production stage — raw meal, clinker, and finished cement. Real-time free lime monitoring, Blaine fineness tracking, and compressive strength prediction models ensure product consistency that exceeds EN 197 and ASTM C150 standards.',
          },
        ],
        cta: 'Explore Kiln Operations',
        icon: Flame,
      },
      {
        label: 'FORMULATION',
        name: 'Green Formulations',
        description:
          'Develops and manages lower-carbon cement products that reduce the clinker factor without sacrificing performance. Current formulations use locally sourced pozzolanic materials, while the R&D pipeline targets LC3 (calcined clay) formulations for further carbon reduction by 2029.',
        capabilities: [
          {
            title: 'Clinker Factor Optimization',
            description:
              'Systematic reduction of the clinker-to-cement ratio through supplementary cementitious materials (SCMs). Current blended cement formulations achieve a clinker factor below 85%, with a clear roadmap to sub-70% using LC3 technology. Each formulation is validated against strength, durability, and setting time requirements.',
          },
          {
            title: 'LC3 Development Pipeline',
            description:
              'Active R&D program for Limestone Calcined Clay Cement (LC3), which can reduce carbon emissions by up to 40% compared to ordinary Portland cement. Lab-scale validation is complete, with pilot production planned for 2028 and commercial launch targeted for 2029. Raw material sourcing from local clay deposits has been confirmed.',
          },
          {
            title: 'Carbon Tracking per Product',
            description:
              'Life-cycle carbon accounting for each cement product, from quarry extraction through production to factory gate. Product-specific carbon intensity data enables customers to report embodied carbon in their construction projects accurately — a requirement under emerging EU CBAM regulations.',
          },
          {
            title: 'Certification & Standards',
            description:
              'All green formulations undergo certification against relevant standards — EN 197 for cement, EN 206 for concrete, and LEED/BREEAM credit compliance documentation. The system maintains current certification status, expiry dates, and renewal workflows for each product-market combination.',
          },
        ],
        cta: 'Explore Green Formulations',
        icon: Leaf,
      },
      {
        label: 'LOGISTICS',
        name: 'Distribution & Delivery',
        description:
          'Coordinates the physical supply chain from plant gate to customer site — managing river barge scheduling, road tanker dispatch, and customer order fulfillment across a 500km distribution radius covering Gambia, Senegal, Guinea-Bissau, and Guinea.',
        capabilities: [
          {
            title: 'Order Management',
            description:
              'Customer order intake via phone, WhatsApp, and web portal with automated order confirmation and delivery scheduling. Priority allocation during high-demand periods, volume-based pricing tiers, and contract management for long-term offtake agreements.',
          },
          {
            title: 'Fleet Dispatch & Tracking',
            description:
              'Real-time dispatch management for a fleet of cement tankers and river barges. GPS tracking of all vehicles, ETAs updated dynamically based on traffic and road conditions, and proof-of-delivery capture via driver mobile app. Fleet utilization analytics identify underperforming routes.',
          },
          {
            title: 'River Transport Coordination',
            description:
              'Barge loading and scheduling on the Gambia River — the lowest-cost bulk transport method for interior markets. Tidal window planning, barge capacity optimization, and multi-stop routing for customers along the river corridor. Direct barge access provides cost advantages that road-only competitors cannot match.',
          },
          {
            title: 'Inventory & Demand Forecasting',
            description:
              'Warehouse and silo inventory tracking with automated reorder points. Demand forecasting models incorporate construction seasonality, government project pipelines, and historical sales patterns. Alerts for stockout risk and overproduction ensure optimal inventory levels.',
          },
        ],
        cta: 'Explore Distribution Network',
        icon: Truck,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // ENERGY — Solar/Wind Renewable Energy
  // Competitors: ACWA Power, MASEN, Masdar, EDF Renouvelables, Enel Green Power
  // Modules focus on: solar, wind, grid, storage
  // ─────────────────────────────────────────────────────────────
  energy: {
    headerLabel: 'Platform Modules',
    headerTitle: 'Harch Energy Platform',
    headerDescription:
      'End-to-end management of renewable energy generation, grid integration, and storage — from individual inverter monitoring to portfolio-level dispatch optimization. Designed for Morocco\'s exceptional solar irradiance and Atlantic wind resources.',
    modules: [
      {
        label: 'SOLAR',
        name: 'Solar Generation',
        description:
          'Manages the full lifecycle of photovoltaic assets — from site selection and yield estimation through real-time performance monitoring to degradation tracking. Morocco receives over 2,800 kWh/m2/year of solar irradiance, and this module ensures every watt is captured and accounted for.',
        capabilities: [
          {
            title: 'PV Farm Monitoring',
            description:
              'Inverter-level monitoring across all solar installations with real-time power output, DC/AC ratio tracking, and string-level fault detection. Performance ratio calculations against expected yield from satellite irradiance data identify underperforming sections within hours rather than weeks.',
          },
          {
            title: 'Irradiance Forecasting',
            description:
              'Day-ahead and intraday solar irradiance forecasts using satellite imagery, ground-based pyranometer networks, and numerical weather prediction models. Forecast accuracy is continuously benchmarked against actual generation, with model retraining triggered when deviation exceeds thresholds.',
          },
          {
            title: 'Asset Health & Degradation',
            description:
              'Long-term degradation tracking at the module level using IV curve tracing and thermal imaging. Potential-induced degradation (PID), hotspot formation, and bypass diode failures are detected early. Maintenance scheduling optimizes the tradeoff between lost generation and crew dispatch costs.',
          },
          {
            title: 'Soiling & Cleaning Optimization',
            description:
              'Dust accumulation modeling specific to arid Moroccan conditions with cleaning schedule optimization. The system calculates the revenue loss from soiling against the cost of cleaning operations, triggering panel washes only when the economic return justifies the expense.',
          },
        ],
        cta: 'Explore Solar Generation',
        icon: Sun,
      },
      {
        label: 'WIND',
        name: 'Wind Generation',
        description:
          'Controls onshore wind assets along Morocco\'s Atlantic coast — where average wind speeds exceed 8 m/s at hub height. From turbine-level performance to farm-level dispatch, this module maximizes energy capture while managing mechanical loads and grid constraints.',
        capabilities: [
          {
            title: 'Turbine Performance Monitoring',
            description:
              'SCADA integration with real-time power curve analysis for each turbine. Deviations from the expected power curve trigger automated diagnostics — blade pitch issues, yaw misalignment, gearbox degradation, and generator efficiency loss are identified and prioritized for maintenance.',
          },
          {
            title: 'Wind Resource Assessment',
            description:
              'Met mast and LiDAR data management with wind atlas integration. Long-term wind resource estimates are refined using operational data, reducing uncertainty in energy yield projections for new projects. Wind speed and direction distributions feed into wake loss calculations.',
          },
          {
            title: 'Curtailment Management',
            description:
              'When grid operator curtailment orders reduce output, this module distributes curtailment across turbines to minimize mechanical stress and maximize lifetime value. Curtailment logs are maintained for compensation claims and regulatory compliance reporting.',
          },
          {
            title: 'Forecasting & Dispatch',
            description:
              'Wind power forecasts at 15-minute granularity for the next 48 hours, with probabilistic ranges for confidence intervals. Dispatch optimization aligns forecast generation with grid commitments and market positions, reducing imbalance penalties.',
          },
        ],
        cta: 'Explore Wind Generation',
        icon: Wind,
      },
      {
        label: 'GRID',
        name: 'Grid Integration',
        description:
          'Manages the interface between renewable generation assets and the national grid — from power purchase agreement compliance to frequency regulation services. As Morocco\'s renewable share grows toward the 52% target, this module ensures stability and maximizes revenue from grid services.',
        capabilities: [
          {
            title: 'PPA Compliance & Settlement',
            description:
              'Automated tracking of power purchase agreement obligations — scheduled generation, delivery tolerances, and settlement calculations. Meter data management with tamper detection and reconciliation against grid operator records. Monthly settlement reports generated automatically.',
          },
          {
            title: 'Frequency & Voltage Support',
            description:
              'Grid-forming inverter control for frequency regulation and voltage support services. Synthetic inertia provision during grid disturbances, reactive power management for voltage regulation, and fast frequency response activation within 200 milliseconds of a frequency deviation event.',
          },
          {
            title: 'Demand Response Integration',
            description:
              'Coordination with industrial demand response programs — shifting flexible loads to periods of renewable surplus. Time-of-use optimization for Harch Corp\'s own industrial operations (cement, water, mining) to minimize electricity costs while reducing curtailment of renewable generation.',
          },
          {
            title: 'Grid Code Compliance',
            description:
              'Continuous monitoring of grid code requirements — voltage ride-through, frequency ride-through, harmonic limits, and power quality standards. Compliance documentation automatically generated for regulatory submissions. Pre-commissioning simulation validates performance against grid code before energization.',
          },
        ],
        cta: 'Explore Grid Integration',
        icon: Zap,
      },
      {
        label: 'STORAGE',
        name: 'Energy Storage',
        description:
          'Manages battery energy storage systems and emerging hydrogen production assets. Storage transforms intermittent renewable generation into dispatchable power — enabling Harch Energy to sell firm capacity rather than variable generation, at significantly higher value.',
        capabilities: [
          {
            title: 'Battery System Management',
            description:
              'Real-time monitoring of battery cells, modules, and racks with state-of-charge and state-of-health tracking. Thermal management ensures cells operate within optimal temperature ranges. Cycle counting and degradation models project remaining useful life and trigger warranty claims when actual degradation exceeds manufacturer specifications.',
          },
          {
            title: 'Dispatch Optimization',
            description:
              'Algorithmic optimization of charge/discharge schedules to maximize revenue across energy arbitrage, capacity payments, and ancillary services. The system evaluates market prices, grid constraints, and battery health in real time to determine the highest-value dispatch strategy for each 15-minute interval.',
          },
          {
            title: 'Green Hydrogen Production',
            description:
              'Integration with electrolyzer systems for green hydrogen production during periods of renewable surplus. Production scheduling optimizes electrolyzer utilization against electricity prices and hydrogen demand forecasts. Hydrogen storage and offtake tracking for industrial and transport customers.',
          },
          {
            title: 'Performance Benchmarking',
            description:
              'Round-trip efficiency tracking for storage assets with comparison against commissioning baselines. Revenue stacking analysis shows the contribution of each value stream (arbitrage, capacity, frequency). Benchmarking against industry benchmarks identifies underperformance and optimization opportunities.',
          },
        ],
        cta: 'Explore Energy Storage',
        icon: Battery,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // TECHNOLOGY — Satellite Communications & Cybersecurity
  // Competitors: SES, Viasat, Hughes, Eutelsat OneWeb, Marlink
  // Modules focus on: satellite, cyber, network, sovereign comms
  // ─────────────────────────────────────────────────────────────
  technology: {
    headerLabel: 'Platform Modules',
    headerTitle: 'Harch Technology Platform',
    headerDescription:
      'Sovereign communications infrastructure and cybersecurity operations — from ground station management to threat intelligence. Built to ensure that African governments and enterprises have connectivity and security independent of foreign providers.',
    modules: [
      {
        label: 'SATELLITE',
        name: 'Satellite Operations',
        description:
          'Manages the ground station network and bandwidth allocation across multiple orbital constellations. This module provides the satellite connectivity layer that links Harch Corp\'s remote operations — mining sites, solar farms, agricultural zones — to the central platform regardless of terrestrial network availability.',
        capabilities: [
          {
            title: 'Ground Station Management',
            description:
              'Monitoring and control of satellite earth stations across Morocco. Antenna tracking, signal acquisition, and handoff between satellite passes are automated. Redundant RF chains and power systems ensure availability for critical infrastructure communications.',
          },
          {
            title: 'Bandwidth Allocation',
            description:
              'Dynamic bandwidth management across LEO, MEO, and GEO constellations. Priority-based allocation ensures that safety-critical and operational data streams receive guaranteed capacity, while bulk data transfers fill remaining bandwidth. Real-time utilization dashboards per terminal and per beam.',
          },
          {
            title: 'Link Budget Analysis',
            description:
              'Automated link budget calculations for new terminal installations and service expansions. Accounts for atmospheric attenuation, satellite elevation angle, modulation and coding schemes, and interference margins. Predicts achievable data rates and availability percentages before hardware deployment.',
          },
          {
            title: 'Service Level Monitoring',
            description:
              'End-to-end service level tracking from terminal to gateway — latency, jitter, packet loss, and availability. SLA compliance reports generated automatically per customer contract. Degradation events trigger investigation workflows with root cause analysis tools.',
          },
        ],
        cta: 'Explore Satellite Operations',
        icon: Satellite,
      },
      {
        label: 'CYBER',
        name: 'Cyber Defense',
        description:
          'The security operations center for all Harch Corp infrastructure — and for customers who require sovereign-grade cybersecurity. This module provides threat detection, incident response, and vulnerability management with full data residency within African jurisdiction.',
        capabilities: [
          {
            title: 'Threat Detection & Response',
            description:
              '24/7 security operations center with SIEM integration across all Harch Corp infrastructure. Behavioral analytics detect anomalous patterns indicative of advanced persistent threats. Automated response playbooks contain breaches within minutes, while human analysts validate and investigate high-complexity incidents.',
          },
          {
            title: 'Vulnerability Management',
            description:
              'Continuous vulnerability scanning of all internet-facing and internal infrastructure. Risk-based prioritization scores vulnerabilities by exploitability, asset criticality, and business impact. Patch management workflows track remediation from detection through deployment with SLA enforcement.',
          },
          {
            title: 'DDoS Protection',
            description:
              'Multi-layer DDoS mitigation with on-premise scrubbing for volumetric attacks and cloud-based mitigation for large-scale events. Traffic baseline learning, rate limiting, and geo-blocking policies are configurable per customer. Attack forensics reports document attack vectors, duration, and mitigation effectiveness.',
          },
          {
            title: 'Compliance & Audit',
            description:
              'Automated compliance monitoring for ISO 27001, SOC 2, and Moroccan cybersecurity regulations. Evidence collection, policy enforcement, and gap analysis reduce audit preparation effort. Penetration testing schedules and findings tracking ensure continuous security posture improvement.',
          },
        ],
        cta: 'Explore Cyber Defense',
        icon: Lock,
      },
      {
        label: 'NETWORK',
        name: 'Network Infrastructure',
        description:
          'Manages the terrestrial network backbone that interconnects all Harch Corp sites — fiber optic, microwave, and satellite backhaul. This is the physical layer that makes sovereign, low-latency communications possible across Morocco and the broader African continent.',
        capabilities: [
          {
            title: 'Fiber Backbone Management',
            description:
              'Monitoring and management of fiber optic routes connecting data centers, ground stations, and industrial sites. Optical power monitoring, fiber cut detection with sub-second alerting, and automated traffic rerouting via diverse paths. Capacity planning tools project bandwidth requirements against available fiber capacity.',
          },
          {
            title: 'SD-WAN & Traffic Engineering',
            description:
              'Software-defined WAN orchestration across all Harch Corp sites. Application-aware routing selects the best path — fiber, microwave, or satellite — based on latency requirements, cost, and availability. Centralized policy management with per-site overrides for local conditions.',
          },
          {
            title: 'Microwave & Radio Planning',
            description:
              'Point-to-point microwave link design, frequency coordination, and performance monitoring for sites beyond fiber reach. Path profiling, fresnel zone clearance, and rain fade modeling ensure reliable high-capacity links in Morocco\'s diverse terrain.',
          },
          {
            title: 'Network Operations Center',
            description:
              'Centralized NOC with real-time visibility into all network elements — routers, switches, optical amplifiers, and microwave radios. Correlated event processing reduces alert noise. Automated runbooks execute standard remediation procedures without human intervention for common failure modes.',
          },
        ],
        cta: 'Explore Network Infrastructure',
        icon: Wifi,
      },
      {
        label: 'SOVEREIGN',
        name: 'Sovereign Communications',
        description:
          'Government-grade encrypted communications for defense, intelligence, and critical infrastructure customers. This module provides the highest assurance level — air-gapped deployment options, sovereign key management, and guaranteed data residency within African jurisdiction.',
        capabilities: [
          {
            title: 'Encrypted Communications',
            description:
              'End-to-end encrypted voice, video, and messaging using sovereign key management infrastructure. All cryptographic materials are generated, stored, and managed within Moroccan infrastructure. Supports classified communication requirements with compartmentalized key hierarchies.',
          },
          {
            title: 'Air-Gapped Deployment',
            description:
              'Fully disconnected deployment option for the most sensitive environments. Software updates delivered via secure physical media. No external network connections required for operation. Suitable for facilities with strict emission security (EMSEC) requirements.',
          },
          {
            title: 'Sovereign Key Management',
            description:
              'National-grade key management infrastructure with hardware security modules (HSMs) located exclusively within Morocco. Key generation, distribution, rotation, and revocation follow sovereign protocols. No foreign access to cryptographic materials under any circumstances.',
          },
          {
            title: 'Secure Device Management',
            description:
              'Mobile device management for secure communications devices — smartphones, tablets, and laptops used by government and defense customers. Remote wipe, policy enforcement, application whitelisting, and geofencing ensure devices remain compliant even when physically outside secure facilities.',
          },
        ],
        cta: 'Explore Sovereign Communications',
        icon: Radio,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // MINING — Mineral Extraction (Phosphate, etc.)
  // Competitors: OCP Group, ICL, Ma'aden, Mosaic, EuroChem
  // Modules focus on: resource mapping, extraction, processing, logistics
  // ─────────────────────────────────────────────────────────────
  mining: {
    headerLabel: 'Platform Modules',
    headerTitle: 'Harch Mining Platform',
    headerDescription:
      'From geological exploration to mineral export — the integrated platform for managing mining operations across Morocco\'s rich mineral deposits. Each module covers a distinct phase of the mine-to-market value chain.',
    modules: [
      {
        label: 'EXPLORATION',
        name: 'Resource Intelligence',
        description:
          'Geological data management, reserve estimation, and exploration planning. Morocco holds over 70% of the world\'s phosphate reserves, and this module ensures those resources are mapped, quantified, and planned with the precision required for multi-decade mine operations.',
        capabilities: [
          {
            title: 'Geological Mapping',
            description:
              '3D geological models built from drill core data, seismic surveys, and geophysical measurements. Integrated with GIS platforms for spatial analysis. Models are continuously refined as new exploration data becomes available, reducing uncertainty in reserve estimates with each drilling campaign.',
          },
          {
            title: 'Reserve Estimation',
            description:
              'JORC and NI 43-101 compliant resource and reserve estimation with probabilistic modeling. Classification of resources into measured, indicated, and inferred categories based on data density and confidence levels. Sensitivity analysis shows how reserve estimates change under different commodity price scenarios.',
          },
          {
            title: 'Exploration Planning',
            description:
              'Optimal drill hole placement using geological uncertainty maps. Budget-constrained exploration programs that maximize information gain per dollar spent. Automated permitting workflows ensure drilling campaigns comply with environmental and land use regulations.',
          },
          {
            title: 'Geochemical Analysis',
            description:
              'Laboratory information management for drill core and bulk sampling results. XRF and ICP-MS analysis tracking with quality control protocols. Geochemical anomaly maps generated from surface sampling and soil surveys guide exploration targeting.',
          },
        ],
        cta: 'Explore Resource Intelligence',
        icon: Mountain,
      },
      {
        label: 'OPERATIONS',
        name: 'Extraction Operations',
        description:
          'Day-to-day management of mining operations — from bench planning and blast execution to ore haulage and grade control. This module ensures that every tonne of material moved contributes to the economic objectives of the operation.',
        capabilities: [
          {
            title: 'Mine Planning & Scheduling',
            description:
              'Short-term and medium-term mine planning with optimized bench sequencing. Pit design tools calculate optimal pit shells based on commodity prices, processing costs, and geotechnical constraints. Weekly and daily schedules integrate with equipment availability and maintenance windows.',
          },
          {
            title: 'Fleet Management',
            description:
              'Real-time dispatch of excavators and haul trucks using GPS tracking and onboard weighing. Productivity dashboards show tonnes moved per hour, fuel consumption per tonne, and equipment utilization. Haul road condition monitoring identifies maintenance needs before they cause equipment damage.',
          },
          {
            title: 'Grade Control',
            description:
              'Real-time ore grade tracking at the extraction face using portable XRF analyzers and blast hole sampling. Ore/waste boundary delineation ensures that material above cut-off grade reaches the processing plant while waste is routed to the dump. Grade reconciliation against the block model validates reserve estimates.',
          },
          {
            title: 'Safety & Environmental',
            description:
              'Slope stability monitoring using radar and prisms with automated alert thresholds. Dust and vibration monitoring at site boundaries with compliance reporting. Water management for pit dewatering and runoff control. Incident tracking and near-miss reporting with root cause analysis workflows.',
          },
        ],
        cta: 'Explore Extraction Operations',
        icon: Cpu,
      },
      {
        label: 'PROCESSING',
        name: 'Processing & Refining',
        description:
          'Controls the mineral processing chain from run-of-mine ore to marketable concentrate or refined product. Each circuit is optimized for recovery, product quality, and energy efficiency — with real-time monitoring and AI-assisted process control.',
        capabilities: [
          {
            title: 'Comminution & Grinding',
            description:
              'Management of crushing and grinding circuits with online particle size analysis. Mill load and power draw optimization maintains target grind size while minimizing energy consumption. Liner wear tracking predicts replacement scheduling to avoid unplanned shutdowns.',
          },
          {
            title: 'Concentration & Separation',
            description:
              'Flotation, magnetic separation, and gravity concentration circuit management. Reagent dosing optimization using AI models that adjust to ore characteristics in real time. Recovery tracking against theoretical maximum identifies losses and opportunities for circuit optimization.',
          },
          {
            title: 'Product Quality Control',
            description:
              'Automated sampling and analysis of final concentrate with real-time grade tracking. Product specification compliance ensures that every shipment meets customer contractual requirements. Quality certificates generated automatically with laboratory data integration.',
          },
          {
            title: 'Tailings Management',
            description:
              'Tailings storage facility monitoring with dam stability analysis, water balance tracking, and environmental compliance. Dry stacking option evaluation for water recovery and closure cost reduction. Progressive rehabilitation planning for decommissioned tailings areas.',
          },
        ],
        cta: 'Explore Processing & Refining',
        icon: FlaskConical,
      },
      {
        label: 'LOGISTICS',
        name: 'Logistics & Export',
        description:
          'Coordinates the movement of mineral products from mine gate to customer port — rail scheduling, port terminal operations, and shipment tracking. For a land-linked operation, logistics efficiency is the difference between competitive and uncompetitive delivered pricing.',
        capabilities: [
          {
            title: 'Rail & Road Transport',
            description:
              'Scheduling and tracking of rail and road transport from mine to port. Consignment tracking with ETAs updated in real time. Demurrage management ensures rail cars and trucks are turned around within contracted time windows. Route optimization minimizes transport cost per tonne.',
          },
          {
            title: 'Port Terminal Operations',
            description:
              'Stockpile management at port terminals with blending capability to meet customer specifications. Ship loading scheduling coordinated with vessel arrivals and draft restrictions. Port authority integration for berth allocation and customs clearance.',
          },
          {
            title: 'Shipment Tracking',
            description:
              'End-to-end shipment tracking from port loading through ocean transit to customer discharge. AIS vessel tracking, estimated time of arrival updates, and proof-of-delivery documentation. Letters of credit and trade finance documentation generated automatically from shipment data.',
          },
          {
            title: 'Supply Chain Analytics',
            description:
              'Mine-to-customer cost analysis identifying logistics bottlenecks and cost reduction opportunities. Benchmarking against industry peers for transport cost per tonne, inventory carrying costs, and order-to-delivery cycle times. Scenario modeling for supply chain configuration changes.',
          },
        ],
        cta: 'Explore Logistics & Export',
        icon: Ship,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // AGRICULTURE — Precision Agriculture, IoT, Drones
  // Competitors: Aerobotics, CropX, Farmerline, Gro Intelligence
  // Modules focus on: terrain, precision, yield/market, carbon
  // Features: map terrain selection, PDF quote generation, WhatsApp
  // ─────────────────────────────────────────────────────────────
  agriculture: {
    headerLabel: 'Platform Modules',
    headerTitle: 'Harch Agri Platform',
    headerDescription:
      'From terrain selection to harvest — the precision agriculture platform that enables African farmers to make data-driven decisions. Includes map-based terrain analysis, IoT sensor integration, and direct market access tools like PDF quote generation and WhatsApp connectivity.',
    modules: [
      {
        label: 'TERRAIN',
        name: 'Terrain Intelligence',
        description:
          'Map-based terrain selection and soil analysis that enables farmers and investors to evaluate land before committing resources. Satellite imagery, soil databases, and topographic data are combined into actionable land capability assessments — the first step in any successful agricultural operation.',
        capabilities: [
          {
            title: 'Interactive Terrain Map',
            description:
              'Interactive map interface for browsing and selecting agricultural terrain. Satellite imagery with NDVI overlays, topographic contours, and soil type boundaries drawn from national soil surveys. Users can draw field boundaries directly on the map and receive instant land capability assessments including slope, drainage, and soil depth analysis.',
          },
          {
            title: 'Soil Composition Analysis',
            description:
              'Integration with national soil databases to provide chemical and physical soil properties for any location — pH, organic matter, CEC, texture, and salinity. For areas with limited data, spectral analysis from satellite imagery provides interpolated estimates with confidence intervals. Soil sampling recommendations guide ground-truth verification.',
          },
          {
            title: 'Climate & Water Availability',
            description:
              'Historical climate data (temperature, rainfall, evapotranspiration) and water resource mapping for each terrain parcel. Groundwater depth estimates, proximity to surface water, and irrigation infrastructure availability. Climate risk scoring for drought, flood, and heat stress based on 30-year historical records.',
          },
          {
            title: 'Land Use & Zoning',
            description:
              'Current and historical land use classification from satellite imagery. Zoning and regulatory compliance checks against agricultural land protection regulations. Customary land tenure mapping where formal registries are incomplete, reducing investment risk.',
          },
        ],
        cta: 'Explore Terrain Intelligence',
        icon: Map,
      },
      {
        label: 'PRECISION',
        name: 'Precision Operations',
        description:
          'IoT sensor networks, drone services, and variable-rate application tools that turn terrain data into field-level actions. This module bridges the gap between analysis and execution — ensuring that every input (water, fertilizer, crop protection) is applied at the right rate, in the right place, at the right time.',
        capabilities: [
          {
            title: 'IoT Sensor Network',
            description:
              'Deployment and management of wireless sensor networks measuring soil moisture at multiple depths, canopy temperature, humidity, and leaf wetness. Solar-powered nodes transmit data via LoRaWAN to the platform every 15 minutes. Anomaly detection alerts farmers to conditions that require immediate attention — frost risk, drought stress, or disease-favorable humidity.',
          },
          {
            title: 'Drone-as-a-Service',
            description:
              'On-demand drone flights for crop health surveys using multispectral and thermal imaging. NDVI maps, chlorophyll indices, and thermal stress maps delivered within 24 hours of flight. Automated flight planning ensures consistent coverage and resolution. Drone data integrates with variable-rate application maps for precision input management.',
          },
          {
            title: 'Variable Rate Application',
            description:
              'Prescription maps for variable-rate fertilizer, irrigation, and crop protection application. Maps are generated from soil sensor data, drone imagery, and yield history. Compatible with major precision agriculture equipment brands. Application records are stored for traceability and regulatory compliance.',
          },
          {
            title: 'Weather Integration',
            description:
              'Hyperlocal weather forecasting at field-level granularity — temperature, precipitation, wind speed, and solar radiation. Forecasts feed into disease risk models, spray scheduling recommendations, and harvest timing advisories. Weather stations on Harch Agri sites provide ground-truth data that improves forecast accuracy for surrounding areas.',
          },
        ],
        cta: 'Explore Precision Operations',
        icon: Drone,
      },
      {
        label: 'MARKET',
        name: 'Yield & Market Access',
        description:
          'Connects agricultural production to market outlets — with tools for yield estimation, quality grading, and direct buyer engagement. Includes PDF quote generation and WhatsApp integration that lets farmers send professional quotations to buyers directly from the platform, removing intermediaries who capture margin.',
        capabilities: [
          {
            title: 'Yield Estimation & Tracking',
            description:
              'In-season yield estimation using satellite imagery, crop models, and ground-truth sampling. Yield forecasts are updated weekly as the season progresses, enabling proactive marketing decisions. Post-harvest yield reconciliation against forecasts improves model accuracy for subsequent seasons.',
          },
          {
            title: 'PDF Quote Generation',
            description:
              'One-click generation of professional PDF quotations (devis) pre-filled with farmer details, product specifications, quantities, and pricing. Quotations are branded with the farmer\'s cooperative or company information and include payment terms and delivery logistics. No external software or design skills required — the platform handles formatting, numbering, and calculations automatically.',
          },
          {
            title: 'WhatsApp Business Integration',
            description:
              'Direct integration with WhatsApp Business API for sending quotations, order confirmations, and delivery notifications to buyers. Farmers can generate a PDF quote and send it via WhatsApp with a pre-filled message in one click — no email required, no file attachments to manage. Message templates ensure professional communication while preserving the personal relationship that drives African agricultural trade.',
          },
          {
            title: 'Market Price Intelligence',
            description:
              'Real-time commodity price feeds from local and international markets. Price comparison tools show the spread between farm-gate, wholesale, and export prices. Historical price trends and seasonal patterns help farmers time their sales for maximum revenue. Price alerts notify when target prices are reached.',
          },
        ],
        cta: 'Explore Yield & Market Access',
        icon: FileText,
      },
      {
        label: 'SUSTAINABILITY',
        name: 'Carbon & Sustainability',
        description:
          'Measures, verifies, and monetizes the environmental benefits of sustainable agricultural practices. From carbon credit generation to ESG reporting, this module ensures that sustainable farming is not just an ethical choice but an economically rewarded one.',
        capabilities: [
          {
            title: 'Carbon Credit Generation',
            description:
              'Quantification of soil carbon sequestration from regenerative practices — cover cropping, reduced tillage, and agroforestry. Remote sensing verification using satellite imagery reduces the cost of MRV (monitoring, reporting, verification) compared to traditional soil sampling. Carbon credit documentation meets Verra and Gold Standard requirements.',
          },
          {
            title: 'Land Use & Biodiversity',
            description:
              'Satellite-based monitoring of land use change and biodiversity indicators. Deforestation-free supply chain verification for commodity crops. Habitat connectivity assessments and pollinator corridor mapping support biodiversity credits and ESG reporting.',
          },
          {
            title: 'Water Footprint Tracking',
            description:
              'Calculation of green, blue, and grey water footprints per crop and per field. Comparison against benchmark water use efficiency for each crop and climate zone. Water stewardship certification support with documentation of water management practices and outcomes.',
          },
          {
            title: 'ESG Reporting',
            description:
              'Automated generation of ESG metrics for agricultural operations — carbon intensity per tonne, water use efficiency, biodiversity impact, and social metrics (employment, community investment). Reports aligned with GRI, SASB, and TCFD frameworks for investor and regulatory reporting.',
          },
        ],
        cta: 'Explore Carbon & Sustainability',
        icon: Leaf,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // WATER — Desalination & Water Treatment
  // Competitors: Veolia, Suez, IDE Technologies, ACCIONA, Metito
  // Modules focus on: desalination, treatment, distribution, planning
  // ─────────────────────────────────────────────────────────────
  water: {
    headerLabel: 'Platform Modules',
    headerTitle: 'Harch Water Platform',
    headerDescription:
      'The operational layer for desalination, water treatment, and distribution — managing water as the critical infrastructure resource it is. Every module is designed for water-scarce conditions where efficiency and reliability are non-negotiable.',
    modules: [
      {
        label: 'DESALINATION',
        name: 'Desalination Operations',
        description:
          'Controls seawater reverse osmosis (SWRO) plants with real-time membrane monitoring, energy recovery optimization, and product water quality assurance. This is the core production module — where seawater becomes drinking water at the lowest possible energy cost.',
        capabilities: [
          {
            title: 'Membrane Performance Tracking',
            description:
              'Real-time monitoring of membrane flux, rejection rate, and trans-membrane pressure for each pressure vessel. Normalized performance calculations account for temperature and salinity variations, enabling early detection of fouling and scaling before production is affected. Cleaning schedules are generated based on actual membrane condition rather than fixed intervals.',
          },
          {
            title: 'Energy Recovery Optimization',
            description:
              'Monitoring of energy recovery devices (ERDs) with real-time efficiency tracking. The system identifies ERD degradation and recommends maintenance before energy consumption increases. Specific energy consumption is tracked per train and per product volume, benchmarked against design specifications and industry best practices.',
          },
          {
            title: 'Intake & Pretreatment',
            description:
              'Seawater intake management including screening, dissolved air flotation, and dual-media filtration. Real-time turbidity, SDI (silt density index), and chlorophyll monitoring at the intake protect membranes from algal blooms and storm events. Automated diversion to waste when feed quality exceeds membrane tolerance limits.',
          },
          {
            title: 'Product Water Quality',
            description:
              'Continuous online monitoring of product water for TDS, pH, conductivity, boron, and disinfectant residual. Compliance with WHO drinking water guidelines and local standards. Automated blending and remineralization adjustment ensures consistent taste and corrosion control in the distribution network.',
          },
        ],
        cta: 'Explore Desalination Operations',
        icon: Droplets,
      },
      {
        label: 'TREATMENT',
        name: 'Treatment & Quality',
        description:
          'Manages water and wastewater treatment processes — from conventional treatment to advanced oxidation and biological nutrient removal. This module ensures that all water, whether produced from desalination or treated from surface sources, meets quality standards before reaching consumers.',
        capabilities: [
          {
            title: 'Treatment Process Control',
            description:
              'SCADA integration for real-time control of treatment processes — coagulation, flocculation, sedimentation, filtration, and disinfection. Chemical dosing optimization using online analyzer feedback maintains treatment efficiency while minimizing chemical consumption. Alarm management prioritizes process upsets by water quality impact.',
          },
          {
            title: 'Water Quality Monitoring',
            description:
              'Continuous monitoring of treated water quality at multiple points in the treatment chain. Online analyzers for turbidity, chlorine residual, pH, and conductivity with automated grab sampling for laboratory verification. Regulatory compliance dashboards show real-time status against permit limits.',
          },
          {
            title: 'Wastewater Treatment',
            description:
              'Biological treatment process management including activated sludge, MBR, and constructed wetlands. Nutrient removal optimization (nitrogen and phosphorus) to meet discharge standards. Sludge management tracking including thickening, dewatering, and disposal or beneficial reuse.',
          },
          {
            title: 'Laboratory Information Management',
            description:
              'Sample tracking from collection through analysis to result reporting with chain-of-custody documentation. Quality control protocols including blanks, duplicates, and spiked samples. Regulatory reporting generated automatically from laboratory data with trend analysis and exception flagging.',
          },
        ],
        cta: 'Explore Treatment & Quality',
        icon: TestTube,
      },
      {
        label: 'DISTRIBUTION',
        name: 'Distribution Networks',
        description:
          'Manages the pipeline infrastructure that delivers water from production to consumption — including leak detection, pressure management, and demand monitoring. In water-scarce regions, every liter lost to leakage is a liter that did not need to be produced.',
        capabilities: [
          {
            title: 'Pipeline Monitoring',
            description:
              'Real-time monitoring of flow, pressure, and quality at critical points in the distribution network. Hydraulic model integration enables simulation of network behavior under different demand scenarios. Pipe condition assessment using acoustic monitoring and pressure transient analysis identifies pipes at risk of failure.',
          },
          {
            title: 'Leak Detection & NRW',
            description:
              'District metered area (DMA) analysis for non-revenue water quantification. Night flow analysis identifies background leakage levels. Acoustic leak noise logging and satellite-based leak detection pinpoint leak locations for targeted repair. NRW reduction programs tracked with before/after measurement.',
          },
          {
            title: 'Pressure Management',
            description:
              'Pressure reducing valve management and modulating pressure control to minimize leakage while maintaining adequate service levels. Time-based and flow-based pressure modulation reduces pipe stress during low-demand periods. Burst frequency reduction demonstrated through before/after analysis.',
          },
          {
            title: 'Demand Monitoring & Forecasting',
            description:
              'Real-time demand monitoring by zone with short-term and seasonal forecasting. Demand forecasting incorporates weather, holiday patterns, and economic activity. Production scheduling optimization ensures desalination and treatment plants operate at the most energy-efficient output levels while meeting demand.',
          },
        ],
        cta: 'Explore Distribution Networks',
        icon: Waves,
      },
      {
        label: 'PLANNING',
        name: 'Resource Planning',
        description:
          'Long-term water resource management at the basin scale — integrating climate projections, demand growth, and infrastructure investment planning. This module ensures that today\'s infrastructure decisions account for tomorrow\'s water reality.',
        capabilities: [
          {
            title: 'Demand Forecasting',
            description:
              'Long-term water demand projections by sector — domestic, industrial, agricultural — using population growth, economic development, and climate scenarios. Demand scenarios feed into infrastructure investment planning with probabilistic ranges that account for uncertainty.',
          },
          {
            title: 'Watershed Management',
            description:
              'Integration of hydrological models, rainfall data, and land use maps for watershed-scale planning. Surface water availability projections under climate change scenarios. Groundwater recharge assessment and sustainable extraction limits. Watershed protection monitoring using satellite imagery.',
          },
          {
            title: 'Climate Adaptation',
            description:
              'Climate scenario analysis for water infrastructure resilience — drought frequency, extreme rainfall, sea level rise, and temperature impacts on water demand. Adaptation pathway planning identifies no-regret investments that perform well across multiple climate scenarios.',
          },
          {
            title: 'Infrastructure Investment Planning',
            description:
              'Capital investment planning for new production capacity, network expansion, and asset renewal. Life-cycle cost analysis compares desalination, water reuse, and demand management options. Investment scenarios optimized for cost, resilience, and environmental impact.',
          },
        ],
        cta: 'Explore Resource Planning',
        icon: CloudRain,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // FINANCE — Green Bonds, Project Finance, Islamic Finance
  // Competitors: Standard Chartered, IsDB, AFC, Citi, ICD
  // Modules focus on: capital, risk, trade, impact
  // ─────────────────────────────────────────────────────────────
  finance: {
    headerLabel: 'Platform Modules',
    headerTitle: 'Harch Finance Platform',
    headerDescription:
      'The financial infrastructure for sovereign infrastructure development — from green bond structuring to Islamic finance compliance. Each module serves a distinct function in the capital lifecycle, ensuring that Harch Corp\'s projects are funded efficiently, compliantly, and transparently.',
    modules: [
      {
        label: 'CAPITAL',
        name: 'Capital Formation',
        description:
          'Structures and manages the full spectrum of financing instruments — green bonds, project finance, sukuk, and impact investment vehicles. This module ensures that each project accesses the optimal capital mix at the lowest cost of capital, while meeting the specific requirements of each funding source.',
        capabilities: [
          {
            title: 'Green Bond Structuring',
            description:
              'End-to-end green bond management — from framework development aligned with ICMA Green Bond Principles, through second-party opinion coordination, to proceeds allocation tracking and impact reporting. The module maintains the green bond register and ensures that all proceeds are allocated to eligible projects within the mandated timeframe.',
          },
          {
            title: 'Project Finance',
            description:
              'Non-recourse and limited-recourse project finance structuring for infrastructure projects. Financial model management with sensitivity analysis, debt sculpting, and covenant tracking. Lender communication workflows, condition precedent management, and drawdown scheduling integrated with construction milestones.',
          },
          {
            title: 'Islamic Finance (Sukuk)',
            description:
              'Sharia-compliant financing structures including sukuk al-ijara, sukuk al-mudaraba, and sukuk al-musharaka. Sharia board coordination, asset-backing verification, and profit distribution calculations. Compliance documentation for AAOIFI standards and local regulatory requirements.',
          },
          {
            title: 'Impact Investment Vehicles',
            description:
              'Blended finance structures combining concessional capital from development finance institutions with commercial investment. Impact measurement frameworks aligned with IFC Operating Principles for Impact Management. Social and environmental return tracking alongside financial returns.',
          },
        ],
        cta: 'Explore Capital Formation',
        icon: Landmark,
      },
      {
        label: 'RISK',
        name: 'Risk Intelligence',
        description:
          'Comprehensive risk management across credit, market, operational, and climate risk dimensions. In infrastructure finance, risk is not something to be eliminated — it is something to be understood, quantified, and priced. This module ensures that every risk is visible and every decision is risk-informed.',
        capabilities: [
          {
            title: 'Credit Risk Assessment',
            description:
              'Counterparty credit scoring for project sponsors, offtakers, and guarantors. Probability of default and loss given default models calibrated for African infrastructure markets. Exposure monitoring with concentration limits and early warning indicators for credit deterioration.',
          },
          {
            title: 'Market Risk Management',
            description:
              'Interest rate, foreign exchange, and commodity price risk monitoring across the portfolio. Value-at-risk calculations with stress testing for extreme scenarios. Hedge accounting documentation and derivative counterparty exposure management.',
          },
          {
            title: 'Climate Risk Stress Testing',
            description:
              'Physical and transition climate risk assessment for infrastructure assets. Scenario analysis aligned with TCFD recommendations — from orderly transition to hot house world. Asset-level vulnerability scoring for floods, drought, heat stress, and sea level rise.',
          },
          {
            title: 'Operational Risk & Compliance',
            description:
              'Operational risk event tracking with loss database and root cause analysis. Key risk indicators monitored against thresholds. Regulatory compliance management for banking, securities, and insurance regulations across multiple African jurisdictions.',
          },
        ],
        cta: 'Explore Risk Intelligence',
        icon: TrendingUp,
      },
      {
        label: 'TRADE',
        name: 'Trade Finance',
        description:
          'Manages the trade finance instruments that enable cross-border infrastructure procurement — letters of credit, bank guarantees, and supply chain finance. For projects importing equipment from Europe and Asia, trade finance is the bridge between contract signature and physical delivery.',
        capabilities: [
          {
            title: 'Letters of Credit',
            description:
              'Issuance and management of documentary letters of credit for equipment procurement and construction contracts. SWIFT integration for LC issuance, amendment, and presentation checking. Compliance with UCP 600 and ISP98 rules. Tracking of LC expiry, presentation deadlines, and drawing status.',
          },
          {
            title: 'Bank Guarantees',
            description:
              'Management of performance bonds, advance payment guarantees, and retention guarantees across the project portfolio. Guarantee issuance, tracking, and release workflows. Counter-guarantee management for multi-jurisdictional projects. Guarantee exposure reporting by beneficiary and by project.',
          },
          {
            title: 'Supply Chain Finance',
            description:
              'Reverse factoring programs for key suppliers and subcontractors. Early payment at discounted rates improves supplier liquidity while reducing supply chain risk. Integration with procurement and accounts payable systems for automated eligibility and payment processing.',
          },
          {
            title: 'FX & Treasury',
            description:
              'Foreign exchange risk management for multi-currency project cash flows. Natural hedging identification, forward contract management, and currency exposure reporting. Cash pooling and intercompany lending within the Harch Corp group optimized for tax efficiency and regulatory compliance.',
          },
        ],
        cta: 'Explore Trade Finance',
        icon: Banknote,
      },
      {
        label: 'IMPACT',
        name: 'Impact & Reporting',
        description:
          'Tracks and reports the environmental, social, and governance impact of every financed project — from green bond proceeds allocation to carbon credit verification. In an era of ESG scrutiny, this module ensures that Harch Finance\'s claims are backed by auditable data.',
        capabilities: [
          {
            title: 'ESG Performance Tracking',
            description:
              'Automated collection and aggregation of ESG metrics across the Harch Corp portfolio. Environmental metrics include carbon avoided, renewable capacity financed, and water access provided. Social metrics track employment created, community investment, and local procurement. Governance metrics cover board diversity, compliance incidents, and whistleblower reports.',
          },
          {
            title: 'Proceeds Allocation Reporting',
            description:
              'Green bond and sukuk proceeds allocation tracking with project-level granularity. Each dollar is traced from investor subscription to eligible project expenditure. Allocation reports generated quarterly with independent verification. Impact metrics calculated per allocated dollar for investor communication.',
          },
          {
            title: 'Carbon Credit Verification',
            description:
              'Verification and certification of carbon credits generated by Harch Corp\'s renewable energy and forestry projects. Project design documents, monitoring reports, and verification statements managed in a single platform. Credit issuance tracking with registry integration for Verra, Gold Standard, and CDM.',
          },
          {
            title: 'Investor Reporting',
            description:
              'Automated investor reporting with customizable dashboards showing portfolio performance, impact metrics, and risk indicators. Quarterly investor letters generated from template with live data. Data room management for due diligence with secure document sharing and access logging.',
          },
        ],
        cta: 'Explore Impact & Reporting',
        icon: FileCheck,
      },
    ],
  },
};

// ═══════════════════════════════════════════════════════════════
// Capability Card — Palantir-style numbered, bordered, text-driven
// ═══════════════════════════════════════════════════════════════
function CapabilityCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div
      className="border-b pb-5"
      style={{ borderColor: DIVIDER }}
    >
      <div className="flex items-baseline gap-3 mb-2">
        <span className="text-[11px] font-mono text-white/20 tracking-wider">{number}</span>
        <h4 className="text-[15px] font-semibold text-white/85 leading-snug">{title}</h4>
      </div>
      <p className="text-[13px] text-white/35 leading-relaxed pl-7">{description}</p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Module Section — one product per section, Palantir-style
// ═══════════════════════════════════════════════════════════════
function ModuleSection({
  moduleConfig,
  index,
  accent,
}: {
  moduleConfig: ModuleConfig;
  index: number;
  accent: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const IconComponent = moduleConfig.icon;

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="py-16 md:py-24"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Left column: Product header */}
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-8 h-8 rounded flex items-center justify-center"
              style={{ backgroundColor: `${accent}15`, border: `1px solid ${accent}30` }}
            >
              <IconComponent size={16} className="opacity-70" />
            </div>
            <span className="text-[11px] font-mono text-white/20 tracking-[0.15em] uppercase">
              {String(index + 1).padStart(2, '0')} — {moduleConfig.label}
            </span>
          </div>
          <h3 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white tracking-tight mb-4 leading-[1.1]">
            {moduleConfig.name}
          </h3>
          <p className="text-[14px] text-white/45 leading-[1.7] mb-6">
            {moduleConfig.description}
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[13px] font-medium hover:text-white/90 transition-colors group"
            style={{ color: `${accent}CC` }}
          >
            {moduleConfig.cta}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Right column: Capabilities */}
        <div className="md:col-span-7">
          <span className="text-[11px] font-mono text-white/20 tracking-[0.15em] uppercase block mb-5">
            Capabilities
          </span>
          <div className="space-y-5">
            {moduleConfig.capabilities.map((cap, i) => (
              <CapabilityCard
                key={i}
                number={String(i + 1).padStart(2, '0')}
                title={cap.title}
                description={cap.description}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

// ═══════════════════════════════════════════════════════════════
// WhatsApp Integration Button — for agriculture module
// ═══════════════════════════════════════════════════════════════
function WhatsAppCTA() {
  const handleClick = useCallback(() => {
    const message = encodeURIComponent(
      'Bonjour, je souhaite recevoir un devis pour vos services agricoles. Merci.'
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  }, []);

  return (
    <button
      onClick={handleClick}
      className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded text-[13px] font-medium transition-all hover:opacity-90"
      style={{
        backgroundColor: 'rgba(37, 211, 102, 0.12)',
        border: '1px solid rgba(37, 211, 102, 0.25)',
        color: 'rgba(37, 211, 102, 0.85)',
      }}
    >
      <MessageCircle size={15} />
      Envoyer un devis via WhatsApp
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════
// PDF Quote Generation Button — for agriculture module
// ═══════════════════════════════════════════════════════════════
function PDFQuoteCTA() {
  const [generating, setGenerating] = useState(false);

  const handleClick = useCallback(() => {
    setGenerating(true);
    // In production, this would call an API endpoint to generate the PDF
    setTimeout(() => {
      setGenerating(false);
    }, 1500);
  }, []);

  return (
    <button
      onClick={handleClick}
      className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded text-[13px] font-medium transition-all hover:opacity-90"
      style={{
        backgroundColor: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.12)',
        color: 'rgba(255,255,255,0.7)',
      }}
      disabled={generating}
    >
      <FileText size={15} />
      {generating ? 'Génération en cours...' : 'Générer un devis PDF'}
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════
export function InteractivePlatform({ slug, accent }: InteractivePlatformProps) {
  const config = SUBSIDIARY_CONFIGS[slug];

  // Fallback: if no specific config exists, use a generic one
  if (!config) {
    return (
      <div className="w-full bg-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-20">
          <p className="text-white/40 text-[14px]">Platform modules for this subsidiary are being configured.</p>
        </div>
      </div>
    );
  }

  // Professional accent color per subsidiary (muted, not fluorescent)
  const accentColor = accent || '#8B9DAF';

  return (
    <div className="w-full bg-[#0A0A0A]">
      {/* Section header */}
      <div className="border-b" style={{ borderColor: DIVIDER }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-20">
          <span className="text-[11px] font-mono text-white/20 tracking-[0.2em] uppercase block mb-4">
            {config.headerLabel}
          </span>
          <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold text-white tracking-tight leading-[1.05] mb-5 max-w-3xl">
            {config.headerTitle}
          </h2>
          <p className="text-[15px] text-white/40 leading-[1.7] max-w-2xl">
            {config.headerDescription}
          </p>
        </div>
      </div>

      {/* Product modules */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {config.modules.map((moduleConfig, index) => (
          <React.Fragment key={moduleConfig.name}>
            {index > 0 && (
              <div className="h-[1px] w-full" style={{ backgroundColor: DIVIDER }} />
            )}
            <ModuleSection
              moduleConfig={moduleConfig}
              index={index}
              accent={accentColor}
            />
          </React.Fragment>
        ))}

        {/* Agriculture-specific action buttons */}
        {slug === 'agriculture' && (
          <div className="pb-16 flex flex-wrap gap-3">
            <PDFQuoteCTA />
            <WhatsAppCTA />
          </div>
        )}
      </div>

      {/* Bottom border */}
      <div className="h-[1px] w-full" style={{ backgroundColor: DIVIDER }} />
    </div>
  );
}
