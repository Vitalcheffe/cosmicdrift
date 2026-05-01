'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { FadeIn } from '@/components/Animations';
import { MapPin, DollarSign, Activity, ArrowRight, CheckCircle2 } from 'lucide-react';

interface SubsidiaryData {
  name: string;
  tagline: string;
  location: string;
  investment: string;
  status: string;
  description: string;
  metrics: string[];
  image: string;
}

export default function SubsidiaryPageClient({ data }: { data: SubsidiaryData }) {
  return (
    <>
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={data.image}
            alt={data.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#05080F]/75" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#05080F]/40 via-transparent to-[#05080F]" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-harch-text uppercase">
            {data.name}
          </h1>
          <p className="mt-4 text-xl text-harch-gold font-medium">{data.tagline}</p>
          <div className="mt-4 w-16 h-0.5 bg-harch-gold mx-auto" />
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 lg:py-28 bg-[#05080F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-bold text-harch-text uppercase tracking-tight">
              Overview
            </h2>
            <div className="mt-4 w-12 h-0.5 bg-harch-gold" />
            <p className="mt-6 text-harch-muted leading-relaxed text-lg">{data.description}</p>
          </FadeIn>
        </div>
      </section>

      {/* Key Figures */}
      <section className="py-16 bg-[#070B14] border-y border-harch-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <FadeIn>
              <div className="flex items-center gap-4 p-5 rounded-xl border border-harch-border bg-[#0A0E18]">
                <MapPin className="w-6 h-6 text-harch-gold shrink-0" />
                <div>
                  <p className="text-xs text-harch-muted uppercase tracking-wider">Location</p>
                  <p className="text-base font-semibold text-harch-text">{data.location}</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="flex items-center gap-4 p-5 rounded-xl border border-harch-border bg-[#0A0E18]">
                <DollarSign className="w-6 h-6 text-harch-gold shrink-0" />
                <div>
                  <p className="text-xs text-harch-muted uppercase tracking-wider">Investment</p>
                  <p className="text-base font-semibold text-harch-text">{data.investment}</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="flex items-center gap-4 p-5 rounded-xl border border-harch-border bg-[#0A0E18]">
                <Activity className="w-6 h-6 text-harch-gold shrink-0" />
                <div>
                  <p className="text-xs text-harch-muted uppercase tracking-wider">Status</p>
                  <p className="text-base font-semibold text-harch-text">{data.status}</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-20 lg:py-28 bg-[#05080F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-bold text-harch-text uppercase tracking-tight">
              Key Metrics
            </h2>
            <div className="mt-4 w-12 h-0.5 bg-harch-gold" />
          </FadeIn>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.metrics.map((metric, index) => (
              <FadeIn key={metric} delay={index * 0.1}>
                <div className="p-6 rounded-xl border border-harch-border bg-[#0A0E18] card-glow text-center">
                  <CheckCircle2 className="w-6 h-6 text-harch-gold mx-auto mb-3" />
                  <p className="text-sm font-semibold text-harch-text">{metric}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Advantages */}
      <section className="py-20 lg:py-28 bg-[#070B14] border-t border-harch-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-bold text-harch-text uppercase tracking-tight">
              Strategic Advantages
            </h2>
            <div className="mt-4 w-12 h-0.5 bg-harch-gold" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-lg border border-harch-border bg-[#0A0E18]">
                <div className="w-2 h-2 rounded-full bg-harch-gold mt-2 shrink-0" />
                <div>
                  <h3 className="font-semibold text-harch-text">Vertical Integration</h3>
                  <p className="text-sm text-harch-muted mt-1">Deeply integrated with other Harch Corp divisions, creating synergies across energy, technology, and operations.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg border border-harch-border bg-[#0A0E18]">
                <div className="w-2 h-2 rounded-full bg-harch-gold mt-2 shrink-0" />
                <div>
                  <h3 className="font-semibold text-harch-text">Sovereign Capability</h3>
                  <p className="text-sm text-harch-muted mt-1">Reducing dependency on external systems and building lasting, self-sustaining capability for African nations.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg border border-harch-border bg-[#0A0E18]">
                <div className="w-2 h-2 rounded-full bg-harch-gold mt-2 shrink-0" />
                <div>
                  <h3 className="font-semibold text-harch-text">Strategic Location</h3>
                  <p className="text-sm text-harch-muted mt-1">Positioned in key corridors connecting African markets with European and global demand centers.</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#05080F] border-t border-harch-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-bold text-harch-text uppercase">
              Investment Highlights
            </h2>
            <div className="mt-4 w-16 h-0.5 bg-harch-gold mx-auto" />
            <p className="mt-6 text-harch-muted max-w-2xl mx-auto">
              {data.name} represents a transformative investment opportunity in Africa&apos;s
              industrial future. Connect with our investor relations team to learn more about
              participation in this landmark project.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link
              href="/investors"
              className="group inline-flex items-center gap-2 mt-8 px-8 py-3.5 bg-harch-gold text-harch-dark text-sm uppercase tracking-[0.2em] font-semibold rounded-lg hover:bg-harch-gold/90 transition-all duration-200"
            >
              Investor Relations
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
