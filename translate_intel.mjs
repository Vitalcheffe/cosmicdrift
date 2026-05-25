#!/usr/bin/env node
/**
 * Translate subsidiaryDetail.intelligence strings from EN to FR
 * using the z-ai-web-dev-sdk LLM API with small batches.
 */

import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

const EN_PATH = 'messages/en.json';
const FR_PATH = 'messages/fr.json';

const DO_NOT_TRANSLATE = new Set([
  'Harch Intelligence', 'HarchOS', '/0.1', 'Dakhla, Morocco', '#8B9DAF',
  'CoreWeave', 'Google Cloud (Hamina)', 'Africa Data Centres (Cassava)', 'QScale',
  'USA', 'Finland', 'South Africa', 'Canada',
  '$1.14B',
]);

function shouldTranslate(str) {
  if (!str || typeof str !== 'string') return false;
  const t = str.trim();
  if (!t) return false;
  if (DO_NOT_TRANSLATE.has(t)) return false;
  if (/^\d+[\s,.]*$/.test(t)) return false;
  if (/^#[0-9a-fA-F]{3,8}$/.test(t)) return false;
  if (/^\/0\.\d+$/.test(t)) return false;
  if (/^\$[\d,.]+[BMK]?$/.test(t)) return false;
  if (/^\d{4}$/.test(t)) return false;
  if (/^Q[1-4]\s*\d{4}$/.test(t)) return false;
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
    const nextIsArray = /^\d+$/.test(parts[i + 1]);
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

async function translateBatch(zai, strings, batchNum) {
  if (strings.length === 0) return [];
  
  const entries = strings.map((s, i) => `[${i}] ${s.enValue}`).join('\n');
  
  const prompt = `Translate these English strings to French for a Moroccan tech company website (Harch Corp - AI/GPU cloud subsidiary). Rules:
- Professional corporate French
- Keep: GPU, MW, kWh, gCO2, AI, API, HarchOS, Harch, PUE, IRR, NPV, CAGR, SLA, MLOps, SDK, Tbps, CLOUD Act, GDPR, ISO, SOC, SaaS
- "Carbon-aware" = "conscient du carbone"
- "Data center/centre" = "centre de données"  
- "Sovereign" = "souverain(e)"
- "Workload" = "charge de travail"
- "Scheduling" = "ordonnancement"
- Keep proper nouns: CoreWeave, Google, Africa Data Centres, QScale, Dakhla, Morocco, Casablanca, etc.
- Keep \n line breaks as-is
- Return ONLY translations with [N] index format, one per line

${entries}

French translations:`;

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
}

async function main() {
  console.log('Loading translation files...');
  const en = JSON.parse(fs.readFileSync(EN_PATH, 'utf-8'));
  const fr = JSON.parse(fs.readFileSync(FR_PATH, 'utf-8'));
  
  const zai = await ZAI.create();
  
  const SUBSIDIARIES = ['intelligence'];  // Start with just intelligence
  
  for (const subsidiary of SUBSIDIARIES) {
    console.log(`\n=== Processing: ${subsidiary} ===`);
    
    const enSub = en.subsidiaryDetail?.[subsidiary];
    const frSub = fr.subsidiaryDetail?.[subsidiary];
    
    if (!enSub || !frSub) continue;
    
    const untranslated = extractUntranslated(enSub, frSub, subsidiary);
    console.log(`Found ${untranslated.length} untranslated strings`);
    
    if (untranslated.length === 0) continue;
    
    // Separate short strings (labels, titles) from long strings (descriptions, paragraphs)
    const shortStrings = untranslated.filter(s => s.enValue.length < 80);
    const longStrings = untranslated.filter(s => s.enValue.length >= 80);
    
    console.log(`Short strings: ${shortStrings.length}, Long strings: ${longStrings.length}`);
    
    const allTranslations = [];
    
    // Process short strings in batches of 20
    const BATCH_SIZE = 20;
    for (let i = 0; i < shortStrings.length; i += BATCH_SIZE) {
      const batch = shortStrings.slice(i, i + BATCH_SIZE);
      const batchNum = Math.floor(i / BATCH_SIZE) + 1;
      console.log(`  Translating short batch ${batchNum} (${batch.length} strings)...`);
      try {
        const results = await translateBatch(zai, batch, batchNum);
        allTranslations.push(...results);
      } catch (e) {
        console.error(`  Error in short batch: ${e.message}`);
        allTranslations.push(...batch.map(s => ({ ...s, frValue: s.enValue })));
      }
    }
    
    // Process long strings in batches of 5
    const LONG_BATCH = 5;
    for (let i = 0; i < longStrings.length; i += LONG_BATCH) {
      const batch = longStrings.slice(i, i + LONG_BATCH);
      const batchNum = Math.floor(i / LONG_BATCH) + 1;
      console.log(`  Translating long batch ${batchNum} (${batch.length} strings)...`);
      try {
        const results = await translateBatch(zai, batch, batchNum);
        allTranslations.push(...results);
      } catch (e) {
        console.error(`  Error in long batch: ${e.message}`);
        allTranslations.push(...batch.map(s => ({ ...s, frValue: s.enValue })));
      }
    }
    
    // Apply translations
    let applied = 0;
    for (const t of allTranslations) {
      if (t.frValue !== t.enValue) {
        setNestedValue(fr.subsidiaryDetail, t.path, t.frValue);
        applied++;
      }
    }
    console.log(`Applied ${applied} translations`);
  }
  
  // Save
  fs.writeFileSync(FR_PATH, JSON.stringify(fr, null, 2) + '\n', 'utf-8');
  console.log('\nDone! Saved fr.json');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
