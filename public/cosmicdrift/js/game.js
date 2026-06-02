/* ============================================
   CosmicDrift - Core Game Engine
   ============================================ */

class Game {
  constructor() {
    this.turn = 1;
    this.era = 1;
    this.maxCP = 5;
    this.cp = 5;
    this.resources = {
      credits: 100,
      minerals: 50,
      oxygen: 72,
      energy: 40,
      food: 60,
      helium3: 10
    };
    this.resourceDeltas = {
      credits: 0, minerals: 0, oxygen: 0,
      energy: 0, food: 0, helium3: 0
    };
    this.researchPoints = 0;
    this.researchedTech = {};
    this.map = null;
    this.mapCols = 30;
    this.mapRows = 20;
    this.captain = null;
    this.colonies = [];
    this.units = [];
    this.unitIdCounter = 1;
    this.threats = [];
    this.threatIdCounter = 1;
    this.factionRelations = {};
    this.factionTerritories = {};
    this.factionColonies = {};
    this.selectedTile = null;
    this.hoveredTile = null;
    this.selectedUnit = null;
    this.gameOver = false;
    this.notifications = [];
    this.discoveredAnomalies = {};

    // Camera
    this.camera = { x: 0, y: 0, zoom: 1 };

    // Initialize faction relations
    for (const fId in FACTIONS) {
      this.factionRelations[fId] = FACTIONS[fId].baseRelation;
      this.factionTerritories[fId] = [];
      this.factionColonies[fId] = [];
    }
  }

  /* ---------- INITIALIZATION ---------- */
  init(captainId, mapSize) {
    this.captain = CAPTAINS[captainId] || CAPTAINS.explorateur;
    const size = MAP_SIZES[mapSize] || MAP_SIZES.medium;
    this.mapCols = size.cols;
    this.mapRows = size.rows;

    // Apply captain bonuses
    this.maxCP = 5 + (this.captain.bonusCP || 0);
    this.cp = this.maxCP;

    // Generate the hex map
    this.generateMap();

    // Place starting colony
    const startQ = Math.floor(this.mapCols / 2);
    const startR = Math.floor(this.mapRows / 2);
    const startTile = this.getTile(startQ, startR);
    if (startTile) {
      startTile.biome = 'telluric_planet';
      startTile.owner = 'player';
      startTile.explored = true;
      startTile.building = 'dome_vital';
      this.colonies.push({ q: startQ, r: startR });
      this.revealAround(startQ, startR, this.captain.visionRange || 2);
    }

    // Place faction starting territories
    this.initFactionTerritories();

    // Calculate initial deltas
    this.calculateDeltas();

    // Center camera on start
    this.camera.x = startQ;
    this.camera.y = startR;
  }

  initFactionTerritories() {
    const margin = 3;
    const positions = [
      { fId: 'hegemony', q: margin, r: margin },
      { fId: 'syndicate', q: this.mapCols - margin - 1, r: margin },
      { fId: 'collective', q: margin, r: this.mapRows - margin - 1 },
      { fId: 'enclave', q: this.mapCols - margin - 1, r: this.mapRows - margin - 1 },
      { fId: 'flotilla', q: Math.floor(this.mapCols / 2), r: margin }
    ];

    for (const pos of positions) {
      const tile = this.getTile(pos.q, pos.r);
      if (tile && !tile.owner) {
        tile.owner = pos.fId;
        tile.explored = true;
        this.factionTerritories[pos.fId].push({ q: pos.q, r: pos.r });
        this.factionColonies[pos.fId].push({ q: pos.q, r: pos.r });

        // Claim adjacent tiles for faction
        const neighbors = this.hexNeighbors(pos.q, pos.r);
        for (const [nq, nr] of neighbors) {
          const nTile = this.getTile(nq, nr);
          if (nTile && !nTile.owner) {
            nTile.owner = pos.fId;
            this.factionTerritories[pos.fId].push({ q: nq, r: nr });
          }
        }
      }
    }
  }

  generateMap() {
    this.map = {};
    for (let r = 0; r < this.mapRows; r++) {
      for (let q = 0; q < this.mapCols; q++) {
        const key = q + ',' + r;
        const biomeIdx = this.weightedRandomBiome(q, r);
        this.map[key] = {
          q: q,
          r: r,
          biome: BIOME_IDS[biomeIdx],
          owner: null,
          building: null,
          explored: false,
          visible: false,
          bonusResources: null,
          anomaly: null,
          shielded: false
        };
      }
    }
  }

  weightedRandomBiome(q, r) {
    const cx = this.mapCols / 2;
    const cy = this.mapRows / 2;
    const dist = Math.sqrt((q - cx) ** 2 + (r - cy) ** 2);
    const maxDist = Math.sqrt(cx ** 2 + cy ** 2);
    const norm = dist / maxDist;

    const weights = [
      15,
      12,
      8 + norm * 10,
      15 - norm * 8,
      5 + norm * 8,
      10
    ];

    const total = weights.reduce((a, b) => a + b, 0);
    let rand = Math.random() * total;
    for (let i = 0; i < weights.length; i++) {
      rand -= weights[i];
      if (rand <= 0) return i;
    }
    return 0;
  }

  getTile(q, r) {
    return this.map[q + ',' + r] || null;
  }

  setTile(q, r, props) {
    const tile = this.getTile(q, r);
    if (tile) Object.assign(tile, props);
  }

  /* ---------- HEX MATH ---------- */
  hexNeighbors(q, r) {
    return [
      [q + 1, r], [q - 1, r],
      [q, r + 1], [q, r - 1],
      [q + 1, r - 1], [q - 1, r + 1]
    ].filter(([nq, nr]) => this.getTile(nq, nr));
  }

  hexDistance(q1, r1, q2, r2) {
    const dx = q1 - q2;
    const dz = r1 - r2;
    const dy = -dx - dz;
    return Math.max(Math.abs(dx), Math.abs(dy), Math.abs(dz));
  }

  /* ---------- PATHFINDING (BFS on hex grid) ---------- */
  findPath(fromQ, fromR, toQ, toR, maxDist) {
    if (fromQ === toQ && fromR === toR) return [];
    maxDist = maxDist || 30;

    const startKey = fromQ + ',' + fromR;
    const endKey = toQ + ',' + toR;
    const queue = [[fromQ, fromR]];
    const visited = {};
    const cameFrom = {};
    visited[startKey] = true;

    while (queue.length > 0) {
      const [cq, cr] = queue.shift();
      const dist = this.hexDistance(fromQ, fromR, cq, cr);
      if (dist > maxDist) continue;

      const neighbors = this.hexNeighbors(cq, cr);
      for (const [nq, nr] of neighbors) {
        const nKey = nq + ',' + nr;
        if (visited[nKey]) continue;
        const nTile = this.getTile(nq, nr);
        if (!nTile) continue;

        visited[nKey] = true;
        cameFrom[nKey] = cq + ',' + cr;

        if (nKey === endKey) {
          // Reconstruct path
          const path = [];
          let current = endKey;
          while (current && current !== startKey) {
            const [pq, pr] = current.split(',').map(Number);
            path.unshift({ q: pq, r: pr });
            current = cameFrom[current];
          }
          return path;
        }

        queue.push([nq, nr]);
      }
    }

    return []; // No path found
  }

  /* ---------- FOG OF WAR ---------- */
  revealAround(q, r, range) {
    for (let dq = -range; dq <= range; dq++) {
      for (let dr = Math.max(-range, -dq - range); dr <= Math.min(range, -dq + range); dr++) {
        const tile = this.getTile(q + dq, r + dr);
        if (tile) {
          tile.explored = true;
          tile.visible = true;
        }
      }
    }
  }

  updateVisibility() {
    for (const key in this.map) {
      this.map[key].visible = false;
    }
    const range = this.getVisionRange();
    for (const col of this.colonies) {
      this.revealAround(col.q, col.r, range);
    }
    for (const unit of this.units) {
      const unitRange = Math.max(1, range - 1 + (unit.mode === 'exploration' ? 1 : 0));
      this.revealAround(unit.q, unit.r, unitRange);
    }
    // Update shield status
    this.updateShields();
  }

  updateShields() {
    // Reset all shields
    for (const key in this.map) {
      this.map[key].shielded = false;
    }
    // Apply shields from planetary_shield buildings
    for (const col of this.colonies) {
      const tile = this.getTile(col.q, col.r);
      if (tile && tile.building === 'planetary_shield') {
        this.revealShield(col.q, col.r, 2);
      }
    }
  }

  revealShield(q, r, range) {
    for (let dq = -range; dq <= range; dq++) {
      for (let dr = Math.max(-range, -dq - range); dr <= Math.min(range, -dq + range); dr++) {
        const tile = this.getTile(q + dq, r + dr);
        if (tile) tile.shielded = true;
      }
    }
  }

  getVisionRange() {
    let range = this.captain.visionRange || 2;
    if (this.researchedTech['quantum_1']) range += 2;
    if (this.researchedTech['quantum_3']) range += 3;
    return range;
  }

  /* ---------- ERA SYSTEM ---------- */
  getCurrentEra() {
    let currentEra = ERAS[0];
    for (const era of ERAS) {
      if (this.turn >= era.turnThreshold) currentEra = era;
    }
    return currentEra;
  }

  updateEra() {
    const newEra = this.getCurrentEra();
    if (newEra.id !== this.era) {
      this.era = newEra.id;
      this.notifications.push({
        type: 'info',
        text: 'Nouvelle ere: ' + newEra.name + ' - ' + newEra.desc
      });
    }
  }

  isBuildingAvailable(buildingId) {
    const building = BUILDINGS[buildingId];
    if (!building) return false;
    if (building.eraReq && building.eraReq > this.era) return false;
    return true;
  }

  /* ---------- TURN PROCESSING ---------- */
  endTurn() {
    if (this.gameOver) return;

    // Reset CP
    this.cp = this.maxCP;

    // Produce resources from buildings
    this.produceResources();

    // Captain bonus production
    if (this.captain.bonusProduction) {
      for (const res in this.captain.bonusProduction) {
        this.resources[res] = (this.resources[res] || 0) + this.captain.bonusProduction[res];
      }
    }

    // Base income
    this.resources.credits += 5;
    this.resources.oxygen -= 3;

    // Check oxygen
    if (this.resources.oxygen <= 0) {
      this.resources.oxygen = 0;
      this.gameOver = true;
      this.notifications.push({ type: 'danger', text: 'Oxygen epuise! Colonie perdue!' });
      return;
    }

    // Check food
    if (this.resources.food < 0) {
      this.resources.food = 0;
      this.resources.oxygen -= 5;
      this.notifications.push({ type: 'warning', text: 'Famine! Perte d\'oxygen.' });
    }

    // Research points from labs
    const researchProd = this.calculateResearchProduction();
    this.researchPoints += researchProd;

    // Process unit actions (movement, modes)
    this.processUnitActions();

    // Process orbital cannon attacks
    this.processOrbitalCannons();

    // Update visibility
    this.updateVisibility();

    // Random events
    this.processEvents();

    // Spawn and process threats
    this.spawnThreats();
    this.processThreats();

    // NPC faction actions
    this.processFactions();
    this.expandFactionTerritories();

    // Check era
    this.updateEra();

    // Advance turn
    this.turn++;

    // Recalculate deltas
    this.calculateDeltas();
  }

  produceResources() {
    let totalProduction = {
      credits: 0, minerals: 0, oxygen: 0,
      energy: 0, food: 0, helium3: 0
    };

    for (const col of this.colonies) {
      const tile = this.getTile(col.q, col.r);
      if (!tile) continue;

      // Base biome production
      const biome = BIOMES[tile.biome];
      if (biome) {
        for (const res in biome.resources) {
          totalProduction[res] += biome.resources[res];
        }
      }

      // Bonus resources from anomalies
      if (tile.bonusResources) {
        for (const res in tile.bonusResources) {
          totalProduction[res] += tile.bonusResources[res];
        }
      }

      // Building production
      if (tile.building) {
        const building = BUILDINGS[tile.building];
        if (building && building.production) {
          for (const res in building.production) {
            if (res === 'research') continue;
            totalProduction[res] += building.production[res];
          }
        }
      }
    }

    // Apply tech bonuses
    if (this.researchedTech['extraction_1']) totalProduction.minerals = Math.floor(totalProduction.minerals * 1.1);
    if (this.researchedTech['extraction_2']) totalProduction.minerals = Math.floor(totalProduction.minerals * 1.25);
    if (this.researchedTech['extraction_3']) totalProduction.minerals = Math.floor(totalProduction.minerals * 1.5);
    if (this.researchedTech['biology_1']) totalProduction.food = Math.floor(totalProduction.food * 1.1);
    if (this.researchedTech['biology_2']) totalProduction.food = Math.floor(totalProduction.food * 1.25);
    if (this.researchedTech['biology_3']) {
      totalProduction.food = Math.floor(totalProduction.food * 1.5);
      totalProduction.oxygen += 10;
    }
    if (this.researchedTech['energy_1']) totalProduction.energy = Math.floor(totalProduction.energy * 1.1);
    if (this.researchedTech['energy_2']) totalProduction.energy = Math.floor(totalProduction.energy * 1.25);
    if (this.researchedTech['energy_3']) totalProduction.energy = Math.floor(totalProduction.energy * 1.5);
    if (this.researchedTech['commerce_1']) totalProduction.credits = Math.floor(totalProduction.credits * 1.1);
    if (this.researchedTech['commerce_2']) totalProduction.credits = Math.floor(totalProduction.credits * 1.25);
    if (this.researchedTech['commerce_3']) totalProduction.credits = Math.floor(totalProduction.credits * 1.5);

    for (const res in totalProduction) {
      this.resources[res] += totalProduction[res];
    }
  }

  calculateResearchProduction() {
    let total = 0;
    for (const col of this.colonies) {
      const tile = this.getTile(col.q, col.r);
      if (tile.building === 'lab') total += 10;
    }
    return total;
  }

  calculateDeltas() {
    let totalProduction = {
      credits: 5, minerals: 0, oxygen: -3,
      energy: 0, food: 0, helium3: 0
    };

    for (const col of this.colonies) {
      const tile = this.getTile(col.q, col.r);
      if (!tile) continue;
      const biome = BIOMES[tile.biome];
      if (biome) {
        for (const res in biome.resources) {
          totalProduction[res] += biome.resources[res];
        }
      }
      if (tile.bonusResources) {
        for (const res in tile.bonusResources) {
          totalProduction[res] += tile.bonusResources[res];
        }
      }
      if (tile.building) {
        const building = BUILDINGS[tile.building];
        if (building && building.production) {
          for (const res in building.production) {
            if (res === 'research') continue;
            totalProduction[res] += building.production[res];
          }
        }
      }
    }

    if (this.captain.bonusProduction) {
      for (const res in this.captain.bonusProduction) {
        totalProduction[res] += this.captain.bonusProduction[res];
      }
    }

    // Apply tech bonuses to deltas
    if (this.researchedTech['extraction_1']) totalProduction.minerals = Math.floor(totalProduction.minerals * 1.1);
    if (this.researchedTech['extraction_2']) totalProduction.minerals = Math.floor(totalProduction.minerals * 1.25);
    if (this.researchedTech['extraction_3']) totalProduction.minerals = Math.floor(totalProduction.minerals * 1.5);
    if (this.researchedTech['biology_1']) totalProduction.food = Math.floor(totalProduction.food * 1.1);
    if (this.researchedTech['biology_2']) totalProduction.food = Math.floor(totalProduction.food * 1.25);
    if (this.researchedTech['biology_3']) {
      totalProduction.food = Math.floor(totalProduction.food * 1.5);
      totalProduction.oxygen += 10;
    }
    if (this.researchedTech['energy_1']) totalProduction.energy = Math.floor(totalProduction.energy * 1.1);
    if (this.researchedTech['energy_2']) totalProduction.energy = Math.floor(totalProduction.energy * 1.25);
    if (this.researchedTech['energy_3']) totalProduction.energy = Math.floor(totalProduction.energy * 1.5);
    if (this.researchedTech['commerce_1']) totalProduction.credits = Math.floor(totalProduction.credits * 1.1);
    if (this.researchedTech['commerce_2']) totalProduction.credits = Math.floor(totalProduction.credits * 1.25);
    if (this.researchedTech['commerce_3']) totalProduction.credits = Math.floor(totalProduction.credits * 1.5);

    this.resourceDeltas = totalProduction;
  }

  /* ---------- UNIT SYSTEM ---------- */
  getUnitMoveRange() {
    let range = 2;
    const era = this.getCurrentEra();
    range += era.unitMoveBonus;
    if (this.researchedTech['biology_2']) range += 1;
    return range;
  }

  getUnitAttack() {
    let attack = 10;
    if (this.researchedTech['military_1']) attack += 10;
    if (this.researchedTech['military_2']) attack += 10;
    if (this.researchedTech['military_3']) attack += 10;
    return attack;
  }

  getUnitDefense() {
    let defense = 5;
    if (this.researchedTech['military_1']) defense += 5;
    if (this.researchedTech['military_2']) defense += 5;
    return defense;
  }

  canCreateUnit(q, r) {
    const tile = this.getTile(q, r);
    if (!tile || tile.building !== 'clone_factory') {
      return { ok: false, reason: 'Usine de Clonage requise' };
    }
    if (this.cp < 4) return { ok: false, reason: 'PA insuffisants (4 requis)' };
    if (this.resources.credits < 200) return { ok: false, reason: 'Credits insuffisants' };
    if (this.resources.minerals < 50) return { ok: false, reason: 'Mineraux insuffisants' };
    if (this.resources.helium3 < 20) return { ok: false, reason: 'He-3 insuffisant' };
    return { ok: true };
  }

  createUnit(q, r) {
    const check = this.canCreateUnit(q, r);
    if (!check.ok) return check;

    this.resources.credits -= 200;
    this.resources.minerals -= 50;
    this.resources.helium3 -= 20;
    this.cp -= 4;

    const unitId = this.unitIdCounter++;
    this.units.push({
      id: unitId,
      q: q,
      r: r,
      name: 'Unite-' + unitId,
      mode: 'idle',
      path: [],
      moveRange: this.getUnitMoveRange(),
      hp: 100,
      maxHp: 100,
      attack: this.getUnitAttack(),
      defense: this.getUnitDefense(),
      faction: 'player',
      harvestCooldown: 0
    });

    this.revealAround(q, r, Math.max(1, this.getVisionRange() - 1));
    this.calculateDeltas();

    return { ok: true };
  }

  setUnitMode(unitId, mode) {
    const unit = this.units.find(u => u.id === unitId);
    if (!unit) return false;
    unit.mode = mode;
    unit.path = []; // Clear current path when changing mode
    return true;
  }

  moveUnit(unitId, targetQ, targetR) {
    const unit = this.units.find(u => u.id === unitId);
    if (!unit) return { ok: false, reason: 'Unite introuvable' };
    if (this.cp < 1) return { ok: false, reason: 'PA insuffisants' };

    const path = this.findPath(unit.q, unit.r, targetQ, targetR, 15);
    if (path.length === 0) return { ok: false, reason: 'Chemin impossible' };

    const moveRange = this.getUnitMoveRange();
    const steps = Math.min(path.length, moveRange);

    this.cp -= 1;
    unit.path = path.slice(steps); // Remaining path for auto-movement

    // Move unit step by step
    for (let i = 0; i < steps; i++) {
      unit.q = path[i].q;
      unit.r = path[i].r;
      this.revealAround(unit.q, unit.r, 1);
      this.checkAnomaly(unit.q, unit.r);
    }

    this.updateVisibility();
    this.calculateDeltas();
    return { ok: true };
  }

  /* ---------- UNIT MODE PROCESSING ---------- */
  processUnitActions() {
    const moveRange = this.getUnitMoveRange();
    const shuffled = [...this.units].sort(() => Math.random() - 0.5);

    for (const unit of shuffled) {
      if (unit.faction !== 'player') continue;
      unit.moveRange = moveRange;
      unit.attack = this.getUnitAttack();
      unit.defense = this.getUnitDefense();

      if (unit.mode === 'idle') continue;

      // If unit has a queued path, follow it
      if (unit.path.length > 0) {
        const steps = Math.min(unit.path.length, moveRange);
        for (let i = 0; i < steps; i++) {
          const next = unit.path.shift();
          if (next) {
            unit.q = next.q;
            unit.r = next.r;
            this.revealAround(unit.q, unit.r, 1);
            this.checkAnomaly(unit.q, unit.r);
          }
        }
        continue;
      }

      // Auto-behavior based on mode
      switch (unit.mode) {
        case 'defense': this.processDefense(unit); break;
        case 'exploration': this.processExploration(unit); break;
        case 'conquest': this.processConquest(unit); break;
        case 'harvest': this.processHarvest(unit); break;
      }
    }
  }

  processDefense(unit) {
    // Priority 1: Move toward nearby threats
    let closestThreat = null;
    let closestDist = Infinity;
    for (const threat of this.threats) {
      const dist = this.hexDistance(unit.q, unit.r, threat.q, threat.r);
      if (dist < closestDist && dist <= 5) {
        closestDist = dist;
        closestThreat = threat;
      }
    }

    if (closestThreat) {
      const path = this.findPath(unit.q, unit.r, closestThreat.q, closestThreat.r, 10);
      if (path.length > 0) {
        const steps = Math.min(path.length, unit.moveRange);
        for (let i = 0; i < steps; i++) {
          unit.q = path[i].q;
          unit.r = path[i].r;
        }
        // Attack if adjacent
        if (this.hexDistance(unit.q, unit.r, closestThreat.q, closestThreat.r) <= 1) {
          this.attackThreat(unit, closestThreat);
        }
      }
      return;
    }

    // Priority 2: Patrol border colonies
    const borderTiles = this.findBorderTiles();
    if (borderTiles.length === 0) return;

    // Find closest border tile
    let closestBorder = null;
    let closestBorderDist = Infinity;
    for (const bt of borderTiles) {
      const dist = this.hexDistance(unit.q, unit.r, bt.q, bt.r);
      if (dist < closestBorderDist) {
        closestBorderDist = dist;
        closestBorder = bt;
      }
    }

    if (closestBorder && closestBorderDist > 1) {
      const path = this.findPath(unit.q, unit.r, closestBorder.q, closestBorder.r, 10);
      if (path.length > 0) {
        const steps = Math.min(path.length, unit.moveRange);
        for (let i = 0; i < steps; i++) {
          unit.q = path[i].q;
          unit.r = path[i].r;
        }
      }
    }
  }

  findBorderTiles() {
    const borders = [];
    for (const col of this.colonies) {
      const neighbors = this.hexNeighbors(col.q, col.r);
      for (const [nq, nr] of neighbors) {
        const tile = this.getTile(nq, nr);
        if (tile && tile.owner !== 'player' && tile.explored) {
          borders.push({ q: nq, r: nr });
        }
      }
    }
    return borders;
  }

  processExploration(unit) {
    // Find nearest unexplored hex
    let bestTarget = null;
    let bestDist = Infinity;

    // Search in expanding radius
    for (let range = 1; range <= 15; range++) {
      for (let dq = -range; dq <= range; dq++) {
        for (let dr = Math.max(-range, -dq - range); dr <= Math.min(range, -dq + range); dr++) {
          const tile = this.getTile(unit.q + dq, unit.r + dr);
          if (tile && !tile.explored) {
            const dist = this.hexDistance(unit.q, unit.r, unit.q + dq, unit.r + dr);
            if (dist < bestDist) {
              // Check if there's a path
              const path = this.findPath(unit.q, unit.r, tile.q, tile.r, 15);
              if (path.length > 0) {
                bestDist = dist;
                bestTarget = tile;
              }
            }
          }
        }
      }
      if (bestTarget) break; // Found something at this range
    }

    if (bestTarget) {
      const path = this.findPath(unit.q, unit.r, bestTarget.q, bestTarget.r, 15);
      if (path.length > 0) {
        const steps = Math.min(path.length, unit.moveRange);
        for (let i = 0; i < steps; i++) {
          unit.q = path[i].q;
          unit.r = path[i].r;
          this.revealAround(unit.q, unit.r, 1);
          this.checkAnomaly(unit.q, unit.r);
        }
        // Queue remaining path
        unit.path = path.slice(steps);
      }
    }
  }

  processConquest(unit) {
    // Find unclaimed hex adjacent to player territory
    let bestTarget = null;
    let bestDist = Infinity;

    for (const col of this.colonies) {
      const neighbors = this.hexNeighbors(col.q, col.r);
      for (const [nq, nr] of neighbors) {
        const tile = this.getTile(nq, nr);
        if (tile && !tile.owner && tile.explored) {
          const dist = this.hexDistance(unit.q, unit.r, nq, nr);
          if (dist < bestDist) {
            bestDist = dist;
            bestTarget = { q: nq, r: nr, tile: tile };
          }
        }
      }
    }

    if (bestTarget) {
      const path = this.findPath(unit.q, unit.r, bestTarget.q, bestTarget.r, 15);
      if (path.length > 0) {
        const steps = Math.min(path.length, unit.moveRange);
        for (let i = 0; i < steps; i++) {
          unit.q = path[i].q;
          unit.r = path[i].r;
        }

        // If arrived at target, colonize
        if (this.hexDistance(unit.q, unit.r, bestTarget.q, bestTarget.r) <= 1 && this.resources.credits >= 30) {
          if (!bestTarget.tile.owner) {
            this.resources.credits -= 30;
            this.setTile(bestTarget.q, bestTarget.r, { owner: 'player' });
            this.colonies.push({ q: bestTarget.q, r: bestTarget.r });
            this.revealAround(bestTarget.q, bestTarget.r, this.getVisionRange());
            this.notifications.push({
              type: 'success',
              text: 'Unite ' + unit.name + ' a colonise (' + bestTarget.q + ',' + bestTarget.r + ')!'
            });
          }
        }
      }
    }
  }

  processHarvest(unit) {
    if (unit.harvestCooldown > 0) {
      unit.harvestCooldown--;
      // Return to nearest colony
      let nearestColony = null;
      let nearestDist = Infinity;
      for (const col of this.colonies) {
        const dist = this.hexDistance(unit.q, unit.r, col.q, col.r);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearestColony = col;
        }
      }
      if (nearestColony && nearestDist > 0) {
        const path = this.findPath(unit.q, unit.r, nearestColony.q, nearestColony.r, 10);
        if (path.length > 0) {
          const steps = Math.min(path.length, unit.moveRange);
          for (let i = 0; i < steps; i++) {
            unit.q = path[i].q;
            unit.r = path[i].r;
          }
        }
      }
      return;
    }

    // Find richest tile within range
    let bestTarget = null;
    let bestValue = -1;

    for (let dq = -8; dq <= 8; dq++) {
      for (let dr = Math.max(-8, -dq - 8); dr <= Math.min(8, -dq + 8); dr++) {
        const tile = this.getTile(unit.q + dq, unit.r + dr);
        if (!tile || !tile.explored || tile.owner !== 'player') continue;
        const biome = BIOMES[tile.biome];
        if (!biome) continue;

        let value = 0;
        for (const res in biome.resources) value += biome.resources[res];
        value += tile.bonusResources ? 5 : 0;

        if (value > bestValue) {
          const dist = this.hexDistance(unit.q, unit.r, tile.q, tile.r);
          if (dist <= 8) {
            bestValue = value;
            bestTarget = tile;
          }
        }
      }
    }

    if (bestTarget) {
      const path = this.findPath(unit.q, unit.r, bestTarget.q, bestTarget.r, 10);
      if (path.length > 0) {
        const steps = Math.min(path.length, unit.moveRange);
        for (let i = 0; i < steps; i++) {
          unit.q = path[i].q;
          unit.r = path[i].r;
        }

        // If at target, harvest bonus resources
        if (unit.q === bestTarget.q && unit.r === bestTarget.r) {
          const biome = BIOMES[bestTarget.biome];
          if (biome) {
            const harvestBonus = { credits: 5, minerals: 3 };
            for (const res in harvestBonus) {
              this.resources[res] += harvestBonus[res];
            }
            unit.harvestCooldown = 3; // Wait 3 turns before next harvest
            this.notifications.push({
              type: 'success',
              text: unit.name + ' a recolte des ressources! +5 credits, +3 mineraux.'
            });
          }
        }
      }
    }
  }

  /* ---------- ANOMALY SYSTEM ---------- */
  checkAnomaly(q, r) {
    const key = q + ',' + r;
    if (this.discoveredAnomalies[key]) return;

    for (const anomalyType of ANOMALY_TYPES) {
      if (Math.random() < anomalyType.chance) {
        const tile = this.getTile(q, r);
        if (!tile || !tile.explored) continue;

        this.discoveredAnomalies[key] = anomalyType.id;
        const result = anomalyType.effect(this, q, r);
        this.notifications.push({
          type: 'info',
          text: anomalyType.name + ': ' + result
        });
        return; // Only one anomaly per tile
      }
    }
  }

  /* ---------- THREAT SYSTEM ---------- */
  spawnThreats() {
    if (this.era < 2 && this.turn < 8) return; // No threats early game

    for (const tId in THREAT_TYPES) {
      const tType = THREAT_TYPES[tId];
      const chance = tType.spawnChance * (1 + this.era * 0.3);
      if (Math.random() < chance) {
        // Spawn at edge of map
        const side = Math.floor(Math.random() * 4);
        let q, r;
        switch (side) {
          case 0: q = Math.floor(Math.random() * this.mapCols); r = 0; break;
          case 1: q = this.mapCols - 1; r = Math.floor(Math.random() * this.mapRows); break;
          case 2: q = Math.floor(Math.random() * this.mapCols); r = this.mapRows - 1; break;
          case 3: q = 0; r = Math.floor(Math.random() * this.mapRows); break;
        }

        const tile = this.getTile(q, r);
        if (tile && tile.owner !== 'player') {
          const threatId = this.threatIdCounter++;
          this.threats.push({
            id: threatId,
            type: tId,
            q: q,
            r: r,
            hp: tType.hp,
            maxHp: tType.hp,
            attack: tType.attack,
            speed: tType.speed,
            name: tType.name + '-' + threatId
          });
          this.notifications.push({
            type: 'warning',
            text: tType.name + ' detecte en (' + q + ',' + r + ')!'
          });
        }
      }
    }
  }

  processThreats() {
    const threatsToRemove = [];

    for (const threat of this.threats) {
      const tType = THREAT_TYPES[threat.type];
      if (!tType) continue;

      // Find nearest player colony
      let nearestColony = null;
      let nearestDist = Infinity;
      for (const col of this.colonies) {
        const dist = this.hexDistance(threat.q, threat.r, col.q, col.r);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearestColony = col;
        }
      }

      if (nearestColony) {
        // Move toward colony
        const path = this.findPath(threat.q, threat.r, nearestColony.q, nearestColony.r, 20);
        if (path.length > 0) {
          const steps = Math.min(path.length, threat.speed);
          for (let i = 0; i < steps; i++) {
            threat.q = path[i].q;
            threat.r = path[i].r;
          }
        }

        // Attack if adjacent to colony
        if (this.hexDistance(threat.q, threat.r, nearestColony.q, nearestColony.r) <= 1) {
          this.threatAttackColony(threat, nearestColony);
        }

        // Attack adjacent units
        for (const unit of this.units) {
          if (unit.faction !== 'player') continue;
          if (this.hexDistance(threat.q, threat.r, unit.q, unit.r) <= 1) {
            this.threatAttackUnit(threat, unit);
          }
        }
      }

      // Remove dead threats
      if (threat.hp <= 0 && tType.hp > 0) {
        threatsToRemove.push(threat.id);
        this.notifications.push({ type: 'success', text: threat.name + ' elimine!' });
      }
    }

    this.threats = this.threats.filter(t => !threatsToRemove.includes(t.id));
  }

  threatAttackColony(threat, colony) {
    const tile = this.getTile(colony.q, colony.r);
    if (!tile) return;

    if (tile.shielded) {
      this.notifications.push({
        type: 'info',
        text: threat.name + ' bloque par le bouclier planetaire!'
      });
      return;
    }

    // Damage resources
    const dmg = threat.attack;
    this.resources.minerals = Math.max(0, this.resources.minerals - Math.floor(dmg * 0.5));
    this.resources.credits = Math.max(0, this.resources.credits - Math.floor(dmg * 0.3));
    this.resources.energy = Math.max(0, this.resources.energy - Math.floor(dmg * 0.2));

    this.notifications.push({
      type: 'danger',
      text: threat.name + ' attaque la colonie (' + colony.q + ',' + colony.r + ')!'
    });
  }

  threatAttackUnit(threat, unit) {
    const damage = Math.max(1, threat.attack - unit.defense);
    unit.hp -= damage;
    this.notifications.push({
      type: 'warning',
      text: threat.name + ' blesse ' + unit.name + ' (-' + damage + ' PV)'
    });

    // Remove dead units
    if (unit.hp <= 0) {
      this.units = this.units.filter(u => u.id !== unit.id);
      this.notifications.push({
        type: 'danger',
        text: unit.name + ' a ete detruit!'
      });
    }
  }

  attackThreat(unit, threat) {
    const damage = Math.max(1, unit.attack - (THREAT_TYPES[threat.type] ? 0 : 0));
    threat.hp -= damage;
    this.notifications.push({
      type: 'info',
      text: unit.name + ' attaque ' + threat.name + ' (-' + damage + ' PV)'
    });
  }

  /* ---------- ORBITAL CANNON ---------- */
  processOrbitalCannons() {
    for (const col of this.colonies) {
      const tile = this.getTile(col.q, col.r);
      if (tile && tile.building === 'orbital_cannon') {
        // Find threats within 3 hex range
        for (const threat of this.threats) {
          const dist = this.hexDistance(col.q, col.r, threat.q, threat.r);
          if (dist <= 3 && threat.hp > 0) {
            const damage = 25;
            threat.hp -= damage;
            this.notifications.push({
              type: 'info',
              text: 'Canon orbital tire sur ' + threat.name + ' (-' + damage + ' PV)!'
            });
            break; // One shot per cannon per turn
          }
        }
      }
    }

    // Remove dead threats
    this.threats = this.threats.filter(t => t.hp > 0 || THREAT_TYPES[t.type].hp === 0);
  }

  /* ---------- JUMP PORTAL ---------- */
  canUsePortal(unitId) {
    const unit = this.units.find(u => u.id === unitId);
    if (!unit) return { ok: false, reason: 'Unite introuvable' };

    const hasPortal = this.colonies.some(col => {
      const tile = this.getTile(col.q, col.r);
      return tile.building === 'jump_portal';
    });

    if (!hasPortal && !this.researchedTech['quantum_3']) {
      return { ok: false, reason: 'Portail de Saut requis' };
    }
    if (this.resources.helium3 < 15) return { ok: false, reason: 'He-3 insuffisant (15)' };
    if (this.resources.energy < 60) return { ok: false, reason: 'Energie insuffisante (60)' };

    return { ok: true };
  }

  usePortal(unitId, targetQ, targetR) {
    const check = this.canUsePortal(unitId);
    if (!check.ok) return check;

    const unit = this.units.find(u => u.id === unitId);
    if (!unit) return { ok: false, reason: 'Unite introuvable' };

    const targetTile = this.getTile(targetQ, targetR);
    if (!targetTile || !targetTile.explored) return { ok: false, reason: 'Destination invalide' };

    this.resources.helium3 -= 15;
    this.resources.energy -= 60;

    unit.q = targetQ;
    unit.r = targetR;
    unit.path = [];
    this.revealAround(targetQ, targetR, this.getVisionRange());

    return { ok: true };
  }

  /* ---------- BUILDING ---------- */
  canBuild(buildingId, q, r) {
    const building = BUILDINGS[buildingId];
    if (!building) return { ok: false, reason: 'Batiment inconnu' };

    const tile = this.getTile(q, r);
    if (!tile) return { ok: false, reason: 'Tuile invalide' };
    if (tile.owner !== 'player') return { ok: false, reason: 'Tuile non colonisee' };
    if (tile.building) return { ok: false, reason: 'Deja construit' };
    if (this.cp < building.cpCost) return { ok: false, reason: 'PA insuffisants' };

    // Era requirement
    if (building.eraReq && building.eraReq > this.era) {
      return { ok: false, reason: 'Ere ' + ERAS[building.eraReq - 1].name + ' requise' };
    }

    // Tech requirement
    if (building.techReq && !this.researchedTech[building.techReq]) {
      return { ok: false, reason: 'Technologie requise: ' + building.techReq };
    }

    // Check cost
    const cost = this.getBuildCost(buildingId);
    for (const res in cost) {
      if ((this.resources[res] || 0) < cost[res]) {
        return { ok: false, reason: 'Ressources insuffisantes (' + res + ')' };
      }
    }

    return { ok: true };
  }

  getBuildCost(buildingId) {
    const building = BUILDINGS[buildingId];
    const cost = { ...building.cost };
    if (this.captain.buildDiscount) {
      for (const res in cost) {
        cost[res] = Math.floor(cost[res] * (1 - this.captain.buildDiscount));
      }
    }
    return cost;
  }

  build(buildingId, q, r) {
    const check = this.canBuild(buildingId, q, r);
    if (!check.ok) return check;

    const building = BUILDINGS[buildingId];
    const cost = this.getBuildCost(buildingId);

    for (const res in cost) {
      this.resources[res] -= cost[res];
    }

    this.cp -= building.cpCost;
    this.setTile(q, r, { building: buildingId });

    // Apply shield if planetary_shield
    if (buildingId === 'planetary_shield') {
      this.updateShields();
    }

    this.calculateDeltas();
    return { ok: true };
  }

  /* ---------- COLONIZE ---------- */
  canColonize(q, r) {
    const tile = this.getTile(q, r);
    if (!tile) return false;
    if (tile.owner) return false;
    if (!tile.explored) return false;

    const neighbors = this.hexNeighbors(q, r);
    const adjacentColony = neighbors.some(([nq, nr]) => {
      const nTile = this.getTile(nq, nr);
      return nTile && nTile.owner === 'player';
    });

    return adjacentColony && this.cp >= 1 && this.resources.credits >= 30;
  }

  colonize(q, r) {
    if (!this.canColonize(q, r)) return false;

    this.resources.credits -= 30;
    this.cp -= 1;
    this.setTile(q, r, { owner: 'player' });
    this.colonies.push({ q, r });
    this.revealAround(q, r, this.getVisionRange());
    this.calculateDeltas();
    return true;
  }

  /* ---------- TECH RESEARCH ---------- */
  canResearch(techId) {
    for (const branchId in TECH_BRANCHES) {
      const branch = TECH_BRANCHES[branchId];
      for (let i = 0; i < branch.levels.length; i++) {
        if (branch.levels[i].id === techId) {
          if (i > 0 && !this.researchedTech[branch.levels[i - 1].id]) {
            return { ok: false, reason: 'Niveau precedent requis' };
          }
          if (this.researchedTech[techId]) {
            return { ok: false, reason: 'Deja recherche' };
          }
          if (this.researchPoints < branch.levels[i].cost) {
            return { ok: false, reason: 'Points de recherche insuffisants' };
          }
          if (this.cp < 3) {
            return { ok: false, reason: 'PA insuffisants (3 requis)' };
          }
          return { ok: true };
        }
      }
    }
    return { ok: false, reason: 'Technologie inconnue' };
  }

  research(techId) {
    const check = this.canResearch(techId);
    if (!check.ok) return check;

    let cost = 0;
    for (const branchId in TECH_BRANCHES) {
      const branch = TECH_BRANCHES[branchId];
      for (const level of branch.levels) {
        if (level.id === techId) {
          cost = level.cost;
          break;
        }
      }
    }

    this.researchPoints -= cost;
    this.cp -= 3;
    this.researchedTech[techId] = true;

    this.updateVisibility();
    this.calculateDeltas();

    return { ok: true };
  }

  /* ---------- DIPLOMACY ---------- */
  canTrade(factionId) {
    const relation = this.factionRelations[factionId] || 0;
    return relation >= 20 && this.cp >= 1;
  }

  trade(factionId) {
    if (!this.canTrade(factionId)) return false;

    this.cp -= 1;
    const faction = FACTIONS[factionId];

    switch (faction.personality) {
      case 'commercial':
        this.resources.credits += 40;
        break;
      case 'diplomatic':
        this.resources.food += 30;
        this.resources.oxygen += 10;
        break;
      case 'research':
        this.researchPoints += 20;
        break;
      case 'neutral':
        this.resources.energy += 25;
        break;
      case 'aggressive':
        this.resources.minerals += 30;
        break;
    }

    this.factionRelations[factionId] = Math.min(100, (this.factionRelations[factionId] || 0) + 5);
    this.calculateDeltas();
    return true;
  }

  /* ---------- EVENTS ---------- */
  processEvents() {
    for (const event of EVENTS) {
      if (Math.random() < event.chance) {
        const result = event.effect(this);
        this.notifications.push({
          type: event.id.includes('leak') || event.id.includes('strike') ? 'danger' : 'success',
          text: event.name + ': ' + result
        });
      }
    }
  }

  processFactions() {
    for (const fId in FACTIONS) {
      const shift = Math.floor(Math.random() * 7) - 3;
      this.factionRelations[fId] = Math.max(-100, Math.min(100, (this.factionRelations[fId] || 0) + shift));
    }

    if (this.factionRelations['hegemony'] < -30 && Math.random() < 0.15) {
      const tribute = Math.floor(Math.random() * 20) + 10;
      if (this.resources.credits >= tribute) {
        this.resources.credits -= tribute;
        this.factionRelations['hegemony'] = Math.min(100, this.factionRelations['hegemony'] + 15);
        this.notifications.push({
          type: 'warning',
          text: 'Hegemonie: Tribute de ' + tribute + ' credits preleve.'
        });
      }
    }
  }

  expandFactionTerritories() {
    if (this.turn % 3 !== 0) return; // Expand every 3 turns

    for (const fId in FACTIONS) {
      if (this.factionColonies[fId].length === 0) continue;

      const colonies = this.factionColonies[fId];
      const expandFrom = colonies[Math.floor(Math.random() * colonies.length)];
      const neighbors = this.hexNeighbors(expandFrom.q, expandFrom.r);
      const validNeighbors = neighbors.filter(([nq, nr]) => {
        const tile = this.getTile(nq, nr);
        return tile && !tile.owner;
      });

      if (validNeighbors.length > 0) {
        const [nq, nr] = validNeighbors[Math.floor(Math.random() * validNeighbors.length)];
        const tile = this.getTile(nq, nr);
        tile.owner = fId;
        this.factionTerritories[fId].push({ q: nq, r: nr });
      }
    }
  }

  /* ---------- SAVE / LOAD ---------- */
  save() {
    const data = {
      turn: this.turn,
      era: this.era,
      maxCP: this.maxCP,
      cp: this.cp,
      resources: this.resources,
      researchPoints: this.researchPoints,
      researchedTech: this.researchedTech,
      map: this.map,
      mapCols: this.mapCols,
      mapRows: this.mapRows,
      captain: this.captain.id,
      colonies: this.colonies,
      units: this.units,
      unitIdCounter: this.unitIdCounter,
      threats: this.threats,
      threatIdCounter: this.threatIdCounter,
      factionRelations: this.factionRelations,
      factionTerritories: this.factionTerritories,
      factionColonies: this.factionColonies,
      discoveredAnomalies: this.discoveredAnomalies,
      camera: this.camera
    };
    try {
      localStorage.setItem('cosmicdrift_save', JSON.stringify(data));
      return true;
    } catch (e) {
      return false;
    }
  }

  load() {
    try {
      const raw = localStorage.getItem('cosmicdrift_save');
      if (!raw) return false;
      const data = JSON.parse(raw);

      this.turn = data.turn || 1;
      this.era = data.era || 1;
      this.maxCP = data.maxCP || 5;
      this.cp = data.cp || 5;
      this.resources = data.resources || this.resources;
      this.researchPoints = data.researchPoints || 0;
      this.researchedTech = data.researchedTech || {};
      this.map = data.map || {};
      this.mapCols = data.mapCols || 30;
      this.mapRows = data.mapRows || 20;
      this.captain = CAPTAINS[data.captain] || CAPTAINS.explorateur;
      this.colonies = data.colonies || [];
      this.units = data.units || data.clones || []; // Backward compat
      this.unitIdCounter = data.unitIdCounter || data.cloneIdCounter || 1;
      this.threats = data.threats || [];
      this.threatIdCounter = data.threatIdCounter || 1;
      this.factionRelations = data.factionRelations || {};
      this.factionTerritories = data.factionTerritories || {};
      this.factionColonies = data.factionColonies || {};
      this.discoveredAnomalies = data.discoveredAnomalies || {};
      this.camera = data.camera || { x: 0, y: 0, zoom: 1 };

      // Ensure faction data structures
      for (const fId in FACTIONS) {
        if (!this.factionTerritories[fId]) this.factionTerritories[fId] = [];
        if (!this.factionColonies[fId]) this.factionColonies[fId] = [];
      }

      // Migrate old clones to units
      this.units = this.units.map(u => {
        if (u.mode === undefined) {
          return {
            id: u.id,
            q: u.q,
            r: u.r,
            name: u.name || 'Unite-' + u.id,
            mode: 'idle',
            path: [],
            moveRange: 2,
            hp: 100,
            maxHp: 100,
            attack: this.getUnitAttack(),
            defense: this.getUnitDefense(),
            faction: 'player',
            harvestCooldown: 0
          };
        }
        return u;
      });

      this.updateVisibility();
      this.calculateDeltas();
      return true;
    } catch (e) {
      return false;
    }
  }

  hasSave() {
    return !!localStorage.getItem('cosmicdrift_save');
  }

  deleteSave() {
    localStorage.removeItem('cosmicdrift_save');
  }
}

// Global game instance
const game = new Game();
