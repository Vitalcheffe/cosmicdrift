// Random encounter and event system
// Creates unpredictable situations in deep space

import { GameState, GameStatus, HazardType } from '../types/game';
import { addLog } from './state';

interface EncounterResult {
  state: GameState;
  description: string;
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

export function processHazard(state: GameState): EncounterResult {
  if (!state.currentSystem?.hazard) {
    return { state, description: 'Space is quiet here.' };
  }

  const hazard = state.currentSystem.hazard;
  const rng = seededRandom(state.turnCount * 7919 + state.ship.position.x * 104729);

  switch (hazard) {
    case HazardType.AsteroidField: {
      const damage = Math.floor(rng() * 15) + 5;
      const newState = {
        ...state,
        ship: {
          ...state.ship,
          resources: { ...state.ship.resources, hull: Math.max(0, state.ship.resources.hull - damage) },
        },
        gameStatus: state.ship.resources.hull - damage <= 0 ? GameStatus.Lost : state.gameStatus,
      };
      return {
        state: addLog(newState, `💥 Asteroid impact! Hull damage: -${damage}`),
        description: `Your ship navigates through the asteroid field. A rogue rock slams into the hull!`,
      };
    }

    case HazardType.SolarFlare: {
      const oxygenLoss = Math.floor(rng() * 12) + 5;
      const newState = {
        ...state,
        ship: {
          ...state.ship,
          resources: { ...state.ship.resources, oxygen: Math.max(0, state.ship.resources.oxygen - oxygenLoss) },
        },
      };
      return {
        state: addLog(newState, `☀ Solar flare! Oxygen vented: -${oxygenLoss}`),
        description: `A massive solar flare erupts, breaching the oxygen tanks!`,
      };
    }

    case HazardType.Nebula: {
      const fuelDrain = Math.floor(rng() * 10) + 3;
      const fuelGain = Math.floor(rng() * 20) + 10;
      const newState = {
        ...state,
        ship: {
          ...state.ship,
          resources: {
            ...state.ship.resources,
            fuel: Math.min(100, state.ship.resources.fuel + fuelGain - fuelDrain),
          },
        },
      };
      return {
        state: addLog(newState, `🌫 Nebula: lost ${fuelDrain} fuel, but harvested ${fuelGain} from the gas cloud`),
        description: `The nebula's electromagnetic storms wreak havoc on your systems, but you manage to siphon hydrogen.`,
      };
    }

    case HazardType.Pirates: {
      const creditsLost = Math.floor(rng() * 30) + 10;
      const newState = {
        ...state,
        ship: {
          ...state.ship,
          resources: {
            ...state.ship.resources,
            credits: Math.max(0, state.ship.resources.credits - creditsLost),
          },
        },
      };
      return {
        state: addLog(newState, `🏴‍☠️ Pirates! They took ${creditsLost} credits`),
        description: `Pirates board your ship and loot your cargo hold before jumping away.`,
      };
    }

    case HazardType.GravityWell: {
      const fuelLoss = Math.floor(rng() * 15) + 8;
      const newState = {
        ...state,
        ship: {
          ...state.ship,
          resources: { ...state.ship.resources, fuel: Math.max(0, state.ship.resources.fuel - fuelLoss) },
        },
      };
      return {
        state: addLog(newState, `🌀 Gravity well! Extra fuel burned escaping: -${fuelLoss}`),
        description: `The intense gravitational pull requires maximum thrust to escape!`,
      };
    }

    default:
      return { state, description: 'Nothing happens.' };
  }
}

export function randomEvent(state: GameState): EncounterResult | null {
  const rng = seededRandom(state.turnCount * 31 + 7);
  if (rng() > 0.3) return null; // 30% chance of random event

  const roll = rng();

  if (roll < 0.25) {
    const fuel = Math.floor(rng() * 15) + 5;
    return {
      state: addLog({
        ...state,
        ship: {
          ...state.ship,
          resources: {
            ...state.ship.resources,
            fuel: Math.min(100, state.ship.resources.fuel + fuel),
          },
        },
      }, `🛢 Derelict tanker found! +${fuel} fuel`),
      description: 'You find an abandoned fuel tanker drifting in space.',
    };
  }

  if (roll < 0.5) {
    const credits = Math.floor(rng() * 25) + 10;
    return {
      state: addLog({
        ...state,
        ship: {
          ...state.ship,
          resources: { ...state.ship.resources, credits: state.ship.resources.credits + credits },
        },
      }, `💎 Salvage! Found ${credits} credits worth of tech`),
      description: 'Debris from a destroyed vessel contains valuable components.',
    };
  }

  if (roll < 0.7) {
    const oxygen = Math.floor(rng() * 10) + 5;
    return {
      state: addLog({
        ...state,
        ship: {
          ...state.ship,
          resources: {
            ...state.ship.resources,
            oxygen: Math.min(100, state.ship.resources.oxygen + oxygen),
          },
        },
      }, `🌿 Oxygen garden! +${oxygen} oxygen`),
      description: 'Your hydroponics bay produces a fresh batch of oxygen.',
    };
  }

  return {
    state: addLog(state, '📡 Distress signal detected... but it fades away.'),
    description: 'A faint distress signal reaches your comms, then disappears.',
  };
}
