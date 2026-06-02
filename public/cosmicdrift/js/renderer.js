/* ============================================
   CosmicDrift - Canvas Hex Map Renderer
   ============================================ */

class Renderer {
  constructor(canvas, minimapCanvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.minimapCanvas = minimapCanvas;
    this.minimapCtx = minimapCanvas.getContext('2d');

    this.hexSize = 28; // Base hex radius
    this.hexWidth = Math.sqrt(3) * this.hexSize;
    this.hexHeight = 2 * this.hexSize;

    // Camera
    this.cameraX = 0; // pixel offset
    this.cameraY = 0;
    this.zoom = 1;
    this.targetZoom = 1;
    this.minZoom = 0.3;
    this.maxZoom = 2.5;

    // Interaction
    this.isDragging = false;
    this.dragMoved = false; // Track if a real drag happened
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.dragCamStartX = 0;
    this.dragCamStartY = 0;

    // Animation
    this.animationFrame = 0;

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
    // Soft bounds so map doesn't go too far offscreen
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
    // Mouse drag
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

    // Zoom
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      const oldZoom = this.zoom;
      this.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.zoom + delta));

      // Zoom toward cursor
      const rect = this.canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      const scale = this.zoom / oldZoom;
      this.cameraX = mx - (mx - this.cameraX) * scale;
      this.cameraY = my - (my - this.cameraY) * scale;
      this.clampCamera();
    }, { passive: false });

    // Touch support
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

    // Keyboard pan
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

    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.screenW, this.screenH);

    // Background
    ctx.fillStyle = '#0e0e10';
    ctx.fillRect(0, 0, this.screenW, this.screenH);

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

    // Draw selection
    if (game.selectedTile) {
      this.drawHexHighlight(game.selectedTile, '#4d8bce', 3);
    }

    // Draw hover
    if (game.hoveredTile && game.hoveredTile !== game.selectedTile) {
      this.drawHexHighlight(game.hoveredTile, '#8888aa', 1.5);
    }

    // Draw colonies
    for (const col of game.colonies) {
      const tile = game.getTile(col.q, col.r);
      if (tile && tile.visible) {
        this.drawColonyMarker(tile);
      }
    }

    // Draw clones
    for (const clone of game.clones) {
      const tile = game.getTile(clone.q, clone.r);
      if (tile && tile.visible) {
        this.drawCloneMarker(tile, clone);
      }
    }

    // Draw minimap
    this.drawMinimap();
  }

  drawHex(tile) {
    const ctx = this.ctx;
    const pos = this.hexToPixel(tile.q, tile.r);
    const size = this.hexSize * this.zoom;

    // Frustum culling
    if (pos.x < -size * 2 || pos.x > this.screenW + size * 2 ||
        pos.y < -size * 2 || pos.y > this.screenH + size * 2) {
      return;
    }

    const biome = BIOMES[tile.biome];
    if (!biome) return;

    // Determine color based on visibility
    let fillColor;
    if (tile.visible) {
      fillColor = biome.color;
    } else if (tile.explored) {
      fillColor = biome.colorDark;
    } else {
      fillColor = '#111114';
    }

    // Draw hex shape
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

    // Owner tint
    if (tile.owner === 'player' && tile.visible) {
      ctx.fillStyle = 'rgba(77, 139, 206, 0.12)';
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

  drawColonyMarker(tile) {
    const ctx = this.ctx;
    const pos = this.hexToPixel(tile.q, tile.r);
    const size = this.hexSize * this.zoom;

    // Small diamond marker
    const markerSize = size * 0.25;
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y - markerSize - size * 0.15);
    ctx.lineTo(pos.x + markerSize, pos.y - size * 0.15);
    ctx.lineTo(pos.x, pos.y + markerSize - size * 0.15);
    ctx.lineTo(pos.x - markerSize, pos.y - size * 0.15);
    ctx.closePath();
    ctx.fillStyle = '#4d8bce';
    ctx.fill();
  }

  drawCloneMarker(tile, clone) {
    const ctx = this.ctx;
    const pos = this.hexToPixel(tile.q, tile.r);
    const size = this.hexSize * this.zoom;

    // Small circle
    const r = size * 0.15;
    ctx.beginPath();
    ctx.arc(pos.x + size * 0.2, pos.y - size * 0.1, r, 0, Math.PI * 2);
    ctx.fillStyle = '#3d9e6e';
    ctx.fill();
  }

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
    ctx.font = `${Math.floor(iconSize * 1.2)}px Inter, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Simple text icons for buildings
    const icons = {
      dome_vital: 'D',
      solar_panel: 'S',
      hydro_farm: 'F',
      deep_mine: 'M',
      lab: 'L',
      clone_factory: 'C',
      teleporter: 'T'
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
      }

      ctx.fillStyle = color;
      ctx.fillRect(tile.q * tileW, tile.r * tileH, tileW + 0.5, tileH + 0.5);
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
}

// Global renderer instance (initialized later)
let renderer = null;
