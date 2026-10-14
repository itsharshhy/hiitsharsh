# Harsh's Archive

My portfolio, made to feel like a scrapbook on a desk: drag the stickers around, open the envelope, wave at me.

## What's inside

| Page | What it does |
|---|---|
| `/` | A dark desk covered in draggable scrapbook objects (beads that spell my name, an envelope, a camera, a record, tickets, a pebble dish…). Some of them are doors: the envelope opens Contact, the camera opens About, and the record, tickets and pebble dish open each project. Below: the three projects as taped-down polaroids. |
| `/work/:slug` | A case study per project: the gist, why it exists, how it's made, how it looks (palette + type), what's inside, what I learned. Each page takes on that project's own colours. |
| `/about` | A zine-style "HELLO! I AM…" poster with an animated illustrated me (blinks, follows your cursor, waves), then the longer story. |
| `/contact` | An envelope that opens into a letter. Writing it opens your email app with the message already filled in. |

## How it's built

- **React 19 + TypeScript**: pages are components, and the content is typed data, so a typo in a project field is caught before it ships.
- **Vite**: dev server and production bundler.
- **React Router**: real URLs for every page (`/about`, `/work/pebble`) instead of one long scroll.
- **Framer Motion**: dragging stickers, spring physics, page transitions, scroll-in reveals, the avatar's wave. All of it respects "reduce motion".
- **Inline SVG illustrations**: every object on the desk and every doodle is drawn in code. No stock images, crisp at any size, tiny to download.
- **Self-hosted fonts** via Fontsource: Instrument Serif, Instrument Sans, Patrick Hand, DM Mono.
- **Vercel**: hosting, with `vercel.json` rewrites so deep links work.

## Editing

- Personal details (email, phone, socials, bio): `src/content/site.ts`
- Projects: `src/content/projects.ts`
- The avatar's look (skin, hair, shirt, glasses): `src/content/avatar.ts`
- Desk layout (desktop and phone positions): `items` in `src/pages/Home.tsx`

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build into dist/
```
