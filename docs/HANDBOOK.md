# Harsh's Archive — Site Handbook

Live at **https://itsharshhy.github.io/portfolio-/** (hosted free on GitHub Pages). Moves to your own domain once you buy one.

## Three things to know

1. **Every change goes through GitHub.** A push to `itsharshhy/portfolio-` builds and publishes the site in about a minute.
2. **The contact form emails you directly.** Letters go through FormSubmit to hiharshhyadav@gmail.com. It needs a one-time activation click.
3. **Your content lives in `src/content/`.** Details, projects and the about story are plain text.

## Custom domain

Domains checked on 14 Oct 2026 — available: itsmehy.com, itsmehy.in, hihy.in, itsharshhy.com, hiharshh.com, hiharsh.in, harshy.in. Taken: harshyadav.in, itsharsh.in, itsmeharsh.in.

1. **Buy** the domain at any registrar (Cloudflare Registrar, Namecheap, Porkbun, GoDaddy). Skip hosting/email add-ons.
2. **DNS records** at the registrar:

   | Type | Name | Value |
   | --- | --- | --- |
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | CNAME | www | itsharshhy.github.io |

   Remove any other A/CNAME records on `@` or `www` (parked pages).
3. **Add `public/CNAME`** containing just the domain (e.g. `itsmehy.com`) and push. The deploy sees it and builds for the domain root instead of `/portfolio-/`.
4. **GitHub → Settings → Pages → Custom domain**, enter it, Save. When the DNS check is green, tick **Enforce HTTPS** (can take up to an hour).
5. **Check** `https://yourdomain` and `https://www.yourdomain`. The github.io address redirects automatically.

## Contact form

- `/contact` posts letters to `https://formsubmit.co/ajax/hiharshhyadav@gmail.com`.
- You receive: name, their email (set as reply-to, so **Reply** writes back to them), topic and message.
- "It's done" only shows after FormSubmit confirms. On failure the letter stays and offers your email instead.
- **Activation:** the first letter makes FormSubmit email you an *Activate Form* link. Click it once. After moving to a new domain, send a test letter again in case it asks to re-activate.
- **Spam:** a hidden `_honey` field drops bots. A captcha can be added if needed.

## Deploying

- Recipe: `.github/workflows/deploy.yml` — install, build, copy a page file per route (so `/about` opens directly), publish to Pages.
- Watch it: repo → **Actions** → *Deploy to GitHub Pages*. Green = live. Red = failed, the last good version stays up.
- Re-run by hand: Actions → Deploy to GitHub Pages → **Run workflow**.
- Deploys from `claude/determined-hawking-hcq05w` (the default branch) or `main`.

## Editing

| To change | File |
| --- | --- |
| Name, role, location, tagline, socials | `src/content/site.ts` (empty `''` hides a social) |
| About story | `src/content/site.ts` → `story` (`**bold**`, `*italic*`, `> ` = pull quote) |
| Currently, likes | `src/content/site.ts` → `currently`, `likes` |
| Projects | `src/content/projects.ts` |
| Screenshots | `public/work/` |
| Avatar | `public/harsh.webp` (+ blink/glint positions in `src/components/Avatar.tsx`) |
| Colours | top of `src/styles/global.css` (olive `#4D694E`, beige `#FFF3D5`) |
| Home desk layout | `src/pages/Home.tsx` → `items` (`d` laptop, `m` phone) |
| Contact topics, pen words | `src/pages/Contact.tsx` → `topics`, `prompts` |
| Contact logos | `src/components/Logos.tsx` |

New project: copy a block in `projects.ts`, give it a new `slug`, and add `work/<slug>` to the route list in `deploy.yml`.

## How it's built

React 19 + TypeScript, Vite, React Router, Framer Motion, inline SVG illustrations, Fontsource fonts (Kumbh Sans, Instrument Serif, Instrument Sans, Patrick Hand, DM Mono), FormSubmit for email, GitHub Actions + Pages for hosting.

```
public/            harsh.webp, work/ screenshots, favicon.svg, CNAME (once you have a domain)
src/content/       site.ts, projects.ts, socials.ts
src/pages/         Home, Projects, Work, About, Contact, NotFound
src/components/    Avatar, Nav, Footer, Logos, cats/, collage/
src/styles/        global.css + about, projects, contact, collage, cats
.github/workflows/ deploy.yml
```

Run locally: Node.js 22, then `npm install` and `npm run dev`.

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| Change not showing | Check Actions; hard-refresh (Ctrl/Cmd + Shift + R) |
| Actions run is red | Open the run and read the failed step; old site stays up |
| Contact says "the post office didn't pick that up" | Click the FormSubmit activation email; retry later |
| No letters arriving | Check Spam/Promotions; mark "Not spam" |
| Domain shows a parked page | Recheck the A records and `www` CNAME; wait up to 24 h |
| Can't tick Enforce HTTPS | Wait up to an hour after the DNS check is green |
| Unstyled page on the new domain | `public/CNAME` missing — add it and push |

## Launch checklist

- [ ] Activate the contact form (FormSubmit email)
- [ ] Buy the domain
- [ ] Add the DNS records
- [ ] Add `public/CNAME` and push
- [ ] Set the custom domain in GitHub Pages, then Enforce HTTPS
- [ ] Send a test letter from the new address
- [ ] Check every page on phone and laptop
- [ ] Put the new link in your Instagram and GitHub bios
