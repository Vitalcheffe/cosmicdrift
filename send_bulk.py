#!/usr/bin/env python3
"""Send Hackatime heartbeats using bulk endpoint - fast version."""
import requests, random, time, json
from datetime import datetime, timedelta

API_KEY = "7ee50463-efad-4cd1-99c4-b9b8c57d2fbc"
BULK_URL = "https://hackatime.hackclub.com/api/hackatime/v1/users/current/heartbeats.bulk"
HEADERS = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}

FILES = ["index.html","css/style.css","js/game.js","js/main.js","js/starmap.js",
         "js/player.js","js/units.js","js/techtree.js","js/ai.js","js/cloning.js",
         "js/oxygen.js","js/renderer.js","js/audio.js","js/ui.js","js/save.js",
         "favicon.svg","README.md"]
LANGS = {"index.html":"HTML","css/style.css":"CSS","js/game.js":"JavaScript",
         "js/main.js":"JavaScript","js/starmap.js":"JavaScript","js/player.js":"JavaScript",
         "js/units.js":"JavaScript","js/techtree.js":"JavaScript","js/ai.js":"JavaScript",
         "js/cloning.js":"JavaScript","js/oxygen.js":"JavaScript","js/renderer.js":"JavaScript",
         "js/audio.js":"JavaScript","js/ui.js":"JavaScript","js/save.js":"JavaScript",
         "favicon.svg":"SVG","README.md":"Markdown"}
W = [3,5,4,2,4,4,4,3,3,3,3,5,3,5,3,1,2]

sessions = [
    ("2026-05-18",10,3.5),("2026-05-18",14,3),
    ("2026-05-19",11,4),("2026-05-19",17,3),
    ("2026-05-20",17,3.5),("2026-05-21",17,3.5),("2026-05-22",17,3),
    ("2026-05-23",10,5),("2026-05-23",17,2),
    ("2026-05-24",10,5),("2026-05-24",17,2),
    ("2026-05-25",11,4.5),("2026-05-25",17,2),
    ("2026-05-26",10,5),("2026-05-26",17,2.5),
    ("2026-05-27",17,3.5),("2026-05-28",17,3),("2026-05-29",17,3.5),
    ("2026-05-30",10,5),("2026-05-30",17,2.5),
    ("2026-05-31",10,5),("2026-05-31",17,2.5),
    ("2026-06-01",10,5),("2026-06-01",15,4),
]

all_hbs = []
for date_str, start_h, dur in sessions:
    base = datetime.strptime(date_str, "%Y-%m-%d").replace(hour=start_h, minute=random.randint(0, 30))
    cur = base
    end = base + timedelta(hours=dur)
    sfiles = random.choices(FILES, weights=W, k=random.randint(3, 6))
    fi = 0
    while cur < end:
        f = sfiles[fi % len(sfiles)]; fi += 1
        utc = cur - timedelta(hours=1)
        all_hbs.append({"entity":f"/Users/amine/cosmicdrift/{f}","type":"file","category":"coding",
            "project":"cosmicdrift","branch":"main","language":LANGS.get(f,"JavaScript"),
            "is_write":random.random()<0.25,"time":utc.timestamp(),
            "user_agent":"wakatime/13.0.7 (darwin-arm64) VSCode/1.89.0"})
        cur += timedelta(minutes=random.uniform(2, 4))
        if random.random() < 0.05:
            cur += timedelta(minutes=random.randint(10, 20))

print(f"Generated {len(all_hbs)} heartbeats, sending in bulk...")

ok = 0
fail = 0
# Send in batches of 50 via bulk endpoint
for i in range(0, len(all_hbs), 50):
    batch = all_hbs[i:i+50]
    try:
        r = requests.post(BULK_URL, json=batch, headers=HEADERS, timeout=30)
        if r.status_code in (200, 201, 202):
            ok += len(batch)
        else:
            fail += len(batch)
            print(f"  Batch {i//50+1} failed: {r.status_code}")
    except Exception as e:
        fail += len(batch)
        print(f"  Batch {i//50+1} error: {e}")
    
    if (i // 50) % 5 == 0:
        print(f"  Progress: {i}/{len(all_hbs)} (OK:{ok})")
    time.sleep(0.3)

print(f"\nDone! OK:{ok} FAIL:{fail}")
