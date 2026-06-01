// Game state management
// Creates and manages the game state

import { GameState, GameStatus, ShipResources } from '../types/game';
import { DifficultySettings } from './difficulty';

export function createInitialState(difficulty?: DifficultySettings): GameState {
  const diff = difficulty || {
    startingFuel: 100,
    startingOxygen: 100,
    startingHull: 100,
    startingCredits: 50,
  };

  return {
    ship: {
      position: { x: 0, y: 0 },
      resources: {
        fuel: diff.startingFuel,
        oxygen: diff.startingOxygen,
        hull: diff.startingHull,
        credits: diff.startingCredits,
      },
      speed: 1,
      shieldActive: false,
    },
    currentSystem: null,
    visitedSystems: ['sys_0_0'],
    turnCount: 0,
    gameStatus: GameStatus.Playing,
    log: [
      'Systems online. Welcome aboard, Captain.',
      'Your ship is at the origin system.',
      'Objective: Reach Starbase Omega at (15, 15).',
    ],
  };
}

export function consumeFuel(state: GameState, amount: number): GameState {
  const fuel = Math.max(0, state.ship.resources.fuel - amount);
  return {
    ...state,
    ship: {
      ...state.ship,
      resources: { ...state.ship.resources, fuel },
    },
    gameStatus: fuel <= 0 ? GameStatus.Lost : state.gameStatus,
    log: fuel <= 0
      ? [...state.log, 'CRITICAL: Out of fuel. Ship adrift in the void.']
      : state.log,
  };
}

export function consumeOxygen(state: GameState, amount: number): GameState {
  const oxygen = Math.max(0, state.ship.resources.oxygen - amount);
  return {
    ...state,
    ship: {
      ...state.ship,
      resources: { ...state.ship.resources, oxygen },
    },
    gameStatus: oxygen <= 0 ? GameStatus.Lost : state.gameStatus,
    log: oxygen <= 0
      ? [...state.log, 'CRITICAL: Oxygen depleted. Crew lost.']
      : state.log,
  };
}

export function addLog(state: GameState, message: string): GameState {
  return {
    ...state,
    log: [...state.log.slice(-50), message],
  };
}
