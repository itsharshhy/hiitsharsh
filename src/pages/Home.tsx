import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Page from '../components/Page';
import Sticker, { type Spot } from '../components/collage/Sticker';
import {
  Beads, Camera, Cherries, Crossword, Envelope, ForgetMeNots, PebbleDish, PressedFlower, RedString, StickyNote, Tickets, VinylSleeve,
} from '../components/collage/Items';
import Polaroid from '../components/Polaroid';
import Avatar from '../components/Avatar';
import Cat from '../components/cats/Cat';
import { useMedia } from '../hooks/useMedia';
import { projects } from '../content/projects';
import { site } from '../content/site';

type Item = { id: string; d: Spot; m: Spot; label?: string; to?: string; el: React.ReactNode };

// d = desktop position, m = phone position. x/y are % of the table, w is % of its width.
const items: Item[] = [
  { id: 'beads', d: { x: 8, y: 17, w: 23, r: -6 }, m: { x: 3, y: 8, w: 52, r: -6 }, el: <Beads word={site.firstName} /> },
  { id: 'note', d: { x: 32, y: 13, w: 14, r: -5 }, m: { x: 61, y: 6, w: 33, r: 6 }, el: <StickyNote /> },
  { id: 'envelope', d: { x: 54, y: 10, w: 18, r: 5 }, m: { x: 48, y: 21, w: 44, r: 5 }, label: 'contact →', to: '/contact', el: <Envelope /> },
  { id: 'fmn1', d: { x: 6, y: 37, w: 9, r: 0 }, m: { x: 4, y: 20, w: 20, r: 0 }, el: <ForgetMeNots tone="violet" /> },
  { id: 'camera', d: { x: 20, y: 35, w: 20, r: 6 }, m: { x: 3, y: 28, w: 48, r: -5 }, label: 'about me →', to: '/about', el: <Camera /> },
  { id: 'vinyl', d: { x: 57, y: 37, w: 22, r: -4 }, m: { x: 50, y: 55, w: 46, r: 4 }, label: 'Plant a Thought →', to: '/work/plant-a-thought', el: <VinylSleeve title="Plant a Thought" /> },
  { id: 'flower', d: { x: 79, y: 26, w: 14, r: 8 }, m: { x: 74, y: 37, w: 22, r: 10 }, el: <PressedFlower /> },
  { id: 'fmn2', d: { x: 75, y: 25, w: 6, r: 20 }, m: { x: 42, y: 86, w: 14, r: 20 }, el: <ForgetMeNots /> },
  { id: 'dish', d: { x: 7, y: 60, w: 20, r: -8 }, m: { x: 2, y: 56, w: 46, r: -8 }, label: 'Pebble →', to: '/work/pebble', el: <PebbleDish /> },
  { id: 'tickets', d: { x: 27, y: 62, w: 21, r: -4 }, m: { x: 3, y: 71, w: 52, r: -6 }, label: '7 Wonders →', to: '/work/seven-wonders-studio', el: <Tickets /> },
  { id: 'cherries', d: { x: 49, y: 62, w: 8, r: -6 }, m: { x: 40, y: 64, w: 14, r: 0 }, el: <Cherries /> },
  { id: 'cat-loaf', d: { x: 41, y: 30, w: 9, r: 0 }, m: { x: 30, y: 49, w: 26, r: 0 }, el: <Cat pose="loaf" /> },
  { id: 'cat-sit', d: { x: 88, y: 46, w: 6, r: 0 }, m: { x: 80, y: 68, w: 16, r: 0 }, el: <Cat pose="sit" eyes="blue" /> },
  { id: 'crossword', d: { x: 77, y: 56, w: 17, r: 4 }, m: { x: 60, y: 76, w: 36, r: 6 }, el: <Crossword /> },
];

export default function Home() {
  const table = useRef<HTMLDivElement>(null);
  const phone = useMedia('(max-width: 720px)');
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 500);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <Page title={`${site.firstName}'s Archive`} className="home">
      <section className="table" ref={table} aria-label="A messy desk of things I like">
        <div className="table__string" aria-hidden="true">
          <RedString />
        </div>
        {items.map((it, i) => (
          <Sticker key={`${it.id}-${phone ? 'm' : 'd'}`} spot={phone ? it.m : it.d} bounds={table} index={i} label={it.label} to={it.to}>
            {it.el}
          </Sticker>
        ))}
        <motion.h1
          className="table__title"
          initial={{ opacity: 0, letterSpacing: '0.2em' }}
          animate={{ opacity: 1, letterSpacing: '-0.02em' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>{site.firstName}'s</span>
          <span>Archive</span>
        </motion.h1>
        <p className="table__hint">psst… everything here can be dragged around. click the envelope ✿</p>
      </section>

      <section className="intro">
        <Cat pose="peek" eyes="green" className="intro__cat" />
        <p className="intro__kicker">hello, hi, namaste —</p>
        <p className="intro__line">
          I'm <em>{site.name}</em>, a {site.role} from {site.location}. {site.tagline}
        </p>
      </section>

      <section id="work" className="work-list" aria-labelledby="work-title">
        <header className="work-list__head">
          <h2 id="work-title">The Work</h2>
          <p className="scribble">five things I made & love ↓</p>
          <Link to="/work" className="work-list__all">see them all on the projects page →</Link>
        </header>

        {projects.map((p, i) => (
          <motion.article
            key={p.slug}
            className={`spread ${i % 2 ? 'spread--flip' : ''}`}
            style={{ '--paper': p.theme.paper, '--ink': p.theme.ink, '--accent': p.theme.accent, '--wash': p.theme.wash } as React.CSSProperties}
            initial={{ opacity: 0, y: 60, rotate: i % 2 ? 1.5 : -1.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 0.6 : -0.6 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to={`/work/${p.slug}`} className="spread__photo" aria-label={`Read about ${p.title}`}>
              <Polaroid src={p.shots[0].src} alt={p.shots[0].alt} caption={p.sticker} tilt={i % 2 ? 3 : -3} tape={(['kraft', 'blue', 'yellow'] as const)[i % 3]} />
            </Link>
            <div className="spread__text">
              <p className="spread__num">0{i + 1} · {p.kind} · {p.year}</p>
              <h3>{p.title}</h3>
              <p className="spread__one">{p.oneLiner}</p>
              <ul className="chips" aria-label="Built with">
                {p.stack.slice(0, 4).map((s) => (
                  <li key={s.name}>{s.name}</li>
                ))}
              </ul>
              <Link to={`/work/${p.slug}`} className="btn">
                read the story <span aria-hidden="true">→</span>
              </Link>
            </div>
          </motion.article>
        ))}
      </section>

      <section className="hello-strip">
        <div className="hello-strip__avatar">
          <Avatar size="small" />
        </div>
        <div>
          <p className="scribble">this is me, more or less.</p>
          <p className="hello-strip__line">There's a whole page about who I am, what I like and what I'm making next.</p>
          <div className="hello-strip__ctas">
            <Link to="/about" className="btn btn--cream">about me →</Link>
            <Link to="/contact" className="btn btn--ghost">send a letter ✉</Link>
          </div>
        </div>
      </section>
    </Page>
  );
}
