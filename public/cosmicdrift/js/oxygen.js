/* ============================================================
   CosmicDrift - oxygen.js
   Oxygen production/consumption, environmental hazards
   ============================================================ */

const Oxygen = (function () {
  'use strict';

  // ----------------------------------------------------------
  // Hazard Definitions
  // ----------------------------------------------------------
  const HAZARDS = {
    toxic_storm: {
      name: 'Toxic Storm',
      description: 'A cloud of corrosive gas sweeps across the colony.',
      damage: { building: 10, unit: 5 },
      oxygenImpact: -3,
      duration: 1,
      warningText: 'Toxic storm approaching! Seek shelter.'
    },
    volcanic_eruption: {
      name: 'Volcanic Eruption',
      description: 'Molten rock surges from the planet crust.',
      damage: { building: 20, unit: 15 },
      oxygenImpact: -5,
      duration: 2,
      warningText: 'Seismic activity detected! Volcanic eruption imminent!'
    },
    seismic_event: {
      name: 'Seismic Event',
      description: 'Violent ground tremors shake the colony.',
      damage: { building: 15, unit: 8 },
      oxygenImpact: -2,
      duration: 1,
      warningText: 'Ground instability detected! Brace for impact!'
    },
    tidal_shift: {
      name: 'Tidal Shift',
      description: 'Massive tidal forces flood coastal areas.',
      damage: { building: 12, unit: 6 },
      oxygenImpact: -1,
      duration: 1,
      warningText: 'Tidal anomalies detected! Coastal areas at risk!'
    },
    alien_wildlife: {
      name: 'Alien Wildlife Attack',
      description: 'Aggressive native creatures attack the colony.',
      damage: { building: 8, unit: 10 },
      oxygenImpact: 0,
      duration: 1,
      warningText: 'Large lifeforms approaching the colony perimeter!'
    }
  };

  // ----------------------------------------------------------
  // Oxygen Processing (called each turn during resolution)
  // ----------------------------------------------------------
  function processTurn() {
    const state = Game.STATE;

    // Calculate oxygen production
    let produced = 0;
    let consumed = 0;

    // Buildings that produce oxygen
    for (const [key, hex] of StarMap.getMapData().hexes) {
      if (hex.owner !== 'player' || !hex.building) continue;

      if (hex.building.production && hex.building.production.oxygen) {
        let o2Amount = hex.building.production.oxygen;

        // Catalytic Synthesis tech bonus
        const o2Tech = TechTree ? TechTree.getTech('oxygen_boost') : null;
        if (o2Tech && o2Tech.researched) {
          o2Amount = Math.ceil(o2Amount * 1.5);
        }

        produced += o2Amount;
      }

      if (hex.building.consumption && hex.building.consumption.oxygen) {
        consumed += hex.building.consumption.oxygen;
      }
    }

    // Colonist consumption
    const colonistO2 = state.player ? state.player.colonists : 5;
    consumed += colonistO2;

    // Unit consumption (each unit uses 1 oxygen/turn)
    const playerUnits = Units ? Units.getPlayerUnits() : [];
    consumed += playerUnits.length;

    // Net oxygen
    const netO2 = produced - consumed;

    state.oxygenProduced = produced;
    state.oxygenConsumed = consumed;
    state.oxygen = Math.max(0, state.oxygen + netO2);

    // If oxygen depleted, bad things happen
    if (state.oxygen <= 0) {
      applyOxygenDepletion();
    } else {
      // Restore buildings when oxygen is available
      restoreOfflineBuildings();
    }

    // Process active hazard if any
    if (state.pendingHazard) {
      applyHazard(state.pendingHazard);
      state.pendingHazard = null;
      state.hazardWarning = false;
    }

    // Trigger warning for next hazard
    state.hazardWarning = false;

    Game.emit('oxygen:updated', {
      oxygen: state.oxygen,
      produced,
      consumed,
      net: netO2
    });
  }

  // ----------------------------------------------------------
  // Oxygen Depletion Effects
  // ----------------------------------------------------------
  function applyOxygenDepletion() {
    const state = Game.STATE;

    // Colonists die at 10% per turn
    if (state.player && state.player.colonists > 0) {
      const deaths = Math.max(1, Math.ceil(state.player.colonists * 0.1));
      Player.removeColonists(deaths);

      Game.emit('notification', {
        type: 'danger',
        title: 'Oxygen Depleted',
        text: `${deaths} colonist(s) suffocated. Build Oxygen Extractors immediately!`
      });
    }

    // Buildings shut down (mark as offline - they don't produce)
    for (const [key, hex] of StarMap.getMapData().hexes) {
      if (hex.owner === 'player' && hex.building && hex.building.type !== 'crashed_ship') {
        hex.building.offline = true;
      }
    }

    // Units -50% combat (handled in combat calculation)
  }

  function restoreOfflineBuildings() {
    for (const [key, hex] of StarMap.getMapData().hexes) {
      if (hex.owner === 'player' && hex.building && hex.building.offline) {
        hex.building.offline = false;
      }
    }
  }

  // ----------------------------------------------------------
  // Hazard System
  // ----------------------------------------------------------
  function checkHazard() {
    const state = Game.STATE;

    // If we have a warning, the hazard strikes next turn
    if (state.hazardWarning && state.pendingHazard) {
      return; // Will be applied next processTurn
    }

    // Random chance of new hazard
    const hazardChance = state.diffMod ? state.diffMod.hazardChance : 0.15;
    if (Math.random() > hazardChance) return;

    // Check if shield generator protects
    const hasShield = Array.from(StarMap.getMapData().hexes.values())
      .some(h => h.owner === 'player' && h.building && h.building.type === 'shield_gen');

    if (hasShield && Math.random() < 0.5) {
      // Shield blocked the hazard
      Game.emit('notification', {
        type: 'info',
        title: 'Hazard Blocked',
        text: 'Your Shield Generator blocked an incoming environmental hazard.'
      });
      return;
    }

    // Select random hazard type
    const hazardKeys = Object.keys(HAZARDS);
    const hazardKey = hazardKeys[Math.floor(Math.random() * hazardKeys.length)];
    const hazardDef = HAZARDS[hazardKey];

    // Warning phase - player gets 1 turn notice
    state.pendingHazard = {
      type: hazardKey,
      ...hazardDef
    };
    state.hazardWarning = true;

    Game.emit('notification', {
      type: 'warning',
      title: 'Hazard Warning',
      text: hazardDef.warningText
    });
  }

  function applyHazard(hazard) {
    if (!hazard) return;

    const state = Game.STATE;

    // Apply damage to player buildings
    for (const [key, hex] of StarMap.getMapData().hexes) {
      if (hex.owner !== 'player' || !hex.building) continue;

      // Shield generator protects nearby buildings
      const nearShield = isNearShield(hex.q, hex.r);
      if (nearShield) continue;

      hex.building.hp -= hazard.damage.building;
      if (hex.building.hp <= 0) {
        Game.emit('notification', {
          type: 'danger',
          title: 'Building Destroyed',
          text: `${hex.building.name} was destroyed by ${hazard.name}!`
        });
        hex.building = null;
      }
    }

    // Apply damage to player units
    const playerUnits = Units ? Units.getPlayerUnits() : [];
    playerUnits.forEach(unit => {
      const hex = StarMap.getHex(unit.q, unit.r);
      if (hex && isNearShield(hex.q, hex.r)) return;

      unit.hp -= hazard.damage.unit;
      if (unit.hp <= 0) {
        Game.emit('notification', {
          type: 'danger',
          title: 'Unit Lost',
          text: `${unit.name} was killed by ${hazard.name}!`
        });

        // Remove unit
        if (hex) hex.unit = null;
        const idx = Game.STATE.units.indexOf(unit);
        if (idx >= 0) Game.STATE.units.splice(idx, 1);
      }
    });

    // Oxygen impact
    if (hazard.oxygenImpact) {
      state.oxygen = Math.max(0, state.oxygen + hazard.oxygenImpact);
    }

    Game.emit('notification', {
      type: 'danger',
      title: hazard.name,
      text: hazard.description
    });

    Game.emit('hazard:applied', hazard);
  }

  function isNearShield(q, r) {
    for (const [key, hex] of StarMap.getMapData().hexes) {
      if (hex.owner !== 'player' || !hex.building) continue;
      if (hex.building.type !== 'shield_gen') continue;

      const radius = Player.BUILDINGS.shield_gen.radius || 2;
      const dist = StarMap.hexDistance(q, r, hex.q, hex.r);
      if (dist <= radius) return true;
    }
    return false;
  }

  // ----------------------------------------------------------
  // Oxygen Status Helpers
  // ----------------------------------------------------------
  function getOxygenStatus() {
    const state = Game.STATE;
    const pct = state.oxygen / state.oxygenMax;

    if (pct > 0.5) return { level: 'safe', color: '#5b9e7a', label: 'Stable' };
    if (pct > 0.2) return { level: 'warning', color: '#c9a84c', label: 'Low' };
    return { level: 'critical', color: '#c75c5c', label: 'Critical' };
  }

  function getOxygenNet() {
    return Game.STATE.oxygenProduced - Game.STATE.oxygenConsumed;
  }

  // ----------------------------------------------------------
  // Serialization
  // ----------------------------------------------------------
  function serialize() {
    return {
      oxygen: Game.STATE.oxygen,
      oxygenMax: Game.STATE.oxygenMax,
      oxygenProduced: Game.STATE.oxygenProduced,
      oxygenConsumed: Game.STATE.oxygenConsumed,
      pendingHazard: Game.STATE.pendingHazard,
      hazardWarning: Game.STATE.hazardWarning
    };
  }

  function deserialize(data) {
    if (!data) return;
    Game.STATE.oxygen = data.oxygen || 72;
    Game.STATE.oxygenMax = data.oxygenMax || 72;
    Game.STATE.oxygenProduced = data.oxygenProduced || 0;
    Game.STATE.oxygenConsumed = data.oxygenConsumed || 0;
    Game.STATE.pendingHazard = data.pendingHazard || null;
    Game.STATE.hazardWarning = data.hazardWarning || false;
  }

  // ----------------------------------------------------------
  // Public API
  // ----------------------------------------------------------
  return {
    HAZARDS,
    processTurn,
    checkHazard,
    getOxygenStatus,
    getOxygenNet,
    isNearShield,
    serialize,
    deserialize
  };
})();
