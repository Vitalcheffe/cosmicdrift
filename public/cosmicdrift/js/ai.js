/* ============================================================
   CosmicDrift - ai.js
   NPC faction behavior, diplomacy, AI actions
   ============================================================ */

const AI = (function () {
  'use strict';

  // ----------------------------------------------------------
  // Faction Definitions
  // ----------------------------------------------------------
  const FACTION_DEFS = {
    sylphari: {
      name: 'Sylphari',
      trait: 'Peaceful Guardians',
      preferredBiome: 'verdant',
      personality: 'peaceful',   // peaceful, neutral, hostile
      baseRelation: 10,
      color: '#5b9e7a',
      unitType: 'sylphari_guard',
      description: 'Ancient forest dwellers who value harmony with nature. They prefer diplomacy but will defend their territory.'
    },
    krath: {
      name: 'Krath',
      trait: 'Iron Will',
      preferredBiome: 'iron',
      personality: 'hostile',
      baseRelation: -20,
      color: '#c75c5c',
      unitType: 'krath_warrior',
      description: 'Militaristic mountain clans forged in hardship. They respect strength and despise weakness.'
    },
    aethori: {
      name: 'Aethori',
      trait: 'Desert Nomads',
      preferredBiome: 'dust',
      personality: 'neutral',
      baseRelation: 0,
      color: '#c9a84c',
      unitType: 'aethori_sentinel',
      description: 'Enigmatic desert traders who value knowledge and commerce. Their allegiance shifts with the sands.'
    }
  };

  // ----------------------------------------------------------
  // Initialization
  // ----------------------------------------------------------
  function init(mapData, diffMod) {
    const factions = [];

    for (const [id, def] of Object.entries(FACTION_DEFS)) {
      // Find faction capital
      let capitalHex = null;
      for (const [key, hex] of mapData.hexes) {
        if (hex.building && hex.building.owner === id && hex.building.type === 'capital') {
          capitalHex = hex;
          break;
        }
      }

      const faction = {
        id,
        name: def.name,
        trait: def.trait,
        personality: def.personality,
        color: def.color,
        unitType: def.unitType,
        description: def.description,
        relation: def.baseRelation,
        capitalQ: capitalHex ? capitalHex.q : 0,
        capitalR: capitalHex ? capitalHex.r : 0,
        capitalCaptured: false,
        aggression: diffMod ? diffMod.aiAggression : 0.5,
        territories: 0,
        militaryPower: 0,
        lastAction: '',
        tradeCooldown: 0,
        giftCooldown: 0,
        warCooldown: 0,
      };

      factions.push(faction);

      // Create initial units for each faction
      if (capitalHex) {
        Units.createUnit(def.unitType, id, capitalHex.q, capitalHex.r + 1);
        Units.createUnit(def.unitType, id, capitalHex.q + 1, capitalHex.r);
      }
    }

    return factions;
  }

  // ----------------------------------------------------------
  // AI Turn Processing
  // ----------------------------------------------------------
  function processTurn() {
    Game.STATE.factions.forEach(faction => {
      if (faction.capitalCaptured) return;

      // Update faction stats
      updateFactionStats(faction);

      // Decide actions based on personality and relation
      decideAction(faction);
    });
  }

  function updateFactionStats(faction) {
    let territories = 0;
    let military = 0;

    for (const [key, hex] of StarMap.getMapData().hexes) {
      if (hex.owner === faction.id) territories++;
    }

    const factionUnits = Units.getFactionUnits(faction.id);
    military = factionUnits.reduce((sum, u) => sum + u.combat, 0);

    faction.territories = territories;
    faction.militaryPower = military;
  }

  function decideAction(faction) {
    const relation = faction.relation;
    const roll = Math.random();

    // Reduce cooldowns
    if (faction.tradeCooldown > 0) faction.tradeCooldown--;
    if (faction.giftCooldown > 0) faction.giftCooldown--;
    if (faction.warCooldown > 0) faction.warCooldown--;

    if (faction.personality === 'peaceful') {
      // Sylphari: expand slowly, prefer trade
      if (roll < 0.3) {
        expandTerritory(faction);
      } else if (roll < 0.5 && relation < 30 && faction.tradeCooldown <= 0) {
        offerTrade(faction);
      }
    } else if (faction.personality === 'hostile') {
      // Krath: build military, attack if strong
      if (roll < 0.2) {
        expandTerritory(faction);
      } else if (roll < 0.5) {
        recruitMilitary(faction);
      } else if (roll < 0.7 && relation < -30 && faction.militaryPower > 15 && faction.warCooldown <= 0) {
        attackPlayer(faction);
      } else if (roll < 0.8) {
        expandTerritory(faction);
      }
    } else {
      // Aethori: balanced, react to player
      if (roll < 0.3) {
        expandTerritory(faction);
      } else if (roll < 0.5) {
        recruitMilitary(faction);
      } else if (relation > 20 && roll < 0.6 && faction.tradeCooldown <= 0) {
        offerTrade(faction);
      }
    }

    // Passive relation drift
    if (faction.personality === 'hostile' && relation > -80) {
      faction.relation -= 1;
    } else if (faction.personality === 'peaceful' && relation < 80) {
      faction.relation += 1;
    }
  }

  // ----------------------------------------------------------
  // AI Actions
  // ----------------------------------------------------------
  function expandTerritory(faction) {
    // Find unclaimed hex adjacent to faction territory
    const candidates = [];
    for (const [key, hex] of StarMap.getMapData().hexes) {
      if (hex.owner !== faction.id) continue;
      const neighbors = StarMap.getNeighbors(hex.q, hex.r);
      for (const nb of neighbors) {
        const nbHex = StarMap.getHex(nb.q, nb.r);
        if (nbHex && !nbHex.owner && nbHex.biome === FACTION_DEFS[faction.id].preferredBiome) {
          candidates.push(nbHex);
        }
      }
    }

    if (candidates.length > 0) {
      const target = candidates[Math.floor(Math.random() * candidates.length)];
      target.owner = faction.id;
      faction.lastAction = 'Expanded territory';
    }
  }

  function recruitMilitary(faction) {
    const def = FACTION_DEFS[faction.id];
    const factionUnits = Units.getFactionUnits(faction.id);

    // Limit faction units
    if (factionUnits.length >= 6) return;

    // Find a hex adjacent to capital to spawn
    const neighbors = StarMap.getNeighbors(faction.capitalQ, faction.capitalR);
    for (const nb of neighbors) {
      const hex = StarMap.getHex(nb.q, nb.r);
      if (hex && !hex.unit && hex.owner === faction.id) {
        Units.createUnit(def.unitType, faction.id, nb.q, nb.r);
        faction.lastAction = 'Recruited military';
        break;
      }
    }
  }

  function offerTrade(faction) {
    faction.tradeCooldown = 5;
    faction.lastAction = 'Offered trade';

    Game.emit('notification', {
      type: 'info',
      title: `${faction.name} Trade Offer`,
      text: `The ${faction.name} offer a trade agreement. Accept to improve relations.`
    });

    Game.emit('diplomacy:trade_offer', { factionId: faction.id });
  }

  function attackPlayer(faction) {
    faction.warCooldown = 8;
    faction.lastAction = 'Attacked player';

    // Find a player-owned hex adjacent to faction territory
    const targets = [];
    for (const [key, hex] of StarMap.getMapData().hexes) {
      if (hex.owner !== faction.id) continue;
      const neighbors = StarMap.getNeighbors(hex.q, hex.r);
      for (const nb of neighbors) {
        const nbHex = StarMap.getHex(nb.q, nb.r);
        if (nbHex && nbHex.owner === 'player') {
          targets.push(nbHex);
        }
      }
    }

    if (targets.length > 0) {
      const target = targets[Math.floor(Math.random() * targets.length)];

      // Damage any building on the hex
      if (target.building && target.building.owner === 'player') {
        target.building.hp -= 15;
        if (target.building.hp <= 0) {
          Game.emit('notification', {
            type: 'danger',
            title: 'Building Destroyed',
            text: `${target.building.name} was destroyed by ${faction.name} raiders!`
          });
          target.building = null;
        } else {
          Game.emit('notification', {
            type: 'warning',
            title: 'Under Attack',
            text: `${faction.name} raiders damaged ${target.building.name}!`
          });
        }
      }

      // Move a faction unit toward player territory
      const factionUnits = Units.getFactionUnits(faction.id);
      if (factionUnits.length > 0) {
        const closestUnit = factionUnits.reduce((best, u) => {
          const d = StarMap.hexDistance(u.q, u.r, target.q, target.r);
          const bd = StarMap.hexDistance(best.q, best.r, target.q, target.r);
          return d < bd ? u : best;
        });

        // Simple movement toward target
        if (closestUnit && StarMap.hexDistance(closestUnit.q, closestUnit.r, target.q, target.r) <= 2) {
          // If adjacent, attack
          const playerUnit = Units.getUnitAt(target.q, target.r);
          if (playerUnit && playerUnit.owner === 'player') {
            Units.attackUnit(closestUnit, playerUnit);
          } else {
            // Move into the hex
            const fromHex = StarMap.getHex(closestUnit.q, closestUnit.r);
            fromHex.unit = null;
            closestUnit.q = target.q;
            closestUnit.r = target.r;
            target.unit = closestUnit;
          }
        }
      }
    }

    // Relation drops from attack
    faction.relation = Math.max(-100, faction.relation - 10);
  }

  // ----------------------------------------------------------
  // Diplomacy Actions (Player-initiated)
  // ----------------------------------------------------------
  function sendGift(factionId) {
    const faction = Game.STATE.factions.find(f => f.id === factionId);
    if (!faction) return;

    const cost = { credits: 15 };
    if (!Player.canAfford(cost)) {
      Game.emit('notification', {
        type: 'warning',
        title: 'Insufficient Credits',
        text: 'You need 15 credits to send a gift.'
      });
      return;
    }

    Player.spendResources(cost);
    faction.relation = Math.min(100, faction.relation + 10);
    faction.giftCooldown = 3;

    Game.emit('notification', {
      type: 'success',
      title: 'Gift Sent',
      text: `${faction.name} appreciates your gift. Relations improved.`
    });

    Game.emit('diplomacy:updated');
  }

  function proposeAlliance(factionId) {
    const faction = Game.STATE.factions.find(f => f.id === factionId);
    if (!faction) return;

    if (faction.relation < 40) {
      Game.emit('notification', {
        type: 'warning',
        title: 'Alliance Rejected',
        text: `${faction.name} does not trust you enough for an alliance. (Need 40+ relation)`
      });
      return;
    }

    faction.relation = Math.min(100, faction.relation + 5);

    // Check for diplomatic protocols tech bonus
    const diploTech = TechTree ? TechTree.getTech('diplomatic_protocols') : null;
    if (diploTech && diploTech.researched) {
      faction.relation = Math.min(100, faction.relation + 5);
    }

    Game.emit('notification', {
      type: 'success',
      title: 'Alliance Formed',
      text: `You have formed an alliance with the ${faction.name}!`
    });

    Game.emit('diplomacy:updated');
  }

  function proposeTerritorialPact(factionId) {
    const faction = Game.STATE.factions.find(f => f.id === factionId);
    if (!faction) return;

    if (faction.relation < 20) {
      Game.emit('notification', {
        type: 'warning',
        title: 'Pact Rejected',
        text: `${faction.name} refuses your territorial pact. (Need 20+ relation)`
      });
      return;
    }

    faction.relation = Math.min(100, faction.relation + 3);

    Game.emit('notification', {
      type: 'success',
      title: 'Territorial Pact',
      text: `${faction.name} agrees to respect your borders.`
    });

    Game.emit('diplomacy:updated');
  }

  function acceptTrade(factionId) {
    const faction = Game.STATE.factions.find(f => f.id === factionId);
    if (!faction) return;

    faction.relation = Math.min(100, faction.relation + 8);

    // Trade bonus
    Player.addResource('credits', 10);
    Player.addResource('minerals', 5);

    Game.emit('notification', {
      type: 'success',
      title: 'Trade Accepted',
      text: `Trade with ${faction.name} completed. +10 credits, +5 minerals.`
    });

    Game.emit('diplomacy:updated');
  }

  function getRelationLabel(relation) {
    if (relation >= 60) return 'Allied';
    if (relation >= 30) return 'Friendly';
    if (relation >= -10) return 'Neutral';
    if (relation >= -40) return 'Cold';
    return 'Hostile';
  }

  function getRelationClass(relation) {
    if (relation >= 60) return 'allied';
    if (relation >= 30) return 'friendly';
    if (relation >= -10) return 'neutral';
    if (relation >= -40) return 'cold';
    return 'hostile';
  }

  // ----------------------------------------------------------
  // Event Processing
  // ----------------------------------------------------------
  function processEvents() {
    // Random faction events
    Game.STATE.factions.forEach(faction => {
      if (faction.capitalCaptured) return;

      // Random relation shift based on player actions
      const playerTerritory = StarMap.getOwnedHexes('player').length;
      const factionTerritory = faction.territories;

      // Tension from territorial proximity
      if (faction.personality === 'hostile' && playerTerritory > 5) {
        faction.relation = Math.max(-100, faction.relation - Math.random() * 2);
      }

      // Player having military near faction borders
      const playerUnits = Units.getPlayerUnits();
      playerUnits.forEach(unit => {
        const distToCapital = StarMap.hexDistance(unit.q, unit.r, faction.capitalQ, faction.capitalR);
        if (distToCapital <= 3) {
          if (faction.personality === 'hostile') {
            faction.relation = Math.max(-100, faction.relation - 2);
          } else if (faction.personality === 'peaceful') {
            faction.relation = Math.max(-100, faction.relation - 0.5);
          }
        }
      });
    });
  }

  // ----------------------------------------------------------
  // Serialization
  // ----------------------------------------------------------
  function serialize() {
    return Game.STATE.factions.map(f => ({ ...f }));
  }

  function deserialize(data) {
    if (data) Game.STATE.factions = data;
  }

  // ----------------------------------------------------------
  // Public API
  // ----------------------------------------------------------
  return {
    FACTION_DEFS,
    init,
    processTurn,
    processEvents,
    sendGift,
    proposeAlliance,
    proposeTerritorialPact,
    acceptTrade,
    getRelationLabel,
    getRelationClass,
    serialize,
    deserialize
  };
})();
