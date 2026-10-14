import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Page from '../components/Page';
import Avatar from '../components/Avatar';
import { Asterisk, Burst, Cat, Coffee, Star, Tulip } from '../components/doodles/Doodles';
import { site } from '../content/site';
import { projects } from '../content/projects';

const pop = (delay: number) => ({
  initial: { opacity: 0, scale: 0.6, rotate: -8 },
  animate: { opacity: 1, scale: 1, rotate: 0 },
  transition: { type: 'spring' as const, stiffness: 260, damping: 16, delay },
});

const toolbox = ['TypeScript', 'JavaScript', 'React', 'HTML & CSS', 'Canvas', 'Rust (a little)', 'Tauri', 'Supabase', 'Vite', 'Playwright', 'Figma', 'Vercel'];

export default function About() {
  return (
    <Page title={`About · ${site.firstName}'s Archive`} className="about">
      <div className="poster-wrap">
        <article className="poster" aria-label="Hello poster">
          <div className="poster__inner">
            <motion.div className="poster__bubble" {...pop(0.1)}>
              <p className="poster__hello">HELLO!</p>
              <p className="poster__iam">I AM</p>
              <p className="poster__name">{site.name.toUpperCase()}</p>
            </motion.div>

            <motion.div className="poster__blob" {...pop(0.35)}>
              <p>{site.about.blurb}</p>
            </motion.div>

            <motion.div className="poster__me" {...pop(0.2)}>
              <Avatar />
            </motion.div>

            <motion.div className="dd dd--star1 crayon" {...pop(0.5)}><Star /></motion.div>
            <motion.div className="dd dd--star2 crayon" {...pop(0.6)}><Star color="#8db35a" /></motion.div>
            <motion.div className="dd dd--star3 crayon" {...pop(0.7)}><Star color="#ef5a3c" /></motion.div>
            <motion.div className="dd dd--star4 crayon" {...pop(0.75)}><Star color="#f2a7c3" /></motion.div>
            <motion.div className="dd dd--ast1 crayon" {...pop(0.8)}><Asterisk /></motion.div>
            <motion.div className="dd dd--ast2 crayon" {...pop(0.85)}><Asterisk color="#f4c84a" /></motion.div>
            <motion.div className="dd dd--tulip1 crayon" {...pop(0.4)}><Tulip /></motion.div>
            <motion.div className="dd dd--tulip2 crayon" {...pop(0.55)}><Tulip color="#ef6a4a" /></motion.div>
            <motion.div className="dd dd--cat crayon" {...pop(0.65)}><Cat /></motion.div>
            <motion.div className="dd dd--coffee crayon" {...pop(0.45)}><Coffee /></motion.div>
            <motion.div className="dd dd--burst" {...pop(0.9)}><Burst /></motion.div>
          </div>
        </article>
        <p className="scribble poster-wrap__hint">(poke me. I'm only half listening, the music's good.)</p>
      </div>

      <section className="story">
        <div className="story__text">
          <h2>the longer version</h2>
          {site.about.story.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <aside className="index-card" aria-label="Currently">
          <h3>currently…</h3>
          <ul>
            {site.about.currently.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="likes">
        <h2>things I'm into</h2>
        <ul>
          {site.about.likes.map((l, i) => (
            <motion.li
              key={l}
              initial={{ opacity: 0, y: 20, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: (i % 2 ? 1 : -1) * (2 + (i % 3)) }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.1, rotate: 0 }}
            >
              {l}
            </motion.li>
          ))}
        </ul>
      </section>

      <section className="toolbox">
        <h2>my toolbox</h2>
        <ul className="dymo">
          {toolbox.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <p className="toolbox__note">
          …and a notebook. Every project here started as words before it was code. Have a look:{' '}
          {projects.map((p, i) => (
            <span key={p.slug}>
              <Link to={`/work/${p.slug}`}>{p.title}</Link>
              {i < projects.length - 2 ? ', ' : i === projects.length - 2 ? ' and ' : '.'}
            </span>
          ))}
        </p>
      </section>
    </Page>
  );
}
