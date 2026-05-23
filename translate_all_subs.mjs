#!/usr/bin/env node
/**
 * Translate ALL remaining subsidiaryDetail strings from EN to FR
 * using the z-ai-web-dev-sdk LLM API with rate limiting.
 */

import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

const EN_PATH = 'messages/en.json';
const FR_PATH = 'messages/fr.json';

const SUBSIDIARIES = ['cement', 'energy', 'mining', 'technology', 'agriculture', 'water'];

const DO_NOT_TRANSLATE_PATTERNS = [
  /^(Harch|HarchOS|HarchCorp|CoreWeave|Lambda|Vultr|Africa Data Centres|PAIX|Nvidia|NVIDIA|AWS|Azure|GCP|Google|Microsoft|Amazon|Cemenco|Dangote|Ghana|Nigeria|Scatec|ACWA|Nareva|OCP|Managem|SOTHEMA|COSUMAR|SONASID|LafargeHolcim)/i,
  /^\$[\d,.]+[BMK]?/i,
  /^\d+[\s,.]*$/,
  /^#[0-9a-fA-F]{3,8}$/,
  /^\/0\.\d+$/,
  /^(Q[1-4]\s*\d{4}|\d{4}\s*Q[1-4])$/,
  /^\d{4}$/,
];

function shouldTranslate(str) {
  if (!str || typeof str !== 'string') return false;
  const t = str.trim();
  if (!t) return false;
  if (t.length <= 2) return false; // Skip very short strings like "M", "5", etc.
  for (const p of DO_NOT_TRANSLATE_PATTERNS) {
    if (p.test(t)) return false;
  }
  return true;
}

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
  }
  return results;
}

function setNestedValue(obj, path, value) {
  const parts = [];
  let current = '';
  for (const ch of path) {
    if (ch === '.' || ch === '[' || ch === ']') {
      if (current) parts.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  if (current) parts.push(current);
  
  let target = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (Array.isArray(target)) {
      target = target[parseInt(part)];
    } else {
      target = target[part];
    }
  }
  const lastPart = parts[parts.length - 1];
  if (Array.isArray(target)) {
    target[parseInt(lastPart)] = value;
  } else {
    target[lastPart] = value;
  }
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function translateBatch(zai, strings, subsidiary) {
  if (strings.length === 0) return [];
  
  const entries = strings.map((s, i) => `[${i}] ${s.enValue}`).join('\n');
  
  const contextMap = {
    cement: 'ciment/manufacture (Harch Cement)',
    energy: 'énergie renouvelable/solaire/éolien/hydrogène vert (Harch Energy)',
    mining: 'mines/extraction minière/phosphates/cobalt (Harch Mining)',
    technology: 'technologie/satellite/cybersécurité/communications (Harch Technology)',
    agriculture: 'agriculture de précision/IoT/drones/agriculture verticale (Harch Agri)',
    water: "dessalement/traitement de l'eau/distribution (Harch Water)",
  };
  
  const context = contextMap[subsidiary] || subsidiary;

  const prompt = `Translate these English strings to French for a Moroccan industrial conglomerate website (Harch Corp — ${context} subsidiary). Rules:
- Professional corporate French
- Keep: GPU, MW, kWh, gCO2, AI, API, IoT, PUE, IRR, NPV, CAGR, SLA, ESG, ISO, SOC, GDPR, MW, GW, kT, MWh, CO2
- Keep proper nouns: Harch, HarchOS, Morocco, Dakhla, Casablanca, etc.
- "Carbon-aware" = "conscient du carbone"
- "Data center/centre" = "centre de données"
- "Sovereign" = "souverain(e)"
- "Workload" = "charge de travail"
- "Scheduling" = "ordonnancement"
- Keep \\n line breaks as-is
- Return ONLY translations with [N] index format, one per line

${entries}

French translations:`;

  try {
    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'system', content: 'Professional French translator. Return only translated lines with [N] indexes.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.2,
      max_tokens: 4000,
    });

    const response = completion.choices[0]?.message?.content || '';
    const translations = {};
    for (const line of response.split('\n')) {
      const match = line.match(/^\[(\d+)\]\s*([\s\S]+)$/);
      if (match) {
        translations[parseInt(match[1])] = match[2].trim();
      }
    }
    
    return strings.map((s, i) => ({
      ...s,
      frValue: translations[i] || s.enValue,
    }));
  } catch (error) {
    console.error(`  Translation error: ${error.message}`);
    return strings.map(s => ({ ...s, frValue: s.enValue }));
  }
}

async function main() {
  console.log('Loading translation files...');
  const en = JSON.parse(fs.readFileSync(EN_PATH, 'utf-8'));
  const fr = JSON.parse(fs.readFileSync(FR_PATH, 'utf-8'));
  
  const zai = await ZAI.create();
  
  let grandTotal = 0;
  
  for (const subsidiary of SUBSIDIARIES) {
    console.log(`\n=== Processing: ${subsidiary} ===`);
    
    const enSub = en.subsidiaryDetail?.[subsidiary];
    const frSub = fr.subsidiaryDetail?.[subsidiary];
    
    if (!enSub || !frSub) {
      console.log(`  Skipping — not found`);
      continue;
    }
    
    const untranslated = extractUntranslated(enSub, frSub, subsidiary);
    console.log(`  Found ${untranslated.length} untranslated strings`);
    
    if (untranslated.length === 0) continue;
    
    const shortStrings = untranslated.filter(s => s.enValue.length < 100);
    const longStrings = untranslated.filter(s => s.enValue.length >= 100);
    
    const allTranslations = [];
    
    // Short strings: batches of 15, with 2s delay
    for (let i = 0; i < shortStrings.length; i += 15) {
      const batch = shortStrings.slice(i, i + 15);
      console.log(`  Short batch ${Math.floor(i/15)+1} (${batch.length} strings)...`);
      try {
        const results = await translateBatch(zai, batch, subsidiary);
        allTranslations.push(...results);
      } catch (e) {
        console.error(`  Batch error: ${e.message}`);
        allTranslations.push(...batch.map(s => ({ ...s, frValue: s.enValue })));
      }
      await sleep(2000); // Rate limiting
    }
    
    // Long strings: batches of 3, with 3s delay
    for (let i = 0; i < longStrings.length; i += 3) {
      const batch = longStrings.slice(i, i + 3);
      console.log(`  Long batch ${Math.floor(i/3)+1} (${batch.length} strings)...`);
      try {
        const results = await translateBatch(zai, batch, subsidiary);
        allTranslations.push(...results);
      } catch (e) {
        console.error(`  Batch error: ${e.message}`);
        allTranslations.push(...batch.map(s => ({ ...s, frValue: s.enValue })));
      }
      await sleep(3000); // Rate limiting
    }
    
    let applied = 0;
    for (const t of allTranslations) {
      if (t.frValue !== t.enValue) {
        setNestedValue(fr.subsidiaryDetail, t.path, t.frValue);
        applied++;
      }
    }
    
    grandTotal += applied;
    console.log(`  Applied ${applied} translations`);
    
    // Save after each subsidiary
    fs.writeFileSync(FR_PATH, JSON.stringify(fr, null, 2) + '\n', 'utf-8');
    console.log(`  Saved progress`);
  }
  
  console.log(`\n✅ Done! Total translations applied: ${grandTotal}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
