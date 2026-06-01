// Star system name generator
// Creates believable sci-fi star system names

const PREFIXES = [
  'Kepler', 'Proxima', 'Alpha', 'Beta', 'Gamma', 'Delta',
  'Sigma', 'Tau', 'Zeta', 'Omega', 'Nova', 'Vega',
  'Altair', 'Rigel', 'Sirius', 'Polaris', 'Castor',
  'Deneb', 'Arcturus', 'Capella', 'Mira', 'Lyra',
];

const SUFFIXES = [
  'Prime', 'Minor', 'Major', 'Outpost', 'Station',
  'Reach', 'Crossing', 'Haven', 'Gate', 'Depot',
  'Nexus', 'Point', 'Drift', 'Anchor', 'Watch',
];

const GREEK = [
  'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

export function generateStarName(seed: number): string {
  const rng = seededRandom(seed);
  const prefix = PREFIXES[Math.floor(rng() * PREFIXES.length)];
  const suffix = rng() > 0.5 
    ? ` ${GREEK[Math.floor(rng() * GREEK.length)]}` 
    : ` ${SUFFIXES[Math.floor(rng() * SUFFIXES.length)]}`;
  return `${prefix}${suffix}`;
}

export function generateSystemId(x: number, y: number): string {
  return `sys_${x}_${y}`;
}
