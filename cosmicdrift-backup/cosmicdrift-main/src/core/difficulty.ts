// Difficulty settings
// Configurable game difficulty

export interface DifficultySettings {
  name: string;
  startingFuel: number;
  startingOxygen: number;
  startingHull: number;
  startingCredits: number;
  fuelPerMove: number;
  oxygenPerTurn: number;
  hazardDamageMultiplier: number;
  resourceMultiplier: number;
  randomEventChance: number;
}

export const DIFFICULTIES: Record<string, DifficultySettings> = {
  easy: {
    name: 'Cadet',
    startingFuel: 120,
    startingOxygen: 120,
    startingHull: 120,
    startingCredits: 75,
    fuelPerMove: 6,
    oxygenPerTurn: 2,
    hazardDamageMultiplier: 0.7,
    resourceMultiplier: 1.5,
    randomEventChance: 0.4,
  },
  normal: {
    name: 'Captain',
    startingFuel: 100,
    startingOxygen: 100,
    startingHull: 100,
    startingCredits: 50,
    fuelPerMove: 8,
    oxygenPerTurn: 3,
    hazardDamageMultiplier: 1.0,
    resourceMultiplier: 1.0,
    randomEventChance: 0.3,
  },
  hard: {
    name: 'Admiral',
    startingFuel: 80,
    startingOxygen: 80,
    startingHull: 80,
    startingCredits: 25,
    fuelPerMove: 10,
    oxygenPerTurn: 4,
    hazardDamageMultiplier: 1.4,
    resourceMultiplier: 0.7,
    randomEventChance: 0.2,
  },
};

export function getDifficulty(key: string): DifficultySettings {
  return DIFFICULTIES[key] || DIFFICULTIES.normal;
}
