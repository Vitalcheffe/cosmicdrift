#!/usr/bin/env python3
"""Merge cover + body PDFs for AfriGrid submission"""

from pypdf import PdfReader, PdfWriter, Transformation

A4_W, A4_H = 595.28, 841.89

def normalize_page_to_a4(page):
    box = page.mediabox
    w, h = float(box.width), float(box.height)
    if abs(w - A4_W) > 2 or abs(h - A4_H) > 2:
        sx, sy = A4_W / w, A4_H / h
        page.add_transformation(Transformation().scale(sx=sx, sy=sy))
        page.mediabox.lower_left = (0, 0)
        page.mediabox.upper_right = (A4_W, A4_H)
    return page

writer = PdfWriter()

# Add cover page
cover_page = PdfReader('/home/z/my-project/tmp/cover.pdf').pages[0]
writer.add_page(normalize_page_to_a4(cover_page))

# Add body pages
for page in PdfReader('/home/z/my-project/tmp/body.pdf').pages:
    writer.add_page(normalize_page_to_a4(page))

# Add metadata
writer.add_metadata({
    '/Title': 'AfriGrid — Predictive Grid Intelligence for Sub-Saharan Africa',
    '/Author': 'HarchCorp S.A.',
    '/Creator': 'Z.ai',
    '/Subject': 'Tech Hub Africa Hackathon 2026 Submission'
})

output_path = '/home/z/my-project/download/AfriGrid_TechHubAfrica_2026.pdf'
with open(output_path, 'wb') as f:
    writer.write(f)

print(f"Merged PDF: {output_path}")
print(f"Pages: {len(writer.pages)}")

import os
size_kb = os.path.getsize(output_path) / 1024
print(f"Size: {size_kb:.1f} KB")
