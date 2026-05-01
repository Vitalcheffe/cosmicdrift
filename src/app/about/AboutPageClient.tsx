'use client';

import Image from 'next/image';
import { PageHero } from '@/components/PageHero';
import { FadeIn } from '@/components/Animations';
import { Target, Eye, Shield, Zap, Heart, TrendingUp } from 'lucide-react';

const leaders = [
  {
    name: 'Amine Harch El Korane',
    title: 'Founder & CEO',
    image: '/images/team/ceo.jpg',
    bio: 'Visionary entrepreneur driving Africa\'s industrial transformation through strategic investments across data centers, energy, mining, and agriculture. Former infrastructure investment professional with deep expertise in African markets.',
  },
  {
    name: 'Dr. Youssef Benali',
    title: 'Chief Technology Officer',
    image: '/images/team/cto.jpg',
    bio: 'Leading Harch Corp\'s technology strategy across AI infrastructure, industrial IoT, and sovereign platforms. 20+ years in enterprise technology and data center architecture.',
  },
  {
    name: 'Fatima Zahra Alaoui',
    title: 'Chief Financial Officer',
    image: '/images/team/cfo.jpg',
    bio: 'Overseeing Harch Corp\'s $2.4B+ investment pipeline and financial strategy. Expert in emerging market infrastructure finance with extensive experience in project bonds and development finance.',
  },
  {
    name: 'Karim Oubaha',
    title: 'Senior Advisor',
    image: '/images/team/advisor.jpg',
    bio: 'Seasoned advisor with decades of experience in African industrial policy, government relations, and strategic partnerships. Former senior official at the Moroccan Ministry of Industry.',
  },
];

const values = [
  {
    icon: Shield,
    title: 'Sovereignty',
    description: 'We build infrastructure that gives African nations control over their own technological, energy, and industrial destiny.',
  },
  {
    icon: Target,
    title: 'Excellence',
    description: 'World-class standards in every project — from Tier IV data centers to zero-carbon manufacturing processes.',
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'Sovereign technology development and cutting-edge solutions designed for Africa\'s unique challenges and opportunities.',
  },
  {
    icon: TrendingUp,
    title: 'Impact',
    description: 'Every investment measured by its contribution to industrial capacity, job creation, and long-term economic resilience.',
  },
];

export default function AboutPageClient() {
  return (
    <>
      <PageHero
        title="About Harch Corp"
        subtitle="A Moroccan conglomerate building the infrastructure of African sovereignty"
      />

      {/* Company Story */}
      <section className="py-20 lg:py-32 bg-[#05080F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-bold text-harch-text uppercase tracking-tight">
              Our Story
            </h2>
            <div className="mt-4 w-12 h-0.5 bg-harch-gold" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-8 space-y-6">
              <p className="text-harch-muted leading-relaxed">
                Harch Corp was founded by Amine Harch El Korane with a singular conviction: Africa&apos;s
                future must be built by Africans, on African terms. What began as a bold vision in
                Casablanca in 2023 has rapidly grown into one of the continent&apos;s most ambitious
                industrial conglomerates, spanning seven verticals and five countries.
              </p>
              <p className="text-harch-muted leading-relaxed">
                From a 500MW AI hyperscale data center in Dakhla to climate-resilient agriculture
                across the Sahel, from strategic mineral extraction to solar-powered desalination —
                every Harch Corp project is designed to create sovereign capability, not dependency.
                We do not import solutions; we build them.
              </p>
              <p className="text-harch-muted leading-relaxed">
                Headquartered in Casablanca, Harch Corp S.A. operates with a $2.4B+ investment
                pipeline and a team of world-class professionals committed to the idea that
                Africa&apos;s industrial revolution is not a possibility — it is an imperative.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-28 bg-[#070B14] border-y border-harch-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <FadeIn>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-5 h-5 text-harch-gold" />
                  <h2 className="text-2xl font-bold text-harch-text uppercase tracking-tight">Mission</h2>
                </div>
                <div className="w-12 h-0.5 bg-harch-gold mb-6" />
                <p className="text-harch-muted leading-relaxed text-lg">
                  To build, operate, and scale the critical infrastructure that enables Africa&apos;s
                  industrial sovereignty — from compute and energy to minerals, food, and water —
                  creating self-sustaining ecosystems that reduce external dependency and drive
                  long-term economic resilience.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="w-5 h-5 text-harch-gold" />
                  <h2 className="text-2xl font-bold text-harch-text uppercase tracking-tight">Vision</h2>
                </div>
                <div className="w-12 h-0.5 bg-harch-gold mb-6" />
                <p className="text-harch-muted leading-relaxed text-lg">
                  By 2030, to be Africa&apos;s leading integrated industrial conglomerate — a
                  self-reliant ecosystem where sovereign AI compute powers smart mining, where
                  renewable energy fuels zero-carbon manufacturing, and where technology-driven
                  agriculture ensures food security for hundreds of millions.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-32 bg-[#05080F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-harch-text uppercase">
                Our Values
              </h2>
              <div className="mt-4 w-16 h-0.5 bg-harch-gold mx-auto" />
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <FadeIn key={value.title} delay={index * 0.1}>
                <div className="p-6 rounded-xl border border-harch-border bg-[#0A0E18] card-glow h-full">
                  <value.icon className="w-8 h-8 text-harch-gold mb-4" />
                  <h3 className="text-lg font-semibold text-harch-text mb-2">{value.title}</h3>
                  <p className="text-sm text-harch-muted leading-relaxed">{value.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 lg:py-32 bg-[#070B14] border-t border-harch-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-harch-text uppercase">
                Leadership
              </h2>
              <div className="mt-4 w-16 h-0.5 bg-harch-gold mx-auto" />
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leaders.map((leader, index) => (
              <FadeIn key={leader.name} delay={index * 0.1}>
                <div className="rounded-xl border border-harch-border bg-[#0A0E18] card-glow overflow-hidden">
                  <div className="relative h-64">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E18] via-transparent to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-semibold text-harch-text">{leader.name}</h3>
                    <p className="text-xs text-harch-gold uppercase tracking-wider mt-1">{leader.title}</p>
                    <p className="mt-3 text-xs text-harch-muted leading-relaxed">{leader.bio}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
