# Ylex Media (Vite + React + R3F + GSAP + Tailwind)

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Notes
- Global WebGL background is rendered via React Three Fiber (fixed, behind UI).
- Smooth scrolling uses Lenis + GSAP ScrollTrigger sync.
- Custom cursor uses mix-blend-mode:difference and magnetizes to interactive elements.

## Vercel deploy note
This repo pins Node to 20 via `.nvmrc` and `package.json#engines` to avoid intermittent npm/node 22 install issues on some build environments.
