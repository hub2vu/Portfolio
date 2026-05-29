# Portfolio — Min Kyungho (민경호)

Personal portfolio site for Min Kyungho — a research-oriented AI engineer
working on RF signal reconstruction, embodied AI, and LLM agent systems.

**"Research, reconstructed."** — a single-page, editorial-tech portfolio whose
visual language is built around the core research theme: turning *sparse signal
observation* into *full reconstruction*.

## Features

- **Dark / light themes** with a toggle (respects `prefers-color-scheme`,
  persisted to `localStorage`, no flash on load).
- **Animated signal hero** — a live `<canvas>` waveform that visualises the
  sparse → reconstructed motif.
- High-contrast, readable typography: **Fraunces** (display) · **Inter** (body)
  · **JetBrains Mono** (labels).
- Scroll progress, scroll-reveal animations, a cursor glow, and a section
  scroll-spy navigation.
- Fully responsive, accessible (reduced-motion aware, focus styles), and
  print-friendly for the CV section.

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The site is configured for GitHub Pages at:

```text
https://hub2vu.github.io/Portfolio/
```
