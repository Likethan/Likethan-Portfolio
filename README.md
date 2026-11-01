# LIKETHAN K J — Creative Developer Portfolio

Premium cinematic portfolio built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, **Framer Motion**, **GSAP**, **Three.js**, and **Lenis**.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Project structure

```
src/
├── app/              # App Router (layout, page, loading, template)
├── components/
│   ├── sections/     # Page sections (Hero, About, Projects, …)
│   ├── motion/       # SectionMotion, TiltCard, MagneticButton
│   ├── effects/      # Lenis, spotlight, Three.js particles
│   ├── ui/           # shadcn-style primitives
│   └── layout/       # Navbar, Footer
└── lib/
    └── siteData.ts   # All portfolio content (edit here)
public/
├── hero.png
└── likethan-kj-resume.pdf
```

## Deploy to Vercel

1. Push this folder to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Framework preset: **Next.js** (defaults are fine).
4. Deploy.

## Customize content

Edit `src/lib/siteData.ts` for copy, links, projects, skills, and stats.

## Assets

- Hero: `/hero.png`
- Resume: `/likethan-kj-resume.pdf`
