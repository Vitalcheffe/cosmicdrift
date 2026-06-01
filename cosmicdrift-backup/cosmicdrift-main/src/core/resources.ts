// Resource collection and management
// Handle gathering resources from star systems

import { GameState } from '../types/game';
import { addLog } from './state';

const MAX_RESOURCE = 100;

export function collectResources(state: GameState): GameState {
  if (!state.currentSystem || !state.currentSystem.resources) {
    return addLog(state, 'No collectible resources at this location.');
  }

  const res = state.currentSystem.resources;
  let newState = { ...state };
  const collected: string[] = [];

  if (res.fuel && res.fuel > 0) {
    const amount = Math.min(res.fuel, MAX_RESOURCE - newState.ship.resources.fuel);
    if (amount > 0) {
      newState.ship.resources.fuel += amount;
      collected.push(`${amount} fuel`);
      res.fuel -= amount;
    }
  }

  if (res.oxygen && res.oxygen > 0) {
    const amount = Math.min(res.oxygen, MAX_RESOURCE - newState.ship.resources.oxygen);
    if (amount > 0) {
      newState.ship.resources.oxygen += amount;
      collected.push(`${amount} oxygen`);
      res.oxygen -= amount;
    }
  }

  if (res.metals && res.metals > 0) {
    const credits = res.metals * 2;
    newState.ship.resources.credits += credits;
    collected.push(`${credits} credits (from metals)`);
    res.metals = 0;
  }

  if (collected.length > 0) {
    newState = addLog(newState, `Collected: ${collected.join(', ')}`);
  } else {
    newState = addLog(newState, 'Resources already depleted here.');
  }

  return newState;
}

export function repairHull(state: GameState, cost: number = 20): GameState {
  if (state.ship.resources.credits < cost) {
    return addLog(state, `Not enough credits for repairs. Need ${cost}, have ${state.ship.resources.credits}.`);
  }

  const repairAmount = Math.min(25, MAX_RESOURCE - state.ship.resources.hull);
  if (repairAmount <= 0) {
    return addLog(state, 'Hull is already at maximum integrity.');
  }

  return addLog({
    ...state,
    ship: {
      ...state.ship,
      resources: {
        ...state.ship.resources,
        credits: state.ship.resources.credits - cost,
        hull: state.ship.resources.hull + repairAmount,
      },
    },
  }, `Hull repaired by ${repairAmount}. Cost: ${cost} credits.`);
}
