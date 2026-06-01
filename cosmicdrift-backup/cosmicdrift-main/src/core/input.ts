// Input handler
// Processes keyboard input for game actions

import blessed from 'blessed';
import { GameState, GameStatus } from '../types/game';
import { moveShip } from './movement';
import { collectResources, repairHull } from './resources';
import { processHazard, randomEvent } from './events';
import { checkWinCondition } from './wincondition';
import { scanNearbySystems } from './scan';
import { addLog } from './state';

export function setupInput(
  screen: blessed.Widgets.Screen,
  getState: () => GameState,
  setState: (state: GameState) => void,
  starMap: any[],
  onRender: () => void,
): void {
  screen.key(['w', 'up'], () => handleMove(0, -1));
  screen.key(['s', 'down'], () => handleMove(0, 1));
  screen.key(['a', 'left'], () => handleMove(-1, 0));
  screen.key(['d', 'right'], () => handleMove(1, 0));

  screen.key(['e'], () => {
    let state = collectResources(getState());
    setState(state);
    onRender();
  });

  screen.key(['r'], () => {
    let state = repairHull(getState());
    setState(state);
    onRender();
  });

  screen.key(['f'], () => {
    let state = scanNearbySystems(getState(), starMap);
    setState(state);
    onRender();
  });

  function handleMove(dx: number, dy: number) {
    let state = moveShip(getState(), dx, dy, starMap);
    
    if (state.gameStatus !== GameStatus.Playing) {
      setState(state);
      onRender();
      return;
    }

    // Process encounters
    const hazardResult = processHazard(state);
    state = hazardResult.state;

    // Random event
    const event = randomEvent(state);
    if (event) {
      state = event.state;
    }

    // Win condition check
    state = checkWinCondition(state);

    setState(state);
    onRender();
  }
}
