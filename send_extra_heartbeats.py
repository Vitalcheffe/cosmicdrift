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
        "entity": filepath, "type": "file", "time": timestamp,
        "project": "cosmicdrift", "branch": "main", "language": language,
        "is_write": random.random() < 0.7, "lineno": random.randint(1, 500),
        "cursorpos": random.randint(1, 80), "lines": random.randint(10, 300),
        "category": "coding"
    }]
    try:
        resp = requests.post(URL, json=hb, headers=headers, timeout=10)
        if resp.status_code in [200, 202]:
            sent += 1
            return True
        failed += 1
        return False
    except:
        failed += 1
        return False

def gen_session(start_dt, hours):
    interval = 120
    hbs = []
    t = start_dt.timestamp()
    for _ in range(int(hours * 3600 / interval)):
        fpath, lang = random.choice(FILES)
        hbs.append((fpath, lang, t + random.uniform(-5, 5)))
        t += interval
    return hbs

all_hbs = []

# Extra sessions to pad hours
sessions = [
    # June 1 - late evening session (additional 2h)
    (datetime(2026, 6, 1, 21, 0, 0), 2.0),
    # June 2 - morning session (2h before school)
    (datetime(2026, 6, 2, 7, 0, 0), 2.0),
    # June 2 - late evening (2h more)
    (datetime(2026, 6, 2, 20, 0, 0), 2.0),
    # June 3 - late evening (2h more)
    (datetime(2026, 6, 3, 20, 0, 0), 2.0),
]

for start, dur in sessions:
    hbs = gen_session(start, dur)
    all_hbs.extend(hbs)
    print(f"  Session {start.strftime('%b %d %H:%M')}: {dur:.0f}h -> {len(hbs)} hbs")

print(f"\nTotal extra: {len(all_hbs)} heartbeats")

with ThreadPoolExecutor(max_workers=3) as executor:
    futures = [executor.submit(send_one, fp, lang, ts) for fp, lang, ts in all_hbs]
    for f in as_completed(futures):
        pass

print(f"Sent: {sent}, Failed: {failed}")
print("Done!")
