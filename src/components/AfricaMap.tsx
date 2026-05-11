'use client';

import { useState } from 'react';

interface MapLocation {
  id: string;
  name: string;
  vertical: string;
  version: string;
  stat: string;
  desc: string;
  x: number; // position in SVG viewBox (0-1000)
  y: number; // position in SVG viewBox (0-1100)
  status: 'active' | 'engineering' | 'permitted' | 'design';
}

const locations: MapLocation[] = [
  { id: 'casa', name: 'Casablanca', vertical: 'HQ', version: '/0.0', stat: 'Global Operations', desc: 'Corporate HQ — Strategy & Capital', x: 295, y: 180, status: 'active' },
  { id: 'dakhla', name: 'Dakhla', vertical: 'Intelligence', version: '/0.1', stat: '1,798 GPU Carbon-Aware Data Centers', desc: 'Hyperscale GPU Cluster — Sovereign Compute', x: 200, y: 340, status: 'engineering' },
  { id: 'gambia', name: 'Banjul', vertical: 'Cement', version: '/0.2', stat: '500kT/yr Production', desc: 'Vertically Integrated Cement Plant', x: 280, y: 370, status: 'permitted' },
  { id: 'sahel', name: 'Sahel', vertical: 'Energy', version: '/0.3', stat: '2GW+ Renewable Pipeline', desc: 'Solar, Wind & Green Hydrogen', x: 370, y: 380, status: 'active' },
  { id: 'noudhibou', name: 'Nouadhibou', vertical: 'Mining', version: '/0.5', stat: '3 Strategic Minerals', desc: 'Phosphate, Cobalt & Rare Earths', x: 210, y: 300, status: 'engineering' },
  { id: 'dakar', name: 'Dakar', vertical: 'Agri', version: '/0.6', stat: '$35B Market Access', desc: 'Precision IoT Farming Hub', x: 260, y: 350, status: 'design' },
  { id: 'bamako', name: 'Bamako', vertical: 'Water', version: '/0.7', stat: '200M m³/yr', desc: 'AI-Optimized Desalination Network', x: 340, y: 410, status: 'design' },
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

// Simplified but recognizable Africa outline path
const africaPath = `M480,10 L510,15 L530,30 L550,25 L570,35 L590,30 L600,45 L610,40 L625,50 L635,65 L645,60 L660,70 L670,85 L680,80 L690,95 L695,110 L700,105 L710,120 L715,140 L720,160 L715,180 L720,200 L725,220 L720,240 L710,260 L700,275 L690,290 L695,310 L700,330 L695,350 L685,370 L675,385 L665,400 L660,420 L655,440 L650,460 L640,475 L635,495 L640,515 L650,535 L660,555 L670,570 L680,585 L690,600 L700,620 L705,640 L700,660 L690,680 L680,695 L670,710 L660,725 L655,745 L650,765 L645,785 L640,800 L635,820 L630,840 L625,860 L620,880 L610,895 L600,910 L590,920 L575,930 L560,940 L545,950 L530,960 L520,970 L510,985 L500,1000 L490,1015 L480,1025 L470,1040 L460,1055 L450,1070 L445,1080 L440,1090 L435,1100 L425,1095 L420,1085 L415,1070 L420,1055 L425,1040 L430,1025 L435,1010 L440,995 L445,980 L440,965 L430,950 L420,940 L405,935 L390,930 L375,925 L360,920 L345,910 L330,900 L315,890 L300,880 L285,870 L275,855 L265,840 L255,825 L245,810 L240,795 L235,780 L230,765 L225,750 L220,735 L215,720 L210,705 L210,690 L215,675 L220,660 L225,645 L220,630 L215,615 L210,600 L205,585 L200,570 L195,555 L190,540 L185,525 L180,510 L175,495 L170,480 L168,465 L170,450 L175,435 L180,420 L185,405 L180,390 L175,375 L170,360 L168,345 L170,330 L175,315 L180,300 L175,285 L170,270 L168,255 L170,240 L175,225 L180,210 L185,195 L190,180 L195,165 L200,150 L210,135 L220,120 L235,110 L250,100 L265,90 L280,80 L295,70 L310,60 L325,55 L340,50 L355,45 L370,40 L385,38 L400,35 L415,30 L430,25 L445,20 L460,15 L475,12 Z`;

// Additional geographic details - Madagascar
const madagascarPath = `M700,750 L710,745 L720,755 L725,770 L720,790 L715,810 L710,830 L700,845 L690,840 L685,825 L690,810 L695,790 L695,770 L698,755 Z`;

export function AfricaMap() {
  const [hovered, setHovered] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return '#4A7B5F';
      case 'engineering': return '#8B9DAF';
      case 'permitted': return '#999999';
      default: return '#666666';
    }
  };

  return (
    <div className="relative w-full max-w-[900px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-[rgba(139,157,175,0.3)]" />
            <div className="w-2 h-2 rounded-full bg-[rgba(139,157,175,0.2)]" />
            <div className="w-2 h-2 rounded-full bg-[rgba(139,157,175,0.1)]" />
          </div>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[rgba(255,255,255,0.25)] font-[family-name:var(--font-space-mono)]">
            Deployments / Real-Time
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#4A7B5F]" style={{ boxShadow: '0 0 4px rgba(74,123,95,0.6)' }} />
          <span className="text-[9px] text-[rgba(255,255,255,0.5)] font-[family-name:var(--font-space-mono)]">
            LIVE — {locations.filter(l => l.status === 'active').length} ACTIVE
          </span>
        </div>
      </div>

      {/* Map container */}
      <div className="relative rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#0D0D0D] overflow-hidden">
        <div className="relative w-full" style={{ aspectRatio: '1000 / 1100' }}>
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1000 1100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="map-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="dot-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <radialGradient id="africaFill" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="rgba(139,157,175,0.06)" />
                <stop offset="100%" stopColor="rgba(139,157,175,0.02)" />
              </radialGradient>
              <linearGradient id="connectionGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8B9DAF" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#8B9DAF" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#8B9DAF" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Subtle grid lines */}
            {Array.from({ length: 22 }, (_, i) => (
              <line key={`gh-${i}`} x1="0" y1={i * 50} x2="1000" y2={i * 50} stroke="rgba(255,255,255,0.015)" strokeWidth="0.5" />
            ))}
            {Array.from({ length: 20 }, (_, i) => (
              <line key={`gv-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="1100" stroke="rgba(255,255,255,0.015)" strokeWidth="0.5" />
            ))}

            {/* Africa continent outline */}
            <path
              d={africaPath}
              fill="url(#africaFill)"
              stroke="rgba(139,157,175,0.15)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Madagascar */}
            <path
              d={madagascarPath}
              fill="url(#africaFill)"
              stroke="rgba(139,157,175,0.1)"
              strokeWidth="1"
              strokeLinejoin="round"
            />

            {/* Connection lines */}
            {connections.map((conn, i) => {
              const from = getLocationById(conn.from);
              const to = getLocationById(conn.to);
              const midX = (from.x + to.x) / 2;
              const midY = (from.y + to.y) / 2 - 20;
              const isHighlighted = hovered === conn.from || hovered === conn.to;

              return (
                <g key={`conn-${i}`}>
                  <path
                    d={`M${from.x},${from.y} Q${midX},${midY} ${to.x},${to.y}`}
                    fill="none"
                    stroke={isHighlighted ? 'rgba(139,157,175,0.35)' : 'rgba(139,157,175,0.1)'}
                    strokeWidth={isHighlighted ? 1.5 : 0.8}
                    strokeDasharray="4,6"
                    className="transition-all duration-500"
                  />
                  {isHighlighted && (
                    <circle r="2.5" fill="#8B9DAF" opacity="0.8" filter="url(#dot-glow)">
                      <animateMotion
                        dur="3s"
                        repeatCount="indefinite"
                        path={`M${from.x},${from.y} Q${midX},${midY} ${to.x},${to.y}`}
                      />
                    </circle>
                  )}
                </g>
              );
            })}

            {/* Location dots with pulse rings */}
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
                  {/* Pulse ring 1 */}
                  <circle cx={loc.x} cy={loc.y} r="6" fill="none" stroke={color} strokeWidth="1" opacity="0">
                    <animate attributeName="r" values="6;25;6" dur="2.5s" repeatCount="indefinite" begin={`${idx * 0.35}s`} />
                    <animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite" begin={`${idx * 0.35}s`} />
                    <animate attributeName="stroke-width" values="1;0.2;1" dur="2.5s" repeatCount="indefinite" begin={`${idx * 0.35}s`} />
                  </circle>

                  {/* Pulse ring 2 */}
                  <circle cx={loc.x} cy={loc.y} r="6" fill="none" stroke={color} strokeWidth="0.6" opacity="0">
                    <animate attributeName="r" values="6;18;6" dur="2.5s" repeatCount="indefinite" begin={`${idx * 0.35 + 0.8}s`} />
                    <animate attributeName="opacity" values="0.25;0;0.25" dur="2.5s" repeatCount="indefinite" begin={`${idx * 0.35 + 0.8}s`} />
                  </circle>

                  {/* Main dot */}
                  <circle
                    cx={loc.x}
                    cy={loc.y}
                    r={isHovered ? 6 : 4}
                    fill={color}
                    opacity={isHovered ? 1 : 0.85}
                    filter={isHovered ? 'url(#dot-glow)' : 'url(#map-glow)'}
                    className="transition-all duration-300"
                  />

                  {/* Inner bright core */}
                  <circle cx={loc.x} cy={loc.y} r="1.5" fill="#FFFFFF" opacity={isHovered ? 1 : 0.85} />

                  {/* Name label */}
                  <text
                    x={loc.x + 12}
                    y={loc.y + 4}
                    fontSize="11"
                    fontWeight="600"
                    fill={isHovered ? '#8B9DAF' : 'rgba(255,255,255,0.5)'}
                    letterSpacing="0.08em"
                    className="transition-all duration-300 font-[family-name:var(--font-space-mono)]"
                  >
                    {loc.name.toUpperCase()}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* HTML Tooltip panels (positioned absolutely over SVG) */}
          {locations.map((loc) => {
            const isHovered = hovered === loc.id;
            if (!isHovered) return null;
            const color = getStatusColor(loc.status);
            // Calculate position percentages from SVG viewBox
            const leftPct = (loc.x / 1000) * 100;
            const topPct = (loc.y / 1100) * 100;
            // Position tooltip to the right of dot, but flip if too close to right edge
            const flipLeft = leftPct > 70;
            
            return (
              <div
                key={`tooltip-${loc.id}`}
                className="absolute z-20 pointer-events-none"
                style={{
                  left: flipLeft ? `${leftPct - 22}%` : `${leftPct + 4}%`,
                  top: `${topPct - 2}%`,
                  transform: 'translateY(-50%)',
                }}
              >
                <div className="bg-[#0D0D0D]/95 backdrop-blur-md border border-[rgba(139,157,175,0.2)] rounded-lg p-4 min-w-[200px] max-w-[260px]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}60` }} />
                    <span className="text-[10px] font-bold tracking-[0.15em] uppercase font-[family-name:var(--font-space-mono)]" style={{ color }}>
                      {loc.vertical} {loc.version}
                    </span>
                  </div>
                  <p className="text-[13px] font-semibold text-white mb-1">{loc.stat}</p>
                  <p className="text-[11px] text-[rgba(255,255,255,0.5)] leading-relaxed">{loc.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#4A7B5F', boxShadow: '0 0 4px rgba(74,123,95,0.6)' }} />
          <span className="text-[9px] text-[rgba(255,255,255,0.25)] font-[family-name:var(--font-space-mono)]">ACTIVE</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#8B9DAF', boxShadow: '0 0 4px rgba(139,157,175,0.4)' }} />
          <span className="text-[9px] text-[rgba(255,255,255,0.25)] font-[family-name:var(--font-space-mono)]">ENGINEERING</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#999999', boxShadow: '0 0 4px rgba(153,153,153,0.3)' }} />
          <span className="text-[9px] text-[rgba(255,255,255,0.25)] font-[family-name:var(--font-space-mono)]">PERMITTED</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#666666', boxShadow: '0 0 4px rgba(102,102,102,0.3)' }} />
          <span className="text-[9px] text-[rgba(255,255,255,0.25)] font-[family-name:var(--font-space-mono)]">DESIGN</span>
        </div>
      </div>
    </div>
  );
}
