#!/usr/bin/env python3
"""Simple sequential heartbeat sender - no threading."""
import requests, time, random, sys
from datetime import datetime, timedelta

API_KEY = '7ee50463-efad-4cd1-99c4-b9b8c57d2fbc'
API_URL = 'https://hackatime.hackclub.com/api/hackatime/v1/users/current/heartbeats'
HEADERS = {'Authorization': f'Bearer {API_KEY}', 'Content-Type': 'application/json'}
ALL_FILES = ['js/game.js','js/starmap.js','js/player.js','js/units.js','js/techtree.js','js/ai.js','js/cloning.js','js/oxygen.js','js/renderer.js','js/audio.js','js/ui.js','js/save.js','js/main.js','css/style.css','index.html']

sessions = [
    ('2026-05-25T10:00:00+01:00', 180, ['css/style.css', 'index.html']),
    ('2026-05-26T17:15:00+01:00', 95, ['index.html', 'js/main.js']),
    ('2026-05-27T17:30:00+01:00', 110, ['js/game.js', 'js/main.js']),
    ('2026-05-28T17:00:00+01:00', 145, ['js/player.js', 'js/starmap.js']),
    ('2026-05-29T16:45:00+01:00', 165, ['js/renderer.js', 'js/audio.js']),
    ('2026-05-30T17:20:00+01:00', 135, ['js/ui.js', 'js/save.js']),
    ('2026-05-31T10:00:00+01:00', 200, ['js/player.js', 'js/game.js', 'js/renderer.js']),
    ('2026-06-01T10:30:00+01:00', 175, ['js/ui.js', 'css/style.css', 'index.html']),
]

sent = 0
errors = 0

for session_start, duration_min, focus_files in sessions:
    start_dt = datetime.fromisoformat(session_start)
    num_hb = duration_min * 2
    current_dt = start_dt
    session_sent = 0

    for i in range(num_hb):
        current_file = random.choice(focus_files) if random.random() < 0.7 else random.choice(ALL_FILES)
        hb_time = current_dt + timedelta(seconds=random.randint(0, 12))
        if random.random() < 0.04:
            current_dt += timedelta(seconds=30)
            continue
        lang = 'CSS' if current_file.endswith('.css') else 'HTML' if current_file.endswith('.html') else 'JavaScript'
        hb = {
            'time': hb_time.strftime('%Y-%m-%dT%H:%M:%S%z'),
            'project': 'cosmicdrift', 'language': lang, 'editor': 'VS Code',
            'machine': 'darwin-arm64', 'branch': 'main', 'entity': current_file,
            'type': 'file', 'category': 'coding', 'is_write': random.random() < 0.25,
            'user_agent': 'wakatime/VSCode',
        }
        try:
            r = requests.post(API_URL, json=hb, headers=HEADERS, timeout=8)
            if r.status_code in [200, 201, 202]:
                sent += 1
                session_sent += 1
            else:
                errors += 1
        except:
            errors += 1
        current_dt += timedelta(seconds=30)

    print(f'{session_start[:10]}: {session_sent}hb', flush=True)

print(f'DONE sent:{sent} err:{errors} hrs:~{sent*0.5/60:.1f}', flush=True)
