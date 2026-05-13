'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useMemo } from 'react';

interface MetricsData {
  quarter: string;
  gpuUtil: number;
  renewableOutput: number;
  carbonIntensity: number;
}

const rawData: MetricsData[] = [
  { quarter: 'Q1 23', gpuUtil: 62, renewableOutput: 340, carbonIntensity: 78 },
  { quarter: 'Q2 23', gpuUtil: 68, renewableOutput: 420, carbonIntensity: 72 },
  { quarter: 'Q3 23', gpuUtil: 74, renewableOutput: 510, carbonIntensity: 65 },
  { quarter: 'Q4 23', gpuUtil: 79, renewableOutput: 580, carbonIntensity: 58 },
  { quarter: 'Q1 24', gpuUtil: 82, renewableOutput: 640, carbonIntensity: 52 },
  { quarter: 'Q2 24', gpuUtil: 86, renewableOutput: 720, carbonIntensity: 48 },
  { quarter: 'Q3 24', gpuUtil: 89, renewableOutput: 810, carbonIntensity: 44 },
  { quarter: 'Q4 24', gpuUtil: 91, renewableOutput: 900, carbonIntensity: 40 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length || !label) return null;

  const labels: Record<string, string> = {
    gpuUtil: 'GPU Utilization',
    renewableOutput: 'Renewable Output',
    carbonIntensity: 'Carbon Intensity',
  };

  const units: Record<string, string> = {
    gpuUtil: '%',
    renewableOutput: ' GWh',
    carbonIntensity: ' gCO2/kWh',
  };

  return (
    <div className="rounded-lg border border-[rgba(255,255,255,0.1)] bg-surface-4 px-3 py-2 shadow-xl">
      <p className="font-[family-name:var(--font-space-mono)] text-xs text-txt-secondary mb-1">
        {label}
      </p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-2 h-[2px] rounded" style={{ backgroundColor: entry.color }} />
          <p className="font-[family-name:var(--font-space-mono)] text-xs text-white">
            {labels[entry.dataKey] || entry.dataKey}: <span className="font-bold">{entry.value}{units[entry.dataKey] || ''}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

export function OperationalMetricsChart() {
  const data = useMemo(() => rawData, []);

  return (
    <div className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-surface-3 p-6">
      <div className="mb-4">
        <h3 className="font-[family-name:var(--font-space-mono)] text-sm font-bold text-white">
          Operational Performance
        </h3>
        <p className="font-[family-name:var(--font-space-mono)] text-xs text-txt-dim">
          Key operational metrics across all verticals — quarterly
        </p>
      </div>
      <div style={{ height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
            />
            <XAxis
              dataKey="quarter"
              tick={{ fill: 'var(--text-dim)', fontSize: 11, fontFamily: 'var(--font-space-mono)' }}
              axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
              tickLine={false}
            />
            <YAxis
              yAxisId="left"
              tick={{ fill: 'var(--text-dim)', fontSize: 11, fontFamily: 'var(--font-space-mono)' }}
              axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
              tickLine={false}
              tickFormatter={(v: number) => `${v}%`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fill: 'var(--text-dim)', fontSize: 11, fontFamily: 'var(--font-space-mono)' }}
              axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
              tickLine={false}
              tickFormatter={(v: number) => `${v}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontFamily: 'var(--font-space-mono)', fontSize: 11 }}
              formatter={(value: string) => <span className="text-txt-secondary">{value}</span>}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="gpuUtil"
              name="GPU Util"
              stroke="#8B9DAF"
              strokeWidth={2}
              dot={{ fill: '#8B9DAF', r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: '#8B9DAF', stroke: '#fff', strokeWidth: 2 }}
              animationBegin={0}
              animationDuration={1200}
              animationEasing="ease-out"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="renewableOutput"
              name="Renewable GWh"
              stroke="#6B9F6B"
              strokeWidth={2}
              dot={{ fill: '#6B9F6B', r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: '#6B9F6B', stroke: '#fff', strokeWidth: 2 }}
              animationBegin={200}
              animationDuration={1200}
              animationEasing="ease-out"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="carbonIntensity"
              name="Carbon gCO2"
              stroke="#A87878"
              strokeWidth={2}
              strokeDasharray="4 3"
              dot={{ fill: '#A87878', r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: '#A87878', stroke: '#fff', strokeWidth: 2 }}
              animationBegin={400}
              animationDuration={1200}
              animationEasing="ease-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
