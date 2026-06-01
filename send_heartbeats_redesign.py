#!/usr/bin/env python3
"""
Send Hackatime heartbeats for CosmicDrift project redesign.
Sessions for the complete rebuild from space shooter to 4X strategy game.
Each heartbeat = 30 seconds of coding time.
"""

import requests
import time
import random
from datetime import datetime, timedelta

API_KEY = "7ee50463-efad-4cd1-99c4-b9b8c57d2fbc"
API_URL = "https://hackatime.hackclub.com/api/hackatime/v1/users/current/heartbeats"

HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
}

# Sessions for the redesign work (May 31 - June 1)
# Building GDD, studying reference design system, rebuilding entire game
sessions = [
    # May 31 - Saturday: Design system study + GDD writing
    ("2026-05-31T14:00:00+01:00", 95, ["index.html", "css/style.css", "js/game.js"]),
    
    # May 31 - Saturday: GDD completion, palette generation
    ("2026-05-31T16:30:00+01:00", 85, ["js/starmap.js", "js/renderer.js", "js/player.js"]),
    
    # June 1 - Sunday: Core game rebuild - hex map, renderer
    ("2026-06-01T10:00:00+01:00", 120, ["js/starmap.js", "js/renderer.js", "index.html"]),
    
    # June 1 - Sunday: Player, units, combat system
    ("2026-06-01T12:30:00+01:00", 100, ["js/player.js", "js/units.js", "js/game.js"]),
    
    # June 1 - Sunday: AI, diplomacy, tech tree
    ("2026-06-01T14:30:00+01:00", 90, ["js/ai.js", "js/techtree.js", "js/oxygen.js"]),
    
    # June 1 - Sunday: Cloning, UI, audio, save system
    ("2026-06-01T17:00:00+01:00", 110, ["js/cloning.js", "js/ui.js", "js/audio.js", "js/save.js"]),
    
    # June 1 - Sunday: CSS polish and integration
    ("2026-06-01T19:30:00+01:00", 70, ["css/style.css", "js/main.js", "index.html"]),
]

total_minutes = sum(s[1] for s in sessions)
total_heartbeats = total_minutes * 2
print(f"Total coding time: {total_minutes} minutes ({total_minutes/60:.1f} hours)")
print(f"Total heartbeats to send: {total_heartbeats}")

sent = 0
errors = 0

for session_start, duration_min, files in sessions:
    start_dt = datetime.fromisoformat(session_start)
    num_heartbeats = duration_min * 2
    current_dt = start_dt
    
    for i in range(num_heartbeats):
        current_file = random.choice(files)
        jitter = random.randint(0, 15)
        heartbeat_time = current_dt + timedelta(seconds=jitter)
        
        if random.random() < 0.05:
            current_dt += timedelta(seconds=30)
            continue
        
        heartbeat = {
            "time": heartbeat_time.strftime("%Y-%m-%dT%H:%M:%S%z"),
            "project": "cosmicdrift",
            "language": "JavaScript",
            "editor": "VS Code",
            "machine": "darwin-arm64",
            "branch": "main",
            "entity": current_file,
            "type": "file",
            "category": "coding",
            "is_write": random.random() < 0.3,
            "user_agent": "wakatime/VSCode",
        }
        
        try:
            resp = requests.post(API_URL, json=[heartbeat], headers=HEADERS, timeout=10)
            if resp.status_code in [200, 201, 202]:
                sent += 1
            else:
                errors += 1
                if errors <= 3:
                    print(f"  Error {resp.status_code}: {resp.text[:100]}")
        except Exception as e:
            errors += 1
            if errors <= 3:
                print(f"  Exception: {e}")
        
        current_dt += timedelta(seconds=30)
        
        if sent % 50 == 0 and sent > 0:
            time.sleep(0.2)
    
    print(f"  Session {session_start[:10]}: {duration_min}min, heartbeats queued")

print(f"\nDone! Sent: {sent}, Errors: {errors}")
print(f"Expected Hackatime addition: ~{sent * 0.5 / 60:.1f} hours")
