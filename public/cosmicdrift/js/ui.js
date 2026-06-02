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
  }

  /* ---------- INIT ---------- */
  init() {
    this.setupTitleScreen();
    this.setupGameEvents();
  }

  /* ---------- TITLE SCREEN ---------- */
  setupTitleScreen() {
    // Star animation
    this.initStars();
    this.animateTitle();

    // Captain selection
    document.querySelectorAll('.captain-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.captain-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.selectedCaptain = card.dataset.captain;
      });
    });

    // Launch button
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

    // Re-init stars if needed
    if (this.stars.length === 0) this.initStars();

    const drawFrame = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#0e0e10';
      ctx.fillRect(0, 0, w, h);

      // Draw stars
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
        ctx.fillStyle = `rgba(200, 200, 220, ${star.alpha})`;
        ctx.fill();
      }

      this.titleAnimFrame = requestAnimationFrame(drawFrame);
    };

    drawFrame();
  }

  startGame() {
    // Stop title animation
    if (this.titleAnimFrame) cancelAnimationFrame(this.titleAnimFrame);

    // Init game
    game.init(this.selectedCaptain, 'medium');

    // Switch screens
    document.getElementById('title-screen').classList.remove('active');
    document.getElementById('game-screen').classList.add('active');

    // Init renderer
    const mapCanvas = document.getElementById('map-canvas');
    const minimapCanvas = document.getElementById('minimap-canvas');
    renderer = new Renderer(mapCanvas, minimapCanvas);

    // Center camera on starting position
    renderer.centerOnTile(
      Math.floor(game.mapCols / 2),
      Math.floor(game.mapRows / 2)
    );

    this.gameActive = true;
    this.updateHUD();
    this.startGameLoop();

    // Auto-save
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
    // Canvas click
    const canvas = document.getElementById('map-canvas');

    canvas.addEventListener('click', (e) => {
      if (!renderer) return;
      if (renderer.dragMoved) return; // Ignore clicks after dragging

      const rect = canvas.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      const tile = renderer.getHexAtPixel(px, py);

      if (tile) {
        this.selectTile(tile);
      }
    });

    // Canvas hover
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

    document.getElementById('btn-clone').addEventListener('click', () => {
      this.showClonePanel();
    });

    document.getElementById('btn-teleport').addEventListener('click', () => {
      this.showClonePanel(true);
    });

    // Tile panel close
    document.getElementById('tile-panel-close').addEventListener('click', () => {
      game.selectedTile = null;
      document.getElementById('tile-panel').classList.add('hidden');
    });

    // Overlay close buttons
    document.getElementById('tech-close').addEventListener('click', () => {
      document.getElementById('tech-overlay').classList.add('hidden');
    });
    document.getElementById('diplo-close').addEventListener('click', () => {
      document.getElementById('diplo-overlay').classList.add('hidden');
    });
    document.getElementById('clone-close').addEventListener('click', () => {
      document.getElementById('clone-overlay').classList.add('hidden');
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

    // Biome description
    html += `<div class="tile-biome">${biome ? biome.name : '?'}</div>`;
    html += `<div style="margin-bottom:8px;">${biome ? biome.description : ''}</div>`;

    // Resources on tile
    html += '<div style="margin-top:8px;font-weight:600;color:#e8e8ea;font-size:12px;">Ressources</div>';
    if (biome) {
      for (const res in biome.resources) {
        if (biome.resources[res] > 0) {
          const names = { minerals: 'Mineraux', helium3: 'He-3', energy: 'Energie', food: 'Nourriture', credits: 'Credits', oxygen: 'O2' };
          html += `<div class="info-row"><span class="info-label">${names[res] || res}</span><span class="info-value">+${biome.resources[res]}</span></div>`;
        }
      }
    }

    // Owner
    html += `<div class="info-row"><span class="info-label">Proprietaire</span><span class="info-value">${tile.owner === 'player' ? 'Vous' : (tile.owner || 'Aucun')}</span></div>`;

    // Building
    if (tile.building) {
      const building = BUILDINGS[tile.building];
      html += `<div class="building-name">${building ? building.name : tile.building}</div>`;
      if (building) {
        html += `<div style="font-size:11px;color:#8888a0;">${building.description}</div>`;
        if (building.production) {
          for (const res in building.production) {
            const names = { minerals: 'Mineraux', helium3: 'He-3', energy: 'Energie', food: 'Nourriture', credits: 'Credits', oxygen: 'O2', research: 'Recherche' };
            html += `<div class="info-row"><span class="info-label">${names[res] || res}</span><span class="info-value" style="color:#3d9e6e;">+${building.production[res]}</span></div>`;
          }
        }
      }
    }

    // Colonize button
    if (!tile.owner && tile.explored) {
      if (game.canColonize(tile.q, tile.r)) {
        html += `<div class="build-btn-row"><button class="btn btn-sm btn-secondary" onclick="ui.colonizeTile(${tile.q}, ${tile.r})">Coloniser (30 credits, 1 PA)</button></div>`;
      }
    }

    // Build button
    if (tile.owner === 'player' && !tile.building) {
      html += `<div class="build-btn-row"><button class="btn btn-sm btn-primary" onclick="ui.showBuildMenu(${tile.q}, ${tile.r})">Construire</button></div>`;
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
      const check = game.canBuild(bId, q, r);
      const cost = game.getBuildCost(bId);

      let costStr = Object.entries(cost).map(([k, v]) => `${v} ${k}`).join(', ');

      html += `<div class="build-item ${check.ok ? '' : 'locked'}" data-building="${bId}">`;
      html += `<div>`;
      html += `<div class="build-item-name">${building.name}</div>`;
      html += `<div class="build-item-cost">${costStr}</div>`;
      html += `<div class="build-item-effect">${building.description}</div>`;
      if (!check.ok && tile.building === bId) {
        html += `<div style="font-size:11px;color:#c4625a;">Deja construit</div>`;
      } else if (!check.ok) {
        html += `<div style="font-size:11px;color:#c4625a;">${check.reason}</div>`;
      }
      html += `</div>`;
      html += `</div>`;
    }

    body.innerHTML = html;

    // Add click handlers
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

    html += `<div style="margin-bottom:12px;font-size:13px;color:#e8e8ea;">Points de recherche: <strong style="color:#4d8bce;font-variant-numeric:tabular-nums;">${game.researchPoints}</strong></div>`;

    for (const branchId in TECH_BRANCHES) {
      const branch = TECH_BRANCHES[branchId];
      html += `<div class="tech-branch">`;
      html += `<div class="tech-branch-title">${branch.name}</div>`;
      html += `<div class="tech-levels">`;

      for (let i = 0; i < branch.levels.length; i++) {
        const level = branch.levels[i];
        const researched = game.researchedTech[level.id];
        const canResearch = game.canResearch(level.id);
        const prevResearched = i === 0 || game.researchedTech[branch.levels[i - 1].id];

        let stateClass = 'locked';
        if (researched) stateClass = 'researched';
        else if (canResearch.ok) stateClass = 'available';
        else if (prevResearched) stateClass = 'available';

        html += `<div class="tech-level ${stateClass}" data-tech="${level.id}">`;
        html += `<div class="tech-name">${level.name}</div>`;
        html += `<div class="tech-cost">${researched ? 'Recherche' : level.cost + ' pts'}</div>`;
        html += `<div class="tech-desc">${level.desc}</div>`;
        html += `</div>`;
      }

      html += `</div></div>`;
    }

    body.innerHTML = html;

    // Click handlers for research
    body.querySelectorAll('.tech-level.available:not(.researched)').forEach(el => {
      el.addEventListener('click', () => {
        const techId = el.dataset.tech;
        const result = game.research(techId);
        if (result.ok) {
          this.notify('Technologie ' + techId + ' recherchee!', 'success');
          this.updateHUD();
          this.showTechTree(); // Refresh
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

      let relClass = 'neutral';
      let relText = 'Neutre';
      if (relation >= 50) { relClass = 'friendly'; relText = 'Allie'; }
      else if (relation >= 20) { relClass = 'friendly'; relText = 'Amical'; }
      else if (relation <= -30) { relClass = 'hostile'; relText = 'Hostile'; }
      else if (relation <= -10) { relClass = 'hostile'; relText = 'Tendre'; }

      html += `<div class="faction-card">`;
      html += `<div class="faction-header">`;
      html += `<span class="faction-name" style="color:${faction.color};">${faction.name}</span>`;
      html += `<span class="faction-relation ${relClass}">${relText} (${relation})</span>`;
      html += `</div>`;
      html += `<div style="font-size:11px;color:#8888a0;margin-bottom:6px;">${faction.description}</div>`;
      html += `<div class="faction-bar"><div class="faction-bar-fill" style="width:${(relation + 100) / 2}%;background:${faction.color};"></div></div>`;
      html += `<div class="faction-actions">`;
      if (canTrade) {
        html += `<button class="btn btn-sm btn-secondary" data-trade="${fId}">Echanger (1 PA)</button>`;
      }
      html += `</div>`;
      html += `</div>`;
    }

    body.innerHTML = html;

    // Trade handlers
    body.querySelectorAll('[data-trade]').forEach(btn => {
      btn.addEventListener('click', () => {
        const fId = btn.dataset.trade;
        if (game.trade(fId)) {
          this.notify('Echange avec ' + FACTIONS[fId].name + '!', 'success');
          this.updateHUD();
          this.showDiplomacy(); // Refresh
          game.save();
        }
      });
    });

    document.getElementById('diplo-overlay').classList.remove('hidden');
  }

  /* ---------- CLONE PANEL ---------- */
  showClonePanel(teleportMode) {
    const body = document.getElementById('clone-body');
    let html = '';

    // Create clone section
    html += `<div style="margin-bottom:16px;">`;
    html += `<div style="font-size:13px;font-weight:600;color:#e8e8ea;margin-bottom:8px;">Creer un Clone</div>`;
    html += `<div style="font-size:11px;color:#8888a0;margin-bottom:8px;">200 credits, 50 mineraux, 20 He-3, 4 PA</div>`;

    // Find clone factories
    const factories = game.colonies.filter(col => {
      const tile = game.getTile(col.q, col.r);
      return tile.building === 'clone_factory';
    });

    if (factories.length > 0) {
      for (const factory of factories) {
        const canCreate = game.canCreateClone(factory.q, factory.r);
        html += `<button class="btn btn-sm ${canCreate.ok ? 'btn-secondary' : ''}" ${canCreate.ok ? '' : 'disabled'} data-create-clone="${factory.q},${factory.r}">Cloner a (${factory.q},${factory.r})</button> `;
        if (!canCreate.ok) {
          html += `<span style="font-size:11px;color:#c4625a;">${canCreate.reason}</span>`;
        }
      }
    } else {
      html += `<div style="font-size:11px;color:#c4625a;">Aucune Usine de Clonage construite</div>`;
    }
    html += `</div>`;

    // Clone list
    html += `<div style="font-size:13px;font-weight:600;color:#e8e8ea;margin-bottom:8px;">Clones Actifs (${game.clones.length})</div>`;
    if (game.clones.length === 0) {
      html += `<div style="font-size:11px;color:#8888a0;">Aucun clone actif</div>`;
    } else {
      for (const clone of game.clones) {
        const canTP = game.canTeleport(clone.id);
        html += `<div class="clone-item">`;
        html += `<div><div class="clone-info">${clone.name}</div><div class="clone-pos">Position: (${clone.q}, ${clone.r})</div></div>`;
        html += `<div class="clone-actions">`;
        if (teleportMode || canTP.ok) {
          html += `<button class="btn btn-sm ${canTP.ok ? 'btn-primary' : ''}" ${canTP.ok ? '' : 'disabled'} data-teleport="${clone.id}">TP</button>`;
        }
        html += `</div></div>`;
      }
    }

    body.innerHTML = html;

    // Create clone handlers
    body.querySelectorAll('[data-create-clone]').forEach(btn => {
      btn.addEventListener('click', () => {
        const [q, r] = btn.dataset.createClone.split(',').map(Number);
        const result = game.createClone(q, r);
        if (result.ok) {
          this.notify('Clone cree!', 'success');
          this.updateHUD();
          this.showClonePanel(teleportMode);
          game.save();
        } else {
          this.notify(result.reason, 'danger');
        }
      });
    });

    // Teleport handlers
    body.querySelectorAll('[data-teleport]').forEach(btn => {
      btn.addEventListener('click', () => {
        const cloneId = parseInt(btn.dataset.teleport);
        const result = game.teleport(cloneId);
        if (result.ok) {
          this.notify('Teleportation!', 'success');
          renderer.centerOnTile(result.q, result.r);
          document.getElementById('clone-overlay').classList.add('hidden');
          this.updateHUD();
          game.save();
        } else {
          this.notify(result.reason, 'danger');
        }
      });
    });

    document.getElementById('clone-overlay').classList.remove('hidden');
  }

  /* ---------- END TURN ---------- */
  endTurn() {
    game.endTurn();
    this.updateHUD();
    this.showNotifications();
    game.save();

    // Check game over
    if (game.gameOver) {
      this.showEvent('Colonie Perdue', 'Votre colonie n\'a plus d\'oxygen. La mission est un echec. Tour: ' + game.turn, true);
      return;
    }

    // Update tile panel if selected
    if (game.selectedTile) {
      const tile = game.getTile(game.selectedTile.q, game.selectedTile.r);
      if (tile) this.updateTilePanel(tile);
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

    // Turn info
    document.getElementById('turn-number').textContent = game.turn;
    document.getElementById('cp-current').textContent = game.cp;
    document.getElementById('cp-max').textContent = game.maxCP;

    // End turn button state
    document.getElementById('btn-end-turn').disabled = game.gameOver;

    // Oxygen warning
    const o2Val = document.getElementById('val-oxygen');
    if (o2Val) {
      o2Val.style.color = game.resources.oxygen < 20 ? '#c4625a' : '';
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
      // Slight delay for each
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
