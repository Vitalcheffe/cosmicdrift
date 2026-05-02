'use client';

import { useState, useEffect } from 'react';

interface FeedItem {
  id: number;
  timestamp: string;
  type: 'info' | 'data' | 'system';
  message: string;
  vertical?: string;
}

const feedMessages: Omit<FeedItem, 'id' | 'timestamp'>[] = [
  { type: 'data', message: 'Dakhla GPU cluster node-47 health check: PASS', vertical: '/0.1' },
  { type: 'info', message: 'Gambia cement plant permit renewal confirmed — Q3 2026', vertical: '/0.2' },
  { type: 'system', message: 'Sahel solar farm output: 847MW peak — 98.2% uptime', vertical: '/0.3' },
  { type: 'data', message: 'Cyber threat scan complete — 0 incidents detected', vertical: '/0.4' },
  { type: 'info', message: 'Mauritania phosphate core sample analysis: grade 31.2% P2O5', vertical: '/0.5' },
  { type: 'system', message: 'Dakar IoT sensor mesh: 2,847 nodes online', vertical: '/0.6' },
  { type: 'data', message: 'Desalination membrane efficiency: 99.1% — within spec', vertical: '/0.7' },
  { type: 'system', message: 'Submarine cable CAS-DKL latency: 4.2ms — nominal', vertical: '/0.1' },
  { type: 'info', message: 'Green hydrogen electrolyzer test: 72% efficiency achieved', vertical: '/0.3' },
  { type: 'data', message: 'Bamako water distribution AI model v2.1 deployed', vertical: '/0.7' },
  { type: 'system', message: 'Casablanca HQ security perimeter: SECURE', vertical: '/0.0' },
  { type: 'info', message: 'Cement kiln #2 temperature: 1,420°C — optimal range', vertical: '/0.2' },
  { type: 'data', message: 'Satellite uplink NOU-ESA signal: -67dBm — strong', vertical: '/0.4' },
  { type: 'system', message: 'Cobalt refining batch #147 purity: 99.4% Co', vertical: '/0.5' },
  { type: 'info', message: 'Vertical farm zone-C yield forecast: +12% vs Q1', vertical: '/0.6' },
];

function getTimestamp() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
}

export function LiveFeed() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Initial populate
    const initial: FeedItem[] = feedMessages.slice(0, 4).map((msg, i) => ({
      ...msg,
      id: i,
      timestamp: getTimestamp(),
    }));
    setItems(initial);
    setCounter(4);

    // Add new items periodically
    const interval = setInterval(() => {
      setCounter(prev => {
        const next = prev % feedMessages.length;
        const newItem: FeedItem = {
          ...feedMessages[next],
          id: prev,
          timestamp: getTimestamp(),
        };
        setItems(prevItems => {
          const updated = [...prevItems, newItem];
          return updated.slice(-5); // Keep only last 5
        });
        return prev + 1;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const typeColor = (type: string) => {
    switch(type) {
      case 'data': return 'rgba(255,255,255,0.5)';
      case 'info': return 'rgba(255,255,255,0.35)';
      case 'system': return 'rgba(255,255,255,0.25)';
      default: return '#666666';
    }
  };

  return (
    <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#0A0A0A] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#666666] font-[family-name:var(--font-space-mono)]">
            System Feed
          </span>
        </div>
        <span className="text-[8px] text-[#444444] font-[family-name:var(--font-space-mono)]">
          {getTimestamp()} UTC+1
        </span>
      </div>

      {/* Feed items */}
      <div className="px-4 py-2 space-y-1.5 min-h-[140px]">
        {items.map((item, i) => (
          <div
            key={item.id}
            className="flex items-start gap-2 animate-fade-in-up"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <span className="text-[8px] text-[#444444] font-[family-name:var(--font-space-mono)] shrink-0 pt-0.5">
              {item.timestamp}
            </span>
            {item.vertical && (
              <span className="text-[7px] text-[#555555] font-[family-name:var(--font-space-mono)] shrink-0 pt-0.5">
                {item.vertical}
              </span>
            )}
            <span
              className="text-[9px] leading-relaxed font-[family-name:var(--font-space-mono)]"
              style={{ color: typeColor(item.type) }}
            >
              {item.message}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
