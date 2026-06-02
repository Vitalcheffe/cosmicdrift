/* ============================================
   CosmicDrift - Core Game Engine
   ============================================ */

class Game {
  constructor() {
    this.turn = 1;
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
    this.clones = [];
    this.cloneIdCounter = 1;
    this.factionRelations = {};
    this.selectedTile = null;
    this.hoveredTile = null;
    this.gameOver = false;
    this.notifications = [];

    // Camera
    this.camera = { x: 0, y: 0, zoom: 1 };

    // Initialize faction relations
    for (const fId in FACTIONS) {
      this.factionRelations[fId] = FACTIONS[fId].baseRelation;
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

    // Calculate initial deltas
    this.calculateDeltas();

    // Center camera on start
    this.camera.x = startQ;
    this.camera.y = startR;
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
          visible: false
        };
      }
    }
  }

  weightedRandomBiome(q, r) {
    // Weight biomes based on position for more interesting maps
    const cx = this.mapCols / 2;
    const cy = this.mapRows / 2;
    const dist = Math.sqrt((q - cx) ** 2 + (r - cy) ** 2);
    const maxDist = Math.sqrt(cx ** 2 + cy ** 2);
    const norm = dist / maxDist;

    const weights = [
      15, // lunar_crater - common
      12, // asteroid_field
      8 + norm * 10, // nebula - more common at edges
      15 - norm * 8, // telluric_planet - more common at center
      5 + norm * 8, // gas_giant - more common at edges
      10  // debris_field
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

  /* ---------- HEX NEIGHBORS (axial coords, pointy-top) ---------- */
  hexNeighbors(q, r) {
    return [
      [q + 1, r], [q - 1, r],
      [q, r + 1], [q, r - 1],
      [q + 1, r - 1], [q - 1, r + 1]
    ].filter(([nq, nr]) => this.getTile(nq, nr));
  }

  hexDistance(q1, r1, q2, r2) {
    // Cube distance for axial coords
    const dx = q1 - q2;
    const dz = r1 - r2;
    const dy = -dx - dz;
    return Math.max(Math.abs(dx), Math.abs(dy), Math.abs(dz));
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
    // Reset all to not visible
    for (const key in this.map) {
      this.map[key].visible = false;
    }
    // Reveal around each colony and clone
    const range = this.getVisionRange();
    for (const col of this.colonies) {
      this.revealAround(col.q, col.r, range);
    }
    for (const clone of this.clones) {
      this.revealAround(clone.q, clone.r, Math.max(1, range - 1));
    }
  }

  getVisionRange() {
    let range = this.captain.visionRange || 2;
    if (this.researchedTech['quantum_1']) range += 2;
    if (this.researchedTech['quantum_3']) range += 3;
    return range;
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
    this.resources.oxygen -= 3; // Oxygen consumption

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

    // Update visibility
    this.updateVisibility();

    // Random events
    this.processEvents();

    // NPC faction actions
    this.processFactions();

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

      // Base biome production
      const biome = BIOMES[tile.biome];
      if (biome) {
        for (const res in biome.resources) {
          totalProduction[res] += biome.resources[res];
        }
      }

      // Building production
      if (tile.building) {
        const building = BUILDINGS[tile.building];
        if (building && building.production) {
          for (const res in building.production) {
            if (res === 'research') continue; // Handled separately
            totalProduction[res] += building.production[res];
          }
        }
      }
    }

    // Apply tech bonuses
    if (this.researchedTech['extraction_2']) {
      totalProduction.minerals = Math.floor(totalProduction.minerals * 1.25);
    }
    if (this.researchedTech['extraction_3']) {
      totalProduction.minerals = Math.floor(totalProduction.minerals * 1.5);
    }
    if (this.researchedTech['biology_2']) {
      totalProduction.food = Math.floor(totalProduction.food * 1.25);
    }
    if (this.researchedTech['biology_3']) {
      totalProduction.food = Math.floor(totalProduction.food * 1.5);
      totalProduction.oxygen += 10;
    }
    if (this.researchedTech['energy_2']) {
      totalProduction.energy = Math.floor(totalProduction.energy * 1.25);
    }
    if (this.researchedTech['energy_3']) {
      totalProduction.energy = Math.floor(totalProduction.energy * 1.5);
    }
    if (this.researchedTech['commerce_1']) {
      totalProduction.credits = Math.floor(totalProduction.credits * 1.1);
    }
    if (this.researchedTech['commerce_2']) {
      totalProduction.credits = Math.floor(totalProduction.credits * 1.25);
    }
    if (this.researchedTech['commerce_3']) {
      totalProduction.credits = Math.floor(totalProduction.credits * 1.5);
    }

    // Add production to resources
    for (const res in totalProduction) {
      this.resources[res] += totalProduction[res];
    }
  }

  calculateResearchProduction() {
    let total = 0;
    for (const col of this.colonies) {
      const tile = this.getTile(col.q, col.r);
      if (tile.building === 'lab') {
        total += 10;
      }
    }
    return total;
  }

  calculateDeltas() {
    // Simulate production to show deltas
    let totalProduction = {
      credits: 5, minerals: 0, oxygen: -3,
      energy: 0, food: 0, helium3: 0
    };

    for (const col of this.colonies) {
      const tile = this.getTile(col.q, col.r);
      const biome = BIOMES[tile.biome];
      if (biome) {
        for (const res in biome.resources) {
          totalProduction[res] += biome.resources[res];
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

    if (this.researchedTech['biology_3']) totalProduction.oxygen += 10;

    this.resourceDeltas = totalProduction;
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

    // Deduct resources
    for (const res in cost) {
      this.resources[res] -= cost[res];
    }

    // Deduct CP
    this.cp -= building.cpCost;

    // Place building
    this.setTile(q, r, { building: buildingId });

    this.calculateDeltas();

    return { ok: true };
  }

  /* ---------- COLONIZE ---------- */
  canColonize(q, r) {
    const tile = this.getTile(q, r);
    if (!tile) return false;
    if (tile.owner) return false;
    if (!tile.explored) return false;

    // Must be adjacent to existing colony
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
    // Find the tech in branches
    for (const branchId in TECH_BRANCHES) {
      const branch = TECH_BRANCHES[branchId];
      for (let i = 0; i < branch.levels.length; i++) {
        if (branch.levels[i].id === techId) {
          // Check prerequisites (must have previous level)
          if (i > 0 && !this.researchedTech[branch.levels[i - 1].id]) {
            return { ok: false, reason: 'Niveau precedent requis' };
          }
          // Already researched
          if (this.researchedTech[techId]) {
            return { ok: false, reason: 'Deja recherche' };
          }
          // Check research points
          if (this.researchPoints < branch.levels[i].cost) {
            return { ok: false, reason: 'Points de recherche insuffisants' };
          }
          // Check CP
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

    // Find cost
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

    // Apply immediate effects
    if (techId === 'extraction_1') this.maxCP += 0; // No CP change, just unlocks
    if (techId === 'biology_1') this.maxCP += 0;

    this.updateVisibility();
    this.calculateDeltas();

    return { ok: true };
  }

  /* ---------- CLONE SYSTEM ---------- */
  canCreateClone(q, r) {
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

  createClone(q, r) {
    const check = this.canCreateClone(q, r);
    if (!check.ok) return check;

    this.resources.credits -= 200;
    this.resources.minerals -= 50;
    this.resources.helium3 -= 20;
    this.cp -= 4;

    const cloneId = this.cloneIdCounter++;
    this.clones.push({ id: cloneId, q, r, name: 'Clone-' + cloneId });

    this.revealAround(q, r, Math.max(1, this.getVisionRange() - 1));
    this.calculateDeltas();

    return { ok: true };
  }

  canTeleport(cloneId) {
    const clone = this.clones.find(c => c.id === cloneId);
    if (!clone) return { ok: false, reason: 'Clone introuvable' };

    // Check if player has teleporter
    const hasTeleporter = this.colonies.some(col => {
      const tile = this.getTile(col.q, col.r);
      return tile.building === 'teleporter';
    });

    if (!hasTeleporter && !this.researchedTech['quantum_3']) {
      return { ok: false, reason: 'Teleporteur requis' };
    }
    if (this.resources.helium3 < 10) return { ok: false, reason: 'He-3 insuffisant' };
    if (this.resources.energy < 50) return { ok: false, reason: 'Energie insuffisante' };

    return { ok: true };
  }

  teleport(cloneId) {
    const check = this.canTeleport(cloneId);
    if (!check.ok) return check;

    this.resources.helium3 -= 10;
    this.resources.energy -= 50;

    const clone = this.clones.find(c => c.id === cloneId);
    // Move camera to clone position
    this.camera.x = clone.q;
    this.camera.y = clone.r;

    return { ok: true, q: clone.q, r: clone.r };
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

    // Different trades based on personality
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
        // Unlikely to trade, but if friendly enough
        this.resources.minerals += 30;
        break;
    }

    // Improve relations
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
    // Random faction relation shifts
    for (const fId in FACTIONS) {
      const shift = Math.floor(Math.random() * 7) - 3; // -3 to +3
      this.factionRelations[fId] = Math.max(-100, Math.min(100, (this.factionRelations[fId] || 0) + shift));
    }

    // Aggressive faction may demand tribute
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

  /* ---------- SAVE / LOAD ---------- */
  save() {
    const data = {
      turn: this.turn,
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
      clones: this.clones,
      cloneIdCounter: this.cloneIdCounter,
      factionRelations: this.factionRelations,
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
      this.clones = data.clones || [];
      this.cloneIdCounter = data.cloneIdCounter || 1;
      this.factionRelations = data.factionRelations || {};
      this.camera = data.camera || { x: 0, y: 0, zoom: 1 };

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
