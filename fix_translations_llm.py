#!/usr/bin/env python3
"""
Phase 3: Use LLM to translate remaining 1,783 untranslated keys.
Processes in small batches to avoid timeout.
"""

import json
import subprocess
import sys
import time

def call_llm(prompt, system_msg="You are a professional French-English translator. Return only valid JSON. No markdown, no code blocks, just raw JSON object."):
    """Call LLM via z-ai-generate or direct API"""
    try:
        # Use Node.js with z-ai-web-dev-sdk
        script = f'''
import ZAI from 'z-ai-web-dev-sdk';
const zai = await ZAI.create();
const completion = await zai.chat.completions.create({{
  messages: [
    {{ role: 'system', content: {json.dumps(system_msg)} }},
    {{ role: 'user', content: {json.dumps(prompt)} }}
  ],
  temperature: 0.1,
  max_tokens: 4000,
}});
let resp = completion.choices[0]?.message?.content?.trim();
if (resp.startsWith('```')) {{
  resp = resp.replace(/^```(?:json)?\\s*\\n?/, '').replace(/\\n?```\\s*$/, '');
}}
console.log(resp);
'''
        result = subprocess.run(
            ['node', '-e', script],
            capture_output=True, text=True, timeout=120,
            cwd='/home/z/my-project'
        )
        if result.returncode != 0:
            raise Exception(f"Node error: {result.stderr[:200]}")
        return result.stdout.strip()
    except subprocess.TimeoutExpired:
        return None
    except Exception as e:
        return None

def translate_batch(section, items, batch_size=40):
    """Translate a batch of items using LLM"""
    all_translations = {}
    
    for i in range(0, len(items), batch_size):
        batch = items[i:i+batch_size]
        
        # Build prompt
        keys_text = "\n".join([f'"{k}" = "{v.replace(chr(34), chr(92)+chr(34))}"' for k, v in batch])
        
        prompt = f"""Translate these English values to French for a corporate website (Harch Corp - African infrastructure: AI data centers, agriculture, cement, energy, mining, water, finance, technology in Morocco).

Rules:
- Keep brand names as-is: HarchOS, Harch Corp, Harch Agri, Harch Intelligence, Harch Energy, etc.
- Keep tech terms: GPU, API, ISO, gCO2/kWh, GDPR/RGPD, etc.
- Keep proper nouns: Casablanca, Dakhla, Morocco, etc.
- Keep variable placeholders like {{current}}, {{total}} unchanged
- Translate all other text to proper French

Return ONLY a JSON object with same keys and French values.

Keys to translate:
{keys_text}"""

        response = call_llm(prompt)
        if response:
            try:
                translations = json.loads(response)
                all_translations.update(translations)
                print(f"  ✓ {section} batch {i//batch_size+1}: {len(translations)} keys translated")
            except json.JSONDecodeError as e:
                print(f"  ✗ {section} batch {i//batch_size+1}: JSON parse error: {e}")
                # Try to fix common JSON issues
                try:
                    # Remove trailing commas, fix quotes
                    fixed = response.strip()
                    if fixed.startswith('{') and fixed.endswith('}'):
                        translations = json.loads(fixed)
                        all_translations.update(translations)
                        print(f"  ✓ {section} batch {i//batch_size+1} (fixed): {len(translations)} keys")
                except:
                    print(f"  ✗ {section} batch {i//batch_size+1}: Could not parse response")
        else:
            print(f"  ✗ {section} batch {i//batch_size+1}: LLM call failed")
        
        time.sleep(0.5)  # Rate limiting
    
    return all_translations

def main():
    with open('/tmp/still_untranslated_v2.json', 'r', encoding='utf-8') as f:
        remaining = json.load(f)
    
    with open('messages/fr.json', 'r', encoding='utf-8') as f:
        fr = json.load(f)
    
    def set_nested_value(d, key_path, value):
        keys = key_path.split('.')
        current = d
        for k in keys[:-1]:
            if k not in current or not isinstance(current[k], dict):
                current[k] = {}
            current = current[k]
        current[keys[-1]] = value
    
    total_translated = 0
    
    # Process each section
    for section, items in sorted(remaining.items(), key=lambda x: -len(x[1])):
        if not items:
            continue
        print(f"\nProcessing {section} ({len(items)} keys)...")
        
        translations = translate_batch(section, items, batch_size=35)
        
        # Apply translations
        applied = 0
        for k, fr_val in translations.items():
            if section in fr and isinstance(fr[section], dict):
                try:
                    set_nested_value(fr[section], k, fr_val)
                    applied += 1
                except:
                    pass
        
        total_translated += applied
        print(f"  Applied {applied} translations for {section}")
    
    # Save
    with open('messages/fr.json', 'w', encoding='utf-8') as f:
        json.dump(fr, f, ensure_ascii=False, indent=2)
    
    print(f"\nTotal keys translated by LLM: {total_translated}")
    
    # Verify remaining
    with open('messages/en.json', 'r', encoding='utf-8') as f:
        en = json.load(f)
    
    def get_all_leaf_keys(d, prefix=''):
        result = {}
        for k, v in d.items():
            full_key = f'{prefix}.{k}' if prefix else k
            if isinstance(v, dict):
                result.update(get_all_leaf_keys(v, full_key))
            else:
                result[full_key] = v
        return result
    
    still_untranslated = 0
    for section in en:
        if not isinstance(en[section], dict):
            continue
        en_leaves = get_all_leaf_keys(en[section])
        fr_section = fr.get(section)
        if not isinstance(fr_section, dict):
            continue
        fr_leaves = get_all_leaf_keys(fr_section)
        
        for k, en_val in en_leaves.items():
            if not isinstance(en_val, str):
                continue
            if k in fr_leaves and fr_leaves[k] == en_val and en_val and any(c.isalpha() for c in en_val):
                still_untranslated += 1
    
    print(f"Still untranslated after LLM pass: {still_untranslated}")

if __name__ == '__main__':
    main()
