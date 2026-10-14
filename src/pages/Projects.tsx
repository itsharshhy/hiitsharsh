import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Page from '../components/Page';
import Cat from '../components/cats/Cat';
import { Arrow, Kinetic, Marquee, Note, Scribble, Torn } from '../components/collage/Bits';
import { projects, type Project } from '../content/projects';
import { site } from '../content/site';
import '../styles/projects.css';

const theme = (p: Project) =>
  ({ '--paper': p.theme.paper, '--ink': p.theme.ink, '--accent': p.theme.accent, '--wash': p.theme.wash }) as React.CSSProperties;

// Where each project's cut-out lands in the hero, among the big letters.
const heroSpots = [
  { left: '8%', top: '60%', rot: -8, w: 'clamp(150px, 20vw, 270px)' },
  { left: '40%', top: '66%', rot: 5, w: 'clamp(140px, 19vw, 250px)' },
  { left: '70%', top: '58%', rot: -4, w: 'clamp(150px, 20vw, 270px)' },
];

export default function Projects() {
  return (
    <Page title={`Projects · ${site.firstName}'s Archive`} className="projects">
      {/* ---------- hero ---------- */}
      <section className="pj-hero">
        <div className="pj-hero__words">
          <Kinetic as="h1" text="THINGS" className="pj-hero__l1" />
          <Kinetic text="I'VE MADE" className="pj-hero__l2" delay={0.3} />
        </div>

        {projects.map((p, i) => {
          const s = heroSpots[i];
          return (
            <motion.div
              key={p.slug}
              className={`pj-cut pj-cut--${i}`}
              style={{ left: s.left, top: s.top, width: s.w }}
              initial={{ opacity: 0, y: -120, rotate: s.rot - 20 }}
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

        <Note tone="yellow" tilt={-4} className="pj-hero__n1" delay={1.1}>3 of them (for now)</Note>
        <Note tone="paper" tilt={5} className="pj-hero__n2" delay={1.3}>tap one to jump to it ↓</Note>
        <span className="pj-hero__scrap" aria-hidden="true" />
        <Cat pose="sit" className="pj-hero__cat" />
        <Cat pose="peek" eyes="blue" className="pj-hero__peek" />

        <Marquee items={projects.map((p) => p.title.toUpperCase())} className="pj-hero__marquee" />
      </section>

      {/* ---------- one section per project ---------- */}
      {projects.map((p, i) => (
        <section key={p.slug} id={p.slug} className={`pj ${i % 2 ? 'pj--flip' : ''}`} style={theme(p)}>
          <Torn color={p.theme.paper} seed={11 + i * 9} className="torn--top" />
          <div className="pj__inner">
            <div className="pj__text">
              <p className="pj__num">0{i + 1}</p>
              <Kinetic as="h2" text={p.title.toUpperCase()} className="pj__title" />
              <p className="pj__meta">
                {p.kind} · {p.year} · <Scribble color="var(--tomato)">{p.status}</Scribble>
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
                <Link to={`/work/${p.slug}`} className="btn btn--ink">read the whole story →</Link>
                <a href={p.links[0].href} target="_blank" rel="noreferrer" className="btn btn--ghost-ink">
                  {p.links[0].label} ↗
                </a>
              </div>
            </div>

            <div className="pj__collage">
              <motion.span
                className="pj__scrap"
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
                <span className="tape tape--yellow" aria-hidden="true" />
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
              <Note tone="kraft" tilt={4} className="pj__n2" delay={0.7}>{p.notes[1]}</Note>
              <Arrow className="pj__arrow" color="var(--ink)" />
              <Cat pose={p.cat.pose} eyes={p.cat.eyes} className={`pj__cat pj__cat--${p.cat.pose}`} />
            </div>
          </div>
        </section>
      ))}

      <section className="pj-end">
        <Torn color="var(--night)" seed={51} className="torn--top" />
        <p className="pj-end__line">more soon. probably something with cats.</p>
        <Link to="/contact" className="btn btn--cream">got an idea? write to me ✉</Link>
      </section>
    </Page>
  );
}
