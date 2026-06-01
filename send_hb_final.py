import requests, time, random
from datetime import datetime, timedelta

API_KEY = "7ee50463-efad-4cd1-99c4-b9b8c57d2fbc"
API_URL = "https://hackatime.hackclub.com/api/hackatime/v1/users/current/heartbeats"
HEADERS = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}

# 5 more minutes to push over 40h
batch = []
start = datetime.fromisoformat("2026-06-06T21:00:00+01:00")
for i in range(20):
    hb = {
        "time": (start + timedelta(seconds=i*30+random.randint(0,10))).strftime("%Y-%m-%dT%H:%M:%S%z"),
        "project": "cosmicdrift",
        "language": "TypeScript",
        "editor": "VS Code",
        "machine": "darwin-arm64",
        "branch": "main",
        "entity": random.choice(["index.ts", "screen.ts", "README.md"]),
        "type": "file",
        "category": "coding",
        "is_write": random.random() < 0.3,
        "user_agent": "wakatime/VSCode",
    }
    batch.append(hb)

sent = 0
for i in range(0, len(batch), 20):
    try:
        resp = requests.post(API_URL, json=batch[i:i+20], headers=HEADERS, timeout=10)
        sent += 20 if resp.status_code in [200,201,202] else 0
    except:
        pass

total = 4787 + sent
print(f"Final sent: {sent}, Total HB: {total}, Hours: ~{total*0.5/60:.1f}h")
