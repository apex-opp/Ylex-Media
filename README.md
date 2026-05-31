# Ylex Media — 3D immersive agency site (Next.js + R3F + GSAP)

## Run locally
```bash
npm i
npm run dev
```

## Deploy (Vercel)
- Push repo to GitHub
- Import in Vercel
- Build command: `next build`
- Output: Next.js default

## Assets
- Team images currently use generated SVGs:
  - `public/team/tushar.svg`
  - `public/team/sachin.svg`
Replace them with real portraits (keep filenames) for an instant upgrade.

## Notes
- Smooth scroll uses a lerp-based transform scroller with GSAP ScrollTrigger proxying.
- GSAP contexts are reverted on unmount to prevent leaks.
