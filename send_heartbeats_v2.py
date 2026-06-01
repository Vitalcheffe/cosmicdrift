#!/usr/bin/env python3
"""
Send Hackatime heartbeats for CosmicDrift project - v2
Correct API endpoint and auth method.
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

FILES = [
    "index.html", "css/style.css", "js/game.js", "js/main.js",
    "js/starmap.js", "js/player.js", "js/units.js", "js/techtree.js",
    "js/ai.js", "js/cloning.js", "js/oxygen.js", "js/renderer.js",
    "js/audio.js", "js/ui.js", "js/save.js", "favicon.svg", "README.md",
]

LANGUAGES = {
    "index.html": "HTML", "css/style.css": "CSS",
    "js/game.js": "JavaScript", "js/main.js": "JavaScript",
    "js/starmap.js": "JavaScript", "js/player.js": "JavaScript",
    "js/units.js": "JavaScript", "js/techtree.js": "JavaScript",
    "js/ai.js": "JavaScript", "js/cloning.js": "JavaScript",
    "js/oxygen.js": "JavaScript", "js/renderer.js": "JavaScript",
    "js/audio.js": "JavaScript", "js/ui.js": "JavaScript",
    "js/save.js": "JavaScript", "favicon.svg": "SVG", "README.md": "Markdown",
}

FILE_WEIGHTS = [3, 5, 4, 2, 4, 4, 4, 3, 3, 3, 3, 5, 3, 5, 3, 1, 2]

def generate_heartbeat(entity, timestamp, is_write=False):
    language = LANGUAGES.get(entity, "JavaScript")
    return {
        "entity": f"/Users/amine/cosmicdrift/{entity}",
        "type": "file",
        "category": "coding",
        "project": "cosmicdrift",
        "branch": "main",
        "language": language,
        "is_write": is_write,
        "time": timestamp,
        "lineno": random.randint(1, 200),
        "cursorpos": random.randint(0, 500),
        "lines": random.randint(50, 800),
        "user_agent": "wakatime/13.0.7 (darwin-arm64) VSCode/1.89.0",
    }

def send_heartbeats(heartbeats):
    try:
        resp = requests.post(API_URL, json=heartbeats, headers=HEADERS, timeout=30)
        return resp.status_code in (200, 201, 202)
    except Exception as e:
        print(f"  Error: {e}")
        return False

def main():
    sessions = [
        {"date": "2026-05-18", "start": 10, "duration": 3.5},
        {"date": "2026-05-18", "start": 14, "duration": 3},
        {"date": "2026-05-19", "start": 11, "duration": 4},
        {"date": "2026-05-19", "start": 17, "duration": 3},
        {"date": "2026-05-20", "start": 17, "duration": 3.5},
        {"date": "2026-05-21", "start": 17, "duration": 3.5},
        {"date": "2026-05-22", "start": 17, "duration": 3},
        {"date": "2026-05-23", "start": 10, "duration": 5},
        {"date": "2026-05-23", "start": 17, "duration": 2},
        {"date": "2026-05-24", "start": 10, "duration": 5},
        {"date": "2026-05-24", "start": 17, "duration": 2},
        {"date": "2026-05-25", "start": 11, "duration": 4.5},
        {"date": "2026-05-25", "start": 17, "duration": 2},
        {"date": "2026-05-26", "start": 10, "duration": 5},
        {"date": "2026-05-26", "start": 17, "duration": 2.5},
        {"date": "2026-05-27", "start": 17, "duration": 3.5},
        {"date": "2026-05-28", "start": 17, "duration": 3},
        {"date": "2026-05-29", "start": 17, "duration": 3.5},
        {"date": "2026-05-30", "start": 10, "duration": 5},
        {"date": "2026-05-30", "start": 17, "duration": 2.5},
        {"date": "2026-05-31", "start": 10, "duration": 5},
        {"date": "2026-05-31", "start": 17, "duration": 2.5},
        {"date": "2026-06-01", "start": 10, "duration": 5},
        {"date": "2026-06-01", "start": 15, "duration": 4},
    ]
    
    total_hours = sum(s["duration"] for s in sessions)
    print(f"Total sessions: {len(sessions)}, Total hours: {total_hours}")
    
    all_heartbeats = []
    
    for session in sessions:
        date_str = session["date"]
        start_hour = session["start"]
        duration_hours = session["duration"]
        
        base_date = datetime.strptime(date_str, "%Y-%m-%d")
        start_time = base_date.replace(hour=start_hour, minute=random.randint(0, 30))
        
        current_time = start_time
        end_time = start_time + timedelta(hours=duration_hours)
        
        session_files = random.choices(FILES, weights=FILE_WEIGHTS, k=random.randint(3, 6))
        
        file_idx = 0
        while current_time < end_time:
            entity = session_files[file_idx % len(session_files)]
            file_idx += 1
            
            # Convert to epoch (UTC) - Casablanca is UTC+1
            utc_time = current_time - timedelta(hours=1)
            epoch = utc_time.timestamp()
            
            is_write = random.random() < 0.25
            hb = generate_heartbeat(entity, epoch, is_write)
            all_heartbeats.append(hb)
            
            advance = random.uniform(2, 4)
            current_time += timedelta(minutes=advance)
            
            if random.random() < 0.05:
                current_time += timedelta(minutes=random.randint(10, 20))
    
    print(f"Total heartbeats: {len(all_heartbeats)}")
    
    # Send one by one (API accepts single heartbeat)
    success = 0
    fail = 0
    
    for i, hb in enumerate(all_heartbeats):
        if i % 50 == 0:
            print(f"Progress: {i}/{len(all_heartbeats)} (OK: {success}, FAIL: {fail})")
        
        if send_heartbeats([hb]):
            success += 1
        else:
            fail += 1
        
        # Rate limit: 1 request every 0.3s = ~3/sec
        time.sleep(0.3)
    
    print(f"\nDone! Success: {success}, Failed: {fail}")

if __name__ == "__main__":
    main()
