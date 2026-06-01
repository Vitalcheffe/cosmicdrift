/* ============================================================
   CosmicDrift - player.js
   Player state, resources, colony management
   ============================================================ */

const Player = (function () {
  'use strict';

  // ----------------------------------------------------------
  // Building Definitions
  // ----------------------------------------------------------
  const BUILDINGS = {
    // Era I - Survival
    oxygen_extractor: {
      name: 'Oxygen Extractor',
      era: 1,
      cost: { minerals: 15, energy: 5 },
      production: { oxygen: 8 },
      consumption: { water: 2 },
      requiresBiome: null,
      requiresTech: null,
      description: 'Extracts breathable oxygen from water sources.'
    },
    residential: {
      name: 'Residential District',
      era: 1,
      cost: { minerals: 10, biomass: 5 },
      production: { credits: 3 },
      consumption: { oxygen: 2 },
      requiresBiome: null,
      requiresTech: null,
      description: 'Housing for colonists. Generates credits.',
      colonistCapacity: 3
    },
    mining_outpost: {
      name: 'Mining Outpost',
      era: 1,
      cost: { energy: 8 },
      production: { minerals: 4 },
      consumption: { energy: 1 },
      requiresBiome: 'iron',
      requiresTech: null,
      description: 'Extracts minerals from iron peaks.'
    },
    solar_array: {
      name: 'Solar Array',
      era: 1,
      cost: { minerals: 10 },
      production: { energy: 5 },
      consumption: {},
      requiresBiome: 'dust',
      requiresTech: null,
      description: 'Harvests solar energy from dust wastes.'
    },
    hydroponics: {
      name: 'Hydroponics Bay',
      era: 1,
      cost: { minerals: 8, water: 3 },
      production: { biomass: 4 },
      consumption: { water: 2, energy: 1 },
      requiresBiome: 'verdant',
      requiresTech: null,
      description: 'Grows biomass in controlled environments.'
    },
    water_pump: {
      name: 'Water Pump',
      era: 1,
      cost: { minerals: 8, energy: 3 },
      production: { water: 4 },
      consumption: { energy: 1 },
      requiresBiome: ['abyssal', 'frozen'],
      requiresTech: null,
      description: 'Pumps water from abyssal or frozen terrain.'
    },
    // Era II - Expansion
    research_lab: {
      name: 'Research Lab',
      era: 2,
      cost: { minerals: 20, energy: 10 },
      production: { science: 4 },
      consumption: { energy: 3 },
      requiresBiome: null,
      requiresTech: 'basic_engineering',
      description: 'Generates science for technology research.'
    },
    barracks: {
      name: 'Barracks',
      era: 2,
      cost: { minerals: 20, energy: 5 },
      production: {},
      consumption: { energy: 2, oxygen: 1 },
      requiresBiome: null,
      requiresTech: 'basic_engineering',
      description: 'Allows training of military units.',
      allowsUnits: ['marine', 'heavy_soldier']
    },
    trade_post: {
      name: 'Trade Post',
      era: 2,
      cost: { minerals: 15, credits: 20 },
      production: { credits: 8 },
      consumption: {},
      requiresBiome: null,
      requiresTech: 'basic_engineering',
      description: 'Boosts credit generation significantly.'
    },
    shield_gen: {
      name: 'Shield Generator',
      era: 2,
      cost: { minerals: 25, energy: 15 },
      production: {},
      consumption: { energy: 5 },
      requiresBiome: null,
      requiresTech: 'force_fields',
      description: 'Protects adjacent hexes from hazard damage.',
      radius: 2
    },
    // Era III - Dominance
    factory: {
      name: 'Factory',
      era: 3,
      cost: { minerals: 30, energy: 20 },
      production: { minerals: 8, energy: 4 },
      consumption: { energy: 5 },
      requiresBiome: null,
      requiresTech: 'industrial_revolution',
      description: 'High-output mineral and energy production.'
    },
    command_center: {
      name: 'Command Center',
      era: 3,
      cost: { minerals: 40, energy: 25, credits: 30 },
      production: {},
      consumption: { energy: 8 },
      requiresBiome: null,
      requiresTech: 'industrial_revolution',
      description: 'Enables Commander unit and teleport tether.',
      allowsUnits: ['assault_mech', 'artillery', 'commander']
    },
    // Victory buildings
    interstellar_beacon: {
      name: 'Interstellar Beacon',
      era: 4,
      cost: { minerals: 80, energy: 60, credits: 100 },
      production: {},
      consumption: { energy: 20 },
      requiresBiome: null,
      requiresTech: 'singularity_drive',
      description: 'Signals for rescue. Defend for 5 turns to win.',
      victoryBuilding: 'scientific'
    },
    global_engine: {
      name: 'Global Terraforming Engine',
      era: 4,
      cost: { minerals: 100, energy: 80, biomass: 50, water: 40 },
      production: {},
      consumption: { energy: 15, water: 10 },
      requiresBiome: null,
      requiresTech: 'atmospheric_terraforming',
      description: 'Terraforms the planet. Survive 15 turns to win.',
      victoryBuilding: 'survival'
    }
  };

  // ----------------------------------------------------------
  // Player State
  // ----------------------------------------------------------
  let state = null;

  function init(diffMod) {
    state = {
      colonists: 5,
      maxColonists: 5,
      resources: {
        minerals: 30,
        energy: 20,
        biomass: 10,
        water: 15,
        credits: 50,
      },
      resourceDeltas: {
        minerals: 0,
        energy: 0,
        biomass: 0,
        water: 0,
        credits: 0,
      },
      buildings: [],  // references to hex.building objects
      buildQueue: [], // { q, r, buildingType, turnsLeft }
      science: 0,
    };

    return state;
  }

  function getState() {
    return state;
  }

  // ----------------------------------------------------------
  // Resource Management
  // ----------------------------------------------------------
  function getResource(type) {
    return state ? state.resources[type] || 0 : 0;
  }

  function addResource(type, amount) {
    if (!state) return;
    state.resources[type] = (state.resources[type] || 0) + amount;
    if (state.resources[type] < 0) state.resources[type] = 0;
  }

  function canAfford(costs) {
    if (!state || !costs) return false;
    for (const [res, amount] of Object.entries(costs)) {
      if ((state.resources[res] || 0) < amount) return false;
    }
    return true;
  }

  function spendResources(costs) {
    if (!canAfford(costs)) return false;
    for (const [res, amount] of Object.entries(costs)) {
      state.resources[res] -= amount;
    }
    return true;
  }

  // ----------------------------------------------------------
  // Building Placement
  // ----------------------------------------------------------
  function canBuild(buildingType, q, r) {
    const def = BUILDINGS[buildingType];
    if (!def) return { ok: false, reason: 'Unknown building type.' };

    const hex = StarMap.getHex(q, r);
    if (!hex) return { ok: false, reason: 'Invalid tile.' };

    if (hex.building) return { ok: false, reason: 'Tile already has a building.' };

    if (hex.owner !== 'player') return { ok: false, reason: 'You do not own this tile.' };

    if (!canAfford(def.cost)) return { ok: false, reason: 'Insufficient resources.' };

    // Biome requirement
    if (def.requiresBiome) {
      const required = Array.isArray(def.requiresBiome) ? def.requiresBiome : [def.requiresBiome];
      if (!required.includes(hex.biome)) {
        return { ok: false, reason: `Requires ${required.map(b => StarMap.BIOMES[b].name).join(' or ')} biome.` };
      }
    }

    // Tech requirement
    if (def.requiresTech) {
      const tech = Game.STATE.techs ? Game.STATE.techs.find(t => t.id === def.requiresTech) : null;
      if (!tech || !tech.researched) {
        return { ok: false, reason: `Requires ${tech ? tech.name : 'technology'} research.` };
      }
    }

    return { ok: true };
  }

  function placeBuilding(buildingType, q, r) {
    const check = canBuild(buildingType, q, r);
    if (!check.ok) return check;

    const def = BUILDINGS[buildingType];
    spendResources(def.cost);

    const hex = StarMap.getHex(q, r);
    const building = {
      type: buildingType,
      name: def.name,
      owner: 'player',
      hp: 50,
      production: { ...def.production },
      consumption: { ...def.consumption },
      turnsActive: 0
    };

    hex.building = building;
    hex.district = buildingType;
    state.buildings.push(building);

    // Claim adjacent territory
    const neighbors = StarMap.getNeighbors(q, r);
    neighbors.forEach(nb => {
      const nbHex = StarMap.getHex(nb.q, nb.r);
      if (nbHex && !nbHex.owner) {
        nbHex.owner = 'player';
      }
    });

    // Increase colonist capacity for residential
    if (def.colonistCapacity) {
      state.maxColonists += def.colonistCapacity;
    }

    Game.emit('building:placed', { type: buildingType, q, r });
    Game.emit('notification', {
      type: 'success',
      title: 'Building Constructed',
      text: `${def.name} built at (${q}, ${r}).`
    });

    return { ok: true };
  }

  // ----------------------------------------------------------
  // Resource Gathering (called during resolution phase)
  // ----------------------------------------------------------
  function gatherResources() {
    if (!state) return;

    // Reset deltas
    const deltas = { minerals: 0, energy: 0, biomass: 0, water: 0, credits: 0, science: 0 };

    // Gather from buildings
    for (const [key, hex] of StarMap.getMapData().hexes) {
      if (hex.owner !== 'player' || !hex.building) continue;

      const bld = hex.building;

      // Skip offline buildings (oxygen depletion)
      if (bld.offline) continue;

      // Apply production
      if (bld.production) {
        for (const [res, amount] of Object.entries(bld.production)) {
          const scaled = amount * (Game.STATE.diffMod ? Game.STATE.diffMod.resources : 1);
          addResource(res, scaled);
          deltas[res] = (deltas[res] || 0) + scaled;
        }
      }

      // Apply consumption
      if (bld.consumption) {
        for (const [res, amount] of Object.entries(bld.consumption)) {
          addResource(res, -amount);
          deltas[res] = (deltas[res] || 0) - amount;
        }
      }

      bld.turnsActive++;
    }

    // Base income from colonists
    const colonistCredits = Math.floor(state.colonists * 0.5);
    addResource('credits', colonistCredits);
    deltas.credits += colonistCredits;

    // Store deltas for display
    state.resourceDeltas = deltas;

    Game.emit('resources:updated', state.resources);
  }

  // ----------------------------------------------------------
  // Science Output
  // ----------------------------------------------------------
  function getScienceOutput() {
    let science = 1; // base
    for (const [key, hex] of StarMap.getMapData().hexes) {
      if (hex.owner === 'player' && hex.building && hex.building.production) {
        if (hex.building.production.science) {
          science += hex.building.production.science;
        }
      }
    }
    return science;
  }

  // ----------------------------------------------------------
  // Colonist Management
  // ----------------------------------------------------------
  function processColonists() {
    if (!state) return;

    // Oxygen consumption by colonists
    const o2PerColonist = 1;
    const totalO2Consumption = state.colonists * o2PerColonist;

    // Credit generation from colonists
    addResource('credits', Math.floor(state.colonists * 0.5));
  }

  function addColonists(count) {
    if (!state) return;
    state.colonists = Math.min(state.colonists + count, state.maxColonists);
  }

  function removeColonists(count) {
    if (!state) return;
    state.colonists = Math.max(0, state.colonists - count);
  }

  // ----------------------------------------------------------
  // Get available buildings for a hex
  // ----------------------------------------------------------
  function getAvailableBuildings(q, r) {
    const available = [];
    for (const [type, def] of Object.entries(BUILDINGS)) {
      const check = canBuild(type, q, r);
      available.push({
        type,
        ...def,
        canBuild: check.ok,
        reason: check.ok ? '' : check.reason
      });
    }
    return available;
  }

  // ----------------------------------------------------------
  // Serialization
  // ----------------------------------------------------------
  function serialize() {
    return state ? JSON.parse(JSON.stringify(state)) : null;
  }

  function deserialize(data) {
    if (data) state = data;
  }

  // ----------------------------------------------------------
  // Public API
  // ----------------------------------------------------------
  return {
    BUILDINGS,
    init,
    getState,
    getResource,
    addResource,
    canAfford,
    spendResources,
    canBuild,
    placeBuilding,
    gatherResources,
    getScienceOutput,
    processColonists,
    addColonists,
    removeColonists,
    getAvailableBuildings,
    serialize,
    deserialize
  };
})();
