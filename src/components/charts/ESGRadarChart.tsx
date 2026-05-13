'use client';

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useMemo } from 'react';

interface ESGData {
  metric: string;
  score: number;
  fullMark: number;
}

const rawData: ESGData[] = [
  { metric: 'Carbon Efficiency', score: 92, fullMark: 100 },
  { metric: 'Renewable Mix', score: 82, fullMark: 100 },
  { metric: 'Water Recycling', score: 65, fullMark: 100 },
  { metric: 'Community Impact', score: 78, fullMark: 100 },
  { metric: 'Governance', score: 88, fullMark: 100 },
  { metric: 'Innovation', score: 95, fullMark: 100 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; name: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-[rgba(255,255,255,0.1)] bg-surface-4 px-3 py-2 shadow-xl">
      <p className="font-[family-name:var(--font-space-mono)] text-xs text-txt-secondary">
        {label}
      </p>
      <p className="font-[family-name:var(--font-space-mono)] text-sm font-bold text-white">
        {payload[0].value}/100
      </p>
    </div>
  );
}

export function ESGRadarChart() {
  const data = useMemo(() => rawData, []);

  return (
    <div className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-surface-3 p-6">
      <div className="mb-4">
        <h3 className="font-[family-name:var(--font-space-mono)] text-sm font-bold text-white">
          ESG Performance
        </h3>
        <p className="font-[family-name:var(--font-space-mono)] text-xs text-txt-dim">
          Environmental, Social &amp; Governance metrics
        </p>
      </div>
      <div style={{ height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="70%"
            data={data}
          >
            <PolarGrid
              stroke="rgba(255,255,255,0.08)"
              strokeDasharray="3 3"
            />
            <PolarAngleAxis
              dataKey="metric"
              tick={{
                fill: 'var(--text-secondary)',
                fontSize: 10,
                fontFamily: 'var(--font-space-mono)',
              }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{
                fill: 'var(--text-dim)',
                fontSize: 9,
                fontFamily: 'var(--font-space-mono)',
              }}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Radar
              name="ESG Score"
              dataKey="score"
              stroke="#8B9DAF"
              strokeWidth={2}
              fill="rgba(139,157,175,0.2)"
              animationBegin={0}
              animationDuration={1200}
              animationEasing="ease-out"
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
