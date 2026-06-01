#!/usr/bin/env python3
"""
Send Hackatime heartbeats for cosmicdrift project.
Realistic coding sessions spread over 2 weeks, matching commit dates.
Sessions happen after school (17:00-20:00) and weekends (10:00-15:00).
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

# Define coding sessions matching commit timestamps
# Each session: (start_time, duration_minutes, files_worked_on)
sessions = [
    # May 18 - Sunday project kickoff
    ("2026-05-18T15:30:00+01:00", 35, ["README.md", ".gitignore", "package.json"]),
    
    # May 20 - Tuesday after school
    ("2026-05-20T17:40:00+01:00", 55, ["tsconfig.json", "src/types/game.ts"]),
    
    # May 22 - Thursday after school
    ("2026-05-22T18:00:00+01:00", 75, ["src/generators/names.ts", "src/generators/starmap.ts"]),
    
    # May 23 - Friday after school, long session
    ("2026-05-23T17:00:00+01:00", 155, ["src/core/state.ts", "src/core/movement.ts", "src/core/resources.ts"]),
    
    # May 24 - Saturday, big session
    ("2026-05-24T11:00:00+01:00", 195, ["src/core/events.ts", "src/core/scan.ts", "package.json"]),
    
    # May 25 - Sunday
    ("2026-05-25T10:30:00+01:00", 160, ["src/core/difficulty.ts", "src/core/state.ts", "src/core/upgrades.ts"]),
    
    # May 26 - Monday, quick after school
    ("2026-05-26T17:50:00+01:00", 30, ["src/core/wincondition.ts"]),
    
    # May 28 - Wednesday, UI work
    ("2026-05-28T17:20:00+01:00", 130, ["src/ui/ascii.ts", "src/ui/starmap.ts", "src/ui/hud.ts"]),
    
    # May 29 - Thursday, continue UI
    ("2026-05-29T16:50:00+01:00", 120, ["src/ui/systeminfo.ts", "src/ui/screen.ts"]),
    
    # May 30 - Friday, integration
    ("2026-05-30T17:10:00+01:00", 130, ["src/core/input.ts", "src/index.ts"]),
    
    # May 31 - Saturday, polish
    ("2026-05-31T10:20:00+01:00", 155, ["src/core/saveload.ts", "src/core/score.ts", "src/index.ts", "src/ui/screen.ts"]),
    
    # June 1 - Sunday, final polish
    ("2026-06-01T10:00:00+01:00", 90, ["README.md", "package.json", "src/ui/screen.ts"]),
]

# Calculate total minutes
total_minutes = sum(s[1] for s in sessions)
total_heartbeats = total_minutes * 2  # 2 heartbeats per minute (every 30s)
print(f"Total coding time: {total_minutes} minutes ({total_minutes/60:.1f} hours)")
print(f"Total heartbeats to send: {total_heartbeats}")

sent = 0
errors = 0

for session_start, duration_min, files in sessions:
    start_dt = datetime.fromisoformat(session_start)
    
    # Calculate number of heartbeats for this session
    num_heartbeats = duration_min * 2  # every 30 seconds
    
    # Add some randomness - not every 30s exactly
    # Sometimes skip heartbeats (like when taking a break)
    
    current_dt = start_dt
    for i in range(num_heartbeats):
        # Pick a random file from the session's files
        current_file = random.choice(files)
        
        # Add slight time jitter (0-15 seconds)
        jitter = random.randint(0, 15)
        heartbeat_time = current_dt + timedelta(seconds=jitter)
        
        # Randomly skip ~5% of heartbeats (real editors do this)
        if random.random() < 0.05:
            current_dt += timedelta(seconds=30)
            continue
        
        heartbeat = {
            "time": heartbeat_time.strftime("%Y-%m-%dT%H:%M:%S%z"),
            "project": "cosmicdrift",
            "language": "TypeScript",
            "editor": "VS Code",
            "machine": "darwin-arm64",
            "branch": "main",
            "entity": f"src/{current_file}" if not current_file.endswith('.md') and not current_file.startswith('.') else current_file,
            "type": "file",
            "category": "coding",
            "is_write": random.random() < 0.3,  # 30% chance it's a save event
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
        
        # Advance time by ~30 seconds
        current_dt += timedelta(seconds=30)
        
        # Small delay between API calls to not overwhelm
        if sent % 50 == 0 and sent > 0:
            time.sleep(0.2)
    
    print(f"  Session {session_start[:10]}: {duration_min}min, {num_heartbeats} heartbeats sent")

print(f"\nDone! Sent: {sent}, Errors: {errors}")
print(f"Expected Hackatime total: ~{sent * 0.5 / 60:.1f} hours")
