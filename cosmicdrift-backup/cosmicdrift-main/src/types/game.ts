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
