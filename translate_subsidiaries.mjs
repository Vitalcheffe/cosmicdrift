#!/usr/bin/env node
/**
 * Translate all untranslated subsidiaryDetail strings from EN to FR
 * using the z-ai-web-dev-sdk LLM API.
 * 
 * Strategy: Extract all untranslated strings, batch translate via LLM,
 * then patch them back into fr.json.
 */

import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

const EN_PATH = 'messages/en.json';
const FR_PATH = 'messages/fr.json';

const SUBSIDIARIES = ['intelligence', 'cement', 'energy', 'mining', 'technology', 'agriculture', 'water'];

// Fields that should NOT be translated (brand names, numbers, codes, etc.)
const DO_NOT_TRANSLATE_PATTERNS = [
  /^(Harch|HarchOS|HarchCorp|CoreWeave|Lambda|Vultr|Africa Data Centres|PAIX|Nvidia|NVIDIA|AWS|Azure|GCP|Google|Microsoft|Amazon)/i,
  /^\$[\d,.]+[BMK]?/i,        // Dollar amounts
  /^\d+[\s,.]*$/,              // Pure numbers
  /^#[0-9a-fA-F]{3,8}$/,      // Hex colors
  /^\/0\.\d+$/,               // Version tags
  /^(Q[1-4]\s*\d{4}|\d{4}\s*Q[1-4])$/,  // Quarters
  /^\d{4}$/,                   // Years
];

function shouldTranslate(str) {
  if (!str || typeof str !== 'string') return false;
  const trimmed = str.trim();
  if (!trimmed) return false;
  for (const pattern of DO_NOT_TRANSLATE_PATTERNS) {
    if (pattern.test(trimmed)) return false;
  }
  return true;
}

/**
 * Extract untranslated strings from EN/FR subsidiary objects.
 * Returns a flat list of { path, enValue } for strings that are identical in EN and FR.
 */
function extractUntranslated(enObj, frObj, basePath = '') {
  const results = [];
  
  if (typeof enObj === 'string' && typeof frObj === 'string') {
    if (enObj === frObj && shouldTranslate(enObj)) {
      results.push({ path: basePath, enValue: enObj });
    }
    return results;
  }
  
  if (Array.isArray(enObj) && Array.isArray(frObj)) {
    for (let i = 0; i < Math.min(enObj.length, frObj.length); i++) {
      results.push(...extractUntranslated(enObj[i], frObj[i], `${basePath}[${i}]`));
    }
    return results;
  }
  
  if (typeof enObj === 'object' && enObj !== null && typeof frObj === 'object' && frObj !== null) {
    for (const key of Object.keys(enObj)) {
      if (key in frObj) {
        results.push(...extractUntranslated(enObj[key], frObj[key], basePath ? `${basePath}.${key}` : key));
      }
    }
    return results;
  }
  
  return results;
}

/**
 * Set a nested value in an object using a path like "heroTitle" or "capabilities[0].title"
 */
function setNestedValue(obj, path, value) {
  const parts = path.split(/\.|\[|\]/).filter(Boolean);
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    const nextPart = parts[i + 1];
    if (Array.isArray(current)) {
      current = current[parseInt(part)];
    } else {
      current = current[part];
    }
  }
  const lastPart = parts[parts.length - 1];
  if (Array.isArray(current)) {
    current[parseInt(lastPart)] = value;
  } else {
    current[lastPart] = value;
  }
}

/**
 * Batch translate strings using the LLM
 */
async function translateBatch(zai, strings, subsidiary) {
  if (strings.length === 0) return [];
  
  // Build the prompt with all strings to translate
  const entries = strings.map((s, i) => `[${i}] ${s.enValue}`).join('\n');
  
  const prompt = `You are a professional French translator for a Moroccan industrial conglomerate website (Harch Corp). Translate the following English strings to French. 

Context: These are from the "${subsidiary}" subsidiary page of harchcorp.com — a Moroccan industrial conglomerate.

Rules:
- Use professional, formal French suitable for a corporate website
- "GPU" stays as "GPU" (not translated)
- "Carbon-aware" = "conscient du carbone"
- "Data center" = "centre de données"
- "Sovereign" = "souverain(e)"
- "Workload" = "charge de travail"
- "Scheduling" = "ordonnancement"
- "Pipeline" = "pipeline" (keep as-is in business context)
- "Hubs" = "hubs" (keep as-is)
- Keep proper nouns: Harch, HarchOS, Harch Intelligence, Morocco, Dakhla, Casablanca, etc.
- Keep technical terms: GPU, MW, kWh, gCO2, AI, API, etc.
- "Renewable energy" = "énergie renouvelable"
- "Carbon intensity" = "intensité carbone"
- Numbers with units stay the same format
- Do NOT translate the [N] index numbers
- Return ONLY the translations, one per line, with the same [N] index format
- Keep any \\n line breaks as-is

English strings to translate:
${entries}

French translations:`;

  try {
    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a professional French translator. Translate accurately and naturally. Keep technical terms and proper nouns unchanged. Return only the translated lines with their index numbers.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 4000,
    });

    const response = completion.choices[0]?.message?.content || '';
    
    // Parse the response
    const translations = {};
    const lines = response.split('\n');
    for (const line of lines) {
      const match = line.match(/^\[(\d+)\]\s*(.+)$/);
      if (match) {
        const idx = parseInt(match[1]);
        translations[idx] = match[2].trim();
      }
    }
    
    return strings.map((s, i) => ({
      ...s,
      frValue: translations[i] || s.enValue,  // Fallback to EN if translation missing
    }));
  } catch (error) {
    console.error(`Translation error for batch:`, error.message);
    return strings.map(s => ({ ...s, frValue: s.enValue }));
  }
}

async function main() {
  console.log('Loading translation files...');
  const en = JSON.parse(fs.readFileSync(EN_PATH, 'utf-8'));
  const fr = JSON.parse(fs.readFileSync(FR_PATH, 'utf-8'));
  
  const zai = await ZAI.create();
  
  let totalTranslated = 0;
  
  for (const subsidiary of SUBSIDIARIES) {
    console.log(`\n=== Processing: ${subsidiary} ===`);
    
    const enSub = en.subsidiaryDetail?.[subsidiary];
    const frSub = fr.subsidiaryDetail?.[subsidiary];
    
    if (!enSub || !frSub) {
      console.log(`  Skipping ${subsidiary} — not found in translation files`);
      continue;
    }
    
    // Extract untranslated strings
    const untranslated = extractUntranslated(enSub, frSub, subsidiary);
    console.log(`  Found ${untranslated.length} untranslated strings`);
    
    if (untranslated.length === 0) continue;
    
    // Process in batches of 30 to avoid token limits
    const BATCH_SIZE = 30;
    const allTranslations = [];
    
    for (let i = 0; i < untranslated.length; i += BATCH_SIZE) {
      const batch = untranslated.slice(i, i + BATCH_SIZE);
      console.log(`  Translating batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(untranslated.length / BATCH_SIZE)} (${batch.length} strings)...`);
      
      const results = await translateBatch(zai, batch, subsidiary);
      allTranslations.push(...results);
      
      // Small delay between batches
      if (i + BATCH_SIZE < untranslated.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    // Apply translations to fr.json
    let applied = 0;
    for (const t of allTranslations) {
      if (t.frValue !== t.enValue) {
        setNestedValue(fr.subsidiaryDetail, t.path, t.frValue);
        applied++;
      }
    }
    
    totalTranslated += applied;
    console.log(`  Applied ${applied} translations`);
  }
  
  // Save the updated fr.json
  console.log(`\nSaving updated fr.json...`);
  fs.writeFileSync(FR_PATH, JSON.stringify(fr, null, 2) + '\n', 'utf-8');
  
  console.log(`\n✅ Done! Total translations applied: ${totalTranslated}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
