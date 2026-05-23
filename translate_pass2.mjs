#!/usr/bin/env node
/**
 * Second pass: Translate remaining untranslated subsidiaryDetail strings
 * with longer delays to avoid rate limiting.
 */

import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

const EN_PATH = 'messages/en.json';
const FR_PATH = 'messages/fr.json';

const SUBSIDIARIES = ['energy', 'mining', 'technology', 'agriculture', 'water'];

const DO_NOT_TRANSLATE_PATTERNS = [
  /^(Harch|HarchOS|HarchCorp|CoreWeave|Lambda|Vultr|Africa Data Centres|PAIX|Nvidia|NVIDIA|AWS|Azure|GCP|Google|Microsoft|Amazon|Cemenco|Dangote|Scatec|ACWA|Nareva|OCP|Managem|SOTHEMA|COSUMAR|SONASID|LafargeHolcim)/i,
  /^\$[\d,.]+[BMK]?/i,
  /^\d+[\s,.]*$/,
  /^#[0-9a-fA-F]{3,8}$/,
  /^\/0\.\d+$/,
  /^\d{4}$/,
];

function shouldTranslate(str) {
  if (!str || typeof str !== 'string') return false;
  const t = str.trim();
  if (!t || t.length <= 2) return false;
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
    if (Array.isArray(target)) target = target[parseInt(part)];
    else target = target[part];
  }
  const lastPart = parts[parts.length - 1];
  if (Array.isArray(target)) target[parseInt(lastPart)] = value;
  else target[lastPart] = value;
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function translateBatch(zai, strings, subsidiary) {
  if (strings.length === 0) return [];
  
  const entries = strings.map((s, i) => `[${i}] ${s.enValue}`).join('\n');
  
  const prompt = `Translate these English strings to French for a Moroccan industrial conglomerate website (Harch Corp — ${subsidiary} subsidiary). Rules:
- Professional corporate French
- Keep: GPU, MW, kWh, gCO2, AI, API, IoT, PUE, IRR, NPV, CAGR, SLA, ESG, ISO, SOC, MW, GW, kT, MWh, CO2
- Keep proper nouns: Harch, HarchOS, Morocco, Dakhla, Casablanca, OCP, Managem, etc.
- "Data center" = "centre de données"
- "Sovereign" = "souverain(e)"
- "Renewable energy" = "énergie renouvelable"
- Return ONLY translations with [N] index, one per line

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
      if (match) translations[parseInt(match[1])] = match[2].trim();
    }
    
    return strings.map((s, i) => ({
      ...s,
      frValue: translations[i] || s.enValue,
    }));
  } catch (error) {
    console.error(`  Error: ${error.message}`);
    return strings.map(s => ({ ...s, frValue: s.enValue }));
  }
}

async function main() {
  const en = JSON.parse(fs.readFileSync(EN_PATH, 'utf-8'));
  const fr = JSON.parse(fs.readFileSync(FR_PATH, 'utf-8'));
  const zai = await ZAI.create();
  
  let grandTotal = 0;
  
  for (const subsidiary of SUBSIDIARIES) {
    console.log(`\n=== ${subsidiary} ===`);
    const untranslated = extractUntranslated(
      en.subsidiaryDetail?.[subsidiary],
      fr.subsidiaryDetail?.[subsidiary],
      subsidiary
    );
    console.log(`  ${untranslated.length} untranslated`);
    if (untranslated.length === 0) continue;
    
    // Process in small batches with 5s delay
    const BATCH = 10;
    let applied = 0;
    for (let i = 0; i < untranslated.length; i += BATCH) {
      const batch = untranslated.slice(i, i + BATCH);
      console.log(`  Batch ${Math.floor(i/BATCH)+1} (${batch.length})...`);
      const results = await translateBatch(zai, batch, subsidiary);
      for (const t of results) {
        if (t.frValue !== t.enValue) {
          setNestedValue(fr.subsidiaryDetail, t.path, t.frValue);
          applied++;
        }
      }
      await sleep(5000);
    }
    
    grandTotal += applied;
    console.log(`  Applied ${applied}`);
    fs.writeFileSync(FR_PATH, JSON.stringify(fr, null, 2) + '\n', 'utf-8');
  }
  
  console.log(`\nDone! Total: ${grandTotal}`);
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
