/* ============================================
   CosmicDrift - Game Data
   ============================================ */

const BIOMES = {
  lunar_crater: {
    id: 'lunar_crater',
    name: 'Cratere Lunaire',
    color: '#3a3a4a',
    colorLight: '#4a4a5a',
    colorDark: '#2a2a3a',
    resources: { minerals: 3, helium3: 1, energy: 0, food: 0, credits: 0, oxygen: 0 },
    description: 'Terrain craterise, riche en mineraux.'
  },
  asteroid_field: {
    id: 'asteroid_field',
    name: 'Champ d\'Asteroides',
    color: '#5a5a5a',
    colorLight: '#6a6a6a',
    colorDark: '#4a4a4a',
    resources: { minerals: 2, helium3: 2, energy: 0, food: 0, credits: 0, oxygen: 0 },
    description: 'Asteroides denses, mineraux et He-3.'
  },
  nebula: {
    id: 'nebula',
    name: 'Nebuleuse',
    color: '#2a3a5a',
    colorLight: '#3a4a6a',
    colorDark: '#1a2a4a',
    resources: { minerals: 0, helium3: 3, energy: 1, food: 0, credits: 1, oxygen: 0 },
    description: 'Gaz cosmiques, He-3 et energie.'
  },
  telluric_planet: {
    id: 'telluric_planet',
    name: 'Planete Tellurique',
    color: '#3a5a3a',
    colorLight: '#4a6a4a',
    colorDark: '#2a4a2a',
    resources: { minerals: 1, helium3: 0, energy: 1, food: 3, credits: 1, oxygen: 2 },
    description: 'Planete rocheuse, agriculture et O2.'
  },
  gas_giant: {
    id: 'gas_giant',
    name: 'Geant Gazeux',
    color: '#5a4a3a',
    colorLight: '#6a5a4a',
    colorDark: '#4a3a2a',
    resources: { minerals: 0, helium3: 2, energy: 3, food: 0, credits: 2, oxygen: 0 },
    description: 'Geant gazeux, energie et He-3.'
  },
  debris_field: {
    id: 'debris_field',
    name: 'Champ de Debris',
    color: '#4a3a3a',
    colorLight: '#5a4a4a',
    colorDark: '#3a2a2a',
    resources: { minerals: 2, helium3: 0, energy: 0, food: 0, credits: 2, oxygen: 0 },
    description: 'Debris spatiaux, recyclage et credits.'
  }
};

const BIOME_IDS = Object.keys(BIOMES);

/* ---------- UNIT MODES ---------- */
const UNIT_MODES = {
  idle: {
    id: 'idle',
    name: 'Inactif',
    color: '#8888aa',
    shape: 'circle',
    desc: 'Unite stationnaire. Vision uniquement.'
  },
  defense: {
    id: 'defense',
    name: 'Defense',
    color: '#4d8bce',
    shape: 'square',
    desc: 'Patrouille les frontieres et repousse les menaces.'
  },
  exploration: {
    id: 'exploration',
    name: 'Exploration',
    color: '#3d9e6e',
    shape: 'triangle',
    desc: 'Explore automatiquement les zones inconnues.'
  },
  conquest: {
    id: 'conquest',
    name: 'Conquete',
    color: '#c4625a',
    shape: 'diamond',
    desc: 'Conquiert progressivement le territoire adjacent.'
  },
  harvest: {
    id: 'harvest',
    name: 'Recolte',
    color: '#c9a84c',
    shape: 'hexagon',
    desc: 'Recolte les ressources des tuiles riches.'
  }
};

/* ---------- ANOMALY TYPES ---------- */
const ANOMALY_TYPES = [
  {
    id: 'wreckage',
    name: 'Epave Spatiale',
    chance: 0.15,
    desc: 'Une epave derive dans l\'espace. Ressources recuperables.',
    effect: function(game, q, r) {
      const bonus = { minerals: Math.floor(Math.random() * 15) + 5, credits: Math.floor(Math.random() * 20) + 10 };
      for (const res in bonus) game.resources[res] += bonus[res];
      return 'Recuperation: +' + bonus.minerals + ' mineraux, +' + bonus.credits + ' credits.';
    }
  },
  {
    id: 'signal',
    name: 'Signal Misterieux',
    chance: 0.08,
    desc: 'Un signal d\'origine inconnue capte par vos scanners.',
    effect: function(game, q, r) {
      const roll = Math.random();
      if (roll < 0.4) {
        game.researchPoints += 30;
        return 'Donnees cryptees decodees: +30 recherche.';
      } else if (roll < 0.7) {
        game.resources.helium3 += 15;
        return 'Signal de resonance He-3: +15 He-3.';
      } else {
        game.resources.energy += 20;
        return 'Rayonnement energetique capte: +20 energie.';
      }
    }
  },
  {
    id: 'ruins',
    name: 'Ruines Antiques',
    chance: 0.05,
    desc: 'Des structures d\'une civilisation oubliee.',
    effect: function(game, q, r) {
      const roll = Math.random();
      if (roll < 0.3) {
        game.researchPoints += 50;
        return 'Technologie ancienne: +50 points de recherche!';
      } else if (roll < 0.6) {
        game.resources.credits += 60;
        game.resources.minerals += 30;
        return 'Artefacts echanges: +60 credits, +30 mineraux.';
      } else {
        game.resources.oxygen += 25;
        return 'Systeme de support vital ancien: +25 O2.';
      }
    }
  },
  {
    id: 'deposit',
    name: 'Gisement Cache',
    chance: 0.12,
    desc: 'Un gisement de ressources non detecte par les scans.',
    effect: function(game, q, r) {
      const tile = game.getTile(q, r);
      if (tile) {
        tile.bonusResources = { minerals: 3, credits: 2 };
      }
      return 'Gisement exploit! Production bonus sur cette tuile.';
    }
  }
];

/* ---------- THREAT TYPES ---------- */
const THREAT_TYPES = {
  pirate: {
    id: 'pirate',
    name: 'Pirates',
    color: '#aa4444',
    colorLight: '#cc5555',
    hp: 60,
    attack: 15,
    speed: 1,
    spawnChance: 0.025,
    desc: 'Vaisseaux pirates en maraude.'
  },
  swarm: {
    id: 'swarm',
    name: 'Essaim',
    color: '#8844aa',
    colorLight: '#9955bb',
    hp: 35,
    attack: 10,
    speed: 2,
    spawnChance: 0.015,
    desc: 'Essaim d\'insectoides cosmiques.'
  },
  storm: {
    id: 'storm',
    name: 'Tempete',
    color: '#4488aa',
    colorLight: '#5599bb',
    hp: 0,
    attack: 20,
    speed: 1,
    spawnChance: 0.02,
    desc: 'Tempete cosmique devastatrice.'
  }
};

/* ---------- ERAS ---------- */
const ERAS = [
  {
    id: 1,
    name: 'Survie',
    desc: 'Colonie naissante. Priorite a la survie et a l\'exploration.',
    color: '#8888aa',
    accentColor: '#6666aa',
    turnThreshold: 1,
    unitMoveBonus: 0
  },
  {
    id: 2,
    name: 'Expansion',
    desc: 'Expansion territoriale. Technologies avancees et diplomatie.',
    color: '#3d9e6e',
    accentColor: '#2d8e5e',
    turnThreshold: 12,
    unitMoveBonus: 1
  },
  {
    id: 3,
    name: 'Domination',
    desc: 'Domination spatiale. Armes, portails et conquete.',
    color: '#c4625a',
    accentColor: '#b4524a',
    turnThreshold: 25,
    unitMoveBonus: 1
  }
];

/* ---------- BUILDINGS ---------- */
const BUILDINGS = {
  dome_vital: {
    id: 'dome_vital',
    name: 'Dome Vital',
    cost: { credits: 80, minerals: 30, energy: 10 },
    production: { oxygen: 20 },
    cpCost: 2,
    techReq: null,
    eraReq: 1,
    description: 'Produit +20 O2 par tour. Essentiel.'
  },
  solar_panel: {
    id: 'solar_panel',
    name: 'Panneau Solaire',
    cost: { credits: 60, minerals: 20 },
    production: { energy: 15 },
    cpCost: 2,
    techReq: null,
    eraReq: 1,
    description: 'Produit +15 Energie par tour.'
  },
  hydro_farm: {
    id: 'hydro_farm',
    name: 'Ferme Hydroponique',
    cost: { credits: 70, minerals: 25, energy: 5 },
    production: { food: 25 },
    cpCost: 2,
    techReq: null,
    eraReq: 1,
    description: 'Produit +25 Nourriture par tour.'
  },
  deep_mine: {
    id: 'deep_mine',
    name: 'Mine Profonde',
    cost: { credits: 90, minerals: 10, energy: 15 },
    production: { minerals: 30 },
    cpCost: 2,
    techReq: 'extraction_1',
    eraReq: 1,
    description: 'Produit +30 Mineraux par tour. Requiert Extraction I.'
  },
  lab: {
    id: 'lab',
    name: 'Laboratoire',
    cost: { credits: 120, minerals: 40, energy: 20 },
    production: { research: 10 },
    cpCost: 2,
    techReq: null,
    eraReq: 1,
    description: 'Produit +10 Recherche par tour.'
  },
  clone_factory: {
    id: 'clone_factory',
    name: 'Usine de Clonage',
    cost: { credits: 200, minerals: 60, helium3: 15 },
    production: {},
    cpCost: 2,
    techReq: 'biology_1',
    eraReq: 2,
    description: 'Permet de creer des unites. Requiert Biologie I, Ere 2.'
  },
  black_market: {
    id: 'black_market',
    name: 'Marche Noir',
    cost: { credits: 150, helium3: 20 },
    production: { credits: 20 },
    cpCost: 2,
    techReq: 'commerce_2',
    eraReq: 2,
    description: 'Echanges a taux variable. +20 credits/tour. Requiert Commerce II, Ere 2.'
  },
  orbital_cannon: {
    id: 'orbital_cannon',
    name: 'Canon Orbital',
    cost: { credits: 300, minerals: 100, helium3: 40 },
    production: {},
    cpCost: 3,
    techReq: 'military_2',
    eraReq: 3,
    description: 'Tire sur les menaces a 3 hex. Requiert Militaire II, Ere 3.'
  },
  jump_portal: {
    id: 'jump_portal',
    name: 'Portail de Saut',
    cost: { credits: 400, minerals: 120, helium3: 50 },
    production: {},
    cpCost: 3,
    techReq: 'quantum_2',
    eraReq: 3,
    description: 'Teleporte les unites entre portails. Requiert Quantique II, Ere 3.'
  },
  planetary_shield: {
    id: 'planetary_shield',
    name: 'Bouclier Planetaire',
    cost: { credits: 250, minerals: 80, energy: 40 },
    production: { energy: -10 },
    cpCost: 3,
    techReq: 'military_1',
    eraReq: 3,
    description: 'Protege un rayon de 2 hex autour. -10 energie/tour. Requiert Militaire I, Ere 3.'
  },
  teleporter: {
    id: 'teleporter',
    name: 'Teleporteur',
    cost: { credits: 300, minerals: 80, helium3: 30 },
    production: {},
    cpCost: 2,
    techReq: 'quantum_2',
    eraReq: 2,
    description: 'Permet la teleportation d\'unites. Requiert Quantique II, Ere 2.'
  },
  reactor: {
    id: 'reactor',
    name: 'Reacteur',
    cost: { credits: 100, minerals: 30, helium3: 10 },
    production: { energy: 30 },
    cpCost: 2,
    techReq: 'energy_1',
    eraReq: 1,
    description: 'Produit +30 Energie par tour. Requiert Energie I.'
  }
};

/* ---------- TECH BRANCHES (descriptions corrigees) ---------- */
const TECH_BRANCHES = {
  extraction: {
    id: 'extraction',
    name: 'Extraction',
    levels: [
      { id: 'extraction_1', name: 'Extraction I', cost: 100, desc: 'Debloque Mine Profonde et Reacteur.' },
      { id: 'extraction_2', name: 'Extraction II', cost: 300, desc: '+25% production mineraux.' },
      { id: 'extraction_3', name: 'Extraction III', cost: 800, desc: '+50% production mineraux.' }
    ]
  },
  biology: {
    id: 'biology',
    name: 'Biologie',
    levels: [
      { id: 'biology_1', name: 'Biologie I', cost: 100, desc: 'Debloque Usine de Clonage. +10% nourriture.' },
      { id: 'biology_2', name: 'Biologie II', cost: 300, desc: '+25% nourriture. Unites +1 deplacement.' },
      { id: 'biology_3', name: 'Biologie III', cost: 800, desc: '+50% nourriture. O2 passif +10.' }
    ]
  },
  energy: {
    id: 'energy',
    name: 'Energie',
    levels: [
      { id: 'energy_1', name: 'Energie I', cost: 100, desc: 'Debloque Reacteur. +10% energie.' },
      { id: 'energy_2', name: 'Energie II', cost: 300, desc: '+25% production energie.' },
      { id: 'energy_3', name: 'Energie III', cost: 800, desc: '+50% energie. Stockage +200.' }
    ]
  },
  military: {
    id: 'military',
    name: 'Militaire',
    levels: [
      { id: 'military_1', name: 'Militaire I', cost: 100, desc: 'Debloque Bouclier Planetaire. +10 attaque unites.' },
      { id: 'military_2', name: 'Militaire II', cost: 300, desc: 'Debloque Canon Orbital. +20 attaque unites.' },
      { id: 'military_3', name: 'Militaire III', cost: 800, desc: 'Debloque arme spatiale. +30 attaque unites.' }
    ]
  },
  commerce: {
    id: 'commerce',
    name: 'Commerce',
    levels: [
      { id: 'commerce_1', name: 'Commerce I', cost: 100, desc: 'Echanges ameliores. +10% credits.' },
      { id: 'commerce_2', name: 'Commerce II', cost: 300, desc: 'Debloque Marche Noir. +25% credits.' },
      { id: 'commerce_3', name: 'Commerce III', cost: 800, desc: '+50% credits. Marche galactique.' }
    ]
  },
  quantum: {
    id: 'quantum',
    name: 'Quantique',
    levels: [
      { id: 'quantum_1', name: 'Quantique I', cost: 100, desc: 'Scan long portee. +2 vision.' },
      { id: 'quantum_2', name: 'Quantique II', cost: 300, desc: 'Debloque Teleporteur et Portail de Saut.' },
      { id: 'quantum_3', name: 'Quantique III', cost: 800, desc: 'Teleportation illimitee. +3 vision.' }
    ]
  }
};

/* ---------- FACTIONS ---------- */
const FACTIONS = {
  syndicate: {
    id: 'syndicate',
    name: 'Syndicat Stellaire',
    color: '#c9a84c',
    personality: 'commercial',
    baseRelation: 20,
    startQ: 0,
    startR: 0,
    description: 'Marchands interstellaires. Echanges favorables.'
  },
  hegemony: {
    id: 'hegemony',
    name: 'Hegemonie Grise',
    color: '#8888aa',
    personality: 'aggressive',
    baseRelation: -10,
    startQ: 0,
    startR: 0,
    description: 'Puissance militaire. Menace potentielle.'
  },
  collective: {
    id: 'collective',
    name: 'Collectif Vert',
    color: '#3d9e6e',
    personality: 'diplomatic',
    baseRelation: 30,
    startQ: 0,
    startR: 0,
    description: 'Ecologistes. Echanges de nourriture et O2.'
  },
  enclave: {
    id: 'enclave',
    name: 'Enclave Quantique',
    color: '#9a6ad4',
    personality: 'research',
    baseRelation: 0,
    startQ: 0,
    startR: 0,
    description: 'Chercheurs. Partagent des technologies.'
  },
  flotilla: {
    id: 'flotilla',
    name: 'Flottille Nomade',
    color: '#5a8ac4',
    personality: 'neutral',
    baseRelation: 10,
    startQ: 0,
    startR: 0,
    description: 'Nomades. Marchands occasionnels.'
  }
};

const CAPTAINS = {
  commandant: {
    id: 'commandant',
    name: 'Commandant',
    bonusCP: 2,
    bonusProduction: { credits: 20 },
    visionRange: 2,
    description: '+2 PA, +20 Credits/tour'
  },
  explorateur: {
    id: 'explorateur',
    name: 'Explorateur',
    bonusCP: 0,
    bonusProduction: { energy: 10 },
    visionRange: 4,
    description: '+3 Vision, +10 Energie/tour'
  },
  ingenieur: {
    id: 'ingenieur',
    name: 'Ingenieur',
    bonusCP: 0,
    bonusProduction: { minerals: 15 },
    visionRange: 2,
    buildDiscount: 0.25,
    description: '-25% cout construction, +15 Mineraux/tour'
  }
};

const EVENTS = [
  {
    id: 'asteroid_strike',
    name: 'Impact d\'Asteroide',
    text: 'Un asteroide a frappe une de vos colonies! Perte de ressources.',
    effect: function(game) {
      const damage = Math.floor(Math.random() * 20) + 10;
      game.resources.minerals = Math.max(0, game.resources.minerals - damage);
      return 'Perte de ' + damage + ' mineraux.';
    },
    chance: 0.08
  },
  {
    id: 'solar_flare',
    name: 'Eruption Solaire',
    text: 'Une eruption solaire booste vos panneaux!',
    effect: function(game) {
      const bonus = Math.floor(Math.random() * 15) + 10;
      game.resources.energy += bonus;
      return 'Gain de ' + bonus + ' energie!';
    },
    chance: 0.1
  },
  {
    id: 'trade_convoy',
    name: 'Convoi Commercial',
    text: 'Un convoi marchand vous offre des credits.',
    effect: function(game) {
      const bonus = Math.floor(Math.random() * 30) + 20;
      game.resources.credits += bonus;
      return 'Gain de ' + bonus + ' credits!';
    },
    chance: 0.1
  },
  {
    id: 'oxygen_leak',
    name: 'Fuite d\'Oxygen',
    text: 'Une fuite dans le systeme de support vital!',
    effect: function(game) {
      const damage = Math.floor(Math.random() * 10) + 5;
      game.resources.oxygen = Math.max(0, game.resources.oxygen - damage);
      return 'Perte de ' + damage + ' O2!';
    },
    chance: 0.06
  },
  {
    id: 'alien_relic',
    name: 'Relique Alien',
    text: 'Des chercheurs decouvrent une relique ancienne!',
    effect: function(game) {
      game.researchPoints += 25;
      return 'Gain de 25 points de recherche!';
    },
    chance: 0.07
  },
  {
    id: 'bountiful_harvest',
    name: 'Recolte Abondante',
    text: 'Les fermes hydroponiques produisent extra.',
    effect: function(game) {
      const bonus = Math.floor(Math.random() * 15) + 10;
      game.resources.food += bonus;
      return 'Gain de ' + bonus + ' nourriture!';
    },
    chance: 0.1
  }
];

const MAP_SIZES = {
  small: { cols: 20, rows: 14 },
  medium: { cols: 30, rows: 20 },
  large: { cols: 40, rows: 28 }
};
