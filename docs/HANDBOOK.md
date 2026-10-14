# Harsh's Archive — Site Handbook

Hosted free on GitHub Pages at **https://itsharshhy.github.io/hiitsharsh/** (repo: `itsharshhy/hiitsharsh`).

## Three things to know

1. **Every change goes through GitHub.** A push to `itsharshhy/hiitsharsh` builds and publishes the site in about a minute.
2. **The contact form emails you directly.** Letters go through FormSubmit to hiharshhyadav@gmail.com. It needs a one-time activation click.
3. **Your content lives in `src/content/`.** Details, projects and the about story are plain text.

## Your address

**https://itsharshhy.github.io/hiitsharsh/** — free, no domain to buy, no Vercel. GitHub serves a repo at `itsharshhy.github.io/<repo name>/`, so the address follows the repo name.

- **Want it shorter, at https://itsharshhy.github.io with nothing after it?** Rename the repo to exactly `itsharshhy.github.io` (Settings → General → Repository name), then Actions → *Deploy to GitHub Pages* → Run workflow. The deploy detects the name and builds for the root by itself.
- **Renamed it to something else?** Same thing: run the deploy once afterwards and the site moves to `itsharshhy.github.io/<new name>/`. The old address stops working, so update the links in your bios.

**Optional later**
- Free: `yourname.is-a.dev` via a pull request to the volunteer project is-a.dev.
- Paid (a few hundred to about a thousand rupees a year): a domain like `itsmehy.com` or `hihy.in` — add `public/CNAME` with the domain, point A records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` and a `www` CNAME to `itsharshhy.github.io`, then set it in Settings → Pages → Custom domain. The deploy handles the base path.

## Contact form

- `/contact` posts letters to `https://formsubmit.co/ajax/hiharshhyadav@gmail.com`.
- You receive: name, their email (set as reply-to, so **Reply** writes back to them), topic and message.
- "It's done" only shows after FormSubmit confirms. On failure the letter stays and offers your email instead.
- **Activation:** the first letter makes FormSubmit email you an *Activate Form* link. Click it once. After the repo rename, send a test letter from the new address in case it asks to re-activate.
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
public/            harsh.webp, work/ screenshots, favicon.svg (+ CNAME if you add a domain)
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
| Address shows 404 or a blank page after a rename | Not rebuilt yet — Actions → Run workflow |
| Page loads unstyled | Built for the old address — run the deploy again |

## Launch checklist

- [ ] Activate the contact form (FormSubmit email)
- [x] Rename the repo (`hiitsharsh`) and rebuild
- [ ] Send a test letter from https://itsharshhy.github.io/hiitsharsh/contact
- [ ] Check every page on phone and laptop
- [ ] Put https://itsharshhy.github.io/hiitsharsh/ in your Instagram and GitHub bios
