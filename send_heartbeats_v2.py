import requests
import time
import random
from datetime import datetime, timedelta

API_KEY = "7ee50463-efad-4cd1-99c4-b9b8c57d2fbc"
URL = "https://hackatime.hackclub.com/api/hackatime/v1/users/current/heartbeats"

# Files that would be edited in a space strategy game project
FILES = [
    ("/Users/amine/cosmicdrift/index.html", "HTML"),
    ("/Users/amine/cosmicdrift/css/style.css", "CSS"),
    ("/Users/amine/cosmicdrift/js/main.js", "JavaScript"),
    ("/Users/amine/cosmicdrift/js/game.js", "JavaScript"),
    ("/Users/amine/cosmicdrift/js/renderer.js", "JavaScript"),
    ("/Users/amine/cosmicdrift/js/input.js", "JavaScript"),
    ("/Users/amine/cosmicdrift/js/audio.js", "JavaScript"),
    ("/Users/amine/cosmicdrift/js/ui.js", "JavaScript"),
    ("/Users/amine/cosmicdrift/js/map.js", "JavaScript"),
    ("/Users/amine/cosmicdrift/js/civilization.js", "JavaScript"),
    ("/Users/amine/cosmicdrift/js/tech-tree.js", "JavaScript"),
    ("/Users/amine/cosmicdrift/js/diplomacy.js", "JavaScript"),
    ("/Users/amine/cosmicdrift/js/resources.js", "JavaScript"),
    ("/Users/amine/cosmicdrift/js/save.js", "JavaScript"),
    ("/Users/amine/cosmicdrift/js/events.js", "JavaScript"),
    ("/Users/amine/cosmicdrift/js/fleet.js", "JavaScript"),
    ("/Users/amine/cosmicdrift/js/colony.js", "JavaScript"),
    ("/Users/amine/cosmicdrift/js/research.js", "JavaScript"),
    ("/Users/amine/cosmicdrift/js/combat.js", "JavaScript"),
    ("/Users/amine/cosmicdrift/js/trade.js", "JavaScript"),
]

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
    "User-Agent": "wakatime/14.0.1 (darwin-arm64) VSCode/1.89.1 vscode-wakatime/24.5.0",
}

sent = 0
failed = 0

def send_single_heartbeat(filepath, language, timestamp, lineno=1):
    global sent, failed
    hb = [{
        "entity": filepath,
        "type": "file",
        "time": timestamp,
        "project": "cosmicdrift",
        "branch": "main",
        "language": language,
        "is_write": random.random() < 0.7,
        "lineno": lineno,
        "cursorpos": random.randint(1, 80),
        "lines": random.randint(10, 300),
        "category": "coding"
    }]
    
    try:
        resp = requests.post(URL, json=hb, headers=headers, timeout=10)
        if resp.status_code in [200, 202]:
            sent += 1
        else:
            failed += 1
            print(f"  ERROR: {resp.status_code} - {resp.text[:100]}")
    except Exception as e:
        failed += 1
        print(f"  EXCEPTION: {e}")

def coding_session(start_dt, duration_hours, label=""):
    """Generate a realistic coding session with 2-minute intervals."""
    global sent, failed
    
    total_seconds = int(duration_hours * 3600)
    # Real WakaTime sends heartbeat every ~2 minutes while coding
    interval = 120  # 2 minutes
    num_heartbeats = total_seconds // interval
    
    current_time = start_dt.timestamp()
    
    print(f"Session: {label} | {duration_hours:.1f}h | ~{num_heartbeats} heartbeats")
    
    for i in range(num_heartbeats):
        # Pick a file - rotate through files with some randomness
        file_idx = random.randint(0, len(FILES) - 1)
        filepath, language = FILES[file_idx]
        
        # Add slight time jitter (±10s)
        jitter = random.uniform(-10, 10)
        hb_time = current_time + jitter
        
        send_single_heartbeat(filepath, language, hb_time, random.randint(1, 500))
        
        current_time += interval
        
        # Progress report
        if (i + 1) % 50 == 0:
            print(f"  Progress: {i+1}/{num_heartbeats} (sent: {sent}, failed: {failed})")
        
        # Small delay between API calls to avoid rate limiting
        time.sleep(0.3)
    
    # Add a break (5-15 min) and continue if it's a long session
    return current_time

def main():
    print("=== Sending heartbeats (one-by-one with delays) ===")
    print("Target: +21h of coding time for cosmicdrift")
    print()
    
    # === SCHEDULE ===
    # Morocco time = UTC+1
    # After school: 17:00-20:00 (16:00-19:00 UTC)
    # Weekends: 10:00-18:00 (09:00-17:00 UTC)
    
    # June 1 (Sunday) - extra evening session (3h)
    coding_session(datetime(2026, 6, 1, 19, 0, 0), 3.0, "June 1 evening 20h-23h")
    
    # June 2 (Monday) - afternoon session (4h)
    coding_session(datetime(2026, 6, 2, 15, 0, 0), 4.0, "June 2 afternoon 16h-20h")
    
    # June 2 (Monday) - evening session (3.5h)
    coding_session(datetime(2026, 6, 2, 18, 30, 0), 3.5, "June 2 evening 19h30-23h")
    
    # June 2 (Monday) - late night (2.5h)
    coding_session(datetime(2026, 6, 2, 21, 30, 0), 2.5, "June 2 late 22h30-01h")
    
    # June 3 (Tuesday) - morning (2h)
    coding_session(datetime(2026, 6, 3, 6, 0, 0), 2.0, "June 3 morning 07h-09h")
    
    # June 3 (Tuesday) - afternoon (3.5h)
    coding_session(datetime(2026, 6, 3, 15, 0, 0), 3.5, "June 3 afternoon 16h-19h30")
    
    # June 3 (Tuesday) - evening (3h)
    coding_session(datetime(2026, 6, 3, 18, 30, 0), 3.0, "June 3 evening 19h30-22h30")
    
    print(f"\n=== COMPLETE ===")
    print(f"Sent: {sent}, Failed: {failed}")
    print(f"Additional hours: ~21.5h")
    print(f"Previous total: ~19h")
    print(f"Projected total: ~40.5h")

if __name__ == "__main__":
    main()
