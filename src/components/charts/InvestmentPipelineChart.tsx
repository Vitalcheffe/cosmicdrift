'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';
import { useMemo, useState } from 'react';

interface InvestmentData {
  vertical: string;
  value: number;
}

const rawData: InvestmentData[] = [
  { vertical: 'Intelligence', value: 800 },
  { vertical: 'Energy', value: 600 },
  { vertical: 'Technology', value: 400 },
  { vertical: 'Cement', value: 200 },
  { vertical: 'Mining', value: 200 },
  { vertical: 'Agri', value: 150 },
  { vertical: 'Water', value: 150 },
  { vertical: 'Finance', value: 100 },
];

const BAR_FILL = '#8B9DAF';
const BAR_HOVER_FILL = '#A0B3C5';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: InvestmentData }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  return (
    <div className="rounded-lg border border-[rgba(255,255,255,0.1)] bg-[#1a1a1a] px-3 py-2 shadow-xl">
      <p className="font-[family-name:var(--font-space-mono)] text-xs text-[#999999]">
        {data.vertical}
      </p>
      <p className="font-[family-name:var(--font-space-mono)] text-sm font-bold text-white">
        ${data.value}M
      </p>
    </div>
  );
}

export function InvestmentPipelineChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const data = useMemo(() => rawData, []);

  return (
    <div className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#141414] p-6">
      <div className="mb-4">
        <h3 className="font-[family-name:var(--font-space-mono)] text-sm font-bold text-white">
          Investment Pipeline by Vertical
        </h3>
        <p className="font-[family-name:var(--font-space-mono)] text-xs text-[#666666]">
          Capital allocation across operating verticals ($M)
        </p>
      </div>
      <div style={{ height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 60, left: 10, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
              horizontal={false}
            />
            <XAxis
              type="number"
              tick={{ fill: '#666666', fontSize: 11, fontFamily: 'var(--font-space-mono)' }}
              axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
              tickLine={false}
              tickFormatter={(v: number) => `$${v}M`}
            />
            <YAxis
              type="category"
              dataKey="vertical"
              tick={{ fill: '#666666', fontSize: 11, fontFamily: 'var(--font-space-mono)' }}
              axisLine={false}
              tickLine={false}
              width={80}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Bar
              dataKey="value"
              radius={[0, 4, 4, 0]}
              animationBegin={0}
              animationDuration={1200}
              animationEasing="ease-out"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={hoveredIndex === index ? BAR_HOVER_FILL : BAR_FILL}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              ))}
              <LabelList
                dataKey="value"
                position="right"
                formatter={(v: number) => `$${v}M`}
                style={{
                  fill: '#999999',
                  fontSize: 11,
                  fontFamily: 'var(--font-space-mono)',
                }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
