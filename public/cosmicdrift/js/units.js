/* ============================================================
   CosmicDrift - units.js
   Unit creation, movement, combat system
   ============================================================ */

const Units = (function () {
  'use strict';

  // ----------------------------------------------------------
  // Unit Type Definitions
  // ----------------------------------------------------------
  const UNIT_TYPES = {
    scout: {
      name: 'Scout',
      era: 1,
      cost: { minerals: 5, credits: 10 },
      combat: 3,
      movePoints: 3,
      maxHp: 20,
      sightRange: 4,
      requiresTech: null,
      requiresBuilding: null,
      description: 'Fast reconnaissance unit with extended sight range.'
    },
    marine: {
      name: 'Marine',
      era: 1,
      cost: { minerals: 10, credits: 15 },
      combat: 8,
      movePoints: 2,
      maxHp: 40,
      sightRange: 2,
      requiresTech: null,
      requiresBuilding: null,
      description: 'Standard infantry. Reliable in combat.'
    },
    heavy_soldier: {
      name: 'Heavy Soldier',
      era: 2,
      cost: { minerals: 20, credits: 25 },
      combat: 14,
      movePoints: 1,
      maxHp: 60,
      sightRange: 2,
      requiresTech: 'basic_engineering',
      requiresBuilding: 'barracks',
      description: 'Armored infantry with high combat strength.'
    },
    assault_mech: {
      name: 'Assault Mech',
      era: 3,
      cost: { minerals: 40, credits: 50 },
      combat: 22,
      movePoints: 2,
      maxHp: 80,
      sightRange: 2,
      requiresTech: 'industrial_revolution',
      requiresBuilding: 'command_center',
      description: 'Mechanized war machine. Devastating in combat.'
    },
    artillery: {
      name: 'Artillery',
      era: 3,
      cost: { minerals: 35, credits: 40 },
      combat: 18,
      movePoints: 1,
      maxHp: 35,
      sightRange: 3,
      requiresTech: 'industrial_revolution',
      requiresBuilding: 'command_center',
      description: 'Long-range bombardment. Fragile but powerful.'
    },
    commander: {
      name: 'Commander',
      era: 3,
      cost: { minerals: 50, credits: 60 },
      combat: 16,
      movePoints: 2,
      maxHp: 70,
      sightRange: 3,
      requiresTech: 'industrial_revolution',
      requiresBuilding: 'command_center',
      description: 'Leadership unit. Boosts adjacent allies by +3 combat.',
      special: 'leadership'
    },
    // Faction units (AI only)
    sylphari_guard: {
      name: 'Sylphari Guard',
      era: 1,
      cost: {},
      combat: 6,
      movePoints: 2,
      maxHp: 30,
      sightRange: 2,
      requiresTech: null,
      requiresBuilding: null,
      description: 'Peaceful defenders of the forest.'
    },
    krath_warrior: {
      name: 'Krath Warrior',
      era: 1,
      cost: {},
      combat: 10,
      movePoints: 2,
      maxHp: 45,
      sightRange: 2,
      requiresTech: null,
      requiresBuilding: null,
      description: 'Fierce mountain warriors.'
    },
    aethori_sentinel: {
      name: 'Aethori Sentinel',
      era: 1,
      cost: {},
      combat: 7,
      movePoints: 2,
      maxHp: 35,
      sightRange: 3,
      requiresTech: null,
      requiresBuilding: null,
      description: 'Desert sentinels with keen sight.'
    }
  };

  // ----------------------------------------------------------
  // Unit Creation
  // ----------------------------------------------------------
  let nextUnitId = 1;

  function createUnit(type, owner, q, r) {
    const def = UNIT_TYPES[type];
    if (!def) return null;

    const hex = StarMap.getHex(q, r);
    if (!hex) return null;

    const unit = {
      id: nextUnitId++,
      type,
      name: def.name,
      owner,
      q, r,
      combat: def.combat,
      movePoints: def.movePoints,
      maxMovePoints: def.movePoints,
      hp: def.maxHp,
      maxHp: def.maxHp,
      sightRange: def.sightRange,
      special: def.special || null,
      hasMoved: false,
      hasAttacked: false,
      fortified: false,
    };

    Game.STATE.units.push(unit);
    hex.unit = unit;

    Game.emit('unit:created', unit);
    return unit;
  }

  function createStartingUnits(startHex) {
    // Player starts with a scout and marine near crash site
    createUnit('scout', 'player', startHex.q, startHex.r);
    createUnit('marine', 'player', startHex.q + 1, startHex.r);

    // Mark starting hexes as player territory
    const startHexObj = StarMap.getHex(startHex.q, startHex.r);
    if (startHexObj) {
      startHexObj.owner = 'player';
    }

    // Place crashed ship building
    if (startHexObj && !startHexObj.building) {
      startHexObj.building = {
        type: 'crashed_ship',
        name: 'Crashed Ship',
        owner: 'player',
        hp: 30,
        production: {},
        consumption: {}
      };
    }
  }

  // ----------------------------------------------------------
  // Unit Movement
  // ----------------------------------------------------------
  function moveUnit(unit, toQ, toR) {
    if (!unit || unit.hasMoved) return false;

    const fromHex = StarMap.getHex(unit.q, unit.r);
    const toHex = StarMap.getHex(toQ, toR);

    if (!fromHex || !toHex) return false;

    // Check movement range
    const dist = StarMap.hexDistance(unit.q, unit.r, toQ, toR);
    if (dist > unit.movePoints) return false;

    // Check if destination is occupied by friendly unit
    if (toHex.unit && toHex.unit.owner === unit.owner) return false;

    // If enemy unit, initiate combat instead
    if (toHex.unit && toHex.unit.owner !== unit.owner) {
      return attackUnit(unit, toHex.unit);
    }

    // Check path (simple: just verify distance for now)
    const moveCost = StarMap.BIOMES[toHex.biome] ? StarMap.BIOMES[toHex.biome].moveCost : 2;
    if (moveCost > unit.movePoints) return false;

    // Move the unit
    fromHex.unit = null;
    toHex.unit = unit;
    unit.q = toQ;
    unit.r = toR;
    unit.movePoints -= moveCost;
    unit.hasMoved = true;
    unit.fortified = false;

    // Check if moving onto an enemy capital (capture it)
    if (unit.owner === 'player' && toHex.building && toHex.building.type === 'capital' && toHex.building.owner !== 'player') {
      const faction = Game.STATE.factions.find(f => f.id === toHex.building.owner);
      if (faction) {
        faction.capitalCaptured = true;
        toHex.owner = 'player';
        toHex.building.owner = 'player';
        toHex.building.name = 'Captured Capital';
        Game.emit('notification', {
          type: 'success',
          title: 'Capital Captured',
          text: `You have captured the ${faction.name} capital!`
        });
      }
    }

    // Update visibility
    StarMap.updateVisibility();

    Game.emit('unit:moved', unit);
    return true;
  }

  // ----------------------------------------------------------
  // Combat
  // ----------------------------------------------------------
  function attackUnit(attacker, defender) {
    if (!attacker || !defender) return false;
    if (attacker.hasAttacked) return false;

    const attackerHex = StarMap.getHex(attacker.q, attacker.r);
    const defenderHex = StarMap.getHex(defender.q, defender.r);

    if (!attackerHex || !defenderHex) return false;

    // Terrain modifiers
    const defenderTerrain = StarMap.BIOMES[defenderHex.biome];
    const terrainMod = defenderHex.biome === 'iron' ? 1.3 :
                       defenderHex.biome === 'frozen' ? 1.1 : 1.0;

    // Leadership bonus
    let attackerBonus = 0;
    let defenderBonus = 0;

    // Check for adjacent commander
    Game.STATE.units.forEach(u => {
      if (u.special === 'leadership' && u.owner === attacker.owner && u.id !== attacker.id) {
        if (StarMap.hexDistance(u.q, u.r, attacker.q, attacker.r) <= 1) {
          attackerBonus += 3;
        }
      }
      if (u.special === 'leadership' && u.owner === defender.owner && u.id !== defender.id) {
        if (StarMap.hexDistance(u.q, u.r, defender.q, defender.r) <= 1) {
          defenderBonus += 3;
        }
      }
    });

    // Oxygen penalty
    if (Game.STATE.oxygen <= 0 && attacker.owner === 'player') {
      attackerBonus -= Math.floor(attacker.combat * 0.5);
    }

    // Calculate damage
    const attackerStrength = (attacker.combat + attackerBonus) * (attacker.hp / attacker.maxHp);
    const defenderStrength = (defender.combat + defenderBonus) * (defender.hp / defender.maxHp) * terrainMod;

    const damageToDefender = Math.max(1, Math.round(attackerStrength * 2));
    const damageToAttacker = Math.max(0, Math.round(defenderStrength * 1.0)); // 50% retaliation

    defender.hp -= damageToDefender;
    attacker.hp -= damageToAttacker;
    attacker.hasAttacked = true;
    attacker.hasMoved = true;

    // Combat results
    let result = 'draw';

    if (defender.hp <= 0) {
      // Defender destroyed - attacker advances
      defenderHex.unit = null;
      const idx = Game.STATE.units.indexOf(defender);
      if (idx >= 0) Game.STATE.units.splice(idx, 1);

      attackerHex.unit = null;
      defenderHex.unit = attacker;
      attacker.q = defenderHex.q;
      attacker.r = defenderHex.r;

      result = 'attacker_wins';
      Game.emit('notification', {
        type: 'success',
        title: 'Enemy Defeated',
        text: `${defender.name} destroyed. ${attacker.name} lost ${damageToAttacker} HP.`
      });
    }

    if (attacker.hp <= 0) {
      // Attacker destroyed
      attackerHex.unit = null;
      const idx = Game.STATE.units.indexOf(attacker);
      if (idx >= 0) Game.STATE.units.splice(idx, 1);

      result = result === 'attacker_wins' ? 'mutual' : 'defender_wins';
      Game.emit('notification', {
        type: 'danger',
        title: 'Unit Lost',
        text: `${attacker.name} was destroyed in combat.`
      });
    }

    if (result === 'draw') {
      Game.emit('notification', {
        type: 'warning',
        title: 'Combat',
        text: `${attacker.name} dealt ${damageToDefender} dmg, took ${damageToAttacker} dmg in return.`
      });
    }

    // If attacker defeated a faction unit on their capital
    if (result === 'attacker_wins' && defender.owner !== 'player') {
      const faction = Game.STATE.factions.find(f => f.id === defender.owner);
      if (faction && defenderHex.q === faction.capitalQ && defenderHex.r === faction.capitalR) {
        faction.capitalCaptured = true;
        defenderHex.owner = 'player';
        Game.emit('notification', {
          type: 'success',
          title: 'Capital Captured',
          text: `You have captured the ${faction.name} capital!`
        });
      }
    }

    Game.emit('unit:combat', { attacker, defender, result, damageToDefender, damageToAttacker });
    return true;
  }

  // ----------------------------------------------------------
  // Unit Healing
  // ----------------------------------------------------------
  function healUnits() {
    Game.STATE.units.forEach(unit => {
      if (unit.owner !== 'player') return;
      if (unit.hp >= unit.maxHp) return;
      if (unit.hasMoved || unit.hasAttacked) return; // only stationary units

      const hex = StarMap.getHex(unit.q, unit.r);
      if (hex && hex.owner === 'player') {
        unit.hp = Math.min(unit.maxHp, unit.hp + 3);
      }
    });
  }

  // ----------------------------------------------------------
  // Reset movement at start of turn
  // ----------------------------------------------------------
  function resetMovement() {
    Game.STATE.units.forEach(unit => {
      if (unit.owner === 'player') {
        unit.movePoints = unit.maxMovePoints;
        unit.hasMoved = false;
        unit.hasAttacked = false;
      }
    });
  }

  // ----------------------------------------------------------
  // Get unit at position
  // ----------------------------------------------------------
  function getUnitAt(q, r) {
    return Game.STATE.units.find(u => u.q === q && u.r === r) || null;
  }

  function getPlayerUnits() {
    return Game.STATE.units.filter(u => u.owner === 'player');
  }

  function getFactionUnits(factionId) {
    return Game.STATE.units.filter(u => u.owner === factionId);
  }

  // ----------------------------------------------------------
  // Recruit unit (player)
  // ----------------------------------------------------------
  function canRecruit(type) {
    const def = UNIT_TYPES[type];
    if (!def) return { ok: false, reason: 'Unknown unit type.' };

    if (!Player.canAfford(def.cost)) return { ok: false, reason: 'Insufficient resources.' };

    // Tech requirement
    if (def.requiresTech) {
      const tech = Game.STATE.techs ? Game.STATE.techs.find(t => t.id === def.requiresTech) : null;
      if (!tech || !tech.researched) {
        return { ok: false, reason: `Requires ${tech ? tech.name : 'technology'} research.` };
      }
    }

    // Building requirement
    if (def.requiresBuilding) {
      const hasBuilding = Array.from(StarMap.getMapData().hexes.values())
        .some(h => h.owner === 'player' && h.building && h.building.type === def.requiresBuilding);
      if (!hasBuilding) {
        const bldDef = Player.BUILDINGS[def.requiresBuilding];
        return { ok: false, reason: `Requires ${bldDef ? bldDef.name : 'building'}.` };
      }
    }

    return { ok: true };
  }

  function recruitUnit(type, q, r) {
    const check = canRecruit(type);
    if (!check.ok) return check;

    const hex = StarMap.getHex(q, r);
    if (!hex || hex.unit) return { ok: false, reason: 'Tile occupied.' };

    const def = UNIT_TYPES[type];
    Player.spendResources(def.cost);
    createUnit(type, 'player', q, r);

    Game.emit('notification', {
      type: 'success',
      title: 'Unit Recruited',
      text: `${def.name} has joined your forces.`
    });

    return { ok: true };
  }

  // ----------------------------------------------------------
  // Serialization
  // ----------------------------------------------------------
  function serialize() {
    return {
      units: Game.STATE.units.map(u => ({ ...u })),
      nextUnitId
    };
  }

  function deserialize(data) {
    if (!data) return;
    Game.STATE.units = data.units || [];
    nextUnitId = data.nextUnitId || Game.STATE.units.length + 1;

    // Re-link units to hexes
    Game.STATE.units.forEach(u => {
      const hex = StarMap.getHex(u.q, u.r);
      if (hex) hex.unit = u;
    });
  }

  // ----------------------------------------------------------
  // Public API
  // ----------------------------------------------------------
  return {
    UNIT_TYPES,
    createUnit,
    createStartingUnits,
    moveUnit,
    attackUnit,
    healUnits,
    resetMovement,
    getUnitAt,
    getPlayerUnits,
    getFactionUnits,
    canRecruit,
    recruitUnit,
    serialize,
    deserialize
  };
})();
