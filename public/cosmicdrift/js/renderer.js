/* ============================================================
   CosmicDrift - renderer.js
   Canvas rendering for the hex map, camera, units, buildings
   ============================================================ */

const Renderer = (function () {
  'use strict';

  // ----------------------------------------------------------
  // State
  // ----------------------------------------------------------
  let canvas = null;
  let ctx = null;
  let minimapCanvas = null;
  let minimapCtx = null;

  const camera = { x: 0, y: 0, zoom: 1.0 };
  const HEX_SIZE = 24;
  const MIN_HEX_SIZE = 12;
  const MAX_HEX_SIZE = 48;

  let isDragging = false;
  let didDrag = false;       // true if mouse actually moved during drag
  let dragStart = { x: 0, y: 0 };
  let cameraStart = { x: 0, y: 0 };

  let animFrame = null;
  let lastRenderTime = 0;

  // Highlight state
  let hoveredHex = null;
  let moveRange = [];     // hexes the selected unit can move to
  let attackTargets = []; // hexes the selected unit can attack

  // ----------------------------------------------------------
  // Initialization
  // ----------------------------------------------------------
  function init() {
    canvas = document.getElementById('map-canvas');
    if (!canvas) return;

    ctx = canvas.getContext('2d');
    resizeCanvas();

    // Minimap
    minimapCanvas = document.getElementById('minimap-canvas');
    if (minimapCanvas) {
      minimapCtx = minimapCanvas.getContext('2d');
      minimapCanvas.width = 160;
      minimapCanvas.height = 120;
    }

    // Set initial camera to player start
    const start = StarMap.getPlayerStart();
    const pos = StarMap.hexToPixel(start.q, start.r, HEX_SIZE);
    camera.x = -pos.x;
    camera.y = -pos.y;
    Game.STATE.camera = camera;

    // Event listeners
    setupInput();

    // Listen for game events
    Game.on('unit:moved', () => { updateMoveRange(); });
    Game.on('unit:created', () => {});
    Game.on('turn:start', () => { updateMoveRange(); });

    // Start render loop
    renderLoop();
  }

  function resizeCanvas() {
    if (!canvas) return;
    const container = document.getElementById('map-container');
    if (!container) return;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
  }

  // ----------------------------------------------------------
  // Input Handling
  // ----------------------------------------------------------
  function setupInput() {
    // Mouse drag for panning
    canvas.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        isDragging = true;
        didDrag = false;
        dragStart = { x: e.clientX, y: e.clientY };
        cameraStart = { x: camera.x, y: camera.y };
        canvas.classList.add('grabbing');
      }
    });

    window.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
          didDrag = true;
        }
        camera.x = cameraStart.x + dx / camera.zoom;
        camera.y = cameraStart.y + dy / camera.zoom;
      }

      // Update hovered hex
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        const worldPos = screenToWorld(mx, my);
        const hex = StarMap.pixelToHex(worldPos.x, worldPos.y, HEX_SIZE);
        const hexData = StarMap.getHex(hex.q, hex.r);
        hoveredHex = hexData ? hex : null;
      }
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
      if (canvas) canvas.classList.remove('grabbing');
    });

    // Click to select hex/unit
    canvas.addEventListener('click', (e) => {
      if (didDrag) return;

      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const worldPos = screenToWorld(mx, my);
      const hex = StarMap.pixelToHex(worldPos.x, worldPos.y, HEX_SIZE);

      handleHexClick(hex.q, hex.r, e.button);
    });

    // Right-click for context menu / movement
    canvas.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const worldPos = screenToWorld(mx, my);
      const hex = StarMap.pixelToHex(worldPos.x, worldPos.y, HEX_SIZE);

      handleHexRightClick(hex.q, hex.r, e.clientX, e.clientY);
    });

    // Zoom with scroll wheel
    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      camera.zoom = Math.max(0.5, Math.min(2.0, camera.zoom + delta));
    }, { passive: false });

    // Keyboard
    const keysDown = {};
    window.addEventListener('keydown', (e) => {
      keysDown[e.key] = true;
      handleKeyDown(e);
    });
    window.addEventListener('keyup', (e) => {
      keysDown[e.key] = false;
    });

    // Camera pan with keyboard (continuous)
    setInterval(() => {
      const panSpeed = 8 / camera.zoom;
      if (keysDown['w'] || keysDown['W'] || keysDown['ArrowUp']) camera.y += panSpeed;
      if (keysDown['s'] || keysDown['S'] || keysDown['ArrowDown']) camera.y -= panSpeed;
      if (keysDown['a'] || keysDown['A'] || keysDown['ArrowLeft']) camera.x += panSpeed;
      if (keysDown['d'] || keysDown['D'] || keysDown['ArrowRight']) camera.x -= panSpeed;
    }, 16);

    // Resize
    window.addEventListener('resize', resizeCanvas);
  }

  function handleKeyDown(e) {
    if (e.key === ' ' || e.code === 'Space') {
      e.preventDefault();
      Game.endTurn();
    }
    if (e.key === 'Escape') {
      Game.STATE.selectedHex = null;
      Game.STATE.selectedUnit = null;
      moveRange = [];
      attackTargets = [];
      if (typeof UI !== 'undefined') UI.showOverview();
    }
  }

  // ----------------------------------------------------------
  // Hex Click Handling
  // ----------------------------------------------------------
  function handleHexClick(q, r) {
    const hex = StarMap.getHex(q, r);
    if (!hex || hex.visibility === 0) return;

    // If we have a selected unit and clicking in move range, move it
    if (Game.STATE.selectedUnit) {
      const unit = Game.STATE.selectedUnit;

      // Check if clicking on attack target
      if (attackTargets.some(t => t.q === q && t.r === r)) {
        const target = Units.getUnitAt(q, r);
        if (target) {
          Units.attackUnit(unit, target);
          updateMoveRange();
          Game.emit('selection:changed');
          return;
        }
      }

      // Check if clicking in move range
      if (moveRange.some(t => t.q === q && t.r === r)) {
        Units.moveUnit(unit, q, r);
        updateMoveRange();
        Game.emit('selection:changed');
        return;
      }
    }

    // Select the hex
    Game.STATE.selectedHex = { q, r };

    // Select unit on the hex if it's the player's
    if (hex.unit && hex.unit.owner === 'player') {
      Game.STATE.selectedUnit = hex.unit;
      updateMoveRange();
    } else {
      Game.STATE.selectedUnit = null;
      moveRange = [];
      attackTargets = [];
    }

    Game.emit('selection:changed');
  }

  function handleHexRightClick(q, r, screenX, screenY) {
    const hex = StarMap.getHex(q, r);
    if (!hex || hex.visibility === 0) return;

    // Show context menu
    if (typeof UI !== 'undefined') {
      UI.showContextMenu(screenX, screenY, hex);
    }
  }

  // ----------------------------------------------------------
  // Move Range Calculation
  // ----------------------------------------------------------
  function updateMoveRange() {
    moveRange = [];
    attackTargets = [];

    const unit = Game.STATE.selectedUnit;
    if (!unit || unit.hasMoved) return;

    // Flood fill from unit position
    const visited = new Map();
    const queue = [{ q: unit.q, r: unit.r, moves: unit.movePoints }];
    visited.set(StarMap.hexKey(unit.q, unit.r), unit.movePoints);

    while (queue.length > 0) {
      const current = queue.shift();
      const neighbors = StarMap.getNeighbors(current.q, current.r);

      for (const nb of neighbors) {
        const nbHex = StarMap.getHex(nb.q, nb.r);
        if (!nbHex || nbHex.visibility === 0) continue;

        const biome = StarMap.BIOMES[nbHex.biome];
        const cost = nbHex.road ? 0.5 : biome.moveCost;
        const remaining = current.moves - cost;

        if (remaining < 0) continue;

        const key = StarMap.hexKey(nb.q, nb.r);
        const prevRemaining = visited.get(key);

        if (prevRemaining !== undefined && prevRemaining >= remaining) continue;

        visited.set(key, remaining);

        // If enemy unit, it's an attack target, not a move target
        if (nbHex.unit && nbHex.unit.owner !== unit.owner) {
          if (!attackTargets.some(t => t.q === nb.q && t.r === nb.r)) {
            attackTargets.push({ q: nb.q, r: nb.r });
          }
          continue; // can't move through enemies
        }

        // If friendly unit, can't move there but can pass through
        if (nbHex.unit && nbHex.unit.owner === unit.owner) {
          continue;
        }

        moveRange.push({ q: nb.q, r: nb.r });
        queue.push({ q: nb.q, r: nb.r, moves: remaining });
      }
    }

    // Remove duplicates from moveRange
    const seen = new Set();
    moveRange = moveRange.filter(m => {
      const key = StarMap.hexKey(m.q, m.r);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  // ----------------------------------------------------------
  // Coordinate Transforms
  // ----------------------------------------------------------
  function worldToScreen(wx, wy) {
    return {
      x: (wx + camera.x) * camera.zoom + canvas.width / 2,
      y: (wy + camera.y) * camera.zoom + canvas.height / 2
    };
  }

  function screenToWorld(sx, sy) {
    return {
      x: (sx - canvas.width / 2) / camera.zoom - camera.x,
      y: (sy - canvas.height / 2) / camera.zoom - camera.y
    };
  }

  // ----------------------------------------------------------
  // Render Loop
  // ----------------------------------------------------------
  function renderLoop(time) {
    animFrame = requestAnimationFrame(renderLoop);

    // Throttle to ~30fps for performance
    if (time - lastRenderTime < 33) return;
    lastRenderTime = time;

    if (!ctx || !canvas) return;
    if (Game.STATE.phase !== 'playing') return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = '#0a0a0c';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawHexGrid();
    drawMoveHighlights();
    drawBuildings();
    drawUnits();
    drawSelection();
    drawMinimap();
  }

  // ----------------------------------------------------------
  // Draw Hex Grid
  // ----------------------------------------------------------
  function drawHexGrid() {
    const mapData = StarMap.getMapData();
    if (!mapData) return;

    for (const [key, hex] of mapData.hexes) {
      // Only render hexes that might be visible on screen
      const pos = StarMap.hexToPixel(hex.q, hex.r, HEX_SIZE);
      const screen = worldToScreen(pos.x, pos.y);
      const screenRadius = HEX_SIZE * camera.zoom;

      // Culling: skip hexes off screen
      if (screen.x < -screenRadius * 2 || screen.x > canvas.width + screenRadius * 2) continue;
      if (screen.y < -screenRadius * 2 || screen.y > canvas.height + screenRadius * 2) continue;

      drawHex(hex, screen.x, screen.y, screenRadius);
    }
  }

  function drawHex(hex, cx, cy, radius) {
    const biome = StarMap.BIOMES[hex.biome];
    let fillColor;

    if (hex.visibility === 0) {
      fillColor = '#0a0a0c';
    } else if (hex.visibility === 1) {
      // Fog of war - dimmed version
      fillColor = dimColor(biome.color, 0.5);
    } else {
      fillColor = biome.color;
    }

    // Draw flat-top hex shape (offset by 30° from pointy-top)
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = Math.PI / 3 * i + Math.PI / 6;
      const hx = cx + radius * Math.cos(angle);
      const hy = cy + radius * Math.sin(angle);
      if (i === 0) ctx.moveTo(hx, hy);
      else ctx.lineTo(hx, hy);
    }
    ctx.closePath();

    ctx.fillStyle = fillColor;
    ctx.fill();

    // Border
    ctx.strokeStyle = hex.visibility === 0 ? '#08080a' :
                      hex.visibility === 1 ? '#1a1a20' : '#2a2a32';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Territory border
    if (hex.owner && hex.visibility === 2) {
      const ownerColor = hex.owner === 'player' ? '#5b8fb9' :
                         hex.owner === 'sylphari' ? '#5b9e7a' :
                         hex.owner === 'krath' ? '#c75c5c' :
                         hex.owner === 'aethori' ? '#c9a84c' : null;
      if (ownerColor) {
        ctx.strokeStyle = ownerColor;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    // Resource deposit icon (small diamond)
    if (hex.resource && hex.visibility === 2) {
      const iconSize = radius * 0.2;
      const iconY = cy - radius * 0.3;
      const resColor = hex.resource === 'minerals' ? '#8a8a8a' :
                       hex.resource === 'energy' ? '#c9a84c' :
                       hex.resource === 'biomass' ? '#5b9e7a' :
                       hex.resource === 'water' ? '#5b8fb9' : '#7a7a82';

      ctx.fillStyle = resColor;
      ctx.beginPath();
      ctx.moveTo(cx, iconY - iconSize);
      ctx.lineTo(cx + iconSize, iconY);
      ctx.lineTo(cx, iconY + iconSize);
      ctx.lineTo(cx - iconSize, iconY);
      ctx.closePath();
      ctx.fill();
    }

    // Road indicator
    if (hex.road && hex.visibility === 2) {
      ctx.strokeStyle = '#4a4a52';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx - radius * 0.3, cy);
      ctx.lineTo(cx + radius * 0.3, cy);
      ctx.stroke();
    }
  }

  // ----------------------------------------------------------
  // Draw Movement Range Highlights
  // ----------------------------------------------------------
  function drawMoveHighlights() {
    // Move range (green tint)
    moveRange.forEach(m => {
      const pos = StarMap.hexToPixel(m.q, m.r, HEX_SIZE);
      const screen = worldToScreen(pos.x, pos.y);
      const radius = HEX_SIZE * camera.zoom * 0.85;

      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = Math.PI / 3 * i + Math.PI / 6;
        const hx = screen.x + radius * Math.cos(angle);
        const hy = screen.y + radius * Math.sin(angle);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.fillStyle = 'rgba(91,158,122,0.15)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(91,158,122,0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Attack targets (red tint)
    attackTargets.forEach(m => {
      const pos = StarMap.hexToPixel(m.q, m.r, HEX_SIZE);
      const screen = worldToScreen(pos.x, pos.y);
      const radius = HEX_SIZE * camera.zoom * 0.85;

      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = Math.PI / 3 * i + Math.PI / 6;
        const hx = screen.x + radius * Math.cos(angle);
        const hy = screen.y + radius * Math.sin(angle);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.fillStyle = 'rgba(199,92,92,0.15)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(199,92,92,0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });
  }

  // ----------------------------------------------------------
  // Draw Buildings
  // ----------------------------------------------------------
  function drawBuildings() {
    const mapData = StarMap.getMapData();
    if (!mapData) return;

    for (const [key, hex] of mapData.hexes) {
      if (!hex.building || hex.visibility === 0) continue;

      const pos = StarMap.hexToPixel(hex.q, hex.r, HEX_SIZE);
      const screen = worldToScreen(pos.x, pos.y);
      const radius = HEX_SIZE * camera.zoom;

      // Culling
      if (screen.x < -radius * 2 || screen.x > canvas.width + radius * 2) continue;
      if (screen.y < -radius * 2 || screen.y > canvas.height + radius * 2) continue;

      drawBuildingIcon(hex.building, screen.x, screen.y, radius);
    }
  }

  function drawBuildingIcon(building, cx, cy, hexRadius) {
    const size = hexRadius * 0.35;
    const by = cy + hexRadius * 0.15; // slightly below center

    // Building color based on owner
    const color = building.owner === 'player' ? '#5b8fb9' :
                  building.owner === 'sylphari' ? '#5b9e7a' :
                  building.owner === 'krath' ? '#c75c5c' :
                  building.owner === 'aethori' ? '#c9a84c' : '#7a7a82';

    // Different shapes for different building types
    const btype = building.type;

    if (btype === 'capital' || btype === 'command_center') {
      // Star shape for important buildings
      drawStar(cx, by, size, 5, color);
    } else if (btype === 'crashed_ship') {
      // Triangle for crashed ship
      ctx.fillStyle = '#8a6a4a';
      ctx.beginPath();
      ctx.moveTo(cx, by - size);
      ctx.lineTo(cx + size * 0.8, by + size * 0.5);
      ctx.lineTo(cx - size * 0.8, by + size * 0.5);
      ctx.closePath();
      ctx.fill();
    } else if (btype === 'oxygen_extractor') {
      // Circle with dot
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(cx, by, size * 0.7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#1a1a1f';
      ctx.beginPath();
      ctx.arc(cx, by, size * 0.3, 0, Math.PI * 2);
      ctx.fill();
    } else if (btype === 'residential') {
      // Small house shape
      ctx.fillStyle = color;
      ctx.fillRect(cx - size * 0.5, by - size * 0.2, size, size * 0.8);
      ctx.beginPath();
      ctx.moveTo(cx - size * 0.6, by - size * 0.2);
      ctx.lineTo(cx, by - size * 0.7);
      ctx.lineTo(cx + size * 0.6, by - size * 0.2);
      ctx.closePath();
      ctx.fill();
    } else if (btype === 'barracks') {
      // Shield shape
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(cx, by - size * 0.8);
      ctx.lineTo(cx + size * 0.6, by - size * 0.3);
      ctx.lineTo(cx + size * 0.6, by + size * 0.2);
      ctx.lineTo(cx, by + size * 0.7);
      ctx.lineTo(cx - size * 0.6, by + size * 0.2);
      ctx.lineTo(cx - size * 0.6, by - size * 0.3);
      ctx.closePath();
      ctx.fill();
    } else {
      // Default: square
      ctx.fillStyle = color;
      ctx.fillRect(cx - size * 0.4, by - size * 0.4, size * 0.8, size * 0.8);
    }
  }

  function drawStar(cx, cy, size, points, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < points * 2; i++) {
      const angle = (i * Math.PI) / points - Math.PI / 2;
      const r = i % 2 === 0 ? size : size * 0.45;
      const sx = cx + r * Math.cos(angle);
      const sy = cy + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(sx, sy);
      else ctx.lineTo(sx, sy);
    }
    ctx.closePath();
    ctx.fill();
  }

  // ----------------------------------------------------------
  // Draw Units
  // ----------------------------------------------------------
  function drawUnits() {
    const mapData = StarMap.getMapData();
    if (!mapData) return;

    for (const [key, hex] of mapData.hexes) {
      if (!hex.unit || hex.visibility < 1) continue;

      // Only show enemy units in visible tiles
      if (hex.unit.owner !== 'player' && hex.visibility < 2) continue;

      const pos = StarMap.hexToPixel(hex.q, hex.r, HEX_SIZE);
      const screen = worldToScreen(pos.x, pos.y);
      const radius = HEX_SIZE * camera.zoom;

      // Culling
      if (screen.x < -radius * 2 || screen.x > canvas.width + radius * 2) continue;
      if (screen.y < -radius * 2 || screen.y > canvas.height + radius * 2) continue;

      drawUnitShape(hex.unit, screen.x, screen.y, radius);
    }
  }

  function drawUnitShape(unit, cx, cy, hexRadius) {
    const size = hexRadius * 0.3;
    const uy = cy - hexRadius * 0.15; // slightly above center

    // Unit color based on owner
    const color = unit.owner === 'player' ? '#5b8fb9' :
                  unit.owner === 'sylphari' ? '#5b9e7a' :
                  unit.owner === 'krath' ? '#c75c5c' :
                  unit.owner === 'aethori' ? '#c9a84c' : '#7a7a82';

    // Different shapes for different unit types
    if (unit.type === 'scout') {
      // Small triangle pointing up
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(cx, uy - size * 1.2);
      ctx.lineTo(cx + size * 0.7, uy + size * 0.4);
      ctx.lineTo(cx - size * 0.7, uy + size * 0.4);
      ctx.closePath();
      ctx.fill();
    } else if (unit.type === 'marine' || unit.type === 'heavy_soldier') {
      // Diamond shape
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(cx, uy - size);
      ctx.lineTo(cx + size * 0.7, uy);
      ctx.lineTo(cx, uy + size);
      ctx.lineTo(cx - size * 0.7, uy);
      ctx.closePath();
      ctx.fill();
    } else if (unit.type === 'assault_mech' || unit.type === 'artillery') {
      // Hexagonal shape for mechs
      ctx.fillStyle = color;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = Math.PI / 3 * i - Math.PI / 6;
        const hx = cx + size * 0.8 * Math.cos(angle);
        const hy = uy + size * 0.8 * Math.sin(angle);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.fill();
    } else if (unit.type === 'commander') {
      // Star shape for commander
      drawStar(cx, uy, size * 0.9, 5, color);
    } else {
      // Default: circle
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(cx, uy, size * 0.6, 0, Math.PI * 2);
      ctx.fill();
    }

    // HP bar below unit
    if (unit.hp < unit.maxHp) {
      const barWidth = hexRadius * 0.6;
      const barHeight = 3;
      const barY = uy + size + 4;
      const hpPercent = unit.hp / unit.maxHp;

      ctx.fillStyle = '#1a1a1f';
      ctx.fillRect(cx - barWidth / 2, barY, barWidth, barHeight);

      const hpColor = hpPercent > 0.6 ? '#5b9e7a' :
                      hpPercent > 0.3 ? '#c9a84c' : '#c75c5c';
      ctx.fillStyle = hpColor;
      ctx.fillRect(cx - barWidth / 2, barY, barWidth * hpPercent, barHeight);
    }

    // Fortified indicator
    if (unit.fortified) {
      ctx.strokeStyle = '#c9a84c';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, uy, size * 1.1, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Moved indicator (dim if already acted)
    if (unit.owner === 'player' && (unit.hasMoved || unit.hasAttacked)) {
      ctx.fillStyle = 'rgba(15,16,18,0.4)';
      ctx.beginPath();
      ctx.arc(cx, uy, size * 1.0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // ----------------------------------------------------------
  // Draw Selection Highlight
  // ----------------------------------------------------------
  function drawSelection() {
    if (!Game.STATE.selectedHex) return;

    const { q, r } = Game.STATE.selectedHex;
    const pos = StarMap.hexToPixel(q, r, HEX_SIZE);
    const screen = worldToScreen(pos.x, pos.y);
    const radius = HEX_SIZE * camera.zoom * 0.9;

    ctx.strokeStyle = '#5b8fb9';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = Math.PI / 3 * i + Math.PI / 6;
      const hx = screen.x + radius * Math.cos(angle);
      const hy = screen.y + radius * Math.sin(angle);
      if (i === 0) ctx.moveTo(hx, hy);
      else ctx.lineTo(hx, hy);
    }
    ctx.closePath();
    ctx.stroke();
  }

  // ----------------------------------------------------------
  // Minimap
  // ----------------------------------------------------------
  function drawMinimap() {
    if (!minimapCtx) return;
    const mapData = StarMap.getMapData();
    if (!mapData) return;

    minimapCtx.fillStyle = '#0a0a0c';
    minimapCtx.fillRect(0, 0, 160, 120);

    const scaleX = 160 / mapData.width;
    const scaleY = 120 / mapData.height;
    const scale = Math.min(scaleX, scaleY);

    for (const [key, hex] of mapData.hexes) {
      let color;
      if (hex.visibility === 0) {
        color = '#0a0a0c';
      } else if (hex.visibility === 1) {
        color = dimColor(StarMap.BIOMES[hex.biome].color, 0.4);
      } else {
        color = StarMap.BIOMES[hex.biome].color;
      }

      // Override with owner color
      if (hex.owner && hex.visibility > 0) {
        if (hex.owner === 'player') color = '#3a6a8a';
        else if (hex.owner === 'sylphari') color = '#3a6a52';
        else if (hex.owner === 'krath') color = '#8a3a3a';
        else if (hex.owner === 'aethori') color = '#8a7434';
      }

      const mx = hex.q * scale + (mapData.width * scale) / 2 - 80;
      const my = hex.r * scale + (mapData.height * scale) / 2 - 60;

      minimapCtx.fillStyle = color;
      minimapCtx.fillRect(mx, my, Math.max(scale, 2), Math.max(scale, 2));
    }

    // Camera viewport indicator
    const viewW = canvas.width / camera.zoom * scale;
    const viewH = canvas.height / camera.zoom * scale;
    const viewX = (-camera.x * scale) + 80 - viewW / 2;
    const viewY = (-camera.y * scale) + 60 - viewH / 2;

    minimapCtx.strokeStyle = '#5b8fb9';
    minimapCtx.lineWidth = 1;
    minimapCtx.strokeRect(viewX, viewY, viewW, viewH);
  }

  // ----------------------------------------------------------
  // Utility
  // ----------------------------------------------------------
  function dimColor(hex, factor) {
    // Darken a hex color by factor (0-1)
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const dr = Math.round(r * factor);
    const dg = Math.round(g * factor);
    const db = Math.round(b * factor);
    return `rgb(${dr},${dg},${db})`;
  }

  // ----------------------------------------------------------
  // Public API
  // ----------------------------------------------------------
  return {
    init,
    resizeCanvas,
    camera,
    updateMoveRange,
    worldToScreen,
    screenToWorld,
  };
})();
