import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Page from '../components/Page';
import Cat from '../components/cats/Cat';
import { Arrow, InkFlower, Kinetic, Note, Scribble, Torn } from '../components/collage/Bits';
import { projects } from '../content/projects';
import { site } from '../content/site';
import '../styles/projects.css';

// Where each project's cut-out lands in the hero, among the big letters.
const heroSpots = [
  { left: '4%', top: '-8%', rot: -7, w: 'clamp(130px, 15%, 210px)' },
  { left: '44%', top: '74%', rot: 4, w: 'clamp(130px, 15%, 210px)' },
  { left: '80%', top: '2%', rot: -4, w: 'clamp(130px, 15%, 210px)' },
  { left: '66%', top: '64%', rot: 6, w: 'clamp(130px, 15%, 210px)' },
];

export default function Projects() {
  return (
    <Page title={`Projects · ${site.firstName}'s Archive`} className="projects">
      {/* ---------- hero: pink paper ---------- */}
      <section className="pj-hero on-dark">
        <div className="pj-hero__stage">
          <Kinetic as="h1" text="THINGS I'VE" className="pj-hero__line" />
          <Kinetic text="MADE (SO FAR)." className="pj-hero__line pj-hero__line--2" delay={0.35} />

          <span className="scrap scrap--navy pj-hero__scrap1" aria-hidden="true" />
          <span className="scrap scrap--red pj-hero__scrap2" aria-hidden="true" />

          {projects.map((p, i) => {
            const s = heroSpots[i % heroSpots.length];
            return (
              <motion.div
                key={p.slug}
                className={`pj-cut pj-cut--${i}`}
                style={{ left: s.left, top: s.top, width: s.w }}
                initial={{ opacity: 0, y: -100, rotate: s.rot - 20 }}
                animate={{ opacity: 1, y: 0, rotate: s.rot }}
                transition={{ type: 'spring', stiffness: 110, damping: 12, delay: 0.6 + i * 0.15 }}
                whileHover={{ scale: 1.06, rotate: 0, zIndex: 6 }}
              >
                <a
                  href={`#${p.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(p.slug)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <img src={p.shots[0].src} alt="" />
                  <span>{p.title}</span>
                </a>
              </motion.div>
            );
          })}

          <InkFlower className="pj-hero__flower" />
          <Note tone="lemon" tilt={-2} className="pj-hero__n1 note--tape" delay={1.1}>{projects.length} OF THEM, FOR NOW</Note>
          <Note tone="paper" tilt={4} className="pj-hero__n2" delay={1.3}>each one started<br />as a note in a notebook</Note>
          <Note tone="lilac" tilt={-5} className="pj-hero__n3" delay={1.5}>tap one ↓</Note>
          <Cat pose="sit" className="pj-hero__cat" />
          <Cat pose="peek" eyes="blue" className="pj-hero__peek" />
        </div>

        <div className="bubble pj-hero__bubble">
          <p>A field guide, a game, a desktop app and a website. Small, calm, made with care, and all of them shipped.</p>
          <svg viewBox="0 0 400 150" preserveAspectRatio="none" aria-hidden="true">
            <motion.path
              d="M60 16 C 170 -2, 362 6, 390 56 C 410 104, 300 136, 190 132 C 70 128, 2 108, 10 64 C 18 26, 110 8, 240 12"
              fill="none"
              stroke="var(--pen)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.3, delay: 1 }}
            />
          </svg>
          <Arrow className="bubble__arrow" color="var(--pen)" />
        </div>
      </section>

      {/* ---------- one section per project ---------- */}
      {projects.map((p, i) => (
        <section key={p.slug} id={p.slug} className={`pj ${i % 2 ? 'pj--flip pj--pink on-dark' : ''}`}>
          <Torn color={i % 2 ? 'var(--olive)' : 'var(--cream-2)'} under={i % 2 ? 'var(--olive-soft)' : 'var(--olive-deep)'} seed={11 + i * 9} className="torn--top" />
          <div className="pj__inner">
            <div className="pj__text">
              <p className="pj__num">0{i + 1}</p>
              <Kinetic as="h2" text={p.title.toUpperCase()} className="pj__title" />
              <p className="pj__meta">
                {p.kind} · {p.year} · <Scribble>{p.status}</Scribble>
              </p>
              <p className="pj__one">{p.oneLiner}</p>
              <ul className="dymo">
                {p.stack.map((s, k) => (
                  <motion.li
                    key={s.name}
                    initial={{ opacity: 0, y: 14, rotate: 0 }}
                    whileInView={{ opacity: 1, y: 0, rotate: (k % 2 ? 1 : -1) * 1.5 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + k * 0.06 }}
                  >
                    {s.name}
                  </motion.li>
                ))}
              </ul>
              <div className="pj__ctas">
                <Link to={`/work/${p.slug}`} className="pill">read the whole story →</Link>
                <a href={p.links[0].href} target="_blank" rel="noreferrer" className="pill pill--ghost">
                  {p.links[0].label} ↗
                </a>
              </div>
            </div>

            <div className="pj__collage">
              <motion.span
                className={`pj__scrap pj__scrap--${i % 4}`}
                aria-hidden="true"
                initial={{ scale: 0.6, rotate: -20, opacity: 0 }}
                whileInView={{ scale: 1, rotate: i % 2 ? 6 : -6, opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ type: 'spring', stiffness: 90, damping: 12 }}
              />
              <motion.figure
                className="pj__shot"
                initial={{ y: 80, opacity: 0, rotate: 0 }}
                whileInView={{ y: 0, opacity: 1, rotate: i % 2 ? -2 : 2 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ type: 'spring', stiffness: 90, damping: 14, delay: 0.15 }}
              >
                <span className="tape tape--clear" aria-hidden="true" />
                <img src={p.shots[0].src} alt={p.shots[0].alt} loading="lazy" />
              </motion.figure>
              {p.shots[1] && (
                <motion.figure
                  className="pj__phone"
                  initial={{ x: 60, opacity: 0, rotate: 0 }}
                  whileInView={{ x: 0, opacity: 1, rotate: i % 2 ? 6 : -6 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ type: 'spring', stiffness: 90, damping: 14, delay: 0.35 }}
                >
                  <img src={p.shots[1].src} alt={p.shots[1].alt} loading="lazy" />
                </motion.figure>
              )}
              <Note tone="paper" tilt={-5} className="pj__n1" delay={0.5}>{p.notes[0]}</Note>
              <Note tone={i % 2 ? 'lemon' : 'lilac'} tilt={4} className="pj__n2" delay={0.7}>{p.notes[1]}</Note>
              <Arrow className="pj__arrow" color="var(--ink)" />
              <Cat pose={p.cat.pose} eyes={p.cat.eyes} className={`pj__cat pj__cat--${p.cat.pose}`} />
            </div>
          </div>
        </section>
      ))}

      <section className="pj-end">
        <Torn color="var(--cream-2)" under="var(--cobalt)" seed={51} className="torn--top" />
        <Kinetic as="h2" text="MORE SOON." className="pj-end__line" />
        <p className="pj-end__sub">probably something with cats.</p>
        <Link to="/contact" className="pill">got an idea? write to me ✉</Link>
      </section>
    </Page>
  );
}
