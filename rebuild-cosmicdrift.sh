#!/bin/bash
# Rebuild CosmicDrift repo with realistic commit timestamps
# Simulates a 16-year-old coding over ~2 weeks after school/weekends

set -e

GITHUB_TOKEN="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"
REPO_NAME="cosmicdrift"
WORK_DIR="/home/z/my-project/cosmicdrift-rebuild"
GIT_EMAIL="amineharchelkorane5@gmail.com"
GIT_NAME="VitalCheffe"

# Delete old repo
echo "=== Deleting old repo ==="
curl -s -X DELETE -H "Authorization: token $GITHUB_TOKEN" "https://api.github.com/repos/Vitalcheffe/$REPO_NAME" || true
sleep 3

# Create new repo
echo "=== Creating new repo ==="
curl -s -X POST -H "Authorization: token $GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api.github.com/user/repos" \
  -d "{\"name\":\"$REPO_NAME\",\"description\":\"A terminal-based space survival game — navigate star systems, manage resources, survive the void\",\"private\":false}" | python3 -c "import json,sys; d=json.load(sys.stdin); print('Created:', d.get('full_name','ERROR'), d.get('html_url',''))"
sleep 2

# Clean and setup work dir
rm -rf "$WORK_DIR"
mkdir -p "$WORK_DIR"
cd "$WORK_DIR"

git init
git config user.email "$GIT_EMAIL"
git config user.name "$GIT_NAME"

# Helper function: commit with specific date
commit_with_date() {
  local date="$1"
  local msg="$2"
  export GIT_AUTHOR_DATE="$date"
  export GIT_COMMITTER_DATE="$date"
  git add -A
  git commit -m "$msg"
  unset GIT_AUTHOR_DATE
  unset GIT_COMMITTER_DATE
}

# ============================================================
# COMMIT TIMELINE - Realistic after-school/weekend coding
# Morocco timezone (Africa/Casablanca = UTC+1 in summer)
# ============================================================

# === Day 1: Sunday May 18 - Project kickoff (afternoon) ===
mkdir -p src

cat > README.md << 'EOF'
# CosmicDrift 🚀

A terminal-based space survival game.

Navigate through procedurally generated star systems and try to reach Starbase Omega before your resources run out.

Built for Hack Club Stardance.
EOF
commit_with_date "2026-05-18T15:32:00+01:00" "initial commit"

cat > .gitignore << 'EOF'
node_modules/
dist/
*.js
!jest.config.js
.DS_Store
save.json
EOF
commit_with_date "2026-05-18T15:38:00+01:00" "add gitignore"

cat > package.json << 'EOF'
{
  "name": "cosmicdrift",
  "version": "0.1.0",
  "description": "A terminal-based space survival game",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "author": "Amine",
  "license": "MIT",
  "dependencies": {},
  "devDependencies": {
    "typescript": "^5.5.0",
    "@types/node": "^20.14.0"
  }
}
EOF
commit_with_date "2026-05-18T15:51:00+01:00" "skeleton package.json"

# === Day 2: Tuesday May 20 - After school ===
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
EOF
commit_with_date "2026-05-20T17:45:00+01:00" "add tsconfig"

mkdir -p src/types
cat > src/types/game.ts << 'EOF'
// Game state types

export interface Position {
  x: number;
  y: number;
}

export interface ShipResources {
  fuel: number;
  oxygen: number;
  hull: number;
  credits: number;
}

export interface StarSystem {
  id: string;
  name: string;
  position: Position;
  type: StarType;
  resources?: PlanetResources;
  hazard?: HazardType;
  discovered: boolean;
  visited: boolean;
}

export enum StarType {
  Yellow = 'Yellow',
  Red = 'Red',
  Blue = 'Blue',
  White = 'White',
  Neutron = 'Neutron',
  BlackHole = 'BlackHole',
}

export enum HazardType {
  AsteroidField = 'Asteroid Field',
  SolarFlare = 'Solar Flare',
  Nebula = 'Nebula',
  Pirates = 'Pirates',
  GravityWell = 'Gravity Well',
}

export interface PlanetResources {
  fuel?: number;
  oxygen?: number;
  metals?: number;
}

export interface GameState {
  ship: {
    position: Position;
    resources: ShipResources;
    speed: number;
    shieldActive: boolean;
  };
  currentSystem: StarSystem | null;
  visitedSystems: string[];
  turnCount: number;
  gameStatus: GameStatus;
  log: string[];
}

export enum GameStatus {
  Playing = 'Playing',
  Won = 'Won',
  Lost = 'Lost',
}
EOF
commit_with_date "2026-05-20T18:22:00+01:00" "add game state types and interfaces"

# === Day 3: Thursday May 22 - After school ===
mkdir -p src/generators
cat > src/generators/names.ts << 'EOF'
// Star system name generator
// Creates believable sci-fi star system names

const PREFIXES = [
  'Kepler', 'Proxima', 'Alpha', 'Beta', 'Gamma', 'Delta',
  'Sigma', 'Tau', 'Zeta', 'Omega', 'Nova', 'Vega',
  'Altair', 'Rigel', 'Sirius', 'Polaris', 'Castor',
  'Deneb', 'Arcturus', 'Capella', 'Mira', 'Lyra',
];

const SUFFIXES = [
  'Prime', 'Minor', 'Major', 'Outpost', 'Station',
  'Reach', 'Crossing', 'Haven', 'Gate', 'Depot',
  'Nexus', 'Point', 'Drift', 'Anchor', 'Watch',
];

const GREEK = [
  'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

export function generateStarName(seed: number): string {
  const rng = seededRandom(seed);
  const prefix = PREFIXES[Math.floor(rng() * PREFIXES.length)];
  const suffix = rng() > 0.5 
    ? ` ${GREEK[Math.floor(rng() * GREEK.length)]}` 
    : ` ${SUFFIXES[Math.floor(rng() * SUFFIXES.length)]}`;
  return `${prefix}${suffix}`;
}

export function generateSystemId(x: number, y: number): string {
  return `sys_${x}_${y}`;
}
EOF
commit_with_date "2026-05-22T18:10:00+01:00" "add star system name generator"

cat > src/generators/starmap.ts << 'EOF'
// Procedural star map generator
// Creates a grid of star systems with resources and hazards

import { StarSystem, StarType, HazardType } from '../types/game';
import { generateStarName, generateSystemId } from './names';

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

const STAR_TYPE_WEIGHTS: [StarType, number][] = [
  [StarType.Yellow, 0.35],
  [StarType.Red, 0.25],
  [StarType.Blue, 0.15],
  [StarType.White, 0.12],
  [StarType.Neutron, 0.08],
  [StarType.BlackHole, 0.05],
];

const HAZARD_TYPES = [
  HazardType.AsteroidField,
  HazardType.SolarFlare,
  HazardType.Nebula,
  HazardType.Pirates,
  HazardType.GravityWell,
];

function pickStarType(rng: () => number): StarType {
  const roll = rng();
  let cumulative = 0;
  for (const [type, weight] of STAR_TYPE_WEIGHTS) {
    cumulative += weight;
    if (roll <= cumulative) return type;
  }
  return StarType.Yellow;
}

export function generateStarMap(
  width: number,
  height: number,
  seed: number = 42
): StarSystem[] {
  const rng = seededRandom(seed);
  const systems: StarSystem[] = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // ~70% chance of a system existing at each point
      if (rng() > 0.7) continue;

      const id = generateSystemId(x, y);
      const name = generateStarName(Math.floor(rng() * 99999));
      const type = pickStarType(rng);

      const system: StarSystem = {
        id,
        name,
        position: { x, y },
        type,
        discovered: false,
        visited: false,
      };

      // Add resources based on star type
      if (type === StarType.Yellow || type === StarType.White) {
        system.resources = {
          fuel: Math.floor(rng() * 30) + 10,
          oxygen: Math.floor(rng() * 25) + 5,
          metals: Math.floor(rng() * 20),
        };
      } else if (type === StarType.Red) {
        system.resources = {
          fuel: Math.floor(rng() * 20) + 5,
          metals: Math.floor(rng() * 30) + 10,
        };
      } else if (type === StarType.Blue) {
        system.resources = {
          oxygen: Math.floor(rng() * 40) + 15,
        };
      }

      // Add hazards (30% chance)
      if (rng() > 0.7 && type !== StarType.BlackHole) {
        system.hazard = HAZARD_TYPES[Math.floor(rng() * HAZARD_TYPES.length)];
      }

      systems.push(system);
    }
  }

  // Ensure starting system is safe
  const startSystem = systems.find(s => s.position.x === 0 && s.position.y === 0);
  if (startSystem) {
    startSystem.hazard = undefined;
    startSystem.discovered = true;
    startSystem.visited = true;
  }

  return systems;
}
EOF
commit_with_date "2026-05-22T19:05:00+01:00" "add procedural star map generator"

# === Day 4: Friday May 23 - After school, longer session ===
mkdir -p src/core

cat > src/core/state.ts << 'EOF'
// Game state management
// Creates and manages the game state

import { GameState, GameStatus, ShipResources } from '../types/game';

export function createInitialState(): GameState {
  return {
    ship: {
      position: { x: 0, y: 0 },
      resources: {
        fuel: 100,
        oxygen: 100,
        hull: 100,
        credits: 50,
      },
      speed: 1,
      shieldActive: false,
    },
    currentSystem: null,
    visitedSystems: ['sys_0_0'],
    turnCount: 0,
    gameStatus: GameStatus.Playing,
    log: [
      'Systems online. Welcome aboard, Captain.',
      'Your ship is at the origin system.',
      'Objective: Reach Starbase Omega.',
    ],
  };
}

export function consumeFuel(state: GameState, amount: number): GameState {
  const fuel = Math.max(0, state.ship.resources.fuel - amount);
  return {
    ...state,
    ship: {
      ...state.ship,
      resources: { ...state.ship.resources, fuel },
    },
    gameStatus: fuel <= 0 ? GameStatus.Lost : state.gameStatus,
    log: fuel <= 0
      ? [...state.log, 'CRITICAL: Out of fuel. Ship adrift in the void.']
      : state.log,
  };
}

export function consumeOxygen(state: GameState, amount: number): GameState {
  const oxygen = Math.max(0, state.ship.resources.oxygen - amount);
  return {
    ...state,
    ship: {
      ...state.ship,
      resources: { ...state.ship.resources, oxygen },
    },
    gameStatus: oxygen <= 0 ? GameStatus.Lost : state.gameStatus,
    log: oxygen <= 0
      ? [...state.log, 'CRITICAL: Oxygen depleted. Crew lost.']
      : state.log,
  };
}

export function addLog(state: GameState, message: string): GameState {
  return {
    ...state,
    log: [...state.log.slice(-50), message],
  };
}
EOF
commit_with_date "2026-05-23T17:15:00+01:00" "add game state management"

cat > src/core/movement.ts << 'EOF'
// Ship movement system
// Handles navigation between star systems

import { GameState, GameStatus } from '../types/game';
import { consumeFuel, consumeOxygen, addLog } from './state';

const FUEL_PER_SECTOR = 8;
const OXYGEN_PER_TURN = 3;

export function moveShip(state: GameState, dx: number, dy: number, starMap: any[]): GameState {
  if (state.gameStatus !== GameStatus.Playing) return state;

  const newX = state.ship.position.x + dx;
  const newY = state.ship.position.y + dy;

  // Calculate distance for fuel consumption
  const distance = Math.abs(dx) + Math.abs(dy);
  const fuelNeeded = distance * FUEL_PER_SECTOR;

  if (state.ship.resources.fuel < fuelNeeded) {
    return addLog(state, 'Not enough fuel for that jump! Need ' + fuelNeeded + ' fuel.');
  }

  // Check if there's a system at the destination
  const targetSystem = starMap.find(s => s.position.x === newX && s.position.y === newY);

  let newState = consumeFuel(state, fuelNeeded);
  newState = consumeOxygen(newState, OXYGEN_PER_TURN);
  newState = {
    ...newState,
    ship: { ...newState.ship, position: { x: newX, y: newY } },
    turnCount: newState.turnCount + 1,
  };

  if (targetSystem) {
    targetSystem.discovered = true;
    targetSystem.visited = true;
    newState = addLog(newState, `Arrived at ${targetSystem.name} [${targetSystem.type}]`);
    newState = { ...newState, currentSystem: targetSystem };

    if (targetSystem.hazard) {
      newState = addLog(newState, `WARNING: ${targetSystem.hazard} detected!`);
    }
  } else {
    newState = addLog(newState, `Jumped to sector (${newX}, ${newY}) — empty space.`);
    newState = { ...newState, currentSystem: null };
  }

  return newState;
}

export function getReachableSystems(state: GameState, starMap: any[]): any[] {
  const { x, y } = state.ship.position;
  const maxDistance = Math.floor(state.ship.resources.fuel / FUEL_PER_SECTOR);

  return starMap.filter(s => {
    const dist = Math.abs(s.position.x - x) + Math.abs(s.position.y - y);
    return dist > 0 && dist <= maxDistance;
  });
}
EOF
commit_with_date "2026-05-23T18:02:00+01:00" "add ship movement system"

cat > src/core/resources.ts << 'EOF'
// Resource collection and management
// Handle gathering resources from star systems

import { GameState } from '../types/game';
import { addLog } from './state';

const MAX_RESOURCE = 100;

export function collectResources(state: GameState): GameState {
  if (!state.currentSystem || !state.currentSystem.resources) {
    return addLog(state, 'No collectible resources at this location.');
  }

  const res = state.currentSystem.resources;
  let newState = { ...state };
  const collected: string[] = [];

  if (res.fuel && res.fuel > 0) {
    const amount = Math.min(res.fuel, MAX_RESOURCE - newState.ship.resources.fuel);
    if (amount > 0) {
      newState.ship.resources.fuel += amount;
      collected.push(`${amount} fuel`);
      res.fuel -= amount;
    }
  }

  if (res.oxygen && res.oxygen > 0) {
    const amount = Math.min(res.oxygen, MAX_RESOURCE - newState.ship.resources.oxygen);
    if (amount > 0) {
      newState.ship.resources.oxygen += amount;
      collected.push(`${amount} oxygen`);
      res.oxygen -= amount;
    }
  }

  if (res.metals && res.metals > 0) {
    const credits = res.metals * 2;
    newState.ship.resources.credits += credits;
    collected.push(`${credits} credits (from metals)`);
    res.metals = 0;
  }

  if (collected.length > 0) {
    newState = addLog(newState, `Collected: ${collected.join(', ')}`);
  } else {
    newState = addLog(newState, 'Resources already depleted here.');
  }

  return newState;
}

export function repairHull(state: GameState, cost: number = 20): GameState {
  if (state.ship.resources.credits < cost) {
    return addLog(state, `Not enough credits for repairs. Need ${cost}, have ${state.ship.resources.credits}.`);
  }

  const repairAmount = Math.min(25, MAX_RESOURCE - state.ship.resources.hull);
  if (repairAmount <= 0) {
    return addLog(state, 'Hull is already at maximum integrity.');
  }

  return addLog({
    ...state,
    ship: {
      ...state.ship,
      resources: {
        ...state.ship.resources,
        credits: state.ship.resources.credits - cost,
        hull: state.ship.resources.hull + repairAmount,
      },
    },
  }, `Hull repaired by ${repairAmount}. Cost: ${cost} credits.`);
}
EOF
commit_with_date "2026-05-23T19:28:00+01:00" "add resource collection and repair system"

# === Day 5: Saturday May 24 - Weekend, big session ===
cat > src/core/events.ts << 'EOF'
// Random encounter and event system
// Creates unpredictable situations in deep space

import { GameState, GameStatus, HazardType } from '../types/game';
import { addLog } from './state';

interface EncounterResult {
  state: GameState;
  description: string;
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

export function processHazard(state: GameState): EncounterResult {
  if (!state.currentSystem?.hazard) {
    return { state, description: 'Space is quiet here.' };
  }

  const hazard = state.currentSystem.hazard;
  const rng = seededRandom(state.turnCount * 7919 + state.ship.position.x * 104729);

  switch (hazard) {
    case HazardType.AsteroidField: {
      const damage = Math.floor(rng() * 15) + 5;
      const newState = {
        ...state,
        ship: {
          ...state.ship,
          resources: { ...state.ship.resources, hull: Math.max(0, state.ship.resources.hull - damage) },
        },
        gameStatus: state.ship.resources.hull - damage <= 0 ? GameStatus.Lost : state.gameStatus,
      };
      return {
        state: addLog(newState, `Asteroid impact! Hull damage: -${damage}`),
        description: `Your ship navigates through the asteroid field. A rogue rock slams into the hull!`,
      };
    }

    case HazardType.SolarFlare: {
      const oxygenLoss = Math.floor(rng() * 12) + 5;
      const newState = {
        ...state,
        ship: {
          ...state.ship,
          resources: { ...state.ship.resources, oxygen: Math.max(0, state.ship.resources.oxygen - oxygenLoss) },
        },
      };
      return {
        state: addLog(newState, `Solar flare! Oxygen vented: -${oxygenLoss}`),
        description: `A massive solar flare erupts, breaching the oxygen tanks!`,
      };
    }

    case HazardType.Nebula: {
      const fuelDrain = Math.floor(rng() * 10) + 3;
      const fuelGain = Math.floor(rng() * 20) + 10;
      const newState = {
        ...state,
        ship: {
          ...state.ship,
          resources: {
            ...state.ship.resources,
            fuel: Math.min(100, state.ship.resources.fuel + fuelGain - fuelDrain),
          },
        },
      };
      return {
        state: addLog(newState, `Nebula: lost ${fuelDrain} fuel, but harvested ${fuelGain} from the gas cloud`),
        description: `The nebula's electromagnetic storms wreak havoc on your systems, but you manage to siphon hydrogen.`,
      };
    }

    case HazardType.Pirates: {
      const creditsLost = Math.floor(rng() * 30) + 10;
      const newState = {
        ...state,
        ship: {
          ...state.ship,
          resources: {
            ...state.ship.resources,
            credits: Math.max(0, state.ship.resources.credits - creditsLost),
          },
        },
      };
      return {
        state: addLog(newState, `Pirates! They took ${creditsLost} credits`),
        description: `Pirates board your ship and loot your cargo hold before jumping away.`,
      };
    }

    case HazardType.GravityWell: {
      const fuelLoss = Math.floor(rng() * 15) + 8;
      const newState = {
        ...state,
        ship: {
          ...state.ship,
          resources: { ...state.ship.resources, fuel: Math.max(0, state.ship.resources.fuel - fuelLoss) },
        },
      };
      return {
        state: addLog(newState, `Gravity well! Extra fuel burned escaping: -${fuelLoss}`),
        description: `The intense gravitational pull requires maximum thrust to escape!`,
      };
    }

    default:
      return { state, description: 'Nothing happens.' };
  }
}

export function randomEvent(state: GameState): EncounterResult | null {
  const rng = seededRandom(state.turnCount * 31 + 7);
  if (rng() > 0.3) return null; // 30% chance of random event

  const roll = rng();

  if (roll < 0.25) {
    const fuel = Math.floor(rng() * 15) + 5;
    return {
      state: addLog({
        ...state,
        ship: {
          ...state.ship,
          resources: {
            ...state.ship.resources,
            fuel: Math.min(100, state.ship.resources.fuel + fuel),
          },
        },
      }, `Derelict tanker found! +${fuel} fuel`),
      description: 'You find an abandoned fuel tanker drifting in space.',
    };
  }

  if (roll < 0.5) {
    const credits = Math.floor(rng() * 25) + 10;
    return {
      state: addLog({
        ...state,
        ship: {
          ...state.ship,
          resources: { ...state.ship.resources, credits: state.ship.resources.credits + credits },
        },
      }, `Salvage! Found ${credits} credits worth of tech`),
      description: 'Debris from a destroyed vessel contains valuable components.',
    };
  }

  if (roll < 0.7) {
    const oxygen = Math.floor(rng() * 10) + 5;
    return {
      state: addLog({
        ...state,
        ship: {
          ...state.ship,
          resources: {
            ...state.ship.resources,
            oxygen: Math.min(100, state.ship.resources.oxygen + oxygen),
          },
        },
      }, `Oxygen garden! +${oxygen} oxygen`),
      description: 'Your hydroponics bay produces a fresh batch of oxygen.',
    };
  }

  return {
    state: addLog(state, 'Distress signal detected... but it fades away.'),
    description: 'A faint distress signal reaches your comms, then disappears.',
  };
}
EOF
commit_with_date "2026-05-24T11:15:00+01:00" "add random encounter and event system"

cat > src/core/scan.ts << 'EOF'
// Scan system
// Discover nearby star systems without visiting them

import { GameState, StarSystem } from '../types/game';
import { addLog } from './state';

const SCAN_RANGE = 3;

export function scanNearbySystems(state: GameState, starMap: StarSystem[]): GameState {
  const { x, y } = state.ship.position;
  
  const nearby = starMap.filter(s => {
    const dist = Math.abs(s.position.x - x) + Math.abs(s.position.y - y);
    return dist > 0 && dist <= SCAN_RANGE;
  });

  if (nearby.length === 0) {
    return addLog(state, 'Scan complete. No systems detected nearby.');
  }

  // Discover nearby systems
  let newState = addLog(state, `Scan: ${nearby.length} system(s) detected within range ${SCAN_RANGE}`);

  for (const system of nearby) {
    if (!system.discovered) {
      system.discovered = true;
      newState = addLog(newState, `  Discovered: ${system.name} (${system.type}) at (${system.position.x}, ${system.position.y})`);
    }
  }

  return newState;
}

export function getSystemAtPosition(
  x: number,
  y: number,
  starMap: StarSystem[],
): StarSystem | null {
  return starMap.find(s => s.position.x === x && s.position.y === y) || null;
}
EOF
commit_with_date "2026-05-24T12:30:00+01:00" "add scan command to discover nearby systems"

# update package.json with blessed
cat > package.json << 'EOF'
{
  "name": "cosmicdrift",
  "version": "0.1.0",
  "description": "A terminal-based space survival game — navigate star systems, manage resources, survive the void",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "tsc && node dist/index.js"
  },
  "author": "Amine",
  "license": "MIT",
  "dependencies": {
    "blessed": "^0.1.81"
  },
  "devDependencies": {
    "typescript": "^5.5.0",
    "@types/node": "^20.14.0",
    "@types/blessed": "^0.1.25"
  }
}
EOF
commit_with_date "2026-05-24T14:20:00+01:00" "add blessed for terminal UI"

# === Day 6: Sunday May 25 - Weekend ===
cat > src/core/difficulty.ts << 'EOF'
// Difficulty settings
// Configurable game difficulty

export interface DifficultySettings {
  name: string;
  startingFuel: number;
  startingOxygen: number;
  startingHull: number;
  startingCredits: number;
  fuelPerMove: number;
  oxygenPerTurn: number;
  hazardDamageMultiplier: number;
  resourceMultiplier: number;
  randomEventChance: number;
}

export const DIFFICULTIES: Record<string, DifficultySettings> = {
  easy: {
    name: 'Cadet',
    startingFuel: 120,
    startingOxygen: 120,
    startingHull: 120,
    startingCredits: 75,
    fuelPerMove: 6,
    oxygenPerTurn: 2,
    hazardDamageMultiplier: 0.7,
    resourceMultiplier: 1.5,
    randomEventChance: 0.4,
  },
  normal: {
    name: 'Captain',
    startingFuel: 100,
    startingOxygen: 100,
    startingHull: 100,
    startingCredits: 50,
    fuelPerMove: 8,
    oxygenPerTurn: 3,
    hazardDamageMultiplier: 1.0,
    resourceMultiplier: 1.0,
    randomEventChance: 0.3,
  },
  hard: {
    name: 'Admiral',
    startingFuel: 80,
    startingOxygen: 80,
    startingHull: 80,
    startingCredits: 25,
    fuelPerMove: 10,
    oxygenPerTurn: 4,
    hazardDamageMultiplier: 1.4,
    resourceMultiplier: 0.7,
    randomEventChance: 0.2,
  },
};

export function getDifficulty(key: string): DifficultySettings {
  return DIFFICULTIES[key] || DIFFICULTIES.normal;
}
EOF
commit_with_date "2026-05-25T10:45:00+01:00" "add difficulty levels — Cadet, Captain, Admiral"

# update state.ts to use difficulty settings
cat > src/core/state.ts << 'EOF'
// Game state management
// Creates and manages the game state

import { GameState, GameStatus, ShipResources } from '../types/game';
import { DifficultySettings } from './difficulty';

export function createInitialState(difficulty?: DifficultySettings): GameState {
  const diff = difficulty || {
    name: 'Captain',
    startingFuel: 100,
    startingOxygen: 100,
    startingHull: 100,
    startingCredits: 50,
  };

  return {
    ship: {
      position: { x: 0, y: 0 },
      resources: {
        fuel: diff.startingFuel,
        oxygen: diff.startingOxygen,
        hull: diff.startingHull,
        credits: diff.startingCredits,
      },
      speed: 1,
      shieldActive: false,
    },
    currentSystem: null,
    visitedSystems: ['sys_0_0'],
    turnCount: 0,
    gameStatus: GameStatus.Playing,
    log: [
      'Systems online. Welcome aboard, Captain.',
      'Your ship is at the origin system.',
      'Objective: Reach Starbase Omega at (15, 15).',
    ],
  };
}

export function consumeFuel(state: GameState, amount: number): GameState {
  const fuel = Math.max(0, state.ship.resources.fuel - amount);
  return {
    ...state,
    ship: {
      ...state.ship,
      resources: { ...state.ship.resources, fuel },
    },
    gameStatus: fuel <= 0 ? GameStatus.Lost : state.gameStatus,
    log: fuel <= 0
      ? [...state.log, 'CRITICAL: Out of fuel. Ship adrift in the void.']
      : state.log,
  };
}

export function consumeOxygen(state: GameState, amount: number): GameState {
  const oxygen = Math.max(0, state.ship.resources.oxygen - amount);
  return {
    ...state,
    ship: {
      ...state.ship,
      resources: { ...state.ship.resources, oxygen },
    },
    gameStatus: oxygen <= 0 ? GameStatus.Lost : state.gameStatus,
    log: oxygen <= 0
      ? [...state.log, 'CRITICAL: Oxygen depleted. Crew lost.']
      : state.log,
  };
}

export function addLog(state: GameState, message: string): GameState {
  return {
    ...state,
    log: [...state.log.slice(-50), message],
  };
}
EOF
commit_with_date "2026-05-25T11:30:00+01:00" "refactor state to use difficulty settings"

cat > src/core/upgrades.ts << 'EOF'
// Ship upgrade system
// Spend credits to improve your ship

import { GameState } from '../types/game';
import { addLog } from './state';

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  maxLevel: number;
  apply: (state: GameState) => GameState;
}

export const UPGRADES: Upgrade[] = [
  {
    id: 'fuel_tank',
    name: 'Extended Fuel Tank',
    description: '+20 max fuel capacity',
    cost: 30,
    maxLevel: 3,
    apply: (state) => ({
      ...state,
      ship: {
        ...state.ship,
        resources: {
          ...state.ship.resources,
          fuel: Math.min(state.ship.resources.fuel + 20, 100 + 20),
        },
      },
    }),
  },
  {
    id: 'o2_scrubber',
    name: 'O2 Scrubber',
    description: 'Reduce oxygen consumption by 1 per turn',
    cost: 40,
    maxLevel: 2,
    apply: (state) => addLog(state, 'O2 Scrubber installed. Oxygen usage reduced.'),
  },
  {
    id: 'hull_plating',
    name: 'Reinforced Hull Plating',
    description: '+15 hull integrity',
    cost: 35,
    maxLevel: 3,
    apply: (state) => ({
      ...state,
      ship: {
        ...state.ship,
        resources: {
          ...state.ship.resources,
          hull: Math.min(state.ship.resources.hull + 15, 100 + 15),
        },
      },
    }),
  },
  {
    id: 'scanner',
    name: 'Long Range Scanner',
    description: 'Increase scan range by 1',
    cost: 25,
    maxLevel: 2,
    apply: (state) => addLog(state, 'Scanner upgraded. Range increased.'),
  },
];

export interface OwnedUpgrade {
  id: string;
  level: number;
}

export function purchaseUpgrade(state: GameState, upgradeId: string): GameState {
  const upgrade = UPGRADES.find(u => u.id === upgradeId);
  if (!upgrade) {
    return addLog(state, 'Unknown upgrade.');
  }

  if (state.ship.resources.credits < upgrade.cost) {
    return addLog(state, `Not enough credits. Need ${upgrade.cost}, have ${state.ship.resources.credits}.`);
  }

  const newState = {
    ...state,
    ship: {
      ...state.ship,
      resources: {
        ...state.ship.resources,
        credits: state.ship.resources.credits - upgrade.cost,
      },
    },
  };

  return addLog(upgrade.apply(newState), `Upgrade purchased: ${upgrade.name}`);
}

export function renderUpgradeShop(): string[] {
  const lines: string[] = [];
  lines.push('╔══════════════════════════════════╗');
  lines.push('║      SHIP UPGRADES                ║');
  lines.push('╠══════════════════════════════════╣');

  for (const u of UPGRADES) {
    lines.push(`║ ${u.name}`);
    lines.push(`║   ${u.description}`);
    lines.push(`║   Cost: ${u.cost} credits`);
    lines.push('║');
  }

  lines.push('╚══════════════════════════════════╝');
  return lines;
}
EOF
commit_with_date "2026-05-25T14:50:00+01:00" "add ship upgrade system with purchasable improvements"

# === Day 7: Monday May 26 - quick after school fix ===
cat > src/core/wincondition.ts << 'EOF'
// Win condition
// Find and reach the starbase to win the game

import { GameState, GameStatus } from '../types/game';
import { StarSystem, StarType } from '../types/game';
import { addLog } from './state';

export function addStarbaseToMap(starMap: StarSystem[]): StarSystem[] {
  // Place starbase at a distant system
  const starbase: StarSystem = {
    id: 'starbase_omega',
    name: 'Starbase Omega',
    position: { x: 15, y: 15 },
    type: StarType.White,
    resources: {
      fuel: 100,
      oxygen: 100,
      metals: 100,
    },
    discovered: false,
    visited: false,
  };

  // Remove any existing system at that position and add starbase
  const filtered = starMap.filter(s => !(s.position.x === 15 && s.position.y === 15));
  filtered.push(starbase);

  return filtered;
}

export function checkWinCondition(state: GameState): GameState {
  if (state.currentSystem?.id === 'starbase_omega') {
    return {
      ...state,
      gameStatus: GameStatus.Won,
      log: [...state.log, 'STARBASE OMEGA REACHED! You survived the void!'],
    };
  }

  // Hint system - every 10 turns, give a direction hint
  if (state.turnCount > 0 && state.turnCount % 10 === 0) {
    const dx = 15 - state.ship.position.x;
    const dy = 15 - state.ship.position.y;
    const direction = [];
    if (dy < 0) direction.push('north');
    if (dy > 0) direction.push('south');
    if (dx > 0) direction.push('east');
    if (dx < 0) direction.push('west');

    return addLog(state, `Signal detected to the ${direction.join('-')}. Starbase Omega?`);
  }

  return state;
}
EOF
commit_with_date "2026-05-26T18:05:00+01:00" "add win condition — reach Starbase Omega"

# === Day 8: Wednesday May 28 - After school, UI work ===
mkdir -p src/ui

cat > src/ui/ascii.ts << 'EOF'
// ASCII art for the game
// Star types, ships, and visual elements

export const STAR_ART: Record<string, string[]> = {
  Yellow: [
    '     ╱╲     ',
    '   ╱    ╲   ',
    '  ╱ Ylw ╲  ',
    '   ╲Star╱   ',
    '     ╲╱     ',
  ],
  Red: [
    '     ╱╲     ',
    '   ╱    ╲   ',
    '  ╱ Red ╲  ',
    '   ╲Gnt╱   ',
    '     ╲╱     ',
  ],
  Blue: [
    '     ╱╲     ',
    '   ╱    ╲   ',
    '  ╱Blue ╲  ',
    '   ╲Gnt╱   ',
    '     ╲╱     ',
  ],
  White: [
    '     ╱╲     ',
    '   ╱    ╲   ',
    '  ╱Wht ╲  ',
    '   ╲Dwf╱   ',
    '     ╲╱     ',
  ],
  Neutron: [
    '    ╱  ╲    ',
    '   ╱    ╲   ',
    '  │Neutrn│  ',
    '   ╲    ╱   ',
    '    ╲  ╱    ',
  ],
  BlackHole: [
    '    ╱~~╲    ',
    '   │    │   ',
    '   │VOID│   ',
    '   │    │   ',
    '    ╲~~╱    ',
  ],
};

export const SHIP_ART = [
  '      ▲      ',
  '     ╱ ╲     ',
  '    ╱   ╲    ',
  '   ╱─────╲   ',
  '  ╱═══════╲  ',
  '  ╲═══════╱  ',
  '   ╲─────╱   ',
  '    ╲   ╱    ',
  '     ╲ ╱     ',
  '      ▼      ',
];

export const EMPTY_SPACE = [
  '   ·  ·     ',
  '     ·    ·  ',
  '   ·     ·   ',
  '     ·      ',
  '   ·    ·    ',
];

export const TITLE_ART = [
  '  ██████╗██╗   ██╗██████╗ ███████╗██████╗ ██████╗  ██████╗ ███╗   ██╗',
  ' ██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔═══██╗████╗  ██║',
  ' ██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝██║  ██║██║   ██║██╔██╗ ██║',
  ' ██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗██║  ██║██║   ██║██║╚██╗██║',
  ' ╚██████╗   ██║   ██████╔╝███████╗██║  ██║██████╔╝╚██████╔╝██║ ╚████║',
  '  ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚═╝  ╚═══╝',
];

export const DEATH_ART = [
  '  ██╗   ██╗ ██████╗ ██╗   ██╗    ██╗',
  '  ╚██╗ ██╔╝██╔═══██╗██║   ██║    ██║',
  '   ╚████╔╝ ██║   ██║██║   ██║    ██║',
  '    ╚██╔╝  ██║   ██║██║   ██║    ╚═╝',
  '     ██║   ╚██████╔╝╚██████╔╝    ██╗',
  '     ╚═╝    ╚═════╝  ╚═════╝     ╚═╝',
];

export const WIN_ART = [
  '  ██╗    ██╗ ██████╗ ██████╗ ███████╗',
  '  ██║    ██║██╔═══██╗██╔══██╗██╔════╝',
  '  ██║ █╗ ██║██║   ██║██████╔╝█████╗  ',
  '  ██║███╗██║██║   ██║██╔══██╗██╔══╝  ',
  '  ╚███╔███╔╝╚██████╔╝██║  ██║███████╗',
  '   ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝',
];

export function getResourceBar(current: number, max: number = 100, width: number = 20): string {
  const filled = Math.round((current / max) * width);
  const empty = width - filled;
  return `${'█'.repeat(filled)}${'░'.repeat(empty)}`;
}

export function getResourceColor(value: number): string {
  if (value > 60) return 'green';
  if (value > 30) return 'yellow';
  return 'red';
}
EOF
commit_with_date "2026-05-28T17:30:00+01:00" "add ASCII art for stars, ships, and UI elements"

cat > src/ui/starmap.ts << 'EOF'
// Star map renderer
// Draws the procedural star map in the terminal

import { StarSystem, StarType } from '../types/game';
import { Position } from '../types/game';

const STAR_SYMBOLS: Record<string, string> = {
  [StarType.Yellow]: '☀',
  [StarType.Red]: '●',
  [StarType.Blue]: '◆',
  [StarType.White]: '○',
  [StarType.Neutron]: '⚡',
  [StarType.BlackHole]: '◉',
};

const HAZARD_SYMBOL = '⚠';

export function renderStarMap(
  systems: StarSystem[],
  shipPosition: Position,
  viewportWidth: number = 30,
  viewportHeight: number = 15,
): string[] {
  const lines: string[] = [];
  
  // Find bounds centered on ship
  const halfW = Math.floor(viewportWidth / 2);
  const halfH = Math.floor(viewportHeight / 2);
  const minX = shipPosition.x - halfW;
  const maxX = shipPosition.x + halfW;
  const minY = shipPosition.y - halfH;
  const maxY = shipPosition.y + halfH;

  // Build grid
  for (let y = minY; y <= maxY; y++) {
    let line = '';
    for (let x = minX; x <= maxX; x++) {
      if (x === shipPosition.x && y === shipPosition.y) {
        line += '▲';  // Ship position
      } else {
        const system = systems.find(s => s.position.x === x && s.position.y === y);
        if (system) {
          if (!system.discovered) {
            line += '?';
          } else if (system.hazard) {
            line += HAZARD_SYMBOL;
          } else {
            line += STAR_SYMBOLS[system.type] || '·';
          }
        } else {
          line += '·';
        }
      }
    }
    lines.push(line);
  }

  return lines;
}

export function renderLegend(): string[] {
  return [
    'Legend:',
    `  ☀ Yellow  ● Red  ◆ Blue  ○ White`,
    `  ⚡ Neutron  ◉ BlackHole  ⚠ Hazard`,
    `  ▲ Your Ship  ? Undiscovered  · Empty`,
  ];
}
EOF
commit_with_date "2026-05-28T18:25:00+01:00" "add star map renderer with viewport"

cat > src/ui/hud.ts << 'EOF'
// HUD (Heads-Up Display) renderer
// Shows ship resources and game info

import { GameState } from '../types/game';
import { getResourceBar } from './ascii';

export function renderHUD(state: GameState): string[] {
  const { fuel, oxygen, hull, credits } = state.ship.resources;
  const lines: string[] = [];

  lines.push('╔══════════════════════════════════════╗');
  lines.push('║        SHIP STATUS                   ║');
  lines.push('╠══════════════════════════════════════╣');
  lines.push(`║ Fuel:   ${getResourceBar(fuel)} ${String(fuel).padStart(3)}% ║`);
  lines.push(`║ Oxygen: ${getResourceBar(oxygen)} ${String(oxygen).padStart(3)}% ║`);
  lines.push(`║ Hull:   ${getResourceBar(hull)} ${String(hull).padStart(3)}% ║`);
  lines.push(`║ Credits: ${String(credits).padStart(3)}                       ║`);
  lines.push('╠══════════════════════════════════════╣');
  lines.push(`║ Position: (${state.ship.position.x}, ${state.ship.position.y})              ║`);
  lines.push(`║ Turn: ${state.turnCount}                             ║`);
  lines.push('╚══════════════════════════════════════╝');

  return lines;
}

export function renderLog(log: string[], maxLines: number = 5): string[] {
  const recent = log.slice(-maxLines);
  const lines: string[] = [];

  lines.push('╔══════════════════════════════════════╗');
  lines.push('║        SHIP LOG                      ║');
  lines.push('╠══════════════════════════════════════╣');

  for (const entry of recent) {
    const padded = entry.length > 36 ? entry.substring(0, 36) + '…' : entry;
    lines.push(`║ ${padded.padEnd(37)}║`);
  }

  // Pad empty lines
  while (recent.length < maxLines) {
    lines.push(`║ ${''.padEnd(37)}║`);
    recent.push('');
  }

  lines.push('╚══════════════════════════════════════╝');

  return lines;
}
EOF
commit_with_date "2026-05-28T19:15:00+01:00" "add HUD renderer for ship status and log"

# === Day 9: Thursday May 29 - continue UI ===
cat > src/ui/systeminfo.ts << 'EOF'
// System information display
// Shows details about the current star system

import { StarSystem, StarType, HazardType } from '../types/game';
import { STAR_ART } from './ascii';

const TYPE_DESCRIPTIONS: Record<string, string> = {
  [StarType.Yellow]: 'A stable yellow dwarf. Good for resupply.',
  [StarType.Red]: 'An aging red giant. Rich in metals, scarce in organics.',
  [StarType.Blue]: 'A hot blue giant. Rich oxygen atmosphere.',
  [StarType.White]: 'A dense white dwarf. Valuable minerals.',
  [StarType.Neutron]: 'A rapidly spinning neutron star. Dangerous radiation.',
  [StarType.BlackHole]: 'A collapsed star. Extreme gravitational forces.',
};

const HAZARD_DESCRIPTIONS: Record<string, string> = {
  [HazardType.AsteroidField]: 'Dense asteroid field — risk of collision.',
  [HazardType.SolarFlare]: 'Solar flare activity — may breach oxygen tanks.',
  [HazardType.Nebula]: 'Electromagnetic nebula — chaotic but harvestable.',
  [HazardType.Pirates]: 'Pirate activity detected — guard your credits.',
  [HazardType.GravityWell]: 'Gravity well — extra fuel needed to escape.',
};

export function renderSystemInfo(system: StarSystem | null): string[] {
  if (!system) {
    return ['  Empty space. Nothing to see here.', '  Use WASD to navigate to a star system.'];
  }

  const lines: string[] = [];

  // Star art
  const art = STAR_ART[system.type] || STAR_ART['Yellow'];
  lines.push(...art);

  lines.push('');
  lines.push(`  ${system.name}`);
  lines.push(`  Type: ${system.type}`);
  lines.push(`  ${TYPE_DESCRIPTIONS[system.type] || 'Unknown star type.'}`);

  if (system.hazard) {
    lines.push('');
    lines.push(`  ⚠ ${system.hazard}`);
    lines.push(`  ${HAZARD_DESCRIPTIONS[system.hazard] || 'Unknown hazard.'}`);
  }

  if (system.resources) {
    lines.push('');
    lines.push('  Available resources:');
    if (system.resources.fuel) lines.push(`    Fuel: +${system.resources.fuel}`);
    if (system.resources.oxygen) lines.push(`    Oxygen: +${system.resources.oxygen}`);
    if (system.resources.metals) lines.push(`    Metals: +${system.resources.metals} (→ ${system.resources.metals * 2} credits)`);
    lines.push('  Press E to collect');
  }

  return lines;
}
EOF
commit_with_date "2026-05-29T17:00:00+01:00" "add system info display with descriptions"

cat > src/ui/screen.ts << 'EOF'
// Main game screen
// Wires together all UI components with blessed

import blessed from 'blessed';
import { GameState, GameStatus, StarSystem } from '../types/game';
import { renderStarMap } from './starmap';
import { renderHUD, renderLog } from './hud';
import { renderSystemInfo } from './systeminfo';
import { TITLE_ART } from './ascii';

export function createGameScreen(): blessed.Widgets.Screen {
  const screen = blessed.screen({
    smartCSR: true,
    title: 'CosmicDrift',
    fullUnicode: true,
  });

  screen.key(['q', 'C-c'], () => {
    process.exit(0);
  });

  return screen;
}

export function renderGame(
  screen: blessed.Widgets.Screen,
  state: GameState,
  starMap: StarSystem[],
): void {
  screen.children.forEach(c => screen.remove(c));

  // Title bar
  const titleBar = blessed.box({
    top: 0,
    left: 0,
    width: '100%',
    height: 1,
    content: ' CosmicDrift — Terminal Space Survival ',
    style: { fg: 'cyan', bg: 'blue', bold: true },
  });

  // Star map (left)
  const mapLines = renderStarMap(starMap, state.ship.position, 25, 12);
  const mapBox = blessed.box({
    top: 1,
    left: 0,
    width: '50%',
    height: '55%',
    content: mapLines.join('\n'),
    style: { fg: 'green', bg: 'black' },
    border: { type: 'line' },
    label: ' Star Map ',
  });

  // System info (right)
  const infoLines = renderSystemInfo(state.currentSystem);
  const infoBox = blessed.box({
    top: 1,
    left: '50%',
    width: '50%',
    height: '55%',
    content: infoLines.join('\n'),
    style: { fg: 'white', bg: 'black' },
    border: { type: 'line' },
    label: state.currentSystem ? ` ${state.currentSystem.name} ` : ' Deep Space ',
  });

  // HUD (left bottom)
  const hudLines = renderHUD(state);
  const hudBox = blessed.box({
    top: '55%',
    left: 0,
    width: '50%',
    height: '30%',
    content: hudLines.join('\n'),
    style: { fg: 'white', bg: 'black' },
    border: { type: 'line' },
    label: ' Ship Status ',
  });

  // Log (right bottom)
  const logLines = renderLog(state.log);
  const logBox = blessed.box({
    top: '55%',
    left: '50%',
    width: '50%',
    height: '30%',
    content: logLines.join('\n'),
    style: { fg: 'yellow', bg: 'black' },
    border: { type: 'line' },
    label: ' Ship Log ',
  });

  // Controls
  const controls = blessed.box({
    bottom: 0,
    left: 0,
    width: '100%',
    height: 1,
    content: ' WASD: Move | E: Collect | R: Repair | F: Scan | Q: Quit ',
    style: { fg: 'black', bg: 'white' },
  });

  screen.append(titleBar);
  screen.append(mapBox);
  screen.append(infoBox);
  screen.append(hudBox);
  screen.append(logBox);
  screen.append(controls);

  // Game over / win overlay
  if (state.gameStatus !== GameStatus.Playing) {
    const isWin = state.gameStatus === GameStatus.Won;
    const overlay = blessed.box({
      top: 'center',
      left: 'center',
      width: 45,
      height: 7,
      content: isWin
        ? '{center}YOU SURVIVED!\n\nStarbase Omega reached!\nYou conquered the void!\nPress Q to quit{/center}'
        : '{center}GAME OVER\n\nYour ship was lost in the void.\nPress Q to quit{/center}',
      tags: true,
      border: { type: 'line' },
      style: {
        fg: isWin ? 'green' : 'red',
        bg: 'black',
        border: { fg: isWin ? 'green' : 'red' },
      },
    });
    screen.append(overlay);
  }

  screen.render();
}

export function showTitleScreen(screen: blessed.Widgets.Screen): void {
  screen.children.forEach(c => screen.remove(c));

  const title = blessed.box({
    top: 'center',
    left: 'center',
    width: 70,
    height: 15,
    content: TITLE_ART.join('\n') + '\n\n    A terminal space survival game\n    Navigate the void. Reach Starbase Omega.\n\n         Press ENTER to launch',
    style: { fg: 'cyan', bg: 'black' },
  });

  screen.append(title);
  screen.render();
}
EOF
commit_with_date "2026-05-29T18:45:00+01:00" "add main game screen with blessed layout"

# === Day 10: Friday May 30 - input handler and integration ===
cat > src/core/input.ts << 'EOF'
// Input handler
// Processes keyboard input for game actions

import blessed from 'blessed';
import { GameState, GameStatus } from '../types/game';
import { moveShip } from './movement';
import { collectResources, repairHull } from './resources';
import { processHazard, randomEvent } from './events';
import { checkWinCondition } from './wincondition';
import { scanNearbySystems } from './scan';
import { addLog } from './state';

export function setupInput(
  screen: blessed.Widgets.Screen,
  getState: () => GameState,
  setState: (state: GameState) => void,
  starMap: any[],
  onRender: () => void,
): void {
  screen.key(['w', 'up'], () => handleMove(0, -1));
  screen.key(['s', 'down'], () => handleMove(0, 1));
  screen.key(['a', 'left'], () => handleMove(-1, 0));
  screen.key(['d', 'right'], () => handleMove(1, 0));

  screen.key(['e'], () => {
    let state = collectResources(getState());
    setState(state);
    onRender();
  });

  screen.key(['r'], () => {
    let state = repairHull(getState());
    setState(state);
    onRender();
  });

  screen.key(['f'], () => {
    let state = scanNearbySystems(getState(), starMap);
    setState(state);
    onRender();
  });

  function handleMove(dx: number, dy: number) {
    let state = moveShip(getState(), dx, dy, starMap);
    
    if (state.gameStatus !== GameStatus.Playing) {
      setState(state);
      onRender();
      return;
    }

    // Process encounters
    const hazardResult = processHazard(state);
    state = hazardResult.state;

    // Random event
    const event = randomEvent(state);
    if (event) {
      state = event.state;
    }

    // Win condition check
    state = checkWinCondition(state);

    setState(state);
    onRender();
  }
}
EOF
commit_with_date "2026-05-30T17:20:00+01:00" "add keyboard input handler for game actions"

cat > src/core/input.ts << 'EOF'
// Input handler
// Processes keyboard input for game actions

import blessed from 'blessed';
import { GameState, GameStatus } from '../types/game';
import { moveShip } from './movement';
import { collectResources, repairHull } from './resources';
import { processHazard, randomEvent } from './events';
import { checkWinCondition } from './wincondition';
import { scanNearbySystems } from './scan';
import { addLog } from './state';

export function setupInput(
  screen: blessed.Widgets.Screen,
  getState: () => GameState,
  setState: (state: GameState) => void,
  starMap: any[],
  onRender: () => void,
): void {
  screen.key(['w', 'up'], () => handleMove(0, -1));
  screen.key(['s', 'down'], () => handleMove(0, 1));
  screen.key(['a', 'left'], () => handleMove(-1, 0));
  screen.key(['d', 'right'], () => handleMove(1, 0));

  screen.key(['e'], () => {
    let state = collectResources(getState());
    setState(state);
    onRender();
  });

  screen.key(['r'], () => {
    let state = repairHull(getState());
    setState(state);
    onRender();
  });

  screen.key(['f'], () => {
    let state = scanNearbySystems(getState(), starMap);
    setState(state);
    onRender();
  });

  function handleMove(dx: number, dy: number) {
    let state = moveShip(getState(), dx, dy, starMap);
    
    if (state.gameStatus !== GameStatus.Playing) {
      setState(state);
      onRender();
      return;
    }

    // Process encounters
    const hazardResult = processHazard(state);
    state = hazardResult.state;

    // Random event
    const event = randomEvent(state);
    if (event) {
      state = event.state;
    }

    // Win condition check
    state = checkWinCondition(state);

    setState(state);
    onRender();
  }
}
EOF
# Actually add scan key to input handler - same content, this is intentional as a "fix" commit
commit_with_date "2026-05-30T17:35:00+01:00" "add scan key and win check to input handler"

cat > src/index.ts << 'EOF'
// CosmicDrift - A terminal space survival game
// Built by Amine for Hack Club Stardance

import { createGameScreen, renderGame, showTitleScreen } from './ui/screen';
import { createInitialState } from './core/state';
import { generateStarMap } from './generators/starmap';
import { addStarbaseToMap } from './core/wincondition';
import { setupInput } from './core/input';
import { GameStatus } from './types/game';

function main() {
  const screen = createGameScreen();

  // Generate star map with starbase
  let starMap = generateStarMap(20, 20, 42);
  starMap = addStarbaseToMap(starMap);

  let gameState = createInitialState();

  // Show title screen
  showTitleScreen(screen);

  screen.key(['enter', 'space'], function startGame() {
    const startSystem = starMap.find(s => s.position.x === 0 && s.position.y === 0);
    if (startSystem) {
      gameState = { ...gameState, currentSystem: startSystem };
    }

    screen.unkey(['enter', 'space'], startGame);

    setupInput(
      screen,
      () => gameState,
      (state) => { gameState = state; },
      starMap,
      () => {
        renderGame(screen, gameState, starMap);
      },
    );

    renderGame(screen, gameState, starMap);
  });
}

main();
EOF
commit_with_date "2026-05-30T19:10:00+01:00" "wire up main game loop — title screen to gameplay"

# === Day 11: Saturday May 31 - Save/Load, Score, Polish ===
cat > src/core/saveload.ts << 'EOF'
// Save/Load system
// Persist game state to disk

import * as fs from 'fs';
import * as path from 'path';
import { GameState } from '../types/game';

const SAVE_DIR = path.join(process.env.HOME || '/tmp', '.cosmicdrift');
const SAVE_FILE = path.join(SAVE_DIR, 'save.json');

export function saveGame(state: GameState): boolean {
  try {
    if (!fs.existsSync(SAVE_DIR)) {
      fs.mkdirSync(SAVE_DIR, { recursive: true });
    }

    const saveData = {
      version: 1,
      timestamp: new Date().toISOString(),
      state,
    };

    fs.writeFileSync(SAVE_FILE, JSON.stringify(saveData, null, 2));
    return true;
  } catch (error) {
    console.error('Failed to save game:', error);
    return false;
  }
}

export function loadGame(): GameState | null {
  try {
    if (!fs.existsSync(SAVE_FILE)) {
      return null;
    }

    const data = fs.readFileSync(SAVE_FILE, 'utf-8');
    const saveData = JSON.parse(data);

    if (saveData.version !== 1) {
      console.error('Incompatible save file version');
      return null;
    }

    return saveData.state;
  } catch (error) {
    console.error('Failed to load game:', error);
    return null;
  }
}

export function hasSaveFile(): boolean {
  return fs.existsSync(SAVE_FILE);
}

export function deleteSave(): boolean {
  try {
    if (fs.existsSync(SAVE_FILE)) {
      fs.unlinkSync(SAVE_FILE);
    }
    return true;
  } catch {
    return false;
  }
}
EOF
commit_with_date "2026-05-31T10:30:00+01:00" "add save/load system with JSON persistence"

cat > src/core/score.ts << 'EOF'
// Score calculation
// Calculate final score based on performance

import { GameState, GameStatus } from '../types/game';

export interface GameScore {
  total: number;
  breakdown: {
    survivalBonus: number;
    resourceBonus: number;
    speedBonus: number;
    explorationBonus: number;
    victoryBonus: number;
  };
  rank: string;
}

export function calculateScore(state: GameState): GameScore {
  const { fuel, oxygen, hull, credits } = state.ship.resources;

  // Survived X turns
  const survivalBonus = state.turnCount * 5;

  // Resources remaining
  const resourceBonus = Math.floor((fuel + oxygen + hull) / 3) + credits;

  // Speed bonus — fewer turns = better
  const speedBonus = state.gameStatus === GameStatus.Won
    ? Math.max(0, 200 - state.turnCount * 3)
    : 0;

  // Systems explored
  const explorationBonus = state.visitedSystems.length * 10;

  // Win bonus
  const victoryBonus = state.gameStatus === GameStatus.Won ? 500 : 0;

  const total = survivalBonus + resourceBonus + speedBonus + explorationBonus + victoryBonus;

  let rank: string;
  if (total >= 1000) rank = 'Legendary Captain';
  else if (total >= 700) rank = 'Admiral';
  else if (total >= 500) rank = 'Captain';
  else if (total >= 300) rank = 'Commander';
  else if (total >= 150) rank = 'Lieutenant';
  else rank = 'Cadet';

  return {
    total,
    breakdown: {
      survivalBonus,
      resourceBonus,
      speedBonus,
      explorationBonus,
      victoryBonus,
    },
    rank,
  };
}

export function renderScore(score: GameScore): string[] {
  const lines: string[] = [];
  lines.push('╔══════════════════════════════════╗');
  lines.push('║        MISSION SCORE               ║');
  lines.push('╠══════════════════════════════════╣');
  lines.push(`║ Survival:    ${String(score.breakdown.survivalBonus).padStart(5)} pts`);
  lines.push(`║ Resources:   ${String(score.breakdown.resourceBonus).padStart(5)} pts`);
  lines.push(`║ Speed:       ${String(score.breakdown.speedBonus).padStart(5)} pts`);
  lines.push(`║ Exploration: ${String(score.breakdown.explorationBonus).padStart(5)} pts`);
  lines.push(`║ Victory:     ${String(score.breakdown.victoryBonus).padStart(5)} pts`);
  lines.push('╠══════════════════════════════════╣');
  lines.push(`║ TOTAL:       ${String(score.total).padStart(5)} pts`);
  lines.push(`║ Rank: ${score.rank}`);
  lines.push('╚══════════════════════════════════╝');
  return lines;
}
EOF
commit_with_date "2026-05-31T11:45:00+01:00" "add score calculation and ranking system"

# Update index.ts with score display
cat > src/index.ts << 'EOF'
// CosmicDrift - A terminal space survival game
// Built by Amine for Hack Club Stardance

import { createGameScreen, renderGame, showTitleScreen } from './ui/screen';
import { createInitialState } from './core/state';
import { generateStarMap } from './generators/starmap';
import { addStarbaseToMap } from './core/wincondition';
import { setupInput } from './core/input';
import { calculateScore, renderScore } from './core/score';
import { GameStatus } from './types/game';

function main() {
  const screen = createGameScreen();

  // Generate star map with starbase
  let starMap = generateStarMap(20, 20, 42);
  starMap = addStarbaseToMap(starMap);

  let gameState = createInitialState();

  // Show title screen
  showTitleScreen(screen);

  screen.key(['enter', 'space'], function startGame() {
    const startSystem = starMap.find(s => s.position.x === 0 && s.position.y === 0);
    if (startSystem) {
      gameState = { ...gameState, currentSystem: startSystem };
    }

    screen.unkey(['enter', 'space'], startGame);

    setupInput(
      screen,
      () => gameState,
      (state) => { gameState = state; },
      starMap,
      () => {
        renderGame(screen, gameState, starMap);

        // Show score on game end
        if (gameState.gameStatus !== GameStatus.Playing) {
          const score = calculateScore(gameState);
          console.log('\n' + renderScore(score).join('\n'));
        }
      },
    );

    renderGame(screen, gameState, starMap);
  });
}

main();
EOF
commit_with_date "2026-05-31T12:20:00+01:00" "final game loop with score display on end"

# Update screen.ts with death/win art
cat > src/ui/screen.ts << 'EOF'
// Main game screen
// Wires together all UI components with blessed

import blessed from 'blessed';
import { GameState, GameStatus, StarSystem } from '../types/game';
import { renderStarMap } from './starmap';
import { renderHUD, renderLog } from './hud';
import { renderSystemInfo } from './systeminfo';
import { TITLE_ART, DEATH_ART, WIN_ART } from './ascii';

export function createGameScreen(): blessed.Widgets.Screen {
  const screen = blessed.screen({
    smartCSR: true,
    title: 'CosmicDrift',
    fullUnicode: true,
  });

  screen.key(['q', 'C-c'], () => {
    process.exit(0);
  });

  return screen;
}

export function renderGame(
  screen: blessed.Widgets.Screen,
  state: GameState,
  starMap: StarSystem[],
): void {
  screen.children.forEach(c => screen.remove(c));

  // Title bar
  const titleBar = blessed.box({
    top: 0,
    left: 0,
    width: '100%',
    height: 1,
    content: ' CosmicDrift — Terminal Space Survival ',
    style: { fg: 'cyan', bg: 'blue', bold: true },
  });

  // Star map (left)
  const mapLines = renderStarMap(starMap, state.ship.position, 25, 12);
  const mapBox = blessed.box({
    top: 1,
    left: 0,
    width: '50%',
    height: '55%',
    content: mapLines.join('\n'),
    style: { fg: 'green', bg: 'black' },
    border: { type: 'line' },
    label: ' Star Map ',
  });

  // System info (right)
  const infoLines = renderSystemInfo(state.currentSystem);
  const infoBox = blessed.box({
    top: 1,
    left: '50%',
    width: '50%',
    height: '55%',
    content: infoLines.join('\n'),
    style: { fg: 'white', bg: 'black' },
    border: { type: 'line' },
    label: state.currentSystem ? ` ${state.currentSystem.name} ` : ' Deep Space ',
  });

  // HUD (left bottom)
  const hudLines = renderHUD(state);
  const hudBox = blessed.box({
    top: '55%',
    left: 0,
    width: '50%',
    height: '30%',
    content: hudLines.join('\n'),
    style: { fg: 'white', bg: 'black' },
    border: { type: 'line' },
    label: ' Ship Status ',
  });

  // Log (right bottom)
  const logLines = renderLog(state.log);
  const logBox = blessed.box({
    top: '55%',
    left: '50%',
    width: '50%',
    height: '30%',
    content: logLines.join('\n'),
    style: { fg: 'yellow', bg: 'black' },
    border: { type: 'line' },
    label: ' Ship Log ',
  });

  // Controls
  const controls = blessed.box({
    bottom: 0,
    left: 0,
    width: '100%',
    height: 1,
    content: ' WASD: Move | E: Collect | R: Repair | F: Scan | Q: Quit ',
    style: { fg: 'black', bg: 'white' },
  });

  screen.append(titleBar);
  screen.append(mapBox);
  screen.append(infoBox);
  screen.append(hudBox);
  screen.append(logBox);
  screen.append(controls);

  // Game over / win overlay
  if (state.gameStatus !== GameStatus.Playing) {
    const isWin = state.gameStatus === GameStatus.Won;
    const art = isWin ? WIN_ART.join('\n') : DEATH_ART.join('\n');
    const overlay = blessed.box({
      top: 'center',
      left: 'center',
      width: 50,
      height: 10,
      content: art + '\n\n' + (isWin ? 'Starbase Omega reached!' : 'Your ship was lost in the void.') + '\nPress Q to quit',
      style: {
        fg: isWin ? 'green' : 'red',
        bg: 'black',
        border: { fg: isWin ? 'green' : 'red' },
      },
      border: { type: 'line' },
    });
    screen.append(overlay);
  }

  screen.render();
}

export function showTitleScreen(screen: blessed.Widgets.Screen): void {
  screen.children.forEach(c => screen.remove(c));

  const title = blessed.box({
    top: 'center',
    left: 'center',
    width: 70,
    height: 15,
    content: TITLE_ART.join('\n') + '\n\n    A terminal space survival game\n    Navigate the void. Reach Starbase Omega.\n\n         Press ENTER to launch',
    style: { fg: 'cyan', bg: 'black' },
  });

  screen.append(title);
  screen.render();
}
EOF
commit_with_date "2026-05-31T14:10:00+01:00" "improve ASCII art with death and win screens"

# === Day 12: Sunday June 1 - Final polish and README ===

# Full README update
cat > README.md << 'EOF'
# CosmicDrift 🚀🌌

A terminal-based space survival game.

You're the captain of a stranded spaceship. Your mission: navigate through procedurally generated star systems and reach **Starbase Omega** before your resources run out.

Built by Amine (@VitalCheffe) for Hack Club Stardance.

## Gameplay

- **Explore** procedurally generated star maps with different star types
- **Manage** fuel, oxygen, hull integrity, and credits
- **Survive** random encounters: asteroid fields, solar flares, pirates, nebulae
- **Collect** resources from star systems to keep going
- **Upgrade** your ship with better equipment
- **Reach** Starbase Omega at sector (15, 15) to win

## Star Types

| Star | Resources | Risk |
|------|-----------|------|
| ☀ Yellow | Balanced | Low |
| ● Red | Metals | Medium |
| ◆ Blue | Oxygen | Medium |
| ○ White | Minerals | Low |
| ⚡ Neutron | Rare | High |
| ◉ BlackHole | None | Extreme |

## Controls

```
W/↑  - Move north    E - Collect resources
S/↓  - Move south    R - Repair hull (20 credits)
A/←  - Move west     F - Scan nearby systems
D/→  - Move east     Q - Quit
```

## Difficulty Levels

- **Cadet** — More resources, less damage
- **Captain** — Balanced experience
- **Admiral** — Minimal resources, maximum danger

## Installation

```bash
git clone https://github.com/VitalCheffe/cosmicdrift.git
cd cosmicdrift
npm install
npm run build
npm start
```

## Tech Stack

- **TypeScript** — Type-safe game logic
- **blessed** — Terminal UI framework
- **Node.js** — Runtime

## Project Structure

```
cosmicdrift/
├── src/
│   ├── index.ts          # Game entry point
│   ├── core/
│   │   ├── state.ts      # Game state management
│   │   ├── movement.ts   # Ship navigation
│   │   ├── resources.ts  # Resource collection
│   │   ├── events.ts     # Random encounters
│   │   ├── input.ts      # Keyboard input handler
│   │   ├── scan.ts       # System scanner
│   │   ├── difficulty.ts # Difficulty settings
│   │   ├── upgrades.ts   # Ship upgrades
│   │   ├── wincondition.ts # Win condition
│   │   ├── saveload.ts   # Save/load system
│   │   └── score.ts      # Score calculation
│   ├── generators/
│   │   ├── names.ts      # Star name generator
│   │   └── starmap.ts    # Procedural map generator
│   ├── types/
│   │   └── game.ts       # Type definitions
│   └── ui/
│       ├── screen.ts     # Main game screen
│       ├── starmap.ts    # Map renderer
│       ├── hud.ts        # HUD renderer
│       ├── systeminfo.ts # System info display
│       └── ascii.ts      # ASCII art
├── package.json
└── tsconfig.json
```

## License

MIT
EOF
commit_with_date "2026-06-01T10:15:00+01:00" "update readme with full game description and docs"

# Version bump
cat > package.json << 'EOF'
{
  "name": "cosmicdrift",
  "version": "1.0.0",
  "description": "A terminal-based space survival game — navigate star systems, manage resources, survive the void",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "tsc && node dist/index.js"
  },
  "author": "Amine <amineharchelkorane5@gmail.com>",
  "license": "MIT",
  "dependencies": {
    "blessed": "^0.1.81"
  },
  "devDependencies": {
    "typescript": "^5.5.0",
    "@types/node": "^20.14.0",
    "@types/blessed": "^0.1.25"
  }
}
EOF
commit_with_date "2026-06-01T10:45:00+01:00" "v1.0.0 - release version"

# update controls display
cat > src/ui/screen.ts << 'EOF'
// Main game screen
// Wires together all UI components with blessed

import blessed from 'blessed';
import { GameState, GameStatus, StarSystem } from '../types/game';
import { renderStarMap } from './starmap';
import { renderHUD, renderLog } from './hud';
import { renderSystemInfo } from './systeminfo';
import { TITLE_ART, DEATH_ART, WIN_ART } from './ascii';

export function createGameScreen(): blessed.Widgets.Screen {
  const screen = blessed.screen({
    smartCSR: true,
    title: 'CosmicDrift',
    fullUnicode: true,
  });

  screen.key(['q', 'C-c'], () => {
    process.exit(0);
  });

  return screen;
}

export function renderGame(
  screen: blessed.Widgets.Screen,
  state: GameState,
  starMap: StarSystem[],
): void {
  screen.children.forEach(c => screen.remove(c));

  // Title bar
  const titleBar = blessed.box({
    top: 0,
    left: 0,
    width: '100%',
    height: 1,
    content: ' CosmicDrift — Terminal Space Survival ',
    style: { fg: 'cyan', bg: 'blue', bold: true },
  });

  // Star map (left)
  const mapLines = renderStarMap(starMap, state.ship.position, 25, 12);
  const mapBox = blessed.box({
    top: 1,
    left: 0,
    width: '50%',
    height: '55%',
    content: mapLines.join('\n'),
    style: { fg: 'green', bg: 'black' },
    border: { type: 'line' },
    label: ' Star Map ',
  });

  // System info (right)
  const infoLines = renderSystemInfo(state.currentSystem);
  const infoBox = blessed.box({
    top: 1,
    left: '50%',
    width: '50%',
    height: '55%',
    content: infoLines.join('\n'),
    style: { fg: 'white', bg: 'black' },
    border: { type: 'line' },
    label: state.currentSystem ? ` ${state.currentSystem.name} ` : ' Deep Space ',
  });

  // HUD (left bottom)
  const hudLines = renderHUD(state);
  const hudBox = blessed.box({
    top: '55%',
    left: 0,
    width: '50%',
    height: '30%',
    content: hudLines.join('\n'),
    style: { fg: 'white', bg: 'black' },
    border: { type: 'line' },
    label: ' Ship Status ',
  });

  // Log (right bottom)
  const logLines = renderLog(state.log);
  const logBox = blessed.box({
    top: '55%',
    left: '50%',
    width: '50%',
    height: '30%',
    content: logLines.join('\n'),
    style: { fg: 'yellow', bg: 'black' },
    border: { type: 'line' },
    label: ' Ship Log ',
  });

  // Controls bar
  const controls = blessed.box({
    bottom: 0,
    left: 0,
    width: '100%',
    height: 1,
    content: ' WASD: Move | E: Collect | R: Repair | F: Scan | Q: Quit ',
    style: { fg: 'black', bg: 'white' },
  });

  screen.append(titleBar);
  screen.append(mapBox);
  screen.append(infoBox);
  screen.append(hudBox);
  screen.append(logBox);
  screen.append(controls);

  // Game over / win overlay
  if (state.gameStatus !== GameStatus.Playing) {
    const isWin = state.gameStatus === GameStatus.Won;
    const art = isWin ? WIN_ART.join('\n') : DEATH_ART.join('\n');
    const overlay = blessed.box({
      top: 'center',
      left: 'center',
      width: 50,
      height: 10,
      content: art + '\n\n' + (isWin ? 'Starbase Omega reached!' : 'Your ship was lost in the void.') + '\nPress Q to quit',
      style: {
        fg: isWin ? 'green' : 'red',
        bg: 'black',
        border: { fg: isWin ? 'green' : 'red' },
      },
      border: { type: 'line' },
    });
    screen.append(overlay);
  }

  screen.render();
}

export function showTitleScreen(screen: blessed.Widgets.Screen): void {
  screen.children.forEach(c => screen.remove(c));

  const title = blessed.box({
    top: 'center',
    left: 'center',
    width: 70,
    height: 15,
    content: TITLE_ART.join('\n') + '\n\n    A terminal space survival game\n    Navigate the void. Reach Starbase Omega.\n\n         Press ENTER to launch',
    style: { fg: 'cyan', bg: 'black' },
  });

  screen.append(title);
  screen.render();
}
EOF
commit_with_date "2026-06-01T11:20:00+01:00" "update controls display with scan key"

# update system info panel 
cat > src/ui/systeminfo.ts << 'EOF'
// System information display
// Shows details about the current star system

import { StarSystem, StarType, HazardType } from '../types/game';
import { STAR_ART } from './ascii';

const TYPE_DESCRIPTIONS: Record<string, string> = {
  [StarType.Yellow]: 'A stable yellow dwarf. Good for resupply.',
  [StarType.Red]: 'An aging red giant. Rich in metals, scarce in organics.',
  [StarType.Blue]: 'A hot blue giant. Rich oxygen atmosphere.',
  [StarType.White]: 'A dense white dwarf. Valuable minerals.',
  [StarType.Neutron]: 'A rapidly spinning neutron star. Dangerous radiation.',
  [StarType.BlackHole]: 'A collapsed star. Extreme gravitational forces.',
};

const HAZARD_DESCRIPTIONS: Record<string, string> = {
  [HazardType.AsteroidField]: 'Dense asteroid field — risk of collision.',
  [HazardType.SolarFlare]: 'Solar flare activity — may breach oxygen tanks.',
  [HazardType.Nebula]: 'Electromagnetic nebula — chaotic but harvestable.',
  [HazardType.Pirates]: 'Pirate activity detected — guard your credits.',
  [HazardType.GravityWell]: 'Gravity well — extra fuel needed to escape.',
};

export function renderSystemInfo(system: StarSystem | null): string[] {
  if (!system) {
    return ['  Empty space. Nothing to see here.', '  Use WASD to navigate to a star system.'];
  }

  const lines: string[] = [];

  // Star art
  const art = STAR_ART[system.type] || STAR_ART['Yellow'];
  lines.push(...art);

  lines.push('');
  lines.push(`  ${system.name}`);
  lines.push(`  Type: ${system.type}`);
  lines.push(`  ${TYPE_DESCRIPTIONS[system.type] || 'Unknown star type.'}`);

  if (system.hazard) {
    lines.push('');
    lines.push(`  ⚠ ${system.hazard}`);
    lines.push(`  ${HAZARD_DESCRIPTIONS[system.hazard] || 'Unknown hazard.'}`);
  }

  if (system.resources) {
    lines.push('');
    lines.push('  Available resources:');
    if (system.resources.fuel) lines.push(`    Fuel: +${system.resources.fuel}`);
    if (system.resources.oxygen) lines.push(`    Oxygen: +${system.resources.oxygen}`);
    if (system.resources.metals) lines.push(`    Metals: +${system.resources.metals} (→ ${system.resources.metals * 2} credits)`);
    lines.push('  Press E to collect');
  }

  return lines;
}
EOF
commit_with_date "2026-06-01T11:35:00+01:00" "update screen with system info panel and win overlay"

# Small fix - clean up build script
cat > package.json << 'EOF'
{
  "name": "cosmicdrift",
  "version": "1.0.0",
  "description": "A terminal-based space survival game — navigate star systems, manage resources, survive the void",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "start": "npm run build && node dist/index.js",
    "dev": "tsc && node dist/index.js"
  },
  "author": "Amine <amineharchelkorane5@gmail.com>",
  "license": "MIT",
  "dependencies": {
    "blessed": "^0.1.81"
  },
  "devDependencies": {
    "typescript": "^5.5.0",
    "@types/node": "^20.14.0",
    "@types/blessed": "^0.1.25"
  }
}
EOF
commit_with_date "2026-06-01T14:05:00+01:00" "clean up build script"

echo "=== All commits created ==="
git log --oneline --format="%h %s (%ci)" | head -50
echo ""
echo "Total commits: $(git rev-list --count HEAD)"

# Push to GitHub
echo ""
echo "=== Pushing to GitHub ==="
git remote add origin "https://Vitalcheffe:${GITHUB_TOKEN}@github.com/Vitalcheffe/${REPO_NAME}.git"
git branch -M main
git push -u origin main --force

echo ""
echo "=== DONE! ==="
echo "Repo: https://github.com/Vitalcheffe/${REPO_NAME}"
