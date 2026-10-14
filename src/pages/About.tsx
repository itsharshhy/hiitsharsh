import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Page from '../components/Page';
import Avatar from '../components/Avatar';
import Cat from '../components/cats/Cat';
import { Arrow, Kinetic, Note, Scribble, Torn } from '../components/collage/Bits';
import { asset } from '../content/asset';
import { site } from '../content/site';
import { projects } from '../content/projects';
import '../styles/about.css';

const toolbox = ['TypeScript', 'JavaScript', 'React', 'HTML & CSS', 'Canvas', 'Rust (a little)', 'Tauri', 'Supabase', 'Vite', 'Playwright', 'Figma', 'Vercel'];

// The avatar cut into strips and re-glued slightly off, with coloured paper in between.
const strips = [
  { top: 0, h: 22, x: -10, rot: -2, paper: 'var(--tomato)' },
  { top: 22, h: 18, x: 14, rot: 1.5, paper: 'var(--mustard)' },
  { top: 40, h: 20, x: -6, rot: -1, paper: 'var(--cobalt)' },
  { top: 60, h: 20, x: 10, rot: 2, paper: 'var(--kraft)' },
  { top: 80, h: 20, x: -4, rot: -1.5, paper: 'var(--tomato)' },
];

export default function About() {
  const likesBox = useRef<HTMLDivElement>(null);

  return (
    <Page title={`About · ${site.firstName}'s Archive`} className="about">
      {/* ---------- hero ---------- */}
      <section className="ab-hero">
        <div className="ab-hero__words">
          <Kinetic as="h1" text="HELLO!" className="ab-hero__l1" />
          <div className="ab-hero__row">
            <Kinetic text="I'M" className="ab-hero__l2" delay={0.25} />
            <Cat pose="peek" eyes="blue" className="ab-hero__peek" />
          </div>
          <Kinetic text={site.firstName.toUpperCase() + '.'} className="ab-hero__l3" delay={0.4} />
        </div>

        <motion.div
          className="ab-hero__me"
          initial={{ opacity: 0, y: 60, rotate: 6 }}
          animate={{ opacity: 1, y: 0, rotate: -3 }}
          transition={{ type: 'spring', stiffness: 90, damping: 13, delay: 0.3 }}
        >
          <span className="ab-hero__scrap" aria-hidden="true" />
          <Avatar />
          <Cat pose="sit" className="ab-hero__shouldercat" />
        </motion.div>

        <Note tone="paper" tilt={-5} className="ab-hero__n1" delay={0.8}>this is me (pixel version) →</Note>
        <Note tone="blue" tilt={4} className="ab-hero__n2" delay={1}>{site.location.toLowerCase()}</Note>
        <Note tone="kraft" tilt={-2} className="ab-hero__n3" delay={1.2}>probably has headphones on</Note>

        <div className="ab-hero__bubble">
          <p>{site.about.blurb}</p>
          <svg viewBox="0 0 400 140" preserveAspectRatio="none" aria-hidden="true">
            <motion.path
              d="M60 18 C 160 0, 360 6, 390 54 C 410 100, 300 132, 190 128 C 70 124, 0 104, 10 62 C 20 26, 110 10, 240 12 M 120 132 C 200 140, 300 138, 380 128"
              fill="none"
              stroke="var(--navy)"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, delay: 1 }}
            />
          </svg>
        </div>
      </section>

      {/* ---------- the longer version ---------- */}
      <section className="ab-story">
        <Torn color="var(--paper)" seed={7} className="torn--top" />
        <div className="ab-story__grid">
          <div className="sliced" aria-hidden="true">
            {strips.map((s, i) => (
              <motion.div
                key={i}
                className="sliced__strip"
                style={{ top: `${s.top}%`, height: `${s.h}%`, '--paper': s.paper } as React.CSSProperties}
                initial={{ x: i % 2 ? 120 : -120, opacity: 0, rotate: 0 }}
                whileInView={{ x: s.x, opacity: 1, rotate: s.rot }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ type: 'spring', stiffness: 80, damping: 14, delay: i * 0.1 }}
              >
                <span className="sliced__paper" />
                <span className="sliced__img" style={{ backgroundImage: `url(${asset('harsh.webp')})`, backgroundPosition: `50% ${(s.top / (100 - s.h)) * 100}%`, backgroundSize: `100% ${100 / (s.h / 100)}%` }} />
              </motion.div>
            ))}
            <Note tone="yellow" tilt={-6} className="sliced__n1">debugging at 2am</Note>
            <Note tone="paper" tilt={5} className="sliced__n2">writes the plan before the code</Note>
            <Cat pose="loaf" className="sliced__cat" />
          </div>

          <div className="ab-story__text">
            <h2>
              I build things that feel like a <Scribble>deep breath.</Scribble>
            </h2>
            {site.about.story.map((p, i) => (
              <motion.p key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- currently + likes ---------- */}
      <section className="ab-now">
        <Torn color="var(--cobalt)" seed={21} className="torn--top" />
        <div className="ab-now__inner">
          <Kinetic as="h2" text="CURRENTLY" className="ab-now__title" />
          <div className="cards">
            {site.about.currently.map((c, i) => (
              <motion.div
                key={c}
                className="card"
                initial={{ y: 80, opacity: 0, rotate: 0 }}
                whileInView={{ y: 0, opacity: 1, rotate: [-3, 2, -1][i % 3] }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 120, damping: 14, delay: i * 0.12 }}
                whileHover={{ y: -6, rotate: 0 }}
              >
                <span className="card__num">0{i + 1}</span>
                <p>{c}</p>
                {i === 1 && <Cat pose="loaf" className="card__cat" />}
              </motion.div>
            ))}
          </div>

          <div className="likes" ref={likesBox}>
            <p className="likes__hint">things I'm into (go on, move them around) ↓</p>
            {site.about.likes.map((l, i) => (
              <motion.span
                key={l}
                className="like-pop"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 300, damping: 15, delay: i * 0.05 }}
              >
                <motion.span
                  className={`like like--${i % 4}`}
                  style={{ rotate: ((i * 37) % 14) - 7 }}
                  drag
                  dragConstraints={likesBox}
                  dragElastic={0.2}
                  whileHover={{ scale: 1.08 }}
                  whileDrag={{ scale: 1.12, zIndex: 5 }}
                >
                  {l}
                </motion.span>
              </motion.span>
            ))}
            <Cat pose="sit" eyes="green" className="likes__cat" />
          </div>
        </div>
      </section>

      {/* ---------- toolbox ---------- */}
      <section className="ab-tools">
        <Torn color="var(--paper)" seed={33} className="torn--top" />
        <div className="ab-tools__inner">
          <Kinetic as="h2" text="MY TOOLBOX" className="ab-tools__title" />
          <ul className="dymo">
            {toolbox.map((t, i) => (
              <motion.li key={t} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                {t}
              </motion.li>
            ))}
          </ul>
          <p className="ab-tools__note">
            …and a notebook. Every project here started as words before it became code:{' '}
            {projects.map((p, i) => (
              <span key={p.slug}>
                <Link to={`/work/${p.slug}`}>{p.title}</Link>
                {i < projects.length - 2 ? ', ' : i === projects.length - 2 ? ' and ' : '.'}
              </span>
            ))}
          </p>
          <div className="ab-tools__cta">
            <Arrow className="ab-tools__arrow" color="var(--tomato)" />
            <Link to="/contact" className="btn btn--ink">write me a letter ✉</Link>
          </div>
        </div>
      </section>
    </Page>
  );
}
