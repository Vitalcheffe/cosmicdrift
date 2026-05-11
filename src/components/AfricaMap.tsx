'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface MapLocation {
  id: string;
  name: string;
  vertical: string;
  version: string;
  stat: string;
  desc: string;
  xPercent: number; // position as percentage of map width
  yPercent: number; // position as percentage of map height
  status: 'active' | 'engineering' | 'permitted' | 'design';
}

// Locations positioned on the real Africa map (percentage-based)
const locations: MapLocation[] = [
  { id: 'casa', name: 'Casablanca', vertical: 'HQ', version: '/0.0', stat: 'Global Operations', desc: 'Corporate HQ — Strategy & Capital', xPercent: 16.5, yPercent: 7, status: 'active' },
  { id: 'dakhla', name: 'Dakhla', vertical: 'Intelligence', version: '/0.1', stat: '1,798 GPU Carbon-Aware Data Centers', desc: 'Hyperscale GPU Cluster — Sovereign Compute', xPercent: 7, yPercent: 15, status: 'engineering' },
  { id: 'gambia', name: 'Banjul', vertical: 'Cement', version: '/0.2', stat: '500kT/yr Production', desc: 'Vertically Integrated Cement Plant', xPercent: 6.5, yPercent: 23, status: 'permitted' },
  { id: 'sahel', name: 'Sahel', vertical: 'Energy', version: '/0.3', stat: '2GW+ Renewable Pipeline', desc: 'Solar, Wind & Green Hydrogen', xPercent: 22, yPercent: 22, status: 'active' },
  { id: 'noudhibou', name: 'Nouadhibou', vertical: 'Mining', version: '/0.5', stat: '3 Strategic Minerals', desc: 'Phosphate, Cobalt & Rare Earths', xPercent: 6, yPercent: 17.5, status: 'engineering' },
  { id: 'dakar', name: 'Dakar', vertical: 'Agri', version: '/0.6', stat: '$35B Market Access', desc: 'Precision IoT Farming Hub', xPercent: 5.5, yPercent: 22, status: 'design' },
  { id: 'bamako', name: 'Bamako', vertical: 'Water', version: '/0.7', stat: '200M m³/yr', desc: 'AI-Optimized Desalination Network', xPercent: 15, yPercent: 24, status: 'design' },
];

const connections = [
  { from: 'casa', to: 'dakhla', label: 'Fiber' },
  { from: 'casa', to: 'gambia', label: 'Logistics' },
  { from: 'casa', to: 'sahel', label: 'Power Grid' },
  { from: 'dakhla', to: 'noudhibou', label: 'Data Link' },
  { from: 'gambia', to: 'dakar', label: 'Supply Chain' },
  { from: 'sahel', to: 'bamako', label: 'Water-Energy' },
];

function getLocationById(id: string) {
  return locations.find(l => l.id === id)!;
}

export function AfricaMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [scanY, setScanY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanY(prev => prev >= 100 ? 0 : prev + 0.15);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return '#4A7B5F';
      case 'engineering': return '#C7923E';
      case 'permitted': return '#FF8C00';
      default: return '#FF8C00';
    }
  };

  return (
    <div className="relative w-full max-w-[900px] mx-auto">
      {/* Terminal header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(199, 146, 62, 0.3)' }} />
            <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(199, 146, 62, 0.2)' }} />
            <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(199, 146, 62, 0.1)' }} />
          </div>
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase cmd-amber-dim font-[family-name:var(--font-space-mono)]">
            Deployments / Real-Time
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="led-indicator led-green" style={{ width: 6, height: 6 }} />
          <span className="text-[9px] cmd-amber font-[family-name:var(--font-space-mono)]">
            LIVE — {locations.filter(l => l.status === 'active').length} ACTIVE
          </span>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#0A0A0A] overflow-hidden"
      >
        {/* Real Africa map image as background */}
        <div className="relative w-full" style={{ aspectRatio: '1525 / 1440' }}>
          <Image
            src="/images/africa-map-dark.png"
            alt="Africa Map — Harch Corp Operations"
            fill
            className="object-contain opacity-70"
            priority
            style={{ filter: 'brightness(0.6) contrast(1.3) hue-rotate(10deg)' }}
          />

          {/* Grid overlay */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="0.3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="glow-strong" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="0.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C7923E" stopOpacity="0" />
                <stop offset="50%" stopColor="#C7923E" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#C7923E" stopOpacity="0" />
              </linearGradient>
              <filter id="dot-glow">
                <feGaussianBlur stdDeviation="0.2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Subtle grid lines */}
            {Array.from({ length: 20 }, (_, i) => (
              <line key={`gh-${i}`} x1="0" y1={i * 5} x2="100" y2={i * 5} stroke="rgba(255,255,255,0.015)" strokeWidth="0.05" />
            ))}
            {Array.from({ length: 20 }, (_, i) => (
              <line key={`gv-${i}`} x1={i * 5} y1="0" x2={i * 5} y2="100" stroke="rgba(255,255,255,0.015)" strokeWidth="0.05" />
            ))}

            {/* Scanning line */}
            <rect
              x="0"
              y={scanY}
              width="100"
              height="6"
              fill="url(#scanGrad)"
              className="pointer-events-none"
            />

            {/* Connection lines */}
            {connections.map((conn, i) => {
              const from = getLocationById(conn.from);
              const to = getLocationById(conn.to);
              const midX = (from.xPercent + to.xPercent) / 2;
              const midY = (from.yPercent + to.yPercent) / 2 - 2;
              const isHighlighted = hovered === conn.from || hovered === conn.to;

              return (
                <g key={`conn-${i}`}>
                  <path
                    d={`M${from.xPercent},${from.yPercent} Q${midX},${midY} ${to.xPercent},${to.yPercent}`}
                    fill="none"
                    stroke={isHighlighted ? 'rgba(199,146,62,0.3)' : 'rgba(199,146,62,0.08)'}
                    strokeWidth={isHighlighted ? '0.15' : '0.08'}
                    strokeDasharray="0.5,1"
                    className="transition-all duration-500"
                  />
                  {isHighlighted && (
                    <circle r="0.3" fill="#C7923E" opacity="0.8" filter="url(#dot-glow)">
                      <animateMotion
                        dur="3s"
                        repeatCount="indefinite"
                        path={`M${from.xPercent},${from.yPercent} Q${midX},${midY} ${to.xPercent},${to.yPercent}`}
                      />
                    </circle>
                  )}
                </g>
              );
            })}

            {/* Location dots with sonar pings */}
            {locations.map((loc, idx) => {
              const isHovered = hovered === loc.id;
              const color = getStatusColor(loc.status);

              return (
                <g
                  key={loc.id}
                  onMouseEnter={() => setHovered(loc.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="cursor-pointer"
                >
                  {/* Sonar ping ring 1 */}
                  <circle cx={loc.xPercent} cy={loc.yPercent} r="0.5" fill="none" stroke={color} strokeWidth="0.08" opacity="0">
                    <animate attributeName="r" values="0.5;3;0.5" dur="2.5s" repeatCount="indefinite" begin={`${idx * 0.35}s`} />
                    <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite" begin={`${idx * 0.35}s`} />
                    <animate attributeName="stroke-width" values="0.08;0.01;0.08" dur="2.5s" repeatCount="indefinite" begin={`${idx * 0.35}s`} />
                  </circle>

                  {/* Sonar ping ring 2 */}
                  <circle cx={loc.xPercent} cy={loc.yPercent} r="0.5" fill="none" stroke={color} strokeWidth="0.05" opacity="0">
                    <animate attributeName="r" values="0.5;2.2;0.5" dur="2.5s" repeatCount="indefinite" begin={`${idx * 0.35 + 0.8}s`} />
                    <animate attributeName="opacity" values="0.35;0;0.35" dur="2.5s" repeatCount="indefinite" begin={`${idx * 0.35 + 0.8}s`} />
                    <animate attributeName="stroke-width" values="0.05;0.005;0.05" dur="2.5s" repeatCount="indefinite" begin={`${idx * 0.35 + 0.8}s`} />
                  </circle>

                  {/* Main dot */}
                  <circle
                    cx={loc.xPercent}
                    cy={loc.yPercent}
                    r={isHovered ? 0.6 : 0.4}
                    fill={color}
                    opacity={isHovered ? 1 : 0.8}
                    filter={isHovered ? 'url(#glow-strong)' : 'url(#glow)'}
                    className="transition-all duration-300"
                  />

                  {/* Inner bright core */}
                  <circle cx={loc.xPercent} cy={loc.yPercent} r="0.15" fill="#FFFFFF" opacity={isHovered ? 1 : 0.9} />

                  {/* Label */}
                  <text
                    x={loc.xPercent + 1.2}
                    y={loc.yPercent + 0.4}
                    fontSize="0.85"
                    fontWeight="600"
                    fill={isHovered ? '#C7923E' : 'rgba(199,146,62,0.5)'}
                    letterSpacing="0.06em"
                    className="transition-all duration-300 font-[family-name:var(--font-space-mono)]"
                  >
                    {loc.name.toUpperCase()}
                  </text>

                  {/* Hover tooltip */}
                  {isHovered && (
                    <g>
                      {/* Info card background */}
                      <rect
                        x={loc.xPercent + 1.2}
                        y={loc.yPercent - 4}
                        width="16"
                        height="3.2"
                        rx="0.3"
                        fill="rgba(0,0,0,0.85)"
                        stroke="rgba(199,146,62,0.2)"
                        strokeWidth="0.05"
                      />
                      {/* Vertical label */}
                      <text
                        x={loc.xPercent + 1.5}
                        y={loc.yPercent - 2.8}
                        fontSize="0.6"
                        fontWeight="700"
                        fill={color}
                        letterSpacing="0.08em"
                        className="font-[family-name:var(--font-space-mono)]"
                      >
                        {loc.vertical.toUpperCase()} {loc.version}
                      </text>
                      {/* Stat */}
                      <text
                        x={loc.xPercent + 1.5}
                        y={loc.yPercent - 1.8}
                        fontSize="0.7"
                        fontWeight="600"
                        fill="white"
                        letterSpacing="0.04em"
                        className="font-[family-name:var(--font-space-mono)]"
                      >
                        {loc.stat}
                      </text>
                      {/* Description */}
                      <text
                        x={loc.xPercent + 1.5}
                        y={loc.yPercent - 1}
                        fontSize="0.5"
                        fill="rgba(255,255,255,0.5)"
                        letterSpacing="0.02em"
                        className="font-[family-name:var(--font-space-mono)]"
                      >
                        {loc.desc}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#4A7B5F', boxShadow: '0 0 4px rgba(74,123,95,0.6)' }} />
          <span className="text-[9px] text-[#999999] font-[family-name:var(--font-space-mono)]">ACTIVE</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#C7923E', boxShadow: '0 0 4px #C7923E60' }} />
          <span className="text-[9px] text-[#999999] font-[family-name:var(--font-space-mono)]">ENGINEERING</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FF8C00', boxShadow: '0 0 4px #FF8C0060' }} />
          <span className="text-[9px] text-[#999999] font-[family-name:var(--font-space-mono)]">PERMITTED</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FF8C00', boxShadow: '0 0 4px #FF8C0060' }} />
          <span className="text-[9px] text-[#999999] font-[family-name:var(--font-space-mono)]">DESIGN</span>
        </div>
      </div>
    </div>
  );
}
