import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

const en = JSON.parse(fs.readFileSync('/home/z/my-project/messages/en.json', 'utf-8'));
const fr = JSON.parse(fs.readFileSync('/home/z/my-project/messages/fr.json', 'utf-8'));

// Collect all untranslated leaf keys
function collectLeaves(obj, prefix = '') {
  const leaves = {};
  for (const [key, val] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof val === 'string') {
      leaves[path] = val;
    } else if (Array.isArray(val)) {
      for (let i = 0; i < val.length; i++) {
        if (typeof val[i] === 'string') {
          leaves[`${path}[${i}]`] = val[i];
        } else if (typeof val[i] === 'object' && val[i] !== null) {
          for (const [dk, dv] of Object.entries(val[i])) {
            if (typeof dv === 'string') {
              leaves[`${path}[${i}].${dk}`] = dv;
            }
          }
        }
      }
    } else if (typeof val === 'object' && val !== null) {
      Object.assign(leaves, collectLeaves(val, path));
    }
  }
  return leaves;
}

const enLeaves = collectLeaves(en);
const frLeaves = collectLeaves(fr);

// Find untranslated (EN == FR) keys where the text is meaningful
const untranslated = [];
for (const [key, enVal] of Object.entries(enLeaves)) {
  const frVal = frLeaves[key];
  if (frVal === enVal && enVal.trim() && enVal.length > 2) {
    // Skip numbers, brand names, URLs, code
    if (/^[\d\s,.\-+%$/]+$/.test(enVal)) continue;
    if (enVal.startsWith('http') || enVal.startsWith('/') || enVal.startsWith('#')) continue;
    if (['HarchOS', 'GPU', 'API', 'SDK', 'gRPC', 'REST', 'GraphQL'].includes(enVal)) continue;
    untranslated.push({ key, text: enVal });
  }
}

console.log(`Found ${untranslated.length} untranslated keys`);

// Translate in batches of 50
const BATCH_SIZE = 50;
const zai = await ZAI.create();
const translations = {};
let translated = 0;

for (let i = 0; i < untranslated.length; i += BATCH_SIZE) {
  const batch = untranslated.slice(i, i + BATCH_SIZE);
  const batchNum = Math.floor(i / BATCH_SIZE) + 1;
  const totalBatches = Math.ceil(untranslated.length / BATCH_SIZE);
  
  const lines = batch.map((item, idx) => `${idx + 1}. [${item.key}] ${item.text}`).join('\n');
  
  const prompt = `You are a professional French translator for a Moroccan tech company (Harch Corp). Translate the following English text to French. Keep brand names (HarchOS, Harch Corp, NVIDIA, GPU, API, SDK, etc.) and proper nouns (Morocco→Maroc, Africa→Afrique, Casablanca, Dakhla, MASEN, OCP) as-is. Use formal French (vous). For legal terms: GDPR→RGPD, Data Controller→Responsable du traitement, Data Subject→Personne concernée. 

Return ONLY a JSON object where keys are the bracketed identifiers and values are the French translations. Example: {"1.key": "Traduction française"}

TEXTS TO TRANSLATE:
${lines}`;

  try {
    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a professional French translator. Return only valid JSON.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 4000,
    });

    const responseText = completion.choices[0]?.message?.content || '';
    // Extract JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        for (const [idx, item] of batch.entries()) {
          const lookupKey = `${idx + 1}`;
          if (parsed[lookupKey]) {
            translations[item.key] = parsed[lookupKey];
            translated++;
          }
        }
      } catch (e) {
        console.error(`Batch ${batchNum}: JSON parse error, skipping`);
      }
    }
    console.log(`Batch ${batchNum}/${totalBatches}: translated ${translated}/${untranslated.length}`);
  } catch (error) {
    console.error(`Batch ${batchNum} error: ${error.message}`);
  }
}

// Apply translations back to fr.json
function setNestedValue(obj, path, value) {
  const parts = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!(part in current)) current[part] = {};
    current = current[part];
  }
  current[parts[parts.length - 1]] = value;
}

for (const [key, value] of Object.entries(translations)) {
  try {
    setNestedValue(fr, key, value);
  } catch (e) {
    console.error(`Failed to set ${key}: ${e.message}`);
  }
}

fs.writeFileSync('/home/z/my-project/messages/fr.json', JSON.stringify(fr, null, 2));
console.log(`\nDone! Translated ${translated} keys. Saved to fr.json`);

// Verify
const frNew = JSON.parse(fs.readFileSync('/home/z/my-project/messages/fr.json', 'utf-8'));
const frNewLeaves = collectLeaves(frNew);
let stillIdentical = 0;
for (const [key, enVal] of Object.entries(enLeaves)) {
  if (frNewLeaves[key] === enVal && enVal.trim() && enVal.length > 2) {
    stillIdentical++;
  }
}
console.log(`Remaining identical: ${stillIdentical}`);
