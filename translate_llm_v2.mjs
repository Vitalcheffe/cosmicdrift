import ZAI from 'z-ai-web-dev-sdk';
import { readFileSync, writeFileSync, existsSync } from 'fs';

const BATCH_SIZE = 20;
const DELAY_MS = 5000; // 5 seconds between calls
const RESULTS_FILE = '/tmp/llm_translations_v2.json';

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  const zai = await ZAI.create();
  const remaining = JSON.parse(readFileSync('/tmp/still_untranslated_v3.json', 'utf-8'));
  
  let allResults = {};
  if (existsSync(RESULTS_FILE)) {
    try { allResults = JSON.parse(readFileSync(RESULTS_FILE, 'utf-8')); } catch(e) {}
  }
  
  // Process sections in order of size (smallest first for quick wins)
  const sections = Object.keys(remaining).sort((a, b) => remaining[a].length - remaining[b].length);
  let totalTranslated = 0;
  let apiCalls = 0;
  
  for (const section of sections) {
    const items = remaining[section];
    if (!items || items.length === 0) continue;
    
    // Skip if already done
    if (allResults[section] && Object.keys(allResults[section]).length >= items.length) {
      console.log(`  Skip ${section} (already done)`);
      continue;
    }
    
    console.log(`Processing ${section} (${items.length} keys)...`);
    const sectionResults = allResults[section] || {};
    let doneCount = Object.keys(sectionResults).length;
    
    for (let i = doneCount; i < items.length; i += BATCH_SIZE) {
      const batch = items.slice(i, Math.min(i + BATCH_SIZE, items.length));
      const keysText = batch.map(([k, v]) => `"${k}" = "${v.replace(/"/g, '\\"').replace(/\n/g, ' ')}"`).join('\n');
      
      const prompt = `Translate these English values to French for Harch Corp (African infrastructure company). Keep brand names (HarchOS, Harch Corp, HarchAgri, etc.), tech terms (GPU, API, ISO, gCO2/kWh, GDPR, SOC 2, PUE, MW, etc.), proper nouns (Casablanca, Dakhla, Morocco, Kenya, Gambia, etc.), variable placeholders {like} {this} unchanged. Return ONLY a JSON object with same keys and French values.

${keysText}`;

      try {
        const completion = await zai.chat.completions.create({
          messages: [
            { role: 'system', content: 'Return only valid JSON object. No markdown blocks. No explanation.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.1,
          max_tokens: 2000,
        });
        
        let response = completion.choices[0]?.message?.content?.trim();
        if (response.startsWith('```')) {
          response = response.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '');
        }
        
        const translations = JSON.parse(response);
        Object.assign(sectionResults, translations);
        totalTranslated += Object.keys(translations).length;
        apiCalls++;
        console.log(`  ✓ ${section} batch (${i}-${Math.min(i+BATCH_SIZE, items.length)}): ${Object.keys(translations).length} keys (total: ${totalTranslated}, calls: ${apiCalls})`);
      } catch (e) {
        const msg = e.message?.slice(0, 80) || 'Unknown error';
        console.error(`  ✗ ${section} batch: ${msg}`);
        if (msg.includes('429')) {
          console.log('  Rate limited, waiting 30s...');
          await sleep(30000);
          // Retry this batch
          i -= BATCH_SIZE;
          continue;
        }
      }
      
      allResults[section] = sectionResults;
      writeFileSync(RESULTS_FILE, JSON.stringify(allResults, null, 2));
      
      await sleep(DELAY_MS);
    }
  }
  
  console.log(`\nTotal translated: ${totalTranslated}`);
}

main().catch(e => console.error('Fatal:', e.message));
