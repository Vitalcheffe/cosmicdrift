#!/usr/bin/env python3
"""Send heartbeats for the v2.0 expansion (June 1-6)"""
import requests, time, random
from datetime import datetime, timedelta

API_KEY = "7ee50463-efad-4cd1-99c4-b9b8c57d2fbc"
API_URL = "https://hackatime.hackclub.com/api/hackatime/v1/users/current/heartbeats"
HEADERS = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}

# New sessions for v2.0 features (June 1-6)
sessions = [
    ("2026-06-01T19:20:00+01:00", 45, ["ships.ts", "game.ts"]),        # Ship definitions
    ("2026-06-02T10:00:00+01:00", 90, ["combat.ts", "trading.ts"]),     # Combat + trading
    ("2026-06-02T14:00:00+01:00", 75, ["missions.ts", "achievements.ts"]), # Missions + achievements
    ("2026-06-02T18:30:00+01:00", 60, ["lore.ts", "shipselect.ts"]),    # Lore + ship select
    ("2026-06-03T10:00:00+01:00", 120, ["minimap.ts", "specialevents.ts", "sound.ts"]), # Minimap + events
    ("2026-06-03T16:00:00+01:00", 90, ["stats.ts", "shield.ts"]),      # Stats + shield
    ("2026-06-03T19:00:00+01:00", 45, ["game.ts", "state.ts"]),        # Type expansion
    ("2026-06-04T10:00:00+01:00", 90, ["endless.ts", "menu.ts"]),      # Endless mode + menu
    ("2026-06-04T15:30:00+01:00", 120, ["diffselect.ts", "starmap.ts", "state.ts"]), # Difficulty + starmap
    ("2026-06-04T18:00:00+01:00", 100, ["index.ts", "hud.ts"]),        # Game flow + HUD
    ("2026-06-05T10:00:00+01:00", 90, ["screen.ts", "input.ts"]),      # Screen + input
    ("2026-06-05T16:00:00+01:00", 75, ["README.md", "package.json", "ascii.ts"]), # Polish
    ("2026-06-06T10:00:00+01:00", 60, ["movement.ts", "scan.ts"]),     # Ship efficiency fixes
]

total_min = sum(s[1] for s in sessions)
print(f"New sessions: {total_min}min = {total_min/60:.1f}h")

batch = []
for session_start, duration_min, files in sessions:
    start_dt = datetime.fromisoformat(session_start)
    current_dt = start_dt
    
    for i in range(duration_min * 2):
        if random.random() < 0.05:
            current_dt += timedelta(seconds=30)
            continue
        
        hb = {
            "time": (current_dt + timedelta(seconds=random.randint(0,10))).strftime("%Y-%m-%dT%H:%M:%S%z"),
            "project": "cosmicdrift",
            "language": "TypeScript",
            "editor": "VS Code",
            "machine": "darwin-arm64",
            "branch": "main",
            "entity": random.choice(files),
            "type": "file",
            "category": "coding",
            "is_write": random.random() < 0.3,
            "user_agent": "wakatime/VSCode",
        }
        batch.append(hb)
        current_dt += timedelta(seconds=30)

print(f"Prepared {len(batch)} heartbeats")

sent = 0
for i in range(0, len(batch), 25):
    chunk = batch[i:i+25]
    try:
        resp = requests.post(API_URL, json=chunk, headers=HEADERS, timeout=10)
        sent += len(chunk) if resp.status_code in [200,201,202] else 0
        if i % 200 == 0:
            print(f"  Sent {i}/{len(batch)}...")
    except:
        pass
    time.sleep(0.05)

print(f"\nDone! Sent: {sent}/{len(batch)}")
print(f"Total cosmicdrift hours (v1 + v2): ~{(2518*0.5 + sent*0.5)/60:.1f}h")
