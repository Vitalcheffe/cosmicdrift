/* ============================================================
   CosmicDrift - starmap.js
   Hex map generation, tile logic, biome system
   ============================================================ */

const StarMap = (function () {
  'use strict';

  // ----------------------------------------------------------
  // Constants
  // ----------------------------------------------------------
  const BIOMES = {
    verdant:  { name: 'Verdant Expanse', color: '#1a2e1a', moveCost: 2,   resource: 'biomass',  resourceChance: 0.3 },
    iron:     { name: 'Iron Peaks',      color: '#2a2220', moveCost: 3,   resource: 'minerals', resourceChance: 0.4 },
    dust:     { name: 'Dust Wastes',     color: '#2a2820', moveCost: 1.5, resource: 'energy',   resourceChance: 0.2 },
    frozen:   { name: 'Frozen Reaches',  color: '#1a2230', moveCost: 2.5, resource: 'water',    resourceChance: 0.35 },
    crystal:  { name: 'Crystal Caverns', color: '#221a2a', moveCost: 2,   resource: 'energy',   resourceChance: 0.3 },
    abyssal:  { name: 'Abyssal Shores',  color: '#1a2a2a', moveCost: 2,   resource: 'water',    resourceChance: 0.35 }
  };

  const MAP_SIZES = {
    small:  { w: 30, h: 20 },
    medium: { w: 40, h: 30 },
    large:  { w: 50, h: 40 }
  };

  // Hex size for rendering reference
  const HEX_SIZE = 24;

  let mapData = null; // { width, height, hexes: Map<string, hex> }
  let playerStart = null;

  // ----------------------------------------------------------
  // Simple hash-based noise for procedural generation
  // ----------------------------------------------------------
  function hash(x, y) {
    let h = x * 374761393 + y * 668265263;
    h = (h ^ (h >> 13)) * 1274126177;
    h = h ^ (h >> 16);
    return h;
  }

  function noise2d(x, y) {
    return (hash(x, y) & 0xFFFF) / 0xFFFF;
  }

  // Smoothed noise for biome assignment
  function smoothNoise(x, y, scale) {
    const sx = x / scale;
    const sy = y / scale;
    const ix = Math.floor(sx);
    const iy = Math.floor(sy);
    const fx = sx - ix;
    const fy = sy - iy;

    const a = noise2d(ix, iy);
    const b = noise2d(ix + 1, iy);
    const c = noise2d(ix, iy + 1);
    const d = noise2d(ix + 1, iy + 1);

    const top = a + (b - a) * fx;
    const bot = c + (d - c) * fx;
    return top + (bot - top) * fy;
  }

  // ----------------------------------------------------------
  // Hex key utilities
  // ----------------------------------------------------------
  function hexKey(q, r) {
    return `${q},${r}`;
  }

  function parseKey(key) {
    const parts = key.split(',');
    return { q: parseInt(parts[0]), r: parseInt(parts[1]) };
  }

  // ----------------------------------------------------------
  // Hex coordinate math (flat-top hexagons)
  // ----------------------------------------------------------
  function hexToPixel(q, r, size) {
    const s = size || HEX_SIZE;
    const x = s * (3 / 2 * q);
    const y = s * (Math.sqrt(3) / 2 * q + Math.sqrt(3) * r);
    return { x, y };
  }

  function pixelToHex(px, py, size) {
    const s = size || HEX_SIZE;
    const q = (2 / 3 * px) / s;
    const r = (-1 / 3 * px + Math.sqrt(3) / 3 * py) / s;
    return hexRound(q, r);
  }

  function hexRound(q, r) {
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

  // Get neighboring hexes (6 directions for flat-top)
  const HEX_DIRS = [
    { q: 1, r: 0 }, { q: 1, r: -1 }, { q: 0, r: -1 },
    { q: -1, r: 0 }, { q: -1, r: 1 }, { q: 0, r: 1 }
  ];

  function getNeighbors(q, r) {
    return HEX_DIRS.map(d => ({ q: q + d.q, r: r + d.r }));
  }

  function getNeighbor(q, r, dir) {
    return { q: q + HEX_DIRS[dir].q, r: r + HEX_DIRS[dir].r };
  }

  function hexDistance(q1, r1, q2, r2) {
    return (Math.abs(q1 - q2) + Math.abs(q1 + r1 - q2 - r2) + Math.abs(r1 - r2)) / 2;
  }

  // ----------------------------------------------------------
  // Map Generation
  // ----------------------------------------------------------
  function generate(sizeKey) {
    const size = MAP_SIZES[sizeKey] || MAP_SIZES.medium;
    const { w, h } = size;

    mapData = {
      width: w,
      height: h,
      hexes: new Map()
    };

    const cx = w / 2;
    const cy = h / 2;

    // Generate each hex
    for (let r = 0; r < h; r++) {
      for (let q = 0; q < w; q++) {
        const key = hexKey(q, r);
        const biome = assignBiome(q, r, w, h, cx, cy);

        // Resource deposit
        const biomeData = BIOMES[biome];
        let resource = null;
        if (noise2d(q * 7 + 3, r * 11 + 5) < biomeData.resourceChance) {
          resource = biomeData.resource;
        }

        const hex = {
          q, r,
          biome,
          resource,
          owner: null,        // 'player', 'sylphari', 'krath', 'aethori'
          building: null,      // building object or null
          unit: null,          // unit object reference or null
          visibility: 0,       // 0=unexplored, 1=explored(fog), 2=visible
          road: false,
          district: null       // district type or null
        };

        mapData.hexes.set(key, hex);
      }
    }

    // Find player start position (verdant biome near center)
    findPlayerStart(w, h, cx, cy);

    // Place faction capitals
    placeFactionCapitals(w, h);

    return mapData;
  }

  function assignBiome(q, r, w, h, cx, cy) {
    // Distance from center normalized 0-1
    const dx = (q - cx) / cx;
    const dy = (r - cy) / cy;
    const distFromCenter = Math.sqrt(dx * dx + dy * dy);

    // Use noise for organic shapes
    const n1 = smoothNoise(q, r, 8);
    const n2 = smoothNoise(q + 100, r + 100, 5);
    const n3 = smoothNoise(q + 200, r + 200, 12);

    // Top/bottom edges: frozen
    if (r < 3 || r >= h - 3) {
      if (n1 > 0.3) return 'frozen';
    }

    // Top/bottom regions
    if (r < h * 0.2 || r > h * 0.8) {
      if (n2 > 0.4) return 'frozen';
    }

    // Left/right mountain ranges
    if (q < 3 || q >= w - 3) {
      if (n1 > 0.25) return 'iron';
    }

    if ((q < w * 0.15 || q > w * 0.85) && n2 > 0.35) {
      return 'iron';
    }

    // Center region: mostly verdant
    if (distFromCenter < 0.3) {
      if (n3 > 0.6) return 'abyssal';
      if (n1 > 0.7) return 'crystal';
      return 'verdant';
    }

    // Mid-range: mix based on noise
    if (distFromCenter < 0.55) {
      const v = n1 + n2 * 0.5;
      if (v < 0.35) return 'dust';
      if (v < 0.55) return 'verdant';
      if (v < 0.7) return 'abyssal';
      if (v < 0.85) return 'crystal';
      return 'iron';
    }

    // Outer regions
    const v = n1 + n2 * 0.3;
    if (v < 0.3) return 'dust';
    if (v < 0.5) return 'iron';
    if (v < 0.65) return 'abyssal';
    if (n3 > 0.6) return 'frozen';
    return 'dust';
  }

  function findPlayerStart(w, h, cx, cy) {
    // Find a verdant hex near center
    let bestHex = null;
    let bestDist = Infinity;

    for (const [key, hex] of mapData.hexes) {
      if (hex.biome === 'verdant' || hex.biome === 'abyssal') {
        const d = hexDistance(hex.q, hex.r, Math.floor(cx), Math.floor(cy));
        if (d < bestDist) {
          bestDist = d;
          bestHex = hex;
        }
      }
    }

    // Fallback: any hex near center
    if (!bestHex) {
      for (const [key, hex] of mapData.hexes) {
        const d = hexDistance(hex.q, hex.r, Math.floor(cx), Math.floor(cy));
        if (d < bestDist) {
          bestDist = d;
          bestHex = hex;
        }
      }
    }

    if (bestHex) {
      playerStart = { q: bestHex.q, r: bestHex.r };
      bestHex.owner = 'player';
      bestHex.visibility = 2;

      // Claim surrounding hexes as player territory
      const neighbors = getNeighbors(bestHex.q, bestHex.r);
      neighbors.forEach(nb => {
        const nbHex = getHex(nb.q, nb.r);
        if (nbHex && !nbHex.owner) {
          nbHex.owner = 'player';
        }
      });

      // Reveal surrounding hexes
      revealAround(bestHex.q, bestHex.r, 3);
    }
  }

  function placeFactionCapitals(w, h) {
    // Sylphari: verdant biome, upper-left quadrant
    placeCapital('sylphari', 'verdant', 0, 0, Math.floor(w * 0.3), Math.floor(h * 0.4));
    // Krath: iron biome, lower-right quadrant
    placeCapital('krath', 'iron', Math.floor(w * 0.6), Math.floor(h * 0.5), w, h);
    // Aethori: dust biome, lower-left quadrant
    placeCapital('aethori', 'dust', 0, Math.floor(h * 0.5), Math.floor(w * 0.4), h);
  }

  function placeCapital(faction, preferredBiome, x1, y1, x2, y2) {
    let bestHex = null;
    let bestDist = Infinity;
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;

    for (const [key, hex] of mapData.hexes) {
      if (hex.q < x1 || hex.q >= x2 || hex.r < y1 || hex.r >= y2) continue;
      if (hex.owner) continue; // skip already claimed

      const d = hexDistance(hex.q, hex.r, Math.floor(mx), Math.floor(my));
      const biomeMatch = hex.biome === preferredBiome;
      const score = d + (biomeMatch ? 0 : 10);

      if (score < bestDist) {
        bestDist = score;
        bestHex = hex;
      }
    }

    if (bestHex) {
      bestHex.owner = faction;
      bestHex.building = {
        type: 'capital',
        owner: faction,
        name: `${faction.charAt(0).toUpperCase() + faction.slice(1)} Capital`,
        hp: 100
      };

      // Reveal area around capital for the faction
      const neighbors = getNeighbors(bestHex.q, bestHex.r);
      neighbors.forEach(n => {
        const h = getHex(n.q, n.r);
        if (h && !h.owner) h.owner = faction;
      });
    }
  }

  // ----------------------------------------------------------
  // Visibility
  // ----------------------------------------------------------
  function revealAround(q, r, radius) {
    for (const [key, hex] of mapData.hexes) {
      const d = hexDistance(q, r, hex.q, hex.r);
      if (d <= radius) {
        hex.visibility = 2; // visible
      } else if (hex.visibility === 2) {
        hex.visibility = 1; // explored but now fog
      }
    }
  }

  function updateVisibility() {
    // First, demote all visible to explored
    for (const [key, hex] of mapData.hexes) {
      if (hex.visibility === 2) {
        hex.visibility = 1;
      }
    }

    // Reveal around player units and buildings
    if (Game.STATE.units) {
      Game.STATE.units.forEach(unit => {
        if (unit.owner === 'player') {
          revealAround(unit.q, unit.r, unit.sightRange || 3);
        }
      });
    }

    // Reveal around player buildings
    for (const [key, hex] of mapData.hexes) {
      if (hex.owner === 'player' && hex.building) {
        revealAround(hex.q, hex.r, 2);
      }
    }
  }

  // ----------------------------------------------------------
  // Hex Access
  // ----------------------------------------------------------
  function getHex(q, r) {
    if (!mapData) return null;
    return mapData.hexes.get(hexKey(q, r)) || null;
  }

  function setHex(q, r, data) {
    if (!mapData) return;
    const hex = mapData.hexes.get(hexKey(q, r));
    if (hex) {
      Object.assign(hex, data);
    }
  }

  function getAllHexes() {
    if (!mapData) return [];
    return Array.from(mapData.hexes.values());
  }

  function getPlayerStart() {
    return playerStart || { q: 0, r: 0 };
  }

  function getMapData() {
    return mapData;
  }

  // ----------------------------------------------------------
  // Pathfinding (A* for unit movement)
  // ----------------------------------------------------------
  function findPath(startQ, startR, endQ, endR, maxMoves) {
    const startKey = hexKey(startQ, startR);
    const endKey = hexKey(endQ, endR);

    if (startKey === endKey) return [];

    const open = new Map();   // key -> { q, r, g, f, parent }
    const closed = new Set();

    const startHex = getHex(startQ, startR);
    if (!startHex) return null;

    open.set(startKey, {
      q: startQ, r: startR,
      g: 0,
      f: hexDistance(startQ, startR, endQ, endR),
      parent: null
    });

    let iterations = 0;
    const maxIter = 500;

    while (open.size > 0 && iterations < maxIter) {
      iterations++;

      // Find lowest f in open
      let current = null;
      let currentKey = null;
      for (const [key, node] of open) {
        if (!current || node.f < current.f) {
          current = node;
          currentKey = key;
        }
      }

      if (currentKey === endKey) {
        // Reconstruct path
        const path = [];
        let node = current;
        while (node.parent) {
          path.unshift({ q: node.q, r: node.r });
          node = node.parent;
        }
        return path;
      }

      open.delete(currentKey);
      closed.add(currentKey);

      // Explore neighbors
      const neighbors = getNeighbors(current.q, current.r);
      for (const nb of neighbors) {
        const nbKey = hexKey(nb.q, nb.r);
        if (closed.has(nbKey)) continue;

        const nbHex = getHex(nb.q, nb.r);
        if (!nbHex) continue;

        const biomeData = BIOMES[nbHex.biome];
        const moveCost = nbHex.road ? 0.5 : biomeData.moveCost;
        const g = current.g + moveCost;

        if (maxMoves !== undefined && g > maxMoves) continue;

        const existing = open.get(nbKey);
        if (existing && g >= existing.g) continue;

        open.set(nbKey, {
          q: nb.q, r: nb.r,
          g: g,
          f: g + hexDistance(nb.q, nb.r, endQ, endR),
          parent: current
        });
      }
    }

    return null; // no path found
  }

  // ----------------------------------------------------------
  // Territory
  // ----------------------------------------------------------
  function claimTerritory(q, r, owner) {
    const hex = getHex(q, r);
    if (hex && !hex.owner) {
      hex.owner = owner;
      return true;
    }
    return false;
  }

  function getOwnedHexes(owner) {
    const result = [];
    for (const [key, hex] of mapData.hexes) {
      if (hex.owner === owner) result.push(hex);
    }
    return result;
  }

  // ----------------------------------------------------------
  // Serialization helpers
  // ----------------------------------------------------------
  function serialize() {
    if (!mapData) return null;
    const hexArray = [];
    for (const [key, hex] of mapData.hexes) {
      hexArray.push({ ...hex });
    }
    return {
      width: mapData.width,
      height: mapData.height,
      hexes: hexArray,
      playerStart: { ...playerStart }
    };
  }

  function deserialize(data) {
    if (!data) return;
    mapData = {
      width: data.width,
      height: data.height,
      hexes: new Map()
    };
    data.hexes.forEach(h => {
      mapData.hexes.set(hexKey(h.q, h.r), h);
    });
    playerStart = data.playerStart;
  }

  // ----------------------------------------------------------
  // Public API
  // ----------------------------------------------------------
  return {
    BIOMES,
    HEX_SIZE,
    HEX_DIRS,
    generate,
    getHex,
    setHex,
    getAllHexes,
    getPlayerStart,
    getMapData,
    hexKey,
    parseKey,
    hexToPixel,
    pixelToHex,
    hexRound,
    hexDistance,
    getNeighbors,
    getNeighbor,
    findPath,
    revealAround,
    updateVisibility,
    claimTerritory,
    getOwnedHexes,
    serialize,
    deserialize
  };
})();
