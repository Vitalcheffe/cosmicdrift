/* ============================================
   CosmicDrift - Canvas Hex Map Renderer
   ============================================ */

class Renderer {
  constructor(canvas, minimapCanvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.minimapCanvas = minimapCanvas;
    this.minimapCtx = minimapCanvas.getContext('2d');

    this.hexSize = 28;
    this.hexWidth = Math.sqrt(3) * this.hexSize;
    this.hexHeight = 2 * this.hexSize;

    // Camera
    this.cameraX = 0;
    this.cameraY = 0;
    this.zoom = 1;
    this.targetZoom = 1;
    this.minZoom = 0.3;
    this.maxZoom = 2.5;

    // Interaction
    this.isDragging = false;
    this.dragMoved = false;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.dragCamStartX = 0;
    this.dragCamStartY = 0;

    // Animation
    this.animationFrame = 0;
    this.pulsePhase = 0;

    this.resize();
    this.setupEvents();
  }

  /* ---------- SIZING ---------- */
  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width * window.devicePixelRatio;
    this.canvas.height = rect.height * window.devicePixelRatio;
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';
    this.ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    this.screenW = rect.width;
    this.screenH = rect.height;
  }

  /* ---------- HEX MATH (pointy-top) ---------- */
  hexToPixel(q, r) {
    const size = this.hexSize * this.zoom;
    const x = size * (Math.sqrt(3) * q + Math.sqrt(3) / 2 * r);
    const y = size * (3 / 2 * r);
    return { x: x + this.cameraX, y: y + this.cameraY };
  }

  pixelToHex(px, py) {
    const x = (px - this.cameraX) / this.zoom;
    const y = (py - this.cameraY) / this.zoom;
    const size = this.hexSize;

    const q = (Math.sqrt(3) / 3 * x - 1 / 3 * y) / size;
    const r = (2 / 3 * y) / size;

    return this.hexRound(q, r);
  }

  hexRound(q, r) {
    const s = -q - r;
    let rq = Math.round(q);
    let rr = Math.round(r);
    let rs = Math.round(s);

    const dq = Math.abs(rq - q);
    const dr = Math.abs(rr - r);
    const ds = Math.abs(rs - s);

    if (dq > dr && dq > ds) {
      rq = -rr - rs;
    } else if (dr > ds) {
      rr = -rq - rs;
    }

    return { q: rq, r: rr };
  }

  /* ---------- CAMERA ---------- */
  centerOnTile(q, r) {
    const size = this.hexSize * this.zoom;
    this.cameraX = this.screenW / 2 - size * (Math.sqrt(3) * q + Math.sqrt(3) / 2 * r);
    this.cameraY = this.screenH / 2 - size * (3 / 2 * r);
  }

  clampCamera() {
    const size = this.hexSize * this.zoom;
    const mapPixelW = size * Math.sqrt(3) * game.mapCols;
    const mapPixelH = size * 1.5 * game.mapRows;

    const margin = 200;
    const minX = -mapPixelW - margin;
    const maxX = this.screenW + margin;
    const minY = -mapPixelH - margin;
    const maxY = this.screenH + margin;

    this.cameraX = Math.max(minX, Math.min(maxX, this.cameraX));
    this.cameraY = Math.max(minY, Math.min(maxY, this.cameraY));
  }

  /* ---------- EVENTS ---------- */
  setupEvents() {
    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.dragMoved = false;
      this.dragStartX = e.clientX;
      this.dragStartY = e.clientY;
      this.dragCamStartX = this.cameraX;
      this.dragCamStartY = this.cameraY;
    });

    window.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        const dx = e.clientX - this.dragStartX;
        const dy = e.clientY - this.dragStartY;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
          this.dragMoved = true;
        }
        this.cameraX = this.dragCamStartX + dx;
        this.cameraY = this.dragCamStartY + dy;
        this.clampCamera();
      }
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      const oldZoom = this.zoom;
      this.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.zoom + delta));

      const rect = this.canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      const scale = this.zoom / oldZoom;
      this.cameraX = mx - (mx - this.cameraX) * scale;
      this.cameraY = my - (my - this.cameraY) * scale;
      this.clampCamera();
    }, { passive: false });

    let touchStartX = 0, touchStartY = 0, touchCamX = 0, touchCamY = 0;
    let lastTouchDist = 0;

    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchCamX = this.cameraX;
        touchCamY = this.cameraY;
      } else if (e.touches.length === 2) {
        lastTouchDist = Math.hypot(
          e.touches[1].clientX - e.touches[0].clientX,
          e.touches[1].clientY - e.touches[0].clientY
        );
      }
      e.preventDefault();
    }, { passive: false });

    this.canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1) {
        this.cameraX = touchCamX + (e.touches[0].clientX - touchStartX);
        this.cameraY = touchCamY + (e.touches[0].clientY - touchStartY);
        this.clampCamera();
      } else if (e.touches.length === 2) {
        const dist = Math.hypot(
          e.touches[1].clientX - e.touches[0].clientX,
          e.touches[1].clientY - e.touches[0].clientY
        );
        const scale = dist / lastTouchDist;
        const oldZoom = this.zoom;
        this.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.zoom * scale));
        lastTouchDist = dist;
      }
      e.preventDefault();
    }, { passive: false });

    this.keysDown = {};
    window.addEventListener('keydown', (e) => {
      this.keysDown[e.key] = true;
    });
    window.addEventListener('keyup', (e) => {
      this.keysDown[e.key] = false;
    });
  }

  updateKeyboardPan() {
    const speed = 8;
    if (this.keysDown['w'] || this.keysDown['W'] || this.keysDown['ArrowUp']) this.cameraY += speed;
    if (this.keysDown['s'] || this.keysDown['S'] || this.keysDown['ArrowDown']) this.cameraY -= speed;
    if (this.keysDown['a'] || this.keysDown['A'] || this.keysDown['ArrowLeft']) this.cameraX += speed;
    if (this.keysDown['d'] || this.keysDown['D'] || this.keysDown['ArrowRight']) this.cameraX -= speed;
    this.clampCamera();
  }

  /* ---------- DRAWING ---------- */
  draw() {
    this.updateKeyboardPan();
    this.animationFrame++;
    this.pulsePhase += 0.05;

    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.screenW, this.screenH);

    // Background
    ctx.fillStyle = '#0e0e10';
    ctx.fillRect(0, 0, this.screenW, this.screenH);

    // Draw faction territories (background tint)
    this.drawFactionTerritories();

    // Draw grid
    for (const key in game.map) {
      const tile = game.map[key];
      this.drawHex(tile);
    }

    // Draw grid lines
    for (const key in game.map) {
      const tile = game.map[key];
      if (tile.visible || tile.explored) {
        this.drawHexOutline(tile);
      }
    }

    // Draw shield effects
    this.drawShields();

    // Draw anomalies
    this.drawAnomalies();

    // Draw selection
    if (game.selectedTile) {
      this.drawHexHighlight(game.selectedTile, '#4d8bce', 3);
    }

    // Draw hover
    if (game.hoveredTile && game.hoveredTile !== game.selectedTile) {
      this.drawHexHighlight(game.hoveredTile, '#8888aa', 1.5);
    }

    // Draw unit path preview
    if (game.selectedUnit) {
      this.drawUnitPath(game.selectedUnit);
    }

    // Draw colonies
    for (const col of game.colonies) {
      const tile = game.getTile(col.q, col.r);
      if (tile && tile.visible) {
        this.drawColonyMarker(tile);
      }
    }

    // Draw units with distinct shapes
    for (const unit of game.units) {
      const tile = game.getTile(unit.q, unit.r);
      if (tile && tile.visible) {
        this.drawUnitMarker(tile, unit);
      }
    }

    // Draw selected unit highlight
    if (game.selectedUnit) {
      const tile = game.getTile(game.selectedUnit.q, game.selectedUnit.r);
      if (tile) {
        this.drawUnitSelection(tile, game.selectedUnit);
      }
    }

    // Draw threats
    for (const threat of game.threats) {
      this.drawThreat(threat);
    }

    // Draw minimap
    this.drawMinimap();
  }

  drawHex(tile) {
    const ctx = this.ctx;
    const pos = this.hexToPixel(tile.q, tile.r);
    const size = this.hexSize * this.zoom;

    if (pos.x < -size * 2 || pos.x > this.screenW + size * 2 ||
        pos.y < -size * 2 || pos.y > this.screenH + size * 2) {
      return;
    }

    const biome = BIOMES[tile.biome];
    if (!biome) return;

    let fillColor;
    if (tile.visible) {
      fillColor = biome.color;
    } else if (tile.explored) {
      fillColor = biome.colorDark;
    } else {
      fillColor = '#111114';
    }

    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = Math.PI / 180 * (60 * i - 30);
      const hx = pos.x + size * Math.cos(angle);
      const hy = pos.y + size * Math.sin(angle);
      if (i === 0) ctx.moveTo(hx, hy);
      else ctx.lineTo(hx, hy);
    }
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();

    // Player owner tint
    if (tile.owner === 'player' && tile.visible) {
      ctx.fillStyle = 'rgba(77, 139, 206, 0.12)';
      ctx.fill();
    }

    // Faction owner tint
    if (tile.owner && tile.owner !== 'player' && FACTIONS[tile.owner] && tile.visible) {
      ctx.fillStyle = FACTIONS[tile.owner].color + '18';
      ctx.fill();
    }

    // Bonus resource indicator
    if (tile.bonusResources && tile.visible) {
      ctx.fillStyle = 'rgba(201, 168, 76, 0.15)';
      ctx.fill();
    }

    // Building icon
    if (tile.building && tile.visible) {
      this.drawBuildingIcon(tile);
    }
  }

  drawHexOutline(tile) {
    const ctx = this.ctx;
    const pos = this.hexToPixel(tile.q, tile.r);
    const size = this.hexSize * this.zoom;

    if (pos.x < -size * 2 || pos.x > this.screenW + size * 2 ||
        pos.y < -size * 2 || pos.y > this.screenH + size * 2) {
      return;
    }

    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = Math.PI / 180 * (60 * i - 30);
      const hx = pos.x + size * Math.cos(angle);
      const hy = pos.y + size * Math.sin(angle);
      if (i === 0) ctx.moveTo(hx, hy);
      else ctx.lineTo(hx, hy);
    }
    ctx.closePath();

    ctx.strokeStyle = tile.visible ? '#2a2a3a' : '#1a1a20';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  drawHexHighlight(tile, color, lineWidth) {
    const ctx = this.ctx;
    const pos = this.hexToPixel(tile.q, tile.r);
    const size = this.hexSize * this.zoom;

    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = Math.PI / 180 * (60 * i - 30);
      const hx = pos.x + size * Math.cos(angle);
      const hy = pos.y + size * Math.sin(angle);
      if (i === 0) ctx.moveTo(hx, hy);
      else ctx.lineTo(hx, hy);
    }
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }

  /* ---------- FACTION TERRITORIES ---------- */
  drawFactionTerritories() {
    const ctx = this.ctx;
    for (const fId in game.factionTerritories) {
      const faction = FACTIONS[fId];
      if (!faction) continue;
      const territory = game.factionTerritories[fId];
      for (const pos of territory) {
        const tile = game.getTile(pos.q, pos.r);
        if (!tile || !tile.visible) continue;
        const p = this.hexToPixel(pos.q, pos.r);
        const size = this.hexSize * this.zoom;
        if (p.x < -size * 2 || p.x > this.screenW + size * 2 ||
            p.y < -size * 2 || p.y > this.screenH + size * 2) continue;

        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = Math.PI / 180 * (60 * i - 30);
          const hx = p.x + size * Math.cos(angle);
          const hy = p.y + size * Math.sin(angle);
          if (i === 0) ctx.moveTo(hx, hy);
          else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        ctx.fillStyle = faction.color + '10';
        ctx.fill();
      }
    }
  }

  /* ---------- SHIELD EFFECT ---------- */
  drawShields() {
    const ctx = this.ctx;
    for (const col of game.colonies) {
      const tile = game.getTile(col.q, col.r);
      if (!tile || tile.building !== 'planetary_shield') continue;

      const pos = this.hexToPixel(col.q, col.r);
      const size = this.hexSize * this.zoom;
      const shieldRadius = size * 2.5;
      const alpha = 0.08 + Math.sin(this.pulsePhase) * 0.03;

      ctx.beginPath();
      ctx.arc(pos.x, pos.y, shieldRadius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(77, 139, 206, ' + alpha + ')';
      ctx.fill();
      ctx.strokeStyle = 'rgba(77, 139, 206, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  /* ---------- ANOMALIES ---------- */
  drawAnomalies() {
    const ctx = this.ctx;
    for (const key in game.discoveredAnomalies) {
      const [q, r] = key.split(',').map(Number);
      const tile = game.getTile(q, r);
      if (!tile || !tile.visible) continue;

      const pos = this.hexToPixel(q, r);
      const size = this.hexSize * this.zoom;

      if (pos.x < -size * 2 || pos.x > this.screenW + size * 2 ||
          pos.y < -size * 2 || pos.y > this.screenH + size * 2) continue;

      const pulseAlpha = 0.4 + Math.sin(this.pulsePhase * 2 + q + r) * 0.2;
      const markerSize = size * 0.12;

      ctx.beginPath();
      ctx.arc(pos.x + size * 0.25, pos.y - size * 0.25, markerSize, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(201, 168, 76, ' + pulseAlpha + ')';
      ctx.fill();
    }
  }

  /* ---------- COLONY MARKER ---------- */
  drawColonyMarker(tile) {
    const ctx = this.ctx;
    const pos = this.hexToPixel(tile.q, tile.r);
    const size = this.hexSize * this.zoom;

    const markerSize = size * 0.2;
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y - markerSize - size * 0.2);
    ctx.lineTo(pos.x + markerSize, pos.y - size * 0.2);
    ctx.lineTo(pos.x, pos.y + markerSize - size * 0.2);
    ctx.lineTo(pos.x - markerSize, pos.y - size * 0.2);
    ctx.closePath();
    ctx.fillStyle = '#4d8bce';
    ctx.fill();
  }

  /* ---------- UNIT MARKERS (distinct shapes per mode) ---------- */
  drawUnitMarker(tile, unit) {
    const ctx = this.ctx;
    const pos = this.hexToPixel(tile.q, tile.r);
    const size = this.hexSize * this.zoom;
    const modeData = UNIT_MODES[unit.mode] || UNIT_MODES.idle;
    const color = modeData.color;
    const s = size * 0.18;

    const cx = pos.x + size * 0.15;
    const cy = pos.y + size * 0.1;

    ctx.fillStyle = color;
    ctx.strokeStyle = '#0e0e10';
    ctx.lineWidth = 1;

    switch (modeData.shape) {
      case 'circle': // Idle
        ctx.beginPath();
        ctx.arc(cx, cy, s, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        break;

      case 'square': // Defense
        ctx.fillRect(cx - s, cy - s, s * 2, s * 2);
        ctx.strokeRect(cx - s, cy - s, s * 2, s * 2);
        break;

      case 'triangle': // Exploration
        ctx.beginPath();
        ctx.moveTo(cx, cy - s);
        ctx.lineTo(cx + s, cy + s);
        ctx.lineTo(cx - s, cy + s);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;

      case 'diamond': // Conquest
        ctx.beginPath();
        ctx.moveTo(cx, cy - s * 1.2);
        ctx.lineTo(cx + s, cy);
        ctx.lineTo(cx, cy + s * 1.2);
        ctx.lineTo(cx - s, cy);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;

      case 'hexagon': // Harvest
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = Math.PI / 3 * i;
          const hx = cx + s * Math.cos(angle);
          const hy = cy + s * Math.sin(angle);
          if (i === 0) ctx.moveTo(hx, hy);
          else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
    }

    // HP bar if damaged
    if (unit.hp < unit.maxHp) {
      const barW = size * 0.4;
      const barH = 2;
      const barX = cx - barW / 2;
      const barY = cy + s + 3;
      const hpRatio = unit.hp / unit.maxHp;

      ctx.fillStyle = '#1a1a20';
      ctx.fillRect(barX, barY, barW, barH);
      ctx.fillStyle = hpRatio > 0.5 ? '#3d9e6e' : hpRatio > 0.25 ? '#c4a35a' : '#c4625a';
      ctx.fillRect(barX, barY, barW * hpRatio, barH);
    }
  }

  /* ---------- UNIT SELECTION HIGHLIGHT ---------- */
  drawUnitSelection(tile, unit) {
    const ctx = this.ctx;
    const pos = this.hexToPixel(tile.q, tile.r);
    const size = this.hexSize * this.zoom;
    const modeData = UNIT_MODES[unit.mode] || UNIT_MODES.idle;

    // Pulsing ring around selected unit
    const pulse = 1 + Math.sin(this.pulsePhase * 3) * 0.1;
    const ringRadius = size * 0.35 * pulse;

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, ringRadius, 0, Math.PI * 2);
    ctx.strokeStyle = modeData.color;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  /* ---------- UNIT PATH PREVIEW ---------- */
  drawUnitPath(unit) {
    if (!unit.path || unit.path.length === 0) return;
    const ctx = this.ctx;
    const modeData = UNIT_MODES[unit.mode] || UNIT_MODES.idle;

    // Draw path from unit position to first waypoint, then between waypoints
    let prev = this.hexToPixel(unit.q, unit.r);
    ctx.beginPath();
    ctx.moveTo(prev.x, prev.y);

    for (const wp of unit.path) {
      const p = this.hexToPixel(wp.q, wp.r);
      ctx.lineTo(p.x, p.y);
    }

    ctx.strokeStyle = modeData.color + '80';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw waypoint dots
    for (let i = 0; i < unit.path.length; i++) {
      const p = this.hexToPixel(unit.path[i].q, unit.path[i].r);
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = modeData.color;
      ctx.fill();
    }
  }

  /* ---------- THREATS ---------- */
  drawThreat(threat) {
    const ctx = this.ctx;
    const pos = this.hexToPixel(threat.q, threat.r);
    const size = this.hexSize * this.zoom;

    if (pos.x < -size * 2 || pos.x > this.screenW + size * 2 ||
        pos.y < -size * 2 || pos.y > this.screenH + size * 2) return;

    const tType = THREAT_TYPES[threat.type];
    if (!tType) return;

    const pulse = 1 + Math.sin(this.pulsePhase * 4 + threat.id) * 0.15;
    const threatSize = size * 0.22 * pulse;

    ctx.fillStyle = tType.color;
    ctx.strokeStyle = '#0e0e10';
    ctx.lineWidth = 1;

    if (tType.id === 'pirate') {
      // X shape for pirates
      const s = threatSize * 0.7;
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = tType.color;
      ctx.beginPath();
      ctx.moveTo(pos.x - s, pos.y - s);
      ctx.lineTo(pos.x + s, pos.y + s);
      ctx.moveTo(pos.x + s, pos.y - s);
      ctx.lineTo(pos.x - s, pos.y + s);
      ctx.stroke();
    } else if (tType.id === 'swarm') {
      // Cluster of small dots
      for (let i = 0; i < 5; i++) {
        const angle = (Math.PI * 2 / 5) * i + this.pulsePhase;
        const dx = Math.cos(angle) * threatSize * 0.6;
        const dy = Math.sin(angle) * threatSize * 0.6;
        ctx.beginPath();
        ctx.arc(pos.x + dx, pos.y + dy, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (tType.id === 'storm') {
      // Swirl
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, threatSize, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(68, 136, 170, 0.3)';
      ctx.fill();
      ctx.strokeStyle = tType.color;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Threat HP bar
    if (tType.hp > 0 && threat.hp < threat.maxHp) {
      const barW = size * 0.4;
      const barH = 2;
      const barX = pos.x - barW / 2;
      const barY = pos.y + threatSize + 4;
      const hpRatio = threat.hp / threat.maxHp;

      ctx.fillStyle = '#1a1a20';
      ctx.fillRect(barX, barY, barW, barH);
      ctx.fillStyle = '#c4625a';
      ctx.fillRect(barX, barY, barW * hpRatio, barH);
    }
  }

  /* ---------- BUILDING ICONS ---------- */
  drawBuildingIcon(tile) {
    const ctx = this.ctx;
    const pos = this.hexToPixel(tile.q, tile.r);
    const size = this.hexSize * this.zoom;
    const building = BUILDINGS[tile.building];
    if (!building) return;

    const iconSize = size * 0.3;
    const cx = pos.x;
    const cy = pos.y + size * 0.05;

    ctx.fillStyle = '#e8e8ea';
    ctx.font = Math.floor(iconSize * 1.2) + 'px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const icons = {
      dome_vital: 'D',
      solar_panel: 'S',
      hydro_farm: 'F',
      deep_mine: 'M',
      lab: 'L',
      clone_factory: 'C',
      teleporter: 'T',
      reactor: 'R',
      black_market: '$',
      orbital_cannon: '!',
      jump_portal: 'J',
      planetary_shield: 'O'
    };

    ctx.fillText(icons[tile.building] || '?', cx, cy);
  }

  /* ---------- MINIMAP ---------- */
  drawMinimap() {
    const ctx = this.minimapCtx;
    const mw = 160;
    const mh = 120;
    ctx.clearRect(0, 0, mw, mh);
    ctx.fillStyle = '#0e0e10';
    ctx.fillRect(0, 0, mw, mh);

    if (!game.map) return;

    const tileW = mw / game.mapCols;
    const tileH = mh / game.mapRows;

    for (const key in game.map) {
      const tile = game.map[key];
      const biome = BIOMES[tile.biome];
      if (!biome) continue;

      let color;
      if (tile.visible) {
        color = biome.color;
      } else if (tile.explored) {
        color = biome.colorDark;
      } else {
        color = '#111114';
      }

      if (tile.owner === 'player') {
        color = '#4d8bce';
      } else if (tile.owner && FACTIONS[tile.owner]) {
        color = FACTIONS[tile.owner].color + '80';
      }

      ctx.fillStyle = color;
      ctx.fillRect(tile.q * tileW, tile.r * tileH, tileW + 0.5, tileH + 0.5);
    }

    // Draw threats on minimap
    for (const threat of game.threats) {
      const tType = THREAT_TYPES[threat.type];
      if (tType) {
        ctx.fillStyle = tType.color;
        ctx.fillRect(threat.q * tileW - 1, threat.r * tileH - 1, 3, 3);
      }
    }

    // Viewport rectangle
    const vpLeft = (-this.cameraX / this.zoom) / (this.hexSize * Math.sqrt(3));
    const vpTop = (-this.cameraY / this.zoom) / (this.hexSize * 1.5);
    const vpRight = (this.screenW - this.cameraX) / this.zoom / (this.hexSize * Math.sqrt(3));
    const vpBottom = (this.screenH - this.cameraY) / this.zoom / (this.hexSize * 1.5);

    ctx.strokeStyle = '#e8e8ea';
    ctx.lineWidth = 1;
    ctx.strokeRect(
      Math.max(0, vpLeft * tileW),
      Math.max(0, vpTop * tileH),
      Math.min(mw, (vpRight - vpLeft) * tileW),
      Math.min(mh, (vpBottom - vpTop) * tileH)
    );
  }

  /* ---------- HIT TEST ---------- */
  getHexAtPixel(px, py) {
    const hex = this.pixelToHex(px, py);
    return game.getTile(hex.q, hex.r);
  }

  getUnitAtPixel(px, py) {
    const hex = this.pixelToHex(px, py);
    return game.units.find(u => u.q === hex.q && u.r === hex.r && u.faction === 'player') || null;
  }
}

// Global renderer instance
let renderer = null;
