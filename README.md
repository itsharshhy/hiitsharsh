# Harsh's Archive

My portfolio, made to feel like a scrapbook on a desk: drag the stickers around, open the envelope, wave at me.

## What's inside

| Page | What it does |
|---|---|
| `/` | An olive desk covered in draggable scrapbook objects (beads that spell my name, an envelope, a camera, a record, tickets, a pebble dish…). Some of them are doors: the envelope opens Contact, the camera opens About, and the record, tickets and pebble dish open each project. Below: the three projects as taped-down polaroids. |
| `/work/:slug` | A case study per project: the gist, why it exists, how it's made, how it looks (palette + type), what's inside, what I learned. Each page takes on that project's own colours. |
| `/work` | All three projects as a paper collage: cut-out lettering, taped screenshots, margin notes, cats. |
| `/about` | "HI, I'M HARSH." in cut-out letters next to pixel-art me (blinks, glints, says hi), the longer story with the portrait sliced into paper strips, what I'm up to and a toolbox. |
| `/contact` | A big portrait of pixel-art me with minimal hand-drawn icon links and a pen tag that writes conversation starters, then a letter form that emails me directly (via FormSubmit), fades away when sent, and confirms with "It's done". |

## How it's built

- **React 19 + TypeScript**: pages are components, and the content is typed data, so a typo in a project field is caught before it ships.
- **Vite**: dev server and production bundler.
- **React Router**: real URLs for every page (`/about`, `/work/pebble`) instead of one long scroll.
- **Framer Motion**: dragging stickers, spring physics, page transitions, scroll-in reveals, the avatar's wave. All of it respects "reduce motion".
- **Inline SVG illustrations**: every object on the desk and every doodle is drawn in code. No stock images, crisp at any size, tiny to download.
- **Self-hosted fonts** via Fontsource: Kumbh Sans, Instrument Serif, Instrument Sans, Patrick Hand, DM Mono.
- **Cats**: small white Persians drawn in SVG (`src/components/cats`) that sit, loaf, peek and walk. Click one.
- **GitHub Pages**: hosting. `.github/workflows/deploy.yml` builds and publishes on every push (Vercel also works via `vercel.json`).
- **Palette**: Olive Green `#4D694E` and Beige Cream `#FFF3D5` (tokens at the top of `src/styles/global.css`).

## Handbook

Domain setup, the contact form, deploying, editing and troubleshooting: see [`docs/HANDBOOK.md`](docs/HANDBOOK.md).

## Editing

- Personal details (email, phone, socials, bio): `src/content/site.ts`
- Projects: `src/content/projects.ts`
- The avatar: `public/harsh.webp` (animated by `src/components/Avatar.tsx`)
- Desk layout (desktop and phone positions): `items` in `src/pages/Home.tsx`

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build into dist/
```
