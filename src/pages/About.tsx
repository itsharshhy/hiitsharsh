import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Page from '../components/Page';
import Avatar from '../components/Avatar';
import Cat from '../components/cats/Cat';
import { Arrow, InkFlower, Kinetic, Note, Scribble, Torn } from '../components/collage/Bits';
import { asset } from '../content/asset';
import { site } from '../content/site';
import { projects } from '../content/projects';
import '../styles/about.css';

const toolbox = ['TypeScript', 'JavaScript', 'React', 'HTML & CSS', 'Canvas', 'Rust (a little)', 'Tauri', 'Supabase', 'Vite', 'Playwright', 'Figma', 'Vercel'];

// The portrait cut into strips and re-glued slightly off, with torn coloured paper between.
const strips = [
  { top: 0, h: 24, x: -8, rot: -1.5, paper: 'var(--eastbay-soft)' },
  { top: 24, h: 16, x: 12, rot: 1, paper: 'var(--rum-deep)' },
  { top: 40, h: 20, x: -4, rot: -0.8, paper: 'var(--eastbay)' },
  { top: 60, h: 18, x: 10, rot: 1.4, paper: 'var(--eastbay-mist)' },
  { top: 78, h: 22, x: -6, rot: -1, paper: 'var(--eastbay-deep)' },
];

export default function About() {
  const likesBox = useRef<HTMLDivElement>(null);

  return (
    <Page title={`About · ${site.firstName}'s Archive`} className="about">
      {/* ---------- hero: pink paper ---------- */}
      <section className="ab-hero on-dark">
        <div className="ab-hero__stage">
          <Kinetic as="h1" text={`HI, I'M ${site.firstName.toUpperCase()}.`} className="ab-hero__line ab-hero__line--1" />
          <Kinetic text="I MAKE CALM THINGS." className="ab-hero__line ab-hero__line--2" delay={0.4} />

          {/* cut-outs scattered over the letters */}
          <span className="scrap scrap--navy ab-hero__scrap1" aria-hidden="true" />
          <span className="scrap scrap--red ab-hero__scrap2" aria-hidden="true" />
          <motion.div
            className="ab-hero__me"
            initial={{ opacity: 0, scale: 0.7, rotate: 10 }}
            animate={{ opacity: 1, scale: 1, rotate: -3 }}
            transition={{ type: 'spring', stiffness: 120, damping: 12, delay: 0.5 }}
          >
            <Avatar />
          </motion.div>
          <InkFlower className="ab-hero__flower" />
          <Cat pose="sit" className="ab-hero__cat" />
          <Cat pose="peek" eyes="blue" className="ab-hero__peek" />

          <Note tone="paper" tilt={-4} className="ab-hero__n1" delay={0.9}>this is me →<br />(drawn, not photographed)</Note>
          <Note tone="lemon" tilt={2} className="ab-hero__n2 note--tape" delay={1.1}>{site.location.toUpperCase()}</Note>
          <Note tone="lilac" tilt={6} className="ab-hero__n3" delay={1.3}>probably has headphones on</Note>
          <span className="ab-hero__scrawl" aria-hidden="true">
            this morning was a<br />
            good debugging day
            <Arrow className="ab-hero__scrawl-arrow" color="var(--rum)" />
          </span>
        </div>

        <div className="bubble ab-hero__bubble">
          <p>{site.about.blurb}</p>
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
            <motion.path
              d="M40 140 C 140 150, 260 146, 392 134 M60 146 C 170 142, 300 150, 360 144"
              fill="none"
              stroke="var(--pen)"
              strokeWidth="1.6"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 2.1 }}
            />
          </svg>
          <Arrow className="bubble__arrow" color="var(--pen)" />
        </div>
      </section>

      {/* ---------- the longer version: cream paper ---------- */}
      <section className="ab-story">
        <Torn color="var(--cream-2)" under="var(--cobalt)" seed={7} className="torn--top" />
        <div className="ab-story__grid">
          <div className="sliced" aria-hidden="true">
            {strips.map((s, i) => (
              <motion.div
                key={i}
                className="sliced__strip"
                style={{ top: `${s.top}%`, height: `${s.h}%` }}
                initial={{ x: i % 2 ? 100 : -100, opacity: 0, rotate: 0 }}
                whileInView={{ x: s.x, opacity: 1, rotate: s.rot }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ type: 'spring', stiffness: 80, damping: 14, delay: i * 0.1 }}
              >
                <span className="sliced__paper" style={{ background: s.paper }} />
                <span
                  className="sliced__img"
                  style={{
                    backgroundImage: `url(${asset('harsh.webp')})`,
                    backgroundPosition: `50% ${(s.top / (100 - s.h)) * 100}%`,
                    backgroundSize: `100% ${100 / (s.h / 100)}%`,
                  }}
                />
              </motion.div>
            ))}
            <Note tone="paper" tilt={-3} className="sliced__n1">AS SOON AS IT WORKS,<br />I WANT TO MAKE IT NICER.</Note>
            <span className="sliced__scrawl sliced__scrawl--1">writes the plan<br />before the code ↓</span>
            <span className="sliced__scrawl sliced__scrawl--2">debugging at 2am</span>
            <Note tone="lemon" tilt={2} className="sliced__n2 note--tape">KIND SOFTWARE</Note>
            <Cat pose="loaf" className="sliced__cat" />
          </div>

          <div className="ab-story__text">
            <h2>I build things that feel like a deep breath.</h2>
            {site.about.story.map((p, i) => (
              <motion.p key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                {p}
              </motion.p>
            ))}
            <p className="ab-story__circled">
              <Scribble>
                This is my <strong>whole thing.</strong>
              </Scribble>
            </p>
          </div>
        </div>
      </section>

      {/* ---------- currently + likes: pink paper ---------- */}
      <section className="ab-now on-dark">
        <Torn color="var(--eastbay)" under="var(--eastbay-soft)" seed={21} className="torn--top" />
        <div className="ab-now__inner">
          <Kinetic as="h2" text="CURRENTLY" className="ab-big" />
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
                <span className="card__tape" aria-hidden="true" />
                <span className="card__num">0{i + 1}</span>
                <p>{c}</p>
                {i === 1 && <Cat pose="loaf" className="card__cat" />}
              </motion.div>
            ))}
          </div>

          <div className="likes" ref={likesBox}>
            <p className="likes__hint">things I'm into — go on, move them around ↓</p>
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
                  style={{ rotate: ((i * 37) % 12) - 6 }}
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

      {/* ---------- toolbox: cream paper ---------- */}
      <section className="ab-tools">
        <Torn color="var(--cream-2)" under="var(--cobalt)" seed={33} className="torn--top" />
        <div className="ab-tools__inner">
          <Kinetic as="h2" text="MY TOOLBOX" className="ab-big" />
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
          <Link to="/contact" className="pill">
            write me a letter <span aria-hidden="true">✉</span>
          </Link>
        </div>
      </section>
    </Page>
  );
}
