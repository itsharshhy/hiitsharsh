import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState, type FormEvent } from 'react';
import Page from '../components/Page';
import Avatar from '../components/Avatar';
import Cat from '../components/cats/Cat';
import { Kinetic } from '../components/collage/Bits';
import { logoFor } from '../components/Logos';
import { site } from '../content/site';
import { socials } from '../content/socials';
import '../styles/contact.css';

const topics = ['a project', 'a collab', 'just saying hi', 'cats'];
const prompts = ['say hi', 'ask me anything', 'pitch an idea', 'talk about cats', 'leave a note'];

// A little olive tag where a pen keeps writing a new way to start a conversation.
// Click it to jump down to the letter.
function NoteTag() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((x) => (x + 1) % prompts.length), 2200);
    return () => clearInterval(id);
  }, []);
  const word = prompts[n];
  return (
    <motion.a
      href="#letter"
      className="note-tag"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.5 }}
      onClick={(e) => {
        e.preventDefault();
        document.getElementById('letter')?.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      <span className="note-tag__pen" aria-hidden="true">✎</span>
      <span className="note-tag__text" aria-live="off">
        <AnimatePresence mode="wait">
          <motion.span key={word} initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0% 0 0)' }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
            {word}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="sr-only">Write me a letter</span>
    </motion.a>
  );
}

export default function Contact() {
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [topic, setTopic] = useState(topics[0]);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const links = socials().filter((s) => logoFor[s.label]);
  const byLabel = Object.fromEntries(links.map((s) => [s.label, s]));

  // The letter fades away; once it's gone the visitor's own email app opens with it written in.
  const send = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    if (site.email) {
      const subject = encodeURIComponent(`Hello from ${name || 'a visitor'} (re: ${topic})`);
      const body = encodeURIComponent(`${msg}\n\n— ${name}`);
      setTimeout(() => {
        window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      }, 900);
    }
  };

  const again = () => {
    setMsg('');
    setSent(false);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the email link still works */
    }
  };

  const Tile = ({ label, i }: { label: string; i: number }) => {
    const s = byLabel[label];
    if (!s) return null;
    const Logo = logoFor[label];
    return (
      <motion.a
        href={s.href}
        target={s.external ? '_blank' : undefined}
        rel="noreferrer"
        className="band__icon"
        aria-label={`${label}: ${s.value}`}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 + i * 0.12, duration: 0.5 }}
      >
        <Logo bare />
        <small>{label === 'Email' ? 'email' : s.value}</small>
      </motion.a>
    );
  };

  return (
    <Page title={`Contact · ${site.firstName}'s Archive`} className="contact">
      {/* ---------- stage: big portrait with a strip of links across it ---------- */}
      <section className="ct-stage">
        <p className="ct-stage__kicker">CONTACT — {site.firstName.toUpperCase()}'S ARCHIVE</p>
        <motion.div className="ct-stage__intro" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <b>{site.name}</b>
          <span>Where ideas become little worlds, and a hello becomes a conversation.</span>
        </motion.div>

        <motion.div
          className="ct-stage__me"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 70, damping: 16, delay: 0.1 }}
        >
          <Avatar />
        </motion.div>

        <div className="band">
          <span className="band__fade band__fade--l" aria-hidden="true">SAY HI · SAY HI · SAY HI · SAY HI ·</span>
          <div className="band__tiles">
            <Tile label="Instagram" i={0} />
            <NoteTag />
            <Tile label="Email" i={1} />
            <Tile label="GitHub" i={2} />
          </div>
          <span className="band__fade band__fade--r" aria-hidden="true">{site.location.toUpperCase()} · {site.location.toUpperCase()} ·</span>
        </div>

        <Kinetic text="SAY HI." className="ct-stage__big" delay={0.4} />
        <Cat pose="sit" className="ct-stage__cat" />
      </section>

      {/* ---------- the letter, then the contact info ---------- */}
      <section className="ct-write" id="letter">
        <motion.div layout className="ct-write__col">
          <AnimatePresence mode="wait" initial={false}>
            {!sent ? (
              <motion.form
                key="letter"
                className="letter"
                onSubmit={send}
                initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -16, filter: 'blur(8px)', transition: { duration: 0.7 } }}
              >
                <h2 className="letter__title">Write to me.</h2>
                <p className="letter__sub">Say hi, ask something, pitch an idea. I read every letter.</p>

                <fieldset className="letter__topics">
                  <legend>I'm writing about…</legend>
                  {topics.map((t) => (
                    <label key={t} className={topic === t ? 'is-on' : ''}>
                      <input type="radio" name="topic" value={t} checked={topic === t} onChange={() => setTopic(t)} />
                      {t}
                    </label>
                  ))}
                </fieldset>

                <label className="letter__field">
                  <span>Dear {site.firstName},</span>
                  <textarea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="say hi…" rows={6} required />
                </label>
                <label className="letter__field letter__field--sign">
                  <span>yours,</span>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="your name" required autoComplete="name" />
                </label>

                <button className="pill letter__send" type="submit">
                  seal &amp; send <span aria-hidden="true">✉</span>
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="done"
                className="done"
                role="status"
                initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className="done__mark" aria-hidden="true">✓</span>
                <h2>It's done.</h2>
                <p>Thank you for writing. Replies might take a few days, so hang tight. I'll get back to you.</p>
                <p className="done__hint">(Your email app just opened with your letter inside. Press send there and it's on its way.)</p>
                <button className="pill pill--ghost" onClick={again}>write another ✎</button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.aside layout className="ct-info" aria-label="Other ways to reach me" transition={{ type: 'spring', stiffness: 120, damping: 20 }}>
          <h2>or find me here</h2>
          <ul>
            {links.map((s, i) => {
              const Logo = logoFor[s.label];
              return (
                <motion.li key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <a href={s.href} target={s.external ? '_blank' : undefined} rel="noreferrer" className="info-card">
                    <Logo />
                    <span className="info-card__text">
                      <b>{s.label}</b>
                      <span>{s.value}</span>
                    </span>
                    <span className="info-card__arrow" aria-hidden="true">↗</span>
                  </a>
                </motion.li>
              );
            })}
          </ul>
          {site.email && (
            <button className="rubber" onClick={copy}>
              {copied ? 'COPIED ✓' : 'COPY MY EMAIL'}
            </button>
          )}
          <Cat pose="loaf" className="ct-info__cat" />
        </motion.aside>
      </section>
    </Page>
  );
}
