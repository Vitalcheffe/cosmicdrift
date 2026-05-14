import fs from 'fs';

// Helper to extract Pexels photo data from search JSON files
function extractPexelsFromSearch(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const startIdx = raw.indexOf('[');
    const endIdx = raw.lastIndexOf(']') + 1;
    if (startIdx === -1 || endIdx === 0) return [];
    const arr = JSON.parse(raw.substring(startIdx, endIdx));
    return arr
      .filter(r => r.url && r.url.includes('pexels.com/photo/'))
      .map(r => {
        const match = r.url.match(/pexels\.com\/photo\/.*?-([0-9]+)(?:\/)?$/);
        if (match) {
          const id = match[1];
          return {
            name: r.name.replace(/[·]/g, '-').trim(),
            id: id,
            directUrl: `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1920`,
            pageUrl: r.url,
            source: 'pexels'
          };
        }
        return null;
      })
      .filter(Boolean);
  } catch (e) {
    return [];
  }
}

// Helper to extract Unsplash photo data from search JSON files
function extractUnsplashFromSearch(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const startIdx = raw.indexOf('[');
    const endIdx = raw.lastIndexOf(']') + 1;
    if (startIdx === -1 || endIdx === 0) return [];
    const arr = JSON.parse(raw.substring(startIdx, endIdx));
    return arr
      .filter(r => r.url && r.url.includes('unsplash.com/photos/'))
      .map(r => {
        // Extract the shortcode (last segment after the final dash)
        const urlParts = r.url.split('/');
        const slug = urlParts[urlParts.length - 1];
        // The shortcode is the last part after the final dash
        const dashIdx = slug.lastIndexOf('-');
        const shortcode = dashIdx !== -1 ? slug.substring(dashIdx + 1) : slug;
        
        return {
          name: r.name.replace(/[·]/g, '-').trim(),
          shortcode: shortcode,
          pageUrl: r.url,
          source: 'unsplash'
        };
      })
      .filter(r => r.shortcode && r.shortcode.length > 5);
  } catch (e) {
    return [];
  }
}

// Load main search results
const mainResults = JSON.parse(fs.readFileSync('/home/z/my-project/search_results.json', 'utf8'));

// Process all results into organized categories
const organized = {
  mining: { open_pit_mine: [], smelter_furnace: [], mineral_processing: [], phosphate_mining: [] },
  cement: { factory_exterior: [], rotary_kiln: [], limestone_quarry: [], industrial: [] },
  datacenter: { server_room: [], gpu_rack: [], exterior: [], cooling: [] },
  agriculture: { aerial_drone: [], vertical_farming: [], iot_sensors: [], precision_farming: [] },
  water: { desalination: [], treatment: [], control_room: [], dam: [] },
  energy: { solar_farm: [], wind_farm: [], green_hydrogen: [], power_grid: [] },
  finance: { skyline: [], trading_floor: [], corporate_office: [] },
  technology: { satellite_station: [], cybersecurity_soc: [], satellite_space: [], network_ops: [] },
  overview: { casablanca: [], construction: [], cargo_port: [], industrial_port: [] }
};

// Map search categories to organized structure
const categoryMap = {
  mining_openpit: 'mining.open_pit_mine',
  mining_smelter: 'mining.smelter_furnace',
  mining_processing: 'mining.mineral_processing',
  mining_phosphate: 'mining.phosphate_mining',
  cement_factory: 'cement.factory_exterior',
  cement_kiln: 'cement.limestone_quarry',
  datacenter_server: 'datacenter.server_room',
  datacenter_gpu: 'datacenter.gpu_rack',
  datacenter_exterior: 'datacenter.exterior',
  agriculture_aerial: 'agriculture.aerial_drone',
  agriculture_vertical: 'agriculture.vertical_farming',
  agriculture_iot: 'agriculture.iot_sensors',
  water_desalination: 'water.desalination',
  water_dam: 'water.dam',
  water_control: 'water.treatment',
  energy_solar: 'energy.solar_farm',
  energy_wind: 'energy.wind_farm',
  energy_hydrogen: 'energy.power_grid',
  finance_skyline: 'finance.skyline',
  finance_trading: 'finance.trading_floor',
  finance_corporate: 'finance.corporate_office',
  tech_satellite: 'technology.satellite_station',
  tech_soc: 'technology.cybersecurity_soc',
  tech_space: 'technology.satellite_space',
  tech_noc: 'technology.network_ops',
  overview_casablanca: 'overview.casablanca',
  overview_construction: 'overview.construction',
  overview_port: 'overview.cargo_port',
  overview_industrial_port: 'overview.industrial_port'
};

function addToCategory(searchCat, photos) {
  const mappedPath = categoryMap[searchCat];
  if (!mappedPath) return;
  const [mainCat, subCat] = mappedPath.split('.');
  if (organized[mainCat] && organized[mainCat][subCat]) {
    organized[mainCat][subCat].push(...photos);
  }
}

// Process main search results
for (const [searchCat, photos] of Object.entries(mainResults)) {
  const processedPhotos = [];
  for (const photo of photos) {
    if (photo.url && photo.url.includes('pexels.com/photo/')) {
      const match = photo.url.match(/pexels\.com\/photo\/.*?-([0-9]+)(?:\/)?$/);
      if (match) {
        const id = match[1];
        processedPhotos.push({
          name: photo.name,
          directUrl: `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1920`,
          pageUrl: photo.url,
          source: 'pexels'
        });
      }
    } else if (photo.url && photo.url.includes('unsplash.com/photos/')) {
      const urlParts = photo.url.split('/');
      const slug = urlParts[urlParts.length - 1];
      const dashIdx = slug.lastIndexOf('-');
      const shortcode = dashIdx !== -1 ? slug.substring(dashIdx + 1) : slug;
      
      processedPhotos.push({
        name: photo.name,
        directUrl: `https://images.unsplash.com/photo-${shortcode}?w=1920&q=80`,
        pageUrl: photo.url,
        source: 'unsplash'
      });
    }
  }
  addToCategory(searchCat, processedPhotos);
}

// Process gap search results
const gapMapping = {
  '/tmp/gap_smelter.json': 'mining.smelter_furnace',
  '/tmp/gap_quarry.json': 'cement.limestone_quarry',
  '/tmp/gap_cooling.json': 'datacenter.cooling',
  '/tmp/gap_precision.json': 'agriculture.precision_farming',
  '/tmp/gap_desalination.json': 'water.desalination',
  '/tmp/gap_hydrogen.json': 'energy.green_hydrogen',
  '/tmp/gap_powergrid.json': 'energy.power_grid',
  '/tmp/gap_trading.json': 'finance.trading_floor',
  '/tmp/gap_satellite.json': 'technology.satellite_station',
  '/tmp/gap_noc.json': 'technology.network_ops',
  '/tmp/gap_phosphate.json': 'mining.phosphate_mining',
  '/tmp/gap_noc2.json': 'technology.network_ops',
  '/tmp/gap_kiln.json': 'cement.rotary_kiln',
  '/tmp/gap_desal2.json': 'water.desalination',
  '/tmp/gap_iot2.json': 'agriculture.iot_sensors',
};

for (const [filePath, mappedPath] of Object.entries(gapMapping)) {
  const [mainCat, subCat] = mappedPath.split('.');
  const photos = extractPexelsFromSearch(filePath);
  if (organized[mainCat] && organized[mainCat][subCat]) {
    organized[mainCat][subCat].push(...photos);
  }
}

// Deduplicate by directUrl
for (const [mainCat, subCats] of Object.entries(organized)) {
  for (const [subCat, photos] of Object.entries(subCats)) {
    const seen = new Set();
    organized[mainCat][subCat] = photos.filter(p => {
      if (seen.has(p.directUrl || p.pageUrl)) return false;
      seen.add(p.directUrl || p.pageUrl);
      return true;
    });
  }
}

// Count totals
let total = 0;
const summary = {};
for (const [mainCat, subCats] of Object.entries(organized)) {
  summary[mainCat] = {};
  for (const [subCat, photos] of Object.entries(subCats)) {
    summary[mainCat][subCat] = photos.length;
    total += photos.length;
  }
}

console.error(`Total images: ${total}`);
console.error(JSON.stringify(summary, null, 2));
console.log(JSON.stringify(organized, null, 2));
