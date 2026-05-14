import { chromium } from 'playwright';

const unsplashUrls = [
  { url: "https://unsplash.com/photos/massive-dam-releasing-powerful-water-flow--7mHOd3QJpM", cat: "dam" },
  { url: "https://unsplash.com/photos/construction-cranes-at-a-city-building-site-sJ1vN9Gxe5M", cat: "construction" },
  { url: "https://unsplash.com/photos/industrial-shipping-port-with-large-cranes-and-ships-8lH9S9XqsT0", cat: "port" },
  { url: "https://unsplash.com/photos/wind-turbines-generate-clean-energy-near-the-ocean-6LxhxBRk_HE", cat: "wind" },
  { url: "https://unsplash.com/photos/new-york-stock-exchange-building-with-american-flags-HpYTYo_jF2Y", cat: "finance" },
  { url: "https://unsplash.com/photos/a-satellite-in-orbit-with-the-earth-in-the-background-63eIRNS-hHc", cat: "satellite" },
  { url: "https://unsplash.com/photos/several-shelves-with-fresh-green-seedlings-of-various-kinds-of-vegetables-growing-inside-greenhouse-Tj9Tw8G5jkk", cat: "vertical_farming" },
  { url: "https://unsplash.com/photos/a-view-of-a-large-open-pit-in-the-middle-of-nowhere-4Gf51uY0YQE", cat: "mining" },
  { url: "https://unsplash.com/photos/gpu-mining-rigs-in-a-cryptocurrency-mining-facility-7qLFoAZhqHw", cat: "gpu" },
  { url: "https://unsplash.com/photos/hoover-dam-with-colorado-river-flowing-through-canyon-0M1ZM0kk95A", cat: "dam2" },
];

const browser = await chromium.launch({ headless: true });
const results = {};

for (const item of unsplashUrls) {
  try {
    const page = await browser.newPage();
    await page.goto(item.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    
    // Try to get og:image
    const ogImage = await page.evaluate(() => {
      const meta = document.querySelector('meta[property="og:image"]');
      return meta ? meta.getAttribute('content') : null;
    });
    
    // Try to get any image with images.unsplash.com
    const imgSrcs = await page.evaluate(() => {
      const imgs = document.querySelectorAll('img[src*="images.unsplash.com"]');
      return Array.from(imgs).map(img => img.src).slice(0, 3);
    });
    
    results[item.cat] = { ogImage, imgSrcs };
    console.error(`${item.cat}: ogImage=${ogImage ? 'found' : 'none'}, imgs=${imgSrcs.length}`);
    
    await page.close();
  } catch (e) {
    console.error(`${item.cat}: error - ${e.message}`);
  }
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
