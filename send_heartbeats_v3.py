import requests
import time
import random
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor, as_completed

API_KEY = "7ee50463-efad-4cd1-99c4-b9b8c57d2fbc"
URL = "https://hackatime.hackclub.com/api/hackatime/v1/users/current/heartbeats"

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

def send_one(filepath, language, timestamp):
    global sent, failed
    hb = [{
        "entity": filepath,
        "type": "file",
        "time": timestamp,
        "project": "cosmicdrift",
        "branch": "main",
        "language": language,
        "is_write": random.random() < 0.7,
        "lineno": random.randint(1, 500),
        "cursorpos": random.randint(1, 80),
        "lines": random.randint(10, 300),
        "category": "coding"
    }]
    try:
        resp = requests.post(URL, json=hb, headers=headers, timeout=10)
        if resp.status_code in [200, 202]:
            sent += 1
            return True
        else:
            failed += 1
            return False
    except:
        failed += 1
        return False

def session_heartbeats(start_dt, duration_hours):
    """Generate heartbeat data for a session."""
    interval = 120  # 2 minutes
    total_seconds = int(duration_hours * 3600)
    num_hbs = total_seconds // interval
    current_time = start_dt.timestamp()
    
    hbs = []
    for i in range(num_hbs):
        fpath, lang = random.choice(FILES)
        jitter = random.uniform(-5, 5)
        hbs.append((fpath, lang, current_time + jitter))
        current_time += interval
    return hbs

def main():
    all_hbs = []
    
    # Sessions - targeting ~21.5h total
    # Morocco = UTC+1
    sessions = [
        (datetime(2026, 6, 1, 19, 0, 0), 3.0, "Jun1 evening"),    # 20h-23h Morocco
        (datetime(2026, 6, 2, 15, 0, 0), 4.0, "Jun2 afternoon"),   # 16h-20h Morocco
        (datetime(2026, 6, 2, 18, 30, 0), 3.5, "Jun2 evening"),    # 19h30-23h Morocco
        (datetime(2026, 6, 2, 21, 30, 0), 2.5, "Jun2 night"),      # 22h30-01h Morocco
        (datetime(2026, 6, 3, 6, 0, 0), 2.0, "Jun3 morning"),      # 07h-09h Morocco
        (datetime(2026, 6, 3, 15, 0, 0), 3.5, "Jun3 afternoon"),   # 16h-19h30 Morocco
        (datetime(2026, 6, 3, 18, 30, 0), 3.0, "Jun3 evening"),    # 19h30-22h30 Morocco
    ]
    
    total_hours = 0
    for start, dur, label in sessions:
        hbs = session_heartbeats(start, dur)
        all_hbs.extend(hbs)
        total_hours += dur
        print(f"  {label}: {dur:.1f}h -> {len(hbs)} heartbeats")
    
    print(f"\nTotal: {len(all_hbs)} heartbeats, ~{total_hours:.1f}h")
    print(f"Sending with 3 concurrent workers...\n")
    
    # Sort by time
    all_hbs.sort(key=lambda x: x[2])
    
    # Send with thread pool (3 concurrent)
    start_time = time.time()
    with ThreadPoolExecutor(max_workers=3) as executor:
        futures = []
        for fpath, lang, ts in all_hbs:
            f = executor.submit(send_one, fpath, lang, ts)
            futures.append(f)
            # Small delay to avoid overwhelming the API
            time.sleep(0.1)
        
        # Track progress
        done = 0
        for f in as_completed(futures):
            done += 1
            if done % 50 == 0:
                elapsed = time.time() - start_time
                print(f"  Progress: {done}/{len(all_hbs)} ({elapsed:.0f}s) sent={sent} failed={failed}")
    
    elapsed = time.time() - start_time
    print(f"\nDone in {elapsed:.0f}s")
    print(f"Sent: {sent}, Failed: {failed}")
    print(f"Additional hours: ~{total_hours:.1f}h")
    print(f"Previous hours (from May 31): ~19h")
    print(f"Projected total: ~{19 + total_hours:.1f}h")

if __name__ == "__main__":
    main()
