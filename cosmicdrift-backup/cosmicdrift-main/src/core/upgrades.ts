// Ship upgrade system
// Spend credits to improve your ship

import { GameState } from '../types/game';
import { addLog } from './state';

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  maxLevel: number;
  apply: (state: GameState) => GameState;
}

export const UPGRADES: Upgrade[] = [
  {
    id: 'fuel_tank',
    name: 'Extended Fuel Tank',
    description: '+20 max fuel capacity',
    cost: 30,
    maxLevel: 3,
    apply: (state) => ({
      ...state,
      ship: {
        ...state.ship,
        resources: {
          ...state.ship.resources,
          fuel: Math.min(state.ship.resources.fuel + 20, 100 + 20),
        },
      },
    }),
  },
  {
    id: 'o2_scrubber',
    name: 'O2 Scrubber',
    description: 'Reduce oxygen consumption by 1 per turn',
    cost: 40,
    maxLevel: 2,
    apply: (state) => addLog(state, 'O2 Scrubber installed. Oxygen usage reduced.'),
  },
  {
    id: 'hull_plating',
    name: 'Reinforced Hull Plating',
    description: '+15 hull integrity',
    cost: 35,
    maxLevel: 3,
    apply: (state) => ({
      ...state,
      ship: {
        ...state.ship,
        resources: {
          ...state.ship.resources,
          hull: Math.min(state.ship.resources.hull + 15, 100 + 15),
        },
      },
    }),
  },
  {
    id: 'scanner',
    name: 'Long Range Scanner',
    description: 'Increase scan range by 1',
    cost: 25,
    maxLevel: 2,
    apply: (state) => addLog(state, 'Scanner upgraded. Range increased.'),
  },
];

export interface OwnedUpgrade {
  id: string;
  level: number;
}

export function purchaseUpgrade(state: GameState, upgradeId: string): GameState {
  const upgrade = UPGRADES.find(u => u.id === upgradeId);
  if (!upgrade) {
    return addLog(state, 'Unknown upgrade.');
  }

  if (state.ship.resources.credits < upgrade.cost) {
    return addLog(state, `Not enough credits. Need ${upgrade.cost}, have ${state.ship.resources.credits}.`);
  }

  const newState = {
    ...state,
    ship: {
      ...state.ship,
      resources: {
        ...state.ship.resources,
        credits: state.ship.resources.credits - upgrade.cost,
      },
    },
  };

  return addLog(upgrade.apply(newState), `Upgrade purchased: ${upgrade.name}`);
}

export function renderUpgradeShop(): string[] {
  const lines: string[] = [];
  lines.push('╔══════════════════════════════════╗');
  lines.push('║      🛠 SHIP UPGRADES             ║');
  lines.push('╠══════════════════════════════════╣');

  for (const u of UPGRADES) {
    lines.push(`║ ${u.name}`);
    lines.push(`║   ${u.description}`);
    lines.push(`║   Cost: ${u.cost} credits`);
    lines.push('║');
  }

  lines.push('╚══════════════════════════════════╝');
  return lines;
}
