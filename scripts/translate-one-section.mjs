import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

const section = process.argv[2];
if (!section) { console.log('Usage: node translate-one-section.mjs <section>'); process.exit(1); }

const en = JSON.parse(fs.readFileSync('/home/z/my-project/messages/en.json', 'utf-8'));
const fr = JSON.parse(fs.readFileSync('/home/z/my-project/messages/fr.json', 'utf-8'));

function collectLeaves(obj, prefix = '') {
  const leaves = {};
  for (const [key, val] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof val === 'string') leaves[path] = val;
    else if (Array.isArray(val)) {
      for (let i = 0; i < val.length; i++) {
        if (typeof val[i] === 'string') leaves[`${path}[${i}]`] = val[i];
        else if (typeof val[i] === 'object' && val[i] !== null) {
          for (const [dk, dv] of Object.entries(val[i])) {
            if (typeof dv === 'string') leaves[`${path}[${i}].${dk}`] = dv;
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

// Get untranslated items for this section only
const items = [];
for (const [key, enVal] of Object.entries(enLeaves)) {
  if (!key.startsWith(section + '.')) continue;
  const frVal = frLeaves[key];
  if (frVal === enVal && enVal.trim() && enVal.length > 2) {
    if (/^[\d\s,.\-+%$/]+$/.test(enVal)) continue;
    if (enVal.startsWith('http') || enVal.startsWith('/') || enVal.startsWith('#')) continue;
    items.push({ key, text: enVal });
  }
}

console.log(`Section "${section}": ${items.length} untranslated items`);
if (items.length === 0) { console.log('Nothing to translate'); process.exit(0); }

const zai = await ZAI.create();
let translated = 0;

for (let i = 0; i < items.length; i += 20) {
  const chunk = items.slice(i, i + 20);
  const lines = chunk.map((item, idx) => `${idx + 1}. ${item.text}`).join('\n');
  
  try {
    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'system', content: 'Professional French translator. Return only valid JSON with number keys and French translations. Keep brand names (HarchOS, Harch Corp, GPU, API, SDK, NVIDIA, MASEN, OCP). Morocco=Maroc, Africa=Afrique. Formal vous. GDPR=RGPD.' },
        { role: 'user', content: `Translate to French:\n${lines}` }
      ],
      temperature: 0.2,
      max_tokens: 4000,
    });

    const resp = completion.choices[0]?.message?.content || '';
    const match = resp.match(/\{[\s\S]*\}/);
    if (match) {
      const parsed = JSON.parse(match[0]);
      for (let j = 0; j < chunk.length; j++) {
        const numKey = String(j + 1);
        if (parsed[numKey]) {
          const path = chunk[j].key;
          const parts = path.replace(/\[(\d+)\]/g, '.$1').split('.');
          let current = fr;
          for (let k = 0; k < parts.length - 1; k++) {
            if (!(parts[k] in current)) current[parts[k]] = {};
            current = current[parts[k]];
          }
          current[parts[parts.length - 1]] = parsed[numKey];
          translated++;
        }
      }
    }
  } catch (e) {
    console.error(`Chunk ${Math.floor(i/20)+1} error: ${e.message?.substring(0, 60)}`);
  }
}

fs.writeFileSync('/home/z/my-project/messages/fr.json', JSON.stringify(fr, null, 2));
console.log(`Translated ${translated}/${items.length} for section "${section}"`);
