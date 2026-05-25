import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

const en = JSON.parse(fs.readFileSync('/home/z/my-project/messages/en.json', 'utf-8'));
const fr = JSON.parse(fs.readFileSync('/home/z/my-project/messages/fr.json', 'utf-8'));

// Collect leaves with path
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

// Find untranslated grouped by section
const bySection = {};
for (const [key, enVal] of Object.entries(enLeaves)) {
  const frVal = frLeaves[key];
  if (frVal === enVal && enVal.trim() && enVal.length > 2) {
    if (/^[\d\s,.\-+%$/]+$/.test(enVal)) continue;
    if (enVal.startsWith('http') || enVal.startsWith('/') || enVal.startsWith('#')) continue;
    const section = key.split('.')[0];
    if (!bySection[section]) bySection[section] = [];
    bySection[section].push({ key, text: enVal });
  }
}

// Sort by size (biggest first)
const sections = Object.entries(bySection).sort((a, b) => b[1].length - a[1].length);
const totalUntranslated = sections.reduce((s, [, items]) => s + items.length, 0);
console.log(`Total untranslated: ${totalUntranslated} across ${sections.length} sections`);

const zai = await ZAI.create();
let totalTranslated = 0;

// Process each section
for (const [section, items] of sections) {
  if (items.length === 0) continue;
  
  // Process in chunks of 20
  for (let i = 0; i < items.length; i += 20) {
    const chunk = items.slice(i, i + 20);
    const lines = chunk.map((item, idx) => `${idx + 1}. ${item.text}`).join('\n');
    
    const prompt = `Translate these ${chunk.length} English texts to French for a Moroccan tech company. Keep brand names (HarchOS, Harch Corp, NVIDIA, GPU, API, SDK, gRPC, etc.) and proper nouns as-is. Morocco→Maroc, Africa→Afrique. Formal French (vous). GDPR→RGPD. Return ONLY a JSON object with number keys and French translations.

${lines}`;

    try {
      const completion = await zai.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are a professional French translator. Return only valid JSON with number keys.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.2,
        max_tokens: 4000,
      });

      const responseText = completion.choices[0]?.message?.content || '';
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          const parsed = JSON.parse(jsonMatch[0]);
          for (let j = 0; j < chunk.length; j++) {
            const numKey = String(j + 1);
            if (parsed[numKey]) {
              // Set the value in fr.json
              const path = chunk[j].key;
              const parts = path.replace(/\[(\d+)\]/g, '.$1').split('.');
              let current = fr;
              for (let k = 0; k < parts.length - 1; k++) {
                if (!(parts[k] in current)) current[parts[k]] = {};
                current = current[parts[k]];
              }
              current[parts[parts.length - 1]] = parsed[numKey];
              totalTranslated++;
            }
          }
        } catch (e) {
          // skip
        }
      }
    } catch (error) {
      console.error(`${section} chunk error: ${error.message?.substring(0, 50)}`);
    }
  }
  
  console.log(`Section ${section}: done (${totalTranslated}/${totalUntranslated} total)`);
  
  // Save progress every section
  fs.writeFileSync('/home/z/my-project/messages/fr.json', JSON.stringify(fr, null, 2));
}

console.log(`\nComplete! Translated ${totalTranslated} keys`);

// Final verification
const frNew = JSON.parse(fs.readFileSync('/home/z/my-project/messages/fr.json', 'utf-8'));
const frNewLeaves = collectLeaves(frNew);
let stillIdentical = 0;
for (const [key, enVal] of Object.entries(enLeaves)) {
  if (frNewLeaves[key] === enVal && enVal.trim() && enVal.length > 2) {
    stillIdentical++;
  }
}
console.log(`Remaining identical EN==FR: ${stillIdentical}`);
