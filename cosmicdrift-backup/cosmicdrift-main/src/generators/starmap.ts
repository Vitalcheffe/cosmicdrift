// Procedural star map generator
// Creates a grid of star systems with resources and hazards

import { StarSystem, StarType, HazardType } from '../types/game';
import { generateStarName, generateSystemId } from './names';

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

const STAR_TYPE_WEIGHTS: [StarType, number][] = [
  [StarType.Yellow, 0.35],
  [StarType.Red, 0.25],
  [StarType.Blue, 0.15],
  [StarType.White, 0.12],
  [StarType.Neutron, 0.08],
  [StarType.BlackHole, 0.05],
];

const HAZARD_TYPES = [
  HazardType.AsteroidField,
  HazardType.SolarFlare,
  HazardType.Nebula,
  HazardType.Pirates,
  HazardType.GravityWell,
];

function pickStarType(rng: () => number): StarType {
  const roll = rng();
  let cumulative = 0;
  for (const [type, weight] of STAR_TYPE_WEIGHTS) {
    cumulative += weight;
    if (roll <= cumulative) return type;
  }
  return StarType.Yellow;
}

export function generateStarMap(
  width: number,
  height: number,
  seed: number = 42
): StarSystem[] {
  const rng = seededRandom(seed);
  const systems: StarSystem[] = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // ~70% chance of a system existing at each point
      if (rng() > 0.7) continue;

      const id = generateSystemId(x, y);
      const name = generateStarName(Math.floor(rng() * 99999));
      const type = pickStarType(rng);

      const system: StarSystem = {
        id,
        name,
        position: { x, y },
        type,
        discovered: false,
        visited: false,
      };

      // Add resources based on star type
      if (type === StarType.Yellow || type === StarType.White) {
        system.resources = {
          fuel: Math.floor(rng() * 30) + 10,
          oxygen: Math.floor(rng() * 25) + 5,
          metals: Math.floor(rng() * 20),
        };
      } else if (type === StarType.Red) {
        system.resources = {
          fuel: Math.floor(rng() * 20) + 5,
          metals: Math.floor(rng() * 30) + 10,
        };
      } else if (type === StarType.Blue) {
        system.resources = {
          oxygen: Math.floor(rng() * 40) + 15,
        };
      }

      // Add hazards (30% chance)
      if (rng() > 0.7 && type !== StarType.BlackHole) {
        system.hazard = HAZARD_TYPES[Math.floor(rng() * HAZARD_TYPES.length)];
      }

      systems.push(system);
    }
  }

  // Ensure starting system is safe
  const startSystem = systems.find(s => s.position.x === 0 && s.position.y === 0);
  if (startSystem) {
    startSystem.hazard = undefined;
    startSystem.discovered = true;
    startSystem.visited = true;
  }

  return systems;
}
