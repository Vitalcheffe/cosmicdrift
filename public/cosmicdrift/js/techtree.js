/* ============================================================
   CosmicDrift - techtree.js
   Technology research tree with 4 eras
   ============================================================ */

const TechTree = (function () {
  'use strict';

  // ----------------------------------------------------------
  // Technology Definitions
  // ----------------------------------------------------------
  const TECH_DEFS = [
    // === ERA I: Survival ===
    {
      id: 'basic_engineering',
      name: 'Basic Engineering',
      era: 1,
      cost: 15,
      prerequisites: [],
      unlocks: ['research_lab', 'barracks', 'trade_post', 'heavy_soldier'],
      description: 'Fundamentals of construction and manufacturing.'
    },
    {
      id: 'water_recycling',
      name: 'Water Recycling',
      era: 1,
      cost: 12,
      prerequisites: [],
      unlocks: ['oxygen_boost'],
      description: 'Efficient water purification and recycling systems.'
    },
    {
      id: 'surface_scanning',
      name: 'Surface Scanning',
      era: 1,
      cost: 10,
      prerequisites: [],
      unlocks: ['resource_extraction'],
      description: 'Advanced surveying of the planet surface.'
    },
    {
      id: 'basic_medical',
      name: 'Basic Medical Care',
      era: 1,
      cost: 14,
      prerequisites: [],
      unlocks: ['genetic_enhancement'],
      description: 'Essential medical knowledge for colonial survival.'
    },

    // === ERA II: Expansion ===
    {
      id: 'force_fields',
      name: 'Force Fields',
      era: 2,
      cost: 30,
      prerequisites: ['basic_engineering'],
      unlocks: ['shield_gen'],
      description: 'Protective energy barriers for buildings and units.'
    },
    {
      id: 'resource_extraction',
      name: 'Deep Extraction',
      era: 2,
      cost: 25,
      prerequisites: ['surface_scanning'],
      unlocks: ['factory'],
      description: 'Advanced mining and resource gathering techniques.'
    },
    {
      id: 'oxygen_boost',
      name: 'Catalytic Synthesis',
      era: 2,
      cost: 20,
      prerequisites: ['water_recycling'],
      unlocks: ['atmospheric_terraforming'],
      description: 'Boosts oxygen production from water by 50%.'
    },
    {
      id: 'genetic_enhancement',
      name: 'Genetic Enhancement',
      era: 2,
      cost: 28,
      prerequisites: ['basic_medical'],
      unlocks: ['clone_optimization'],
      description: 'Genetic modifications for improved colonist efficiency.'
    },
    {
      id: 'diplomatic_protocols',
      name: 'Diplomatic Protocols',
      era: 2,
      cost: 22,
      prerequisites: ['basic_engineering'],
      unlocks: [],
      description: 'Improved communication with alien factions. +10 relations bonus.'
    },

    // === ERA III: Dominance ===
    {
      id: 'industrial_revolution',
      name: 'Industrial Revolution',
      era: 3,
      cost: 50,
      prerequisites: ['resource_extraction', 'basic_engineering'],
      unlocks: ['factory', 'command_center', 'assault_mech', 'artillery', 'commander'],
      description: 'Mass production and mechanized warfare.'
    },
    {
      id: 'clone_optimization',
      name: 'Clone Optimization',
      era: 3,
      cost: 40,
      prerequisites: ['genetic_enhancement'],
      unlocks: [],
      description: 'Improved clone stability and reduced costs.'
    },
    {
      id: 'advanced_shields',
      name: 'Advanced Shields',
      era: 3,
      cost: 45,
      prerequisites: ['force_fields'],
      unlocks: [],
      description: 'Enhanced defensive systems. Units gain +2 defense in friendly territory.'
    },

    // === ERA IV: Transcendence ===
    {
      id: 'singularity_drive',
      name: 'Singularity Drive',
      era: 4,
      cost: 80,
      prerequisites: ['industrial_revolution', 'advanced_shields'],
      unlocks: ['interstellar_beacon'],
      description: 'Faster-than-light communication. Enables Scientific Victory.'
    },
    {
      id: 'atmospheric_terraforming',
      name: 'Atmospheric Terraforming',
      era: 4,
      cost: 100,
      prerequisites: ['oxygen_boost', 'industrial_revolution'],
      unlocks: ['global_engine'],
      description: 'Transform the planet atmosphere. Enables Survival Victory.'
    },
  ];

  // ----------------------------------------------------------
  // State
  // ----------------------------------------------------------
  let techs = null;

  function init() {
    // Deep copy tech definitions
    techs = TECH_DEFS.map(t => ({
      ...t,
      researched: false,
      progress: 0
    }));
    return techs;
  }

  function getTechs() {
    return techs;
  }

  function getTech(id) {
    return techs ? techs.find(t => t.id === id) : null;
  }

  // ----------------------------------------------------------
  // Research Availability
  // ----------------------------------------------------------
  function isAvailable(techId) {
    const tech = getTech(techId);
    if (!tech) return false;
    if (tech.researched) return false;

    // Check all prerequisites are researched
    return tech.prerequisites.every(preId => {
      const pre = getTech(preId);
      return pre && pre.researched;
    });
  }

  function isLocked(techId) {
    const tech = getTech(techId);
    if (!tech) return true;
    if (tech.researched) return false;
    return !isAvailable(techId);
  }

  function canResearch(techId) {
    if (Game.STATE.currentResearch) return false;
    return isAvailable(techId);
  }

  // ----------------------------------------------------------
  // Start Research
  // ----------------------------------------------------------
  function startResearch(techId) {
    if (!canResearch(techId)) return false;

    Game.STATE.currentResearch = techId;
    Game.STATE.researchProgress = 0;

    const tech = getTech(techId);
    Game.emit('notification', {
      type: 'info',
      title: 'Research Started',
      text: `Now researching: ${tech.name}`
    });

    Game.emit('research:started', tech);
    return true;
  }

  // ----------------------------------------------------------
  // Get techs by era
  // ----------------------------------------------------------
  function getTechsByEra(era) {
    return techs ? techs.filter(t => t.era === era) : [];
  }

  // ----------------------------------------------------------
  // Get available techs (prerequisites met, not researched)
  // ----------------------------------------------------------
  function getAvailableTechs() {
    return techs ? techs.filter(t => isAvailable(t.id)) : [];
  }

  // ----------------------------------------------------------
  // Serialization
  // ----------------------------------------------------------
  function serialize() {
    return techs ? techs.map(t => ({ ...t })) : null;
  }

  function deserialize(data) {
    if (data) techs = data;
  }

  // ----------------------------------------------------------
  // Public API
  // ----------------------------------------------------------
  return {
    init,
    getTechs,
    getTech,
    isAvailable,
    isLocked,
    canResearch,
    startResearch,
    getTechsByEra,
    getAvailableTechs,
    serialize,
    deserialize
  };
})();
