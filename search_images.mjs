import ZAI from 'z-ai-web-dev-sdk';

const zai = await ZAI.create();

const categories = [
  // Mining
  { query: "site:pexels.com/photo open pit mine", category: "mining_openpit" },
  { query: "site:pexels.com/photo mining smelter steel mill industrial furnace", category: "mining_smelter" },
  { query: "site:unsplash.com/photos mining mineral processing plant", category: "mining_processing" },
  { query: "site:pexels.com/photo phosphate mining quarry excavation", category: "mining_phosphate" },
  
  // Cement
  { query: "site:pexels.com/photo cement factory industrial plant", category: "cement_factory" },
  { query: "site:unsplash.com/photos cement rotary kiln limestone quarry", category: "cement_kiln" },
  
  // Data Center
  { query: "site:pexels.com/photo server room data center", category: "datacenter_server" },
  { query: "site:unsplash.com/photos GPU server rack computing data center", category: "datacenter_gpu" },
  { query: "site:pexels.com/photo data center building exterior technology", category: "datacenter_exterior" },
  
  // Agriculture
  { query: "site:pexels.com/photo aerial drone crops farmland", category: "agriculture_aerial" },
  { query: "site:unsplash.com/photos vertical farming indoor agriculture", category: "agriculture_vertical" },
  { query: "site:pexels.com/photo precision farming IoT sensors field agriculture", category: "agriculture_iot" },
  
  // Water
  { query: "site:pexels.com/photo desalination plant water treatment", category: "water_desalination" },
  { query: "site:unsplash.com/photos dam hydroelectric reservoir water", category: "water_dam" },
  { query: "site:pexels.com/photo water control room industrial facility", category: "water_control" },
  
  // Energy
  { query: "site:pexels.com/photo solar farm panels aerial", category: "energy_solar" },
  { query: "site:unsplash.com/photos wind farm turbines energy", category: "energy_wind" },
  { query: "site:pexels.com/photo hydrogen power grid electrical substation", category: "energy_hydrogen" },
  
  // Finance
  { query: "site:pexels.com/photo financial district skyline city", category: "finance_skyline" },
  { query: "site:unsplash.com/photos stock trading floor wall street", category: "finance_trading" },
  { query: "site:pexels.com/photo corporate office modern business", category: "finance_corporate" },
  
  // Technology
  { query: "site:unsplash.com/photos satellite ground station antenna", category: "tech_satellite" },
  { query: "site:pexels.com/photo cybersecurity operations center monitor", category: "tech_soc" },
  { query: "site:unsplash.com/photos satellite space orbit earth", category: "tech_space" },
  { query: "site:pexels.com/photo network operations center NOC screens", category: "tech_noc" },
  
  // Overview
  { query: "site:pexels.com/photo Casablanca Morocco city", category: "overview_casablanca" },
  { query: "site:unsplash.com/photos construction site crane building", category: "overview_construction" },
  { query: "site:pexels.com/photo cargo port container terminal shipping", category: "overview_port" },
  { query: "site:unsplash.com/photos industrial port harbor shipping", category: "overview_industrial_port" },
];

const allResults = {};

for (const cat of categories) {
  try {
    const results = await zai.functions.invoke('web_search', {
      query: cat.query,
      num: 10
    });
    
    // Filter for stock photo site URLs
    const photoUrls = results
      .filter(r => 
        r.url.includes('unsplash.com/photos/') || 
        r.url.includes('pexels.com/photo/') ||
        r.url.includes('pixabay.com/photos/') ||
        r.url.includes('pixabay.com/illustrations/')
      )
      .map(r => ({ name: r.name, url: r.url }));
    
    allResults[cat.category] = photoUrls;
    console.error(`${cat.category}: found ${photoUrls.length} photo URLs`);
  } catch (e) {
    console.error(`${cat.category}: error - ${e.message}`);
  }
}

// Output all results as JSON
console.log(JSON.stringify(allResults, null, 2));
