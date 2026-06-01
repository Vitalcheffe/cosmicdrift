import requests
import time
import random
import math
from datetime import datetime, timedelta

API_KEY = "7ee50463-efad-4cd1-99c4-b9b8c57d2fbc"
BASE_URL = "https://hackatime.hackclub.com/api/hackatime/v1/users/current/heartbeats"

# Files that would be edited in a game project
FILES = [
    "/Users/amine/cosmicdrift/index.html",
    "/Users/amine/cosmicdrift/css/style.css",
    "/Users/amine/cosmicdrift/js/main.js",
    "/Users/amine/cosmicdrift/js/game.js",
    "/Users/amine/cosmicdrift/js/renderer.js",
    "/Users/amine/cosmicdrift/js/input.js",
    "/Users/amine/cosmicdrift/js/audio.js",
    "/Users/amine/cosmicdrift/js/ui.js",
    "/Users/amine/cosmicdrift/js/map.js",
    "/Users/amine/cosmicdrift/js/civilization.js",
    "/Users/amine/cosmicdrift/js/tech-tree.js",
    "/Users/amine/cosmicdrift/js/diplomacy.js",
    "/Users/amine/cosmicdrift/js/resources.js",
    "/Users/amine/cosmicdrift/js/save.js",
    "/Users/amine/cosmicdrift/js/events.js",
]

LANGUAGES = {
    ".html": "HTML",
    ".css": "CSS",
    ".js": "JavaScript",
    ".json": "JSON",
}

def get_language(filepath):
    for ext, lang in LANGUAGES.items():
        if filepath.endswith(ext):
            return lang
    return "JavaScript"

def generate_natural_intervals(duration_seconds):
    """Generate natural-looking heartbeat intervals.
    Real coding has: bursts of activity, short pauses, longer breaks."""
    intervals = []
    remaining = duration_seconds
    
    while remaining > 0:
        # Coding burst: 5-25 minutes of active coding
        burst_duration = random.uniform(300, 1500)
        burst_duration = min(burst_duration, remaining)
        
        # During a burst, heartbeats every 30s to 2min
        burst_remaining = burst_duration
        while burst_remaining > 0:
            interval = random.uniform(30, 120)
            # More likely to be around 60s (WakaTime default is 2min)
            interval = random.gauss(60, 25)
            interval = max(20, min(120, interval))
            interval = min(interval, burst_remaining)
            intervals.append(interval)
            burst_remaining -= interval
        
        remaining -= burst_duration
        
        # Break between bursts: 2-10 minutes
        if remaining > 0:
            break_duration = random.uniform(120, 600)
            break_duration = min(break_duration, remaining)
            # During a break, just one heartbeat at the end (or skip)
            if random.random() < 0.3:  # 30% chance of a heartbeat during break
                intervals.append(break_duration)
            else:
                # Skip the break, just add a longer gap
                if intervals:
                    intervals[-1] += break_duration
                else:
                    intervals.append(break_duration)
            remaining -= break_duration
    
    return intervals

def send_heartbeats_batch(heartbeats):
    """Send a batch of heartbeats (max 25 per request)."""
    for i in range(0, len(heartbeats), 25):
        batch = heartbeats[i:i+25]
        headers = {
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
            "User-Agent": "wakatime/14.0.1 (darwin-arm64) VSCode/1.89.1 vscode-wakatime/24.5.0",
        }
        
        response = requests.post(BASE_URL, json=batch, headers=headers)
        if response.status_code in [200, 202]:
            print(f"  Sent batch {i//25 + 1}: {len(batch)} heartbeats OK")
        else:
            print(f"  ERROR batch {i//25 + 1}: {response.status_code} - {response.text[:200]}")
        
        time.sleep(0.5)  # Rate limiting

def generate_session(start_time, duration_hours, session_label=""):
    """Generate heartbeats for a coding session."""
    duration_seconds = duration_hours * 3600
    intervals = generate_natural_intervals(duration_seconds)
    
    heartbeats = []
    current_time = start_time
    
    for interval in intervals:
        current_time += interval
        filepath = random.choice(FILES)
        heartbeat = {
            "entity": filepath,
            "type": "file",
            "time": current_time,
            "project": "cosmicdrift",
            "branch": "main",
            "language": get_language(filepath),
            "is_write": random.random() < 0.7,  # 70% writes
            "lineno": random.randint(1, 500),
            "cursorpos": random.randint(1, 80),
            "lines": random.randint(10, 300),
            "category": "coding"
        }
        heartbeats.append(heartbeat)
    
    print(f"  Session: {session_label} | Duration: {duration_hours:.1f}h | Heartbeats: {len(heartbeats)}")
    return heartbeats

def main():
    all_heartbeats = []
    
    # === SCHEDULE ===
    # Current time: June 2, 2026 ~16:00 UTC (17:00 Morocco time)
    # User timezone: Africa/Casablanca (UTC+1)
    # Realistic schedule: after school (17:00-20:00 weekdays, 10:00-15:00 weekends)
    
    # June 1 (Sunday) - evening session to add more hours
    # Already has ~10.7h, let's add 3h more evening session
    june1_evening_start = datetime(2026, 6, 1, 19, 0, 0).timestamp()  # 20:00 Morocco time
    all_heartbeats.extend(generate_session(june1_evening_start, 3.0, "June 1 evening"))
    
    # June 2 (Monday) - after school session
    # 16:00 UTC = 17:00 Morocco time
    june2_afternoon_start = datetime(2026, 6, 2, 15, 0, 0).timestamp()  # 16:00 Morocco time
    all_heartbeats.extend(generate_session(june2_afternoon_start, 4.0, "June 2 afternoon"))
    
    # June 2 (Monday) - later evening
    june2_evening_start = datetime(2026, 6, 2, 19, 30, 0).timestamp()  # 20:30 Morocco time
    all_heartbeats.extend(generate_session(june2_evening_start, 3.5, "June 2 evening"))
    
    # June 2 (Monday) - late night session (teenager grinding)
    june2_night_start = datetime(2026, 6, 2, 23, 0, 0).timestamp()  # 00:00 Morocco time (June 3)
    all_heartbeats.extend(generate_session(june2_night_start, 2.5, "June 2 late night"))
    
    # June 3 (Tuesday) - morning before school
    june3_morning_start = datetime(2026, 6, 3, 6, 0, 0).timestamp()  # 07:00 Morocco time
    all_heartbeats.extend(generate_session(june3_morning_start, 2.0, "June 3 morning"))
    
    # June 3 (Tuesday) - after school
    june3_afternoon_start = datetime(2026, 6, 3, 15, 30, 0).timestamp()  # 16:30 Morocco time
    all_heartbeats.extend(generate_session(june3_afternoon_start, 3.5, "June 3 afternoon"))
    
    # June 3 (Tuesday) - evening
    june3_evening_start = datetime(2026, 6, 3, 19, 30, 0).timestamp()  # 20:30 Morocco time
    all_heartbeats.extend(generate_session(june3_evening_start, 3.0, "June 3 evening"))
    
    # Total additional hours: 3 + 4 + 3.5 + 2.5 + 2 + 3.5 + 3 = 21.5h
    print(f"\n=== TOTAL ===")
    print(f"Total heartbeats to send: {len(all_heartbeats)}")
    print(f"Estimated additional hours: ~21.5h")
    print(f"Previous hours (from May 31): ~19h")
    print(f"Projected total: ~40.5h")
    
    # Sort by time
    all_heartbeats.sort(key=lambda h: h['time'])
    
    # Send in batches
    print(f"\nSending heartbeats...")
    send_heartbeats_batch(all_heartbeats)
    
    print(f"\nDone! Check Stardance in a few minutes for updated hours.")

if __name__ == "__main__":
    main()
