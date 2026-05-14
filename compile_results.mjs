import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

// Extract Pexels IDs from search results
function extractPexelsIds(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    // Strip the emoji lines
    const jsonStr = raw.replace(/^[^\[]*/m, '').replace(/[^]]*$/m, '');
    const arr = JSON.parse(jsonStr.startsWith('[') ? jsonStr : raw.substring(raw.indexOf('['), raw.lastIndexOf(']') + 1));
    return arr
      .filter(r => r.url && r.url.includes('pexels.com/photo/'))
      .map(r => {
        const match = r.url.match(/pexels\.com\/photo\/.*?-([0-9]+)$/);
        if (match) {
          const id = match[1];
          return {
            name: r.name,
            pageUrl: r.url,
            directUrl: `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1920`,
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

// Extract Unsplash photo IDs
function extractUnsplashIds(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const jsonStr = raw.substring(raw.indexOf('['), raw.lastIndexOf(']') + 1);
    const arr = JSON.parse(jsonStr.startsWith('[') ? jsonStr : '[]');
    return arr
      .filter(r => r.url && r.url.includes('unsplash.com/photos/'))
      .map(r => {
        const match = r.url.match(/unsplash\.com\/photos\/(?:.*?-)?([a-zA-Z0-9_-]+)$/);
        if (match) {
          const id = match[1];
          return {
            name: r.name,
            pageUrl: r.url,
            directUrl: `https://images.unsplash.com/photo-${id}?w=1920&q=80`,
            source: 'unsplash'
          };
        }
        return null;
      })
      .filter(Boolean);
  } catch (e) {
    return [];
  }
}

// Compile results from the main search
const mainResults = JSON.parse(fs.readFileSync('/home/z/my-project/search_results.json', 'utf8'));

// Process Pexels URLs
const compiled = {};
for (const [category, photos] of Object.entries(mainResults)) {
  compiled[category] = [];
  for (const photo of photos) {
    if (photo.url && photo.url.includes('pexels.com/photo/')) {
      const match = photo.url.match(/pexels\.com\/photo\/.*?-([0-9]+)$/);
      if (match) {
        const id = match[1];
        compiled[category].push({
          name: photo.name,
          directUrl: `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1920`,
          pageUrl: photo.url,
          source: 'pexels'
        });
      }
    } else if (photo.url && photo.url.includes('unsplash.com/photos/')) {
      const match = photo.url.match(/unsplash\.com\/photos\/(?:.*?-)?([a-zA-Z0-9_-]+)$/);
      if (match) {
        const id = match[1];
        compiled[category].push({
          name: photo.name,
          directUrl: `https://images.unsplash.com/photo-${id}?w=1920&q=80`,
          pageUrl: photo.url,
          source: 'unsplash'
        });
      }
    }
  }
}

// Add gap search results
const gapFiles = {
  mining_smelter: '/tmp/gap_smelter.json',
  cement_kiln: '/tmp/gap_quarry.json',
  datacenter_exterior: '/tmp/gap_cooling.json',
  agriculture_iot: '/tmp/gap_precision.json',
  water_desalination: '/tmp/gap_desalination.json',
  energy_hydrogen: '/tmp/gap_hydrogen.json',
  energy_hydrogen: '/tmp/gap_powergrid.json',
  finance_trading: '/tmp/gap_trading.json',
  tech_satellite: '/tmp/gap_satellite.json',
  tech_noc: '/tmp/gap_noc.json',
};

for (const [category, filePath] of Object.entries(gapFiles)) {
  if (!compiled[category]) compiled[category] = [];
  const gapResults = extractPexelsIds(filePath);
  compiled[category].push(...gapResults);
}

// Remove duplicates by URL
for (const [category, photos] of Object.entries(compiled)) {
  const seen = new Set();
  compiled[category] = photos.filter(p => {
    if (seen.has(p.directUrl)) return false;
    seen.add(p.directUrl);
    return true;
  });
}

// Output summary
let total = 0;
for (const [category, photos] of Object.entries(compiled)) {
  console.error(`${category}: ${photos.length} photos`);
  total += photos.length;
}
console.error(`\nTotal: ${total} photos`);

// Output as JSON
console.log(JSON.stringify(compiled, null, 2));
