/* ============================================================
   CosmicDrift - ui.js
   HUD, panels, notifications, input handling, screen management
   ============================================================ */

const UI = (function () {
  'use strict';

  // ----------------------------------------------------------
  // DOM References
  // ----------------------------------------------------------
  let els = {};

  // ----------------------------------------------------------
  // Initialization
  // ----------------------------------------------------------
  function init() {
    // Cache DOM elements
    els = {
      titleScreen: document.getElementById('title-screen'),
      gameScreen: document.getElementById('game-screen'),
      newGameBtn: document.getElementById('new-game-btn'),
      loadGameBtn: document.getElementById('load-game-btn'),
      difficultySelect: document.getElementById('difficulty-select'),
      mapsizeSelect: document.getElementById('mapsize-select'),
      endTurnBtn: document.getElementById('end-turn-btn'),
      turnNum: document.getElementById('turn-num'),
      panelTitle: document.getElementById('panel-title'),
      panelBody: document.getElementById('panel-body'),
      panelClose: document.getElementById('panel-close'),
      notifContainer: document.getElementById('notification-container'),
      tutorialBox: document.getElementById('tutorial-box'),
      tutorialText: document.getElementById('tutorial-text'),
      tutorialStep: document.getElementById('tutorial-step'),
      tutorialDismiss: document.getElementById('tutorial-dismiss'),
      contextMenu: document.getElementById('context-menu'),
      techTreeBtn: document.getElementById('tech-tree-btn'),
      diplomacyBtn: document.getElementById('diplomacy-btn'),
      cloningBtn: document.getElementById('cloning-btn'),
      techOverlay: document.getElementById('tech-tree-overlay'),
      diploOverlay: document.getElementById('diplomacy-overlay'),
      cloneOverlay: document.getElementById('cloning-overlay'),
      techCloseBtn: document.getElementById('tech-close-btn'),
      diploCloseBtn: document.getElementById('diplo-close-btn'),
      cloneCloseBtn: document.getElementById('clone-close-btn'),
      techTreeBody: document.getElementById('tech-tree-body'),
      diplomacyBody: document.getElementById('diplomacy-body'),
      cloningBody: document.getElementById('cloning-body'),
      loadModal: document.getElementById('load-modal'),
      loadModalBody: document.getElementById('load-modal-body'),
      loadCancelBtn: document.getElementById('load-cancel-btn'),
      titleCanvas: document.getElementById('title-canvas'),
      // Resource displays
      resMineralsVal: document.getElementById('res-minerals-val'),
      resEnergyVal: document.getElementById('res-energy-val'),
      resBiomassVal: document.getElementById('res-biomass-val'),
      resWaterVal: document.getElementById('res-water-val'),
      resCreditsVal: document.getElementById('res-credits-val'),
      resMineralsDelta: document.getElementById('res-minerals-delta'),
      resEnergyDelta: document.getElementById('res-energy-delta'),
      resBiomassDelta: document.getElementById('res-biomass-delta'),
      resWaterDelta: document.getElementById('res-water-delta'),
      resCreditsDelta: document.getElementById('res-credits-delta'),
      resOxygenVal: document.getElementById('res-oxygen-val'),
      o2Fill: document.getElementById('o2-fill'),
    };

    // Bind events
    bindEvents();

    // Listen for game events
    Game.on('selection:changed', updateInfoPanel);
    Game.on('turn:start', onTurnStart);
    Game.on('turn:end', onTurnEnd);
    Game.on('resources:updated', updateResourceBar);
    Game.on('oxygen:updated', updateOxygenBar);
    Game.on('notification', showNotification);
    Game.on('game:start', onGameStart);
    Game.on('game:victory', onVictory);
    Game.on('game:defeat', onDefeat);
    Game.on('tech:researched', () => { if (els.techOverlay.classList.contains('active')) renderTechTree(); });
  }

  function bindEvents() {
    // Title screen
    els.newGameBtn.addEventListener('click', () => {
      Audio.playClick();
      const diff = els.difficultySelect.value;
      const mapSize = els.mapsizeSelect.value;
      startNewGame(diff, mapSize);
    });

    els.loadGameBtn.addEventListener('click', () => {
      Audio.playClick();
      showLoadModal();
    });

    // Game screen
    els.endTurnBtn.addEventListener('click', () => {
      Audio.playTurnEnd();
      Units.resetMovement();
      Game.endTurn();
    });

    els.panelClose.addEventListener('click', () => {
      Game.STATE.selectedHex = null;
      Game.STATE.selectedUnit = null;
      Renderer.updateMoveRange();
      showOverview();
    });

    els.tutorialDismiss.addEventListener('click', () => {
      advanceTutorial();
    });

    // Overlay buttons
    els.techTreeBtn.addEventListener('click', () => {
      Audio.playClick();
      toggleOverlay(els.techOverlay);
      renderTechTree();
    });
    els.diplomacyBtn.addEventListener('click', () => {
      Audio.playClick();
      toggleOverlay(els.diploOverlay);
      renderDiplomacy();
    });
    els.cloningBtn.addEventListener('click', () => {
      Audio.playClick();
      toggleOverlay(els.cloneOverlay);
      renderCloning();
    });

    els.techCloseBtn.addEventListener('click', () => closeOverlay(els.techOverlay));
    els.diploCloseBtn.addEventListener('click', () => closeOverlay(els.diploOverlay));
    els.cloneCloseBtn.addEventListener('click', () => closeOverlay(els.cloneOverlay));

    // Load modal
    els.loadCancelBtn.addEventListener('click', () => {
      els.loadModal.classList.remove('active');
    });

    // Close context menu on click elsewhere
    document.addEventListener('click', (e) => {
      if (!els.contextMenu.contains(e.target)) {
        hideContextMenu();
      }
    });
  }

  // ----------------------------------------------------------
  // Screen Management
  // ----------------------------------------------------------
  function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById(screenId);
    if (screen) screen.classList.add('active');
  }

  function startNewGame(difficulty, mapSize) {
    Game.newGame(difficulty, mapSize);
    showScreen('game-screen');
  }

  // ----------------------------------------------------------
  // Game Event Handlers
  // ----------------------------------------------------------
  function onGameStart() {
    // Center camera on player start
    const start = StarMap.getPlayerStart();
    const pos = StarMap.hexToPixel(start.q, start.r, StarMap.HEX_SIZE);
    Renderer.camera.x = -pos.x;
    Renderer.camera.y = -pos.y;

    // Show first tutorial step
    showTutorial(0);

    // Initial UI update
    updateResourceBar();
    updateOxygenBar();
    showOverview();
  }

  function onTurnStart(data) {
    els.turnNum.textContent = data.turn;
    Units.resetMovement();
    Renderer.updateMoveRange();
    updateResourceBar();
    updateOxygenBar();
    updateInfoPanel();

    // Check tutorial progression
    checkTutorialProgress();
  }

  function onTurnEnd() {
    // Clear old notifications that expired
  }

  function onVictory(data) {
    Audio.playVictory();
    const typeNames = {
      scientific: 'Scientific Victory',
      diplomatic: 'Diplomatic Victory',
      conquest: 'Conquest Victory',
      survival: 'Survival Victory'
    };
    showNotification({
      type: 'success',
      title: 'Victory!',
      text: `You have achieved ${typeNames[data.type] || data.type}! The colony of Meridia thrives.`
    });
  }

  function onDefeat(data) {
    Audio.playDanger();
    showNotification({
      type: 'danger',
      title: 'Colony Lost',
      text: data.reason + ' The Meridia colony has fallen.'
    });
  }

  // ----------------------------------------------------------
  // Resource Bar
  // ----------------------------------------------------------
  function updateResourceBar() {
    const p = Player.getState();
    if (!p) return;

    els.resMineralsVal.textContent = Math.floor(p.resources.minerals);
    els.resEnergyVal.textContent = Math.floor(p.resources.energy);
    els.resBiomassVal.textContent = Math.floor(p.resources.biomass);
    els.resWaterVal.textContent = Math.floor(p.resources.water);
    els.resCreditsVal.textContent = Math.floor(p.resources.credits);

    // Deltas
    formatDelta(els.resMineralsDelta, p.resourceDeltas.minerals);
    formatDelta(els.resEnergyDelta, p.resourceDeltas.energy);
    formatDelta(els.resBiomassDelta, p.resourceDeltas.biomass);
    formatDelta(els.resWaterDelta, p.resourceDeltas.water);
    formatDelta(els.resCreditsDelta, p.resourceDeltas.credits);
  }

  function formatDelta(el, value) {
    if (!el) return;
    if (value === undefined || value === 0) {
      el.textContent = '';
      el.className = 'res-delta';
    } else if (value > 0) {
      el.textContent = '+' + Math.floor(value);
      el.className = 'res-delta positive';
    } else {
      el.textContent = Math.floor(value);
      el.className = 'res-delta negative';
    }
  }

  // ----------------------------------------------------------
  // Oxygen Bar
  // ----------------------------------------------------------
  function updateOxygenBar() {
    const state = Game.STATE;
    const status = Oxygen.getOxygenStatus();

    els.resOxygenVal.textContent = Math.floor(state.oxygen) + 'h';
    const pct = Math.min(100, (state.oxygen / state.oxygenMax) * 100);
    els.o2Fill.style.width = pct + '%';
    els.o2Fill.className = 'o2-fill ' + status.level;
  }

  // ----------------------------------------------------------
  // Info Panel
  // ----------------------------------------------------------
  function showOverview() {
    els.panelTitle.textContent = 'Colony Overview';
    const p = Player.getState();
    if (!p) return;

    const playerUnits = Units.getPlayerUnits();
    const playerHexes = StarMap.getOwnedHexes('player');
    const buildingCount = playerHexes.filter(h => h.building).length;

    els.panelBody.innerHTML = `
      <div class="info-section">
        <div class="info-section-title">Colony Status</div>
        <div class="info-row">
          <span class="label">Turn</span>
          <span class="value">${Game.STATE.turn}</span>
        </div>
        <div class="info-row">
          <span class="label">Colonists</span>
          <span class="value">${p.colonists} / ${p.maxColonists}</span>
        </div>
        <div class="info-row">
          <span class="label">Territory</span>
          <span class="value">${playerHexes.length} tiles</span>
        </div>
        <div class="info-row">
          <span class="label">Buildings</span>
          <span class="value">${buildingCount}</span>
        </div>
        <div class="info-row">
          <span class="label">Units</span>
          <span class="value">${playerUnits.length}</span>
        </div>
      </div>
      <div class="info-section">
        <div class="info-section-title">Oxygen</div>
        <div class="info-row">
          <span class="label">Supply</span>
          <span class="value">${Math.floor(Game.STATE.oxygen)}h</span>
        </div>
        <div class="info-row">
          <span class="label">Produced</span>
          <span class="value positive">+${Game.STATE.oxygenProduced}</span>
        </div>
        <div class="info-row">
          <span class="label">Consumed</span>
          <span class="value negative">-${Game.STATE.oxygenConsumed}</span>
        </div>
        <div class="info-row">
          <span class="label">Net</span>
          <span class="value ${Game.STATE.oxygenProduced - Game.STATE.oxygenConsumed >= 0 ? 'positive' : 'negative'}">
            ${Game.STATE.oxygenProduced - Game.STATE.oxygenConsumed >= 0 ? '+' : ''}${Game.STATE.oxygenProduced - Game.STATE.oxygenConsumed}
          </span>
        </div>
      </div>
      <div class="info-section">
        <div class="info-section-title">Research</div>
        ${renderResearchStatus()}
      </div>
      ${Game.STATE.hazardWarning ? `
        <div class="info-section" style="border-left: 3px solid var(--warning); padding-left: 10px;">
          <div class="info-section-title" style="color: var(--warning);">Hazard Incoming</div>
          <div style="font-size: 13px; color: var(--text-secondary);">
            ${Game.STATE.pendingHazard ? Game.STATE.pendingHazard.warningText : 'Unknown threat detected!'}
          </div>
        </div>
      ` : ''}
    `;
  }

  function renderResearchStatus() {
    const currentTech = Game.STATE.currentResearch;
    if (!currentTech) {
      const available = TechTree.getAvailableTechs();
      if (available.length > 0) {
        return `<div style="font-size: 12px; color: var(--text-muted);">
          No active research. ${available.length} tech(s) available.
        </div>`;
      }
      return `<div style="font-size: 12px; color: var(--text-muted);">
        No research in progress.
      </div>`;
    }

    const tech = TechTree.getTech(currentTech);
    if (!tech) return '';
    const progress = Math.min(100, Math.floor((Game.STATE.researchProgress / tech.cost) * 100));

    return `
      <div class="info-row">
        <span class="label">${tech.name}</span>
        <span class="value">${progress}%</span>
      </div>
      <div class="health-bar">
        <div class="health-bar-fill high" style="width: ${progress}%"></div>
      </div>
      <div class="info-row">
        <span class="label">Science/turn</span>
        <span class="value">${Player.getScienceOutput()}</span>
      </div>
    `;
  }

  function updateInfoPanel() {
    const selectedHex = Game.STATE.selectedHex;
    const selectedUnit = Game.STATE.selectedUnit;

    if (selectedUnit) {
      showUnitInfo(selectedUnit);
    } else if (selectedHex) {
      const hex = StarMap.getHex(selectedHex.q, selectedHex.r);
      if (hex) {
        showHexInfo(hex);
      }
    } else {
      showOverview();
    }
  }

  function showHexInfo(hex) {
    const biome = StarMap.BIOMES[hex.biome];
    const ownerLabel = hex.owner === 'player' ? 'Your Colony' :
                       hex.owner === 'sylphari' ? 'Sylphari' :
                       hex.owner === 'krath' ? 'Krath' :
                       hex.owner === 'aethori' ? 'Aethori' : 'Unclaimed';

    let html = `
      <div class="info-section">
        <div class="info-section-title">Tile Info</div>
        <div class="info-row">
          <span class="label">Coordinates</span>
          <span class="value">(${hex.q}, ${hex.r})</span>
        </div>
        <div class="info-row">
          <span class="label">Biome</span>
          <span class="value">${biome.name}</span>
        </div>
        <div class="info-row">
          <span class="label">Move Cost</span>
          <span class="value">${biome.moveCost}</span>
        </div>
        <div class="info-row">
          <span class="label">Owner</span>
          <span class="value">${ownerLabel}</span>
        </div>
        ${hex.resource ? `
          <div class="info-row">
            <span class="label">Resource</span>
            <span class="value">${hex.resource.charAt(0).toUpperCase() + hex.resource.slice(1)}</span>
          </div>
        ` : ''}
        ${hex.road ? `
          <div class="info-row">
            <span class="label">Road</span>
            <span class="value">Yes</span>
          </div>
        ` : ''}
      </div>
    `;

    // Building info
    if (hex.building) {
      html += `
        <div class="info-section">
          <div class="info-section-title">Building</div>
          <div class="unit-card">
            <div class="unit-name">${hex.building.name}</div>
            <div class="unit-type">${hex.building.type.replace(/_/g, ' ')}</div>
            <div class="health-bar">
              <div class="health-bar-fill ${hex.building.hp > hex.building.hp * 0.5 ? 'high' : hex.building.hp > hex.building.hp * 0.25 ? 'mid' : 'low'}" 
                   style="width: ${hex.building.hp / (hex.building.hp || 50) * 100}%"></div>
            </div>
          </div>
        </div>
      `;
    }

    // Unit on hex
    if (hex.unit) {
      html += renderUnitCard(hex.unit);
    }

    // Build menu if player owns this hex and no building
    if (hex.owner === 'player' && !hex.building && hex.visibility === 2) {
      html += renderBuildMenu(hex.q, hex.r);
    }

    // Recruit menu if player owns this hex, has building, and no unit
    if (hex.owner === 'player' && !hex.unit && hex.visibility === 2) {
      html += renderRecruitMenu(hex.q, hex.r);
    }

    els.panelTitle.textContent = biome.name;
    els.panelBody.innerHTML = html;

    // Bind build buttons
    bindBuildButtons(hex.q, hex.r);
    bindRecruitButtons(hex.q, hex.r);
  }

  function showUnitInfo(unit) {
    const hpPct = unit.hp / unit.maxHp;
    const hpClass = hpPct > 0.6 ? 'high' : hpPct > 0.3 ? 'mid' : 'low';

    let html = renderUnitCard(unit);

    // Action buttons for player units
    if (unit.owner === 'player') {
      html += `
        <div class="info-section">
          <div class="info-section-title">Actions</div>
          <button class="btn btn-sm btn-block" onclick="UI.fortifyUnit(${unit.id})">
            ${unit.fortified ? 'Unfortify' : 'Fortify'}
          </button>
          <button class="btn btn-sm btn-block" onclick="UI.selectUnit(${unit.id})">
            Select Unit
          </button>
        </div>
      `;
    }

    els.panelTitle.textContent = unit.name;
    els.panelBody.innerHTML = html;
  }

  function renderUnitCard(unit) {
    const hpPct = unit.hp / unit.maxHp;
    const hpClass = hpPct > 0.6 ? 'high' : hpPct > 0.3 ? 'mid' : 'low';
    const ownerLabel = unit.owner === 'player' ? 'Your Forces' :
                       unit.owner.charAt(0).toUpperCase() + unit.owner.slice(1);

    return `
      <div class="info-section">
        <div class="info-section-title">Unit</div>
        <div class="unit-card">
          <div class="unit-name">${unit.name}</div>
          <div class="unit-type">${ownerLabel} - ${unit.type.replace(/_/g, ' ')}</div>
          <div class="info-row" style="margin-top: 6px;">
            <span class="label">Combat</span>
            <span class="value">${unit.combat}</span>
          </div>
          <div class="info-row">
            <span class="label">Move Points</span>
            <span class="value">${unit.movePoints} / ${unit.maxMovePoints}</span>
          </div>
          <div class="info-row">
            <span class="label">HP</span>
            <span class="value">${unit.hp} / ${unit.maxHp}</span>
          </div>
          <div class="health-bar">
            <div class="health-bar-fill ${hpClass}" style="width: ${hpPct * 100}%"></div>
          </div>
          ${unit.fortified ? '<div style="font-size: 11px; color: var(--warning); margin-top: 4px;">Fortified</div>' : ''}
          ${unit.hasMoved ? '<div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">Already moved this turn</div>' : ''}
        </div>
      </div>
    `;
  }

  function renderBuildMenu(q, r) {
    const buildings = Player.getAvailableBuildings(q, r);
    const buildable = buildings.filter(b => b.canBuild);

    if (buildable.length === 0) return '';

    let html = `
      <div class="info-section">
        <div class="info-section-title">Build</div>
    `;

    buildings.forEach(b => {
      const costStr = Object.entries(b.cost)
        .map(([k, v]) => `${v} ${k.slice(0, 3)}`)
        .join(', ');

      html += `
        <div class="build-item ${b.canBuild ? '' : 'disabled'}" data-build-type="${b.type}" data-q="${q}" data-r="${r}">
          <div>
            <div class="build-name">${b.name}</div>
            <div style="font-size: 10px; color: var(--text-muted);">${b.description}</div>
          </div>
          <div class="build-cost">${costStr}</div>
        </div>
      `;
    });

    html += '</div>';
    return html;
  }

  function renderRecruitMenu(q, r) {
    const unitTypes = ['scout', 'marine', 'heavy_soldier', 'assault_mech', 'artillery', 'commander'];
    let html = `
      <div class="info-section">
        <div class="info-section-title">Recruit Unit</div>
    `;

    unitTypes.forEach(type => {
      const check = Units.canRecruit(type);
      const def = Units.UNIT_TYPES[type];
      if (!def) return;

      const costStr = Object.entries(def.cost)
        .map(([k, v]) => `${v} ${k.slice(0, 3)}`)
        .join(', ');

      html += `
        <div class="build-item ${check.ok ? '' : 'disabled'}" data-recruit-type="${type}" data-q="${q}" data-r="${r}">
          <div>
            <div class="build-name">${def.name}</div>
            <div style="font-size: 10px; color: var(--text-muted);">${def.description}</div>
          </div>
          <div class="build-cost">${costStr}</div>
        </div>
      `;
    });

    html += '</div>';
    return html;
  }

  function bindBuildButtons(q, r) {
    document.querySelectorAll('.build-item[data-build-type]').forEach(el => {
      el.addEventListener('click', () => {
        const type = el.dataset.buildType;
        const bq = parseInt(el.dataset.q);
        const br = parseInt(el.dataset.r);
        const result = Player.placeBuilding(type, bq, br);
        if (result.ok) {
          Audio.playBuild();
          StarMap.updateVisibility();
          updateInfoPanel();
          updateResourceBar();
          updateOxygenBar();
        }
      });
    });
  }

  function bindRecruitButtons(q, r) {
    document.querySelectorAll('.build-item[data-recruit-type]').forEach(el => {
      el.addEventListener('click', () => {
        const type = el.dataset.recruitType;
        const rq = parseInt(el.dataset.q);
        const rr = parseInt(el.dataset.r);
        const result = Units.recruitUnit(type, rq, rr);
        if (result.ok) {
          Audio.playNotification();
          updateInfoPanel();
          updateResourceBar();
        }
      });
    });
  }

  // ----------------------------------------------------------
  // Unit Actions (called from onclick in panel)
  // ----------------------------------------------------------
  function fortifyUnit(unitId) {
    const unit = Game.STATE.units.find(u => u.id === unitId);
    if (!unit) return;
    unit.fortified = !unit.fortified;
    if (unit.fortified) {
      unit.hasMoved = true;
      unit.hasAttacked = true;
    }
    updateInfoPanel();
    Audio.playClick();
  }

  function selectUnit(unitId) {
    const unit = Game.STATE.units.find(u => u.id === unitId);
    if (!unit) return;
    Game.STATE.selectedUnit = unit;
    Game.STATE.selectedHex = { q: unit.q, r: unit.r };
    Renderer.updateMoveRange();
    updateInfoPanel();
    Audio.playClick();
  }

  // ----------------------------------------------------------
  // Context Menu
  // ----------------------------------------------------------
  function showContextMenu(screenX, screenY, hex) {
    let items = [];

    if (hex.owner === 'player' && !hex.building) {
      items.push({ label: 'Build...', action: () => { showHexInfo(hex); } });
    }

    if (hex.unit && hex.unit.owner === 'player') {
      items.push({ label: 'Select Unit', action: () => { selectUnit(hex.unit.id); } });
    }

    if (hex.owner !== 'player' && hex.visibility === 2) {
      items.push({ label: 'Intel', action: () => { showHexInfo(hex); } });
    }

    if (items.length === 0) return;

    let html = '';
    items.forEach((item, i) => {
      html += `<div class="ctx-item" data-ctx-idx="${i}">${item.label}</div>`;
    });

    els.contextMenu.innerHTML = html;
    els.contextMenu.style.left = screenX + 'px';
    els.contextMenu.style.top = screenY + 'px';
    els.contextMenu.classList.add('active');

    // Bind click actions
    els.contextMenu.querySelectorAll('.ctx-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.dataset.ctxIdx);
        items[idx].action();
        hideContextMenu();
      });
    });
  }

  function hideContextMenu() {
    els.contextMenu.classList.remove('active');
  }

  // ----------------------------------------------------------
  // Notifications
  // ----------------------------------------------------------
  function showNotification(data) {
    if (!data) return;

    const notif = document.createElement('div');
    notif.className = `notification ${data.type || 'info'}`;
    notif.innerHTML = `
      <div class="notif-title">${data.title || 'Notice'}</div>
      <div class="notif-text">${data.text || ''}</div>
    `;

    els.notifContainer.appendChild(notif);

    // Play sound based on type
    if (data.type === 'danger') Audio.playDanger();
    else if (data.type === 'warning') Audio.playWarning();
    else if (data.type === 'success') Audio.playNotification();

    // Auto-remove after 5 seconds
    setTimeout(() => {
      notif.style.opacity = '0';
      setTimeout(() => notif.remove(), 300);
    }, 5000);

    // Click to dismiss
    notif.addEventListener('click', () => notif.remove());

    // Max 5 notifications
    while (els.notifContainer.children.length > 5) {
      els.notifContainer.firstChild.remove();
    }
  }

  // ----------------------------------------------------------
  // Overlays
  // ----------------------------------------------------------
  function toggleOverlay(overlay) {
    overlay.classList.toggle('active');
  }

  function closeOverlay(overlay) {
    overlay.classList.remove('active');
  }

  // ----------------------------------------------------------
  // Tech Tree Rendering
  // ----------------------------------------------------------
  function renderTechTree() {
    const techs = TechTree.getTechs();
    if (!techs) return;

    const eras = [
      { num: 1, name: 'Era I: Survival' },
      { num: 2, name: 'Era II: Expansion' },
      { num: 3, name: 'Era III: Dominance' },
      { num: 4, name: 'Era IV: Transcendence' }
    ];

    let html = '';
    eras.forEach(era => {
      const eraTechs = techs.filter(t => t.era === era.num);
      if (eraTechs.length === 0) return;

      html += `<div class="era-group">
        <div class="era-title">${era.name}</div>
        <div class="tech-grid">`;

      eraTechs.forEach(tech => {
        let cls = 'tech-node';
        let statusText = '';
        let statusClass = '';

        if (tech.researched) {
          cls += ' researched';
          statusText = 'Researched';
          statusClass = 'researched';
        } else if (Game.STATE.currentResearch === tech.id) {
          cls += ' active-research';
          const progress = Math.floor((Game.STATE.researchProgress / tech.cost) * 100);
          statusText = `Researching ${progress}%`;
          statusClass = 'researching';
        } else if (TechTree.isAvailable(tech.id)) {
          cls += ' available';
          statusText = 'Available';
          statusClass = '';
        } else {
          cls += ' locked';
          statusText = 'Locked';
          statusClass = 'locked';
        }

        html += `
          <div class="${cls}" data-tech-id="${tech.id}">
            <div class="tech-name">${tech.name}</div>
            <div class="tech-cost">${tech.cost} science</div>
            <div style="font-size: 10px; color: var(--text-dim); margin-top: 2px;">${tech.description}</div>
            <div class="tech-status ${statusClass}">${statusText}</div>
          </div>
        `;
      });

      html += '</div></div>';
    });

    els.techTreeBody.innerHTML = html;

    // Bind tech clicks to start research
    els.techTreeBody.querySelectorAll('.tech-node.available, .tech-node.active-research').forEach(el => {
      el.addEventListener('click', () => {
        const techId = el.dataset.techId;
        if (techId && TechTree.canResearch(techId)) {
          TechTree.startResearch(techId);
          Audio.playClick();
          renderTechTree();
        }
      });
    });
  }

  // ----------------------------------------------------------
  // Diplomacy Rendering
  // ----------------------------------------------------------
  function renderDiplomacy() {
    const factions = Game.STATE.factions;
    if (!factions || factions.length === 0) return;

    let html = '';
    factions.forEach(faction => {
      const def = AI.FACTION_DEFS[faction.id];
      const relationPct = (faction.relation + 100) / 200 * 100; // -100..100 => 0..100
      const relLabel = AI.getRelationLabel(faction.relation);
      const relClass = AI.getRelationClass(faction.relation);

      html += `
        <div class="faction-card">
          <div class="faction-header">
            <div>
              <div class="faction-name" style="color: ${faction.color}">${faction.name}</div>
              <div class="faction-trait">${faction.trait}</div>
            </div>
          </div>
          <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 8px;">${def.description}</div>
          <div class="info-row">
            <span class="label">Territory</span>
            <span class="value">${faction.territories} tiles</span>
          </div>
          <div class="info-row">
            <span class="label">Military</span>
            <span class="value">${faction.militaryPower}</span>
          </div>
          <div class="info-row">
            <span class="label">Relation</span>
            <span class="value">${faction.relation > 0 ? '+' : ''}${faction.relation}</span>
          </div>
          <div class="relation-bar">
            <div class="relation-fill ${relClass}" style="width: ${relationPct}%"></div>
          </div>
          <div class="relation-label">${relLabel}</div>
          ${faction.capitalCaptured ? '<div style="color: var(--success); font-size: 11px; margin-top: 4px;">Capital Captured</div>' : ''}
          <div class="faction-actions">
            <button class="btn btn-sm" onclick="UI.diplomacyAction('gift', '${faction.id}')">Send Gift (15c)</button>
            <button class="btn btn-sm" onclick="UI.diplomacyAction('alliance', '${faction.id}')">Alliance</button>
            <button class="btn btn-sm" onclick="UI.diplomacyAction('pact', '${faction.id}')">Territory Pact</button>
          </div>
        </div>
      `;
    });

    els.diplomacyBody.innerHTML = html;
  }

  function diplomacyAction(action, factionId) {
    Audio.playClick();
    if (action === 'gift') AI.sendGift(factionId);
    else if (action === 'alliance') AI.proposeAlliance(factionId);
    else if (action === 'pact') AI.proposeTerritorialPact(factionId);
    else if (action === 'trade') AI.acceptTrade(factionId);
    renderDiplomacy();
  }

  // ----------------------------------------------------------
  // Cloning Panel Rendering
  // ----------------------------------------------------------
  function renderCloning() {
    const cloneInfo = Cloning.getCloneInfo();
    const allyInfo = Cloning.getAllyInfo();

    let html = `
      <div class="info-section">
        <div class="info-section-title">Clone Bay</div>
        <div class="info-row">
          <span class="label">Active Clones</span>
          <span class="value">${cloneInfo.activeClones} / ${cloneInfo.maxClones}</span>
        </div>
        <div class="info-row">
          <span class="label">Cooldown</span>
          <span class="value">${cloneInfo.cooldown > 0 ? cloneInfo.cooldown + ' turns' : 'Ready'}</span>
        </div>
      </div>
      <div class="info-section">
        <div class="info-section-title">Clone Types</div>
    `;

    cloneInfo.types.forEach(type => {
      const costStr = Object.entries(type.cost).map(([k, v]) => `${v} ${k.slice(0, 3)}`).join(', ');
      html += `
        <div class="build-item ${type.canCreate ? '' : 'disabled'}" data-clone-type="${type.id}">
          <div>
            <div class="build-name">${type.name}</div>
            <div style="font-size: 10px; color: var(--text-muted);">${type.description}</div>
          </div>
          <div class="build-cost">${costStr}</div>
        </div>
      `;
    });

    html += '</div>';

    // Active clones with teleport option
    if (Game.STATE.clones.length > 0) {
      html += '<div class="info-section"><div class="info-section-title">Active Clones</div>';
      Game.STATE.clones.forEach(clone => {
        const hpPct = clone.hp / clone.maxHp;
        html += `
          <div class="unit-card">
            <div class="unit-name">${clone.name}</div>
            <div class="unit-type">Clone at (${clone.q}, ${clone.r})</div>
            <div class="health-bar">
              <div class="health-bar-fill ${hpPct > 0.5 ? 'high' : 'mid'}" style="width: ${hpPct * 100}%"></div>
            </div>
            <button class="btn btn-sm btn-danger" style="margin-top: 6px;"
                    onclick="UI.teleportClone('${clone.id}')">Teleport Tether</button>
          </div>
        `;
      });
      html += '</div>';
    }

    // Allies
    html += '<div class="info-section"><div class="info-section-title">Allies</div>';
    allyInfo.forEach(ally => {
      html += `
        <div class="build-item ${ally.recruited ? '' : ally.canRecruit ? '' : 'disabled'}" data-ally-id="${ally.id}">
          <div>
            <div class="build-name">${ally.name}</div>
            <div style="font-size: 10px; color: var(--text-muted);">${ally.bonus}</div>
          </div>
          <div style="font-size: 11px; color: ${ally.recruited ? 'var(--success)' : 'var(--text-muted)'}">
            ${ally.recruited ? 'Recruited' : `${ally.recruitCost.credits} credits`}
          </div>
        </div>
      `;
    });
    html += '</div>';

    els.cloningBody.innerHTML = html;

    // Bind clone creation buttons
    els.cloningBody.querySelectorAll('.build-item[data-clone-type]').forEach(el => {
      el.addEventListener('click', () => {
        const type = el.dataset.cloneType;
        // Need to find a player-owned hex without a unit to place the clone
        const playerHex = StarMap.getOwnedHexes('player').find(h => !h.unit);
        if (playerHex) {
          const result = Cloning.createClone(type, playerHex.q, playerHex.r);
          if (result.ok) {
            Audio.playBuild();
            renderCloning();
          }
        } else {
          showNotification({ type: 'warning', title: 'No Space', text: 'No empty owned tile available for clone deployment.' });
        }
      });
    });

    // Bind ally recruitment buttons
    els.cloningBody.querySelectorAll('.build-item[data-ally-id]').forEach(el => {
      el.addEventListener('click', () => {
        const allyId = el.dataset.allyId;
        const result = Cloning.recruitAlly(allyId);
        if (result.ok) {
          Audio.playNotification();
          renderCloning();
        }
      });
    });
  }

  function teleportClone(cloneId) {
    Audio.playClick();
    Cloning.teleportTether(cloneId);
    renderCloning();
  }

  // ----------------------------------------------------------
  // Load Modal
  // ----------------------------------------------------------
  function showLoadModal() {
    const saves = Save ? Save.getSaves() : [];
    let html = '';

    for (let i = 1; i <= 3; i++) {
      const save = saves[i - 1];
      if (save) {
        html += `
          <div class="save-slot" data-slot="${i}">
            <div class="slot-name">Slot ${i}</div>
            <div class="slot-info">Turn ${save.turn} - ${save.difficulty} - ${save.timestamp}</div>
            <div class="slot-actions">
              <button class="btn btn-sm btn-primary" onclick="UI.loadGame(${i})">Load</button>
              <button class="btn btn-sm btn-danger" onclick="UI.deleteSave(${i})">Delete</button>
            </div>
          </div>
        `;
      } else {
        html += `
          <div class="save-slot empty" data-slot="${i}">
            <div class="slot-name">Slot ${i}</div>
            <div class="slot-info">Empty</div>
          </div>
        `;
      }
    }

    // Auto-save
    const autoSave = saves[3];
    if (autoSave) {
      html += `
        <div class="save-slot" data-slot="0">
          <div class="slot-name">Auto-Save</div>
          <div class="slot-info">Turn ${autoSave.turn} - ${autoSave.difficulty} - ${autoSave.timestamp}</div>
          <div class="slot-actions">
            <button class="btn btn-sm btn-primary" onclick="UI.loadGame(0)">Load</button>
          </div>
        </div>
      `;
    }

    els.loadModalBody.innerHTML = html;
    els.loadModal.classList.add('active');
  }

  function loadGame(slot) {
    if (!Save) return;
    const success = Save.load(slot);
    if (success) {
      showScreen('game-screen');
      els.loadModal.classList.remove('active');
      showNotification({ type: 'success', title: 'Game Loaded', text: `Save slot ${slot} loaded.` });
    }
  }

  function deleteSave(slot) {
    if (!Save) return;
    Save.deleteSave(slot);
    showLoadModal();
  }

  // ----------------------------------------------------------
  // Tutorial System
  // ----------------------------------------------------------
  const TUTORIAL_STEPS = [
    {
      text: 'Welcome to Meridia. Your ship has crashed and your colonists need oxygen to survive. Build an Oxygen Extractor on your starting tile to begin producing oxygen.',
      step: '1 / 3'
    },
    {
      text: 'Your colonists need shelter. Build a Residential District to house them. This will also increase your colonist capacity and generate credits.',
      step: '2 / 3'
    },
    {
      text: 'Send your Scout to explore the surrounding area. Click the Scout, then click on a highlighted tile to move. Discover resources and encounter alien factions.',
      step: '3 / 3'
    }
  ];

  function showTutorial(stepIndex) {
    if (stepIndex >= TUTORIAL_STEPS.length) {
      els.tutorialBox.style.display = 'none';
      Game.STATE.tutorialActive = false;
      return;
    }

    const step = TUTORIAL_STEPS[stepIndex];
    els.tutorialText.textContent = step.text;
    els.tutorialStep.textContent = step.step;
    els.tutorialBox.style.display = 'block';
    Game.STATE.tutorialStep = stepIndex;
    Game.STATE.tutorialActive = true;
  }

  function advanceTutorial() {
    Audio.playClick();
    showTutorial(Game.STATE.tutorialStep + 1);
  }

  function checkTutorialProgress() {
    if (!Game.STATE.tutorialActive) return;

    const step = Game.STATE.tutorialStep;

    // Auto-advance tutorial based on player actions
    if (step === 0) {
      // Check if oxygen extractor has been built
      const hasO2 = Array.from(StarMap.getMapData().hexes.values())
        .some(h => h.owner === 'player' && h.building && h.building.type === 'oxygen_extractor');
      if (hasO2) showTutorial(1);
    } else if (step === 1) {
      // Check if residential has been built
      const hasRes = Array.from(StarMap.getMapData().hexes.values())
        .some(h => h.owner === 'player' && h.building && h.building.type === 'residential');
      if (hasRes) showTutorial(2);
    }
  }

  // ----------------------------------------------------------
  // Title Screen Animation
  // ----------------------------------------------------------
  function initTitleAnimation() {
    const canvas = els.titleCanvas;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.3 + 0.1,
        brightness: Math.random()
      });
    }

    function drawTitle() {
      if (Game.STATE.phase !== 'title') return;

      ctx.fillStyle = '#0f1012';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle radial gradient
      const grd = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.5
      );
      grd.addColorStop(0, 'rgba(30,35,50,0.3)');
      grd.addColorStop(1, 'rgba(15,16,18,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach(star => {
        star.brightness += (Math.random() - 0.5) * 0.05;
        star.brightness = Math.max(0.2, Math.min(1, star.brightness));
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }

        const alpha = star.brightness * 0.6;
        ctx.fillStyle = `rgba(200,200,220,${alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(drawTitle);
    }

    drawTitle();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  // ----------------------------------------------------------
  // Public API
  // ----------------------------------------------------------
  return {
    init,
    showOverview,
    updateInfoPanel,
    updateResourceBar,
    updateOxygenBar,
    showNotification,
    showContextMenu,
    hideContextMenu,
    fortifyUnit,
    selectUnit,
    diplomacyAction,
    teleportClone,
    loadGame,
    deleteSave,
    initTitleAnimation,
    showScreen,
  };
})();
