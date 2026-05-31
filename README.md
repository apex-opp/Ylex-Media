# Ylex Media — Interactive Blueprint Agency

A single-page, **blueprint / CAD / wireframe** agency site built with:

- **Next.js (App Router)**
- **React 19**
- **Tailwind CSS v4**
- **GSAP + ScrollTrigger** (scroll sequencing & drawing)
- **Motion (Framer Motion)** (component state transitions)

## Features (what you asked for)

- Blueprint grid overlay + **radial light mask** that tracks the cursor
- **SVG path tracing** that draws on scroll (section-to-section routing line)
- **Text scramble/glitch** on hover for headers/CTAs
- **3D parallax wire-cards** with tilt + SVG icon draw animation
- Custom **wireframe crosshair cursor** with magnetic snap + contextual labels
- Hero canvas viewport: **draggable pseudo-3D wireframe geometry** (click to deform)

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`

## Deploy (Vercel)

1. Push this repo to GitHub
2. Import into Vercel
3. Build command: `next build`
4. Output: Next.js default

## Edit content

- Sections live in `components/`
  - `Hero.jsx`
  - `Services.jsx`
  - `WarRoom.jsx`
  - `ContactFooter.jsx`

### War-Room resume injection (paste your PDF text)

1. Open: `data/resumeText.js`
2. Replace the example strings with your extracted PDF text layers:
   - `TUSHAR_RESUME_TEXT`
   - `DESIGNER_RESUME_TEXT`
3. The parser in `data/team.js` will auto-populate metrics/tools/bullets.

If parsing misses something, override fields directly in `data/team.js`.

## Assets (graphics included)

- `public/assets/ylex-logo.svg` (wireframe logo)
- `public/assets/blueprint-noise.png` (procedural noise texture)
- `public/og.png` (OpenGraph image)
- `public/favicon.svg`

## Notes

- Mobile uses the default OS cursor (custom cursor disables itself on coarse pointers).
- All RAF loops + listeners clean up on unmount.
- If you want a real contact backend, add a Route Handler under `app/api/`.
