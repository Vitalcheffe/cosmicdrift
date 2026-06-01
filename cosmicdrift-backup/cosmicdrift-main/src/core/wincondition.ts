// Win condition
// Find and reach the starbase to win the game

import { GameState, GameStatus } from '../types/game';
import { StarSystem, StarType } from '../types/game';
import { addLog } from './state';

export function addStarbaseToMap(starMap: StarSystem[]): StarSystem[] {
  // Place starbase at a distant system
  const starbase: StarSystem = {
    id: 'starbase_omega',
    name: 'Starbase Omega',
    position: { x: 15, y: 15 },
    type: StarType.White,
    resources: {
      fuel: 100,
      oxygen: 100,
      metals: 100,
    },
    discovered: false,
    visited: false,
  };

  // Remove any existing system at that position and add starbase
  const filtered = starMap.filter(s => !(s.position.x === 15 && s.position.y === 15));
  filtered.push(starbase);

  return filtered;
}

export function checkWinCondition(state: GameState): GameState {
  if (state.currentSystem?.id === 'starbase_omega') {
    return {
      ...state,
      gameStatus: GameStatus.Won,
      log: [...state.log, '🎉 STARBASE OMEGA REACHED! You survived the void!'],
    };
  }

  // Hint system - every 10 turns, give a direction hint
  if (state.turnCount > 0 && state.turnCount % 10 === 0) {
    const dx = 15 - state.ship.position.x;
    const dy = 15 - state.ship.position.y;
    const direction = [];
    if (dy < 0) direction.push('north');
    if (dy > 0) direction.push('south');
    if (dx > 0) direction.push('east');
    if (dx < 0) direction.push('west');

    return addLog(state, `📡 Signal detected to the ${direction.join('-')}. Starbase Omega?`);
  }

  return state;
}
