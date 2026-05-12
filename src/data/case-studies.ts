export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  type: string;
  client: string;
  location: string;
  duration: string;
  heroImage: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string; change?: string }[];
  timeline: { phase: string; months: string; desc: string }[];
  metrics: { metric: string; before: string; after: string }[];
  quote: { text: string; author: string; title: string; org: string };
  tags: string[];
}

export const caseStudies: CaseStudy[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // CASE STUDY 1: Tanger Cement — Predictive Maintenance
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: 'tanger-cement-predictive-maintenance',
    title: 'Predictive Maintenance at Tanger Cement',
    subtitle: 'How Harch Cement reduced energy consumption by 20% and increased uptime by 15% using AI-driven predictive maintenance',
    type: 'Industrial',
    client: 'Tanger Cement S.A.',
    location: 'Tanger, Morocco',
    duration: '18 months (Jan 2025 - Jun 2026)',
    heroImage: '/images/sections/cement-kiln.jpg',
    challenge: `Tanger Cement S.A. operates one of North Africa's largest cement manufacturing complexes, producing 1.2 million tonnes annually across two production lines. Despite decades of operational experience, the facility faced two systemic problems that traditional engineering approaches could not solve.

The first was unplanned downtime. Cement kiln operations involve extreme temperatures — rotary kilns operate continuously at 1,450°C, and a single unscheduled shutdown costs approximately $180,000 per hour in lost production, emergency repairs, and restart fuel consumption. Tanger Cement's historical unplanned downtime rate stood at 8.3% of total operating hours, significantly above the industry benchmark of 4.5%. The root causes were predictable in hindsight but invisible in real time: bearing degradation in the rotary kiln's support rollers, refractory lining erosion that progressed asymmetrically, and electrical insulation breakdown in the 12MW main drive motors. Traditional maintenance followed a time-based schedule — inspect every 6,000 hours, replace components on fixed intervals — which meant that some failures occurred between inspections while other components were replaced prematurely, wasting both money and production time.

The second problem was energy consumption. Cement manufacturing is among the most energy-intensive industrial processes on Earth, and Tanger Cement's energy consumption ran 23% above the global best-practice benchmark. The primary driver was suboptimal kiln operation: clinker quality depends on maintaining precise temperature profiles across the kiln's 60-meter length, but the manual control system could not respond fast enough to the continuous variation in raw material composition, moisture content, and fuel quality. Operators made adjustments based on experience and intuition, which inevitably lagged behind the process dynamics. The result was over-firing — burning 23% more fuel than necessary to maintain a safety margin above the minimum clinkering temperature. This excess fuel consumption translated to an additional $3.8 million in annual energy costs and 12,000 tonnes of unnecessary CO2 emissions.

The cumulative impact was severe. Unplanned downtime and excess energy consumption together cost Tanger Cement over $8 million annually. Maintenance teams operated in a perpetual reactive mode, and production planning was compromised by the inability to predict equipment availability with any confidence. The company's board authorized a comprehensive digital transformation initiative in late 2024, seeking a partner that could deliver both predictive maintenance and real-time process optimization within a single integrated platform.`,
    solution: `Harch Corp proposed a comprehensive HarchOS AI deployment designed specifically for Tanger Cement's operational environment. The solution architecture addressed both problems simultaneously through four integrated layers.

The first layer was a dense sensor network. Over the course of three months, Harch engineers installed 2,400 IoT sensors across both production lines — vibration sensors on every rotating component (kiln rollers, mill bearings, fan shafts), thermal sensors embedded in the kiln shell at 50-meter intervals, acoustic emission sensors on the refractory lining, power quality monitors on all major electrical drives, and process sensors measuring temperature, pressure, flow rate, and chemical composition at 142 critical process points. Each sensor transmits data at 100Hz to edge computing nodes positioned throughout the facility, which perform initial signal processing and anomaly detection before forwarding aggregated data to the central HarchOS platform. The sensor network generates approximately 1.2 terabytes of raw data per day.

The second layer was predictive model training. HarchOS ingested 18 months of Tanger Cement's historical operational data — production logs, maintenance records, sensor archives, energy consumption profiles, and quality control reports. Machine learning engineers trained ensemble models combining gradient-boosted decision trees for component failure prediction, recurrent neural networks for temporal pattern recognition in kiln temperature profiles, and Bayesian optimization models for real-time process parameter tuning. The predictive models were validated against a held-out test set comprising the final three months of historical data, achieving 99.7% accuracy in predicting critical equipment failures with a 72-hour lead time and 96.2% accuracy in identifying suboptimal kiln operating conditions.

The third layer was real-time kiln optimization. The HarchOS platform continuously ingests live sensor data and adjusts kiln operating parameters — fuel feed rate, primary air flow, secondary air temperature, kiln rotational speed, and raw meal feed rate — through closed-loop control interfaces integrated with Tanger Cement's existing DCS system. The optimization algorithm maintains clinker quality within specification while minimizing fuel consumption, effectively eliminating the over-firing safety margin that drove excess energy use. The system makes approximately 200 control adjustments per hour, far exceeding the 15-20 adjustments that experienced operators could manage manually.

The fourth layer was a digital twin of the entire production line — a physics-based simulation model that mirrors real-time plant operations and allows HarchOS to evaluate the downstream impact of any control action before executing it. The digital twin runs 15 minutes ahead of real time, testing multiple optimization scenarios in parallel and selecting the one that maximizes clinker quality while minimizing energy consumption and equipment stress. It also serves as a training environment for the predictive models, generating synthetic failure scenarios that accelerate model improvement without risking actual production.`,
    results: [
      { label: 'Energy Consumption', value: '-20%', change: 'Reduced' },
      { label: 'Uptime', value: '+15%', change: 'Improved' },
      { label: 'Annual Savings', value: '$4.2M', change: 'Delivered' },
      { label: 'Prediction Accuracy', value: '99.7%', change: 'Achieved' },
      { label: 'IoT Sensors', value: '2,400', change: 'Deployed' },
    ],
    timeline: [
      {
        phase: 'Phase 1: Sensor Deployment',
        months: 'Months 1-3',
        desc: 'Installation of 2,400 IoT sensors across both production lines. Edge computing node deployment. Network infrastructure buildout. Baseline data collection initiated. Zero disruption to ongoing production through carefully sequenced installation windows during scheduled maintenance periods.',
      },
      {
        phase: 'Phase 2: Model Training',
        months: 'Months 4-8',
        desc: 'Ingestion and processing of 18 months of historical operational data. Training of predictive failure models, kiln optimization algorithms, and digital twin simulation. Model validation against held-out test data. Integration testing with existing DCS systems. First predictive alerts delivered to maintenance teams in Month 6.',
      },
      {
        phase: 'Phase 3: Predictive Rollout',
        months: 'Months 9-14',
        desc: 'Gradual activation of predictive maintenance alerts across all critical equipment. Transition from time-based to condition-based maintenance scheduling. Kiln optimization system activated in advisory mode — providing recommendations to operators who validate before execution. First measurable energy savings confirmed in Month 11. Maintenance team training and workflow integration.',
      },
      {
        phase: 'Phase 4: Full Optimization',
        months: 'Months 15-18',
        desc: 'Closed-loop kiln optimization activated — HarchOS executes control adjustments automatically within defined safety constraints. Digital twin deployed for scenario planning and what-if analysis. Full predictive maintenance coverage across all 2,400 sensor nodes. Performance guarantees validated by independent auditors. Knowledge transfer to Tanger Cement operations team.',
      },
    ],
    metrics: [
      { metric: 'Unplanned Downtime', before: '8.3%', after: '2.1%' },
      { metric: 'Energy per Tonne Clinker', before: '3.92 GJ/t', after: '3.14 GJ/t' },
      { metric: 'Annual Energy Cost', before: '$18.6M', after: '$14.8M' },
      { metric: 'Predictive Alert Lead Time', before: '0 hours (reactive)', after: '72 hours' },
      { metric: 'Kiln Control Adjustments/Hour', before: '15-20 (manual)', after: '200 (automated)' },
      { metric: 'Maintenance Cost', before: '$6.2M/yr', after: '$4.1M/yr' },
      { metric: 'Clinker Quality Variance', before: '+/- 8.3%', after: '+/- 2.1%' },
      { metric: 'Annual CO2 Emissions', before: '52,000 t', after: '40,000 t' },
    ],
    quote: {
      text: 'We spent twenty years fighting fires — literally and figuratively. Every shutdown was a crisis, every restart a gamble. HarchOS changed the equation entirely. Now we know what is going to fail, when it is going to fail, and what to do about it — seventy-two hours before it happens. Our maintenance teams have shifted from reactive firefighters to strategic planners. The energy savings were the headline number, but the operational peace of mind is the real value.',
      author: 'Ahmed Benali',
      title: 'VP Operations',
      org: 'Tanger Cement S.A.',
    },
    tags: ['Predictive Maintenance', 'Industrial AI', 'Cement Manufacturing', 'IoT Sensors', 'Energy Optimization', 'HarchOS'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CASE STUDY 2: West African Alliance — Sovereign Data Infrastructure
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: 'west-african-alliance-sovereign-infrastructure',
    title: 'Sovereign Data Infrastructure for West African Alliance',
    subtitle: '100% data localization and secure communications for 5 West African nations',
    type: 'Government',
    client: 'West African Economic & Monetary Alliance (WAEMA)',
    location: 'Dakar, Senegal (Primary Hub)',
    duration: '24 months (Mar 2024 - Feb 2026)',
    heroImage: '/images/sections/intelligence-exterior.jpg',
    challenge: `The West African Economic & Monetary Alliance — a coalition of five nations comprising Senegal, Mali, Burkina Faso, Cote d'Ivoire, and Guinea — faced a sovereignty crisis that existed in plain sight but received almost no policy attention: the complete absence of sovereign data infrastructure.

The scale of the dependency was staggering. Ninety-four percent of government data across the five member states was processed on foreign servers — primarily in France, the United States, and the United Arab Emirates. Every tax record, every census dataset, every military communication, every diplomatic cable passed through infrastructure controlled by foreign corporations subject to foreign laws. The implications were not theoretical. Under the U.S. CLOUD Act, American cloud providers can be compelled to disclose data stored on their servers regardless of where the data center is physically located. Under French intelligence law, DGSE can intercept data transiting French networks without judicial authorization. The five WAEMA nations had zero legal recourse if a foreign government accessed their data through these mechanisms.

The operational consequences were equally severe. Inter-governmental communications between the five capitals relied on commercial email services and messaging platforms with no end-to-end encryption at the server level. Diplomatic correspondence between Bamako and Ouagadougou transited through data centers in Paris. Military coordination between Dakar and Conakry depended on infrastructure that could be disrupted by a corporate service outage in Virginia. There was no secure, sovereign channel for classified communication between the five governments.

The economic dimension compounded the problem. The five nations collectively spent $340 million annually on foreign cloud services — money that left the regional economy entirely and created no local technical capability. No domestic data center workforce was being developed. No local technology ecosystem was being nurtured. The dependency was not merely expensive; it was self-reinforcing, as the absence of local infrastructure made foreign services the only viable option, which further prevented local infrastructure from being built.

In early 2024, the WAEMA heads of state convened an emergency summit and authorized the creation of a sovereign data infrastructure program. The requirements were absolute: all government data must be processed and stored within the geographic boundaries of the five member states. All inter-governmental communications must be encrypted end-to-end with keys controlled exclusively by the participating nations. The infrastructure must be operated by local engineers, governed by local law, and immune to foreign legal compulsion. Harch Corp was selected as the prime contractor following a competitive evaluation of seven international bidders.`,
    solution: `Harch Corp designed and deployed a comprehensive sovereign data infrastructure — HarchOS Sovereign Cloud — built on three foundational principles: data localization, cryptographic sovereignty, and operational independence.

The infrastructure layer consists of three regional data centers strategically positioned across the WAEMA member states. The primary hub, a 12MW facility in Dakar, Senegal, serves as the central processing and storage node, equipped with 480 GPU compute nodes for sovereign AI workloads and 8 petabytes of encrypted storage. The secondary hub, an 8MW facility in Abidjan, Cote d'Ivoire, provides redundant compute capacity and serves as the disaster recovery site for the primary hub. The tertiary hub, a 4MW facility in Ouagadougou, Burkina Faso, extends sovereign compute to the landlocked member states and provides geographic diversity for data resilience. All three facilities are powered by Harch Energy's renewable generation pipeline, ensuring that the sovereign cloud is also carbon-neutral.

The network layer connects the five capitals through an encrypted mesh network operating over dedicated fiber optic links leased from regional telecommunications providers and supplemented by Harch Technology's satellite communications backbone. The mesh topology ensures that no single point of failure can isolate any capital from the others. Inter-capital latency averages less than 8 milliseconds — faster than many intra-European connections — enabling real-time secure video conferencing, collaborative document editing, and synchronized database replication between government ministries. The network operates on a zero-trust architecture: every data packet is encrypted at the source, authenticated at every hop, and decrypted only at the intended destination. Quantum-resistant cryptographic algorithms (CRYSTALS-Kyber for key encapsulation and CRYSTALS-Dilithium for digital signatures) protect all communications against future quantum computing attacks.

The platform layer runs HarchOS Sovereign Cloud, a purpose-built operating system for government workloads. The platform provides sovereign AI models trained exclusively on African data and optimized for the five nations' administrative, legal, and linguistic contexts — including support for Wolof, Bambara, Dyula, and French across all government application interfaces. Sovereign language models enable automated document processing, translation between member state languages, and intelligent classification of government correspondence without any data leaving the mesh network. The platform also includes secure email with end-to-end encryption, classified document management with multi-level access controls, and a sovereign identity system that authenticates government users without relying on any foreign identity provider.

The zero-knowledge architecture ensures that even Harch Corp's own engineers cannot access government data. All data at rest is encrypted with keys held exclusively by the WAEMA member states. All data in transit is encrypted with session keys negotiated directly between endpoints. Harch Corp provides the infrastructure and the platform; the data and the keys remain under the absolute control of the five governments. This architectural decision was non-negotiable from the client's perspective and fundamental to the project's sovereignty guarantees.`,
    results: [
      { label: 'Data Localization', value: '100%', change: 'Achieved' },
      { label: 'Nations Connected', value: '5', change: 'Unified' },
      { label: 'Inter-Capital Latency', value: '<8ms', change: 'Optimized' },
      { label: 'Security Breaches', value: '0', change: 'Maintained' },
      { label: 'Daily Processing', value: '12TB', change: 'Operational' },
    ],
    timeline: [
      {
        phase: 'Phase 1: Site Preparation',
        months: 'Months 1-6',
        desc: `Site selection, acquisition, and preparation for all three data center locations. Environmental assessments and regulatory approvals across three jurisdictions. Power infrastructure buildout, including dedicated renewable energy connections from Harch Energy's grid. Physical security installation — biometric access controls, electromagnetic shielding, and Tempest-grade communications security. Recruitment of 120 local engineers for operations training program.`,
      },
      {
        phase: 'Phase 2: Hardware Deployment',
        months: 'Months 7-12',
        desc: 'Installation of compute, storage, and networking equipment across all three facilities. GPU cluster deployment and integration testing. Fiber optic link activation between Dakar, Abidjan, and Ouagadougou. Satellite communications backbone installation for backup connectivity. Initial data migration planning and secure transfer protocol development. Commissioning of uninterruptible power systems and diesel backup generators.',
      },
      {
        phase: 'Phase 3: Network & Security',
        months: 'Months 13-18',
        desc: 'Encrypted mesh network activation connecting all five capitals. Quantum-resistant cryptographic protocol deployment. HarchOS Sovereign Cloud platform installation and configuration. Security penetration testing by independent auditors. Sovereign AI model deployment — language models, document processing, and classification systems. Secure email and classified document management system rollout. First inter-governmental secure communications established in Month 15.',
      },
      {
        phase: 'Phase 4: Full Operations',
        months: 'Months 19-24',
        desc: 'Complete government data migration from foreign cloud providers to sovereign infrastructure. All five nations operational on the mesh network. Full workload migration — tax processing, census data management, military communications, diplomatic correspondence. Performance validation and optimization. Independent security audit confirming zero-knowledge architecture integrity. Knowledge transfer and operational handover to WAEMA technical teams. Ongoing support contract activated with 99.99% uptime SLA.',
      },
    ],
    metrics: [
      { metric: 'Government Data on Sovereign Infrastructure', before: '6%', after: '100%' },
      { metric: 'Inter-Capital Communication Latency', before: '47ms (commercial)', after: '<8ms (mesh)' },
      { metric: 'Annual Foreign Cloud Spend', before: '$340M', after: '$0' },
      { metric: 'Encrypted Government Communications', before: '0 channels', after: '2,400 channels' },
      { metric: 'Local Data Center Workforce', before: '0 engineers', after: '240 engineers' },
      { metric: 'Data Center Uptime', before: 'N/A (foreign)', after: '99.997%' },
      { metric: 'Sovereign AI Model Accuracy', before: 'N/A', after: '94.3%' },
      { metric: 'Annual CO2 from Data Operations', before: '28,000t (foreign)', after: '0t (renewable)' },
    ],
    quote: {
      text: 'For decades, our most sensitive government data — tax records, military communications, diplomatic cables — was processed on servers we did not own, in jurisdictions we did not control, subject to laws we did not write. We were sovereign in theory but dependent in practice. Harch Corp changed that. Today, every byte of WAEMA government data is processed, stored, and transmitted on infrastructure that we control, under laws that we enact, operated by engineers we trained. The latency between Dakar and Ouagadougou is now faster than between Paris and London. Zero security breaches in fourteen months of operation. This is what digital sovereignty looks like.',
      author: 'General Oumar Diallo',
      title: 'Director of Digital Infrastructure',
      org: 'WAEMA',
    },
    tags: ['Sovereign Infrastructure', 'Data Localization', 'Government Cloud', 'Quantum-Resistant Encryption', 'Mesh Network', 'HarchOS'],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find(cs => cs.slug === slug);
}
