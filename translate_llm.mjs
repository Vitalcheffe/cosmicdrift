import ZAI from 'z-ai-web-dev-sdk';
import { readFileSync, writeFileSync, existsSync } from 'fs';

const BATCH_SIZE = 25;
const RESULTS_FILE = '/tmp/llm_translations.json';

async function main() {
  const zai = await ZAI.create();
  const remaining = JSON.parse(readFileSync('/tmp/still_untranslated_v3.json', 'utf-8'));
  
  // Load existing results if any
  let allResults = {};
  if (existsSync(RESULTS_FILE)) {
    try { allResults = JSON.parse(readFileSync(RESULTS_FILE, 'utf-8')); } catch(e) {}
  }
  
  const sections = Object.keys(remaining);
  let totalTranslated = 0;
  
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
    
    for (let i = 0; i < items.length; i += BATCH_SIZE) {
      const batch = items.slice(i, i + BATCH_SIZE);
      const keysText = batch.map(([k, v]) => `"${k}" = "${v.replace(/"/g, '\\"')}"`).join('\n');
      
      const prompt = `Translate these English values to French for Harch Corp (African infrastructure company). Keep brand names (HarchOS, Harch Corp, etc.), tech terms (GPU, API, ISO, gCO2/kWh, etc.), proper nouns (Casablanca, Dakhla, Morocco), and placeholders like {current}/{total} unchanged. Return ONLY a JSON object with the same keys and French values. No markdown, no explanation.

${keysText}`;

      try {
        const completion = await zai.chat.completions.create({
          messages: [
            { role: 'system', content: 'Return only valid JSON object. No markdown blocks.' },
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
        console.log(`  ✓ ${section} batch ${Math.floor(i/BATCH_SIZE)+1}: ${Object.keys(translations).length} keys`);
      } catch (e) {
        console.error(`  ✗ ${section} batch ${Math.floor(i/BATCH_SIZE)+1}: ${e.message?.slice(0, 100)}`);
      }
      
      // Save progress after each batch
      allResults[section] = sectionResults;
      writeFileSync(RESULTS_FILE, JSON.stringify(allResults, null, 2));
      
      // Small delay
      await new Promise(r => setTimeout(r, 200));
    }
  }
  
  console.log(`\nTotal translated: ${totalTranslated}`);
}

main().catch(e => console.error('Fatal:', e.message));
