# DevLattice Academy Website

Official website concept for **DevLattice Academy**, a DevLattice System company.
Built with Next.js (App Router), React, TypeScript, Tailwind CSS, Motion, GSAP + ScrollTrigger, Lenis and Three.js.

## Two editions

| Route | Edition |
| --- | --- |
| `/` | Demo 1 · dark, cinematic edition with WebGL lattice |
| `/v2` | Demo 2 · light editorial edition with rose accent, stacked program cards and a full screen project viewer |

Keep the edition you prefer. To make Demo 2 the home page, move `src/app/(v2)/v2/page.tsx` to `src/app/(v2)/page.tsx` and delete `src/app/(main)/page.tsx`.

## Highlights

- Cinematic loader, staggered masked headline, WebGL lattice centrepiece with cursor parallax
- Lenis smooth scrolling synced with GSAP ScrollTrigger
- Pinned horizontal "learning philosophy" sequence, scroll-scrubbed manifesto, clip-path image reveals
- Course discovery with category tabs, level filter, search, 3D tilt cards and a detail dialog
- Course "Enquire" flow that pre-fills the inquiry form
- Portfolio gallery with filters and case-study dialog, testimonial carousel, achievements gallery
- Validated inquiry form with loading, success and error states
- Magnetic buttons, custom cursor, scroll progress bar, back-to-top ring, 404 and error pages
- Reduced-motion support, keyboard navigation, focus-trapped dialogs, semantic HTML, JSON-LD, Open Graph

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to /out
```

Requires Node.js 20.9 or newer.

## Editing content

All official information lives in two places:

| File | What it controls |
| --- | --- |
| `src/config/site.ts` | Name, contact details, social links, statistics, form endpoint, domain |
| `src/data/courses.ts` | Course catalogue |
| `src/data/content.ts` | Team, projects, testimonials, achievements |

Any value written in `[square brackets]` is treated as a placeholder and is shown with an amber
"Placeholder" marker. Replace it with verified information and the marker disappears automatically.
Never publish statistics, testimonials or certificates that are not verified.

Team photos: put images in `public/team/` and set `photo: "/team/name.jpg"`.

## Inquiry form

Set `formEndpoint` in `src/config/site.ts` to a form service URL (for example Formspree or Getform)
to deliver submissions directly. While it is empty, the form validates input and offers to open the
inquiry in the visitor's email app or copy it.

## Deploying to Vercel

1. Push this folder to a GitHub repository.
2. On https://vercel.com click **Add New → Project** and import the repository.
3. Keep the detected **Next.js** preset. No environment variables are required.
4. Click **Deploy**. Update `site.url` in `src/config/site.ts` with the final domain.

The project uses `output: "export"`, so the `out/` folder can also be hosted on Netlify,
Cloudflare Pages or GitHub Pages. `npm run build:artifact` produces a build with relative asset
paths that runs from any sub-folder. Use `node scripts/prepare-artifact.mjs v2.html artifact-v2` for Demo 2.

## Structure

```
src/
  app/            layout, page, 404, error, global styles
  components/
    layout/       provider, smooth scroll, loader, navbar, footer, chrome
    sections/     hero, intro, about, philosophy, courses, team, projects,
                  testimonials, achievements, cta, contact
    three/        WebGL lattice scene
    ui/           magnetic button, tilt card, split reveal, modal, artwork
  config/         site configuration
  data/           editable content
```
