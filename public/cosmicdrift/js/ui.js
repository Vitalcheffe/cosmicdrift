/* ============================================
   CosmicDrift - UI Manager
   ============================================ */

class UIManager {
  constructor() {
    this.selectedCaptain = 'explorateur';
    this.titleAnimFrame = null;
    this.gameLoopFrame = null;
    this.stars = [];
    this.gameActive = false;
    this.moveMode = false;
  }

  /* ---------- INIT ---------- */
  init() {
    this.setupTitleScreen();
    this.setupGameEvents();
  }

  /* ---------- TITLE SCREEN ---------- */
  setupTitleScreen() {
    this.initStars();
    this.animateTitle();

    document.querySelectorAll('.captain-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.captain-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.selectedCaptain = card.dataset.captain;
      });
    });

    document.getElementById('launch-btn').addEventListener('click', () => {
      this.startGame();
    });
  }

  initStars() {
    this.stars = [];
    for (let i = 0; i < 150; i++) {
      this.stars.push({
        x: Math.random() * 1200,
        y: Math.random() * 800,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.3 + 0.05,
        alpha: Math.random() * 0.5 + 0.3
      });
    }
  }

  animateTitle() {
    const canvas = document.getElementById('title-canvas');
    const ctx = canvas.getContext('2d');
    const rect = canvas.parentElement.getBoundingClientRect();

    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);

    const w = rect.width;
    const h = rect.height;

    if (this.stars.length === 0) this.initStars();

    const drawFrame = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#0e0e10';
      ctx.fillRect(0, 0, w, h);

      for (const star of this.stars) {
        star.alpha += Math.sin(Date.now() * 0.001 + star.x) * 0.002;
        star.alpha = Math.max(0.1, Math.min(0.8, star.alpha));
        star.y += star.speed;
        if (star.y > h) {
          star.y = 0;
          star.x = Math.random() * w;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(200, 200, 220, ' + star.alpha + ')';
        ctx.fill();
      }

      this.titleAnimFrame = requestAnimationFrame(drawFrame);
    };

    drawFrame();
  }

  startGame() {
    if (this.titleAnimFrame) cancelAnimationFrame(this.titleAnimFrame);

    game.init(this.selectedCaptain, 'medium');

    document.getElementById('title-screen').classList.remove('active');
    document.getElementById('game-screen').classList.add('active');

    const mapCanvas = document.getElementById('map-canvas');
    const minimapCanvas = document.getElementById('minimap-canvas');
    renderer = new Renderer(mapCanvas, minimapCanvas);

    renderer.centerOnTile(
      Math.floor(game.mapCols / 2),
      Math.floor(game.mapRows / 2)
    );

    this.gameActive = true;
    this.updateHUD();
    this.updateEraDisplay();
    this.startGameLoop();

    game.save();
  }

  /* ---------- GAME LOOP ---------- */
  startGameLoop() {
    const loop = () => {
      if (!this.gameActive) return;
      renderer.draw();
      this.gameLoopFrame = requestAnimationFrame(loop);
    };
    loop();
  }

  /* ---------- GAME EVENTS ---------- */
  setupGameEvents() {
    const canvas = document.getElementById('map-canvas');

    canvas.addEventListener('click', (e) => {
      if (!renderer) return;
      if (renderer.dragMoved) return;

      const rect = canvas.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;

      // Check if clicking a unit first
      const unit = renderer.getUnitAtPixel(px, py);
      if (unit) {
        this.selectUnit(unit);
        return;
      }

      // If in move mode and a unit is selected, move it
      if (this.moveMode && game.selectedUnit) {
        const hex = renderer.pixelToHex(px, py);
        this.moveSelectedUnit(hex.q, hex.r);
        this.moveMode = false;
        canvas.style.cursor = 'grab';
        return;
      }

      // Otherwise select tile
      const tile = renderer.getHexAtPixel(px, py);
      if (tile) {
        this.selectTile(tile);
      }
    });

    canvas.addEventListener('mousemove', (e) => {
      if (!renderer) return;
      const rect = canvas.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      const tile = renderer.getHexAtPixel(px, py);
      game.hoveredTile = tile;
    });

    // End turn
    document.getElementById('btn-end-turn').addEventListener('click', () => {
      this.endTurn();
    });

    // Keyboard shortcuts
    window.addEventListener('keydown', (e) => {
      if (!this.gameActive) return;
      if (e.code === 'Space') {
        e.preventDefault();
        this.endTurn();
      }
      if (e.code === 'Escape') {
        this.moveMode = false;
        game.selectedUnit = null;
        canvas.style.cursor = 'grab';
        document.getElementById('unit-panel').classList.add('hidden');
      }
    });

    // Bottom bar buttons
    document.getElementById('btn-build').addEventListener('click', () => {
      if (game.selectedTile) {
        this.showBuildMenu(game.selectedTile.q, game.selectedTile.r);
      } else {
        this.notify('Selectionnez une tuile d\'abord', 'warning');
      }
    });

    document.getElementById('btn-research').addEventListener('click', () => {
      this.showTechTree();
    });

    document.getElementById('btn-diplomacy').addEventListener('click', () => {
      this.showDiplomacy();
    });

    document.getElementById('btn-unit').addEventListener('click', () => {
      this.showUnitPanel();
    });

    document.getElementById('btn-move').addEventListener('click', () => {
      if (!game.selectedUnit) {
        this.notify('Selectionnez une unite d\'abord', 'warning');
        return;
      }
      this.moveMode = !this.moveMode;
      canvas.style.cursor = this.moveMode ? 'crosshair' : 'grab';
      if (this.moveMode) {
        this.notify('Cliquez sur une tuile pour deplacer l\'unite', 'info');
      }
    });

    // Mode buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!game.selectedUnit) {
          this.notify('Selectionnez une unite d\'abord', 'warning');
          return;
        }
        const mode = btn.dataset.mode;
        if (game.setUnitMode(game.selectedUnit.id, mode)) {
          const modeData = UNIT_MODES[mode];
          this.notify('Mode: ' + modeData.name, 'success');
          this.updateUnitPanel(game.selectedUnit);
          game.save();
        }
      });
    });

    // Tile panel close
    document.getElementById('tile-panel-close').addEventListener('click', () => {
      game.selectedTile = null;
      document.getElementById('tile-panel').classList.add('hidden');
    });

    // Unit panel close
    document.getElementById('unit-panel-close').addEventListener('click', () => {
      game.selectedUnit = null;
      document.getElementById('unit-panel').classList.add('hidden');
    });

    // Overlay close buttons
    document.getElementById('tech-close').addEventListener('click', () => {
      document.getElementById('tech-overlay').classList.add('hidden');
    });
    document.getElementById('diplo-close').addEventListener('click', () => {
      document.getElementById('diplo-overlay').classList.add('hidden');
    });
    document.getElementById('unit-overlay-close').addEventListener('click', () => {
      document.getElementById('unit-overlay').classList.add('hidden');
    });
    document.getElementById('build-close').addEventListener('click', () => {
      document.getElementById('build-overlay').classList.add('hidden');
    });

    // Close overlays on background click
    document.querySelectorAll('.overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.add('hidden');
      });
    });

    // Event modal OK
    document.getElementById('event-ok').addEventListener('click', () => {
      document.getElementById('event-modal').classList.add('hidden');
    });

    // Event modal restart
    document.getElementById('event-restart').addEventListener('click', () => {
      document.getElementById('event-modal').classList.add('hidden');
      this.restartGame();
    });

    // Window resize
    window.addEventListener('resize', () => {
      if (renderer) renderer.resize();
    });
  }

  /* ---------- TILE SELECTION ---------- */
  selectTile(tile) {
    if (!tile.explored) return;

    game.selectedTile = tile;
    game.selectedUnit = null;
    this.moveMode = false;
    document.getElementById('map-canvas').style.cursor = 'grab';
    document.getElementById('unit-panel').classList.add('hidden');

    const panel = document.getElementById('tile-panel');
    panel.classList.remove('hidden');

    this.updateTilePanel(tile);
  }

  updateTilePanel(tile) {
    const biome = BIOMES[tile.biome];
    const body = document.getElementById('tile-panel-body');
    const title = document.getElementById('tile-panel-title');

    title.textContent = biome ? biome.name : 'Inconnu';

    let html = '';

    html += '<div class="tile-biome">' + (biome ? biome.name : '?') + '</div>';
    html += '<div style="margin-bottom:8px;">' + (biome ? biome.description : '') + '</div>';

    // Resources
    html += '<div style="margin-top:8px;font-weight:600;color:#e8e8ea;font-size:12px;">Ressources</div>';
    if (biome) {
      for (const res in biome.resources) {
        if (biome.resources[res] > 0) {
          const names = { minerals: 'Mineraux', helium3: 'He-3', energy: 'Energie', food: 'Nourriture', credits: 'Credits', oxygen: 'O2' };
          html += '<div class="info-row"><span class="info-label">' + (names[res] || res) + '</span><span class="info-value">+' + biome.resources[res] + '</span></div>';
        }
      }
    }

    // Bonus resources from anomaly
    if (tile.bonusResources) {
      html += '<div style="margin-top:4px;font-weight:600;color:#c9a84c;font-size:11px;">Gisement</div>';
      const names = { minerals: 'Mineraux', helium3: 'He-3', energy: 'Energie', food: 'Nourriture', credits: 'Credits', oxygen: 'O2' };
      for (const res in tile.bonusResources) {
        if (tile.bonusResources[res] > 0) {
          html += '<div class="info-row"><span class="info-label">' + (names[res] || res) + '</span><span class="info-value" style="color:#c9a84c;">+' + tile.bonusResources[res] + '</span></div>';
        }
      }
    }

    // Owner
    let ownerText = 'Aucun';
    if (tile.owner === 'player') ownerText = 'Vous';
    else if (tile.owner && FACTIONS[tile.owner]) ownerText = FACTIONS[tile.owner].name;
    else if (tile.owner) ownerText = tile.owner;
    html += '<div class="info-row"><span class="info-label">Proprietaire</span><span class="info-value">' + ownerText + '</span></div>';

    // Shield status
    if (tile.shielded) {
      html += '<div class="info-row"><span class="info-label">Bouclier</span><span class="info-value" style="color:#4d8bce;">Actif</span></div>';
    }

    // Building
    if (tile.building) {
      const building = BUILDINGS[tile.building];
      html += '<div class="building-name">' + (building ? building.name : tile.building) + '</div>';
      if (building) {
        html += '<div style="font-size:11px;color:#8888a0;">' + building.description + '</div>';
        if (building.production) {
          for (const res in building.production) {
            const names = { minerals: 'Mineraux', helium3: 'He-3', energy: 'Energie', food: 'Nourriture', credits: 'Credits', oxygen: 'O2', research: 'Recherche' };
            const val = building.production[res];
            const color = val >= 0 ? '#3d9e6e' : '#c4625a';
            html += '<div class="info-row"><span class="info-label">' + (names[res] || res) + '</span><span class="info-value" style="color:' + color + ';">' + (val >= 0 ? '+' : '') + val + '</span></div>';
          }
        }
      }
    }

    // Units on this tile
    const unitsHere = game.units.filter(u => u.q === tile.q && u.r === tile.r);
    if (unitsHere.length > 0) {
      html += '<div style="margin-top:8px;font-weight:600;color:#e8e8ea;font-size:12px;">Unites</div>';
      for (const unit of unitsHere) {
        const modeData = UNIT_MODES[unit.mode] || UNIT_MODES.idle;
        html += '<div class="info-row"><span class="info-label" style="color:' + modeData.color + ';">' + unit.name + '</span><span class="info-value">' + modeData.name + '</span></div>';
      }
    }

    // Colonize button
    if (!tile.owner && tile.explored) {
      if (game.canColonize(tile.q, tile.r)) {
        html += '<div class="build-btn-row"><button class="btn btn-sm btn-secondary" onclick="ui.colonizeTile(' + tile.q + ', ' + tile.r + ')">Coloniser (30 credits, 1 PA)</button></div>';
      }
    }

    // Build button
    if (tile.owner === 'player' && !tile.building) {
      html += '<div class="build-btn-row"><button class="btn btn-sm btn-primary" onclick="ui.showBuildMenu(' + tile.q + ', ' + tile.r + ')">Construire</button></div>';
    }

    body.innerHTML = html;
  }

  colonizeTile(q, r) {
    if (game.colonize(q, r)) {
      this.notify('Colonie etablie!', 'success');
      this.updateHUD();
      this.updateTilePanel(game.getTile(q, r));
      game.save();
    } else {
      this.notify('Colonisation impossible', 'danger');
    }
  }

  /* ---------- UNIT SELECTION ---------- */
  selectUnit(unit) {
    game.selectedUnit = unit;
    game.selectedTile = null;
    this.moveMode = false;

    const panel = document.getElementById('unit-panel');
    panel.classList.remove('hidden');
    document.getElementById('tile-panel').classList.add('hidden');

    this.updateUnitPanel(unit);
  }

  updateUnitPanel(unit) {
    const modeData = UNIT_MODES[unit.mode] || UNIT_MODES.idle;
    const body = document.getElementById('unit-panel-body');

    let html = '';
    html += '<div style="font-size:14px;font-weight:600;color:' + modeData.color + ';">' + unit.name + '</div>';
    html += '<div style="font-size:11px;color:#8888a0;margin-bottom:8px;">Position: (' + unit.q + ', ' + unit.r + ')</div>';

    // Mode
    html += '<div style="font-size:12px;font-weight:600;color:#e8e8ea;margin-top:4px;">Mode actuel</div>';
    html += '<div style="font-size:12px;color:' + modeData.color + ';margin-bottom:4px;">' + modeData.name + ' - ' + modeData.desc + '</div>';

    // Mode buttons
    html += '<div style="display:flex;flex-wrap:wrap;gap:4px;margin:8px 0;">';
    for (const mId in UNIT_MODES) {
      const m = UNIT_MODES[mId];
      const isActive = unit.mode === mId;
      html += '<button class="mode-btn btn btn-sm' + (isActive ? ' btn-primary' : '') + '" data-mode="' + mId + '" style="border-color:' + m.color + ';color:' + (isActive ? '#fff' : m.color) + ';">' + m.name + '</button>';
    }
    html += '</div>';

    // Stats
    html += '<div style="font-size:12px;font-weight:600;color:#e8e8ea;margin-top:4px;">Statistiques</div>';
    html += '<div class="info-row"><span class="info-label">PV</span><span class="info-value">' + unit.hp + '/' + unit.maxHp + '</span></div>';
    html += '<div class="info-row"><span class="info-label">Attaque</span><span class="info-value">' + unit.attack + '</span></div>';
    html += '<div class="info-row"><span class="info-label">Defense</span><span class="info-value">' + unit.defense + '</span></div>';
    html += '<div class="info-row"><span class="info-label">Deplacement</span><span class="info-value">' + game.getUnitMoveRange() + ' hex/tour</span></div>';

    if (unit.path.length > 0) {
      html += '<div class="info-row"><span class="info-label">Chemin</span><span class="info-value">' + unit.path.length + ' etapes</span></div>';
    }

    // Action buttons
    html += '<div style="margin-top:8px;display:flex;gap:4px;">';
    html += '<button class="btn btn-sm btn-primary" id="btn-move-unit">Deplacer</button>';

    // Portal button
    const portalCheck = game.canUsePortal(unit.id);
    if (portalCheck.ok) {
      html += '<button class="btn btn-sm btn-secondary" id="btn-portal-unit">Portail (15 He-3, 60 E)</button>';
    }
    html += '</div>';

    body.innerHTML = html;

    // Rebind mode buttons
    body.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.mode;
        if (game.setUnitMode(unit.id, mode)) {
          const m = UNIT_MODES[mode];
          this.notify('Mode: ' + m.name, 'success');
          this.updateUnitPanel(game.units.find(u => u.id === unit.id) || unit);
          game.save();
        }
      });
    });

    // Move button
    const moveBtn = document.getElementById('btn-move-unit');
    if (moveBtn) {
      moveBtn.addEventListener('click', () => {
        this.moveMode = true;
        document.getElementById('map-canvas').style.cursor = 'crosshair';
        this.notify('Cliquez sur une tuile pour deplacer', 'info');
      });
    }

    // Portal button
    const portalBtn = document.getElementById('btn-portal-unit');
    if (portalBtn) {
      portalBtn.addEventListener('click', () => {
        this.moveMode = 'portal';
        document.getElementById('map-canvas').style.cursor = 'crosshair';
        this.notify('Cliquez sur une tuile pour teleporter', 'info');
      });
    }
  }

  moveSelectedUnit(targetQ, targetR) {
    if (!game.selectedUnit) return;

    if (this.moveMode === 'portal') {
      const result = game.usePortal(game.selectedUnit.id, targetQ, targetR);
      if (result.ok) {
        this.notify('Teleportation reussie!', 'success');
        this.updateUnitPanel(game.selectedUnit);
        this.updateHUD();
        game.save();
      } else {
        this.notify(result.reason, 'danger');
      }
      this.moveMode = false;
      document.getElementById('map-canvas').style.cursor = 'grab';
      return;
    }

    const result = game.moveUnit(game.selectedUnit.id, targetQ, targetR);
    if (result.ok) {
      this.notify('Unite deplacee!', 'success');
      this.updateUnitPanel(game.selectedUnit);
      this.updateHUD();
      game.save();
    } else {
      this.notify(result.reason, 'danger');
    }
  }

  /* ---------- BUILD MENU ---------- */
  showBuildMenu(q, r) {
    const tile = game.getTile(q, r);
    if (!tile || tile.owner !== 'player') {
      this.notify('Selectionnez une colonie', 'warning');
      return;
    }

    const body = document.getElementById('build-body');
    let html = '';

    for (const bId in BUILDINGS) {
      const building = BUILDINGS[bId];
      if (!game.isBuildingAvailable(bId)) continue;
      const check = game.canBuild(bId, q, r);
      const cost = game.getBuildCost(bId);

      let costStr = Object.entries(cost).map(([k, v]) => v + ' ' + k).join(', ');

      html += '<div class="build-item ' + (check.ok ? '' : 'locked') + '" data-building="' + bId + '">';
      html += '<div>';
      html += '<div class="build-item-name">' + building.name + '</div>';
      html += '<div class="build-item-cost">' + costStr + '</div>';
      html += '<div class="build-item-effect">' + building.description + '</div>';
      if (!check.ok && tile.building === bId) {
        html += '<div style="font-size:11px;color:#c4625a;">Deja construit</div>';
      } else if (!check.ok) {
        html += '<div style="font-size:11px;color:#c4625a;">' + check.reason + '</div>';
      }
      html += '</div>';
      html += '</div>';
    }

    body.innerHTML = html;

    body.querySelectorAll('.build-item:not(.locked)').forEach(item => {
      item.addEventListener('click', () => {
        const bId = item.dataset.building;
        const result = game.build(bId, q, r);
        if (result.ok) {
          this.notify(BUILDINGS[bId].name + ' construit!', 'success');
          document.getElementById('build-overlay').classList.add('hidden');
          this.updateHUD();
          if (game.selectedTile) this.updateTilePanel(game.selectedTile);
          game.save();
        } else {
          this.notify(result.reason, 'danger');
        }
      });
    });

    document.getElementById('build-overlay').classList.remove('hidden');
  }

  /* ---------- TECH TREE ---------- */
  showTechTree() {
    const body = document.getElementById('tech-body');
    let html = '';

    html += '<div style="margin-bottom:12px;font-size:13px;color:#e8e8ea;">Points de recherche: <strong style="color:#4d8bce;font-variant-numeric:tabular-nums;">' + game.researchPoints + '</strong></div>';

    for (const branchId in TECH_BRANCHES) {
      const branch = TECH_BRANCHES[branchId];
      html += '<div class="tech-branch">';
      html += '<div class="tech-branch-title">' + branch.name + '</div>';
      html += '<div class="tech-levels">';

      for (let i = 0; i < branch.levels.length; i++) {
        const level = branch.levels[i];
        const researched = game.researchedTech[level.id];
        const canResearch = game.canResearch(level.id);

        let stateClass = 'locked';
        if (researched) stateClass = 'researched';
        else if (canResearch.ok) stateClass = 'available';

        html += '<div class="tech-level ' + stateClass + '" data-tech="' + level.id + '">';
        html += '<div class="tech-name">' + level.name + '</div>';
        html += '<div class="tech-cost">' + (researched ? 'Recherche' : level.cost + ' pts') + '</div>';
        html += '<div class="tech-desc">' + level.desc + '</div>';
        html += '</div>';
      }

      html += '</div></div>';
    }

    body.innerHTML = html;

    body.querySelectorAll('.tech-level.available:not(.researched)').forEach(el => {
      el.addEventListener('click', () => {
        const techId = el.dataset.tech;
        const result = game.research(techId);
        if (result.ok) {
          this.notify('Technologie ' + techId + ' recherchee!', 'success');
          this.updateHUD();
          this.showTechTree();
          game.save();
        } else {
          this.notify(result.reason, 'danger');
        }
      });
    });

    document.getElementById('tech-overlay').classList.remove('hidden');
  }

  /* ---------- DIPLOMACY ---------- */
  showDiplomacy() {
    const body = document.getElementById('diplo-body');
    let html = '';

    for (const fId in FACTIONS) {
      const faction = FACTIONS[fId];
      const relation = game.factionRelations[fId] || 0;
      const canTrade = game.canTrade(fId);

      // Count territory
      const territoryCount = (game.factionTerritories[fId] || []).length;

      let relClass = 'neutral';
      let relText = 'Neutre';
      if (relation >= 50) { relClass = 'friendly'; relText = 'Allie'; }
      else if (relation >= 20) { relClass = 'friendly'; relText = 'Amical'; }
      else if (relation <= -30) { relClass = 'hostile'; relText = 'Hostile'; }
      else if (relation <= -10) { relClass = 'hostile'; relText = 'Tendre'; }

      html += '<div class="faction-card">';
      html += '<div class="faction-header">';
      html += '<span class="faction-name" style="color:' + faction.color + ';">' + faction.name + '</span>';
      html += '<span class="faction-relation ' + relClass + '">' + relText + ' (' + relation + ')</span>';
      html += '</div>';
      html += '<div style="font-size:11px;color:#8888a0;margin-bottom:4px;">' + faction.description + '</div>';
      html += '<div style="font-size:11px;color:#8888a0;margin-bottom:6px;">Territoire: ' + territoryCount + ' tuiles</div>';
      html += '<div class="faction-bar"><div class="faction-bar-fill" style="width:' + (relation + 100) / 2 + '%;background:' + faction.color + ';"></div></div>';
      html += '<div class="faction-actions">';
      if (canTrade) {
        html += '<button class="btn btn-sm btn-secondary" data-trade="' + fId + '">Echanger (1 PA)</button>';
      }
      html += '</div>';
      html += '</div>';
    }

    body.innerHTML = html;

    body.querySelectorAll('[data-trade]').forEach(btn => {
      btn.addEventListener('click', () => {
        const fId = btn.dataset.trade;
        if (game.trade(fId)) {
          this.notify('Echange avec ' + FACTIONS[fId].name + '!', 'success');
          this.updateHUD();
          this.showDiplomacy();
          game.save();
        }
      });
    });

    document.getElementById('diplo-overlay').classList.remove('hidden');
  }

  /* ---------- UNIT MANAGEMENT OVERLAY ---------- */
  showUnitPanel() {
    const body = document.getElementById('unit-overlay-body');
    let html = '';

    // Create unit section
    html += '<div style="margin-bottom:16px;">';
    html += '<div style="font-size:13px;font-weight:600;color:#e8e8ea;margin-bottom:8px;">Creer une Unite</div>';
    html += '<div style="font-size:11px;color:#8888a0;margin-bottom:8px;">200 credits, 50 mineraux, 20 He-3, 4 PA</div>';

    const factories = game.colonies.filter(col => {
      const tile = game.getTile(col.q, col.r);
      return tile.building === 'clone_factory';
    });

    if (factories.length > 0) {
      for (const factory of factories) {
        const canCreate = game.canCreateUnit(factory.q, factory.r);
        html += '<button class="btn btn-sm ' + (canCreate.ok ? 'btn-secondary' : '') + '" ' + (canCreate.ok ? '' : 'disabled') + ' data-create-unit="' + factory.q + ',' + factory.r + '">Creer a (' + factory.q + ',' + factory.r + ')</button> ';
        if (!canCreate.ok) {
          html += '<span style="font-size:11px;color:#c4625a;">' + canCreate.reason + '</span>';
        }
      }
    } else {
      html += '<div style="font-size:11px;color:#c4625a;">Aucune Usine de Clonage construite (Requiert Biologie I, Ere 2)</div>';
    }
    html += '</div>';

    // Unit list
    html += '<div style="font-size:13px;font-weight:600;color:#e8e8ea;margin-bottom:8px;">Unites Actives (' + game.units.length + ')</div>';
    if (game.units.length === 0) {
      html += '<div style="font-size:11px;color:#8888a0;">Aucune unite active</div>';
    } else {
      for (const unit of game.units) {
        const modeData = UNIT_MODES[unit.mode] || UNIT_MODES.idle;
        html += '<div class="clone-item" style="border-left:3px solid ' + modeData.color + ';">';
        html += '<div>';
        html += '<div class="clone-info" style="color:' + modeData.color + ';">' + unit.name + '</div>';
        html += '<div class="clone-pos">(' + unit.q + ', ' + unit.r + ') - ' + modeData.name + '</div>';
        html += '</div>';
        html += '<div class="clone-actions">';
        html += '<button class="btn btn-sm" data-select-unit="' + unit.id + '">Voir</button>';
        html += '</div>';
        html += '</div>';
      }
    }

    body.innerHTML = html;

    // Create unit handlers
    body.querySelectorAll('[data-create-unit]').forEach(btn => {
      btn.addEventListener('click', () => {
        const [q, r] = btn.dataset.createUnit.split(',').map(Number);
        const result = game.createUnit(q, r);
        if (result.ok) {
          this.notify('Unite creee!', 'success');
          this.updateHUD();
          this.showUnitPanel();
          game.save();
        } else {
          this.notify(result.reason, 'danger');
        }
      });
    });

    // Select unit handlers
    body.querySelectorAll('[data-select-unit]').forEach(btn => {
      btn.addEventListener('click', () => {
        const unitId = parseInt(btn.dataset.selectUnit);
        const unit = game.units.find(u => u.id === unitId);
        if (unit) {
          this.selectUnit(unit);
          renderer.centerOnTile(unit.q, unit.r);
          document.getElementById('unit-overlay').classList.add('hidden');
        }
      });
    });

    document.getElementById('unit-overlay').classList.remove('hidden');
  }

  /* ---------- END TURN ---------- */
  endTurn() {
    game.endTurn();
    this.updateHUD();
    this.updateEraDisplay();
    this.showNotifications();
    game.save();

    if (game.gameOver) {
      this.showEvent('Colonie Perdue', 'Votre colonie n\'a plus d\'oxygen. La mission est un echec. Tour: ' + game.turn, true);
      return;
    }

    // Update panels
    if (game.selectedTile) {
      const tile = game.getTile(game.selectedTile.q, game.selectedTile.r);
      if (tile) this.updateTilePanel(tile);
    }
    if (game.selectedUnit) {
      const unit = game.units.find(u => u.id === game.selectedUnit.id);
      if (unit) {
        game.selectedUnit = unit;
        this.updateUnitPanel(unit);
      } else {
        game.selectedUnit = null;
        document.getElementById('unit-panel').classList.add('hidden');
      }
    }
  }

  /* ---------- HUD UPDATE ---------- */
  updateHUD() {
    const resources = ['credits', 'minerals', 'oxygen', 'energy', 'food', 'helium3'];

    for (const res of resources) {
      const valEl = document.getElementById('val-' + res);
      const deltaEl = document.getElementById('delta-' + res);
      if (valEl) valEl.textContent = Math.floor(game.resources[res]);
      if (deltaEl) {
        const delta = game.resourceDeltas[res] || 0;
        deltaEl.textContent = (delta >= 0 ? '+' : '') + delta;
        deltaEl.className = 'res-delta' + (delta < 0 ? ' negative' : '');
      }
    }

    document.getElementById('turn-number').textContent = game.turn;
    document.getElementById('cp-current').textContent = game.cp;
    document.getElementById('cp-max').textContent = game.maxCP;

    document.getElementById('btn-end-turn').disabled = game.gameOver;

    const o2Val = document.getElementById('val-oxygen');
    if (o2Val) {
      o2Val.style.color = game.resources.oxygen < 20 ? '#c4625a' : '';
    }
  }

  updateEraDisplay() {
    const era = game.getCurrentEra();
    const eraEl = document.getElementById('era-display');
    if (eraEl) {
      eraEl.textContent = 'Ere ' + era.id + ': ' + era.name;
      eraEl.style.color = era.color;
    }
  }

  /* ---------- NOTIFICATIONS ---------- */
  notify(text, type) {
    type = type || 'info';
    const container = document.getElementById('notifications');
    const el = document.createElement('div');
    el.className = 'notification ' + type;
    el.textContent = text;
    container.appendChild(el);

    setTimeout(() => {
      if (el.parentElement) el.remove();
    }, 3000);
  }

  showNotifications() {
    const notes = game.notifications.splice(0, game.notifications.length);
    for (const note of notes) {
      setTimeout(() => this.notify(note.text, note.type), 100);
    }
  }

  /* ---------- EVENT MODAL ---------- */
  showEvent(title, text, isGameOver) {
    document.getElementById('event-title').textContent = title;
    document.getElementById('event-text').textContent = text;
    const restartBtn = document.getElementById('event-restart');
    if (isGameOver) {
      restartBtn.classList.remove('hidden');
      document.getElementById('event-ok').classList.add('hidden');
    } else {
      restartBtn.classList.add('hidden');
      document.getElementById('event-ok').classList.remove('hidden');
    }
    document.getElementById('event-modal').classList.remove('hidden');
  }

  /* ---------- RESTART ---------- */
  restartGame() {
    this.gameActive = false;
    if (this.gameLoopFrame) cancelAnimationFrame(this.gameLoopFrame);
    game.deleteSave();
    renderer = null;

    document.getElementById('game-screen').classList.remove('active');
    document.getElementById('title-screen').classList.add('active');
    this.initStars();
    this.animateTitle();
  }
}

// Global UI instance
const ui = new UIManager();

// Boot
window.addEventListener('DOMContentLoaded', () => {
  ui.init();
});
