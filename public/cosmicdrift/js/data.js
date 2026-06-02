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

const BUILDINGS = {
  dome_vital: {
    id: 'dome_vital',
    name: 'Dome Vital',
    cost: { credits: 80, minerals: 30, energy: 10 },
    production: { oxygen: 20 },
    cpCost: 2,
    techReq: null,
    description: 'Produit +20 O2 par tour. Essentiel.'
  },
  solar_panel: {
    id: 'solar_panel',
    name: 'Panneau Solaire',
    cost: { credits: 60, minerals: 20 },
    production: { energy: 15 },
    cpCost: 2,
    techReq: null,
    description: 'Produit +15 Energie par tour.'
  },
  hydro_farm: {
    id: 'hydro_farm',
    name: 'Ferme Hydroponique',
    cost: { credits: 70, minerals: 25, energy: 5 },
    production: { food: 25 },
    cpCost: 2,
    techReq: null,
    description: 'Produit +25 Nourriture par tour.'
  },
  deep_mine: {
    id: 'deep_mine',
    name: 'Mine Profonde',
    cost: { credits: 90, minerals: 10, energy: 15 },
    production: { minerals: 30 },
    cpCost: 2,
    techReq: 'extraction_1',
    description: 'Produit +30 Mineraux par tour. Requiert Extraction I.'
  },
  lab: {
    id: 'lab',
    name: 'Laboratoire',
    cost: { credits: 120, minerals: 40, energy: 20 },
    production: { research: 10 },
    cpCost: 2,
    techReq: null,
    description: 'Produit +10 Recherche par tour.'
  },
  clone_factory: {
    id: 'clone_factory',
    name: 'Usine de Clonage',
    cost: { credits: 200, minerals: 60, helium3: 15 },
    production: {},
    cpCost: 2,
    techReq: 'biology_1',
    description: 'Permet de creer des clones. Requiert Biologie I.'
  },
  teleporter: {
    id: 'teleporter',
    name: 'Teleporteur',
    cost: { credits: 300, minerals: 80, helium3: 30 },
    production: {},
    cpCost: 2,
    techReq: 'quantum_2',
    description: 'Permet la teleportation. Requiert Quantique II.'
  }
};

const TECH_BRANCHES = {
  extraction: {
    id: 'extraction',
    name: 'Extraction',
    levels: [
      { id: 'extraction_1', name: 'Extraction I', cost: 100, desc: 'Debloque Mine Profonde. +10% mineraux.' },
      { id: 'extraction_2', name: 'Extraction II', cost: 300, desc: '+25% production mineraux.' },
      { id: 'extraction_3', name: 'Extraction III', cost: 800, desc: '+50% production mineraux. Recyclage auto.' }
    ]
  },
  biology: {
    id: 'biology',
    name: 'Biologie',
    levels: [
      { id: 'biology_1', name: 'Biologie I', cost: 100, desc: 'Debloque Usine de Clonage. +10% nourriture.' },
      { id: 'biology_2', name: 'Biologie II', cost: 300, desc: '+25% production nourriture. Clones +1 PA.' },
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
      { id: 'military_1', name: 'Militaire I', cost: 100, desc: 'Bouclier defensif. +5 defense par colonie.' },
      { id: 'military_2', name: 'Militaire II', cost: 300, desc: 'Flotte offensive. Attaque possible.' },
      { id: 'military_3', name: 'Militaire III', cost: 800, desc: 'Arme spatiale. Puissance maximale.' }
    ]
  },
  commerce: {
    id: 'commerce',
    name: 'Commerce',
    levels: [
      { id: 'commerce_1', name: 'Commerce I', cost: 100, desc: 'Debloque echanges. +10% credits.' },
      { id: 'commerce_2', name: 'Commerce II', cost: 300, desc: '+25% credits. Routes commerciales.' },
      { id: 'commerce_3', name: 'Commerce III', cost: 800, desc: '+50% credits. Marche galactique.' }
    ]
  },
  quantum: {
    id: 'quantum',
    name: 'Quantique',
    levels: [
      { id: 'quantum_1', name: 'Quantique I', cost: 100, desc: 'Scan long portee. +2 vision.' },
      { id: 'quantum_2', name: 'Quantique II', cost: 300, desc: 'Debloque Teleporteur. Deplacement rapide.' },
      { id: 'quantum_3', name: 'Quantique III', cost: 800, desc: 'Teleportation illimitee. Vision totale.' }
    ]
  }
};

const FACTIONS = {
  syndicate: {
    id: 'syndicate',
    name: 'Syndicat Stellaire',
    color: '#c9a84c',
    personality: 'commercial',
    baseRelation: 20,
    description: 'Marchands interstellaires. Echanges favorables.'
  },
  hegemony: {
    id: 'hegemony',
    name: 'Hegemonie Grise',
    color: '#8888aa',
    personality: 'aggressive',
    baseRelation: -10,
    description: 'Puissance militaire. Menace potentielle.'
  },
  collective: {
    id: 'collective',
    name: 'Collectif Vert',
    color: '#3d9e6e',
    personality: 'diplomatic',
    baseRelation: 30,
    description: 'Ecologistes. Echanges de nourriture et O2.'
  },
  enclave: {
    id: 'enclave',
    name: 'Enclave Quantique',
    color: '#9a6ad4',
    personality: 'research',
    baseRelation: 0,
    description: 'Chercheurs. Partagent des technologies.'
  },
  flotilla: {
    id: 'flotilla',
    name: 'Flottille Nomade',
    color: '#5a8ac4',
    personality: 'neutral',
    baseRelation: 10,
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
