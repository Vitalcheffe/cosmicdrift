// Star map renderer
// Draws the procedural star map in the terminal

import { StarSystem, StarType } from '../types/game';
import { Position } from '../types/game';

const STAR_SYMBOLS: Record<string, string> = {
  [StarType.Yellow]: '☀',
  [StarType.Red]: '●',
  [StarType.Blue]: '◆',
  [StarType.White]: '○',
  [StarType.Neutron]: '⚡',
  [StarType.BlackHole]: '◉',
};

const HAZARD_SYMBOL = '⚠';

export function renderStarMap(
  systems: StarSystem[],
  shipPosition: Position,
  viewportWidth: number = 30,
  viewportHeight: number = 15,
): string[] {
  const lines: string[] = [];
  
  // Find bounds centered on ship
  const halfW = Math.floor(viewportWidth / 2);
  const halfH = Math.floor(viewportHeight / 2);
  const minX = shipPosition.x - halfW;
  const maxX = shipPosition.x + halfW;
  const minY = shipPosition.y - halfH;
  const maxY = shipPosition.y + halfH;

  // Build grid
  for (let y = minY; y <= maxY; y++) {
    let line = '';
    for (let x = minX; x <= maxX; x++) {
      if (x === shipPosition.x && y === shipPosition.y) {
        line += '▲';  // Ship position
      } else {
        const system = systems.find(s => s.position.x === x && s.position.y === y);
        if (system) {
          if (!system.discovered) {
            line += '?';
          } else if (system.hazard) {
            line += HAZARD_SYMBOL;
          } else {
            line += STAR_SYMBOLS[system.type] || '·';
          }
        } else {
          line += '·';
        }
      }
    }
    lines.push(line);
  }

  return lines;
}

export function renderLegend(): string[] {
  return [
    'Legend:',
    `  ☀ Yellow  ● Red  ◆ Blue  ○ White`,
    `  ⚡ Neutron  ◉ BlackHole  ⚠ Hazard`,
    `  ▲ Your Ship  ? Undiscovered  · Empty`,
  ];
}
