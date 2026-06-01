// Main game screen
// Wires together all UI components with blessed

import blessed from 'blessed';
import { GameState, GameStatus, StarSystem } from '../types/game';
import { renderStarMap } from './starmap';
import { renderHUD, renderLog } from './hud';
import { renderSystemInfo } from './systeminfo';
import { TITLE_ART } from './ascii';

export function createGameScreen(): blessed.Widgets.Screen {
  const screen = blessed.screen({
    smartCSR: true,
    title: 'CosmicDrift',
    fullUnicode: true,
  });

  screen.key(['q', 'C-c'], () => {
    process.exit(0);
  });

  return screen;
}

export function renderGame(
  screen: blessed.Widgets.Screen,
  state: GameState,
  starMap: StarSystem[],
): void {
  screen.children.forEach(c => screen.remove(c));

  // Title bar
  const titleBar = blessed.box({
    top: 0,
    left: 0,
    width: '100%',
    height: 1,
    content: ' 🚀 CosmicDrift — Terminal Space Survival ',
    style: { fg: 'cyan', bg: 'blue', bold: true },
  });

  // Star map (left)
  const mapLines = renderStarMap(starMap, state.ship.position, 25, 12);
  const mapBox = blessed.box({
    top: 1,
    left: 0,
    width: '50%',
    height: '55%',
    content: mapLines.join('\n'),
    style: { fg: 'green', bg: 'black' },
    border: { type: 'line' },
    label: ' Star Map ',
  });

  // System info (right)
  const infoLines = renderSystemInfo(state.currentSystem);
  const infoBox = blessed.box({
    top: 1,
    left: '50%',
    width: '50%',
    height: '55%',
    content: infoLines.join('\n'),
    style: { fg: 'white', bg: 'black' },
    border: { type: 'line' },
    label: state.currentSystem ? ` ${state.currentSystem.name} ` : ' Deep Space ',
  });

  // HUD (left bottom)
  const hudLines = renderHUD(state);
  const hudBox = blessed.box({
    top: '55%',
    left: 0,
    width: '50%',
    height: '30%',
    content: hudLines.join('\n'),
    style: { fg: 'white', bg: 'black' },
    border: { type: 'line' },
    label: ' Ship Status ',
  });

  // Log (right bottom)
  const logLines = renderLog(state.log);
  const logBox = blessed.box({
    top: '55%',
    left: '50%',
    width: '50%',
    height: '30%',
    content: logLines.join('\n'),
    style: { fg: 'yellow', bg: 'black' },
    border: { type: 'line' },
    label: ' Ship Log ',
  });

  // Controls
  const controls = blessed.box({
    bottom: 0,
    left: 0,
    width: '100%',
    height: 1,
    content: ' WASD: Move | E: Collect | R: Repair | F: Scan | Q: Quit ',
    style: { fg: 'black', bg: 'white' },
  });

  screen.append(titleBar);
  screen.append(mapBox);
  screen.append(infoBox);
  screen.append(hudBox);
  screen.append(logBox);
  screen.append(controls);

  // Game over / win overlay
  if (state.gameStatus !== GameStatus.Playing) {
    const isWin = state.gameStatus === GameStatus.Won;
    const overlay = blessed.box({
      top: 'center',
      left: 'center',
      width: 45,
      height: 7,
      content: isWin
        ? '{center}🎉 YOU SURVIVED! 🎉\n\nStarbase Omega reached!\nYou conquered the void!\nPress Q to quit{/center}'
        : '{center}💀 GAME OVER 💀\n\nYour ship was lost in the void.\nPress Q to quit{/center}',
      tags: true,
      border: { type: 'line' },
      style: {
        fg: isWin ? 'green' : 'red',
        bg: 'black',
        border: { fg: isWin ? 'green' : 'red' },
      },
    });
    screen.append(overlay);
  }

  screen.render();
}

export function showTitleScreen(screen: blessed.Widgets.Screen): void {
  screen.children.forEach(c => screen.remove(c));

  const title = blessed.box({
    top: 'center',
    left: 'center',
    width: 70,
    height: 15,
    content: TITLE_ART.join('\n') + '\n\n    A terminal space survival game\n    Navigate the void. Reach Starbase Omega.\n\n         Press ENTER to launch',
    style: { fg: 'cyan', bg: 'black' },
  });

  screen.append(title);
  screen.render();
}
