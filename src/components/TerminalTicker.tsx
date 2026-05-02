'use client';

export function TerminalTicker() {
  const messages = [
    '>> SYSTEM STATUS: NOMINAL',
    'COMPUTE LOAD: 78%',
    'BANDWIDTH: STABLE',
    'NEXT DEPLOYMENT: DAKHLA PHASE 1',
    'GPU CLUSTER: 47,892/50,000 ONLINE',
    'ENERGY GRID: 1.84GW / 2.1GW CAPACITY',
    'DESALINATION: 142M m³ YTD',
    'CEMENT PLANT GAMBI: PERMIT RENEWED Q3',
    'CYBER THREAT LEVEL: LOW',
    'SUBMARINE CABLE LATENCY: 4.2ms',
    'COBALT REFINING: 99.4% PURITY',
    'IOT MESH: 2,847 NODES ACTIVE',
    'SATELLITE UPLINK: STRONG',
    'H2 ELECTROLYZER: 72% EFFICIENCY',
    'WATER DISTRIBUTION AI: v2.1 DEPLOYED',
  ];

  const separator = ' // ';
  const fullText = messages.join(separator) + separator;

  return (
    <div className="terminal-ticker">
      <div className="terminal-ticker-content">
        {/* Duplicate for seamless loop */}
        <span>{fullText}</span>
        <span>{fullText}</span>
      </div>
    </div>
  );
}
