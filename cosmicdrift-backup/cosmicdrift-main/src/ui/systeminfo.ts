// System information display
// Shows details about the current star system

import { StarSystem, StarType, HazardType } from '../types/game';
import { STAR_ART } from './ascii';

const TYPE_DESCRIPTIONS: Record<string, string> = {
  [StarType.Yellow]: 'A stable yellow dwarf. Good for resupply.',
  [StarType.Red]: 'An aging red giant. Rich in metals, scarce in organics.',
  [StarType.Blue]: 'A hot blue giant. Rich oxygen atmosphere.',
  [StarType.White]: 'A dense white dwarf. Valuable minerals.',
  [StarType.Neutron]: 'A rapidly spinning neutron star. Dangerous radiation.',
  [StarType.BlackHole]: 'A collapsed star. Extreme gravitational forces.',
};

const HAZARD_DESCRIPTIONS: Record<string, string> = {
  [HazardType.AsteroidField]: 'Dense asteroid field — risk of collision.',
  [HazardType.SolarFlare]: 'Solar flare activity — may breach oxygen tanks.',
  [HazardType.Nebula]: 'Electromagnetic nebula — chaotic but harvestable.',
  [HazardType.Pirates]: 'Pirate activity detected — guard your credits.',
  [HazardType.GravityWell]: 'Gravity well — extra fuel needed to escape.',
};

export function renderSystemInfo(system: StarSystem | null): string[] {
  if (!system) {
    return ['  Empty space. Nothing to see here.', '  Use WASD to navigate to a star system.'];
  }

  const lines: string[] = [];

  // Star art
  const art = STAR_ART[system.type] || STAR_ART['Yellow'];
  lines.push(...art);

  lines.push('');
  lines.push(`  ${system.name}`);
  lines.push(`  Type: ${system.type}`);
  lines.push(`  ${TYPE_DESCRIPTIONS[system.type] || 'Unknown star type.'}`);

  if (system.hazard) {
    lines.push('');
    lines.push(`  ⚠ ${system.hazard}`);
    lines.push(`  ${HAZARD_DESCRIPTIONS[system.hazard] || 'Unknown hazard.'}`);
  }

  if (system.resources) {
    lines.push('');
    lines.push('  Available resources:');
    if (system.resources.fuel) lines.push(`    🛢 Fuel: +${system.resources.fuel}`);
    if (system.resources.oxygen) lines.push(`    🌿 Oxygen: +${system.resources.oxygen}`);
    if (system.resources.metals) lines.push(`    🔩 Metals: +${system.resources.metals} (→ ${system.resources.metals * 2} credits)`);
    lines.push('  Press E to collect');
  }

  return lines;
}
