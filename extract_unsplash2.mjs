import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

// Try one URL with longer wait
await page.goto("https://unsplash.com/photos/massive-dam-releasing-powerful-water-flow--7mHOd3QJpM", { 
  waitUntil: 'networkidle', 
  timeout: 30000 
});

// Wait for images to load
await page.waitForTimeout(5000);

// Get all image sources
const allImgs = await page.evaluate(() => {
  const imgs = document.querySelectorAll('img');
  return Array.from(imgs).map(img => ({ src: img.src, alt: img.alt })).filter(i => i.src.includes('unsplash'));
});

// Also try meta tags
const meta = await page.evaluate(() => {
  const allMeta = document.querySelectorAll('meta');
  return Array.from(allMeta).map(m => ({ 
    property: m.getAttribute('property') || m.getAttribute('name'), 
    content: m.getAttribute('content') 
  })).filter(m => m.content && m.content.includes('unsplash'));
});

console.log("Images found:", allImgs.length);
allImgs.forEach(i => console.log("  ", i.src.substring(0, 100)));
console.log("\nMeta found:", meta.length);
meta.forEach(m => console.log("  ", m.property, "->", m.content?.substring(0, 100)));

await browser.close();
