import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import { useState, type FormEvent } from 'react';
import Page from '../components/Page';
import Bird from '../components/Bird';
import Cat from '../components/cats/Cat';
import { InkFlower, Kinetic, Note, Torn } from '../components/collage/Bits';
import { site } from '../content/site';
import { socials } from '../content/socials';
import '../styles/contact.css';

const topics = ['a project', 'a collab', 'just saying hi', 'cats'];
const icons: Record<string, string> = { Email: '✉', Instagram: '◎', GitHub: '</>', 'Twitter / X': '✦', LinkedIn: 'in', Phone: '☏' };

type Phase = 'writing' | 'sealing' | 'flying' | 'sent';

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function Postmark({ className = '' }: { className?: string }) {
  return (
    <svg className={`postmark ${className}`} viewBox="0 0 200 120" aria-hidden="true">
      <motion.g animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '60px 60px', transformBox: 'view-box' } as React.CSSProperties}>
        <circle cx="60" cy="60" r="48" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="60" cy="60" r="36" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <defs>
          <path id="pm-ring" d="M60 60 m-42 0 a42 42 0 1 1 84 0 a42 42 0 1 1 -84 0" />
        </defs>
        <text fontFamily="'DM Mono', monospace" fontSize="9" letterSpacing="2" fill="currentColor">
          <textPath href="#pm-ring">MUMBAI · HARSH POST · 2026 · MUMBAI · HARSH POST ·</textPath>
        </text>
      </motion.g>
      <text x="60" y="64" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="11" fill="currentColor">AIR MAIL</text>
      {[44, 56, 68, 80].map((y) => (
        <path key={y} d={`M112 ${y} q 10 -6 20 0 t 20 0 t 20 0 t 20 0`} fill="none" stroke="currentColor" strokeWidth="2.5" />
      ))}
    </svg>
  );
}

export default function Contact() {
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [topic, setTopic] = useState(topics[0]);
  const [phase, setPhase] = useState<Phase>('writing');
  const [round, setRound] = useState(0);
  const [copied, setCopied] = useState(false);
  const list = socials();

  const letter = useAnimationControls();
  const flap = useAnimationControls();
  const seal = useAnimationControls();
  const bird = useAnimationControls();
  const carry = useAnimationControls();

  // Fold the letter into the envelope, seal it, and let the bird carry it away.
  // Then open the visitor's own email app with the letter already written.
  const send = async (e: FormEvent) => {
    e.preventDefault();
    if (phase !== 'writing') return;
    setPhase('sealing');
    await letter.start({ y: 230, scaleY: 0.3, scaleX: 0.9, opacity: [1, 1, 0], transition: { duration: 0.9, ease: 'easeIn' } });
    await flap.start({ rotateX: 180, transition: { duration: 0.45, ease: 'easeInOut' } });
    await seal.start({ scale: [0, 1.4, 1], opacity: 1, rotate: [-40, 10, -8], transition: { duration: 0.45 } });
    setPhase('flying');
    await bird.start({ x: 0, y: 0, opacity: 1, transition: { duration: 0.9, ease: 'easeOut' } });
    await wait(250);
    await carry.start({
      x: [0, 60, 420, 1600],
      y: [0, -60, -360, -1100],
      rotate: [0, -4, -10, -18],
      scale: [1, 0.95, 0.75, 0.5],
      transition: { duration: 2, ease: 'easeIn', times: [0, 0.2, 0.6, 1] },
    });
    setPhase('sent');
    if (site.email) {
      const subject = encodeURIComponent(`Hello from ${name || 'a visitor'} (re: ${topic})`);
      const body = encodeURIComponent(`${msg}\n\n— ${name}`);
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    }
  };

  const again = () => {
    setMsg('');
    setPhase('writing');
    setRound((r) => r + 1);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the letter and the stamp still work */
    }
  };

  return (
    <Page title={`Contact · ${site.firstName}'s Archive`} className="contact">
      {/* ---------- hero ---------- */}
      <section className="ct-hero on-dark">
        <div className="ct-hero__stage">
          <Kinetic as="h1" text="WRITE TO ME." className="ct-hero__line" />
          <p className="ct-hero__sub">for work, collabs, or just to say you liked the cherries.</p>
          <motion.div
            className="ct-hero__bird"
            animate={{ x: ['-20vw', '110vw'], y: [0, -30, 10, -20, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          >
            <Bird />
          </motion.div>
          <InkFlower className="ct-hero__flower" />
          <Note tone="paper" tilt={-4} className="ct-hero__n1" delay={0.6}>replies in a day or two</Note>
          <Note tone="lemon" tilt={3} className="ct-hero__n2 note--tape" delay={0.8}>YES, EVEN ABOUT CATS</Note>
          <Cat pose="sit" className="ct-hero__cat" />
        </div>
      </section>

      {/* ---------- the writing desk ---------- */}
      <section className="ct-desk">
        <Torn color="var(--beige)" under="var(--olive-deep)" seed={61} className="torn--top" />
        <div className="ct-desk__grid">
          <motion.div className="post" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 90, damping: 15 }}>
            <AnimatePresence mode="wait">
              {phase !== 'sent' ? (
                <motion.div key={`carry-${round}`} className="carry" animate={carry} exit={{ opacity: 0 }}>
                  <div className="env__back" aria-hidden="true" />
                  <motion.div
                    className={`env__flap ${phase === 'writing' ? '' : 'env__flap--shut'}`}
                    initial={{ rotateX: 0 }}
                    animate={flap}
                    aria-hidden="true"
                  />

                  <motion.form
                    className="paper"
                    onSubmit={send}
                    animate={letter}
                    style={{ transformOrigin: '50% 100%' }}
                  >
                    <span className="paper__stamp" aria-hidden="true">
                      <span>₹5</span>
                      <b>H</b>
                    </span>
                    <p className="paper__dear">Dear {site.firstName},</p>

                    <fieldset className="paper__topics">
                      <legend>I'm writing about…</legend>
                      {topics.map((t) => (
                        <label key={t} className={topic === t ? 'is-on' : ''}>
                          <input type="radio" name="topic" value={t} checked={topic === t} onChange={() => setTopic(t)} />
                          {t}
                        </label>
                      ))}
                    </fieldset>

                    <label className="paper__field">
                      <span>and I wanted to say</span>
                      <textarea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="something nice…" rows={5} required />
                    </label>
                    <label className="paper__field paper__field--sign">
                      <span>yours,</span>
                      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="your name" required autoComplete="name" />
                    </label>

                    <button className="pill paper__send" type="submit" disabled={phase !== 'writing'}>
                      seal &amp; send <span aria-hidden="true">✉</span>
                    </button>
                  </motion.form>

                  <div className="env__front" aria-hidden="true">
                    <span className="env__to">to: {site.name}<br />{site.location}</span>
                  </div>
                  <motion.span className="env__seal" initial={{ scale: 0, opacity: 0 }} animate={seal} aria-hidden="true">
                    H
                  </motion.span>
                  <motion.div className="env__bird" initial={{ x: -500, y: -320, opacity: 0 }} animate={bird} aria-hidden="true">
                    <Bird carrying />
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="sent"
                  className="sent"
                  initial={{ opacity: 0, y: 40, rotate: 4 }}
                  animate={{ opacity: 1, y: 0, rotate: -2 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                  role="status"
                >
                  <Kinetic as="h2" text="SENT!" className="sent__title" />
                  <p>A very small bird is carrying your letter to {site.firstName}.</p>
                  <p className="sent__hint">Your email app should have opened with the letter inside. Hit send there and it's on its way.</p>
                  <button className="pill pill--ghost" onClick={again}>write another ✎</button>
                  <Cat pose="loaf" className="sent__cat" />
                </motion.div>
              )}
            </AnimatePresence>
            <p className="sr-only" aria-live="polite">
              {phase === 'sealing' ? 'Sealing your letter.' : phase === 'flying' ? 'A bird is carrying your letter away.' : ''}
            </p>
          </motion.div>

          <aside className="stamps" aria-label="Other ways to reach me">
            <h2>or find me here</h2>
            <ul className="stamp-sheet">
              {list.map((s, i) => (
                <motion.li
                  key={s.label}
                  initial={{ opacity: 0, y: 30, rotate: 0 }}
                  whileInView={{ opacity: 1, y: 0, rotate: [-3, 2, -2, 3][i % 4] }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 200, damping: 14, delay: i * 0.08 }}
                  whileHover={{ rotate: 0, y: -6, scale: 1.04 }}
                >
                  <a href={s.href} target={s.external ? '_blank' : undefined} rel="noreferrer" className="pstamp">
                    <span className="pstamp__in">
                      <span className="pstamp__top">
                        <span>HARSH POST</span>
                        <span>₹{5 + i * 2}</span>
                      </span>
                      <span className="pstamp__icon" aria-hidden="true">{icons[s.label] ?? '✿'}</span>
                      <span className="pstamp__label">{s.label}</span>
                      <span className="pstamp__value">{s.value}</span>
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
            {site.email && (
              <motion.button className="rubber" onClick={copy} whileTap={{ scale: 0.9, rotate: -6 }}>
                {copied ? 'COPIED ✓' : 'COPY MY EMAIL'}
              </motion.button>
            )}
            <div className="stamps__foot">
              <Postmark />
              <Cat pose="loaf" className="stamps__cat" />
            </div>
          </aside>
        </div>
      </section>
    </Page>
  );
}
