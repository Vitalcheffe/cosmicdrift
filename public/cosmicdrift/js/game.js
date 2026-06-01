/* ============================================================
   CosmicDrift - game.js
   Core game state, event bus, turn processing
   ============================================================ */

const Game = (function () {
  'use strict';

  // ----------------------------------------------------------
  // Event Bus - lightweight pub/sub for inter-module communication
  // ----------------------------------------------------------
  const _listeners = {};

  function on(event, fn) {
    if (!_listeners[event]) _listeners[event] = [];
    _listeners[event].push(fn);
  }

  function off(event, fn) {
    if (!_listeners[event]) return;
    _listeners[event] = _listeners[event].filter(f => f !== fn);
  }

  function emit(event, data) {
    if (!_listeners[event]) return;
    _listeners[event].forEach(fn => {
      try { fn(data); } catch (e) { console.error(`Event handler error [${event}]:`, e); }
    });
  }

  // ----------------------------------------------------------
  // Game State
  // ----------------------------------------------------------
  const STATE = {
    version: '2.0.0',
    phase: 'title',       // title | playing | gameover
    turnPhase: 'action',  // action | resolution | event
    turn: 1,
    difficulty: 'normal',
    mapSize: 'medium',
    running: false,
    gameOver: false,
    victoryType: null,

    // Core data containers (populated by modules)
    map: null,             // hex grid data from starmap
    player: null,          // player state from player
    units: [],             // all units on map
    factions: [],          // AI factions
    clones: [],            // active clones
    allies: [],            // recruited allies
    techs: null,           // tech tree data
    currentResearch: null, // tech being researched
    researchProgress: 0,   // science accumulated toward current tech

    // Oxygen
    oxygen: 72,           // hours of oxygen remaining
    oxygenMax: 72,
    oxygenProduced: 0,
    oxygenConsumed: 0,

    // Hazards
    pendingHazard: null,
    hazardWarning: false,

    // Victory tracking
    singularityProgress: 0,
    beaconDefendTurns: 0,
    terraformProgress: 0,

    // Tutorial
    tutorialStep: 0,
    tutorialActive: false,

    // UI State
    selectedHex: null,     // {q, r} of selected hex
    selectedUnit: null,    // unit object reference
    camera: { x: 0, y: 0, zoom: 1 },
  };

  // ----------------------------------------------------------
  // Turn Processing
  // ----------------------------------------------------------
  function endTurn() {
    if (STATE.phase !== 'playing' || STATE.gameOver) return;

    emit('turn:end', { turn: STATE.turn });
    STATE.turnPhase = 'resolution';
    processResolution();
    STATE.turnPhase = 'event';
    processEvents();
    STATE.turn++;
    STATE.turnPhase = 'action';
    emit('turn:start', { turn: STATE.turn });

    // Check victory conditions
    checkVictory();

    // Auto-save every 5 turns
    if (STATE.turn % 5 === 0 && typeof Save !== 'undefined') {
      Save.autoSave();
    }
  }

  function processResolution() {
    // 1. Resource gathering from buildings
    if (typeof Player !== 'undefined') Player.gatherResources();

    // 2. Unit healing in friendly territory
    if (typeof Units !== 'undefined') Units.healUnits();

    // 3. Oxygen processing
    if (typeof Oxygen !== 'undefined') Oxygen.processTurn();

    // 4. Research progress
    processResearch();

    // 5. Colony growth
    if (typeof Player !== 'undefined') Player.processColonists();

    // 6. Faction AI actions
    if (typeof AI !== 'undefined') AI.processTurn();

    // 7. Clone cooldowns
    if (typeof Cloning !== 'undefined') Cloning.processTurn();

    emit('resolution:complete');
  }

  function processEvents() {
    // Random events and hazards
    if (typeof Oxygen !== 'undefined') Oxygen.checkHazard();

    // Faction interactions
    if (typeof AI !== 'undefined') AI.processEvents();

    emit('events:complete');
  }

  function processResearch() {
    if (!STATE.currentResearch) return;

    // Science output from buildings
    let science = Player ? Player.getScienceOutput() : 2;
    STATE.researchProgress += science;

    const tech = STATE.techs.find(t => t.id === STATE.currentResearch);
    if (tech && STATE.researchProgress >= tech.cost) {
      tech.researched = true;
      STATE.currentResearch = null;
      STATE.researchProgress = 0;
      emit('tech:researched', tech);
      emit('notification', {
        type: 'success',
        title: 'Research Complete',
        text: `${tech.name} has been researched.`
      });
    }
  }

  function checkVictory() {
    // Scientific victory
    if (STATE.singularityProgress >= 1 && STATE.beaconDefendTurns >= 5) {
      achieveVictory('scientific');
    }

    // Diplomatic victory
    if (STATE.factions.length >= 3) {
      const allFriendly = STATE.factions.every(f => f.relation >= 60);
      if (allFriendly) achieveVictory('diplomatic');
    }

    // Conquest victory
    if (STATE.factions.length >= 3) {
      const allCaptured = STATE.factions.every(f => f.capitalCaptured);
      if (allCaptured) achieveVictory('conquest');
    }

    // Survival victory
    if (STATE.terraformProgress >= 15) {
      achieveVictory('survival');
    }

    // Defeat: no colonists left
    if (STATE.player && STATE.player.colonists <= 0) {
      STATE.gameOver = true;
      STATE.phase = 'gameover';
      emit('game:defeat', { reason: 'All colonists have perished.' });
    }
  }

  function achieveVictory(type) {
    STATE.gameOver = true;
    STATE.phase = 'gameover';
    STATE.victoryType = type;
    emit('game:victory', { type });
  }

  // ----------------------------------------------------------
  // New Game Setup
  // ----------------------------------------------------------
  function newGame(difficulty, mapSize) {
    // Reset state
    STATE.phase = 'playing';
    STATE.turnPhase = 'action';
    STATE.turn = 1;
    STATE.difficulty = difficulty || 'normal';
    STATE.mapSize = mapSize || 'medium';
    STATE.running = true;
    STATE.gameOver = false;
    STATE.victoryType = null;
    STATE.selectedHex = null;
    STATE.selectedUnit = null;
    STATE.currentResearch = null;
    STATE.researchProgress = 0;
    STATE.singularityProgress = 0;
    STATE.beaconDefendTurns = 0;
    STATE.terraformProgress = 0;
    STATE.pendingHazard = null;
    STATE.hazardWarning = false;
    STATE.units = [];
    STATE.clones = [];
    STATE.allies = [];

    // Difficulty modifiers
    const diffMod = {
      easy:   { oxygen: 120, resources: 1.5, hazardChance: 0.08, aiAggression: 0.3 },
      normal: { oxygen: 72,  resources: 1.0, hazardChance: 0.15, aiAggression: 0.5 },
      hard:   { oxygen: 48,  resources: 0.7, hazardChance: 0.25, aiAggression: 0.8 }
    };
    STATE.diffMod = diffMod[STATE.difficulty] || diffMod.normal;

    STATE.oxygen = STATE.diffMod.oxygen;
    STATE.oxygenMax = STATE.oxygen;

    // Generate map
    if (typeof StarMap !== 'undefined') {
      STATE.map = StarMap.generate(STATE.mapSize);
    }

    // Initialize player
    if (typeof Player !== 'undefined') {
      STATE.player = Player.init(STATE.diffMod);
    }

    // Initialize tech tree
    if (typeof TechTree !== 'undefined') {
      STATE.techs = TechTree.init();
    }

    // Initialize factions
    if (typeof AI !== 'undefined') {
      STATE.factions = AI.init(STATE.map, STATE.diffMod);
    }

    // Place starting units
    if (typeof Units !== 'undefined') {
      const startHex = StarMap ? StarMap.getPlayerStart() : { q: 0, r: 0 };
      Units.createStartingUnits(startHex);
    }

    // Start tutorial
    STATE.tutorialActive = true;
    STATE.tutorialStep = 0;

    emit('game:start', { difficulty, mapSize });
  }

  // ----------------------------------------------------------
  // Public API
  // ----------------------------------------------------------
  return {
    STATE,
    on,
    off,
    emit,
    endTurn,
    newGame,
  };
})();
