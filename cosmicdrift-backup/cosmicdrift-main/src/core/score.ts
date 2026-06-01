// Score calculation
// Calculate final score based on performance

import { GameState, GameStatus } from '../types/game';

export interface GameScore {
  total: number;
  breakdown: {
    survivalBonus: number;
    resourceBonus: number;
    speedBonus: number;
    explorationBonus: number;
    victoryBonus: number;
  };
  rank: string;
}

export function calculateScore(state: GameState): GameScore {
  const { fuel, oxygen, hull, credits } = state.ship.resources;

  // Survived X turns
  const survivalBonus = state.turnCount * 5;

  // Resources remaining
  const resourceBonus = Math.floor((fuel + oxygen + hull) / 3) + credits;

  // Speed bonus — fewer turns = better
  const speedBonus = state.gameStatus === GameStatus.Won
    ? Math.max(0, 200 - state.turnCount * 3)
    : 0;

  // Systems explored
  const explorationBonus = state.visitedSystems.length * 10;

  // Win bonus
  const victoryBonus = state.gameStatus === GameStatus.Won ? 500 : 0;

  const total = survivalBonus + resourceBonus + speedBonus + explorationBonus + victoryBonus;

  let rank: string;
  if (total >= 1000) rank = '⭐⭐⭐ Legendary Captain';
  else if (total >= 700) rank = '⭐⭐ Admiral';
  else if (total >= 500) rank = '⭐ Captain';
  else if (total >= 300) rank = 'Commander';
  else if (total >= 150) rank = 'Lieutenant';
  else rank = 'Cadet';

  return {
    total,
    breakdown: {
      survivalBonus,
      resourceBonus,
      speedBonus,
      explorationBonus,
      victoryBonus,
    },
    rank,
  };
}

export function renderScore(score: GameScore): string[] {
  const lines: string[] = [];
  lines.push('╔══════════════════════════════════╗');
  lines.push('║        🏆 MISSION SCORE            ║');
  lines.push('╠══════════════════════════════════╣');
  lines.push(`║ Survival:    ${String(score.breakdown.survivalBonus).padStart(5)} pts`);
  lines.push(`║ Resources:   ${String(score.breakdown.resourceBonus).padStart(5)} pts`);
  lines.push(`║ Speed:       ${String(score.breakdown.speedBonus).padStart(5)} pts`);
  lines.push(`║ Exploration: ${String(score.breakdown.explorationBonus).padStart(5)} pts`);
  lines.push(`║ Victory:     ${String(score.breakdown.victoryBonus).padStart(5)} pts`);
  lines.push('╠══════════════════════════════════╣');
  lines.push(`║ TOTAL:       ${String(score.total).padStart(5)} pts`);
  lines.push(`║ Rank: ${score.rank}`);
  lines.push('╚══════════════════════════════════╝');
  return lines;
}
