// Ship movement system
// Handles navigation between star systems

import { GameState, GameStatus } from '../types/game';
import { consumeFuel, consumeOxygen, addLog } from './state';

const FUEL_PER_SECTOR = 8;
const OXYGEN_PER_TURN = 3;

export function moveShip(state: GameState, dx: number, dy: number, starMap: any[]): GameState {
  if (state.gameStatus !== GameStatus.Playing) return state;

  const newX = state.ship.position.x + dx;
  const newY = state.ship.position.y + dy;

  // Calculate distance for fuel consumption
  const distance = Math.abs(dx) + Math.abs(dy);
  const fuelNeeded = distance * FUEL_PER_SECTOR;

  if (state.ship.resources.fuel < fuelNeeded) {
    return addLog(state, 'Not enough fuel for that jump! Need ' + fuelNeeded + ' fuel.');
  }

  // Check if there's a system at the destination
  const targetSystem = starMap.find(s => s.position.x === newX && s.position.y === newY);

  let newState = consumeFuel(state, fuelNeeded);
  newState = consumeOxygen(newState, OXYGEN_PER_TURN);
  newState = {
    ...newState,
    ship: { ...newState.ship, position: { x: newX, y: newY } },
    turnCount: newState.turnCount + 1,
  };

  if (targetSystem) {
    targetSystem.discovered = true;
    targetSystem.visited = true;
    newState = addLog(newState, `Arrived at ${targetSystem.name} [${targetSystem.type}]`);
    newState = { ...newState, currentSystem: targetSystem };

    if (targetSystem.hazard) {
      newState = addLog(newState, `⚠ WARNING: ${targetSystem.hazard} detected!`);
    }
  } else {
    newState = addLog(newState, `Jumped to sector (${newX}, ${newY}) — empty space.`);
    newState = { ...newState, currentSystem: null };
  }

  return newState;
}

export function getReachableSystems(state: GameState, starMap: any[]): any[] {
  const { x, y } = state.ship.position;
  const maxDistance = Math.floor(state.ship.resources.fuel / FUEL_PER_SECTOR);

  return starMap.filter(s => {
    const dist = Math.abs(s.position.x - x) + Math.abs(s.position.y - y);
    return dist > 0 && dist <= maxDistance;
  });
}
