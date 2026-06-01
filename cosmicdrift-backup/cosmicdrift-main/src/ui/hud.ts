// HUD (Heads-Up Display) renderer
// Shows ship resources and game info

import { GameState } from '../types/game';
import { getResourceBar } from './ascii';

export function renderHUD(state: GameState): string[] {
  const { fuel, oxygen, hull, credits } = state.ship.resources;
  const lines: string[] = [];

  lines.push('╔══════════════════════════════════════╗');
  lines.push('║        🚀 SHIP STATUS                ║');
  lines.push('╠══════════════════════════════════════╣');
  lines.push(`║ 🛢 Fuel:   ${getResourceBar(fuel)} ${String(fuel).padStart(3)}% ║`);
  lines.push(`║ 🌿 Oxygen: ${getResourceBar(oxygen)} ${String(oxygen).padStart(3)}% ║`);
  lines.push(`║ 🔧 Hull:   ${getResourceBar(hull)} ${String(hull).padStart(3)}% ║`);
  lines.push(`║ 💰 Credits: ${String(credits).padStart(3)}                       ║`);
  lines.push('╠══════════════════════════════════════╣');
  lines.push(`║ Position: (${state.ship.position.x}, ${state.ship.position.y})              ║`);
  lines.push(`║ Turn: ${state.turnCount}                             ║`);
  lines.push('╚══════════════════════════════════════╝');

  return lines;
}

export function renderLog(log: string[], maxLines: number = 5): string[] {
  const recent = log.slice(-maxLines);
  const lines: string[] = [];

  lines.push('╔══════════════════════════════════════╗');
  lines.push('║        📋 SHIP LOG                   ║');
  lines.push('╠══════════════════════════════════════╣');

  for (const entry of recent) {
    const padded = entry.length > 36 ? entry.substring(0, 36) + '…' : entry;
    lines.push(`║ ${padded.padEnd(37)}║`);
  }

  // Pad empty lines
  while (recent.length < maxLines) {
    lines.push(`║ ${''.padEnd(37)}║`);
    recent.push('');
  }

  lines.push('╚══════════════════════════════════════╝');

  return lines;
}
