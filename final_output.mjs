import fs from 'fs';

const data = JSON.parse(fs.readFileSync('/home/z/my-project/compiled_results.json', 'utf8'));

// Generate a clean, organized output with exactly the categories requested
// Focus on Pexels direct URLs since they are confirmed working

const output = {};

// Category mapping to user's requested categories
const mapping = {
  "1_mining_open_pit_mine": { path: "mining.open_pit_mine", label: "Mining - Open Pit Mine" },
  "1_mining_smelter": { path: "mining.smelter_furnace", label: "Mining - Smelter/Furnace" },
  "1_mining_mineral_processing": { path: "mining.mineral_processing", label: "Mining - Mineral Processing Plant" },
  "1_mining_phosphate": { path: "mining.phosphate_mining", label: "Mining - Phosphate Mining" },
  "2_cement_factory": { path: "cement.factory_exterior", label: "Cement - Factory Exterior" },
  "2_cement_kiln": { path: "cement.rotary_kiln", label: "Cement - Rotary Kiln" },
  "2_cement_quarry": { path: "cement.limestone_quarry", label: "Cement - Limestone Quarry" },
  "2_cement_industrial": { path: "cement.factory_exterior", label: "Cement - Industrial" },
  "3_dc_server_room": { path: "datacenter.server_room", label: "Data Center - Server Room" },
  "3_dc_gpu_rack": { path: "datacenter.gpu_rack", label: "Data Center - GPU Server Rack" },
  "3_dc_exterior": { path: "datacenter.exterior", label: "Data Center - Exterior" },
  "3_dc_cooling": { path: "datacenter.cooling", label: "Data Center - Cooling" },
  "4_ag_aerial": { path: "agriculture.aerial_drone", label: "Agriculture - Aerial Drone Over Crops" },
  "4_ag_vertical": { path: "agriculture.vertical_farming", label: "Agriculture - Vertical Farming" },
  "4_ag_iot": { path: "agriculture.iot_sensors", label: "Agriculture - IoT Sensors in Field" },
  "4_ag_precision": { path: "agriculture.precision_farming", label: "Agriculture - Precision Farming" },
  "5_water_desalination": { path: "water.desalination", label: "Water - Desalination Plant" },
  "5_water_treatment": { path: "water.treatment", label: "Water - Treatment Facility" },
  "5_water_control": { path: "water.treatment", label: "Water - Control Room" },
  "5_water_dam": { path: "water.dam", label: "Water - Dam" },
  "6_energy_solar": { path: "energy.solar_farm", label: "Energy - Solar Farm" },
  "6_energy_wind": { path: "energy.wind_farm", label: "Energy - Wind Farm" },
  "6_energy_hydrogen": { path: "energy.green_hydrogen", label: "Energy - Green Hydrogen Plant" },
  "6_energy_grid": { path: "energy.power_grid", label: "Energy - Power Grid" },
  "7_finance_skyline": { path: "finance.skyline", label: "Finance - Financial District Skyline" },
  "7_finance_trading": { path: "finance.trading_floor", label: "Finance - Stock Trading Floor" },
  "7_finance_corporate": { path: "finance.corporate_office", label: "Finance - Corporate Office" },
  "8_tech_satellite_station": { path: "technology.satellite_station", label: "Technology - Satellite Ground Station" },
  "8_tech_soc": { path: "technology.cybersecurity_soc", label: "Technology - Cybersecurity SOC" },
  "8_tech_satellite_space": { path: "technology.satellite_space", label: "Technology - Satellite in Space" },
  "8_tech_noc": { path: "technology.network_ops", label: "Technology - Network Operations" },
  "9_overview_casablanca": { path: "overview.casablanca", label: "Overview - Casablanca Morocco" },
  "9_overview_construction": { path: "overview.construction", label: "Overview - Construction Site" },
  "9_overview_cargo_port": { path: "overview.cargo_port", label: "Overview - Cargo Port" },
  "9_overview_industrial_port": { path: "overview.industrial_port", label: "Overview - Industrial Port" },
};

function getPhotos(path) {
  const [main, sub] = path.split('.');
  if (data[main] && data[main][sub]) {
    return data[main][sub];
  }
  return [];
}

// Build the final output
let totalUrls = 0;
const results = {};

for (const [key, config] of Object.entries(mapping)) {
  const photos = getPhotos(config.path);
  // Take top 3 Pexels + top 2 Unsplash
  const pexels = photos.filter(p => p.source === 'pexels').slice(0, 3);
  const unsplash = photos.filter(p => p.source === 'unsplash').slice(0, 2);
  const combined = [...pexels, ...unsplash];
  
  results[key] = {
    label: config.label,
    photos: combined.map(p => ({
      name: p.name,
      url: p.source === 'pexels' ? p.directUrl : p.pageUrl,
      source: p.source,
      pageUrl: p.pageUrl
    }))
  };
  
  totalUrls += combined.length;
}

// Print the organized results
console.log(`TOTAL: ${totalUrls} image URLs across ${Object.keys(results).length} subcategories\n`);

for (const [key, val] of Object.entries(results)) {
  console.log(`\n=== ${val.label} ===`);
  for (const photo of val.photos) {
    const urlType = photo.source === 'pexels' ? 'DIRECT' : 'PAGE';
    console.log(`  [${urlType}] ${photo.name}`);
    console.log(`    ${photo.url}`);
  }
  if (val.photos.length === 0) {
    console.log(`  (No results - use related subcategories)`);
  }
}

// Also output just the URLs for easy copy-paste
console.log(`\n\n${'='.repeat(80)}`);
console.log('COPY-PASTE READY URLS (Pexels Direct Image URLs Only)');
console.log('='.repeat(80));

let pexelsCount = 0;
for (const [key, val] of Object.entries(results)) {
  const pexelsPhotos = val.photos.filter(p => p.source === 'pexels');
  if (pexelsPhotos.length > 0) {
    console.log(`\n# ${val.label}`);
    for (const photo of pexelsPhotos) {
      console.log(photo.url);
      pexelsCount++;
    }
  }
}

console.log(`\n# Total Pexels direct URLs: ${pexelsCount}`);
