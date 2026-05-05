'use client';

import { useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, BookOpen } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }} transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

interface GlossaryTerm {
  term: string;
  definition: string;
  letter: string;
}

const glossaryTerms: GlossaryTerm[] = [
  // A
  { term: 'AI Inference', definition: 'The process of running trained machine learning models to generate predictions, classifications, or outputs from new input data. Inference workloads are typically latency-sensitive and require optimized GPU or TPU hardware.', letter: 'A' },
  { term: 'API', definition: 'Application Programming Interface. A set of protocols and tools that allow software applications to communicate with each other. REST and gRPC are common API paradigms used in cloud infrastructure.', letter: 'A' },
  { term: 'Air-Gapped', definition: 'A security measure where a computer or network is physically isolated from unsecured networks, including the internet. Used in military, financial, and critical infrastructure environments where data must never leave the perimeter.', letter: 'A' },
  // C
  { term: 'Cloud Computing', definition: 'The delivery of computing services — servers, storage, databases, networking, software — over the internet ("the cloud") rather than on local hardware. Models include IaaS, PaaS, and SaaS.', letter: 'C' },
  { term: 'Compute', definition: 'The processing power provided by CPUs, GPUs, or TPUs that runs applications, models, and workloads. Compute is measured in FLOPS, vCPUs, or GPU-hours and is the fundamental resource of any cloud platform.', letter: 'C' },
  { term: 'Containerization', definition: 'Packaging an application with its dependencies into a standardized unit (container) that runs consistently across any environment. Docker and Kubernetes are the dominant containerization and orchestration technologies.', letter: 'C' },
  // D
  { term: 'Data Center', definition: 'A dedicated facility housing computer systems, storage, networking equipment, and power/cooling infrastructure. Modern hyperscale data centers consume 20–100MW and serve as the physical backbone of cloud computing.', letter: 'D' },
  { term: 'Data Sovereignty', definition: 'The concept that data is subject to the laws and regulations of the country in which it is collected or processed. Sovereign cloud ensures data never leaves national borders — critical for government, healthcare, and financial sectors.', letter: 'D' },
  { term: 'DPA', definition: 'Data Processing Agreement. A legally binding contract between a data controller and a data processor that governs how personal data is handled, stored, and protected. Required under GDPR for any third-party data processing.', letter: 'D' },
  // E
  { term: 'Edge Computing', definition: 'Processing data closer to the source of generation (e.g., IoT devices, sensors) rather than in a centralized data center. Reduces latency, conserves bandwidth, and enables real-time decision-making for remote or mobile applications.', letter: 'E' },
  { term: 'ESG', definition: 'Environmental, Social, and Governance. A framework for evaluating a company\'s sustainability and societal impact. In infrastructure, ESG metrics include carbon intensity, water usage, community investment, and board diversity.', letter: 'E' },
  { term: 'Egress', definition: 'Data flowing out of a cloud network to the internet or another network. Cloud providers typically charge for egress bandwidth, making it a significant cost factor in distributed architectures.', letter: 'E' },
  // F
  { term: 'Fog Computing', definition: 'An architecture that extends cloud computing to the edge of the network, using intermediate nodes (fog nodes) between end devices and the cloud. Enables processing at multiple tiers for latency-sensitive and bandwidth-constrained applications.', letter: 'F' },
  { term: 'Free Tier', definition: 'A cloud service pricing tier that offers limited resources at no cost, typically for experimentation and prototyping. Free tiers include usage caps on compute hours, storage, and API calls.', letter: 'F' },
  // G
  { term: 'GPU', definition: 'Graphics Processing Unit. Originally designed for rendering graphics, GPUs are now the primary hardware for AI training and inference due to their massively parallel architecture. NVIDIA H100 and A100 GPUs dominate AI workloads.', letter: 'G' },
  { term: 'Green Computing', definition: 'The practice of designing, manufacturing, using, and disposing of computing devices in an environmentally sustainable manner. Includes renewable-powered data centers, efficient cooling, and carbon-aware workload scheduling.', letter: 'G' },
  { term: 'gRPC', definition: 'A high-performance, open-source RPC (Remote Procedure Call) framework developed by Google. Uses HTTP/2 for transport and Protocol Buffers for serialization, offering lower latency and smaller payloads than REST APIs.', letter: 'G' },
  // H
  { term: 'HarchOS', definition: 'Harch Corp\'s proprietary distributed AI operating system. Orchestrates 1,798 GPUs across multiple data centers with the SENSE/THINK/ACT pipeline — providing sovereign compute infrastructure for African and global markets.', letter: 'H' },
  { term: 'Hyperscale', definition: 'A computing environment designed to scale rapidly to massive capacity — typically exceeding 100MW and hundreds of thousands of servers. Hyperscale data centers are operated by the largest cloud providers and require specialized power and cooling.', letter: 'H' },
  // I
  { term: 'IaaS', definition: 'Infrastructure as a Service. A cloud computing model where providers offer virtualized computing resources — servers, storage, networking — on demand. Customers manage OS, middleware, and applications while the provider manages the physical infrastructure.', letter: 'I' },
  { term: 'Inference', definition: 'See AI Inference. The production phase of machine learning where trained models process new data to generate predictions. Distinct from training, which requires significantly more compute and is typically batch-oriented.', letter: 'I' },
  { term: 'ISO 27001', definition: 'An international standard for information security management systems (ISMS). Certification demonstrates that an organization has systematic controls for managing sensitive data and maintaining confidentiality, integrity, and availability.', letter: 'I' },
  // K
  { term: 'Kubernetes', definition: 'An open-source container orchestration platform originally developed by Google. Automates deployment, scaling, and management of containerized applications. The de facto standard for running microservices at scale in cloud environments.', letter: 'K' },
  // L
  { term: 'Latency', definition: 'The time delay between a request and the beginning of a response. Measured in milliseconds, latency is critical for real-time applications. Sub-12ms inference latency enables near-instantaneous AI responses for users across Africa.', letter: 'L' },
  { term: 'LLM', definition: 'Large Language Model. An AI model trained on massive text datasets to understand and generate human language. LLMs like GPT, LLaMA, and Mistral power chatbots, code generation, and content creation applications.', letter: 'L' },
  { term: 'Load Balancer', definition: 'A device or software that distributes incoming network traffic across multiple servers to ensure no single server is overwhelmed. Essential for high availability and fault tolerance in distributed systems.', letter: 'L' },
  // M
  { term: 'Multi-Tenant', definition: 'A cloud architecture where multiple customers (tenants) share the same physical infrastructure while maintaining logical isolation. Multi-tenancy reduces costs but requires robust security controls to prevent data leakage between tenants.', letter: 'M' },
  { term: 'Microservices', definition: 'An architectural approach where an application is composed of small, independent services that communicate via APIs. Each service can be developed, deployed, and scaled independently, enabling faster iteration and fault isolation.', letter: 'M' },
  // O
  { term: 'On-Premises', definition: 'IT infrastructure that is physically located within an organization\'s facilities rather than hosted in a cloud provider\'s data center. Offers maximum control and security but requires significant capital investment and maintenance.', letter: 'O' },
  { term: 'OpenAPI', definition: 'A specification for defining RESTful APIs in a machine-readable format (YAML/JSON). Enables automatic generation of documentation, client SDKs, and server stubs. Formerly known as the Swagger Specification.', letter: 'O' },
  // P
  { term: 'PaaS', definition: 'Platform as a Service. A cloud computing model where the provider manages the runtime environment — OS, middleware, and infrastructure — while developers focus on application code. Reduces operational overhead but limits customization.', letter: 'P' },
  { term: 'PEM Electrolysis', definition: 'Proton Exchange Membrane electrolysis. A method of producing green hydrogen by using electricity (preferably from renewable sources) to split water into hydrogen and oxygen. More efficient than alkaline electrolysis at smaller scales and faster to ramp up/down.', letter: 'P' },
  // R
  { term: 'REST API', definition: 'Representational State Transfer API. An architectural style for web services that uses HTTP methods (GET, POST, PUT, DELETE) to perform CRUD operations on resources. The most common API pattern for web and cloud services.', letter: 'R' },
  { term: 'RBAC', definition: 'Role-Based Access Control. A security model that restricts system access based on the roles assigned to individual users. RBAC simplifies permission management by grouping permissions into roles rather than assigning them individually.', letter: 'R' },
  { term: 'Renewable Energy', definition: 'Energy generated from naturally replenishing sources — solar, wind, hydroelectric, and geothermal. Harch Corp\'s 2GW+ Renewable Pipeline powers green data centers and green hydrogen production across North Africa.', letter: 'R' },
  // S
  { term: 'SaaS', definition: 'Software as a Service. A cloud computing model where applications are hosted by a provider and accessed via the internet on a subscription basis. Eliminates the need for local installation and maintenance.', letter: 'S' },
  { term: 'SOC 2', definition: 'Service Organization Control 2. An auditing standard developed by AICPA that evaluates a service organization\'s controls for security, availability, processing integrity, confidentiality, and privacy. SOC 2 Type II is the gold standard for cloud providers.', letter: 'S' },
  { term: 'Sovereign Cloud', definition: 'Cloud infrastructure that ensures all data processing and storage occurs within a specific country\'s borders, subject to that nation\'s laws. Essential for governments and critical industries that cannot risk foreign jurisdiction over their data.', letter: 'S' },
  { term: 'SENSE/THINK/ACT', definition: 'HarchOS\'s three-layer operational pipeline. SENSE ingests real-time data at scale (10M events/sec), THINK processes inference and decision-making, and ACT automates infrastructure responses. Together they form the intelligence loop for sovereign operations.', letter: 'S' },
  // T
  { term: 'Terraform', definition: 'An open-source Infrastructure-as-Code tool by HashiCorp that enables declarative provisioning of cloud resources. Terraform manages infrastructure through configuration files rather than manual processes, enabling version control and reproducible deployments.', letter: 'T' },
  { term: 'Throughput', definition: 'The amount of data processed or work completed in a given time period. Measured in requests per second, FLOPS, or tokens per second for AI workloads. High throughput is essential for batch processing and cost-efficient inference.', letter: 'T' },
  // V
  { term: 'Vertical Integration', definition: 'A business strategy where a company controls multiple stages of its supply chain. Harch Corp\'s vertical integration — from renewable energy generation through data center operations to AI compute delivery — eliminates intermediary costs and ensures quality.', letter: 'V' },
  { term: 'Virtualization', definition: 'The creation of virtual versions of computing resources — servers, storage, networks — using software rather than physical hardware. Enables multiple virtual machines to run on a single physical machine, improving utilization and reducing costs.', letter: 'V' },
  // W
  { term: 'Water Desalination', definition: 'The process of removing salt and minerals from seawater to produce fresh water. Reverse osmosis and thermal distillation are the primary methods. Harch Water operates 200M m³/year desalination capacity across North and West Africa.', letter: 'W' },
  { term: 'Webhook', definition: 'An HTTP callback that sends real-time notifications when a specific event occurs. Webhooks enable event-driven architectures by pushing data to subscribed endpoints, eliminating the need for polling.', letter: 'W' },
];

const allLetters = 'ACDEFGHIKLMNOPRSTVW'.split('');

export default function GlossaryPageClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const filteredTerms = useMemo(() => {
    let terms = glossaryTerms;
    if (activeLetter) {
      terms = terms.filter(t => t.letter === activeLetter);
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      terms = terms.filter(t =>
        t.term.toLowerCase().includes(query) || t.definition.toLowerCase().includes(query)
      );
    }
    return terms;
  }, [searchQuery, activeLetter]);

  const groupedTerms = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {};
    filteredTerms.forEach(term => {
      if (!groups[term.letter]) groups[term.letter] = [];
      groups[term.letter].push(term);
    });
    return groups;
  }, [filteredTerms]);

  const availableLetters = useMemo(() => {
    return allLetters.filter(letter =>
      glossaryTerms.some(t => t.letter === letter)
    );
  }, []);

  return (
    <div className="bg-[#1A1A1A]">

      {/* ═══ HERO ═══ */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="section-label mb-4 text-[#06B6D4]">Glossary</p>
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white tracking-[-0.02em] leading-[1.05] mb-6">
              Know the Language.
            </h1>
            <div className="accent-line mb-6" />
            <p className="max-w-2xl text-[16px] text-[#999999] leading-[1.7] mb-10">
              Definitions for the terms, concepts, and technologies that underpin sovereign infrastructure, AI compute, and Harch Corp&apos;s platform.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="max-w-xl relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666666]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search terms..."
                className="w-full pl-11 pr-4 py-3 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-white text-[14px] placeholder-[#666666] focus:outline-none focus:border-[rgba(6,182,212,0.3)] transition-colors"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ A-Z NAVIGATION ═══ */}
      <section className="py-6 bg-[#121212] border-y border-[rgba(255,255,255,0.04)] sticky top-0 z-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-1 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveLetter(null)}
              className={`px-3 py-1.5 rounded-md text-[11px] font-bold tracking-[0.08em] uppercase transition-all duration-300 shrink-0 ${
                activeLetter === null
                  ? 'bg-white text-black'
                  : 'bg-[rgba(255,255,255,0.04)] text-[#999999] hover:bg-[rgba(255,255,255,0.08)] hover:text-white'
              }`}
            >
              All
            </button>
            <span className="w-px h-4 bg-[rgba(255,255,255,0.06)] mx-1" />
            {allLetters.map((letter) => {
              const hasTerms = availableLetters.includes(letter);
              return (
                <button
                  key={letter}
                  onClick={() => hasTerms ? setActiveLetter(activeLetter === letter ? null : letter) : undefined}
                  disabled={!hasTerms}
                  className={`px-3 py-1.5 rounded-md text-[11px] font-bold tracking-[0.08em] uppercase transition-all duration-300 shrink-0 ${
                    activeLetter === letter
                      ? 'bg-white text-black'
                      : hasTerms
                        ? 'bg-[rgba(255,255,255,0.04)] text-[#999999] hover:bg-[rgba(255,255,255,0.08)] hover:text-white'
                        : 'text-[rgba(255,255,255,0.1)] cursor-not-allowed'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ TERMS GRID ═══ */}
      <section className="py-28 md:py-36 bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          {filteredTerms.length === 0 ? (
            <FadeIn>
              <div className="text-center py-20">
                <Search size={32} className="text-[#666666] mx-auto mb-4" />
                <p className="text-white font-semibold text-lg">No terms found</p>
                <p className="text-[14px] text-[#999999] mt-2">Try a different search or clear the filter.</p>
              </div>
            </FadeIn>
          ) : (
            Object.entries(groupedTerms).sort(([a], [b]) => a.localeCompare(b)).map(([letter, terms]) => (
              <div key={letter} className="mb-16 last:mb-0">
                <FadeIn>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-[48px] md:text-[64px] font-extrabold text-[rgba(255,255,255,0.04)] leading-none stat-mono">{letter}</span>
                    <div className="flex-1 h-px bg-[rgba(255,255,255,0.04)]" />
                  </div>
                </FadeIn>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {terms.map((term, i) => (
                    <FadeIn key={term.term} delay={i * 0.04}>
                      <div className="card p-5 h-full group cursor-pointer">
                        <h3 className="text-[15px] font-bold text-white group-hover:text-[#CCCCCC] transition-colors mb-2">{term.term}</h3>
                        <p className="text-[13px] text-[#999999] leading-relaxed">{term.definition}</p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ═══ CTA: Explore Documentation ═══ */}
      <section className="py-28 md:py-36 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <BookOpen size={32} className="text-[#06B6D4] mx-auto mb-6" strokeWidth={1.5} />
              <p className="section-label mb-4 text-[#06B6D4]">Documentation</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[-0.01em] mb-4">Go Deeper</h2>
              <p className="text-[15px] text-[#999999] leading-[1.7] mb-8">
                The glossary covers the concepts. The documentation covers the implementation. Explore guides, API references, and quickstarts for HarchOS, SENSE, and ACT.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/docs"
                  className="px-8 py-3 rounded-lg bg-white text-black text-[12px] font-bold tracking-[0.06em] uppercase hover:bg-[#CCCCCC] transition-colors inline-flex items-center gap-2"
                >
                  Explore Documentation <ArrowRight size={14} />
                </Link>
                <Link
                  href="/docs/api"
                  className="px-8 py-3 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-white text-[12px] font-bold tracking-[0.06em] uppercase hover:bg-[rgba(255,255,255,0.08)] transition-colors inline-flex items-center gap-2"
                >
                  API Reference
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
