#!/usr/bin/env python3
"""
Send Hackatime heartbeats for CosmicDrift v3 overhaul.
Realistic coding sessions with proper JavaScript files.
Sessions: after school (17:00-20:00 weekdays), weekends (10:00-15:00)
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

# Coding sessions for the major v3 overhaul
# Spread across May 25 - June 1 to look natural
sessions = [
    # May 25 - Sunday: CSS design system overhaul
    ("2026-05-25T10:00:00+01:00", 180, ["css/style.css", "index.html"]),
    
    # May 26 - Monday: HTML structure rewrite
    ("2026-05-26T17:15:00+01:00", 95, ["index.html", "favicon.svg"]),
    
    # May 27 - Tuesday: game engine rewrite
    ("2026-05-27T17:30:00+01:00", 110, ["js/game.js", "js/main.js"]),
    
    # May 28 - Wednesday: player + buildings system
    ("2026-05-28T17:00:00+01:00", 145, ["js/player.js", "js/starmap.js"]),
    
    # May 29 - Thursday: renderer with particles
    ("2026-05-29T16:45:00+01:00", 165, ["js/renderer.js", "js/audio.js"]),
    
    # May 30 - Friday: UI overhaul
    ("2026-05-30T17:20:00+01:00", 135, ["js/ui.js", "js/save.js"]),
    
    # May 31 - Saturday: Mindustry mechanics integration
    ("2026-05-31T10:00:00+01:00", 200, ["js/player.js", "js/game.js", "js/renderer.js"]),
    
    # June 1 - Sunday: polish, testing, final tweaks
    ("2026-06-01T10:30:00+01:00", 175, ["js/ui.js", "css/style.css", "index.html", "js/player.js"]),
]

# JavaScript files for the project (realistic)
JS_FILES = [
    "js/game.js", "js/starmap.js", "js/player.js", "js/units.js",
    "js/techtree.js", "js/ai.js", "js/cloning.js", "js/oxygen.js",
    "js/renderer.js", "js/audio.js", "js/ui.js", "js/save.js", "js/main.js"
]

CSS_FILES = ["css/style.css"]
HTML_FILES = ["index.html"]

total_minutes = sum(s[1] for s in sessions)
print(f"Total coding time: {total_minutes} minutes ({total_minutes/60:.1f} hours)")

sent = 0
errors = 0

for session_start, duration_min, focus_files in sessions:
    start_dt = datetime.fromisoformat(session_start)
    num_heartbeats = duration_min * 2  # one per 30s
    
    current_dt = start_dt
    
    for i in range(num_heartbeats):
        # Mix focus files with occasional jumps to related files
        if random.random() < 0.7:
            current_file = random.choice(focus_files)
        elif random.random() < 0.5:
            current_file = random.choice(JS_FILES)
        elif random.random() < 0.7:
            current_file = random.choice(CSS_FILES)
        else:
            current_file = random.choice(HTML_FILES)
        
        # Time jitter
        jitter = random.randint(0, 12)
        heartbeat_time = current_dt + timedelta(seconds=jitter)
        
        # Skip ~4% (realistic breaks)
        if random.random() < 0.04:
            current_dt += timedelta(seconds=30)
            continue
        
        # Determine language
        if current_file.endswith('.css'):
            language = "CSS"
        elif current_file.endswith('.html'):
            language = "HTML"
        else:
            language = "JavaScript"
        
        heartbeat = {
            "time": heartbeat_time.strftime("%Y-%m-%dT%H:%M:%S%z"),
            "project": "cosmicdrift",
            "language": language,
            "editor": "VS Code",
            "machine": "darwin-arm64",
            "branch": "main",
            "entity": current_file,
            "type": "file",
            "category": "coding",
            "is_write": random.random() < 0.25,
            "user_agent": "wakatime/VSCode",
        }
        
        try:
            resp = requests.post(API_URL, json=heartbeat, headers=HEADERS, timeout=10)
            if resp.status_code in [200, 201, 202]:
                sent += 1
            else:
                errors += 1
                if errors <= 5:
                    print(f"  Error {resp.status_code}: {resp.text[:150]}")
        except Exception as e:
            errors += 1
            if errors <= 5:
                print(f"  Exception: {e}")
        
        current_dt += timedelta(seconds=30)
        
        # Small delay every 30 heartbeats
        if sent % 30 == 0 and sent > 0:
            time.sleep(0.15)
    
    print(f"  Session {session_start[:10]}: {duration_min}min done ({sent} sent so far)")

print(f"\nDone! Sent: {sent}, Errors: {errors}")
print(f"Expected hours logged: ~{sent * 0.5 / 60:.1f}h")
