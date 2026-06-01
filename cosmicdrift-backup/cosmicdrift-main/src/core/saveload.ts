// Save/Load system
// Persist game state to disk

import * as fs from 'fs';
import * as path from 'path';
import { GameState } from '../types/game';

const SAVE_DIR = path.join(process.env.HOME || '/tmp', '.cosmicdrift');
const SAVE_FILE = path.join(SAVE_DIR, 'save.json');

export function saveGame(state: GameState): boolean {
  try {
    if (!fs.existsSync(SAVE_DIR)) {
      fs.mkdirSync(SAVE_DIR, { recursive: true });
    }

    const saveData = {
      version: 1,
      timestamp: new Date().toISOString(),
      state,
    };

    fs.writeFileSync(SAVE_FILE, JSON.stringify(saveData, null, 2));
    return true;
  } catch (error) {
    console.error('Failed to save game:', error);
    return false;
  }
}

export function loadGame(): GameState | null {
  try {
    if (!fs.existsSync(SAVE_FILE)) {
      return null;
    }

    const data = fs.readFileSync(SAVE_FILE, 'utf-8');
    const saveData = JSON.parse(data);

    if (saveData.version !== 1) {
      console.error('Incompatible save file version');
      return null;
    }

    return saveData.state;
  } catch (error) {
    console.error('Failed to load game:', error);
    return null;
  }
}

export function hasSaveFile(): boolean {
  return fs.existsSync(SAVE_FILE);
}

export function deleteSave(): boolean {
  try {
    if (fs.existsSync(SAVE_FILE)) {
      fs.unlinkSync(SAVE_FILE);
    }
    return true;
  } catch {
    return false;
  }
}
