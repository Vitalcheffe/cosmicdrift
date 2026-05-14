import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

const results = JSON.parse(fs.readFileSync('/home/z/my-project/search_results.json', 'utf8'));

// Extract Pexels IDs and construct direct image URLs
function pexelsToDirectUrl(pageUrl) {
  const match = pageUrl.match(/pexels\.com\/photo\/[^-]+-([0-9]+)/);
  if (match) {
    const id = match[1];
    return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1920`;
  }
  // Try alternate pattern (some URLs have multiple segments)
  const match2 = pageUrl.match(/pexels\.com\/photo\/.*?-([0-9]+)$/);
  if (match2) {
    const id = match2[1];
    return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1920`;
  }
  return null;
}

// Extract Unsplash IDs 
function unsplashToPageUrl(pageUrl) {
  const match = pageUrl.match(/unsplash\.com\/photos\/.*?-([a-zA-Z0-9_-]+)$/);
  if (match) {
    return match[1]; // Return just the photo ID
  }
  // Try without dash separator (single slug)
  const match2 = pageUrl.match(/unsplash\.com\/photos\/([a-zA-Z0-9_-]+)$/);
  if (match2) {
    return match2[1];
  }
  return null;
}

// Process all results
const output = {};

for (const [category, photos] of Object.entries(results)) {
  output[category] = [];
  for (const photo of photos) {
    if (photo.url.includes('pexels.com/photo/')) {
      const directUrl = pexelsToDirectUrl(photo.url);
      if (directUrl) {
        output[category].push({
          name: photo.name,
          pageUrl: photo.url,
          directUrl: directUrl,
          source: 'pexels'
        });
      }
    } else if (photo.url.includes('unsplash.com/photos/')) {
      const photoId = unsplashToPageUrl(photo.url);
      if (photoId) {
        output[category].push({
          name: photo.name,
          pageUrl: photo.url,
          photoId: photoId,
          directUrl: `https://unsplash.com/photos/${photoId}/download?w=1920`, // placeholder, will need to resolve
          source: 'unsplash'
        });
      }
    }
  }
}

// Count total
let total = 0;
for (const [category, photos] of Object.entries(output)) {
  total += photos.length;
}

console.log(`Total photos found: ${total}`);
console.log(JSON.stringify(output, null, 2));
