import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Page from '../components/Page';
import { projects, type Project } from '../content/projects';
import { site } from '../content/site';

const theme = (p: Project) =>
  ({ '--paper': p.theme.paper, '--ink': p.theme.ink, '--accent': p.theme.accent, '--wash': p.theme.wash }) as React.CSSProperties;

// ---------- little animated doodles, one per project ----------

function Sprout() {
  // A flower that grows out of the ground when it scrolls into view.
  return (
    <svg viewBox="0 0 80 110" className="doodle" aria-hidden="true">
      <ellipse cx="40" cy="104" rx="30" ry="5" fill="#8b6b4a" />
      <motion.path
        d="M40 104 C 40 80, 36 64, 40 40"
        stroke="#6b8f5a"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      />
      {[-1, 1].map((d) => (
        <motion.ellipse
          key={d}
          cx={40 + d * 12}
          cy="76"
          rx="11"
          ry="5"
          fill="#8db35a"
          transform={`rotate(${d * -30} ${40 + d * 12} 76)`}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, type: 'spring' }}
        />
      ))}
      <motion.g
        initial={{ scale: 0, rotate: -90 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 10 }}
        style={{ originX: '40px', originY: '34px' }}
      >
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <ellipse key={a} cx="40" cy="22" rx="7" ry="12" fill="#f5b8d0" transform={`rotate(${a} 40 34)`} />
        ))}
        <circle cx="40" cy="34" r="7" fill="#f3c84a" />
      </motion.g>
    </svg>
  );
}

function PebbleStack() {
  // Pebbles drop and stack, one on top of the other.
  const stones = [
    { cx: 40, cy: 96, rx: 30, ry: 11, fill: '#93ab98' },
    { cx: 42, cy: 76, rx: 22, ry: 9, fill: '#dcc7a9' },
    { cx: 39, cy: 60, rx: 15, ry: 7, fill: '#b6c9cc' },
    { cx: 41, cy: 47, rx: 9, ry: 5, fill: '#cf9f82' },
  ];
  return (
    <svg viewBox="0 0 80 110" className="doodle" aria-hidden="true">
      {stones.map((s, i) => (
        <motion.ellipse
          key={i}
          {...s}
          initial={{ y: -90, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.35, type: 'spring', stiffness: 260, damping: 12 }}
        />
      ))}
    </svg>
  );
}

function Scissors() {
  // Salon scissors, snipping away forever.
  const blade = (dir: 1 | -1) => (
    <motion.g
      animate={{ rotate: [0, dir * 14, 0] }}
      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.6 }}
      style={{ originX: '40px', originY: '58px' }}
    >
      <path d={`M40 58 L${40 + dir * 6} 8 L${40 + dir * 1} 58Z`} fill="#c9c3c8" stroke="#7d756b" strokeWidth="1.5" />
      <circle cx={40 - dir * 14} cy="86" r="11" fill="none" stroke="#9e776b" strokeWidth="6" />
      <path d={`M40 58 L${40 - dir * 10} 76`} stroke="#9e776b" strokeWidth="6" strokeLinecap="round" />
    </motion.g>
  );
  return (
    <svg viewBox="0 0 80 110" className="doodle" aria-hidden="true">
      {blade(1)}
      {blade(-1)}
      <circle cx="40" cy="58" r="3" fill="#171514" />
      <motion.path
        d="M64 20 l3 6 6 1 -5 4 1 6 -5 -3 -5 3 1 -6 -5 -4 6 -1Z"
        fill="#f3dc8a"
        animate={{ scale: [0.6, 1.1, 0.6], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        style={{ originX: '68px', originY: '28px' }}
      />
    </svg>
  );
}

const doodles: Record<string, () => React.ReactElement> = {
  'plant-a-thought': Sprout,
  pebble: PebbleStack,
  'seven-wonders-studio': Scissors,
};

// ---------- page ----------

export default function Projects() {
  return (
    <Page title={`Projects · ${site.firstName}'s Archive`} className="projects">
      <header className="projects__head">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          The Projects
        </motion.h1>
        <p className="scribble">three things I made, hung up to dry. tap one ↓</p>
      </header>

      <section className="line" aria-label="Projects on a clothesline">
        <svg className="line__rope" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M-10 20 Q 500 120 1010 20" stroke="#e8dcc4" strokeWidth="3" fill="none" />
        </svg>
        <div className="line__cards">
          {projects.map((p, i) => (
            <motion.div
              key={p.slug}
              className="hang"
              style={{ '--drop': `${[38, 78, 38][i]}px` } as React.CSSProperties}
              initial={{ y: -200, opacity: 0, rotate: 0 }}
              animate={{ y: 0, opacity: 1, rotate: [0, -4, 3, -2, 0] }}
              transition={{
                y: { type: 'spring', stiffness: 120, damping: 12, delay: 0.2 + i * 0.15 },
                opacity: { delay: 0.2 + i * 0.15 },
                rotate: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 },
              }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="peg" aria-hidden="true" />
              <Link to={`/work/${p.slug}`} className="hang__card" style={theme(p)}>
                <img src={p.shots[0].src} alt="" loading="eager" />
                <span className="hang__title">{p.title}</span>
                <span className="hang__kind">{p.kind}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="files" aria-label="Project files">
        {projects.map((p, i) => {
          const Doodle = doodles[p.slug];
          return (
            <article key={p.slug} className={`file ${i % 2 ? 'file--flip' : ''}`} style={theme(p)}>
              <div className="folder">
                <span className="folder__tab">0{i + 1} · {p.title}</span>
                <motion.div
                  className="folder__paper"
                  initial={{ y: '45%', rotate: 0 }}
                  whileInView={{ y: '0%', rotate: i % 2 ? 2 : -2 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ type: 'spring', stiffness: 90, damping: 14 }}
                >
                  <img src={p.shots[0].src} alt={p.shots[0].alt} loading="lazy" />
                </motion.div>
                <div className="folder__front" />
                <motion.span
                  className="stamp-mark"
                  initial={{ scale: 2.6, opacity: 0, rotate: -30 }}
                  whileInView={{ scale: 1, opacity: 1, rotate: -12 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ delay: 0.6, type: 'spring', stiffness: 400, damping: 18 }}
                >
                  {p.status} · {p.year}
                </motion.span>
              </div>

              <div className="file__info">
                <div className="file__doodle">{Doodle && <Doodle />}</div>
                <p className="file__kind">{p.kind}</p>
                <h2>{p.title}</h2>
                <p className="file__one">{p.oneLiner}</p>
                <ul className="file__stack" aria-label="Built with">
                  {p.stack.map((s, k) => (
                    <motion.li
                      key={s.name}
                      initial={{ scale: 0, rotate: -20 }}
                      whileInView={{ scale: 1, rotate: (k % 2 ? 1 : -1) * (2 + (k % 3)) }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + k * 0.08, type: 'spring', stiffness: 300, damping: 14 }}
                      whileHover={{ scale: 1.12, rotate: 0 }}
                    >
                      {s.name}
                    </motion.li>
                  ))}
                </ul>
                <div className="file__ctas">
                  <Link to={`/work/${p.slug}`} className="btn btn--ink">read the story →</Link>
                  <a href={p.links[0].href} target="_blank" rel="noreferrer" className="btn btn--ghost-ink">
                    {p.links[0].label} ↗
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </Page>
  );
}
