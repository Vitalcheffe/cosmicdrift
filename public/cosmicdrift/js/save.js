/* ============================================================
   CosmicDrift - save.js
   Save/load using localStorage with 3 slots + auto-save
   ============================================================ */

const Save = (function () {
  'use strict';

  const SAVE_KEY = 'cosmicdrift_save_';
  const AUTO_KEY = 'cosmicdrift_autosave';
  const VERSION = '2.0.0';

  // ----------------------------------------------------------
  // Serialize complete game state
  // ----------------------------------------------------------
  function serializeState() {
    return {
      version: VERSION,
      timestamp: new Date().toLocaleString(),
      turn: Game.STATE.turn,
      difficulty: Game.STATE.difficulty,
      mapSize: Game.STATE.mapSize,
      phase: Game.STATE.phase,
      gameOver: Game.STATE.gameOver,
      victoryType: Game.STATE.victoryType,
      oxygen: Game.STATE.oxygen,
      oxygenMax: Game.STATE.oxygenMax,
      oxygenProduced: Game.STATE.oxygenProduced,
      oxygenConsumed: Game.STATE.oxygenConsumed,
      pendingHazard: Game.STATE.pendingHazard,
      hazardWarning: Game.STATE.hazardWarning,
      singularityProgress: Game.STATE.singularityProgress,
      beaconDefendTurns: Game.STATE.beaconDefendTurns,
      terraformProgress: Game.STATE.terraformProgress,
      currentResearch: Game.STATE.currentResearch,
      researchProgress: Game.STATE.researchProgress,
      tutorialStep: Game.STATE.tutorialStep,
      tutorialActive: Game.STATE.tutorialActive,

      // Module data
      map: StarMap.serialize(),
      player: Player.serialize(),
      units: Units.serialize(),
      techs: TechTree.serialize(),
      factions: AI.serialize(),
      clones: Cloning.serialize(),
      oxygenModule: Oxygen.serialize(),

      // Camera
      camera: { ...Renderer.camera },
    };
  }

  // ----------------------------------------------------------
  // Deserialize and restore game state
  // ----------------------------------------------------------
  function deserializeState(data) {
    if (!data) return false;

    // Version check
    if (data.version && data.version !== VERSION) {
      console.warn('Save version mismatch:', data.version, 'vs', VERSION);
    }

    // Restore core state
    Game.STATE.turn = data.turn || 1;
    Game.STATE.difficulty = data.difficulty || 'normal';
    Game.STATE.mapSize = data.mapSize || 'medium';
    Game.STATE.phase = data.phase || 'playing';
    Game.STATE.gameOver = data.gameOver || false;
    Game.STATE.victoryType = data.victoryType || null;
    Game.STATE.oxygen = data.oxygen || 72;
    Game.STATE.oxygenMax = data.oxygenMax || 72;
    Game.STATE.oxygenProduced = data.oxygenProduced || 0;
    Game.STATE.oxygenConsumed = data.oxygenConsumed || 0;
    Game.STATE.pendingHazard = data.pendingHazard || null;
    Game.STATE.hazardWarning = data.hazardWarning || false;
    Game.STATE.singularityProgress = data.singularityProgress || 0;
    Game.STATE.beaconDefendTurns = data.beaconDefendTurns || 0;
    Game.STATE.terraformProgress = data.terraformProgress || 0;
    Game.STATE.currentResearch = data.currentResearch || null;
    Game.STATE.researchProgress = data.researchProgress || 0;
    Game.STATE.tutorialStep = data.tutorialStep || 0;
    Game.STATE.tutorialActive = data.tutorialActive || false;

    // Difficulty modifiers
    const diffMod = {
      easy:   { oxygen: 120, resources: 1.5, hazardChance: 0.08, aiAggression: 0.3 },
      normal: { oxygen: 72,  resources: 1.0, hazardChance: 0.15, aiAggression: 0.5 },
      hard:   { oxygen: 48,  resources: 0.7, hazardChance: 0.25, aiAggression: 0.8 }
    };
    Game.STATE.diffMod = diffMod[Game.STATE.difficulty] || diffMod.normal;

    // Restore module data
    if (data.map) StarMap.deserialize(data.map);
    if (data.player) Player.deserialize(data.player);
    if (data.units) Units.deserialize(data.units);
    if (data.techs) TechTree.deserialize(data.techs);
    if (data.factions) AI.deserialize(data.factions);
    if (data.clones) Cloning.deserialize(data.clones);
    if (data.oxygenModule) Oxygen.deserialize(data.oxygenModule);

    // Restore camera
    if (data.camera) {
      Object.assign(Renderer.camera, data.camera);
    }

    Game.STATE.running = true;

    // Update visibility
    StarMap.updateVisibility();

    return true;
  }

  // ----------------------------------------------------------
  // Save to slot
  // ----------------------------------------------------------
  function save(slot) {
    try {
      const data = serializeState();
      const key = slot === 0 ? AUTO_KEY : SAVE_KEY + slot;
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('Save failed:', e);
      return false;
    }
  }

  // ----------------------------------------------------------
  // Load from slot
  // ----------------------------------------------------------
  function load(slot) {
    try {
      const key = slot === 0 ? AUTO_KEY : SAVE_KEY + slot;
      const raw = localStorage.getItem(key);
      if (!raw) return false;

      const data = JSON.parse(raw);
      return deserializeState(data);
    } catch (e) {
      console.error('Load failed:', e);
      return false;
    }
  }

  // ----------------------------------------------------------
  // Auto-save
  // ----------------------------------------------------------
  function autoSave() {
    save(0);
  }

  // ----------------------------------------------------------
  // Get save info for display
  // ----------------------------------------------------------
  function getSaves() {
    const saves = [];

    // Slots 1-3
    for (let i = 1; i <= 3; i++) {
      try {
        const raw = localStorage.getItem(SAVE_KEY + i);
        if (raw) {
          const data = JSON.parse(raw);
          saves.push({
            slot: i,
            turn: data.turn,
            difficulty: data.difficulty,
            timestamp: data.timestamp
          });
        } else {
          saves.push(null);
        }
      } catch (e) {
        saves.push(null);
      }
    }

    // Auto-save (slot 0)
    try {
      const raw = localStorage.getItem(AUTO_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        saves.push({
          slot: 0,
          turn: data.turn,
          difficulty: data.difficulty,
          timestamp: data.timestamp
        });
      } else {
        saves.push(null);
      }
    } catch (e) {
      saves.push(null);
    }

    return saves;
  }

  // ----------------------------------------------------------
  // Delete save
  // ----------------------------------------------------------
  function deleteSave(slot) {
    const key = slot === 0 ? AUTO_KEY : SAVE_KEY + slot;
    localStorage.removeItem(key);
  }

  // ----------------------------------------------------------
  // Quick save (to slot 1)
  // ----------------------------------------------------------
  function quickSave() {
    if (save(1)) {
      Game.emit('notification', {
        type: 'success',
        title: 'Game Saved',
        text: 'Game saved to Slot 1.'
      });
    }
  }

  // ----------------------------------------------------------
  // Public API
  // ----------------------------------------------------------
  return {
    save,
    load,
    autoSave,
    getSaves,
    deleteSave,
    quickSave,
    serializeState,
    deserializeState
  };
})();
