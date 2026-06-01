// Scan system
// Discover nearby star systems without visiting them

import { GameState, StarSystem } from '../types/game';
import { addLog } from './state';

const SCAN_RANGE = 3;

export function scanNearbySystems(state: GameState, starMap: StarSystem[]): GameState {
  const { x, y } = state.ship.position;
  
  const nearby = starMap.filter(s => {
    const dist = Math.abs(s.position.x - x) + Math.abs(s.position.y - y);
    return dist > 0 && dist <= SCAN_RANGE;
  });

  if (nearby.length === 0) {
    return addLog(state, 'Scan complete. No systems detected nearby.');
  }

  // Discover nearby systems
  let newState = addLog(state, `📡 Scan: ${nearby.length} system(s) detected within range ${SCAN_RANGE}`);

  for (const system of nearby) {
    if (!system.discovered) {
      system.discovered = true;
      newState = addLog(newState, `  Discovered: ${system.name} (${system.type}) at (${system.position.x}, ${system.position.y})`);
    }
  }

  return newState;
}

export function getSystemAtPosition(
  x: number,
  y: number,
  starMap: StarSystem[],
): StarSystem | null {
  return starMap.find(s => s.position.x === x && s.position.y === y) || null;
}
