import fs from 'fs';

const data = JSON.parse(fs.readFileSync('/home/z/my-project/compiled_results.json', 'utf8'));

// Generate a clean markdown report with direct image URLs
let report = `# Industrial/Infrastructure Image URLs - Free Stock Photos
## Direct Downloadable Image URLs from Pexels & Unsplash

> **Total: ${Object.values(data).flatMap(c => Object.values(c)).flat().length} images across 9 categories**
> 
> **Pexels URLs** are direct image download links (format: \`images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg\`)
> **Unsplash URLs** link to photo pages where you can download the full-resolution image for free

---

`;

const categoryTitles = {
  mining: "1. MINING",
  cement: "2. CEMENT", 
  datacenter: "3. DATA CENTER / INTELLIGENCE",
  agriculture: "4. AGRICULTURE",
  water: "5. WATER",
  energy: "6. ENERGY",
  finance: "7. FINANCE",
  technology: "8. TECHNOLOGY",
  overview: "9. OVERVIEW"
};

const subcategoryTitles = {
  open_pit_mine: "Open Pit Mine",
  smelter_furnace: "Mining Smelter / Furnace",
  mineral_processing: "Mineral Processing Plant",
  phosphate_mining: "Phosphate Mining",
  factory_exterior: "Cement Factory Exterior",
  rotary_kiln: "Cement Rotary Kiln",
  limestone_quarry: "Limestone Quarry",
  industrial: "Cement Industrial",
  server_room: "Server Room",
  gpu_rack: "GPU Server Rack",
  exterior: "Data Center Exterior",
  cooling: "Data Center Cooling",
  aerial_drone: "Aerial Drone Over Crops",
  vertical_farming: "Vertical Farming",
  iot_sensors: "IoT Sensors in Field",
  precision_farming: "Precision Farming",
  desalination: "Desalination Plant",
  treatment: "Water Treatment Facility",
  control_room: "Water Control Room",
  dam: "Dam",
  solar_farm: "Solar Farm",
  wind_farm: "Wind Farm",
  green_hydrogen: "Green Hydrogen Plant",
  power_grid: "Power Grid",
  skyline: "Financial District Skyline",
  trading_floor: "Stock Trading Floor",
  corporate_office: "Corporate Office",
  satellite_station: "Satellite Ground Station",
  cybersecurity_soc: "Cybersecurity SOC",
  satellite_space: "Satellite in Space",
  network_ops: "Network Operations",
  casablanca: "Casablanca Morocco Cityscape",
  construction: "Construction Site",
  cargo_port: "Cargo Port",
  industrial_port: "Industrial Port"
};

let urlCount = 0;

for (const [mainCat, subCats] of Object.entries(data)) {
  report += `## ${categoryTitles[mainCat] || mainCat.toUpperCase()}\n\n`;
  
  for (const [subCat, photos] of Object.entries(subCats)) {
    const title = subcategoryTitles[subCat] || subCat;
    report += `### ${title}\n\n`;
    
    if (photos.length === 0) {
      report += `*No specific results found - see related subcategories*\n\n`;
      continue;
    }
    
    // Take top 3 photos per subcategory for the report
    const topPhotos = photos.slice(0, 3);
    
    for (const photo of topPhotos) {
      urlCount++;
      if (photo.source === 'pexels') {
        report += `- **[${photo.name}](${photo.pageUrl})**\n`;
        report += `  \`${photo.directUrl}\`\n\n`;
      } else {
        report += `- **[${photo.name}](${photo.pageUrl})** *(Unsplash)*\n`;
        report += `  Page: \`${photo.pageUrl}\`\n\n`;
      }
    }
  }
}

// Now generate the URL-only list (easy to copy-paste)
report += `\n---\n\n## DIRECT IMAGE URLS (Copy-Paste Ready)\n\n`;
report += `### Pexels Direct URLs\n\n\`\`\`\n`;

const pexelsUrls = [];
for (const [mainCat, subCats] of Object.entries(data)) {
  for (const [subCat, photos] of Object.entries(subCats)) {
    for (const photo of photos) {
      if (photo.source === 'pexels' && photo.directUrl) {
        pexelsUrls.push({ cat: `${mainCat}/${subCat}`, url: photo.directUrl, name: photo.name });
      }
    }
  }
}

for (const u of pexelsUrls) {
  report += `${u.url}  # ${u.cat} - ${u.name.substring(0, 60)}\n`;
}

report += `\`\`\`\n\n`;
report += `### Unsplash Photo Page URLs\n\n\`\`\`\n`;

const unsplashUrls = [];
for (const [mainCat, subCats] of Object.entries(data)) {
  for (const [subCat, photos] of Object.entries(subCats)) {
    for (const photo of photos) {
      if (photo.source === 'unsplash' && photo.pageUrl) {
        unsplashUrls.push({ cat: `${mainCat}/${subCat}`, url: photo.pageUrl, name: photo.name });
      }
    }
  }
}

for (const u of unsplashUrls) {
  report += `${u.url}  # ${u.cat} - ${u.name.substring(0, 60)}\n`;
}

report += `\`\`\`\n`;

console.log(report);
console.error(`\nTotal Pexels direct URLs: ${pexelsUrls.length}`);
console.error(`Total Unsplash page URLs: ${unsplashUrls.length}`);
console.error(`Grand total: ${pexelsUrls.length + unsplashUrls.length}`);
