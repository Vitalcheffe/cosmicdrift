// CosmicDrift - A terminal space survival game
// Built by Amine for Hack Club Stardance

import { createGameScreen, renderGame, showTitleScreen } from './ui/screen';
import { createInitialState } from './core/state';
import { generateStarMap } from './generators/starmap';
import { addStarbaseToMap } from './core/wincondition';
import { setupInput } from './core/input';
import { calculateScore, renderScore } from './core/score';
import { GameStatus } from './types/game';

function main() {
  const screen = createGameScreen();

  // Generate star map with starbase
  let starMap = generateStarMap(20, 20, 42);
  starMap = addStarbaseToMap(starMap);

  let gameState = createInitialState();

  // Show title screen
  showTitleScreen(screen);

  screen.key(['enter', 'space'], function startGame() {
    const startSystem = starMap.find(s => s.position.x === 0 && s.position.y === 0);
    if (startSystem) {
      gameState = { ...gameState, currentSystem: startSystem };
    }

    screen.unkey(['enter', 'space'], startGame);

    setupInput(
      screen,
      () => gameState,
      (state) => { gameState = state; },
      starMap,
      () => {
        renderGame(screen, gameState, starMap);

        // Show score on game end
        if (gameState.gameStatus !== GameStatus.Playing) {
          const score = calculateScore(gameState);
          console.log('\n' + renderScore(score).join('\n'));
        }
      },
    );

    renderGame(screen, gameState, starMap);
  });
}

main();
