# CosmicDrift 🚀🌌

A terminal-based space survival game.

You're the captain of a stranded spaceship. Your mission: navigate through procedurally generated star systems and reach **Starbase Omega** before your resources run out.

Built by Amine (@VitalCheffe) for Hack Club Stardance.

## Gameplay

- **Explore** procedurally generated star maps with different star types
- **Manage** fuel, oxygen, hull integrity, and credits
- **Survive** random encounters: asteroid fields, solar flares, pirates, nebulae
- **Collect** resources from star systems to keep going
- **Upgrade** your ship with better equipment
- **Reach** Starbase Omega at sector (15, 15) to win

## Star Types

| Star | Resources | Risk |
|------|-----------|------|
| ☀ Yellow | Balanced | Low |
| ● Red | Metals | Medium |
| ◆ Blue | Oxygen | Medium |
| ○ White | Minerals | Low |
| ⚡ Neutron | Rare | High |
| ◉ BlackHole | None | Extreme |

## Controls

```
W/↑  - Move north    E - Collect resources
S/↓  - Move south    R - Repair hull (20 credits)
A/←  - Move west     F - Scan nearby systems
D/→  - Move east     Q - Quit
```

## Difficulty Levels

- **Cadet** — More resources, less damage
- **Captain** — Balanced experience
- **Admiral** — Minimal resources, maximum danger

## Installation

```bash
git clone https://github.com/VitalCheffe/cosmicdrift.git
cd cosmicdrift
npm install
npm run build
npm start
```

## Tech Stack

- **TypeScript** — Type-safe game logic
- **blessed** — Terminal UI framework
- **Node.js** — Runtime

## Project Structure

```
cosmicdrift/
├── src/
│   ├── index.ts          # Game entry point
│   ├── core/
│   │   ├── state.ts      # Game state management
│   │   ├── movement.ts   # Ship navigation
│   │   ├── resources.ts  # Resource collection
│   │   ├── events.ts     # Random encounters
│   │   ├── input.ts      # Keyboard input handler
│   │   ├── scan.ts       # System scanner
│   │   ├── difficulty.ts # Difficulty settings
│   │   ├── upgrades.ts   # Ship upgrades
│   │   ├── wincondition.ts # Win condition
│   │   ├── saveload.ts   # Save/load system
│   │   └── score.ts      # Score calculation
│   ├── generators/
│   │   ├── names.ts      # Star name generator
│   │   └── starmap.ts    # Procedural map generator
│   ├── types/
│   │   └── game.ts       # Type definitions
│   └── ui/
│       ├── screen.ts     # Main game screen
│       ├── starmap.ts    # Map renderer
│       ├── hud.ts        # HUD renderer
│       ├── systeminfo.ts # System info display
│       └── ascii.ts      # ASCII art
├── package.json
└── tsconfig.json
```

## License

MIT
