'use client';

import { useState, useEffect, useRef } from 'react';

interface MapLocation {
  id: string;
  name: string;
  vertical: string;
  version: string;
  stat: string;
  desc: string;
  cx: number;
  cy: number;
  status: 'active' | 'engineering' | 'permitted' | 'design';
}

const locations: MapLocation[] = [
  { id: 'casa', name: 'Casablanca', vertical: 'HQ', version: '/0.0', stat: 'Global Operations', desc: 'Corporate HQ — Strategy & Capital', cx: 228, cy: 128, status: 'active' },
  { id: 'dakhla', name: 'Dakhla', vertical: 'Intelligence', version: '/0.1', stat: '500MW AI Data Center', desc: 'Hyperscale GPU Cluster — Sovereign Compute', cx: 195, cy: 168, status: 'engineering' },
  { id: 'gambia', name: 'Banjul', vertical: 'Ciment', version: '/0.2', stat: '500kT/yr Production', desc: 'Vertically Integrated Cement Plant', cx: 228, cy: 155, status: 'permitted' },
  { id: 'sahel', name: 'Sahel', vertical: 'Energy', version: '/0.3', stat: '2GW+ Renewables', desc: 'Solar, Wind & Green Hydrogen', cx: 260, cy: 148, status: 'active' },
  { id: 'noudhibou', name: 'Nouadhibou', vertical: 'Mining', version: '/0.5', stat: '3 Strategic Minerals', desc: 'Phosphate, Cobalt & Rare Earths', cx: 205, cy: 145, status: 'engineering' },
  { id: 'dakar', name: 'Dakar', vertical: 'Agri', version: '/0.6', stat: '$35B Market Access', desc: 'Precision IoT Farming Hub', cx: 222, cy: 160, status: 'design' },
  { id: 'bamako', name: 'Bamako', vertical: 'Water', version: '/0.7', stat: '200M m³/yr', desc: 'AI-Optimized Desalination Network', cx: 248, cy: 170, status: 'design' },
];

// Connection lines between locations (showing operational links)
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
  const [scanY, setScanY] = useState(60);
  const [time, setTime] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);

  // Scanning line animation
  useEffect(() => {
    const interval = setInterval(() => {
      setScanY(prev => prev >= 350 ? 60 : prev + 0.8);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Time for particle animation
  useEffect(() => {
    let raf: number;
    const tick = () => {
      setTime(prev => prev + 1);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return '#FFFFFF';
      case 'engineering': return '#CCCCCC';
      case 'permitted': return '#999999';
      default: return '#666666';
    }
  };

  return (
    <div className="relative w-full max-w-[900px] mx-auto">
      {/* Terminal header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-white/30" />
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <div className="w-2 h-2 rounded-full bg-white/10" />
          </div>
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#666666] font-[family-name:var(--font-space-mono)]">
            Deployments / Real-Time
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[9px] text-[#666666] font-[family-name:var(--font-space-mono)]">
            LIVE — {locations.filter(l => l.status === 'active').length} ACTIVE
          </span>
        </div>
      </div>

      <div className="relative rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#0A0A0A] overflow-hidden">
        <svg
          ref={svgRef}
          viewBox="0 0 420 380"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          style={{ minHeight: 300 }}
        >
          <defs>
            {/* Glow filter for dots */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-strong" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Gradient for scanning line */}
            <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            {/* Connection line gradient */}
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.15" />
            </linearGradient>

            {/* Dot pulse filter */}
            <filter id="dot-glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Clip for map area */}
            <clipPath id="map-clip">
              <rect x="0" y="0" width="420" height="380" rx="16" />
            </clipPath>
          </defs>

          <g clipPath="url(#map-clip)">
            {/* Grid background */}
            {Array.from({ length: 19 }, (_, i) => (
              <line key={`gh-${i}`} x1="0" y1={i * 20} x2="420" y2={i * 20} stroke="rgba(255,255,255,0.015)" strokeWidth="0.5" />
            ))}
            {Array.from({ length: 21 }, (_, i) => (
              <line key={`gv-${i}`} x1={i * 20} y1="0" x2={i * 20} y2="380" stroke="rgba(255,255,255,0.015)" strokeWidth="0.5" />
            ))}

            {/* Africa continent - detailed outline */}
            <path
              d="M215,52 L225,48 L238,50 L252,55 L262,62 L270,72 L278,82 L282,95 L285,108 L288,118 L292,128 L295,138 L292,148 L288,158 L285,168 L282,178 L280,188 L278,198 L282,208 L288,215 L295,220 L302,228 L308,238 L312,248 L310,258 L305,268 L298,278 L290,288 L282,298 L272,308 L262,318 L252,325 L242,330 L232,335 L225,338 L218,335 L212,328 L208,318 L205,308 L202,298 L198,288 L192,280 L185,275 L178,272 L170,268 L165,260 L162,250 L165,240 L168,230 L172,220 L178,210 L182,200 L185,190 L182,180 L178,170 L175,160 L178,148 L182,138 L188,128 L195,118 L200,108 L205,98 L210,88 L212,75 L214,62 Z"
              fill="rgba(255,255,255,0.02)"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="0.8"
            />

            {/* Morocco highlighted region */}
            <path
              d="M195,55 L215,48 L232,52 L245,62 L248,78 L242,92 L230,102 L215,108 L200,105 L192,92 L190,78 Z"
              fill="rgba(255,255,255,0.04)"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="0.5"
            />

            {/* West Africa region */}
            <path
              d="M195,108 L225,102 L255,108 L272,122 L278,140 L275,158 L265,172 L248,180 L228,178 L210,168 L198,155 L192,138 Z"
              fill="rgba(255,255,255,0.025)"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="0.5"
            />

            {/* Sahel band */}
            <path
              d="M200,140 L260,135 L290,142 L298,155 L292,168 L275,175 L250,172 L225,168 L205,160 L195,150 Z"
              fill="rgba(255,255,255,0.015)"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="0.5"
              strokeDasharray="2,4"
            />

            {/* Connection lines between locations */}
            {connections.map((conn, i) => {
              const from = getLocationById(conn.from);
              const to = getLocationById(conn.to);
              const midX = (from.cx + to.cx) / 2;
              const midY = (from.cy + to.cy) / 2 - 15;
              const isHighlighted = hovered === conn.from || hovered === conn.to;

              return (
                <g key={`conn-${i}`}>
                  <path
                    d={`M${from.cx},${from.cy} Q${midX},${midY} ${to.cx},${to.cy}`}
                    fill="none"
                    stroke={isHighlighted ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.04)'}
                    strokeWidth={isHighlighted ? '1' : '0.5'}
                    strokeDasharray="3,6"
                    className="transition-all duration-500"
                  />
                  {/* Animated particle along path */}
                  {isHighlighted && (
                    <circle r="1.5" fill="#FFFFFF" opacity="0.6" filter="url(#dot-glow)">
                      <animateMotion
                        dur="3s"
                        repeatCount="indefinite"
                        path={`M${from.cx},${from.cy} Q${midX},${midY} ${to.cx},${to.cy}`}
                      />
                    </circle>
                  )}
                </g>
              );
            })}

            {/* Scanning line */}
            <rect
              x="0"
              y={scanY}
              width="420"
              height="40"
              fill="url(#scanGrad)"
              className="pointer-events-none"
            />

            {/* Location dots */}
            {locations.map((loc) => {
              const isHovered = hovered === loc.id;
              const color = getStatusColor(loc.status);

              return (
                <g
                  key={loc.id}
                  onMouseEnter={() => setHovered(loc.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="cursor-pointer"
                >
                  {/* Outer pulse ring - SVG breathe animation */}
                  <circle
                    cx={loc.cx}
                    cy={loc.cy}
                    r={isHovered ? 18 : 12}
                    fill="none"
                    stroke={color}
                    strokeWidth="0.3"
                    className="transition-all duration-300"
                  >
                    <animate
                      attributeName="r"
                      values="8;14;8"
                      dur="3s"
                      repeatCount="indefinite"
                      begin={`${locations.indexOf(loc) * 0.4}s`}
                    />
                    <animate
                      attributeName="opacity"
                      values="0.3;0;0.3"
                      dur="3s"
                      repeatCount="indefinite"
                      begin={`${locations.indexOf(loc) * 0.4}s`}
                    />
                  </circle>

                  {/* Second pulse ring - SVG breathe animation */}
                  <circle
                    cx={loc.cx}
                    cy={loc.cy}
                    r={isHovered ? 12 : 8}
                    fill="none"
                    stroke={color}
                    strokeWidth="0.5"
                    opacity={isHovered ? 0.2 : 0.08}
                    className="transition-all duration-300"
                  >
                    <animate
                      attributeName="r"
                      values="5;10;5"
                      dur="3s"
                      repeatCount="indefinite"
                      begin={`${locations.indexOf(loc) * 0.4}s`}
                    />
                    <animate
                      attributeName="opacity"
                      values="0.2;0.02;0.2"
                      dur="3s"
                      repeatCount="indefinite"
                      begin={`${locations.indexOf(loc) * 0.4}s`}
                    />
                  </circle>

                  {/* Main dot */}
                  <circle
                    cx={loc.cx}
                    cy={loc.cy}
                    r={isHovered ? 4.5 : 3}
                    fill={color}
                    opacity={isHovered ? 1 : 0.7}
                    filter={isHovered ? 'url(#glow)' : 'url(#dot-glow)'}
                    className="transition-all duration-300"
                  />

                  {/* Inner bright core */}
                  <circle
                    cx={loc.cx}
                    cy={loc.cy}
                    r="1.5"
                    fill="#FFFFFF"
                    opacity={isHovered ? 1 : 0.9}
                  />

                  {/* Label - always visible, small */}
                  <text
                    x={loc.cx + 10}
                    y={loc.cy + 3}
                    fontSize="6"
                    fontWeight="600"
                    fill={isHovered ? '#FFFFFF' : 'rgba(255,255,255,0.3)'}
                    letterSpacing="0.08em"
                    className="transition-all duration-300 font-[family-name:var(--font-space-mono)]"
                  >
                    {loc.name.toUpperCase()}
                  </text>

                  {/* Version tag */}
                  {isHovered && (
                    <text
                      x={loc.cx + 10}
                      y={loc.cy - 5}
                      fontSize="5"
                      fontWeight="700"
                      fill="#666666"
                      letterSpacing="0.1em"
                      className="font-[family-name:var(--font-space-mono)]"
                    >
                      {loc.version}
                    </text>
                  )}

                  {/* Tooltip on hover */}
                  {isHovered && (
                    <g>
                      <rect
                        x={loc.cx + 30}
                        y={loc.cy - 30}
                        width="160"
                        height="56"
                        rx="6"
                        fill="#0A0A0A"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="0.5"
                      />
                      {/* Tooltip accent line */}
                      <rect
                        x={loc.cx + 30}
                        y={loc.cy - 30}
                        width="2"
                        height="56"
                        rx="1"
                        fill={color}
                        opacity="0.5"
                      />
                      <text
                        x={loc.cx + 40}
                        y={loc.cy - 16}
                        fontSize="7"
                        fontWeight="700"
                        fill="#FFFFFF"
                        letterSpacing="0.12em"
                        className="font-[family-name:var(--font-space-mono)]"
                      >
                        {loc.vertical.toUpperCase()} {loc.version}
                      </text>
                      <text
                        x={loc.cx + 40}
                        y={loc.cy - 4}
                        fontSize="7"
                        fill="#999999"
                      >
                        {loc.stat}
                      </text>
                      <text
                        x={loc.cx + 40}
                        y={loc.cy + 8}
                        fontSize="6"
                        fill="#666666"
                      >
                        {loc.desc}
                      </text>
                      {/* Status indicator */}
                      <circle
                        cx={loc.cx + 40}
                        cy={loc.cy + 20}
                        r="2"
                        fill={color}
                        opacity="0.8"
                      />
                      <text
                        x={loc.cx + 48}
                        y={loc.cy + 22}
                        fontSize="5"
                        fontWeight="600"
                        fill={color}
                        letterSpacing="0.08em"
                        className="font-[family-name:var(--font-space-mono)]"
                      >
                        {loc.status.toUpperCase()}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Coordinate labels */}
            <text x="15" y="75" fontSize="5" fill="rgba(255,255,255,0.06)" letterSpacing="0.1em" className="font-[family-name:var(--font-space-mono)]">30°N</text>
            <text x="15" y="165" fontSize="5" fill="rgba(255,255,255,0.06)" letterSpacing="0.1em" className="font-[family-name:var(--font-space-mono)]">15°N</text>
            <text x="15" y="255" fontSize="5" fill="rgba(255,255,255,0.06)" letterSpacing="0.1em" className="font-[family-name:var(--font-space-mono)]">0°</text>
            <text x="15" y="345" fontSize="5" fill="rgba(255,255,255,0.06)" letterSpacing="0.1em" className="font-[family-name:var(--font-space-mono)]">15°S</text>

            {/* Large watermark text */}
            <text x="260" y="280" fontSize="48" fontWeight="800" fill="rgba(255,255,255,0.015)" letterSpacing="0.15em">
              AFRICA
            </text>

            {/* Corner coordinates */}
            <text x="395" y="370" fontSize="4" fill="rgba(255,255,255,0.08)" textAnchor="end" className="font-[family-name:var(--font-space-mono)]">
              17.1°W — 51.4°E
            </text>
          </g>
        </svg>

        {/* Bottom status bar */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.01)]">
          <div className="flex items-center gap-4">
            {locations.slice(0, 4).map(loc => (
              <div key={loc.id} className="flex items-center gap-1.5">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: getStatusColor(loc.status), opacity: 0.6 }}
                />
                <span className="text-[8px] text-[#666666] font-[family-name:var(--font-space-mono)] tracking-wide">
                  {loc.vertical}
                </span>
              </div>
            ))}
          </div>
          <span className="text-[8px] text-[#444444] font-[family-name:var(--font-space-mono)]">
            {locations.length} NODES — 5 COUNTRIES
          </span>
        </div>
      </div>
    </div>
  );
}
