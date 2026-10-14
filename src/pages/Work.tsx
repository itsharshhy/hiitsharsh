import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import Page from '../components/Page';
import Polaroid from '../components/Polaroid';
import Cat from '../components/cats/Cat';
import NotFound from './NotFound';
import { projectBySlug, projects } from '../content/projects';
import { site } from '../content/site';

const rise = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

export default function Work() {
  const { slug = '' } = useParams();
  const p = projectBySlug(slug);
  if (!p) return <NotFound />;

  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];
  const [hero, ...rest] = p.shots;

  return (
    <Page
      title={`${p.title} · ${site.firstName}'s Archive`}
      className="case"
    >
      <div
        className="case__paper"
        style={{ '--paper': p.theme.paper, '--ink': p.theme.ink, '--accent': p.theme.accent, '--wash': p.theme.wash } as React.CSSProperties}
      >
        <Link to="/work" className="case__back">← all projects</Link>

        <header className="case__hero">
          <div>
            <p className="case__meta">{p.kind} · {p.year}</p>
            <h1>{p.title}</h1>
            <p className="case__one">{p.oneLiner}</p>
            <dl className="case__facts">
              <div><dt>my role</dt><dd>{p.role}</dd></div>
              {p.credit && <div><dt>team</dt><dd>{p.credit}</dd></div>}
            </dl>
            <div className="case__links">
              {p.links.map((l, k) => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className={`btn ${k ? 'btn--ghost-ink' : 'btn--ink'}`}>
                  {l.label} ↗
                </a>
              ))}
            </div>
          </div>
          <motion.div
            className="case__heroshot"
            initial={{ opacity: 0, rotate: 8, y: 30 }}
            animate={{ opacity: 1, rotate: -2, y: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.2 }}
          >
            <Polaroid src={hero.src} alt={hero.alt} caption={p.sticker} tape="yellow" />
          </motion.div>
        </header>

        <motion.section className="case__block" {...rise}>
          <h2><span>01</span> the gist</h2>
          <div className="case__cols">
            {p.gist.map((g) => (
              <p key={g}>{g}</p>
            ))}
          </div>
        </motion.section>

        <motion.section className="case__block" {...rise}>
          <h2><span>02</span> why it exists</h2>
          <blockquote className="sticky-quote">{p.why}</blockquote>
        </motion.section>

        <motion.section className="case__block" {...rise}>
          <h2><span>03</span> how it's made</h2>
          <ul className="dymo dymo--notes">
            {p.stack.map((s) => (
              <li key={s.name}>
                <strong>{s.name}</strong>
                <span>{s.note}</span>
              </li>
            ))}
          </ul>
          <ol className="steps">
            {p.build.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ol>
        </motion.section>

        <motion.section className="case__block" {...rise}>
          <h2><span>04</span> how it looks</h2>
          <p className="case__lead">{p.look.intro}</p>
          <div className="look">
            <ul className="swatches" aria-label="Colour palette">
              {p.look.palette.map((s, k) => (
                <motion.li
                  key={s.hex}
                  initial={{ y: 30, opacity: 0, rotate: 0 }}
                  whileInView={{ y: 0, opacity: 1, rotate: (k % 2 ? 1 : -1) * 3 }}
                  viewport={{ once: true }}
                  transition={{ delay: k * 0.08 }}
                >
                  <span className="swatches__chip" style={{ background: s.hex }} />
                  <span className="swatches__name">{s.name}</span>
                  <span className="swatches__hex">{s.hex}</span>
                </motion.li>
              ))}
            </ul>
            <div className="fonts">
              <p className="fonts__label">type</p>
              {p.look.fonts.map((f) => (
                <p key={f}>{f}</p>
              ))}
            </div>
          </div>
          {rest.length > 0 && (
            <div className="gallery">
              {rest.map((s) => (
                <figure key={s.src} className={`device device--${s.kind}`}>
                  <img src={s.src} alt={s.alt} loading="lazy" />
                </figure>
              ))}
            </div>
          )}
        </motion.section>

        <motion.section className="case__block" {...rise}>
          <h2><span>05</span> what's inside</h2>
          <ul className="checklist">
            {p.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </motion.section>

        <motion.section className="case__block" {...rise}>
          <h2><span>06</span> what I learned</h2>
          <p className="handnote">{p.learned}</p>
        </motion.section>

        <Cat pose="peek" eyes={p.cat.eyes} className="next__cat" />
        <Link to={`/work/${next.slug}`} className="next">
          <span className="next__label">next up →</span>
          <span className="next__title">{next.title}</span>
          <span className="next__one">{next.oneLiner}</span>
        </Link>
      </div>
    </Page>
  );
}
