/* ============================================================
   CosmicDrift - cloning.js
   Clone and ally system with teleport tether
   ============================================================ */

const Cloning = (function () {
  'use strict';

  // ----------------------------------------------------------
  // Clone Definitions
  // ----------------------------------------------------------
  const CLONE_TYPES = {
    commander_clone: {
      name: 'Commander Clone',
      cost: { credits: 200 },
      combat: 12,
      movePoints: 2,
      maxHp: 50,
      sightRange: 3,
      description: 'A clone of the Commander with reduced combat ability.'
    },
    elite_soldier: {
      name: 'Elite Soldier',
      cost: { credits: 120 },
      combat: 10,
      movePoints: 2,
      maxHp: 40,
      sightRange: 2,
      description: 'A specialized combat clone with decent firepower.'
    },
    worker: {
      name: 'Worker Clone',
      cost: { credits: 50 },
      combat: 2,
      movePoints: 2,
      maxHp: 20,
      sightRange: 1,
      description: 'A labor clone that boosts adjacent building output by 20%.'
    },
    scout_clone: {
      name: 'Scout Clone',
      cost: { credits: 80 },
      combat: 3,
      movePoints: 3,
      maxHp: 15,
      sightRange: 5,
      description: 'A fast reconnaissance clone with extended vision.'
    }
  };

  // ----------------------------------------------------------
  // Ally Definitions
  // ----------------------------------------------------------
  const ALLY_DEFS = {
    engineer_kira: {
      name: 'Engineer Kira',
      bonus: 'Building costs reduced by 15%',
      bonusType: 'build_discount',
      bonusValue: 0.15,
      recruitCost: { credits: 40 },
      description: 'A skilled engineer who can optimize construction processes.'
    },
    medic_voss: {
      name: 'Medic Voss',
      bonus: 'Units heal +2 HP per turn',
      bonusType: 'heal_bonus',
      bonusValue: 2,
      recruitCost: { credits: 35 },
      description: 'A field medic experienced with alien physiology.'
    },
    scout_rynn: {
      name: 'Scout Rynn',
      bonus: 'Sight range +1 for all units',
      bonusType: 'sight_bonus',
      bonusValue: 1,
      recruitCost: { credits: 30 },
      description: 'A native guide who knows the terrain intimately.'
    }
  };

  const MAX_CLONES = 3;
  const COOLDOWN_TURNS = 3;
  let cloneCooldown = 0;

  // ----------------------------------------------------------
  // Clone Management
  // ----------------------------------------------------------
  function canCreateClone(type) {
    const def = CLONE_TYPES[type];
    if (!def) return { ok: false, reason: 'Unknown clone type.' };

    if (Game.STATE.clones.length >= MAX_CLONES) {
      return { ok: false, reason: `Maximum ${MAX_CLONES} active clones.` };
    }

    if (cloneCooldown > 0) {
      return { ok: false, reason: `Clone bay cooling down. ${cloneCooldown} turns remaining.` };
    }

    // Check for command center (required for cloning)
    const hasCommand = Array.from(StarMap.getMapData().hexes.values())
      .some(h => h.owner === 'player' && h.building && h.building.type === 'command_center');

    if (!hasCommand) {
      return { ok: false, reason: 'Requires Command Center.' };
    }

    // Clone optimization tech reduces cost
    let costMod = 1;
    const cloneTech = TechTree ? TechTree.getTech('clone_optimization') : null;
    if (cloneTech && cloneTech.researched) costMod = 0.7;

    const adjustedCost = {};
    for (const [res, amount] of Object.entries(def.cost)) {
      adjustedCost[res] = Math.ceil(amount * costMod);
    }

    if (!Player.canAfford(adjustedCost)) {
      return { ok: false, reason: 'Insufficient resources.' };
    }

    return { ok: true, adjustedCost };
  }

  function createClone(type, q, r) {
    const check = canCreateClone(type);
    if (!check.ok) return check;

    const def = CLONE_TYPES[type];
    const hex = StarMap.getHex(q, r);
    if (!hex) return { ok: false, reason: 'Invalid location.' };
    if (hex.unit) return { ok: false, reason: 'Tile occupied.' };
    if (hex.owner !== 'player') return { ok: false, reason: 'Must deploy on owned territory.' };

    Player.spendResources(check.adjustedCost);

    const clone = {
      id: 'clone_' + Date.now(),
      type,
      name: def.name,
      owner: 'player',
      q, r,
      combat: def.combat,
      movePoints: def.movePoints,
      maxMovePoints: def.movePoints,
      hp: def.maxHp,
      maxHp: def.maxHp,
      sightRange: def.sightRange,
      isClone: true,
      hasMoved: false,
      hasAttacked: false,
      special: type === 'worker' ? 'production_boost' : null,
    };

    Game.STATE.clones.push(clone);
    Game.STATE.units.push(clone);
    hex.unit = clone;

    cloneCooldown = COOLDOWN_TURNS;

    Game.emit('notification', {
      type: 'success',
      title: 'Clone Deployed',
      text: `${def.name} has been deployed at (${q}, ${r}).`
    });

    return { ok: true };
  }

  // ----------------------------------------------------------
  // Teleport Tether
  // ----------------------------------------------------------
  function teleportTether(cloneId) {
    const clone = Game.STATE.clones.find(c => c.id === cloneId);
    if (!clone) return false;

    // Find commander unit
    const commander = Game.STATE.units.find(u => u.type === 'commander' && u.owner === 'player');
    if (!commander) {
      Game.emit('notification', {
        type: 'warning',
        title: 'No Commander',
        text: 'You need a Commander unit to use the Teleport Tether.'
      });
      return false;
    }

    // Move commander to clone position, destroying clone
    const cloneHex = StarMap.getHex(clone.q, clone.r);
    const commanderHex = StarMap.getHex(commander.q, commander.r);

    if (!cloneHex || !commanderHex) return false;

    // Remove clone from map and arrays
    cloneHex.unit = null;
    const cloneIdx = Game.STATE.units.indexOf(clone);
    if (cloneIdx >= 0) Game.STATE.units.splice(cloneIdx, 1);
    const cloneStateIdx = Game.STATE.clones.indexOf(clone);
    if (cloneStateIdx >= 0) Game.STATE.clones.splice(cloneStateIdx, 1);

    // Move commander
    commanderHex.unit = null;
    commander.q = clone.q;
    commander.r = clone.r;
    cloneHex.unit = commander;
    commander.hasMoved = true;

    Game.emit('notification', {
      type: 'info',
      title: 'Teleport Tether',
      text: `Commander teleported to (${clone.q}, ${clone.r}). Clone destroyed.`
    });

    StarMap.updateVisibility();
    return true;
  }

  // ----------------------------------------------------------
  // Clone Cooldown Processing
  // ----------------------------------------------------------
  function processTurn() {
    if (cloneCooldown > 0) cloneCooldown--;
  }

  // ----------------------------------------------------------
  // Ally Recruitment
  // ----------------------------------------------------------
  function canRecruitAlly(allyId) {
    const def = ALLY_DEFS[allyId];
    if (!def) return { ok: false, reason: 'Unknown ally.' };

    if (Game.STATE.allies.find(a => a.id === allyId)) {
      return { ok: false, reason: 'Already recruited.' };
    }

    if (!Player.canAfford(def.recruitCost)) {
      return { ok: false, reason: 'Insufficient resources.' };
    }

    return { ok: true };
  }

  function recruitAlly(allyId) {
    const check = canRecruitAlly(allyId);
    if (!check.ok) return check;

    const def = ALLY_DEFS[allyId];
    Player.spendResources(def.recruitCost);

    const ally = {
      id: allyId,
      name: def.name,
      bonus: def.bonus,
      bonusType: def.bonusType,
      bonusValue: def.bonusValue,
    };

    Game.STATE.allies.push(ally);

    // Apply passive bonuses
    applyAllyBonus(ally);

    Game.emit('notification', {
      type: 'success',
      title: 'Ally Recruited',
      text: `${def.name} has joined your colony! ${def.bonus}.`
    });

    return { ok: true };
  }

  function applyAllyBonus(ally) {
    // Bonuses are checked dynamically in relevant functions
    // This is just for notification
  }

  function getBuildDiscount() {
    let discount = 0;
    Game.STATE.allies.forEach(a => {
      if (a.bonusType === 'build_discount') discount += a.bonusValue;
    });
    return discount;
  }

  function getHealBonus() {
    let bonus = 0;
    Game.STATE.allies.forEach(a => {
      if (a.bonusType === 'heal_bonus') bonus += a.bonusValue;
    });
    return bonus;
  }

  function getSightBonus() {
    let bonus = 0;
    Game.STATE.allies.forEach(a => {
      if (a.bonusType === 'sight_bonus') bonus += a.bonusValue;
    });
    return bonus;
  }

  // ----------------------------------------------------------
  // Get available info
  // ----------------------------------------------------------
  function getCloneInfo() {
    return {
      activeClones: Game.STATE.clones.length,
      maxClones: MAX_CLONES,
      cooldown: cloneCooldown,
      types: Object.entries(CLONE_TYPES).map(([id, def]) => ({
        id,
        ...def,
        canCreate: canCreateClone(id).ok
      }))
    };
  }

  function getAllyInfo() {
    return Object.entries(ALLY_DEFS).map(([id, def]) => ({
      id,
      ...def,
      recruited: Game.STATE.allies.some(a => a.id === id),
      canRecruit: canRecruitAlly(id).ok
    }));
  }

  // ----------------------------------------------------------
  // Serialization
  // ----------------------------------------------------------
  function serialize() {
    return {
      clones: Game.STATE.clones.map(c => ({ ...c })),
      allies: Game.STATE.allies.map(a => ({ ...a })),
      cloneCooldown
    };
  }

  function deserialize(data) {
    if (!data) return;
    Game.STATE.clones = data.clones || [];
    Game.STATE.allies = data.allies || [];
    cloneCooldown = data.cloneCooldown || 0;
  }

  // ----------------------------------------------------------
  // Public API
  // ----------------------------------------------------------
  return {
    CLONE_TYPES,
    ALLY_DEFS,
    canCreateClone,
    createClone,
    teleportTether,
    processTurn,
    canRecruitAlly,
    recruitAlly,
    getBuildDiscount,
    getHealBonus,
    getSightBonus,
    getCloneInfo,
    getAllyInfo,
    serialize,
    deserialize
  };
})();
