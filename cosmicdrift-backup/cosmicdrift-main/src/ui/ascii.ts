// ASCII art for the game
// Star types, ships, and visual elements with color codes

export const STAR_ART: Record<string, string[]> = {
  Yellow: [
    '     ╱╲     ',
    '   ╱ ☀ ╲   ',
    '  ╱ Ylw ╲  ',
    '   ╲Star╱   ',
    '     ╲╱     ',
  ],
  Red: [
    '     ╱╲     ',
    '   ╱ 🔴 ╲   ',
    '  ╱ Red ╲  ',
    '   ╲Gnt╱   ',
    '     ╲╱     ',
  ],
  Blue: [
    '     ╱╲     ',
    '   ╱ 🔵 ╲   ',
    '  ╱Blue ╲  ',
    '   ╲Gnt╱   ',
    '     ╲╱     ',
  ],
  White: [
    '     ╱╲     ',
    '   ╱ ⚪ ╲   ',
    '  ╱Wht ╲  ',
    '   ╲Dwf╱   ',
    '     ╲╱     ',
  ],
  Neutron: [
    '    ╱⚡╲    ',
    '   ╱    ╲   ',
    '  │Neutrn│  ',
    '   ╲    ╱   ',
    '    ╲⚡╱    ',
  ],
  BlackHole: [
    '    ╱~~╲    ',
    '   │ ◉◉ │   ',
    '   │VOID│   ',
    '   │ ◉◉ │   ',
    '    ╲~~╱    ',
  ],
};

export const SHIP_ART = [
  '      ▲      ',
  '     ╱ ╲     ',
  '    ╱ ☀ ╲    ',
  '   ╱─────╲   ',
  '  ╱═══════╲  ',
  '  ╲═══════╱  ',
  '   ╲─────╱   ',
  '    ╲   ╱    ',
  '     ╲ ╱     ',
  '      ▼      ',
];

export const EMPTY_SPACE = [
  '   ·  ·     ',
  '     ·    ·  ',
  '   ·     ·   ',
  '     ·      ',
  '   ·    ·    ',
];

export const TITLE_ART = [
  '  ██████╗██╗   ██╗██████╗ ███████╗██████╗ ██████╗  ██████╗ ███╗   ██╗',
  ' ██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔═══██╗████╗  ██║',
  ' ██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝██║  ██║██║   ██║██╔██╗ ██║',
  ' ██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗██║  ██║██║   ██║██║╚██╗██║',
  ' ╚██████╗   ██║   ██████╔╝███████╗██║  ██║██████╔╝╚██████╔╝██║ ╚████║',
  '  ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚═╝  ╚═══╝',
];

export const DEATH_ART = [
  '  ██╗   ██╗ ██████╗ ██╗   ██╗    ██╗',
  '  ╚██╗ ██╔╝██╔═══██╗██║   ██║    ██║',
  '   ╚████╔╝ ██║   ██║██║   ██║    ██║',
  '    ╚██╔╝  ██║   ██║██║   ██║    ╚═╝',
  '     ██║   ╚██████╔╝╚██████╔╝    ██╗',
  '     ╚═╝    ╚═════╝  ╚═════╝     ╚═╝',
];

export const WIN_ART = [
  '  ██╗    ██╗ ██████╗ ██████╗ ███████╗',
  '  ██║    ██║██╔═══██╗██╔══██╗██╔════╝',
  '  ██║ █╗ ██║██║   ██║██████╔╝█████╗  ',
  '  ██║███╗██║██║   ██║██╔══██╗██╔══╝  ',
  '  ╚███╔███╔╝╚██████╔╝██║  ██║███████╗',
  '   ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝',
];

export function getResourceBar(current: number, max: number = 100, width: number = 20): string {
  const filled = Math.round((current / max) * width);
  const empty = width - filled;
  return `${'█'.repeat(filled)}${'░'.repeat(empty)}`;
}

export function getResourceColor(value: number): string {
  if (value > 60) return 'green';
  if (value > 30) return 'yellow';
  return 'red';
}
